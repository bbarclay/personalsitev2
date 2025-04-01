'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ExplanationPanelProps {
  explanation: string;
}

export default function ExplanationPanel({ explanation }: ExplanationPanelProps) {
  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2>Understanding Polynomials</h2>
        <p>{explanation}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Basic Concepts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
        >
          <h3 className="text-xl font-semibold mb-3">Basic Concepts</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
            <li>What is a polynomial?</li>
            <li>Terms and coefficients</li>
            <li>Degree of polynomials</li>
            <li>Standard form</li>
          </ul>
        </motion.div>

        {/* Common Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
        >
          <h3 className="text-xl font-semibold mb-3">Common Methods</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
            <li>Factor by grouping</li>
            <li>Finding common factors</li>
            <li>Difference of squares</li>
            <li>Perfect square trinomials</li>
          </ul>
        </motion.div>

        {/* Step by Step Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
        >
          <h3 className="text-xl font-semibold mb-3">Step by Step Process</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
            <li>Identify the type of polynomial</li>
            <li>Look for common factors</li>
            <li>Apply special patterns</li>
            <li>Verify your answer</li>
          </ul>
        </motion.div>

        {/* Tips and Tricks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
        >
          <h3 className="text-xl font-semibold mb-3">Tips and Tricks</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
            <li>Pattern recognition</li>
            <li>Common mistakes to avoid</li>
            <li>Checking your work</li>
            <li>Practice strategies</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
