'use client';

import React from 'react';
import { motion } from 'framer-motion';

const FactorialFormula: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h3>Factorial Definition</h3>
        <p>
          The factorial of a non-negative integer n, denoted by n!, is the product of all positive integers less than or equal to n.
        </p>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800 text-center"
      >
        <div className="text-2xl font-medium mb-4">
          n! = n × (n-1) × (n-2) × ... × 3 × 2 × 1
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
            <h4 className="font-medium mb-2 text-purple-700 dark:text-purple-300">Recursive Definition</h4>
            <div className="space-y-2">
              <p>n! = n × (n-1)!</p>
              <p>0! = 1 (by definition)</p>
            </div>
          </div>
          
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
            <h4 className="font-medium mb-2 text-purple-700 dark:text-purple-300">Iterative Definition</h4>
            <div className="space-y-2">
              <p>n! = 1 × 2 × 3 × ... × n</p>
              <p>0! = 1 (by definition)</p>
            </div>
          </div>
        </div>
      </motion.div>
      
      <div className="prose dark:prose-invert max-w-none">
        <h3>Mathematical Significance</h3>
        <p>
          Factorials play a crucial role in combinatorics, probability theory, and many areas of mathematics. 
          The factorial of n represents the number of ways to arrange n distinct objects in a sequence.
        </p>
        
        <h4>Stirling's Approximation</h4>
        <p>
          For large values of n, calculating the exact factorial becomes computationally intensive. 
          Stirling's approximation provides a good estimate:
        </p>
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
          <p className="text-lg">n! ≈ √(2πn)(n/e)ⁿ</p>
        </div>
        
        <h4>Gamma Function</h4>
        <p>
          The factorial function can be extended to non-integer values using the gamma function:
        </p>
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
          <p className="text-lg">n! = Γ(n+1)</p>
        </div>
      </div>
    </div>
  );
};

export default FactorialFormula;
