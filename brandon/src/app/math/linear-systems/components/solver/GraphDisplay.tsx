import React from 'react';

interface GraphDisplayProps {
  system: string;
  solution: any;
  view: '2d' | '3d';
  currentStep: number;
  isAnimating: boolean;
}

export function GraphDisplay({ 
  system, 
  solution, 
  view, 
  currentStep, 
  isAnimating 
}: GraphDisplayProps) {
  return (
    <div className="w-full h-[400px] bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
      <p className="text-gray-500">Graph visualization coming soon...</p>
    </div>
  );
}