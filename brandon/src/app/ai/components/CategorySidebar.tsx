import React from 'react';
// import { AIPageMeta } from '../types';

interface CategorySidebarProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  toolCount: Record<string, number>;
}

export function CategorySidebar({ 
  categories, 
  activeCategory, 
  setActiveCategory,
  toolCount
}: CategorySidebarProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Categories</h2>
      
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category}>
            <button
              onClick={() => setActiveCategory(category)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition flex justify-between items-center
                ${activeCategory === category 
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' 
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50'
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
  );
}
