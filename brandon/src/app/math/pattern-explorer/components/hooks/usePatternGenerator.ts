import { useState, useEffect } from 'react';

export const usePatternGenerator = () => {
  const [patternType, setPatternType] = useState('arithmetic');
  const [startValue, setStartValue] = useState(1);
  const [step, setStep] = useState(2);
  const [sequenceLength, setSequenceLength] = useState(5);
  const [pattern, setPattern] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Generate pattern safely
  const generatePattern = () => {
    setError(null);
    let newPattern: number[] = [];

    try {
      if (sequenceLength <= 0 || sequenceLength > 100) {
        throw new Error('Sequence length must be between 1 and 100');
      }

      switch (patternType) {
        case 'arithmetic':
          newPattern = Array.from(
            { length: sequenceLength },
            (_, i) => startValue + i * step
          );
          break;

        case 'geometric':
          // Prevent division by zero
          if (step === 0 && patternType === 'geometric') {
            throw new Error('Common ratio cannot be zero');
          }
          newPattern = Array.from(
            { length: sequenceLength },
            (_, i) => startValue * Math.pow(step || 1, i)
          );
          break;

        case 'fibonacci':
          if (sequenceLength === 1) {
            newPattern = [startValue];
          } else {
            newPattern = [startValue, startValue];
            for (let i = 2; i < sequenceLength; i++) {
              newPattern.push(newPattern[i - 1] + newPattern[i - 2]);
            }
          }
          break;

        case 'square':
          newPattern = Array.from(
            { length: sequenceLength },
            (_, i) => Math.pow(i + 1, 2)
          );
          break;

        case 'triangular':
          newPattern = Array.from(
            { length: sequenceLength },
            (_, i) => ((i + 1) * (i + 2)) / 2
          );
          break;

        default:
          // Default to arithmetic if unknown pattern type
          newPattern = Array.from(
            { length: sequenceLength },
            (_, i) => startValue + i * step
          );
      }

      // Ensure we have a valid array
      if (!Array.isArray(newPattern)) {
        newPattern = [];
      }

      setPattern(newPattern);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setPattern([]);
    }
  };

  // Generate pattern on mount and when pattern type changes
  useEffect(() => {
    generatePattern();
  }, [patternType]);

  return {
    patternType,
    setPatternType,
    startValue,
    setStartValue,
    step,
    setStep,
    sequenceLength,
    setSequenceLength,
    pattern,
    error,
    generatePattern,
  };
};
