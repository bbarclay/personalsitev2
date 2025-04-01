import { DEFAULT_PRECISION, MAX_ITERATIONS } from '../constants';

// Types
export interface HAPDResult {
  sequence: { a1: number; a2: number }[];
  triples: { v1: number; v2: number; v3: number }[];
  periodicIndex: number; // -1 if not periodic
  periodLength: number;
  preperiodLength: number;
  terminatedEarly: boolean;
  reason: string;
}

export interface MatrixVerificationResult {
  isCubicIrrational: boolean;
  minimalPolynomial: { a: number; b: number; c: number };
  traceRelations: { k: number; actual: number; expected: number; difference: number }[];
  eigenvalues: number[];
}

export interface CubicIrrationalResult {
  value: number;
  name: string;
  hapdResult: HAPDResult;
  matrixResult: MatrixVerificationResult;
  isRational: boolean;
  isQuadratic: boolean;
  isCubic: boolean;
  isHigherDegree: boolean;
  isTranscendental: boolean;
}

// Helper function to determine if two normalized triples are projectively equivalent
export function projectivelyEquivalent(
  triple1: { v1: number; v2: number; v3: number },
  triple2: { v1: number; v2: number; v3: number },
  tolerance: number = DEFAULT_PRECISION
): boolean {
  // Normalize triples
  const norm1 = Math.sqrt(triple1.v1 * triple1.v1 + triple1.v2 * triple1.v2 + triple1.v3 * triple1.v3);
  const norm2 = Math.sqrt(triple2.v1 * triple2.v1 + triple2.v2 * triple2.v2 + triple2.v3 * triple2.v3);

  const unit1 = {
    v1: triple1.v1 / norm1,
    v2: triple1.v2 / norm1,
    v3: triple1.v3 / norm1
  };

  const unit2 = {
    v1: triple2.v1 / norm2,
    v2: triple2.v2 / norm2,
    v3: triple2.v3 / norm2
  };

  // Compute dot product
  const dotProduct = unit1.v1 * unit2.v1 + unit1.v2 * unit2.v2 + unit1.v3 * unit2.v3;

  // Check if dot product is close to 1 (same direction) or -1 (opposite direction)
  return Math.abs(Math.abs(dotProduct) - 1) < tolerance;
}

// Encoding function for pairs of integers to natural numbers
export function encodeIntegerPair(a: number, b: number): number {
  // Using the encoding function from the paper
  // E(a,b) = 2^|a| * 3^|b| * 5^(sgn(a)+1) * 7^(sgn(b)+1)
  const signA = a > 0 ? 1 : (a < 0 ? -1 : 0);
  const signB = b > 0 ? 1 : (b < 0 ? -1 : 0);

  return Math.pow(2, Math.abs(a)) *
         Math.pow(3, Math.abs(b)) *
         Math.pow(5, signA + 1) *
         Math.pow(7, signB + 1);
}

// Implementation of the HAPD Algorithm
export function runHAPDAlgorithm(
  alpha: number,
  maxIterations: number = MAX_ITERATIONS,
  tolerance: number = DEFAULT_PRECISION
): HAPDResult {
  // Initialize
  let v1 = alpha;
  let v2 = alpha * alpha;
  let v3 = 1;

  const sequence: { a1: number; a2: number }[] = [];
  const triples: { v1: number; v2: number; v3: number }[] = [];

  let periodicIndex = -1;
  let periodLength = 0;
  let terminatedEarly = false;
  let reason = "Completed all iterations without finding periodicity or termination";

  // Store the initial triple
  triples.push({ v1, v2, v3 });

  for (let i = 0; i < maxIterations; i++) {
    // Compute integer parts
    const a1 = Math.floor(v1 / v3);
    const a2 = Math.floor(v2 / v3);

    // Calculate remainders
    const r1 = v1 - a1 * v3;
    const r2 = v2 - a2 * v3;

    // Update v3
    const newV3 = v3 - a1 * r1 - a2 * r2;

    // Record the pair
    sequence.push({ a1, a2 });

    // Check for termination (division by zero or very small number)
    if (Math.abs(newV3) < tolerance) {
      terminatedEarly = true;
      reason = "Terminated: v3 approached zero";
      break;
    }

    // Update the triple
    v1 = r1;
    v2 = r2;
    v3 = newV3;

    // Store the new triple
    const newTriple = { v1, v2, v3 };
    triples.push(newTriple);

    // Check for periodicity
    for (let j = 0; j < triples.length - 1; j++) {
      if (projectivelyEquivalent(newTriple, triples[j], tolerance)) {
        periodicIndex = j;
        periodLength = i - j + 1;
        reason = "Found periodicity";
        break;
      }
    }

    if (periodicIndex !== -1) {
      break;
    }
  }

  return {
    sequence,
    triples,
    periodicIndex,
    periodLength,
    preperiodLength: periodicIndex !== -1 ? periodicIndex : 0,
    terminatedEarly,
    reason
  };
}

// Find approximate minimal polynomial using PSLQ-like approach
// Note: In a real implementation, you would use a proper PSLQ or LLL algorithm
export function findApproximateCubicPolynomial(
  alpha: number,
  tolerance: number = DEFAULT_PRECISION
): { a: number; b: number; c: number } {
  // For simplicity, we'll try some basic values for the coefficients
  // This is not a robust implementation and would need improvement for a real-world use case

  // Try coefficients up to a certain bound
  const maxCoeff = 20;
  let bestError = Infinity;
  let bestCoeffs = { a: 0, b: 0, c: 0 };

  for (let a = -maxCoeff; a <= maxCoeff; a++) {
    for (let b = -maxCoeff; b <= maxCoeff; b++) {
      for (let c = -maxCoeff; c <= maxCoeff; c++) {
        if (a === 0 && b === 0 && c === 0) continue; // Skip trivial case

        // Evaluate polynomial at alpha
        const value = Math.pow(alpha, 3) + a * Math.pow(alpha, 2) + b * alpha + c;
        const error = Math.abs(value);

        if (error < bestError) {
          bestError = error;
          bestCoeffs = { a, b, c };
        }
      }
    }
  }

  // Check if the error is small enough
  if (bestError > tolerance) {
    // Return null coefficients if no good fit found
    return { a: 0, b: 0, c: 0 };
  }

  return bestCoeffs;
}

// Compute companion matrix for a cubic polynomial
export function computeCompanionMatrix(a: number, b: number, c: number): number[][] {
  return [
    [0, 0, -c],
    [1, 0, -b],
    [0, 1, -a]
  ];
}

// Multiply matrices
export function multiplyMatrices(a: number[][], b: number[][]): number[][] {
  const result: number[][] = [];
  for (let i = 0; i < a.length; i++) {
    result[i] = [];
    for (let j = 0; j < b[0].length; j++) {
      let sum = 0;
      for (let k = 0; k < a[0].length; k++) {
        sum += a[i][k] * b[k][j];
      }
      result[i][j] = sum;
    }
  }
  return result;
}

// Compute trace of a matrix
export function computeTrace(matrix: number[][]): number {
  let trace = 0;
  for (let i = 0; i < matrix.length; i++) {
    trace += matrix[i][i];
  }
  return trace;
}

// Compute powers of a matrix
export function computeMatrixPower(matrix: number[][], power: number): number[][] {
  if (power === 0) {
    // Return identity matrix of the same size
    const identity: number[][] = [];
    for (let i = 0; i < matrix.length; i++) {
      identity[i] = [];
      for (let j = 0; j < matrix.length; j++) {
        identity[i][j] = i === j ? 1 : 0;
      }
    }
    return identity;
  }

  if (power === 1) {
    return matrix;
  }

  // Use exponentiation by squaring for efficiency
  if (power % 2 === 0) {
    const halfPower = computeMatrixPower(matrix, power / 2);
    return multiplyMatrices(halfPower, halfPower);
  } else {
    const halfPower = computeMatrixPower(matrix, (power - 1) / 2);
    return multiplyMatrices(matrix, multiplyMatrices(halfPower, halfPower));
  }
}

// Matrix-based verification of cubic irrationals
export function verifyWithMatrixMethod(
  alpha: number,
  tolerance: number = DEFAULT_PRECISION
): MatrixVerificationResult {
  // Find approximate minimal polynomial
  const { a, b, c } = findApproximateCubicPolynomial(alpha, tolerance);

  // If no good polynomial fit found, return negative result
  if (a === 0 && b === 0 && c === 0) {
    return {
      isCubicIrrational: false,
      minimalPolynomial: { a, b, c },
      traceRelations: [],
      eigenvalues: []
    };
  }

  // Compute companion matrix
  const companionMatrix = computeCompanionMatrix(a, b, c);

  // Compute eigenvalues (in a real implementation, you would use a numerical method)
  // For now, we'll use a simplified approach
  const eigenvalues = findRootsOfCubic(1, a, b, c);

  // Compute powers and traces
  const matrixPowers: number[][][] = [];
  const traces: number[] = [];

  for (let k = 0; k < 6; k++) {
    matrixPowers[k] = computeMatrixPower(companionMatrix, k);
    traces[k] = computeTrace(matrixPowers[k]);
  }

  // Verify trace relations for k ≥ 3
  const traceRelations = [];

  for (let k = 3; k < 6; k++) {
    const expected = -a * traces[k-1] - b * traces[k-2] - c * traces[k-3];
    const actual = traces[k];
    const difference = Math.abs(actual - expected);

    traceRelations.push({
      k,
      actual,
      expected,
      difference
    });
  }

  // Check if all trace relations are satisfied within tolerance
  const isCubicIrrational = traceRelations.every(relation => relation.difference < tolerance);

  return {
    isCubicIrrational,
    minimalPolynomial: { a, b, c },
    traceRelations,
    eigenvalues
  };
}

// Simplified cubic equation solver
export function findRootsOfCubic(a: number, b: number, c: number, d: number): number[] {
  // Implement a simple cubic equation solver
  // In a real implementation, you would use more robust numerical methods

  // For cube roots of small integers, we know the roots
  // Special cases for demo purposes
  if (a === 1 && b === 0 && c === 0 && d === -2) {
    // x^3 - 2 = 0
    // Return only the real root for visualization purposes
    return [Math.pow(2, 1/3)];
  }
  if (a === 1 && b === 0 && c === 0 && d === -3) {
    // x^3 - 3 = 0
    // Return only the real root for visualization purposes
    return [Math.pow(3, 1/3)];
  }

  // For general cubic, we'll use a numerical approach
  // Convert to depressed cubic form: t^3 + pt + q = 0
  const p = (3*a*c - b*b) / (3*a*a);
  const q = (2*b*b*b - 9*a*b*c + 27*a*a*d) / (27*a*a*a);

  // Compute discriminant
  const discriminant = 4*p*p*p + 27*q*q;

  // Based on discriminant, determine the number and type of roots
  if (Math.abs(discriminant) < 1e-10) {
    // One real root with multiplicity 3 or one real root and one with multiplicity 2
    if (Math.abs(p) < 1e-10) {
      // One real root with multiplicity 3
      const root = Math.cbrt(-q);
      return [root - b/(3*a)];
    } else {
      // One real root and one with multiplicity 2
      const root1 = 3*q/p;
      const root2 = -3*q/(2*p);
      return [root1 - b/(3*a), root2 - b/(3*a)];
    }
  } else if (discriminant > 0) {
    // One real root and two complex conjugate roots
    // For simplicity, we'll return only the real root for visualization
    const root1 = Math.cbrt(-q/2 + Math.sqrt(discriminant/27)) + Math.cbrt(-q/2 - Math.sqrt(discriminant/27)) - b/(3*a);
    return [root1]; // Only return the real root
  } else {
    // Three distinct real roots
    // Use trigonometric solution
    const phi = Math.acos(-q/2 * Math.sqrt(27/(-p*p*p)));
    const t1 = 2 * Math.sqrt(-p/3) * Math.cos(phi/3);
    const t2 = 2 * Math.sqrt(-p/3) * Math.cos(phi/3 + 2*Math.PI/3);
    const t3 = 2 * Math.sqrt(-p/3) * Math.cos(phi/3 + 4*Math.PI/3);

    return [t1 - b/(3*a), t2 - b/(3*a), t3 - b/(3*a)];
  }
}

// Combined analysis function
export function analyzeCubicIrrational(
  value: number,
  name: string = 'Custom Value',
  tolerance: number = DEFAULT_PRECISION
): CubicIrrationalResult {
  // Run HAPD algorithm
  const hapdResult = runHAPDAlgorithm(value, MAX_ITERATIONS, tolerance);

  // Perform matrix verification
  const matrixResult = verifyWithMatrixMethod(value, tolerance);

  // Determine if rational
  const isRational = hapdResult.terminatedEarly && hapdResult.reason.includes("v3 approached zero");

  // Determine if cubic irrational
  const isCubic = matrixResult.isCubicIrrational;

  // Other classifications (simplified for demo)
  const isQuadratic = !isRational && !isCubic && hapdResult.periodicIndex === -1;
  const isHigherDegree = false; // Would need more complex detection
  const isTranscendental = !isRational && !isQuadratic && !isCubic && !isHigherDegree;

  return {
    value,
    name,
    hapdResult,
    matrixResult,
    isRational,
    isQuadratic,
    isCubic,
    isHigherDegree,
    isTranscendental
  };
}
