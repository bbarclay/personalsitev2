"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Share2, 
  RotateCcw, 
  Play, 
  Pause, 
  Skip, 
  Plus, 
  Minus,
  GripHorizontal, 
  Shuffle,
  ZoomIn, 
  ZoomOut,
  Info
} from 'lucide-react';
import GraphCanvas from './GraphCanvas';
import AlgorithmPanel from './AlgorithmPanel';
import GraphProperties from './GraphProperties';
import { GraphData, Node, Edge, Algorithm, AlgorithmState } from './types';
import { generateRandomGraph, applyAlgorithm, getGraphProperties } from './graphUtils';
import { ControlPanel } from './ControlPanel';
import { InfoPanel } from './InfoPanel';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { toast } from "sonner";

const presetGraphs = [
  { id: 'empty', name: 'Empty Graph', nodes: [], edges: [] },
  { id: 'path', name: 'Path (P5)', nodes: Array(5).fill(null).map((_, i) => ({ id: i.toString(), label: `${i+1}` })), 
    edges: Array(4).fill(null).map((_, i) => ({ source: i.toString(), target: (i+1).toString(), weight: 1 })) },
  { id: 'cycle', name: 'Cycle (C5)', nodes: Array(5).fill(null).map((_, i) => ({ id: i.toString(), label: `${i+1}` })), 
    edges: [...Array(4).fill(null).map((_, i) => ({ source: i.toString(), target: (i+1).toString(), weight: 1 })), 
           { source: '4', target: '0', weight: 1 }] },
  { id: 'complete', name: 'Complete (K5)', nodes: Array(5).fill(null).map((_, i) => ({ id: i.toString(), label: `${i+1}` })),
    edges: Array.from({ length: 5 }).flatMap((_, i) => 
      Array.from({ length: 5 }).slice(i + 1).map((_, j) => ({ 
        source: i.toString(), 
        target: (i + j + 1).toString(), 
        weight: 1 
      }))
    )},
  { id: 'bipartite', name: 'Complete Bipartite (K3,3)', 
    nodes: [...Array(3).fill(null).map((_, i) => ({ id: `a${i}`, label: `A${i+1}`, group: 'A' })),
           ...Array(3).fill(null).map((_, i) => ({ id: `b${i}`, label: `B${i+1}`, group: 'B' }))],
    edges: Array.from({ length: 3 }).flatMap((_, i) => 
      Array.from({ length: 3 }).map((_, j) => ({ 
        source: `a${i}`, 
        target: `b${j}`, 
        weight: 1 
      }))
    )}
];

const algorithms: Algorithm[] = [
  { id: 'bfs', name: 'Breadth-First Search', category: 'traversal' },
  { id: 'dfs', name: 'Depth-First Search', category: 'traversal' },
  { id: 'dijkstra', name: 'Dijkstra\'s Algorithm', category: 'shortest-path' },
  { id: 'kruskal', name: 'Kruskal\'s MST', category: 'spanning-tree' },
  { id: 'prim', name: 'Prim\'s MST', category: 'spanning-tree' },
  { id: 'coloring', name: 'Graph Coloring', category: 'coloring' }
];

const GraphExplorer: React.FC = () => {
  const [graphData, setGraphData] = useState<GraphData>(presetGraphs[0]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>(algorithms[0].id);
  const [algorithmState, setAlgorithmState] = useState<AlgorithmState | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [startNode, setStartNode] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [selectedEdgeKey, setSelectedEdgeKey] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<'select' | 'move' | 'add-node' | 'add-edge' | 'delete'>('select');
  const [isDirected, setIsDirected] = useState(false);
  const [isWeighted, setIsWeighted] = useState(true);
  const [speed, setSpeed] = useState<number>(1);

  const [addingEdgeFromNode, setAddingEdgeFromNode] = useState<Node | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const algorithmTimerRef = useRef<NodeJS.Timeout | null>(null);
  const canvasRef = useRef<SVGSVGElement>(null);

  const selectedNode = graphData.nodes.find(n => n.id === selectedNodeId) || null;
  const selectedEdge = graphData.edges.find(e => `${e.source}-${e.target}` === selectedEdgeKey || (!isDirected && `${e.target}-${e.source}` === selectedEdgeKey)) || null;

  const handleAlgorithmChange = useCallback((algoId: string) => {
    setSelectedAlgorithm(algoId);
    setAlgorithmState(null);
    setIsRunning(false);
    if (algorithmTimerRef.current) clearTimeout(algorithmTimerRef.current);
  }, []);

  const handleStartNodeChange = useCallback((nodeId: string | null) => {
    setStartNode(nodeId);
    if (selectedAlgorithm) {
        setAlgorithmState(initializeAlgorithmState(selectedAlgorithm, graphData, nodeId || undefined));
    }
    setIsRunning(false);
     if (algorithmTimerRef.current) clearTimeout(algorithmTimerRef.current);
  }, [selectedAlgorithm, graphData]);

  const resetAlgorithmExecution = useCallback(() => {
     if (selectedAlgorithm && startNode) {
        setAlgorithmState(initializeAlgorithmState(selectedAlgorithm, graphData, startNode));
     } else {
        setAlgorithmState(null);
     }
     setIsRunning(false);
     if (algorithmTimerRef.current) clearTimeout(algorithmTimerRef.current);
  }, [selectedAlgorithm, graphData, startNode]);

  const runAlgorithmStep = useCallback(() => {
    if (!algorithmState || algorithmState.isComplete) {
      setIsRunning(false);
      if (algorithmTimerRef.current) clearTimeout(algorithmTimerRef.current);
      return;
    }

    const stepFunction = getStepFunction(algorithmState.algorithm);
    if (stepFunction) {
      setAlgorithmState(prevState => stepFunction(prevState!, graphData));
    } else {
        console.error("Step function not found for", algorithmState.algorithm);
        setIsRunning(false);
        if (algorithmTimerRef.current) clearTimeout(algorithmTimerRef.current);
    }
  }, [algorithmState, graphData]);

  const handlePlayPause = useCallback(() => {
    if (!startNode && (selectedAlgorithm === 'bfs' || selectedAlgorithm === 'dfs' || selectedAlgorithm === 'dijkstra')){
        toast.error("Please select a start node first.");
        return;
    }
    if (!algorithmState) {
        resetAlgorithmExecution();
    }
    setIsRunning(prev => !prev);
  }, [startNode, selectedAlgorithm, algorithmState, resetAlgorithmExecution]);

  const handleStepForward = useCallback(() => {
    if (!startNode && (selectedAlgorithm === 'bfs' || selectedAlgorithm === 'dfs' || selectedAlgorithm === 'dijkstra')){
        toast.error("Please select a start node first.");
        return;
    }
     setIsRunning(false);
     if (algorithmTimerRef.current) clearTimeout(algorithmTimerRef.current);
     if (!algorithmState) {
         resetAlgorithmExecution();
     } else {
         runAlgorithmStep();
     }
  }, [startNode, selectedAlgorithm, algorithmState, resetAlgorithmExecution, runAlgorithmStep]);

  const handleResetGraph = useCallback(() => {
    setGraphData({ nodes: [], edges: [] });
    setSelectedNodeId(null);
    setSelectedEdgeKey(null);
    setStartNode(null);
    setAlgorithmState(null);
    setIsRunning(false);
    if (algorithmTimerRef.current) clearTimeout(algorithmTimerRef.current);
    setAddingEdgeFromNode(null);
  }, []);

  const handleLoadPreset = useCallback((presetData: GraphData) => {
    const nodesCopy = presetData.nodes.map(n => ({ ...n }));
    const edgesCopy = presetData.edges.map(e => ({ ...e }));
    setGraphData({ nodes: nodesCopy, edges: edgesCopy });
    setSelectedNodeId(null);
    setSelectedEdgeKey(null);
    setStartNode(nodesCopy.length > 0 ? nodesCopy[0].id : null);
    setAlgorithmState(null);
    setIsRunning(false);
    if (algorithmTimerRef.current) clearTimeout(algorithmTimerRef.current);
    setAddingEdgeFromNode(null);
    setIsWeighted(edgesCopy.some(e => e.weight !== undefined));
  }, []);

  const handleDirectedChange = useCallback((checked: boolean) => {
    setIsDirected(checked);
    setAlgorithmState(null);
    setIsRunning(false);
    if (algorithmTimerRef.current) clearTimeout(algorithmTimerRef.current);
  }, []);

  const handleWeightedChange = useCallback((checked: boolean) => {
    setIsWeighted(checked);
    setGraphData(prev => ({
        ...prev,
        edges: prev.edges.map(e => ({ ...e, weight: checked ? (e.weight ?? 1) : undefined }))
     }));
    setAlgorithmState(null);
    setIsRunning(false);
    if (algorithmTimerRef.current) clearTimeout(algorithmTimerRef.current);
  }, []);

  const handleEditModeChange = useCallback((mode: 'select' | 'move' | 'add-node' | 'add-edge' | 'delete') => {
    setEditMode(mode);
    setAddingEdgeFromNode(null);
  }, []);

   const handleSpeedChange = useCallback((value: number) => {
       setSpeed(value);
   }, []);

  const handleNodeClick = useCallback((nodeId: string, event: React.MouseEvent) => {
    const node = graphData.nodes.find(n => n.id === nodeId);
    if (!node) return;

    switch (editMode) {
      case 'select':
        setSelectedNodeId(nodeId === selectedNodeId ? null : nodeId);
        setSelectedEdgeKey(null);
        setAddingEdgeFromNode(null);
        break;
      case 'add-edge':
        if (!addingEdgeFromNode) {
          setAddingEdgeFromNode(node);
          const CTM = canvasRef.current?.getScreenCTM();
           if (CTM) {
                let svgPoint = canvasRef.current?.createSVGPoint();
                if (svgPoint) {
                    svgPoint.x = event.clientX;
                    svgPoint.y = event.clientY;
                    svgPoint = svgPoint.matrixTransform(CTM.inverse());
                    setMousePos({ x: svgPoint.x, y: svgPoint.y });
                }
           }
        } else if (addingEdgeFromNode.id !== nodeId) {
           const edgeExists = graphData.edges.some(e =>
              (e.source === addingEdgeFromNode.id && e.target === nodeId) ||
              (!isDirected && e.source === nodeId && e.target === addingEdgeFromNode.id)
           );
           if (!edgeExists) {
             const newEdge: Edge = {
                source: addingEdgeFromNode.id,
                target: nodeId,
                weight: isWeighted ? 1 : undefined,
             };
              if (isWeighted) {
                  const weightInput = prompt(`Enter weight for edge ${addingEdgeFromNode.id} -> ${nodeId}:`, "1");
                  const weight = parseFloat(weightInput || "1");
                  if (!isNaN(weight)) {
                      newEdge.weight = weight;
                  } else {
                       toast.warning("Invalid weight input, using 1.");
                       newEdge.weight = 1;
                  }
              }
             setGraphData(prev => ({ ...prev, edges: [...prev.edges, newEdge] }));
             toast.success(`Edge added: ${addingEdgeFromNode.id} -> ${nodeId}`);
           } else {
             toast.warning("Edge already exists.");
           }
           setAddingEdgeFromNode(null);
        } else {
            setAddingEdgeFromNode(null);
        }
        break;
      case 'delete':
        setGraphData(prev => ({
          nodes: prev.nodes.filter(n => n.id !== nodeId),
          edges: prev.edges.filter(e => e.source !== nodeId && e.target !== nodeId),
        }));
        setSelectedNodeId(id => id === nodeId ? null : id);
        setSelectedEdgeKey(null);
        setStartNode(id => id === nodeId ? null : id);
        setAddingEdgeFromNode(null);
         toast.success(`Node ${nodeId} deleted.`);
        break;
      case 'move':
      case 'add-node':
      default:
        break;
    }
  }, [editMode, addingEdgeFromNode, isDirected, isWeighted, selectedNodeId, graphData.nodes, graphData.edges]);

  const handleNodeDrag = useCallback((nodeId: string, newPos: { x: number; y: number }) => {
     if (editMode !== 'move') return;
     setGraphData(prev => ({
       ...prev,
       nodes: prev.nodes.map(n => n.id === nodeId ? { ...n, x: newPos.x, y: newPos.y } : n),
     }));
  }, [editMode]);

  const handleEdgeClick = useCallback((edge: Edge, event: React.MouseEvent) => {
    const edgeKey = `${edge.source}-${edge.target}`;
    switch (editMode) {
      case 'select':
        setSelectedEdgeKey(edgeKey === selectedEdgeKey ? null : edgeKey);
        setSelectedNodeId(null);
        setAddingEdgeFromNode(null);
        break;
      case 'delete':
        setGraphData(prev => ({
          ...prev,
          edges: prev.edges.filter(e =>
            !(e.source === edge.source && e.target === edge.target) &&
            (isDirected || !(e.source === edge.target && e.target === edge.source))
          ),
        }));
        setSelectedEdgeKey(key => key === edgeKey ? null : key);
        setAddingEdgeFromNode(null);
        toast.success(`Edge ${edge.source} -> ${edge.target} deleted.`);
        break;
      default:
        break;
    }
  }, [editMode, isDirected, selectedEdgeKey]);

  const handleCanvasClick = useCallback((event: React.MouseEvent) => {
    if (editMode === 'add-node') {
        const CTM = canvasRef.current?.getScreenCTM();
        if (CTM) {
            let svgPoint = canvasRef.current?.createSVGPoint();
            if (svgPoint) {
                svgPoint.x = event.clientX;
                svgPoint.y = event.clientY;
                svgPoint = svgPoint.matrixTransform(CTM.inverse());

                const newNodeId = generateId();
                const newNodeLabel = prompt("Enter node label (optional):", `Node ${graphData.nodes.length + 1}`);

                const newNode: Node = {
                    id: newNodeId,
                    label: newNodeLabel || newNodeId,
                    x: Math.round(svgPoint.x),
                    y: Math.round(svgPoint.y),
                };
                setGraphData(prev => ({ ...prev, nodes: [...prev.nodes, newNode] }));
                toast.success(`Node ${newNode.label} added.`);
            }
        }
    } else if (editMode === 'select' || editMode === 'move') {
      setSelectedNodeId(null);
      setSelectedEdgeKey(null);
    }
    if (editMode === 'add-edge' && addingEdgeFromNode) {
         setAddingEdgeFromNode(null);
         toast.info("Add edge cancelled.");
     }

  }, [editMode, graphData.nodes.length, addingEdgeFromNode]);

  const handleCanvasMouseMove = useCallback((event: React.MouseEvent) => {
    if (editMode === 'add-edge' && addingEdgeFromNode && canvasRef.current) {
         const CTM = canvasRef.current.getScreenCTM();
           if (CTM) {
                let svgPoint = canvasRef.current.createSVGPoint();
                svgPoint.x = event.clientX;
                svgPoint.y = event.clientY;
                svgPoint = svgPoint.matrixTransform(CTM.inverse());
                setMousePos({ x: svgPoint.x, y: svgPoint.y });
           }
    }
  }, [editMode, addingEdgeFromNode]);

  useEffect(() => {
    if (isRunning && algorithmState && !algorithmState.isComplete) {
      if (algorithmTimerRef.current) {
        clearTimeout(algorithmTimerRef.current);
      }
      algorithmTimerRef.current = setTimeout(() => {
        runAlgorithmStep();
      }, 1000 / speed);
    } else if (!isRunning || algorithmState?.isComplete) {
      if (algorithmTimerRef.current) {
        clearTimeout(algorithmTimerRef.current);
      }
       if (algorithmState?.isComplete) {
           setIsRunning(false);
           toast.info(`Algorithm ${selectedAlgorithm} finished.`);
       }
    }

    return () => {
      if (algorithmTimerRef.current) {
        clearTimeout(algorithmTimerRef.current);
      }
    };
  }, [isRunning, algorithmState, runAlgorithmStep, speed, selectedAlgorithm]);

  return (
    <div className="flex h-[calc(100vh-var(--header-height))] w-full border-t">
      <ResizablePanelGroup direction="horizontal" className="flex-grow">
         <ResizablePanel defaultSize={20} minSize={15} maxSize={30} className="min-w-[250px]">
          <ControlPanel
            selectedAlgorithm={selectedAlgorithm}
            onAlgorithmChange={handleAlgorithmChange}
            isRunning={isRunning}
            onPlayPause={handlePlayPause}
            onStepForward={handleStepForward}
            onResetAlgorithm={resetAlgorithmExecution}
            onResetGraph={handleResetGraph}
            onLoadPreset={handleLoadPreset}
            isDirected={isDirected}
            onDirectedChange={handleDirectedChange}
            isWeighted={isWeighted}
            onWeightedChange={handleWeightedChange}
            editMode={editMode}
            onEditModeChange={handleEditModeChange}
            startNode={startNode}
            onStartNodeChange={handleStartNodeChange}
            nodes={graphData.nodes}
            speed={speed}
            onSpeedChange={handleSpeedChange}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={55} minSize={30}>
          <GraphCanvas
            ref={canvasRef}
            graphData={graphData}
            isDirected={isDirected}
            isWeighted={isWeighted}
            algorithmState={algorithmState}
            selectedNodeId={selectedNodeId}
            selectedEdgeKey={selectedEdgeKey}
            editMode={editMode}
            addingEdgeFromNode={addingEdgeFromNode}
            currentMousePos={mousePos}
            onNodeClick={handleNodeClick}
            onNodeDrag={handleNodeDrag}
            onEdgeClick={handleEdgeClick}
            onCanvasClick={handleCanvasClick}
            onCanvasMouseMove={handleCanvasMouseMove}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={25} minSize={15} maxSize={35} className="min-w-[300px]">
          <InfoPanel
            selectedAlgorithm={selectedAlgorithm}
            algorithmState={algorithmState}
            selectedNode={selectedNode}
            selectedEdge={selectedEdge}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default GraphExplorer; 