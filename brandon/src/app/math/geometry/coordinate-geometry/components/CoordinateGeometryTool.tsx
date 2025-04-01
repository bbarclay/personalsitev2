'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GeometryPlotter } from './GeometryPlotter';
import { DistanceCalculator } from './DistanceCalculator';
import { LineEquationTool } from './LineEquationTool';
import { CircleEquationTool } from './CircleEquationTool';
import { IntersectionCalculator } from './IntersectionCalculator';
import { ProblemGenerator } from './ProblemGenerator';
import { motion } from 'framer-motion';

export const CoordinateGeometryTool: React.FC = () => {
  const [activePoints, setActivePoints] = useState<{id: string, x: number, y: number, color: string}[]>([]);
  const [activeLines, setActiveLines] = useState<{id: string, start: [number, number], end: [number, number], equation: string, color: string}[]>([]);
  const [activeCircles, setActiveCircles] = useState<{id: string, center: [number, number], radius: number, equation: string, color: string}[]>([]);

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-600 mb-4">
          Coordinate Geometry Explorer
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Visualize, calculate, and explore coordinate geometry concepts with this interactive tool.
          Plot points, lines, and circles, calculate distances and intersections, and solve geometry problems.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <GeometryPlotter 
            points={activePoints}
            lines={activeLines}
            circles={activeCircles}
            onPointsChange={setActivePoints}
            onLinesChange={setActiveLines}
            onCirclesChange={setActiveCircles}
          />
        </div>
        
        <div className="lg:col-span-1">
          <Tabs defaultValue="distance" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="distance">Distance</TabsTrigger>
              <TabsTrigger value="equations">Equations</TabsTrigger>
              <TabsTrigger value="practice">Practice</TabsTrigger>
            </TabsList>
            
            <TabsContent value="distance">
              <DistanceCalculator points={activePoints} />
              <IntersectionCalculator 
                points={activePoints}
                lines={activeLines}
                circles={activeCircles}
              />
            </TabsContent>
            
            <TabsContent value="equations">
              <LineEquationTool 
                points={activePoints}
                lines={activeLines}
                onLineAdded={(line) => setActiveLines([...activeLines, line])}
              />
              <CircleEquationTool 
                points={activePoints}
                circles={activeCircles}
                onCircleAdded={(circle) => setActiveCircles([...activeCircles, circle])}
              />
            </TabsContent>
            
            <TabsContent value="practice">
              <ProblemGenerator 
                onProblemLoaded={(points, lines, circles) => {
                  setActivePoints(points);
                  setActiveLines(lines);
                  setActiveCircles(circles);
                }}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
