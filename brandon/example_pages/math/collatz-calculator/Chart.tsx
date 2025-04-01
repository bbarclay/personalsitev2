import React from 'react';
import { useTheme } from 'next-themes';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { CalculationResult } from './types';
import { ChartColors } from './hooks/useChartTransformations';
import { DARK_MODE_COLORS, TRANSFORMATION_LABELS } from './constants';

interface ChartProps {
  transformation: string;
  chartData: Array<{ step: number; standard?: number; custom?: number }>;
  standardResults: CalculationResult | null;
  customResults: CalculationResult | null;
  colors: ChartColors;
}

const Chart: React.FC<ChartProps> = ({
  transformation,
  chartData,
  standardResults,
  customResults,
  colors,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const themeColors = {
    background: 'transparent',
    text: 'hsl(var(--foreground))',
    grid: 'hsl(var(--foreground) / 0.1)',
    axis: 'hsl(var(--foreground) / 0.7)',
    tooltip: {
      bg: 'hsl(var(--background) / 0.8)',
      border: 'hsl(var(--foreground) / 0.1)',
      text: 'hsl(var(--foreground))',
    },
  };

  return (
    <div className="glass-panel mb-6">
      <h4 className="text-title capitalize mb-4">
        {TRANSFORMATION_LABELS[transformation as keyof typeof TRANSFORMATION_LABELS]}
      </h4>
      <div className="glass-container h-96 p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={themeColors.grid}
              opacity={0.5}
            />
            <XAxis
              dataKey="step"
              stroke={themeColors.axis}
              tick={{ fontSize: 12, fill: themeColors.axis }}
              tickLine={{ stroke: themeColors.axis }}
              label={{
                value: 'Step',
                position: 'insideBottom',
                offset: -5,
                fill: themeColors.axis,
                style: { fontWeight: 500 }
              }}
            />
            <YAxis
              domain={
                transformation === 'logarithmic'
                  ? [1, 'auto']
                  : transformation === 'inverse'
                  ? [0, 'auto']
                  : ['auto', 'auto']
              }
              type="number"
              scale={transformation === 'logarithmic' ? 'log' : 'linear'}
              allowDataOverflow={transformation === 'logarithmic'}
              stroke={themeColors.axis}
              tick={{ fontSize: 12, fill: themeColors.axis }}
              tickLine={{ stroke: themeColors.axis }}
              label={{
                value: 'Value',
                angle: -90,
                position: 'insideLeft',
                offset: 10,
                fill: themeColors.axis,
                style: { fontWeight: 500 }
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: themeColors.tooltip.bg,
                border: `1px solid ${themeColors.tooltip.border}`,
                borderRadius: '8px',
                color: themeColors.tooltip.text,
                boxShadow: isDark ? '0 4px 6px rgba(0, 0, 0, 0.3)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
                padding: '8px 12px'
              }}
              labelStyle={{
                color: themeColors.tooltip.text,
                fontWeight: 600,
                marginBottom: '4px'
              }}
              itemStyle={{
                color: themeColors.tooltip.text
              }}
            />
            {/* Standard Line */}
            {standardResults && (
              <Line
                type="monotone"
                dataKey="standard"
                stroke={colors.standard}
                dot={false}
                name="Standard"
                strokeWidth={2}
                animationDuration={500}
              />
            )}
            {/* Custom Line */}
            {customResults && (
              <Line
                type="monotone"
                dataKey="custom"
                stroke={colors.custom}
                dot={false}
                name="Custom"
                strokeWidth={2}
                animationDuration={500}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
      {/* Display Sequence */}
      <div className="mt-4 space-y-4">
        {standardResults && (
          <div className="rounded-lg overflow-hidden">
            <p className="text-title mb-2">Standard Sequence:</p>
            <div className="glass-container max-h-40 overflow-y-auto p-3">
              {standardResults.sequence.map(
                (
                  item: { step: number; value: number },
                  idx: number
                ) => (
                  <span key={idx} className="mr-2 font-mono text-foreground">
                    {item.value}
                    {idx < standardResults.sequence.length - 1
                      ? ' → '
                      : ''}
                  </span>
                )
              )}
            </div>
          </div>
        )}
        {customResults && (
          <div className="rounded-lg overflow-hidden">
            <p className="text-title mb-2">Custom Sequence:</p>
            <div className="glass-container max-h-40 overflow-y-auto p-3">
              {customResults.sequence.map(
                (item: { value: number }, idx: number) => (
                  <span key={idx} className="mr-2 font-mono text-foreground">
                    {item.value}
                    {idx < customResults.sequence.length - 1
                      ? ' → '
                      : ''}
                  </span>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chart;
