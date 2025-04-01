"use client";

import React from 'react';
import { LimitCalculator } from './LimitCalculator';

export default function SolverPanel() {
  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold">Limit Calculator</h2>
        <p>Calculate limits of functions with step-by-step solutions.</p>
      </div>
      
      <LimitCalculator />
    </div>
  );
} 