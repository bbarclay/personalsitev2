"use client";

import React from 'react';
import { ToolPageLayout, createDynamicPanelComponent } from '@/components/layouts/ToolPageLayout';
import { loadToolMeta } from '@/utils/meta-loader';
import metaJson from './meta.json';
import FactorialCalculator from './components/MainComponent';
import ApplicationsPanel from './components/ApplicationsPanel';
import ResourcesPanel from './components/ResourcesPanel';
import FactorialFormula from './components/FactorialFormula';

// Load metadata with proper defaults
const meta = loadToolMeta(metaJson);

// Create dynamic panel component
const FactorialCalculatorContent = createDynamicPanelComponent({
  solver: () => (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">Factorial Calculator</h2>
        <p>Interactive factorial visualization and calculation tool.</p>
      </div>
      <FactorialCalculator />
    </div>
  ),
  explanation: () => (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">Understanding Factorials</h2>
        <p>Learn about the mathematical concept of factorials and their properties.</p>
      </div>
      <FactorialFormula />
    </div>
  ),
  applications: () => (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">Applications</h2>
        <p>Discover how factorials are used in various fields of mathematics, science, and engineering.</p>
      </div>
      <ApplicationsPanel />
    </div>
  ),
  resources: () => (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">Resources</h2>
        <p>Explore additional resources to deepen your understanding of factorials.</p>
      </div>
      <ResourcesPanel />
    </div>
  )
});

export default function FactorialCalculatorPage() {
  return (
    <ToolPageLayout meta={meta}>
      <FactorialCalculatorContent />
    </ToolPageLayout>
  );
}
