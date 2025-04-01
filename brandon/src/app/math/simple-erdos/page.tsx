"use client";

import React from 'react';
import { ToolPageLayout, createDynamicPanelComponent } from '@/components/layouts/ToolPageLayout';
import { loadToolMeta } from '@/utils/meta-loader';
import metaJson from './meta.json';
import MainComponent from './components/MainComponent';

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
const UsimpleUerdosContent = createDynamicPanelComponent({
  solver: () => (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold">UsimpleUerdos</h2>
        <p>Interactive UsimpleUerdos visualization and calculation tool.</p>
      </div>
      <MainComponent />
    </div>
  ),
  explanation: PlaceholderContent,
  applications: PlaceholderContent,
  resources: PlaceholderContent
});

export default function UsimpleUerdosPage() {
  return (
    <ToolPageLayout meta={meta}>
      <UsimpleUerdosContent />
    </ToolPageLayout>
  );
}
