"use client";

import React, { useState, useEffect } from 'react';
import { ToggleSwitch } from '@/components/math-shared/ToggleSwitch';
import { MathTable } from '@/components/math-shared/MathTable';
import { PlayControl } from '@/components/math-shared/PlayControl';
import { parseSystem, solveSystem, Step, Method } from '../utils/system-solver-utils';

export function LinearSystemsSolver() {
  const [system, setSystem] = useState<string>('2x + y = 5\nx - y = 1');
  const [method, setMethod] = useState<Method>('elimination');
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showGraph, setShowGraph] = useState<boolean>(true);
  const [showHistory, setShowHistory] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1000); // ms between steps
  
  // Solve the system when it changes or method changes
  useEffect(() => {
    try {
      setError(null);
      const parsed = parseSystem(system);
      const solution = solveSystem(parsed, method);
      setSteps(solution.steps);
      setCurrentStep(0);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setSteps([]);
      setCurrentStep(0);
    }
  }, [system, method]);
  
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
  
  const renderGraph = () => {
    if (!steps.length || currentStep >= steps.length) {
      return (
        <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
          <p className="text-gray-500 dark:text-gray-400">No graph available.</p>
        </div>
      );
    }
    
    const step = steps[currentStep];
    
    // Check if the step has graph data
    if (!step.graphData) {
      return (
        <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
          <p className="text-gray-500 dark:text-gray-400">No visualization for this step.</p>
        </div>
      );
    }
    
    const { equations, point } = step.graphData;
    
    // This would be a placeholder for an actual graph component
    // In a real implementation, you'd use a library like Chart.js, D3, or react-plotly
    return (
      <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">System Visualization</h3>
        <div className="h-64 relative bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
          {/* This is a placeholder for the actual graph - we'd render SVG lines for equations */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400 text-center">
              {point 
                ? `Solution point at (${point.x.toFixed(2)}, ${point.y.toFixed(2)})`
                : 'Graphical representation of the system'
              }
            </p>
            <div className="text-sm mt-2">
              {equations.map((eq, i) => (
                <div key={i} className="flex items-center gap-2 my-1">
                  <div className={`w-3 h-3 rounded-full ${
                    ['bg-blue-500', 'bg-green-500', 'bg-red-500', 'bg-purple-500'][i % 4]
                  }`}></div>
                  <span>{eq}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Linear Systems Solver</h2>
      
      <div className="mb-6">
        <label htmlFor="system-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Enter a system of linear equations (one per line):
        </label>
        <textarea
          id="system-input"
          value={system}
          onChange={(e) => setSystem(e.target.value)}
          rows={3}
          placeholder="e.g., 2x + y = 5&#10;x - y = 1"
          className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        
        <div className="mt-3 flex flex-wrap gap-3">
          <div>
            <label htmlFor="method-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Solution Method:
            </label>
            <select
              id="method-select"
              value={method}
              onChange={(e) => setMethod(e.target.value as Method)}
              className="px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="elimination">Elimination</option>
              <option value="substitution">Substitution</option>
              <option value="matrices">Matrix Method</option>
            </select>
          </div>
          
          <div className="ml-auto">
            <button 
              onClick={() => {
                try {
                  const parsed = parseSystem(system);
                  const solution = solveSystem(parsed, method);
                  setSteps(solution.steps);
                  setCurrentStep(0);
                  setError(null);
                } catch (err) {
                  setError(err instanceof Error ? err.message : String(err));
                }
              }}
              className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Solve
            </button>
          </div>
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
            <div className="text-xl text-center text-gray-900 dark:text-white py-3 whitespace-pre-wrap">
              {steps[currentStep].equations}
            </div>
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">
            Enter a system of equations and click "Solve" to see the solution steps.
          </p>
        )}
      </div>
      
      <div className="grid grid-cols-1 gap-4 mb-6">
        <div>
          <ToggleSwitch
            id="show-graph"
            label="Show graph visualization"
            checked={showGraph}
            onChange={setShowGraph}
          />
        </div>
        
        <div>
          <ToggleSwitch
            id="show-history"
            label="Show solution history"
            checked={showHistory}
            onChange={setShowHistory}
          />
        </div>
      </div>
      
      {showGraph && steps.length > 0 && currentStep < steps.length && (
        <div className="mb-6">
          {renderGraph()}
        </div>
      )}
      
      {showHistory && steps.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Solution History</h3>
          <MathTable
            data={steps.map((step, index) => ({
              step: index + 1,
              equations: step.equations,
              explanation: step.explanation
            }))}
            columns={[
              { header: 'Step', accessorKey: 'step' },
              { header: 'Equations', accessorKey: 'equations' },
              { header: 'Explanation', accessorKey: 'explanation' }
            ]}
            caption="Complete solution steps"
          />
        </div>
      )}
    </div>
  );
} 