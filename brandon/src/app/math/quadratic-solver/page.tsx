"use client";

import React from 'react';
import { ToolPageLayout, createDynamicPanelComponent } from '@/components/layouts/ToolPageLayout';
import dynamic from 'next/dynamic';
import { loadToolMeta } from '@/utils/meta-loader';
import metaJson from './meta.json';

// Load metadata with proper defaults
const meta = loadToolMeta(metaJson);

// Dynamically import components
const SolverPanel = dynamic(() => import('./components/QuadraticSolverPage'), { ssr: false });
const ExplanationPanel = dynamic(() => import('./components/ExplanationPanel'), { ssr: false });
const ApplicationsPanel = dynamic(() => import('./components/ApplicationsPanel'), { ssr: false });
const ResourcesPanel = dynamic(() => import('./components/ResourcesPanel'), { ssr: false });

// Create dynamic panel component
const QuadraticSolverContent = createDynamicPanelComponent(
  {
    solver: SolverPanel,
    explanation: ExplanationPanel,
    applications: ApplicationsPanel,
    resources: ResourcesPanel
  },
  {
    transitionDuration: 0.3
  }
);

export default function QuadraticSolverPage() {
  return (
    <ToolPageLayout meta={meta}>
      <QuadraticSolverContent />
    </ToolPageLayout>
  );
}
