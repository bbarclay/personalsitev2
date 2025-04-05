import { GraphData } from './types';

/**
 * Generates a unique ID for new graph nodes.
 * Format: id_timestamp_random
 */
export const generateId = (): string => {
  return `id_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
};

/**
 * Generate a random graph with the specified number of nodes and edge probability.
 * 
 * @param nodeCount Number of nodes to generate
 * @param edgeProbability Probability of an edge between any two nodes (0-1)
 * @param directed Whether the graph should be directed
 * @param weighted Whether edges should have weights
 * @returns A GraphData object with randomly generated nodes and edges
 */
export const generateRandomGraph = (
  nodeCount: number,
  edgeProbability: number,
  directed: boolean,
  weighted: boolean
): GraphData => {
  // Generate nodes
  const nodes = Array.from({ length: nodeCount }).map((_, i) => ({
    id: `n${i}`,
    label: `${i + 1}`,
    // Position nodes in a circle
    x: 300 + 200 * Math.cos((2 * Math.PI * i) / nodeCount),
    y: 300 + 200 * Math.sin((2 * Math.PI * i) / nodeCount),
  }));

  // Generate edges based on probability
  const edges = [];
  for (let i = 0; i < nodeCount; i++) {
    // Start at i+1 to avoid duplicating edges in undirected graphs
    // and to avoid self-loops
    const startIdx = directed ? 0 : i + 1;
    
    for (let j = startIdx; j < nodeCount; j++) {
      if (i !== j && Math.random() < edgeProbability) {
        edges.push({
          source: `n${i}`,
          target: `n${j}`,
          weight: weighted ? Math.ceil(Math.random() * 10) : undefined,
        });
      }
    }
  }

  return { nodes, edges };
};

/**
 * Calculates various properties of a graph.
 * 
 * @param graph The GraphData object to analyze
 * @param isDirected Whether the graph is directed
 * @returns An object containing graph properties like node/edge count, density, etc.
 */
export const calculateGraphProperties = (graph: GraphData, isDirected: boolean): Record<string, any> => {
  const nodeCount = graph.nodes.length;
  const edgeCount = graph.edges.length;
  
  // Calculate maximum possible edges based on directed/undirected
  const maxEdges = isDirected 
    ? nodeCount * (nodeCount - 1) 
    : (nodeCount * (nodeCount - 1)) / 2;
  
  // Calculate density (edges / possible edges)
  const density = nodeCount <= 1 ? 0 : edgeCount / maxEdges;
  
  // Calculate average degree
  const degreeMap: Record<string, number> = {};
  graph.nodes.forEach(node => {
    degreeMap[node.id] = 0;
  });
  
  graph.edges.forEach(edge => {
    degreeMap[edge.source] = (degreeMap[edge.source] || 0) + 1;
    // For undirected graphs, increment target too
    if (!isDirected) {
      degreeMap[edge.target] = (degreeMap[edge.target] || 0) + 1;
    }
  });
  
  const degrees = Object.values(degreeMap);
  const averageDegree = degrees.length === 0 
    ? 0 
    : degrees.reduce((sum, deg) => sum + deg, 0) / degrees.length;
  
  // Identify isolated nodes (degree 0)
  const isolatedNodes = Object.entries(degreeMap)
    .filter(([_, degree]) => degree === 0)
    .map(([id]) => id);
  
  return {
    nodeCount,
    edgeCount,
    density: density.toFixed(3),
    averageDegree: averageDegree.toFixed(2),
    maxDegree: Math.max(...degrees, 0),
    minDegree: Math.min(...degrees, 0),
    isolatedNodes,
    isolatedCount: isolatedNodes.length,
    isConnected: false, // Would require full connectivity analysis
    isWeighted: graph.edges.some(e => e.weight !== undefined),
  };
}; 