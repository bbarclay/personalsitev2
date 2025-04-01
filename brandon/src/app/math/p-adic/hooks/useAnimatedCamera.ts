import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';

export const useAnimatedCamera = (
  targetPosition: [number, number, number],
  duration: number = 1
) => {
  const { camera } = useThree();
  const animationRef = useRef({
    progress: 0,
    startPosition: new Vector3(),
    isAnimating: false
  });

  useEffect(() => {
    if (!animationRef.current.isAnimating) {
      animationRef.current.startPosition.copy(camera.position);
      animationRef.current.progress = 0;
      animationRef.current.isAnimating = true;
    }
  }, [targetPosition, camera]);

  useFrame((_, delta) => {
    if (!animationRef.current.isAnimating) return;

    animationRef.current.progress += delta / duration;
    const progress = Math.min(animationRef.current.progress, 1);

    // Smooth easing function
    const t = 1 - Math.pow(1 - progress, 3);

    camera.position.lerpVectors(
      animationRef.current.startPosition,
      new Vector3(...targetPosition),
      t
    );

    if (progress >= 1) {
      animationRef.current.isAnimating = false;
    }
  });

  return animationRef.current.isAnimating;
};
