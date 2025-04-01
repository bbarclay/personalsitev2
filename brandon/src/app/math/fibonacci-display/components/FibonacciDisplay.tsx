"use client";

import React, { useState, useEffect } from 'react';

const FibonacciDisplay = () => {
  const [count, setCount] = useState(10);
  const [sequence, setSequence] = useState<number[]>([]);
  const [animationIndex, setAnimationIndex] = useState(-1);

  useEffect(() => {
    generateSequence(count);
  }, [count]);

  const generateSequence = (n: number) => {
    setAnimationIndex(-1);
    const fibonacci: number[] = [];
    
    if (n >= 1) fibonacci.push(0);
    if (n >= 2) fibonacci.push(1);
    
    for (let i = 2; i < n; i++) {
      fibonacci.push(fibonacci[i - 1] + fibonacci[i - 2]);
    }
    
    setSequence(fibonacci);
    
    // Start animation
    if (fibonacci.length > 0) {
      setAnimationIndex(0);
      const interval = setInterval(() => {
        setAnimationIndex(prev => {
          if (prev >= fibonacci.length - 1) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 500);
      
      return () => clearInterval(interval);
    }
  };

  const getFibonacciRatio = (index: number): string => {
    if (index < 2) return "N/A";
    const ratio = sequence[index] / sequence[index - 1];
    return ratio.toFixed(6);
  };

  const getGoldenRatioDifference = (index: number): string => {
    if (index < 2) return "N/A";
    const goldenRatio = (1 + Math.sqrt(5)) / 2; // ≈ 1.618033988749895
    const ratio = sequence[index] / sequence[index - 1];
    const difference = Math.abs(goldenRatio - ratio);
    return difference.toFixed(8);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Fibonacci Sequence Explorer</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Explore the properties of the Fibonacci sequence and its relationship to the Golden Ratio.
        </p>
        
        <div className="flex items-center gap-4 mb-4">
          <label className="whitespace-nowrap">Number of terms:</label>
          <input
            type="range"
            min="2"
            max="40"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value))}
            className="w-full max-w-xs"
          />
          <span className="w-10 text-center">{count}</span>
        </div>
        
        <button
          onClick={() => generateSequence(count)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Regenerate
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="p-2 border">Index</th>
              <th className="p-2 border">Fibonacci Number</th>
              <th className="p-2 border">Ratio (F_n / F_n-1)</th>
              <th className="p-2 border">Difference from φ</th>
            </tr>
          </thead>
          <tbody>
            {sequence.map((num, index) => (
              <tr 
                key={index}
                className={`${
                  index === animationIndex ? 'bg-blue-100 dark:bg-blue-900/30' : ''
                } hover:bg-gray-50 dark:hover:bg-gray-800/50`}
              >
                <td className="p-2 border text-center">{index}</td>
                <td className="p-2 border text-right font-mono">{num.toLocaleString()}</td>
                <td className="p-2 border text-right font-mono">{getFibonacciRatio(index)}</td>
                <td className="p-2 border text-right font-mono">{getGoldenRatioDifference(index)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h3 className="text-lg font-medium mb-2">Did you know?</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>The ratio of consecutive Fibonacci numbers approaches the Golden Ratio (φ ≈ 1.618033988749895).</li>
          <li>Fibonacci numbers appear frequently in nature, such as in the arrangement of leaves and petals on plants.</li>
          <li>The Fibonacci sequence can be extended to negative indices, creating a bi-directional sequence.</li>
          <li>The sum of the squares of any Fibonacci numbers equals the product of the last number and the number at n+1.</li>
        </ul>
      </div>
    </div>
  );
};

export default FibonacciDisplay; 