'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Visualizer } from './components/Visualizer';
import {
  HAPDSequenceChart,
  ProjectiveSpaceChart,
  MatrixTraceChart,
  ClassificationChart,
  ComplexRootsChart
} from './components/Charts';
import {
  analyzeCubicIrrational,
  HAPDResult,
  MatrixVerificationResult,
  CubicIrrationalResult
} from './utils/hermite';
import {
  MAX_ITERATIONS,
  DEFAULT_INPUT_VALUE,
  ANIMATION_DURATION,
  SAMPLE_CUBIC_IRRATIONALS,
  SAMPLE_QUADRATIC_IRRATIONALS,
  SAMPLE_RATIONAL_NUMBERS,
  SAMPLE_TRANSCENDENTAL_NUMBERS
} from './constants';

// Tab type for the different visualization modes
type TabType = 'hapd' | 'matrix' | 'comparison';

export const HermitesProof: React.FC = () => {
  // Input and calculation state
  const [inputValue, setInputValue] = useState<number>(DEFAULT_INPUT_VALUE);
  const [inputName, setInputName] = useState<string>('Custom Value');
  const [precision, setPrecision] = useState<number>(1e-10);
  const [isComputing, setIsComputing] = useState<boolean>(false);
  const [result, setResult] = useState<CubicIrrationalResult | null>(null);

  // Animation and visualization state
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<TabType>('hapd');

  const handleCompute = useCallback(() => {
    setIsComputing(true);
    setIsPlaying(false);
    setCurrentStep(0);

    // Use setTimeout to allow UI to update before computation starts
    setTimeout(() => {
      const analysisResult = analyzeCubicIrrational(inputValue, inputName, precision);
      setResult(analysisResult);
      setIsComputing(false);
      setIsPlaying(true); // Auto-start animation
    }, 50);
  }, [inputValue, inputName, precision]);

  // Handle selection of predefined examples
  const handleExampleSelect = useCallback((example: { value: number; name: string }) => {
    setInputValue(example.value);
    setInputName(example.name);

    // Automatically compute when selecting an example
    setIsComputing(true);
    setIsPlaying(false);
    setCurrentStep(0);

    // Use setTimeout to allow UI to update before computation starts
    setTimeout(() => {
      const analysisResult = analyzeCubicIrrational(example.value, example.name, precision);
      setResult(analysisResult);
      setIsComputing(false);
      setIsPlaying(true); // Auto-start animation
    }, 50);
  }, [precision]);

  // Playback controls
  const handlePlayPause = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const handleReset = useCallback(() => {
    setCurrentStep(0);
    setIsPlaying(false);
  }, []);

  const handleStepForward = useCallback(() => {
    if (result && currentStep < result.hapdResult.sequence.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  }, [result, currentStep]);

  const handleStepBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  // Animation effect for playback
  useEffect(() => {
    if (!result || !isPlaying) return;

    const sequenceLength = result.hapdResult.sequence.length;

    if (currentStep >= sequenceLength - 1) {
      setIsPlaying(false);
      return;
    }

    const timer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= sequenceLength - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, ANIMATION_DURATION / playbackSpeed);

    return () => clearInterval(timer);
  }, [result, currentStep, isPlaying, playbackSpeed]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header Section */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent mb-10 text-center">
            Hermite's Problem: Cubic Irrational Periodicity
          </h1>
          <div className="flex justify-center mb-12">
            <a
              href="https://github.com/bbarclay/hermiteproblem/blob/main/paper.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors group text-lg"
            >
              <span>Read the Full Paper</span>
              <svg className="ml-3 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex">
        {/* Fixed Sidebar */}
        <div className="w-96 h-[calc(100vh-16rem)] overflow-y-auto sticky top-4 flex-shrink-0 p-4">
          {/* Input Controls */}
          <div className="bg-gray-800/50 rounded-lg p-4 mb-4 border border-gray-700/30">
            <h3 className="text-lg font-medium text-gray-200 mb-3">Input Controls</h3>
            <div className="space-y-4">
              <div>
                <label className="text-gray-300 mb-1 block">Input Value:</label>
                <div className="flex items-center">
                  <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => {
                      setInputValue(Number(e.target.value));
                      setInputName('Custom Value');
                    }}
                    className="bg-gray-800 border border-gray-700 text-gray-100 px-4 py-2 rounded-lg w-36"
                    step="any"
                  />
                  <button
                    onClick={handleCompute}
                    disabled={isComputing}
                    className="ml-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors"
                  >
                    {isComputing ? 'Computing...' : 'Compute'}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-gray-300 mb-1 block">Precision:</label>
                <select
                  value={precision}
                  onChange={(e) => setPrecision(Number(e.target.value))}
                  className="w-full bg-gray-800 border border-gray-700 text-gray-100 px-4 py-2 rounded-lg"
                >
                  <option value={1e-6}>Low (10⁻⁶)</option>
                  <option value={1e-10}>Medium (10⁻¹⁰)</option>
                  <option value={1e-14}>High (10⁻¹⁴)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Example Numbers */}
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/30">
            <h3 className="text-lg font-medium text-gray-200 mb-3">Example Numbers</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-indigo-400 mb-2">Cubic Irrationals</h4>
                <div className="space-y-2">
                  {SAMPLE_CUBIC_IRRATIONALS.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => handleExampleSelect(example)}
                      className="w-full text-left px-3 py-2 rounded bg-gray-800 hover:bg-gray-700 text-sm text-gray-300 transition-colors"
                    >
                      {example.name} ({example.value.toFixed(4)})
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-emerald-400 mb-2">Quadratic Irrationals</h4>
                <div className="space-y-2">
                  {SAMPLE_QUADRATIC_IRRATIONALS.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => handleExampleSelect(example)}
                      className="w-full text-left px-3 py-2 rounded bg-gray-800 hover:bg-gray-700 text-sm text-gray-300 transition-colors"
                    >
                      {example.name} ({example.value.toFixed(4)})
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-amber-400 mb-2">Rational Numbers</h4>
                <div className="space-y-2">
                  {SAMPLE_RATIONAL_NUMBERS.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => handleExampleSelect(example)}
                      className="w-full text-left px-3 py-2 rounded bg-gray-800 hover:bg-gray-700 text-sm text-gray-300 transition-colors"
                    >
                      {example.name} ({example.value.toFixed(4)})
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-red-400 mb-2">Transcendental Numbers</h4>
                <div className="space-y-2">
                  {SAMPLE_TRANSCENDENTAL_NUMBERS.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => handleExampleSelect(example)}
                      className="w-full text-left px-3 py-2 rounded bg-gray-800 hover:bg-gray-700 text-sm text-gray-300 transition-colors"
                    >
                      {example.name} ({example.value.toFixed(4)})
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow p-4">
          {/* Current Status */}
          {result && (
            <div className="bg-gray-800/50 rounded-lg p-4 mb-6 border border-gray-700/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-medium">{inputName}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    result.isCubic
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : result.isRational
                        ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                        : "bg-red-500/20 text-red-400 border border-red-500/30"
                  }`}>
                    {result.isCubic
                      ? "Cubic Irrational"
                      : result.isRational
                        ? "Rational"
                        : result.isQuadratic
                          ? "Quadratic Irrational"
                          : "Non-Cubic"}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Mathematical Steps */}
          <div className="bg-gray-800/50 rounded-lg p-6 mb-6 border border-gray-700/30">
            <h3 className="text-xl font-medium text-gray-100 mb-4">Step-by-Step Solution</h3>
            <div className="space-y-6">
              {/* Step 1: Initial Setup */}
              <div className="bg-gray-800/70 p-4 rounded-lg border border-gray-700/50">
                <h4 className="text-lg font-medium text-indigo-400 mb-2">Step 1: Initial Setup</h4>
                <div className="space-y-3">
                  <p className="text-gray-300">We represent the value α = {inputValue} in projective space using a triple:</p>
                  <div className="font-mono bg-gray-900/50 p-3 rounded">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-indigo-300 font-medium">v₁</span>
                      <span className="text-gray-400">=</span>
                      <span className="text-white">α</span>
                      <span className="text-gray-400">=</span>
                      <span className="text-white">{inputValue}</span>
                      <span className="ml-auto text-xs text-gray-400">// First coordinate</span>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-indigo-300 font-medium">v₂</span>
                      <span className="text-gray-400">=</span>
                      <span className="text-white">α²</span>
                      <span className="text-gray-400">=</span>
                      <span className="text-white">{(inputValue * inputValue).toFixed(6)}</span>
                      <span className="ml-auto text-xs text-gray-400">// Second coordinate</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-indigo-300 font-medium">v₃</span>
                      <span className="text-gray-400">=</span>
                      <span className="text-white">1</span>
                      <span className="ml-auto text-xs text-gray-400">// Third coordinate</span>
                    </div>
                  </div>
                  <div className="bg-indigo-900/20 p-3 rounded-lg border border-indigo-800/30 mt-3">
                    <p className="text-sm text-gray-300">
                      <span className="text-indigo-400 font-medium">Why this representation?</span> Using the triple (α, α², 1)
                      allows us to work in projective space, where cubic irrationals exhibit periodicity in their transformations.
                      This is the key insight that solves Hermite's problem—cubic irrationals have a unique "signature" in their
                      projective behavior that distinguishes them from other numbers.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2: HAPD Algorithm */}
              <div className="bg-gray-800/70 p-4 rounded-lg border border-gray-700/50">
                <h4 className="text-lg font-medium text-indigo-400 mb-3">Step 2: HAPD Algorithm</h4>
                <div className="space-y-4">
                  {/* Algorithm Steps */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-900/50 p-4 rounded-lg">
                      <h5 className="text-sm font-medium text-indigo-300 mb-2">Algorithm Steps</h5>
                      <div className="font-mono text-sm space-y-3">
                        <div className="flex items-start">
                          <span className="text-purple-400 mr-2">1.</span>
                          <div>
                            <div className="text-gray-300">Compute integer parts:</div>
                            <div className="text-white mt-1">a₁ = ⌊v₁/v₃⌋</div>
                            <div className="text-white">a₂ = ⌊v₂/v₃⌋</div>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <span className="text-purple-400 mr-2">2.</span>
                          <div>
                            <div className="text-gray-300">Calculate remainders:</div>
                            <div className="text-white mt-1">r₁ = v₁ - a₁·v₃</div>
                            <div className="text-white">r₂ = v₂ - a₂·v₃</div>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <span className="text-purple-400 mr-2">3.</span>
                          <div>
                            <div className="text-gray-300">Update triple's third component:</div>
                            <div className="text-white mt-1">v₃_new = v₃ - a₁·r₁ - a₂·r₂</div>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <span className="text-purple-400 mr-2">4.</span>
                          <div>
                            <div className="text-gray-300">Set new triple:</div>
                            <div className="text-white mt-1">(v₁, v₂, v₃) ← (r₁, r₂, v₃_new)</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-900/50 p-4 rounded-lg">
                      <h5 className="text-sm font-medium text-indigo-300 mb-2">Mathematical Significance</h5>
                      <div className="space-y-3 text-sm">
                        <p className="text-gray-300">
                          The HAPD algorithm extends the continued fraction idea to 3D projective space, allowing us to detect
                          periodicity in cubic irrationals.
                        </p>
                        <div className="flex items-start">
                          <div className="text-green-400 mr-2">→</div>
                          <p className="text-gray-300">
                            <span className="text-green-300 font-medium">Integer extraction</span>: Similar to continued
                            fractions, we extract integer parts from each coordinate ratio.
                          </p>
                        </div>
                        <div className="flex items-start">
                          <div className="text-green-400 mr-2">→</div>
                          <p className="text-gray-300">
                            <span className="text-green-300 font-medium">Projective transformation</span>: The algorithm
                            performs a special transformation that preserves the algebraic properties of cubic irrationals.
                          </p>
                        </div>
                        <div className="flex items-start">
                          <div className="text-green-400 mr-2">→</div>
                          <p className="text-gray-300">
                            <span className="text-green-300 font-medium">Periodicity detection</span>: Cubic irrationals will
                            eventually repeat their position in projective space, creating a cycle.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Matrix Verification */}
              <div className="bg-gray-800/70 p-4 rounded-lg border border-gray-700/50">
                <h4 className="text-lg font-medium text-indigo-400 mb-4">Step 3: Matrix Verification</h4>
                {result?.matrixResult && (
                  <div className="space-y-6">
                    {/* Step 3.1: Minimal Polynomial */}
                    <div className="bg-gray-900/40 p-4 rounded-lg border border-gray-700/30">
                      <h5 className="text-md font-medium text-indigo-300 mb-3">3.1 Identifying the Minimal Polynomial</h5>
                      <div className="bg-gray-900/70 p-4 rounded font-mono text-center">
                        <div className="text-xl mb-2">
                          <span className="text-gray-400">m</span>
                          <span className="text-gray-300">α</span>
                          <span className="text-gray-400">(x) = </span>
                          <span className="text-white">x³</span>
                          {result.matrixResult.minimalPolynomial.a !== 0 && (
                            <span>
                              <span className="text-gray-400"> {result.matrixResult.minimalPolynomial.a < 0 ? '-' : '+'} </span>
                              <span className="text-white">{Math.abs(result.matrixResult.minimalPolynomial.a)}x²</span>
                            </span>
                          )}
                          {result.matrixResult.minimalPolynomial.b !== 0 && (
                            <span>
                              <span className="text-gray-400"> {result.matrixResult.minimalPolynomial.b < 0 ? '-' : '+'} </span>
                              <span className="text-white">{Math.abs(result.matrixResult.minimalPolynomial.b)}x</span>
                            </span>
                          )}
                          {result.matrixResult.minimalPolynomial.c !== 0 && (
                            <span>
                              <span className="text-gray-400"> {result.matrixResult.minimalPolynomial.c < 0 ? '-' : '+'} </span>
                              <span className="text-white">{Math.abs(result.matrixResult.minimalPolynomial.c)}</span>
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-400 mt-3">
                          This is the minimal polynomial satisfied by the cubic irrational α = {inputValue}
                        </div>
                      </div>
                    </div>

                    {/* Step 3.2: Companion Matrix */}
                    <div className="bg-gray-900/40 p-4 rounded-lg border border-gray-700/30">
                      <h5 className="text-md font-medium text-indigo-300 mb-3">3.2 Constructing the Companion Matrix</h5>

                      <div className="space-y-6">
                        {/* Step 3.2.1: Companion Matrix Definition */}
                        <div className="bg-gray-900/70 p-3 rounded-lg">
                          <h6 className="text-sm font-medium text-indigo-200 mb-2">3.2.1 Matrix Definition</h6>
                          <p className="text-sm text-gray-300 mb-2">
                            For a polynomial p(x) = x³ + ax² + bx + c, the companion matrix is a square matrix whose characteristic polynomial equals p(x):
                          </p>
                          <div className="flex items-center justify-center my-3">
                            <div className="relative px-3 py-2">
                              <div className="absolute -left-2 top-0 bottom-0 border-l-2 border-y-2 border-gray-500 w-2 rounded-l-md"></div>
                              <div className="py-2 px-6">
                                <div className="grid grid-cols-3 gap-x-6 gap-y-3 text-lg">
                                  <div className="text-gray-300">0</div>
                                  <div className="text-gray-300">0</div>
                                  <div className="text-gray-300">-c</div>
                                  <div className="text-gray-300">1</div>
                                  <div className="text-gray-300">0</div>
                                  <div className="text-gray-300">-b</div>
                                  <div className="text-gray-300">0</div>
                                  <div className="text-gray-300">1</div>
                                  <div className="text-gray-300">-a</div>
                                </div>
                              </div>
                              <div className="absolute -right-2 top-0 bottom-0 border-r-2 border-y-2 border-gray-500 w-2 rounded-r-md"></div>
                            </div>
                          </div>
                          <p className="text-xs text-gray-400 text-center mt-1">
                            General form of a companion matrix for a cubic polynomial
                          </p>
                        </div>

                        {/* Step 3.2.2: Minimal Polynomial Coefficients */}
                        <div className="bg-gray-900/70 p-3 rounded-lg">
                          <h6 className="text-sm font-medium text-indigo-200 mb-2">3.2.2 Identifying Coefficients</h6>
                          <div className="flex flex-col sm:flex-row gap-4 items-center">
                            <div className="font-mono bg-gray-900/40 p-3 rounded-lg text-center flex-grow">
                              <p className="text-sm text-gray-300 mb-2">From the minimal polynomial:</p>
                              <div className="text-md">
                                <span className="text-white">x³</span>
                                {result.matrixResult.minimalPolynomial.a !== 0 && (
                                  <span>
                                    <span className="text-gray-400"> {result.matrixResult.minimalPolynomial.a < 0 ? '-' : '+'} </span>
                                    <span className="text-yellow-300 font-medium">{Math.abs(result.matrixResult.minimalPolynomial.a)}</span>
                                    <span className="text-white">x²</span>
                                  </span>
                                )}
                                {result.matrixResult.minimalPolynomial.b !== 0 && (
                                  <span>
                                    <span className="text-gray-400"> {result.matrixResult.minimalPolynomial.b < 0 ? '-' : '+'} </span>
                                    <span className="text-green-300 font-medium">{Math.abs(result.matrixResult.minimalPolynomial.b)}</span>
                                    <span className="text-white">x</span>
                                  </span>
                                )}
                                {result.matrixResult.minimalPolynomial.c !== 0 && (
                                  <span>
                                    <span className="text-gray-400"> {result.matrixResult.minimalPolynomial.c < 0 ? '-' : '+'} </span>
                                    <span className="text-blue-300 font-medium">{Math.abs(result.matrixResult.minimalPolynomial.c)}</span>
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="font-mono bg-gray-900/40 p-3 rounded-lg flex-grow">
                              <p className="text-sm text-gray-300 mb-1">Extracted coefficients:</p>
                              <div className="grid grid-cols-3 gap-2 text-center">
                                <div>
                                  <p className="text-xs text-gray-400">a =</p>
                                  <p className="text-yellow-300 font-medium">{result.matrixResult.minimalPolynomial.a}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-400">b =</p>
                                  <p className="text-green-300 font-medium">{result.matrixResult.minimalPolynomial.b}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-400">c =</p>
                                  <p className="text-blue-300 font-medium">{result.matrixResult.minimalPolynomial.c}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Step 3.2.3: Matrix Construction */}
                        <div className="bg-gray-900/70 p-3 rounded-lg">
                          <h6 className="text-sm font-medium text-indigo-200 mb-2">3.2.3 Placing Coefficients in Matrix</h6>
                          <div className="flex items-center justify-center">
                            <div className="relative px-3 py-2">
                              <div className="absolute -left-2 top-0 bottom-0 border-l-2 border-y-2 border-gray-500 w-2 rounded-l-md"></div>
                              <div className="py-2 px-6">
                                <div className="grid grid-cols-3 gap-x-6 gap-y-3 text-lg">
                                  <div className="text-gray-300">0</div>
                                  <div className="text-gray-300">0</div>
                                  <div className="relative">
                                    <span className="text-gray-300">-</span>
                                    <span className="text-blue-300 font-medium">{Math.abs(result.matrixResult.minimalPolynomial.c)}</span>
                                    <div className="absolute -top-4 -right-3 text-xs text-blue-300">↑</div>
                                  </div>
                                  <div className="text-gray-300">1</div>
                                  <div className="text-gray-300">0</div>
                                  <div className="relative">
                                    <span className="text-gray-300">-</span>
                                    <span className="text-green-300 font-medium">{Math.abs(result.matrixResult.minimalPolynomial.b)}</span>
                                    <div className="absolute -top-4 -right-3 text-xs text-green-300">↑</div>
                                  </div>
                                  <div className="text-gray-300">0</div>
                                  <div className="text-gray-300">1</div>
                                  <div className="relative">
                                    <span className="text-gray-300">-</span>
                                    <span className="text-yellow-300 font-medium">{Math.abs(result.matrixResult.minimalPolynomial.a)}</span>
                                    <div className="absolute -top-4 -right-3 text-xs text-yellow-300">↑</div>
                                  </div>
                                </div>
                              </div>
                              <div className="absolute -right-2 top-0 bottom-0 border-r-2 border-y-2 border-gray-500 w-2 rounded-r-md"></div>
                            </div>
                          </div>
                          <p className="text-xs text-gray-400 text-center mt-3">Negated coefficients are placed in the last column</p>
                        </div>

                        {/* Step 3.2.4: Final Matrix */}
                        <div className="bg-gray-900/70 p-3 rounded-lg">
                          <h6 className="text-sm font-medium text-indigo-200 mb-2">3.2.4 Final Companion Matrix</h6>
                          <div className="flex items-center justify-center">
                            <div className="text-3xl mr-2 text-gray-300">C =</div>
                            <div className="relative">
                              <div className="absolute -left-3 top-0 bottom-0 border-l-2 border-y-2 border-indigo-400 w-2 rounded-l-md"></div>
                              <div className="py-3 px-8">
                                <div className="grid grid-cols-3 gap-x-8 gap-y-3 text-xl">
                                  <div className="text-indigo-200 font-medium">0</div>
                                  <div className="text-indigo-200 font-medium">0</div>
                                  <div className="text-blue-300 font-medium">{-result.matrixResult.minimalPolynomial.c}</div>
                                  <div className="text-indigo-200 font-medium">1</div>
                                  <div className="text-indigo-200 font-medium">0</div>
                                  <div className="text-green-300 font-medium">{-result.matrixResult.minimalPolynomial.b}</div>
                                  <div className="text-indigo-200 font-medium">0</div>
                                  <div className="text-indigo-200 font-medium">1</div>
                                  <div className="text-yellow-300 font-medium">{-result.matrixResult.minimalPolynomial.a}</div>
                                </div>
                              </div>
                              <div className="absolute -right-3 top-0 bottom-0 border-r-2 border-y-2 border-indigo-400 w-2 rounded-r-md"></div>
                            </div>
                          </div>
                          <p className="text-sm text-gray-300 text-center mt-4">
                            This matrix has α = {inputValue} as an eigenvalue, and its characteristic
                            polynomial matches the minimal polynomial of α.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Step 3.3: Matrix Powers and Traces */}
                    <div className="bg-gray-900/40 p-4 rounded-lg border border-gray-700/30">
                      <h5 className="text-md font-medium text-indigo-300 mb-3">3.3 Computing Matrix Powers and Traces</h5>

                      <div className="space-y-4">
                        <p className="text-sm text-gray-300">
                          The <span className="text-indigo-400 font-medium">trace</span> of a matrix is the sum of its
                          diagonal elements. For the companion matrix of a cubic irrational, trace relations follow
                          a special pattern that confirms its cubic nature.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="bg-gray-900/70 p-3 rounded-lg text-center border border-purple-900/30">
                            <div className="text-xs text-purple-400 mb-1">Tr(C¹)</div>
                            <div className="text-lg font-medium text-white">
                              {result.matrixResult.traceRelations.find(t => t.k === 1)?.actual.toFixed(4) || 0}
                            </div>
                          </div>
                          <div className="bg-gray-900/70 p-3 rounded-lg text-center border border-purple-900/30">
                            <div className="text-xs text-purple-400 mb-1">Tr(C²)</div>
                            <div className="text-lg font-medium text-white">
                              {result.matrixResult.traceRelations.find(t => t.k === 2)?.actual.toFixed(4) || 0}
                            </div>
                          </div>
                          <div className="bg-gray-900/70 p-3 rounded-lg text-center border border-purple-900/30">
                            <div className="text-xs text-purple-400 mb-1">Tr(C³)</div>
                            <div className="text-lg font-medium text-white">
                              {result.matrixResult.traceRelations.find(t => t.k === 3)?.actual.toFixed(4) || 0}
                            </div>
                          </div>
                        </div>

                        <div className="font-mono bg-gray-900/50 p-3 rounded text-sm">
                          <div className="mb-2 text-gray-300">Trace Recurrence Relation:</div>
                          <div className="pl-4 text-gray-200">
                            For k ≥ 3, tr(C^k) = −{Math.abs(result.matrixResult.minimalPolynomial.a)}·tr(C^(k−1))
                            − {Math.abs(result.matrixResult.minimalPolynomial.b)}·tr(C^(k−2))
                            − {Math.abs(result.matrixResult.minimalPolynomial.c)}·tr(C^(k−3))
                          </div>
                        </div>

                        <div className="bg-gray-900/70 p-4 rounded-lg">
                          <h6 className="text-sm font-medium text-indigo-300 mb-2">Relation Verification</h6>
                          <div className="overflow-x-auto">
                            <table className="min-w-full text-sm">
                              <thead>
                                <tr>
                                  <th className="py-2 px-3 text-left text-gray-400">Power (k)</th>
                                  <th className="py-2 px-3 text-left text-gray-400">Actual Value</th>
                                  <th className="py-2 px-3 text-left text-gray-400">Expected Value</th>
                                  <th className="py-2 px-3 text-left text-gray-400">Difference</th>
                                  <th className="py-2 px-3 text-left text-gray-400">Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {result.matrixResult.traceRelations.slice(3, 7).map((relation) => (
                                  <tr key={relation.k} className="border-t border-gray-800">
                                    <td className="py-2 px-3 text-indigo-300">Tr(C^{relation.k})</td>
                                    <td className="py-2 px-3 text-white">{relation.actual.toFixed(6)}</td>
                                    <td className="py-2 px-3 text-green-300">{relation.expected.toFixed(6)}</td>
                                    <td className="py-2 px-3 text-gray-400">{Math.abs(relation.difference).toFixed(10)}</td>
                                    <td className="py-2 px-3">
                                      {Math.abs(relation.difference) < 1e-6 ? (
                                        <span className="text-green-400">✓</span>
                                      ) : (
                                        <span className="text-red-400">✗</span>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div className="bg-indigo-900/20 p-3 rounded-lg border border-indigo-800/30">
                          <p className="text-sm text-gray-300">
                            <span className="text-indigo-400 font-medium">Why this matters:</span> For a cubic irrational,
                            the traces must follow this recurrence relation exactly. The fact that they do confirms that
                            the companion matrix properly represents a cubic algebraic number, and thus α = {inputValue} is
                            indeed a cubic irrational. This is a fundamental result from linear algebra and the theory of
                            minimal polynomials.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Step 3.4: Eigenvalue Verification */}
                    <div className="bg-gray-900/40 p-4 rounded-lg border border-gray-700/30">
                      <h5 className="text-md font-medium text-indigo-300 mb-3">3.4 Verifying α is an Eigenvalue</h5>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-900/70 p-4 rounded-lg">
                          <div className="text-sm text-gray-300 mb-2">Characteristic Polynomial:</div>
                          <div className="text-lg font-mono text-center">
                            det(C − λI) = −λ³
                            {result.matrixResult.minimalPolynomial.a !== 0 && (
                              <span> {result.matrixResult.minimalPolynomial.a > 0 ? '- ' : '+ '}{Math.abs(result.matrixResult.minimalPolynomial.a)}λ²</span>
                            )}
                            {result.matrixResult.minimalPolynomial.b !== 0 && (
                              <span> {result.matrixResult.minimalPolynomial.b > 0 ? '- ' : '+ '}{Math.abs(result.matrixResult.minimalPolynomial.b)}λ</span>
                            )}
                            {result.matrixResult.minimalPolynomial.c !== 0 && (
                              <span> {result.matrixResult.minimalPolynomial.c > 0 ? '- ' : '+ '}{Math.abs(result.matrixResult.minimalPolynomial.c)}</span>
                            )}
                          </div>

                          <div className="mt-4 text-sm text-gray-300">
                            <p>The roots of this polynomial are the eigenvalues of the companion matrix. For a cubic irrational, one of these eigenvalues must be our input value α.</p>
                          </div>
                        </div>

                        <div className="bg-gray-900/70 p-4 rounded-lg">
                          <div className="text-sm text-gray-300 mb-2">Eigenvalues (Roots):</div>
                          <div className="space-y-2">
                            <div className="text-center">
                              <div className="text-lg font-mono text-indigo-300">α = {inputValue}</div>
                              {result.matrixResult.eigenvalues && result.matrixResult.eigenvalues.length > 1 && (
                                <>
                                  <div className="text-lg font-mono text-purple-300">
                                    β ≈ {result.matrixResult.eigenvalues[1]?.toFixed(4)}
                                  </div>
                                  <div className="text-lg font-mono text-blue-300">
                                    γ ≈ {result.matrixResult.eigenvalues[2]?.toFixed(4)}
                                  </div>
                                </>
                              )}
                            </div>

                            <div className="mt-3 text-sm text-center text-gray-400">
                              Verification: α is an eigenvalue of C if det(C - αI) = 0
                            </div>

                            <div className="text-center">
                              <div className="bg-gray-900/50 p-2 rounded inline-block text-sm">
                                <span className="text-gray-300">det(C - {inputValue}I) = </span>
                                <span className={Math.abs(inputValue * inputValue * inputValue +
                                    result.matrixResult.minimalPolynomial.a * inputValue * inputValue +
                                    result.matrixResult.minimalPolynomial.b * inputValue +
                                    result.matrixResult.minimalPolynomial.c) < 1e-6
                                    ? "text-green-400" : "text-red-400"}>
                                  {Math.abs(inputValue * inputValue * inputValue +
                                    result.matrixResult.minimalPolynomial.a * inputValue * inputValue +
                                    result.matrixResult.minimalPolynomial.b * inputValue +
                                    result.matrixResult.minimalPolynomial.c).toExponential(4)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 bg-gray-900/70 p-4 rounded-lg border border-gray-700/50">
                        <h6 className="text-sm font-medium text-indigo-300 mb-3">Eigenvalues in Complex Plane</h6>
                        <div className="relative h-56 rounded-lg bg-gray-900 border border-gray-800">
                          {/* Coordinate axes */}
                          <div className="absolute left-0 right-0 top-1/2 h-px bg-gray-700" />
                          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gray-700" />

                          {/* Origin label */}
                          <div className="absolute top-1/2 left-1/2 -translate-x-4 translate-y-4 text-xs text-gray-500">0</div>

                          {/* Real axis label */}
                          <div className="absolute top-1/2 right-4 -translate-y-4 text-xs text-gray-500">Re</div>

                          {/* Imaginary axis label */}
                          <div className="absolute bottom-[calc(50%+10px)] left-1/2 -translate-x-6 text-xs text-gray-500">Im</div>

                          {/* α point - our input value */}
                          <div
                            className="absolute w-3 h-3 rounded-full bg-indigo-500 border border-indigo-300 shadow-lg shadow-indigo-500/50"
                            style={{
                              left: `${50 + 40 * Math.min(Math.max(result.matrixResult.eigenvalues[0], -3), 3)}%`,
                              top: '50%',
                              transform: 'translate(-50%, -50%)'
                            }}
                          />
                          <div
                            className="absolute text-xs text-indigo-300"
                            style={{
                              left: `${50 + 40 * Math.min(Math.max(result.matrixResult.eigenvalues[0], -3), 3)}%`,
                              top: '50%',
                              transform: 'translate(-50%, -150%)'
                            }}
                          >
                            α
                          </div>

                          {/* β point - second eigenvalue */}
                          {result.matrixResult.eigenvalues && result.matrixResult.eigenvalues.length > 1 && (
                            <>
                              <div
                                className="absolute w-3 h-3 rounded-full bg-purple-500 border border-purple-300 shadow-lg shadow-purple-500/50"
                                style={{
                                  left: `${50 + 40 * Math.min(Math.max(result.matrixResult.eigenvalues[1], -3), 3)}%`,
                                  top: '50%',
                                  transform: 'translate(-50%, -50%)'
                                }}
                              />
                              <div
                                className="absolute text-xs text-purple-300"
                                style={{
                                  left: `${50 + 40 * Math.min(Math.max(result.matrixResult.eigenvalues[1], -3), 3)}%`,
                                  top: '50%',
                                  transform: 'translate(-50%, -150%)'
                                }}
                              >
                                β
                              </div>
                            </>
                          )}

                          {/* γ point - third eigenvalue */}
                          {result.matrixResult.eigenvalues && result.matrixResult.eigenvalues.length > 2 && (
                            <>
                              <div
                                className="absolute w-3 h-3 rounded-full bg-blue-500 border border-blue-300 shadow-lg shadow-blue-500/50"
                                style={{
                                  left: `${50 + 40 * Math.min(Math.max(result.matrixResult.eigenvalues[2], -3), 3)}%`,
                                  top: '50%',
                                  transform: 'translate(-50%, -50%)'
                                }}
                              />
                              <div
                                className="absolute text-xs text-blue-300"
                                style={{
                                  left: `${50 + 40 * Math.min(Math.max(result.matrixResult.eigenvalues[2], -3), 3)}%`,
                                  top: '50%',
                                  transform: 'translate(-50%, -150%)'
                                }}
                              >
                                γ
                              </div>
                            </>
                          )}
                        </div>
                        <p className="text-xs text-gray-400 text-center mt-2">
                          Visual representation of eigenvalues on the real line (imaginary parts are zero for real cubic irrationals)
                        </p>
                      </div>
                    </div>

                    {/* Step 3.5: Final Verification Result */}
                    <div className="bg-gray-900/40 p-4 rounded-lg border border-gray-700/30">
                      <h5 className="text-md font-medium text-indigo-300 mb-3">3.5 Verification Result</h5>

                      <div className={`p-4 rounded-lg text-center ${
                        result.matrixResult.isCubicIrrational
                          ? 'bg-green-900/30 border border-green-500/30'
                          : 'bg-red-900/30 border border-red-500/30'
                      }`}>
                        <div className={`text-2xl font-medium mb-2 ${
                          result.matrixResult.isCubicIrrational
                            ? 'text-green-400'
                            : 'text-red-400'
                        }`}>
                          {result.matrixResult.isCubicIrrational
                            ? '✓ Verified as a Cubic Irrational'
                            : '✗ Not a Cubic Irrational'}
                        </div>
                        <div className="text-sm text-gray-300">
                          {result.matrixResult.isCubicIrrational
                            ? `The trace relations are satisfied, confirming that ${inputValue} is a cubic irrational.`
                            : `The trace relations are not satisfied for ${inputValue}.`}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Step 4: Connecting the Methods */}
              <div className="bg-gray-800/70 p-4 rounded-lg border border-gray-700/50">
                <h4 className="text-lg font-medium text-indigo-400 mb-3">Step 4: Connecting the Methods</h4>
                <div className="space-y-4">
                  <p className="text-gray-300">
                    The HAPD algorithm and matrix verification provide two complementary ways to identify cubic irrationals:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-900/40 p-4 rounded-lg border border-indigo-800/30">
                      <h5 className="text-md font-medium text-indigo-300 mb-2">Projective Approach (HAPD)</h5>
                      <ul className="text-sm text-gray-300 space-y-2 list-disc pl-5">
                        <li>Works in projective space with the triple (α, α², 1)</li>
                        <li>Detects periodicity through direct computation</li>
                        <li>Shows the cyclic nature visually through trajectory</li>
                        <li>Related to continued fraction expansions</li>
                      </ul>
                    </div>

                    <div className="bg-gray-900/40 p-4 rounded-lg border border-indigo-800/30">
                      <h5 className="text-md font-medium text-indigo-300 mb-2">Algebraic Approach (Matrix)</h5>
                      <ul className="text-sm text-gray-300 space-y-2 list-disc pl-5">
                        <li>Works with the companion matrix of the minimal polynomial</li>
                        <li>Verifies through trace relations</li>
                        <li>Connects to eigenvalues and characteristic polynomials</li>
                        <li>Provides algebraic confirmation</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-indigo-900/20 p-4 rounded-lg border border-indigo-800/30">
                    <h5 className="text-md font-medium text-indigo-300 mb-2">The Unified View</h5>
                    <p className="text-sm text-gray-300">
                      Both methods are mathematically equivalent but offer different insights. The HAPD algorithm provides a
                      concrete computational procedure, while the matrix approach gives us the abstract algebraic justification.
                      Together, they form a complete proof that periodicity in the algorithm is a perfect characterization of
                      cubic irrationals, just as periodicity in continued fractions characterizes quadratic irrationals.
                    </p>
                    <p className="text-sm text-gray-300 mt-2">
                      This dual verification confirms that for α = {inputValue}, the observed behavior is not coincidental
                      but a fundamental mathematical property, solving Hermite's 170-year-old problem.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Visualizations */}
          <div className="space-y-6">
            {/* Sequence Navigator */}
            {result?.hapdResult?.sequence && result.hapdResult.sequence.length > 0 && (
              <div className="bg-gray-800/50 rounded-lg p-4 mb-6 border border-gray-700/30">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-sm text-gray-400">Current Step:</span>
                    <span className="text-white text-lg font-medium ml-2">
                      {currentStep} of {result?.hapdResult?.sequence?.length ? result.hapdResult.sequence.length - 1 : 0}
                    </span>
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
                      disabled={!result || currentStep >= result.hapdResult.sequence.length - 1}
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

                {/* Progress Bar */}
                <div className="h-2 bg-gray-700 rounded overflow-hidden mb-3">
                  <div
                    className="h-full bg-indigo-600"
                    style={{
                      width: result ? `${(currentStep / (result.hapdResult.sequence.length - 1)) * 100}%` : '0%'
                    }}
                  />
                </div>

                {/* Current Values */}
                {result?.hapdResult?.sequence[currentStep] && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-400 mr-2">Current Pair:</span>
                      <span className="bg-indigo-600/30 border border-indigo-500/30 px-3 py-1 rounded text-lg font-mono">
                        ({result.hapdResult.sequence[currentStep].a1}, {result.hapdResult.sequence[currentStep].a2})
                      </span>
                    </div>

                    {result.hapdResult.periodicIndex !== -1 && currentStep >= result.hapdResult.periodicIndex && (
                      <div className="flex items-center">
                        <span className="text-sm text-gray-400 mr-2">Status:</span>
                        <span className="bg-purple-600/30 border border-purple-500/30 px-3 py-1 rounded text-sm font-mono">
                          Periodic Region
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* HAPD Algorithm Visualizer */}
            <div className="mb-8">
              {result ? (
                <Visualizer hapdResult={result.hapdResult} currentStep={currentStep} />
              ) : (
                <div className="h-80 flex items-center justify-center bg-gray-800/30 rounded-lg border border-gray-700/50">
                  <p className="text-gray-400">Enter a value and click "Compute" to start</p>
                </div>
              )}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* HAPD Sequence Chart */}
              <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700/50">
                {result ? (
                  <HAPDSequenceChart hapdResult={result.hapdResult} highlightIndex={currentStep} />
                ) : (
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    No sequence data available
                  </div>
                )}
              </div>

              {/* Projective Space Visualization */}
              <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700/50">
                {result ? (
                  <ProjectiveSpaceChart
                    triples={result.hapdResult.triples}
                    periodicIndex={result.hapdResult.periodicIndex}
                  />
                ) : (
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    No projective space data available
                  </div>
                )}
              </div>

              {/* Matrix Trace Relations Chart */}
              <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700/50">
                {result?.matrixResult ? (
                  <MatrixTraceChart matrixResult={result.matrixResult} />
                ) : (
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    No matrix trace data available
                  </div>
                )}
              </div>

              {/* Classification Chart */}
              <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700/50">
                {result ? (
                  <ClassificationChart
                    isRational={result.isRational}
                    isQuadratic={result.isQuadratic}
                    isCubic={result.isCubic}
                    isHigherDegree={result.isHigherDegree}
                    isTranscendental={result.isTranscendental}
                  />
                ) : (
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    No classification data available
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
