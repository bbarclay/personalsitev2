import { useRef, useState, useCallback, useEffect } from 'react';
import { DEFAULT_VALUES } from '../constants';

interface UsePlayControlsProps {
  autoCalculateFn: (isStandard: boolean, number: number) => void;
}

export const usePlayControls = ({ autoCalculateFn }: UsePlayControlsProps) => {
  const [isPlayingStandard, setIsPlayingStandard] = useState(false);
  const [isPlayingCustom, setIsPlayingCustom] = useState(false);
  const [standardSpeed, setStandardSpeed] = useState(DEFAULT_VALUES.SPEED);
  const [customSpeed, setCustomSpeed] = useState(DEFAULT_VALUES.SPEED);
  const [standardNumber, setStandardNumber] = useState(DEFAULT_VALUES.STANDARD_NUMBER);
  const [customNumber, setCustomNumber] = useState(DEFAULT_VALUES.CUSTOM_NUMBER);

  const standardIntervalRef = useRef<NodeJS.Timeout>();
  const customIntervalRef = useRef<NodeJS.Timeout>();

  // Cleanup intervals on unmount
  useEffect(() => {
    return () => {
      if (standardIntervalRef.current) clearInterval(standardIntervalRef.current);
      if (customIntervalRef.current) clearInterval(customIntervalRef.current);
    };
  }, []);

  const togglePlay = useCallback((isStandard: boolean) => {
    // Stop the other interval if it's running
    if (isStandard && isPlayingCustom) {
      if (customIntervalRef.current) clearInterval(customIntervalRef.current);
      setIsPlayingCustom(false);
    } else if (!isStandard && isPlayingStandard) {
      if (standardIntervalRef.current) clearInterval(standardIntervalRef.current);
      setIsPlayingStandard(false);
    }

    if (isStandard) {
      if (isPlayingStandard) {
        if (standardIntervalRef.current) clearInterval(standardIntervalRef.current);
      } else {
        const currentNumber = parseInt(standardNumber);
        autoCalculateFn(true, currentNumber);
        standardIntervalRef.current = setInterval(() => {
          setStandardNumber((prev) => {
            const nextNum = parseInt(prev) + 1;
            autoCalculateFn(true, nextNum);
            return nextNum.toString();
          });
        }, standardSpeed);
      }
      setIsPlayingStandard(!isPlayingStandard);
    } else {
      if (isPlayingCustom) {
        if (customIntervalRef.current) clearInterval(customIntervalRef.current);
      } else {
        const currentNumber = parseInt(customNumber);
        autoCalculateFn(false, currentNumber);
        customIntervalRef.current = setInterval(() => {
          setCustomNumber((prev) => {
            const nextNum = parseInt(prev) + 1;
            autoCalculateFn(false, nextNum);
            return nextNum.toString();
          });
        }, customSpeed);
      }
      setIsPlayingCustom(!isPlayingCustom);
    }
  }, [isPlayingStandard, isPlayingCustom, standardNumber, customNumber, standardSpeed, customSpeed, autoCalculateFn]);

  const handlePreviousNumber = useCallback((isStandard: boolean) => {
    // Stop any running intervals
    if (isStandard && isPlayingStandard) {
      if (standardIntervalRef.current) clearInterval(standardIntervalRef.current);
      setIsPlayingStandard(false);
    } else if (!isStandard && isPlayingCustom) {
      if (customIntervalRef.current) clearInterval(customIntervalRef.current);
      setIsPlayingCustom(false);
    }

    if (isStandard) {
      setStandardNumber((prev) => {
        const nextNum = Math.max(1, parseInt(prev) - 1);
        autoCalculateFn(true, nextNum);
        return nextNum.toString();
      });
    } else {
      setCustomNumber((prev) => {
        const nextNum = Math.max(1, parseInt(prev) - 1);
        autoCalculateFn(false, nextNum);
        return nextNum.toString();
      });
    }
  }, [isPlayingStandard, isPlayingCustom, autoCalculateFn]);

  const handleNextNumber = useCallback((isStandard: boolean) => {
    // Stop any running intervals
    if (isStandard && isPlayingStandard) {
      if (standardIntervalRef.current) clearInterval(standardIntervalRef.current);
      setIsPlayingStandard(false);
    } else if (!isStandard && isPlayingCustom) {
      if (customIntervalRef.current) clearInterval(customIntervalRef.current);
      setIsPlayingCustom(false);
    }

    if (isStandard) {
      setStandardNumber((prev) => {
        const nextNum = parseInt(prev) + 1;
        autoCalculateFn(true, nextNum);
        return nextNum.toString();
      });
    } else {
      setCustomNumber((prev) => {
        const nextNum = parseInt(prev) + 1;
        autoCalculateFn(false, nextNum);
        return nextNum.toString();
      });
    }
  }, [isPlayingStandard, isPlayingCustom, autoCalculateFn]);

  // Update intervals when speed changes
  useEffect(() => {
    if (standardIntervalRef.current && isPlayingStandard) {
      clearInterval(standardIntervalRef.current);
      const currentNumber = parseInt(standardNumber);
      autoCalculateFn(true, currentNumber);
      standardIntervalRef.current = setInterval(() => {
        setStandardNumber((prev) => {
          const nextNum = parseInt(prev) + 1;
          autoCalculateFn(true, nextNum);
          return nextNum.toString();
        });
      }, standardSpeed);
    }
  }, [standardSpeed, autoCalculateFn, isPlayingStandard, standardNumber]);

  useEffect(() => {
    if (customIntervalRef.current && isPlayingCustom) {
      clearInterval(customIntervalRef.current);
      const currentNumber = parseInt(customNumber);
      autoCalculateFn(false, currentNumber);
      customIntervalRef.current = setInterval(() => {
        setCustomNumber((prev) => {
          const nextNum = parseInt(prev) + 1;
          autoCalculateFn(false, nextNum);
          return nextNum.toString();
        });
      }, customSpeed);
    }
  }, [customSpeed, autoCalculateFn, isPlayingCustom, customNumber]);

  return {
    isPlayingStandard,
    isPlayingCustom,
    standardSpeed,
    setStandardSpeed,
    customSpeed,
    setCustomSpeed,
    standardNumber,
    setStandardNumber,
    customNumber,
    setCustomNumber,
    togglePlay,
    handlePreviousNumber,
    handleNextNumber,
  };
};
