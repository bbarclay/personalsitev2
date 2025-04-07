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
const StatisticsAnalyzerContent = createDynamicPanelComponent({
  solver: () => (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold">Statistics Analyzer</h2>
        <p>Interactive tool for statistical analysis and visualization of data.</p>
      </div>
      <MainComponent />
    </div>
  ),
  explanation: ExplanationPanel,
  applications: ApplicationsPanel,
  resources: ResourcesPanel
});

export default function StatisticsAnalyzerPage() {
  return (
    <ToolPageLayout meta={meta}>
      <StatisticsAnalyzerContent />
    </ToolPageLayout>
  );
}
