'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { Alert, AlertDescription } from '@components/ui/alert';
import {
  Sparkles,
  Info,
  ZoomIn,
  ZoomOut,
  RefreshCcw,
  Activity,
  Clock,
  Binary
} from 'lucide-react';

const FibonacciExplorer: React.FC = () => {
  const [terms, setTerms] = useState(10);
  const [showBinary, setShowBinary] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1000);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentAnimatedTerm, setCurrentAnimatedTerm] = useState(2);
  const [showInfo, setShowInfo] = useState(true);
  const [zoom, setZoom] = useState(1);

  const sequence = useMemo(() => {
    const seq = [0, 1];
    for (let i = 2; i < terms; i++) {
      seq.push(seq[i - 1] + seq[i - 2]);
    }
    return seq;
  }, [terms]);

  const chartData = useMemo(() =>
    sequence.map((value, index) => ({
      term: index + 1,
      value,
      binary: value.toString(2)
    }))
    , [sequence]);

  const goldenRatio = sequence.length > 1
    ? sequence[sequence.length - 1] / sequence[sequence.length - 2]
    : null;

  const perfectGoldenRatio = (1 + Math.sqrt(5)) / 2;
  const goldenRatioAccuracy = goldenRatio
    ? ((1 - Math.abs(goldenRatio - perfectGoldenRatio) / perfectGoldenRatio) * 100).toFixed(4)
    : null;

  useEffect(() => {
    if (isAnimating && currentAnimatedTerm < terms) {
      const timer = setTimeout(() => {
        setCurrentAnimatedTerm(prev => prev + 1);
      }, animationSpeed);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
      setCurrentAnimatedTerm(2);
    }
  }, [isAnimating, currentAnimatedTerm, terms, animationSpeed]);

  const startAnimation = () => {
    setCurrentAnimatedTerm(2);
    setIsAnimating(true);
  };

  // Update chart colors to use specific colors instead of CSS variables
  const chartConfig = {
    gridColor: "rgba(156, 163, 175, 0.2)",
    axisColor: "rgba(156, 163, 175, 0.7)",
    tooltipBackground: "#1f2937",
    tooltipBorder: "#374151",
    tooltipTextColor: "#f3f4f6"
  } as const;

  return (
    <div className="p-8 min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-yellow-500" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
              Fibonacci Explorer
            </h1>
          </div>
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 backdrop-blur-sm transition-all"
          >
            <Info className="w-5 h-5 text-gray-300" />
          </button>
        </div>

        {/* Info Alert */}
        {showInfo && (
          <Alert className="bg-gray-800/50 backdrop-blur-sm border border-gray-700">
            <AlertDescription className="flex items-center gap-2 text-gray-300">
              <Info className="w-4 h-4" />
              The Fibonacci sequence is a series where each number is the sum of the previous two.
              As the sequence progresses, the ratio between consecutive numbers approaches the Golden Ratio (φ ≈ 1.618034).
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
              <Activity className="w-5 h-5 text-purple-400" />
              Sequence Controls
            </h2>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-300">Number of Terms</label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="2"
                    max="40"
                    value={terms}
                    onChange={(e) => setTerms(parseInt(e.target.value))}
                    className="w-full accent-purple-500 bg-gray-700"
                  />
                  <span className="text-sm font-mono w-12 text-gray-300">{terms}</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300">Animation Speed (ms)</label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="100"
                    max="2000"
                    step="100"
                    value={animationSpeed}
                    onChange={(e) => setAnimationSpeed(parseInt(e.target.value))}
                    className="w-full accent-purple-500 bg-gray-700"
                  />
                  <span className="text-sm font-mono w-16 text-gray-300">{animationSpeed}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={startAnimation}
                  disabled={isAnimating}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg
                    bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700
                    text-white transition-all disabled:opacity-50"
                >
                  <Clock className="w-4 h-4" />
                  Animate Sequence
                </button>

                <button
                  onClick={() => setShowBinary(!showBinary)}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg
                    bg-gray-700 hover:bg-gray-600 text-gray-300 transition-all"
                >
                  <Binary className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setZoom(z => Math.max(0.5, z - 0.5))}
                  className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all"
                >
                  <ZoomOut className="w-4 h-4 text-gray-300" />
                </button>
                <div className="text-sm font-medium text-gray-300">Zoom: {zoom}x</div>
                <button
                  onClick={() => setZoom(z => Math.min(2, z + 0.5))}
                  className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all"
                >
                  <ZoomIn className="w-4 h-4 text-gray-300" />
                </button>
              </div>
            </div>
          </div>

          {/* Analysis */}
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
            <h2 className="text-xl font-semibold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
              Sequence Analysis
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-sm font-medium mb-1 text-gray-300">Last Term</div>
                <div className="text-2xl font-mono font-semibold text-gray-200">
                  {sequence[sequence.length - 1].toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1 text-gray-300">Golden Ratio (φ)</div>
                <div className="text-2xl font-mono font-semibold text-gray-200">
                  {goldenRatio ? goldenRatio.toFixed(6) : 'N/A'}
                </div>
                <div className="text-sm text-green-500 mt-1">
                  {goldenRatioAccuracy}% accurate
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sequence Display */}
        <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
          <h2 className="text-xl font-semibold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            Sequence Terms
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-3">
            {sequence.map((value, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg text-center bg-gray-700/50
                  ${index < currentAnimatedTerm || !isAnimating ? 'opacity-100' : 'opacity-30'}
                  ${index === currentAnimatedTerm - 1 && isAnimating ? 'ring-2 ring-purple-500' : ''}
                  transition-all duration-300`}
              >
                <div className="text-sm text-gray-400">Term {index + 1}</div>
                <div className="font-mono font-semibold text-gray-200">
                  {showBinary ? value.toString(2) : value.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
          <h2 className="text-xl font-semibold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            Sequence Growth
          </h2>
          <div style={{ height: `${400 * zoom}px` }} className="transition-all duration-300">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={chartConfig.gridColor}
                />
                <XAxis
                  dataKey="term"
                  stroke={chartConfig.axisColor}
                  label={{
                    value: 'Term',
                    position: 'insideBottom',
                    offset: -10,
                    fill: chartConfig.axisColor
                  }}
                />
                <YAxis
                  stroke={chartConfig.axisColor}
                  label={{
                    value: 'Value',
                    angle: -90,
                    position: 'insideLeft',
                    fill: chartConfig.axisColor
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: chartConfig.tooltipBackground,
                    border: `1px solid ${chartConfig.tooltipBorder}`,
                    borderRadius: '0.5rem',
                    color: chartConfig.tooltipTextColor
                  }}
                  labelStyle={{
                    color: chartConfig.tooltipTextColor,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FibonacciExplorer;
