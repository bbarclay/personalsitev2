'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, BookOpen, Video, Code, Calculator } from 'lucide-react';

const resources = [
  {
    category: "Online Courses",
    icon: <BookOpen className="h-5 w-5" />,
    items: [
      {
        title: "Khan Academy: Factorial and Combinations",
        description: "Learn about factorials and their applications in combinatorics.",
        link: "https://www.khanacademy.org/math/precalculus/x9e81a4f98389efdf:prob-comb/x9e81a4f98389efdf:factorial/v/factorial"
      },
      {
        title: "Coursera: Discrete Mathematics",
        description: "Courses covering combinatorics and probability theory with factorials.",
        link: "https://www.coursera.org/courses?query=discrete%20mathematics"
      },
      {
        title: "MIT OpenCourseWare: Mathematics for Computer Science",
        description: "Comprehensive course covering combinatorial mathematics.",
        link: "https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-042j-mathematics-for-computer-science-fall-2010/"
      }
    ]
  },
  {
    category: "Video Tutorials",
    icon: <Video className="h-5 w-5" />,
    items: [
      {
        title: "3Blue1Brown: Combinatorics",
        description: "Visual explanations of factorial and combinatorial concepts.",
        link: "https://www.youtube.com/c/3blue1brown"
      },
      {
        title: "The Organic Chemistry Tutor: Factorial Tutorial",
        description: "Step-by-step tutorial on calculating and understanding factorials.",
        link: "https://www.youtube.com/watch?v=pGg40jlThXs"
      },
      {
        title: "Numberphile: Factorial Numbers",
        description: "Interesting facts and properties of factorial numbers.",
        link: "https://www.youtube.com/watch?v=Mj_9ZY5miAY"
      }
    ]
  },
  {
    category: "Interactive Tools",
    icon: <Calculator className="h-5 w-5" />,
    items: [
      {
        title: "Desmos Graphing Calculator",
        description: "Plot factorial functions and explore their properties.",
        link: "https://www.desmos.com/calculator"
      },
      {
        title: "Wolfram Alpha",
        description: "Compute factorials and explore mathematical properties.",
        link: "https://www.wolframalpha.com/input/?i=factorial"
      },
      {
        title: "GeoGebra: Factorial Explorer",
        description: "Interactive visualization of factorial growth.",
        link: "https://www.geogebra.org/"
      }
    ]
  },
  {
    category: "Programming Resources",
    icon: <Code className="h-5 w-5" />,
    items: [
      {
        title: "LeetCode: Factorial Problems",
        description: "Practice programming problems involving factorials.",
        link: "https://leetcode.com/problemset/all/?search=factorial"
      },
      {
        title: "Project Euler",
        description: "Mathematical programming challenges, many involving factorials.",
        link: "https://projecteuler.net/"
      },
      {
        title: "GitHub: Big Number Libraries",
        description: "Libraries for handling large factorial calculations in various programming languages.",
        link: "https://github.com/topics/bignumber"
      }
    ]
  }
];

const ResourcesPanel: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert max-w-none">
        <h2>Learning Resources</h2>
        <p>
          Explore these resources to deepen your understanding of factorials and their applications
          in mathematics, computer science, and other fields.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center text-purple-600 dark:text-purple-300">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-semibold">{category.category}</h3>
                </div>
                
                <div className="space-y-4">
                  {category.items.map((item, i) => (
                    <div key={i} className="group">
                      <a 
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <div className="flex items-start gap-2">
                          <div className="flex-1">
                            <h4 className="font-medium text-sm mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 flex items-center">
                              {item.title}
                              <ExternalLink className="h-3 w-3 ml-1 inline opacity-50" />
                            </h4>
                            <p className="text-xs text-gray-600 dark:text-gray-300">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
        <div className="flex items-center gap-3 text-blue-700 dark:text-blue-300">
          <div className="text-xl">📚</div>
          <div className="font-medium">Recommended Books</div>
        </div>
        <ul className="mt-2 space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li>
            <strong>"Concrete Mathematics"</strong> by Ronald Graham, Donald Knuth, and Oren Patashnik
          </li>
          <li>
            <strong>"A Course in Combinatorics"</strong> by J. H. van Lint and R. M. Wilson
          </li>
          <li>
            <strong>"An Introduction to Probability Theory and Its Applications"</strong> by William Feller
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ResourcesPanel;
