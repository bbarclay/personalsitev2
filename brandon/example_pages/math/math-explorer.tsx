import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Utility functions
const utils = {
  isPrime: (n: number): boolean => {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    for (let i = 5; i * i <= n; i += 6) {
      if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
  },

  collatzNext: (n: number): number => n % 2 === 0 ? n / 2 : 3 * n + 1,

  getBinaryPattern: (n: number): { value: string; trailingZeros: number; pattern: string } => {
    const binary = n.toString(2);
    return {
      value: binary,
      trailingZeros: binary.length - binary.replace(/0+$/, '').length,
      pattern: binary.replace(/0+$/, '')
    };
  },

  generateSequence: (start: number, type: string): { step: number; value: number; isPrime: boolean; binary: { value: string; trailingZeros: number; pattern: string } }[] => {
    const sequence = [start];
    let current = start;

    while (current !== 1 && sequence.length < 100) {
      current = utils.collatzNext(current);
      sequence.push(current);
    }

    return sequence.map((n, i) => ({
      step: i,
      value: n,
      isPrime: utils.isPrime(n),
      binary: utils.getBinaryPattern(n)
    }));
  }
};

// Visualization Components
const VisualizationCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

const ChartView: React.FC<{ data: Array<{ step: number; value: number; isPrime: boolean; binary: { value: string; trailingZeros: number; pattern: string } }>; dataKey?: string; title: string }> = ({ data, dataKey = "value", title }) => (
  <VisualizationCard title={title}>
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="step" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey={dataKey} stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </VisualizationCard>
);

const BinaryPatternView: React.FC<{ sequence: { isPrime: boolean; binary: { trailingZeros: number; pattern: string } }[] }> = ({ sequence }) => (
  <div className="grid grid-cols-8 gap-1">
    {sequence.map((item, i) => (
      <div
        key={i}
        className={`p-2 text-center text-sm rounded ${item.isPrime ? 'bg-blue-500 text-white' :
            item.binary.trailingZeros > 2 ? 'bg-green-500 text-white' :
              'bg-gray-200'
          }`}
      >
        {item.binary.pattern}
      </div>
    ))}
  </div>
);

const MathExplorer: React.FC = () => {
  const [number, setNumber] = useState(7);
  const [sequence, setSequence] = useState<{ step: number; value: number; isPrime: boolean; binary: { value: string; trailingZeros: number; pattern: string } }[]>([]);

  // Generate sequence when number changes
  useEffect(() => {
    setSequence(utils.generateSequence(number, 'collatz'));
  }, [number]);

  // Derived statistics
  const stats = useMemo(() => ({
    primeCount: sequence.filter(n => n.isPrime).length,
    maxValue: Math.max(...sequence.map(n => n.value)),
    uniquePatterns: new Set(sequence.map(n => n.binary.pattern)).size
  }), [sequence]);

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Mathematical Pattern Explorer</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 mb-6">
          <Input
            type="number"
            value={number}
            onChange={(e) => setNumber(parseInt(e.target.value) || 1)}
            className="w-32"
          />
          <div className="flex gap-2">
            <Button onClick={() => setNumber(n => n - 1)}>Previous</Button>
            <Button onClick={() => setNumber(n => n + 1)}>Next</Button>
          </div>
        </div>

        <Tabs defaultValue="sequence">
          <TabsList>
            <TabsTrigger value="sequence">Sequence</TabsTrigger>
            <TabsTrigger value="patterns">Patterns</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
          </TabsList>

          <TabsContent value="sequence">
            <ChartView
              data={sequence}
              title="Collatz Sequence"
            />
          </TabsContent>

          <TabsContent value="patterns">
            <VisualizationCard title="Binary Patterns">
              <BinaryPatternView sequence={sequence} />
            </VisualizationCard>
          </TabsContent>

          <TabsContent value="stats">
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded">
                <div className="text-lg font-bold">{stats.primeCount}</div>
                <div className="text-sm">Primes Found</div>
              </div>
              <div className="p-4 bg-green-50 rounded">
                <div className="text-lg font-bold">{stats.maxValue}</div>
                <div className="text-sm">Max Value</div>
              </div>
              <div className="p-4 bg-purple-50 rounded">
                <div className="text-lg font-bold">{stats.uniquePatterns}</div>
                <div className="text-sm">Unique Patterns</div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MathExplorer;
