"use client";

import React from 'react';
import { ToolPageLayout, createDynamicPanelComponent } from '@/components/layouts/ToolPageLayout';
import { loadToolMeta } from '@/utils/meta-loader';
import metaJson from './meta.json';

// Load metadata with proper defaults
const meta = loadToolMeta(metaJson);

const PlaceholderPanel = () => (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">Pythagorean Theorem</h2>
    <p className="text-gray-700 dark:text-gray-300">
      The Pythagorean theorem states that in a right triangle, the square of the length of the hypotenuse equals 
      the sum of squares of the lengths of the other two sides: a² + b² = c².
      This tool allows you to calculate any side of a right triangle when you know the other two sides.
    </p>
  </div>
);

// Create dynamic panel component with placeholders


const PythagorasContent = createDynamicPanelComponent({
  solver: PlaceholderPanel,
  explanation: PlaceholderPanel,
  applications: PlaceholderPanel,
  resources: PlaceholderPanel
});

export default function PythagorasPage() {
  return (
    <ToolPageLayout meta={meta}>
      <PythagorasContent />
    </ToolPageLayout>
  );
}