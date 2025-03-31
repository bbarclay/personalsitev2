export type ComplexNumber = {
    real: number;
    imaginary: number;
};

import { Polynomial, Term } from '../types';

// Convert Term[] based polynomial to coefficient array format
const toCoefficientsArray = (poly: Polynomial): { coefficients: number[], degree: number } => {
    const degree = poly.terms.length > 0 ? poly.terms[0].exponent : 0;
    const coefficients = new Array(degree + 1).fill(0);
    
    for (const term of poly.terms) {
        coefficients[degree - term.exponent] = term.coefficient;
    }
    
    return { coefficients, degree };
};

// Convert coefficient array format back to Term[] based polynomial
const fromCoefficientsArray = (coefficients: number[], degree: number): Polynomial => {
    const terms: Term[] = [];
    for (let i = 0; i <= degree; i++) {
        if (coefficients[i] !== 0) {
            terms.push({
                coefficient: coefficients[i],
                exponent: degree - i
            });
        }
    }
    return new Polynomial(terms);
};

// Add proper type guards
export const isValidPolynomial = (poly: Polynomial): boolean => {
    return poly.terms.every(term => 
        typeof term.coefficient === 'number' && 
        !isNaN(term.coefficient) &&
        typeof term.exponent === 'number' &&
        Number.isInteger(term.exponent) &&
        term.exponent >= 0
    );
};

// Calculate polynomial value at point x using Horner's method
export const evaluatePolynomial = (poly: Polynomial, x: number): number => {
    const { coefficients, degree } = toCoefficientsArray(poly);
    let result = coefficients[0];
    for (let i = 1; i <= degree; i++) {
        result = result * x + coefficients[i];
    }
    return result;
};

// Find roots using Durand-Kerner method for complex roots
export const findRoots = (poly: Polynomial): ComplexNumber[] => {
    if (!isValidPolynomial(poly)) {
        throw new Error('Invalid polynomial input');
    }

    const { coefficients, degree } = toCoefficientsArray(poly);
    if (degree === 0) {
        return [];
    }

    // Normalize coefficients to prevent overflow
    const leadingCoeff = coefficients[0];
    const normalizedCoeffs = coefficients.map(c => c / leadingCoeff);
    const normalizedPoly = fromCoefficientsArray(normalizedCoeffs, degree);

    // Initial guesses using complex unit circle
    const initialGuesses: ComplexNumber[] = Array(degree).fill(0).map((_, i) => ({
        real: Math.cos(2 * Math.PI * i / degree),
        imaginary: Math.sin(2 * Math.PI * i / degree)
    }));

    // Durand-Kerner iteration
    const maxIterations = 100;
    const tolerance = 1e-10;
    let currentRoots = [...initialGuesses];

    for (let iter = 0; iter < maxIterations; iter++) {
        let maxDiff = 0;
        const newRoots: ComplexNumber[] = [];

        for (let i = 0; i < degree; i++) {
            // Calculate correction term
            let numerator = evaluateComplexPolynomial(normalizedPoly, currentRoots[i]);
            let denominator: ComplexNumber = { real: 1, imaginary: 0 };

            for (let j = 0; j < degree; j++) {
                if (j !== i) {
                    denominator = multiplyComplex(denominator,
                        subtractComplex(currentRoots[i], currentRoots[j]));
                }
            }

            const correction = divideComplex(numerator, denominator);
            const newRoot = subtractComplex(currentRoots[i], correction);
            newRoots.push(newRoot);

            const diff = Math.sqrt(
                Math.pow(correction.real, 2) + Math.pow(correction.imaginary, 2)
            );
            maxDiff = Math.max(maxDiff, diff);
        }

        if (maxDiff < tolerance) {
            return newRoots;
        }
        currentRoots = newRoots;
    }

    return currentRoots;
};

// Factorization using roots
export const factorize = (poly: Polynomial): {
    linearFactors: ComplexNumber[];
    realLinearFactors: number[];
    quadraticFactors: [number, number, number][];
} => {
    const roots = findRoots(poly);
    const linearFactors: ComplexNumber[] = [];
    const realLinearFactors: number[] = [];
    const quadraticFactors: [number, number, number][] = [];

    // Group conjugate pairs and real roots
    let i = 0;
    while (i < roots.length) {
        if (Math.abs(roots[i].imaginary) < 1e-10) {
            realLinearFactors.push(roots[i].real);
            i++;
        } else {
            // Find conjugate pair
            const a = 1;
            const b = -2 * roots[i].real;
            const c = Math.pow(roots[i].real, 2) + Math.pow(roots[i].imaginary, 2);
            quadraticFactors.push([a, b, c]);
            linearFactors.push(roots[i]);
            linearFactors.push({
                real: roots[i].real,
                imaginary: -roots[i].imaginary
            });
            i += 2;
        }
    }

    return {
        linearFactors,
        realLinearFactors,
        quadraticFactors
    };
};

// Complex arithmetic helpers
export const addComplex = (a: ComplexNumber, b: ComplexNumber): ComplexNumber => ({
    real: a.real + b.real,
    imaginary: a.imaginary + b.imaginary
});

export const subtractComplex = (a: ComplexNumber, b: ComplexNumber): ComplexNumber => ({
    real: a.real - b.real,
    imaginary: a.imaginary - b.imaginary
});

export const multiplyComplex = (a: ComplexNumber, b: ComplexNumber): ComplexNumber => ({
    real: a.real * b.real - a.imaginary * b.imaginary,
    imaginary: a.real * b.imaginary + a.imaginary * b.real
});

export const divideComplex = (a: ComplexNumber, b: ComplexNumber): ComplexNumber => {
    const denominator = b.real * b.real + b.imaginary * b.imaginary;
    if (Math.abs(denominator) < 1e-10) {
        throw new Error('Division by zero in complex arithmetic');
    }
    return {
        real: (a.real * b.real + a.imaginary * b.imaginary) / denominator,
        imaginary: (a.imaginary * b.real - a.real * b.imaginary) / denominator
    };
};

// Evaluate polynomial at complex point
export const evaluateComplexPolynomial = (poly: Polynomial, z: ComplexNumber): ComplexNumber => {
    const { coefficients, degree } = toCoefficientsArray(poly);
    let result: ComplexNumber = { real: coefficients[0], imaginary: 0 };
    let power: ComplexNumber = { real: 1, imaginary: 0 };

    for (let i = 1; i <= degree; i++) {
        power = multiplyComplex(power, z);
        result = addComplex(result, {
            real: coefficients[i] * power.real,
            imaginary: coefficients[i] * power.imaginary
        });
    }

    return result;
};

// Basic polynomial operations that still need implementation
export const parsePolynomial = (input: string): Polynomial => {
    // Parse a string into terms
    const terms: Term[] = [];
    // TODO: Implement parsing logic
    return new Polynomial(terms);
};

export const factorPolynomial = (poly: Polynomial): Polynomial[] => {
    // Factor polynomial into terms
    // TODO: Implement factoring logic
    return [poly];
};

export const expandPolynomial = (factors: Polynomial[]): Polynomial => {
    // Expand factored polynomial
    // TODO: Implement expansion logic
    return new Polynomial();
};

export const simplifyPolynomial = (poly: Polynomial): Polynomial => {
    // Simplify polynomial terms
    // TODO: Implement simplification logic
    return new Polynomial();
};
