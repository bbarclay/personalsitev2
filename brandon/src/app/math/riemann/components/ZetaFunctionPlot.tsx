"use client";

import React, { useState, useEffect } from 'react';
import { calculateZetaFunction } from '../utils/zetaUtils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ZetaFunctionPlot = () => {
  const [plotData, setPlotData] = useState<any[]>([]);
  const [plotType, setPlotType] = useState<'real' | 'imaginary' | 'absolute'>('real');
  const [range, setRange] = useState({ start: 0, end: 20 });
  
  useEffect(() => {
    const points = 100;
    const step = (range.end - range.start) / points;
    const data = [];
    
    for (let t = range.start; t <= range.end; t += step) {
      const zetaValue = calculateZetaFunction(0.5, t);
      data.push({
        t,
        real: zetaValue.real,
        imaginary: zetaValue.imaginary,
        absolute: Math.sqrt(zetaValue.real**2 + zetaValue.imaginary**2)
      });
    }
    
    setPlotData(data);
  }, [range]);

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
          Riemann Zeta Function Visualization
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Explore the behavior of ζ(1/2 + it) along the critical line where the Riemann Hypothesis 
          states that all non-trivial zeros should lie.
        </p>
        
        <div className="flex flex-wrap gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Plot Type
            </label>
            <select
              value={plotType}
              onChange={(e) => setPlotType(e.target.value as any)}
              className="p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="real">Real Part</option>
              <option value="imaginary">Imaginary Part</option>
              <option value="absolute">Absolute Value</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              t-Range Start
            </label>
            <input
              type="number"
              value={range.start}
              onChange={(e) => setRange({ ...range, start: +e.target.value })}
              className="p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 w-24"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              t-Range End
            </label>
            <input
              type="number"
              value={range.end}
              onChange={(e) => setRange({ ...range, end: +e.target.value })}
              className="p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 w-24"
            />
          </div>
        </div>
      </div>
      
      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={plotData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="t" 
              label={{ value: 't value', position: 'insideBottomRight', offset: -10 }} 
            />
            <YAxis 
              label={{ value: `ζ(1/2 + it) ${plotType} part`, angle: -90, position: 'insideLeft' }} 
            />
            <Tooltip 
              formatter={(value: any) => [parseFloat(value).toFixed(4), `${plotType} part`]} 
              labelFormatter={(label) => `t = ${parseFloat(label).toFixed(4)}`}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey={plotType} 
              stroke="#8884d8" 
              strokeWidth={2} 
              dot={false} 
              name={`${plotType.charAt(0).toUpperCase() + plotType.slice(1)} part of ζ(1/2 + it)`}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h4 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Insights</h4>
        <p className="text-gray-700 dark:text-gray-300">
          When the real and imaginary parts are both zero at the same t-value, we have found a zero of the zeta function.
          The Riemann Hypothesis conjectures that all such zeros have real part 1/2.
        </p>
      </div>
    </div>
  );
};

export default ZetaFunctionPlot;
