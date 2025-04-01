export interface LinearEquation {
  coefficients: number[];
  constant: number;
}

export interface LinearSystem {
  equations: LinearEquation[];
  variables: string[];
}

export interface SolutionStep {
  matrix: number[][];
  description: string;
}

export interface SolverResult {
  solution: number[] | null;
  steps: SolutionStep[];
  error?: string;
  determinant?: number;
  rank?: number;
}

export interface SolverState {
  system: LinearSystem;
  variables: string[];
  result: SolverResult | null;
  isLoading: boolean;
  currentStep: number;
}

export type SolverMethod = 'gaussian' | 'cramer' | 'matrix';

export type SystemFormat = 'standard' | 'matrix' | 'augmented';

export interface MethodInfo {
  id: SolverMethod;
  name: string;
  description: string;
  bestFor: string[];
  limitations: string[];
}

export const SOLVER_METHODS: MethodInfo[] = [
  {
    id: 'gaussian',
    name: 'Gaussian Elimination',
    description: 'Solves the system by converting to row echelon form and back substitution',
    bestFor: [
      'Systems of any size',
      'General purpose solving',
      'Step-by-step visualization'
    ],
    limitations: [
      'May have numerical stability issues with very large systems',
      'Requires pivoting for accuracy'
    ]
  },
  {
    id: 'cramer',
    name: "Cramer's Rule",
    description: 'Uses determinants to find solutions for each variable',
    bestFor: [
      'Small systems (2-3 variables)',
      'Theoretical understanding',
      'Exact solutions'
    ],
    limitations: [
      'Computationally expensive for large systems',
      'Requires square system (same number of equations and variables)',
      'Cannot handle singular systems'
    ]
  },
  {
    id: 'matrix',
    name: 'Matrix Method',
    description: 'Solves the system using matrix operations',
    bestFor: [
      'Understanding matrix relationships',
      'Systems with special matrix properties',
      'Quick theoretical analysis'
    ],
    limitations: [
      'May be less numerically stable than Gaussian elimination',
      'Requires understanding of matrix operations',
      'Cannot handle singular matrices'
    ]
  }
];

export const DEFAULT_VARIABLES = ['x', 'y', 'z'];

export const EXAMPLE_SYSTEMS = [
  {
    name: 'Simple 2x2',
    equations: [
      '2x + y = 5',
      'x - y = 1'
    ],
    description: 'A basic system with a unique solution'
  },
  {
    name: 'Simple 3x3',
    equations: [
      'x + y + z = 6',
      '2x - y + z = 7',
      '3x + y - z = 8'
    ],
    description: 'A three-variable system with integer coefficients'
  },
  {
    name: 'Singular System',
    equations: [
      'x + y = 2',
      '2x + 2y = 4'
    ],
    description: 'A system with infinitely many solutions (dependent equations)'
  },
  {
    name: 'Inconsistent System',
    equations: [
      'x + y = 3',
      'x + y = 4'
    ],
    description: 'A system with no solution (contradictory equations)'
  }
];
