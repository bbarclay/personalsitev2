import React from 'react';
import Link from 'next/link';

export default function ResourcesPanel() {
  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2>Learning Resources</h2>
        
        <h3>Related Tools</h3>
        <ul>
          <li>
            <Link href="/math/linear-solver" className="text-blue-600 dark:text-blue-400 hover:underline">
              Linear Equation Solver
            </Link>
            - Solve systems of linear equations
          </li>
          <li>
            <Link href="/math/polynomial" className="text-blue-600 dark:text-blue-400 hover:underline">
              Polynomial Solver
            </Link>
            - Solve higher-degree polynomial equations
          </li>
        </ul>

        <h3>External Resources</h3>
        <ul>
          <li>
            <a href="https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:quadratic-functions-equations" 
               target="_blank" 
               rel="noopener noreferrer"
               className="text-blue-600 dark:text-blue-400 hover:underline">
              Khan Academy - Quadratic Equations
            </a>
            - Comprehensive video tutorials and practice problems
          </li>
          <li>
            <a href="https://www.mathsisfun.com/algebra/quadratic-equation.html" 
               target="_blank" 
               rel="noopener noreferrer"
               className="text-blue-600 dark:text-blue-400 hover:underline">
              Math is Fun - Quadratic Equations
            </a>
            - Interactive explanations and examples
          </li>
        </ul>

        <h3>Practice Problems</h3>
        <ul>
          <li>Basic quadratic equations with real solutions</li>
          <li>Complex number solutions</li>
          <li>Word problems involving quadratic equations</li>
          <li>Applications in physics and engineering</li>
        </ul>

        <h3>Further Reading</h3>
        <ul>
          <li>History of quadratic equations</li>
          <li>Advanced solving techniques</li>
          <li>Connection to other mathematical concepts</li>
          <li>Modern applications and developments</li>
        </ul>
      </div>
    </div>
  );
} 