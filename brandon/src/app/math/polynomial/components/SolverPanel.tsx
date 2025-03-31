'use client';

import React, { useState } from 'react';
import { Polynomial } from '../types';

export default function SolverPanel() {
  const [polynomialA, setPolynomialA] = useState<Polynomial>({ terms: [] });
  const [polynomialB, setPolynomialB] = useState<Polynomial>({ terms: [] });

  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-4">Polynomial Factorization</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Enter a polynomial to factor it into its simplest form. You can also perform operations between polynomials.
        </p>
      </div>

      {/* Main solver interface will go here */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <p className="text-center text-gray-500 dark:text-gray-400">
          Solver interface coming soon...
        </p>
      </div>
    </div>
  );
}
