export interface Point {
  x: number;
  y: number;
}

export interface Shape {
  id: string;
  points: Point[];
  color: string;
}

export type TransformationType = 'translation' | 'rotation' | 'reflection' | 'scaling';

export interface TransformationParams {
  type: TransformationType;
  // Translation parameters
  dx?: number;
  dy?: number;
  // Rotation parameters
  angle?: number;
  centerX?: number;
  centerY?: number;
  // Reflection parameters
  axis?: 'x' | 'y' | 'origin' | 'y=x' | 'y=-x';
  // Scaling parameters
  scaleX?: number;
  scaleY?: number;
}

export interface Grid {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  stepX: number;
  stepY: number;
}

export const defaultGrid: Grid = {
  minX: -10,
  maxX: 10,
  minY: -10,
  maxY: 10,
  stepX: 1,
  stepY: 1
};

// Translate a point
export function translatePoint(point: Point, dx: number, dy: number): Point {
  return {
    x: point.x + dx,
    y: point.y + dy
  };
}

// Rotate a point around the origin
export function rotatePointOrigin(point: Point, angleDegrees: number): Point {
  const angleRadians = (angleDegrees * Math.PI) / 180;
  const cos = Math.cos(angleRadians);
  const sin = Math.sin(angleRadians);
  
  return {
    x: point.x * cos - point.y * sin,
    y: point.x * sin + point.y * cos
  };
}

// Rotate a point around a specific center
export function rotatePoint(point: Point, centerX: number, centerY: number, angleDegrees: number): Point {
  // Translate point to origin
  const translatedPoint = translatePoint(point, -centerX, -centerY);
  
  // Rotate around origin
  const rotatedPoint = rotatePointOrigin(translatedPoint, angleDegrees);
  
  // Translate back
  return translatePoint(rotatedPoint, centerX, centerY);
}

// Reflect a point
export function reflectPoint(point: Point, axis: string): Point {
  switch (axis) {
    case 'x':
      return { x: point.x, y: -point.y };
    case 'y':
      return { x: -point.x, y: point.y };
    case 'origin':
      return { x: -point.x, y: -point.y };
    case 'y=x':
      return { x: point.y, y: point.x };
    case 'y=-x':
      return { x: -point.y, y: -point.x };
    default:
      return { ...point };
  }
}

// Scale a point
export function scalePoint(point: Point, scaleX: number, scaleY: number): Point {
  return {
    x: point.x * scaleX,
    y: point.y * scaleY
  };
}

// Apply a transformation to a single point
export function transformPoint(point: Point, params: TransformationParams): Point {
  let result = { ...point };
  
  switch (params.type) {
    case 'translation':
      if (params.dx !== undefined && params.dy !== undefined) {
        result = translatePoint(result, params.dx, params.dy);
      }
      break;
    case 'rotation':
      if (params.angle !== undefined) {
        const centerX = params.centerX ?? 0;
        const centerY = params.centerY ?? 0;
        result = rotatePoint(result, centerX, centerY, params.angle);
      }
      break;
    case 'reflection':
      if (params.axis) {
        result = reflectPoint(result, params.axis);
      }
      break;
    case 'scaling':
      if (params.scaleX !== undefined && params.scaleY !== undefined) {
        result = scalePoint(result, params.scaleX, params.scaleY);
      }
      break;
  }
  
  return result;
}

// Apply a transformation to a shape
export function transformShape(shape: Shape, params: TransformationParams): Shape {
  const transformedPoints = shape.points.map(point => transformPoint(point, params));
  
  return {
    ...shape,
    points: transformedPoints
  };
}

// Create a rectangle shape
export function createRectangle(id: string, x: number, y: number, width: number, height: number, color: string): Shape {
  return {
    id,
    points: [
      { x, y },
      { x: x + width, y },
      { x: x + width, y: y + height },
      { x, y: y + height }
    ],
    color
  };
}

// Create a triangle shape
export function createTriangle(id: string, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, color: string): Shape {
  return {
    id,
    points: [
      { x: x1, y: y1 },
      { x: x2, y: y2 },
      { x: x3, y: y3 }
    ],
    color
  };
}

// Create a regular polygon
export function createRegularPolygon(id: string, centerX: number, centerY: number, radius: number, sides: number, color: string): Shape {
  const points: Point[] = [];
  
  for (let i = 0; i < sides; i++) {
    const angle = (Math.PI * 2 * i) / sides;
    points.push({
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    });
  }
  
  return {
    id,
    points,
    color
  };
}

// Get the transformation matrix (for display purposes)
export function getTransformationMatrix(params: TransformationParams): string {
  switch (params.type) {
    case 'translation':
      if (params.dx !== undefined && params.dy !== undefined) {
        return `[x'] = [x] + [${params.dx}]\n[y']   [y]   [${params.dy}]`;
      }
      break;
    case 'rotation':
      if (params.angle !== undefined) {
        const angleRadians = (params.angle * Math.PI) / 180;
        const cos = Math.cos(angleRadians).toFixed(2);
        const sin = Math.sin(angleRadians).toFixed(2);
        return `[x'] = [${cos}  -${sin}] [x]\n[y']   [${sin}   ${cos}] [y]`;
      }
      break;
    case 'reflection':
      if (params.axis === 'x') {
        return `[x'] = [1  0] [x]\n[y']   [0 -1] [y]`;
      } else if (params.axis === 'y') {
        return `[x'] = [-1  0] [x]\n[y']   [0  1] [y]`;
      } else if (params.axis === 'origin') {
        return `[x'] = [-1   0] [x]\n[y']   [0  -1] [y]`;
      } else if (params.axis === 'y=x') {
        return `[x'] = [0  1] [x]\n[y']   [1  0] [y]`;
      } else if (params.axis === 'y=-x') {
        return `[x'] = [0  -1] [x]\n[y']   [-1  0] [y]`;
      }
      break;
    case 'scaling':
      if (params.scaleX !== undefined && params.scaleY !== undefined) {
        return `[x'] = [${params.scaleX}  0] [x]\n[y']   [0  ${params.scaleY}] [y]`;
      }
      break;
  }
  
  return '';
} 