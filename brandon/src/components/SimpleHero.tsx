"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const SimpleHero = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
            Exploring the Intersection of 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500 px-2">
              Math
            </span> 
            and 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 px-2">
              AI
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
            Discover the beauty of mathematical concepts and the power of artificial intelligence through interactive content and visualizations.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link href="/math" className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition">
              Explore Math
            </Link>
            
            <Link href="/ai" className="px-6 py-3 bg-purple-600 text-white rounded-md font-medium hover:bg-purple-700 transition">
              Discover AI
            </Link>
            
            <Link href="/cs" className="px-6 py-3 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition">
              Computer Science
            </Link>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <ArrowRight className="w-8 h-8 rotate-90 text-gray-400" />
          </div>
        </div>
      </div>
    </section>
  );
}; 