"use client";

import React, { useState, useEffect } from 'react';
import { ToggleSwitch } from '@/components/math-shared/ToggleSwitch';
import { MathTable } from '@/components/math-shared/MathTable';
import { PlayControl } from '@/components/math-shared/PlayControl';
import { parsePolynomial, factorizePolynomial, Step } from '../utils/factorization-utils';

export function PolynomialFactorization() {
  const [polynomial, setPolynomial] = useState<string>('x^2 - 9');
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showVisualization, setShowVisualization] = useState<boolean>(true);
  const [showHistory, setShowHistory] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1000); // ms between steps
  
  // Factor the polynomial when it changes
  useEffect(() => {
    try {
      setError(null);
      const parsed = parsePolynomial(polynomial);
      const factorization = factorizePolynomial(parsed);
      setSteps(factorization.steps);
      setCurrentStep(0);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setSteps([]);
      setCurrentStep(0);
    }
  }, [polynomial]);
  
  // Handle playback
  useEffect(() => {
    if (!isPlaying || currentStep >= steps.length - 1) {
      setIsPlaying(false);
      return;
    }
    
    const timer = setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, playbackSpeed);
    
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps, playbackSpeed]);
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };
  
  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };
  
  const handlePlay = () => {
    if (currentStep >= steps.length - 1) {
      setCurrentStep(0);
    }
    setIsPlaying(true);
  };
  
  const handlePause = () => {
    setIsPlaying(false);
  };
  
  const getCurrentVisualization = () => {
    if (!steps.length || currentStep >= steps.length) {
      return null;
    }
    
    const step = steps[currentStep];
    
    if (step.visualizationType === 'difference-of-squares') {
      const { a, b } = step.visualizationData as { a: number, b: number };
      
      return (
        <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Difference of Squares Visualization</h3>
          <div className="flex flex-col items-center">
            <div className="text-xl mb-2 text-gray-900 dark:text-white">{a}² - {b}² = ({a} + {b})({a} - {b})</div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded-md text-center">
                <span className="block font-bold mb-2">First Term</span>
                <span className="text-xl">{a} + {b}</span>
              </div>
              <div className="bg-green-100 dark:bg-green-900 p-6 rounded-md text-center">
                <span className="block font-bold mb-2">Second Term</span>
                <span className="text-xl">{a} - {b}</span>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    if (step.visualizationType === 'quadratic-formula') {
      const { a, b, c } = step.visualizationData as { a: number, b: number, c: number };
      
      return (
        <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Quadratic Formula</h3>
          <div className="flex flex-col items-center">
            <div className="text-xl mb-4 text-gray-900 dark:text-white">
              For ax² + bx + c = 0, x = (-b ± √(b² - 4ac)) / 2a
            </div>
            <div className="grid grid-cols-1 gap-2">
              <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-md">
                <span className="font-bold">Given:</span> a = {a}, b = {b}, c = {c}
              </div>
              <div className="bg-green-100 dark:bg-green-900 p-4 rounded-md">
                <span className="font-bold">Discriminant:</span> b² - 4ac = {b}² - 4({a})({c}) = {b*b - 4*a*c}
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
        <p className="text-gray-500 dark:text-gray-400">No visualization available for this step.</p>
      </div>
    );
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Polynomial Factorization</h2>
      
      <div className="mb-6">
        <label htmlFor="polynomial-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Enter a polynomial to factorize:
        </label>
        <div className="flex">
          <input
            id="polynomial-input"
            type="text"
            value={polynomial}
            onChange={(e) => setPolynomial(e.target.value)}
            placeholder="e.g., x^2 - 9"
            className="flex-grow px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <button 
            onClick={() => {
              try {
                const parsed = parsePolynomial(polynomial);
                const factorization = factorizePolynomial(parsed);
                setSteps(factorization.steps);
                setCurrentStep(0);
                setError(null);
              } catch (err) {
                setError(err instanceof Error ? err.message : String(err));
              }
            }}
            className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Factorize
          </button>
        </div>
        
        {error && (
          <div className="mt-2 text-red-600 dark:text-red-400 text-sm">
            {error}
          </div>
        )}
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <p className="text-lg font-medium text-gray-900 dark:text-white">
            {steps.length > 0 && currentStep < steps.length
              ? `Step ${currentStep + 1} of ${steps.length}`
              : 'No factorization steps available'}
          </p>
        </div>
        
        <div className="flex gap-4 items-center">
          <PlayControl
            isPlaying={isPlaying}
            onPlay={handlePlay}
            onPause={handlePause}
            onReset={handleReset}
            onStep={handleNext}
            disabled={steps.length === 0}
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
      
      <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-6">
        {steps.length > 0 && currentStep < steps.length ? (
          <div>
            <p className="text-xl font-medium text-gray-900 dark:text-white mb-4">
              {steps[currentStep].explanation}
            </p>
            <div className="text-2xl text-center text-gray-900 dark:text-white py-3">
              {steps[currentStep].expression}
            </div>
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">
            Enter a polynomial and click "Factorize" to see the factorization steps.
          </p>
        )}
      </div>
      
      <div className="grid grid-cols-1 gap-4 mb-6">
        <div>
          <ToggleSwitch
            id="show-visualization"
            label="Show visualization"
            checked={showVisualization}
            onChange={setShowVisualization}
          />
        </div>
        
        <div>
          <ToggleSwitch
            id="show-history"
            label="Show factorization history"
            checked={showHistory}
            onChange={setShowHistory}
          />
        </div>
      </div>
      
      {showVisualization && steps.length > 0 && currentStep < steps.length && (
        <div className="mb-6">
          {getCurrentVisualization()}
        </div>
      )}
      
      {showHistory && steps.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Factorization History</h3>
          <MathTable
            data={steps.map((step, index) => ({
              step: index + 1,
              expression: step.expression,
              explanation: step.explanation
            }))}
            columns={[
              { header: 'Step', accessorKey: 'step' },
              { header: 'Expression', accessorKey: 'expression' },
              { header: 'Explanation', accessorKey: 'explanation' }
            ]}
            caption="Complete factorization steps"
          />
        </div>
      )}
    </div>
  );
} 