"use client";

import React from 'react';
import { TaylorSeries } from './TaylorSeries';

export default function SolverPanel() {
  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold">Taylor Series Calculator</h2>
        <p>Calculate Taylor and Maclaurin series expansions with step-by-step solutions.</p>
      </div>
      
      <TaylorSeries />
    </div>
  );
} 