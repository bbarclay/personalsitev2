"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Point {
  id: string;
  x: number;
  y: number;
  color: string;
}

interface DistanceCalculatorProps {
  points: Point[];
}

export function DistanceCalculator({ points }: DistanceCalculatorProps) {
  const [pointA, setPointA] = useState<string | null>(null);
  const [pointB, setPointB] = useState<string | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [midpoint, setMidpoint] = useState<{ x: number; y: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Reset selections if points are removed
    if (pointA && !points.some(p => p.id === pointA)) {
      setPointA(null);
    }
    if (pointB && !points.some(p => p.id === pointB)) {
      setPointB(null);
    }
  }, [points, pointA, pointB]);

  const calculateDistance = () => {
    setError(null);
    
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
    
    const dist = Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
    setDistance(dist);
    
    setMidpoint({
      x: (a.x + b.x) / 2,
      y: (a.y + b.y) / 2
    });
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Distance Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        {points.length < 2 ? (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please add at least two points to the plotter.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-4">
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
            
            <Button onClick={calculateDistance} className="w-full">
              Calculate Distance
            </Button>
            
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {distance !== null && (
              <div className="mt-4 p-4 bg-muted rounded-md">
                <div className="text-sm font-medium">Results:</div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="text-sm">Distance:</div>
                  <div className="text-sm font-medium">{distance.toFixed(2)} units</div>
                  
                  <div className="text-sm">Midpoint:</div>
                  <div className="text-sm font-medium">
                    ({midpoint?.x.toFixed(2)}, {midpoint?.y.toFixed(2)})
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 