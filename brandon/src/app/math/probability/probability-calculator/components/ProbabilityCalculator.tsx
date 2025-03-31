"use client";

import React, { useState, useEffect } from 'react';
import { ToggleSwitch } from '@/components/math-shared/ToggleSwitch';
import { MathTable } from '@/components/math-shared/MathTable';
import { 
  calculateSimpleProbability, 
  calculateCombinationProbability, 
  Step, 
  Solution 
} from '../utils/probability-utils';

type CalculationType = 'simple' | 'combination';

export function ProbabilityCalculator() {
  // State for calculation type
  const [calculationType, setCalculationType] = useState<CalculationType>('simple');
  
  // State for simple probability
  const [favorableOutcomes, setFavorableOutcomes] = useState<number>(1);
  const [totalOutcomes, setTotalOutcomes] = useState<number>(6);
  
  // State for combination probability
  const [targetItems, setTargetItems] = useState<number>(13);
  const [selectedItems, setSelectedItems] = useState<number>(5);
  const [totalItems, setTotalItems] = useState<number>(52);
  
  // Shared state
  const [steps, setSteps] = useState<Step[]>([]);
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState<boolean>(true);
  
  // Calculate result based on current inputs
  useEffect(() => {
    try {
      setError(null);
      let solution: Solution;
      
      if (calculationType === 'simple') {
        solution = calculateSimpleProbability(favorableOutcomes, totalOutcomes);
      } else {
        solution = calculateCombinationProbability(targetItems, selectedItems, totalItems);
      }
      
      setSteps(solution.steps);
      setResult(solution.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setSteps([]);
      setResult(null);
    }
  }, [calculationType, favorableOutcomes, totalOutcomes, targetItems, selectedItems, totalItems]);
  
  // Examples handlers
  const setDiceExample = () => {
    setCalculationType('simple');
    setFavorableOutcomes(1);
    setTotalOutcomes(6);
  };
  
  const setCoinExample = () => {
    setCalculationType('simple');
    setFavorableOutcomes(1);
    setTotalOutcomes(2);
  };
  
  const setCardExample = () => {
    setCalculationType('combination');
    setTargetItems(13);
    setSelectedItems(5);
    setTotalItems(52);
  };
  
  const setLotteryExample = () => {
    setCalculationType('combination');
    setTargetItems(6);
    setSelectedItems(6);
    setTotalItems(49);
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Probability Calculator</h2>
      
      {/* Calculator Type Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Calculation Type
        </label>
        <div className="flex space-x-4">
          <button
            onClick={() => setCalculationType('simple')}
            className={`px-4 py-2 rounded-md ${
              calculationType === 'simple'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            }`}
          >
            Simple Probability
          </button>
          <button
            onClick={() => setCalculationType('combination')}
            className={`px-4 py-2 rounded-md ${
              calculationType === 'combination'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            }`}
          >
            Combination Probability
          </button>
        </div>
      </div>
      
      {/* Input Form */}
      <div className="mb-6">
        {calculationType === 'simple' ? (
          <div className="space-y-4">
            <div>
              <label htmlFor="favorable-outcomes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Favorable Outcomes
              </label>
              <input
                id="favorable-outcomes"
                type="number"
                min="0"
                value={favorableOutcomes}
                onChange={(e) => setFavorableOutcomes(Number(e.target.value))}
                className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="total-outcomes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Total Outcomes
              </label>
              <input
                id="total-outcomes"
                type="number"
                min="1"
                value={totalOutcomes}
                onChange={(e) => setTotalOutcomes(Number(e.target.value))}
                className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label htmlFor="target-items" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Target Items (e.g., Hearts in a deck)
              </label>
              <input
                id="target-items"
                type="number"
                min="0"
                value={targetItems}
                onChange={(e) => setTargetItems(Number(e.target.value))}
                className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="selected-items" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Items to Select (e.g., Cards drawn)
              </label>
              <input
                id="selected-items"
                type="number"
                min="1"
                value={selectedItems}
                onChange={(e) => setSelectedItems(Number(e.target.value))}
                className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="total-items" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Total Items (e.g., Total cards in deck)
              </label>
              <input
                id="total-items"
                type="number"
                min="1"
                value={totalItems}
                onChange={(e) => setTotalItems(Number(e.target.value))}
                className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>
        )}
        
        {error && (
          <div className="mt-2 text-red-600 dark:text-red-400 text-sm">
            {error}
          </div>
        )}
      </div>
      
      {/* Example Scenarios */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Example Scenarios
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={setDiceExample}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md text-sm hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Roll a six on a die
          </button>
          <button
            onClick={setCoinExample}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md text-sm hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Flip heads on a coin
          </button>
          <button
            onClick={setCardExample}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md text-sm hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Draw 5 hearts from a deck
          </button>
          <button
            onClick={setLotteryExample}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md text-sm hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Win a 6/49 lottery
          </button>
        </div>
      </div>
      
      {/* Result Display */}
      <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-6">
        {result !== null ? (
          <div className="text-center">
            <h3 className="text-xl font-medium mb-4 text-gray-900 dark:text-white">Result</h3>
            <div className="flex justify-center space-x-8">
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">Decimal</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {result.toFixed(6)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">Percentage</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {(result * 100).toFixed(4)}%
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">Odds</p>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {result < 1 ? `1 : ${Math.round(1 / result - 1)}` : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">
            Enter values to calculate probability.
          </p>
        )}
      </div>
      
      {/* Solution Steps Toggle */}
      <div className="mb-4">
        <ToggleSwitch
          id="show-history"
          label="Show step-by-step solution"
          checked={showHistory}
          onChange={setShowHistory}
        />
      </div>
      
      {/* Solution Steps */}
      {showHistory && steps.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Solution Steps</h3>
          <MathTable
            data={steps.map((step, index) => ({
              step: index + 1,
              formula: step.formula,
              explanation: step.explanation
            }))}
            columns={[
              { header: 'Step', accessorKey: 'step' },
              { header: 'Formula', accessorKey: 'formula' },
              { header: 'Explanation', accessorKey: 'explanation' }
            ]}
            caption="Complete solution steps"
          />
        </div>
      )}
    </div>
  );
} 