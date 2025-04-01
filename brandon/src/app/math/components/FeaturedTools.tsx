"use client";

import React from 'react';
import Link from 'next/link';
import { MathPageMeta } from '../types';

interface FeaturedToolsProps {
  pages: MathPageMeta[];
}

export function FeaturedTools({ pages }: FeaturedToolsProps) {
  if (pages.length === 0) {
    return null;
  }
  
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Featured Tools</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pages.map(page => (
          <Link 
            key={page.id}
            href={`/math${page.path || `/${page.id}`}`}
            className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-all"
          >
            <div className="flex items-center">
              <div className="mr-4 text-primary-600 dark:text-primary-400">
                {page.icon || '📐'}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{page.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{page.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}