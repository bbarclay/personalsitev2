import { useState, useEffect, useCallback } from 'react';
import { Method, Step, parseSystem, solveSystem } from '../utils/system-solver-utils';

export function useLinearSystem() {
  const [system, setSystem] = useState<string>('2x + y = 5\nx - y = 1');
  const [method, setMethod] = useState<Method>('elimination');
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1000);

  const solve = useCallback(() => {
    try {
      const parsed = parseSystem(system);
      const solution = solveSystem(parsed, method);
      setSteps(solution.steps);
      setCurrentStep(0);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setSteps([]);
      setCurrentStep(0);
    }
  }, [system, method]);

  // Playback controls
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);
  const handleReset = () => setCurrentStep(0);

  // Auto-advance playback
  useEffect(() => {
    if (!isPlaying || currentStep >= steps.length - 1) {
      setIsPlaying(false);
      return;
    }

    const timer = setTimeout(handleNext, playbackSpeed);
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps.length, playbackSpeed]);

  return {
    system,
    method,
    steps,
    currentStep,
    isPlaying,
    error,
    playbackSpeed,
    setSystem,
    setMethod,
    setPlaybackSpeed,
    handleNext,
    handlePrev,
    handlePlay,
    handlePause,
    handleReset,
    solve
  };
}