import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Calculator, Brain } from 'lucide-react';
import { BackgroundElements } from '../app/designelements/components/BackgroundElements';
import { AnimatedEquation } from '../app/designelements/components/AnimatedEquation';
import { seededRandom } from '../app/utils/deterministicRandom';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-16 md:py-24 px-4 overflow-hidden">
      <BackgroundElements>
        {/* Floating mathematical symbols */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 24 }).map((_, i) => {
            const symbols = ["∫", "∑", "∞", "π", "√", "∂", "∇", "∀", "∃", "λ", "θ", "Ω"];
            const symbol = symbols[i % symbols.length];
            const size = 20 + Math.floor(seededRandom() * 60);
            const opacity = 0.1 + seededRandom() * 0.2;
            const delay = i * 0.5;
            const duration = 15 + seededRandom() * 20;
            const x = seededRandom() * 100;
            const y = seededRandom() * 100;
            
            return (
              <motion.div
                key={i}
                className="absolute text-primary/30 font-serif select-none"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  fontSize: `${size}px`,
                  opacity,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity, 
                  y: 0,
                  x: [x - 10, x + 10, x - 5, x + 5, x],
                  rotate: [0, 5, -5, 3, 0],
                }}
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay,
                  ease: "easeInOut"
                }}
              >
                {symbol}
              </motion.div>
            );
          })}
        </div>
        
        {/* Geometric animated background pattern */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <radialGradient id="hero-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#fff" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#000" stopOpacity="0" />
              </radialGradient>
              <pattern id="grid-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeOpacity="0.2" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid-pattern)" />
            <motion.circle 
              cx="50" cy="50" r="30" 
              fill="url(#hero-gradient)"
              animate={{
                r: [30, 45, 30],
                opacity: [0.5, 0.7, 0.5]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </svg>
        </div>
        
        {/* 3D perspective container */}
        <motion.div 
          className="relative z-10 w-full perspective-container"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="container mx-auto w-full z-10">
            <motion.div 
              className="text-center max-w-4xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="relative inline-block mb-4"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur-md opacity-20 animate-pulse"></div>
                <motion.h1 
                  className="relative text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  Exploring the Intersection of 
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500 px-2 relative">
                    Math
                    <motion.span 
                      className="absolute inset-0 bg-blue-500/10 rounded blur-sm"
                      animate={{ 
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    ></motion.span>
                  </span> 
                  and 
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 px-2 relative">
                    AI
                    <motion.span 
                      className="absolute inset-0 bg-purple-500/10 rounded blur-sm"
                      animate={{ 
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    ></motion.span>
                  </span>
                </motion.h1>
              </motion.div>
              
              <motion.p 
                className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="relative z-10">
                  Discover the beauty of mathematical concepts and the power of artificial intelligence through interactive content and visualizations.
                  <motion.span 
                    className="absolute -inset-2 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg blur-sm z-0"
                    animate={{ 
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  ></motion.span>
                </span>
              </motion.p>
              
              <motion.div
                className="relative z-10"
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-md"></div>
                <AnimatedEquation />
              </motion.div>
              
              <motion.div 
                className="flex flex-wrap justify-center gap-4 mt-14"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Link href="/math" className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-200"></div>
                    <div className="relative bg-background px-6 py-3 rounded-md flex items-center gap-2 border border-blue-600/20">
                      <span className="font-medium">Explore Math</span> 
                      <Calculator className="h-4 w-4" />
                    </div>
                  </Link>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Link href="/ai" className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg blur opacity-30 group-hover:opacity-80 transition duration-200"></div>
                    <div className="relative bg-background px-6 py-3 rounded-md flex items-center gap-2 border border-purple-600/20">
                      <span className="font-medium">Discover AI</span> 
                      <Brain className="h-4 w-4" />
                    </div>
                  </Link>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Link href="/cs" className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-teal-600 rounded-lg blur opacity-30 group-hover:opacity-80 transition duration-200"></div>
                    <div className="relative bg-background px-6 py-3 rounded-md flex items-center gap-2 border border-green-600/20">
                      <span className="font-medium">Computer Science</span> 
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <ArrowRight className="w-8 h-8 rotate-90 text-foreground/50" />
          </motion.div>
        </div>
      </BackgroundElements>
    </section>
  );
};
