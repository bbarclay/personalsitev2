"use client";

import React from 'react';

export default function ResourcesPanel() {
  return (
    <div className="prose dark:prose-invert max-w-none space-y-6">
      <h2 className="text-2xl font-bold">Learning Resources</h2>
      
      <section>
        <h3>Online Courses</h3>
        <ul>
          <li>Khan Academy - Series and Taylor Expansion</li>
          <li>MIT OpenCourseWare - Single Variable Calculus (Taylor Series section)</li>
          <li>Coursera - Calculus and Optimization for Machine Learning</li>
          <li>edX - Calculus Applied!</li>
        </ul>
      </section>
      
      <section>
        <h3>Recommended Books</h3>
        <ul>
          <li>"Calculus" by James Stewart (Chapter on Infinite Series)</li>
          <li>"Advanced Engineering Mathematics" by Erwin Kreyszig</li>
          <li>"A First Course in Complex Analysis" by Matthias Beck et al.</li>
          <li>"Inside Interesting Integrals" by Paul J. Nahin (Applications of Taylor Series)</li>
        </ul>
      </section>
      
      <section>
        <h3>Interactive Tools</h3>
        <ul>
          <li>Desmos - Graphical visualization of Taylor approximations</li>
          <li>GeoGebra - Interactive Taylor series applets</li>
          <li>Wolfram Alpha - Series expansions and analysis</li>
          <li>Taylor Series Explorer (online visualization tools)</li>
        </ul>
      </section>
      
      <section>
        <h3>Practice Problems</h3>
        <p>Master Taylor series through consistent practice:</p>
        <ul>
          <li>Paul's Online Math Notes - Calculus II (Series)</li>
          <li>MIT OCW - Problem Sets with Solutions</li>
          <li>Brilliant.org - Calculus Challenges (Series section)</li>
          <li>3Blue1Brown - Essence of Calculus (YouTube series)</li>
        </ul>
      </section>
      
      <section>
        <h3>Advanced Topics</h3>
        <ul>
          <li>Laurent Series and Complex Analysis</li>
          <li>Asymptotic Series</li>
          <li>Fourier Series (as an extension of Taylor series)</li>
          <li>Convergence Acceleration Techniques</li>
          <li>Applications to Differential Equations</li>
        </ul>
      </section>
    </div>
  );
} 