"use client";

import React from 'react';
import Link from 'next/link';

export default function ResourcesPanel() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Additional Resources</h2>
      
      <div className="prose dark:prose-invert max-w-none">
        <h3>Learning Resources</h3>
        <ul>
          <li>
            <a 
              href="https://www.mathsisfun.com/area.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Math Is Fun: Area
            </a> - Simple explanations of area concepts
          </li>
          <li>
            <a 
              href="https://www.khanacademy.org/math/basic-geo/basic-geo-area-and-perimeter" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Khan Academy: Area and Perimeter
            </a> - Free video lessons and practice problems
          </li>
          <li>
            <a 
              href="https://www.geogebra.org/m/ag5dfbau" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              GeoGebra: Interactive Area Demonstrations
            </a> - Visual interactive demos
          </li>
        </ul>
        
        <h3>Related Tools</h3>
        <ul>
          <li>
            <Link href="/math/geometry/perimeter-calculator" className="text-blue-600 dark:text-blue-400 hover:underline">
              Perimeter Calculator
            </Link> - Calculate the perimeter of 2D shapes
          </li>
          <li>
            <Link href="/math/geometry/volume-calculator" className="text-blue-600 dark:text-blue-400 hover:underline">
              Volume Calculator
            </Link> - Calculate the volume of 3D objects
          </li>
        </ul>
      </div>
    </div>
  );
} 