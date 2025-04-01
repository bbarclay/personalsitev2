import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Button } from '@components/ui/button';
import { Slider } from '@components/ui/slider';
import { Card, CardContent } from '@components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Define the type for a data point
type DataPoint = {
  time: number;
  susceptible: number;
  infected: number;
  recovered: number;
};

const SIREpidemicModelSimulator = () => {
  const [params, setParams] = useState({
    beta: 0.3,
    gamma: 0.1,
    N: 1000,
    I0: 10,
    dt: 0.1,
    tMax: 100
  });

  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [data, setData] = useState<DataPoint[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const animationRef = useRef<number | null>(null);

  // Add type annotations to the CustomTooltip component props
  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: any;
    label?: number;
  }) => {
    if (!active || !payload) return null;

    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <p className="text-gray-900 dark:text-gray-100 font-medium">Time: {Number(label).toFixed(1)}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: {Math.round(entry.value)}
          </p>
        ))}
      </div>
    );
  };

  const runSimulation = useCallback(() => {
    let S = [params.N - params.I0];
    let I = [params.I0];
    let R = [0];
    let t = [0];
    let frame = 0;

    const simulate = () => {
      if (!isRunning) return;

      for (let i = 0; i < animationSpeed; i++) {
        const currentTime = frame * params.dt;
        if (currentTime >= params.tMax) {
          setIsRunning(false);
          return;
        }

        const lastS = S[S.length - 1];
        const lastI = I[I.length - 1];
        const lastR = R[R.length - 1];

        const dS = Math.max(-params.beta * lastS * lastI / params.N, -lastS);
        const dI = Math.max(
          params.beta * lastS * lastI / params.N - params.gamma * lastI,
          -lastI
        );
        const dR = Math.max(params.gamma * lastI, -lastR);

        S.push(lastS + dS * params.dt);
        I.push(lastI + dI * params.dt);
        R.push(lastR + dR * params.dt);
        t.push(currentTime);

        frame++;
      }

      setData(t.map((time, idx) => ({
        time,
        susceptible: Math.round(S[idx]),
        infected: Math.round(I[idx]),
        recovered: Math.round(R[idx])
      })));

      animationRef.current = requestAnimationFrame(simulate);
    };

    simulate();
  }, [params, isRunning, animationSpeed]);

  useEffect(() => {
    if (isRunning) {
      runSimulation();
    } else {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    }
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRunning, runSimulation]);

  const peakInfected = useMemo(() => {
    if (data.length === 0) return 0;
    return Math.max(...data.map(d => d.infected));
  }, [data]);

  const totalInfected = useMemo(() => {
    if (data.length === 0) return params.I0;
    return data[data.length - 1].recovered;
  }, [data, params.I0]);

  return (
    <div className="p-4 space-y-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                    Infection Rate (β): {params.beta}
                  </label>
                  <Slider
                    value={[params.beta * 100]}
                    onValueChange={(value) => setParams(p => ({ ...p, beta: value[0] / 100 }))}
                    max={100}
                    step={1}
                    className="dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                    Recovery Rate (γ): {params.gamma}
                  </label>
                  <Slider
                    value={[params.gamma * 100]}
                    onValueChange={(value) => setParams(p => ({ ...p, gamma: value[0] / 100 }))}
                    max={100}
                    step={1}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                    Initial Infected: {params.I0}
                  </label>
                  <Slider
                    value={[params.I0]}
                    onValueChange={(value) => setParams(p => ({ ...p, I0: value[0] }))}
                    max={params.N / 10}
                    step={1}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                    Animation Speed: {animationSpeed}x
                  </label>
                  <Slider
                    value={[animationSpeed]}
                    onValueChange={(value) => setAnimationSpeed(value[0])}
                    min={1}
                    max={10}
                    step={1}
                  />
                </div>
                <Button
                  onClick={() => setIsRunning(!isRunning)}
                  className="w-full"
                  variant="outline"
                >
                  {isRunning ? 'Stop' : 'Start'} Simulation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="pt-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#374151"
                  />
                  <XAxis
                    dataKey="time"
                    label={{
                      value: 'Time',
                      position: 'bottom',
                      style: { fill: '#9CA3AF' }
                    }}
                    stroke="#9CA3AF"
                  />
                  <YAxis
                    label={{
                      value: 'Population',
                      angle: -90,
                      position: 'left',
                      style: { fill: '#9CA3AF' }
                    }}
                    stroke="#9CA3AF"
                  />
                  <Tooltip content={CustomTooltip} />
                  <Legend
                    wrapperStyle={{
                      color: '#9CA3AF'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="susceptible"
                    stroke="#60A5FA"
                    name="Susceptible"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="infected"
                    stroke="#F87171"
                    name="Infected"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="recovered"
                    stroke="#34D399"
                    name="Recovered"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-4 text-center">
            <h3 className="text-lg font-semibold dark:text-gray-200">R₀ Value</h3>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {(params.beta / params.gamma).toFixed(2)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Basic Reproduction Number</p>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-4 text-center">
            <h3 className="text-lg font-semibold dark:text-gray-200">Peak Infected</h3>
            <p className="text-3xl font-bold text-red-600 dark:text-red-400">
              {peakInfected.toFixed(0)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Maximum Active Cases</p>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-4 text-center">
            <h3 className="text-lg font-semibold dark:text-gray-200">Total Infected</h3>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              {totalInfected.toFixed(0)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Cumulative Cases</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SIREpidemicModelSimulator;
