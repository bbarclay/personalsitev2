"use client";

import React from 'react';
import { ToolPageLayout, createDynamicPanelComponent } from '@/components/layouts/ToolPageLayout';
import { loadToolMeta } from '@/utils/meta-loader';
import metaJson from './meta.json';

// Load metadata with proper defaults
const meta = loadToolMeta(metaJson);

const PlaceholderPanel = () => (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">Math Tool Template</h2>
    <p className="text-gray-700 dark:text-gray-300">
      This is a template for creating new math tools. Replace this component with your actual implementation.
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