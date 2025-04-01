import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, Object3D } from 'three';

export const useAnimatedNodes = (isHighlighted: boolean = false) => {
  const groupRef = useRef<Group>(null);
  const pulseRef = useRef(0);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Update pulse animation
    pulseRef.current += delta;
    const pulseFactor = Math.sin(pulseRef.current * 2) * 0.1 + 1;

    // Animate each node in the group
    groupRef.current.traverse((child: Object3D) => {
      if (child.type === 'Mesh') {
        if (isHighlighted) {
          // Pulsing scale animation for highlighted nodes
          child.scale.setScalar(pulseFactor);
        } else {
          // Gentle floating animation for regular nodes
          const offset = child.position.y + pulseRef.current;
          child.position.y = child.position.y + Math.sin(offset) * 0.001;
        }
      }
    });
  });

  useEffect(() => {
    if (groupRef.current) {
      // Initialize positions
      groupRef.current.traverse((child: Object3D) => {
        if (child.type === 'Mesh') {
          child.scale.setScalar(1);
        }
      });
    }
  }, []);

  return groupRef;
};
