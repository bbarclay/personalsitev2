import React from 'react';

export const InfoPanel = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        The Pythagorean Theorem is a fundamental principle in geometry that describes the relationship 
        between the three sides of a right triangle.
      </p>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Named after the ancient Greek mathematician Pythagoras, the theorem states that in a right triangle, 
        the square of the length of the hypotenuse (the side opposite the right angle) is equal to the sum 
        of the squares of the other two sides.
      </p>
      <p className="text-gray-700 dark:text-gray-300">
        Use this interactive tool to calculate unknown sides of right triangles, visualize the relationship,
        and explore real-world applications of this powerful mathematical principle.
      </p>
    </div>
  );
}; 