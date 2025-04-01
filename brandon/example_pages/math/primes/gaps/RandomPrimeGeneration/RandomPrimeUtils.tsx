// Utility Functions for Random Prime Analysis

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
  
  // Shuffle the array
  function shuffle<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  // Get primes sorted and filtered with drop percentage
  export function getPrimesSortedAndFiltered(min: number, max: number, dropPercentage: number) {
    let primes = generatePrimes(min, max);
  
    // Count primes in each 1000 range before dropping
    const primesCountInRanges: number[] = Array(Math.ceil(max / 1000)).fill(0);
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
    const remainingPrimesCountInRanges: number[] = Array(Math.ceil(max / 1000)).fill(0);
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
  
  export function getPrimesWithGapsAndMods(primes: number[]) {
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
  
  export function createTestSet(arr: (number | string)[][]) {
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
  
  export function generateAndAnalyzePrimes(startPrime: number, endLimit: number, dropPercentage: number) {
    const primeData = getPrimesSortedAndFiltered(startPrime, endLimit, dropPercentage);
    const primesWithGapsAndMods = getPrimesWithGapsAndMods(primeData.primes);
    const filteredPrimesWithoutZeros = removeZeros(primesWithGapsAndMods.result);
    const { testSet, alternationBreaks } = createTestSet(filteredPrimesWithoutZeros);
  
    const summary = {
      primesGenerated: primeData.totalPrimesGenerated,
      primesDropped: primeData.droppedPrimesCount,
      percentageDropped: (primeData.droppedPrimesCount / primeData.totalPrimesGenerated) * 100,
      primesCountInRanges: primeData.primesCountInRanges,
      remainingPrimesCountInRanges: primeData.remainingPrimesCountInRanges,
      modSums: primesWithGapsAndMods.modSums,
      alternationBreaks: alternationBreaks,
    };
  
    return {
      originalCalculations: primesWithGapsAndMods.result,
      summary: summary,
      removedZerosCount: primesWithGapsAndMods.result.length - filteredPrimesWithoutZeros.length,
      testSet: testSet,
    };
  }
  