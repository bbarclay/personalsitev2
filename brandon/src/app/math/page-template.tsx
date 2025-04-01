"use client";

import React from 'react';
import { ToolPageLayout } from '@/components/layouts/ToolPageLayout';
import { withActiveTab } from '@/components/hoc/withActiveTab';
import dynamic from 'next/dynamic';
import { DynamicPanelRenderer } from '@/components/layouts/DynamicPanelRenderer';

/**
 * This is a template for creating consistent math tool pages.
 * Copy this file to create new tool pages with dynamic panel loading based on meta.json.
 * 
 * Usage:
 * 1. Copy this file to your new tool directory
 * 2. Rename the components and functions to match your tool name
 * 3. Implement the panel components in the components directory
 * 4. Create a meta.json file with the appropriate configuration
 */

// Dynamic imports for panels - adjust imports for your specific component needs
const SolverPanel = dynamic(() => import('./components/SolverPanel'));
const ExplanationPanel = dynamic(() => import('./components/ExplanationPanel'));
const ApplicationsPanel = dynamic(() => import('./components/ApplicationsPanel'));
const ResourcesPanel = dynamic(() => import('./components/ResourcesPanel'));

// Import and validate metadata
import metadata from './meta.json';
const toolMetadata = metadata as any;

// Validate required fields
if (!toolMetadata.title || !toolMetadata.description) {
  throw new Error('Missing required metadata fields');
}

// Map tab IDs to their respective components - customize as needed for your tool's tabs
const panels = {
  solver: SolverPanel,
  calculator: SolverPanel, // For backward compatibility
  explanation: ExplanationPanel,
  applications: ApplicationsPanel,
  resources: ResourcesPanel,
  // Add additional panel mappings as needed, for example:
  // examples: ExamplesPanel,
  // practice: PracticePanel,
};

// Optional props configuration for specific panels
const panelProps = {
  // Example: If your explanation panel needs specific props
  // explanation: {
  //   explanation: "Custom explanation text",
  //   showExamples: true
  // }
};

const ToolContent = withActiveTab(({ activeTab }) => {
  return (
    <DynamicPanelRenderer
      activeTab={activeTab}
      meta={toolMetadata}
      panels={panels}
      panelProps={panelProps}
    />
  );
});

export default function ToolPage() {
  return (
    <ToolPageLayout
      metadata={toolMetadata}
      content={<ToolContent />}
    />
  );
} 