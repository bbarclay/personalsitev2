"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

// Create dynamic components at the module level
// Funky components
const FunkyCollatz = dynamic(() => import('@/app/designelements/components/funky/funkycollatz').then(mod => mod.default || mod), {
  ssr: false,
  loading: () => <LoadingCard />
});

const FunkyKnot = dynamic(() => import('@/app/designelements/components/funky/funkyknot').then(mod => mod.default || mod), {
  ssr: false,
  loading: () => <LoadingCard />
});

const FunkyGroup = dynamic(() => import('@/app/designelements/components/funky/funkygroup').then(mod => mod.default || mod), {
  ssr: false,
  loading: () => <LoadingCard />
});

const FunkyDynamical = dynamic(() => import('@/app/designelements/components/funky/funkydynamical').then(mod => mod.FunkyDynamicalCard || mod), {
  ssr: false,
  loading: () => <p>Loading FunkyDynamical...</p>
});

const QuantumFieldVisualizer = dynamic(() => import('@/app/designelements/components/funky/quantumFieldVisualizer').then(mod => mod.QuantumFieldVisualizerCard || mod), {
  ssr: false,
  loading: () => <p>Loading QuantumFieldVisualizer...</p>
});

const BioLuminescentOrb = dynamic(() => import('@/app/designelements/components/funky/bioLuminescentOrb').then(mod => mod.default || mod), {
  ssr: false,
  loading: () => <LoadingCard />
});

const CyberneticPulse = dynamic(() => import('@/app/designelements/components/funky/cyberneticPulse').then(mod => mod.CyberneticPulseCard || mod), {
  ssr: false,
  loading: () => <p>Loading CyberneticPulse...</p>
});

const PsychedelicPortal = dynamic(() => import('@/app/designelements/components/funky/psychedelicPortal').then(mod => mod.default || mod), {
  ssr: false,
  loading: () => <LoadingCard />
});

const Funky1 = dynamic(() => import('@/app/designelements/components/funky/funky1').then(mod => mod.default || mod), {
  ssr: false,
  loading: () => <LoadingCard />
});

const SuperFunky = dynamic(() => import('@/app/designelements/components/funky/superfunky').then(mod => mod.default || mod), {
  ssr: false,
  loading: () => <LoadingCard />
});

// Animated cards
const ChaosTheory = dynamic(() => import('@/app/designelements/components/math-cards/animated-cards/chaos-theory').then(mod => mod.ChaosTheory), {
  ssr: false,
  loading: () => <LoadingCard />
});

const WaveFunction = dynamic(() => import('@/app/designelements/components/math-cards/animated-cards/wave-function').then(mod => mod.WaveFunction), {
  ssr: false,
  loading: () => <LoadingCard />
});

const MandelbrotExplorer = dynamic(() => import('@/app/designelements/components/math-cards/animated-cards/mandelbrot-explorer').then(mod => mod.MandelbrotExplorer), {
  ssr: false,
  loading: () => <LoadingCard />
});

const CellularAutomata = dynamic(() => import('@/app/designelements/components/math-cards/animated-cards/cellular-automata').then(mod => mod.CellularAutomata), {
  ssr: false,
  loading: () => <LoadingCard />
});

const FourierTransform = dynamic(() => import('@/app/designelements/components/math-cards/animated-cards/fourier-transform').then(mod => mod.FourierTransform), {
  ssr: false,
  loading: () => <LoadingCard />
});

const FractalExplorer = dynamic(() => import('@/app/designelements/components/math-cards/animated-cards/fractal-explorer').then(mod => mod.FractalExplorer), {
  ssr: false,
  loading: () => <LoadingCard />
});

const ProjectiveGeometry = dynamic(() => import('@/app/designelements/components/math-cards/animated-cards/projective-geometry').then(mod => mod.ProjectiveGeometry), {
  ssr: false,
  loading: () => <LoadingCard />
});

const QuantumMechanics = dynamic(() => import('@/app/designelements/components/math-cards/animated-cards/quantum-mechanics').then(mod => mod.QuantumMechanics), {
  ssr: false,
  loading: () => <LoadingCard />
});

const TopologyExplorer = dynamic(() => import('@/app/designelements/components/math-cards/animated-cards/topology-explorer').then(mod => mod.TopologyExplorer), {
  ssr: false,
  loading: () => <LoadingCard />
});

const GraphTheory = dynamic(() => import('@/app/designelements/components/math-cards/animated-cards/graph-theory').then(mod => mod.GraphTheory), {
  ssr: false,
  loading: () => <LoadingCard />
});

const TaylorSeries = dynamic(() => import('@/app/designelements/components/math-cards/animated-cards/taylor-series').then(mod => mod.TaylorSeries), {
  ssr: false,
  loading: () => <LoadingCard />
});

const FibonacciSequence = dynamic(() => import('@/app/designelements/components/math-cards/animated-cards/fibonacci-sequence').then(mod => mod.FibonacciSequence), {
  ssr: false,
  loading: () => <LoadingCard />
});

const CollatzCard = dynamic(() => import('@/app/designelements/components/math-cards/animated-cards/collatz-card').then(mod => mod.CollatzCard), {
  ssr: false,
  loading: () => <LoadingCard />
});

// Basic cards
const SetTheory = dynamic(() => import('@/app/designelements/components/math-cards/basic-cards/set-theory').then(mod => mod.SetTheory), {
  ssr: false,
  loading: () => <LoadingCard />
});

const LinearAlgebra = dynamic(() => import('@/app/designelements/components/math-cards/basic-cards/linear-algebra').then(mod => mod.LinearAlgebra), {
  ssr: false,
  loading: () => <LoadingCard />
});

const NumberTheory = dynamic(() => import('@/app/designelements/components/math-cards/basic-cards/number-theory').then(mod => mod.NumberTheory), {
  ssr: false,
  loading: () => <LoadingCard />
});

const DifferentialEquations = dynamic(() => import('@/app/designelements/components/math-cards/basic-cards/differential-equations').then(mod => mod.DifferentialEquations), {
  ssr: false,
  loading: () => <LoadingCard />
});

const AbstractAlgebra = dynamic(() => import('@/app/designelements/components/math-cards/basic-cards/abstract-algebra').then(mod => mod.AbstractAlgebra), {
  ssr: false,
  loading: () => <LoadingCard />
});

const ComplexAnalysis = dynamic(() => import('@/app/designelements/components/math-cards/basic-cards/complex-analysis').then(mod => mod.ComplexAnalysis), {
  ssr: false,
  loading: () => <LoadingCard />
});

const OptimizationTheory = dynamic(() => import('@/app/designelements/components/math-cards/basic-cards/optimization-theory').then(mod => mod.OptimizationTheory), {
  ssr: false,
  loading: () => <LoadingCard />
});

const Topology = dynamic(() => import('@/app/designelements/components/math-cards/basic-cards/topology').then(mod => mod.Topology), {
  ssr: false,
  loading: () => <LoadingCard />
});

const Trigonometry = dynamic(() => import('@/app/designelements/components/math-cards/basic-cards/trigonometry').then(mod => mod.Trigonometry), {
  ssr: false,
  loading: () => <LoadingCard />
});

const GameTheory = dynamic(() => import('@/app/designelements/components/math-cards/basic-cards/game-theory').then(mod => mod.GameTheory), {
  ssr: false,
  loading: () => <LoadingCard />
});

const ProbabilityTheory = dynamic(() => import('@/app/designelements/components/math-cards/basic-cards/probability-theory').then(mod => mod.ProbabilityTheory), {
  ssr: false,
  loading: () => <LoadingCard />
});

const MandelbrotSet = dynamic(() => import('@/app/designelements/components/math-cards/basic-cards/mandelbrot-set').then(mod => mod.MandelbrotSet), {
  ssr: false,
  loading: () => <LoadingCard />
});

const RateOfChange = dynamic(() => import('@/app/designelements/components/math-cards/basic-cards/rate-of-change').then(mod => mod.RateOfChange), {
  ssr: false,
  loading: () => <LoadingCard />
});

const TaylorSeriesBasic = dynamic(() => import('@/app/designelements/components/math-cards/basic-cards/taylor-series-basic').then(mod => mod.TaylorSeriesBasic), {
  ssr: false,
  loading: () => <LoadingCard />
});

// Simple basic card component
const BasicCard = ({ title, description, color }: { title: string, description: string, color: string }) => {
  return (
    <div className={`w-full h-full rounded-xl p-8 flex flex-col justify-between ${color}`}>
      <div>
        <h3 className="text-4xl font-bold text-white mb-4">{title}</h3>
        <p className="text-lg text-white/80">{description}</p>
      </div>
      <div className="flex justify-end">
        <button className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium transition-all">
          Learn More
        </button>
      </div>
    </div>
  );
};

// Simple basic card component for loading state
const LoadingCard = () => (
  <div className="w-full h-full rounded-xl p-8 flex flex-col justify-between bg-slate-800 animate-pulse">
    <div>
      <div className="h-8 w-3/4 bg-slate-700 rounded mb-4"></div>
      <div className="h-4 w-full bg-slate-700 rounded"></div>
    </div>
    <div className="flex justify-end">
      <div className="h-10 w-24 bg-slate-700 rounded"></div>
    </div>
  </div>
);

export type CardProps = {
  id: string;
  folder: string;
}

export const MathCard: React.FC<CardProps> = ({ id, folder }) => {
  const [error, setError] = useState<string | null>(null);

  const getComponent = () => {
    switch (id) {
      // Funky components
      case 'funkycollatz':
        return <FunkyCollatz />;
      case 'funkyknot':
        return <FunkyKnot />;
      case 'funkygroup':
        return <FunkyGroup />;
      case 'funkydynamical':
        return <FunkyDynamical />;
      case 'quantumFieldVisualizer':
        return <QuantumFieldVisualizer />;
      case 'bioLuminescentOrb':
        return <BioLuminescentOrb />;
      case 'cyberneticPulse':
        return <CyberneticPulse />;
      case 'psychedelicPortal':
        return <PsychedelicPortal />;
      case 'funky1':
        return <Funky1 />;
      case 'superfunky':
        return <SuperFunky />;
      
      // Animated cards
      case 'chaosTheory':
        return <ChaosTheory />;
      case 'waveFunction':
        return <WaveFunction />;
      case 'mandelbrotExplorer':
        return <MandelbrotExplorer />;
      case 'cellularAutomata':
        return <CellularAutomata />;
      case 'fourierTransform':
        return <FourierTransform />;
      case 'fractalExplorer':
        return <FractalExplorer />;
      case 'projectiveGeometry':
        return <ProjectiveGeometry />;
      case 'quantumMechanics':
        return <QuantumMechanics />;
      case 'topologyExplorer':
        return <TopologyExplorer />;
      case 'graphTheory':
        return <GraphTheory />;
      case 'taylorSeries':
        return <TaylorSeries />;
      case 'fibonacciSequence':
        return <FibonacciSequence />;
      case 'collatzCard':
        return <CollatzCard />;
      
      // Basic cards
      case 'setTheory':
        return <SetTheory />;
      case 'linearAlgebra':
        return <LinearAlgebra />;
      case 'numberTheory':
        return <NumberTheory />;
      case 'differentialEquations':
        return <DifferentialEquations />;
      case 'abstractAlgebra':
        return <AbstractAlgebra />;
      case 'complexAnalysis':
        return <ComplexAnalysis />;
      case 'optimizationTheory':
        return <OptimizationTheory />;
      case 'topology':
        return <Topology />;
      case 'trigonometry':
        return <Trigonometry />;
      case 'gameTheory':
        return <GameTheory />;
      case 'probabilityTheory':
        return <ProbabilityTheory />;
      case 'mandelbrotSet':
        return <MandelbrotSet />;
      case 'rateOfChange':
        return <RateOfChange />;
      case 'taylorSeriesBasic':
        return <TaylorSeriesBasic />;
      
      default:
        setError(`Component ${id} not found`);
        return null;
    }
  };

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-900/80">
        <div className="text-white text-center">
          <h3 className="text-xl font-bold mb-2">Error Loading Component</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return getComponent() || <LoadingCard />;
};

export const MathCards = () => {
  const cards = [
    // Funky components
    {
      id: 'funkycollatz',
      folder: 'funky',
      title: "Collatz Conjecture",
      description: "Explore the fascinating sequence that continues to baffle mathematicians.",
      color: "bg-gradient-to-br from-emerald-900 to-teal-900"
    },
    {
      id: 'funkyknot',
      folder: 'funky',
      title: "Knot Theory",
      description: "Visualize mathematical knots and their properties.",
      color: "bg-gradient-to-br from-purple-900 to-violet-900"
    },
    {
      id: 'funkygroup',
      folder: 'funky',
      title: "Group Theory",
      description: "Explore the symmetries and transformations of mathematical groups.",
      color: "bg-gradient-to-br from-blue-900 to-indigo-900"
    },
    {
      id: 'funkydynamical',
      folder: 'funky',
      title: "Dynamical Systems",
      description: "Study the behavior of systems that evolve over time.",
      color: "bg-gradient-to-br from-red-900 to-orange-900"
    },
    {
      id: 'quantumFieldVisualizer',
      folder: 'funky',
      title: "Quantum Field",
      description: "Visualize the complex behavior of quantum fields.",
      color: "bg-gradient-to-br from-cyan-900 to-blue-900"
    },
    {
      id: 'bioLuminescentOrb',
      folder: 'funky',
      title: "Bio-Luminescent Orb",
      description: "Watch as mathematical patterns create living light.",
      color: "bg-gradient-to-br from-green-900 to-emerald-900"
    },
    {
      id: 'cyberneticPulse',
      folder: 'funky',
      title: "Cybernetic Pulse",
      description: "Experience the rhythm of digital mathematics.",
      color: "bg-gradient-to-br from-pink-900 to-rose-900"
    },
    {
      id: 'psychedelicPortal',
      folder: 'funky',
      title: "Psychedelic Portal",
      description: "Journey through mathematical dimensions.",
      color: "bg-gradient-to-br from-yellow-900 to-amber-900"
    },
    {
      id: 'funky1',
      folder: 'funky',
      title: "Mathematical Symphony",
      description: "A harmonious blend of numbers and patterns.",
      color: "bg-gradient-to-br from-indigo-900 to-purple-900"
    },
    {
      id: 'superfunky',
      folder: 'funky',
      title: "Super Funky",
      description: "The ultimate mathematical visualization experience.",
      color: "bg-gradient-to-br from-fuchsia-900 to-purple-900"
    },
    
    // Animated cards
    {
      id: 'chaosTheory',
      folder: 'animated-cards',
      title: "Chaos Theory",
      description: "Explore the butterfly effect and deterministic chaos.",
      color: "bg-gradient-to-br from-red-900 to-orange-900"
    },
    {
      id: 'waveFunction',
      folder: 'animated-cards',
      title: "Wave Function",
      description: "Visualize the complex behavior of wave functions.",
      color: "bg-gradient-to-br from-purple-900 to-pink-900"
    },
    {
      id: 'mandelbrotExplorer',
      folder: 'animated-cards',
      title: "Mandelbrot Explorer",
      description: "Explore the famous fractal pattern.",
      color: "bg-gradient-to-br from-teal-900 to-emerald-900"
    },
    {
      id: 'cellularAutomata',
      folder: 'animated-cards',
      title: "Cellular Automata",
      description: "Study the behavior of cellular automata.",
      color: "bg-gradient-to-br from-green-900 to-emerald-900"
    },
    {
      id: 'fourierTransform',
      folder: 'animated-cards',
      title: "Fourier Transform",
      description: "Study the mathematical transformation of signals.",
      color: "bg-gradient-to-br from-blue-900 to-indigo-900"
    },
    {
      id: 'fractalExplorer',
      folder: 'animated-cards',
      title: "Fractal Explorer",
      description: "Journey into the infinite complexity of fractals.",
      color: "bg-gradient-to-br from-purple-900 to-pink-900"
    },
    {
      id: 'projectiveGeometry',
      folder: 'animated-cards',
      title: "Projective Geometry",
      description: "Discover the beauty of geometric transformations.",
      color: "bg-gradient-to-br from-blue-900 to-indigo-900"
    },
    {
      id: 'quantumMechanics',
      folder: 'animated-cards',
      title: "Quantum Mechanics",
      description: "Visualize the strange world of quantum physics.",
      color: "bg-gradient-to-br from-green-900 to-emerald-900"
    },
    {
      id: 'topologyExplorer',
      folder: 'animated-cards',
      title: "Topology Explorer",
      description: "Study the properties of space and shape.",
      color: "bg-gradient-to-br from-yellow-900 to-amber-900"
    },
    {
      id: 'graphTheory',
      folder: 'animated-cards',
      title: "Graph Theory",
      description: "Explore networks and their properties.",
      color: "bg-gradient-to-br from-cyan-900 to-blue-900"
    },
    {
      id: 'taylorSeries',
      folder: 'animated-cards',
      title: "Taylor Series",
      description: "Approximate functions with infinite polynomials.",
      color: "bg-gradient-to-br from-pink-900 to-rose-900"
    },
    {
      id: 'fibonacciSequence',
      folder: 'animated-cards',
      title: "Fibonacci Sequence",
      description: "Discover the golden ratio in nature.",
      color: "bg-gradient-to-br from-orange-900 to-yellow-900"
    },
    {
      id: 'collatzCard',
      folder: 'animated-cards',
      title: "Collatz Card",
      description: "Another take on the famous conjecture.",
      color: "bg-gradient-to-br from-teal-900 to-emerald-900"
    },
    
    // Basic cards
    {
      id: 'setTheory',
      folder: 'basic-cards',
      title: "Set Theory",
      description: "The foundation of modern mathematics.",
      color: "bg-gradient-to-br from-indigo-900 to-purple-900"
    },
    {
      id: 'linearAlgebra',
      folder: 'basic-cards',
      title: "Linear Algebra",
      description: "Study vectors, matrices, and transformations.",
      color: "bg-gradient-to-br from-blue-900 to-cyan-900"
    },
    {
      id: 'numberTheory',
      folder: 'basic-cards',
      title: "Number Theory",
      description: "Explore the properties of numbers.",
      color: "bg-gradient-to-br from-green-900 to-teal-900"
    },
    {
      id: 'differentialEquations',
      folder: 'basic-cards',
      title: "Differential Equations",
      description: "Model change and motion in the universe.",
      color: "bg-gradient-to-br from-red-900 to-orange-900"
    },
    {
      id: 'abstractAlgebra',
      folder: 'basic-cards',
      title: "Abstract Algebra",
      description: "Study algebraic structures and their properties.",
      color: "bg-gradient-to-br from-purple-900 to-pink-900"
    },
    {
      id: 'complexAnalysis',
      folder: 'basic-cards',
      title: "Complex Analysis",
      description: "Explore functions of complex numbers.",
      color: "bg-gradient-to-br from-blue-900 to-indigo-900"
    },
    {
      id: 'optimizationTheory',
      folder: 'basic-cards',
      title: "Optimization Theory",
      description: "Find the best solutions to complex problems.",
      color: "bg-gradient-to-br from-green-900 to-emerald-900"
    },
    {
      id: 'topology',
      folder: 'basic-cards',
      title: "Topology",
      description: "Study the properties of space and shape.",
      color: "bg-gradient-to-br from-yellow-900 to-amber-900"
    },
    {
      id: 'trigonometry',
      folder: 'basic-cards',
      title: "Trigonometry",
      description: "Study triangles and periodic functions.",
      color: "bg-gradient-to-br from-cyan-900 to-blue-900"
    },
    {
      id: 'gameTheory',
      folder: 'basic-cards',
      title: "Game Theory",
      description: "Study strategic decision making.",
      color: "bg-gradient-to-br from-pink-900 to-rose-900"
    },
    {
      id: 'probabilityTheory',
      folder: 'basic-cards',
      title: "Probability Theory",
      description: "Study chance and uncertainty.",
      color: "bg-gradient-to-br from-orange-900 to-yellow-900"
    },
    {
      id: 'mandelbrotSet',
      folder: 'basic-cards',
      title: "Mandelbrot Set",
      description: "Explore the famous fractal pattern.",
      color: "bg-gradient-to-br from-teal-900 to-emerald-900"
    },
    {
      id: 'rateOfChange',
      folder: 'basic-cards',
      title: "Rate of Change",
      description: "Study how things change over time.",
      color: "bg-gradient-to-br from-indigo-900 to-purple-900"
    },
    {
      id: 'taylorSeriesBasic',
      folder: 'basic-cards',
      title: "Taylor Series",
      description: "Approximate functions with polynomials.",
      color: "bg-gradient-to-br from-blue-900 to-cyan-900"
    }
  ];

  return (
    <section className="w-full min-h-screen py-16 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white mb-4 tracking-tight">
            Mathematical Visualizations
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Explore advanced mathematical concepts through interactive visual representations.
          </p>
        </div>
        
        {/* Cards grid - one per row */}
        <div className="flex flex-col gap-8 max-w-5xl mx-auto">
          {cards.map((card, index) => (
            <motion.div
              key={`${card.folder}-${card.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl"
            >
              <MathCard id={card.id} folder={card.folder} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MathCards;
