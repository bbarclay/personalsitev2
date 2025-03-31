"use client";

import React from 'react';
import { ToolPageLayout, createDynamicPanelComponent } from '@/components/layouts/ToolPageLayout';
import { loadToolMeta } from '@/utils/meta-loader';
import metaJson from './meta.json';

// Load metadata with proper defaults
const meta = loadToolMeta(metaJson);

const PlaceholderPanel = () => (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">P-adic Calculator</h2>
    <p className="text-gray-700 dark:text-gray-300">
      P-adic numbers are an extension of the rational numbers that completes them with respect to a different metric than the usual absolute value. 
      This tool allows you to explore p-adic numbers and perform calculations with them.
    </p>
  </div>
);

// Create dynamic panel component with placeholders


const PAdicContent = createDynamicPanelComponent({
  solver: PlaceholderPanel,
  explanation: PlaceholderPanel,
  applications: PlaceholderPanel,
  resources: PlaceholderPanel
});

export default function PAdicPage() {
  return (
    <ToolPageLayout meta={meta}>
      <PAdicContent />
    </ToolPageLayout>
  );
}