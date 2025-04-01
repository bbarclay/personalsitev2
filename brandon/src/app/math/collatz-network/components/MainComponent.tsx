import React, {
  useState,
  useRef,
  useMemo,
  useEffect,
  useCallback,
} from 'react';
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
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Binary,
  Network,
  Zap,
  Activity,
  GitBranch,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
} from 'recharts';

// Custom Network Node Component
interface NetworkNodeProps {
  x: number;
  y: number;
  size: number;
  color: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const NetworkNode: React.FC<NetworkNodeProps> = ({
  x,
  y,
  size,
  color,
  label,
  isActive,
  onClick,
}) => (
  <g
    transform={`translate(${x},${y})`}
    onClick={onClick}
    style={{ cursor: 'pointer' }}
  >
    <circle
      r={size}
      fill={color}
      opacity={isActive ? 1 : 0.6}
      stroke={isActive ? '#000' : 'none'}
      strokeWidth={2}
    />
    <text textAnchor="middle" dy=".3em" fontSize={size * 0.8} fill="#fff">
      {label}
    </text>
  </g>
);

// Custom Network Edge Component
interface NetworkEdgeProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  strength: number;
}

const NetworkEdge: React.FC<NetworkEdgeProps> = ({
  startX,
  startY,
  endX,
  endY,
  strength,
}) => (
  <line
    x1={startX}
    y1={startY}
    x2={endX}
    y2={endY}
    stroke="#999"
    strokeWidth={Math.max(0.5, strength * 2)}
    strokeOpacity={0.6}
  />
);

const CollatzNetwork: React.FC = () => {
  const [startNumber, setStartNumber] = useState<number>(1);
  const [speed, setSpeed] = useState<number>(15);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  interface Result {
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

  const [results, setResults] = useState<Result[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [visibleEntries, setVisibleEntries] = useState<Result[]>([]);
  const colorMap = useRef<{ [key: number]: string }>({});
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Helper functions
  interface DropTrailingZerosResult {
    strippedBinary: string;
    zerosDropped: number;
  }

  const dropTrailingZerosAndCount = useCallback(
    (binaryStr: string): DropTrailingZerosResult => {
      const strippedBinary = binaryStr.replace(/0+$/, '');
      const zerosDropped = binaryStr.length - strippedBinary.length;
      return { strippedBinary, zerosDropped };
    },
    []
  );

  const collatzNext = useCallback((n: number): number => {
    return n % 2 === 0 ? n / 2 : 3 * n + 1;
  }, []);

  const getRandomColor = useCallback((): string => {
    const hue = Math.random() * 360;
    return `hsl(${hue}, 70%, 80%)`;
  }, []);

  const generateFullSequence = useCallback(
    (n: number): number[] => {
      const sequence = [n];
      let current = n;
      while (current !== 1 && current !== 4) {
        // Stop at 4 to avoid the 4-2-1 loop
        current = collatzNext(current);
        sequence.push(current);
      }
      return sequence;
    },
    [collatzNext]
  );

  const processNextOddNumber = useCallback(
    (n: number): Result => {
      const collatzResult = collatzNext(n);
      const binaryCollatz = collatzResult.toString(2);
      const { strippedBinary, zerosDropped } =
        dropTrailingZerosAndCount(binaryCollatz);
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
        patternFrequency: 0,
      };
    },
    [
      colorMap,
      collatzNext,
      dropTrailingZerosAndCount,
      generateFullSequence,
      getRandomColor,
    ]
  );

  // Initialize results when startNumber changes
  useEffect(() => {
    const newResults: Result[] = [];
    for (let i = startNumber; i < startNumber + 100; i += 2) {
      newResults.push(processNextOddNumber(i));
    }
    setResults(newResults);
    setCurrentIndex(0);
    setVisibleEntries([]);
  }, [startNumber, processNextOddNumber]);

  // Handle play/pause
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev < results.length) {
            setVisibleEntries((entries) => [...entries, results[prev]]);
            return prev + 1;
          }
          setIsPlaying(false);
          return prev;
        });
      }, 1000 / speed);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, speed, results]);

  // Memoized analysis data
  const analysisData = useMemo(() => {
    const patterns: {
      [key: number]: {
        baseOdd: number;
        count: number;
        avgSequenceLength: number;
        maxValue: number;
        examples: number[];
      };
    } = {};
    visibleEntries.forEach((entry) => {
      const key = entry.oddNumberDropped;
      if (!patterns[key]) {
        patterns[key] = {
          baseOdd: key,
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

    // Calculate averages and convert to array
    const patternsArray = Object.values(patterns).map((pattern) => ({
      ...pattern,
      avgSequenceLength: pattern.avgSequenceLength / pattern.count,
    }));

    return {
      patterns: patternsArray,
      totalNumbers: visibleEntries.length,
      averageSequenceLength:
        visibleEntries.reduce((acc, curr) => acc + curr.sequenceLength, 0) /
        visibleEntries.length || 0,
      maxSequenceLength:
        Math.max(...visibleEntries.map((e) => e.sequenceLength)) || 0,
      maxValue: Math.max(...visibleEntries.map((e) => e.maxValue)) || 0,
    };
  }, [visibleEntries]);

  // Network analysis functions
  const analyzeNetworkConnections = (entries: Result[]) => {
    const connections: { [key: string]: number } = {};
    const nodes: {
      [key: number]: { count: number; connections: number[] };
    } = {};

    entries.forEach((entry) => {
      const sequence = entry.sequence;
      for (let i = 0; i < sequence.length - 1; i++) {
        const current = sequence[i];
        const next = sequence[i + 1];

        // Add nodes
        if (!nodes[current]) {
          nodes[current] = { count: 0, connections: [] };
        }
        nodes[current].count++;

        // Add connections
        const key = `${current}-${next}`;
        if (!connections[key]) {
          connections[key] = 0;
        }
        connections[key]++;

        // Track connection in node
        if (!nodes[current].connections.includes(next)) {
          nodes[current].connections.push(next);
        }
      }
    });

    return { connections, nodes };
  };

  // Network layout calculation
  const calculateNetworkLayout = (
    nodes: {
      [key: number]: { count: number; connections: number[] };
    },
    width: number,
    height: number
  ) => {
    const nodePositions: {
      [key: number]: { x: number; y: number; size: number };
    } = {};
    const nodeList = Object.keys(nodes)
      .map(Number)
      .sort((a, b) => a - b);

    nodeList.forEach((node, index) => {
      const angle = (2 * Math.PI * index) / nodeList.length;
      const radius = Math.min(width, height) * 0.4;

      nodePositions[node] = {
        x: width / 2 + radius * Math.cos(angle),
        y: height / 2 + radius * Math.sin(angle),
        size: Math.log(nodes[node].count + 1) * 5,
      };
    });

    return nodePositions;
  };

  // Enhanced visualization components
  interface NetworkViewProps {
    data: Result[];
    width: number;
    height: number;
  }

  const NetworkView: React.FC<NetworkViewProps> = ({
    data,
    width = 600,
    height = 400,
  }) => {
    const { connections, nodes } = analyzeNetworkConnections(data);
    const layout = calculateNetworkLayout(nodes, width, height);
    const [selectedNode, setSelectedNode] = useState<number | null>(null);

    return (
      <svg width={width} height={height}>
        {/* Draw edges */}
        {Object.entries(connections).map(([key, strength]) => {
          const [start, end] = key.split('-').map(Number);
          if (layout[start] && layout[end]) {
            return (
              <NetworkEdge
                key={key}
                startX={layout[start].x}
                startY={layout[start].y}
                endX={layout[end].x}
                endY={layout[end].y}
                strength={Math.log(strength + 1) / 10}
              />
            );
          }
          return null;
        })}

        {/* Draw nodes */}
        {Object.entries(layout).map(([node, pos]) => (
          <NetworkNode
            key={node}
            x={pos.x}
            y={pos.y}
            size={pos.size}
            color={colorMap.current[Number(node)] || '#999'}
            label={node}
            isActive={selectedNode === Number(node)}
            onClick={() => setSelectedNode(Number(node))}
          />
        ))}
      </svg>
    );
  };

  // Pattern Trajectory View
  interface TrajectoryViewProps {
    entry: Result;
  }

  const TrajectoryView: React.FC<TrajectoryViewProps> = ({ entry }) => {
    const trajectoryData = entry.sequence.map((value, index) => ({
      step: index,
      value: value,
    }));

    return (
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={trajectoryData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="step" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            dot={false}
            animationDuration={500}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  // Pattern Distribution Heatmap
  interface Pattern {
    baseOdd: number;
    count: number;
    avgSequenceLength: number;
    maxValue: number;
    examples: number[];
  }

  interface PatternHeatmapProps {
    patterns: Pattern[];
  }

  const PatternHeatmap: React.FC<PatternHeatmapProps> = ({ patterns }) => {
    const maxCount = Math.max(...patterns.map((p) => p.count));
    const heatmapData = patterns.map((pattern, i) => ({
      id: pattern.baseOdd,
      value: pattern.count,
      x: i % 10,
      y: Math.floor(i / 10),
    }));

    return (
      <div className="grid grid-cols-10 gap-1 p-4">
        {heatmapData.map((cell) => (
          <div
            key={cell.id}
            className="aspect-square rounded"
            style={{
              backgroundColor: `rgba(66, 135, 245, ${cell.value / maxCount})`,
            }}
            title={`Pattern ${cell.id}: ${cell.value} occurrences`}
          />
        ))}
      </div>
    );
  };

  return (
    <Card className="w-full max-w-6xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-6 w-6" />
          Advanced Collatz Network Analysis
        </CardTitle>
        <CardDescription>
          Exploring patterns, connections, and trajectories in the Collatz
          conjecture
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

        <Tabs defaultValue="network" className="mt-4">
          <TabsList className="grid grid-cols-4 gap-4">
            <TabsTrigger value="network">
              <Network className="h-4 w-4 mr-2" />
              Network
            </TabsTrigger>
            <TabsTrigger value="patterns">
              <Binary className="h-4 w-4 mr-2" />
              Patterns
            </TabsTrigger>
            <TabsTrigger value="trajectories">
              <GitBranch className="h-4 w-4 mr-2" />
              Trajectories
            </TabsTrigger>
            <TabsTrigger value="insights">
              <Zap className="h-4 w-4 mr-2" />
              Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="network" className="h-[600px]">
            <Card>
              <CardHeader>
                <CardTitle>Pattern Network</CardTitle>
                <CardDescription>
                  Visualizing connections between numbers in Collatz sequences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <NetworkView data={visibleEntries} width={800} height={500} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patterns">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Pattern Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <PatternHeatmap patterns={analysisData.patterns} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Pattern Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={analysisData.patterns}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="baseOdd" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="avgSequenceLength" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trajectories">
            <div className="grid grid-cols-1 gap-4">
              {visibleEntries.slice(-5).map((entry, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>Trajectory for {entry.oddNumber}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TrajectoryView entry={entry} />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="insights">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Pattern Similarities</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <ScatterChart>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="x" />
                      <YAxis dataKey="y" />
                      <Tooltip />
                      <Scatter
                        data={analysisData.patterns.map((p) => ({
                          x: p.avgSequenceLength,
                          y: p.count,
                          z: p.maxValue,
                        }))}
                        fill="#8884d8"
                      />
                    </ScatterChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Key Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold">Most Common Pattern</h4>
                      <p>{analysisData.patterns[0]?.baseOdd}</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold">Longest Sequence</h4>
                      <p>{analysisData.maxSequenceLength} steps</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-semibold">Pattern Diversity</h4>
                      <p>{analysisData.patterns.length} unique patterns</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CollatzNetwork;
