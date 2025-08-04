// Basic identifiable entity with optional labels and descriptions
interface BasicIdentifier {
  id: string;
  label?: string;
  description?: string;
}

// A single actionable stage
export interface Stage extends BasicIdentifier {
  duration: number; // in seconds
  repeat: number; // number of times to repeat this stage
}

// A rule to insert a stage or group after a specific stage, optionally every N repeats
export interface TransitionRule {
  afterStageId: BasicIdentifier["id"];
  insert: Stage | Group;
  everyXRepeats?: number;
  maxDuration?: number;
  repeat?: number;
}

// A group of stages or nested groups, plus optional rules
export interface Group extends BasicIdentifier {
  stages: Stage[];
  groups?: Group[]; // optional to avoid enforcing it
  rules?: TransitionRule[]; // allow optional too
}

// A full cycle, composed of stages or groups, and optional global rules
export interface CycleDefinition extends BasicIdentifier {
  steps: (Stage | Group)[];
  rules?: TransitionRule[];
  repeat: number;
}

export interface FlattenedCycleStep {
  index: number; // Position in the full sequence
  id: string; // ID from the original Stage
  label: string; // Label from the original Stage or generated
  duration: number; // In seconds
  from: "stage" | "group" | "inserted"; // Origin of the step
  repeatIndex: number; // Which repetition of this stage
  parentGroupId?: string; // If it comes from inside a group
  originalStage: Stage; // The original stage definition
  accumulatedTime: number; // Time in seconds accumulated up to this step
}
