import { LinearSystem, SolverMethod } from '../types';

interface SolutionStep {
  matrix: number[][];
  description: string;
}

interface SolutionResult {
  solution: number[] | null;
  steps: SolutionStep[];
  error?: string;
  determinant?: number;
  rank?: number;
}

export async function solveSystem(
  system: LinearSystem,
  method: SolverMethod
): Promise<SolutionResult> {
  try {
    switch (method) {
      case 'gaussian':
        return solveGaussian(system);
      case 'cramer':
        return solveCramer(system);
      case 'matrix':
        return solveMatrix(system);
      default:
        throw new Error('Unsupported solving method');
    }
  } catch (error) {
    return {
      solution: null,
      steps: [],
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

function calculateDeterminant(matrix: number[][]): number {
  const n = matrix.length;
  if (n === 1) return matrix[0][0];
  if (n === 2) return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];

  let det = 0;
  for (let j = 0; j < n; j++) {
    det += matrix[0][j] * cofactor(matrix, 0, j);
  }
  return det;
}

function cofactor(matrix: number[][], row: number, col: number): number {
  const minor = matrix
    .filter((_, index) => index !== row)
    .map(row => row.filter((_, index) => index !== col));
  return ((row + col) % 2 === 0 ? 1 : -1) * calculateDeterminant(minor);
}

function calculateMatrixRank(matrix: number[][]): number {
  const m = matrix.length;
  const n = matrix[0].length;
  const eps = 1e-10; // Tolerance for floating-point comparisons
  let rank = 0;
  const visited = new Array(n).fill(false);

  for (let col = 0; col < n; col++) {
    let maxRow = -1;
    let maxVal = eps;

    for (let row = rank; row < m; row++) {
      const absVal = Math.abs(matrix[row][col]);
      if (absVal > maxVal && !visited[row]) {
        maxVal = absVal;
        maxRow = row;
      }
    }

    if (maxRow >= 0) {
      rank++;
      visited[maxRow] = true;
      
      // Normalize the pivot row
      const pivot = matrix[maxRow][col];
      for (let j = 0; j < n; j++) {
        matrix[maxRow][j] /= pivot;
      }

      // Eliminate this column from other rows
      for (let row = 0; row < m; row++) {
        if (row !== maxRow && Math.abs(matrix[row][col]) > eps) {
          const factor = matrix[row][col];
          for (let j = 0; j < n; j++) {
            matrix[row][j] -= factor * matrix[maxRow][j];
          }
        }
      }
    }
  }

  return rank;
}

function solveGaussian(system: LinearSystem): SolutionResult {
  const { equations, variables } = system;
  const n = variables.length;
  const m = equations.length;
  
  // Create augmented matrix
  const matrix = equations.map(eq => [...eq.coefficients, eq.constant]);
  const steps: SolutionStep[] = [{
    matrix: matrix.map(row => [...row]),
    description: 'Initial augmented matrix'
  }];

  // Check if system is underdetermined or overdetermined
  if (m !== n) {
    return {
      solution: null,
      steps,
      error: `System is ${m < n ? 'underdetermined' : 'overdetermined'} (${m} equations, ${n} variables)`
    };
  }

  // Gaussian elimination
  for (let i = 0; i < n; i++) {
    // Find pivot
    let maxRow = i;
    for (let j = i + 1; j < n; j++) {
      if (Math.abs(matrix[j][i]) > Math.abs(matrix[maxRow][i])) {
        maxRow = j;
      }
    }

    // Check for singular matrix
    if (Math.abs(matrix[maxRow][i]) < 1e-10) {
      return {
        solution: null,
        steps,
        error: 'System is singular or inconsistent'
      };
    }

    // Swap maximum row with current row if needed
    if (maxRow !== i) {
      [matrix[i], matrix[maxRow]] = [matrix[maxRow], matrix[i]];
      steps.push({
        matrix: matrix.map(row => [...row]),
        description: `Swap row ${i + 1} with row ${maxRow + 1}`
      });
    }

    // Make all rows below this one 0 in current column
    for (let j = i + 1; j < n; j++) {
      const factor = matrix[j][i] / matrix[i][i];
      for (let k = i; k <= n; k++) {
        matrix[j][k] -= factor * matrix[i][k];
      }
      steps.push({
        matrix: matrix.map(row => [...row]),
        description: `Subtract ${factor.toFixed(3)} times row ${i + 1} from row ${j + 1}`
      });
    }
  }

  // Back substitution
  const solution = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    let sum = 0;
    for (let j = i + 1; j < n; j++) {
      sum += matrix[i][j] * solution[j];
    }
    solution[i] = (matrix[i][n] - sum) / matrix[i][i];
  }

  steps.push({
    matrix: matrix.map(row => [...row]),
    description: 'Final result after back substitution'
  });

  // Calculate determinant and rank for additional information
  const coeffMatrix = matrix.map(row => row.slice(0, -1));
  const determinant = calculateDeterminant(coeffMatrix);
  const rank = calculateMatrixRank([...coeffMatrix]);

  return {
    solution,
    steps,
    determinant,
    rank
  };
}

function solveCramer(system: LinearSystem): SolutionResult {
  const { equations, variables } = system;
  const n = variables.length;
  const steps: SolutionStep[] = [];

  if (equations.length !== variables.length) {
    return {
      solution: null,
      steps,
      error: 'Cramer\'s rule requires a square system (same number of equations and variables)'
    };
  }

  // Create coefficient matrix and constants vector
  const A = equations.map(eq => [...eq.coefficients]);
  const b = equations.map(eq => eq.constant);

  // Calculate main determinant
  const D = calculateDeterminant(A);
  if (Math.abs(D) < 1e-10) {
    return {
      solution: null,
      steps,
      error: 'System is singular (determinant is zero)'
    };
  }

  steps.push({
    matrix: A,
    description: `Main determinant D = ${D.toFixed(4)}`
  });

  // Calculate determinant for each variable
  const solution = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    // Create matrix Ai by replacing i-th column with constants
    const Ai = A.map((row, r) => row.map((val, c) => c === i ? b[r] : val));
    const Di = calculateDeterminant(Ai);
    solution[i] = Di / D;

    steps.push({
      matrix: Ai,
      description: `D${variables[i]} = ${Di.toFixed(4)}, ${variables[i]} = ${solution[i].toFixed(4)}`
    });
  }

  return {
    solution,
    steps,
    determinant: D,
    rank: n
  };
}

function solveMatrix(system: LinearSystem): SolutionResult {
  const { equations, variables } = system;
  const n = variables.length;
  const m = equations.length;
  
  // Create coefficient matrix A and constants vector b
  const A = equations.map(eq => [...eq.coefficients]);
  const b = equations.map(eq => eq.constant);
  
  const steps: SolutionStep[] = [{
    matrix: A,
    description: 'Coefficient matrix'
  }];

  // Calculate determinant and rank
  const determinant = calculateDeterminant(A);
  const rank = calculateMatrixRank([...A]);

  // Check if system has a unique solution
  if (Math.abs(determinant) < 1e-10) {
    return {
      solution: null,
      steps,
      error: 'Matrix is singular, system may have no solution or infinite solutions',
      determinant,
      rank
    };
  }

  // For a unique solution, use Gaussian elimination (more numerically stable than direct matrix inversion)
  return solveGaussian(system);
}
