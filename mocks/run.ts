import { CycleDefinition } from "@/types/Timer";

export const pomodoro: CycleDefinition = {
  id: "pomodoro",
  label: "Pomodoro clásico",
  description: "25 trabajo, 5 descanso. Repite 4 veces.",
  repeat: 4,
  steps: [
    {
      id: "focus",
      label: "Trabajo",
      duration: 1500, // 25 minutos
      repeat: 1,
    },
    {
      id: "shortBreak",
      label: "Descanso corto",
      duration: 300, // 5 minutos
      repeat: 1,
    },
  ],
  rules: [
    {
      afterStageId: "shortBreak",
      everyXRepeats: 4,
      insert: {
        id: "longBreak",
        label: "Descanso largo",
        duration: 900, // 15 minutos
        repeat: 1,
      },
    },
  ],
};

export const testCycle: CycleDefinition = {
  id: "runTraining",
  label: "Entrenamiento correr/caminar",
  description: "15s,20s repetir 3 veces",
  repeat: 5,
  steps: [
    {
      id: "runGroup",
      label: "Caminar y correr",
      stages: [
        {
          id: "walk",
          label: "Paso 1",
          duration: 15, // 1 min
          repeat: 1,
        },
        {
          id: "run",
          label: "Paso 2",
          duration: 20, // 3 min
          repeat: 1,
        },
      ],
      groups: [],
      rules: [
        {
          afterStageId: "run",
          everyXRepeats: 1,
          insert: {
            id: "rest",
            label: "Descanso",
            duration: 10, // 3 minutos
            repeat: 1,
          },
        },
      ],
    },
  ],
};

export const runningCycle: CycleDefinition = {
  id: "runTraining",
  label: "Entrenamiento correr/caminar",
  description:
    "1 min caminar + 3 min correr. Descanso de 3 min cada 2 repeticiones. Repetir 5 veces.",
  repeat: 5,
  steps: [
    {
      id: "runGroup",
      label: "Caminar y correr",
      stages: [
        {
          id: "walk",
          label: "Caminar",
          duration: 60, // 1 min
          repeat: 1,
        },
        {
          id: "run",
          label: "Correr",
          duration: 180, // 3 min
          repeat: 1,
        },
      ],
      groups: [],
      rules: [
        {
          afterStageId: "run",
          everyXRepeats: 2,
          insert: {
            id: "rest",
            label: "Descanso",
            duration: 180, // 3 minutos
            repeat: 1,
          },
        },
      ],
    },
  ],
};
