"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Application categories with examples
const applications = [
  {
    id: "construction",
    title: "Construction and Architecture",
    icon: "🏗️",
    color: "bg-amber-500",
    lightColor: "bg-amber-100",
    description: "The Pythagorean theorem is essential for ensuring right angles in buildings, creating stable structures, and calculating dimensions.",
    examples: [
      {
        title: "Roof Design",
        description: "Calculate the length of rafters in roof construction by treating them as the hypotenuse of a right triangle formed with the height and half the width of the building.",
        formula: "Rafter Length = √(Height² + (Width/2)²)"
      },
      {
        title: "Square Layout",
        description: "To ensure corners are exactly 90°, builders use the 3-4-5 triangle method, measuring 3 units along one wall, 4 along the other, and checking that the diagonal is 5 units.",
        formula: "3² + 4² = 5²"
      }
    ]
  },
  {
    id: "navigation",
    title: "Navigation and Surveying",
    icon: "🧭",
    color: "bg-blue-500",
    lightColor: "bg-blue-100",
    description: "Used to calculate distances, determine positions, and navigate efficiently in both traditional and modern navigation systems.",
    examples: [
      {
        title: "Shortest Path",
        description: "Calculate the direct distance between two points on a map using the coordinates as legs of a right triangle, with the hypotenuse being the direct distance.",
        formula: "Distance = √((x₂-x₁)² + (y₂-y₁)²)"
      },
      {
        title: "GPS Positioning",
        description: "Modern GPS systems use multilateration, which involves measuring distances from multiple satellites and applying the Pythagorean theorem in 3D space.",
        formula: "d = √((x₂-x₁)² + (y₂-y₁)² + (z₂-z₁)²)"
      }
    ]
  },
  {
    id: "engineering",
    title: "Engineering and Design",
    icon: "⚙️",
    color: "bg-green-500",
    lightColor: "bg-green-100",
    description: "Engineers apply the theorem for structural analysis, mechanical design, electrical systems, and more.",
    examples: [
      {
        title: "Bridge Design",
        description: "Calculate the forces in truss bridges by analyzing triangular components and determining the forces in each member.",
        formula: "Force in diagonal member = √(Horizontal² + Vertical²)"
      },
      {
        title: "Signal Processing",
        description: "Used in the Fourier transform to break down complex signals into component sine waves, fundamental to audio processing and communications.",
        formula: "Signal power = √(I² + Q²)"
      }
    ]
  },
  {
    id: "technology",
    title: "Modern Technology",
    icon: "📱",
    color: "bg-purple-500",
    lightColor: "bg-purple-100",
    description: "The theorem finds applications in computer graphics, display technologies, and digital imaging.",
    examples: [
      {
        title: "Screen Resolution",
        description: "Calculate the diagonal size of displays using width and height measurements in pixels or inches.",
        formula: "Diagonal = √(Width² + Height²)"
      },
      {
        title: "3D Graphics",
        description: "Used to calculate distances between points in 3D space for rendering graphics, collision detection, and camera positioning.",
        formula: "Distance = √((x₂-x₁)² + (y₂-y₁)² + (z₂-z₁)²)"
      }
    ]
  }
];

export default function ApplicationsPanel() {
  const [selectedCategory, setSelectedCategory] = useState(applications[0]);
  const [selectedExample, setSelectedExample] = useState(applications[0].examples[0]);
  
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedExample(category.examples[0]);
  };

  return (
    <div className="space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
          Real-World Applications
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          The Pythagorean theorem is not just a mathematical curiosity—it's a powerful tool with countless practical applications across various fields.
        </p>
        
        {/* Category selection tabs */}
        <div className="flex flex-wrap gap-3 my-6">
          {applications.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-3 rounded-lg flex items-center space-x-2 transition-all ${
                selectedCategory.id === category.id
                  ? `${category.color} text-white shadow-lg`
                  : `${category.lightColor} text-gray-800 dark:text-gray-200 hover:shadow-md`
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <span className="text-2xl">{category.icon}</span>
              <span className="hidden sm:inline font-medium">{category.title}</span>
              {selectedCategory.id === category.id && (
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-1 bg-white bg-opacity-50 mx-2 rounded-full"
                  layoutId="underline"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>
        
        {/* Selected category content */}
        <motion.div
          key={selectedCategory.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="my-6"
        >
          <motion.div 
            className={`p-5 rounded-lg border-l-4 ${selectedCategory.color} bg-opacity-10 bg-gray-50 dark:bg-gray-700`}
            initial={{ x: -10, opacity: 0.8 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">{selectedCategory.icon}</span>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                {selectedCategory.title}
              </h3>
            </div>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              {selectedCategory.description}
            </p>
          </motion.div>
          
          {/* Examples selection */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedCategory.examples.map((example, index) => (
              <motion.div
                key={index}
                onClick={() => setSelectedExample(example)}
                className={`p-4 rounded-lg cursor-pointer transition-all relative ${
                  selectedExample.title === example.title
                    ? `${selectedCategory.lightColor} border-2 border-${selectedCategory.color.replace('bg-', '')} shadow-md`
                    : 'bg-gray-50 dark:bg-gray-700 hover:shadow border-2 border-transparent'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <h4 className="font-medium text-gray-800 dark:text-white flex items-center">
                  {selectedExample.title === example.title && (
                    <svg className="h-4 w-4 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                  {example.title}
                </h4>
                {selectedExample.title === example.title && (
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Click for details
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          
          {/* Selected example details */}
          <motion.div
            key={selectedExample.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-6 p-5 bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-800"
          >
            <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-3 flex items-center">
              <span className={`inline-block w-3 h-3 rounded-full ${selectedCategory.color} mr-2`}></span>
              {selectedExample.title}
            </h4>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {selectedExample.description}
            </p>
            
            <div className="flex justify-center">
              <div className="bg-gray-50 dark:bg-gray-800 px-5 py-3 rounded-md shadow-inner">
                <span className="text-lg font-math text-gray-800 dark:text-gray-200">
                  {selectedExample.formula}
                </span>
              </div>
            </div>
            
            {/* Interactive visualization of the selected example */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-6 bg-gray-100 dark:bg-gray-800 rounded-lg p-4 min-h-[200px] flex items-center justify-center relative overflow-hidden"
            >
              <svg className="w-full h-40" viewBox="0 0 300 150">
                {selectedExample.title === "Roof Design" && (
                  <>
                    <line x1="50" y1="100" x2="250" y2="100" stroke="#666" strokeWidth="3" />
                    <line x1="50" y1="100" x2="150" y2="30" stroke="#666" strokeWidth="3" />
                    <line x1="250" y1="100" x2="150" y2="30" stroke="#666" strokeWidth="3" />
                    <line x1="150" y1="30" x2="150" y2="100" stroke="#666" strokeDasharray="5,5" />
                    <text x="140" y="120" fontSize="12" fill="#666">Width</text>
                    <text x="155" y="65" fontSize="12" fill="#666">Height</text>
                    <text x="90" y="50" fontSize="12" fill="#666">Rafter</text>
                  </>
                )}
                
                {selectedExample.title === "Square Layout" && (
                  <>
                    <line x1="50" y1="100" x2="110" y2="100" stroke="#666" strokeWidth="3" />
                    <line x1="50" y1="100" x2="50" y2="40" stroke="#666" strokeWidth="3" />
                    <line x1="50" y1="40" x2="110" y2="40" stroke="#666" strokeWidth="3" />
                    <line x1="110" y1="40" x2="110" y2="100" stroke="#666" strokeWidth="3" />
                    <line x1="50" y1="100" x2="110" y2="40" stroke="#f00" strokeDasharray="5,5" />
                    <text x="75" y="115" fontSize="12" fill="#666">3 units</text>
                    <text x="25" y="70" fontSize="12" fill="#666">4 units</text>
                    <text x="70" y="75" fontSize="12" fill="#f00">5 units</text>
                  </>
                )}
                
                {selectedExample.title === "Shortest Path" && (
                  <>
                    <circle cx="50" cy="100" r="5" fill="#3b82f6" />
                    <circle cx="200" cy="40" r="5" fill="#3b82f6" />
                    <line x1="50" y1="100" x2="200" y2="100" stroke="#666" strokeDasharray="5,5" />
                    <line x1="200" y1="100" x2="200" y2="40" stroke="#666" strokeDasharray="5,5" />
                    <line x1="50" y1="100" x2="200" y2="40" stroke="#f00" strokeWidth="2" />
                    <text x="30" y="110" fontSize="12" fill="#666">(x₁,y₁)</text>
                    <text x="210" y="40" fontSize="12" fill="#666">(x₂,y₂)</text>
                    <text x="110" y="80" fontSize="12" fill="#f00">Distance</text>
                  </>
                )}
                
                {selectedExample.title === "GPS Positioning" && (
                  <>
                    <circle cx="50" cy="70" r="15" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" />
                    <circle cx="150" cy="40" r="15" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" />
                    <circle cx="220" cy="70" r="15" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" />
                    <circle cx="140" cy="100" r="5" fill="#000" />
                    <line x1="50" y1="70" x2="140" y2="100" stroke="#ef4444" strokeDasharray="5,5" />
                    <line x1="150" y1="40" x2="140" y2="100" stroke="#3b82f6" strokeDasharray="5,5" />
                    <line x1="220" y1="70" x2="140" y2="100" stroke="#10b981" strokeDasharray="5,5" />
                    <text x="130" y="115" fontSize="12" fill="#666">Position</text>
                  </>
                )}
                
                {selectedExample.title === "Bridge Design" && (
                  <>
                    <line x1="30" y1="100" x2="270" y2="100" stroke="#666" strokeWidth="3" />
                    <line x1="50" y1="100" x2="50" y2="60" stroke="#666" strokeWidth="3" />
                    <line x1="100" y1="100" x2="100" y2="60" stroke="#666" strokeWidth="3" />
                    <line x1="150" y1="100" x2="150" y2="60" stroke="#666" strokeWidth="3" />
                    <line x1="200" y1="100" x2="200" y2="60" stroke="#666" strokeWidth="3" />
                    <line x1="250" y1="100" x2="250" y2="60" stroke="#666" strokeWidth="3" />
                    <line x1="50" y1="60" x2="100" y2="60" stroke="#666" strokeWidth="3" />
                    <line x1="100" y1="60" x2="150" y2="60" stroke="#666" strokeWidth="3" />
                    <line x1="150" y1="60" x2="200" y2="60" stroke="#666" strokeWidth="3" />
                    <line x1="200" y1="60" x2="250" y2="60" stroke="#666" strokeWidth="3" />
                    <line x1="50" y1="60" x2="100" y2="100" stroke="#f00" strokeWidth="2" />
                    <line x1="100" y1="60" x2="150" y2="100" stroke="#f00" strokeWidth="2" />
                    <line x1="150" y1="60" x2="200" y2="100" stroke="#f00" strokeWidth="2" />
                    <line x1="200" y1="60" x2="250" y2="100" stroke="#f00" strokeWidth="2" />
                  </>
                )}
                
                {selectedExample.title === "Signal Processing" && (
                  <>
                    <path d="M 30,80 Q 60,30 90,80 Q 120,130 150,80 Q 180,30 210,80 Q 240,130 270,80" 
                          fill="none" stroke="#3b82f6" strokeWidth="2" />
                    <path d="M 30,80 Q 75,120 150,80 Q 225,40 270,80" 
                          fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" />
                    <text x="230" y="40" fontSize="12" fill="#3b82f6">Component Waves</text>
                    <text x="230" y="140" fontSize="12" fill="#ef4444">Resultant Signal</text>
                  </>
                )}
                
                {selectedExample.title === "Screen Resolution" && (
                  <>
                    <rect x="50" y="40" width="200" height="120" fill="none" stroke="#666" strokeWidth="2" />
                    <line x1="50" y1="40" x2="250" y2="160" stroke="#f00" strokeDasharray="5,5" strokeWidth="2" />
                    <text x="140" y="170" fontSize="12" fill="#666">Width</text>
                    <text x="30" y="100" fontSize="12" fill="#666">Height</text>
                    <text x="130" y="110" fontSize="12" fill="#f00">Diagonal</text>
                  </>
                )}
                
                {selectedExample.title === "3D Graphics" && (
                  <>
                    <line x1="50" y1="120" x2="150" y2="120" stroke="#666" strokeWidth="2" />
                    <line x1="150" y1="120" x2="220" y2="70" stroke="#666" strokeWidth="2" />
                    <line x1="50" y1="120" x2="120" y2="70" stroke="#666" strokeWidth="2" />
                    <line x1="120" y1="70" x2="220" y2="70" stroke="#666" strokeWidth="2" />
                    <line x1="50" y1="120" x2="50" y2="40" stroke="#666" strokeWidth="2" />
                    <line x1="150" y1="120" x2="150" y2="40" stroke="#666" strokeWidth="2" />
                    <line x1="120" y1="70" x2="120" y2="30" stroke="#666" strokeWidth="2" />
                    <line x1="220" y1="70" x2="220" y2="30" stroke="#666" strokeWidth="2" />
                    <line x1="50" y1="40" x2="150" y2="40" stroke="#666" strokeWidth="2" />
                    <line x1="150" y1="40" x2="220" y2="30" stroke="#666" strokeWidth="2" />
                    <line x1="50" y1="40" x2="120" y2="30" stroke="#666" strokeWidth="2" />
                    <line x1="120" y1="30" x2="220" y2="30" stroke="#666" strokeWidth="2" />
                    <circle cx="50" cy="120" r="5" fill="#3b82f6" />
                    <circle cx="220" cy="30" r="5" fill="#ef4444" />
                    <line x1="50" y1="120" x2="220" y2="30" stroke="#f00" strokeDasharray="5,5" strokeWidth="2" />
                  </>
                )}
              </svg>
              
              <div className="absolute top-2 right-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 flex items-center justify-center bg-white dark:bg-gray-700 rounded-full shadow-md text-blue-600 dark:text-blue-400"
                  onClick={() => alert('Interactive simulation would appear here')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>

            <div className="mt-4 text-center">
              <span className="text-sm text-gray-500 dark:text-gray-400 italic">
                Interactive diagrams show practical applications of the Pythagorean theorem
              </span>
            </div>
            
            <div className="mt-6 flex justify-center">
              <motion.a
                href="#"
                className="px-4 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:hover:bg-blue-900/40 rounded-md transition-colors flex items-center space-x-2"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                </svg>
                <span>Explore more {selectedExample.title} examples</span>
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 