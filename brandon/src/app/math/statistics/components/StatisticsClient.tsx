'use client';

import React from 'react';
import { ToolPageLayout, createDynamicPanelComponent } from '@/components/layouts/ToolPageLayout';

// Basic placeholder components
const PlaceholderPanel = () => (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">Statistics Tools</h2>
    <p className="text-gray-700 dark:text-gray-300">
      Statistics is the discipline that concerns the collection, organization, analysis, interpretation, and 
      presentation of data. These tools provide various calculators and solvers for statistical analysis,
      probability calculations, and data visualization.
    </p>
  </div>
);

// Create dynamic panel component with placeholders
const StatisticsContent = createDynamicPanelComponent({
  solver: PlaceholderPanel,
  explanation: PlaceholderPanel,
  applications: PlaceholderPanel,
  resources: PlaceholderPanel
});

interface StatisticsClientProps {
  meta: any;
}

export default function StatisticsClient({ meta }: StatisticsClientProps) {
  // Ensure sidebar tabs have active property
  if (meta.sidebar && meta.sidebar.tabs) {
    meta.sidebar.tabs = meta.sidebar.tabs.map((tab: any, index: number) => ({
      ...tab,
      active: tab.active || index === 0
    }));
  }

  return (
    <ToolPageLayout meta={meta}>
      <StatisticsContent />
    </ToolPageLayout>
  );
} 