import React from 'react';

const ExplanationPanel = () => {
  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold">The Pythagorean Theorem</h2>
        <p>
          The Pythagorean theorem is one of the most fundamental relationships in Euclidean geometry. 
          It states that in a right-angled triangle, the square of the length of the hypotenuse 
          (the side opposite the right angle) is equal to the sum of the squares of the other two sides.
        </p>
        
        <h3 className="text-xl font-medium mt-6">The Formula</h3>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
          <p className="text-center text-lg font-medium">
            a² + b² = c²
          </p>
        </div>
        <p>
          Where:
        </p>
        <ul>
          <li><strong>a</strong> and <strong>b</strong> are the lengths of the two perpendicular sides of the triangle</li>
          <li><strong>c</strong> is the length of the hypotenuse (the longest side)</li>
        </ul>
        
        <h3 className="text-xl font-medium mt-6">Historical Background</h3>
        <p>
          Although the theorem is named after the ancient Greek mathematician Pythagoras (c. 570–495 BCE), 
          evidence suggests that the relationship was known and used by the Babylonians and Indians centuries earlier. 
          Pythagoras (or his students) may have been the first to provide a formal proof of the theorem.
        </p>
        
        <h3 className="text-xl font-medium mt-6">Applications</h3>
        <p>
          The Pythagorean theorem has numerous applications in:
        </p>
        <ul>
          <li>Architecture and construction</li>
          <li>Navigation and GPS</li>
          <li>Physics and engineering</li>
          <li>Computer graphics and game development</li>
          <li>Distance calculations in various coordinate systems</li>
        </ul>
      </div>
      
      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-md border border-yellow-100 dark:border-yellow-800">
        <h4 className="font-medium text-yellow-800 dark:text-yellow-200">Interesting Fact</h4>
        <p className="text-yellow-700 dark:text-yellow-300">
          The Pythagorean theorem has more known proofs than any other mathematical theorem, 
          with over 350 different proofs documented throughout history!
        </p>
      </div>
    </div>
  );
};

export default ExplanationPanel; 