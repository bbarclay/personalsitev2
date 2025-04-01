import React, { useState, useEffect, useRef } from 'react';
import SuperFunkyCollatzCard from './funkycollatz';
import SuperFunkyPAdicCard from './superfunky';

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
}

const FunkyMathdesignelements = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | undefined>(undefined);
  
  // Handle scroll navigation
  const scrollToSection = (index: number) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveSection(index);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };
  
  // Draw funky background
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      if (!container || !canvas) return;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const particles: Point[] = [];
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        color: `hsla(${Math.random() * 360}, 70%, 50%, 0.5)`,
        size: 2 + Math.random() * 3
      });
    }

    const updateParticle = (particle: Point) => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Bounce off edges
      if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

      // Keep particles in bounds
      particle.x = Math.max(0, Math.min(canvas.width, particle.x));
      particle.y = Math.max(0, Math.min(canvas.height, particle.y));
    };

    const drawParticle = (particle: Point) => {
      if (!ctx) return;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
    };

    const animate = (time: number) => {
      if (!ctx || !canvas) return;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(particle => {
        updateParticle(particle);
        drawParticle(particle);
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);
  
  return (
    <div ref={containerRef} className="min-h-screen bg-slate-900 w-full overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-white text-2xl font-bold">FUNKY MATH</span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <button
                    onClick={() => scrollToSection(0)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeSection === 0 
                      ? 'bg-gray-900 text-white' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    Intro
                  </button>
                  <button
                    onClick={() => scrollToSection(1)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeSection === 1 
                      ? 'bg-red-900 text-white' 
                      : 'text-gray-300 hover:bg-red-900/50 hover:text-white'
                    }`}
                  >
                    Collatz
                  </button>
                  <button
                    onClick={() => scrollToSection(2)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeSection === 2 
                      ? 'bg-teal-900 text-white' 
                      : 'text-gray-300 hover:bg-teal-900/50 hover:text-white'
                    }`}
                  >
                    P-adic
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Scrolling Container */}
      <div 
        className="snap-y snap-mandatory h-screen overflow-y-scroll"
        style={{
          scrollSnapType: 'y mandatory',
          scrollBehavior: 'smooth',
          scrollbarWidth: 'none', // Firefox
        }}
      >
        {/* Intro Section */}
        <section 
          id="intro" 
          className="h-screen w-full flex items-center justify-center snap-start bg-transparent"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-8xl font-extrabold tracking-tight mb-12">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-teal-500 animate-gradient-x">
                FUNKY MATH
              </span>
            </h1>
            <p className="text-2xl text-slate-300 max-w-3xl mx-auto mb-12">
              Explore mind-bending mathematical concepts through wild, interactive visualizations
            </p>
            
            <div className="flex flex-wrap justify-center gap-8 mt-10">
              {/* Card Previews */}
              <div 
                onClick={() => scrollToSection(1)}
                className="w-64 h-64 bg-gradient-to-br from-red-900 to-orange-700 rounded-lg shadow-xl transform hover:scale-105 transition-transform cursor-pointer overflow-hidden"
              >
                <div className="h-full w-full p-6 flex flex-col justify-between">
                  <h3 className="text-2xl font-bold text-white">Collatz Conjecture</h3>
                  <div className="flex items-center justify-center h-32">
                    <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center text-white text-3xl font-bold animate-bounce">
                      3n+1
                    </div>
                  </div>
                  <div className="text-white text-sm">The Mathematical Pinball</div>
                </div>
              </div>
              
              <div 
                onClick={() => scrollToSection(2)}
                className="w-64 h-64 bg-gradient-to-br from-teal-900 to-green-700 rounded-lg shadow-xl transform hover:scale-105 transition-transform cursor-pointer overflow-hidden"
              >
                <div className="h-full w-full p-6 flex flex-col justify-between">
                  <h3 className="text-2xl font-bold text-white">P-adic Numbers</h3>
                  <div className="flex items-center justify-center h-32">
                    <div className="h-24 w-24 text-4xl text-teal-300 font-bold relative flex items-center justify-center">
                      <div className="absolute animate-ping-slow opacity-70">|·|p</div>
                      <div>|·|p</div>
                    </div>
                  </div>
                  <div className="text-white text-sm">Space-Folding Numbers</div>
                </div>
              </div>
            </div>
            
            <div className="mt-16 animate-bounce">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </section>

        {/* Collatz Section */}
        <section 
          id="collatz" 
          className="h-screen w-full flex items-center justify-center snap-start bg-transparent"
        >
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
            <SuperFunkyCollatzCard />
          </div>
        </section>

        {/* P-adic Section */}
        <section 
          id="p-adic" 
          className="h-screen w-full flex items-center justify-center snap-start bg-transparent"
        >
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
            <SuperFunkyPAdicCard />
          </div>
        </section>
      </div>
      
      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        ::-webkit-scrollbar {
          display: none;
        }
        
        @keyframes gradient-x {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 15s ease infinite;
        }
        
        .animate-spin-slow {
          animation: spin 15s linear infinite;
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-ping-slow {
          animation: ping 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        @keyframes ping {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default FunkyMathdesignelements;