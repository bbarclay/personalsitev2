'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ModeToggle } from '@/components/mode-toggle';
import { cn } from '@/lib/utils';
import { ToolMeta, TabConfig } from '@/types/tool-types';
import { Icon } from '@/components/ui/icon';

// Default tabs to use when none are provided in meta
const DEFAULT_TABS = [
  {
    id: 'solver',
    label: 'Solver',
    icon: '🧮',
    color: {
      active: 'text-blue-600 dark:text-blue-400',
      hover: 'text-blue-500'
    }
  },
  {
    id: 'explanation',
    label: 'Learn',
    icon: '📚',
    color: {
      active: 'text-green-600 dark:text-green-400',
      hover: 'text-green-500'
    }
  },
  {
    id: 'applications',
    label: 'Uses',
    icon: '🔧',
    color: {
      active: 'text-purple-600 dark:text-purple-400',
      hover: 'text-purple-500'
    }
  },
  {
    id: 'resources',
    label: 'Resources',
    icon: '📖',
    color: {
      active: 'text-orange-600 dark:text-orange-400',
      hover: 'text-orange-500'
    }
  }
];

interface ToolSidebarProps {
  meta: ToolMeta;
  activeTab: string;
  setActiveTab: (tabId: string) => void;
}

// Ensures a tab has valid color properties
const getTabWithSafeColors = (tab: any, defaultTab: TabConfig): TabConfig => {
  if (!tab) return defaultTab;
  
  // Safe default colors if missing or invalid
  const safeActiveColor = tab.color?.active || defaultTab.color.active;
  const safeHoverColor = tab.color?.hover || defaultTab.color.hover;
  
  return {
    id: tab.id || defaultTab.id,
    label: tab.label || defaultTab.label,
    icon: tab.icon || defaultTab.icon,
    color: {
      active: safeActiveColor,
      hover: safeHoverColor
    }
  };
};

export function ToolSidebar({ meta, activeTab, setActiveTab }: ToolSidebarProps) {
  // Ensure meta.sidebar.tabs exists and is an array
  const tabs = meta?.sidebar?.tabs || [];
  
  return (
    <div className="w-20 md:w-24 min-h-screen bg-white/80 dark:bg-gray-800/80 backdrop-blur-md flex flex-col border-r border-gray-200 dark:border-gray-700 shadow-md z-20">
      {/* Logo */}
      <Link 
        href="/"
        className="flex items-center justify-center py-6 border-b border-gray-200 dark:border-gray-700"
      >
        <motion.div 
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold text-white",
            "bg-gradient-to-br shadow-lg",
            meta?.type === 'math' ? "from-blue-500 to-purple-500" : "from-orange-500 to-pink-500"
          )}
          whileHover={{ scale: 1.1, rotate: [0, -10, 10, -5, 0] }}
          whileTap={{ scale: 0.9 }}
        >
          <Icon icon={meta.icon} className="text-2xl" />
        </motion.div>
      </Link>

      {/* Navigation Tabs */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col items-center space-y-8 py-6">
          {tabs.map((tab) => {
            // Defensive check for empty/invalid tabs
            if (!tab || !tab.id) return null;
            
            const isActive = activeTab === tab.id;
            
            return (
              <motion.button
                key={tab.id}
                className={cn(
                  "p-3 rounded-xl flex flex-col items-center justify-center w-16 transition-colors",
                  isActive 
                    ? tab.color.active
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                )}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon icon={tab.icon} className={cn(
                  "text-xl mb-1",
                  isActive && "text-current"
                )} />
                <span className="text-xs text-center">{tab.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Theme Switcher */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <ModeToggle />
      </div>
    </div>
  );
} 