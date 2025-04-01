import { useMemo } from 'react';
import { useCollatzContext, CollatzSequence } from '../context/CollatzContext';

interface CollatzStats {
  averageSteps: number;
  maxSteps: number;
  maxNumber: number;
  oddPercentage: number;
  evenPercentage: number;
  convergenceRatio: number;
  oddEvenRatio: number;
  maxHeight: number;
}

interface CollatzPatterns {
  powers: number[];
  repeatingPatterns: number[][];
  powerOf2Steps: number[];
}

export const useCollatzEngine = () => {
  const {
    standardSequence,
    customSequence,
    compareSequences,
    customRules
  } = useCollatzContext();

  // Advanced statistics calculation
  const calculateStats = (sequence: CollatzSequence | null): CollatzStats | null => {
    if (!sequence) return null;

    const { sequence: seq, oddCount, evenCount, steps, maxValue } = sequence;

    // Calculate various statistics
    const totalOperations = oddCount + evenCount;
    const oddPercentage = (oddCount / totalOperations) * 100;
    const evenPercentage = (evenCount / totalOperations) * 100;

    // Measure how quickly the sequence converges
    const initialValue = seq[0];
    const convergenceRatio = initialValue / steps;

    // Calculate max height (ratio of max value to starting number)
    const maxHeight = maxValue / initialValue;

    return {
      averageSteps: steps,
      maxSteps: steps,
      maxNumber: maxValue,
      oddPercentage,
      evenPercentage,
      convergenceRatio,
      oddEvenRatio: oddCount / evenCount,
      maxHeight
    };
  };

  // Identify patterns in the sequence
  const identifyPatterns = (sequence: CollatzSequence | null): CollatzPatterns | null => {
    if (!sequence) return null;

    const { sequence: seq } = sequence;
    const patterns: CollatzPatterns = {
      powers: [],
      repeatingPatterns: [],
      powerOf2Steps: []
    };

    // Find powers of 2
    seq.forEach(num => {
      if (num > 0 && (num & (num - 1)) === 0) { // Check if power of 2
        patterns.powers.push(num);
      }
    });

    // Find steps where we divide by 2 consecutively (power of 2 steps)
    let consecutiveDivides = 0;
    for (let i = 1; i < seq.length; i++) {
      if (seq[i] * 2 === seq[i-1]) {
        consecutiveDivides++;
      } else if (consecutiveDivides > 0) {
        patterns.powerOf2Steps.push(consecutiveDivides);
        consecutiveDivides = 0;
      }
    }

    // Check for the 4-2-1 loop at the end
    if (seq.length >= 3) {
      const lastThree = seq.slice(-3);
      if (lastThree.toString() === [4, 2, 1].toString()) {
        patterns.repeatingPatterns.push([4, 2, 1]);
      }
    }

    return patterns;
  };

  // Compare sequences to find similarities and differences
  const compareSequenceFeatures = (sequences: CollatzSequence[]) => {
    if (sequences.length < 2) return null;

    const similarities = {
      lengthDifference: [],
      maxValueRatio: [],
      convergenceDifference: [],
      patternOverlap: 0
    };

    // Compare first sequence with all others
    const baseSeq = sequences[0];

    for (let i = 1; i < sequences.length; i++) {
      const compareSeq = sequences[i];

      // Calculate differences
      similarities.lengthDifference.push(compareSeq.steps - baseSeq.steps);
      similarities.maxValueRatio.push(compareSeq.maxValue / baseSeq.maxValue);

      // Calculate convergence difference
      const baseConvergence = baseSeq.startingNumber / baseSeq.steps;
      const compareConvergence = compareSeq.startingNumber / compareSeq.steps;
      similarities.convergenceDifference.push(compareConvergence - baseConvergence);

      // Check for overlapping elements
      const overlap = baseSeq.sequence.filter(value => compareSeq.sequence.includes(value)).length;
      similarities.patternOverlap = overlap / Math.min(baseSeq.sequence.length, compareSeq.sequence.length);
    }

    return similarities;
  };

  // Generate heatmap data for visualization
  const generateHeatmapData = (sequence: CollatzSequence | null, size = 10) => {
    if (!sequence) return null;

    const { sequence: seq } = sequence;
    const heatmap: number[][] = Array(size).fill(0).map(() => Array(size).fill(0));

    // Fill heatmap based on frequency of digit pairs
    for (let i = 0; i < seq.length - 1; i++) {
      const num = seq[i];
      const nextNum = seq[i + 1];

      // Use last digit of current and next number to create coordinates
      const x = num % size;
      const y = nextNum % size;

      heatmap[y][x]++;
    }

    return heatmap;
  };

  // Process trajectory data for 3D visualization
  const processTrajectoryData = (sequence: CollatzSequence | null) => {
    if (!sequence) return null;

    const { sequence: seq } = sequence;
    const trajectoryPoints = [];

    for (let i = 0; i < seq.length; i++) {
      trajectoryPoints.push({
        x: i, // Step number
        y: Math.log10(seq[i]), // Use log scale for better visualization
        z: i % 2 === 0 ? 1 : -1 // Alternate z-axis for better visualization
      });
    }

    return trajectoryPoints;
  };

  // Calculate sequence for a range of starting numbers
  const calculateRange = (start: number, end: number, rules = customRules) => {
    const results = [];

    for (let i = start; i <= end; i++) {
      try {
        const sequence = [];
        let current = i;
        let steps = 0;

        while (current !== 1 && steps < 1000) {
          if (current % rules.divideBy === 0) {
            current = current / rules.divideBy + rules.addAfterDivide;
          } else {
            current = current * rules.multiplyBy + rules.addAfterMultiply;
          }
          sequence.push(current);
          steps++;
        }

        results.push({
          start: i,
          steps,
          maxValue: Math.max(...sequence)
        });
      } catch (error) {
        results.push({
          start: i,
          steps: -1, // Error indicator
          maxValue: -1
        });
      }
    }

    return results;
  };

  // Memoized stats to avoid recalculation
  const standardStats = useMemo(() => calculateStats(standardSequence), [standardSequence]);
  const customStats = useMemo(() => calculateStats(customSequence), [customSequence]);
  const standardPatterns = useMemo(() => identifyPatterns(standardSequence), [standardSequence]);
  const compareAnalysis = useMemo(() => {
    if (compareSequences.length < 2) return null;
    return compareSequenceFeatures(compareSequences);
  }, [compareSequences]);
  const standardHeatmap = useMemo(() => generateHeatmapData(standardSequence), [standardSequence]);
  const standardTrajectory = useMemo(() => processTrajectoryData(standardSequence), [standardSequence]);

  return {
    standardStats,
    customStats,
    standardPatterns,
    compareAnalysis,
    standardHeatmap,
    standardTrajectory,
    calculateRange,

    // Additional functions for ad-hoc analysis
    calculateStats,
    identifyPatterns,
    generateHeatmapData,
    processTrajectoryData,
  };
};
