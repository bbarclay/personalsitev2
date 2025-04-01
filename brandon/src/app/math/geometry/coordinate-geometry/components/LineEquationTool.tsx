"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertCircle } from 'lucide-react';
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

interface LineEquationToolProps {
  points: Point[];
  lines: Line[];
  onLineAdded: (line: Line) => void;
}

export function LineEquationTool({ points, lines, onLineAdded }: LineEquationToolProps) {
  const [pointA, setPointA] = useState<string | null>(null);
  const [pointB, setPointB] = useState<string | null>(null);
  const [manualA, setManualA] = useState<number>(0);
  const [manualB, setManualB] = useState<number>(1);
  const [manualC, setManualC] = useState<number>(0);
  const [usePoints, setUsePoints] = useState<boolean>(true);
  const [lineEquation, setLineEquation] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [lineColor, setLineColor] = useState<string>("#4F46E5");

  useEffect(() => {
    // Reset selections if points are removed
    if (pointA && !points.some(p => p.id === pointA)) {
      setPointA(null);
    }
    if (pointB && !points.some(p => p.id === pointB)) {
      setPointB(null);
    }
  }, [points, pointA, pointB]);

  const calculateEquation = () => {
    setError(null);
    
    if (usePoints) {
      if (!pointA || !pointB) {
        setError("Please select two points");
        return;
      }
      
      const a = points.find(p => p.id === pointA);
      const b = points.find(p => p.id === pointB);
      
      if (!a || !b) {
        setError("One or both selected points not found");
        return;
      }

      if (a.x === b.x && a.y === b.y) {
        setError("Points must be different");
        return;
      }
      
      // Calculate line equation in the form Ax + By + C = 0
      if (a.x === b.x) {
        // Vertical line: x = k
        setLineEquation(`x = ${a.x.toFixed(2)}`);
        addLine(1, 0, -a.x, a, b);
      } else if (a.y === b.y) {
        // Horizontal line: y = k
        setLineEquation(`y = ${a.y.toFixed(2)}`);
        addLine(0, 1, -a.y, a, b);
      } else {
        // Standard line: y = mx + b
        const m = (b.y - a.y) / (b.x - a.x);
        const c = a.y - m * a.x;
        
        setLineEquation(`y = ${m.toFixed(2)}x + ${c.toFixed(2)}`);
        addLine(-m, 1, -c, a, b);
      }
    } else {
      // Manual equation in the form Ax + By + C = 0
      if (manualA === 0 && manualB === 0) {
        setError("Both A and B cannot be zero");
        return;
      }

      // Calculate two points on the line to display
      let point1, point2;
      
      if (manualB === 0) {
        // Vertical line: x = -C/A
        const x = -manualC / manualA;
        point1 = { x, y: -10 };
        point2 = { x, y: 10 };
        setLineEquation(`x = ${x.toFixed(2)}`);
      } else if (manualA === 0) {
        // Horizontal line: y = -C/B
        const y = -manualC / manualB;
        point1 = { x: -10, y };
        point2 = { x: 10, y };
        setLineEquation(`y = ${y.toFixed(2)}`);
      } else {
        // Standard line
        // If we have Ax + By + C = 0, then y = (-Ax - C) / B
        point1 = { x: -10, y: (-manualA * -10 - manualC) / manualB };
        point2 = { x: 10, y: (-manualA * 10 - manualC) / manualB };
        
        const m = -manualA / manualB;
        const c = -manualC / manualB;
        setLineEquation(`y = ${m.toFixed(2)}x + ${c.toFixed(2)}`);
      }

      // Add the line
      const p1 = { id: "temp1", x: point1.x, y: point1.y, color: lineColor };
      const p2 = { id: "temp2", x: point2.x, y: point2.y, color: lineColor };
      addLine(manualA, manualB, manualC, p1, p2);
    }
  };

  const addLine = (a: number, b: number, c: number, point1: Point, point2: Point) => {
    const newLine: Line = {
      id: `line-${Date.now()}`,
      start: [point1.x, point1.y],
      end: [point2.x, point2.y],
      equation: lineEquation,
      color: lineColor
    };
    
    onLineAdded(newLine);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Line Equation Tool</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Button 
              variant={usePoints ? "default" : "outline"} 
              onClick={() => setUsePoints(true)}
              className="flex-1"
            >
              Use Points
            </Button>
            <Button 
              variant={!usePoints ? "default" : "outline"} 
              onClick={() => setUsePoints(false)}
              className="flex-1"
            >
              Manual Equation
            </Button>
          </div>
          
          {usePoints ? (
            <div className="space-y-4">
              {points.length < 2 ? (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Please add at least two points to the plotter.
                  </AlertDescription>
                </Alert>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="pointA">First Point</Label>
                    <Select 
                      value={pointA || ""} 
                      onValueChange={(value) => setPointA(value)}
                    >
                      <SelectTrigger id="pointA">
                        <SelectValue placeholder="Select a point" />
                      </SelectTrigger>
                      <SelectContent>
                        {points.map(point => (
                          <SelectItem key={point.id} value={point.id}>
                            Point ({point.x}, {point.y})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="pointB">Second Point</Label>
                    <Select 
                      value={pointB || ""} 
                      onValueChange={(value) => setPointB(value)}
                    >
                      <SelectTrigger id="pointB">
                        <SelectValue placeholder="Select a point" />
                      </SelectTrigger>
                      <SelectContent>
                        {points.map(point => (
                          <SelectItem key={point.id} value={point.id}>
                            Point ({point.x}, {point.y})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="manualA">A (x coefficient)</Label>
                  <Input
                    id="manualA"
                    type="number"
                    value={manualA}
                    onChange={(e) => setManualA(parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="manualB">B (y coefficient)</Label>
                  <Input
                    id="manualB"
                    type="number"
                    value={manualB}
                    onChange={(e) => setManualB(parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="manualC">C (constant)</Label>
                  <Input
                    id="manualC"
                    type="number"
                    value={manualC}
                    onChange={(e) => setManualC(parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                Line equation: Ax + By + C = 0
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="lineColor">Line Color</Label>
            <Input
              id="lineColor"
              type="color"
              value={lineColor}
              onChange={(e) => setLineColor(e.target.value)}
              className="h-10 p-1 cursor-pointer"
            />
          </div>
          
          <Button 
            onClick={calculateEquation} 
            className="w-full"
            disabled={usePoints && points.length < 2}
          >
            Add Line
          </Button>
          
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {lineEquation && (
            <div className="mt-4 p-4 bg-muted rounded-md">
              <div className="text-sm font-medium">Line Equation:</div>
              <div className="font-mono mt-1">{lineEquation}</div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 