import { Vector3 } from 'three';

export interface NodeProps {
  position: [number, number, number];
  color: string;
  label: number;
  size: number;
}

export interface EdgeProps {
  start: Vector3;
  end: Vector3;
  color: string;
}

export interface TreeProps {
  p: number;
  depth: number;
  expansion: number[];
}

export interface GlowMeshProps {
  position: [number, number, number];
  color: string;
  radius: number;
  intensity: number;
}

export interface PAdicVisualizationProps {
  prime: number;
  depth: number;
  highlightNumber?: number;
  width?: number;
  height?: number;
}

export interface NodeData {
  id: string;
  value: number;
  x: number;
  y: number;
  level: number;
}
