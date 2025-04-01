import { useState, useCallback, useMemo } from 'react';

interface CollatzState {
  sequence: number[];
  steps: number;
  currentStep: number;
  error: string | null;
  isProcessing: boolean;
}

export function useCollatz(initialNumber: number = 27) {
  const [state, setState] = useState<CollatzState>({
    sequence: [],
    steps: 0,
    currentStep: 0,
    error: null,
    isProcessing: false
  });

  const calculateNextStep = useCallback((n: number): number => {
    return n % 2 === 0 ? n / 2 : 3 * n + 1;
  }, []);

  const calculateSequence = useCallback((startNumber: number) => {
    if (startNumber <= 0) {
      setState(prev => ({ ...prev, error: 'Please enter a positive number' }));
      return;
    }

    setState(prev => ({ ...prev, isProcessing: true, error: null }));

    try {
      const sequence: number[] = [startNumber];
      let current = startNumber;
      let steps = 1;

      while (current !== 1) {
        current = calculateNextStep(current);
        sequence.push(current);
        steps++;
      }

      setState({
        sequence,
        steps,
        currentStep: 0,
        error: null,
        isProcessing: false
      });
    } catch (err) {
      setState(prev => ({
        ...prev,
        error: 'Failed to calculate sequence',
        isProcessing: false
      }));
    }
  }, [calculateNextStep]);

  const handleStepForward = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, prev.steps - 1)
    }));
  }, []);

  const handleStepBack = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 0)
    }));
  }, []);

  const handleReset = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentStep: 0
    }));
  }, []);

  const handleRandom = useCallback(() => {
    const randomNumber = Math.floor(Math.random() * 1000) + 1;
    calculateSequence(randomNumber);
  }, [calculateSequence]);

  const handleBatchProcess = useCallback(async (start: number, end: number) => {
    if (start >= end) {
      setState(prev => ({ ...prev, error: 'Start number must be less than end number' }));
      return [];
    }

    setState(prev => ({ ...prev, isProcessing: true, error: null }));

    try {
      const results = [];
      for (let i = start; i <= end; i++) {
        const sequence: number[] = [i];
        let current = i;
        let steps = 1;
        let maxValue = i;

        while (current !== 1) {
          current = calculateNextStep(current);
          sequence.push(current);
          steps++;
          maxValue = Math.max(maxValue, current);
        }

        results.push({
          startNumber: i,
          maxValue,
          steps,
          convergenceRate: steps / maxValue
        });
      }

      setState(prev => ({ ...prev, isProcessing: false }));
      return results;
    } catch (err) {
      setState(prev => ({
        ...prev,
        error: 'Failed to process batch',
        isProcessing: false
      }));
      return [];
    }
  }, [calculateNextStep]);

  const statistics = useMemo(() => {
    if (state.sequence.length === 0) return null;

    const maxValue = Math.max(...state.sequence);
    const stepsToReachMax = state.sequence.indexOf(maxValue) + 1;
    const evenSteps = state.sequence.filter(n => n % 2 === 0).length;
    const oddSteps = state.sequence.length - evenSteps;
    const averageStepSize = state.sequence.reduce((a, b) => a + b, 0) / state.sequence.length;
    const convergenceRate = state.steps / maxValue;

    return {
      maxValue,
      stepsToReachMax,
      averageStepSize,
      evenSteps,
      oddSteps,
      convergenceRate
    };
  }, [state.sequence, state.steps]);

  // Initialize sequence on mount
  useState(() => {
    calculateSequence(initialNumber);
  });

  return {
    ...state,
    calculateSequence,
    handleStepForward,
    handleStepBack,
    handleReset,
    handleRandom,
    handleBatchProcess,
    statistics
  };
} 