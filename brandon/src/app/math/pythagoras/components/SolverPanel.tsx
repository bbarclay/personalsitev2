"use client";

import { useState } from 'react';

export default function SolverPanel({ children }: { children: React.ReactNode }) {
  const [isSolving, setIsSolving] = useState(false);

  return (
    <div className="panel-container bg-white/10 rounded-lg p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Pythagorean Solver</h2>
      <div className="space-y-4">
        {children}
      </div>
      <button 
        className={`mt-4 w-full py-2 rounded-md transition-colors ${
          isSolving 
            ? 'bg-gray-500 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
        disabled={isSolving}
      >
        {isSolving ? 'Calculating...' : 'Solve'}
      </button>
    </div>
  );
}
