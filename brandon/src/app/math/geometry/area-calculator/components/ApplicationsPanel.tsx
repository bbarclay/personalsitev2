"use client";

import React from 'react';

export default function ApplicationsPanel() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Real-World Applications</h2>
      
      <div className="prose dark:prose-invert max-w-none">
        <h3>Practical Applications of Area Calculations</h3>
        <ul>
          <li>
            <strong>Architecture & Construction:</strong> Calculating flooring materials, paint needed for walls, 
            roof coverage, etc.
          </li>
          <li>
            <strong>Real Estate:</strong> Determining property size and value based on square footage.
          </li>
          <li>
            <strong>Agriculture:</strong> Planning crop fields and irrigation coverage.
          </li>
          <li>
            <strong>Interior Design:</strong> Planning furniture layout and room usage.
          </li>
          <li>
            <strong>Manufacturing:</strong> Calculating material requirements for production.
          </li>
          <li>
            <strong>Urban Planning:</strong> Designing parks, parking lots, and public spaces.
          </li>
        </ul>
      </div>
    </div>
  );
} 