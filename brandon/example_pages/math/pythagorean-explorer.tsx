"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Slider } from "@components/ui/slider";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type Point = {
  x: number;
  y: number;
};

export const PythagoreanExplorer = () => {
  const [sideA, setSideA] = useState(3);
  const [sideB, setSideB] = useState(4);
  const [points, setPoints] = useState<Point[]>([]);
  const [hypotenuse, setHypotenuse] = useState(5);

  useEffect(() => {
    // Calculate hypotenuse
    const c = Math.sqrt(sideA * sideA + sideB * sideB);
    setHypotenuse(Math.round(c * 100) / 100);

    // Generate points for triangle visualization
    const trianglePoints: Point[] = [
      { x: 0, y: 0 },
      { x: sideA, y: 0 },
      { x: sideA, y: sideB },
      { x: 0, y: 0 }
    ];
    setPoints(trianglePoints);
  }, [sideA, sideB]);

  const squareArea = (side: number): number => Math.round(side * side * 100) / 100;

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Pythagorean Theorem Explorer</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Side A Length: {sideA}</label>
              <Slider
                value={[sideA]}
                onValueChange={(values) => setSideA(values[0])}
                min={1}
                max={10}
                step={0.5}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Side B Length: {sideB}</label>
              <Slider
                value={[sideB]}
                onValueChange={(values) => setSideB(values[0])}
                min={1}
                max={10}
                step={0.5}
                className="w-full"
              />
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Square Areas</h3>
              <p>a² = {squareArea(sideA)}</p>
              <p>b² = {squareArea(sideB)}</p>
              <p>c² = {squareArea(hypotenuse)}</p>
              <p className="mt-2 font-bold">
                {squareArea(sideA)} + {squareArea(sideB)} = {squareArea(hypotenuse)}
              </p>
            </div>
          </div>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <CartesianGrid />
                <XAxis type="number" dataKey="x" domain={[0, Math.max(sideA, sideB) + 1]} />
                <YAxis type="number" dataKey="y" domain={[0, Math.max(sideA, sideB) + 1]} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter
                  data={points}
                  line={{ stroke: '#8884d8' }}
                  lineType="joint"
                  fill="#8884d8"
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50  rounded-lg">
          <h3 className="text-lg font-semibold mb-2">How It Works</h3>
          <p>
            The Pythagorean theorem states that in a right triangle, the square of the hypotenuse (c)
            equals the sum of squares of the other two sides (a and b).
          </p>
          <p className="mt-2 text-xl font-bold text-center">
            a² + b² = c²
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PythagoreanExplorer;
