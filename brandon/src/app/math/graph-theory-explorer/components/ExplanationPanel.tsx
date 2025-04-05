"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import MarkdownRenderer from '@/components/MarkdownRenderer';

const explanationContent = `
# Graph Theory Explorer

Graph theory is a fundamental area of mathematics that studies relationships between objects. A graph consists of vertices (nodes) and edges that connect them.

## What is Graph Theory?

Graph theory is used to model and analyze networks, relationships, and connections in various fields:

- **Computer Science**: Algorithms, data structures, networks
- **Social Sciences**: Social networks, relationships
- **Transportation**: Road networks, logistics
- **Biology**: Protein interactions, ecological networks
- **Electrical Engineering**: Circuit design, power networks

## Key Concepts

### Graph Types

- **Directed Graph**: Edges have a direction (arrows)
- **Undirected Graph**: Edges have no direction
- **Weighted Graph**: Edges have associated values (weights)
- **Connected Graph**: There's a path between any two vertices
- **Complete Graph**: Every vertex is connected to all others

### Common Algorithms

1. **Traversal Algorithms**
   - Breadth-First Search (BFS): Explores nodes level by level
   - Depth-First Search (DFS): Explores as far as possible along branches

2. **Shortest Path Algorithms**
   - Dijkstra's Algorithm: Finds shortest paths from a source vertex
   - Bellman-Ford Algorithm: Handles negative weights

3. **Minimum Spanning Tree Algorithms**
   - Kruskal's Algorithm: Builds MST from the smallest edges
   - Prim's Algorithm: Grows MST from a starting vertex

4. **Other Algorithms**
   - Topological Sort: Orders vertices in a directed acyclic graph
   - Graph Coloring: Assigns colors to vertices with constraints
   - Network Flow: Maximizes flow through a network

## Using This Tool

The Graph Theory Explorer allows you to:

1. **Create and Edit Graphs**
   - Add/remove nodes and edges
   - Set edge weights and directions
   - Move nodes to arrange your graph

2. **Run Algorithms**
   - Select an algorithm and start node
   - Step through or watch the animation
   - See the algorithm state and results

3. **Analyze Properties**
   - View graph statistics
   - Check connectivity and other properties

Experiment with different graph structures and algorithms to understand their behavior!
`;

const ExplanationPanel: React.FC = () => {
  return (
    <Card className="border-none shadow-none h-full overflow-auto">
      <CardContent className="pt-6">
        <MarkdownRenderer content={explanationContent} />
      </CardContent>
    </Card>
  );
};

export default ExplanationPanel; 