import React from 'react';
import Link from 'next/link';
import { AIPageMeta } from '../types';

interface AllToolsProps {
  pages: AIPageMeta[];
}

export function AllTools({ pages }: AllToolsProps) {
  if (pages.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center">
        <p className="text-gray-500 dark:text-gray-400">No AI tools available.</p>
      </div>
    );
  }
  
  // Organize tools by category
  const categories = pages.reduce<Record<string, AIPageMeta[]>>((acc, page) => {
    if (!acc[page.category]) {
      acc[page.category] = [];
    }
    acc[page.category].push(page);
    return acc;
  }, {});
  
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">All AI Tools</h2>
      
      {Object.entries(categories).map(([category, categoryPages]) => (
        <div key={category} className="mb-8">
          <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{category}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryPages.map(page => (
              <Link 
                key={page.id}
                href={`/ai${page.path || `/${page.id}`}`}
                className="block p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg transition hover:shadow-md hover:border-blue-300 dark:hover:border-blue-500"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{page.icon || '🤖'}</span>
                  <h4 className="font-medium text-gray-900 dark:text-white">{page.title}</h4>
                </div>
                {page.subcategory && (
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                      {page.subcategory}
                    </span>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
} 