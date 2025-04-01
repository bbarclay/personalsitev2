'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Visualizer } from './components/Visualizer';
import {
  EntropyChart,
  PhaseSpaceChart,
  BitPatternChart,
  TauDistributionChart,
  BitAvalancheChart,
  CompressionWaterfallChart,
  PredecessorTreeChart
} from './components/Charts';
import { computeCollatzSequence } from './utils/collatz';
import { MAX_STEPS, DEFAULT_STARTING_NUMBER, ANIMATION_DURATION } from './constants';

export const CollatzProof: React.FC = () => {
  const [inputNumber, setInputNumber] = useState(DEFAULT_STARTING_NUMBER);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComputing, setIsComputing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [sequence, setSequence] = useState<number[]>([]);
  const [maxTau, setMaxTau] = useState(0);
  const [entropyData, setEntropyData] = useState<{ step: number; entropy: number }[]>([]);
  const [phaseSpaceData, setPhaseSpaceData] = useState<{ x: number; y: number }[]>([]);
  const [bitPatternData, setBitPatternData] = useState<{ step: number; pattern: string }[]>([]);
  const [tauDistributionData, setTauDistributionData] = useState<{ tau: number; count: number }[]>([]);
  const [bitAvalancheData, setBitAvalancheData] = useState<{ original: number; flipped: number; bitPosition: number; hammingDistance: number }[]>([]);
  const [compressionWaterfallData, setCompressionWaterfallData] = useState<{ step: number; expansion: number; compression: number; netChange: number }[]>([]);
  const [predecessorTreeData, setPredecessorTreeData] = useState<{ value: number; predecessors: number; level: number; radius: number }[]>([]);

  const handleCompute = () => {
    setIsComputing(true);
    setIsPlaying(false);
    const result = computeCollatzSequence(inputNumber, MAX_STEPS);
    setSequence(result.sequence);
    setMaxTau(result.maxTau);
    setEntropyData(result.entropyData);
    setPhaseSpaceData(result.phaseSpaceData);
    setBitPatternData(result.bitPatternData);
    setTauDistributionData(result.tauDistributionData);
    setBitAvalancheData(result.bitAvalancheData);
    setCompressionWaterfallData(result.compressionWaterfallData);
    setPredecessorTreeData(result.predecessorTreeData);
    setCurrentStep(0);
    setIsComputing(false);
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const handleStepForward = () => {
    if (currentStep < sequence.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleStepBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  useEffect(() => {
    if (sequence.length > 0 && currentStep < sequence.length - 1 && isPlaying) {
      const timer = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= sequence.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, ANIMATION_DURATION / playbackSpeed);
      return () => clearInterval(timer);
    }
  }, [sequence, currentStep, isPlaying, playbackSpeed]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header Section */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-10 text-center">
            The Collatz Conjecture: A Cryptographic Framework
          </h1>
          <div className="flex justify-center mb-12">
            <a
              href="https://github.com/bbarclay/collatzconjecture/blob/main/paper/main.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors group text-lg"
            >
              <span>Read the Full Paper</span>
              <svg className="ml-3 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
            </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Input Controls */}
        <div className="flex items-center justify-between gap-4 bg-gray-800/50 rounded-lg p-4 mb-6 border border-gray-700/30">
          <div className="flex items-center gap-4">
            <label className="text-gray-300">Starting Number:</label>
              <input
                type="number"
              value={inputNumber}
              onChange={(e) => setInputNumber(Number(e.target.value))}
              className="bg-gray-800 border border-gray-700 text-gray-100 px-4 py-2 rounded-lg w-36"
              min="1"
            />
              <button
              onClick={handleCompute}
              disabled={isComputing}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors"
              >
              {isComputing ? 'Computing...' : 'Compute'}
              </button>
          </div>

          {sequence.length > 0 && (
            <div className="text-sm text-gray-400">
              Sequence Length: <span className="text-white font-medium">{sequence.length}</span>
              {maxTau > 0 && <> • Max τ: <span className="text-white font-medium">{maxTau}</span></>}
            </div>
          )}
        </div>

        {/* Sequence Navigator */}
        {sequence.length > 0 && (
          <div className="bg-gray-800/50 rounded-lg p-4 mb-6 border border-gray-700/30">
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-sm text-gray-400">Step:</span>
                <span className="text-white text-lg font-medium ml-2">{currentStep} of {sequence.length - 1}</span>
              </div>
              <div className="flex items-center gap-1">
          <button
                  onClick={handleStepBack}
                  disabled={currentStep === 0}
                  className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Previous Step"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
          </button>

          <button
                  onClick={handlePlayPause}
                  className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    </svg>
                  )}
          </button>

          <button
                  onClick={handleStepForward}
                  disabled={currentStep >= sequence.length - 1}
                  className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Next Step"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
          </button>

          <button
                  onClick={handleReset}
                  className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700"
                  aria-label="Reset to Beginning"
          >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
          </button>

                <select
                  value={playbackSpeed}
                  onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                  className="bg-gray-800 border border-gray-700 text-gray-100 px-3 py-2 rounded-lg ml-2"
                  aria-label="Playback Speed"
                >
                  <option value={0.5}>0.5x</option>
                  <option value={1}>1x</option>
                  <option value={2}>2x</option>
                  <option value={4}>4x</option>
                </select>
              </div>
            </div>

            {/* Current Value Display */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <span className="text-sm text-gray-400 mr-2">Current Value:</span>
                <span className="bg-blue-600/30 border border-blue-500/30 px-3 py-1 rounded text-lg font-mono">
                  {sequence[currentStep]}
                </span>
            </div>

              {currentStep > 0 && (
                <div className="flex items-center">
                  <span className="text-sm text-gray-400 mr-2">Change:</span>
                  <span className={`px-3 py-1 rounded text-sm font-mono ${
                    sequence[currentStep] > sequence[currentStep - 1]
                      ? 'bg-red-500/20 border border-red-500/30 text-red-300'
                      : 'bg-green-500/20 border border-green-500/30 text-green-300'
                  }`}>
                    {sequence[currentStep] > sequence[currentStep - 1]
                      ? '+' + (sequence[currentStep] - sequence[currentStep - 1])
                      : '-' + (sequence[currentStep - 1] - sequence[currentStep])}
                  </span>
                </div>
              )}
            </div>

            {/* Sequence Progress Bar */}
            <div className="h-2 bg-gray-700 rounded overflow-hidden mb-3">
              <div
                className="h-full bg-blue-600"
                style={{ width: `${(currentStep / (sequence.length - 1)) * 100}%` }}
              />
                </div>

            {/* Sequence Display */}
            <div className="overflow-x-auto">
              <div className="flex gap-1 pb-2 min-w-max">
                {sequence.slice(Math.max(0, currentStep - 10), currentStep + 11).map((num, idx) => {
                  const actualIdx = Math.max(0, currentStep - 10) + idx;
                  return (
                    <button
                      key={actualIdx}
                      onClick={() => setCurrentStep(actualIdx)}
                      className={`px-2 py-1 text-xs rounded transition-colors ${
                        actualIdx === currentStep
                          ? 'bg-blue-600 text-white'
                          : actualIdx < currentStep
                          ? 'bg-gray-700/70 hover:bg-gray-700 text-gray-300'
                          : 'bg-gray-800/40 text-gray-500'
                      }`}
                    >
                      {num}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {sequence.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Main Visualizations */}
            <div className="bg-gray-800/50 p-4 rounded-lg shadow-lg border border-gray-700/30">
              <h3 className="text-xl font-semibold mb-3 text-blue-400">Tau Visualization</h3>
              <Visualizer currentStep={currentStep} sequence={sequence} />
                  </div>

            <div className="bg-gray-800/50 p-4 rounded-lg shadow-lg border border-gray-700/30">
              <h3 className="text-xl font-semibold mb-3 text-blue-400">Phase Space</h3>
              <PhaseSpaceChart data={phaseSpaceData.slice(0, currentStep + 1)} />
                </div>

            <div className="bg-gray-800/50 p-4 rounded-lg shadow-lg border border-gray-700/30">
              <h3 className="text-xl font-semibold mb-3 text-blue-400">Entropy Analysis</h3>
              <EntropyChart data={entropyData.slice(0, currentStep + 1)} />
                  </div>

            <div className="bg-gray-800/50 p-4 rounded-lg shadow-lg border border-gray-700/30">
              <h3 className="text-xl font-semibold mb-3 text-blue-400">Bit Pattern Analysis</h3>
              <BitPatternChart data={bitPatternData.slice(0, currentStep + 1)} />
                </div>

            <div className="col-span-1 md:col-span-2 bg-gray-800/50 p-4 rounded-lg shadow-lg border border-gray-700/30">
              <h3 className="text-xl font-semibold mb-3 text-blue-400">Tau Distribution</h3>
              <TauDistributionChart data={tauDistributionData} />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-xl text-gray-400 mb-4">Enter a starting number and click "Compute" to begin</p>
            <svg className="w-20 h-20 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
        )}

        {sequence.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 mt-12 mb-12">
            <div className="border-t border-gray-800 pt-8 mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-6">
                Advanced Visualizations: Cryptographic Framework
              </h2>
              <p className="text-gray-400 mb-8">
                These visualizations demonstrate the key mathematical insights from my paper, showing why the Collatz function behaves like a cryptographic hash function and how this ensures global convergence.
                    </p>
                  </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-800/50 p-6 rounded-lg shadow-lg border border-gray-700/30">
                <h3 className="text-xl font-semibold mb-3 text-blue-400">Avalanche Effect</h3>
                <BitAvalancheChart data={bitAvalancheData} />
                </div>

              <div className="bg-gray-800/50 p-6 rounded-lg shadow-lg border border-gray-700/30">
                <h3 className="text-xl font-semibold mb-3 text-blue-400">Compression vs Expansion</h3>
                <CompressionWaterfallChart data={compressionWaterfallData} />
                </div>

              <div className="col-span-1 lg:col-span-2 bg-gray-800/50 p-6 rounded-lg shadow-lg border border-gray-700/30">
                <h3 className="text-xl font-semibold mb-3 text-blue-400">Predecessor Tree Growth</h3>
                <PredecessorTreeChart
                  data={predecessorTreeData.map(item => ({
                    ...item,
                    levelLabel: `Level ${item.level}`,
                    nameWithCount: `${item.value} (${item.predecessors} predecessors)`
                  }))}
                />
              </div>
            </div>
          </div>
        )}

        {/* Abstract Section (moved to bottom) */}
        <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/30">
          <h2 className="text-2xl font-semibold mb-4 text-blue-400">Abstract</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            I present a rigorous proof of the Collatz Conjecture by demonstrating that its three-phase
            transformation—expansion, mixing, and compression—induces ergodic behavior and systematic
            entropy reduction, ensuring global convergence.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/30">
              <h3 className="font-semibold text-blue-400 mb-2">Cryptographic Framework</h3>
              <p className="text-gray-400">Shows that the Collatz function's one-way nature and avalanche effects preclude cycles through exponential predecessor growth</p>
                  </div>
            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/30">
              <h3 className="font-semibold text-blue-400 mb-2">Measure Theory</h3>
              <p className="text-gray-400">Establishes ergodic-like properties and proves that the τ-distribution follows a geometric law with error term O(n⁻¹/²)</p>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/30">
              <h3 className="font-semibold text-blue-400 mb-2">Information Theory</h3>
              <p className="text-gray-400">Demonstrates that the expected entropy change per step is strictly negative, forcing eventual descent</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
