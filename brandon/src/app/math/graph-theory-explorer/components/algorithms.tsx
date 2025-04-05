import { GraphData, Algorithm, AlgorithmState, Node, Edge } from './types';

// Helper function to create a deep copy of GraphData
const cloneGraphData = (graphData: GraphData): GraphData => {
  return {
    nodes: graphData.nodes.map(node => ({ ...node })),
    edges: graphData.edges.map(edge => ({ ...edge }))
  };
};

// Helper function to initialize algorithm state
const initAlgorithmState = (graphData: GraphData): AlgorithmState => {
  return {
    currentStep: 0,
    totalSteps: 0,
    visitedNodes: new Set<string>(),
    visitedEdges: new Set<string>(),
    highlightedNodes: new Set<string>(),
    highlightedEdges: new Set<string>(),
    nodeValues: new Map<string, number | string>(),
    edgeValues: new Map<string, number | string>(),
    queue: [],
    stack: [],
    messages: [],
    result: null,
    complete: false
  };
};

// Helper to get edge key
const getEdgeKey = (source: string, target: string): string => {
  return `${source}->${target}`;
};

// Breadth-First Search (BFS) Algorithm
export const bfsAlgorithm = (
  graphData: GraphData,
  startNodeId: string | null
): { initialState: AlgorithmState; stepFunction: (state: AlgorithmState) => AlgorithmState } => {
  // Create a copy of the graph to avoid modifying the original
  const graph = cloneGraphData(graphData);
  
  // Initialize algorithm state
  const initialState: AlgorithmState = initAlgorithmState(graph);
  
  // If no start node is selected, return initial state
  if (!startNodeId) {
    initialState.messages.push("Please select a starting node");
    initialState.complete = true;
    return { initialState, stepFunction: (state) => state };
  }
  
  // Set up the initial state
  initialState.queue = [startNodeId];
  initialState.highlightedNodes.add(startNodeId);
  initialState.messages.push(`Starting BFS from node ${startNodeId}`);
  
  // Create an adjacency list for the graph
  const adjacencyList = new Map<string, string[]>();
  graph.nodes.forEach(node => {
    adjacencyList.set(node.id, []);
  });
  
  graph.edges.forEach(edge => {
    const sourceNeighbors = adjacencyList.get(edge.source) || [];
    sourceNeighbors.push(edge.target);
    adjacencyList.set(edge.source, sourceNeighbors);
    
    // If the graph is undirected, add the reverse edge
    if (!graph.directed) {
      const targetNeighbors = adjacencyList.get(edge.target) || [];
      targetNeighbors.push(edge.source);
      adjacencyList.set(edge.target, targetNeighbors);
    }
  });
  
  // Step function for BFS
  const stepFunction = (state: AlgorithmState): AlgorithmState => {
    // If the algorithm is complete or the queue is empty, return the current state
    if (state.complete || state.queue.length === 0) {
      if (!state.complete) {
        state.messages.push("BFS traversal complete");
        state.complete = true;
      }
      return { ...state };
    }
    
    // Create a new state based on the current state
    const newState: AlgorithmState = { ...state };
    newState.currentStep += 1;
    
    // Remove the highlighted status from all nodes and edges
    newState.highlightedNodes = new Set<string>();
    newState.highlightedEdges = new Set<string>();
    
    // Dequeue the next node
    const currentNodeId = newState.queue.shift()!;
    
    // Mark the current node as visited
    newState.visitedNodes.add(currentNodeId);
    newState.highlightedNodes.add(currentNodeId);
    newState.messages.push(`Visiting node ${currentNodeId}`);
    
    // Get the neighbors of the current node
    const neighbors = adjacencyList.get(currentNodeId) || [];
    
    // Process each neighbor
    for (const neighborId of neighbors) {
      const edgeKey = getEdgeKey(currentNodeId, neighborId);
      
      // If the neighbor has not been visited, enqueue it
      if (!newState.visitedNodes.has(neighborId) && !newState.queue.includes(neighborId)) {
        newState.queue.push(neighborId);
        newState.highlightedNodes.add(neighborId);
        newState.highlightedEdges.add(edgeKey);
        newState.messages.push(`Adding node ${neighborId} to the queue`);
      }
    }
    
    return newState;
  };
  
  return { initialState, stepFunction };
};

// Depth-First Search (DFS) Algorithm
export const dfsAlgorithm = (
  graphData: GraphData,
  startNodeId: string | null
): { initialState: AlgorithmState; stepFunction: (state: AlgorithmState) => AlgorithmState } => {
  // Create a copy of the graph to avoid modifying the original
  const graph = cloneGraphData(graphData);
  
  // Initialize algorithm state
  const initialState: AlgorithmState = initAlgorithmState(graph);
  
  // If no start node is selected, return initial state
  if (!startNodeId) {
    initialState.messages.push("Please select a starting node");
    initialState.complete = true;
    return { initialState, stepFunction: (state) => state };
  }
  
  // Set up the initial state
  initialState.stack = [startNodeId];
  initialState.highlightedNodes.add(startNodeId);
  initialState.messages.push(`Starting DFS from node ${startNodeId}`);
  
  // Create an adjacency list for the graph
  const adjacencyList = new Map<string, string[]>();
  graph.nodes.forEach(node => {
    adjacencyList.set(node.id, []);
  });
  
  graph.edges.forEach(edge => {
    const sourceNeighbors = adjacencyList.get(edge.source) || [];
    sourceNeighbors.push(edge.target);
    adjacencyList.set(edge.source, sourceNeighbors);
    
    // If the graph is undirected, add the reverse edge
    if (!graph.directed) {
      const targetNeighbors = adjacencyList.get(edge.target) || [];
      targetNeighbors.push(edge.source);
      adjacencyList.set(edge.target, targetNeighbors);
    }
  });
  
  // Step function for DFS
  const stepFunction = (state: AlgorithmState): AlgorithmState => {
    // If the algorithm is complete or the stack is empty, return the current state
    if (state.complete || state.stack.length === 0) {
      if (!state.complete) {
        state.messages.push("DFS traversal complete");
        state.complete = true;
      }
      return { ...state };
    }
    
    // Create a new state based on the current state
    const newState: AlgorithmState = { ...state };
    newState.currentStep += 1;
    
    // Remove the highlighted status from all nodes and edges
    newState.highlightedNodes = new Set<string>();
    newState.highlightedEdges = new Set<string>();
    
    // Pop the next node from the stack
    const currentNodeId = newState.stack.pop()!;
    
    // Mark the current node as visited
    newState.visitedNodes.add(currentNodeId);
    newState.highlightedNodes.add(currentNodeId);
    newState.messages.push(`Visiting node ${currentNodeId}`);
    
    // Get the neighbors of the current node
    const neighbors = adjacencyList.get(currentNodeId) || [];
    
    // Process each neighbor in reverse order (to maintain traversal order)
    for (let i = neighbors.length - 1; i >= 0; i--) {
      const neighborId = neighbors[i];
      const edgeKey = getEdgeKey(currentNodeId, neighborId);
      
      // If the neighbor has not been visited, push it to the stack
      if (!newState.visitedNodes.has(neighborId) && !newState.stack.includes(neighborId)) {
        newState.stack.push(neighborId);
        newState.highlightedNodes.add(neighborId);
        newState.highlightedEdges.add(edgeKey);
        newState.messages.push(`Adding node ${neighborId} to the stack`);
      }
    }
    
    return newState;
  };
  
  return { initialState, stepFunction };
};

// Dijkstra's Algorithm for Shortest Path
export const dijkstraAlgorithm = (
  graphData: GraphData,
  startNodeId: string | null,
  endNodeId: string | null
): { initialState: AlgorithmState; stepFunction: (state: AlgorithmState) => AlgorithmState } => {
  // Create a copy of the graph to avoid modifying the original
  const graph = cloneGraphData(graphData);
  
  // Initialize algorithm state
  const initialState: AlgorithmState = initAlgorithmState(graph);
  
  // If no start or end node is selected, return initial state
  if (!startNodeId || !endNodeId) {
    initialState.messages.push("Please select a starting node and an end node");
    initialState.complete = true;
    return { initialState, stepFunction: (state) => state };
  }
  
  // Set up the initial state
  initialState.messages.push(`Finding shortest path from node ${startNodeId} to node ${endNodeId}`);
  
  // Initialize distances map (nodeId -> distance)
  const distances = new Map<string, number>();
  graph.nodes.forEach(node => {
    distances.set(node.id, node.id === startNodeId ? 0 : Infinity);
    initialState.nodeValues.set(node.id, node.id === startNodeId ? "0" : "∞");
  });
  
  // Initialize previous nodes map (nodeId -> previousNodeId)
  const previous = new Map<string, string | null>();
  graph.nodes.forEach(node => {
    previous.set(node.id, null);
  });
  
  // Create a priority queue (simple array implementation)
  const queue = graph.nodes.map(node => node.id);
  
  // Create an adjacency list with weights for the graph
  const adjacencyList = new Map<string, Array<{ node: string; weight: number }>>();
  graph.nodes.forEach(node => {
    adjacencyList.set(node.id, []);
  });
  
  graph.edges.forEach(edge => {
    const weight = edge.weight || 1;
    const sourceNeighbors = adjacencyList.get(edge.source) || [];
    sourceNeighbors.push({ node: edge.target, weight });
    adjacencyList.set(edge.source, sourceNeighbors);
    
    // If the graph is undirected, add the reverse edge
    if (!graph.directed) {
      const targetNeighbors = adjacencyList.get(edge.target) || [];
      targetNeighbors.push({ node: edge.source, weight });
      adjacencyList.set(edge.target, targetNeighbors);
    }
  });
  
  // Step function for Dijkstra's algorithm
  const stepFunction = (state: AlgorithmState): AlgorithmState => {
    // If the algorithm is complete or the queue is empty, return the current state
    if (state.complete || queue.length === 0) {
      if (!state.complete) {
        state.messages.push("Dijkstra's algorithm complete");
        
        // Reconstruct the path from end to start
        const path: string[] = [];
        let current = endNodeId;
        
        while (current) {
          path.unshift(current);
          current = previous.get(current) || null;
        }
        
        // Highlight the path
        state.highlightedNodes = new Set<string>(path);
        for (let i = 1; i < path.length; i++) {
          const edgeKey = getEdgeKey(path[i - 1], path[i]);
          state.highlightedEdges.add(edgeKey);
        }
        
        state.messages.push(`Shortest path: ${path.join(" -> ")}`);
        state.messages.push(`Total distance: ${distances.get(endNodeId)}`);
        state.result = {
          path,
          distance: distances.get(endNodeId)
        };
        state.complete = true;
      }
      return { ...state };
    }
    
    // Create a new state based on the current state
    const newState: AlgorithmState = { ...state };
    newState.currentStep += 1;
    
    // Remove the highlighted status from all nodes and edges
    newState.highlightedNodes = new Set<string>();
    newState.highlightedEdges = new Set<string>();
    
    // Find the node with the minimum distance
    let minDistance = Infinity;
    let minNode: string | null = null;
    
    for (const nodeId of queue) {
      const distance = distances.get(nodeId) || Infinity;
      if (distance < minDistance) {
        minDistance = distance;
        minNode = nodeId;
      }
    }
    
    // If minNode is still null, all remaining nodes are unreachable
    if (minNode === null) {
      newState.messages.push("No path exists to the target node");
      newState.complete = true;
      return newState;
    }
    
    // Remove the node with the minimum distance from the queue
    const minNodeIndex = queue.indexOf(minNode);
    queue.splice(minNodeIndex, 1);
    
    // Mark the current node as visited
    newState.visitedNodes.add(minNode);
    newState.highlightedNodes.add(minNode);
    newState.messages.push(`Visiting node ${minNode} with distance ${minDistance}`);
    
    // If we've reached the end node, we're done
    if (minNode === endNodeId) {
      newState.messages.push(`Reached the target node ${endNodeId}`);
      
      // Reconstruct the path from end to start
      const path: string[] = [];
      let current = endNodeId;
      
      while (current) {
        path.unshift(current);
        current = previous.get(current) || null;
      }
      
      // Highlight the path
      newState.highlightedNodes = new Set<string>(path);
      for (let i = 1; i < path.length; i++) {
        const edgeKey = getEdgeKey(path[i - 1], path[i]);
        newState.highlightedEdges.add(edgeKey);
      }
      
      newState.messages.push(`Shortest path: ${path.join(" -> ")}`);
      newState.messages.push(`Total distance: ${distances.get(endNodeId)}`);
      newState.result = {
        path,
        distance: distances.get(endNodeId)
      };
      newState.complete = true;
      return newState;
    }
    
    // Get the neighbors of the current node
    const neighbors = adjacencyList.get(minNode) || [];
    
    // Process each neighbor
    for (const { node: neighborId, weight } of neighbors) {
      // Calculate the new distance
      const newDistance = (distances.get(minNode) || 0) + weight;
      
      // If the new distance is shorter than the current distance, update it
      if (newDistance < (distances.get(neighborId) || Infinity)) {
        distances.set(neighborId, newDistance);
        previous.set(neighborId, minNode);
        
        // Update the node value in the state
        newState.nodeValues.set(neighborId, newDistance.toString());
        
        // Highlight the edge
        const edgeKey = getEdgeKey(minNode, neighborId);
        newState.highlightedEdges.add(edgeKey);
        newState.highlightedNodes.add(neighborId);
        
        newState.messages.push(`Updated distance to node ${neighborId}: ${newDistance}`);
      }
    }
    
    return newState;
  };
  
  return { initialState, stepFunction };
};

// Minimum Spanning Tree (Prim's Algorithm)
export const primAlgorithm = (
  graphData: GraphData,
  startNodeId: string | null
): { initialState: AlgorithmState; stepFunction: (state: AlgorithmState) => AlgorithmState } => {
  // Create a copy of the graph to avoid modifying the original
  const graph = cloneGraphData(graphData);
  
  // Initialize algorithm state
  const initialState: AlgorithmState = initAlgorithmState(graph);
  
  // If the graph is directed, show a message
  if (graph.directed) {
    initialState.messages.push("Note: Prim's algorithm works best with undirected graphs");
  }
  
  // If no start node is selected, use the first node
  if (!startNodeId && graph.nodes.length > 0) {
    startNodeId = graph.nodes[0].id;
  }
  
  // If there are no nodes, return initial state
  if (!startNodeId) {
    initialState.messages.push("Please add nodes to the graph");
    initialState.complete = true;
    return { initialState, stepFunction: (state) => state };
  }
  
  // Set up the initial state
  initialState.messages.push(`Finding minimum spanning tree starting from node ${startNodeId}`);
  
  // Initialize key values (nodeId -> key value)
  const keys = new Map<string, number>();
  graph.nodes.forEach(node => {
    keys.set(node.id, node.id === startNodeId ? 0 : Infinity);
    initialState.nodeValues.set(node.id, node.id === startNodeId ? "0" : "∞");
  });
  
  // Initialize parent nodes map (nodeId -> parentNodeId)
  const parent = new Map<string, string | null>();
  graph.nodes.forEach(node => {
    parent.set(node.id, null);
  });
  
  // Create a priority queue (simple array implementation)
  const queue = graph.nodes.map(node => node.id);
  
  // Create an adjacency list with weights for the graph
  const adjacencyList = new Map<string, Array<{ node: string; weight: number }>>();
  graph.nodes.forEach(node => {
    adjacencyList.set(node.id, []);
  });
  
  graph.edges.forEach(edge => {
    const weight = edge.weight || 1;
    const sourceNeighbors = adjacencyList.get(edge.source) || [];
    sourceNeighbors.push({ node: edge.target, weight });
    adjacencyList.set(edge.source, sourceNeighbors);
    
    // If the graph is undirected, add the reverse edge
    if (!graph.directed) {
      const targetNeighbors = adjacencyList.get(edge.target) || [];
      targetNeighbors.push({ node: edge.source, weight });
      adjacencyList.set(edge.target, targetNeighbors);
    }
  });
  
  // Variable to track the total weight of the MST
  let mstWeight = 0;
  
  // Step function for Prim's algorithm
  const stepFunction = (state: AlgorithmState): AlgorithmState => {
    // If the algorithm is complete or the queue is empty, return the current state
    if (state.complete || queue.length === 0) {
      if (!state.complete) {
        state.messages.push("Prim's algorithm complete");
        state.messages.push(`Minimum spanning tree weight: ${mstWeight}`);
        state.result = {
          mstWeight,
          mstEdges: Array.from(state.visitedEdges)
        };
        state.complete = true;
      }
      return { ...state };
    }
    
    // Create a new state based on the current state
    const newState: AlgorithmState = { ...state };
    newState.currentStep += 1;
    
    // Find the node with the minimum key value
    let minKey = Infinity;
    let minNode: string | null = null;
    
    for (const nodeId of queue) {
      const key = keys.get(nodeId) || Infinity;
      if (key < minKey) {
        minKey = key;
        minNode = nodeId;
      }
    }
    
    // If minNode is still null, all remaining nodes are unreachable
    if (minNode === null) {
      newState.messages.push("No more nodes can be added to the MST");
      newState.complete = true;
      return newState;
    }
    
    // Remove the node with the minimum key from the queue
    const minNodeIndex = queue.indexOf(minNode);
    queue.splice(minNodeIndex, 1);
    
    // Mark the current node as visited
    newState.visitedNodes.add(minNode);
    newState.highlightedNodes.add(minNode);
    newState.messages.push(`Adding node ${minNode} to the MST`);
    
    // If the node has a parent, add the edge to the MST
    const parentNode = parent.get(minNode);
    if (parentNode) {
      const edgeKey = getEdgeKey(parentNode, minNode);
      newState.visitedEdges.add(edgeKey);
      newState.highlightedEdges.add(edgeKey);
      
      // Add the edge weight to the total MST weight
      const edge = graph.edges.find(e => 
        (e.source === parentNode && e.target === minNode) || 
        (!graph.directed && e.source === minNode && e.target === parentNode)
      );
      
      if (edge) {
        mstWeight += edge.weight || 1;
        newState.messages.push(`Adding edge ${parentNode}->${minNode} with weight ${edge.weight || 1}`);
      }
    }
    
    // Get the neighbors of the current node
    const neighbors = adjacencyList.get(minNode) || [];
    
    // Process each neighbor
    for (const { node: neighborId, weight } of neighbors) {
      // If the neighbor is still in the queue and the weight is less than its current key
      if (queue.includes(neighborId) && weight < (keys.get(neighborId) || Infinity)) {
        keys.set(neighborId, weight);
        parent.set(neighborId, minNode);
        
        // Update the node value in the state
        newState.nodeValues.set(neighborId, weight.toString());
        
        newState.messages.push(`Updated key of node ${neighborId} to ${weight}`);
      }
    }
    
    return newState;
  };
  
  return { initialState, stepFunction };
};

// Topological Sort Algorithm (for directed acyclic graphs)
export const topologicalSortAlgorithm = (
  graphData: GraphData
): { initialState: AlgorithmState; stepFunction: (state: AlgorithmState) => AlgorithmState } => {
  // Create a copy of the graph to avoid modifying the original
  const graph = cloneGraphData(graphData);
  
  // Initialize algorithm state
  const initialState: AlgorithmState = initAlgorithmState(graph);
  
  // If the graph is not directed, show a message
  if (!graph.directed) {
    initialState.messages.push("Topological sort only works on directed graphs");
    initialState.complete = true;
    return { initialState, stepFunction: (state) => state };
  }
  
  // Set up the initial state
  initialState.messages.push("Starting topological sort");
  
  // Create an adjacency list for the graph
  const adjacencyList = new Map<string, string[]>();
  graph.nodes.forEach(node => {
    adjacencyList.set(node.id, []);
  });
  
  graph.edges.forEach(edge => {
    const sourceNeighbors = adjacencyList.get(edge.source) || [];
    sourceNeighbors.push(edge.target);
    adjacencyList.set(edge.source, sourceNeighbors);
  });
  
  // Calculate in-degrees for all nodes
  const inDegree = new Map<string, number>();
  graph.nodes.forEach(node => {
    inDegree.set(node.id, 0);
  });
  
  graph.edges.forEach(edge => {
    inDegree.set(edge.target, (inDegree.get(edge.target) || 0) + 1);
  });
  
  // Initialize the queue with nodes that have no incoming edges (in-degree = 0)
  const queue: string[] = [];
  graph.nodes.forEach(node => {
    if ((inDegree.get(node.id) || 0) === 0) {
      queue.push(node.id);
      initialState.highlightedNodes.add(node.id);
    }
  });
  
  initialState.queue = [...queue];
  initialState.messages.push(`Added nodes with no incoming edges to the queue: ${queue.join(", ") || "none"}`);
  
  // Array to store the topological sort result
  const result: string[] = [];
  
  // Step function for topological sort
  const stepFunction = (state: AlgorithmState): AlgorithmState => {
    // If the algorithm is complete or the queue is empty, return the current state
    if (state.complete || state.queue.length === 0) {
      if (!state.complete) {
        // Check if all nodes are visited
        if (result.length !== graph.nodes.length) {
          state.messages.push("The graph contains a cycle, topological sort is not possible");
        } else {
          state.messages.push("Topological sort complete");
          state.messages.push(`Topological order: ${result.join(" -> ")}`);
          state.result = {
            order: result
          };
        }
        state.complete = true;
      }
      return { ...state };
    }
    
    // Create a new state based on the current state
    const newState: AlgorithmState = { ...state };
    newState.currentStep += 1;
    
    // Remove the highlighted status from all nodes and edges
    newState.highlightedNodes = new Set<string>();
    newState.highlightedEdges = new Set<string>();
    
    // Dequeue the next node
    const currentNodeId = newState.queue.shift()!;
    
    // Add the node to the result
    result.push(currentNodeId);
    
    // Mark the current node as visited
    newState.visitedNodes.add(currentNodeId);
    newState.highlightedNodes.add(currentNodeId);
    newState.messages.push(`Visiting node ${currentNodeId}, adding to topological order`);
    
    // Get the neighbors of the current node
    const neighbors = adjacencyList.get(currentNodeId) || [];
    
    // Process each neighbor
    for (const neighborId of neighbors) {
      const edgeKey = getEdgeKey(currentNodeId, neighborId);
      newState.highlightedEdges.add(edgeKey);
      
      // Decrease the in-degree of the neighbor
      inDegree.set(neighborId, (inDegree.get(neighborId) || 0) - 1);
      
      // If the in-degree becomes 0, add the neighbor to the queue
      if ((inDegree.get(neighborId) || 0) === 0) {
        newState.queue.push(neighborId);
        newState.highlightedNodes.add(neighborId);
        newState.messages.push(`Node ${neighborId} has no more incoming edges, adding to queue`);
      }
    }
    
    return newState;
  };
  
  return { initialState, stepFunction };
};

// Export the list of available algorithms
export const algorithms: Algorithm[] = [
  {
    id: 'bfs',
    name: 'Breadth-First Search',
    category: 'traversal',
    description: 'Traverses the graph level by level, visiting all neighbors of a node before moving to the next level.'
  },
  {
    id: 'dfs',
    name: 'Depth-First Search',
    category: 'traversal',
    description: 'Traverses as far as possible along a branch before backtracking.'
  },
  {
    id: 'dijkstra',
    name: 'Dijkstra\'s Algorithm',
    category: 'pathfinding',
    description: 'Finds the shortest path between two nodes in a weighted graph.'
  },
  {
    id: 'prim',
    name: 'Prim\'s Algorithm',
    category: 'spanning-tree',
    description: 'Finds a minimum spanning tree for a weighted undirected graph.'
  },
  {
    id: 'topological-sort',
    name: 'Topological Sort',
    category: 'ordering',
    description: 'Orders the nodes in a directed acyclic graph such that all edges go from left to right.'
  }
];

// Function to get the algorithm implementation by ID
export const getAlgorithm = (
  algorithmId: string,
  graphData: GraphData,
  startNodeId: string | null = null,
  endNodeId: string | null = null
): { initialState: AlgorithmState; stepFunction: (state: AlgorithmState) => AlgorithmState } => {
  switch (algorithmId) {
    case 'bfs':
      return bfsAlgorithm(graphData, startNodeId);
    case 'dfs':
      return dfsAlgorithm(graphData, startNodeId);
    case 'dijkstra':
      return dijkstraAlgorithm(graphData, startNodeId, endNodeId);
    case 'prim':
      return primAlgorithm(graphData, startNodeId);
    case 'topological-sort':
      return topologicalSortAlgorithm(graphData);
    default:
      // Default to BFS if algorithm not found
      return bfsAlgorithm(graphData, startNodeId);
  }
}; 