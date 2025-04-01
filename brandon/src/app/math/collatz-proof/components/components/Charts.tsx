'use client';

import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  BarChart,
  Bar,
  Label,
  AreaChart,
  Area,
  Cell,
  RadialBarChart,
  RadialBar,
  Legend,
  ReferenceLine
} from 'recharts';

interface ChartDescriptionProps {
  title: string;
  description: string;
}

const ChartDescription: React.FC<ChartDescriptionProps> = ({ title, description }) => (
  <div className="mt-3 mb-1">
    <h4 className="text-sm font-medium text-blue-400">{title}</h4>
    <p className="text-xs text-gray-400 mt-1">{description}</p>
  </div>
);

interface EntropyChartProps {
  data: { step: number; entropy: number }[];
}

export const EntropyChart: React.FC<EntropyChartProps> = ({ data }) => {
  if (!data?.length) return <div className="h-64 flex items-center justify-center text-gray-400">No data available</div>;

  return (
    <>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 30, right: 30, bottom: 40, left: 30 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="step" stroke="#9CA3AF">
            <Label value="Step Number" position="bottom" fill="#9CA3AF" offset={15} />
          </XAxis>
          <YAxis stroke="#9CA3AF">
            <Label value="Entropy (bits)" angle={-90} position="left" fill="#9CA3AF" offset={-10} />
          </YAxis>
          <Tooltip
            contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
            labelStyle={{ color: '#9CA3AF' }}
          />
          <Line type="monotone" dataKey="entropy" stroke="#60A5FA" dot={false} />
        </LineChart>
      </ResponsiveContainer>
      <ChartDescription
        title="What is this chart showing?"
        description="This chart tracks information entropy as the sequence evolves. Entropy generally decreases due to the 'division by 2' steps removing information, showing why all sequences must eventually decrease."
      />
    </>
  );
};

interface PhaseSpaceChartProps {
  data: { x: number; y: number }[];
}

export const PhaseSpaceChart: React.FC<PhaseSpaceChartProps> = ({ data }) => {
  if (!data?.length) return <div className="h-64 flex items-center justify-center text-gray-400">No data available</div>;

  return (
    <>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart margin={{ top: 30, right: 30, bottom: 40, left: 30 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis type="number" dataKey="x" stroke="#9CA3AF">
            <Label value="Current Value (n)" position="bottom" fill="#9CA3AF" offset={15} />
          </XAxis>
          <YAxis type="number" dataKey="y" stroke="#9CA3AF">
            <Label value="Collatz(n) = n/2 or 3n+1" angle={-90} position="left" fill="#9CA3AF" offset={-10} />
          </YAxis>
          <Tooltip
            contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
            labelStyle={{ color: '#9CA3AF' }}
          />
          <Scatter data={data} fill="#60A5FA" />
        </ScatterChart>
      </ResponsiveContainer>
      <ChartDescription
        title="What is this chart showing?"
        description="The phase space plots each value against its next value in the sequence. This reveals the function's ergodic-like properties and demonstrates how values can temporarily increase before ultimately decreasing."
      />
    </>
  );
};

interface BitPatternChartProps {
  data: { step: number; pattern: string }[];
}

export const BitPatternChart: React.FC<BitPatternChartProps> = ({ data }) => {
  if (!data?.length) return <div className="h-64 flex items-center justify-center text-gray-400">No data available</div>;

  const processedData = data.map(item => ({
    step: item.step,
    ones: (item.pattern.match(/1/g) || []).length,
    zeros: (item.pattern.match(/0/g) || []).length,
  }));

  return (
    <>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={processedData} margin={{ top: 30, right: 30, bottom: 40, left: 30 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="step" stroke="#9CA3AF">
            <Label value="Step Number" position="bottom" fill="#9CA3AF" offset={15} />
          </XAxis>
          <YAxis stroke="#9CA3AF">
            <Label value="Bit Count" angle={-90} position="left" fill="#9CA3AF" offset={-10} />
          </YAxis>
          <Tooltip
            contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
            labelStyle={{ color: '#9CA3AF' }}
          />
          <Line type="monotone" dataKey="ones" stroke="#60A5FA" name="1s" dot={false} />
          <Line type="monotone" dataKey="zeros" stroke="#F87171" name="0s" dot={false} />
        </LineChart>
      </ResponsiveContainer>
      <ChartDescription
        title="What is this chart showing?"
        description="This chart tracks the number of 0 and 1 bits in the binary representation of each value. The avalanche effect from cryptography causes unpredictable bit changes, preventing stable patterns from forming."
      />
    </>
  );
};

interface TauDistributionChartProps {
  data: { tau: number; count: number }[];
}

export const TauDistributionChart: React.FC<TauDistributionChartProps> = ({ data }) => {
  if (!data?.length) return <div className="h-64 flex items-center justify-center text-gray-400">No data available</div>;

  return (
    <>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 30, right: 30, bottom: 40, left: 30 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="tau" stroke="#9CA3AF">
            <Label value="τ Value" position="bottom" fill="#9CA3AF" offset={15} />
          </XAxis>
          <YAxis stroke="#9CA3AF">
            <Label value="Frequency" angle={-90} position="left" fill="#9CA3AF" offset={-10} />
          </YAxis>
          <Tooltip
            contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
            labelStyle={{ color: '#9CA3AF' }}
          />
          <Bar dataKey="count" fill="#60A5FA" />
        </BarChart>
      </ResponsiveContainer>
      <ChartDescription
        title="What is this chart showing?"
        description="The τ distribution histogram shows how many times each τ value appears. τ represents how many times we can divide by 2 after the 3n+1 step. This distribution follows a geometric law (P(τ=k) = 2^-k) with a small error term."
      />
    </>
  );
};

interface BitAvalancheProps {
  data: { original: number; flipped: number; bitPosition: number; hammingDistance: number }[];
}

export const BitAvalancheChart: React.FC<BitAvalancheProps> = ({ data }) => {
  if (!data?.length) return <div className="h-64 flex items-center justify-center text-gray-400">No data available</div>;

  // Format data for better visualization
  const formattedData = data.map(d => ({
    ...d,
    bitPositionLabel: `Bit ${d.bitPosition}` // Add a readable label
  }));

  return (
    <>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={formattedData}
          layout="vertical"
          margin={{ top: 30, right: 30, bottom: 40, left: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis type="number" stroke="#9CA3AF">
            <Label value="Hamming Distance (Bit Changes)" position="bottom" fill="#9CA3AF" offset={15} />
          </XAxis>
          <YAxis dataKey="bitPositionLabel" type="category" stroke="#9CA3AF">
            <Label value="Bit Position Flipped" angle={-90} position="left" fill="#9CA3AF" offset={-40} />
          </YAxis>
          <Tooltip
            contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
            labelStyle={{ color: '#9CA3AF' }}
            formatter={(value: number, name: string, props: any) => {
              const { original, flipped } = props.payload;
              return [
                `Hamming Distance: ${value.toFixed(2)}`,
                `Original: ${original} → Flipped: ${flipped}`
              ];
            }}
          />
          <Bar
            dataKey="hammingDistance"
            fill="#60A5FA"
            background={{ fill: '#374151' }}
          >
            {formattedData.map((entry, index) => {
              // Color gradient based on impact
              const intensity = (entry.hammingDistance / Math.max(...data.map(d => d.hammingDistance))) * 100;
              return <Cell key={`cell-${index}`} fill={`hsl(210, ${60 + intensity * 0.4}%, ${45 + intensity * 0.2}%)`} />;
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <ChartDescription
        title="What is this chart showing?"
        description="This visualizes the avalanche effect in the Collatz function. When a single bit is flipped in the input number, it creates a cascade of changes in subsequent steps. This cryptographic property prevents the formation of cycles by ensuring small input changes cause widespread output differences."
      />
    </>
  );
};

interface CompressionWaterfallProps {
  data: {
    step: number;
    expansion: number;
    compression: number;
    netChange: number;
  }[];
}

export const CompressionWaterfallChart: React.FC<CompressionWaterfallProps> = ({ data }) => {
  const [showNetChange, setShowNetChange] = useState(false);

  if (!data?.length) return <div className="h-64 flex items-center justify-center text-gray-400">No data available</div>;

  // Custom tooltip component for better display
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null;

    const step = label;

    if (showNetChange) {
      // Net change view tooltip
      const netChange = payload[0]?.value || 0;
      const isNegative = netChange < 0;
      const formattedValue = isNegative ? netChange.toFixed(2) : `+${netChange.toFixed(2)}`;

      return (
        <div className="bg-gray-800 border border-gray-700 shadow-lg rounded p-3">
          <p className="text-white font-medium mb-1">Step {step}</p>
          <div className="flex items-center mt-1">
            <div className={`w-3 h-3 mr-2 ${isNegative ? 'bg-green-400' : 'bg-red-400'} rounded-sm`}></div>
            <p className="text-gray-200 text-sm">
              Net Change: <span className={isNegative ? 'text-green-400' : 'text-red-400'}>
                {formattedValue} bits
              </span>
            </p>
          </div>
        </div>
      );
    } else {
      // Detailed view tooltip
      const expansion = payload.find((p: any) => p.name === 'Expansion (+bits)')?.value || 0;
      const compression = payload.find((p: any) => p.name === 'Compression (-bits)')?.value || 0;
      const netChange = expansion + compression;
      const isNetNegative = netChange < 0;

      return (
        <div className="bg-gray-800 border border-gray-700 shadow-lg rounded p-3">
          <p className="text-white font-medium mb-2">Step {step}</p>
          <div className="space-y-1 mb-2">
            <div className="flex items-center">
              <div className="w-3 h-3 mr-2 bg-red-400 rounded-sm"></div>
              <p className="text-gray-200 text-sm">
                Expansion: <span className="text-red-300">+{expansion.toFixed(2)} bits</span>
              </p>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 mr-2 bg-green-400 rounded-sm"></div>
              <p className="text-gray-200 text-sm">
                Compression: <span className="text-green-300">{compression.toFixed(2)} bits</span>
              </p>
            </div>
          </div>
          <div className="pt-1 border-t border-gray-700 mt-1">
            <p className="text-gray-200 text-sm">
              Net Change: <span className={isNetNegative ? 'text-green-400' : 'text-red-400'}>
                {isNetNegative ? netChange.toFixed(2) : `+${netChange.toFixed(2)}`} bits
              </span>
            </p>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <div className="flex justify-end mb-2">
        <button
          onClick={() => setShowNetChange(!showNetChange)}
          className="text-xs bg-gray-700 hover:bg-gray-600 text-white py-1 px-2 rounded transition-colors"
        >
          {showNetChange ? 'Show Detail View' : 'Show Net Change'}
        </button>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        {showNetChange ? (
          <BarChart data={data} margin={{ top: 20, right: 30, bottom: 40, left: 30 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="step" stroke="#9CA3AF">
              <Label value="Step Number" position="bottom" fill="#9CA3AF" offset={15} />
            </XAxis>
            <YAxis stroke="#9CA3AF">
              <Label value="Bit Information Change" angle={-90} position="left" fill="#9CA3AF" offset={-10} />
            </YAxis>
            <Tooltip content={<CustomTooltip />} wrapperStyle={{ zIndex: 100 }} />
            <Bar
              dataKey="netChange"
              fill="#60A5FA"
              >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.netChange < 0 ? '#4ADE80' : '#F87171'}
                />
              ))}
            </Bar>
          </BarChart>
        ) : (
          <AreaChart data={data} margin={{ top: 20, right: 30, bottom: 40, left: 30 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="step" stroke="#9CA3AF">
              <Label value="Step Number" position="bottom" fill="#9CA3AF" offset={15} />
            </XAxis>
            <YAxis stroke="#9CA3AF">
              <Label value="Bit Information Change" angle={-90} position="left" fill="#9CA3AF" offset={-10} />
            </YAxis>
            <Tooltip content={<CustomTooltip />} wrapperStyle={{ zIndex: 100 }} />
            <Area
              type="monotone"
              dataKey="expansion"
              stackId="1"
              stroke="#F87171"
              fill="#F87171"
              name="Expansion (+bits)"
            />
            <Area
              type="monotone"
              dataKey="compression"
              stackId="1"
              stroke="#4ADE80"
              fill="#4ADE80"
              name="Compression (-bits)"
            />
            <ReferenceLine y={0} stroke="#FFFFFF" strokeOpacity={0.3} />
          </AreaChart>
        )}
      </ResponsiveContainer>
      <ChartDescription
        title="What is this chart showing?"
        description="This visualizes the core mechanism of my proof: the competition between expansion (×3, adding log₂(3) bits) and compression (÷2, removing τ bits). The net effect is information loss that forces trajectories to eventually descend. This chart shows why no sequence can escape to infinity."
      />
    </>
  );
};

interface PredecessorTreeProps {
  data: {
    value: number;
    predecessors: number;
    level: number;
    radius: number;
    levelLabel: string;
    nameWithCount: string;
  }[];
}

export const PredecessorTreeChart: React.FC<PredecessorTreeProps> = ({ data }) => {
  if (!data?.length) return <div className="h-64 flex items-center justify-center text-gray-400">No data available</div>;

  // Group data by level for display in legend
  const levelGroups = data.reduce((acc, item) => {
    if (!acc[item.level]) {
      acc[item.level] = {
        level: item.level,
        levelLabel: item.levelLabel,
        color: item.level === 1
          ? 'hsl(220, 75%, 55%)'
          : item.level === 2
            ? 'hsl(200, 75%, 50%)'
            : 'hsl(180, 75%, 45%)'
      };
    }
    return acc;
  }, {} as Record<number, {level: number, levelLabel: string, color: string}>);

  const levels = Object.values(levelGroups).sort((a, b) => a.level - b.level);

  // Create a color map for consistent coloring by level
  const getColorByLevel = (level: number) => {
    switch(level) {
      case 1: return 'hsl(220, 75%, 55%)';
      case 2: return 'hsl(200, 75%, 50%)';
      case 3: return 'hsl(180, 75%, 45%)';
      default: return 'hsl(220, 75%, 55%)';
    }
  };

  // Level labels for consistent display
  const levelLabels: Record<number, string> = {
    1: "Direct predecessors",
    2: "2-step predecessors",
    3: "3-step predecessors"
  };

  return (
    <>
      <ResponsiveContainer width="100%" height={300}>
        <RadialBarChart
          innerRadius="15%"
          outerRadius="90%"
          data={data}
          startAngle={0}
          endAngle={360}
          barSize={12}
          barGap={2}
        >
          <defs>
            <filter id="shadow" x="0" y="0" width="200%" height="200%">
              <feOffset result="offOut" in="SourceGraphic" dx="0" dy="0" />
              <feGaussianBlur result="blurOut" in="offOut" stdDeviation="10" />
              <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
            </filter>
          </defs>
          <RadialBar
            background={{ fill: '#2D3748' }}
            dataKey="predecessors"
            label={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={getColorByLevel(entry.level)}
                stroke="#111827"
                strokeWidth={0.5}
              />
            ))}
          </RadialBar>
          <Legend
            iconSize={12}
            layout="vertical"
            verticalAlign="middle"
            align="right"
            wrapperStyle={{
              fontSize: '12px',
              fontFamily: 'system-ui, sans-serif',
            }}
            content={() => (
              <div className="bg-gray-800 bg-opacity-80 p-3 rounded text-xs text-gray-200 shadow-lg">
                <h4 className="font-semibold mb-2 text-sm border-b border-gray-700 pb-1">Predecessor Levels</h4>
                <ul>
                  {levels.map((level, index) => (
                    <li key={`level-${index}`} className="flex items-center mb-2">
                      <span className="w-4 h-4 mr-2 rounded" style={{ backgroundColor: level.color }}></span>
                      <span className="font-medium">{level.levelLabel}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 text-gray-400 text-[10px] italic">
                  Each arc represents a number and its predecessors at a specific level
                </div>
              </div>
            )}
          />
          <Tooltip
            cursor={false}
            contentStyle={{
              backgroundColor: '#1F2937',
              border: '1px solid #374151',
              padding: '12px',
              fontSize: '14px',
              borderRadius: '6px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)'
            }}
            labelStyle={{ color: '#FFF', fontWeight: 'bold', marginBottom: '8px', fontSize: '16px' }}
            formatter={(value: number, name: string, props: any) => {
              const level = props.payload.level;
              const levelColor = getColorByLevel(level);

              return (
                <div style={{ color: '#FFFFFF', padding: '5px 0' }}>
                  <div style={{ fontSize: '18px', marginBottom: '8px', fontWeight: 'bold' }}>
                    Number: <span style={{ color: levelColor }}>{props.payload.value}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
                    <div style={{
                      width: '10px',
                      height: '10px',
                      backgroundColor: levelColor,
                      marginRight: '8px',
                      borderRadius: '2px'
                    }}></div>
                    <span style={{ color: '#D1D5DB', fontSize: '14px' }}>
                      {level in levelLabels ? levelLabels[level] : `Level ${level}`} ({level} {level === 1 ? 'step' : 'steps'})
                    </span>
                  </div>
                  <div style={{ fontSize: '16px', color: '#FFF', fontWeight: 'bold', marginTop: '5px' }}>
                    {value} predecessors
                  </div>
                </div>
              );
            }}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <ChartDescription
        title="What is this chart showing?"
        description="This visualizes the one-way property of the Collatz function. For each value, the number of predecessors grows exponentially with distance. This exponential growth in the reverse direction is why cycles (beyond {4,2,1}) are impossible - the cycle would need to 'close the loop' against this exponential predecessor expansion."
      />
    </>
  );
};
