"use client";

import React from 'react';
import { ToolPageLayout, createDynamicPanelComponent } from '@/components/layouts/ToolPageLayout';
import { loadToolMeta } from '@/utils/meta-loader';
import metaJson from './meta.json';
import FractionCalculatorContent from './components/MainComponent';
import FractionExplanation from './components/ExplanationPanel';
import FractionApplications from './components/ApplicationsPanel';
import FractionResources from './components/ResourcesPanel';

// Load metadata with proper defaults
const meta = loadToolMeta(metaJson);

// Create dynamic panel component
const FractionCalculatorPanels = createDynamicPanelComponent({
  solver: () => <FractionCalculatorContent />,
  explanation: () => <FractionExplanation />,
  applications: () => <FractionApplications />,
  resources: () => <FractionResources />
});

export default function FractionCalculatorPage() {
  return (
    <ToolPageLayout meta={meta}>
      <FractionCalculatorPanels />
    </ToolPageLayout>
  );
}
