import React from 'react';
import { motion } from 'framer-motion';

const AnimatedTriangle = ({ a, b }: { a: number; b: number }) => {
    const hypotenuse = Math.sqrt(a * a + b * b);
    const scale = 120 / Math.max(a, b, hypotenuse); // Scale to fit within SVG viewport
    
    // Calculate angles for labels
    const angleA = Math.atan(b / a) * (180 / Math.PI);
    const angleB = 90 - angleA;
    
    // Points for triangle vertices
    const pointO = { x: 60, y: 150 }; // Origin (0,0)
    const pointA = { x: 60, y: 150 - a * scale }; // Point (0,a)
    const pointB = { x: 60 + b * scale, y: 150 }; // Point (b,0)
    
    // Coordinate points for labels (a small offset for better display)
    const coordO = { x: pointO.x - 15, y: pointO.y + 15 };
    const coordA = { x: pointA.x - 15, y: pointA.y - 5 };
    const coordB = { x: pointB.x + 5, y: pointB.y + 15 };

    return (
        <div className="flex flex-col items-center">
            <div className="mb-2 text-center">
                <h3 className="text-lg font-medium mb-1">Triangle Visualization</h3>
                <p className="text-sm text-muted-foreground">
                    a = {a}, b = {b}, c ≈ {hypotenuse.toFixed(2)}
                </p>
            </div>
            
            <motion.svg 
                width="260" 
                height="220" 
                className="visualization" 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                viewBox="0 0 260 220"
            >
                {/* Coordinate grid (subtle) */}
                <motion.path
                    d={`M 40 30 L 40 170 L 220 170`}
                    stroke="hsl(var(--muted))"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                    fill="none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ delay: 0.2 }}
                />
                
                {/* Side A - Vertical */}
                <motion.line
                    x1={pointO.x}
                    y1={pointO.y}
                    x2={pointA.x}
                    y2={pointA.y}
                    stroke="hsl(var(--primary))"
                    strokeWidth="2.5"
                    initial={{ y2: pointO.y }}
                    animate={{ y2: pointA.y }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                />
                <motion.text 
                    x={pointO.x - 18} 
                    y={pointO.y - a * scale / 2} 
                    fill="hsl(var(--primary))" 
                    className="text-sm font-semibold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    a = {a}
                </motion.text>
                
                {/* Side B - Horizontal */}
                <motion.line
                    x1={pointO.x}
                    y1={pointO.y}
                    x2={pointB.x}
                    y2={pointB.y}
                    stroke="hsl(var(--destructive))"
                    strokeWidth="2.5"
                    initial={{ x2: pointO.x }}
                    animate={{ x2: pointB.x }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                />
                <motion.text 
                    x={pointO.x + b * scale / 2} 
                    y={pointO.y + 18} 
                    fill="hsl(var(--destructive))" 
                    className="text-sm font-semibold"
                    textAnchor="middle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    b = {b}
                </motion.text>
                
                {/* Hypotenuse */}
                <motion.line
                    x1={pointA.x}
                    y1={pointA.y}
                    x2={pointB.x}
                    y2={pointB.y}
                    stroke="hsl(var(--accent-foreground))"
                    strokeWidth="2.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                />
                <motion.text 
                    x={(pointA.x + pointB.x) / 2 + 10} 
                    y={(pointA.y + pointB.y) / 2 - 10} 
                    fill="hsl(var(--accent-foreground))" 
                    className="text-sm font-semibold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                >
                    c = {hypotenuse.toFixed(2)}
                </motion.text>
                
                {/* Right angle marker */}
                <motion.path
                    d={`M ${pointO.x} ${pointO.y - 15} L ${pointO.x} ${pointO.y} L ${pointO.x + 15} ${pointO.y}`}
                    stroke="hsl(var(--muted-foreground))"
                    strokeWidth="1.5"
                    fill="none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.0 }}
                />
                
                {/* Point coordinates */}
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
                    {/* Origin O */}
                    <circle cx={pointO.x} cy={pointO.y} r="3" fill="hsl(var(--muted-foreground))" />
                    <text x={coordO.x} y={coordO.y} className="text-[10px]" fill="hsl(var(--muted-foreground))">O(0,0)</text>
                    
                    {/* Point A */}
                    <circle cx={pointA.x} cy={pointA.y} r="3" fill="hsl(var(--primary))" />
                    <text x={coordA.x} y={coordA.y} className="text-[10px]" fill="hsl(var(--primary))">A(0,{a})</text>
                    
                    {/* Point B */}
                    <circle cx={pointB.x} cy={pointB.y} r="3" fill="hsl(var(--destructive))" />
                    <text x={coordB.x} y={coordB.y} className="text-[10px]" fill="hsl(var(--destructive))">B({b},0)</text>
                </motion.g>
                
                {/* Angle Labels */}
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}>
                    <text x={pointO.x + 18} y={pointO.y - 18} className="text-[10px]" fill="hsl(var(--muted-foreground))">90°</text>
                    <text x={pointA.x - 20} y={pointA.y + 15} className="text-[10px]" fill="hsl(var(--primary))">{angleB.toFixed(1)}°</text>
                    <text x={pointB.x - 20} y={pointB.y - 10} className="text-[10px]" fill="hsl(var(--destructive))">{angleA.toFixed(1)}°</text>
                </motion.g>
            </motion.svg>
            
            <div className="text-center text-xs text-muted-foreground mt-2">
                Theorem: a² + b² = c²
            </div>
        </div>
    );
};

export default AnimatedTriangle; 