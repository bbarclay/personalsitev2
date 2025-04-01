export interface MatrixCell {
  value: number;
  isKnown: boolean;
  isHighlighted: boolean;
  confidence: number;
}

export interface MatrixCompletionState {
  matrix: MatrixCell[][];
  completedMatrix: number[][] | null;
  rank: number;
  tolerance: number;
  metrics: {
    rank: number;
    error: number;
    iterations: number;
    convergenceTime: number;
    singularValues: number[];
    nuclearNorm: number;
    coherence: number;
  };
  isProcessing: boolean;
  error: string | null;
  animationStep: number;
}