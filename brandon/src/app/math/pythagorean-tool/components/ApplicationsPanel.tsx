import React from 'react';

const ApplicationsPanel = () => {
  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold">Applications of the Pythagorean Theorem</h2>
        <p>
          The Pythagorean theorem is not just a mathematical curiosity; it has wide-ranging practical applications
          across many fields. Here are some of the most important real-world uses:
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-300">
              🏗️
            </div>
            <h3 className="text-lg font-medium ml-3">Architecture & Construction</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Used to ensure corners are perfectly square (90 degrees) by measuring three points and verifying that they form a right triangle.
            The 3-4-5 rule is a common application in building to create right angles.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center text-green-600 dark:text-green-300">
              🧭
            </div>
            <h3 className="text-lg font-medium ml-3">Navigation & GPS</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Used to calculate distances between coordinates on a map. GPS systems use the theorem to determine your position 
            based on distances from satellites.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center text-purple-600 dark:text-purple-300">
              🎮
            </div>
            <h3 className="text-lg font-medium ml-3">Computer Graphics</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Used in rendering 3D graphics, calculating distances between points in space, collision detection in video games,
            and determining line-of-sight in virtual environments.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center text-red-600 dark:text-red-300">
              🔍
            </div>
            <h3 className="text-lg font-medium ml-3">Physics & Engineering</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Used to calculate vector components, resolve forces, analyze electrical circuits, and solve problems
            involving velocity, acceleration, and displacement.
          </p>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mt-6">
        <h3 className="text-xl font-medium mb-4">Example: Distance Calculation</h3>
        <p className="mb-4">
          To find the direct distance between two points in a 2D coordinate system:
        </p>
        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
          <p className="font-mono">
            distance = √[(x₂ - x₁)² + (y₂ - y₁)²]
          </p>
        </div>
        <p className="mt-4">
          This formula is a direct application of the Pythagorean theorem, where the differences in x and y coordinates
          form the two perpendicular sides of a right triangle.
        </p>
      </div>
    </div>
  );
};

export default ApplicationsPanel; 