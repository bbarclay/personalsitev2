import React, { useState } from 'react';

export default function GrapherPanel() {
  const [polynomial, setPolynomial] = useState('x^2 + 2x + 1');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Polynomial Grapher
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Enter a polynomial function to visualize its graph
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Enter Polynomial Function
          </label>
          <input
            type="text"
            value={polynomial}
            onChange={(e) => setPolynomial(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="e.g., x^2 + 2x + 1"
          />
        </div>

        <div className="h-[400px] bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">
            Graph visualization coming soon!
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Plot Graph
          </button>
          <button className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}