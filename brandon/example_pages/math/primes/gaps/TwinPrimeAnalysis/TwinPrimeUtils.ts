// Utility functions for Twin Prime Analysis

// Check if a number is prime
export function isPrime(num: number): boolean {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
}

// Generate prime numbers in the range min to max
export function generatePrimes(start: number, end: number): number[] {
    const primes: number[] = [];
    for (let num = start; num <= end; num++) {
        if (isPrime(num)) {
            primes.push(num);
        }
    }
    return primes;
}

// Check if two numbers are twin primes
export const isTwinPrime = (prime1: number, prime2: number): boolean => {
    return Math.abs(prime1 - prime2) === 2;
};

// Find twin primes in a range
export function findTwinPrimes(start: number, end: number): [number, number][] {
    const twinPrimes: [number, number][] = [];
    for (let i = start; i <= end - 2; i++) {
        if (isPrime(i) && isPrime(i + 2)) {
            twinPrimes.push([i, i + 2]);
        }
    }
    return twinPrimes;
}

interface AnalysisResult {
    result: (number | string | null)[][];
    totals: {
        mod0: number;
        mod1: number;
        mod2: number;
        analyzed: number;
    };
}

// Analyze twin primes
export function analyzeTwinPrimes(twinPrimes: [number, number][]): AnalysisResult {
    const result: (number | string | null)[][] = [];
    const totals = { mod0: 0, mod1: 0, mod2: 0, analyzed: 0 };
    let previousMod: number | null = null;
    let previousNumber: number | null = null;

    twinPrimes.forEach((pair) => {
        pair.forEach(num => {
            const mod3 = num % 3;
            const gap = previousNumber !== null ? num - previousNumber : null;
            const gapMod3 = gap !== null ? gap % 3 : null;
            const isAlternating = (previousMod !== null && previousMod !== mod3) ? 'Yes' : 'No';

            result.push([num, mod3, gap, gapMod3, isAlternating]);

            if (mod3 === 0) totals.mod0++;
            if (mod3 === 1) totals.mod1++;
            if (mod3 === 2) totals.mod2++;

            previousMod = mod3;
            previousNumber = num;
        });
    });

    totals.analyzed = result.length;
    return { result, totals };
}
