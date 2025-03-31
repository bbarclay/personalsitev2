// Utility functions for prime numbers and their distribution

// Generate primes up to a given limit using the Sieve of Eratosthenes
export const generatePrimes = (limit: number): number[] => {
    const sieve = new Array(limit + 1).fill(true);
    sieve[0] = sieve[1] = false;

    for (let p = 2; p * p <= limit; p++) {
        if (sieve[p]) {
            for (let i = p * p; i <= limit; i += p) {
                sieve[i] = false;
            }
        }
    }

    const primes: number[] = [];
    for (let i = 2; i <= limit; i++) {
        if (sieve[i]) {
            primes.push(i);
        }
    }

    return primes;
};

// Calculate π(x) - the number of primes less than or equal to x
export const calculatePi = (x: number, primes: number[]): number => {
    return primes.filter(p => p <= x).length;
};

// Calculate the logarithmic integral Li(x), which approximates π(x)
export const calculateLi = (x: number): number => {
    if (x <= 1) return 0;

    // Simple trapezoidal approximation for the logarithmic integral
    const segments = 1000;
    const dx = (x - 2) / segments;
    let sum = 0;

    for (let i = 0; i <= segments; i++) {
        const t = 2 + i * dx;
        const weight = (i === 0 || i === segments) ? 0.5 : 1;
        sum += weight * (1 / Math.log(t));
    }

    return sum * dx;
};

// Calculate the Riemann approximation for π(x)
export const calculateRiemannApproximation = (x: number): number => {
    // For educational purposes, we'll use Li(x) as our approximation
    // A more accurate version would include terms from the zeta function
    return calculateLi(x);
};

// Calculate the Prime Number Theorem approximation: x/ln(x)
export const calculatePNTApproximation = (x: number): number => {
    if (x <= 1) return 0;
    return x / Math.log(x);
};

// Calculate the error bounds assuming Riemann Hypothesis is true
export const calculateRiemannBounds = (x: number): { lower: number; upper: number } => {
    const li = calculateLi(x);
    const errorTerm = Math.sqrt(x) * Math.log(x) / (8 * Math.PI);

    return {
        lower: li - errorTerm,
        upper: li + errorTerm
    };
};
