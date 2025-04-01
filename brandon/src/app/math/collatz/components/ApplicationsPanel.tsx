import React from 'react';

export default function ApplicationsPanel() {
  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2>Applications of the Collatz Conjecture</h2>
        
        <h3>Pure Mathematics</h3>
        <p>
          The Collatz conjecture remains one of the most famous unsolved problems in mathematics. 
          Despite its simple formulation, a complete proof has eluded mathematicians for decades.
        </p>
        
        <h3>Computer Science</h3>
        <p>
          The Collatz sequence serves as an interesting test case for algorithms and computational methods:
        </p>
        <ul>
          <li>Used as a benchmark for optimization techniques</li>
          <li>Studied in the context of computational complexity theory</li>
          <li>Applied in pseudorandom number generation</li>
        </ul>
        
        <h3>Education</h3>
        <p>
          The Collatz conjecture is an excellent educational tool because it:
        </p>
        <ul>
          <li>Introduces students to recursive algorithms</li>
          <li>Demonstrates how simple rules can create complex behavior</li>
          <li>Illustrates the concept of mathematical conjectures</li>
          <li>Encourages experimentation with patterns and sequences</li>
        </ul>
        
        <h3>Recreational Mathematics</h3>
        <p>
          Due to its accessibility, the Collatz conjecture has become popular in recreational mathematics,
          with enthusiasts exploring properties of the sequence and looking for patterns.
        </p>
      </div>
    </div>
  );
} 