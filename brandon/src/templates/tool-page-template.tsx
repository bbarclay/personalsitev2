"use client";

import React, { ReactNode } from 'react';
import { ToolLayout } from '@/components/shared/ToolLayout';
import ToolLayoutTemplate from './tool-layout-template';

interface ToolPageTemplateProps {
  title: string;
  description: string;
  icon?: string;
  category?: string;
  subcategory?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  type?: 'math' | 'ai';
  children: ReactNode;
}

// Update this with your component import
// import { YourToolComponent } from './components/YourToolComponent';

export const ToolPageTemplate: React.FC<ToolPageTemplateProps> = ({
  title,
  description,
  icon = 'calculator',
  category = 'Mathematics',
  subcategory,
  difficulty,
  type = 'math',
  children
}) => {
  return (
    <ToolLayout
      title={title}
      icon={icon}
      category={category}
      subcategory={subcategory}
      difficulty={difficulty}
      description={description}
      type={type}
    >
      <div className="p-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">{title}</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {description}
          </p>
          {children}
        </div>
      </div>
    </ToolLayout>
  );
};