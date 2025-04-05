"use client";

import React from 'react';
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Slider 
} from "@/components/ui/slider";
import {
  Switch
} from "@/components/ui/switch";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Edit3,
  Trash2,
  Plus,
  Minus,
  Play,
  Pause,
  SkipBack,
  StepForward,
  RotateCw,
  PlusCircle,
  MinusCircle,
  Link,
  ArrowUpCircle,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { GraphData, Algorithm } from './types';
import { algorithms } from './algorithms';
import { generateRandomGraph } from './utils';

interface ControlPanelProps {
  graphData: GraphData;
  setGraphData: (data: GraphData) => void;
  directed: boolean;
  setDirected: (directed: boolean) => void;
  weighted: boolean;
  setWeighted: (weighted: boolean) => void;
  editMode: 'select' | 'addNode' | 'addEdge' | 'deleteNode' | 'deleteEdge';
  setEditMode: (mode: 'select' | 'addNode' | 'addEdge' | 'deleteNode' | 'deleteEdge') => void;
  selectedNodeId: string | null;
  setSelectedNodeId: (id: string | null) => void;
  selectedEdgeKey: string | null;
  setSelectedEdgeKey: (key: string | null) => void;
  isAlgorithmRunning: boolean;
  setIsAlgorithmRunning: (running: boolean) => void;
  currentAlgorithm: Algorithm | null;
  setCurrentAlgorithm: (algorithm: Algorithm | null) => void;
  algorithmSpeed: number;
  setAlgorithmSpeed: (speed: number) => void;
  onRunAlgorithm: () => void;
  onStepAlgorithm: () => void;
  onResetAlgorithm: () => void;
  handleClearGraph: () => void;
  handleGenerateRandomGraph: (nodeCount: number, edgeProbability: number) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  graphData,
  setGraphData,
  directed,
  setDirected,
  weighted,
  setWeighted,
  editMode,
  setEditMode,
  selectedNodeId,
  setSelectedNodeId,
  selectedEdgeKey,
  setSelectedEdgeKey,
  isAlgorithmRunning,
  setIsAlgorithmRunning,
  currentAlgorithm,
  setCurrentAlgorithm,
  algorithmSpeed,
  setAlgorithmSpeed,
  onRunAlgorithm,
  onStepAlgorithm,
  onResetAlgorithm,
  handleClearGraph,
  handleGenerateRandomGraph
}) => {
  const [nodeCount, setNodeCount] = React.useState(5);
  const [edgeProbability, setEdgeProbability] = React.useState(0.5);

  const algorithmCategories: { [key: string]: Algorithm[] } = React.useMemo(() => {
    const categories: { [key: string]: Algorithm[] } = {};
    algorithms.forEach(algo => {
      if (!categories[algo.category]) {
        categories[algo.category] = [];
      }
      categories[algo.category].push(algo);
    });
    return categories;
  }, []);

  return (
    <Card className="w-full h-full overflow-auto">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Graph Controls</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <Tabs defaultValue="edit">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="run">Algorithms</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Edit Tab */}
          <TabsContent value="edit" className="space-y-4 mt-1">
            <div className="flex items-center justify-between">
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  size="sm" 
                  variant={editMode === 'addNode' ? "default" : "outline"}
                  onClick={() => setEditMode('addNode')}
                  className="flex items-center gap-1"
                >
                  <PlusCircle size={16} />
                  Add Node
                </Button>
                <Button 
                  size="sm" 
                  variant={editMode === 'addEdge' ? "default" : "outline"}
                  onClick={() => setEditMode('addEdge')}
                  className="flex items-center gap-1"
                >
                  <Link size={16} />
                  Add Edge
                </Button>
                <Button 
                  size="sm" 
                  variant={editMode === 'deleteNode' ? "default" : "outline"} 
                  onClick={() => setEditMode('deleteNode')}
                  className="flex items-center gap-1"
                >
                  <MinusCircle size={16} />
                  Delete Node
                </Button>
                <Button 
                  size="sm" 
                  variant={editMode === 'deleteEdge' ? "default" : "outline"}
                  onClick={() => setEditMode('deleteEdge')}
                  className="flex items-center gap-1"
                >
                  <Minus size={16} />
                  Delete Edge
                </Button>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="text-sm font-medium">Graph Generation</h3>
              <div className="grid grid-cols-2 gap-2 items-center">
                <div className="space-y-1">
                  <Label htmlFor="node-count" className="text-xs">Node Count</Label>
                  <div className="flex items-center space-x-2">
                    <Button 
                      size="icon" 
                      variant="outline" 
                      className="h-7 w-7"
                      onClick={() => setNodeCount(Math.max(2, nodeCount - 1))}
                    >
                      <Minus size={12} />
                    </Button>
                    <Input 
                      id="node-count"
                      type="number" 
                      min={2} 
                      max={20}
                      value={nodeCount} 
                      onChange={(e) => setNodeCount(parseInt(e.target.value) || 2)}
                      className="h-7 w-12 text-center"
                    />
                    <Button 
                      size="icon" 
                      variant="outline" 
                      className="h-7 w-7"
                      onClick={() => setNodeCount(Math.min(20, nodeCount + 1))}
                    >
                      <Plus size={12} />
                    </Button>
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="edge-probability" className="text-xs">Edge Probability</Label>
                  <div className="flex items-center">
                    <Slider
                      id="edge-probability"
                      value={[edgeProbability * 100]}
                      min={0}
                      max={100}
                      step={5}
                      onValueChange={(value) => setEdgeProbability(value[0] / 100)}
                      className="flex-1 mr-2"
                    />
                    <span className="text-xs w-8 text-right">{Math.round(edgeProbability * 100)}%</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={handleClearGraph}
                  className="flex items-center gap-1"
                >
                  <Trash2 size={14} />
                  Clear Graph
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => handleGenerateRandomGraph(nodeCount, edgeProbability)}
                  className="flex items-center gap-1"
                >
                  <RotateCw size={14} />
                  Generate
                </Button>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Selection Info</h3>
              <div className="text-xs space-y-1">
                {selectedNodeId ? (
                  <p>Selected node: {selectedNodeId}</p>
                ) : (
                  <p>No node selected</p>
                )}
                {selectedEdgeKey ? (
                  <p>Selected edge: {selectedEdgeKey}</p>
                ) : (
                  <p>No edge selected</p>
                )}
              </div>
            </div>

            <Separator />
            
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">
                Click in empty space to add nodes, drag between nodes to create edges,
                click on nodes/edges to select them.
              </p>
            </div>
          </TabsContent>

          {/* Algorithms Tab */}
          <TabsContent value="run" className="space-y-4 mt-1">
            <Select 
              onValueChange={(value) => {
                const algo = algorithms.find(a => a.id === value);
                if (algo) setCurrentAlgorithm(algo);
              }}
              value={currentAlgorithm?.id || ""}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an algorithm" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(algorithmCategories).map(([category, algos]) => (
                  <React.Fragment key={category}>
                    <div className="text-xs text-muted-foreground pl-2 py-1 uppercase">
                      {category.replace('-', ' ')}
                    </div>
                    {algos.map((algo) => (
                      <SelectItem key={algo.id} value={algo.id}>
                        {algo.name}
                      </SelectItem>
                    ))}
                    <Separator className="my-1" />
                  </React.Fragment>
                ))}
              </SelectContent>
            </Select>

            {currentAlgorithm && (
              <div className="space-y-4">
                <p className="text-sm">{currentAlgorithm.description}</p>
                
                <div className="space-y-2">
                  <Label htmlFor="algorithm-speed" className="text-xs">Animation Speed</Label>
                  <div className="flex items-center space-x-2">
                    <Slider
                      id="algorithm-speed"
                      value={[algorithmSpeed]}
                      min={0.25}
                      max={2}
                      step={0.25}
                      onValueChange={(value) => setAlgorithmSpeed(value[0])}
                      className="flex-1"
                    />
                    <span className="text-xs w-10 text-right">{algorithmSpeed}x</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={onResetAlgorithm}
                    className="flex items-center gap-1"
                  >
                    <SkipBack size={14} />
                    Reset
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={onStepAlgorithm}
                    className="flex items-center gap-1"
                    disabled={isAlgorithmRunning}
                  >
                    <StepForward size={14} />
                    Step
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => {
                      if (isAlgorithmRunning) {
                        setIsAlgorithmRunning(false);
                      } else {
                        onRunAlgorithm();
                      }
                    }}
                    className="flex items-center gap-1"
                  >
                    {isAlgorithmRunning ? (
                      <>
                        <Pause size={14} />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play size={14} />
                        Run
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {!currentAlgorithm && (
              <div className="text-center py-8 text-muted-foreground text-sm">
                Select an algorithm to visualize
              </div>
            )}
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4 mt-1">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="directed-switch" className="cursor-pointer">Directed Graph</Label>
                <Switch 
                  id="directed-switch"
                  checked={directed}
                  onCheckedChange={setDirected}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="weighted-switch" className="cursor-pointer">Weighted Graph</Label>
                <Switch 
                  id="weighted-switch"
                  checked={weighted}
                  onCheckedChange={setWeighted}
                />
              </div>
            </div>

            <Separator />

            <Accordion type="single" collapsible>
              <AccordionItem value="preset-graphs">
                <AccordionTrigger className="text-sm py-2">Preset Graphs</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => {
                        // Simple circular graph
                        const nodes = Array(6).fill(0).map((_, i) => ({
                          id: `n${i+1}`,
                          label: `${i+1}`,
                          x: 150 + 100 * Math.cos(2 * Math.PI * i / 6),
                          y: 150 + 100 * Math.sin(2 * Math.PI * i / 6),
                        }));
                        
                        const edges = [
                          { source: 'n1', target: 'n2', weight: 2 },
                          { source: 'n2', target: 'n3', weight: 3 },
                          { source: 'n3', target: 'n4', weight: 1 },
                          { source: 'n4', target: 'n5', weight: 4 },
                          { source: 'n5', target: 'n6', weight: 2 },
                          { source: 'n6', target: 'n1', weight: 5 },
                        ];
                        
                        setGraphData({ nodes, edges, directed: directed, weighted: weighted });
                      }}
                    >
                      Circle
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => {
                        // Complete graph K5
                        const nodes = Array(5).fill(0).map((_, i) => ({
                          id: `n${i+1}`,
                          label: `${i+1}`,
                          x: 150 + 100 * Math.cos(2 * Math.PI * i / 5),
                          y: 150 + 100 * Math.sin(2 * Math.PI * i / 5),
                        }));
                        
                        const edges = [];
                        for (let i = 0; i < 5; i++) {
                          for (let j = i + 1; j < 5; j++) {
                            edges.push({ 
                              source: `n${i+1}`, 
                              target: `n${j+1}`, 
                              weight: Math.floor(Math.random() * 9) + 1 
                            });
                          }
                        }
                        
                        setGraphData({ nodes, edges, directed: directed, weighted: weighted });
                      }}
                    >
                      Complete
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => {
                        // Star graph
                        const nodes = Array(6).fill(0).map((_, i) => {
                          if (i === 0) {
                            return { id: 'center', label: 'C', x: 150, y: 150 };
                          } else {
                            return {
                              id: `n${i}`,
                              label: `${i}`,
                              x: 150 + 120 * Math.cos(2 * Math.PI * (i-1) / 5),
                              y: 150 + 120 * Math.sin(2 * Math.PI * (i-1) / 5),
                            };
                          }
                        });
                        
                        const edges = Array(5).fill(0).map((_, i) => ({
                          source: 'center',
                          target: `n${i+1}`,
                          weight: i + 1
                        }));
                        
                        setGraphData({ nodes, edges, directed: directed, weighted: weighted });
                      }}
                    >
                      Star
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => {
                        // Binary tree
                        const nodes = [
                          { id: 'n1', label: '1', x: 150, y: 50 },
                          { id: 'n2', label: '2', x: 75, y: 120 },
                          { id: 'n3', label: '3', x: 225, y: 120 },
                          { id: 'n4', label: '4', x: 40, y: 200 },
                          { id: 'n5', label: '5', x: 110, y: 200 },
                          { id: 'n6', label: '6', x: 190, y: 200 },
                          { id: 'n7', label: '7', x: 260, y: 200 },
                        ];
                        
                        const edges = [
                          { source: 'n1', target: 'n2', weight: 2 },
                          { source: 'n1', target: 'n3', weight: 3 },
                          { source: 'n2', target: 'n4', weight: 1 },
                          { source: 'n2', target: 'n5', weight: 4 },
                          { source: 'n3', target: 'n6', weight: 2 },
                          { source: 'n3', target: 'n7', weight: 5 },
                        ];
                        
                        setGraphData({ nodes, edges, directed: directed, weighted: weighted });
                      }}
                    >
                      Tree
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        // Directed acyclic graph for topological sort
                        const nodes = [
                          { id: 'A', label: 'A', x: 50, y: 50 },
                          { id: 'B', label: 'B', x: 150, y: 50 },
                          { id: 'C', label: 'C', x: 250, y: 50 },
                          { id: 'D', label: 'D', x: 50, y: 150 },
                          { id: 'E', label: 'E', x: 150, y: 150 },
                          { id: 'F', label: 'F', x: 250, y: 150 },
                          { id: 'G', label: 'G', x: 150, y: 250 },
                        ];
                        
                        const edges = [
                          { source: 'A', target: 'D', weight: 1 },
                          { source: 'B', target: 'D', weight: 2 },
                          { source: 'B', target: 'E', weight: 3 },
                          { source: 'C', target: 'F', weight: 4 },
                          { source: 'D', target: 'G', weight: 5 },
                          { source: 'E', target: 'G', weight: 6 },
                          { source: 'F', target: 'G', weight: 7 },
                        ];
                        
                        setGraphData({ nodes, edges, directed: true, weighted: weighted });
                        setDirected(true); // Force directed for this graph
                      }}
                    >
                      DAG
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        // Weighted graph for Dijkstra's algorithm
                        const nodes = [
                          { id: 'A', label: 'A', x: 75, y: 50 },
                          { id: 'B', label: 'B', x: 200, y: 50 },
                          { id: 'C', label: 'C', x: 325, y: 50 },
                          { id: 'D', label: 'D', x: 75, y: 150 },
                          { id: 'E', label: 'E', x: 200, y: 150 },
                          { id: 'F', label: 'F', x: 325, y: 150 },
                          { id: 'G', label: 'G', x: 75, y: 250 },
                          { id: 'H', label: 'H', x: 200, y: 250 },
                          { id: 'I', label: 'I', x: 325, y: 250 },
                        ];
                        
                        const edges = [
                          { source: 'A', target: 'B', weight: 4 },
                          { source: 'A', target: 'D', weight: 8 },
                          { source: 'B', target: 'C', weight: 3 },
                          { source: 'B', target: 'E', weight: 5 },
                          { source: 'C', target: 'F', weight: 7 },
                          { source: 'D', target: 'E', weight: 2 },
                          { source: 'D', target: 'G', weight: 3 },
                          { source: 'E', target: 'F', weight: 6 },
                          { source: 'E', target: 'H', weight: 9 },
                          { source: 'F', target: 'I', weight: 2 },
                          { source: 'G', target: 'H', weight: 4 },
                          { source: 'H', target: 'I', weight: 1 },
                        ];
                        
                        setGraphData({ nodes, edges, directed: false, weighted: true });
                        setWeighted(true); // Force weighted for this graph
                      }}
                    >
                      Weighted
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ControlPanel; 