"use client";

import React from 'react';
import { ToolPageLayout, createDynamicPanelComponent } from '@/components/layouts/ToolPageLayout';
import dynamic from 'next/dynamic';
import { loadToolMeta } from '@/utils/meta-loader';
import metaJson from './meta.json';

// Load metadata with proper defaults
const meta = loadToolMeta(metaJson);

// Dynamic imports for components
const GraphExplorer = dynamic(() => import('./components/GraphExplorer'), { ssr: false });
const ExplanationPanel = dynamic(() => import('./components/ExplanationPanel'), { ssr: false });
const ApplicationsPanel = dynamic(() => import('./components/ApplicationsPanel'), { ssr: false });
const ResourcesPanel = dynamic(() => import('./components/ResourcesPanel'), { ssr: false });

// Create dynamic panel component
const GraphTheoryExplorerContent = createDynamicPanelComponent({
  solver: () => <GraphExplorer />,
  explanation: () => <ExplanationPanel />,
  applications: () => <ApplicationsPanel />,
  resources: () => <ResourcesPanel />
});

export default function GraphTheoryExplorerPage() {
  return (
    <ToolPageLayout meta={meta}>
      <GraphTheoryExplorerContent />
    </ToolPageLayout>
  );
}
