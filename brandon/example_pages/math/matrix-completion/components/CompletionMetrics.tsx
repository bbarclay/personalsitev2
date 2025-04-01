'use client';

import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

interface CompletionMetricsProps {
  metrics: {
    iterations: number;
    convergenceTime: number;
    nuclearNorm: number;
    error: number;
  };
}

export const CompletionMetrics: React.FC<CompletionMetricsProps> = ({ metrics }) => {
  const data = [
    { name: 'Iterations', value: metrics.iterations },
    { name: 'Convergence Time', value: metrics.convergenceTime },
    { name: 'Nuclear Norm', value: metrics.nuclearNorm },
    { name: 'Error', value: metrics.error }
  ];

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Completion Metrics</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#ffffff" />
          <YAxis stroke="#ffffff" />
          <Tooltip />
          <Bar dataKey="value" fill="#4ADE80" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};