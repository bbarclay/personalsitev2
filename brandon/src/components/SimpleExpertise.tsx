"use client";

import React from 'react';

export const SimpleExpertise = () => {
  const skills = [
    { name: "Mathematics", level: 95, color: "bg-blue-500" },
    { name: "Machine Learning", level: 90, color: "bg-purple-500" },
    { name: "Computer Science", level: 85, color: "bg-green-500" },
    { name: "Data Science", level: 80, color: "bg-yellow-500" },
    { name: "Web Development", level: 75, color: "bg-red-500" },
  ];

  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Areas of Expertise
          </span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">Skills & Proficiency</h3>
            
            <div className="space-y-6">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div 
                      className={`${skill.color} h-2.5 rounded-full`} 
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-6">About Me</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              I'm a mathematician and developer with a passion for exploring the intersection of mathematics, computer science, and artificial intelligence.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              My work focuses on applying advanced mathematical concepts to solve complex problems in machine learning and data science.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              I'm dedicated to creating interactive educational tools that make complex concepts more accessible and engaging.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}; 