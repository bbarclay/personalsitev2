"use client";

import React from 'react';
import { ToolPageLayout, createDynamicPanelComponent } from '@/components/layouts/ToolPageLayout';
import { loadToolMeta } from '@/utils/meta-loader';
import metaJson from './meta.json';
import MainComponent from './components/MainComponent';
import ExplanationPanel from './components/ExplanationPanel';
import ApplicationsPanel from './components/ApplicationsPanel';
import ResourcesPanel from './components/ResourcesPanel';

// Load metadata with proper defaults
const meta = loadToolMeta(metaJson);

// Create dynamic panel component
const BasicErdosContent = createDynamicPanelComponent({
  solver: () => (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold">Basic Erdős Discrepancy</h2>
        <p>Interactive visualization of the Erdős Discrepancy Problem.</p>
      </div>
      <MainComponent />
    </div>
  ),
  explanation: ExplanationPanel,
  applications: ApplicationsPanel,
  resources: ResourcesPanel
});

export default function BasicErdosPage() {
  return (
    <ToolPageLayout meta={meta}>
      <BasicErdosContent />
    </ToolPageLayout>
  );
}
