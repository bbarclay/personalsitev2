'use client';

import React, { useEffect, useState } from 'react';
import { HAPDResult } from '../utils/hermite';
import { COLORS } from '../constants';

interface VisualizerProps {
  hapdResult: HAPDResult;
  currentStep: number;
}

export const Visualizer: React.FC<VisualizerProps> = ({ hapdResult, currentStep }) => {
  const [showDetailedWork, setShowDetailedWork] = useState(true);

  const currentPair = hapdResult?.sequence?.[currentStep];
  const currentTriple = hapdResult?.triples?.[currentStep];
  const nextTriple = hapdResult?.triples?.[currentStep + 1];

  if (!currentPair || !currentTriple) {
    return (
      <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/30">
        <p className="text-gray-400">No data available for current step</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/30">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-100">HAPD Algorithm: Step {currentStep + 1}</h3>
        <div className="flex items-center">
          <button
            className={`px-3 py-1 rounded-lg text-sm mr-2
              ${showDetailedWork
                ? 'bg-indigo-600/70 text-white'
                : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'}`}
            onClick={() => setShowDetailedWork(true)}
          >
            Detailed Work
          </button>
          <button
            className={`px-3 py-1 rounded-lg text-sm
              ${!showDetailedWork
                ? 'bg-indigo-600/70 text-white'
                : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'}`}
            onClick={() => setShowDetailedWork(false)}
          >
            Summary
          </button>
        </div>
      </div>

      {/* Current state */}
      <div className="bg-gray-800/70 p-4 rounded-lg mb-4 border border-gray-700/50">
        <h4 className="text-md font-medium text-indigo-400 mb-2">Current State</h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-900/50 p-3 rounded">
            <p className="text-sm text-gray-400 mb-1">v₁ value:</p>
            <p className="text-lg font-mono text-white">{currentTriple.v1.toFixed(6)}</p>
          </div>
          <div className="bg-gray-900/50 p-3 rounded">
            <p className="text-sm text-gray-400 mb-1">v₂ value:</p>
            <p className="text-lg font-mono text-white">{currentTriple.v2.toFixed(6)}</p>
          </div>
          <div className="bg-gray-900/50 p-3 rounded">
            <p className="text-sm text-gray-400 mb-1">v₃ value:</p>
            <p className="text-lg font-mono text-white">{currentTriple.v3.toFixed(6)}</p>
          </div>
        </div>
      </div>

      {/* Calculation steps */}
      {showDetailedWork ? (
        <div className="bg-gray-800/70 p-4 rounded-lg mb-4 border border-gray-700/50">
          <h4 className="text-md font-medium text-indigo-400 mb-3">Calculation Details</h4>

          <div className="space-y-4">
            {/* Step 1: Integer parts */}
            <div className="bg-gray-900/50 p-3 rounded">
              <p className="text-sm text-gray-300 mb-2">Step 1: Calculate integer parts</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-400">a₁ = ⌊v₁/v₃⌋</p>
                  <p className="text-sm font-mono mt-1">
                    = ⌊{currentTriple.v1.toFixed(6)} / {currentTriple.v3.toFixed(6)}⌋
                  </p>
                  <p className="text-sm font-mono mt-1">
                    = ⌊{(currentTriple.v1 / currentTriple.v3).toFixed(6)}⌋
                  </p>
                  <p className="text-lg font-mono mt-1 text-indigo-400">
                    = {currentPair.a1}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">a₂ = ⌊v₂/v₃⌋</p>
                  <p className="text-sm font-mono mt-1">
                    = ⌊{currentTriple.v2.toFixed(6)} / {currentTriple.v3.toFixed(6)}⌋
                  </p>
                  <p className="text-sm font-mono mt-1">
                    = ⌊{(currentTriple.v2 / currentTriple.v3).toFixed(6)}⌋
                  </p>
                  <p className="text-lg font-mono mt-1 text-indigo-400">
                    = {currentPair.a2}
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2: Remainders */}
            <div className="bg-gray-900/50 p-3 rounded">
              <p className="text-sm text-gray-300 mb-2">Step 2: Calculate remainders</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-400">r₁ = v₁ - a₁·v₃</p>
                  <p className="text-sm font-mono mt-1">
                    = {currentTriple.v1.toFixed(6)} - {currentPair.a1} · {currentTriple.v3.toFixed(6)}
                  </p>
                  <p className="text-sm font-mono mt-1">
                    = {currentTriple.v1.toFixed(6)} - {(currentPair.a1 * currentTriple.v3).toFixed(6)}
                  </p>
                  <p className="text-sm font-mono mt-1 text-indigo-400">
                    = {(currentTriple.v1 - currentPair.a1 * currentTriple.v3).toFixed(6)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">r₂ = v₂ - a₂·v₃</p>
                  <p className="text-sm font-mono mt-1">
                    = {currentTriple.v2.toFixed(6)} - {currentPair.a2} · {currentTriple.v3.toFixed(6)}
                  </p>
                  <p className="text-sm font-mono mt-1">
                    = {currentTriple.v2.toFixed(6)} - {(currentPair.a2 * currentTriple.v3).toFixed(6)}
                  </p>
                  <p className="text-sm font-mono mt-1 text-indigo-400">
                    = {(currentTriple.v2 - currentPair.a2 * currentTriple.v3).toFixed(6)}
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3: New v₃ */}
            {nextTriple && (
              <div className="bg-gray-900/50 p-3 rounded">
                <p className="text-sm text-gray-300 mb-2">Step 3: Calculate next v₃</p>
                <p className="text-xs text-gray-400">v₃_new = v₃ - a₁·r₁ - a₂·r₂</p>
                <p className="text-sm font-mono mt-1">
                  = {currentTriple.v3.toFixed(6)} - {currentPair.a1} · {(currentTriple.v1 - currentPair.a1 * currentTriple.v3).toFixed(6)} - {currentPair.a2} · {(currentTriple.v2 - currentPair.a2 * currentTriple.v3).toFixed(6)}
                </p>
                <p className="text-sm font-mono mt-1">
                  = {currentTriple.v3.toFixed(6)} - {(currentPair.a1 * (currentTriple.v1 - currentPair.a1 * currentTriple.v3)).toFixed(6)} - {(currentPair.a2 * (currentTriple.v2 - currentPair.a2 * currentTriple.v3)).toFixed(6)}
                </p>
                <p className="text-lg font-mono mt-1 text-indigo-400">
                  = {nextTriple.v3.toFixed(6)}
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-gray-800/70 p-4 rounded-lg mb-4 border border-gray-700/50">
          <h4 className="text-md font-medium text-indigo-400 mb-3">Summary</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-900/50 p-3 rounded">
              <p className="text-sm text-gray-400 mb-1">Calculated Integer Parts:</p>
              <p className="text-xl font-mono text-white">(a₁, a₂) = ({currentPair.a1}, {currentPair.a2})</p>
            </div>
            {nextTriple && (
              <div className="bg-gray-900/50 p-3 rounded">
                <p className="text-sm text-gray-400 mb-1">Next Step Values:</p>
                <p className="text-sm font-mono text-white">v₁_next = {nextTriple.v1.toFixed(6)}</p>
                <p className="text-sm font-mono text-white">v₂_next = {nextTriple.v2.toFixed(6)}</p>
                <p className="text-sm font-mono text-white">v₃_next = {nextTriple.v3.toFixed(6)}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Periodicity status */}
      <div className="bg-gray-800/70 p-4 rounded-lg border border-gray-700/50">
        <h4 className="text-md font-medium text-indigo-400 mb-2">Algorithm Status</h4>
        <div className="bg-gray-900/50 p-3 rounded">
          {hapdResult.periodicIndex !== -1 && currentStep >= hapdResult.periodicIndex ? (
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <p className="text-green-400">
                <span className="font-medium">Periodic behavior detected: </span>
                <span className="text-gray-300">
                  Period length: {hapdResult.periodLength},
                  Pre-period length: {hapdResult.preperiodLength}
                </span>
              </p>
            </div>
          ) : currentStep < hapdResult.sequence.length - 1 ? (
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <p className="text-yellow-400">
                <span className="font-medium">Searching for periodicity: </span>
                <span className="text-gray-300">
                  {currentStep + 1} of {hapdResult.sequence.length} iterations
                </span>
              </p>
            </div>
          ) : (
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <p className="text-red-400">
                <span className="font-medium">No periodicity detected </span>
                <span className="text-gray-300">
                  after {hapdResult.sequence.length} iterations
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
