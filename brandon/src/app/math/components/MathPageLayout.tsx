'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ThemeProvider } from '@/components/theme-provider';
import { MathToolMeta } from '../types/tool-config';

interface WithActiveTab {
  activeTab: string;
}

interface MathPageLayoutProps {
  meta: MathToolMeta;
  children: React.ReactNode;
}

export function MathPageLayout({ meta, children }: MathPageLayoutProps) {
  const [showToolbar, setShowToolbar] = useState(true);
  const [activeTab, setActiveTab] = useState(meta.sidebar?.tabs[0]?.id || 'solver');

  // Get difficulty level
  const difficulty = (meta.difficulty?.toLowerCase() || 'intermediate') as 
    "beginner" | "intermediate" | "advanced";

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        {/* Back to Categories Navigation */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 py-2">
            <Link 
              href="/math"
              className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Math Tools
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="pt-12">
          <div className="flex">
            {/* Sidebar */}
            <AnimatePresence>
              {showToolbar && (
                <motion.div 
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0 }}
                  className="w-20 md:w-24 fixed top-12 bottom-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md flex flex-col items-center py-8 border-r border-gray-200 dark:border-gray-700 shadow-md z-20"
                >
                  {/* Tool Header */}
                  <motion.div 
                    className="mb-10 p-2 rounded-full bg-gradient-to-br from-blue-500 to-purple-500"
                    whileHover={{ scale: 1.1, rotate: [0, -10, 10, -5, 0] }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="text-3xl">{meta.icon}</span>
                  </motion.div>
                  
                  {/* Navigation Tabs */}
                  <div className="flex flex-col items-center space-y-8">
                    {meta.sidebar?.tabs.map((tab) => (
                      <motion.button
                        key={tab.id}
                        className={`p-3 rounded-xl flex flex-col items-center justify-center ${
                          activeTab === tab.id 
                            ? tab.color.active
                            : `text-gray-700 dark:text-gray-300 hover:${tab.color.hover}`
                        }`}
                        onClick={() => setActiveTab(tab.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <span className="text-2xl mb-1">{tab.icon}</span>
                        <span className="text-xs text-center">{tab.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Toggle Toolbar Button */}
            <motion.button
              className="fixed top-16 left-0 z-30 p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-700 dark:text-gray-300 rounded-r-lg shadow-md"
              onClick={() => setShowToolbar(prev => !prev)}
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-lg">{showToolbar ? '◀' : '▶'}</span>
            </motion.button>

            {/* Main Content Area */}
            <div className={`flex-1 transition-all duration-300 ${showToolbar ? 'ml-24' : 'ml-0'}`}>
              <div className="container mx-auto px-4 py-8">
                {/* Page Header */}
                <div className="mb-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        {meta.title}
                      </h1>
                      <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
                        {meta.description}
                      </p>
                    </div>
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                      {difficulty === 'beginner' && '🌱 Beginner'}
                      {difficulty === 'intermediate' && '🚀 Intermediate'}
                      {difficulty === 'advanced' && '🔥 Advanced'}
                    </Badge>
                  </div>
                </div>

                {/* Render Child Components */}
                <div className="space-y-8">
                  {React.Children.map(children, child => {
                    if (React.isValidElement(child)) {
                      return React.cloneElement(child as React.ReactElement<WithActiveTab>, { activeTab });
                    }
                    return child;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
