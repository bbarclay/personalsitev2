'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ToolMeta } from '@/types/tool-types';

interface ToolOverviewProps {
  meta: ToolMeta;
}

export function ToolOverview({ meta }: ToolOverviewProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Overview
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
            {meta.description}
          </p>
        </div>
        <Badge 
          className={cn(
            "bg-gradient-to-r text-white",
            meta.type === 'math' ? "from-blue-500 to-purple-500" : "from-orange-500 to-pink-500"
          )}
        >
          {meta.difficulty === 'beginner' && '🌱 Beginner'}
          {meta.difficulty === 'intermediate' && '🚀 Intermediate'}
          {meta.difficulty === 'advanced' && '🔥 Advanced'}
        </Badge>
      </div>
    </div>
  );
} 