'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Matrix } from '@components/math/utils/mathUtils';

interface BaseVisualizerProps {
  title: string;
  description: string;
  reference: string;
  children: React.ReactNode;
  className?: string;
}

export interface VisualizerState {
  matrix: Matrix | null;
  step: number;
  isProcessing: boolean;
  error: string | null;
  result: any;
}

export const BaseVisualizer: React.FC<BaseVisualizerProps> = ({
  title,
  description,
  reference,
  children
}) => {
  return (
    <div className="w-full bg-gray-800 text-white rounded-xl overflow-hidden">
      <div className="p-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-gray-300 mt-2">{description}</p>
        </div>

        {children}

        <div className="mt-8 pt-4 border-t border-gray-700">
          <h3 className="text-lg font-semibold mb-2">Reference</h3>
          <p className="text-gray-400 text-sm">{reference}</p>
        </div>
      </div>
    </div>
  );
};

export const ControlPanel: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => (
  <div className="bg-gray-700 p-4 rounded-lg mb-6">
    <h3 className="text-lg font-semibold mb-4">Controls</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {children}
    </div>
  </div>
);

export const VisualizationPanel: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => (
  <div className="bg-gray-700 p-4 rounded-lg mb-6">
    <h3 className="text-lg font-semibold mb-4">Visualization</h3>
    {children}
  </div>
);

export const MetricsPanel: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => (
  <div className="bg-gray-700 p-4 rounded-lg">
    <h3 className="text-lg font-semibold mb-4">Metrics</h3>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {children}
    </div>
  </div>
);

export const MetricCard: React.FC<{
  label: string;
  value: string | number;
}> = ({ label, value }) => (
  <div className="bg-gray-600 p-3 rounded">
    <div className="text-sm text-gray-400">{label}</div>
    <div className="text-lg font-semibold">{value}</div>
  </div>
);
