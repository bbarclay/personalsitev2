"use client";

import React from 'react';
import { ToolPageLayout, createDynamicPanelComponent } from '@/components/layouts/ToolPageLayout';
import { loadToolMeta } from '@/utils/meta-loader';
import metaJson from './meta.json';

// Load metadata with proper defaults
const meta = loadToolMeta(metaJson);

const PlaceholderPanel = () => (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">Geometry</h2>
    <p className="text-gray-700 dark:text-gray-300">
      Geometry is the mathematical study of shapes, sizes, and properties of space.
    </p>
  </div>
);

// Create dynamic panel component with placeholders


const GeometryContent = createDynamicPanelComponent({
  solver: PlaceholderPanel,
  explanation: PlaceholderPanel,
  applications: PlaceholderPanel,
  resources: PlaceholderPanel
});

export default function GeometryPage() {
  return (
    <ToolPageLayout meta={meta}>
      <GeometryContent />
    </ToolPageLayout>
  );
}