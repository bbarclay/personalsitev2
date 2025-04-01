"use client";

import React from 'react';

export default function ResourcesPanel() {
  return (
    <div className="prose dark:prose-invert max-w-none space-y-6">
      <h2 className="text-2xl font-bold">Learning Resources</h2>
      
      <section>
        <h3>Online Courses</h3>
        <ul>
          <li>Khan Academy - Calculus courses</li>
          <li>MIT OpenCourseWare - Single Variable Calculus</li>
          <li>Coursera - Introduction to Calculus</li>
          <li>edX - Calculus Applied!</li>
        </ul>
      </section>
      
      <section>
        <h3>Recommended Books</h3>
        <ul>
          <li>"Calculus" by James Stewart</li>
          <li>"Calculus: Early Transcendentals" by Thomas' Calculus</li>
          <li>"Calculus Made Easy" by Silvanus P. Thompson</li>
          <li>"Div, Grad, Curl, and All That" by H. M. Schey (for advanced study)</li>
        </ul>
      </section>
      
      <section>
        <h3>Interactive Tools</h3>
        <ul>
          <li>Desmos - Graphing Calculator</li>
          <li>GeoGebra - Interactive Calculus Tools</li>
          <li>Wolfram Alpha - Computational Intelligence</li>
          <li>Symbolab - Step-by-step derivative calculator</li>
        </ul>
      </section>
      
      <section>
        <h3>Practice Problems</h3>
        <p>Master derivatives through consistent practice:</p>
        <ul>
          <li>Paul's Online Math Notes - Calculus I</li>
          <li>MIT OCW - Problem Sets with Solutions</li>
          <li>Brilliant.org - Calculus Challenges</li>
          <li>3Blue1Brown - Essence of Calculus (YouTube series)</li>
        </ul>
      </section>
    </div>
  );
} 