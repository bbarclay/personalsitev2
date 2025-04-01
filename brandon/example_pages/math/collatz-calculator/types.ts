
export interface CalculationResult {
  sequence: Array<{ step: number; value: number }>;
  maxValue: number;
  totalSteps: number;
  startNumber: number;
}

// ...existing types...
