import React from 'react';

interface ExplanationPanelProps {
  explanation: string;
}

export default function ExplanationPanel({ explanation }: ExplanationPanelProps) {
  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2>Understanding Quadratic Equations</h2>
        <p>{explanation}</p>
        
        <h3>What is a Quadratic Equation?</h3>
        <p>A quadratic equation is a second-degree polynomial equation in the form:</p>
        <div className="text-center text-xl font-math">
          ax² + bx + c = 0
        </div>
        
        <h3>Key Components</h3>
        <ul>
          <li><strong>a:</strong> The coefficient of x² (must not be zero)</li>
          <li><strong>b:</strong> The coefficient of x</li>
          <li><strong>c:</strong> The constant term</li>
        </ul>

        <h3>Solving Methods</h3>
        <p>There are several methods to solve quadratic equations:</p>
        <ol>
          <li><strong>Factoring:</strong> Express the equation as a product of two binomials</li>
          <li><strong>Quadratic Formula:</strong> Use x = (-b ± √(b² - 4ac)) / (2a)</li>
          <li><strong>Completing the Square:</strong> Rewrite the equation in perfect square form</li>
        </ol>

        <h3>Number of Solutions</h3>
        <p>A quadratic equation can have:</p>
        <ul>
          <li>Two distinct real solutions</li>
          <li>One real solution (repeated root)</li>
          <li>Two complex solutions</li>
        </ul>
      </div>
    </div>
  );
} 