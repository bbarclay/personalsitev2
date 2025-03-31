"use client";

import React, { useState, useEffect } from 'react';
import { ToolLayout } from '@/components/shared/ToolLayout';
import { ThemeProvider } from '@/components/theme-provider';
import meta from '../../meta.json';
import { motion, AnimatePresence } from 'framer-motion';
import FunSolverInterface from './FunSolverInterface';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Dynamically import components for better performance
const ResourcesPanel = dynamic(() => import('../../components/ResourcesPanel'));
const VisualExplanation = dynamic(() => import('../../components/VisualExplanation'));
const ApplicationsPanel = dynamic(() => import('../../components/ApplicationsPanel'));

/**
 * NewLinearSolverPage - Redesigned main page for the Linear System Solver tool
 * Features a fun, intuitive, and engaging interface with left-side navigation
 */
export default function NewLinearSolverPage() {
  // Page state
  const [activeView, setActiveView] = useState('solver');
  const [showWelcome, setShowWelcome] = useState(true);
  const [showLeftNav, setShowLeftNav] = useState(true);
  
  // Map difficulty level
  const difficultyLevel = (meta.difficulty?.toLowerCase() || 'intermediate') as 
    "beginner" | "intermediate" | "advanced";
  
  // Auto-hide welcome after a delay unless user interaction
  useEffect(() => {
    if (showWelcome) {
      const timer = setTimeout(() => setShowWelcome(false), 6000);
      return () => clearTimeout(timer);
    }
  }, [showWelcome]);

  // Toggle left nav
  const toggleLeftNav = () => setShowLeftNav(prev => !prev);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ToolLayout
        title={meta.title}
        icon={meta.icon}
        category={meta.category}
        subcategory={meta.subcategory || ''}
        difficulty={difficultyLevel}
        description={meta.description}
        type="math"
      >
        <div className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
          {/* Fun background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 right-20 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute bottom-40 left-20 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
            <div className="absolute bottom-20 right-40 w-60 h-60 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-6000"></div>
          </div>

          {/* Decorative math patterns */}
          <div className="absolute inset-0 bg-no-repeat bg-center pointer-events-none opacity-5" 
               style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%23FFF' stroke-width='1'%3E%3Cpath d='M0 40 L40 0 L80 40 L40 80 Z' /%3E%3Ccircle cx='40' cy='40' r='30' /%3E%3Cpath d='M20 60 L60 20 M20 20 L60 60' /%3E%3C/g%3E%3C/svg%3E\")"}}></div>

          {/* Welcome modal with fun animations */}
          <AnimatePresence>
            {showWelcome && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30"
              >
                <motion.div 
                  className="relative max-w-2xl w-full mx-4 p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden"
                  initial={{ scale: 0.8, rotate: -3 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: "spring", damping: 20 }}
                >
                  {/* Background decorations */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-blue-400 to-blue-500 opacity-20 rounded-full blur-3xl"></div>
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-purple-400 to-purple-500 opacity-20 rounded-full blur-3xl"></div>
                  
                  {/* Floating shapes */}
                  <motion.div 
                    className="absolute top-10 right-20 w-12 h-12 bg-yellow-400 opacity-20 rounded-full"
                    animate={{ y: [0, -15, 0], rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  ></motion.div>
                  <motion.div 
                    className="absolute bottom-10 left-20 w-16 h-16 bg-pink-400 opacity-20 rounded-xl rotate-45"
                    animate={{ rotate: [45, 90, 45] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                  ></motion.div>
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                      <motion.h2 
                        className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-600 via-purple-500 to-pink-500"
                        animate={{ scale: [1, 1.03, 1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      >
                        Linear System Solver 🧮
                      </motion.h2>
                      
                      <motion.button 
                        onClick={() => setShowWelcome(false)}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl"
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        ✖
                      </motion.button>
                    </div>
                    
                    <motion.div className="space-y-5 mb-6">
                      <motion.p 
                        className="text-xl text-gray-700 dark:text-gray-300"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        Ready for some math magic? This tool makes solving systems of linear equations fun and easy!
                      </motion.p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <motion.div 
                          className="p-4 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl"
                          whileHover={{ y: -5, scale: 1.02 }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <div className="flex">
                            <span className="text-3xl mr-3">🎮</span>
                            <div>
                              <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-1">Interactive</h3>
                              <p className="text-sm text-blue-600 dark:text-blue-400">Easily enter your system and watch the solution step-by-step</p>
                            </div>
                          </div>
                        </motion.div>
                        
                        <motion.div 
                          className="p-4 bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl"
                          whileHover={{ y: -5, scale: 1.02 }}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          <div className="flex">
                            <span className="text-3xl mr-3">🧩</span>
                            <div>
                              <h3 className="font-bold text-purple-700 dark:text-purple-300 mb-1">Visual</h3>
                              <p className="text-sm text-purple-600 dark:text-purple-400">Clear, colorful visualization of the elimination process</p>
                            </div>
                          </div>
                        </motion.div>
                        
                        <motion.div 
                          className="p-4 bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-xl"
                          whileHover={{ y: -5, scale: 1.02 }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 }}
                        >
                          <div className="flex">
                            <span className="text-3xl mr-3">🎓</span>
                            <div>
                              <h3 className="font-bold text-green-700 dark:text-green-300 mb-1">Educational</h3>
                              <p className="text-sm text-green-600 dark:text-green-400">Learn how Gaussian elimination works with detailed explanations</p>
                            </div>
                          </div>
                        </motion.div>
                        
                        <motion.div 
                          className="p-4 bg-gradient-to-r from-pink-100 to-pink-200 dark:from-pink-900/30 dark:to-pink-800/30 rounded-xl"
                          whileHover={{ y: -5, scale: 1.02 }}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 }}
                        >
                          <div className="flex">
                            <span className="text-3xl mr-3">🚀</span>
                            <div>
                              <h3 className="font-bold text-pink-700 dark:text-pink-300 mb-1">Fast</h3>
                              <p className="text-sm text-pink-600 dark:text-pink-400">Quick solutions for systems of any size with example problems</p>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                    
                    <motion.button
                      onClick={() => setShowWelcome(false)}
                      className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-xl font-bold rounded-xl shadow-lg"
                      whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.5)" }}
                      whileTap={{ scale: 0.97 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <span className="mr-2">Let's Start Solving!</span> ✨
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex h-screen">
            {/* Left-side Navigation Bar */}
            <AnimatePresence>
              {showLeftNav && (
                <motion.div 
                  initial={{ x: -80, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -80, opacity: 0 }}
                  className="w-20 md:w-24 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md flex flex-col items-center py-8 border-r border-gray-200 dark:border-gray-700 shadow-md z-20"
                >
                  {/* Tool logo */}
                  <motion.div 
                    className="mb-10 p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg"
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowWelcome(true)}
                  >
                    <span className="text-3xl">📐</span>
                  </motion.div>
                  
                  <div className="flex flex-col items-center space-y-8">
                    {/* Solver Button */}
                    <motion.button
                      className={`p-3 rounded-xl flex flex-col items-center ${
                        activeView === 'solver' 
                          ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300' 
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                      }`}
                      onClick={() => setActiveView('solver')}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <span className="text-2xl mb-1">🧮</span>
                      <span className="text-xs text-center">Solver</span>
                    </motion.button>
                    
                    {/* Learn Button */}
                    <motion.button
                      className={`p-3 rounded-xl flex flex-col items-center ${
                        activeView === 'learn' 
                          ? 'bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300' 
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                      }`}
                      onClick={() => setActiveView('learn')}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <span className="text-2xl mb-1">🔍</span>
                      <span className="text-xs text-center">Learn</span>
                    </motion.button>
                    
                    {/* Examples Button */}
                    <motion.button
                      className={`p-3 rounded-xl flex flex-col items-center ${
                        activeView === 'examples' 
                          ? 'bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-300' 
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                      }`}
                      onClick={() => setActiveView('examples')}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <span className="text-2xl mb-1">📚</span>
                      <span className="text-xs text-center">Examples</span>
                    </motion.button>
                    
                    {/* Resources Button */}
                    <motion.button
                      className={`p-3 rounded-xl flex flex-col items-center ${
                        activeView === 'resources' 
                          ? 'bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-300' 
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                      }`}
                      onClick={() => setActiveView('resources')}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <span className="text-2xl mb-1">📝</span>
                      <span className="text-xs text-center">Resources</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Toggle button for left navigation */}
            <motion.button
              className="absolute top-4 left-0 z-30 p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md text-gray-600 dark:text-gray-400 rounded-r-lg shadow-md"
              onClick={toggleLeftNav}
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-lg">{showLeftNav ? '◀' : '▶'}</span>
            </motion.button>
            
            {/* Main Content Area */}
            <motion.div 
              className="flex-1 p-4 md:p-8 overflow-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Page title with fun badge */}
              <div className="mb-6 flex flex-wrap justify-between items-center">
                <div className="flex items-center">
                  <motion.h1 
                    className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-600 via-purple-500 to-pink-500 mr-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    {activeView === 'solver' && 'Linear System Solver'}
                    {activeView === 'learn' && 'How It Works'}
                    {activeView === 'examples' && 'Example Problems'}
                    {activeView === 'resources' && 'Learning Resources'}
                  </motion.h1>
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full px-3 py-1 text-sm">
                      {difficultyLevel === 'beginner' && '🌱 Beginner'}
                      {difficultyLevel === 'intermediate' && '🚀 Intermediate'}
                      {difficultyLevel === 'advanced' && '🔥 Advanced'}
                    </Badge>
                  </motion.div>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Button 
                    onClick={() => setShowWelcome(true)}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                  >
                    <span className="mr-2">Need Help?</span> 💬
                  </Button>
                </motion.div>
              </div>
              
              {/* Main content section with animated transitions */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeView}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeView === 'solver' && <FunSolverInterface />}
                  {activeView === 'learn' && <VisualExplanation />}
                  {activeView === 'examples' && <ApplicationsPanel />}
                  {activeView === 'resources' && <ResourcesPanel />}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </ToolLayout>
    </ThemeProvider>
  );
} 