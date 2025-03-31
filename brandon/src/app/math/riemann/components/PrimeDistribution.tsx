"use client";

import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { generatePrimes, calculatePi, calculateRiemannApproximation } from '../utils/primeUtils';

const PrimeDistribution = () => {
  const [limit, setLimit] = useState(1000);
  const [primes, setPrimes] = useState<number[]>([]);
  const [plotData, setPlotData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    
    const calculateData = async () => {
      // Generate primes up to limit
      const primeList = generatePrimes(limit);
      setPrimes(primeList);
      
      // Create plot data points
      const data = [];
      const step = Math.max(1, Math.floor(limit / 100)); // For smoother graph with fewer points
      
      for (let x = 2; x <= limit; x += step) {
        const piX = calculatePi(x, primeList);
        const riemannApprox = calculateRiemannApproximation(x);
        
        data.push({
          x,
          pi: piX,
          riemann: riemannApprox,
          error: Math.abs(piX - riemannApprox)
        });
      }
      
      setPlotData(data);
      setLoading(false);
    };
    
    calculateData();
  }, [limit]);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
        Prime Number Distribution
      </h3>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        The Riemann Hypothesis has profound implications for understanding how prime numbers are distributed.
        This visualization shows the relationship between the actual count of primes (π(x)) and the approximation
        derived from the Riemann zeta function.
      </p>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Upper Limit
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            min="10"
            max="100000"
            value={limit}
            onChange={(e) => setLimit(+e.target.value)}
            className="p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 w-32"
          />
          <button
            onClick={() => setLimit(limit)}
            className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? 'Calculating...' : 'Update'}
          </button>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          For better performance, keep values below 100,000
        </p>
      </div>
      
      <div className="h-96 w-full mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={plotData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="x" 
              label={{ value: 'x', position: 'insideBottomRight', offset: -10 }} 
              scale="log"
              domain={['dataMin', 'dataMax']}
            />
            <YAxis 
              label={{ value: 'Prime Count', angle: -90, position: 'insideLeft' }} 
            />
            <Tooltip 
              formatter={(value: any) => [parseFloat(value).toFixed(2), '']} 
              labelFormatter={(label) => `x = ${label}`}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="pi" 
              stroke="#8884d8" 
              strokeWidth={2} 
              dot={false} 
              name="π(x) - Actual prime count"
            />
            <Line 
              type="monotone" 
              dataKey="riemann" 
              stroke="#82ca9d" 
              strokeWidth={2} 
              dot={false} 
              name="Li(x) - Riemann approximation"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">The Prime Number Theorem</h4>
          <p className="text-gray-700 dark:text-gray-300">
            The Prime Number Theorem states that the number of primes less than or equal to x, denoted π(x),
            is approximately x/ln(x) for large values of x.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mt-2">
            The Riemann Hypothesis provides a more precise bound on the error term in this approximation.
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">The Riemann Connection</h4>
          <p className="text-gray-700 dark:text-gray-300">
            If the Riemann Hypothesis is true, the error between π(x) and Li(x) (the logarithmic integral)
            is bounded by O(√x·ln(x)), which is the best possible error bound.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mt-2">
            This has profound implications for cryptography and other fields that rely on the distribution of primes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrimeDistribution;
