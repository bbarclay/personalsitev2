"use client";

import React from 'react';

interface ExplanationPanelProps {
  explanation?: string;
}

export default function ExplanationPanel({ explanation }: ExplanationPanelProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">How Area Calculations Work</h2>
      
      <div className="prose dark:prose-invert max-w-none">
        <p>{explanation || "Area is the space enclosed by a 2D shape, measured in square units."}</p>
        
        <h3>Basic Formulas</h3>
        <ul>
          <li><strong>Rectangle:</strong> Area = length × width</li>
          <li><strong>Square:</strong> Area = side<sup>2</sup></li>
          <li><strong>Triangle:</strong> Area = (1/2) × base × height</li>
          <li><strong>Circle:</strong> Area = π × radius<sup>2</sup></li>
          <li><strong>Parallelogram:</strong> Area = base × height</li>
          <li><strong>Trapezoid:</strong> Area = (1/2) × (sum of parallel sides) × height</li>
        </ul>
      </div>
    </div>
  );
} 