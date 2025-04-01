'use client';

import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ToolMeta } from '@/types/tool-types';

interface ToolHeaderProps {
  meta: ToolMeta;
}

export function ToolHeader({ meta }: ToolHeaderProps) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            {/* Current Tool */}
            <div className="flex items-center">
              <span className="text-xl mr-2">{meta.icon}</span>
              <span className="font-medium">{meta.title}</span>
            </div>

            {/* Category Link */}
            {meta.navigation?.category && meta.navigation.category.path && (
              <Link 
                href={meta.navigation.category.path}
                className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <span className="text-sm">{meta.navigation.category.title}</span>
              </Link>
            )}
          </div>

          {/* Next Tools Navigation */}
          {meta.navigation?.nextTools && meta.navigation.nextTools.length > 0 && (
            <div className="flex items-center space-x-4">
              {meta.navigation.nextTools
                .filter(tool => tool.path) // Filter out tools without paths
                .map((tool) => (
                <Link
                  key={tool.id}
                  href={tool.path}
                  className="flex items-center px-3 py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-gray-700/50 rounded-full transition-colors"
                >
                  <span className="text-lg mr-2">{tool.icon}</span>
                  <span>{tool.title}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 