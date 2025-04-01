'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Text } from 'troika-three-text';
import { gsap } from 'gsap';

type SolutionStep = {
  description: string;
  equations: string[];
  matrix?: number[][];
  pivot?: [number, number];
  highlightRows?: number[];
  highlightCols?: number[];
};

type Variable = 'x' | 'y' | 'z' | 'w';
type Solution = Record<Variable, number> | 'inconsistent' | 'infinite' | null;

interface StepVisualizerProps {
  currentStep: SolutionStep;
  solution: Solution;
  previousStep?: SolutionStep;
  is3D?: boolean;
}

const StepVisualizer: React.FC<StepVisualizerProps> = ({
  currentStep,
  solution,
  previousStep,
  is3D = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | THREE.OrthographicCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const frameRef = useRef<number | null>(null);
  const matrixObjectsRef = useRef<THREE.Object3D[]>([]);
  
  // Initialize visualization
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Clear any previous content
    while (containerRef.current.firstChild) {
      containerRef.current.firstChild.remove();
    }
    
    // Initialize Three.js scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8f9fa);
    sceneRef.current = scene;
    
    // Initialize camera
    let camera;
    if (is3D) {
      camera = new THREE.PerspectiveCamera(
        75,
        containerRef.current.clientWidth / containerRef.current.clientHeight,
        0.1,
        1000
      );
      camera.position.set(5, 5, 5);
    } else {
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      const aspect = width / height;
      camera = new THREE.OrthographicCamera(
        -5 * aspect, 5 * aspect, 5, -5, 0.1, 100
      );
      camera.position.set(0, 0, 10);
    }
    cameraRef.current = camera;
    
    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Add controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controlsRef.current = controls;
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);
    
    // Add coordinate grid
    if (is3D) {
      const gridHelper = new THREE.GridHelper(10, 10, 0x666666, 0xcccccc);
      scene.add(gridHelper);
      
      const axesHelper = new THREE.AxesHelper(5);
      scene.add(axesHelper);
    } else {
      // 2D grid
      const gridHelper = new THREE.GridHelper(10, 10, 0x666666, 0xcccccc);
      gridHelper.rotation.x = Math.PI / 2;
      scene.add(gridHelper);
      
      // 2D axes
      const axesHelper = new THREE.AxesHelper(5);
      axesHelper.rotation.x = Math.PI / 2;
      scene.add(axesHelper);
    }
    
    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    
    frameRef.current = requestAnimationFrame(animate);
    
    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      if (is3D && cameraRef.current instanceof THREE.PerspectiveCamera) {
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
      } else if (!is3D && cameraRef.current instanceof THREE.OrthographicCamera) {
        const aspect = width / height;
        cameraRef.current.left = -5 * aspect;
        cameraRef.current.right = 5 * aspect;
        cameraRef.current.updateProjectionMatrix();
      }
      
      if (rendererRef.current) {
        rendererRef.current.setSize(width, height);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (rendererRef.current) rendererRef.current.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, [is3D]);
  
  // Update visualization when step changes
  useEffect(() => {
    if (!sceneRef.current || !currentStep.matrix) return;
    
    // Clear previous matrix objects
    matrixObjectsRef.current.forEach(obj => {
      sceneRef.current?.remove(obj);
    });
    matrixObjectsRef.current = [];
    
    // Create matrix visualization
    const matrix = currentStep.matrix;
    const rows = matrix.length;
    const cols = matrix[0].length;
    
    // Cell size and spacing
    const cellSize = 0.8;
    const spacing = 0.2;
    const totalWidth = cols * (cellSize + spacing) - spacing;
    const totalHeight = rows * (cellSize + spacing) - spacing;
    
    // Position the whole matrix at the center
    const startX = -(totalWidth / 2) + cellSize / 2;
    const startY = (totalHeight / 2) - cellSize / 2;
    
    // Create cells
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        // Calculate cell position
        const x = startX + j * (cellSize + spacing);
        const y = startY - i * (cellSize + spacing);
        const z = 0;
        
        // Create cell geometry and material
        let cellColor = 0xffffff; // Default white
        
        // Special cell coloring based on step properties
        if (currentStep.pivot && currentStep.pivot[0] === i && currentStep.pivot[1] === j) {
          cellColor = 0xffc107; // Amber for pivot
        } else if (currentStep.highlightRows?.includes(i)) {
          cellColor = 0xe3f2fd; // Light blue for highlighted rows
        } else if (currentStep.highlightCols?.includes(j)) {
          cellColor = 0xe8f5e9; // Light green for highlighted columns
        }
        
        // If it's the last column, make it slightly different to indicate it's the constants
        if (j === cols - 1) {
          cellColor = 0xfafafa; // Light gray
        }
        
        // Create cell mesh
        const geometry = new THREE.BoxGeometry(cellSize, cellSize, 0.1);
        const material = new THREE.MeshPhongMaterial({ 
          color: cellColor,
          transparent: true,
          opacity: 0.9,
          specular: 0x111111,
          shininess: 30
        });
        const cell = new THREE.Mesh(geometry, material);
        
        // Position cell
        cell.position.set(x, y, z);
        sceneRef.current.add(cell);
        matrixObjectsRef.current.push(cell);
        
        // Add value text
        const value = matrix[i][j].toFixed(2);
        const text = new Text();
        text.text = value;
        text.fontSize = 0.3;
        text.color = 0x333333;
        text.anchorX = 'center';
        text.anchorY = 'middle';
        text.position.set(x, y, z + 0.06);
        text.sync();
        sceneRef.current.add(text);
        matrixObjectsRef.current.push(text);
        
        // Animate from previous values if available
        if (previousStep?.matrix) {
          const prevValue = previousStep.matrix[i]?.[j] ?? 0;
          const currValue = matrix[i][j];
          
          if (prevValue !== currValue) {
            // Start with previous value
            (text as any).text = prevValue.toFixed(2);
            
            // Animate to new value
            gsap.to({}, {
              duration: 1,
              onUpdate: function() {
                const progress = this.progress();
                const interpolatedValue = prevValue + (currValue - prevValue) * progress;
                (text as any).text = interpolatedValue.toFixed(2);
                text.sync();
              }
            });
          }
        }
      }
    }
    
    // Add column labels (x, y, z, =)
    const variables = ['x', 'y', 'z', 'w'].slice(0, cols - 1);
    for (let j = 0; j < cols; j++) {
      const x = startX + j * (cellSize + spacing);
      const y = startY + cellSize + spacing;
      const z = 0;
      
      const text = new Text();
      text.text = j === cols - 1 ? '=' : variables[j];
      text.fontSize = 0.4;
      text.color = 0x555555;
      text.anchorX = 'center';
      text.anchorY = 'middle';
      text.position.set(x, y, z);
      text.sync();
      sceneRef.current.add(text);
      matrixObjectsRef.current.push(text);
    }
    
    // Add row labels (R1, R2, etc.)
    for (let i = 0; i < rows; i++) {
      const x = startX - cellSize - spacing / 2;
      const y = startY - i * (cellSize + spacing);
      const z = 0;
      
      const text = new Text();
      text.text = `R${i + 1}`;
      text.fontSize = 0.3;
      text.color = 0x555555;
      text.anchorX = 'center';
      text.anchorY = 'middle';
      text.position.set(x, y, z);
      text.sync();
      sceneRef.current.add(text);
      matrixObjectsRef.current.push(text);
    }
    
    // Add step description text
    const descText = new Text();
    descText.text = currentStep.description;
    descText.fontSize = 0.4;
    descText.color = 0x0d6efd;
    descText.anchorX = 'center';
    descText.anchorY = 'middle';
    descText.position.set(0, startY - totalHeight - 1, 0);
    descText.sync();
    sceneRef.current.add(descText);
    matrixObjectsRef.current.push(descText);
    
    // If we have a solution, visualize it
    if (solution && typeof solution === 'object') {
      // Calculate position below the matrix
      const solutionStartY = startY - totalHeight - 2;
      
      // Add "Solution" header
      const solutionText = new Text();
      solutionText.text = "Solution:";
      solutionText.fontSize = 0.5;
      solutionText.color = 0x28a745;
      solutionText.fontWeight = 'bold';
      solutionText.anchorX = 'center';
      solutionText.anchorY = 'middle';
      solutionText.position.set(0, solutionStartY, 0);
      solutionText.sync();
      sceneRef.current.add(solutionText);
      matrixObjectsRef.current.push(solutionText);
      
      // Add individual variable values
      let index = 0;
      for (const [variable, value] of Object.entries(solution)) {
        const varText = new Text();
        varText.text = `${variable} = ${value.toFixed(4)}`;
        varText.fontSize = 0.4;
        varText.color = 0x333333;
        varText.anchorX = 'center';
        varText.anchorY = 'middle';
        varText.position.set(0, solutionStartY - (index + 1) * 0.6, 0);
        varText.sync();
        sceneRef.current.add(varText);
        matrixObjectsRef.current.push(varText);
        index++;
      }
    } else if (solution === 'inconsistent' || solution === 'infinite') {
      // Show special solution message
      const specialSolutionText = new Text();
      specialSolutionText.text = solution === 'inconsistent' 
        ? "No solution exists (inconsistent)" 
        : "Infinitely many solutions";
      specialSolutionText.fontSize = 0.5;
      specialSolutionText.color = solution === 'inconsistent' ? 0xdc3545 : 0x28a745;
      specialSolutionText.fontWeight = 'bold';
      specialSolutionText.anchorX = 'center';
      specialSolutionText.anchorY = 'middle';
      specialSolutionText.position.set(0, startY - totalHeight - 2, 0);
      specialSolutionText.sync();
      sceneRef.current.add(specialSolutionText);
      matrixObjectsRef.current.push(specialSolutionText);
    }
  }, [currentStep, previousStep, solution]);
  
  return (
    <div 
      ref={containerRef} 
      className="w-full h-[400px] bg-gray-50 rounded-lg border border-gray-200"
      style={{ touchAction: 'none' }}
    ></div>
  );
};

export default StepVisualizer; 