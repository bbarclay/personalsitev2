"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { AlertCircle, Info, Lightbulb } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Point {
  id: string;
  x: number;
  y: number;
  color: string;
}

interface Line {
  id: string;
  start: [number, number];
  end: [number, number];
  equation: string;
  color: string;
}

interface Circle {
  id: string;
  center: [number, number];
  radius: number;
  equation: string;
  color: string;
}

interface Problem {
  description: string;
  question: string;
  points: Point[];
  lines: Line[];
  circles: Circle[];
  solution?: string;
}

interface ProblemGeneratorProps {
  onProblemLoaded: (points: Point[], lines: Line[], circles: Circle[]) => void;
}

const randomColor = (): string => {
  const colors = [
    '#4F46E5', // Indigo
    '#3B82F6', // Blue
    '#0EA5E9', // Light Blue
    '#10B981', // Emerald
    '#F59E0B', // Amber
    '#EF4444', // Red
    '#EC4899', // Pink
    '#8B5CF6'  // Purple
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export function ProblemGenerator({ onProblemLoaded }: ProblemGeneratorProps) {
  const [problemType, setProblemType] = useState<string>('distance');
  const [difficulty, setDifficulty] = useState<number>(50);
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);
  const [showSolution, setShowSolution] = useState<boolean>(false);

  const generateProblem = () => {
    let problem: Problem;
    
    switch (problemType) {
      case 'distance':
        problem = generateDistanceProblem(difficulty);
        break;
      case 'midpoint':
        problem = generateMidpointProblem(difficulty);
        break;
      case 'slope':
        problem = generateSlopeProblem(difficulty);
        break;
      case 'lineEquation':
        problem = generateLineEquationProblem(difficulty);
        break;
      case 'circleEquation':
        problem = generateCircleEquationProblem(difficulty);
        break;
      case 'intersection':
        problem = generateIntersectionProblem(difficulty);
        break;
      default:
        problem = generateDistanceProblem(difficulty);
    }
    
    setCurrentProblem(problem);
    setShowSolution(false);
    onProblemLoaded(problem.points, problem.lines, problem.circles);
  };

  const generateDistanceProblem = (difficultyLevel: number): Problem => {
    // Generate points based on difficulty
    const useIntegers = difficultyLevel < 70;
    const point1 = generateRandomPoint(useIntegers);
    const point2 = generateRandomPoint(useIntegers);
    
    // Calculate solution
    const distance = Math.sqrt(
      Math.pow(point2.x - point1.x, 2) + 
      Math.pow(point2.y - point1.y, 2)
    );
    
    return {
      description: "Distance between Points",
      question: `Find the distance between points A(${point1.x}, ${point1.y}) and B(${point2.x}, ${point2.y}).`,
      points: [point1, point2],
      lines: [],
      circles: [],
      solution: `The distance is ${distance.toFixed(2)} units.`
    };
  };

  const generateMidpointProblem = (difficultyLevel: number): Problem => {
    // Generate points based on difficulty
    const useIntegers = difficultyLevel < 70;
    const point1 = generateRandomPoint(useIntegers);
    const point2 = generateRandomPoint(useIntegers);
    
    // Calculate solution
    const midpointX = (point1.x + point2.x) / 2;
    const midpointY = (point1.y + point2.y) / 2;
    
    return {
      description: "Midpoint Formula",
      question: `Find the midpoint of the line segment joining A(${point1.x}, ${point1.y}) and B(${point2.x}, ${point2.y}).`,
      points: [point1, point2],
      lines: [{
        id: `line-${Date.now()}`,
        start: [point1.x, point1.y],
        end: [point2.x, point2.y],
        equation: `Line from (${point1.x}, ${point1.y}) to (${point2.x}, ${point2.y})`,
        color: randomColor()
      }],
      circles: [],
      solution: `The midpoint is (${midpointX.toFixed(2)}, ${midpointY.toFixed(2)}).`
    };
  };

  const generateSlopeProblem = (difficultyLevel: number): Problem => {
    // Generate points based on difficulty
    const useIntegers = difficultyLevel < 70;
    const point1 = generateRandomPoint(useIntegers);
    let point2 = generateRandomPoint(useIntegers);
    
    // Ensure points are not identical
    while (point1.x === point2.x && point1.y === point2.y) {
      point2 = generateRandomPoint(useIntegers);
    }
    
    // Calculate solution
    let slope: number | string;
    if (point1.x === point2.x) {
      slope = "undefined (vertical line)";
    } else {
      slope = (point2.y - point1.y) / (point2.x - point1.x);
    }
    
    return {
      description: "Slope of a Line",
      question: `Find the slope of the line passing through points A(${point1.x}, ${point1.y}) and B(${point2.x}, ${point2.y}).`,
      points: [point1, point2],
      lines: [{
        id: `line-${Date.now()}`,
        start: [point1.x, point1.y],
        end: [point2.x, point2.y],
        equation: `Line from (${point1.x}, ${point1.y}) to (${point2.x}, ${point2.y})`,
        color: randomColor()
      }],
      circles: [],
      solution: typeof slope === 'number' ? `The slope is ${slope.toFixed(2)}.` : `The slope is ${slope}.`
    };
  };

  const generateLineEquationProblem = (difficultyLevel: number): Problem => {
    // Generate points based on difficulty
    const useIntegers = difficultyLevel < 60;
    const point1 = generateRandomPoint(useIntegers);
    let point2 = generateRandomPoint(useIntegers);
    
    // Ensure points are not identical
    while (point1.x === point2.x && point1.y === point2.y) {
      point2 = generateRandomPoint(useIntegers);
    }
    
    // Calculate line equation
    let equation: string;
    if (point1.x === point2.x) {
      // Vertical line: x = k
      equation = `x = ${point1.x}`;
    } else if (point1.y === point2.y) {
      // Horizontal line: y = k
      equation = `y = ${point1.y}`;
    } else {
      // Standard line: y = mx + b
      const m = (point2.y - point1.y) / (point2.x - point1.x);
      const b = point1.y - m * point1.x;
      
      if (b === 0) {
        equation = `y = ${m.toFixed(2)}x`;
      } else if (b > 0) {
        equation = `y = ${m.toFixed(2)}x + ${b.toFixed(2)}`;
      } else {
        equation = `y = ${m.toFixed(2)}x - ${Math.abs(b).toFixed(2)}`;
      }
    }
    
    return {
      description: "Line Equation",
      question: `Find the equation of the line passing through points A(${point1.x}, ${point1.y}) and B(${point2.x}, ${point2.y}).`,
      points: [point1, point2],
      lines: [{
        id: `line-${Date.now()}`,
        start: [point1.x, point1.y],
        end: [point2.x, point2.y],
        equation: `Line from (${point1.x}, ${point1.y}) to (${point2.x}, ${point2.y})`,
        color: randomColor()
      }],
      circles: [],
      solution: `The equation of the line is ${equation}.`
    };
  };

  const generateCircleEquationProblem = (difficultyLevel: number): Problem => {
    // Generate points based on difficulty
    const useIntegers = difficultyLevel < 60;
    const center = generateRandomPoint(useIntegers);
    
    // Generate radius based on difficulty
    const radius = useIntegers 
      ? Math.floor(Math.random() * 3) + 1 
      : (Math.random() * 3 + 1).toFixed(1);
    
    // Calculate circle equation
    const equation = `(x - ${center.x})² + (y - ${center.y})² = ${Number(radius) * Number(radius)}`;
    
    return {
      description: "Circle Equation",
      question: `Find the equation of the circle with center at (${center.x}, ${center.y}) and radius ${radius}.`,
      points: [center],
      lines: [],
      circles: [{
        id: `circle-${Date.now()}`,
        center: [center.x, center.y],
        radius: Number(radius),
        equation: `Circle with center (${center.x}, ${center.y}) and radius ${radius}`,
        color: randomColor()
      }],
      solution: `The equation of the circle is ${equation}.`
    };
  };

  const generateIntersectionProblem = (difficultyLevel: number): Problem => {
    // Generate points for two lines
    const useIntegers = difficultyLevel < 60;
    const point1 = generateRandomPoint(useIntegers);
    const point2 = generateRandomPoint(useIntegers);
    const point3 = generateRandomPoint(useIntegers);
    let point4 = generateRandomPoint(useIntegers);
    
    // Ensure the lines are not parallel
    const slope1 = (point2.y - point1.y) / (point2.x - point1.x);
    let slope2 = (point4.y - point3.y) / (point4.x - point3.x);
    
    while (Math.abs(slope1 - slope2) < 0.1) {
      point4 = generateRandomPoint(useIntegers);
      slope2 = (point4.y - point3.y) / (point4.x - point3.x);
    }
    
    // Calculate intersection point
    // Line 1: y = m1*x + b1
    // Line 2: y = m2*x + b2
    // Intersection: x = (b2 - b1) / (m1 - m2)
    const b1 = point1.y - slope1 * point1.x;
    const b2 = point3.y - slope2 * point3.x;
    
    const intersectionX = (b2 - b1) / (slope1 - slope2);
    const intersectionY = slope1 * intersectionX + b1;
    
    return {
      description: "Line Intersection",
      question: "Find the intersection point of the two lines shown on the graph.",
      points: [point1, point2, point3, point4],
      lines: [
        {
          id: `line1-${Date.now()}`,
          start: [point1.x, point1.y],
          end: [point2.x, point2.y],
          equation: `Line 1`,
          color: randomColor()
        },
        {
          id: `line2-${Date.now() + 1}`,
          start: [point3.x, point3.y],
          end: [point4.x, point4.y],
          equation: `Line 2`,
          color: randomColor()
        }
      ],
      circles: [],
      solution: `The intersection point is (${intersectionX.toFixed(2)}, ${intersectionY.toFixed(2)}).`
    };
  };

  const generateRandomPoint = (useIntegers: boolean): Point => {
    let x, y;
    
    if (useIntegers) {
      x = Math.floor(Math.random() * 11) - 5; // -5 to 5
      y = Math.floor(Math.random() * 11) - 5; // -5 to 5
    } else {
      x = Number((Math.random() * 10 - 5).toFixed(1)); // -5.0 to 5.0
      y = Number((Math.random() * 10 - 5).toFixed(1)); // -5.0 to 5.0
    }
    
    return {
      id: `point-${Date.now()}-${Math.random()}`,
      x,
      y,
      color: randomColor()
    };
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Problem Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="problemType">Problem Type</Label>
            <Select 
              value={problemType} 
              onValueChange={(value) => setProblemType(value)}
            >
              <SelectTrigger id="problemType">
                <SelectValue placeholder="Select a problem type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="distance">Distance Between Points</SelectItem>
                <SelectItem value="midpoint">Midpoint Formula</SelectItem>
                <SelectItem value="slope">Slope of a Line</SelectItem>
                <SelectItem value="lineEquation">Line Equation</SelectItem>
                <SelectItem value="circleEquation">Circle Equation</SelectItem>
                <SelectItem value="intersection">Line Intersection</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="difficulty">Difficulty</Label>
              <span className="text-sm text-muted-foreground">
                {difficulty < 33 ? 'Easy' : difficulty < 66 ? 'Medium' : 'Hard'}
              </span>
            </div>
            <Slider
              id="difficulty"
              min={0}
              max={100}
              step={1}
              value={[difficulty]}
              onValueChange={(values) => setDifficulty(values[0])}
            />
          </div>
          
          <Button 
            onClick={generateProblem} 
            className="w-full"
          >
            Generate Problem
          </Button>
          
          {currentProblem && (
            <div className="mt-4 space-y-4">
              <Alert variant="default" className="bg-muted">
                <Info className="h-4 w-4" />
                <AlertDescription className="font-medium">
                  {currentProblem.question}
                </AlertDescription>
              </Alert>
              
              {showSolution ? (
                <Alert variant="default" className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                  <Lightbulb className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <AlertDescription className="font-medium">
                    {currentProblem.solution}
                  </AlertDescription>
                </Alert>
              ) : (
                <Button 
                  variant="outline" 
                  onClick={() => setShowSolution(true)}
                  className="w-full"
                >
                  Show Solution
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 