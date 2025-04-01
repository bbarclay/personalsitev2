"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Define resource categories for better organization
const resourceCategories = [
  {
    id: "tutorials",
    title: "Interactive Tutorials",
    icon: "🎓",
    color: "bg-blue-500",
    description: "Step-by-step guides and interactive lessons to help you master the Pythagorean theorem."
  },
  {
    id: "videos",
    title: "Video Explanations",
    icon: "🎬",
    color: "bg-red-500",
    description: "Visual explanations and demonstrations from leading educators and mathematicians."
  },
  {
    id: "books",
    title: "Books & Articles",
    icon: "📚",
    color: "bg-amber-500",
    description: "In-depth reading materials for those who want to explore the theorem's history and significance."
  },
  {
    id: "tools",
    title: "Related Tools",
    icon: "🛠️",
    color: "bg-green-500",
    description: "Other mathematical tools and calculators that complement the Pythagorean theorem."
  }
];

// Resource items organized by category
const resources = {
  tutorials: [
    {
      title: "Interactive Pythagorean Explorer",
      url: "https://www.geogebra.org/m/UVTt6zFv",
      description: "A GeoGebra interactive tool that lets you manipulate right triangles and see the theorem in action.",
      rating: 5,
      level: "Beginner"
    },
    {
      title: "Pythagorean Theorem Practice Problems",
      url: "https://www.khanacademy.org/math/geometry/hs-geo-trig/hs-geo-pyth-theorem/e/pythagorean_theorem",
      description: "Practice your skills with Khan Academy's interactive problem sets.",
      rating: 4,
      level: "Intermediate"
    }
  ],
  videos: [
    {
      title: "Visual Proof of the Pythagorean Theorem",
      url: "https://www.youtube.com/watch?v=CAkMUdeB06o",
      description: "An elegant visual demonstration of why a² + b² = c².",
      duration: "8:24",
      channel: "3Blue1Brown"
    },
    {
      title: "The History of the Pythagorean Theorem",
      url: "https://www.youtube.com/watch?v=YompsDlEdtc",
      description: "Learn about the fascinating history of this theorem across different cultures.",
      duration: "12:45",
      channel: "PBS Infinite Series"
    }
  ],
  books: [
    {
      title: "The Pythagorean Theorem: A 4,000-Year History",
      author: "Eli Maor",
      url: "https://press.princeton.edu/books/hardcover/9780691125268/the-pythagorean-theorem",
      description: "A comprehensive look at the theorem's history and cultural impact.",
      year: 2007
    },
    {
      title: "The Joy of x: A Guided Tour of Math, from One to Infinity",
      author: "Steven Strogatz",
      url: "https://www.stevenstrogatz.com/books/the-joy-of-x",
      description: "Includes an accessible chapter on the beauty of the Pythagorean theorem.",
      year: 2012
    }
  ],
  tools: [
    {
      title: "Trigonometry Calculator",
      path: "/math/trigonometry",
      description: "Calculate angles and sides of triangles using trigonometric functions.",
      icon: "📐"
    },
    {
      title: "Coordinate Geometry Tool",
      path: "/math/coordinate-geometry",
      description: "Work with points, lines, and shapes in the coordinate plane.",
      icon: "📊"
    },
    {
      title: "Vector Calculator",
      path: "/math/vectors",
      description: "Calculate vector magnitudes and operations using the Pythagorean theorem in multiple dimensions.",
      icon: "➡️"
    }
  ]
};

export default function ResourcesPanel() {
  const [activeCategory, setActiveCategory] = useState(resourceCategories[0]);
  
  return (
    <div className="space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
          Learning Resources
        </h2>
        
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Explore these curated resources to deepen your understanding of the Pythagorean theorem and its applications.
        </p>
        
        {/* Resource category tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 dark:border-gray-700 pb-2">
          {resourceCategories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-3 rounded-t-lg flex items-center space-x-2 transition-all relative ${
                activeCategory.id === category.id
                  ? `${category.color} text-white shadow-md`
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:shadow'
              }`}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="text-xl">{category.icon}</span>
              <span className="hidden sm:inline font-medium">{category.title}</span>
              {activeCategory.id === category.id && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-white"
                  layoutId="activeTab"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>
        
        {/* Category description */}
        <motion.div
          key={activeCategory.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <div className={`p-4 rounded-lg ${activeCategory.color.replace('bg-', 'bg-opacity-10 bg-')} border-l-4 ${activeCategory.color}`}>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{activeCategory.icon}</span>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">{activeCategory.title}</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              {activeCategory.description}
            </p>
          </div>
        </motion.div>
        
        {/* Resource items for selected category */}
        <div className="space-y-4">
          {activeCategory.id === "tutorials" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {resources.tutorials.map((resource, index) => (
                <motion.a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:shadow-md transition-shadow flex flex-col relative overflow-hidden"
                  whileHover={{ scale: 1.02, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-300">{resource.title}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      resource.level === "Beginner" 
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                    }`}>
                      {resource.level}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm flex-grow">{resource.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg 
                          key={i} 
                          xmlns="http://www.w3.org/2000/svg" 
                          className={`h-4 w-4 ${i < resource.rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">{resource.rating}/5</span>
                    </div>
                    
                    <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm">
                      <span>Open</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          )}
          
          {activeCategory.id === "videos" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {resources.videos.map((video, index) => (
                <motion.a
                  key={index}
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:shadow-md transition-shadow relative overflow-hidden"
                  whileHover={{ scale: 1.02, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                  <div className="relative w-full aspect-video bg-gray-200 dark:bg-gray-600 rounded-md mb-3 overflow-hidden group">
                    <div className="absolute inset-0 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center"
                      >
                        <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">{video.title}</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{video.description}</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 dark:text-gray-400 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd" />
                      </svg>
                      {video.channel}
                    </span>
                    <span className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded-full text-xs flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      {video.duration}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          )}
          
          {activeCategory.id === "books" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {resources.books.map((book, index) => (
                <motion.a
                  key={index}
                  href={book.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:shadow-md transition-shadow flex gap-4 relative overflow-hidden"
                  whileHover={{ scale: 1.02, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
                  <div className="w-24 h-32 bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900 dark:to-amber-800 rounded-md flex items-center justify-center text-amber-800 dark:text-amber-300 text-center p-2 shadow-md">
                    <div>
                      <span className="text-2xl">📖</span>
                      <div className="text-xs mt-1 font-medium">Book Cover</div>
                    </div>
                  </div>
                  <div className="flex flex-col flex-grow">
                    <h4 className="text-lg font-semibold text-amber-700 dark:text-amber-300">{book.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">by {book.author} ({book.year})</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 flex-grow">{book.description}</p>
                    <div className="flex justify-end mt-2">
                      <span className="text-xs text-amber-600 dark:text-amber-400 flex items-center">
                        Read more 
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          )}
          
          {activeCategory.id === "tools" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {resources.tools.map((tool, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <Link href={tool.path} className="block p-5 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-200 dark:border-green-700 hover:shadow-lg transition-shadow h-full">
                    <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center mb-3 shadow-inner">
                      <span className="text-2xl">{tool.icon}</span>
                    </div>
                    <h4 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-2">{tool.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{tool.description}</p>
                    <div className="absolute bottom-3 right-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
        
        {/* External resources section */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
            Additional Resources
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-blue-600 dark:text-blue-400">
            <li>
              <motion.a 
                href="https://en.wikipedia.org/wiki/Pythagorean_theorem" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                whileHover={{ x: 3 }}
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <div>
                  <div className="font-medium">Wikipedia: Pythagorean Theorem</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Comprehensive reference with historical context</div>
                </div>
              </motion.a>
            </li>
            <li>
              <motion.a 
                href="https://www.khanacademy.org/math/geometry/hs-geo-trig/hs-geo-pyth-theorem/v/the-pythagorean-theorem" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                whileHover={{ x: 3 }}
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <div>
                  <div className="font-medium">Khan Academy: Pythagorean Theorem</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Video lessons and interactive practice problems</div>
                </div>
              </motion.a>
            </li>
            <li>
              <motion.a 
                href="https://www.mathsisfun.com/pythagoras.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                whileHover={{ x: 3 }}
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <div>
                  <div className="font-medium">Math Is Fun: Pythagoras' Theorem</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Simple explanations with interactive examples</div>
                </div>
              </motion.a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}