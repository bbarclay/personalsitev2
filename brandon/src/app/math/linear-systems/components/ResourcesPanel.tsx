'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import Link from 'next/link';

const ResourceCard = ({ title, description, link, icon, category, difficulty }) => {
  const getDifficultyColor = (level) => {
    switch(level) {
      case "Beginner": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Intermediate": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Advanced": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300">
                {icon}
              </div>
              <CardTitle className="text-lg">{title}</CardTitle>
            </div>
            <Badge variant="outline" className={getDifficultyColor(difficulty)}>
              {difficulty}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
        </CardContent>
        <CardFooter className="pt-0">
          <Link href={link} target="_blank" className="w-full">
            <Button variant="outline" className="w-full">
              View Resource
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default function ResourcesPanel() {
  const [filter, setFilter] = useState("all");
  
  const resources = [
    // Books
    {
      title: "Linear Algebra and Its Applications",
      description: "Gilbert Strang's classic textbook on linear algebra covers systems of linear equations, vector spaces, determinants, eigenvalues, and applications.",
      link: "https://www.amazon.com/Linear-Algebra-Its-Applications-5th/dp/032198238X/",
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
      category: "books",
      difficulty: "Intermediate"
    },
    {
      title: "Elementary Linear Algebra",
      description: "Howard Anton's textbook provides a clear introduction to linear algebra with an emphasis on systems of linear equations and their applications.",
      link: "https://www.amazon.com/Elementary-Linear-Algebra-Howard-Anton/dp/1118474228/",
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
      category: "books",
      difficulty: "Beginner"
    },
    
    // Online Courses
    {
      title: "Khan Academy: Systems of Equations",
      description: "Free comprehensive course covering linear systems including methods for solving, graphing, and applying systems of equations.",
      link: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:systems-of-equations",
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
      category: "courses",
      difficulty: "Beginner"
    },
    {
      title: "MIT OpenCourseWare: Linear Algebra",
      description: "Gilbert Strang's renowned lecture series covering linear systems, matrices, determinants, and more with real-world applications.",
      link: "https://ocw.mit.edu/courses/mathematics/18-06-linear-algebra-spring-2010/",
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
      category: "courses",
      difficulty: "Advanced"
    },
    
    // Interactive Tools
    {
      title: "Math is Fun: Linear Systems",
      description: "Interactive tutorials and exercises for understanding systems of linear equations with visual explanations.",
      link: "https://www.mathsisfun.com/algebra/systems-linear-equations.html",
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
      category: "interactive",
      difficulty: "Beginner"
    },
    {
      title: "GeoGebra: Linear Systems Explorer",
      description: "Dynamic graphical tool for exploring and visualizing systems of linear equations in 2D and 3D.",
      link: "https://www.geogebra.org/m/pppmuzfs",
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
      category: "interactive",
      difficulty: "Intermediate"
    },
    
    // Practice Problems
    {
      title: "Brilliant: Linear Algebra",
      description: "Collection of challenging problems and guided courses on linear systems and matrix operations with step-by-step solutions.",
      link: "https://brilliant.org/wiki/linear-algebra/",
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>,
      category: "practice",
      difficulty: "Advanced"
    },
    {
      title: "Paul's Online Math Notes",
      description: "Comprehensive collection of practice problems covering systems of linear equations with detailed solutions.",
      link: "https://tutorial.math.lamar.edu/Problems/LinAlg/LinAlg.aspx",
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>,
      category: "practice",
      difficulty: "Intermediate"
    },
    
    // Research Papers
    {
      title: "Applications of Linear Systems in Computer Vision",
      description: "Research paper exploring how linear systems are used in image processing, feature extraction, and computer vision algorithms.",
      link: "https://arxiv.org/abs/1508.01013",
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>,
      category: "research",
      difficulty: "Advanced"
    }
  ];
  
  const filteredResources = filter === "all" ? 
    resources : 
    resources.filter(resource => resource.category === filter);

  return (
    <div className="space-y-6 pb-12">
      <motion.div 
        className="prose dark:prose-invert max-w-none"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Learning Resources</h2>
        <p>
          Explore these carefully curated resources to deepen your understanding of linear systems of equations.
          Whether you're a beginner or looking for advanced materials, you'll find valuable content to enhance your knowledge.
        </p>
      </motion.div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setFilter}>
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="books">Books</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="interactive">Interactive</TabsTrigger>
          <TabsTrigger value="practice">Practice</TabsTrigger>
        </TabsList>
        
        <TabsContent value={filter} className="mt-0">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredResources.map((resource, index) => (
              <ResourceCard key={index} {...resource} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <motion.div 
        className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-semibold mb-2">Create Your Own Practice Problems</h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md">
              Generate custom linear systems problems with our interactive solver. Test your skills with random equations or create specific challenges.
            </p>
          </div>
          <Link href="/math/linear-systems?tab=solver">
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              Try the Solver
            </Button>
          </Link>
        </div>
      </motion.div>
      
      <motion.div 
        className="mt-8 border border-gray-200 dark:border-gray-800 rounded-lg p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h3 className="text-lg font-semibold mb-4">Recommended Learning Path</h3>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800"></div>
          
          {[
            { 
              title: "Introduction to Linear Systems", 
              description: "Start with basic 2×2 systems and understand graphical solutions" 
            },
            { 
              title: "Algebraic Solution Methods", 
              description: "Learn substitution, elimination, and matrix methods for solving systems" 
            },
            { 
              title: "3D Systems and Applications", 
              description: "Explore 3×3 systems and real-world applications" 
            },
            { 
              title: "Advanced Topics", 
              description: "Study homogeneous systems, eigenvalues, and specialized applications" 
            }
          ].map((step, index) => (
            <div key={index} className="relative pl-10 pb-8">
              <div className="absolute left-0 top-1 mt-1.5 rounded-full w-8 h-8 flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-bold text-sm">
                {index + 1}
              </div>
              <h4 className="text-lg font-medium">{step.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{step.description}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
} 
