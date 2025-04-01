import React, { useMemo } from 'react';
import { Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Node } from './Node';
import Edge from './Edge';
import { TreeProps } from '../../types/visualization';
import { useAnimatedNodes } from '../../hooks/useAnimatedNodes';
import { GlowMesh } from '../effects/GlowMesh';

export const PAdicTree: React.FC<TreeProps> = ({ p, depth, expansion }) => {
  const nodesGroupRef = useAnimatedNodes(false);
  const highlightedGroupRef = useAnimatedNodes(true);

  const treeData = useMemo(() => {
    const getNodePosition = (level: number, index: number, totalNodes: number): [number, number, number] => {
      const radius = 2 + level * 2;
      const angle = (2 * Math.PI * index) / totalNodes;
      const x = radius * Math.cos(angle);
      const z = radius * Math.sin(angle);
      const y = -level * 2;
      return [x, y, z];
    };

    const regularNodes: React.ReactElement[] = [];
    const highlightedNodes: React.ReactElement[] = [];
    const glowEffects: React.ReactElement[] = [];
    const edges: React.ReactElement[] = [];

    for (let level = 0; level < depth; level++) {
      const nodesAtLevel = Math.pow(p, level);
      
      for (let i = 0; i < nodesAtLevel; i++) {
        const position = getNodePosition(level, i, nodesAtLevel);
        const isInExpansion = expansion[level] === i % p;
        const color = isInExpansion ? '#4CAF50' : '#2196F3';
        const size = isInExpansion ? 0.3 : 0.2;

        // Sort nodes into regular and highlighted groups
        const node = (
          <Node
            key={`node-${level}-${i}`}
            position={position}
            color={color}
            label={i % p}
            size={size}
          />
        );

        if (isInExpansion) {
          highlightedNodes.push(node);
          // Add glow effect for highlighted nodes
          glowEffects.push(
            <GlowMesh
              key={`glow-${level}-${i}`}
              position={position}
              color={color}
              radius={size * 1.5}
              intensity={0.5}
            />
          );
        } else {
          regularNodes.push(node);
        }

        // Add edge to parent (if not root)
        if (level > 0) {
          const parentIndex = Math.floor(i / p);
          const parentPosition = getNodePosition(level - 1, parentIndex, nodesAtLevel / p);
          
          edges.push(
            <Edge
              key={`edge-${level}-${i}`}
              start={new Vector3(...parentPosition)}
              end={new Vector3(...position)}
              color={isInExpansion ? '#4CAF50' : '#666666'}
            />
          );
        }
      }
    }

    return { regularNodes, highlightedNodes, glowEffects, edges };
  }, [p, depth, expansion]);

  return (
    <group>
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          intensity={0.8}
        />
      </EffectComposer>

      {/* Base group with edges and regular nodes */}
      <group>
        {treeData.edges}
        <group ref={nodesGroupRef}>{treeData.regularNodes}</group>
      </group>

      {/* Highlighted path with special effects */}
      <group>
        <group ref={highlightedGroupRef}>
          {treeData.highlightedNodes}
          {treeData.glowEffects}
        </group>
        {expansion.length > 0 && (
          <>
            {/* Ambient glow */}
            <pointLight
              position={[0, -depth * 2, 0]}
              distance={10}
              intensity={0.5}
              color="#4CAF50"
            />
            
            {/* Particle effects around highlighted path */}
            <Sparkles
              count={50}
              scale={1}
              position={[0, -depth, 0]}
              size={4}
              speed={0.4}
              color="#4CAF50"
            />
          </>
        )}
      </group>

      {/* Ambient particles in the scene */}
      <Sparkles
        count={100}
        scale={15}
        position={[0, -depth * 1.5, 0]}
        size={2}
        speed={0.2}
        opacity={0.3}
      />
    </group>
  );
};
