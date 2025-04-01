"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { seededRandom, randomInRange } from '@/app/utils/deterministicRandom';

export const QuantumWaves = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const waveFieldRef = useRef<THREE.Mesh | null>(null);
  const frameIdRef = useRef<number>(0);
  const [waveState, setWaveState] = useState('superposition');
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
    camera.position.z = 20;
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
    
    // Create particle system with deterministic positions
    const particleCount = 5000;
    const particlesGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);
    const particleColors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      // Use deterministic random function for all random values
      const radius = 10 * Math.cbrt(seededRandom());
      const theta = seededRandom() * Math.PI * 2;
      const phi = Math.acos(2 * seededRandom() - 1);
      
      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Size varies deterministically
      particleSizes[i] = randomInRange(0.1, 0.6);
      
      // Color gradient from blue to purple (deterministic)
      particleColors[i * 3] = randomInRange(0.2, 0.4);
      particleColors[i * 3 + 1] = randomInRange(0.3, 0.6);
      particleColors[i * 3 + 2] = randomInRange(0.8, 1.0);
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    
    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        waveState: { value: waveState === 'superposition' ? 0.0 : 1.0 }
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float time;
        uniform float waveState;
        
        void main() {
          vColor = color;
          
          // Calculate position based on wave state
          vec3 pos = position;
          float noise = sin(position.x * 0.5 + time) * cos(position.y * 0.5 + time) * sin(position.z * 0.5 + time);
          
          // More chaotic for superposition, more ordered for collapsed
          float intensity = mix(0.8, 0.2, waveState);
          pos += vec3(
            sin(time * 0.7 + position.z * 0.3) * intensity,
            cos(time * 0.8 + position.x * 0.3) * intensity,
            sin(time * 0.9 + position.y * 0.3) * intensity
          );
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (20.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          // Create a circular particle
          float r = distance(gl_PointCoord, vec2(0.5, 0.5));
          if (r > 0.5) discard;
          
          // Add glow effect
          float glow = 1.0 - r * 2.0;
          gl_FragColor = vec4(vColor, glow * glow);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    const particles = new THREE.Points(particlesGeometry, particleMaterial);
    scene.add(particles);
    particlesRef.current = particles;
    
    // Create wave field
    const waveGeometry = new THREE.PlaneGeometry(30, 30, 100, 100);
    const waveMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        waveState: { value: waveState === 'superposition' ? 0.0 : 1.0 }
      },
      vertexShader: `
        uniform float time;
        uniform float waveState;
        varying vec3 vPosition;
        varying float vElevation;
        
        void main() {
          vPosition = position;
          
          // Calculate wave height
          float superpositionWave = 
            sin(position.x * 0.2 + time * 0.7) * 
            cos(position.y * 0.2 + time * 0.8) * 1.5;
            
          float collapsedWave = 
            sin(position.x * 0.3 + position.y * 0.2 + time) * 0.5;
          
          // Blend between wave types based on state
          vElevation = mix(superpositionWave, collapsedWave, waveState);
          
          // Apply elevation to z coordinate
          vec3 pos = position;
          pos.z += vElevation;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float waveState;
        varying vec3 vPosition;
        varying float vElevation;
        
        void main() {
          // Create color based on position and elevation
          float intensity = (vElevation + 1.5) / 3.0;
          
          vec3 superpositionColor = vec3(
            0.1 + intensity * 0.3,
            0.3 + intensity * 0.5,
            0.8 + intensity * 0.2
          );
          
          vec3 collapsedColor = vec3(
            0.5 + intensity * 0.5,
            0.1 + intensity * 0.3,
            0.7 + intensity * 0.3
          );
          
          vec3 color = mix(superpositionColor, collapsedColor, waveState);
          
          // Add grid lines
          float gridX = mod(vPosition.x + 0.5, 2.0) - 1.0;
          float gridY = mod(vPosition.y + 0.5, 2.0) - 1.0;
          float grid = max(1.0 - abs(gridX) * 20.0, 1.0 - abs(gridY) * 20.0);
          grid = smoothstep(0.8, 0.9, grid) * 0.5;
          
          // Final color with transparency
          float alpha = 0.3 + intensity * 0.4 + grid;
          gl_FragColor = vec4(color, alpha);
        }
      `,
      wireframe: false,
      transparent: true,
      side: THREE.DoubleSide
    });
    
    const waveField = new THREE.Mesh(waveGeometry, waveMaterial);
    waveField.rotation.x = -Math.PI / 2;
    waveField.position.y = -8;
    scene.add(waveField);
    waveFieldRef.current = waveField;
    
    // Add some ambient light
    const ambientLight = new THREE.AmbientLight(0x4444ff, 0.5);
    scene.add(ambientLight);
    
    // Add point lights
    const pointLight1 = new THREE.PointLight(0x4466ff, 1, 30);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0xff66ff, 1, 30);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);
    
    // Animation loop
    let time = 0;
    const animate = () => {
      time += 0.01;
      
      if (particlesRef.current && particlesRef.current.material instanceof THREE.ShaderMaterial) {
        particlesRef.current.material.uniforms.time.value = time;
        particlesRef.current.material.uniforms.waveState.value = waveState === 'superposition' ? 0.0 : 1.0;
      }
      
      if (waveFieldRef.current && waveFieldRef.current.material instanceof THREE.ShaderMaterial) {
        waveFieldRef.current.material.uniforms.time.value = time;
        waveFieldRef.current.material.uniforms.waveState.value = waveState === 'superposition' ? 0.0 : 1.0;
      }
      
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
      if (particlesRef.current) {
        if (particlesRef.current.geometry) particlesRef.current.geometry.dispose();
        if (particlesRef.current.material instanceof THREE.Material) particlesRef.current.material.dispose();
      }
      
      if (waveFieldRef.current) {
        if (waveFieldRef.current.geometry) waveFieldRef.current.geometry.dispose();
        if (waveFieldRef.current.material instanceof THREE.Material) waveFieldRef.current.material.dispose();
      }
    };
  }, [waveState]);

  // Fixed animation states to avoid hydration issues
  const quantumStates = [
    { symbol: '|ψ⟩', className: 'quantum-float-1' },
    { symbol: '|∇⟩', className: 'quasntum-float-2' },
    { symbol: '|∫⟩', className: 'quantum-float-3' },
    { symbol: '|∑⟩', className: 'quantum-float-4' }
  ];

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden rounded-xl shadow-[0_0_50px_rgba(6,182,212,0.5)] border border-indigo-500/30">
      {/* Content rendered server-side safely */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/30 via-transparent to-indigo-900/30"></div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col p-8 backdrop-blur-sm">
        <div className="flex justify-between items-start">
          <div>
            <div className="inline-block px-4 py-1 bg-indigo-600/30 border border-indigo-500/30 rounded-full text-indigo-100 text-sm font-bold mb-4">
              EXPLORING MATH & AI
            </div>
            
            <h2 className="text-5xl font-bold text-white mb-4 tracking-tight leading-tight">
              Math & AI<br/>Visualization
            </h2>
          </div>
          
          {/* Floating quantum states with fixed animations */}
          <div className="flex flex-col gap-3">
            {quantumStates.map((state, i) => (
              <div 
                key={i}
                className={`
                  bg-indigo-600/20 backdrop-blur-sm px-4 py-2 rounded-lg 
                  text-indigo-200 border border-indigo-500/30 transform 
                  hover:scale-110 transition-transform cursor-pointer
                  ${mounted ? state.className : ''}
                `}
              >
                {state.symbol}
              </div>
            ))}
          </div>
        </div>

        {/* Central quantum controls */}
        <div className="flex-1 flex items-center justify-center">
          <div className="grid grid-cols-2 gap-6">
            <button 
              className={`px-8 py-4 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 
                ${waveState === 'superposition' 
                  ? 'bg-indigo-500/50 text-white border-2 border-indigo-400/70 shadow-[0_0_30px_rgba(99,102,241,0.5)]' 
                  : 'bg-indigo-800/30 text-indigo-200 border border-indigo-600/30'}`}
              onClick={() => setWaveState('superposition')}
            >
              Complex Mode
            </button>
            <button 
              className={`px-8 py-4 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105
                ${waveState === 'collapsed' 
                  ? 'bg-violet-500/50 text-white border-2 border-violet-400/70 shadow-[0_0_30px_rgba(139,92,246,0.5)]' 
                  : 'bg-violet-800/30 text-violet-200 border border-violet-600/30'}`}
              onClick={() => setWaveState('collapsed')}
            >
              Ordered Mode
            </button>
          </div>
        </div>

        {/* Bottom measurement tools */}
        <div className="flex justify-between items-end">
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-indigo-600/30 text-indigo-100 rounded-xl font-medium hover:bg-indigo-500/50 transition-all duration-300 border border-indigo-500/30 backdrop-blur-sm hover:scale-105 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Visualize
            </button>
            <button className="px-6 py-3 bg-violet-600/30 text-violet-100 rounded-xl font-medium hover:bg-violet-500/50 transition-all duration-300 border border-violet-500/30 backdrop-blur-sm hover:scale-105 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Transform
            </button>
          </div>
          
          <div className="text-indigo-200 font-mono bg-indigo-600/30 px-4 py-2 rounded-lg backdrop-blur-sm border border-indigo-500/30">
            ∑ f(x) = ∫ f'(t)dt
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes quantum-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .quantum-float-1 {
          animation: quantum-float 3s ease-in-out infinite;
        }

        .quantum-float-2 {
          animation: quantum-float 3.5s ease-in-out infinite 0.5s;
        }

        .quantum-float-3 {
          animation: quantum-float 4s ease-in-out infinite 1s;
        }

        .quantum-float-4 {
          animation: quantum-float 4.5s ease-in-out infinite 1.5s;
        }
      `}</style>
    </div>
  );
};
