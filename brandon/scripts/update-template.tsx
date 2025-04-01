/**
 * Template for updating ToolPageLayout pages to new format
 * 
 * Steps to update:
 * 1. Change imports:
 *    - import { ToolPageLayout, withActiveTab } from '@/components/layouts/ToolPageLayout';
 *    - import { ToolMeta, ToolComponentProps } from '@/types/tool-types';
 * 
 * 2. Update metadata code:
 *    const meta: ToolMeta = {
 *      ...metaJson,
 *      type: 'math' as const,
 *      difficulty: metaJson.difficulty.toLowerCase() as 'beginner' | 'intermediate' | 'advanced'
 *    };
 * 
 * 3. Update content component:
 *    const ContentName = withActiveTab(function ContentName({ activeTab }: ToolComponentProps) {
 *      // Add className here
 *      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-6 rounded-2xl shadow-lg"
 * 
 * 4. Change tab names:
 *    - Change activeTab === 'calculator' to activeTab === 'solver'
 * 
 * 5. Update JSX at the bottom:
 *    return (
 *      <ToolPageLayout meta={meta}>
 *        <ContentName />
 *      </ToolPageLayout>
 *    );
 */

"use client";

import React from 'react';
import { ToolPageLayout, withActiveTab } from '@/components/layouts/ToolPageLayout';
import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { ToolMeta, ToolComponentProps } from '@/types/tool-types';

// Dynamic imports for panels
const SolverPanel = dynamic(() => import('./components/SolverPanel'));
const ExplanationPanel = dynamic(() => import('./components/ExplanationPanel'));
const ApplicationsPanel = dynamic(() => import('./components/ApplicationsPanel'));
const ResourcesPanel = dynamic(() => import('./components/ResourcesPanel'));

// Import and validate metadata
import metaJson from './meta.json';

// Cast and validate the meta data
const meta: ToolMeta = {
  ...metaJson,
  type: 'math' as const,
  difficulty: metaJson.difficulty.toLowerCase() as 'beginner' | 'intermediate' | 'advanced'
};

const ToolContent = withActiveTab(function ToolContent({ activeTab }: ToolComponentProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-6 rounded-2xl shadow-lg"
      >
        {activeTab === 'solver' && <SolverPanel />}
        {activeTab === 'explanation' && <ExplanationPanel explanation="Tool description here" />}
        {activeTab === 'applications' && <ApplicationsPanel />}
        {activeTab === 'resources' && <ResourcesPanel />}
      </motion.div>
    </AnimatePresence>
  );
});

export default function ToolPage() {
  return (
    <ToolPageLayout meta={meta}>
      <ToolContent />
    </ToolPageLayout>
  );
} 