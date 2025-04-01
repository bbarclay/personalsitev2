import React from 'react';
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

interface TwinPrimeChartsProps {
  labels: string[];
  dataValues: number[];
}

const TwinPrimeCharts: React.FC<TwinPrimeChartsProps> = ({ labels, dataValues }) => {
  const data = labels.map((label, index) => ({
    name: label,
    gap: dataValues[index]
  }));

  return (
    <div className="twin-prime-charts mt-4" style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="gap" fill="rgba(75, 192, 192, 0.6)" name="Prime Gap" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TwinPrimeCharts;
