"use client";

import React, { useState, useEffect } from 'react';
import { CategorySidebar } from './CategorySidebar';
import { FeaturedTools } from './FeaturedTools';
import { AllTools } from './AllTools';
import { MathPageMeta } from '../types';

interface MathToolsPageProps {
  initialTools: MathPageMeta[];
}

export function MathToolsPage({ initialTools }: MathToolsPageProps) {
  const [mathPages, setMathPages] = useState<MathPageMeta[]>(initialTools);
  const [filteredPages, setFilteredPages] = useState<MathPageMeta[]>(initialTools);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [toolCount, setToolCount] = useState<Record<string, number>>({});

  // Set up categories from the initial data
  useEffect(() => {
    // Extract unique categories
    const uniqueCategories = Array.from(new Set(initialTools.map(page => page.category)));
    setCategories(uniqueCategories);
    
    // Calculate tool counts per category
    const counts: Record<string, number> = {};
    initialTools.forEach(tool => {
      counts[tool.category] = (counts[tool.category] || 0) + 1;
    });
    setToolCount(counts);
  }, [initialTools]);
  
  // Filter tools when search or category changes
  useEffect(() => {
    let result = mathPages;
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(page => 
        page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        page.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        page.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (page.tags && page.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      );
    }
    
    // Filter by category
    if (selectedCategory) {
      result = result.filter(page => page.category === selectedCategory);
    }
    
    setFilteredPages(result);
  }, [searchTerm, selectedCategory, mathPages]);
  
  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
  };
  
  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };
  
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory(null);
  };
  
  if (initialTools.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-yellow-600 dark:text-yellow-400">No Math Tools Found</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            No math tools were found in the system. Please check that meta.json files exist in the appropriate directories.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Math Tools & Calculators</h1>
      <p className="text-lg mb-8 text-gray-600 dark:text-gray-300">
        Explore our collection of interactive mathematical tools and calculators
      </p>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar with categories */}
        <CategorySidebar 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
          searchTerm={searchTerm}
          onSearch={handleSearch}
          toolCount={toolCount}
        />
        
        {/* Main content */}
        <div className="flex-1">
          {/* Featured tools section */}
          <FeaturedTools 
            pages={filteredPages.filter(page => page.featured)} 
          />
          
          {/* All tools section */}
          <AllTools pages={filteredPages} />
          
          {filteredPages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No math tools found matching your criteria.</p>
              <button 
                onClick={clearFilters}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 