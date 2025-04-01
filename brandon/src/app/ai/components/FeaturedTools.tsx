import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AIPageMeta } from '../types';
import '../styles/clip-paths.css';

interface FeaturedToolsProps {
  tools: AIPageMeta[];
}

export function FeaturedTools({ tools }: FeaturedToolsProps) {
  const featuredTools = tools.filter(tool => tool.featured);
  
  if (featuredTools.length === 0) {
    return null;
  }

  const getShapeClass = (shape: string): string => {
    switch (shape) {
      case 'square':
        return 'w-12 h-12';
      case 'circle':
        return 'w-12 h-12 rounded-full';
      case 'triangle':
        return 'w-12 h-12 clip-path-triangle';
      case 'hexagon':
        return 'w-12 h-12 clip-path-hexagon';
      case 'parallelogram':
        return 'w-12 h-12 clip-path-parallelogram';
      default:
        return 'w-12 h-12';
    }
  };
  
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Featured AI Tools</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-1">
        {featuredTools.map((tool, index) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <Link
              href={`/ai${tool.path || `/${tool.id}`}`}
              className="block group"
            >
              <div className="relative p-4 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/20 dark:border-gray-700/20 hover:border-blue-300/50 dark:hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 dark:hover:shadow-blue-500/5">
                <div className="flex items-start gap-3">
                  <div className={`flex-shrink-0 ${getShapeClass(tool.shape || 'square')} flex items-center justify-center bg-gradient-to-br ${tool.color || 'from-blue-500 to-indigo-500'} text-white text-xl`}>
                    {tool.icon || '🤖'}
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                      {tool.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                        {tool.category}
                      </span>
                      {tool.difficulty && (
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium 
                          ${tool.difficulty === 'beginner' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' 
                            : tool.difficulty === 'intermediate'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'
                              : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
                          }`}
                        >
                          {tool.difficulty}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 