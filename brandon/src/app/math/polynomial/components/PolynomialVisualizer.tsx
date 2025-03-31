"use client";

import React, { useEffect, useRef, useState } from 'react';
import { ComplexNumber, evaluateComplexPolynomial } from '../utils/polynomialUtils';
import { Polynomial } from '../types';

const PolynomialVisualizer = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [viewMode, setViewMode] = useState<'real' | 'imaginary' | 'absolute'>('absolute');
    const [polynomial, setPolynomial] = useState<Polynomial>({
        terms: [
            { coefficient: 1, exponent: 2 },
            { coefficient: 0, exponent: 1 },
            { coefficient: -1, exponent: 0 }
        ]
    });
    const [params, setParams] = useState({
        xMin: -2,
        xMax: 2,
        yMin: -2,
        yMax: 2,
        resolution: 200
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const { width, height } = canvas;
        ctx.clearRect(0, 0, width, height);

        // Map complex plane to canvas coordinates
        const mapX = (x: number) => 
            ((x - params.xMin) / (params.xMax - params.xMin)) * width;
        const mapY = (y: number) => 
            height - ((y - params.yMin) / (params.yMax - params.yMin)) * height;

        // Draw grid and axes
        drawGrid(ctx, width, height, mapX, mapY);

        // Draw polynomial visualization
        const dx = (params.xMax - params.xMin) / params.resolution;
        const dy = (params.yMax - params.yMin) / params.resolution;

        for (let i = 0; i < params.resolution; i++) {
            for (let j = 0; j < params.resolution; j++) {
                const x = params.xMin + i * dx;
                const y = params.yMin + j * dy;
                
                const z: ComplexNumber = { real: x, imaginary: y };
                const value = evaluateComplexPolynomial(polynomial, z);
                
                let colorValue: number;
                switch (viewMode) {
                    case 'real':
                        colorValue = value.real;
                        break;
                    case 'imaginary':
                        colorValue = value.imaginary;
                        break;
                    case 'absolute':
                    default:
                        colorValue = Math.sqrt(value.real**2 + value.imaginary**2);
                        break;
                }

                // Domain coloring
                const hue = (Math.atan2(value.imaginary, value.real) * 180 / Math.PI + 360) % 360;
                const lightness = 50 * Math.exp(-colorValue);
                ctx.fillStyle = `hsl(${hue}, 100%, ${lightness}%)`;
                
                const px = mapX(x);
                const py = mapY(y);
                ctx.fillRect(px, py, width/params.resolution, height/params.resolution);
            }
        }
    }, [viewMode, params, polynomial]);

    const drawGrid = (
        ctx: CanvasRenderingContext2D,
        width: number,
        height: number,
        mapX: (x: number) => number,
        mapY: (y: number) => number
    ) => {
        // Draw grid lines
        ctx.beginPath();
        ctx.strokeStyle = '#2222';
        ctx.lineWidth = 0.5;

        for (let x = Math.ceil(params.xMin); x <= params.xMax; x++) {
            ctx.moveTo(mapX(x), 0);
            ctx.lineTo(mapX(x), height);
        }

        for (let y = Math.ceil(params.yMin); y <= params.yMax; y++) {
            ctx.moveTo(0, mapY(y));
            ctx.lineTo(width, mapY(y));
        }
        
        ctx.stroke();

        // Draw axes
        ctx.beginPath();
        ctx.strokeStyle = '#666';
        ctx.lineWidth = 1;
        ctx.moveTo(mapX(0), 0);
        ctx.lineTo(mapX(0), height);
        ctx.moveTo(0, mapY(0));
        ctx.lineTo(width, mapY(0));
        ctx.stroke();
    };

    return (
        <div className="space-y-4">
            <div className="flex space-x-4 items-center">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        View Mode
                    </label>
                    <select
                        value={viewMode}
                        onChange={(e) => setViewMode(e.target.value as any)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    >
                        <option value="absolute">Absolute Value</option>
                        <option value="real">Real Part</option>
                        <option value="imaginary">Imaginary Part</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Resolution
                    </label>
                    <input
                        type="range"
                        min="50"
                        max="400"
                        value={params.resolution}
                        onChange={(e) => setParams({...params, resolution: +e.target.value})}
                        className="mt-1 w-32"
                    />
                </div>
            </div>

            <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                <canvas
                    ref={canvasRef}
                    width={800}
                    height={800}
                    className="w-full h-[600px] bg-white dark:bg-gray-900"
                />
            </div>
        </div>
    );
};

export default PolynomialVisualizer;