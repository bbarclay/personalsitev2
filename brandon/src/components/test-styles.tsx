"use client";

import React from "react";

export function TestStyles() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400">
        Tailwind CSS Style Test
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Colors */}
        <div className="p-4 border rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Colors</h3>
          <div className="flex flex-wrap gap-2">
            <div className="w-12 h-12 bg-red-500 rounded"></div>
            <div className="w-12 h-12 bg-blue-500 rounded"></div>
            <div className="w-12 h-12 bg-green-500 rounded"></div>
            <div className="w-12 h-12 bg-yellow-500 rounded"></div>
            <div className="w-12 h-12 bg-purple-500 rounded"></div>
            <div className="w-12 h-12 bg-pink-500 rounded"></div>
          </div>
        </div>
        
        {/* Typography */}
        <div className="p-4 border rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Typography</h3>
          <p className="text-sm text-gray-600 mb-2">Small text</p>
          <p className="text-base text-gray-700 mb-2">Base text</p>
          <p className="text-lg text-gray-800 mb-2">Large text</p>
          <p className="text-xl font-bold text-gray-900">Extra large text</p>
        </div>
        
        {/* Spacing */}
        <div className="p-4 border rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Spacing</h3>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 w-full"></div>
            <div className="h-4 bg-gray-300 w-3/4"></div>
            <div className="h-4 bg-gray-400 w-1/2"></div>
            <div className="h-4 bg-gray-500 w-1/4"></div>
          </div>
        </div>
        
        {/* Flexbox */}
        <div className="p-4 border rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Flexbox</h3>
          <div className="flex justify-between items-center p-2 bg-gray-100 rounded">
            <div className="w-10 h-10 bg-blue-500 rounded-full"></div>
            <div className="w-10 h-10 bg-green-500 rounded-full"></div>
            <div className="w-10 h-10 bg-red-500 rounded-full"></div>
          </div>
        </div>
      </div>
      
      {/* Buttons */}
      <div className="p-4 border rounded-lg shadow-sm mb-6">
        <h3 className="text-xl font-semibold mb-4">Buttons</h3>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Primary
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition">
            Secondary
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
            Success
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
            Danger
          </button>
        </div>
      </div>
      
      {/* Dark mode test */}
      <div className="p-4 border dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Dark Mode Test
        </h3>
        <p className="text-gray-700 dark:text-gray-300">
          This section should change colors based on the current theme.
        </p>
      </div>
    </div>
  );
} 