'use client';

import React, { useState, useEffect } from 'react';
import { LinearSystemsHeader } from './components/LinearSystemsHeader';
import { EnhancedSolverPanel } from './components/EnhancedSolverPanel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SiteFooter } from '@/components/site-footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Lightbulb, ArrowRight, Compass, BarChart4, GraduationCap } from 'lucide-react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';

// Dynamically import components with SSR disabled for Three.js
const VisualizerPanel = dynamic(
  () => import('./components/VisualizerPanel').then(mod => mod.default || mod),
  { 
    ssr: false,
    loading: () => (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-pulse text-gray-600">Loading 3D Visualizer...</div>
      </div>
    )
  }
);

export default function LinearSystemsPage() {
  const [activePanel, setActivePanel] = useState<string>('solver');
  const [mounted, setMounted] = useState(false);
  const [showTour, setShowTour] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  
  // Ensure components only render on client
  useEffect(() => {
    setMounted(true);
    
    // Check if this is the first visit
    const isFirstVisit = !localStorage.getItem('linear-systems-visited');
    if (isFirstVisit) {
      setShowTour(true);
      localStorage.setItem('linear-systems-visited', 'true');
    }
  }, []);
  
  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-600">Loading Linear Systems Solver...</div>
      </div>
    );
  }

  const tourSteps = [
    {
      title: "Welcome to Linear Systems Solver",
      description: "This tool helps you solve systems of linear equations with step-by-step visualizations and explanations. Let's explore its features together.",
      icon: <Compass className="h-6 w-6 text-blue-500" />
    },
    {
      title: "Enter Your Equations",
      description: "Start by entering your system of equations. You can input them manually or choose from our preset examples.",
      icon: <BookOpen className="h-6 w-6 text-blue-500" />
    },
    {
      title: "Step-by-Step Solution",
      description: "Watch the solution unfold with animated steps. You can play, pause, and navigate through each step of the process.",
      icon: <ArrowRight className="h-6 w-6 text-blue-500" />
    },
    {
      title: "Visual Explorer",
      description: "For 2D and 3D systems, switch to the Visual Explorer to see a geometric representation of your system.",
      icon: <BarChart4 className="h-6 w-6 text-blue-500" />
    },
    {
      title: "Learn the Concepts",
      description: "Scroll down to learn more about linear systems, solution methods, and applications in various fields.",
      icon: <GraduationCap className="h-6 w-6 text-blue-500" />
    }
  ];

  const nextTourStep = () => {
    if (tourStep < tourSteps.length - 1) {
      setTourStep(tourStep + 1);
    } else {
      setShowTour(false);
    }
  };

  const prevTourStep = () => {
    if (tourStep > 0) {
      setTourStep(tourStep - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <LinearSystemsHeader />
      
      {/* Tour overlay */}
      <AnimatePresence>
        {showTour && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={() => setShowTour(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center mb-4">
                {tourSteps[tourStep].icon}
                <h3 className="text-xl font-bold ml-3">{tourSteps[tourStep].title}</h3>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {tourSteps[tourStep].description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex space-x-1">
                  {tourSteps.map((_, index) => (
                    <div 
                      key={index}
                      className={`h-2 w-2 rounded-full ${tourStep === index ? 'bg-blue-600' : 'bg-gray-300'}`}
                    />
                  ))}
                </div>
                
                <div className="space-x-2">
                  {tourStep > 0 && (
                    <Button variant="outline" size="sm" onClick={prevTourStep}>
                      Previous
                    </Button>
                  )}
                  
                  {tourStep < tourSteps.length - 1 ? (
                    <Button onClick={nextTourStep}>
                      Next
                    </Button>
                  ) : (
                    <Button onClick={() => setShowTour(false)}>
                      Start Solving
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Difficulty selector */}
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between">
        <div className="mb-4 sm:mb-0">
          <h2 className="text-xl font-semibold mb-1">Linear Systems Solver</h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Solve and visualize linear systems of equations with step-by-step explanations.
          </p>
        </div>
        
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-3">Difficulty:</span>
          <div className="flex space-x-1">
            <Badge
              variant={difficulty === 'beginner' ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setDifficulty('beginner')}
            >
              Beginner
            </Badge>
            <Badge
              variant={difficulty === 'intermediate' ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setDifficulty('intermediate')}
            >
              Intermediate
            </Badge>
            <Badge
              variant={difficulty === 'advanced' ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setDifficulty('advanced')}
            >
              Advanced
            </Badge>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="ml-2"
            onClick={() => setShowTour(true)}
          >
            <Lightbulb className="h-4 w-4 mr-1" />
            Guide Me
          </Button>
        </div>
      </div>
      
      <Tabs 
        defaultValue="solver" 
        value={activePanel} 
        onValueChange={setActivePanel}
        className="w-full mb-8"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="solver" className="flex items-center justify-center py-3">
            <BookOpen className="h-4 w-4 mr-2" />
            Step-by-Step Solver
          </TabsTrigger>
          <TabsTrigger value="visualizer" className="flex items-center justify-center py-3">
            <BarChart4 className="h-4 w-4 mr-2" />
            Visual Explorer
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="solver" className="mt-6">
          <EnhancedSolverPanel />
        </TabsContent>
        
        <TabsContent value="visualizer" className="mt-6">
          <VisualizerPanel />
        </TabsContent>
      </Tabs>
      
      {/* Featured examples */}
      {difficulty !== 'beginner' && (
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4">Featured Examples</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Economic Equilibrium</CardTitle>
                <CardDescription>Supply and demand equations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-sm font-mono mb-4">
                  <div>2x + y = 100 <span className="text-gray-500">(Supply)</span></div>
                  <div>-3x + 2y = 50 <span className="text-gray-500">(Demand)</span></div>
                </div>
                <Button size="sm" className="w-full" onClick={() => {
                  setActivePanel('solver');
                  // TODO: Add function to load this example
                }}>
                  Load Example
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Chemical Balance</CardTitle>
                <CardDescription>Chemical equation system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-sm font-mono mb-4">
                  <div>x + 2y + 3z = 10</div>
                  <div>2x - y + z = 8</div>
                  <div>3x + y - 2z = 7</div>
                </div>
                <Button size="sm" className="w-full" onClick={() => {
                  setActivePanel('solver');
                  // TODO: Add function to load this example
                }}>
                  Load Example
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Circuit Analysis</CardTitle>
                <CardDescription>Kirchhoff's laws application</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-sm font-mono mb-4">
                  <div>4x - y - z = 0</div>
                  <div>-x + 5y - 2z = 0</div>
                  <div>-x - 2y + 8z = 12</div>
                </div>
                <Button size="sm" className="w-full" onClick={() => {
                  setActivePanel('solver');
                  // TODO: Add function to load this example
                }}>
                  Load Example
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
      
      <div className="mt-12 mb-8">
        <h2 className="text-2xl font-bold mb-4">About Linear Systems</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400">Applications</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Linear systems of equations are ubiquitous in science, engineering, economics, and many other fields.
              They are used to model everything from electrical circuits to traffic flows, from economic models to 
              physical systems.
            </p>
            
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400">Geometry</h3>
            <p className="text-gray-700 dark:text-gray-300">
              A linear system can be interpreted geometrically:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 pl-4 space-y-2">
              <li>In 2D, each equation represents a line</li>
              <li>In 3D, each equation represents a plane</li>
              <li>The solution is the point where all the lines/planes intersect</li>
              <li>Parallel lines or planes that don't intersect indicate an inconsistent system</li>
              <li>Overlapping lines or planes indicate infinitely many solutions</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400">Solution Methods</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Several methods exist for solving linear systems:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 pl-4 space-y-2">
              <li><span className="font-medium">Gaussian Elimination:</span> Transforms the system into an upper triangular form through a sequence of elementary row operations</li>
              <li><span className="font-medium">Gauss-Jordan Elimination:</span> Extends Gaussian elimination to produce a diagonal matrix</li>
              <li><span className="font-medium">Cramer's Rule:</span> Uses determinants to find the solution</li>
              <li><span className="font-medium">Matrix Inversion:</span> Solves the system by computing the inverse of the coefficient matrix</li>
              <li><span className="font-medium">Iterative Methods:</span> Such as Jacobi or Gauss-Seidel, approximate the solution through successive iterations</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400">Understanding Solutions</h3>
            <p className="text-gray-700 dark:text-gray-300">
              The nature of solutions depends on the relationship between the number of equations (m) and variables (n):
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 pl-4">
              <li>If m = n with independent equations: exactly one solution</li>
              <li>If m {'>'} n: potentially overdetermined (may have no solution)</li>
              <li>If m {'<'} n: underdetermined (infinitely many solutions)</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Real-world applications */}
      {difficulty === 'advanced' && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Real-World Applications</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Engineering</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 pl-2">
                  <li>Structural analysis</li>
                  <li>Circuit design</li>
                  <li>Control systems</li>
                  <li>Signal processing</li>
                  <li>Mechanical equilibrium</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Economics</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 pl-2">
                  <li>Input-output models</li>
                  <li>Market equilibrium</li>
                  <li>Portfolio optimization</li>
                  <li>Resource allocation</li>
                  <li>Economic forecasting</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Computer Science</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 pl-2">
                  <li>Computer graphics</li>
                  <li>Machine learning</li>
                  <li>Network flow optimization</li>
                  <li>Image processing</li>
                  <li>Robotics</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
      
      <SiteFooter className="py-6" />
    </div>
  );
}
