/**
 * Matrix type definition
 * Used by various math visualizers
 */
export type Matrix = number[][];

/**
 * Creates a new matrix with the specified dimensions
 * @param rows Number of rows
 * @param cols Number of columns
 * @param fillValue Value to fill the matrix with (default: 0)
 */
export function createMatrix(rows: number, cols: number, fillValue: number = 0): Matrix {
  return Array(rows).fill(null).map(() => Array(cols).fill(fillValue));
}

/**
 * Multiplies two matrices
 * @param a First matrix
 * @param b Second matrix
 * @returns The product of the matrices
 */
export function multiplyMatrices(a: Matrix, b: Matrix): Matrix | null {
  if (a[0].length !== b.length) {
    return null; // Matrices cannot be multiplied
  }
  
  const result = createMatrix(a.length, b[0].length);
  
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b[0].length; j++) {
      for (let k = 0; k < b.length; k++) {
        result[i][j] += a[i][k] * b[k][j];
      }
    }
  }
  
  return result;
}

/**
 * Formats a number with proper rounding and precision
 * @param value The number to format
 * @param precision Number of decimal places
 * @returns Formatted string representation
 */
export function formatNumber(value: number, precision: number = 4): string {
  return value.toFixed(precision);
}

/**
 * Converts degrees to radians
 * @param degrees Angle in degrees
 * @returns Angle in radians
 */
export function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Converts radians to degrees
 * @param radians Angle in radians
 * @returns Angle in degrees
 */
export function radiansToDegrees(radians: number): number {
  return radians * (180 / Math.PI);
}

/**
 * Calculates the greatest common divisor of two numbers
 * @param a First number
 * @param b Second number
 * @returns Greatest common divisor
 */
export function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

/**
 * Calculates the least common multiple of two numbers
 * @param a First number
 * @param b Second number
 * @returns Least common multiple
 */
export function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b);
} 