"use client";

import React from 'react';
import { ToolPageLayout, createDynamicPanelComponent } from '@/components/layouts/ToolPageLayout';
import { loadToolMeta } from '@/utils/meta-loader';
import metaJson from './meta.json';
import IndexComponent from './components/index';
import ExplanationPanel from './components/ExplanationPanel';
import ApplicationsPanel from './components/ApplicationsPanel';
import ResourcesPanel from './components/ResourcesPanel';

// Load metadata with proper defaults
const meta = loadToolMeta(metaJson);

// Create dynamic panel component
const WinLedgerContent = createDynamicPanelComponent({
  solver: () => (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold">Win Probability Ledger</h2>
        <p>Interactive tool for tracking and analyzing win probabilities in various scenarios.</p>
      </div>
      <IndexComponent />
    </div>
  ),
  explanation: ExplanationPanel,
  applications: ApplicationsPanel,
  resources: ResourcesPanel
});

export default function WinLedgerPage() {
  return (
    <ToolPageLayout meta={meta}>
      <WinLedgerContent />
    </ToolPageLayout>
  );
}
