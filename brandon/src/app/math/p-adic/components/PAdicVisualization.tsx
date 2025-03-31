import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { calculatePAdicExpansion } from '../utils/pAdicUtils';
import { PAdicTree } from './tree/PAdicTree';
import { PAdicVisualizationProps } from '../types/visualization';

const PAdicVisualization: React.FC<PAdicVisualizationProps> = ({ prime, depth: initialDepth, highlightNumber = 1 }) => {
  const [depth, setDepth] = useState(initialDepth);
  const [autoRotate, setAutoRotate] = useState(true);
  const [expansion, setExpansion] = useState<number[]>([]);
  const [showStars, setShowStars] = useState(true);
  const [cameraPosition, setCameraPosition] = useState(0);

  useEffect(() => {
    const newExpansion = calculatePAdicExpansion(highlightNumber.toString(), prime, depth);
    setExpansion(newExpansion);
  }, [highlightNumber, prime, depth]);

  // Camera animation positions
  const cameraPositions: [number, number, number][] = [
    [0, 0, 10],    // Front view
    [10, 0, 0],    // Side view
    [10, -10, 10], // Diagonal view
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <motion.div className="flex justify-between items-center" layout>
          <CardTitle>p-adic Tree Visualization</CardTitle>
          <div className="flex items-center space-x-2">
            <motion.div
              animate={{ rotate: autoRotate ? 360 : 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-6 h-6"
            >
              🌳
            </motion.div>
            <motion.div
              animate={{ opacity: showStars ? 1 : 0.5 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => setShowStars(!showStars)}
              className="cursor-pointer"
            >
              ✨
            </motion.div>
          </div>
        </motion.div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="aspect-[16/9] bg-gray-900 rounded-lg overflow-hidden relative">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full"
            >
              <Canvas
                camera={{
                  position: cameraPositions[cameraPosition],
                  fov: 75,
                }}
                shadows
              >
                <color attach="background" args={['#111']} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} castShadow />
                
                {showStars && <Stars radius={50} depth={50} count={5000} factor={4} />}
                
                <fog attach="fog" args={['#111', 20, 40]} />
                
                <OrbitControls
                  autoRotate={autoRotate}
                  autoRotateSpeed={1}
                  enableZoom={true}
                  enablePan={true}
                  minDistance={5}
                  maxDistance={20}
                />
                
                <PAdicTree p={prime} depth={depth} expansion={expansion} />
              </Canvas>
            </motion.div>
          </AnimatePresence>

          {/* Camera position controls */}
          <div className="absolute bottom-4 left-4 flex space-x-2">
            {cameraPositions.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCameraPosition(index)}
                className={`p-2 rounded-full ${
                  cameraPosition === index
                    ? 'bg-blue-500'
                    : 'bg-gray-700'
                }`}
              >
                {index + 1}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Tree Depth: {depth}</span>
              <motion.span
                key={Math.pow(prime, depth) - 1}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-sm text-gray-500"
              >
                Showing {Math.pow(prime, depth) - 1} nodes
              </motion.span>
            </div>
            <Slider
              value={[depth]}
              min={1}
              max={6}
              step={1}
              onValueChange={([value]) => setDepth(value)}
            />
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Animation Controls</span>
            <div className="space-x-2">
              <Button
                variant={autoRotate ? "default" : "outline"}
                onClick={() => setAutoRotate(!autoRotate)}
              >
                {autoRotate ? "Stop" : "Start"} Rotation
              </Button>
              <Button
                variant={showStars ? "default" : "outline"}
                onClick={() => setShowStars(!showStars)}
              >
                {showStars ? "Hide" : "Show"} Stars
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-sm space-y-2">
          <p>
            <strong>Reading the tree:</strong> Each level represents a digit position
            in the p-adic expansion. Green nodes show the path of your number.
          </p>
          <p>
            <strong>Controls:</strong> Drag to rotate, scroll to zoom, and right-click
            to pan. Use the camera buttons to switch between views.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PAdicVisualization;
