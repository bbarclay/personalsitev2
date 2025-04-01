"use client";

import React from 'react';
import { IntegralCalculator } from './IntegralCalculator';

export default function SolverPanel() {
  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold">Integral Calculator</h2>
        <p>Calculate integrals of functions with step-by-step solutions.</p>
      </div>
      
      <IntegralCalculator />
    </div>
  );
} 