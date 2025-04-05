export interface Node {
  id: string;
  label?: string;
  x?: number;
  y?: number;
  group?: string;
  // Additional properties for algorithms
  [key: string]: any;
}

export interface Edge {
  source: string;
  target: string;
  weight?: number;
  // Additional properties for algorithms
  [key: string]: any;
}

export interface GraphData {
  nodes: Node[];
  edges: Edge[];
}

export interface Algorithm {
  id: string;
  name: string;
  category: 'traversal' | 'shortest-path' | 'spanning-tree' | 'coloring' | 'connectivity' | 'other';
  description?: string;
}

export interface AlgorithmState {
  algorithm: string;
  step: number;
  startNode: string | null;
  currentNode: string | null;
  visitedNodes: string[];
  visitedEdges: { source: string; target: string }[];
  highlightedNodes?: string[];
  highlightedEdges?: { source: string; target: string }[];
  nodeColors?: Record<string, string>;
  edgeColors?: Record<string, string>;
  distances?: Record<string, number>;
  parents?: Record<string, string>;
  queue?: string[];
  stack?: string[];
  heap?: any[];
  isComplete: boolean;
  result?: any;
  message?: string;
} 