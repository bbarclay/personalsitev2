import React from 'react';
import { motion } from 'framer-motion';

export const InfoPanel = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-lg shadow-lg mb-6"
    >
      <div className="max-w-3xl mx-auto space-y-6">
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
            Welcome to p-adic Numbers
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Discover a fascinating alternative way of measuring distance in numbers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm"
          >
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-blue-600 dark:text-blue-400">
              <span className="text-2xl">🔢</span>
              New Number System
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              p-adic numbers offer a completely different way to think about
              numbers and distance, leading to surprising insights in mathematics.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm"
          >
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-green-600 dark:text-green-400">
              <span className="text-2xl">🌳</span>
              Tree Structure
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Visualize numbers as infinite paths in a tree, where each branch
              represents a digit choice in our base-p expansion.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm"
          >
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-purple-600 dark:text-purple-400">
              <span className="text-2xl">🎯</span>
              Interactive Learning
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Play with our interactive tools to understand p-adic expansions,
              calculate norms, and visualize these unique numbers.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm"
          >
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-red-600 dark:text-red-400">
              <span className="text-2xl">🔍</span>
              Real Applications
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Discover how p-adic numbers are used in modern mathematics,
              from number theory to quantum physics and cryptography.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Choose a tab below to start exploring the fascinating world of p-adic numbers.
            Each section offers interactive demonstrations and hands-on learning opportunities.
          </p>
          <div className="mt-4 flex justify-center gap-2">
            {['2-adic', '3-adic', '5-adic', '7-adic'].map((p) => (
              <motion.span
                key={p}
                whileHover={{ scale: 1.1 }}
                className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 
                          text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
              >
                {p}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
