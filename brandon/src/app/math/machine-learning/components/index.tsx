// Import necessary libraries and components
import React, { useState, useEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { AlertCircle, BrainCircuit } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import * as THREE from 'three';
import _ from 'lodash';

// Import shadcn/ui components
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

// Define interfaces for data points and weights
interface DataPoint {
  x: number;
  y: number;
  label: number;
}

interface Weights {
  [index: number]: number;
}

const NeuralNetworkViz = () => {
  const [iteration, setIteration] = useState(0);
  const [data, setData] = useState<DataPoint[]>([]);
  const [weights, setWeights] = useState<Weights>({ 0: 0, 1: 0, 2: 0 }); // Initialize with zeros
  const [loss, setLoss] = useState<number[]>([]);
  const [isTraining, setIsTraining] = useState(false);
  const [learningRate, setLearningRate] = useState(0.1);
  const [batchSize, setBatchSize] = useState(10);

  // Generate synthetic data points
  const generateData = (): DataPoint[] => {
    const points: DataPoint[] = [];
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * 2 - 1;
      const y = Math.random() * 2 - 1;
      // Non-linear decision boundary: x^2 + y^2 < 0.5
      const label = x * x + y * y < 0.5 ? 1 : 0;
      points.push({ x, y, label });
    }
    return points;
  };

  // Initialize data and start training
  useEffect(() => {
    setData(generateData());
    setIsTraining(true);
    // Initialize with small random weights
    setWeights({
      0: Math.random() * 0.2 - 0.1,
      1: Math.random() * 0.2 - 0.1,
      2: Math.random() * 0.2 - 0.1,
    });
  }, []);

  // Neural network forward pass
  const sigmoid = (x: number): number => 1 / (1 + Math.exp(-x));

  const predict = (point: DataPoint, w: Weights): number => {
    return sigmoid(w[0] + w[1] * point.x + w[2] * point.y);
  };

  // Training step
  useEffect(() => {
    if (!isTraining || data.length === 0) return;

    const interval = setInterval(() => {
      if (iteration < 200) {
        setWeights((prevWeights) => {
          const newWeights = { ...prevWeights };

          // Mini-batch gradient descent
          const batch = _.sampleSize(data, batchSize);
          const gradients = { 0: 0, 1: 0, 2: 0 };

          batch.forEach((point: DataPoint) => {
            const prediction = predict(point, prevWeights);
            const error = prediction - point.label;

            gradients[0] += error;
            gradients[1] += error * point.x;
            gradients[2] += error * point.y;
          });

          // Update weights
          for (let i = 0; i < 3; i++) {
            const key = i as 0 | 1 | 2;
            newWeights[key] -= (learningRate * gradients[key]) / batch.length;
          }

          // Calculate loss
          const totalLoss =
            _.sumBy(data, (point) => {
              const pred = predict(point, newWeights);
              return (
                -point.label * Math.log(pred + 1e-10) -
                (1 - point.label) * Math.log(1 - pred + 1e-10)
              );
            }) / data.length;

          setLoss((prev: number[]) => [...prev, totalLoss]);

          return newWeights;
        });
        setIteration((prev) => prev + 1);
      } else {
        setIsTraining(false);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [iteration, data, isTraining, learningRate, batchSize]);

  // Generate mesh data for the decision boundary surface
  const [surfaceVertices, surfaceIndices, surfaceColors] = useMemo(() => {
    const vertices = [];
    const indices = [];
    const colors = [];

    const size = 50;
    const step = 2 / size;

    for (let i = 0; i <= size; i++) {
      for (let j = 0; j <= size; j++) {
        const x = -1 + i * step;
        const y = -1 + j * step;
        const z = predict({ x, y, label: 0 }, weights);
        vertices.push(x, z * 1.5 - 0.75, y); // Adjusted for better visualization

        // Map z to color
        const colorValue = z;
        colors.push(1 - colorValue, colorValue, 0); // Gradient from red to green
      }
    }

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const a = i * (size + 1) + j;
        const b = a + 1;
        const c = a + (size + 1);
        const d = c + 1;

        // Two triangles for each square
        indices.push(a, b, d);
        indices.push(a, d, c);
      }
    }

    return [
      new Float32Array(vertices),
      new Uint16Array(indices),
      new Float32Array(colors),
    ];
  }, [weights]);

  // 3D Surface component
  const Surface = () => {
    return (
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attach="attributes-position"
            count={surfaceVertices.length / 3}
            array={surfaceVertices}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={surfaceColors.length / 3}
            array={surfaceColors}
            itemSize={3}
          />
          <bufferAttribute
            attach="index"
            array={surfaceIndices}
            count={surfaceIndices.length}
          />
        </bufferGeometry>
        <meshStandardMaterial
          vertexColors
          side={THREE.DoubleSide}
          wireframe={false}
        />
      </mesh>
    );
  };

  // Render data points as spheres
  const DataPoints = () => {
    return data.map((point, i) => (
      <mesh key={i} position={[point.x, -0.75, point.y]}>
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshStandardMaterial
          color={point.label === 1 ? '#22c55e' : '#ef4444'}
        />
      </mesh>
    ));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <BrainCircuit className="w-6 h-6 text-purple-600" />
        <h2 className="text-2xl font-bold text-gray-800">
          Neural Network Training Visualization
        </h2>
      </div>

      <div className="mb-4">
        <Alert>
          <AlertCircle className="w-4 h-4" />
          <AlertTitle>Live Training</AlertTitle>
          <AlertDescription>
            Watching a neural network learn a non-linear decision boundary in
            real-time. Iteration: {iteration}/200
          </AlertDescription>
        </Alert>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        {/* 3D Visualization */}
        <div className="flex-1 h-96">
          <Canvas camera={{ position: [0, 2, 2], fov: 60 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} />
            <Surface />
            <DataPoints />
            <OrbitControls enablePan={false} />
          </Canvas>
        </div>

        {/* Loss Curve */}
        <div className="flex-1">
          <LineChart
            width={400}
            height={300}
            data={loss.map((l, i) => ({ iteration: i, loss: l }))}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="iteration" />
            <YAxis domain={[0, Math.max(...loss) * 1.1]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="loss"
              stroke="#6366f1"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-gray-50 rounded-lg">
          <Label htmlFor="learning-rate-slider" className="text-sm text-gray-500">
            Learning Rateaz
          </Label>
          <Slider
            id="learning-rate-slider"
            min={0.01}
            max={1}
            step={0.01}
            defaultValue={[learningRate]}
            onValueChange={(val) => setLearningRate(val[0])}
            className="mt-2"
          />
          <div className="text-lg font-mono mt-2">
            {learningRate.toFixed(2)}
          </div>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <Label htmlFor="batch-size-slider" className="text-sm text-gray-500">
            Batch Size
          </Label>
          <Slider
            id="batch-size-slider"
            min={1}
            max={50}
            step={1}
            defaultValue={[batchSize]}
            onValueChange={(val) => setBatchSize(val[0])}
            className="mt-2"
          />
          <div className="text-lg font-mono mt-2">{batchSize}</div>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-500">Weights</div>
          <div className="mt-2">
            {Object.keys(weights).map((key) => (
              <div key={key} className="text-lg font-mono">
                w{key}: {weights[Number(key)].toFixed(3)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeuralNetworkViz;
