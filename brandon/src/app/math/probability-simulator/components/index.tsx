import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Dices, Coins, Play, Pause, RefreshCw, Spade } from 'lucide-react'; // Changed SpadeIcon to Spade

type ExperimentResult = {
  trial: number;
  probability: number;
  successes: number;
  total: number;
};

type ExperimentType = 'coin' | 'dice' | 'cards';

type ExperimentConfig = {
  probability: number;
  description: string;
  icon: React.ReactNode;
  color: string;
};

export const ProbabilitySimulator = () => {
  const [experimentType, setExperimentType] = useState<ExperimentType>('coin');
  const [numTrials, setNumTrials] = useState(100);
  const [results, setResults] = useState<ExperimentResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(50);
  const currentTrialRef = useRef(0);
  const successesRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const getExperimentConfig = (type: ExperimentType): ExperimentConfig => {
    switch (type) {
      case 'coin':
        return {
          probability: 0.5,
          description: 'Getting Heads',
          icon: <Coins className="w-6 h-6" />,
          color: 'from-yellow-400 to-amber-600'
        };
      case 'dice':
        return {
          probability: 1 / 6,
          description: 'Rolling a Six',
          icon: <Dices className="w-6 h-6" />,
          color: 'from-blue-400 to-indigo-600'
        };
      case 'cards':
        return {
          probability: 1 / 13,
          description: 'Drawing an Ace',
          icon: <Spade className="w-6 h-6" />, // Changed to Spade
          color: 'from-red-400 to-rose-600'
        };
      default:
        return {
          probability: 0,
          description: '',
          icon: null,
          color: ''
        };
    }
  };

  const resetExperiment = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setResults([]);
    currentTrialRef.current = 0;
    successesRef.current = 0;
    setIsRunning(false);
    setIsPaused(false);
  };

  const runExperiment = () => {
    setIsRunning(true);
    setIsPaused(false);
    setResults([]);
    currentTrialRef.current = 0;
    successesRef.current = 0;
  };

  const togglePause = () => {
    setIsPaused(prev => !prev);
  };

  useEffect(() => {
    const config = getExperimentConfig(experimentType);

    if (isRunning && !isPaused) {
      // Clear any existing interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(() => {
        if (currentTrialRef.current >= numTrials) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          setIsRunning(false);
          return;
        }

        currentTrialRef.current += 1;

        if (Math.random() < config.probability) {
          successesRef.current += 1;
        }

        const newResult: ExperimentResult = {
          trial: currentTrialRef.current,
          probability: successesRef.current / currentTrialRef.current,
          successes: successesRef.current,
          total: currentTrialRef.current
        };

        setResults(prevResults => [...prevResults, newResult]);
      }, speed);
    }

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isPaused, speed, experimentType, numTrials]);

  useEffect(() => {
    // If paused, clear the interval
    if (isPaused && intervalRef.current) {
      clearInterval(intervalRef.current);
    } else if (isRunning && !isPaused) {
      // Restart the interval if not paused
      const config = getExperimentConfig(experimentType);
      intervalRef.current = setInterval(() => {
        if (currentTrialRef.current >= numTrials) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          setIsRunning(false);
          return;
        }

        currentTrialRef.current += 1;

        if (Math.random() < config.probability) {
          successesRef.current += 1;
        }

        const newResult: ExperimentResult = {
          trial: currentTrialRef.current,
          probability: successesRef.current / currentTrialRef.current,
          successes: successesRef.current,
          total: currentTrialRef.current
        };

        setResults(prevResults => [...prevResults, newResult]);
      }, speed);
    }

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, isRunning, speed, experimentType, numTrials]);

  const ExperimentButton = ({ type, label }: { type: ExperimentType; label: string }) => {
    const config = getExperimentConfig(type);
    return (
      <button
        onClick={() => setExperimentType(type)}
        className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300
          ${experimentType === type
            ? `bg-gradient-to-r ${config.color} text-white shadow-lg scale-105`
            : 'bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-100 hover:scale-105'}
          backdrop-blur-sm border border-white/20 dark:border-gray-700/30`}
        disabled={isRunning}
      >
        {config.icon}
        <span className="font-medium">{label}</span>
      </button>
    );
  };

  const config = getExperimentConfig(experimentType);
  const theoreticalProbability = config.probability;
  const latestProbability = results.length > 0 ? results[results.length - 1].probability : 0;
  const difference = Math.abs(theoreticalProbability - latestProbability);

  return (
    <Card className="w-full max-w-5xl bg-gradient-to-b from-white/95 to-white/50
                   dark:from-gray-900/95 dark:to-gray-900/50
                   backdrop-blur-xl border-white/20 dark:border-gray-800/30
                   shadow-2xl shadow-blue-500/10">
      <CardHeader className="border-b border-gray-200/20 dark:border-gray-700/20">
        <CardTitle className="flex items-center gap-3 text-3xl font-bold
                           bg-gradient-to-r from-gray-900 to-gray-700
                           dark:from-white dark:to-gray-300
                           bg-clip-text text-transparent">
          {config.icon}
          Probability Explorer
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <div className="space-y-8">
          {/* Experiment Controls */}
          <div className="flex flex-col gap-6">
            <div className="flex justify-center gap-4">
              <ExperimentButton type="coin" label="Coin Flip" />
              <ExperimentButton type="dice" label="Dice Roll" />
              <ExperimentButton type="cards" label="Card Draw" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
                  Number of Trials: {numTrials}
                </label>
                <Slider
                  value={[numTrials]}
                  onValueChange={(values) => setNumTrials(values[0])}
                  min={10}
                  max={1000}
                  step={10}
                  className="w-full"
                  disabled={isRunning}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
                  Simulation Speed (ms delay): {speed}
                </label>
                <Slider
                  value={[speed]}
                  onValueChange={(values) => setSpeed(values[0])}
                  min={10}
                  max={200}
                  step={10}
                  className="w-full"
                  disabled={isRunning && !isPaused}
                />
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={isRunning ? togglePause : runExperiment}
                className={`flex items-center gap-2 px-8 py-3 rounded-xl font-medium
                         transition-all duration-300 shadow-lg
                         ${isRunning
                    ? 'bg-amber-500 hover:bg-amber-600'
                    : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600'
                  } text-white`}
              >
                {isRunning ? (
                  isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
                {isRunning ? (isPaused ? 'Resume' : 'Pause') : 'Start Simulation'}
              </button>

              <button
                onClick={resetExperiment}
                className="flex items-center gap-2 px-8 py-3 rounded-xl font-medium
                         bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200
                         hover:bg-gray-300 dark:hover:bg-gray-600
                         transition-all duration-300"
                disabled={!results.length}
              >
                <RefreshCw className="w-5 h-5" />
                Reset
              </button>
            </div>
          </div>

          {/* Results Display */}
          {results.length > 0 && (
            <div className="space-y-6">
              <div className="h-[400px] p-6 rounded-xl bg-white/90 dark:bg-gray-800/90
                           shadow-lg border border-gray-200/50 dark:border-gray-700/30">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={results}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#666" opacity={0.1} />
                    <XAxis
                      dataKey="trial"
                      label={{ value: 'Number of Trials', position: 'bottom', fill: '#666' }}
                      tick={{ fill: '#666' }}
                    />
                    <YAxis
                      domain={[0, 1]}
                      label={{ value: 'Probability', angle: -90, position: 'left', fill: '#666' }}
                      tick={{ fill: '#666' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="probability"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      dot={false}
                      animationDuration={300}
                    />
                    <Line
                      type="monotone"
                      dataKey={() => theoreticalProbability}
                      stroke="#10b981"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={false}
                      isAnimationActive={false} // Prevent animation for theoretical line
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50
                             dark:from-blue-900/20 dark:to-blue-800/10
                             border border-blue-200/50 dark:border-blue-500/20
                             shadow-lg backdrop-blur-sm">
                  <h3 className="text-xl font-semibold mb-4 text-blue-900 dark:text-blue-100">
                    Current Results
                  </h3>
                  <div className="space-y-3 text-blue-700 dark:text-blue-200">
                    <p className="flex justify-between">
                      <span>Total Trials:</span>
                      <span className="font-semibold">{currentTrialRef.current}</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Successful Outcomes:</span>
                      <span className="font-semibold">{successesRef.current}</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Current Probability:</span>
                      <span className="font-semibold">{latestProbability.toFixed(4)}</span>
                    </p>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100/50
                             dark:from-emerald-900/20 dark:to-emerald-800/10
                             border border-emerald-200/50 dark:border-emerald-500/20
                             shadow-lg backdrop-blur-sm">
                  <h3 className="text-xl font-semibold mb-4 text-emerald-900 dark:text-emerald-100">
                    Analysis
                  </h3>
                  <div className="space-y-3 text-emerald-700 dark:text-emerald-200">
                    <p className="flex justify-between">
                      <span>Theoretical Probability:</span>
                      <span className="font-semibold">{theoreticalProbability.toFixed(4)}</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Current Difference:</span>
                      <span className="font-semibold">{difference.toFixed(4)}</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Accuracy:</span>
                      <span className="font-semibold">{((1 - difference) * 100).toFixed(2)}%</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="p-6 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100/50
                       dark:from-gray-900/50 dark:to-gray-800/30
                       border border-gray-200/50 dark:border-gray-700/30
                       shadow-lg backdrop-blur-sm">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              How to Use
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-gray-600 dark:text-gray-300">
              <div className="space-y-2">
                <p className="font-medium text-gray-700 dark:text-gray-200">Getting Started:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Choose your experiment type above</li>
                  <li>Adjust the number of trials if desired</li>
                  <li>Control simulation speed for better visualization</li>
                  <li>Click "Start Simulation" to begin</li>
                </ul>
              </div>
              <div className="space-y-2">
                <p className="font-medium text-gray-700 dark:text-gray-200">Understanding Results:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Track the number of successful outcomes over trials</li>
                  <li>Compare the simulated probability with the theoretical probability</li>
                  <li>Observe the convergence of the simulation towards the theoretical value</li>
                  <li>Use the accuracy metric to evaluate the simulation's precision</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
