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
    <h2 className="text-2xl font-bold mb-4">AI Templates</h2>
    <p className="text-gray-700 dark:text-gray-300">
      Browse and use a collection of AI templates for various purposes.
    </p>
  </div>
);

// Create dynamic panel component with placeholders
const TemplateContent = createDynamicPanelComponent({
  solver: PlaceholderPanel,
  explanation: PlaceholderPanel,
  applications: PlaceholderPanel,
  resources: PlaceholderPanel
});

export default function TemplatePage() {
  return (
    <ToolPageLayout meta={meta}>
      <TemplateContent />
    </ToolPageLayout>
  );
} 