import React, { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import * as d3 from 'd3';

interface SequenceVisualizerProps {
  sequence: number[];
  currentStep: number;
  animationSpeed: number;
  isAnimating: boolean;
}

export function SequenceVisualizer({
  sequence,
  currentStep,
  animationSpeed,
  isAnimating
}: SequenceVisualizerProps) {
  const [viewType, setViewType] = useState<'graph' | 'tree' | 'spiral'>('graph');
  const graphRef = useRef<HTMLDivElement>(null);
  const treeRef = useRef<HTMLDivElement>(null);
  const spiralRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (sequence.length === 0) return;

    switch (viewType) {
      case 'graph':
        renderGraph();
        break;
      case 'tree':
        renderTree();
        break;
      case 'spiral':
        renderSpiral();
        break;
    }
  }, [sequence, currentStep, viewType, theme]);

  const renderGraph = () => {
    if (!graphRef.current) return;

    const width = graphRef.current.clientWidth;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 40, left: 60 };

    // Clear previous content
    d3.select(graphRef.current).selectAll('*').remove();

    // Create SVG
    const svg = d3.select(graphRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // Create scales
    const xScale = d3.scaleLinear()
      .domain([0, sequence.length - 1])
      .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(sequence) || 1])
      .range([height - margin.bottom, margin.top]);

    // Create axes
    const xAxis = d3.axisBottom(xScale)
      .ticks(Math.min(sequence.length, 10));
    const yAxis = d3.axisLeft(yScale);

    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(xAxis)
      .call(g => g.select('.domain').attr('stroke', theme === 'dark' ? '#666' : '#ddd'))
      .call(g => g.selectAll('.tick line').attr('stroke', theme === 'dark' ? '#666' : '#ddd'))
      .call(g => g.selectAll('.tick text').attr('fill', theme === 'dark' ? '#999' : '#666'));

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(yAxis)
      .call(g => g.select('.domain').attr('stroke', theme === 'dark' ? '#666' : '#ddd'))
      .call(g => g.selectAll('.tick line').attr('stroke', theme === 'dark' ? '#666' : '#ddd'))
      .call(g => g.selectAll('.tick text').attr('fill', theme === 'dark' ? '#999' : '#666'));

    // Create line generator
    const line = d3.line<number>()
      .x((_, i) => xScale(i))
      .y(d => yScale(d))
      .curve(d3.curveMonotoneX);

    // Draw line
    svg.append('path')
      .datum(sequence.slice(0, currentStep + 1))
      .attr('fill', 'none')
      .attr('stroke', theme === 'dark' ? '#60a5fa' : '#2563eb')
      .attr('stroke-width', 2)
      .attr('d', line);

    // Add points
    svg.selectAll('circle')
      .data(sequence.slice(0, currentStep + 1))
      .join('circle')
      .attr('cx', (_, i) => xScale(i))
      .attr('cy', d => yScale(d))
      .attr('r', 4)
      .attr('fill', theme === 'dark' ? '#60a5fa' : '#2563eb')
      .attr('stroke', theme === 'dark' ? '#1e40af' : '#1e3a8a')
      .attr('stroke-width', 2);
  };

  const renderTree = () => {
    if (!treeRef.current) return;

    const width = treeRef.current.clientWidth;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };

    // Clear previous content
    d3.select(treeRef.current).selectAll('*').remove();

    // Create SVG
    const svg = d3.select(treeRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // Create tree data structure
    const treeData = {
      name: sequence[0].toString(),
      children: sequence.slice(1).map((n, i) => ({
        name: n.toString(),
        parent: sequence[i].toString(),
        value: n
      }))
    };

    // Create tree layout
    const treeLayout = d3.tree()
      .size([height - margin.top - margin.bottom, width - margin.left - margin.right]);

    const root = d3.hierarchy(treeData);
    const tree = treeLayout(root);

    // Draw links
    svg.selectAll('path')
      .data(tree.links())
      .join('path')
      .attr('d', d3.linkHorizontal()
        .x(d => d.y)
        .y(d => d.x))
      .attr('fill', 'none')
      .attr('stroke', theme === 'dark' ? '#666' : '#ddd')
      .attr('stroke-width', 1);

    // Draw nodes
    const nodes = svg.selectAll('g')
      .data(tree.descendants())
      .join('g')
      .attr('transform', d => `translate(${d.y},${d.x})`);

    nodes.append('circle')
      .attr('r', 4)
      .attr('fill', theme === 'dark' ? '#60a5fa' : '#2563eb')
      .attr('stroke', theme === 'dark' ? '#1e40af' : '#1e3a8a')
      .attr('stroke-width', 2);

    nodes.append('text')
      .attr('dy', '0.31em')
      .attr('x', d => d.children ? -8 : 8)
      .attr('text-anchor', d => d.children ? 'end' : 'start')
      .text(d => d.data.name)
      .attr('fill', theme === 'dark' ? '#999' : '#666')
      .attr('font-size', '12px');
  };

  const renderSpiral = () => {
    if (!spiralRef.current) return;

    const width = spiralRef.current.clientWidth;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };

    // Clear previous content
    d3.select(spiralRef.current).selectAll('*').remove();

    // Create SVG
    const svg = d3.select(spiralRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // Create spiral layout
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.min(width, height) / 2 - margin.top;

    // Draw spiral
    const spiral = d3.line<number>()
      .x((d, i) => {
        const angle = i * 0.5;
        const radius = (d / Math.max(...sequence)) * maxRadius;
        return centerX + radius * Math.cos(angle);
      })
      .y((d, i) => {
        const angle = i * 0.5;
        const radius = (d / Math.max(...sequence)) * maxRadius;
        return centerY + radius * Math.sin(angle);
      })
      .curve(d3.curveCardinal);

    svg.append('path')
      .datum(sequence.slice(0, currentStep + 1))
      .attr('fill', 'none')
      .attr('stroke', theme === 'dark' ? '#60a5fa' : '#2563eb')
      .attr('stroke-width', 2)
      .attr('d', spiral);

    // Add points
    svg.selectAll('circle')
      .data(sequence.slice(0, currentStep + 1))
      .join('circle')
      .attr('cx', (d, i) => {
        const angle = i * 0.5;
        const radius = (d / Math.max(...sequence)) * maxRadius;
        return centerX + radius * Math.cos(angle);
      })
      .attr('cy', (d, i) => {
        const angle = i * 0.5;
        const radius = (d / Math.max(...sequence)) * maxRadius;
        return centerY + radius * Math.sin(angle);
      })
      .attr('r', 4)
      .attr('fill', theme === 'dark' ? '#60a5fa' : '#2563eb')
      .attr('stroke', theme === 'dark' ? '#1e40af' : '#1e3a8a')
      .attr('stroke-width', 2);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Visualization</h3>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewType('graph')}
            className={viewType === 'graph' ? 'bg-primary/20' : ''}
          >
            Graph
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewType('tree')}
            className={viewType === 'tree' ? 'bg-primary/20' : ''}
          >
            Tree
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewType('spiral')}
            className={viewType === 'spiral' ? 'bg-primary/20' : ''}
          >
            Spiral
          </Button>
        </div>
      </div>

      <div className="aspect-video bg-muted rounded-md overflow-hidden">
        <div ref={graphRef} className={viewType === 'graph' ? 'w-full h-full' : 'hidden'} />
        <div ref={treeRef} className={viewType === 'tree' ? 'w-full h-full' : 'hidden'} />
        <div ref={spiralRef} className={viewType === 'spiral' ? 'w-full h-full' : 'hidden'} />
      </div>
    </div>
  );
} 