"use client";

import React, { useState } from 'react';
import { ToolPageLayout, createDynamicPanelComponent } from '@/components/layouts/ToolPageLayout';
import dynamic from 'next/dynamic';
import { loadToolMeta } from '@/utils/meta-loader';
import metaJson from './meta.json';

// Load metadata with proper defaults
const meta = loadToolMeta(metaJson);

// Dynamically import components
const SolverPanel = dynamic(() => import('./components/SolverPanel'), { ssr: false });
const ExplanationPanel = dynamic(() => import('./components/ExplanationPanel'), { ssr: false });
const ApplicationsPanel = dynamic(() => import('./components/ApplicationsPanel'), { ssr: false });
const ResourcesPanel = dynamic(() => import('./components/ResourcesPanel'), { ssr: false });
const RiemannVisualization = dynamic(() => import('./components/RiemannVisualization'), { ssr: false });

// Create dynamic panel component with placeholders
const RiemannContent = createDynamicPanelComponent({
  solver: SolverPanel,
  explanation: ExplanationPanel,
  applications: ApplicationsPanel,
  resources: ResourcesPanel
});

// Enhanced page with custom header and layout
export default function RiemannPage() {
  const [showVisualization, setShowVisualization] = useState(true);
  
  return (
    <>
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-900 dark:to-indigo-900 mb-6 -mt-6 -mx-6 py-8 px-6 shadow-md">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl font-bold text-white mb-2">
                Riemann Zeta Explorer
              </h1>
              <p className="text-purple-100 max-w-2xl">
                Explore the fascinating Riemann zeta function, fundamental to understanding 
                prime number distributions and one of mathematics' greatest unsolved problems.
              </p>
            </div>
            <div className="flex space-x-4">
              <button 
                onClick={() => setShowVisualization(!showVisualization)}
                className="px-4 py-2 rounded-md bg-white bg-opacity-20 hover:bg-opacity-30 text-white transition duration-150 shadow-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              >
                {showVisualization ? 'Hide' : 'Show'} Visualization
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {showVisualization && (
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="p-4">
            <RiemannVisualization />
          </div>
        </div>
      )}
      
      <ToolPageLayout meta={meta}>
        <RiemannContent />
      </ToolPageLayout>
      
      <div className="mt-8 bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">
          Key Facts About the Riemann Zeta Function
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
            <h3 className="font-medium text-purple-600 dark:text-purple-400 text-sm mb-1">The Critical Strip</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              The most interesting behavior occurs in the "critical strip" where the real part
              is between 0 and 1, particularly on the "critical line" where Re(s) = 1/2.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
            <h3 className="font-medium text-purple-600 dark:text-purple-400 text-sm mb-1">Prime Number Connection</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              The Riemann zeta function has a deep connection to prime numbers through the Euler product
              formula: ζ(s) = ∏<sub>p prime</sub> 1/(1-p<sup>-s</sup>).
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
            <h3 className="font-medium text-purple-600 dark:text-purple-400 text-sm mb-1">Million Dollar Problem</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              The Riemann Hypothesis is one of the Clay Mathematics Institute's Millennium 
              Prize Problems, with a $1,000,000 reward for a solution.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}