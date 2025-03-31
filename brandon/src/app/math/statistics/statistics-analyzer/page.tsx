"use client";

import React from 'react';
import { ToolPageLayout, createDynamicPanelComponent } from '@/components/layouts/ToolPageLayout';
import { loadToolMeta } from '@/utils/meta-loader';
import metaJson from './meta.json';

// Load metadata with proper defaults
const meta = loadToolMeta(metaJson);

// Create dynamic panel component with placeholders
const StatisticsAnalyzerContent = createDynamicPanelComponent({
  solver: () => <div>Solver panel content</div>,
  explanation: () => <div>Explanation panel content</div>,
  applications: () => <div>Applications panel content</div>,
  resources: () => <div>Resources panel content</div>
});

export default function StatisticsAnalyzerPage() {
  return (
    <ToolPageLayout meta={meta}>
      <div>Tool content</div>
    </ToolPageLayout>
  );
}