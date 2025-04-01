"use client";

import React from 'react';
import { DerivativeCalculator } from './DerivativeCalculator';

export default function SolverPanel() {
  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold">Derivative Calculator</h2>
        <p>Calculate derivatives of functions with step-by-step solutions.</p>
      </div>
      
      <DerivativeCalculator />
    </div>
  );
} 