"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Calculator, Brain } from 'lucide-react';
import { BackgroundElements } from './designelements/components/BackgroundElements';
import { QuantumWaves } from './designelements/components/math-cards/animated-cards/quantum-waves';
import { AnimatedEquation } from './designelements/components/AnimatedEquation';
import { ChaosTheory } from './designelements/components/math-cards/animated-cards/ChaosTheory';
import { seededRandom } from './utils/deterministicRandom';

// Move numberPatterns outside the component to ensure consistent values
const numberPatterns = Array.from({ length: 20 }).map((_, i) => ({
  x: seededRandom() * 90 + 5,
  y: seededRandom() * 90 + 5,
  fontSize: seededRandom() * 5 + 2,
  opacity: seededRandom() * 0.8 + 0.2,
  value: Math.floor(seededRandom() * 100),
  content: undefined
}));

export default function Home() {
  // Add client-side detection for safe hydration
  const [clientRendered, setClientRendered] = useState(false);
  
  useEffect(() => {
    setClientRendered(true);
  }, []);

  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="relative">
        <BackgroundElements>
          {/* Hero Section */}
          <section className="py-16 md:py-24 px-4 relative">
            <div className="container mx-auto w-full">
              <motion.div 
                className="text-center max-w-4xl mx-auto"
                initial="hidden"
                animate={clientRendered ? "visible" : "hidden"}
                variants={staggerContainer}
              >
                <motion.h1 
                  className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4"
                  variants={fadeIn}
                >
                  Exploring the Intersection of
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500 px-2">Math</span> 
                  and 
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 px-2">AI</span>
                </motion.h1>
                
                <motion.p 
                  className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8"
                  variants={fadeIn}
                >
                  Discover the beauty of mathematical concepts and the power of artificial intelligence 
                  through interactive content and visualizations.
                </motion.p>
                
                {clientRendered && <AnimatedEquation />}
                
                <motion.div 
                  className="flex flex-wrap justify-center gap-4 mt-8"
                  variants={fadeIn}
                >
                  <Link href="/math" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-md transition-colors duration-300 flex items-center gap-2">
                    Explore Math <Calculator className="h-4 w-4" />
                  </Link>
                  <Link href="/ai" className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 font-medium px-6 py-3 rounded-md transition-colors duration-300 flex items-center gap-2">
                    Discover AI <Brain className="h-4 w-4" />
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </section>
          
          {/* Featured Card - Visualization */}
          <section className="py-12 px-4 bg-gray-100/50 dark:bg-gray-900/50 backdrop-blur-sm">
            <div className="container mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={clientRendered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mb-12 text-center"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                    Featured Visualization
                  </span>
                </h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Explore the beauty and complexity of mathematical concepts through interactive visualizations.
                </p>
              </motion.div>
              
              <div className="h-[600px] w-full max-w-5xl mx-auto">
                <QuantumWaves />
              </div>
            </div>
          </section>
          
          {/* Math Cards Grid */}
          <section className="py-16 px-4">
            <div className="container mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={clientRendered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-12 text-center"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                    Mathematical Wonders
                  </span>
                </h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Dive into fascinating mathematical concepts with our interactive card collection.
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Card 1 */}
                <Link href="/math-cards" className="group">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={clientRendered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="relative rounded-xl overflow-hidden bg-gradient-to-br from-purple-900 to-indigo-900 shadow-xl h-[350px] transform transition-all duration-300 group-hover:scale-[1.02]"
                  >
                    {/* Card content */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                      <div>
                        <div className="inline-block px-3 py-1 bg-indigo-500/30 backdrop-blur-sm rounded-full text-indigo-100 text-sm font-medium mb-4">
                          FRACTAL GEOMETRY
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Mandelbrot Explorer</h3>
                        <p className="text-indigo-100">Journey into infinite complexity with the most famous fractal pattern in mathematics.</p>
                      </div>
                      
                      <div className="flex items-center text-indigo-100 font-medium">
                        <span>Explore fractal</span>
                        <ArrowRight className="ml-2 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                    
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-30">
                      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <defs>
                          <radialGradient id="mandelbrot-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                            <stop offset="0%" stopColor="#c4b5fd" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
                          </radialGradient>
                        </defs>
                        <rect x="0" y="0" width="100" height="100" fill="url(#mandelbrot-gradient)" />
                        
                        {/* Spiral pattern */}
                        {Array.from({ length: 10 }).map((_, i) => (
                          <circle 
                            key={i} 
                            cx="50" 
                            cy="50" 
                            r={5 + i * 5} 
                            fill="none" 
                            stroke="#a5b4fc" 
                            strokeWidth="0.5" 
                            strokeDasharray="2 3" 
                          />
                        ))}
                      </svg>
                    </div>
                  </motion.div>
                </Link>
                
                {/* Card 2 */}
                <Link href="/math-cards" className="group">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={clientRendered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="relative rounded-xl overflow-hidden bg-gradient-to-br from-cyan-900 to-blue-900 shadow-xl h-[350px] transform transition-all duration-300 group-hover:scale-[1.02]"
                  >
                    {/* Card content */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                      <div>
                        <div className="inline-block px-3 py-1 bg-cyan-500/30 backdrop-blur-sm rounded-full text-cyan-100 text-sm font-medium mb-4">
                          WAVE DYNAMICS
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Fourier Transform</h3>
                        <p className="text-cyan-100">Visualize how complex signals can be decomposed into simple sine waves.</p>
                      </div>
                      
                      <div className="flex items-center text-cyan-100 font-medium">
                        <span>Explore waves</span>
                        <ArrowRight className="ml-2 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                    
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-30">
                      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#1e40af" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <rect x="0" y="0" width="100" height="100" fill="url(#wave-gradient)" />
                        
                        {/* Wave patterns */}
                        {Array.from({ length: 5 }).map((_, i) => (
                          <path 
                            key={i} 
                            d={`M 0 ${30 + i * 10} Q 25 ${20 + i * 10}, 50 ${30 + i * 10} T 100 ${30 + i * 10}`} 
                            fill="none" 
                            stroke="#7dd3fc" 
                            strokeWidth="0.5" 
                          />
                        ))}
                      </svg>
                    </div>
                  </motion.div>
                </Link>
                
                {/* Card 3 */}
                <Link href="/math-cards" className="group">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={clientRendered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="relative rounded-xl overflow-hidden bg-gradient-to-br from-emerald-900 to-teal-900 shadow-xl h-[350px] transform transition-all duration-300 group-hover:scale-[1.02]"
                  >
                    {/* Card content */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                      <div>
                        <div className="inline-block px-3 py-1 bg-teal-500/30 backdrop-blur-sm rounded-full text-teal-100 text-sm font-medium mb-4">
                          NUMBER THEORY
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Collatz Conjecture</h3>
                        <p className="text-teal-100">Explore the mysterious sequence that continues to baffle mathematicians for decades.</p>
                      </div>
                      
                      <div className="flex items-center text-teal-100 font-medium">
                        <span>Explore numbers</span>
                        <ArrowRight className="ml-2 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                    
                    {/* Background pattern - using deterministic values */}
                    <div className="absolute inset-0 opacity-30">
                      <svg 
                        width="100%" 
                        height="100%" 
                        viewBox="0 0 100 100" 
                        preserveAspectRatio="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <radialGradient id="collatz-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                            <stop offset="0%" stopColor="#5eead4" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#047857" stopOpacity="0" />
                          </radialGradient>
                        </defs>
                        <rect x="0" y="0" width="100" height="100" fill="url(#collatz-gradient)" />
                        
                        {/* Number pattern - using pre-calculated values */}
                        <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                          {numberPatterns.map((pattern, i) => (
                            <text 
                              key={i} 
                              x={pattern.x} 
                              y={pattern.y} 
                              fill="#2dd4bf" 
                              fontSize={`${pattern.fontSize}px`}
                              opacity={pattern.opacity}
                              dominantBaseline="middle"
                              textAnchor="middle"
                            >
                              {pattern.content || pattern.value || ""}
                            </text>
                          ))}
                        </svg>
                      </svg>
                    </div>
                  </motion.div>
                </Link>
              </div>
              
              <div className="text-center mt-12">
                <Link 
                  href="/math-cards" 
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300"
                >
                  View All Cards
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
          
          {/* Call to Action Section */}
          <section className="py-16 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-800 dark:to-purple-800 text-white">
            <div className="container mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={clientRendered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to explore the world of mathematics?
                </h2>
                <p className="text-xl text-indigo-100 max-w-2xl mx-auto mb-8">
                  Dive into our collection of interactive visualizations and discover the beauty of mathematical concepts.
                </p>
                <Link 
                  href="/math" 
                  className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 dark:text-indigo-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition duration-300"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
            </div>
          </section>
          
          {/* Quote Section */}
          <section className="py-16 px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <blockquote className="text-2xl md:text-3xl font-light italic text-gray-700 dark:text-gray-300">
                "Mathematics is the language in which God has written the universe."
                <footer className="mt-4 text-lg text-gray-500 dark:text-gray-400">— Galileo Galilei</footer>
              </blockquote>
            </div>
          </section>
        </BackgroundElements>
      </div>
      
      {/* Style for client-side only animations */}
      <style jsx global>{`
        .client-only-animation {
          animation: ${clientRendered ? 'inherit' : 'none'} !important;
        }
      `}</style>
    </main>
  );
}
