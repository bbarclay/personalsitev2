import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface GapChartsProps {
  chartData?: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      backgroundColor: string;
    }>;
  };
  height?: number;
}

const defaultData = [
  { name: '5-7', gap: 2 },
  { name: '5-11', gap: 6 },
  { name: '5-13', gap: 8 },
];

const GapCharts: React.FC<GapChartsProps> = ({
  chartData,
  height = 400
}) => {
  const [isClient, setIsClient] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (error) {
    return <div className="chart-error">Error loading chart: {error}</div>;
  }

  // Transform chartData prop to Recharts format if provided
  const data = chartData
    ? chartData.labels.map((label, index) => ({
        name: label,
        gap: chartData.datasets[0].data[index]
      }))
    : defaultData;

  return (
    <div className="gap-charts" style={{ height: `${height}px`, width: '100%', position: 'relative' }}>
      {isClient ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="gap"
              fill="rgba(75, 192, 192, 0.6)"
              name="Prime Gap"
            />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="chart-loading">Loading chart...</div>
      )}
    </div>
  );
}

export default GapCharts;
