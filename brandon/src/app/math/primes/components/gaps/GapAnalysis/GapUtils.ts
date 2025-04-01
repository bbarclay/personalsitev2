// GapUtil.ts

// Calculate the gap between two prime numbers
export const calculateGap = (prime1: number, prime2: number): number => {
    return prime2 - prime1;
};

// Analyze gaps in a list of prime numbers
interface GapAnalysisResult {
    prime1: number;
    prime2: number;
    gap: number;
}

export const analyzeGaps = (primes: number[]): GapAnalysisResult[] => {
    const gapAnalysis: GapAnalysisResult[] = [];
    for (let i = 1; i < primes.length; i++) {
        gapAnalysis.push({
            prime1: primes[i - 1],
            prime2: primes[i],
            gap: calculateGap(primes[i - 1], primes[i]),
        });
    }
    return gapAnalysis;
};

// Prime Generation, Gap Analysis, and Mod3 Calculation
interface GapMod3Result {
    0: number;
    1: number;
    2: number;
    3: number;
}

export function gapAnalysis(primes: number[], numberOfStartingPrimes: number): GapMod3Result[][] {
    const startPrimes = primes.slice(0, numberOfStartingPrimes);
    const result: GapMod3Result[][] = [];
    for (const start of startPrimes) {
        const startResults: GapMod3Result[] = [];
        for (const prime of primes) {
            if (prime > start) {
                const gap = prime - start;
                const mod3 = gap % 3;
                startResults.push([start, prime, gap, mod3]);
            }
        }
        result.push(startResults);
    }
    return result;
}
