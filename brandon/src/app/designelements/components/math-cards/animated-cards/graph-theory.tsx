"use client";

import React, { useEffect, useRef } from 'react';

export const GraphTheory = () => {
  const graphRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    if (!graphRef.current) return;
    
    const nodes = graphRef.current.querySelectorAll('.graph-node');
    const edges = graphRef.current.querySelectorAll('.graph-edge');
    
    const animateGraph = () => {
      const time = Date.now() / 1000;
      
      // Animate nodes with subtle floating motion
      nodes.forEach((node, i) => {
        const baseX = parseFloat(node.getAttribute('data-x') || '0');
        const baseY = parseFloat(node.getAttribute('data-y') || '0');
        
        const offsetX = Math.sin(time * 0.5 + i * 0.7) * 8;
        const offsetY = Math.cos(time * 0.4 + i * 0.5) * 8;
        
        node.setAttribute('cx', (baseX + offsetX).toString());
        node.setAttribute('cy', (baseY + offsetY).toString());
      });
      
      // Update edges to follow nodes
      edges.forEach((edge) => {
        const startNode = graphRef.current?.querySelector(
          `#${edge.getAttribute('data-start')}`
        );
        const endNode = graphRef.current?.querySelector(
          `#${edge.getAttribute('data-end')}`
        );
        
        if (startNode && endNode) {
          const x1 = parseFloat(startNode.getAttribute('cx') || '0');
          const y1 = parseFloat(startNode.getAttribute('cy') || '0');
          const x2 = parseFloat(endNode.getAttribute('cx') || '0');
          const y2 = parseFloat(endNode.getAttribute('cy') || '0');
          
          edge.setAttribute('x1', x1.toString());
          edge.setAttribute('y1', y1.toString());
          edge.setAttribute('x2', x2.toString());
          edge.setAttribute('y2', y2.toString());
        }
      });
      
      requestAnimationFrame(animateGraph);
    };
    
    // Store initial node positions
    nodes.forEach((node) => {
      node.setAttribute('data-x', node.getAttribute('cx') || '0');
      node.setAttribute('data-y', node.getAttribute('cy') || '0');
    });
    
    const animationId = requestAnimationFrame(animateGraph);
    return () => cancelAnimationFrame(animationId);
  }, []);
  
  return (
    <div className="relative w-full h-full">
      {/* Glass card container */}
      <div className="relative w-full h-full bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-800/90 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(66,153,225,0.2)]">
        {/* Animated background gradients */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-[10px] opacity-50">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-violet-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>
        </div>
        
        {/* Content container */}
        <div className="relative h-full p-8 flex flex-col justify-between">
          {/* Graph visualization */}
          <div className="absolute inset-0 opacity-40">
            <svg ref={graphRef} viewBox="0 0 800 600" className="w-full h-full">
              <defs>
                <filter id="glow-graph">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                
                <linearGradient id="edge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.6">
                    <animate attributeName="stopOpacity" values="0.6;0.3;0.6" dur="3s" repeatCount="indefinite" />
                  </stop>
                  <stop offset="100%" stopColor="#818cf8" stopOpacity="0.6">
                    <animate attributeName="stopOpacity" values="0.6;0.3;0.6" dur="3s" repeatCount="indefinite" />
                  </stop>
                </linearGradient>
              </defs>
              
              {/* Graph edges */}
              <line className="graph-edge" data-start="node1" data-end="node2" stroke="url(#edge-gradient)" strokeWidth="2" />
              <line className="graph-edge" data-start="node2" data-end="node3" stroke="url(#edge-gradient)" strokeWidth="2" />
              <line className="graph-edge" data-start="node3" data-end="node4" stroke="url(#edge-gradient)" strokeWidth="2" />
              <line className="graph-edge" data-start="node4" data-end="node1" stroke="url(#edge-gradient)" strokeWidth="2" />
              <line className="graph-edge" data-start="node1" data-end="node3" stroke="url(#edge-gradient)" strokeWidth="2" />
              <line className="graph-edge" data-start="node2" data-end="node4" stroke="url(#edge-gradient)" strokeWidth="2" />
              
              {/* Graph nodes */}
              <circle id="node1" className="graph-node" cx="300" cy="200" r="20" fill="#60a5fa" filter="url(#glow-graph)" />
              <circle id="node2" className="graph-node" cx="500" cy="200" r="20" fill="#818cf8" filter="url(#glow-graph)" />
              <circle id="node3" className="graph-node" cx="500" cy="400" r="20" fill="#60a5fa" filter="url(#glow-graph)" />
              <circle id="node4" className="graph-node" cx="300" cy="400" r="20" fill="#818cf8" filter="url(#glow-graph)" />
              
              {/* Node labels */}
              <text x="300" y="200" textAnchor="middle" dy=".3em" fill="white" fontSize="12" fontWeight="bold">A</text>
              <text x="500" y="200" textAnchor="middle" dy=".3em" fill="white" fontSize="12" fontWeight="bold">B</text>
              <text x="500" y="400" textAnchor="middle" dy=".3em" fill="white" fontSize="12" fontWeight="bold">C</text>
              <text x="300" y="400" textAnchor="middle" dy=".3em" fill="white" fontSize="12" fontWeight="bold">D</text>
            </svg>
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            <div className="inline-block px-4 py-1 bg-blue-500/20 backdrop-blur-sm rounded-full text-blue-200 text-sm font-medium mb-4 border border-blue-500/20">
              DISCRETE MATHEMATICS
            </div>
            
            <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
              Graph Theory Explorer
            </h2>
            
            <p className="text-blue-100 text-lg max-w-2xl mb-6 leading-relaxed">
              Discover the fascinating world of vertices and edges. From Euler's bridges to modern network analysis, explore how graph theory shapes our understanding of connections and relationships.
            </p>
          </div>
          
          {/* Bottom section with buttons and info */}
          <div className="relative z-10 flex items-end justify-between">
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-blue-500/20 backdrop-blur-sm text-blue-100 rounded-xl font-semibold hover:bg-blue-500/30 transition-all duration-300 border border-blue-500/20 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Explore Algorithms
              </button>
              <button className="px-6 py-3 bg-violet-500/20 backdrop-blur-sm text-violet-100 rounded-xl font-semibold hover:bg-violet-500/30 transition-all duration-300 border border-violet-500/20 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
                Interactive Demo
              </button>
            </div>
            
            <div className="flex items-center gap-3 text-blue-200/80 bg-blue-500/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-blue-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-sm">Network Analysis</span>
            </div>
          </div>
          
          {/* Floating formulas/concepts */}
          <div className="absolute top-8 right-8 bg-blue-500/10 backdrop-blur-sm px-4 py-2 rounded-lg text-blue-100 border border-blue-500/20 transform rotate-2">
            <div className="text-sm font-mono">
              V(G) = {'{'}v₁, v₂, ..., vₙ{'}'}
            </div>
          </div>
          <div className="absolute bottom-24 right-8 bg-violet-500/10 backdrop-blur-sm px-4 py-2 rounded-lg text-violet-100 border border-violet-500/20 transform -rotate-1">
            <div className="text-sm font-mono">
              E(G) ⊆ V(G) × V(G)
            </div>
          </div>
        </div>
      </div>
      
      {/* Background animation */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}; 