'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

type Resource = {
  title: string;
  description: string;
  url: string;
  type: 'video' | 'article' | 'course' | 'book' | 'tool';
  icon: string;
};

export default function ResourcesPanel() {
  const resources: Resource[] = [
    {
      title: "Khan Academy: Systems of Linear Equations",
      description: "Free comprehensive course covering the basics to advanced topics.",
      url: "https://www.khanacademy.org/math/linear-algebra/vectors-and-spaces/matrices-elimination/v/matrices-elimination",
      type: "course",
      icon: "🎓"
    },
    {
      title: "MIT OpenCourseWare: Linear Algebra",
      description: "Full course materials from MIT's famous 18.06 Linear Algebra class.",
      url: "https://ocw.mit.edu/courses/mathematics/18-06-linear-algebra-spring-2010/",
      type: "course",
      icon: "🎓"
    },
    {
      title: "3Blue1Brown: Essence of Linear Algebra",
      description: "Visual explanations of the key concepts in linear algebra.",
      url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab",
      type: "video",
      icon: "🎬"
    },
    {
      title: "Introduction to Linear Algebra by Gilbert Strang",
      description: "A classic textbook on linear algebra fundamentals.",
      url: "https://math.mit.edu/~gs/linearalgebra/",
      type: "book",
      icon: "📚"
    },
    {
      title: "MATLAB's Linear Algebra Documentation",
      description: "Practical examples and explanations for implementing linear algebra.",
      url: "https://www.mathworks.com/help/matlab/linear-algebra.html",
      type: "article",
      icon: "📄"
    },
    {
      title: "Desmos: System of Equations Solver",
      description: "Interactive graphical tool for solving and visualizing systems.",
      url: "https://www.desmos.com/calculator",
      type: "tool",
      icon: "🔧"
    }
  ];

  const getTypeColor = (type: Resource['type']) => {
    switch (type) {
      case 'video': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'article': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'course': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'book': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'tool': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2>Learning Resources</h2>
        <h3>Related Tools</h3>
        <ul>
          <li><Link href="/math/linear-systems">Linear Systems Calculator</Link></li>
          <li><Link href="/math/matrices">Matrix Calculator</Link></li>
        </ul>
        <h3>External Resources</h3>
        <ul>
          <li><a href="https://en.wikipedia.org/wiki/Linear_equation" target="_blank" rel="noopener noreferrer">Wikipedia: Linear Equation</a></li>
          <li><a href="https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:linear-equations-graphs" target="_blank" rel="noopener noreferrer">Khan Academy: Linear Equations</a></li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((resource, index) => (
          <motion.div
            key={resource.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={resource.url} target="_blank" rel="noopener noreferrer" className="block h-full">
              <Card className="h-full hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-medium">
                    <span className="mr-2">{resource.icon}</span>
                    {resource.title}
                  </CardTitle>
                  <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(resource.type)}`}>
                    {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                  </span>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{resource.description}</p>
                  <div className="flex items-center text-blue-500 mt-2 text-sm">
                    <span>Visit resource</span>
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 