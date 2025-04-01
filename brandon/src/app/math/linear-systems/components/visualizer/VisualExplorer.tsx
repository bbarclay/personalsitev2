'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface VisualExplorerProps {
  equations: string[];
  solution: Record<string, number> | 'inconsistent' | 'infinite' | null;
}

export function VisualExplorer({ equations, solution }: VisualExplorerProps) {
  const container3DRef = useRef<HTMLDivElement>(null);
  const container2DRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const renderer2DRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const scene2DRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const camera2DRef = useRef<THREE.OrthographicCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const [viewMode, setViewMode] = useState<'3d' | '2d'>('3d');
  const [colors] = useState<string[]>(['#3b82f6', '#10b981', '#f59e0b', '#ef4444']);

  // Parse equations into coefficient form
  const parseEquation = (equation: string) => {
    const sides = equation.split('=');
    if (sides.length !== 2) return null;

    const leftSide = sides[0].trim();
    const rightSide = parseFloat(sides[1].trim());
    if (isNaN(rightSide)) return null;

    const coefficients: Record<string, number> = { x: 0, y: 0, z: 0 };
    const terms = leftSide.split(/(?=[-+])/);

    for (const term of terms) {
      const trimmedTerm = term.trim();
      if (!trimmedTerm) continue;

      let coeff = 1;
      let variable = '';

      if (trimmedTerm.startsWith('+')) {
        const withoutSign = trimmedTerm.substring(1).trim();
        
        if (withoutSign.includes('x')) {
          variable = 'x';
          coeff = withoutSign.replace('x', '') === '' ? 1 : parseFloat(withoutSign.replace('x', ''));
        } else if (withoutSign.includes('y')) {
          variable = 'y';
          coeff = withoutSign.replace('y', '') === '' ? 1 : parseFloat(withoutSign.replace('y', ''));
        } else if (withoutSign.includes('z')) {
          variable = 'z';
          coeff = withoutSign.replace('z', '') === '' ? 1 : parseFloat(withoutSign.replace('z', ''));
        }
      } else if (trimmedTerm.startsWith('-')) {
        const withoutSign = trimmedTerm.substring(1).trim();
        
        if (withoutSign.includes('x')) {
          variable = 'x';
          coeff = withoutSign.replace('x', '') === '' ? -1 : -parseFloat(withoutSign.replace('x', ''));
        } else if (withoutSign.includes('y')) {
          variable = 'y';
          coeff = withoutSign.replace('y', '') === '' ? -1 : -parseFloat(withoutSign.replace('y', ''));
        } else if (withoutSign.includes('z')) {
          variable = 'z';
          coeff = withoutSign.replace('z', '') === '' ? -1 : -parseFloat(withoutSign.replace('z', ''));
        }
      } else {
        if (trimmedTerm.includes('x')) {
          variable = 'x';
          coeff = trimmedTerm.replace('x', '') === '' ? 1 : parseFloat(trimmedTerm.replace('x', ''));
        } else if (trimmedTerm.includes('y')) {
          variable = 'y';
          coeff = trimmedTerm.replace('y', '') === '' ? 1 : parseFloat(trimmedTerm.replace('y', ''));
        } else if (trimmedTerm.includes('z')) {
          variable = 'z';
          coeff = trimmedTerm.replace('z', '') === '' ? 1 : parseFloat(trimmedTerm.replace('z', ''));
        }
      }

      if (variable) {
        coefficients[variable] = coeff;
      }
    }

    return { coefficients, constant: rightSide };
  };

  // Initialize 3D visualization
  useEffect(() => {
    if (!container3DRef.current) return;

    // Initialize Three.js scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f5);
    sceneRef.current = scene;

    // Set up camera
    const camera = new THREE.PerspectiveCamera(
      75,
      container3DRef.current.clientWidth / container3DRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(5, 5, 5);
    cameraRef.current = camera;

    // Set up renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container3DRef.current.clientWidth, container3DRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container3DRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Add controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controlsRef.current = controls;

    // Add grid helper
    const gridHelper = new THREE.GridHelper(10, 10, 0x444444, 0x888888);
    scene.add(gridHelper);

    // Add axes helper
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(10, 20, 15);
    scene.add(directionalLight);

    // Add labels
    const addAxisLabel = (text: string, position: THREE.Vector3) => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 64;
      const context = canvas.getContext('2d');
      if (!context) return;
      
      context.fillStyle = 'white';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.font = 'bold 40px Arial';
      context.fillStyle = 'black';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(text, canvas.width / 2, canvas.height / 2);
      
      const texture = new THREE.Texture(canvas);
      texture.needsUpdate = true;
      
      const material = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(material);
      sprite.position.copy(position);
      sprite.scale.set(1, 0.5, 1);
      scene.add(sprite);
    };
    
    addAxisLabel('X', new THREE.Vector3(5.5, 0, 0));
    addAxisLabel('Y', new THREE.Vector3(0, 5.5, 0));
    addAxisLabel('Z', new THREE.Vector3(0, 0, 5.5));

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      if (!container3DRef.current || !cameraRef.current || !rendererRef.current) return;
      
      const width = container3DRef.current.clientWidth;
      const height = container3DRef.current.clientHeight;
      
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      
      rendererRef.current.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container3DRef.current && renderer.domElement.parentNode === container3DRef.current) {
        container3DRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Initialize 2D visualization
  useEffect(() => {
    if (!container2DRef.current) return;

    // Initialize Three.js scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f5);
    scene2DRef.current = scene;

    // Set up camera (orthographic for 2D)
    const width = container2DRef.current.clientWidth;
    const height = container2DRef.current.clientHeight;
    const aspect = width / height;
    const camera = new THREE.OrthographicCamera(
      -5 * aspect, 5 * aspect, 5, -5, 0.1, 100
    );
    camera.position.set(0, 0, 5);
    camera2DRef.current = camera;

    // Set up renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container2DRef.current.appendChild(renderer.domElement);
    renderer2DRef.current = renderer;

    // Add grid
    const gridHelper = new THREE.GridHelper(10, 10, 0x444444, 0x888888);
    gridHelper.rotation.x = Math.PI / 2; // Rotate to lie in XY plane
    scene.add(gridHelper);

    // Add axes
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    // Add axis labels
    const addAxisLabel = (text: string, position: THREE.Vector3) => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 64;
      const context = canvas.getContext('2d');
      if (!context) return;
      
      context.fillStyle = 'white';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.font = 'bold 40px Arial';
      context.fillStyle = 'black';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(text, canvas.width / 2, canvas.height / 2);
      
      const texture = new THREE.Texture(canvas);
      texture.needsUpdate = true;
      
      const material = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(material);
      sprite.position.copy(position);
      sprite.scale.set(1, 0.5, 1);
      scene.add(sprite);
    };
    
    addAxisLabel('X', new THREE.Vector3(5.5, 0, 0));
    addAxisLabel('Y', new THREE.Vector3(0, 5.5, 0));

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      if (!container2DRef.current || !camera2DRef.current || !renderer2DRef.current) return;
      
      const width = container2DRef.current.clientWidth;
      const height = container2DRef.current.clientHeight;
      const aspect = width / height;
      
      if (camera2DRef.current instanceof THREE.OrthographicCamera) {
        camera2DRef.current.left = -5 * aspect;
        camera2DRef.current.right = 5 * aspect;
        camera2DRef.current.updateProjectionMatrix();
      }
      
      renderer2DRef.current.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container2DRef.current && renderer.domElement.parentNode === container2DRef.current) {
        container2DRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update visualization when equations or solution changes
  useEffect(() => {
    if (!sceneRef.current || !scene2DRef.current || !equations.length) return;

    const scene3D = sceneRef.current;
    const scene2D = scene2DRef.current;

    // Clear previous equations (keep grid and axes)
    scene3D.children = scene3D.children.filter(
      child => child instanceof THREE.GridHelper || 
               child instanceof THREE.AxesHelper || 
               child instanceof THREE.Light ||
               child instanceof THREE.Sprite
    );
    
    scene2D.children = scene2D.children.filter(
      child => child instanceof THREE.GridHelper || 
               child instanceof THREE.AxesHelper ||
               child instanceof THREE.Sprite
    );

    // Parse and visualize equations
    equations.forEach((eq, index) => {
      const parsed = parseEquation(eq);
      if (!parsed) return;

      const { coefficients, constant } = parsed;
      
      // Create color from predefined array
      const color = new THREE.Color(colors[index % colors.length]);
      
      // 3D Visualization (planes)
      if (Math.abs(coefficients.z) > 0.001) {
        // If z coefficient exists, create a plane
        const planeSize = 10;
        const planeGeometry = new THREE.PlaneGeometry(planeSize, planeSize, 10, 10);
        const planeMaterial = new THREE.MeshStandardMaterial({ 
          color: color,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.6,
          wireframe: false
        });
        
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        
        // Position the plane based on the equation: ax + by + cz = d
        // If we set x = y = 0, then z = d/c
        const normalVector = new THREE.Vector3(
          coefficients.x / coefficients.z,
          coefficients.y / coefficients.z,
          1
        ).normalize();
        
        plane.lookAt(normalVector);
        
        // Position the plane at the point where it intersects the z-axis
        const zIntercept = constant / coefficients.z;
        plane.position.set(0, 0, zIntercept);
        
        scene3D.add(plane);
        
        // Add wireframe to make the plane more visible
        const wireMaterial = new THREE.LineBasicMaterial({ color: color, linewidth: 2 });
        const wireframe = new THREE.LineSegments(
          new THREE.WireframeGeometry(planeGeometry),
          wireMaterial
        );
        wireframe.position.copy(plane.position);
        wireframe.rotation.copy(plane.rotation);
        scene3D.add(wireframe);
        
        // Add equation label
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 64;
        const context = canvas.getContext('2d');
        if (context) {
          context.fillStyle = 'white';
          context.fillRect(0, 0, canvas.width, canvas.height);
          context.font = 'bold 24px Arial';
          context.fillStyle = color.getStyle();
          context.textAlign = 'center';
          context.textBaseline = 'middle';
          context.fillText(eq, canvas.width / 2, canvas.height / 2);
          
          const texture = new THREE.Texture(canvas);
          texture.needsUpdate = true;
          
          const material = new THREE.SpriteMaterial({ map: texture });
          const sprite = new THREE.Sprite(material);
          
          // Position the sprite near one corner of the plane
          sprite.position.set(planeSize/2, planeSize/2, zIntercept);
          sprite.scale.set(2, 0.5, 1);
          scene3D.add(sprite);
        }
      } else if (Math.abs(coefficients.y) > 0.001) {
        // If no z but y coefficient exists, create a vertical plane
        const lineGeometry = new THREE.BufferGeometry();
        
        // Calculate x intercept when y = 0: ax = d
        const xIntercept = constant / coefficients.x;
        
        // Calculate y intercept when x = 0: by = d
        const yIntercept = constant / coefficients.y;
        
        // Create line from x-intercept to y-intercept
        const vertices = new Float32Array([
          xIntercept, 0, 0,
          0, yIntercept, 0
        ]);
        lineGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        
        const lineMaterial = new THREE.LineBasicMaterial({ color: color, linewidth: 3 });
        const line = new THREE.Line(lineGeometry, lineMaterial);
        scene3D.add(line);
        
        // Add equation label
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 64;
        const context = canvas.getContext('2d');
        if (context) {
          context.fillStyle = 'white';
          context.fillRect(0, 0, canvas.width, canvas.height);
          context.font = 'bold 24px Arial';
          context.fillStyle = color.getStyle();
          context.textAlign = 'center';
          context.textBaseline = 'middle';
          context.fillText(eq, canvas.width / 2, canvas.height / 2);
          
          const texture = new THREE.Texture(canvas);
          texture.needsUpdate = true;
          
          const material = new THREE.SpriteMaterial({ map: texture });
          const sprite = new THREE.Sprite(material);
          sprite.position.set(xIntercept/2, yIntercept/2, 0.5);
          sprite.scale.set(2, 0.5, 1);
          scene3D.add(sprite);
        }
      }
      
      // 2D Visualization (lines)
      if (Math.abs(coefficients.y) > 0.001) {
        // Create a line in 2D
        const lineGeometry = new THREE.BufferGeometry();
        
        // Calculate points for line
        // If ax + by = c, then y = (c - ax) / b
        const calcY = (x: number) => (constant - coefficients.x * x) / coefficients.y;
        
        // Create points from x = -5 to x = 5
        const points = [];
        for (let x = -5; x <= 5; x += 10) {
          points.push(x, calcY(x), 0);
        }
        
        const vertices = new Float32Array(points);
        lineGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        
        const lineMaterial = new THREE.LineBasicMaterial({ color: color, linewidth: 3 });
        const line = new THREE.Line(lineGeometry, lineMaterial);
        scene2D.add(line);
        
        // Add equation label
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 64;
        const context = canvas.getContext('2d');
        if (context) {
          context.fillStyle = 'white';
          context.fillRect(0, 0, canvas.width, canvas.height);
          context.font = 'bold 24px Arial';
          context.fillStyle = color.getStyle();
          context.textAlign = 'center';
          context.textBaseline = 'middle';
          context.fillText(eq, canvas.width / 2, canvas.height / 2);
          
          const texture = new THREE.Texture(canvas);
          texture.needsUpdate = true;
          
          const material = new THREE.SpriteMaterial({ map: texture });
          const sprite = new THREE.Sprite(material);
          
          // Position label near the center of view
          sprite.position.set(2, calcY(2), 0.1);
          sprite.scale.set(2, 0.5, 1);
          scene2D.add(sprite);
        }
      }
    });

    // Add solution point if available
    if (solution && typeof solution === 'object') {
      // 3D solution point
      const solutionGeometry = new THREE.SphereGeometry(0.15);
      const solutionMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000, emissive: 0xff0000, emissiveIntensity: 0.5 });
      const solutionPoint = new THREE.Mesh(solutionGeometry, solutionMaterial);
      
      const x = solution['x'] || 0;
      const y = solution['y'] || 0;
      const z = solution['z'] || 0;
      
      solutionPoint.position.set(x, y, z);
      scene3D.add(solutionPoint);
      
      // Add point label
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 64;
      const context = canvas.getContext('2d');
      if (context) {
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.font = 'bold 24px Arial';
        context.fillStyle = 'red';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        
        let pointLabel = 'Solution:';
        Object.entries(solution).forEach(([key, value]) => {
          pointLabel += ` ${key}=${value.toFixed(2)}`;
        });
        
        context.fillText(pointLabel, canvas.width / 2, canvas.height / 2);
        
        const texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        
        const material = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(material);
        sprite.position.set(x, y, z + 0.3);
        sprite.scale.set(2, 0.5, 1);
        scene3D.add(sprite);
      }
      
      // 2D solution point (if in 2D)
      if (equations.length <= 3) {
        const point2DGeometry = new THREE.CircleGeometry(0.1, 32);
        const point2DMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const point2D = new THREE.Mesh(point2DGeometry, point2DMaterial);
        point2D.position.set(x, y, 0.1);
        scene2D.add(point2D);
        
        // Label for 2D
        const canvas2D = document.createElement('canvas');
        canvas2D.width = 256;
        canvas2D.height = 64;
        const context2D = canvas2D.getContext('2d');
        if (context2D) {
          context2D.fillStyle = 'white';
          context2D.fillRect(0, 0, canvas2D.width, canvas2D.height);
          context2D.font = 'bold 24px Arial';
          context2D.fillStyle = 'red';
          context2D.textAlign = 'center';
          context2D.textBaseline = 'middle';
          
          let pointLabel = `(${x.toFixed(2)}, ${y.toFixed(2)})`;
          
          context2D.fillText(pointLabel, canvas2D.width / 2, canvas2D.height / 2);
          
          const texture = new THREE.Texture(canvas2D);
          texture.needsUpdate = true;
          
          const material = new THREE.SpriteMaterial({ map: texture });
          const sprite = new THREE.Sprite(material);
          sprite.position.set(x, y + 0.5, 0.1);
          sprite.scale.set(2, 0.5, 1);
          scene2D.add(sprite);
        }
      }
    }
  }, [equations, solution, colors]);

  return (
    <div className="space-y-4">
      <Tabs defaultValue={viewMode} onValueChange={(value) => setViewMode(value as '3d' | '2d')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="3d">3D View</TabsTrigger>
          <TabsTrigger value="2d">2D View</TabsTrigger>
        </TabsList>
        <TabsContent value="3d" className="border rounded-lg p-2">
          <div 
            ref={container3DRef} 
            className="aspect-video bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden"
            style={{ height: '400px' }}
          />
        </TabsContent>
        <TabsContent value="2d" className="border rounded-lg p-2">
          <div 
            ref={container2DRef} 
            className="aspect-video bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden"
            style={{ height: '400px' }}
          />
        </TabsContent>
      </Tabs>

      <div className="flex justify-between">
        <div className="space-x-2">
          <Button variant="outline" onClick={() => {
            if (controlsRef.current) {
              controlsRef.current.reset();
            }
          }}>
            Reset View
          </Button>
          <Button variant="outline" onClick={() => {
            if (cameraRef.current) {
              // Toggle between top and perspective views
              if (cameraRef.current.position.y > 0) {
                cameraRef.current.position.set(0, 10, 0);
                cameraRef.current.lookAt(0, 0, 0);
              } else {
                cameraRef.current.position.set(5, 5, 5);
                cameraRef.current.lookAt(0, 0, 0);
              }
            }
          }}>
            Top View
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {equations.map((eq, i) => (
            <div 
              key={i} 
              className="text-sm rounded px-2 py-1 flex items-center" 
              style={{ backgroundColor: colors[i % colors.length] + '33', color: colors[i % colors.length] }}
            >
              {eq}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
