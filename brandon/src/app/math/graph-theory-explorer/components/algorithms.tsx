import { GraphData, Algorithm, AlgorithmState, Node, Edge } from './types';

// Helper function to create a deep copy of GraphData
const cloneGraphData = (graphData: GraphData): GraphData => {
  return {
    nodes: graphData.nodes.map(node => ({ ...node })),
    edges: graphData.edges.map(edge => ({ ...edge }))
  };
};

// Helper function to initialize algorithm state
const initAlgorithmState = (graphData: GraphData, algorithmId: string = ''): AlgorithmState => {
  return {
    algorithm: algorithmId,
    step: 0,
    startNode: null,
    currentNode: null,
    visitedNodes: [],
    visitedEdges: [],
    highlightedNodes: [],
    highlightedEdges: [],
    nodeColors: {},
    edgeColors: {},
    distances: {},
    parents: {},
    queue: [],
    stack: [],
    isComplete: false,
    message: ''
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
  const initialState: AlgorithmState = initAlgorithmState(graph, 'bfs');

  // If no start node is selected, return initial state
  if (!startNodeId) {
    initialState.message = "Please select a starting node";
    initialState.isComplete = true;
    return { initialState, stepFunction: (state) => state };
  }

  // Set up the initial state
  initialState.startNode = startNodeId;
  initialState.currentNode = startNodeId;
  initialState.queue = [startNodeId];
  initialState.highlightedNodes = [startNodeId];
  initialState.message = `Starting BFS from node ${startNodeId}`;

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
    if (state.isComplete || (state.queue && state.queue.length === 0)) {
      if (!state.isComplete) {
        state.message = "BFS traversal complete";
        state.isComplete = true;
      }
      return { ...state };
    }

    // Create a new state based on the current state
    const newState: AlgorithmState = { ...state };
    newState.step += 1;

    // Reset highlighted nodes and edges
    newState.highlightedNodes = [];
    newState.highlightedEdges = [];

    // Dequeue the next node
    const currentNodeId = newState.queue?.shift() || '';

    // Mark the current node as visited
    newState.currentNode = currentNodeId;
    newState.visitedNodes = [...newState.visitedNodes, currentNodeId];
    newState.highlightedNodes = [currentNodeId];
    newState.message = `Visiting node ${currentNodeId}`;

    // Get the neighbors of the current node
    const neighbors = adjacencyList.get(currentNodeId) || [];

    // Process each neighbor
    for (const neighborId of neighbors) {
      // If the neighbor has not been visited, enqueue it
      if (!newState.visitedNodes.includes(neighborId) && !newState.queue?.includes(neighborId)) {
        newState.queue = [...(newState.queue || []), neighborId];
        newState.highlightedNodes = [...newState.highlightedNodes, neighborId];
        newState.highlightedEdges = [...(newState.highlightedEdges || []), { source: currentNodeId, target: neighborId }];
        newState.message += `\nAdding node ${neighborId} to the queue`;
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
  const initialState: AlgorithmState = initAlgorithmState(graph, 'dfs');

  // If no start node is selected, return initial state
  if (!startNodeId) {
    initialState.message = "Please select a starting node";
    initialState.isComplete = true;
    return { initialState, stepFunction: (state) => state };
  }

  // Set up the initial state
  initialState.startNode = startNodeId;
  initialState.currentNode = startNodeId;
  initialState.stack = [startNodeId];
  initialState.highlightedNodes = [startNodeId];
  initialState.message = `Starting DFS from node ${startNodeId}`;

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
    if (state.isComplete || (state.stack && state.stack.length === 0)) {
      if (!state.isComplete) {
        state.message = "DFS traversal complete";
        state.isComplete = true;
      }
      return { ...state };
    }

    // Create a new state based on the current state
    const newState: AlgorithmState = { ...state };
    newState.step += 1;

    // Reset highlighted nodes and edges
    newState.highlightedNodes = [];
    newState.highlightedEdges = [];

    // Pop the next node from the stack
    const currentNodeId = newState.stack?.pop() || '';

    // Mark the current node as visited
    newState.currentNode = currentNodeId;
    newState.visitedNodes = [...newState.visitedNodes, currentNodeId];
    newState.highlightedNodes = [currentNodeId];
    newState.message = `Visiting node ${currentNodeId}`;

    // Get the neighbors of the current node
    const neighbors = adjacencyList.get(currentNodeId) || [];

    // Process each neighbor in reverse order (to maintain traversal order)
    for (let i = neighbors.length - 1; i >= 0; i--) {
      const neighborId = neighbors[i];

      // If the neighbor has not been visited, push it to the stack
      if (!newState.visitedNodes.includes(neighborId) && !newState.stack?.includes(neighborId)) {
        newState.stack = [...(newState.stack || []), neighborId];
        newState.highlightedNodes = [...newState.highlightedNodes, neighborId];
        newState.highlightedEdges = [...(newState.highlightedEdges || []), { source: currentNodeId, target: neighborId }];
        newState.message += `\nAdding node ${neighborId} to the stack`;
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
  const initialState: AlgorithmState = initAlgorithmState(graph, 'dijkstra');

  // If no start or end node is selected, return initial state
  if (!startNodeId || !endNodeId) {
    initialState.message = "Please select a starting node and an end node";
    initialState.isComplete = true;
    return { initialState, stepFunction: (state) => state };
  }

  // Set up the initial state
  initialState.startNode = startNodeId;
  initialState.currentNode = startNodeId;
  initialState.message = `Finding shortest path from node ${startNodeId} to node ${endNodeId}`;

  // Initialize distances map (nodeId -> distance)
  const distances: Record<string, number> = {};
  graph.nodes.forEach(node => {
    distances[node.id] = node.id === startNodeId ? 0 : Infinity;
  });
  initialState.distances = distances;

  // Initialize previous nodes map (nodeId -> previousNodeId)
  const parents: Record<string, string> = {};
  graph.nodes.forEach(node => {
    parents[node.id] = '';
  });
  initialState.parents = parents;

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
    if (state.isComplete || queue.length === 0) {
      if (!state.isComplete) {
        state.message = "Dijkstra's algorithm complete";

        // Reconstruct the path from end to start
        const path: string[] = [];
        let current = endNodeId;

        while (current && state.parents && state.parents[current]) {
          path.unshift(current);
          current = state.parents[current];
        }

        if (current) {
          path.unshift(current); // Add the start node
        }

        // Highlight the path
        state.highlightedNodes = path;
        state.highlightedEdges = [];
        for (let i = 1; i < path.length; i++) {
          state.highlightedEdges.push({ source: path[i - 1], target: path[i] });
        }

        state.message += `\nShortest path: ${path.join(" -> ")}\nTotal distance: ${state.distances?.[endNodeId] || 'unknown'}`;
        state.result = {
          path,
          distance: state.distances?.[endNodeId]
        };
        state.isComplete = true;
      }
      return { ...state };
    }

    // Create a new state based on the current state
    const newState: AlgorithmState = { ...state };
    newState.step += 1;

    // Reset highlighted nodes and edges
    newState.highlightedNodes = [];
    newState.highlightedEdges = [];

    // Find the node with the minimum distance
    let minDistance = Infinity;
    let minNode: string | null = null;

    for (const nodeId of queue) {
      const distance = newState.distances?.[nodeId] || Infinity;
      if (distance < minDistance) {
        minDistance = distance;
        minNode = nodeId;
      }
    }

    // If minNode is still null, all remaining nodes are unreachable
    if (minNode === null) {
      newState.message = "No path exists to the target node";
      newState.isComplete = true;
      return newState;
    }

    // Remove the node with the minimum distance from the queue
    const minNodeIndex = queue.indexOf(minNode);
    queue.splice(minNodeIndex, 1);

    // Mark the current node as visited
    newState.currentNode = minNode;
    newState.visitedNodes = [...newState.visitedNodes, minNode];
    newState.highlightedNodes = [minNode];
    newState.message = `Visiting node ${minNode} with distance ${minDistance}`;

    // If we've reached the end node, we're done
    if (minNode === endNodeId) {
      newState.message += `\nReached the target node ${endNodeId}`;

      // Reconstruct the path from end to start
      const path: string[] = [];
      let current = endNodeId;

      while (current && newState.parents && newState.parents[current]) {
        path.unshift(current);
        current = newState.parents[current];
      }

      if (current) {
        path.unshift(current); // Add the start node
      }

      // Highlight the path
      newState.highlightedNodes = path;
      newState.highlightedEdges = [];
      for (let i = 1; i < path.length; i++) {
        newState.highlightedEdges.push({ source: path[i - 1], target: path[i] });
      }

      newState.message += `\nShortest path: ${path.join(" -> ")}\nTotal distance: ${newState.distances?.[endNodeId] || 'unknown'}`;
      newState.result = {
        path,
        distance: newState.distances?.[endNodeId]
      };
      newState.isComplete = true;
      return newState;
    }

    // Get the neighbors of the current node
    const neighbors = adjacencyList.get(minNode) || [];

    // Process each neighbor
    for (const { node: neighborId, weight } of neighbors) {
      // Calculate the new distance
      const newDistance = (newState.distances?.[minNode] || 0) + weight;

      // If the new distance is shorter than the current distance, update it
      if (newDistance < (newState.distances?.[neighborId] || Infinity)) {
        if (newState.distances) {
          newState.distances[neighborId] = newDistance;
        }
        if (newState.parents) {
          newState.parents[neighborId] = minNode;
        }

        // Highlight the edge
        newState.highlightedEdges = [...(newState.highlightedEdges || []), { source: minNode, target: neighborId }];
        newState.highlightedNodes = [...newState.highlightedNodes, neighborId];

        newState.message += `\nUpdated distance to node ${neighborId}: ${newDistance}`;
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
  const initialState: AlgorithmState = initAlgorithmState(graph, 'prim');

  // If the graph is directed, show a message
  if (graph.directed) {
    initialState.message = "Note: Prim's algorithm works best with undirected graphs";
  }

  // If no start node is selected, use the first node
  if (!startNodeId && graph.nodes.length > 0) {
    startNodeId = graph.nodes[0].id;
  }

  // If there are no nodes, return initial state
  if (!startNodeId) {
    initialState.message = "Please add nodes to the graph";
    initialState.isComplete = true;
    return { initialState, stepFunction: (state) => state };
  }

  // Set up the initial state
  initialState.startNode = startNodeId;
  initialState.currentNode = startNodeId;
  initialState.message = `Finding minimum spanning tree starting from node ${startNodeId}`;

  // Initialize key values (nodeId -> key value)
  const nodeColors: Record<string, string> = {};
  graph.nodes.forEach(node => {
    nodeColors[node.id] = node.id === startNodeId ? 'green' : 'gray';
  });
  initialState.nodeColors = nodeColors;

  // Initialize parent nodes map (nodeId -> parentNodeId)
  const parents: Record<string, string> = {};
  graph.nodes.forEach(node => {
    parents[node.id] = '';
  });
  initialState.parents = parents;

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
    if (state.isComplete || queue.length === 0) {
      if (!state.isComplete) {
        state.message = "Prim's algorithm complete";
        state.message += `\nMinimum spanning tree weight: ${mstWeight}`;
        state.result = {
          mstWeight,
          mstEdges: state.visitedEdges
        };
        state.isComplete = true;
      }
      return { ...state };
    }

    // Create a new state based on the current state
    const newState: AlgorithmState = { ...state };
    newState.step += 1;

    // Find the node with the minimum key value
    let minKey = Infinity;
    let minNode: string | null = null;

    // Use distances as key values for Prim's algorithm
    const keys: Record<string, number> = {};
    queue.forEach(nodeId => {
      keys[nodeId] = newState.distances?.[nodeId] || Infinity;
    });

    for (const nodeId of queue) {
      const key = keys[nodeId] || Infinity;
      if (key < minKey) {
        minKey = key;
        minNode = nodeId;
      }
    }

    // If minNode is still null, all remaining nodes are unreachable
    if (minNode === null) {
      newState.message = "No more nodes can be added to the MST";
      newState.isComplete = true;
      return newState;
    }

    // Remove the node with the minimum key from the queue
    const minNodeIndex = queue.indexOf(minNode);
    queue.splice(minNodeIndex, 1);

    // Mark the current node as visited
    newState.currentNode = minNode;
    newState.visitedNodes = [...newState.visitedNodes, minNode];
    newState.highlightedNodes = [minNode];
    newState.message = `Adding node ${minNode} to the MST`;

    // If the node has a parent, add the edge to the MST
    const parentNode = newState.parents?.[minNode];
    if (parentNode) {
      const newEdge = { source: parentNode, target: minNode };
      newState.visitedEdges = [...newState.visitedEdges, newEdge];
      newState.highlightedEdges = [newEdge];

      // Add the edge weight to the total MST weight
      const edge = graph.edges.find(e =>
        (e.source === parentNode && e.target === minNode) ||
        (!graph.directed && e.source === minNode && e.target === parentNode)
      );

      if (edge) {
        mstWeight += edge.weight || 1;
        newState.message += `\nAdding edge ${parentNode}->${minNode} with weight ${edge.weight || 1}`;
      }
    }

    // Get the neighbors of the current node
    const neighbors = adjacencyList.get(minNode) || [];

    // Process each neighbor
    for (const { node: neighborId, weight } of neighbors) {
      // If the neighbor is still in the queue and the weight is less than its current key
      if (queue.includes(neighborId) && weight < (keys[neighborId] || Infinity)) {
        if (newState.distances) {
          newState.distances[neighborId] = weight;
        }
        if (newState.parents) {
          newState.parents[neighborId] = minNode;
        }

        newState.message += `\nUpdated key of node ${neighborId} to ${weight}`;
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
  const initialState: AlgorithmState = initAlgorithmState(graph, 'topological-sort');

  // If the graph is not directed, show a message
  if (!graph.directed) {
    initialState.message = "Topological sort only works on directed graphs";
    initialState.isComplete = true;
    return { initialState, stepFunction: (state) => state };
  }

  // Set up the initial state
  initialState.message = "Starting topological sort";

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
    }
  });

  initialState.queue = [...queue];
  initialState.highlightedNodes = [...queue];
  initialState.message = `Added nodes with no incoming edges to the queue: ${queue.join(", ") || "none"}`;

  // Array to store the topological sort result
  const result: string[] = [];

  // Step function for topological sort
  const stepFunction = (state: AlgorithmState): AlgorithmState => {
    // If the algorithm is complete or the queue is empty, return the current state
    if (state.isComplete || (state.queue && state.queue.length === 0)) {
      if (!state.isComplete) {
        // Check if all nodes are visited
        if (result.length !== graph.nodes.length) {
          state.message = "The graph contains a cycle, topological sort is not possible";
        } else {
          state.message = "Topological sort complete";
          state.message += `\nTopological order: ${result.join(" -> ")}`;
          state.result = {
            order: result
          };
        }
        state.isComplete = true;
      }
      return { ...state };
    }

    // Create a new state based on the current state
    const newState: AlgorithmState = { ...state };
    newState.step += 1;

    // Reset highlighted nodes and edges
    newState.highlightedNodes = [];
    newState.highlightedEdges = [];

    // Dequeue the next node
    const currentNodeId = newState.queue?.shift() || '';

    // Add the node to the result
    result.push(currentNodeId);

    // Mark the current node as visited
    newState.currentNode = currentNodeId;
    newState.visitedNodes = [...newState.visitedNodes, currentNodeId];
    newState.highlightedNodes = [currentNodeId];
    newState.message = `Visiting node ${currentNodeId}, adding to topological order`;

    // Get the neighbors of the current node
    const neighbors = adjacencyList.get(currentNodeId) || [];

    // Process each neighbor
    for (const neighborId of neighbors) {
      // Highlight the edge
      newState.highlightedEdges = [...(newState.highlightedEdges || []), { source: currentNodeId, target: neighborId }];

      // Decrease the in-degree of the neighbor
      inDegree.set(neighborId, (inDegree.get(neighborId) || 0) - 1);

      // If the in-degree becomes 0, add the neighbor to the queue
      if ((inDegree.get(neighborId) || 0) === 0) {
        newState.queue = [...(newState.queue || []), neighborId];
        newState.highlightedNodes = [...newState.highlightedNodes, neighborId];
        newState.message += `\nNode ${neighborId} has no more incoming edges, adding to queue`;
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