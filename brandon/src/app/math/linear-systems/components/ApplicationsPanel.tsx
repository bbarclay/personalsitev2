'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const ApplicationCard = ({ title, description, icon, color, delay = 0 }) => {
  return (
    <motion.div
      className={`rounded-xl bg-white dark:bg-gray-800 shadow-md overflow-hidden border-l-4 ${color}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color.replace('border-', 'bg-')}`}>
            {icon}
          </div>
          <h3 className="ml-3 text-xl font-semibold">{title}</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </motion.div>
  );
};

const Example = ({ title, system, solution, explanation, isOpen, toggle }) => {
  return (
    <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div 
        className="p-4 flex justify-between items-center cursor-pointer"
        onClick={toggle}
      >
        <h3 className="text-lg font-medium">{title}</h3>
        <svg 
          className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      
      {isOpen && (
        <motion.div 
          className="p-4 pt-0 border-t border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">System of Equations:</h4>
              <div className="bg-gray-100 dark:bg-gray-900 p-3 rounded">
                {system.map((eq, idx) => (
                  <div key={idx} className="font-mono">{eq}</div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Solution:</h4>
              <div className="bg-gray-100 dark:bg-gray-900 p-3 rounded">
                {solution.map((sol, idx) => (
                  <div key={idx} className="font-mono">{sol}</div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="font-medium mb-2">Explanation:</h4>
            <p className="text-gray-600 dark:text-gray-300">{explanation}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default function ApplicationsPanel() {
  const [openExample, setOpenExample] = useState(null);
  
  const toggleExample = (index) => {
    setOpenExample(openExample === index ? null : index);
  };
  
  const examples = [
    {
      title: "Network Flow Analysis",
      system: [
        "x₁ - x₂ + x₃ = 100  (Flow conservation at node 1)",
        "x₂ - x₃ - x₄ = 0    (Flow conservation at node 2)",
        "x₄ - x₁ = -100      (Flow conservation at node 3)"
      ],
      solution: [
        "x₁ = 100",
        "x₂ = 60",
        "x₃ = 40",
        "x₄ = 20"
      ],
      explanation: "This system represents a flow network where each equation describes the conservation of flow at a node (inputs equal outputs). The solution gives the optimal flow values for each edge that satisfy all constraints."
    },
    {
      title: "Economic Equilibrium Model",
      system: [
        "4x + 2y = 100  (Production constraint)",
        "x + y = 40     (Resource limitation)"
      ],
      solution: [
        "x = 20",
        "y = 20"
      ],
      explanation: "This system models a simple economy with production constraints and resource limitations. The solution represents the equilibrium point that optimally allocates resources while satisfying all economic constraints."
    },
    {
      title: "Computer Graphics Transformation",
      system: [
        "a₁x + b₁y + c₁ = x'  (x-coordinate transformation)",
        "a₂x + b₂y + c₂ = y'  (y-coordinate transformation)"
      ],
      solution: [
        "a₁ = cos(θ), b₁ = -sin(θ), c₁ = tx",
        "a₂ = sin(θ), b₂ = cos(θ), c₂ = ty"
      ],
      explanation: "This system represents a 2D affine transformation matrix used in computer graphics. Solving for the coefficients allows us to determine the rotation angle θ and translation vector (tx, ty) that maps points from one coordinate system to another."
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      <motion.div 
        className="prose dark:prose-invert max-w-none"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Applications of Linear Systems</h2>
        <p className="lead">
          Linear systems of equations are fundamental to countless real-world applications across diverse fields.
          They provide powerful mathematical models for solving complex problems in science, engineering, economics, and beyond.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <ApplicationCard
          title="Engineering & Physics"
          description="From structural analysis and circuit design to fluid dynamics and mechanical systems, linear equations model physical phenomena with precision."
          icon={<svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>}
          color="border-blue-500"
          delay={0.1}
        />
        
        <ApplicationCard
          title="Economics & Finance"
          description="Model market equilibria, optimize portfolios, analyze input-output systems, and forecast economic trends with systems of linear equations."
          icon={<svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          color="border-green-500"
          delay={0.2}
        />
        
        <ApplicationCard
          title="Computer Graphics"
          description="Transform coordinates, render 3D objects, simulate lighting, and create animations using matrix operations derived from linear systems."
          icon={<svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
          color="border-purple-500"
          delay={0.3}
        />
        
        <ApplicationCard
          title="Optimization"
          description="Solve complex optimization problems in resource allocation, transportation networks, and scheduling through linear programming techniques."
          icon={<svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
          color="border-yellow-500"
          delay={0.4}
        />
        
        <ApplicationCard
          title="Data Science & ML"
          description="Perform regression analysis, dimensionality reduction, and feature transformation using systems of linear equations."
          icon={<svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
          color="border-red-500"
          delay={0.5}
        />
        
        <ApplicationCard
          title="Control Systems"
          description="Design and analyze feedback control systems for robotics, autonomous vehicles, and industrial automation."
          icon={<svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
          color="border-indigo-500"
          delay={0.6}
        />
      </div>

      <motion.div 
        className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <h2 className="text-2xl font-bold mb-4">Real-World Examples</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Explore how systems of linear equations are applied to solve practical problems across different domains.
          Click on each example to see the detailed mathematical model and solution.
        </p>
        
        {examples.map((example, index) => (
          <Example
            key={index}
            {...example}
            isOpen={openExample === index}
            toggle={() => toggleExample(index)}
          />
        ))}
      </motion.div>
      
      <motion.div 
        className="mt-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <h3 className="text-xl font-semibold mb-4">Ready to explore more applications?</h3>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/math/linear-systems?tab=solver" className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
            Try the Solver
          </Link>
          <Link href="/math/linear-systems?tab=visualizer" className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 text-base font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
            Visualize Linear Systems
          </Link>
        </div>
      </motion.div>
    </div>
  );
} 