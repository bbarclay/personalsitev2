"use client";

import React, { useState, useEffect } from 'react';
import { PlayControl } from '@/components/math-shared/PlayControl';

interface QuadraticResult {
  discriminant: number;
  x1: number | null;
  x2: number | null;
  steps: string[];
  imaginary: boolean;
}

export function QuadraticSolver() {
  const [a, setA] = useState<string>('1');
  const [b, setB] = useState<string>('0');
  const [c, setC] = useState<string>('0');
  const [result, setResult] = useState<QuadraticResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1000); // ms between steps

  // Handle playback
  useEffect(() => {
    if (!isPlaying || !result || currentStep >= result.steps.length - 1) {
      setIsPlaying(false);
      return;
    }
    
    const timer = setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, playbackSpeed);
    
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, result, playbackSpeed]);
  
  const handleNext = () => {
    if (result && currentStep < result.steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };
  
  const handlePlay = () => {
    if (result) {
      if (currentStep >= result.steps.length - 1) {
        setCurrentStep(0);
      }
      setIsPlaying(true);
    }
  };
  
  const handlePause = () => {
    setIsPlaying(false);
  };

  const solve = () => {
    setError(null);
    
    // Validate inputs
    const coeffA = parseFloat(a);
    const coeffB = parseFloat(b);
    const coeffC = parseFloat(c);
    
    if (isNaN(coeffA) || isNaN(coeffB) || isNaN(coeffC)) {
      setError("Please enter valid numbers for all coefficients");
      return;
    }
    
    if (coeffA === 0) {
      setError("The coefficient 'a' cannot be zero (that would make it a linear equation)");
      return;
    }
    
    // Calculate the discriminant
    const discriminant = coeffB * coeffB - 4 * coeffA * coeffC;
    
    // Initialize steps array
    const steps = [
      `Step 1: Identify the coefficients in the standard form ax² + bx + c = 0`,
      `a = ${coeffA}, b = ${coeffB}, c = ${coeffC}`,
      `Step 2: Calculate the discriminant: b² - 4ac`,
      `discriminant = ${coeffB}² - 4 × ${coeffA} × ${coeffC} = ${discriminant.toFixed(4)}`
    ];
    
    let x1 = null;
    let x2 = null;
    let imaginary = false;
    
    if (discriminant >= 0) {
      // Real roots
      x1 = (-coeffB + Math.sqrt(discriminant)) / (2 * coeffA);
      x2 = (-coeffB - Math.sqrt(discriminant)) / (2 * coeffA);
      
      steps.push(`Step 3: Calculate the roots using the quadratic formula: x = (-b ± √(b² - 4ac)) / 2a`);
      steps.push(`x₁ = (-(${coeffB}) + √${discriminant.toFixed(4)}) / (2 × ${coeffA}) = ${x1.toFixed(4)}`);
      steps.push(`x₂ = (-(${coeffB}) - √${discriminant.toFixed(4)}) / (2 × ${coeffA}) = ${x2.toFixed(4)}`);
      
      if (discriminant === 0) {
        steps.push(`Since the discriminant is zero, the equation has exactly one solution (repeated root).`);
      } else {
        steps.push(`Since the discriminant is positive, the equation has two distinct real solutions.`);
      }
    } else {
      // Complex roots
      imaginary = true;
      const realPart = -coeffB / (2 * coeffA);
      const imaginaryPart = Math.sqrt(Math.abs(discriminant)) / (2 * coeffA);
      
      steps.push(`Step 3: Since the discriminant is negative, the roots are complex.`);
      steps.push(`x₁ = ${realPart.toFixed(4)} + ${imaginaryPart.toFixed(4)}i`);
      steps.push(`x₂ = ${realPart.toFixed(4)} - ${imaginaryPart.toFixed(4)}i`);
    }
    
    setResult({
      discriminant,
      x1,
      x2,
      steps,
      imaginary
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Quadratic Equation Solver</h2>
      
      <div className="mb-6">
        <p className="text-gray-700 dark:text-gray-300 mb-2">
          Enter the coefficients for your quadratic equation in the form:
        </p>
        <div className="flex items-center justify-center text-xl mb-4">
          <span className="text-gray-900 dark:text-white">
            <input 
              type="text" 
              value={a}
              onChange={(e) => setA(e.target.value)}
              className="w-16 text-center mx-1 border rounded-md px-2 py-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            /> x² + 
            <input 
              type="text" 
              value={b}
              onChange={(e) => setB(e.target.value)}
              className="w-16 text-center mx-1 border rounded-md px-2 py-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            /> x + 
            <input 
              type="text" 
              value={c}
              onChange={(e) => setC(e.target.value)}
              className="w-16 text-center mx-1 border rounded-md px-2 py-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            /> = 0
          </span>
        </div>
      </div>
      
      <div className="flex justify-center mb-6">
        <button 
          onClick={solve}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
        >
          Solve
        </button>
      </div>
      
      {error && (
        <div className="p-4 mb-6 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-md text-red-700 dark:text-red-300">
          {error}
        </div>
      )}
      
      {result && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Results</h3>
          
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md mb-6">
            <div className="mb-2">
              <span className="font-medium text-gray-700 dark:text-gray-300">Discriminant:</span> 
              <span className="ml-2 text-gray-900 dark:text-white">{result.discriminant.toFixed(4)}</span>
            </div>
            
            {result.imaginary ? (
              <div>
                <p className="font-medium text-gray-700 dark:text-gray-300 mb-1">Complex Roots:</p>
                <div className="pl-4">
                  <div className="text-gray-900 dark:text-white mb-1">
                    x₁ = {(-parseFloat(b) / (2 * parseFloat(a))).toFixed(4)} + {(Math.sqrt(Math.abs(result.discriminant)) / (2 * parseFloat(a))).toFixed(4)}i
                  </div>
                  <div className="text-gray-900 dark:text-white">
                    x₂ = {(-parseFloat(b) / (2 * parseFloat(a))).toFixed(4)} - {(Math.sqrt(Math.abs(result.discriminant)) / (2 * parseFloat(a))).toFixed(4)}i
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <p className="font-medium text-gray-700 dark:text-gray-300 mb-1">Real Roots:</p>
                <div className="pl-4">
                  <div className="text-gray-900 dark:text-white mb-1">x₁ = {result.x1?.toFixed(4)}</div>
                  <div className="text-gray-900 dark:text-white">x₂ = {result.x2?.toFixed(4)}</div>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                {result.steps.length > 0 && currentStep < result.steps.length
                  ? `Step ${currentStep + 1} of ${result.steps.length}`
                  : 'No solution steps available'}
              </p>
            </div>
            
            <div className="flex gap-4 items-center">
              <PlayControl
                isPlaying={isPlaying}
                onPlay={handlePlay}
                onPause={handlePause}
                onReset={handleReset}
                onStep={handleNext}
                disabled={result.steps.length === 0}
              />
              
              <select
                value={playbackSpeed}
                onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                className="px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value={2000}>Slow</option>
                <option value={1000}>Normal</option>
                <option value={500}>Fast</option>
              </select>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Step-by-Step Solution</h3>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
            {result.steps.length > 0 && currentStep < result.steps.length ? (
              <div className="text-gray-800 dark:text-gray-200 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-md">
                {result.steps[currentStep]}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                No steps to display.
              </p>
            )}
            
            <div className="mt-6 space-y-3">
              {result.steps.map((step, index) => (
                <p key={index} className={`text-gray-800 dark:text-gray-200 ${index === currentStep ? 'font-bold' : ''}`}>{step}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 