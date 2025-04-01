import { useState, useCallback } from 'react';
import { CalculationResult } from '../types';
import { calculateSequence, autoCalculate } from '../service';
import { DEFAULT_VALUES } from '../constants';

export const useCollatzCalculator = () => {
  const [standardNumber, setStandardNumber] = useState(DEFAULT_VALUES.STANDARD_NUMBER);
  const [customNumber, setCustomNumber] = useState(DEFAULT_VALUES.CUSTOM_NUMBER);
  const [divideBy, setDivideBy] = useState(DEFAULT_VALUES.DIVIDE_BY);
  const [multiplyBy, setMultiplyBy] = useState(DEFAULT_VALUES.MULTIPLY_BY);
  const [addAfterDivide, setAddAfterDivide] = useState(DEFAULT_VALUES.ADD_AFTER_DIVIDE);
  const [addAfterMultiply, setAddAfterMultiply] = useState(DEFAULT_VALUES.ADD_AFTER_MULTIPLY);
  const [maxSteps, setMaxSteps] = useState(DEFAULT_VALUES.MAX_STEPS);
  const [standardResults, setStandardResults] = useState<CalculationResult | null>(null);
  const [customResults, setCustomResults] = useState<CalculationResult | null>(null);
  const [error, setError] = useState('');

  const handleCalculate = useCallback((isStandard = true) => {
    try {
      const startNumber = isStandard ? standardNumber : customNumber;
      if (!startNumber || isNaN(parseInt(startNumber)) || parseInt(startNumber) <= 0) {
        setError('Please enter a valid positive number');
        return;
      }

      const calculationResult = calculateSequence(
        parseInt(startNumber),
        isStandard,
        maxSteps,
        divideBy,
        multiplyBy,
        addAfterDivide,
        addAfterMultiply
      );

      const result: CalculationResult = {
        sequence: calculationResult.sequence,
        maxValue: calculationResult.maxValue,
        totalSteps: calculationResult.totalSteps,
        startNumber: parseInt(startNumber),
      };

      if (isStandard) {
        setStandardResults(result);
      } else {
        setCustomResults(result);
      }

      setError('');
    } catch (err: unknown) {
      setError((err as Error).message || 'An error occurred during calculation');
    }
  }, [standardNumber, customNumber, maxSteps, divideBy, multiplyBy, addAfterDivide, addAfterMultiply]);

  const autoCalculateFn = useCallback(
    async (isStandard: boolean, number: number) => {
      if (!number || isNaN(number) || number <= 0) {
        setError('Please enter a valid positive number');
        return;
      }

      const result = autoCalculate(
        isStandard,
        number,
        calculateSequence,
        maxSteps,
        divideBy,
        multiplyBy,
        addAfterDivide,
        addAfterMultiply
      );

      if (isStandard) {
        setStandardResults(result);
      } else {
        setCustomResults(result);
      }
    },
    [maxSteps, divideBy, multiplyBy, addAfterDivide, addAfterMultiply]
  );

  return {
    standardNumber,
    setStandardNumber,
    customNumber,
    setCustomNumber,
    divideBy,
    setDivideBy,
    multiplyBy,
    setMultiplyBy,
    addAfterDivide,
    setAddAfterDivide,
    addAfterMultiply,
    setAddAfterMultiply,
    maxSteps,
    setMaxSteps,
    standardResults,
    customResults,
    error,
    handleCalculate,
    autoCalculateFn,
  };
};
