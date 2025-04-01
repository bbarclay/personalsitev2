export function findTau(n: number): number {
  if (n % 2 === 0) return 0;
  let result = 3 * n + 1;
  let tau = 0;
  while (result % 2 === 0) {
    tau++;
    result /= 2;
  }
  return tau;
}

export function calculateEntropy(n: number): number {
  return Math.log2(n);
}

// Create a simple version that doesn't generate additional chart data
// to avoid circular dependencies
export function computeSimpleSequence(startNum: number, maxSteps: number = 1000): number[] {
  const sequence: number[] = [startNum];
  let current = startNum;
  let step = 0;

  while (current !== 1 && step < maxSteps) {
    // Calculate next value
    current = current % 2 === 0 ? current / 2 : 3 * current + 1;
    sequence.push(current);
    step++;
  }

  return sequence;
}

export function computeCollatzSequence(startNum: number, maxSteps: number = 1000) {
  const sequence: number[] = [startNum];
  const entropyData: { step: number; entropy: number }[] = [];
  const phaseSpaceData: { x: number; y: number }[] = [];
  const bitPatternData: { step: number; pattern: string }[] = [];
  const tauCounts: { [key: number]: number } = {};
  let maxTau = 0;

  let current = startNum;
  let step = 0;

  while (current !== 1 && step < maxSteps) {
    // Calculate and store entropy
    entropyData.push({
      step,
      entropy: calculateEntropy(current)
    });

    // Store phase space data (current value vs next value)
    const nextValue = current % 2 === 0 ? current / 2 : 3 * current + 1;
    phaseSpaceData.push({
      x: current,
      y: nextValue
    });

    // Calculate and store bit pattern
    const bitPattern = current.toString(2).padStart(32, '0');
    bitPatternData.push({
      step,
      pattern: bitPattern
    });

    // Calculate and store tau value
    if (current % 2 !== 0) {
      const tau = findTau(current);
      maxTau = Math.max(maxTau, tau);
      tauCounts[tau] = (tauCounts[tau] || 0) + 1;
    }

    // Calculate next value
    current = nextValue;
    sequence.push(current);
    step++;
  }

  // Convert tau counts to distribution data
  const tauDistributionData = Object.entries(tauCounts).map(([tau, count]) => ({
    tau: Number(tau),
    count
  })).sort((a, b) => a.tau - b.tau);

  // Generate additional data for new charts
  const bitAvalancheData = generateBitAvalancheData(startNum);
  const compressionWaterfallData = generateCompressionWaterfallData(sequence);
  const predecessorTreeData = generatePredecessorTreeData(10);

  return {
    sequence,
    maxTau,
    entropyData,
    phaseSpaceData,
    bitPatternData,
    tauDistributionData,
    bitAvalancheData,
    compressionWaterfallData,
    predecessorTreeData
  };
}

// Helper function to calculate Hamming distance (number of differing bits)
export function hammingDistance(a: number, b: number): number {
  const xor = a ^ b;
  let distance = 0;

  // Count bits that are different
  for (let i = 0; i < 32; i++) {
    if ((xor >> i) & 1) {
      distance++;
    }
  }

  return distance;
}

export function generateBitAvalancheData(startNum: number): { original: number; flipped: number; bitPosition: number; hammingDistance: number }[] {
  const result = [];
  const originalSequence = computeSimpleSequence(startNum, 20).slice(0, 10);

  // Flip each bit position individually
  for (let bitPos = 0; bitPos < Math.min(12, Math.log2(startNum) + 1); bitPos++) {
    const modifiedNum = startNum ^ (1 << bitPos); // Flip bit at position bitPos
    const modifiedSequence = computeSimpleSequence(modifiedNum, 20).slice(0, 10);

    // Calculate Hamming distance between sequences at each step
    const totalDistance = modifiedSequence.reduce((sum, current, idx) => {
      if (idx < originalSequence.length) {
        return sum + hammingDistance(current, originalSequence[idx]);
      }
      return sum;
    }, 0);

    result.push({
      original: startNum,
      flipped: modifiedNum,
      bitPosition: bitPos,
      hammingDistance: totalDistance / Math.min(originalSequence.length, modifiedSequence.length)
    });
  }

  return result;
}

export function generateCompressionWaterfallData(sequence: number[]): { step: number; expansion: number; compression: number; netChange: number }[] {
  if (!sequence?.length) return [];

  const result = [];
  const LOG2_3 = Math.log2(3); // ~1.585 bits

  for (let i = 0; i < sequence.length - 1; i++) {
    const current = sequence[i];

    // Skip the first even numbers in the sequence
    if (i === 0 && current % 2 === 0) continue;

    let expansion = 0;
    let compression = 0;

    if (current % 2 !== 0) {
      // Odd step: multiply by 3, add 1, then divide by 2^tau
      expansion = LOG2_3; // Adding log2(3) bits

      // Calculate tau (how many times we can divide by 2)
      let temp = 3 * current + 1;
      let tau = 0;
      while (temp % 2 === 0) {
        temp /= 2;
        tau++;
      }

      compression = -tau; // Removing tau bits
    } else {
      // Even step: divide by 2
      compression = -1; // Removing 1 bit
    }

    result.push({
      step: i,
      expansion: expansion > 0 ? expansion : 0,
      compression: compression < 0 ? compression : 0,
      netChange: expansion + compression
    });
  }

  return result;
}

export function generatePredecessorTreeData(upTo: number = 20): {
  value: number;
  predecessors: number;
  level: number;
  radius: number;
  levelLabel: string;
  nameWithCount: string;
}[] {
  const result = [];
  // Limit the upTo value to avoid excessive computation
  const safeUpTo = Math.min(upTo, 10);

  // Level labels for clearer display
  const levelLabels = {
    1: "Direct predecessors",
    2: "2-step predecessors",
    3: "3-step predecessors"
  };

  // For each number, calculate how many predecessors it has at different levels
  for (let n = 1; n <= safeUpTo; n++) {
    // Cache for memoization to avoid redundant computation
    const seenMap = new Set<string>();

    // Calculate predecessors at each level
    for (let level = 1; level <= 3; level++) {
      const count = countPredecessors(n, level, seenMap);

      // Only include if it has predecessors
      if (count > 0) {
        result.push({
          value: n,
          predecessors: count,
          level,
          radius: 50 - (level * 5) + count * (4 / level), // Adjust radius based on level and count
          levelLabel: levelLabels[level as keyof typeof levelLabels],
          nameWithCount: `${n} (${count} predecessors)`
        });
      }
    }
  }

  // Sort by level (primary) and value (secondary) for consistent display
  return result.sort((a, b) => {
    if (a.level !== b.level) return a.level - b.level;
    return a.value - b.value;
  });
}

// Calculate predecessors at a specific level
function countPredecessors(n: number, level: number, seen = new Set<string>()): number {
  // Add depth tracking to prevent excessive recursion
  if (level === 0) return n === 1 ? 1 : 0;

  // Create a unique key for memoization to avoid duplicates
  const key = `${n}:${level}`;
  if (seen.has(key)) return 0;
  seen.add(key);

  // Safety limit - don't go too deep with large numbers
  if (n > 10000 || seen.size > 500) return 0;

  let count = 0;

  // Direct predecessors
  if (level === 1) {
    // If n is odd, check if it could be reached via 3n+1
    if (n % 2 === 1) {
      const possiblePred = (n - 1) / 3;
      if (possiblePred > 0 && Number.isInteger(possiblePred) && possiblePred % 2 === 1) {
        count++;
      }
    }

    // Any number could be reached by dividing by 2
    const possiblePred = n * 2;
    if (possiblePred < 1000) { // Limit the size for performance
      count++;
    }

    return count;
  }

  // For deeper levels, recursively count predecessors of predecessors
  const directPreds = [];

  // Check if n could be reached via 3n+1
  if (n % 2 === 1) {
    const possiblePred = (n - 1) / 3;
    if (possiblePred > 0 && Number.isInteger(possiblePred) && possiblePred % 2 === 1) {
      directPreds.push(possiblePred);
    }
  }

  // n could be reached by dividing by 2
  const possiblePred = n * 2;
  if (possiblePred < 1000) { // Limit the size for performance
    directPreds.push(possiblePred);
  }

  // Count predecessors at the next level for each direct predecessor
  for (const pred of directPreds) {
    count += countPredecessors(pred, level - 1, seen);
  }

  return count;
}
