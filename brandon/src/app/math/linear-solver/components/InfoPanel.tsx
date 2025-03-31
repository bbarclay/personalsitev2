import React from 'react';

export const InfoPanel = () => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        About the Linear System Solver
      </h3>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        This interactive tool allows you to solve systems of linear equations of the form Ax = b
        using direct methods like Gaussian elimination. You can visualize each step of the solution
        process and understand how the algorithm works.
      </p>
      <p className="text-gray-700 dark:text-gray-300">
        Enter your matrix A and vector b, then click "Solve" to see a step-by-step solution. You can 
        adjust the animation speed, navigate through steps manually, or select from predefined examples.
      </p>
    </div>
  );
}; 