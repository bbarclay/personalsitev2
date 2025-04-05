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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { GraphData, Algorithm, AlgorithmState } from './types';
import { ScrollArea } from "@/components/ui/scroll-area";

interface InfoPanelProps {
  graphData: GraphData;
  selectedNodeId: string | null;
  selectedEdgeKey: string | null;
  currentAlgorithm: Algorithm | null;
  algorithmState: AlgorithmState | null;
}

const InfoPanel: React.FC<InfoPanelProps> = ({
  graphData,
  selectedNodeId,
  selectedEdgeKey,
  currentAlgorithm,
  algorithmState
}) => {
  // Function to find an edge from the key (format: "sourceId->targetId")
  const getEdgeFromKey = (key: string) => {
    if (!key) return null;
    const [source, target] = key.split('->');
    return graphData.edges.find(edge => edge.source === source && edge.target === target);
  };

  // Get the selected node and edge
  const selectedNode = selectedNodeId 
    ? graphData.nodes.find(node => node.id === selectedNodeId) 
    : null;
  
  const selectedEdge = selectedEdgeKey 
    ? getEdgeFromKey(selectedEdgeKey)
    : null;

  // Calculate graph statistics
  const nodeCount = graphData.nodes.length;
  const edgeCount = graphData.edges.length;
  
  // Calculate node degrees
  const nodeDegrees = graphData.nodes.reduce((acc, node) => {
    const outDegree = graphData.edges.filter(edge => edge.source === node.id).length;
    const inDegree = graphData.edges.filter(edge => edge.target === node.id).length;
    
    acc[node.id] = {
      outDegree,
      inDegree,
      totalDegree: outDegree + (graphData.directed ? 0 : inDegree) // for undirected graphs, don't double count
    };
    
    return acc;
  }, {} as Record<string, { outDegree: number; inDegree: number; totalDegree: number }>);

  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Information</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="graph" className="h-full flex flex-col">
          <TabsList className="mx-4 mb-0 justify-start">
            <TabsTrigger value="graph">Graph</TabsTrigger>
            <TabsTrigger value="selection">Selection</TabsTrigger>
            <TabsTrigger value="algorithm">Algorithm</TabsTrigger>
          </TabsList>
          
          {/* Graph Info Tab */}
          <TabsContent value="graph" className="flex-grow overflow-auto px-4 pb-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Graph Properties</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <div className="text-muted-foreground">Type:</div>
                  <div>{graphData.directed ? 'Directed' : 'Undirected'}{graphData.weighted ? ', Weighted' : ''}</div>
                  
                  <div className="text-muted-foreground">Nodes:</div>
                  <div>{nodeCount}</div>
                  
                  <div className="text-muted-foreground">Edges:</div>
                  <div>{edgeCount}</div>
                  
                  <div className="text-muted-foreground">Density:</div>
                  <div>
                    {nodeCount <= 1 ? '0' : (edgeCount / (nodeCount * (nodeCount - 1) * (graphData.directed ? 1 : 0.5))).toFixed(3)}
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium mb-2">Node Degrees</h3>
                <ScrollArea className="h-[200px]">
                  <div className="grid grid-cols-4 gap-2 text-sm">
                    <div className="font-medium">Node</div>
                    <div className="font-medium">{graphData.directed ? 'Out' : 'Degree'}</div>
                    {graphData.directed && <div className="font-medium">In</div>}
                    {graphData.directed && <div className="font-medium">Total</div>}
                    
                    {graphData.nodes.map(node => (
                      <React.Fragment key={node.id}>
                        <div>{node.label || node.id}</div>
                        <div>{nodeDegrees[node.id]?.outDegree || 0}</div>
                        {graphData.directed && <div>{nodeDegrees[node.id]?.inDegree || 0}</div>}
                        {graphData.directed && <div>{nodeDegrees[node.id]?.totalDegree || 0}</div>}
                      </React.Fragment>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </TabsContent>
          
          {/* Selection Info Tab */}
          <TabsContent value="selection" className="flex-grow overflow-auto px-4 pb-4">
            {selectedNode ? (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Selected Node</h3>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <div className="text-muted-foreground">ID:</div>
                    <div>{selectedNode.id}</div>
                    
                    <div className="text-muted-foreground">Label:</div>
                    <div>{selectedNode.label || selectedNode.id}</div>
                    
                    <div className="text-muted-foreground">Position:</div>
                    <div>x: {Math.round(selectedNode.x)}, y: {Math.round(selectedNode.y)}</div>
                    
                    <div className="text-muted-foreground">Degree:</div>
                    <div className="flex gap-2">
                      {graphData.directed ? (
                        <>
                          <Badge variant="outline">In: {nodeDegrees[selectedNode.id]?.inDegree || 0}</Badge>
                          <Badge variant="outline">Out: {nodeDegrees[selectedNode.id]?.outDegree || 0}</Badge>
                        </>
                      ) : (
                        <Badge variant="outline">{nodeDegrees[selectedNode.id]?.totalDegree || 0}</Badge>
                      )}
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Connected Edges</h3>
                  <ScrollArea className="h-[120px]">
                    <div className="space-y-2">
                      {graphData.edges
                        .filter(edge => edge.source === selectedNode.id || edge.target === selectedNode.id)
                        .map((edge, idx) => (
                          <div key={idx} className="text-sm p-2 border rounded-md">
                            {edge.source === selectedNode.id ? 'To' : 'From'}: {edge.source === selectedNode.id ? edge.target : edge.source}
                            {graphData.weighted && edge.weight !== undefined && (
                              <div className="text-xs text-muted-foreground">Weight: {edge.weight}</div>
                            )}
                          </div>
                        ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            ) : selectedEdge ? (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Selected Edge</h3>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <div className="text-muted-foreground">From:</div>
                    <div>{selectedEdge.source}</div>
                    
                    <div className="text-muted-foreground">To:</div>
                    <div>{selectedEdge.target}</div>
                    
                    {graphData.weighted && selectedEdge.weight !== undefined && (
                      <>
                        <div className="text-muted-foreground">Weight:</div>
                        <div>{selectedEdge.weight}</div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 text-muted-foreground">
                Select a node or edge to view its details
              </div>
            )}
          </TabsContent>
          
          {/* Algorithm Info Tab */}
          <TabsContent value="algorithm" className="flex-grow overflow-auto px-4 pb-4">
            {currentAlgorithm && algorithmState ? (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Algorithm: {currentAlgorithm.name}</h3>
                  <p className="text-sm text-muted-foreground">{currentAlgorithm.description}</p>
                </div>
                
                <Separator />
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium">Step Log</h3>
                    <Badge variant="outline">Step {algorithmState.currentStep}</Badge>
                  </div>
                  <ScrollArea className="h-[200px] border rounded-md p-2">
                    <div className="space-y-2 text-sm">
                      {algorithmState.messages.length > 0 ? (
                        algorithmState.messages.map((message, idx) => (
                          <div key={idx} className={`p-2 rounded-md ${idx === algorithmState.messages.length - 1 ? 'bg-muted' : ''}`}>
                            {message}
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-4 text-muted-foreground">
                          No steps recorded yet
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </div>
                
                {algorithmState.result && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="text-sm font-medium mb-2">Result</h3>
                      <div className="p-3 border rounded-md text-sm space-y-1">
                        {algorithmState.result.path && (
                          <div>
                            <span className="text-muted-foreground mr-2">Path:</span>
                            {algorithmState.result.path.join(' → ')}
                          </div>
                        )}
                        {algorithmState.result.distance !== undefined && (
                          <div>
                            <span className="text-muted-foreground mr-2">Distance:</span>
                            {algorithmState.result.distance}
                          </div>
                        )}
                        {algorithmState.result.mstWeight !== undefined && (
                          <div>
                            <span className="text-muted-foreground mr-2">MST Weight:</span>
                            {algorithmState.result.mstWeight}
                          </div>
                        )}
                        {algorithmState.result.order && (
                          <div>
                            <span className="text-muted-foreground mr-2">Order:</span>
                            {algorithmState.result.order.join(' → ')}
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="text-center py-10 text-muted-foreground">
                {currentAlgorithm 
                  ? "Run the algorithm to see details"
                  : "Select and run an algorithm to view details"
                }
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default InfoPanel; 