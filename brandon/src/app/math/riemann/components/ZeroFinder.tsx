"use client";

import React, { useState, useEffect } from 'react';
import { calculateZetaFunction, findZeros } from '../utils/zetaUtils';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis, ReferenceLine } from 'recharts';

const ZeroFinder = () => {
  const [zeros, setZeros] = useState<number[]>([]);
  const [rangeStart, setRangeStart] = useState(0);
  const [rangeEnd, setRangeEnd] = useState(50);
  const [loading, setLoading] = useState(false);
  const [plotData, setPlotData] = useState<any[]>([]);

  useEffect(() => {
    const findZetaZeros = async () => {
      setLoading(true);
      const foundZeros = await findZeros(rangeStart, rangeEnd);
      setZeros(foundZeros);
      
      // Create plot data from zeros
      const data = foundZeros.map((zero, index) => ({
        index: index + 1,
        t: zero,
        height: 1/2, // All non-trivial zeros should have real part 1/2
      }));
      
      setPlotData(data);
      setLoading(false);
    };
    
    findZetaZeros();
  }, [rangeStart, rangeEnd]);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
        Non-trivial Zeros of the Zeta Function
      </h3>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        According to the Riemann Hypothesis, all non-trivial zeros of the zeta function lie on the critical line
        with real part 1/2. This tool finds and visualizes these zeros.
      </p>
      
      <div className="flex flex-wrap gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            t-Range Start
          </label>
          <input
            type="number"
            value={rangeStart}
            onChange={(e) => setRangeStart(+e.target.value)}
            className="p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 w-24"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            t-Range End
          </label>
          <input
            type="number"
            value={rangeEnd}
            onChange={(e) => setRangeEnd(+e.target.value)}
            className="p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 w-24"
          />
        </div>
        
        <div className="flex items-end">
          <button
            onClick={() => {
              setRangeStart(rangeStart);
              setRangeEnd(rangeEnd);
            }}
            className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? 'Calculating...' : 'Find Zeros'}
          </button>
        </div>
      </div>
      
      <div className="h-96 w-full mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <CartesianGrid />
            <XAxis type="number" dataKey="t" name="t-value" label={{ value: 't value', position: 'insideBottomRight', offset: -10 }} />
            <YAxis type="number" dataKey="height" name="real part" label={{ value: 'real part', angle: -90, position: 'insideLeft' }} />
            <ZAxis type="number" range={[60, 200]} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} formatter={(value: any) => [value.toFixed(8), 't-value']} />
            <ReferenceLine y={0.5} stroke="red" strokeDasharray="3 3" label="Critical Line (Re(s) = 1/2)" />
            <Scatter name="Zeta Zeros" data={plotData} fill="#8884d8" shape="circle" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      
      <div className="overflow-auto max-h-60 border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
        <h4 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Found Zeros</h4>
        {loading ? (
          <p className="text-gray-500 dark:text-gray-400">Calculating zeros...</p>
        ) : zeros.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Index</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">T-value</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">ζ(1/2 + it) Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {zeros.map((zero, index) => {
                const zetaValue = calculateZetaFunction(0.5, zero);
                const magnitude = Math.sqrt(zetaValue.real**2 + zetaValue.imaginary**2);
                
                return (
                  <tr key={index}>
                    <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-200">{index + 1}</td>
                    <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-200">{zero.toFixed(8)}</td>
                    <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-200">{magnitude.toExponential(4)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No zeros found in the specified range.</p>
        )}
      </div>
    </div>
  );
};

export default ZeroFinder;
