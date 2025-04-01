'use client';

import React, { useState } from 'react';
import {
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  Legend,
  Label,
  PieChart,
  Pie,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';
import { COLORS } from '../constants';
import { HAPDResult, MatrixVerificationResult } from '../utils/hermite';

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

// HAPD Sequence Visualization Chart
interface SequenceChartProps {
  hapdResult: HAPDResult;
  highlightIndex?: number;
}

export const HAPDSequenceChart: React.FC<SequenceChartProps> = ({ hapdResult, highlightIndex }) => {
  if (!hapdResult?.sequence?.length) {
    return <div className="h-64 flex items-center justify-center text-gray-400">No sequence data available</div>;
  }

  // Create chart data from sequence
  const chartData = hapdResult.sequence.map((pair, index) => ({
    index,
    a1: pair.a1,
    a2: pair.a2,
    isPeriodic: index >= hapdResult.preperiodLength && hapdResult.periodicIndex !== -1,
    isHighlighted: index === highlightIndex
  }));

  return (
    <>
      <ChartDescription
        title="HAPD Algorithm Sequence"
        description="The sequence of integer pairs (a₁, a₂) produced by the HAPD algorithm. Periodic behavior indicates a cubic irrational."
      />
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 20, right: 30, bottom: 30, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="index" stroke="#9CA3AF">
            <Label value="Iteration Index" position="bottom" fill="#9CA3AF" offset={10} />
          </XAxis>
          <YAxis stroke="#9CA3AF">
            <Label value="Value" angle={-90} position="left" fill="#9CA3AF" offset={-10} />
          </YAxis>
          <Tooltip
            contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
            itemStyle={{ color: '#F3F4F6' }}
            formatter={(value, name) => [value, name === 'a1' ? 'a₁' : 'a₂']}
            labelFormatter={(label) => `Iteration: ${label}`}
          />
          <Line
            type="monotone"
            dataKey="a1"
            name="a₁"
            stroke={COLORS.CUBIC}
            dot={(props) => {
              const { cx, cy, payload } = props;
              return (
                <circle
                  cx={cx}
                  cy={cy}
                  r={payload.isHighlighted ? 6 : (payload.isPeriodic ? 4 : 3)}
                  fill={payload.isHighlighted ? '#FFFFFF' : (payload.isPeriodic ? COLORS.PERIODIC : COLORS.CUBIC)}
                  stroke={payload.isHighlighted ? COLORS.CUBIC : 'none'}
                  strokeWidth={2}
                />
              );
            }}
          />
          <Line
            type="monotone"
            dataKey="a2"
            name="a₂"
            stroke={COLORS.QUADRATIC}
            dot={(props) => {
              const { cx, cy, payload } = props;
              return (
                <circle
                  cx={cx}
                  cy={cy}
                  r={payload.isHighlighted ? 6 : (payload.isPeriodic ? 4 : 3)}
                  fill={payload.isHighlighted ? '#FFFFFF' : (payload.isPeriodic ? COLORS.PERIODIC : COLORS.QUADRATIC)}
                  stroke={payload.isHighlighted ? COLORS.QUADRATIC : 'none'}
                  strokeWidth={2}
                />
              );
            }}
          />
        </LineChart>
      </ResponsiveContainer>

      {hapdResult.periodicIndex !== -1 && (
        <div className="flex mt-2 justify-center items-center">
          <div className="flex items-center mr-4">
            <div className="w-3 h-3 rounded-full bg-gray-400 mr-2"></div>
            <span className="text-xs text-gray-300">Pre-period</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
            <span className="text-xs text-gray-300">Periodic</span>
          </div>
        </div>
      )}
    </>
  );
};

// Projective Space Visualization (3D Scatter Plot)
interface ProjectiveSpaceChartProps {
  triples: { v1: number; v2: number; v3: number }[];
  periodicIndex: number;
}

export const ProjectiveSpaceChart: React.FC<ProjectiveSpaceChartProps> = ({ triples, periodicIndex }) => {
  if (!triples?.length) {
    return <div className="h-64 flex items-center justify-center text-gray-400">No projective space data available</div>;
  }

  // Normalize all triples for visualization
  const normalizedTriples = triples.map((triple, index) => {
    const norm = Math.sqrt(triple.v1 * triple.v1 + triple.v2 * triple.v2 + triple.v3 * triple.v3);
    return {
      index,
      v1: triple.v1 / norm,
      v2: triple.v2 / norm,
      v3: triple.v3 / norm,
      isPeriodic: index >= periodicIndex && periodicIndex !== -1
    };
  });

  // For 2D visualization of the 3D projective space, we'll use a radar chart
  const radarData = normalizedTriples.map((triple, index) => ({
    subject: `Point ${index}`,
    v1: Math.abs(triple.v1),
    v2: Math.abs(triple.v2),
    v3: Math.abs(triple.v3),
    isPeriodic: triple.isPeriodic
  }));

  return (
    <>
      <ChartDescription
        title="Projective Space Representation"
        description="Normalized coordinates in projective space showing the HAPD algorithm's trajectory. In projective space, cubic irrationals exhibit periodic behavior."
      />
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart outerRadius={150} data={radarData}>
          <PolarGrid stroke="#374151" />
          <PolarAngleAxis dataKey="subject" tick={false} />
          <PolarRadiusAxis angle={30} domain={[0, 1]} tickCount={5} stroke="#9CA3AF" />
          <Radar
            name="v₁ component"
            dataKey="v1"
            stroke={COLORS.CUBIC}
            fill={COLORS.CUBIC}
            fillOpacity={0.3}
          />
          <Radar
            name="v₂ component"
            dataKey="v2"
            stroke={COLORS.QUADRATIC}
            fill={COLORS.QUADRATIC}
            fillOpacity={0.3}
          />
          <Radar
            name="v₃ component"
            dataKey="v3"
            stroke={COLORS.RATIONAL}
            fill={COLORS.RATIONAL}
            fillOpacity={0.3}
          />
          <Legend />
          <Tooltip
            contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
            itemStyle={{ color: '#F3F4F6' }}
            formatter={(value) => [(value as number).toFixed(4), '']}
            labelFormatter={(label) => {
              const index = parseInt(label.replace('Point ', ''), 10);
              return `Iteration ${index} ${radarData[index].isPeriodic ? '(Periodic)' : ''}`;
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </>
  );
};

// Matrix Trace Relations Chart
interface MatrixTraceChartProps {
  matrixResult: MatrixVerificationResult;
}

export const MatrixTraceChart: React.FC<MatrixTraceChartProps> = ({ matrixResult }) => {
  if (!matrixResult?.traceRelations?.length) {
    return <div className="h-64 flex items-center justify-center text-gray-400">No matrix trace data available</div>;
  }

  const { a, b, c } = matrixResult.minimalPolynomial;
  const polynomialText = `x³ ${a !== 0 ? `${a < 0 ? '- ' : '+ '}${Math.abs(a)}x² ` : ''}${b !== 0 ? `${b < 0 ? '- ' : '+ '}${Math.abs(b)}x ` : ''}${c !== 0 ? `${c < 0 ? '- ' : '+ '}${Math.abs(c)}` : ''}`;

  return (
    <>
      <ChartDescription
        title="Matrix Trace Relations"
        description={`Verification of cubic irrationality by checking trace relations of the companion matrix for the minimal polynomial ${polynomialText}.`}
      />
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={matrixResult.traceRelations} margin={{ top: 20, right: 30, bottom: 30, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="k" stroke="#9CA3AF">
            <Label value="Power (k)" position="bottom" fill="#9CA3AF" offset={10} />
          </XAxis>
          <YAxis stroke="#9CA3AF">
            <Label value="Trace Value" angle={-90} position="left" fill="#9CA3AF" offset={-10} />
          </YAxis>
          <Tooltip
            contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
            itemStyle={{ color: '#F3F4F6' }}
            formatter={(value, name) => {
              if (name === 'actual') return [value, 'Actual tr(C^k)'];
              if (name === 'expected') return [value, 'Expected tr(C^k)'];
              return [value, name];
            }}
            labelFormatter={(label) => `k = ${label}`}
          />
          <Bar
            dataKey="actual"
            name="Actual tr(C^k)"
            fill={COLORS.CUBIC}
          />
          <Bar
            dataKey="expected"
            name="Expected tr(C^k)"
            fill={COLORS.QUADRATIC}
          />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-2 text-sm text-center text-gray-400">
        Minimal polynomial: {polynomialText}
      </div>

      <div className="flex mt-2 justify-center items-center">
        <div className="flex items-center mr-4">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.CUBIC }}></div>
          <span className="text-xs text-gray-300 ml-2">Actual trace value</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.QUADRATIC }}></div>
          <span className="text-xs text-gray-300 ml-2">Expected from recurrence relation</span>
        </div>
      </div>
    </>
  );
};

// Classification Result Pie Chart
interface ClassificationChartProps {
  isRational: boolean;
  isQuadratic: boolean;
  isCubic: boolean;
  isHigherDegree: boolean;
  isTranscendental: boolean;
}

export const ClassificationChart: React.FC<ClassificationChartProps> = ({
  isRational,
  isQuadratic,
  isCubic,
  isHigherDegree,
  isTranscendental
}) => {
  // Calculate confidences (simplified for demo)
  const confidences = [
    { name: 'Rational', value: isRational ? 0.9 : 0.05, color: COLORS.RATIONAL },
    { name: 'Quadratic Irrational', value: isQuadratic ? 0.9 : 0.05, color: COLORS.QUADRATIC },
    { name: 'Cubic Irrational', value: isCubic ? 0.9 : 0.05, color: COLORS.CUBIC },
    { name: 'Higher Degree', value: isHigherDegree ? 0.9 : 0.05, color: COLORS.PERIODIC },
    { name: 'Transcendental', value: isTranscendental ? 0.9 : 0.05, color: COLORS.TRANSCENDENTAL }
  ];

  const data = confidences.map(conf => ({
    ...conf,
    value: conf.value * 100 // Convert to percentage
  }));

  return (
    <>
      <ChartDescription
        title="Number Classification"
        description="Classification of the input number based on HAPD algorithm behavior and matrix verification."
      />
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={5}
            dataKey="value"
            label={({ name, value }) => `${name}: ${(value as number).toFixed(0)}%`}
            labelLine={{ stroke: '#9CA3AF', strokeWidth: 1 }}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
            itemStyle={{ color: '#F3F4F6' }}
            formatter={(value) => [`${(value as number).toFixed(0)}%`, 'Confidence']}
          />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};

// Complex Roots Visualization
interface ComplexRootsChartProps {
  eigenvalues: number[];
}

export const ComplexRootsChart: React.FC<ComplexRootsChartProps> = ({ eigenvalues }) => {
  if (!eigenvalues?.length) {
    return <div className="h-64 flex items-center justify-center text-gray-400">No eigenvalue data available</div>;
  }

  // Filter out NaN values
  const validEigenvalues = eigenvalues.filter(val => !isNaN(val));

  if (validEigenvalues.length === 0) {
    return <div className="h-64 flex items-center justify-center text-gray-400">Complex eigenvalues not supported in demo visualization</div>;
  }

  // Scale data to make visualization meaningful
  const scaleFactor = 1 / Math.max(...validEigenvalues.map(Math.abs), 1);
  const scatterData = validEigenvalues.map((val, index) => ({
    x: val * scaleFactor,
    y: 0, // For real eigenvalues, imaginary part is 0
    z: 1,
    name: `Root ${index + 1}`
  }));

  return (
    <>
      <ChartDescription
        title="Roots of Minimal Polynomial"
        description="Visual representation of the roots of the minimal polynomial. For cubic irrationals, these are the eigenvalues of the companion matrix."
      />
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart margin={{ top: 20, right: 30, bottom: 30, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            type="number"
            dataKey="x"
            name="Real"
            domain={[-1, 1]}
            stroke="#9CA3AF"
          >
            <Label value="Real Part" position="bottom" fill="#9CA3AF" offset={10} />
          </XAxis>
          <YAxis
            type="number"
            dataKey="y"
            name="Imaginary"
            domain={[-1, 1]}
            stroke="#9CA3AF"
          >
            <Label value="Imaginary Part" angle={-90} position="left" fill="#9CA3AF" offset={-10} />
          </YAxis>
          <ZAxis type="number" dataKey="z" range={[60, 60]} />
          <Tooltip
            contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
            itemStyle={{ color: '#F3F4F6' }}
            formatter={(value, name) => {
              if (name === 'Real') return [(value as number).toFixed(4), 'Real Part'];
              if (name === 'Imaginary') return [(value as number).toFixed(4), 'Imaginary Part'];
              return [value, name];
            }}
            labelFormatter={(label) => `${label}`}
          />
          <Scatter
            name="Roots"
            data={scatterData}
            fill={COLORS.CUBIC}
            shape="circle"
          />
        </ScatterChart>
      </ResponsiveContainer>
      <div className="mt-2 text-sm text-center text-gray-400">
        Note: Complex roots are not visualized in this demo version
      </div>
    </>
  );
};
