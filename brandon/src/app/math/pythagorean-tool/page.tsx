"use client";

import React from 'react';
import { ToolPageLayout, createDynamicPanelComponent } from '@/components/layouts/ToolPageLayout';
import dynamic from 'next/dynamic';
import { loadToolMeta } from '@/utils/meta-loader';
import metaJson from './meta.json';

// Load metadata with proper defaults
const meta = loadToolMeta(metaJson);

// Dynamically import components
const PythagoreanToolComponent = dynamic(() => import('./components/PythagoreanToolComponent'), { ssr: false });
const ExplanationPanel = dynamic(() => import('./components/ExplanationPanel'), { ssr: false });
const ApplicationsPanel = dynamic(() => import('./components/ApplicationsPanel'), { ssr: false });
const ResourcesPanel = dynamic(() => import('./components/ResourcesPanel'), { ssr: false });

// Create dynamic panel component
const PythagoreanToolContent = createDynamicPanelComponent(
  {
    solver: PythagoreanToolComponent,
    explanation: ExplanationPanel,
    applications: ApplicationsPanel,
    resources: ResourcesPanel
  },
  {
    transitionDuration: 0.3
  }
);

export default function PythagoreanToolPage() {
  return (
    <ToolPageLayout meta={meta}>
      <PythagoreanToolContent />
    </ToolPageLayout>
  );
} 