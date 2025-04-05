"use client";

import React, { useRef, useEffect, useState, forwardRef, ForwardedRef } from 'react';
import { motion } from 'framer-motion';
import { GraphData, Node, Edge, AlgorithmState } from './types';

interface GraphCanvasProps {
  graphData: GraphData;
  isDirected: boolean;
  isWeighted: boolean;
  algorithmState: AlgorithmState | null;
  selectedNodeId: string | null;
  selectedEdgeKey: string | null;
  editMode: 'select' | 'move' | 'add-node' | 'add-edge' | 'delete';
  addingEdgeFromNode: Node | null;
  currentMousePos: { x: number, y: number };
  onNodeClick: (nodeId: string, event: React.MouseEvent) => void;
  onNodeDrag: (nodeId: string, newPos: { x: number, y: number }) => void;
  onEdgeClick: (edge: Edge, event: React.MouseEvent) => void;
  onCanvasClick: (event: React.MouseEvent) => void;
  onCanvasMouseMove: (event: React.MouseEvent) => void;
}

// Constants for visualization
const NODE_RADIUS = 18;
const ARROW_SIZE = 7;
const GRID_SIZE = 40;

const GraphCanvas = forwardRef(({
  graphData,
  isDirected,
  isWeighted,
  algorithmState,
  selectedNodeId,
  selectedEdgeKey,
  editMode,
  addingEdgeFromNode,
  currentMousePos,
  onNodeClick,
  onNodeDrag,
  onEdgeClick,
  onCanvasClick,
  onCanvasMouseMove
}: GraphCanvasProps, ref: ForwardedRef<SVGSVGElement>) => {
  const [canvasWidth, setCanvasWidth] = useState(800);
  const [canvasHeight, setCanvasHeight] = useState(600);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (canvasContainerRef.current) {
        const { width, height } = canvasContainerRef.current.getBoundingClientRect();
        setCanvasWidth(width);
        setCanvasHeight(height);
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Process nodes and assign positions if not already specified
  useEffect(() => {
    // Position nodes in a circle if x, y are not defined
    graphData.nodes.forEach(node => {
      if (node.x === undefined || node.y === undefined) {
        const angle = (Math.PI * 2) / Math.max(graphData.nodes.length, 1) * graphData.nodes.indexOf(node);
        const radius = Math.min(canvasWidth, canvasHeight) * 0.35;
        node.x = canvasWidth / 2 + radius * Math.cos(angle);
        node.y = canvasHeight / 2 + radius * Math.sin(angle);
      }
    });
  }, [graphData.nodes, canvasWidth, canvasHeight]);

  // Determine node colors based on state and selection
  const getNodeColor = (nodeId: string): string => {
    // Current node being processed
    if (algorithmState?.currentNode === nodeId) {
      return 'hsl(var(--warning))';
    }
    
    // Selected node
    if (nodeId === selectedNodeId) {
      return 'hsl(var(--secondary))';
    }
    
    // Start node
    if (algorithmState?.startNode === nodeId) {
      return 'hsl(var(--secondary))';
    }
    
    // Visited node
    if (algorithmState?.visitedNodes.includes(nodeId)) {
      return 'hsl(var(--success))';
    }
    
    // Highlighted node
    if (algorithmState?.highlightedNodes?.includes(nodeId)) {
      return 'hsl(var(--primary))';
    }
    
    // Default color
    return 'hsl(var(--muted-foreground))';
  };

  // Determine edge colors based on state and selection
  const getEdgeColor = (source: string, target: string): string => {
    const edgeKey = `${source}-${target}`;
    const reverseEdgeKey = `${target}-${source}`;
    
    // Selected edge
    if (selectedEdgeKey === edgeKey || (!isDirected && selectedEdgeKey === reverseEdgeKey)) {
      return 'hsl(var(--secondary))';
    }
    
    // Edge in current algorithm step
    if (algorithmState?.highlightedEdges?.some(e => 
      (e.source === source && e.target === target) || 
      (!isDirected && e.source === target && e.target === source)
    )) {
      return 'hsl(var(--warning))';
    }
    
    // Visited edge
    if (algorithmState?.visitedEdges.some(e => 
      (e.source === source && e.target === target) || 
      (!isDirected && e.source === target && e.target === source)
    )) {
      return 'hsl(var(--success))';
    }
    
    // Default edge color
    return 'hsl(var(--muted-foreground)/0.7)';
  };

  // Calculate edge path considering directness and whether there are reverse edges
  const calculateEdgePath = (sourceNode: Node, targetNode: Node, bidirectional: boolean = false) => {
    // For bidirectional edges, create a curved path
    if (bidirectional) {
      const dx = targetNode.x! - sourceNode.x!;
      const dy = targetNode.y! - sourceNode.y!;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Normal vector
      const nx = -dy / distance;
      const ny = dx / distance;
      
      // Control point offset (adjust curvature based on distance)
      const offset = distance * 0.15;
      const cx = (sourceNode.x! + targetNode.x!) / 2 + nx * offset;
      const cy = (sourceNode.y! + targetNode.y!) / 2 + ny * offset;
      
      return `M ${sourceNode.x} ${sourceNode.y} Q ${cx} ${cy} ${targetNode.x} ${targetNode.y}`;
    }
    
    // For directed or single edges, create a straight line
    return `M ${sourceNode.x} ${sourceNode.y} L ${targetNode.x} ${targetNode.y}`;
  };

  // Calculate arrow points for directed edges
  const calculateArrowPoints = (sourceNode: Node, targetNode: Node, isCurved: boolean = false) => {
    // Calculate angle
    const angle = Math.atan2(targetNode.y! - sourceNode.y!, targetNode.x! - sourceNode.x!);
    
    // Adjust angle for curved paths
    const adjustedAngle = isCurved 
      ? angle + Math.PI / 10  // Slight adjustment to align with curve
      : angle;
    
    // Calculate the point where the arrow should be (outside the node)
    const x2 = targetNode.x! - NODE_RADIUS * Math.cos(adjustedAngle);
    const y2 = targetNode.y! - NODE_RADIUS * Math.sin(adjustedAngle);
    
    // Calculate the points for the arrowhead
    const arrowPoint1X = x2 - ARROW_SIZE * Math.cos(adjustedAngle - Math.PI / 6);
    const arrowPoint1Y = y2 - ARROW_SIZE * Math.sin(adjustedAngle - Math.PI / 6);
    const arrowPoint2X = x2 - ARROW_SIZE * Math.cos(adjustedAngle + Math.PI / 6);
    const arrowPoint2Y = y2 - ARROW_SIZE * Math.sin(adjustedAngle + Math.PI / 6);
    
    return `${x2},${y2} ${arrowPoint1X},${arrowPoint1Y} ${arrowPoint2X},${arrowPoint2Y}`;
  };

  // Handle node dragging
  const handleNodeMouseDown = (event: React.MouseEvent, nodeId: string) => {
    if (editMode === 'move') {
      event.stopPropagation();
      setIsDragging(true);
      
      const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        
        const svgElement = ref as React.RefObject<SVGSVGElement>;
        if (svgElement.current) {
          const CTM = svgElement.current.getScreenCTM();
          if (CTM) {
            const svgPoint = svgElement.current.createSVGPoint();
            svgPoint.x = e.clientX;
            svgPoint.y = e.clientY;
            const transformedPoint = svgPoint.matrixTransform(CTM.inverse());
            
            onNodeDrag(nodeId, {
              x: transformedPoint.x,
              y: transformedPoint.y
            });
          }
        }
      };
      
      const handleMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
      
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      // For non-move modes, just pass the click event
      onNodeClick(nodeId, event);
    }
  };

  return (
    <div 
      ref={canvasContainerRef} 
      className="w-full h-full overflow-hidden bg-background relative"
    >
      <svg 
        ref={ref}
        width="100%" 
        height="100%" 
        onClick={onCanvasClick}
        onMouseMove={onCanvasMouseMove}
        className="touch-none"
        style={{ cursor: isDragging ? 'grabbing' : (
          editMode === 'add-node' ? 'cell' :
          editMode === 'add-edge' ? 'crosshair' :
          editMode === 'delete' ? 'not-allowed' :
          editMode === 'move' ? 'grab' : 'default'
        )}}
      >
        {/* Grid background */}
        <defs>
          <pattern id="grid" width={GRID_SIZE} height={GRID_SIZE} patternUnits="userSpaceOnUse">
            <path
              d={`M ${GRID_SIZE} 0 L 0 0 0 ${GRID_SIZE}`}
              fill="none"
              stroke="hsl(var(--muted-foreground)/0.1)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Status messages */}
        <text x="10" y="25" className="text-xs fill-muted-foreground">
          {editMode === 'add-node' && "Click to add a node"}
          {editMode === 'add-edge' && (addingEdgeFromNode 
            ? `Select a target node for edge from ${addingEdgeFromNode.label || addingEdgeFromNode.id}` 
            : "Select source node for a new edge")}
          {editMode === 'delete' && "Click a node or edge to delete it"}
          {editMode === 'move' && "Drag nodes to move them"}
          {algorithmState?.message && `Algorithm: ${algorithmState.message}`}
        </text>
        
        {/* Render all edges */}
        {graphData.edges.map((edge) => {
          const source = graphData.nodes.find(n => n.id === edge.source);
          const target = graphData.nodes.find(n => n.id === edge.target);
          
          if (!source || !target || source.x === undefined || source.y === undefined || 
              target.x === undefined || target.y === undefined) {
            return null; // Skip edges with missing coordinates
          }
          
          // Check if there's a reverse edge (for bidirectional rendering)
          const hasReverseEdge = graphData.edges.some(e => 
            e.source === edge.target && e.target === edge.source
          );
          
          // For undirected graphs with bidirectional edges, only render one
          if (!isDirected && hasReverseEdge && edge.source > edge.target) {
            return null;
          }
          
          // Determine if this edge is selected
          const edgeKey = `${edge.source}-${edge.target}`;
          const reverseEdgeKey = `${edge.target}-${edge.source}`;
          const isSelected = selectedEdgeKey === edgeKey || (!isDirected && selectedEdgeKey === reverseEdgeKey);
          
          // Calculate the path
          const edgePath = calculateEdgePath(source, target, hasReverseEdge);
          const color = getEdgeColor(edge.source, edge.target);
          
          return (
            <g key={`edge-${edgeKey}`}>
              {/* Edge path */}
              <path
                d={edgePath}
                stroke={color}
                strokeWidth={isSelected ? 3 : 2}
                fill="none"
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdgeClick(edge, e);
                }}
              />
              
              {/* Arrowhead for directed edges */}
              {isDirected && (
                <polygon
                  points={calculateArrowPoints(source, target, hasReverseEdge)}
                  fill={color}
                  stroke="none"
                />
              )}
              
              {/* Weight label */}
              {isWeighted && edge.weight !== undefined && (
                <text
                  x={(source.x + target.x) / 2}
                  y={(source.y + target.y) / 2}
                  dy={hasReverseEdge ? -8 : -5}
                  textAnchor="middle"
                  className="text-xs font-medium fill-foreground select-none pointer-events-none"
                >
                  {edge.weight}
                </text>
              )}
            </g>
          );
        })}
        
        {/* Render temporary edge while adding */}
        {editMode === 'add-edge' && addingEdgeFromNode && addingEdgeFromNode.x !== undefined && addingEdgeFromNode.y !== undefined && (
          <g>
            <path
              d={`M ${addingEdgeFromNode.x} ${addingEdgeFromNode.y} L ${currentMousePos.x} ${currentMousePos.y}`}
              stroke="hsl(var(--muted-foreground))"
              strokeWidth="2"
              strokeDasharray="5,5"
              fill="none"
            />
            {isDirected && (
              <polygon
                points={`
                  ${currentMousePos.x},${currentMousePos.y}
                  ${currentMousePos.x - 10},${currentMousePos.y - 5}
                  ${currentMousePos.x - 10},${currentMousePos.y + 5}
                `}
                fill="hsl(var(--muted-foreground))"
                stroke="none"
                className="opacity-50"
              />
            )}
          </g>
        )}
        
        {/* Render all nodes */}
        {graphData.nodes.map((node) => {
          if (node.x === undefined || node.y === undefined) return null;
          
          const isSelected = node.id === selectedNodeId;
          const isStart = node.id === algorithmState?.startNode;
          const isSource = addingEdgeFromNode?.id === node.id;
          const color = getNodeColor(node.id);
          
          return (
            <g
              key={`node-${node.id}`}
              transform={`translate(${node.x}, ${node.y})`}
              className={`cursor-${editMode === 'move' ? 'grab' : 'pointer'}`}
              onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
            >
              {/* Node circle with shadow */}
              <circle
                r={NODE_RADIUS}
                className="drop-shadow-md"
                fill={color}
                stroke={isSelected || isSource || isStart ? 'white' : 'transparent'}
                strokeWidth={2}
              />
              
              {/* Node label */}
              <text
                dy="0.3em"
                textAnchor="middle"
                className="text-sm font-medium select-none fill-background"
              >
                {node.label || node.id}
              </text>
              
              {/* Visual indicator for start node */}
              {isStart && (
                <circle
                  r={NODE_RADIUS + 4}
                  fill="none"
                  stroke="hsl(var(--secondary))"
                  strokeWidth="2"
                  strokeDasharray="3,3"
                  className="opacity-70"
                />
              )}
            </g>
          );
        })}
        
        {/* Legend for algorithm state (bottom-left) */}
        {algorithmState && (
          <g transform={`translate(10, ${canvasHeight - 60})`} className="text-xs">
            <rect width="140" height="50" fill="hsl(var(--muted)/0.5)" rx="4" />
            <text x="5" y="15" className="fill-foreground">Step: {algorithmState.step}</text>
            <text x="5" y="30" className="fill-foreground">
              Status: {algorithmState.isComplete ? 'Complete' : 'Running'}
            </text>
            <text x="5" y="45" className="fill-foreground">
              Visited: {algorithmState.visitedNodes.length} nodes
            </text>
          </g>
        )}
      </svg>
    </div>
  );
});

GraphCanvas.displayName = 'GraphCanvas';

export default GraphCanvas; 