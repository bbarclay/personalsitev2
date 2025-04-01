/**
 * Utility functions for matrix operations and linear algebra
 */

/**
 * Calculate the determinant of a square matrix
 * @param matrix - Square matrix as a 2D array of numbers
 * @returns The determinant value or null if the matrix is not square
 */
export function calculateDeterminant(matrix: number[][]): number | null {
  // Check if the matrix is square
  const n = matrix.length;
  if (!matrix.every(row => row.length === n)) {
    return null; // Not a square matrix
  }
  
  // Base cases for small matrices
  if (n === 1) {
    return matrix[0][0];
  }
  
  if (n === 2) {
    return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
  }
  
  // For larger matrices, use cofactor expansion along the first row
  let det = 0;
  for (let j = 0; j < n; j++) {
    det += matrix[0][j] * getCofactor(matrix, 0, j);
  }
  
  return det;
}

/**
 * Calculate the cofactor of an element in a matrix
 * @param matrix - Original matrix
 * @param row - Row index of the element
 * @param col - Column index of the element
 * @returns The cofactor value (determinant of the minor with sign)
 */
function getCofactor(matrix: number[][], row: number, col: number): number {
  const minor = getMinor(matrix, row, col);
  const determinant = calculateDeterminant(minor);
  // Multiply by (-1)^(i+j) to get the cofactor
  return ((row + col) % 2 === 0 ? 1 : -1) * (determinant as number);
}

/**
 * Get the minor of a matrix by removing a specified row and column
 * @param matrix - Original matrix
 * @param row - Row index to remove
 * @param col - Column index to remove
 * @returns A new matrix with the specified row and column removed
 */
function getMinor(matrix: number[][], row: number, col: number): number[][] {
  const minor: number[][] = [];
  const n = matrix.length;
  
  for (let i = 0; i < n; i++) {
    if (i === row) continue;
    
    const newRow: number[] = [];
    for (let j = 0; j < n; j++) {
      if (j === col) continue;
      newRow.push(matrix[i][j]);
    }
    
    minor.push(newRow);
  }
  
  return minor;
}

/**
 * Check if a matrix is singular (determinant is zero)
 * @param matrix - Square matrix
 * @returns True if the matrix is singular
 */
export function isMatrixSingular(matrix: number[][]): boolean {
  const det = calculateDeterminant(matrix);
  return det === null ? false : Math.abs(det) < 1e-10;
}

/**
 * Check if a linear system is consistent (has at least one solution)
 * System is represented as Ax = b
 * @param matrixA - Coefficient matrix
 * @param vectorB - Right-hand side vector
 * @returns Object indicating consistency and solution type
 */
export function analyzeLinearSystem(matrixA: number[][], vectorB: number[]): { 
  isConsistent: boolean; 
  hasSingleSolution: boolean;
  hasInfiniteSolutions: boolean;
  hasNoSolution: boolean;
  rank?: number;
} {
  // Create the augmented matrix [A|b]
  const augmentedMatrix = matrixA.map((row, i) => [...row, vectorB[i]]);
  
  // Calculate rank of coefficient matrix A
  const rankA = calculateRank(matrixA);
  
  // Calculate rank of augmented matrix [A|b]
  const rankAugmented = calculateRank(augmentedMatrix);
  
  // Analyze system based on ranks
  // If rank(A) = rank([A|b]) = n, unique solution
  // If rank(A) = rank([A|b]) < n, infinitely many solutions
  // If rank(A) < rank([A|b]), no solution
  
  const n = matrixA.length; // Number of unknowns (assuming square matrix)
  const isConsistent = rankA === rankAugmented;
  const hasSingleSolution = isConsistent && rankA === n;
  const hasInfiniteSolutions = isConsistent && rankA < n;
  const hasNoSolution = rankA < rankAugmented;
  
  return {
    isConsistent,
    hasSingleSolution,
    hasInfiniteSolutions,
    hasNoSolution,
    rank: rankA
  };
}

/**
 * Calculate the rank of a matrix (maximum number of linearly independent rows/columns)
 * @param matrix - The input matrix
 * @returns The rank of the matrix
 */
function calculateRank(matrix: number[][]): number {
  if (matrix.length === 0 || matrix[0].length === 0) return 0;
  
  // Make a copy of the matrix to avoid modifying the original
  const m = matrix.map(row => [...row]);
  
  const numRows = m.length;
  const numCols = m[0].length;
  
  // Convert to row echelon form using Gaussian elimination
  let rank = 0;
  const rows = new Array(numRows).fill(false); // Tracks which rows have been processed
  
  for (let col = 0; col < numCols; col++) {
    for (let row = 0; row < numRows; row++) {
      if (!rows[row] && Math.abs(m[row][col]) > 1e-10) {
        // Found a pivot
        rows[row] = true;
        rank++;
        
        // Normalize the pivot row
        const pivot = m[row][col];
        for (let c = col; c < numCols; c++) {
          m[row][c] /= pivot;
        }
        
        // Eliminate below
        for (let r = 0; r < numRows; r++) {
          if (r !== row && Math.abs(m[r][col]) > 1e-10) {
            const factor = m[r][col];
            for (let c = col; c < numCols; c++) {
              m[r][c] -= factor * m[row][c];
            }
          }
        }
        
        break; // Move to next column
      }
    }
  }
  
  return rank;
}

/**
 * Convert a matrix in Row Echelon Form (REF) to Reduced Row Echelon Form (RREF)
 * This continues the Gaussian elimination process to also make zeros above the pivots
 * and scale pivots to 1.
 * 
 * @param matrix - The matrix in REF (can include the augmented column)
 * @returns The matrix in RREF, with steps for visualization
 */
export function convertToRREF(
  matrix: number[][],
  vector?: number[]
): { 
  matrix: number[][];
  vector?: number[];
  steps: Array<{
    matrix: number[][];
    vector?: number[];
    explanation: string;
    highlight?: { type: 'row' | 'col' | 'element'; index: number | [number, number] };
  }>;
} {
  // Whether we're working with an augmented matrix or separate matrix+vector
  const hasVector = vector !== undefined;
  
  // Make copies to avoid modifying the originals
  const m = matrix.map(row => [...row]);
  const v = vector ? [...vector] : undefined;
  
  const numRows = m.length;
  const numCols = m[0].length;
  
  // Array to store steps for visualization
  const steps: Array<{
    matrix: number[][];
    vector?: number[];
    explanation: string;
    highlight?: { type: 'row' | 'col' | 'element'; index: number | [number, number] };
  }> = [];
  
  // Find the pivot positions (row, col) in REF
  const pivots: Array<[number, number]> = [];
  let pivotRow = 0;
  
  for (let col = 0; col < numCols && pivotRow < numRows; col++) {
    // Check if this column has a pivot
    if (Math.abs(m[pivotRow][col]) > 1e-10) {
      pivots.push([pivotRow, col]);
      pivotRow++;
    }
  }
  
  // Process pivots in reverse order (bottom to top)
  for (let i = pivots.length - 1; i >= 0; i--) {
    const [row, col] = pivots[i];
    
    // Scale the pivot row to make the pivot 1 (if it's not already)
    if (Math.abs(m[row][col] - 1) > 1e-10) {
      const scalar = 1 / m[row][col];
      
      // Multiply the row by scalar
      for (let j = 0; j < numCols; j++) {
        m[row][j] *= scalar;
      }
      
      // Also update the vector if it's separate
      if (hasVector && v) {
        v[row] *= scalar;
      }
      
      // Record the step
      steps.push({
        matrix: m.map(row => [...row]),
        vector: v ? [...v] : undefined,
        explanation: `Scale row ${row + 1} by ${scalar.toFixed(4)} to make the pivot 1`,
        highlight: { type: 'row', index: row }
      });
    }
    
    // Eliminate above the pivot
    for (let r = 0; r < row; r++) {
      if (Math.abs(m[r][col]) > 1e-10) {
        const factor = m[r][col];
        
        // Subtract factor * pivot row from row r
        for (let c = 0; c < numCols; c++) {
          m[r][c] -= factor * m[row][c];
          
          // Handle floating point errors - set very small values to 0
          if (Math.abs(m[r][c]) < 1e-10) {
            m[r][c] = 0;
          }
        }
        
        // Also update the vector if it's separate
        if (hasVector && v) {
          v[r] -= factor * v[row];
          if (Math.abs(v[r]) < 1e-10) {
            v[r] = 0;
          }
        }
        
        // Record the step
        steps.push({
          matrix: m.map(row => [...row]),
          vector: v ? [...v] : undefined,
          explanation: `Subtract ${factor.toFixed(4)} times row ${row + 1} from row ${r + 1} to make element (${r + 1},${col + 1}) zero`,
          highlight: { type: 'element', index: [r, col] }
        });
      }
    }
  }
  
  // Handle case with no steps (already in RREF)
  if (steps.length === 0) {
    steps.push({
      matrix: m.map(row => [...row]),
      vector: v ? [...v] : undefined,
      explanation: 'Matrix is already in Reduced Row Echelon Form (RREF)',
    });
  }
  
  return {
    matrix: m,
    vector: v,
    steps
  };
} 