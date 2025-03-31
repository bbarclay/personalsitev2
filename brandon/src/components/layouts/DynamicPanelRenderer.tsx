'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ToolMeta } from '@/types/tool-types';

interface DynamicPanelRendererProps {
  activeTab: string;
  meta: any; // Using any to be more flexible with different metadata structures
  panels: Record<string, React.ComponentType<any>>;
  panelProps?: Record<string, any>;
}

export function DynamicPanelRenderer({ 
  activeTab, 
  meta, 
  panels, 
  panelProps = {} 
}: DynamicPanelRendererProps) {
  // Ensure we have a valid panel component for the activeTab
  const ActivePanel = panels[activeTab];
  
  if (!ActivePanel) {
    console.warn(`No panel component found for tab: ${activeTab}. Available panels: ${Object.keys(panels).join(', ')}`);
    
    // Fallback to the first available panel
    const firstAvailableTab = Object.keys(panels)[0];
    if (firstAvailableTab && panels[firstAvailableTab]) {
      console.info(`Falling back to first available panel: ${firstAvailableTab}`);
      return (
        <motion.div
          key={firstAvailableTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {React.createElement(panels[firstAvailableTab], panelProps[firstAvailableTab] || {})}
        </motion.div>
      );
    }
    
    // If no panels are available at all, show a friendly message
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Content Not Available</h2>
        <p className="text-gray-700 dark:text-gray-300">
          This panel is not available at the moment. Please try another tab.
        </p>
      </div>
    );
  }

  // Get props for the active panel
  const activePanelProps = panelProps[activeTab] || {};
  
  // If this is the explanation panel and no specific props were provided, 
  // use the description from meta
  if (activeTab === 'explanation' && !activePanelProps.explanation && meta?.description) {
    activePanelProps.explanation = meta.description;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
      >
        <ActivePanel {...activePanelProps} />
      </motion.div>
    </AnimatePresence>
  );
} 