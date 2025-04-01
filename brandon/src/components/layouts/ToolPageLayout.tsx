'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from '@/components/theme-provider';
import { ToolMeta, ToolComponentProps, TabConfig } from '@/types/tool-types';
import { ToolSidebar } from './ToolSidebar';
import { ToolHeader } from './ToolHeader';
import { ToolOverview } from './ToolOverview';
import Link from 'next/link';

// HOC to mark components that accept activeTab
export function withActiveTab<P extends ToolComponentProps>(Component: React.ComponentType<P>) {
  const WrappedComponent = (props: P) => <Component {...props} />;
  WrappedComponent.acceptsActiveTab = true;
  return WrappedComponent;
}

// Helper function to create a component that displays different panels based on activeTab
export function createDynamicPanelComponent(
  panels: Record<string, React.ComponentType<any>>,
  options?: {
    wrapperClassName?: string;
    transitionDuration?: number;
    initialY?: number;
    exitY?: number;
  }
) {
  const {
    wrapperClassName = "bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-6 rounded-2xl shadow-lg",
    transitionDuration = 0.2,
    initialY = 20,
    exitY = -20
  } = options || {};

  return withActiveTab(function DynamicPanelComponent({ activeTab }: ToolComponentProps) {
    // Only render the panel if it exists in the panels record and activeTab is not undefined
    const tabId = activeTab || '';
    const ActivePanel = tabId in panels ? panels[tabId] : undefined;
    
    if (!ActivePanel) {
      // If the panel doesn't exist, render a fallback message
      return (
        <div className={wrapperClassName}>
          <p className="text-gray-600 dark:text-gray-400 text-center py-8">
            This tab is not available for this tool.
          </p>
        </div>
      );
    }
    
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={tabId}
          initial={{ opacity: 0, y: initialY }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: exitY }}
          transition={{ duration: transitionDuration }}
          className={wrapperClassName}
        >
          <ActivePanel />
        </motion.div>
      </AnimatePresence>
    );
  });
}

interface ToolPageLayoutProps {
  meta: ToolMeta;
  metadata?: Record<string, any>;
  children: React.ReactNode;
}

export function ToolPageLayout({ meta, metadata, children }: ToolPageLayoutProps) {
  // Support legacy 'metadata' prop
  const metaData = meta || metadata;

  if (!metaData) {
    console.error('No meta or metadata prop provided to ToolPageLayout');
  }

  const [showToolbar, setShowToolbar] = useState(true);
  
  // Get the tabs from metaData, but we no longer need ensureTabsHaveRequiredProperties
  // since meta-loader already handles this
  const sidebarTabs = metaData?.sidebar?.tabs || [];
  const firstTabId = sidebarTabs.length > 0 ? sidebarTabs[0].id : 'solver';
  const [activeTab, setActiveTab] = useState(firstTabId);

  // Create a safe meta object with required defaults, but we can rely on the values
  // set by meta-loader instead of hardcoding defaults here
  const safeMeta: ToolMeta = metaData as ToolMeta;

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <AnimatePresence>
            {showToolbar && (
              <motion.div 
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
              >
                <ToolSidebar 
                  meta={safeMeta} 
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toggle Toolbar Button */}
          <motion.button
            className="fixed left-0 top-4 z-30 p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-700 dark:text-gray-300 rounded-r-lg shadow-md"
            onClick={() => setShowToolbar(prev => !prev)}
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-lg">{showToolbar ? '◀' : '▶'}</span>
          </motion.button>

          {/* Main Content Area */}
          <div className={`flex-1 transition-all duration-300 ${showToolbar ? 'ml-24' : 'ml-0'}`}>
            {/* Header */}
            <ToolHeader meta={safeMeta} />

            {/* Content */}
            <div className="container mx-auto px-4 py-8">
              <ToolOverview meta={safeMeta} />

              {/* Tool Content */}
              <div className="space-y-8">
                {typeof children === 'function' 
                  ? children({ activeTab })
                  : React.Children.map(children, child => {
                      if (React.isValidElement(child) && child.type && (child.type as any).acceptsActiveTab) {
                        return React.cloneElement(child as React.ReactElement<ToolComponentProps>, { activeTab });
                      }
                      return child;
                    })}

                {/* Category Link */}
                {safeMeta.navigation?.category && safeMeta.navigation.category.path && (
                  <Link 
                    href={safeMeta.navigation.category.path}
                    className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    <span className="text-sm">{safeMeta.navigation.category.title}</span>
                  </Link>
                )}

                {/* Next Tools Navigation */}
                {safeMeta.navigation?.nextTools && safeMeta.navigation.nextTools.length > 0 && (
                  <div className="flex items-center space-x-4">
                    {safeMeta.navigation.nextTools.map((tool) => (
                      tool.path ? (
                        <Link
                          key={tool.id}
                          href={tool.path}
                          className="flex items-center px-3 py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-gray-700/50 rounded-full transition-colors"
                        >
                          <span className="text-lg mr-2">{tool.icon}</span>
                          <span>{tool.title}</span>
                        </Link>
                      ) : null
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
