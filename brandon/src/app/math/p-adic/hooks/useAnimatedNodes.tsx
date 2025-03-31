import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

export const useAnimatedNodes = (isHighlighted: boolean) => {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Simple animation for highlighted nodes
      if (isHighlighted) {
        groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
        // Gentle bobbing motion
        groupRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.05;
      } else {
        // Subtle rotation for regular nodes
        groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      }
    }
  });

  useEffect(() => {
    if (groupRef.current) {
      // Initialize any properties if needed
      if (isHighlighted) {
        groupRef.current.scale.set(1.05, 1.05, 1.05);
      }
    }
  }, [isHighlighted]);

  return groupRef;
};
