// Common Variables
export const startPrime = 5;
export const endLimit = 100;
export const numberOfStartingPrimes = 3;
export const dropPercentage = 0.3; // For random prime generation

// Function to check if a number is prime
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

// Prime Generation, Gap Analysis, and Mod3 Calculation
export function gapAnalysis(primes: number[], numberOfStartingPrimes: number): Array<[number, number, number, number]>[] {
    const startPrimes = primes.slice(0, numberOfStartingPrimes);
    const result: Array<[number, number, number, number]>[] = [];
    for (const start of startPrimes) {
        const startResults: Array<[number, number, number, number]> = [];
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

// Twin Prime Analysis
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

export function analyzeTwinPrimes(twinPrimes: [number, number][]): AnalysisResult {
    const result: (number | string | null)[][] = [];
    const totals = { mod0: 0, mod1: 0, mod2: 0, analyzed: 0 };
    let previousMod: number | null = null;
    let previousNumber: number | null = null;

    twinPrimes.forEach(pair => {
        pair.forEach(num => {
            const mod3 = num % 3;
            const gap = previousNumber !== null ? num - previousNumber : null;
            const gapMod3 = gap !== null ? gap % 3 : null;
            const isAlternating = previousMod !== null && previousMod !== mod3 ? 'Yes' : 'No';

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

// Random Prime Generation
export function shuffle<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

interface PrimesSortedAndFiltered {
    primes: number[];
    primesCountInRanges: number[];
    remainingPrimesCountInRanges: number[];
    droppedPrimesCount: number;
    totalPrimesGenerated: number;
}

export function getPrimesSortedAndFiltered(min: number, max: number, dropPercentage: number): PrimesSortedAndFiltered {
    let primes = generatePrimes(min, max);

    // Count primes in each 1000 range before dropping
    const primesCountInRanges = Array(Math.ceil(max / 1000)).fill(0);
    primes.forEach(prime => {
        const rangeIndex = Math.floor(prime / 1000);
        primesCountInRanges[rangeIndex]++;
    });

    // Shuffle the primes array
    primes = shuffle(primes);

    // Drop a percentage of the primes
    const numberToDrop = Math.floor(primes.length * dropPercentage);
    primes = primes.slice(numberToDrop);

    // Count primes in each 1000 range after dropping
    const remainingPrimesCountInRanges = Array(Math.ceil(max / 1000)).fill(0);
    primes.forEach(prime => {
        const rangeIndex = Math.floor(prime / 1000);
        remainingPrimesCountInRanges[rangeIndex]++;
    });

    // Sort the remaining primes in ascending order
    primes.sort((a, b) => a - b);

    return {
        primes,
        primesCountInRanges,
        remainingPrimesCountInRanges,
        droppedPrimesCount: numberToDrop,
        totalPrimesGenerated: primes.length + numberToDrop,
    };
}

interface PrimesWithGapsAndMods {
    result: (number | string)[][];
    modSums: {
        total: number;
        mod2: number;
        mod1: number;
        mod0: number;
    };
}

export function getPrimesWithGapsAndMods(primes: number[]): PrimesWithGapsAndMods {
    const result: (number | string)[][] = [];
    const modSums = { total: 0, mod2: 0, mod1: 0, mod0: 0 };
    for (let i = 0; i < primes.length; i++) {
        const prime = primes[i];
        const primeMod3 = prime % 3;
        const gap = i === 0 ? "" : primes[i] - primes[i - 1];
        const gapMod3 = i === 0 ? "" : (gap as number) % 3;

        if (primeMod3 === 0) modSums.mod0++;
        else if (primeMod3 === 1) modSums.mod1++;
        else if (primeMod3 === 2) modSums.mod2++;

        modSums.total += primeMod3;

        result.push([prime, primeMod3, gap, gapMod3]);
    }
    return { result, modSums };
}

export function removeZeros(arr: (number | string)[][]): (number | string)[][] {
    return arr.filter(subArray => subArray[subArray.length - 1] !== 0);
}

interface TestSet {
    testSet: (number | string)[][];
    alternationBreaks: (number | string)[][];
}

export function createTestSet(arr: (number | string)[][]): TestSet {
    if (arr.length < 2) return { testSet: [], alternationBreaks: [] };

    const testSet: (number | string)[][] = [];
    const alternationBreaks: (number | string)[][] = [];
    const startMod = arr[0][1];
    testSet.push([arr[0][0], arr[0][1], arr[0][2], arr[0][3], "Yes"]);

    for (let i = 1; i < arr.length; i++) {
        const currentMod = arr[i][1];
        const expectedMod = (startMod === 1) ? (i % 2 === 1 ? 2 : 1) : (i % 2 === 1 ? 1 : 2);

        if (currentMod !== expectedMod) {
            alternationBreaks.push(arr[i]);
            testSet.push([...arr[i], "No"]);
        } else {
            testSet.push([...arr[i], "Yes"]);
        }
    }

    return { testSet, alternationBreaks };
}
