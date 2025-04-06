'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

const applications = [
  {
    id: "combinatorics",
    title: "Combinatorics & Probability",
    icon: "🎲",
    color: "bg-purple-500",
    lightColor: "bg-purple-100",
    description: "Factorials are fundamental in calculating permutations and combinations.",
    examples: [
      {
        title: "Permutations",
        description: "The number of ways to arrange n distinct objects is n!",
        formula: "P(n) = n!"
      },
      {
        title: "Combinations",
        description: "The number of ways to select k objects from n distinct objects.",
        formula: "C(n,k) = n! / (k! × (n-k)!)"
      },
      {
        title: "Probability Distributions",
        description: "Factorials appear in many probability distributions like binomial and Poisson.",
        formula: "P(X = k) = (n choose k) × pᵏ × (1-p)ⁿ⁻ᵏ"
      }
    ]
  },
  {
    id: "computer-science",
    title: "Computer Science & Algorithms",
    icon: "💻",
    color: "bg-blue-500",
    lightColor: "bg-blue-100",
    description: "Factorials are used in algorithm analysis and computational problems.",
    examples: [
      {
        title: "Time Complexity",
        description: "Factorial time complexity O(n!) appears in certain algorithms like brute force solutions to the Traveling Salesman Problem.",
        formula: "O(n!)"
      },
      {
        title: "Recursive Algorithms",
        description: "Factorial calculation is a classic example of recursive programming.",
        formula: "fact(n) = n × fact(n-1)"
      },
      {
        title: "Dynamic Programming",
        description: "Factorial-based problems are often solved efficiently using dynamic programming techniques.",
        formula: "DP[i] = i × DP[i-1]"
      }
    ]
  },
  {
    id: "physics",
    title: "Physics & Engineering",
    icon: "⚛️",
    color: "bg-green-500",
    lightColor: "bg-green-100",
    description: "Factorials appear in various physics formulas and engineering applications.",
    examples: [
      {
        title: "Statistical Mechanics",
        description: "Factorials are used in calculating the number of microstates in a system.",
        formula: "W = N! / (n₁! × n₂! × ... × nᵢ!)"
      },
      {
        title: "Quantum Mechanics",
        description: "Factorials appear in solutions to the Schrödinger equation and quantum statistics.",
        formula: "Various quantum state calculations"
      },
      {
        title: "Signal Processing",
        description: "Taylor series expansions of signals often involve factorials.",
        formula: "f(x) = Σ (f⁽ⁿ⁾(a)/n!) × (x-a)ⁿ"
      }
    ]
  }
];

const ApplicationsPanel: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert max-w-none">
        <h2>Applications of Factorials</h2>
        <p>
          Factorials are fundamental mathematical operations with wide-ranging applications across various fields.
          Here are some of the most important uses of factorials in different domains:
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {applications.map((app, index) => (
          <motion.div
            key={app.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-full ${app.color} flex items-center justify-center text-white text-xl`}>
                    {app.icon}
                  </div>
                  <h3 className="text-lg font-semibold">{app.title}</h3>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {app.description}
                </p>
                
                <div className="space-y-3">
                  {app.examples.map((example, i) => (
                    <div 
                      key={i}
                      className={`p-3 rounded-lg ${app.lightColor} dark:bg-opacity-20`}
                    >
                      <h4 className="font-medium text-sm mb-1">{example.title}</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
                        {example.description}
                      </p>
                      <div className="text-sm font-mono bg-white dark:bg-gray-800 p-2 rounded">
                        {example.formula}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800">
        <div className="flex items-center gap-3 text-purple-700 dark:text-purple-300">
          <div className="text-xl">💡</div>
          <div className="font-medium">Did you know?</div>
        </div>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          The factorial function grows so quickly that 70! already has more than 100 digits, and 
          170! is approximately the largest factorial that can be calculated exactly with standard 
          JavaScript Number precision.
        </p>
      </div>
    </div>
  );
};

export default ApplicationsPanel;
