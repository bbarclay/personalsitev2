"use client";

import React, { useState } from 'react';
import { EquationSolver } from './EquationSolver';

export default function SolverPanel() {
  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold">Equation Solver</h2>
        <p>Solve various types of equations with step-by-step solutions.</p>
      </div>
      
      <EquationSolver />
    </div>
  );
} 