import React from 'react';
import Link from 'next/link';

export default function ResourcesPanel() {
  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2>Resources for Collatz Conjecture</h2>
        
        <h3>Related Math Tools</h3>
        <ul>
          <li><Link href="/math/number-theory">Number Theory Tools</Link></li>
          <li><Link href="/math/sequence-calculator">Sequence Calculator</Link></li>
        </ul>
        
        <h3>Online Resources</h3>
        <ul>
          <li>
            <a 
              href="https://en.wikipedia.org/wiki/Collatz_conjecture" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Wikipedia: Collatz Conjecture
            </a>
          </li>
          <li>
            <a 
              href="https://mathworld.wolfram.com/CollatzProblem.html" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Wolfram MathWorld: Collatz Problem
            </a>
          </li>
          <li>
            <a 
              href="https://oeis.org/A006577" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              OEIS: Number of Steps to Reach 1 in Collatz Problem
            </a>
          </li>
        </ul>
        
        <h3>Books & Publications</h3>
        <ul>
          <li>"The Ultimate Challenge: The 3x+1 Problem" by Jeffrey C. Lagarias</li>
          <li>"Unsolved Problems in Number Theory" by Richard K. Guy</li>
        </ul>
        
        <h3>Videos</h3>
        <ul>
          <li>
            <a 
              href="https://www.youtube.com/watch?v=5mFpVDpKX70" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              3Blue1Brown: The Simplest Math Problem No One Can Solve
            </a>
          </li>
          <li>
            <a 
              href="https://www.youtube.com/watch?v=094y1Z2wpJg" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Veritasium: This Problem Broke Math
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
} 