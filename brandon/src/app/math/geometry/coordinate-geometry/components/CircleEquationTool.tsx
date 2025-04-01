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

interface Circle {
  id: string;
  center: [number, number];
  radius: number;
  equation: string;
  color: string;
}

interface CircleEquationToolProps {
  points: Point[];
  circles: Circle[];
  onCircleAdded: (circle: Circle) => void;
}

export function CircleEquationTool({ points, circles, onCircleAdded }: CircleEquationToolProps) {
  const [centerPoint, setCenterPoint] = useState<string | null>(null);
  const [radiusPoint, setRadiusPoint] = useState<string | null>(null);
  const [manualCenterX, setManualCenterX] = useState<number>(0);
  const [manualCenterY, setManualCenterY] = useState<number>(0);
  const [manualRadius, setManualRadius] = useState<number>(1);
  const [usePoints, setUsePoints] = useState<boolean>(true);
  const [circleEquation, setCircleEquation] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [circleColor, setCircleColor] = useState<string>("#4F46E5");

  useEffect(() => {
    // Reset selections if points are removed
    if (centerPoint && !points.some(p => p.id === centerPoint)) {
      setCenterPoint(null);
    }
    if (radiusPoint && !points.some(p => p.id === radiusPoint)) {
      setRadiusPoint(null);
    }
  }, [points, centerPoint, radiusPoint]);

  const calculateEquation = () => {
    setError(null);
    
    if (usePoints) {
      if (!centerPoint) {
        setError("Please select a center point");
        return;
      }
      
      const center = points.find(p => p.id === centerPoint);
      
      if (!center) {
        setError("Center point not found");
        return;
      }
      
      let radius = 0;
      
      if (radiusPoint) {
        const radiusP = points.find(p => p.id === radiusPoint);
        
        if (!radiusP) {
          setError("Radius point not found");
          return;
        }
        
        radius = Math.sqrt(
          Math.pow(radiusP.x - center.x, 2) + 
          Math.pow(radiusP.y - center.y, 2)
        );
      } else {
        radius = 1; // Default radius if no radius point is selected
      }
      
      if (radius === 0) {
        setError("Radius cannot be zero");
        return;
      }
      
      // Calculate circle equation in the form (x - h)² + (y - k)² = r²
      const equation = `(x - ${center.x.toFixed(2)})² + (y - ${center.y.toFixed(2)})² = ${(radius * radius).toFixed(2)}`;
      setCircleEquation(equation);
      
      // Add the circle
      const newCircle: Circle = {
        id: `circle-${Date.now()}`,
        center: [center.x, center.y],
        radius,
        equation,
        color: circleColor
      };
      
      onCircleAdded(newCircle);
    } else {
      // Manual circle
      if (manualRadius <= 0) {
        setError("Radius must be greater than zero");
        return;
      }
      
      // Calculate circle equation
      const equation = `(x - ${manualCenterX.toFixed(2)})² + (y - ${manualCenterY.toFixed(2)})² = ${(manualRadius * manualRadius).toFixed(2)}`;
      setCircleEquation(equation);
      
      // Add the circle
      const newCircle: Circle = {
        id: `circle-${Date.now()}`,
        center: [manualCenterX, manualCenterY],
        radius: manualRadius,
        equation,
        color: circleColor
      };
      
      onCircleAdded(newCircle);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Circle Equation Tool</CardTitle>
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
              {points.length < 1 ? (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Please add at least one point to the plotter.
                  </AlertDescription>
                </Alert>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="centerPoint">Center Point</Label>
                    <Select 
                      value={centerPoint || ""} 
                      onValueChange={(value) => setCenterPoint(value)}
                    >
                      <SelectTrigger id="centerPoint">
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
                    <Label htmlFor="radiusPoint">Radius Point (optional)</Label>
                    <Select 
                      value={radiusPoint || ""} 
                      onValueChange={(value) => setRadiusPoint(value)}
                    >
                      <SelectTrigger id="radiusPoint">
                        <SelectValue placeholder="Select a point (or leave for default radius)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Default radius (1 unit)</SelectItem>
                        {points
                          .filter(p => p.id !== centerPoint)
                          .map(point => (
                            <SelectItem key={point.id} value={point.id}>
                              Point ({point.x}, {point.y})
                            </SelectItem>
                          ))
                        }
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
                  <Label htmlFor="manualCenterX">Center X</Label>
                  <Input
                    id="manualCenterX"
                    type="number"
                    value={manualCenterX}
                    onChange={(e) => setManualCenterX(parseFloat(e.target.value) || 0)}
                    step="0.1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="manualCenterY">Center Y</Label>
                  <Input
                    id="manualCenterY"
                    type="number"
                    value={manualCenterY}
                    onChange={(e) => setManualCenterY(parseFloat(e.target.value) || 0)}
                    step="0.1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="manualRadius">Radius</Label>
                  <Input
                    id="manualRadius"
                    type="number"
                    value={manualRadius}
                    onChange={(e) => setManualRadius(parseFloat(e.target.value) || 0)}
                    min="0.1"
                    step="0.1"
                  />
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                Circle equation: (x - h)² + (y - k)² = r²
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="circleColor">Circle Color</Label>
            <Input
              id="circleColor"
              type="color"
              value={circleColor}
              onChange={(e) => setCircleColor(e.target.value)}
              className="h-10 p-1 cursor-pointer"
            />
          </div>
          
          <Button 
            onClick={calculateEquation} 
            className="w-full"
            disabled={usePoints && points.length < 1}
          >
            Add Circle
          </Button>
          
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {circleEquation && (
            <div className="mt-4 p-4 bg-muted rounded-md">
              <div className="text-sm font-medium">Circle Equation:</div>
              <div className="font-mono mt-1">{circleEquation}</div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 