'use client';

import React from 'react';
import { Card } from '@/components/ui/card';

export default function ExplanationPanel() {
  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Understanding the Pythagorean Theorem</h2>
      
      <Card className="p-4">
        <h3 className="text-xl font-semibold mb-3">What is the Pythagorean Theorem?</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          The Pythagorean theorem states that in a right triangle, the square of the length of the hypotenuse (c) 
          equals the sum of squares of the lengths of the other two sides (a and b). This is expressed as:
        </p>
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center mb-4">
          <p className="text-xl font-mono">a² + b² = c²</p>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="text-xl font-semibold mb-3">Key Terms</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li><strong>Right Triangle:</strong> A triangle with one 90-degree angle</li>
          <li><strong>Hypotenuse:</strong> The longest side of a right triangle, opposite to the right angle</li>
          <li><strong>Legs:</strong> The other two sides of the right triangle that form the right angle</li>
        </ul>
      </Card>

      <Card className="p-4">
        <h3 className="text-xl font-semibold mb-3">How to Use</h3>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>Enter any two known sides of your right triangle</li>
          <li>Leave the unknown side empty</li>
          <li>Click "Calculate Missing Side" to find the length of the unknown side</li>
        </ol>
      </Card>

      <Card className="p-4">
        <h3 className="text-xl font-semibold mb-3">Common Examples</h3>
        <div className="space-y-2 text-gray-700 dark:text-gray-300">
          <p><strong>3-4-5 Triangle:</strong> One of the most common right triangles where:</p>
          <ul className="list-disc list-inside ml-4">
            <li>a = 3</li>
            <li>b = 4</li>
            <li>c = 5</li>
            <li>3² + 4² = 5² (9 + 16 = 25)</li>
          </ul>
        </div>
      </Card>
    </div>
  );
} 