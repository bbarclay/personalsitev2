import React, { useCallback, useState } from 'react';
import { ReactFlow, ReactFlowProvider, useNodesState, useEdgesState, addEdge, MiniMap, Controls, Handle, Position, Node, Panel, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/base.css';
import { Sun, Moon, User } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { AnimatedSvgEdge } from '@components/ui/animated-svg-edge';

import { AnnotationNode } from '@components/ui/annotation-node';
import { useAnnotations } from './hooks/use-annotations';
import { FamilyNode } from './node_templates/FamilyNode';
import { ImageNode } from './node_templates/ImageNode';
import { IconCardNode } from './node_templates/IconCardNode';

// Import separate files instead of combined flowData
import nodesData from './flows/nodesData.json';
import edgesData from './flows/edgesData.json';

interface SimpleNodeData {
  theme?: 'dark' | 'light';
  customClasses?: string;
  label: string;
}

// Simple Node Component
const SimpleNode = ({ data }: { data: SimpleNodeData }) => {
  const theme = data.theme || 'dark';
  const customClasses = data.customClasses || '';

  return (
    <div className={`p-4 rounded-lg shadow-md ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200'} ${customClasses}`}>
      <div className="font-medium">{data.label}</div>
      <Handle type="target" position={Position.Top} className="!bg-blue-500" />
      <Handle type="source" position={Position.Bottom} className="!bg-blue-500" />
    </div>
  );
};

// Simplified node types - we only need simple nodes for MoE
const nodeTypes = {
  simple: SimpleNode,
  family: FamilyNode,
  iconCard: IconCardNode,  // Add this line
};

// Add edge types definition
const edgeTypes = {
  animatedSvg: AnimatedSvgEdge,
};

// Initialize with separate data files
const initNodes = nodesData.nodes;
const initEdges = edgesData.edges;

interface NodeData {
  theme?: 'dark' | 'light';
  label?: string;
  customClasses?: string;
  familyName?: string;
  [key: string]: any;
}

type FlowNode = Node<NodeData>;

const FlowContent = () => {
  const [isDark, setIsDark] = useState(true);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node<NodeData>>(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);
  const { addAnnotation, removeAnnotations } = useAnnotations();
  const { getViewport } = useReactFlow();
  const [viewport, setViewport] = useState({ x: 0, y: 0, zoom: 1 });

  const onConnect = useCallback(
    (params: any) => {
      // Get all available Lucide icon names
      const lucideIconNames = Object.keys(LucideIcons).filter(key => key !== 'createLucideIcon');

      const newEdge = {
        ...params,
        type: 'animatedSvg',
        data: {
          duration: 2 + Math.random() * 2,
          direction: ['forward', 'reverse', 'alternate', 'alternate-reverse'][Math.floor(Math.random() * 4)],
          path: ['bezier', 'smoothstep', 'step', 'straight'][Math.floor(Math.random() * 4)],
          repeat: 'indefinite',
          // Pick a random Lucide icon name
          shape: lucideIconNames[Math.floor(Math.random() * lucideIconNames.length)],
          iconProps: {
            size: 20,
            color: '#ff0073',
            strokeWidth: 2
          }
        }
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    []
  );

  const toggleTheme = useCallback(() => {
    setIsDark(!isDark);
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: {
          ...node.data,
          theme: !isDark ? 'dark' : 'light',
        },
      }))
    );
  }, [isDark, setNodes]);

  const downloadFlowConfig = useCallback(() => {
    // Save nodes
    const nodesConfig = {
      nodes: nodes.map(node => ({
        ...node,
        data: {
          ...node.data,
          theme: undefined // Remove theme since it's dynamic
        }
      }))
    };
    const nodesJsonString = JSON.stringify(nodesConfig, null, 2);
    const nodesBlob = new Blob([nodesJsonString], { type: 'application/json' });
    const nodesUrl = URL.createObjectURL(nodesBlob);
    const nodesLink = document.createElement('a');
    nodesLink.href = nodesUrl;
    nodesLink.download = 'nodes-config.json';
    document.body.appendChild(nodesLink);
    nodesLink.click();
    document.body.removeChild(nodesLink);
    URL.revokeObjectURL(nodesUrl);

    // Save edges
    const edgesConfig = { edges };
    const edgesJsonString = JSON.stringify(edgesConfig, null, 2);
    const edgesBlob = new Blob([edgesJsonString], { type: 'application/json' });
    const edgesUrl = URL.createObjectURL(edgesBlob);
    const edgesLink = document.createElement('a');
    edgesLink.href = edgesUrl;
    edgesLink.download = 'edges-config.json';
    document.body.appendChild(edgesLink);
    edgesLink.click();
    document.body.removeChild(edgesLink);
    URL.revokeObjectURL(edgesUrl);
  }, [nodes, edges]);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    // Add an annotation when Alt key is pressed during click
    if (event.altKey) {
      addAnnotation(node.id, {
        label: `Annotation for ${node.data.label || node.data.familyName || 'Node'}`,
        level: (Math.floor(Math.random() * 4) + 1) as 1 | 2 | 3 | 4,
        offsetX: -150,
        offsetY: -50,
      });
    }
  }, [addAnnotation]);

  const onNodeDoubleClick = useCallback((event: React.MouseEvent, node: Node) => {
    // Remove all annotations when Alt key is pressed during double-click
    if (event.altKey) {
      removeAnnotations(node.id);
    }
  }, [removeAnnotations]);

  return (
    <div className="w-full h-[800px]">
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-200 dark:bg-gray-700"
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
      <div className="absolute top-4 left-4 z-10 text-sm text-gray-600 dark:text-gray-400">
        <p>Alt + Click: Add annotation</p>
        <p>Alt + Double-click: Remove annotations</p>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onNodeDoubleClick={onNodeDoubleClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultViewport={viewport}
        onMove={(_, viewport) => setViewport(viewport)}
        minZoom={0.1}
        maxZoom={2}
        className={isDark ? 'bg-gray-900' : 'bg-blue-50'}
        fitView
        fitViewOptions={{
          padding: 0.2,
          minZoom: 0.5,
          maxZoom: 1.5
        }}
      >
        <Controls
          className={isDark ? 'text-white bg-gray-800 border-gray-700 [&>button]:border-gray-700 [&>button]:bg-gray-800 hover:[&>button]:bg-gray-700' : ''}
          showInteractive={true}
          position="bottom-right"
        />
        <MiniMap
          className={isDark ? '!bg-gray-800' : ''}
          zoomable
          pannable
          position="top-right"
          style={{
            height: 120,
            width: 200,
            backgroundColor: isDark ? '#1f2937' : '#f3f4f6',
            borderRadius: '0.5rem',
          }}
          maskColor={isDark ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.4)'}
        />
        <Panel position="top-center" className="bg-transparent">
          <button
            onClick={downloadFlowConfig}
            className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium shadow-lg"
          >
            💾 Save Layout
          </button>
        </Panel>
        <Panel position="bottom-left" className="bg-transparent">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            x: {viewport.x.toFixed(2)},
            y: {viewport.y.toFixed(2)},
            zoom: {viewport.zoom.toFixed(2)}
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
};

const Flow = () => {
  return (
    <ReactFlowProvider>
      <FlowContent />
    </ReactFlowProvider>
  );
};

export default Flow;
