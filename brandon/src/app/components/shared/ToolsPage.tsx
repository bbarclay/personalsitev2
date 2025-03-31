"use client";

import React, { useState, useEffect } from 'react';
import { Search, ChevronRight, Square, Triangle, Circle, Filter, X, Grid, List, ChevronDown, Star, Cpu, Calculator, Code, BookOpen, Clock, Zap, Bookmark, EyeIcon, AwardIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Define category icons
const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'All Categories': <Grid size={18} />,
  'Algebra': <Calculator size={18} />,
  'Calculus': <Code size={18} />,
  'Geometry': <Triangle size={18} />,
  'Statistics': <BookOpen size={18} />,
  'Machine Learning': <Cpu size={18} />,
  'Data Science': <Cpu size={18} />,
  'Physics': <Zap size={18} />,
  'Chemistry': <Square size={18} />,
  'Computer Science': <Cpu size={18} />
  // Add icons for other categories as needed
};

// Get icon for category, default to a star if not found
const getCategoryIcon = (category: string) => {
  return CATEGORY_ICONS[category] || <Star size={18} />;
};

interface Tool {
  id: string;
  title: string;
  description: string;
  category: string;
  path: string;
  icon?: string;
  tags?: string[];
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
  color?: string;
  shape?: string;
}

interface ToolsPageProps {
  initialTools: Tool[];
  title: string;
  description: string;
  type: 'math' | 'ai';
}

export const ToolsPage: React.FC<ToolsPageProps> = ({ 
  initialTools, 
  title, 
  description,
  type 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Categories');
  const [activeLevel, setActiveLevel] = useState<string | null>(null);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState<Tool[]>([]);
  const tools = initialTools;
  
  // Get unique categories from tools
  const categories = ['All Categories', ...Array.from(new Set(tools.map(tool => tool.category)))];
  
  // Get unique tags from tools
  const allTags = Array.from(new Set(tools.flatMap(tool => tool.tags || [])));
  
  // Get unique levels from tools
  const allLevels = Array.from(new Set(tools.map(tool => tool.level).filter(Boolean))) as string[];

  // Count tools per category
  const categoryCount = categories.reduce((acc, category) => {
    acc[category] = category === 'All Categories' 
      ? tools.length 
      : tools.filter(tool => tool.category === category).length;
    return acc;
  }, {} as Record<string, number>);

  // Filter tools based on search term, category, level, and tags
  const filteredTools = tools.filter(tool => {
    const matchesSearch = searchTerm === '' || 
      tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tool.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    
    const matchesCategory = activeCategory === 'All Categories' || tool.category === activeCategory;
    
    const matchesLevel = activeLevel === null || tool.level === activeLevel;
    
    const matchesTags = activeTags.length === 0 || 
      activeTags.every(tag => tool.tags?.includes(tag));
    
    return matchesSearch && matchesCategory && matchesLevel && matchesTags;
  });

  // Calculate featured tools (first 6 after filtering)
  const featuredTools = filteredTools.slice(0, 6);
  
  // Group tools by category for the "All Tools" section
  const toolsByCategory = categories.slice(1).map(category => {
    return {
      category,
      tools: filteredTools.filter(tool => tool.category === category)
    };
  }).filter(group => group.tools.length > 0);

  const getShapeClass = (shape: string): string => {
    switch (shape) {
      case 'square':
        return 'w-16 h-16';
      case 'circle':
        return 'w-16 h-16 rounded-full';
      case 'triangle':
        return 'w-16 h-16 clip-path-triangle';
      case 'hexagon':
        return 'w-16 h-16 clip-path-hexagon';
      case 'parallelogram':
        return 'w-16 h-16 clip-path-parallelogram';
      case 'rectangle':
        return 'w-16 h-16 rounded-lg';
      default:
        return 'w-16 h-16';
    }
  };

  const getToolPath = (id: string): string => {
    const tool = tools.find(t => t.id === id);
    return tool?.path || `/${type}/${id}`;
  };

  // Toggle a tag in the active tags
  const toggleTag = (tag: string) => {
    if (activeTags.includes(tag)) {
      setActiveTags(activeTags.filter(t => t !== tag));
    } else {
      setActiveTags([...activeTags, tag]);
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setActiveCategory('All Categories');
    setActiveLevel(null);
    setActiveTags([]);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-800 dark:from-blue-900 via-indigo-800 dark:via-indigo-900 to-purple-800 dark:to-purple-900 py-12 px-4 relative overflow-hidden">
        {/* Abstract symbols background */}
        <div className="absolute inset-0 opacity-10">
          {/* Pre-generate random values using state to avoid hydration mismatch */}
          {(() => {
            const [symbols, setSymbols] = useState<Array<{
              left: number;
              top: number;
              fontSize: number;
              rotation: number;
              symbol: string;
            }>>([]);

            useEffect(() => {
              const mathSymbols = ['+', '−', '×', '÷', '=', 'Σ', '∫', 'π', '√', 'Δ', '∞', '∂', 'θ', 'λ'];
              const aiSymbols = ['🤖', '🧠', '📊', '🔍', '⚡', '💡', '🎯', '🔮', '📈', '🎨', '🔢', '💻'];
              
              const newSymbols = Array.from({ length: 50 }).map(() => ({
                left: Math.random() * 100,
                top: Math.random() * 100,
                fontSize: Math.random() * 20 + 10,
                rotation: Math.random() * 360,
                symbol: type === 'math' 
                  ? mathSymbols[Math.floor(Math.random() * mathSymbols.length)]
                  : aiSymbols[Math.floor(Math.random() * aiSymbols.length)]
              }));
              
              setSymbols(newSymbols);
            }, [type]); // Only regenerate when type changes

            return symbols.map((config, i) => (
              <div
                key={i}
                className="absolute text-gray-900 dark:text-white text-opacity-20 font-bold"
                style={{
                  left: `${config.left}%`,
                  top: `${config.top}%`,
                  fontSize: `${config.fontSize}px`,
                  transform: `rotate(${config.rotation}deg)`,
                }}
              >
                {config.symbol}
              </div>
            ));
          })()}
        </div>

        <div className="container mx-auto relative z-10">
          <h1 className="text-5xl font-bold mb-3 flex items-center text-white">
            <span className="mr-2 relative">
              {title}
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-purple-400"></span>
            </span>
          </h1>
          <p className="text-xl text-blue-100">
            {description}
          </p>

          {/* Enhanced Search Bar in Header */}
          <div className="mt-8 max-w-2xl mx-auto relative">
            <div className="relative backdrop-blur-sm bg-white/10 rounded-xl overflow-hidden shadow-lg border border-white/20">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-100" size={20} />
              <input
                type="text"
                placeholder="Search for tools, concepts, or keywords..."
                className="w-full bg-transparent border-none py-4 pl-12 pr-14 text-white placeholder-blue-100/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-100 hover:text-white"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {/* Search Stats */}
            {searchTerm && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute mt-2 text-blue-100 text-sm"
              >
                Found {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'} 
                for "{searchTerm}"
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        {/* Filter Bar */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-glow-sm mb-8 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center space-x-2">
              <Filter size={18} className="text-indigo-600 dark:text-indigo-400" />
              <h3 className="font-semibold">Filters</h3>
              
              {/* Active filters count */}
              {(activeCategory !== 'All Categories' || activeLevel !== null || activeTags.length > 0) && (
                <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs px-2 py-1 rounded-full">
                  {(activeCategory !== 'All Categories' ? 1 : 0) + 
                   (activeLevel !== null ? 1 : 0) + 
                   activeTags.length}
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Reset filters button */}
              {(activeCategory !== 'All Categories' || activeLevel !== null || activeTags.length > 0 || searchTerm) && (
                <button 
                  onClick={resetFilters}
                  className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center"
                >
                  <X size={14} className="mr-1" />
                  Reset
                </button>
              )}
              
              {/* View toggle */}
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg flex">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-l-lg ${viewMode === 'grid' 
                    ? 'bg-indigo-600 text-white' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                >
                  <Grid size={16} />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-r-lg ${viewMode === 'list' 
                    ? 'bg-indigo-600 text-white' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                >
                  <List size={16} />
                </button>
              </div>
              
              {/* Expand/collapse filter */}
              <button 
                onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                className="text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white flex items-center"
              >
                {isFilterExpanded ? 'Less' : 'More'} filters
                <ChevronDown 
                  size={14} 
                  className={`ml-1 transform transition-transform ${isFilterExpanded ? 'rotate-180' : ''}`} 
                />
              </button>
            </div>
          </div>
          
          {/* Expanded filters */}
          <AnimatePresence>
            {isFilterExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Level filter */}
                  <div>
                    <h4 className="font-medium mb-2 text-sm text-gray-700 dark:text-gray-300">Level</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Beginner', 'Intermediate', 'Advanced'].map(level => (
                        <button
                          key={level}
                          onClick={() => setActiveLevel(activeLevel === level ? null : level)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                            activeLevel === level
                              ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                          }`}
                        >
                          {level === 'Beginner' && <AwardIcon size={12} className="inline mr-1" />}
                          {level === 'Intermediate' && <BookOpen size={12} className="inline mr-1" />}
                          {level === 'Advanced' && <Zap size={12} className="inline mr-1" />}
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Tags filter */}
                  <div className="md:col-span-2">
                    <h4 className="font-medium mb-2 text-sm text-gray-700 dark:text-gray-300">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {allTags.slice(0, 10).map(tag => (
                        <button
                          key={tag}
                          onClick={() => toggleTag(tag)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                            activeTags.includes(tag)
                              ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                      {allTags.length > 10 && (
                        <button className="px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
                          +{allTags.length - 10} more
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Results count */}
        <div className="mb-6 text-gray-700 dark:text-gray-300">
          {filteredTools.length > 0 ? (
            <p>Showing {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'}</p>
          ) : (
            <p>No tools found matching your criteria. Try adjusting your filters.</p>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar with Enhanced Categories */}
          <div className="md:w-1/4">
            <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-glow-sm sticky top-4">
              <h2 className="text-xl font-bold p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                <span>Categories</span>
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  {categoryCount['All Categories']} tools
                </span>
              </h2>
              <div className="overflow-y-auto max-h-[600px] hide-scrollbar">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveCategory(category)}
                    className={`w-full text-left p-4 transition-all duration-300 flex items-center justify-between ${
                      activeCategory === category
                        ? 'bg-gradient-to-r from-blue-700 dark:from-blue-900 to-indigo-700 dark:to-indigo-900 text-white'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 border-b border-gray-200/50 dark:border-gray-800/50'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`mr-3 p-2 rounded-lg ${
                        activeCategory === category 
                          ? 'bg-white/20' 
                          : 'bg-gray-100 dark:bg-gray-800'
                      }`}>
                        {getCategoryIcon(category)}
                      </div>
                      <span className="font-medium">{category}</span>
                    </div>
                    <div className="flex items-center">
                      <span className={`inline-flex items-center justify-center rounded-full text-xs font-medium ${
                        activeCategory === category
                          ? 'bg-white/20 px-2.5 py-1 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 px-2 py-0.5 text-gray-700 dark:text-gray-300'
                      }`}>
                        {categoryCount[category]}
                      </span>
                      {activeCategory === category && (
                        <ChevronRight size={16} className="ml-2 animate-pulse" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
              
              {/* Quick Links */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quick Links</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button className="flex items-center justify-center p-2 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 text-sm font-medium">
                    <Bookmark size={14} className="mr-1.5" />
                    Bookmarks
                  </button>
                  <button className="flex items-center justify-center p-2 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 text-sm font-medium">
                    <EyeIcon size={14} className="mr-1.5" />
                    Recently Viewed
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="md:w-3/4">
            {/* Active Filters */}
            <AnimatePresence>
              {(activeCategory !== 'All Categories' || activeLevel !== null || activeTags.length > 0) && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 overflow-hidden"
                >
                  <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-200 dark:border-gray-800">
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
                      
                      {activeCategory !== 'All Categories' && (
                        <div className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                          <span className="mr-1">Category:</span> {activeCategory}
                          <button 
                            onClick={() => setActiveCategory('All Categories')}
                            className="ml-2 hover:text-blue-900 dark:hover:text-blue-100"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      )}
                      
                      {activeLevel && (
                        <div className="bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                          <span className="mr-1">Level:</span> {activeLevel}
                          <button 
                            onClick={() => setActiveLevel(null)}
                            className="ml-2 hover:text-purple-900 dark:hover:text-purple-100"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      )}
                      
                      {activeTags.map(tag => (
                        <div 
                          key={tag}
                          className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium flex items-center"
                        >
                          <span className="mr-1">Tag:</span> {tag}
                          <button 
                            onClick={() => toggleTag(tag)}
                            className="ml-2 hover:text-green-900 dark:hover:text-green-100"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                      
                      <button 
                        onClick={resetFilters}
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 ml-auto"
                      >
                        Clear all
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Featured Tools */}
            {filteredTools.length > 0 && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-6 relative inline-block">
                  Featured Tools
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {featuredTools.map((tool, index) => (
                    <motion.div
                      key={tool.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="group"
                      whileHover={{ y: -5 }}
                    >
                      <Link href={getToolPath(tool.id)} className="block h-full">
                        <div className={`relative rounded-xl overflow-hidden shadow-glow-md h-full bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-800 hover:border-${tool.color?.split(' ')[0].replace('from-', '')}-400 transition-all duration-300`}>
                          {/* Pulsing background effect on hover */}
                          <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-pulse-slow">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10"></div>
                          </div>
                          
                          {/* Tool content */}
                          <div 
                            className={`absolute inset-0 bg-gradient-to-br ${tool.color || 'from-blue-600 to-indigo-600'} opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-500`}
                            style={{ clipPath: tool.shape === 'rectangle' ? 'none' : undefined }}
                          ></div>
                          
                          <div className="relative z-10 p-6 flex flex-col h-full">
                            <div className="flex items-start justify-between mb-4">
                              <div className={`${getShapeClass(tool.shape || 'square')} bg-gradient-to-br ${tool.color || 'from-blue-600 to-indigo-600'} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
                                {tool.icon}
                              </div>
                              <div>
                                {tool.tags?.map(tag => (
                                  <span key={tag} className="inline-block px-2 py-1 text-xs font-medium rounded-md bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 mr-2 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 group-hover:text-indigo-700 dark:group-hover:text-indigo-200 transition-colors">
                                    {tag}
                                  </span>
                                ))}
                                {tool.level && (
                                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-md ${
                                    tool.level === 'Beginner' ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300' :
                                    tool.level === 'Intermediate' ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300' :
                                    'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300'
                                  }`}>
                                    {tool.level}
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white">
                              {tool.title}
                              <span className="ml-2 inline-block w-5 h-0.5 bg-indigo-500 group-hover:w-12 transition-all duration-300"></span>
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-100 mb-4">
                              {tool.description}
                            </p>
                            
                            <div className="mt-auto">
                              <button className="group-hover:bg-indigo-600 group-hover:text-white dark:group-hover:bg-white/90 dark:group-hover:text-gray-900 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center text-sm font-medium">
                                Open Tool
                                <ChevronRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                              </button>
                            </div>
                          </div>
                          
                          {/* Background decorative elements */}
                          <div className="absolute top-0 right-0 p-4 opacity-10 transition-opacity group-hover:opacity-20">
                            {tool.shape === 'triangle' && <Triangle className="h-16 w-16" />}
                            {tool.shape === 'rectangle' && <Square className="h-16 w-16" />}
                            {tool.shape === 'hexagon' && <div className="h-16 w-16 border-2 border-current rounded-full" />}
                            {tool.shape === 'circle' && <Circle className="h-16 w-16" />}
                            {(tool.shape === 'parallelogram' || tool.shape === 'rhombus') && <div className="h-16 w-16 rotate-45 border-2 border-current" />}
                            {(tool.shape === 'pentagon' || tool.shape === 'octagon' || tool.shape === 'trapezoid') && <div className="h-16 w-16 border-2 border-current" />}
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* No Results Message */}
            {filteredTools.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white dark:bg-gray-900 rounded-xl p-8 text-center shadow-glow-sm"
              >
                <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                  <Search size={32} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">No Tools Found</h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
                  We couldn't find any tools matching your current filters. Try adjusting your search criteria or browse all categories.
                </p>
                <button 
                  onClick={resetFilters}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Reset Filters
                </button>
              </motion.div>
            )}

            {/* All Tools by Category */}
            {filteredTools.length > 0 && (
              <div className="mb-16">
                <h2 className="text-3xl font-bold mb-8 relative inline-block">
                  All Tools
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                </h2>

                {toolsByCategory.length > 0 ? (
                  toolsByCategory.map((group, groupIndex) => (
                    <div key={group.category} className="mb-12">
                      <h3 className="text-2xl font-bold mb-6 flex items-center">
                        <div className="mr-3 p-2 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
                          {getCategoryIcon(group.category)}
                        </div>
                        <span className="mr-2 text-gradient bg-gradient-to-r from-blue-600 dark:from-blue-400 to-indigo-600 dark:to-indigo-500 bg-clip-text text-transparent">{group.category}</span>
                        <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800">
                          {group.tools.length} {group.tools.length === 1 ? 'tool' : 'tools'}
                        </span>
                      </h3>
                      
                      {viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {group.tools.map((tool, index) => (
                            <motion.div
                              key={tool.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2, delay: index * 0.05 + groupIndex * 0.1 }}
                              className="group"
                              whileHover={{ scale: 1.02 }}
                            >
                              <Link href={getToolPath(tool.id)} className="block">
                                <div className={`relative p-4 rounded-lg overflow-hidden bg-gray-100/80 dark:bg-gray-900/80 border border-gray-300 dark:border-gray-800 hover:border-${tool.color?.split(' ')[0].replace('from-', '')}-400 transition-all duration-300 hover:shadow-glow-sm`}>
                                  <div className="flex items-center gap-3">
                                    <div className={`text-2xl h-10 w-10 flex items-center justify-center rounded-md bg-gradient-to-br ${tool.color || 'from-blue-600 to-indigo-600'}`}>
                                      {tool.icon}
                                    </div>
                                    <div>
                                      <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white">{tool.title}</h4>
                                      {tool.level && (
                                        <div className="flex items-center gap-2 mt-1">
                                          <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-sm ${
                                            tool.level === 'Beginner' ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300' :
                                            tool.level === 'Intermediate' ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300' :
                                            'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300'
                                          }`}>
                                            {tool.level}
                                          </span>
                                          <ChevronRight className="h-3 w-3 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transform group-hover:translate-x-1 transition-all" />
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {group.tools.map((tool, index) => (
                            <motion.div
                              key={tool.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2, delay: index * 0.05 + groupIndex * 0.1 }}
                              className="group"
                            >
                              <Link href={getToolPath(tool.id)} className="block">
                                <div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-800 hover:border-indigo-300 dark:hover:border-indigo-700">
                                  <div className="flex items-center">
                                    <div className={`text-2xl h-12 w-12 flex-shrink-0 flex items-center justify-center rounded-md bg-gradient-to-br ${tool.color || 'from-blue-600 to-indigo-600'} mr-4`}>
                                      {tool.icon}
                                    </div>
                                    <div className="flex-grow">
                                      <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                        {tool.title}
                                      </h4>
                                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                                        {tool.description}
                                      </p>
                                    </div>
                                    <div className="flex-shrink-0 flex items-center space-x-2">
                                      {tool.level && (
                                        <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-sm ${
                                          tool.level === 'Beginner' ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300' :
                                          tool.level === 'Intermediate' ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300' :
                                          'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300'
                                        }`}>
                                          {tool.level}
                                        </span>
                                      )}
                                      <ChevronRight className="h-5 w-5 text-indigo-500 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="bg-white dark:bg-gray-900 rounded-lg p-8 text-center border border-gray-200 dark:border-gray-800">
                    <p className="text-gray-600 dark:text-gray-400">
                      No tools found in any category with your current filters.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Math Domains (only for math type) */}
            {type === 'math' && filteredTools.length > 0 && (
              <div className="mt-16">
                <h2 className="text-3xl font-bold mb-8 relative inline-block">
                  Math Domains
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                </h2>
                
                <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
                  {/* Statistics Domain */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="group cursor-pointer"
                    whileHover={{ y: -5 }}
                  >
                    <div className="relative h-[200px] bg-gradient-to-b from-green-600 to-green-700 rounded-lg overflow-hidden shadow-glow-md transform transition-all duration-500">
                      <div className="absolute inset-0 bg-green-900 opacity-70"></div>
                      <div className="relative z-10 h-full flex flex-col items-center justify-center p-6">
                        <span className="text-4xl mb-4 text-white group-hover:scale-110 transition-transform duration-300">λ</span>
                        <h3 className="text-2xl font-bold text-center text-white">Statistics</h3>
                        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-14 h-14 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 group-hover:bottom-4 transition-all duration-500"></div>
                      </div>
                      
                      {/* Decorative elements */}
                      <div className="absolute -bottom-4 -right-4 w-24 h-24 border-4 border-green-500/20 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
                      <div className="absolute -top-4 -left-4 w-16 h-16 border-4 border-green-500/20 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
                    </div>
                  </motion.div>
                  
                  {/* Physics Domain */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="group cursor-pointer"
                    whileHover={{ y: -5 }}
                  >
                    <div className="relative h-[200px] transform rotate-0 bg-gradient-to-b from-amber-500 to-orange-600 hover:rotate-0 transition-all duration-500 overflow-hidden shadow-glow-md">
                      <div className="absolute inset-0 bg-orange-900 opacity-70"></div>
                      <div className="relative z-10 h-full flex flex-col items-center justify-center p-6">
                        <span className="text-4xl mb-4 text-white group-hover:scale-110 transition-transform duration-300">Δ</span>
                        <h3 className="text-2xl font-bold text-center text-white">Physics</h3>
                        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-14 h-14 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 group-hover:bottom-4 transition-all duration-500"></div>
                      </div>
                      
                      {/* Decorative elements */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-40 h-40 border-4 border-orange-500/20 transform rotate-45 group-hover:rotate-[135deg] transition-all duration-1000"></div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Discrete Math Domain */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="group cursor-pointer"
                    whileHover={{ y: -5 }}
                  >
                    <div className="relative h-[200px] bg-gradient-to-b from-violet-600 to-purple-700 overflow-hidden shadow-glow-md transform transition-all duration-500">
                      <div className="absolute inset-0 bg-purple-900 opacity-70"></div>
                      <div className="absolute inset-0 z-0">
                        {/* Create zig-zag pattern edges */}
                        <svg width="100%" height="100%">
                          <defs>
                            <pattern id="zigzag" patternUnits="userSpaceOnUse" width="40" height="20" patternTransform="scale(2) rotate(0)">
                              <path d="M0,10 L10,0 L20,10 L30,0 L40,10 L40,20 L30,20 L20,10 L10,20 L0,20 Z" fill="none" stroke="rgba(167, 139, 250, 0.3)" strokeWidth="1" />
                            </pattern>
                          </defs>
                          <rect x="0" y="0" width="100%" height="100%" fill="url(#zigzag)" />
                        </svg>
                      </div>
                      <div className="relative z-10 h-full flex flex-col items-center justify-center p-6">
                        <span className="text-4xl mb-4 text-white group-hover:scale-110 transition-transform duration-300">⊕</span>
                        <h3 className="text-2xl font-bold text-center text-white">Discrete Math</h3>
                        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-14 h-14 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 group-hover:bottom-4 transition-all duration-500"></div>
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                {/* Navigation Bar */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mt-16 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-md overflow-hidden shadow-glow-md transform transition-all duration-500 hover:scale-[1.01]"
                >
                  <div className="flex flex-wrap justify-around items-center py-6 px-4 relative">
                    {/* Animated background */}
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1 bg-white/10"></div>
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-black/10"></div>
                      <div className="absolute -left-10 top-1/2 w-20 h-40 bg-white/5 blur-xl transform -translate-y-1/2 rounded-full animate-pulse-slow"></div>
                      <div className="absolute -right-10 top-1/2 w-20 h-40 bg-white/5 blur-xl transform -translate-y-1/2 rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
                    </div>
                    
                    {["Home", "About", "Services", "Portfolio", "Contact"].map((item, index) => (
                      <Link
                        key={item}
                        href={`/${item.toLowerCase()}`}
                        className="relative px-4 py-2 text-lg font-medium text-white hover:text-white/80 transition-colors duration-300 z-10 group"
                      >
                        {item}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                      </Link>
                    ))}
                  </div>
                  
                  {/* Bottom decorative zigzag */}
                  <svg width="100%" height="10" viewBox="0 0 1200 40" preserveAspectRatio="none">
                    <path
                      d="M0,0 L40,20 L80,0 L120,20 L160,0 L200,20 L240,0 L280,20 L320,0 L360,20 L400,0 L440,20 L480,0 L520,20 L560,0 L600,20 L640,0 L680,20 L720,0 L760,20 L800,0 L840,20 L880,0 L920,20 L960,0 L1000,20 L1040,0 L1080,20 L1120,0 L1160,20 L1200,0"
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.5)"
                      strokeWidth="2"
                    />
                  </svg>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* CSS for custom shapes and animations */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.8;
          }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .clip-path-hexagon {
          clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
        }
        
        .clip-path-triangle {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
        
        .clip-path-pentagon {
          clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
        }
        
        .clip-path-trapezoid {
          clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);
        }
        
        .clip-path-octagon {
          clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
        }
        
        .shadow-glow-sm {
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.3);
        }
        
        .shadow-glow-md {
          box-shadow: 0 0 25px rgba(59, 130, 246, 0.3);
        }
        
        .text-gradient {
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .hide-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
        
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        
        .line-clamp-1 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
      `}</style>
    </div>
  );
};
