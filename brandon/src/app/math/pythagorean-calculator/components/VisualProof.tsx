"use client";

import React, { useState, useEffect } from 'react';

const VisualProof = () => {
  const [currentProof, setCurrentProof] = useState<'squares' | 'rearrangement'>('squares');
  const [animate, setAnimate] = useState(false);
  const [step, setStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const maxSteps = currentProof === 'squares' ? 4 : 5;
  
  useEffect(() => {
    if (autoPlay && step < maxSteps - 1) {
      const timer = setTimeout(() => {
        setStep(prev => prev + 1);
      }, 2000);
      
      return () => clearTimeout(timer);
    } else if (step === maxSteps - 1 && autoPlay) {
      setAutoPlay(false);
    }
  }, [step, autoPlay, maxSteps]);
  
  const handleReset = () => {
    setStep(0);
    setAnimate(false);
    setAutoPlay(false);
  };
  
  const handleProofChange = (proof: 'squares' | 'rearrangement') => {
    setCurrentProof(proof);
    setStep(0);
    setAnimate(false);
    setAutoPlay(false);
  };
  
  const handleAutoPlay = () => {
    setAutoPlay(true);
    if (step === maxSteps - 1) {
      setStep(0);
    }
  };
  
  const squaresProofDescriptions = [
    "Start with a right triangle with sides a, b, and hypotenuse c.",
    "Draw squares on each side of the triangle. The areas of these squares are a², b², and c².",
    "The Pythagorean theorem states that a² + b² = c².",
    "Visually, the sum of the areas of the two smaller squares equals the area of the largest square.",
  ];
  
  const rearrangementProofDescriptions = [
    "Start with a right triangle with sides a, b, and hypotenuse c.",
    "Create four identical right triangles and arrange them within a square with side length (a + b).",
    "The large square has area (a + b)².",
    "The four triangles each have area (a × b) ÷ 2, so together they occupy 2ab square units.",
    "The remaining area forms a square with side length c and area c². Since (a + b)² = a² + 2ab + b², and (a + b)² - 2ab = c², we can conclude that a² + b² = c².",
  ];
  
  const descriptions = currentProof === 'squares' ? squaresProofDescriptions : rearrangementProofDescriptions;
  
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Visual Proof of the Pythagorean Theorem</h2>
      
      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            onClick={() => handleProofChange('squares')}
            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
              currentProof === 'squares'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Squares Proof
          </button>
          <button
            onClick={() => handleProofChange('rearrangement')}
            className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
              currentProof === 'rearrangement'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Rearrangement Proof
          </button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          <div className="aspect-square relative bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
            {currentProof === 'squares' ? (
              <div className={`w-full h-full ${animate ? 'transition-all duration-1000' : ''}`}>
                {/* Square proof visualization */}
                <svg viewBox="0 0 400 400" className="w-full h-full">
                  {/* Base triangle */}
                  <polygon points="100,300 300,300 100,100" fill="none" stroke="black" strokeWidth="2" className="dark:stroke-white" />
                  
                  {/* Squares on sides */}
                  {(step >= 1) && (
                    <>
                      {/* Square on side a */}
                      <rect x="0" y="100" width="100" height="200" fill="rgba(255, 99, 132, 0.5)" stroke="black" strokeWidth="2" className="dark:stroke-white" />
                      
                      {/* Square on side b */}
                      <rect x="100" y="300" width="200" height="100" fill="rgba(54, 162, 235, 0.5)" stroke="black" strokeWidth="2" className="dark:stroke-white" />
                      
                      {/* Square on hypotenuse c */}
                      <rect 
                        x="100" 
                        y="100" 
                        width="200" 
                        height="200" 
                        transform="rotate(-45, 100, 100)"
                        fill="rgba(255, 206, 86, 0.5)" 
                        stroke="black" 
                        strokeWidth="2"
                        className="dark:stroke-white"
                      />
                    </>
                  )}
                  
                  {/* Labels */}
                  <text x="45" y="200" textAnchor="middle" className="text-sm fill-black dark:fill-white">a</text>
                  <text x="200" y="320" textAnchor="middle" className="text-sm fill-black dark:fill-white">b</text>
                  <text x="180" y="180" textAnchor="middle" className="text-sm fill-black dark:fill-white">c</text>
                  
                  {(step >= 2) && (
                    <>
                      <text x="35" y="200" textAnchor="middle" className="text-sm fill-black dark:fill-white font-bold">a²</text>
                      <text x="200" y="350" textAnchor="middle" className="text-sm fill-black dark:fill-white font-bold">b²</text>
                      <text x="220" y="120" textAnchor="middle" className="text-sm fill-black dark:fill-white font-bold">c²</text>
                    </>
                  )}
                  
                  {(step >= 3) && (
                    <text x="200" y="50" textAnchor="middle" className="text-base fill-black dark:fill-white font-bold">a² + b² = c²</text>
                  )}
                </svg>
              </div>
            ) : (
              <div className={`w-full h-full ${animate ? 'transition-all duration-1000' : ''}`}>
                {/* Rearrangement proof visualization */}
                <svg viewBox="0 0 400 400" className="w-full h-full">
                  {/* Base state - a triangle */}
                  <polygon points="150,250 250,250 150,150" fill="none" stroke="black" strokeWidth="2" className={`dark:stroke-white ${step >= 1 ? '' : 'opacity-100'}`} />
                  
                  {/* Step 1 - Four triangles */}
                  {step >= 1 && (
                    <>
                      {/* Outer square with side (a+b) */}
                      <rect x="50" y="50" width="300" height="300" fill="none" stroke="black" strokeWidth="2" className="dark:stroke-white" />
                      
                      {/* Four triangles arrangement */}
                      <polygon points="50,50 150,50 50,150" fill="rgba(255, 99, 132, 0.5)" stroke="black" strokeWidth="1" className="dark:stroke-white" />
                      <polygon points="150,50 350,50 350,150" fill="rgba(54, 162, 235, 0.5)" stroke="black" strokeWidth="1" className="dark:stroke-white" />
                      <polygon points="50,150 50,350 150,350" fill="rgba(75, 192, 192, 0.5)" stroke="black" strokeWidth="1" className="dark:stroke-white" />
                      <polygon points="350,150 350,350 250,350" fill="rgba(255, 159, 64, 0.5)" stroke="black" strokeWidth="1" className="dark:stroke-white" />
                      
                      {/* The central square with side c */}
                      {step >= 4 && (
                        <rect x="150" y="150" width="100" height="100" fill="rgba(255, 206, 86, 0.5)" stroke="black" strokeWidth="2" className="dark:stroke-white" />
                      )}
                      
                      {/* Labels */}
                      {step >= 2 && (
                        <>
                          <text x="100" y="40" textAnchor="middle" className="text-sm fill-black dark:fill-white">a</text>
                          <text x="250" y="40" textAnchor="middle" className="text-sm fill-black dark:fill-white">b</text>
                          <text x="40" y="100" textAnchor="middle" className="text-sm fill-black dark:fill-white">a</text>
                          <text x="40" y="250" textAnchor="middle" className="text-sm fill-black dark:fill-white">b</text>
                          <text x="360" y="100" textAnchor="middle" className="text-sm fill-black dark:fill-white">b</text>
                          <text x="360" y="250" textAnchor="middle" className="text-sm fill-black dark:fill-white">a</text>
                          <text x="100" y="360" textAnchor="middle" className="text-sm fill-black dark:fill-white">b</text>
                          <text x="250" y="360" textAnchor="middle" className="text-sm fill-black dark:fill-white">a</text>
                        </>
                      )}
                      
                      {step >= 3 && (
                        <text x="200" y="30" textAnchor="middle" className="text-sm fill-black dark:fill-white">Area of large square: (a+b)²</text>
                      )}
                      
                      {step >= 4 && (
                        <>
                          <text x="200" y="200" textAnchor="middle" className="text-sm fill-black dark:fill-white">c²</text>
                          <text x="200" y="380" textAnchor="middle" className="text-sm fill-black dark:fill-white">Area of 4 triangles: 2ab</text>
                        </>
                      )}
                      
                      {step >= 5 && (
                        <text x="200" y="400" textAnchor="middle" className="text-sm fill-black dark:fill-white font-bold">(a+b)² - 2ab = c² → a² + b² = c²</text>
                      )}
                    </>
                  )}
                </svg>
              </div>
            )}
          </div>
          
          <div className="flex justify-between mt-4">
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Reset
            </button>
            
            <div className="flex space-x-2">
              <button
                onClick={() => setStep(prev => Math.max(0, prev - 1))}
                disabled={step === 0}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              <button
                onClick={() => setStep(prev => Math.min(maxSteps - 1, prev + 1))}
                disabled={step === maxSteps - 1}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
              
              <button
                onClick={handleAutoPlay}
                disabled={autoPlay}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Auto Play
              </button>
            </div>
          </div>
        </div>
        
        <div className="md:w-1/2">
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg h-full">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Explanation</h3>
            
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                Step {step + 1} of {maxSteps}:
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                <p className="text-blue-800 dark:text-blue-300">{descriptions[step]}</p>
              </div>
              
              {currentProof === 'squares' ? (
                <div className="mt-8">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Why This Proof Works</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    This visual proof directly shows the squares constructed on each side of the right triangle. The colored areas represent the squares with areas a², b², and c². The proof visually demonstrates that the sum of the areas of the squares on the legs (a² + b²) equals the area of the square on the hypotenuse (c²).
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mt-4">
                    This is one of the most intuitive ways to understand the Pythagorean theorem, as it allows you to directly see the relationship between the areas.
                  </p>
                </div>
              ) : (
                <div className="mt-8">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Why This Proof Works</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    This proof uses an elegant rearrangement to establish the theorem. By arranging four identical right triangles inside a square with side length (a + b), we create a central square with side length c.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mt-4">
                    The area of the large square is (a + b)², which equals a² + 2ab + b². The four triangles each have area (a × b)/2, so together they occupy 2ab square units. The remaining area is the central square with area c².
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mt-4">
                    Since (a + b)² - 2ab = c², we can conclude that a² + b² = c².
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualProof; 