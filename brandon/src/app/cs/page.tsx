"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BackgroundElements } from '../designelements/components/BackgroundElements';

export default function ComputerSciencePage() {
  // Categories for Computer Science
  const categories = [
    {
      title: "Algorithms & Data Structures",
      description: "Efficient methods for organizing and processing data, from sorting and searching to graph theory and optimization.",
      icon: "⚙️",
      link: "/cs/algorithms"
    },
    {
      title: "Programming Languages",
      description: "Exploring language paradigms, compilers, interpreters, and the evolution of programming languages.",
      icon: "📝",
      link: "/cs/languages"
    },
    {
      title: "Systems & Architecture",
      description: "Understanding computer organization, operating systems, networks, and distributed systems.",
      icon: "🖥️",
      link: "/cs/systems"
    },
    {
      title: "Theory of Computation",
      description: "Formal languages, automata theory, computability, and computational complexity.",
      icon: "🧮",
      link: "/cs/theory"
    },
    {
      title: "Software Engineering",
      description: "Design patterns, software architecture, testing methodologies, and development practices.",
      icon: "🔨",
      link: "/cs/software-engineering"
    },
    {
      title: "Databases & Information Systems",
      description: "Data modeling, query optimization, database management systems, and information retrieval.",
      icon: "💾",
      link: "/cs/databases"
    }
  ];

  return (
    <div className="relative min-h-screen">
      <BackgroundElements>
        <div className="container mx-auto px-4 py-16">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-600/20 to-teal-600/20 rounded-lg blur-md"></div>
              <h1 className="relative text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-600">
                Computer Science
              </h1>
            </div>
            <div className="h-1 w-24 bg-gradient-to-r from-green-600 to-teal-600 mx-auto mt-6 rounded-full"></div>
            <p className="text-xl text-muted-foreground mt-6 max-w-2xl mx-auto">
              Explore the fundamental theories, systems, and applications that power our digital world
            </p>
          </motion.div>

          {/* CS Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {categories.map((category, index) => (
              <motion.div
                key={category.title}
                className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 10px 30px rgba(16, 185, 129, 0.1)"
                }}
              >
                <Link href={category.link} className="block p-6">
                  <div className="flex items-start">
                    <div className="text-3xl mr-4">{category.icon}</div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                      <p className="text-muted-foreground text-sm">{category.description}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
            >
              <svg className="w-5 h-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </BackgroundElements>
    </div>
  );
} 