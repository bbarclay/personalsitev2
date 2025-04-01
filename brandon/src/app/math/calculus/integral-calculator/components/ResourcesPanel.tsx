"use client";

import React from 'react';

export default function ResourcesPanel() {
  return (
    <div className="prose dark:prose-invert max-w-none space-y-6">
      <h2 className="text-2xl font-bold">Learning Resources</h2>
      
      <section>
        <h3>Online Courses</h3>
        <ul>
          <li>Khan Academy - Integration courses</li>
          <li>MIT OpenCourseWare - Single Variable Calculus</li>
          <li>Coursera - Integral Calculus through Data and Modeling</li>
          <li>edX - Calculus Applied!</li>
        </ul>
      </section>
      
      <section>
        <h3>Recommended Books</h3>
        <ul>
          <li>"Calculus" by James Stewart</li>
          <li>"Thomas' Calculus" by George B. Thomas</li>
          <li>"Inside Interesting Integrals" by Paul J. Nahin</li>
          <li>"A Course of Modern Analysis" by Whittaker and Watson (for advanced study)</li>
        </ul>
      </section>
      
      <section>
        <h3>Interactive Tools</h3>
        <ul>
          <li>Desmos - Graphing Calculator with integral visualization</li>
          <li>GeoGebra - Interactive integral tools and applets</li>
          <li>Wolfram Alpha - Advanced integration capabilities</li>
          <li>Symbolab - Step-by-step integration solver</li>
        </ul>
      </section>
      
      <section>
        <h3>Practice Problems</h3>
        <p>Improve your integration skills with these resources:</p>
        <ul>
          <li>Paul's Online Math Notes - Calculus II (Integration)</li>
          <li>MIT OCW - Problem Sets with Solutions</li>
          <li>Brilliant.org - Integration Challenges</li>
          <li>Integral calculators with step-by-step explanations</li>
        </ul>
      </section>
      
      <section>
        <h3>Integration Techniques</h3>
        <ul>
          <li>Substitution methods</li>
          <li>Integration by parts</li>
          <li>Partial fractions</li>
          <li>Trigonometric substitution</li>
          <li>Numerical integration methods</li>
        </ul>
      </section>
    </div>
  );
} 