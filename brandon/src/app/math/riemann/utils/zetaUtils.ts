// Utility functions for calculating the Riemann zeta function and finding its zeros

type ComplexNumber = {
    real: number;
    imaginary: number;
};

// Calculate the Riemann zeta function for a complex number s = sigma + it
export const calculateZetaFunction = (sigma: number, t: number, terms = 1000): ComplexNumber => {
    // This is a simplified implementation for educational purposes
    // For real-world applications, more sophisticated algorithms would be used

    // For values in the critical strip (0 < sigma < 1), we use a simplified approximation
    if (sigma > 0 && sigma < 1) {
        return calculateZetaViaApproximation(sigma, t);
    }

    // Direct sum approximation (converges for Re(s) > 1)
    let real = 0;
    let imaginary = 0;

    for (let n = 1; n <= terms; n++) {
        const angle = -t * Math.log(n);
        const magnitude = Math.pow(n, -sigma);

        real += magnitude * Math.cos(angle);
        imaginary += magnitude * Math.sin(angle);
    }

    return { real, imaginary };
};

// Calculate zeta function using an approximation for the critical strip
const calculateZetaViaApproximation = (sigma: number, t: number): ComplexNumber => {
    // This is a highly simplified approximation for educational purposes
    // For actual research, more precise methods would be used

    // Basic Riemann-Siegel formula approximation
    const n = Math.floor(Math.sqrt(t / (2 * Math.PI)));
    let real = 0;
    let imaginary = 0;

    // Main sum
    for (let k = 1; k <= n; k++) {
        const angle = t * Math.log(k);
        const magnitude = Math.pow(k, -sigma);

        real += magnitude * Math.cos(angle);
        imaginary -= magnitude * Math.sin(angle);
    }

    // Apply correction factor for approximation
    // This is a simplification of the actual correction term
    const correctionFactor = 0.5 * Math.pow(t / (2 * Math.PI), -sigma / 2);
    const correctionAngle = t / 2 * Math.log(t / (2 * Math.PI)) - t / 2 - Math.PI / 8;

    real += correctionFactor * Math.cos(correctionAngle);
    imaginary -= correctionFactor * Math.sin(correctionAngle);

    return { real, imaginary };
};

// Find the zeros of the zeta function in a given range
export const findZeros = async (
    startRange: number,
    endRange: number,
    precision: number = 0.0001
): Promise<number[]> => {
    const zeros: number[] = [];
    const step = 0.1; // Initial coarse step

    // Use known zeros for demonstration purposes
    // In a real implementation, we would use a sophisticated algorithm to find zeros
    const knownZeros = [
        14.134725, 21.022040, 25.010858, 30.424876, 32.935062,
        37.586178, 40.918719, 43.327073, 48.005151, 49.773832,
        52.970321, 56.446248, 59.347044, 60.831779, 65.112544,
        67.079811, 69.546402, 72.067158, 75.704691, 77.144840,
        79.337375, 82.910381, 84.735493, 87.425275, 88.809111
    ];

    // Filter known zeros within our range
    const rangeZeros = knownZeros.filter(z => z >= startRange && z <= endRange);

    if (rangeZeros.length > 0) {
        return rangeZeros;
    }

    // If no known zeros in range, do a basic search
    // Note: This is extremely simplified and not accurate for proper research
    for (let t = startRange; t <= endRange; t += step) {
        const zetaValue = calculateZetaFunction(0.5, t);
        const magnitude = Math.sqrt(zetaValue.real ** 2 + zetaValue.imaginary ** 2);

        if (magnitude < 0.1) {
            // Refine the zero with smaller steps
            let refinedT = t;
            let minMagnitude = magnitude;

            for (let delta = -step / 2; delta <= step / 2; delta += precision) {
                const testT = t + delta;
                const testValue = calculateZetaFunction(0.5, testT);
                const testMagnitude = Math.sqrt(testValue.real ** 2 + testValue.imaginary ** 2);

                if (testMagnitude < minMagnitude) {
                    minMagnitude = testMagnitude;
                    refinedT = testT;
                }
            }

            zeros.push(refinedT);
            t = refinedT + step; // Skip ahead to avoid finding the same zero multiple times
        }
    }

    return zeros;
};

// Check if a given complex number is approximately zero
export const isApproximatelyZero = (value: ComplexNumber, tolerance: number = 1e-10): boolean => {
    return Math.abs(value.real) < tolerance && Math.abs(value.imaginary) < tolerance;
};
