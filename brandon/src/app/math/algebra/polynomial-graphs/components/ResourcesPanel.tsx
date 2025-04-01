'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ResourcesPanel() {
  const resources = [
    {
      category: "Video Tutorials",
      icon: "🎥",
      items: [
        {
          title: "Introduction to Polynomial Graphs",
          duration: "15 mins",
          difficulty: "Beginner"
        },
        {
          title: "Advanced Graph Analysis",
          duration: "25 mins",
          difficulty: "Intermediate"
        },
        {
          title: "Real-world Applications",
          duration: "20 mins",
          difficulty: "Advanced"
        }
      ]
    },
    {
      category: "Interactive Tools",
      icon: "🔧",
      items: [
        {
          title: "Graph Explorer",
          type: "Interactive Tool",
          difficulty: "All Levels"
        },
        {
          title: "Root Finder",
          type: "Interactive Tool",
          difficulty: "Intermediate"
        },
        {
          title: "3D Visualization",
          type: "Interactive Tool",
          difficulty: "Advanced"
        }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-4">Learning Resources</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Explore these resources to master polynomial graphing concepts.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {resources.map((section, index) => (
          <motion.div
            key={section.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
          >
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">{section.icon}</span>
              <h3 className="text-xl font-semibold">{section.category}</h3>
            </div>
            
            <div className="space-y-4">
              {section.items.map((item) => (
                <div
                  key={item.title}
                  className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                >
                  <h4 className="font-medium text-gray-700 dark:text-gray-200 mb-2">
                    {item.title}
                  </h4>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {'duration' in item && `Duration: ${item.duration}`}
                    {'type' in item && `Type: ${item.type}`}
                    {' • '}
                    Level: {item.difficulty}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
      >
        <h3 className="text-xl font-semibold mb-3">Related Tools</h3>
        <ul className="space-y-2">
          <li>
            <Link 
              href="/math/polynomial" 
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Polynomial Calculator
            </Link>
            {' '}- Solve polynomial equations
          </li>
          <li>
            <Link 
              href="/math/quadratic-solver" 
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Quadratic Solver
            </Link>
            {' '}- Solve quadratic equations
          </li>
        </ul>
      </motion.div>
    </div>
  );
}