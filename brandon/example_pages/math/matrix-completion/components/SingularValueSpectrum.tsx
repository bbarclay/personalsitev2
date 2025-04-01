'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface SingularValueSpectrumProps {
  singularValues: number[];
}

export const SingularValueSpectrum: React.FC<SingularValueSpectrumProps> = ({ singularValues }) => {
  if (!singularValues.length) return null;

  const data = singularValues.map((value, index) => ({
    index: index + 1,
    value
  }));

  return (
    <div className="mt-6">
      <h4 className="text-lg font-semibold mb-4">Singular Value Spectrum</h4>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="index" label="Index" />
          <YAxis label="Magnitude" />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#4ade80" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};