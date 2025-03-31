"use client";

import React, { useState, useEffect } from 'react';
import { CategorySidebar } from './CategorySidebar';
import { FeaturedTools } from './FeaturedTools';
import { AllTools } from './AllTools';
import { AIPageMeta } from '../types';

interface AIToolsPageProps {
  initialTools: AIPageMeta[];
}

export function AIToolsPage({ initialTools }: AIToolsPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Categories');
  const [filteredTools, setFilteredTools] = useState<AIPageMeta[]>(initialTools);
  
  // Extract all unique categories from tools
  const allCategories = ['All Categories', ...Array.from(new Set(initialTools.map(tool => tool.category)))];
  
  // Count tools per category
  const toolCount = initialTools.reduce<Record<string, number>>((acc, tool) => {
    acc[tool.category] = (acc[tool.category] || 0) + 1;
    acc['All Categories'] = (acc['All Categories'] || 0) + 1;
    return acc;
  }, {});
  
  // Filter tools based on search term and active category
  useEffect(() => {
    let filtered = initialTools;
    
    // Apply category filter
    if (activeCategory !== 'All Categories') {
      filtered = filtered.filter(tool => tool.category === activeCategory);
    }
    
    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(tool => {
        return (
          tool.title.toLowerCase().includes(searchLower) ||
          tool.description.toLowerCase().includes(searchLower) ||
          tool.tags?.some(tag => tag.toLowerCase().includes(searchLower)) ||
          tool.keywords?.some(keyword => keyword.toLowerCase().includes(searchLower))
        );
      });
    }
    
    setFilteredTools(filtered);
  }, [searchTerm, activeCategory, initialTools]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">AI Tools</h1>
      <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">
        Explore our collection of artificial intelligence tools for various applications
      </p>
      
      {/* Search */}
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search AI tools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
          <span className="absolute left-3 top-3 text-gray-400">
            🔍
          </span>
        </div>
      </div>
      
      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <CategorySidebar
            categories={allCategories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            toolCount={toolCount}
          />
        </div>
        
        {/* Main content area */}
        <div className="lg:col-span-3">
          {searchTerm.trim() === '' && activeCategory === 'All Categories' && (
            <FeaturedTools tools={initialTools} />
          )}
          
          <AllTools pages={filteredTools} />
          
          {filteredTools.length === 0 && (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                No tools found matching your criteria. Try adjusting your search or category.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 