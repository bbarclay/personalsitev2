import React from 'react';
import Link from 'next/link';

interface AIToolHeaderProps {
  title: string;
  icon?: string;
  category: string;
  subcategory?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  description: string;
}

export function AIToolHeader({
  title,
  icon,
  category,
  subcategory,
  difficulty,
  description
}: AIToolHeaderProps) {
  return (
    <div className="mb-8">
      <div className="mb-6">
        <Link 
          href="/ai" 
          className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
        >
          ← Back to AI Tools
        </Link>
      </div>
      
      <div className="flex items-center mb-6">
        <span className="text-3xl mr-3">{icon || '🤖'}</span>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h1>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-6">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
          {category}
        </span>
        {subcategory && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
            {subcategory}
          </span>
        )}
        {difficulty && (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
            ${difficulty === 'beginner' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
              : difficulty === 'intermediate'
                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
            }`}
          >
            {difficulty}
          </span>
        )}
      </div>
      
      <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">
        {description}
      </p>
    </div>
  );
} 