"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ExplanationPanel() {
  const [currentStep, setCurrentStep] = useState(0);

  // Explanation steps with animations
  const steps = [
    {
      title: "What is the Pythagorean Theorem?",
      content: "The Pythagorean theorem states that in a right triangle, the square of the length of the hypotenuse (c) equals the sum of squares of the lengths of the other two sides (a and b).",
      formula: "a² + b² = c²",
      image: "/theorem-overview.svg" // This would be replaced with actual SVG visualization
    },
    {
      title: "Historical Context",
      content: "Named after the ancient Greek mathematician Pythagoras (570-495 BCE), this theorem was known to various ancient civilizations including Babylonians and Egyptians. It has over 370 different proofs, more than any other mathematical theorem.",
      image: "/pythagoras-history.svg"
    },
    {
      title: "Visual Proof",
      content: "One of the most elegant proofs involves showing that the areas of squares built on each side of a right triangle have a special relationship. The sum of the areas of the two squares on the legs (a and b) equals the area of the square on the hypotenuse (c).",
      image: "/visual-proof.svg"
    },
    {
      title: "Algebraic Form",
      content: "For a right triangle with legs of lengths a and b, and hypotenuse of length c, the theorem can be expressed as the equation:",
      formula: "a² + b² = c²",
      content2: "This can be rearranged to find any side when the other two are known:",
      formulas: ["c = √(a² + b²)", "a = √(c² - b²)", "b = √(c² - a²)"]
    },
    {
      title: "Converse of the Theorem",
      content: "The converse is also true: if the square of one side of a triangle equals the sum of squares of the other two sides, then the triangle is a right triangle.",
      note: "This is useful for determining if three lengths can form a right triangle."
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Understanding the Pythagorean Theorem
        </h2>
        
        {/* Step progress indicator */}
        <div className="w-full flex justify-center my-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {steps.map((step, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`relative flex flex-col items-center`}
                aria-label={`Go to step ${index + 1}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors
                  ${index === currentStep 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-600 hover:bg-blue-200 text-gray-700 dark:text-gray-300'
                  }
                  ${index < currentStep ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : ''}
                `}>
                  {index < currentStep ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                <span className={`text-xs mt-1 max-w-[80px] text-center transition-colors
                  ${index === currentStep ? 'text-blue-700 dark:text-blue-300 font-medium' : 'text-gray-500 dark:text-gray-400'}
                `}>
                  {step.title.split(' ')[0]}
                </span>
                {index < steps.length - 1 && (
                  <div className={`hidden md:block absolute h-0.5 w-6 top-4 -right-4
                    ${index < currentStep ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}
                  `}></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Current step content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="my-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                {steps[currentStep].title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {steps[currentStep].content}
              </p>
              
              {steps[currentStep].formula && (
                <div className="my-4 flex justify-center">
                  <div className="bg-blue-50 dark:bg-blue-900/30 px-6 py-3 rounded-lg shadow-inner">
                    <span className="text-2xl font-math text-blue-700 dark:text-blue-300">
                      {steps[currentStep].formula}
                    </span>
                  </div>
                </div>
              )}
              
              {steps[currentStep].content2 && (
                <p className="text-gray-700 dark:text-gray-300 mt-4">
                  {steps[currentStep].content2}
                </p>
              )}
              
              {steps[currentStep].formulas && (
                <div className="my-4 flex flex-col items-center space-y-2">
                  {steps[currentStep].formulas.map((formula, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded-md shadow-sm">
                      <span className="text-lg font-math text-gray-800 dark:text-gray-200">
                        {formula}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              
              {steps[currentStep].note && (
                <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-md border-l-4 border-yellow-400 dark:border-yellow-500">
                  <p className="text-sm text-yellow-800 dark:text-yellow-300">
                    <strong>Note:</strong> {steps[currentStep].note}
                  </p>
                </div>
              )}
            </div>
            
            <div className="flex justify-center">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 aspect-square w-full max-w-sm flex items-center justify-center">
                {/* This would be an actual image or SVG in a real implementation */}
                <div className="text-gray-400 dark:text-gray-500 text-center">
                  <svg className="w-full h-64" viewBox="0 0 200 200">
                    {currentStep === 0 && (
                      <>
                        {/* Basic theorem visualization */}
                        <rect x="10" y="100" width="80" height="80" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" />
                        <rect x="100" y="10" width="80" height="80" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" />
                        <polygon points="10,100 100,10 100,100" fill="rgba(249, 115, 22, 0.2)" stroke="#f97316" strokeWidth="2" />
                        <text x="35" y="150" fontSize="16" fill="#3b82f6">a²</text>
                        <text x="135" y="50" fontSize="16" fill="#10b981">b²</text>
                        <text x="55" y="70" fontSize="16" fill="#f97316">c²</text>
                      </>
                    )}
                    {currentStep === 1 && (
                      <>
                        {/* Pythagoras portrait */}
                        <circle cx="100" cy="70" r="50" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" />
                        <rect x="70" y="120" width="60" height="80" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" />
                        <text x="75" y="160" fontSize="12" fill="#10b981">Ancient Greece</text>
                      </>
                    )}
                    {currentStep === 2 && (
                      <>
                        {/* Visual proof */}
                        <rect x="20" y="20" width="70" height="70" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" />
                        <rect x="110" y="20" width="70" height="70" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" />
                        <rect x="60" y="110" width="90" height="90" fill="rgba(249, 115, 22, 0.2)" stroke="#f97316" />
                        <polygon points="90,90 20,90 90,20" fill="rgba(168, 85, 247, 0.2)" stroke="#a855f7" strokeWidth="2" />
                        <text x="30" y="60" fontSize="20" fill="#3b82f6">a²</text>
                        <text x="145" y="60" fontSize="20" fill="#10b981">b²</text>
                        <text x="105" y="160" fontSize="20" fill="#f97316">c²</text>
                      </>
                    )}
                    {currentStep === 3 && (
                      <>
                        {/* Algebraic form */}
                        <polygon points="40,150 150,150 150,40" fill="rgba(59, 130, 246, 0.1)" stroke="#3b82f6" strokeWidth="2" />
                        <line x1="150" y1="150" x2="150" y2="130" stroke="#000" strokeWidth="2" />
                        <line x1="150" y1="150" x2="130" y2="150" stroke="#000" strokeWidth="2" />
                        <text x="90" y="165" fontSize="16" fill="#3b82f6">a</text>
                        <text x="160" y="95" fontSize="16" fill="#10b981">b</text>
                        <text x="90" y="95" fontSize="16" fill="#f97316">c</text>
                      </>
                    )}
                    {currentStep === 4 && (
                      <>
                        {/* Converse */}
                        <polygon points="40,150 150,150 150,40" fill="rgba(59, 130, 246, 0.1)" stroke="#3b82f6" strokeWidth="2" />
                        <circle cx="150" cy="150" r="5" fill="#f97316" />
                        <circle cx="40" cy="150" r="5" fill="#f97316" />
                        <circle cx="150" cy="40" r="5" fill="#f97316" />
                        <text x="65" y="165" fontSize="16" fill="#3b82f6">5</text>
                        <text x="160" y="95" fontSize="16" fill="#10b981">12</text>
                        <text x="90" y="95" fontSize="16" fill="#f97316">13</text>
                        <text x="65" y="100" fontSize="16" fill="#000">5² + 12² = 13²</text>
                        <text x="65" y="120" fontSize="16" fill="#000">25 + 144 = 169</text>
                      </>
                    )}
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-8">
          <motion.button
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.97 }}
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`px-4 py-2 rounded-md flex items-center space-x-2 transition-colors ${
              currentStep === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700'
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:hover:bg-blue-900/60'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Previous</span>
          </motion.button>
          
          <div className="flex space-x-2">
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-sm text-gray-700 dark:text-gray-300">
              {currentStep + 1} of {steps.length}
            </span>
            
            <motion.button
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.97 }}
              onClick={nextStep}
              disabled={currentStep === steps.length - 1}
              className={`px-4 py-2 rounded-md flex items-center space-x-2 transition-colors ${
                currentStep === steps.length - 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:hover:bg-blue-900/60'
              }`}
            >
              <span>Next</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
} 