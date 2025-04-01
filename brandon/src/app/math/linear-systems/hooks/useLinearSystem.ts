import { useState, useCallback } from 'react';

interface Solution {
  steps: any[];
  result: number[];
}

export function useLinearSystem() {
  const [system, setSystem] = useState<string>('2x + y = 5\nx - y = 1');
  const [solution, setSolution] = useState<Solution | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [method, setMethod] = useState<'elimination' | 'substitution' | 'matrices'>('elimination');

  const handleSystemChange = useCallback((newSystem: string) => {
    setSystem(newSystem);
    setSolution(null);
    setCurrentStep(0);
    setError(null);
  }, []);

  const handleMethodChange = useCallback((newMethod: 'elimination' | 'substitution' | 'matrices') => {
    setMethod(newMethod);
    setSolution(null);
    setCurrentStep(0);
    setError(null);
  }, []);

  const handleSolve = useCallback(() => {
    try {
      // TODO: Implement actual solving logic
      const mockSolution: Solution = {
        steps: [
          { description: 'Initial system', equations: system.split('\n') },
          { description: 'Step 1', equations: ['2x + y = 5', 'x = y + 1'] },
          { description: 'Solution', equations: ['x = 2', 'y = 1'] }
        ],
        result: [2, 1]
      };
      
      setSolution(mockSolution);
      setCurrentStep(0);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setSolution(null);
    }
  }, [system, method]);

  const handleStepForward = useCallback(() => {
    if (solution && currentStep < solution.steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  }, [solution, currentStep]);

  const handleStepBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  return {
    system,
    solution,
    currentStep,
    isAnimating,
    error,
    handleSolve,
    handleStepForward,
    handleStepBack,
    handleSystemChange,
    handleMethodChange,
  };
}