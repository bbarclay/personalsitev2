"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from 'react';

// Import all card components
// Animated cards
import { TaylorSeries } from './animated-cards/taylor-series';
import { CollatzCard } from './animated-cards/collatz-card';
import { FibonacciSequence } from './animated-cards/fibonacci-sequence';
import { GraphTheory } from './animated-cards/graph-theory';
import { TopologyExplorer } from './animated-cards/topology-explorer';
import { QuantumMechanics } from './animated-cards/quantum-mechanics';
import { ChaosTheory } from './animated-cards/chaos-theory';
import { WaveFunction } from './animated-cards/wave-function';
import { MandelbrotExplorer } from './animated-cards/mandelbrot-explorer';
import { CellularAutomata } from './animated-cards/cellular-automata';
import { FourierTransform } from './animated-cards/fourier-transform';

// Basic cards
import { TaylorSeriesBasic } from './basic-cards/taylor-series-basic';
import { RateOfChange } from './basic-cards/rate-of-change';
import { MandelbrotSet } from './basic-cards/mandelbrot-set';
import { ComplexAnalysis } from './basic-cards/complex-analysis';
import { AbstractAlgebra } from './basic-cards/abstract-algebra';
import { OptimizationTheory } from './basic-cards/optimization-theory';
import { DifferentialEquations } from './basic-cards/differential-equations';
import { NumberTheory } from './basic-cards/number-theory';
import { SetTheory } from './basic-cards/set-theory';
import { LinearAlgebra } from './basic-cards/linear-algebra';

// Original cards (for reference)
import { HermitesProblem } from './hermites-problem';
import { RiemannHypothesis } from './riemann-hypothesis';

export const MathCardsShowcase = () => {
  const [showAnimated, setShowAnimated] = useState(true);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Avoid hydration mismatch
  }

  const isDark = theme === "dark";

  return (
    <div className="bg-background">
      {/* Controls */}
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => setShowAnimated(!showAnimated)}
            className="px-4 py-2 rounded-lg bg-muted text-foreground hover:bg-muted/80"
          >
            {showAnimated ? 'Show Basic Cards' : 'Show Animated Cards'}
          </button>
        </div>
      </div>
      
      {/* Cards Container */}
      <div className="container mx-auto p-6 space-y-24">
        {showAnimated ? (
          <>
            <h2 className="text-2xl font-bold mb-6 text-foreground">
              Animated Crystal-style Cards
            </h2>
            
            {/* Chaos Theory Card */}
            <div className="mb-12">
              <h3 className="text-xl mb-4 text-muted-foreground">Chaos Theory</h3>
              <div className="h-[600px]">
                <ChaosTheory />
              </div>
            </div>
            
            {/* Wave Function Card */}
            <div className="mb-12">
              <h3 className="text-xl mb-4 text-muted-foreground">Wave Function</h3>
              <div className="h-[600px]">
                <WaveFunction />
              </div>
            </div>
            
            {/* Mandelbrot Explorer Card */}
            <div className="mb-12">
              <h3 className="text-xl mb-4 text-muted-foreground">Mandelbrot Explorer</h3>
              <div className="h-[600px]">
                <MandelbrotExplorer />
              </div>
            </div>
            
            {/* Cellular Automata Card */}
            <div className="mb-12">
              <h3 className="text-xl mb-4 text-muted-foreground">Cellular Automata</h3>
              <div className="h-[600px]">
                <CellularAutomata />
              </div>
            </div>
            
            {/* Fourier Transform Card */}
            <div className="mb-12">
              <h3 className="text-xl mb-4 text-muted-foreground">Fourier Transform</h3>
              <div className="h-[600px]">
                <FourierTransform />
              </div>
            </div>
            
            {/* Graph Theory Card (New Glass Design) */}
            <div className="mb-12">
              <h3 className="text-xl mb-4 text-muted-foreground">Graph Theory (Glass Design)</h3>
              <div className="h-[600px]">
                <GraphTheory />
              </div>
            </div>
            
            {/* Topology Explorer Card (3D Design) */}
            <div className="mb-12">
              <h3 className="text-xl mb-4 text-muted-foreground">Topology Explorer (3D Design)</h3>
              <div className="h-[600px]">
                <TopologyExplorer />
              </div>
            </div>
            
            {/* Quantum Mechanics Card (Particle System) */}
            <div className="mb-12">
              <h3 className="text-xl mb-4 text-muted-foreground">Quantum Mechanics (Particle System)</h3>
              <div className="h-[600px]">
                <QuantumMechanics />
              </div>
            </div>

            {/* Taylor Series Card (Crystal Style) */}
            <div className="mb-12">
              <h3 className="text-xl mb-4 text-muted-foreground">Taylor Series (Crystal Style)</h3>
              <div className="h-[600px]">
                <TaylorSeries />
              </div>
            </div>

            {/* Fibonacci Sequence Card (Golden Spiral) */}
            <div className="mb-12">
              <h3 className="text-xl mb-4 text-muted-foreground">Fibonacci Sequence (Golden Spiral)</h3>
              <div className="h-[600px]">
                <FibonacciSequence />
              </div>
            </div>

            {/* Collatz Conjecture Card (Floating Circles) */}
            <div className="mb-12">
              <h3 className="text-xl mb-4 text-muted-foreground">Collatz Conjecture (Floating Circles)</h3>
              <div className="h-[600px]">
                <CollatzCard />
              </div>
            </div>

            {/* Hermite's Problem Card (Original Design) */}
            <div className="mb-12">
              <h3 className="text-xl mb-4 text-muted-foreground">Hermite's Problem (Original Design)</h3>
              <div className="h-[600px]">
                <HermitesProblem />
              </div>
            </div>

            {/* Riemann Hypothesis Card (Original Design) */}
            <div className="mb-12">
              <h3 className="text-xl mb-4 text-muted-foreground">Riemann Hypothesis (Original Design)</h3>
              <div className="h-[600px]">
                <RiemannHypothesis />
              </div>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6 text-foreground">
              Basic Card Designs
            </h2>
            
            {/* Complex Analysis Basic Card */}
            <div className="mb-12">
              <h3 className="text-xl mb-4 text-muted-foreground">Complex Analysis (Spiral Design)</h3>
              <ComplexAnalysis />
            </div>
            
            {/* Abstract Algebra Basic Card */}
            <div className="mb-12">
              <h3 className="text-xl mb-4 text-muted-foreground">Abstract Algebra (Lattice Pattern)</h3>
              <AbstractAlgebra />
            </div>
            
            {/* Optimization Theory Basic Card */}
            <div className="mb-12">
              <h3 className="text-xl mb-4 text-muted-foreground">Optimization Theory (Gradient Style)</h3>
              <OptimizationTheory />
            </div>
            
            {/* Taylor Series Basic Card */}
            <div className="mb-12">
              <h3 className="text-xl mb-4 text-muted-foreground">Taylor Series (Stepped Edge)</h3>
              <TaylorSeriesBasic />
            </div>
            
            {/* Rate of Change Basic Card */}
            <div className="mb-12">
              <h3 className="text-xl mb-4 text-muted-foreground">Rate of Change (Gear Edge)</h3>
              <RateOfChange />
            </div>
            
            {/* Mandelbrot Set Basic Card */}
            <div className="mb-12">
              <h3 className="text-xl mb-4 text-muted-foreground">Mandelbrot Set (Clipped Corners)</h3>
              <MandelbrotSet />
            </div>

            {/* Differential Equations Card (Wave Pattern) */}
            <div className="mb-12">
              <h3 className="text-xl mb-4 text-muted-foreground">Differential Equations (Wave Pattern)</h3>
              <DifferentialEquations />
            </div>

            {/* Number Theory Card (Geometric Pattern) */}
            <div className="mb-12">
              <h3 className="text-xl mb-4 text-muted-foreground">Number Theory (Geometric Pattern)</h3>
              <NumberTheory />
            </div>

            {/* Set Theory Card (Venn Diagram) */}
            <div className="mb-12">
              <h3 className="text-xl mb-4 text-muted-foreground">Set Theory (Venn Diagram)</h3>
              <SetTheory />
            </div>

            {/* Linear Algebra Card (Matrix Grid) */}
            <div className="mb-12">
              <h3 className="text-xl mb-4 text-muted-foreground">Linear Algebra (Matrix Grid)</h3>
              <LinearAlgebra />
            </div>
          </>
        )}
      </div>
      
      {/* Footer */}
      <footer className="container mx-auto p-6 border-t border-border">
        <div className="flex justify-between items-center">
          <p className="text-muted-foreground">Mathematical Concept Card Design Showcase</p>
          <div className="flex gap-4">
            <button 
              onClick={() => setShowAnimated(true)}
              className={`px-3 py-1 rounded ${
                showAnimated 
                  ? "bg-accent text-accent-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Animated
            </button>
            <button 
              onClick={() => setShowAnimated(false)}
              className={`px-3 py-1 rounded ${
                !showAnimated 
                  ? "bg-accent text-accent-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Basic
            </button>
          </div>
        </div>
      </footer>
      
      {/* Add keyframes for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes dash {
          to { stroke-dashoffset: 100; }
        }
      `}</style>
    </div>
  );
};

export default MathCardsShowcase; 
