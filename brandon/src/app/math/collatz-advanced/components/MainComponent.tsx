import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  ArrowUp,
  TrendingUp,
  Binary,
  Network,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Define interfaces for data structures
interface CollatzEntry {
  oddNumber: number;
  collatzResult: number;
  binaryCollatz: string;
  oddNumberDropped: number;
  zerosDropped: number;
  colorClass: string;
  sequenceLength: number;
  maxValue: number;
  sequence: number[];
  patternFrequency: number;
}

interface Pattern {
  count: number;
  avgSequenceLength: number;
  maxValue: number;
  examples: number[];
}

interface ColorMap {
  [key: number]: string;
}

interface AnalysisPattern extends Pattern {
  baseOdd: string | number;
}

const CollatzAnalysis = () => {
  const [startNumber, setStartNumber] = useState<number>(1);
  const [speed, setSpeed] = useState<number>(15);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [results, setResults] = useState<CollatzEntry[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [visibleEntries, setVisibleEntries] = useState<CollatzEntry[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedPattern, setSelectedPattern] = useState<string | number | null>(null);
  const colorMap = useRef<ColorMap>({});

  // Enhanced helper functions
  const dropTrailingZerosAndCount = (binaryStr: string) => {
    const strippedBinary = binaryStr.replace(/0+$/, '');
    const zerosDropped = binaryStr.length - strippedBinary.length;
    return { strippedBinary, zerosDropped };
  };

  const collatzNext = (n: number): number => {
    return n % 2 === 0 ? n / 2 : 3 * n + 1;
  };

  const getRandomColor = () => {
    const hue = Math.random() * 360;
    return `hsl(${hue}, 70%, 80%)`;
  };

  const generateFullSequence = useCallback((n: number): number[] => {
    const sequence = [n];
    while (n !== 1 && n !== 4) {
      // Stop at 4 to avoid the 4-2-1 loop
      n = collatzNext(n);
      sequence.push(n);
    }
    return sequence;
  }, []);

  const processNextOddNumber = useCallback((n: number): CollatzEntry => {
    const collatzResult = collatzNext(n);
    const binaryCollatz = collatzResult.toString(2);
    const { strippedBinary, zerosDropped } = dropTrailingZerosAndCount(binaryCollatz);
    const oddNumberDropped = parseInt(strippedBinary, 2);
    const fullSequence = generateFullSequence(n);

    if (!colorMap.current[oddNumberDropped]) {
      colorMap.current[oddNumberDropped] = getRandomColor();
    }

    return {
      oddNumber: n,
      collatzResult,
      binaryCollatz,
      oddNumberDropped,
      zerosDropped,
      colorClass: colorMap.current[oddNumberDropped],
      sequenceLength: fullSequence.length,
      maxValue: Math.max(...fullSequence),
      sequence: fullSequence,
      patternFrequency: 0, // Will be calculated later
    };
  }, [generateFullSequence]);

  // Analysis functions
  const analyzePatterns = (
    entries: CollatzEntry[]
  ): { [key: number]: Pattern } => {
    const patterns: { [key: number]: Pattern } = {};
    entries.forEach((entry) => {
      const key = entry.oddNumberDropped;
      if (!patterns[key]) {
        patterns[key] = {
          count: 0,
          avgSequenceLength: 0,
          maxValue: 0,
          examples: [],
        };
      }
      patterns[key].count++;
      patterns[key].avgSequenceLength += entry.sequenceLength;
      patterns[key].maxValue = Math.max(patterns[key].maxValue, entry.maxValue);
      if (patterns[key].examples.length < 5) {
        patterns[key].examples.push(entry.oddNumber);
      }
    });

    // Calculate averages
    Object.values(patterns).forEach((pattern) => {
      pattern.avgSequenceLength /= pattern.count;
    });

    return patterns;
  };

  // Generate sequence with enhanced analysis
  useEffect(() => {
    const generateSequence = () => {
      const newResults: CollatzEntry[] = [];
      let oddNumber = startNumber;
      for (let i = 0; i < 1000; i++) {
        newResults.push(processNextOddNumber(oddNumber));
        oddNumber += 2;
      }

      // Calculate pattern frequencies
      const patterns = analyzePatterns(newResults);
      const updatedResults = newResults.map((result) => ({
        ...result,
        patternFrequency: patterns[result.oddNumberDropped].count,
      }));

      setResults(updatedResults);
      setCurrentIndex(0);
      setVisibleEntries([]);
    };

    generateSequence();
  }, [startNumber, processNextOddNumber]);

  // Animation control
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying && currentIndex < results.length) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev >= results.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
        setVisibleEntries((prev) => [...prev, results[currentIndex]]);
      }, speed);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentIndex, results, speed]);

  // Memoized analysis data
  const analysisData = useMemo(() => {
    const patterns = analyzePatterns(visibleEntries);
    const sortedPatterns: AnalysisPattern[] = Object.entries(patterns)
      .sort(([, a], [, b]) => b.count - a.count)
      .map(([key, value]) => ({
        baseOdd: key,
        ...value,
      }));

    return {
      patterns: sortedPatterns,
      totalNumbers: visibleEntries.length,
      averageSequenceLength:
        visibleEntries.reduce((acc, curr) => acc + curr.sequenceLength, 0) /
        visibleEntries.length || 0,
      maxSequenceLength:
        Math.max(...visibleEntries.map((e) => e.sequenceLength)) || 0,
      maxValue: Math.max(...visibleEntries.map((e) => e.maxValue)) || 0,
    };
  }, [visibleEntries]);

  return (
    <Card className="w-full max-w-6xl">
      <CardHeader>
        <CardTitle>Advanced Collatz Pattern Analysis</CardTitle>
        <CardDescription>
          Exploring binary patterns and trajectories in the Collatz conjecture
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 mb-6 items-center">
          <Input
            type="number"
            value={startNumber}
            onChange={(e) => setStartNumber(parseInt(e.target.value) || 1)}
            placeholder="Start Number"
            className="w-32"
          />
          <div className="flex-1">
            <Slider
              value={[speed]}
              onValueChange={(values) => setSpeed(values[0])}
              min={1}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setCurrentIndex((prev) => Math.max(0, prev - 1));
                setVisibleEntries((prev) => prev.slice(0, -1));
              }}
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                if (currentIndex < results.length) {
                  setCurrentIndex((prev) => prev + 1);
                  setVisibleEntries((prev) => [...prev, results[currentIndex]]);
                }
              }}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="patterns">
          <TabsList>
            <TabsTrigger value="patterns">
              <Binary className="h-4 w-4 mr-2" />
              Binary Patterns
            </TabsTrigger>
            <TabsTrigger value="analysis">
              <TrendingUp className="h-4 w-4 mr-2" />
              Analysis
            </TabsTrigger>
            <TabsTrigger value="network">
              <Network className="h-4 w-4 mr-2" />
              Pattern Network
            </TabsTrigger>
          </TabsList>

          <TabsContent value="patterns">
            <div className="mb-4">
              <Alert>
                <AlertDescription>
                  Numbers that share the same base pattern (after removing
                  trailing zeros) are grouped together. Longer blocks indicate
                  more trailing zeros, suggesting longer chains of division by 2.
                </AlertDescription>
              </Alert>
            </div>
            <div
              ref={containerRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-[60vh] overflow-y-auto p-4"
            >
              {analysisData.patterns.map((pattern) => (
                <div
                  key={pattern.baseOdd}
                  className={`border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow ${selectedPattern === pattern.baseOdd ? 'ring-2 ring-blue-500' : ''
                    }`}
                  onClick={() => setSelectedPattern(pattern.baseOdd)}
                >
                  <div className="font-medium mb-2">
                    Base Pattern: {pattern.baseOdd}
                    <span className="text-sm text-gray-500 ml-2">
                      (Found {pattern.count} times)
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    Avg. Sequence Length:{' '}
                    {pattern.avgSequenceLength.toFixed(1)}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {pattern.examples.map((num: number, idx: number) => (
                      <div
                        key={idx}
                        className="px-2 py-1 rounded text-sm"
                        style={{
                          backgroundColor:
                            colorMap.current[
                            pattern.baseOdd as number
                            ],
                        }}
                      >
                        {num}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analysis">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Pattern Distribution</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analysisData.patterns}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="baseOdd" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="count"
                        stroke="#8884d8"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sequence Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-500">
                        Total Numbers Analyzed
                      </div>
                      <div className="text-2xl font-bold">
                        {analysisData.totalNumbers}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">
                        Average Sequence Length
                      </div>
                      <div className="text-2xl font-bold">
                        {analysisData.averageSequenceLength.toFixed(1)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">
                        Maximum Sequence Length
                      </div>
                      <div className="text-2xl font-bold">
                        {analysisData.maxSequenceLength}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">
                        Maximum Value Reached
                      </div>
                      <div className="text-2xl font-bold">
                        {analysisData.maxValue.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="network">
            <div className="h-[60vh] bg-gray-50 rounded-lg p-4">
              <div className="text-center text-gray-500">
                Network visualization coming soon...
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-4 right-4"
          onClick={() =>
            containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
          }
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default CollatzAnalysis;
