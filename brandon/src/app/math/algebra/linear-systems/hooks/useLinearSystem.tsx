"use client";

import { useState, useCallback, useEffect, useRef } from 'react';

interface Step {
  system: string;
  operation?: string;
  solution?: {
    x: number;
    y: number;
  };
}

export function useLinearSystem() {
  const [system, setSystem] = useState<string>("2x + 3y = 5\n4x - y = 7");
  const [method, setMethod] = useState<string>("elimination");
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleNext = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsPlaying(false);
    }
  }, [currentStep, steps.length]);

  const handlePrev = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const handleReset = useCallback(() => {
    setCurrentStep(0);
    setIsPlaying(false);
  }, []);

  const parseEquation = (eq: string) => {
    // Simple parser for equations like "2x + 3y = 5"
    const trimmed = eq.trim();
    const sides = trimmed.split('=');
    
    if (sides.length !== 2) {
      throw new Error(`Invalid equation: ${eq}`);
    }
    
    const leftSide = sides[0].trim();
    const rightSide = sides[1].trim();
    
    // Parse the right side to a number
    const constant = parseFloat(rightSide);
    
    if (isNaN(constant)) {
      throw new Error(`Right side must be a number: ${eq}`);
    }
    
    // Parse the left side for coefficients
    const xMatch = leftSide.match(/(-?\d*\.?\d*)x/);
    const yMatch = leftSide.match(/(-?\d*\.?\d*)y/);
    
    let xCoef = 0;
    let yCoef = 0;
    
    if (xMatch) {
      const coef = xMatch[1] === '' || xMatch[1] === '+' ? 1 : 
                 xMatch[1] === '-' ? -1 : parseFloat(xMatch[1]);
      xCoef = coef;
    }
    
    if (yMatch) {
      const coef = yMatch[1] === '' || yMatch[1] === '+' ? 1 : 
                 yMatch[1] === '-' ? -1 : parseFloat(yMatch[1]);
      yCoef = coef;
    }
    
    return { xCoef, yCoef, constant };
  };

  const solve = useCallback(() => {
    try {
      setError(undefined);
      const equations = system.split('\n').filter(line => line.trim() !== '');
      
      if (equations.length !== 2) {
        throw new Error('Please provide exactly 2 equations.');
      }
      
      const eq1 = parseEquation(equations[0]);
      const eq2 = parseEquation(equations[1]);
      
      const newSteps: Step[] = [
        {
          operation: 'Starting system',
          system: system,
        }
      ];
      
      // Different solving methods
      if (method === 'elimination') {
        // Gaussian elimination
        const factor = eq1.xCoef / eq2.xCoef;
        
        const newYCoef = eq1.yCoef - factor * eq2.yCoef;
        const newConstant = eq1.constant - factor * eq2.constant;
        
        const y = newConstant / newYCoef;
        const x = (eq1.constant - eq1.yCoef * y) / eq1.xCoef;
        
        newSteps.push({
          operation: `Multiply second equation by ${factor.toFixed(2)}`,
          system: `${eq1.xCoef}x + ${eq1.yCoef}y = ${eq1.constant}\n${factor.toFixed(2)} * (${eq2.xCoef}x + ${eq2.yCoef}y = ${eq2.constant})`,
        });
        
        newSteps.push({
          operation: 'Subtract to eliminate x',
          system: `${eq1.xCoef}x + ${eq1.yCoef}y = ${eq1.constant}\n${(factor * eq2.xCoef).toFixed(2)}x + ${(factor * eq2.yCoef).toFixed(2)}y = ${(factor * eq2.constant).toFixed(2)}`,
        });
        
        newSteps.push({
          operation: 'Solve for y',
          system: `${newYCoef.toFixed(2)}y = ${newConstant.toFixed(2)}\ny = ${y.toFixed(2)}`,
        });
        
        newSteps.push({
          operation: 'Substitute y to find x',
          system: `${eq1.xCoef}x + ${eq1.yCoef} * ${y.toFixed(2)} = ${eq1.constant}\n${eq1.xCoef}x = ${eq1.constant} - ${(eq1.yCoef * y).toFixed(2)}\nx = ${x.toFixed(2)}`,
        });
        
        newSteps.push({
          operation: 'Solution',
          system: `x = ${x.toFixed(2)}, y = ${y.toFixed(2)}`,
          solution: { x, y }
        });
      } else if (method === 'substitution') {
        // Substitution method
        const x = (eq2.constant - eq2.yCoef * (eq1.constant / eq1.yCoef)) / (eq2.xCoef - eq2.yCoef * (eq1.xCoef / eq1.yCoef));
        const y = (eq1.constant - eq1.xCoef * x) / eq1.yCoef;
        
        newSteps.push({
          operation: 'Solve first equation for y',
          system: `${eq1.yCoef}y = ${eq1.constant} - ${eq1.xCoef}x\ny = (${eq1.constant} - ${eq1.xCoef}x) / ${eq1.yCoef}`,
        });
        
        newSteps.push({
          operation: 'Substitute y into second equation',
          system: `${eq2.xCoef}x + ${eq2.yCoef} * ((${eq1.constant} - ${eq1.xCoef}x) / ${eq1.yCoef}) = ${eq2.constant}`,
        });
        
        newSteps.push({
          operation: 'Solve for x',
          system: `x = ${x.toFixed(2)}`,
        });
        
        newSteps.push({
          operation: 'Substitute x to find y',
          system: `y = (${eq1.constant} - ${eq1.xCoef} * ${x.toFixed(2)}) / ${eq1.yCoef}\ny = ${y.toFixed(2)}`,
        });
        
        newSteps.push({
          operation: 'Solution',
          system: `x = ${x.toFixed(2)}, y = ${y.toFixed(2)}`,
          solution: { x, y }
        });
      } else if (method === 'cramer') {
        // Cramer's rule
        const D = eq1.xCoef * eq2.yCoef - eq1.yCoef * eq2.xCoef;
        const Dx = eq1.constant * eq2.yCoef - eq1.yCoef * eq2.constant;
        const Dy = eq1.xCoef * eq2.constant - eq1.constant * eq2.xCoef;
        
        const x = Dx / D;
        const y = Dy / D;
        
        newSteps.push({
          operation: 'Calculate determinant D',
          system: `D = ${eq1.xCoef} * ${eq2.yCoef} - ${eq1.yCoef} * ${eq2.xCoef} = ${D.toFixed(2)}`,
        });
        
        newSteps.push({
          operation: 'Calculate determinant Dx',
          system: `Dx = ${eq1.constant} * ${eq2.yCoef} - ${eq1.yCoef} * ${eq2.constant} = ${Dx.toFixed(2)}`,
        });
        
        newSteps.push({
          operation: 'Calculate determinant Dy',
          system: `Dy = ${eq1.xCoef} * ${eq2.constant} - ${eq1.constant} * ${eq2.xCoef} = ${Dy.toFixed(2)}`,
        });
        
        newSteps.push({
          operation: 'Solve for x and y',
          system: `x = Dx / D = ${Dx.toFixed(2)} / ${D.toFixed(2)} = ${x.toFixed(2)}\ny = Dy / D = ${Dy.toFixed(2)} / ${D.toFixed(2)} = ${y.toFixed(2)}`,
        });
        
        newSteps.push({
          operation: 'Solution',
          system: `x = ${x.toFixed(2)}, y = ${y.toFixed(2)}`,
          solution: { x, y }
        });
      }
      
      setSteps(newSteps);
      setCurrentStep(0);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setSteps([]);
    }
  }, [system, method]);

  // Auto-play logic
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setTimeout(() => {
        handleNext();
      }, 1500);
    }
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isPlaying, handleNext, currentStep]);

  return {
    system,
    method,
    steps,
    currentStep,
    isPlaying,
    error,
    setSystem,
    setMethod,
    handleNext,
    handlePrev,
    handlePlay,
    handlePause,
    handleReset,
    solve
  };
} 