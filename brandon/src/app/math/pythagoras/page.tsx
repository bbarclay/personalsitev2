"use client";

import React from 'react';
import { ToolPageLayout, createDynamicPanelComponent } from '@/components/layouts/ToolPageLayout';
import { loadToolMeta } from '@/utils/meta-loader';
import metaJson from './meta.json';

// Import our improved components
import SolverPanel from './components/SolverPanel';
import ExplanationPanel from './components/ExplanationPanel';
import ApplicationsPanel from './components/ApplicationsPanel';
import ResourcesPanel from './components/ResourcesPanel';

// Load metadata with proper defaults
const meta = loadToolMeta(metaJson);

// Create dynamic panel component with our custom components
const PythagorasContent = createDynamicPanelComponent({
  solver: SolverPanel,
  explanation: ExplanationPanel,
  applications: ApplicationsPanel,
  resources: ResourcesPanel
});

export default function PythagorasPage() {
  return (
    <ToolPageLayout meta={meta}>
      <PythagorasContent />
    </ToolPageLayout>
  );
}