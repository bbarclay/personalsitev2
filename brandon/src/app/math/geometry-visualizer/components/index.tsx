"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  OrbitControls,
  MeshDistortMaterial,
  Sphere,
  Box,
  Cone,
  Torus,
  Cylinder,
  Html,
  Environment,
  Stars,
  Text3D,
  Icosahedron,
  Octahedron,
  TorusKnot,
  Ring,
} from '@react-three/drei';
import {
  Calculator,
  Sparkles,
  RefreshCw,
  Download,
  Share2,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  Shuffle,
  RotateCcw,
  Wand2
} from 'lucide-react';
import { Mesh, Color, Vector3 } from 'three';
import { gsap } from 'gsap';

interface ShapeProps {
  size: number;
  color: string;
  distort: number;
  speed: number;
  complexity: number;
  position?: [number, number, number];
}

type ShapeType = 'sphere' | 'cube' | 'cone' | 'torus' | 'cylinder' |
  'icosahedron' | 'octahedron' | 'torusKnot' | 'ring';

const formulas = {
  sphere: {
    volume: '\\frac{4}{3}\\pi r^3',
    surface: '4\\pi r^2',
    description: 'Perfect symmetry in all directions',
    funFact: 'Soap bubbles naturally form spheres to minimize surface tension'
  },
  cube: {
    volume: 'a^3',
    surface: '6a^2',
    description: 'Equal length sides meeting at right angles',
    funFact: 'The only regular hexahedron and one of the five Platonic solids'
  },
  cone: {
    volume: '\\frac{1}{3}\\pi r^2h',
    surface: '\\pi r^2 + \\pi r\\sqrt{h^2 + r^2}',
    description: 'Circular base tapering to a point',
    funFact: 'Ancient Greeks used conic sections to solve the famous Delian problem'
  },
  torus: {
    volume: '2\\pi^2 R r^2',
    surface: '4\\pi^2 R r',
    description: 'Ring-shaped surface with major and minor radii',
    funFact: 'Topology considers coffee cups and donuts to be equivalent shapes'
  },
  cylinder: {
    volume: '\\pi r^2h',
    surface: '2\\pi r^2 + 2\\pi rh',
    description: 'Constant cross-section along height',
    funFact: 'Ancient civilizations used cylinders to store scrolls and documents'
  },
  icosahedron: {
    volume: '\\frac{5}{12}(3+\\sqrt{5})a^3',
    surface: '5\\sqrt{3}a^2',
    description: 'Twenty triangular faces',
    funFact: 'Used in many modern dice games and role-playing games'
  },
  octahedron: {
    volume: '\\frac{\\sqrt{2}}{3}a^3',
    surface: '2\\sqrt{3}a^2',
    description: 'Eight triangular faces',
    funFact: 'Represents the d8 die in tabletop gaming'
  },
  torusKnot: {
    volume: 'Complex!',
    surface: 'Varies by parameters',
    description: 'A knot wrapped around a torus surface',
    funFact: 'Used in studying DNA supercoiling and molecular structures'
  },
  ring: {
    volume: '2\\pi^2 R r^2',
    surface: '4\\pi^2 R r',
    description: 'A simplified torus',
    funFact: 'The symbol of eternity in many cultures'
  }
};

// Predefined color schemes
const colorSchemes = [
  ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'],
  ['#D4A5A5', '#9D8189', '#767C77', '#60495A', '#3F3244'],
  ['#845EC2', '#D65DB1', '#FF6F91', '#FF9671', '#FFC75F'],
  ['#00B8A9', '#F8F3D4', '#F6416C', '#FFDE7D', '#8F44FD'],
  ['#ECF9FF', '#83A2FF', '#B4BDFF', '#FFE5F1', '#FF55BB'],
];

const AnimatedShape: React.FC<{
  shape: ShapeType;
  props: ShapeProps;
  isSpinning: boolean;
}> = ({ shape, props, isSpinning }) => {
  const meshRef = useRef<Mesh>(null!);
  const { size, color, distort, speed, complexity } = props;

  // Shape-specific arguments
  const getShapeArgs = (shape: ShapeType, size: number, complexity: number): any[] => {
    switch (shape) {
      case 'sphere':
        return [size, complexity * 8, complexity * 8];
      case 'cube':
        return [size, size, size];
      case 'cone':
        return [size * 0.8, size * 1.5, complexity * 8];
      case 'torus':
        return [size * 0.8, size * 0.3, complexity * 8, complexity * 8];
      case 'cylinder':
        return [size * 0.8, size * 0.8, complexity * 8];
      case 'icosahedron':
        return [size, 0]; // Icosahedron doesn't use complexity
      case 'octahedron':
        return [size, 0]; // Octahedron doesn't use complexity
      case 'torusKnot':
        return [size * 0.6, size * 0.2, 128, 16, 2, 3];
      case 'ring':
        return [size * 0.8, size * 0.2, complexity * 8];
      default:
        return [size];
    }
  };

  useFrame((state, delta) => {
    if (isSpinning && meshRef.current) {
      meshRef.current.rotation.y += delta * speed;
      meshRef.current.rotation.x += delta * speed * 0.5;
    }
  });

  useEffect(() => {
    if (meshRef.current) {
      gsap.to(meshRef.current.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
        from: { x: 0, y: 0, z: 0 }
      });
    }
  }, [shape]);

  const ShapeComponent = {
    sphere: Sphere,
    cube: Box,
    cone: Cone,
    torus: Torus,
    cylinder: Cylinder,
    icosahedron: Icosahedron,
    octahedron: Octahedron,
    torusKnot: TorusKnot,
    ring: Ring
  }[shape];

  return (
    <mesh ref={meshRef}>
      <ShapeComponent args={getShapeArgs(shape, size, complexity) as [number, number]}>
        <MeshDistortMaterial
          color={color}
          distort={distort}
          speed={2}
          envMapIntensity={0.8}
          clearcoat={0.8}
          clearcoatRoughness={0.2}
          metalness={0.5}
        />
      </ShapeComponent>
    </mesh>
  );
};

const Scene: React.FC<{
  shape: ShapeType;
  size: number;
  color: string;
  speed: number;
  complexity: number;
  isSpinning: boolean;
}> = ({ shape, size, color, speed, complexity, isSpinning }) => {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(3, 3, 5);
  }, [camera]);

  return (
    <>
      <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />
      <Environment preset="sunset" />
      <AnimatedShape
        shape={shape}
        props={{
          size,
          color,
          distort: 0.3,
          speed,
          complexity,
          position: [0, 0, 0]
        }}
        isSpinning={isSpinning}
      />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <OrbitControls enableDamping dampingFactor={0.05} />
    </>
  );
};

export const GeometryVisualizer: React.FC = () => {
  const [shape, setShape] = useState<ShapeType>('sphere');
  const [size, setSize] = useState<number>(1);
  const [color, setColor] = useState<string>('#4f46e5');
  const [speed, setSpeed] = useState<number>(1);
  const [complexity, setComplexity] = useState<number>(2);
  const [isSpinning, setIsSpinning] = useState<boolean>(true);
  const [currentColorScheme, setCurrentColorScheme] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const randomizeShape = () => {
    const shapes: ShapeType[] = ['sphere', 'cube', 'cone', 'torus', 'cylinder', 'icosahedron', 'octahedron', 'torusKnot', 'ring'];
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    setShape(randomShape);
    setSize(0.5 + Math.random() * 1.5);
    setSpeed(0.5 + Math.random() * 2);
    setComplexity(1 + Math.random() * 3);
    const randomScheme = colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
    setColor(randomScheme[Math.floor(Math.random() * randomScheme.length)]);
  };

  const cycleColorScheme = () => {
    const newScheme = (currentColorScheme + 1) % colorSchemes.length;
    setCurrentColorScheme(newScheme);
    setColor(colorSchemes[newScheme][0]);
  };

  const handleDownload = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = `geometry-${shape}.png`;
      link.href = canvasRef.current.toDataURL();
      link.click();
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900">
      <div className="container mx-auto px-4 py-8" ref={containerRef}>
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl p-6 space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Sparkles className="w-8 h-8 text-yellow-400" />
              <h1 className="text-3xl font-bold text-white">
                3D Geometry Explorer
              </h1>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={randomizeShape}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                <Shuffle size={20} />
                <span>Random</span>
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Download size={20} />
                <span>Export</span>
              </button>
              <button
                onClick={toggleFullscreen}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                <span>{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
              </button>
            </div>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Shape
              </label>
              <select
                value={shape}
                onChange={(e) => setShape(e.target.value as ShapeType)}
                className="w-full rounded-lg border border-gray-600 bg-gray-700 p-2 text-white"
              >
                <option value="sphere">Sphere</option>
                <option value="cube">Cube</option>
                <option value="cone">Cone</option>
                <option value="torus">Torus</option>
                <option value="cylinder">Cylinder</option>
                <option value="icosahedron">Icosahedron</option>
                <option value="octahedron">Octahedron</option>
                <option value="torusKnot">Torus Knot</option>
                <option value="ring">Ring</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Size
              </label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full accent-purple-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Rotation Speed
              </label>
              <input
                type="range"
                min="0"
                max="3"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-full accent-purple-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Detail Level
              </label>
              <input
                type="range"
                min="1"
                max="4"
                step="0.5"
                value={complexity}
                onChange={(e) => setComplexity(Number(e.target.value))}
                className="w-full accent-purple-500"
              />
            </div>
          </div>

          {/* Color Palette */}
          <div className="flex space-x-4 items-center">
            <div className="flex space-x-2">
              {colorSchemes[currentColorScheme].map((clr, index) => (
                <button
                  key={index}
                  onClick={() => setColor(clr)}
                  className="w-8 h-8 rounded-full border-2 border-white/20 transition-transform hover:scale-110"
                  style={{ backgroundColor: clr }}
                />
              ))}
            </div>
            <button
              onClick={cycleColorScheme}
              className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white"
            >
              <RefreshCw size={20} />
            </button>
          </div>

          {/* 3D Viewer */}
          <div className="relative">
            <div className={`${isFullscreen ? 'h-screen' : 'h-96'} rounded-xl overflow-hidden border border-gray-700`}>
              <Canvas ref={canvasRef} camera={{ position: [0, 0, 5] }}>
                <Scene
                  shape={shape}
                  size={size}
                  color={color}
                  speed={speed}
                  complexity={complexity}
                  isSpinning={isSpinning}
                />
              </Canvas>
              <button
                onClick={() => setIsSpinning(!isSpinning)}
                className="absolute top-4 right-4 p-2 bg-gray-700 bg-opacity-50 rounded-full text-white hover:bg-opacity-75"
              >
                {isSpinning ? <Pause size={20} /> : <Play size={20} />}
              </button>
            </div>
          </div>

          {/* Fun Facts */}
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Calculator className="w-6 h-6 text-yellow-400" />
              <h2 className="text-2xl font-semibold text-white">Fun Facts</h2>
            </div>
            <p className="text-gray-300">
              {formulas[shape].funFact}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeometryVisualizer;
