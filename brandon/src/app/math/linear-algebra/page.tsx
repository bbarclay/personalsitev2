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
    <h2 className="text-2xl font-bold mb-4">Linear Algebra Tools</h2>
    <p className="text-gray-700 dark:text-gray-300">
      Linear algebra is a branch of mathematics that deals with vector spaces and linear transformations. This tool
      provides various calculators and solvers for linear algebra problems, including matrix operations, systems of
      linear equations, eigenvalues, and more.
    </p>
  </div>
);

// Create dynamic panel component with placeholders
const LinearAlgebraContent = createDynamicPanelComponent({
  solver: PlaceholderPanel,
  explanation: PlaceholderPanel,
  applications: PlaceholderPanel,
  resources: PlaceholderPanel
});

export default function LinearAlgebraPage() {
  return (
    <ToolPageLayout meta={meta}>
      <LinearAlgebraContent />
    </ToolPageLayout>
  );
} 