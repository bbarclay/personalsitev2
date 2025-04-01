import React, { useState } from 'react';

interface DataSet {
  data: number[];
  mean: number;
  median: number;
  mode: number[];
  stdDev: number;
  variance: number;
  range: number;
  min: number;
  max: number;
}

export default function SolverPanel() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<DataSet | null>(null);
  const [error, setError] = useState('');

  const calculateStatistics = (data: number[]): DataSet => {
    // Mean calculation
    const sum = data.reduce((acc, val) => acc + val, 0);
    const mean = sum / data.length;
    
    // Median calculation
    const sortedData = [...data].sort((a, b) => a - b);
    let median: number;
    const mid = Math.floor(sortedData.length / 2);
    median = sortedData.length % 2 === 0 
      ? (sortedData[mid - 1] + sortedData[mid]) / 2 
      : sortedData[mid];
    
    // Mode calculation
    const counts: Record<number, number> = {};
    data.forEach(num => {
      counts[num] = (counts[num] || 0) + 1;
    });
    
    let maxCount = 0;
    let modes: number[] = [];
    
    for (const num in counts) {
      if (counts[num] > maxCount) {
        maxCount = counts[num];
        modes = [parseFloat(num)];
      } else if (counts[num] === maxCount) {
        modes.push(parseFloat(num));
      }
    }
    
    // Other statistics
    const variance = data.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / data.length;
    const stdDev = Math.sqrt(variance);
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min;
    
    return {
      data,
      mean,
      median,
      mode: modes,
      stdDev,
      variance,
      range,
      min,
      max
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      // Parse input as comma or space separated numbers
      const data = input
        .split(/[,\s]+/)
        .map(s => s.trim())
        .filter(s => s !== '')
        .map(s => {
          const num = parseFloat(s);
          if (isNaN(num)) {
            throw new Error(`"${s}" is not a valid number`);
          }
          return num;
        });
      
      if (data.length === 0) {
        setError('Please enter at least one number');
        return;
      }
      
      setResult(calculateStatistics(data));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid input');
    }
  };

  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2>Statistical Analysis Tool</h2>
        <p>
          Enter a set of numbers separated by commas or spaces to calculate key statistical measures.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="data-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Data Set
          </label>
          <div className="mt-1">
            <textarea
              id="data-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter numbers (e.g., 1, 2, 3, 4, 5)"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              rows={3}
            />
          </div>
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Calculate
        </button>
      </form>

      {error && (
        <div className="rounded-md bg-red-50 dark:bg-red-900/30 p-4">
          <div className="flex">
            <div className="text-sm text-red-700 dark:text-red-400">
              {error}
            </div>
          </div>
        </div>
      )}

      {result && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 overflow-hidden">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Statistical Results</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3 rounded-md bg-white dark:bg-gray-700 shadow">
              <span className="block text-sm font-medium text-gray-500 dark:text-gray-400">Mean</span>
              <span className="block mt-1 text-lg font-semibold text-gray-900 dark:text-white">{result.mean.toFixed(4)}</span>
            </div>
            
            <div className="p-3 rounded-md bg-white dark:bg-gray-700 shadow">
              <span className="block text-sm font-medium text-gray-500 dark:text-gray-400">Median</span>
              <span className="block mt-1 text-lg font-semibold text-gray-900 dark:text-white">{result.median.toFixed(4)}</span>
            </div>
            
            <div className="p-3 rounded-md bg-white dark:bg-gray-700 shadow">
              <span className="block text-sm font-medium text-gray-500 dark:text-gray-400">Mode</span>
              <span className="block mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                {result.mode.length > 0 
                  ? result.mode.map(m => m.toFixed(4)).join(', ') 
                  : 'No mode'}
              </span>
            </div>
            
            <div className="p-3 rounded-md bg-white dark:bg-gray-700 shadow">
              <span className="block text-sm font-medium text-gray-500 dark:text-gray-400">Standard Deviation</span>
              <span className="block mt-1 text-lg font-semibold text-gray-900 dark:text-white">{result.stdDev.toFixed(4)}</span>
            </div>
            
            <div className="p-3 rounded-md bg-white dark:bg-gray-700 shadow">
              <span className="block text-sm font-medium text-gray-500 dark:text-gray-400">Variance</span>
              <span className="block mt-1 text-lg font-semibold text-gray-900 dark:text-white">{result.variance.toFixed(4)}</span>
            </div>
            
            <div className="p-3 rounded-md bg-white dark:bg-gray-700 shadow">
              <span className="block text-sm font-medium text-gray-500 dark:text-gray-400">Range</span>
              <span className="block mt-1 text-lg font-semibold text-gray-900 dark:text-white">{result.range.toFixed(4)}</span>
            </div>
            
            <div className="p-3 rounded-md bg-white dark:bg-gray-700 shadow">
              <span className="block text-sm font-medium text-gray-500 dark:text-gray-400">Minimum</span>
              <span className="block mt-1 text-lg font-semibold text-gray-900 dark:text-white">{result.min.toFixed(4)}</span>
            </div>
            
            <div className="p-3 rounded-md bg-white dark:bg-gray-700 shadow">
              <span className="block text-sm font-medium text-gray-500 dark:text-gray-400">Maximum</span>
              <span className="block mt-1 text-lg font-semibold text-gray-900 dark:text-white">{result.max.toFixed(4)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 