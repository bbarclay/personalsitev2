'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function ApplicationsPanel() {
  const applications = [
    {
      title: "Physics and Motion",
      description: "Understanding projectile motion, wave functions, and particle trajectories through polynomial equations.",
      icon: "🚀",
      examples: [
        "Trajectory of a thrown ball",
        "Sound wave modeling",
        "Particle acceleration"
      ]
    },
    {
      title: "Engineering Design",
      description: "Optimizing shapes and structures using polynomial functions to model curves and surfaces.",
      icon: "🏗️",
      examples: [
        "Bridge arch design",
        "Aerodynamic profiles",
        "Structural stress analysis"
      ]
    },
    {
      title: "Computer Graphics",
      description: "Creating smooth curves and surfaces for computer-aided design and animation.",
      icon: "🎮",
      examples: [
        "Bezier curves",
        "3D surface modeling",
        "Animation paths"
      ]
    },
    {
      title: "Economics",
      description: "Modeling supply/demand curves and optimizing profit functions.",
      icon: "📈",
      examples: [
        "Cost optimization",
        "Market equilibrium",
        "Growth predictions"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2>Applications of Polynomials</h2>
        <p>Polynomials have applications in various fields:</p>
        <ul>
          <li>Signal Processing</li>
          <li>Control Systems</li>
          <li>Computer Graphics</li>
          <li>Cryptography</li>
        </ul>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {applications.map((app, index) => (
          <motion.div
            key={app.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
          >
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">{app.icon}</span>
              <h3 className="text-xl font-semibold">{app.title}</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {app.description}
            </p>
            <div className="space-y-2">
              <h4 className="font-medium text-gray-700 dark:text-gray-200">Examples:</h4>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                {app.examples.map((example) => (
                  <li key={example}>{example}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-lg p-6 shadow-sm"
      >
        <h3 className="text-xl font-semibold mb-3">Want to Learn More?</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Check out our Resources section for detailed case studies and tutorials on applying polynomial factorization in these fields.
        </p>
      </motion.div>
    </div>
  );
}
