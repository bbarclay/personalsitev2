"use client";

import React from 'react';
import { ToolPageLayout, createDynamicPanelComponent } from '@/components/layouts/ToolPageLayout';
import dynamic from 'next/dynamic';
const SlotMachine = dynamic(() => import('./components/SlotMachine'), { ssr: false });
import { loadToolMeta } from '@/utils/meta-loader';
import metaJson from './meta.json';
import ExplanationPanel from './components/ExplanationPanel';
import ApplicationsPanel from './components/ApplicationsPanel';
import ResourcesPanel from './components/ResourcesPanel';

// Load metadata with proper defaults
const meta = loadToolMeta(metaJson);

// Create dynamic panel component
const SlotMachineContent = createDynamicPanelComponent({
  solver: () => (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold">Slot Machine Simulator</h2>
        <p>Interactive slot machine simulator with probability analysis and statistics.</p>
      </div>
      <div className="mt-6">
        <SlotMachine />
      </div>
    </div>
  ),
  explanation: ExplanationPanel,
  applications: ApplicationsPanel,
  resources: ResourcesPanel
});

export default function SlotMachinePage() {
  return (
    <ToolPageLayout meta={meta}>
      <SlotMachineContent />
    </ToolPageLayout>
  );
}
