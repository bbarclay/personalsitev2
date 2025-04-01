import React from 'react';

export const InfoPanel = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        The Riemann Hypothesis is one of the most important unsolved problems in mathematics. 
        It concerns the distribution of prime numbers and has deep connections to various areas of mathematics.
      </p>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Formulated by Bernhard Riemann in 1859, the hypothesis states that all non-trivial zeros of the 
        Riemann zeta function have a real part equal to 1/2. This property, if proven, would provide 
        insights into the distribution of prime numbers.
      </p>
      <p className="text-gray-700 dark:text-gray-300">
        Use this interactive tool to explore the zeta function, visualize its zeros, and 
        understand the connections to prime number distribution.
      </p>
    </div>
  );
};
