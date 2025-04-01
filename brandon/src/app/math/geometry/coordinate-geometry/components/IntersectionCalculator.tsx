"use client";

import React, { useState } from 'react';
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

interface IntersectionCalculatorProps {
  points: Point[];
  lines: Line[];
  circles: Circle[];
}

export function IntersectionCalculator({ points, lines, circles }: IntersectionCalculatorProps) {
  const [object1Type, setObject1Type] = useState<'line' | 'circle'>('line');
  const [object2Type, setObject2Type] = useState<'line' | 'circle'>('line');
  const [object1Id, setObject1Id] = useState<string | null>(null);
  const [object2Id, setObject2Id] = useState<string | null>(null);
  const [intersectionPoints, setIntersectionPoints] = useState<{x: number, y: number}[]>([]);
  const [error, setError] = useState<string | null>(null);

  const calculateIntersection = () => {
    setError(null);
    setIntersectionPoints([]);
    
    if (!object1Id || !object2Id) {
      setError("Please select two objects");
      return;
    }
    
    // Get selected objects
    const object1 = object1Type === 'line' 
      ? lines.find(l => l.id === object1Id)
      : circles.find(c => c.id === object1Id);
    
    const object2 = object2Type === 'line' 
      ? lines.find(l => l.id === object2Id)
      : circles.find(c => c.id === object2Id);
    
    if (!object1 || !object2) {
      setError("One or both selected objects not found");
      return;
    }

    try {
      // Calculate intersections based on object types
      if (object1Type === 'line' && object2Type === 'line') {
        const line1 = object1 as Line;
        const line2 = object2 as Line;
        calculateLineLineIntersection(line1, line2);
      } else if (object1Type === 'line' && object2Type === 'circle') {
        const line = object1 as Line;
        const circle = object2 as Circle;
        calculateLineCircleIntersection(line, circle);
      } else if (object1Type === 'circle' && object2Type === 'line') {
        const circle = object1 as Circle;
        const line = object2 as Line;
        calculateLineCircleIntersection(line, circle);
      } else if (object1Type === 'circle' && object2Type === 'circle') {
        const circle1 = object1 as Circle;
        const circle2 = object2 as Circle;
        calculateCircleCircleIntersection(circle1, circle2);
      }
    } catch (err) {
      setError(`Error calculating intersection: ${err}`);
    }
  };

  const calculateLineLineIntersection = (line1: Line, line2: Line) => {
    // Get line equations in the form ax + by + c = 0
    const [a1, b1, c1] = getLineCoefficients(line1);
    const [a2, b2, c2] = getLineCoefficients(line2);
    
    // Check if lines are parallel
    const det = a1 * b2 - a2 * b1;
    if (Math.abs(det) < 1e-10) {
      setError("Lines are parallel - no intersection");
      return;
    }
    
    // Calculate intersection point
    const x = (b1 * c2 - b2 * c1) / det;
    const y = (a2 * c1 - a1 * c2) / det;
    
    setIntersectionPoints([{ x, y }]);
  };

  const calculateLineCircleIntersection = (line: Line, circle: Circle) => {
    // Get line equation in the form ax + by + c = 0
    const [a, b, c] = getLineCoefficients(line);
    
    // Get circle parameters
    const [h, k] = circle.center;
    const r = circle.radius;
    
    // Normalize the line equation such that a^2 + b^2 = 1
    const norm = Math.sqrt(a * a + b * b);
    const an = a / norm;
    const bn = b / norm;
    const cn = c / norm;
    
    // Distance from circle center to line
    const d = Math.abs(an * h + bn * k + cn);
    
    // Check if line doesn't intersect the circle
    if (d > r) {
      setError("Line doesn't intersect the circle");
      return;
    }
    
    // Calculate intersection points
    if (Math.abs(d - r) < 1e-10) {
      // Line is tangent to circle - one intersection point
      const x = h - an * d;
      const y = k - bn * d;
      setIntersectionPoints([{ x, y }]);
    } else {
      // Line intersects circle at two points
      const dx = bn;
      const dy = -an;
      
      const x1 = h - an * d;
      const y1 = k - bn * d;
      
      const dt = Math.sqrt(r * r - d * d);
      
      const x2 = x1 + dx * dt;
      const y2 = y1 + dy * dt;
      
      const x3 = x1 - dx * dt;
      const y3 = y1 - dy * dt;
      
      setIntersectionPoints([{ x: x2, y: y2 }, { x: x3, y: y3 }]);
    }
  };

  const calculateCircleCircleIntersection = (circle1: Circle, circle2: Circle) => {
    // Get circle parameters
    const [h1, k1] = circle1.center;
    const r1 = circle1.radius;
    const [h2, k2] = circle2.center;
    const r2 = circle2.radius;
    
    // Calculate distance between centers
    const d = Math.sqrt(Math.pow(h2 - h1, 2) + Math.pow(k2 - k1, 2));
    
    // Check if circles don't intersect
    if (d > r1 + r2) {
      setError("Circles don't intersect - they are too far apart");
      return;
    }
    
    // Check if one circle is inside the other
    if (d < Math.abs(r1 - r2)) {
      setError("Circles don't intersect - one is inside the other");
      return;
    }
    
    // Check if circles are coincident
    if (d === 0 && r1 === r2) {
      setError("Circles are coincident - infinite intersection points");
      return;
    }
    
    // Calculate intersection points
    if (Math.abs(d - (r1 + r2)) < 1e-10 || Math.abs(d - Math.abs(r1 - r2)) < 1e-10) {
      // Circles are tangent - one intersection point
      const x = h1 + (h2 - h1) * r1 / d;
      const y = k1 + (k2 - k1) * r1 / d;
      setIntersectionPoints([{ x, y }]);
    } else {
      // Circles intersect at two points
      const a = (r1 * r1 - r2 * r2 + d * d) / (2 * d);
      const h = Math.sqrt(r1 * r1 - a * a);
      
      const x0 = h1 + a * (h2 - h1) / d;
      const y0 = k1 + a * (k2 - k1) / d;
      
      const x1 = x0 + h * (k2 - k1) / d;
      const y1 = y0 - h * (h2 - h1) / d;
      
      const x2 = x0 - h * (k2 - k1) / d;
      const y2 = y0 + h * (h2 - h1) / d;
      
      setIntersectionPoints([{ x: x1, y: y1 }, { x: x2, y: y2 }]);
    }
  };

  const getLineCoefficients = (line: Line): [number, number, number] => {
    const [x1, y1] = line.start;
    const [x2, y2] = line.end;
    
    // Line equation: ax + by + c = 0
    const a = y2 - y1;
    const b = x1 - x2;
    const c = x2 * y1 - x1 * y2;
    
    return [a, b, c];
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Intersection Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {lines.length === 0 && circles.length === 0 ? (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Please add at least two objects (lines or circles) to the plotter.
              </AlertDescription>
            </Alert>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4">
                {/* First object selection */}
                <div className="space-y-2">
                  <Label>First Object Type</Label>
                  <Select 
                    value={object1Type} 
                    onValueChange={(value: 'line' | 'circle') => {
                      setObject1Type(value);
                      setObject1Id(null);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an object type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="line" disabled={lines.length === 0}>Line</SelectItem>
                      <SelectItem value="circle" disabled={circles.length === 0}>Circle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>First Object</Label>
                  <Select 
                    value={object1Id || ""} 
                    onValueChange={(value) => setObject1Id(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an object" />
                    </SelectTrigger>
                    <SelectContent>
                      {object1Type === 'line' ? (
                        lines.map(line => (
                          <SelectItem key={line.id} value={line.id}>
                            {line.equation}
                          </SelectItem>
                        ))
                      ) : (
                        circles.map(circle => (
                          <SelectItem key={circle.id} value={circle.id}>
                            {circle.equation}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Second object selection */}
                <div className="space-y-2">
                  <Label>Second Object Type</Label>
                  <Select 
                    value={object2Type} 
                    onValueChange={(value: 'line' | 'circle') => {
                      setObject2Type(value);
                      setObject2Id(null);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an object type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="line" disabled={lines.length === 0}>Line</SelectItem>
                      <SelectItem value="circle" disabled={circles.length === 0}>Circle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Second Object</Label>
                  <Select 
                    value={object2Id || ""} 
                    onValueChange={(value) => setObject2Id(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an object" />
                    </SelectTrigger>
                    <SelectContent>
                      {object2Type === 'line' ? (
                        lines.map(line => (
                          <SelectItem key={line.id} value={line.id}>
                            {line.equation}
                          </SelectItem>
                        ))
                      ) : (
                        circles.map(circle => (
                          <SelectItem key={circle.id} value={circle.id}>
                            {circle.equation}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button 
                onClick={calculateIntersection} 
                className="w-full"
                disabled={!object1Id || !object2Id}
              >
                Calculate Intersection
              </Button>
              
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              {intersectionPoints.length > 0 && (
                <div className="mt-4 p-4 bg-muted rounded-md">
                  <div className="text-sm font-medium">Intersection Points:</div>
                  <div className="space-y-2 mt-2">
                    {intersectionPoints.map((point, index) => (
                      <div key={index} className="font-mono">
                        Point {index + 1}: ({point.x.toFixed(2)}, {point.y.toFixed(2)})
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 