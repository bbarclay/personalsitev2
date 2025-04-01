"use client";

import React from 'react';

export default function ResourcesPanel() {
  return (
    <div className="prose dark:prose-invert max-w-none space-y-6">
      <h2 className="text-2xl font-bold">Learning Resources</h2>
      
      <section>
        <h3>Online Courses</h3>
        <ul>
          <li>Khan Academy - Algebra courses</li>
          <li>Coursera - Introduction to Mathematical Thinking</li>
          <li>edX - College Algebra and Problem Solving</li>
          <li>MIT OpenCourseWare - Linear Algebra</li>
        </ul>
      </section>
      
      <section>
        <h3>Recommended Books</h3>
        <ul>
          <li>"Algebra" by Michael Artin</li>
          <li>"Linear Algebra Done Right" by Sheldon Axler</li>
          <li>"How to Solve It" by George Pólya</li>
          <li>"Algebra: Chapter 0" by Paolo Aluffi</li>
        </ul>
      </section>
      
      <section>
        <h3>Interactive Tools</h3>
        <ul>
          <li>Desmos - Graphing Calculator</li>
          <li>Wolfram Alpha - Computational Intelligence</li>
          <li>GeoGebra - Interactive Geometry, Algebra, and Calculus</li>
          <li>Symbolab - Step-by-step equation solver</li>
        </ul>
      </section>
      
      <section>
        <h3>Practice Problems</h3>
        <p>Practice is essential for mastering equation solving! Try these resources:</p>
        <ul>
          <li>Brilliant.org - Interactive problem sets</li>
          <li>Art of Problem Solving - Challenging problems</li>
          <li>Past math competition problems (AMC, IMO)</li>
          <li>Textbook exercises with solutions</li>
        </ul>
      </section>
    </div>
  );
} 