import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useStepSound } from "./useSound";

// Asume que ya tienes estas interfaces en tu proyecto
// Stage.duration está en **segundos**
export interface BasicIdentifier {
  id: string;
  label?: string;
  description?: string;
}
export interface Stage extends BasicIdentifier {
  duration: number;
  repeat: number;
}
export interface Group extends BasicIdentifier {
  stages: Stage[];
  groups?: Group[];
  rules?: TransitionRule[];
}
export interface TransitionRule {
  afterStageId: BasicIdentifier["id"];
  insert: Stage | Group;
  everyXRepeats?: number;
  maxDuration?: number;
  repeat?: number;
}
export interface CycleDefinition extends BasicIdentifier {
  steps: (Stage | Group)[];
  rules?: TransitionRule[];
  repeat: number;
}
export interface FlattenedCycleStep {
  index: number;
  id: string;
  label: string;
  duration: number; // en segundos (como tu modelo)
  from: "stage" | "group" | "inserted";
  repeatIndex: number;
  parentGroupId?: string;
  originalStage: Stage;
  accumulatedTime: number; // en segundos
}

export interface UseCycleRunnerOptions {
  autostart?: boolean;
  tickMs?: number; // resolución del timer
  loop?: boolean; // reiniciar al terminar
  startIndex?: number; // índice inicial
  onStepChange?: (index: number, step: FlattenedCycleStep | null) => void;
  onFinish?: () => void;
}

/** ---------- Helpers ---------- **/
const isStage = (x: Stage | Group): x is Stage =>
  (x as Stage).duration !== undefined;

// Formato corto de duración según reglas pedidas
export function formatDurationShort(ms: number): string {
  const sec = Math.max(0, Math.floor(ms / 1000));
  const min = Math.floor(sec / 60);
  const remSec = sec % 60;
  const hrs = Math.floor(min / 60);
  const remMin = min % 60;

  // <= 10 minutos -> "Xm Ys"
  if (min <= 10) return `${min}m ${remSec}s`;

  // < 60 minutos -> "Xm"
  if (min < 60) return `${min}m`;

  // >= 60 minutos -> "Hh Mm"
  return `${hrs}h ${remMin}m`;
}

// Aplana el ciclo (con duraciones en segundos) — igual que antes
function flattenCycle(def: CycleDefinition): FlattenedCycleStep[] {
  const flat: FlattenedCycleStep[] = [];
  let accSec = 0;
  let idx = 0;

  const pushStage = (
    st: Stage,
    from: FlattenedCycleStep["from"],
    parentGroupId?: string
  ) => {
    for (let r = 0; r < (st.repeat ?? 1); r++) {
      flat.push({
        index: idx++,
        id: st.id,
        label: st.label ?? st.id,
        duration: st.duration, // seg
        from,
        repeatIndex: r + 1,
        parentGroupId,
        originalStage: st,
        accumulatedTime: accSec, // seg
      });
      accSec += st.duration;
    }
  };

  const insertNode = (
    node: Stage | Group,
    from: FlattenedCycleStep["from"],
    parentGroupId?: string
  ) => {
    if (isStage(node)) pushStage(node, from, parentGroupId);
    else node.stages.forEach((s) => pushStage(s, from, node.id));
  };

  const applyRulesAfter = (
    rules: TransitionRule[] | undefined,
    afterStageId: string,
    cycleRepIndex1: number,
    parentGroupId?: string
  ) => {
    (rules ?? []).forEach((rule) => {
      const hit =
        rule.afterStageId === afterStageId &&
        (!rule.everyXRepeats || cycleRepIndex1 % rule.everyXRepeats === 0);
      if (hit) insertNode(rule.insert, "inserted", parentGroupId);
    });
  };

  for (let rep = 1; rep <= (def.repeat ?? 1); rep++) {
    for (const node of def.steps) {
      if (isStage(node)) {
        pushStage(node, "stage");
        applyRulesAfter(def.rules, node.id, rep);
      } else {
        for (const st of node.stages) {
          pushStage(st, "group", node.id);
          applyRulesAfter(node.rules, st.id, rep, node.id);
        }
        const last = node.stages[node.stages.length - 1];
        if (last) applyRulesAfter(def.rules, last.id, rep, node.id);
      }
    }
  }

  return flat;
}

/** ---------- Hook principal (ms internos) ---------- **/
export function useCycleRunner(
  definition: CycleDefinition,
  opts: UseCycleRunnerOptions = {}
) {
  const {
    tickMs = 200,
    loop = false,
    startIndex = 0,
    onStepChange,
    onFinish,
  } = opts;

  const { playSound } = useStepSound();

  // Aplanado (segundos)
  const flatSteps = useMemo(() => flattenCycle(definition), [definition]);

  // Estado
  const [currentIndex, setCurrentIndex] = useState(
    Math.min(startIndex, Math.max(0, flatSteps.length - 1))
  );
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedInStepMs, setElapsedInStepMs] = useState(0); // ms internos

  // Timer refs
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastTickRef = useRef<number | null>(null);

  const currentStep = flatSteps[currentIndex] ?? null;

  /** ---- Totales en ms (sumando seg -> ms) ---- **/
  const stepDurationsMs = useMemo(
    () => flatSteps.map((s) => s.duration * 1000),
    [flatSteps]
  );
  const totalDurationMs = useMemo(
    () => stepDurationsMs.reduce((a, b) => a + b, 0),
    [stepDurationsMs]
  );
  const prefixDurationMs = useMemo(
    () => stepDurationsMs.slice(0, currentIndex).reduce((a, b) => a + b, 0),
    [stepDurationsMs, currentIndex]
  );

  const totalElapsedMs = prefixDurationMs + elapsedInStepMs;
  const totalRemainingMs = Math.max(0, totalDurationMs - totalElapsedMs);

  const stepDurationMs = (currentStep?.duration ?? 0) * 1000;
  const remainingInStepMs = Math.max(0, stepDurationMs - elapsedInStepMs);

  const progress = totalDurationMs === 0 ? 0 : totalElapsedMs / totalDurationMs;

  /** ---- Timer ---- **/
  const clearTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    lastTickRef.current = null;
  };

  const tick = useCallback(() => {
    const now = Date.now();
    const last = lastTickRef.current ?? now;
    lastTickRef.current = now;
    const delta = now - last;

    setElapsedInStepMs((prev) => {
      const next = prev + delta;
      if (currentStep && next >= stepDurationMs) {
        // Avanza de paso
        setCurrentIndex((idx) => {
          const nextIdx = idx + 1;
          setElapsedInStepMs(0);
          if (nextIdx < flatSteps.length) {
            playSound();
            onStepChange?.(nextIdx, flatSteps[nextIdx]);
            return nextIdx;
          } else {
            if (loop && flatSteps.length > 0) {
              onStepChange?.(0, flatSteps[0]);
              return 0;
            }
            clearTimer();
            setIsRunning(false);
            onFinish?.();
            return idx;
          }
        });
        return stepDurationMs; // clamp visual
      }
      return next;
    });
  }, [currentStep, stepDurationMs, flatSteps, loop, onFinish, onStepChange]);

  const start = useCallback(() => {
    if (!flatSteps.length || isRunning) return;
    setIsRunning(true);
    lastTickRef.current = Date.now();
    timerRef.current = setInterval(tick, tickMs);
    onStepChange?.(currentIndex, currentStep);
  }, [
    flatSteps.length,
    isRunning,
    tick,
    tickMs,
    currentIndex,
    currentStep,
    onStepChange,
  ]);

  const pause = useCallback(() => {
    setIsRunning(false);
    clearTimer();
  }, []);

  const resume = useCallback(() => {
    if (!flatSteps.length || isRunning) return;
    setIsRunning(true);
    lastTickRef.current = Date.now();
    timerRef.current = setInterval(tick, tickMs);
  }, [flatSteps.length, isRunning, tick, tickMs]);

  const reset = useCallback(() => {
    clearTimer();
    setIsRunning(false);
    setCurrentIndex(0);
    setElapsedInStepMs(0);
    onStepChange?.(0, flatSteps[0] ?? null);
  }, [flatSteps, onStepChange]);

  const next = useCallback(() => {
    setCurrentIndex((idx) => {
      const nextIdx = Math.min(idx + 1, flatSteps.length - 1);
      if (nextIdx !== idx) {
        setElapsedInStepMs(0);
        onStepChange?.(nextIdx, flatSteps[nextIdx] ?? null);
      }
      return nextIdx;
    });
  }, [flatSteps, onStepChange]);

  const prev = useCallback(() => {
    setCurrentIndex((idx) => {
      const prevIdx = Math.max(idx - 1, 0);
      if (prevIdx !== idx) {
        setElapsedInStepMs(0);
        onStepChange?.(prevIdx, flatSteps[prevIdx] ?? null);
      }
      return prevIdx;
    });
  }, [flatSteps, onStepChange]);

  const jumpTo = useCallback(
    (i: number) => {
      const clamped = Math.max(0, Math.min(i, flatSteps.length - 1));
      setCurrentIndex(clamped);
      setElapsedInStepMs(0);
      onStepChange?.(clamped, flatSteps[clamped] ?? null);
    },
    [flatSteps, onStepChange]
  );

  /** Reinicio al cambiar la definición */
  useEffect(() => {
    clearTimer();
    setIsRunning(false);
    setCurrentIndex(
      Math.min(opts.startIndex ?? 0, Math.max(0, flatSteps.length - 1))
    );
    setElapsedInStepMs(0);
    if (opts.autostart && flatSteps.length > 0) {
      const id = setTimeout(start, 0);
      return () => clearTimeout(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [definition]);

  useEffect(() => () => clearTimer(), []);

  /** Valores formateados para UI */
  const formatted = useMemo(
    () => ({
      stepRemaining: formatDurationShort(remainingInStepMs),
      totalRemaining: formatDurationShort(totalRemainingMs),
      totalDuration: formatDurationShort(totalDurationMs),
      stepElapsed: formatDurationShort(elapsedInStepMs),
    }),
    [remainingInStepMs, totalRemainingMs, totalDurationMs, elapsedInStepMs]
  );

  const timeline = useMemo(
    () =>
      flatSteps.map((s) => ({
        id: s.id,
        label: s.label ?? undefined,
        durationMs: s.duration * 1000,
      })),
    [flatSteps]
  );

  return {
    // Estado
    isRunning,
    currentIndex,
    currentStep,
    flatSteps,
    timeline,

    // Tiempos en ms
    elapsedInStepMs,
    remainingInStepMs,
    totalDurationMs,
    totalElapsedMs,
    totalRemainingMs,

    // Tiempos formateados cortos (para UI)
    formatted, // { stepRemaining, totalRemaining, totalDuration, stepElapsed }

    // Progreso global 0..1
    progress,

    // Controles
    start,
    pause,
    resume,
    reset,
    next,
    prev,
    jumpTo,
  };
}
