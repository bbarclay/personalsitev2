"use client";

import React from 'react';
import { ToolPageLayout, createDynamicPanelComponent } from '@/components/layouts/ToolPageLayout';
import { loadToolMeta } from '@/utils/meta-loader';
import metaJson from './meta.json';
import IndexComponent from './components/index';

// Load metadata with proper defaults
const meta = loadToolMeta(metaJson);

// Define placeholder content for each panel
const PlaceholderContent = () => (
  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
    <h2 className="text-xl font-medium mb-4">Content Coming Soon</h2>
    <p className="text-gray-600 dark:text-gray-300">
      This section is being developed. Check back soon for updates!
    </p>
  </div>
);

// Create dynamic panel component
const LFractal_LFunhouseContent = createDynamicPanelComponent({
  solver: () => (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold">LFractal_LFunhouse</h2>
        <p>Interactive LFractal LFunhouse visualization and calculation tool.</p>
      </div>
      <IndexComponent />
    </div>
  ),
  explanation: PlaceholderContent,
  applications: PlaceholderContent,
  resources: PlaceholderContent
});

export default function LFractal_LFunhousePage() {
  return (
    <ToolPageLayout meta={meta}>
      <LFractal_LFunhouseContent />
    </ToolPageLayout>
  );
}
