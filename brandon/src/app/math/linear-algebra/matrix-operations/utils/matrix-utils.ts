export type Matrix = number[][];

export interface Step {
  explanation: string;
  matrices?: { 
    label: string;
    matrix: Matrix;
  }[];
  result?: Matrix;
}

export interface OperationResult {
  result: Matrix | null;
  steps: Step[];
  error?: string;
}

// Helper to check if dimensions are valid for addition/subtraction
export function canAddSubtract(matrixA: Matrix, matrixB: Matrix): boolean {
  if (matrixA.length !== matrixB.length) return false;
  if (matrixA.length === 0) return false;
  
  const rowLengthA = matrixA[0].length;
  const rowLengthB = matrixB[0].length;
  
  return rowLengthA === rowLengthB;
}

// Helper to check if dimensions are valid for multiplication
export function canMultiply(matrixA: Matrix, matrixB: Matrix): boolean {
  if (matrixA.length === 0 || matrixB.length === 0) return false;
  
  const colsA = matrixA[0].length;
  const rowsB = matrixB.length;
  
  return colsA === rowsB;
}

// Helper to get dimensions of a matrix
export function getDimensions(matrix: Matrix): [number, number] {
  if (matrix.length === 0) return [0, 0];
  return [matrix.length, matrix[0].length];
}

// Add two matrices
export function addMatrices(matrixA: Matrix, matrixB: Matrix): OperationResult {
  const steps: Step[] = [];
  
  if (!canAddSubtract(matrixA, matrixB)) {
    return {
      result: null,
      steps,
      error: 'Matrices must have the same dimensions for addition'
    };
  }
  
  const [rows, cols] = getDimensions(matrixA);
  
  steps.push({
    explanation: 'To add two matrices, add the corresponding elements',
    matrices: [
      { label: 'Matrix A', matrix: matrixA },
      { label: 'Matrix B', matrix: matrixB }
    ]
  });
  
  // Create the result matrix
  const result: Matrix = [];
  for (let i = 0; i < rows; i++) {
    const row: number[] = [];
    for (let j = 0; j < cols; j++) {
      row.push(matrixA[i][j] + matrixB[i][j]);
    }
    result.push(row);
  }
  
  steps.push({
    explanation: 'Adding corresponding elements',
    result
  });
  
  return {
    result,
    steps
  };
}

// Subtract two matrices
export function subtractMatrices(matrixA: Matrix, matrixB: Matrix): OperationResult {
  const steps: Step[] = [];
  
  if (!canAddSubtract(matrixA, matrixB)) {
    return {
      result: null,
      steps,
      error: 'Matrices must have the same dimensions for subtraction'
    };
  }
  
  const [rows, cols] = getDimensions(matrixA);
  
  steps.push({
    explanation: 'To subtract two matrices, subtract the corresponding elements',
    matrices: [
      { label: 'Matrix A', matrix: matrixA },
      { label: 'Matrix B', matrix: matrixB }
    ]
  });
  
  // Create the result matrix
  const result: Matrix = [];
  for (let i = 0; i < rows; i++) {
    const row: number[] = [];
    for (let j = 0; j < cols; j++) {
      row.push(matrixA[i][j] - matrixB[i][j]);
    }
    result.push(row);
  }
  
  steps.push({
    explanation: 'Subtracting corresponding elements',
    result
  });
  
  return {
    result,
    steps
  };
}

// Multiply two matrices
export function multiplyMatrices(matrixA: Matrix, matrixB: Matrix): OperationResult {
  const steps: Step[] = [];
  
  if (!canMultiply(matrixA, matrixB)) {
    return {
      result: null,
      steps,
      error: 'Number of columns in the first matrix must equal the number of rows in the second matrix'
    };
  }
  
  const [rowsA, colsA] = getDimensions(matrixA);
  const [rowsB, colsB] = getDimensions(matrixB);
  
  steps.push({
    explanation: `To multiply matrices, the first matrix must have dimensions m×n and the second n×p, resulting in a matrix of dimensions m×p. Here, Matrix A is ${rowsA}×${colsA} and Matrix B is ${rowsB}×${colsB}.`,
    matrices: [
      { label: 'Matrix A', matrix: matrixA },
      { label: 'Matrix B', matrix: matrixB }
    ]
  });
  
  // Create the result matrix
  const result: Matrix = [];
  for (let i = 0; i < rowsA; i++) {
    const row: number[] = [];
    for (let j = 0; j < colsB; j++) {
      let sum = 0;
      for (let k = 0; k < colsA; k++) {
        sum += matrixA[i][k] * matrixB[k][j];
      }
      row.push(sum);
    }
    result.push(row);
  }
  
  steps.push({
    explanation: 'Each element c_ij in the resulting matrix is the dot product of the i-th row of Matrix A and the j-th column of Matrix B',
    result
  });
  
  return {
    result,
    steps
  };
}

// Transpose a matrix
export function transposeMatrix(matrix: Matrix): OperationResult {
  const steps: Step[] = [];
  
  if (matrix.length === 0) {
    return {
      result: [],
      steps,
      error: 'Matrix cannot be empty'
    };
  }
  
  const [rows, cols] = getDimensions(matrix);
  
  steps.push({
    explanation: 'To transpose a matrix, swap its rows and columns',
    matrices: [
      { label: 'Original Matrix', matrix }
    ]
  });
  
  // Create the result matrix
  const result: Matrix = [];
  for (let j = 0; j < cols; j++) {
    const newRow: number[] = [];
    for (let i = 0; i < rows; i++) {
      newRow.push(matrix[i][j]);
    }
    result.push(newRow);
  }
  
  steps.push({
    explanation: `The transposed matrix has dimensions ${cols}×${rows}`,
    result
  });
  
  return {
    result,
    steps
  };
}

// Calculate the determinant of a 2x2 or 3x3 matrix
export function calculateDeterminant(matrix: Matrix): OperationResult {
  const steps: Step[] = [];
  
  const [rows, cols] = getDimensions(matrix);
  
  if (rows !== cols) {
    return {
      result: null,
      steps,
      error: 'Matrix must be square to calculate determinant'
    };
  }
  
  if (rows === 0) {
    return {
      result: null,
      steps,
      error: 'Matrix cannot be empty'
    };
  }
  
  if (rows > 3) {
    return {
      result: null,
      steps,
      error: 'Determinant calculation is currently supported only for 2x2 and 3x3 matrices'
    };
  }
  
  steps.push({
    explanation: 'Calculate the determinant of the matrix',
    matrices: [
      { label: 'Matrix', matrix }
    ]
  });
  
  let determinant = 0;
  
  if (rows === 1) {
    determinant = matrix[0][0];
    steps.push({
      explanation: `For a 1x1 matrix, the determinant is simply the value: ${determinant}`,
    });
  } else if (rows === 2) {
    // For 2x2 matrix
    determinant = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    steps.push({
      explanation: `For a 2x2 matrix, the determinant is calculated as (a*d - b*c): (${matrix[0][0]} × ${matrix[1][1]}) - (${matrix[0][1]} × ${matrix[1][0]}) = ${determinant}`,
    });
  } else if (rows === 3) {
    // For 3x3 matrix using the rule of Sarrus
    determinant = 
      matrix[0][0] * matrix[1][1] * matrix[2][2] +
      matrix[0][1] * matrix[1][2] * matrix[2][0] +
      matrix[0][2] * matrix[1][0] * matrix[2][1] -
      matrix[0][2] * matrix[1][1] * matrix[2][0] -
      matrix[0][0] * matrix[1][2] * matrix[2][1] -
      matrix[0][1] * matrix[1][0] * matrix[2][2];
    
    steps.push({
      explanation: 'For a 3x3 matrix, calculate using the rule of Sarrus (the sum of the products of the elements on the main diagonals minus the sum of the products of the elements on the secondary diagonals)',
    });
    
    steps.push({
      explanation: `Calculated determinant: ${determinant}`,
    });
  }
  
  const result: Matrix = [[determinant]];
  
  return {
    result,
    steps
  };
}

// Create an identity matrix of given size
export function createIdentityMatrix(size: number): Matrix {
  if (size <= 0) return [];
  
  const result: Matrix = [];
  for (let i = 0; i < size; i++) {
    const row: number[] = Array(size).fill(0);
    row[i] = 1;
    result.push(row);
  }
  
  return result;
}

// Scale a matrix by a scalar value
export function scaleMatrix(matrix: Matrix, scalar: number): OperationResult {
  const steps: Step[] = [];
  
  if (matrix.length === 0) {
    return {
      result: [],
      steps,
      error: 'Matrix cannot be empty'
    };
  }
  
  steps.push({
    explanation: `Multiply each element of the matrix by the scalar value ${scalar}`,
    matrices: [
      { label: 'Original Matrix', matrix }
    ]
  });
  
  // Create the result matrix
  const result: Matrix = matrix.map(row => row.map(value => value * scalar));
  
  steps.push({
    explanation: 'Result after scaling',
    result
  });
  
  return {
    result,
    steps
  };
} 