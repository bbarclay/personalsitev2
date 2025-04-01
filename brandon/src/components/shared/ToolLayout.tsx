"use client";

import React, { ReactNode } from 'react';
import { ToolHeader } from './ToolHeader';
import { ThemeProvider } from '@/components/theme-provider';

interface ToolLayoutProps {
  children: ReactNode;
  title: string;
  icon: string;
  category: string;
  subcategory?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  type: 'math' | 'ai';
}

export function ToolLayout({
  children,
  title,
  icon,
  category,
  subcategory,
  difficulty,
  description,
  type
}: ToolLayoutProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="container mx-auto px-4 py-8">
        <ToolHeader 
          title={title}
          icon={icon}
          category={category}
          subcategory={subcategory}
          difficulty={difficulty}
          description={description}
          type={type}
        />
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          {children}
        </div>
      </div>
    </ThemeProvider>
  );
} 