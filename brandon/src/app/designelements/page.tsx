"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Brain, Calculator } from 'lucide-react';
import { useTheme } from "next-themes";

import { Button } from '@/components/ui/button';
import { BackgroundElements } from '@/app/designelements/components/background-elements';
import { AnimatedEquation } from '@/app/designelements/components/animated-equation';
import { FeatureCard } from '@/app/designelements/components/feature-card';

// Import math cards
import { QuadraticSolver } from '@/app/designelements/components/math-cards/quadratic-solver';
import { HermitesProblem } from '@/app/designelements/components/math-cards/hermites-problem';
import { JacobiPerron } from '@/app/designelements/components/math-cards/jacobi-perron';
import { PAdicGroup } from '@/app/designelements/components/math-cards/p-adic-group';
import { CollatzConjecture } from '@/app/designelements/components/math-cards/collatz-conjecture';
import { RiemannHypothesis } from '@/app/designelements/components/math-cards/riemann-hypothesis';

import { CosmicHeader, CyberHeader, OrganicHeader, GeometricHeader, ArtisticHeader, HeaderStyles } from '../../components/headers/CreativeHeaders';

export default function DesignElementsPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  const mathItems = [
    { title: "Geometry and Topology" },
    { title: "Calculus and Analysis" },
    { title: "Number Theory" }
  ];

  const aiItems = [
    { title: "Machine Learning Foundations" },
    { title: "Neural Networks" },
    { title: "Real-world Applications" }
  ];

  return (
    <div className={`relative ${isDark ? 'dark' : ''}`}>
      <BackgroundElements />
      
      <HeaderStyles />
      <CosmicHeader />
      
      <section className="py-20 px-4">
        <div className="container mx-auto w-full">
          {/* Hero section */}
          <div className="text-center">
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Exploring the Intersection of 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 px-2">Math</span> 
              and 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 px-2">AI</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Discover the beauty of mathematical concepts and the power of artificial intelligence through interactive content and visualizations.
            </motion.p>
            
            <AnimatedEquation />
            
            <motion.div 
              className="flex flex-wrap justify-center gap-4 mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Button asChild size="lg" className="gap-2">
                <Link href="/math">
                  Explore Math <Calculator className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="gap-2">
                <Link href="/ai">
                  Discover AI <Brain className="h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
          
          {/* Math cards section */}
          <motion.div
            className="mt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold text-center mb-10">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Mathematical Wonders
              </span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 px-24 mx-auto w-full">
              <div className="aspect-[16/9]">
                <QuadraticSolver />
              </div>
              <div className="aspect-[16/9]">
                <HermitesProblem />
              </div>
              <div className="aspect-[16/9]">
                <JacobiPerron />
              </div>
              <div className="aspect-[16/9]">
                <PAdicGroup />
              </div>
              <div className="aspect-[16/9]">
                <CollatzConjecture />
              </div>
              <div className="aspect-[16/9]">
                <RiemannHypothesis />
              </div>
            </div>
          </motion.div>
          
          {/* Featured sections */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-20"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <FeatureCard 
              title="Mathematical Concepts"
              description="Explore the fascinating world of mathematics"
              icon={<Calculator className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
              href="/math"
              items={mathItems}
            />
            
            <FeatureCard 
              title="Artificial Intelligence"
              description="Discover how AI is changing our world"
              icon={<Brain className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
              href="/ai"
              items={aiItems}
            />
          </motion.div>
          
          {/* Footer quote */}
          <motion.div 
            className="mt-20 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <blockquote className="italic text-xl text-gray-500 dark:text-gray-400">
              "Mathematics is the language in which God has written the universe."
              <footer className="text-sm mt-2">— Galileo Galilei</footer>
            </blockquote>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
