'use client';

import React from 'react';
import { AIToolHeader } from '@/components/ai-shared/AIToolHeader';
import type { AIPageMeta } from '@/app/ai/types';

interface AIToolWrapperProps {
  meta: AIPageMeta;
  children: React.ReactNode;
}

export function AIToolWrapper({ meta, children }: AIToolWrapperProps) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <AIToolHeader
        title={meta.title}
        icon={meta.icon}
        category={meta.category}
        subcategory={meta.subcategory}
        difficulty={meta.difficulty}
        description={meta.description}
      />
      
      <div className="mt-8">
        {children}
      </div>
    </div>
  );
}
