'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ExplanationPanelProps {
  explanation: string;
}

export default function ExplanationPanel({ explanation }: ExplanationPanelProps) {
  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-4">Understanding Polynomial Graphs</h2>
        <p className="text-gray-600 dark:text-gray-300">
          {explanation}
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
      >
        <h3 className="text-xl font-semibold mb-3">Key Concepts</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
          <li>Polynomial functions and their graphs</li>
          <li>Roots and x-intercepts</li>
          <li>End behavior and degree</li>
          <li>Turning points and extrema</li>
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
      >
        <h3 className="text-xl font-semibold mb-3">Important Features</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
          <li>Y-intercept: Where the graph crosses the y-axis</li>
          <li>X-intercepts: Where the graph crosses the x-axis (roots)</li>
          <li>Maximum and minimum points</li>
          <li>Symmetry and shape</li>
        </ul>
      </motion.div>
    </div>
  );
}