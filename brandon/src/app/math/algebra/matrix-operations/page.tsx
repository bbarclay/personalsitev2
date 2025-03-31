"use client";

import React from 'react';
import { ToolPageLayout } from '@/components/layouts/ToolPageLayout';
import { MatrixOperations } from './components/MatrixOperations';
import { loadToolMeta } from '@/utils/meta-loader';
import metaJson from './meta.json';

// Load the metadata with proper defaults
const meta = loadToolMeta(metaJson);

// Create the tool's panel components
const SolverPanel = () => <MatrixOperations />;
const ExplanationPanel = () => (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">Matrix Operations Explained</h2>
    <p className="mb-4">
      Matrices are rectangular arrays of numbers or symbols arranged in rows and columns.
      Matrix operations are fundamental in linear algebra and have applications in various fields.
    </p>
  </div>
);
const ApplicationsPanel = () => (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">Applications of Matrix Operations</h2>
    <p className="mb-4">
      Matrix operations are used in computer graphics, physics simulations, data analysis, 
      machine learning, and many other fields.
    </p>
  </div>
);
const ResourcesPanel = () => (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">Matrix Resources</h2>
    <p className="mb-4">
      Find additional resources for learning about matrices and their operations.
    </p>
  </div>
);

// Map tab IDs to their corresponding panel components
const panelComponents = {
  solver: SolverPanel,
  explanation: ExplanationPanel,
  applications: ApplicationsPanel,
  resources: ResourcesPanel
};

export default function MatrixOperationsPage() {
  return (
    <ToolPageLayout meta={meta}>
      {({ activeTab }: { activeTab: string }) => {
        const Panel = panelComponents[activeTab as keyof typeof panelComponents] || SolverPanel;
        return <Panel />;
      }}
    </ToolPageLayout>
  );
}
