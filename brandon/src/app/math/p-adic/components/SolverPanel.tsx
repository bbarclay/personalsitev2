"use client";

import React from 'react';
import PAdicExpansion from './PAdicExpansion';
import NormCalculator from './NormCalculator';

export default function SolverPanel() {
  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold">P-adic Number Calculator</h2>
        <p>
          Explore the world of p-adic numbers with this calculator. P-adic numbers are an extension of the rational 
          numbers with a different notion of distance, offering insights into number theory and algebra.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-xl font-medium mb-4">P-adic Expansion</h3>
          <PAdicExpansion />
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-xl font-medium mb-4">P-adic Norm Calculator</h3>
          <NormCalculator />
        </div>
      </div>
    </div>
  );
} 