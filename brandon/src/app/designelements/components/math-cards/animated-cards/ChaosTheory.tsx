"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { seededRandom } from '@/app/utils/deterministicRandom';

export const ChaosTheory = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const frameIdRef = useRef<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Set mounted state to true after component mounts
    setMounted(true);
    
    // Initialize Three.js scene only on client side
    if (!containerRef.current) return;
    
    // Initialize Three.js
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Setup scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Setup camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 30;
    cameraRef.current = camera;
    
    // Setup controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.enableZoom = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controlsRef.current = controls;
    
    // Create Lorenz attractor
    const lorenzGeometry = new THREE.BufferGeometry();
    const points = [];
    const colors = [];
    
    // Lorenz parameters
    const sigma = 10;
    const rho = 28;
    const beta = 8/3;
    
    // Initial point
    let x = 0.1;
    let y = 0;
    let z = 0;
    
    // Generate Lorenz attractor points with deterministic randomness
    for (let i = 0; i < 10000; i++) {
      // Lorenz equations
      const dt = 0.005;
      const dx = sigma * (y - x) * dt;
      const dy = (x * (rho - z) - y) * dt;
      const dz = (x * y - beta * z) * dt;
      
      x += dx;
      y += dy;
      z += dz;
      
      // Add point
      points.push(new THREE.Vector3(x * 0.5, y * 0.5, z * 0.5));
      
      // Add color - gradient from blue to purple
      const t = i / 10000;
      colors.push(0.1 + t * 0.2); // R
      colors.push(0.1 + t * 0.4); // G
      colors.push(0.8 - t * 0.2); // B
    }
    
    // Create a smooth curve through the points
    const curve = new THREE.CatmullRomCurve3(points);
    const curvePoints = curve.getPoints(10000);
    const curvePositions = new Float32Array(curvePoints.length * 3);
    const curveColors = new Float32Array(colors);
    
    for (let i = 0; i < curvePoints.length; i++) {
      curvePositions[i * 3] = curvePoints[i].x;
      curvePositions[i * 3 + 1] = curvePoints[i].y;
      curvePositions[i * 3 + 2] = curvePoints[i].z;
    }
    
    lorenzGeometry.setAttribute('position', new THREE.BufferAttribute(curvePositions, 3));
    lorenzGeometry.setAttribute('color', new THREE.BufferAttribute(curveColors, 3));
    
    const lorenzMaterial = new THREE.LineBasicMaterial({ 
      vertexColors: true,
      linewidth: 1
    });
    
    const lorenzCurve = new THREE.Line(lorenzGeometry, lorenzMaterial);
    scene.add(lorenzCurve);
    
    // Add some ambient light
    const ambientLight = new THREE.AmbientLight(0x4444ff, 0.5);
    scene.add(ambientLight);
    
    // Add point lights
    const pointLight1 = new THREE.PointLight(0x4466ff, 1, 50);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0xff66ff, 1, 50);
    pointLight2.position.set(-10, -10, 10);
    scene.add(pointLight2);
    
    // Animation loop
    const animate = () => {
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      
      renderer.render(scene, camera);
      frameIdRef.current = requestAnimationFrame(animate);
    };
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      
      rendererRef.current.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    frameIdRef.current = requestAnimationFrame(animate);
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameIdRef.current);
      
      if (rendererRef.current && rendererRef.current.domElement && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      // Dispose resources
      if (lorenzGeometry) lorenzGeometry.dispose();
      if (lorenzMaterial) lorenzMaterial.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden rounded-xl shadow-[0_0_50px_rgba(6,182,212,0.5)] border border-indigo-500/30">
      {/* Content rendered server-side safely */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/30 via-transparent to-indigo-900/30"></div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col p-8 backdrop-blur-sm">
        <div className="flex justify-between items-start">
          <div>
            <div className="inline-block px-4 py-1 bg-indigo-600/30 border border-indigo-500/30 rounded-full text-indigo-100 text-sm font-bold mb-4">
              DETERMINISTIC CHAOS
            </div>
            
            <h2 className="text-5xl font-bold text-white mb-4 tracking-tight leading-tight">
              Chaos<br/>Theory
            </h2>
            <p className="text-gray-300 max-w-md">
              Witness the unpredictable yet deterministic behavior of chaotic systems. Small changes in initial conditions lead to drastically different outcomes—the essence of the butterfly effect.
            </p>
          </div>
        </div>

        {/* Parameter controls */}
        <div className="absolute bottom-8 right-8">
          <div className="flex flex-col gap-4 bg-black/30 backdrop-blur-md p-4 rounded-xl border border-indigo-500/30">
            <div className="text-indigo-200 font-mono">
              σ = 10, ρ = 28, β = 8/3
            </div>
            <div className="text-indigo-200 font-mono text-sm">
              dx/dt = σ(y-x)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
