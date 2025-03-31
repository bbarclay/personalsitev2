"use client";

import React from 'react';
import { ToolPageLayout, createDynamicPanelComponent } from '@/components/layouts/ToolPageLayout';
import { loadToolMeta } from '@/utils/meta-loader';
import metaJson from './meta.json';

// Load metadata with proper defaults
const meta = loadToolMeta(metaJson);

// Basic placeholder components
const PlaceholderPanel = () => (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">Linear Systems Solver</h2>
    <p className="text-gray-700 dark:text-gray-300">
      This tool helps you solve systems of linear equations using matrix methods such as Gaussian elimination. 
      Enter your system of equations, and the solver will find the solutions if they exist.
    </p>
  </div>
);

// Create dynamic panel component with placeholders
const LinearSystemsContent = createDynamicPanelComponent({
  solver: PlaceholderPanel,
  explanation: PlaceholderPanel,
  applications: PlaceholderPanel,
  resources: PlaceholderPanel
});

export default function LinearSystemsPage() {
  return (
    <ToolPageLayout meta={meta}>
      <LinearSystemsContent />
    </ToolPageLayout>
  );
} 