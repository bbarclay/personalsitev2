import React from 'react';

export default function MathPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Mathematics</h1>
      <p className="text-lg mb-8">
        Welcome to the Math section. Here you'll find various mathematical concepts and formulas.
      </p>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Mathematical Formulas</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-medium mb-2">Pythagorean Theorem</h3>
            <p className="text-lg">
              \(a^2 + b^2 = c^2\)
            </p>
            <p className="mt-2">
              In a right triangle, the square of the length of the hypotenuse equals the sum of squares of the other two sides.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-2">Quadratic Formula</h3>
            <p className="text-lg">
              \(x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}\)
            </p>
            <p className="mt-2">
              The solutions to a quadratic equation of the form ax² + bx + c = 0.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-2">Euler's Identity</h3>
            <p className="text-lg">
              \(e^{i\pi} + 1 = 0\)
            </p>
            <p className="mt-2">
              A beautiful equation that combines five fundamental mathematical constants.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <a href="/" className="text-blue-600 hover:underline">
          ← Back to Home
        </a>
      </div>
    </div>
  );
} 