"use client";

import React from 'react';
import { ToolPageLayout, createDynamicPanelComponent } from '@/components/layouts/ToolPageLayout';
import { ToolMeta, DEFAULT_SIDEBAR_TABS } from '@/types/tool-types';

// Import and validate metadata
import metaJson from './meta.json';

// Ensure color is a string for the ToolMeta type
const colorString = typeof metaJson.color === 'string' 
  ? metaJson.color 
  : (typeof metaJson.color === 'object' && metaJson.color !== null && 'gradient' in metaJson.color
    ? (metaJson.color as any).gradient 
    : 'from-blue-500 to-indigo-500');

// Cast and validate the meta data
const meta: ToolMeta = {
  ...metaJson,
  id: metaJson.id || 'statistics',
  title: metaJson.title || 'Statistics',
  description: metaJson.description || 'Tools for statistical analysis and probability',
  category: metaJson.category || 'Math',
  type: 'math' as const,
  icon: metaJson.icon || '📊',
  difficulty: metaJson.difficulty?.toLowerCase() as 'beginner' | 'intermediate' | 'advanced' || 'intermediate',
  lastUpdated: metaJson.lastUpdated || new Date().toISOString().split('T')[0],
  color: colorString,
  enabled: metaJson.enabled !== false,
  tags: metaJson.tags || ['statistics', 'probability', 'data analysis'],
  keywords: metaJson.keywords || ['statistics', 'probability', 'data analysis', 'regression'],
  sidebar: metaJson.sidebar || {
    tabs: DEFAULT_SIDEBAR_TABS
  },
  navigation: metaJson.navigation || {
    category: {
      title: 'Mathematics',
      path: '/math'
    }
  }
};

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

export default function StatisticsPage() {
  return (
    <ToolPageLayout meta={meta}>
      <StatisticsContent />
    </ToolPageLayout>
  );
} 