"use client";

import React from 'react';
import { Search } from 'lucide-react';

interface CategorySidebarProps {
  categories: string[];
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
  searchTerm: string;
  onSearch: (value: string) => void;
  toolCount?: Record<string, number>;
}

export function CategorySidebar({
  categories,
  selectedCategory,
  onCategorySelect,
  searchTerm,
  onSearch,
  toolCount = {}
}: CategorySidebarProps) {
  if (categories.length === 0) {
    return (
      <div className="w-full md:w-64 mb-6 md:mb-0">
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </div>
          <input
            type="search"
            className="block w-full p-2 pl-10 text-sm border rounded-lg bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 placeholder-gray-400 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search tools..."
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">Categories</h3>
          <p className="text-gray-500 dark:text-gray-400">No categories available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full md:w-64 mb-6 md:mb-0">
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </div>
        <input
          type="search"
          className="block w-full p-2 pl-10 text-sm border rounded-lg bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 placeholder-gray-400 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search tools..."
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">Categories</h3>
        
        <ul className="space-y-1">
          <li>
            <button
              onClick={() => onCategorySelect(null)}
              className={`w-full text-left px-3 py-2 rounded-md flex justify-between items-center ${
                selectedCategory === null 
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 font-medium' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              <span>All Categories</span>
              <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full px-2 py-0.5">
                {Object.values(toolCount).reduce((a, b) => a + b, 0) || categories.length}
              </span>
            </button>
          </li>
          
          {categories.map(category => (
            <li key={category}>
              <button
                onClick={() => onCategorySelect(category)}
                className={`w-full text-left px-3 py-2 rounded-md flex justify-between items-center ${
                  selectedCategory === category 
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 font-medium' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <span>{category}</span>
                <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full px-2 py-0.5">
                  {toolCount[category] || 0}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 