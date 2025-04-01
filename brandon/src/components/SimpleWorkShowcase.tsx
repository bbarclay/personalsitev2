"use client";

import React from 'react';
import Link from 'next/link';

export const SimpleWorkShowcase = () => {
  const projects = [
    {
      title: "Mathematical Visualizations",
      description: "Interactive visualizations of complex mathematical concepts",
      link: "/math",
      color: "bg-blue-500",
      textColor: "text-blue-500",
      borderColor: "border-blue-500"
    },
    {
      title: "AI Experiments",
      description: "Experiments and demonstrations with artificial intelligence",
      link: "/ai",
      color: "bg-purple-500",
      textColor: "text-purple-500",
      borderColor: "border-purple-500"
    },
    {
      title: "Computer Science Tools",
      description: "Educational tools for computer science concepts",
      link: "/cs",
      color: "bg-green-500",
      textColor: "text-green-500", 
      borderColor: "border-green-500"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Featured Work
          </span>
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.title}
              className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className={`${project.color} h-2`}></div>
              <div className="p-6">
                <h3 className={`text-xl font-bold mb-2 ${project.textColor}`}>{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {project.description}
                </p>
                <Link 
                  href={project.link} 
                  className={`inline-block ${project.borderColor} border px-4 py-2 rounded-md ${project.textColor} hover:bg-gray-50 dark:hover:bg-gray-800 transition`}
                >
                  Explore
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}; 