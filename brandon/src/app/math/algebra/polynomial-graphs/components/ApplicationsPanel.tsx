'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function ApplicationsPanel() {
  const applications = [
    {
      title: "Physics",
      description: "Modeling projectile motion, wave functions, and particle trajectories",
      examples: ["Trajectory paths", "Wave equations", "Orbital mechanics"]
    },
    {
      title: "Engineering",
      description: "Analyzing curves and optimizing designs",
      examples: ["Bridge design", "Signal processing", "Control systems"]
    },
    {
      title: "Data Science",
      description: "Fitting curves to data and trend analysis",
      examples: ["Regression analysis", "Growth modeling", "Pattern recognition"]
    }
  ];

  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-4">Applications of Polynomial Graphs</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Polynomial graphs are essential tools in various fields, helping us model and understand real-world phenomena.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {applications.map((app, index) => (
          <motion.div
            key={app.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
          >
            <h3 className="text-xl font-semibold mb-3">{app.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{app.description}</p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
              {app.examples.map((example) => (
                <li key={example}>{example}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}