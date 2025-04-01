'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

interface TabConfig {
  id: string;
  label: string;
  icon: string;
  color: {
    active: string;
    hover: string;
  };
}

interface MathToolSidebarProps {
  title: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  showToolbar: boolean;
  activeTab: string;
  onTabChange: (tabId: string) => void;
  onToolbarToggle: () => void;
  onShowWelcome: () => void;
  tabs: TabConfig[];
}

export function MathToolSidebar({
  title,
  difficulty,
  showToolbar,
  activeTab,
  onTabChange,
  onToolbarToggle,
  onShowWelcome,
  tabs
}: MathToolSidebarProps) {
  return (
    <>
      <AnimatePresence>
        {showToolbar && (
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            className="w-20 md:w-24 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md flex flex-col items-center py-8 border-r border-gray-200 dark:border-gray-700 shadow-md z-20"
          >
            {/* Tool logo */}
            <motion.div 
              className="mb-10 p-2 rounded-full bg-gradient-to-br from-blue-500 to-purple-500"
              whileHover={{ scale: 1.1, rotate: [0, -10, 10, -5, 0] }}
              whileTap={{ scale: 0.9 }}
              onClick={onShowWelcome}
            >
              <span className="text-3xl">📐</span>
            </motion.div>
            
            <div className="flex flex-col items-center space-y-8">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  className={`p-3 rounded-xl flex flex-col items-center justify-center ${
                    activeTab === tab.id 
                      ? tab.color.active
                      : `text-gray-700 dark:text-gray-300 hover:${tab.color.hover}`
                  }`}
                  onClick={() => onTabChange(tab.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="text-2xl mb-1">{tab.icon}</span>
                  <span className="text-xs text-center">{tab.label}</span>
                </motion.button>
              ))}
            </div>
            
            <div className="mt-auto">
              <motion.div
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                whileHover={{ scale: 1.1, rotate: 20 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="text-xl">💡</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Toggle toolbar button */}
      <motion.button
        className="absolute top-4 left-0 z-30 p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-700 dark:text-gray-300 rounded-r-lg shadow-md"
        onClick={onToolbarToggle}
        whileHover={{ x: 3 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-lg">{showToolbar ? '◀' : '▶'}</span>
      </motion.button>
      
      {/* Header section */}
      <div className="mb-6 flex flex-wrap justify-between items-center">
        <div className="flex items-center">
          <motion.h1 
            className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-600 via-purple-500 to-pink-500 mr-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {title}
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full px-3 py-1 text-sm">
              {difficulty === 'beginner' && '🌱 Beginner'}
              {difficulty === 'intermediate' && '🚀 Intermediate'}
              {difficulty === 'advanced' && '🔥 Advanced'}
            </Badge>
          </motion.div>
        </div>
      </div>
    </>
  );
}
