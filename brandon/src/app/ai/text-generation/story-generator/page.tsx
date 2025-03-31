'use client';

import React from 'react';
import { ToolPageLayout, withActiveTab } from '@/components/layouts/ToolPageLayout';
import dynamic from 'next/dynamic';
import { loadToolMeta } from '@/utils/meta-loader';
import metaJson from './meta.json';
import { ToolComponentProps } from '@/types/tool-types';
import { motion, AnimatePresence } from 'framer-motion';

// Load metadata with proper defaults
const meta = loadToolMeta(metaJson);

// Dynamically import components
const CreatePanel = dynamic(() => import('./components/CreatePanel'), { ssr: false });
const TemplatesPanel = dynamic(() => import('./components/TemplatesPanel'), { ssr: false });
const LibraryPanel = dynamic(() => import('./components/LibraryPanel'), { ssr: false });
const SettingsPanel = dynamic(() => import('./components/SettingsPanel'), { ssr: false });

const StoryGeneratorContent = withActiveTab(function StoryGeneratorContent({ activeTab }: ToolComponentProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-6 rounded-2xl shadow-lg"
      >
        {activeTab === 'create' && <CreatePanel />}
        {activeTab === 'templates' && <TemplatesPanel />}
        {activeTab === 'library' && <LibraryPanel />}
        {activeTab === 'settings' && <SettingsPanel />}
      </motion.div>
    </AnimatePresence>
  );
});

export default function StoryGeneratorPage() {
  return (
    <ToolPageLayout meta={meta}>
      <StoryGeneratorContent activeTab="create" />
    </ToolPageLayout>
  );
}
