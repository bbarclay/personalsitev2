import React from 'react';
import Link from 'next/link';
import { AIPageMeta } from '../types';

interface FeaturedToolsProps {
  tools: AIPageMeta[];
}

export function FeaturedTools({ tools }: FeaturedToolsProps) {
  const featuredTools = tools.filter(tool => tool.featured);
  
  if (featuredTools.length === 0) {
    return null;
  }
  
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Featured AI Tools</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredTools.map(tool => (
          <Link
            key={tool.id}
            href={`/ai${tool.path || `/${tool.id}`}`}
            className="block bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition hover:shadow-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{tool.icon || '🤖'}</span>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{tool.title}</h3>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                {tool.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                  {tool.category}
                </span>
                {tool.difficulty && (
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                    ${tool.difficulty === 'beginner' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                      : tool.difficulty === 'intermediate'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                    }`}
                  >
                    {tool.difficulty}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
} 