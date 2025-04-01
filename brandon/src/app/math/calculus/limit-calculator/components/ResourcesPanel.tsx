"use client";

import React from 'react';

export default function ResourcesPanel() {
  return (
    <div className="prose dark:prose-invert max-w-none space-y-6">
      <h2 className="text-2xl font-bold">Learning Resources</h2>
      
      <section>
        <h3>Online Courses</h3>
        <ul>
          <li>Khan Academy - Limits and Continuity</li>
          <li>MIT OpenCourseWare - Single Variable Calculus (Limits section)</li>
          <li>Coursera - Introduction to Calculus</li>
          <li>edX - Calculus 1A: Differentiation</li>
        </ul>
      </section>
      
      <section>
        <h3>Recommended Books</h3>
        <ul>
          <li>"Calculus" by James Stewart</li>
          <li>"Calculus: Early Transcendentals" by Jon Rogawski</li>
          <li>"Calculus Made Easy" by Silvanus P. Thompson</li>
          <li>"Principles of Mathematical Analysis" by Walter Rudin (for advanced study)</li>
        </ul>
      </section>
      
      <section>
        <h3>Interactive Tools</h3>
        <ul>
          <li>Desmos - Function graphing and limit visualization</li>
          <li>GeoGebra - Interactive calculus applets</li>
          <li>Wolfram Alpha - Limit computation and analysis</li>
          <li>Symbolab - Step-by-step limit calculator</li>
        </ul>
      </section>
      
      <section>
        <h3>Practice Problems</h3>
        <p>Master limits through consistent practice:</p>
        <ul>
          <li>Paul's Online Math Notes - Calculus I (Limits)</li>
          <li>MIT OCW - Problem Sets with Solutions</li>
          <li>Brilliant.org - Calculus Challenges</li>
          <li>3Blue1Brown - Essence of Calculus (YouTube series)</li>
        </ul>
      </section>
      
      <section>
        <h3>Visual Learning</h3>
        <ul>
          <li>Graphical representations of limits</li>
          <li>Interactive limit demonstrations (epsilon-delta)</li>
          <li>Animations of limit behavior at discontinuities</li>
          <li>Visualizations of limits at infinity</li>
        </ul>
      </section>
    </div>
  );
} 