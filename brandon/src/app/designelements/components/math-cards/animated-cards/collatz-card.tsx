"use client";

import React, { useEffect, useRef } from 'react';

export const CollatzCard = () => {
  const particlesRef = useRef<SVGSVGElement>(null);
  
  // Animation for the collatz path particles
  useEffect(() => {
    if (!particlesRef.current) return;
    
    // Create particles following collatz paths
    const createParticles = () => {
      const svg = particlesRef.current;
      if (!svg) return;
      
      // Clear existing particles
      const existingParticles = svg.querySelectorAll('.collatz-particle');
      existingParticles.forEach(p => p.remove());
      
      // Generate random starting numbers
      const startNumbers = [
        Math.floor(Math.random() * 20) + 5,
        Math.floor(Math.random() * 20) + 25,
        Math.floor(Math.random() * 20) + 45
      ];
      
      // Create particles for each starting number
      startNumbers.forEach((startNum, pathIndex) => {
        // Calculate collatz sequence
        const sequence = [startNum];
        let current = startNum;
        
        // Generate up to 15 steps of the sequence
        for (let i = 0; i < 15; i++) {
          if (current === 1) {
            // Loop between 4,2,1
            sequence.push(4, 2, 1);
            break;
          }
          
          current = current % 2 === 0 ? current / 2 : 3 * current + 1;
          sequence.push(current);
          
          if (sequence.length >= 15) break;
        }
        
        // Create a particle that will move along the path
        const particle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        particle.setAttribute('r', '3');
        particle.setAttribute('fill', pathIndex === 0 ? '#22d3ee' : pathIndex === 1 ? '#f472b6' : '#a78bfa');
        particle.classList.add('collatz-particle');
        
        // Add glow effect
        const glow = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
        const glowId = `glow-${pathIndex}`;
        glow.setAttribute('id', glowId);
        
        const feGaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
        feGaussianBlur.setAttribute('stdDeviation', '2.5');
        feGaussianBlur.setAttribute('result', 'coloredBlur');
        glow.appendChild(feGaussianBlur);
        
        const feMerge = document.createElementNS('http://www.w3.org/2000/svg', 'feMerge');
        const feMergeNode1 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
        feMergeNode1.setAttribute('in', 'coloredBlur');
        const feMergeNode2 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
        feMergeNode2.setAttribute('in', 'SourceGraphic');
        feMerge.appendChild(feMergeNode1);
        feMerge.appendChild(feMergeNode2);
        glow.appendChild(feMerge);
        
        svg.querySelector('defs')?.appendChild(glow);
        particle.setAttribute('filter', `url(#${glowId})`);
        
        svg.appendChild(particle);
        
        // Animate the particle along the path
        let step = 0;
        const animateParticle = () => {
          if (!svg.contains(particle)) return;
          
          const currentNum = sequence[step % sequence.length];
          // Map the value to coordinates
          const angle = (360 / 3) * pathIndex + (step * 12);
          const radius = 80 + (Math.log(currentNum) * 15);
          const x = 140 + radius * Math.cos((angle * Math.PI) / 180);
          const y = 140 + radius * Math.sin((angle * Math.PI) / 180);
          
          particle.setAttribute('cx', x.toString());
          particle.setAttribute('cy', y.toString());
          
          step++;
          requestAnimationFrame(animateParticle);
        };
        
        animateParticle();
      });
    };
    
    createParticles();
    const intervalId = setInterval(createParticles, 8000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <div className="relative w-full h-full">
      {/* Three connected circles visualization as a floating element */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="relative w-72 h-72 transform transition-all duration-500 hover:scale-105">
          <svg viewBox="0 0 280 280" className="w-full h-full" ref={particlesRef}>
            <defs>
              <radialGradient id="circle1Gradient" cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#0891b2" stopOpacity="0.2" />
              </radialGradient>
              <radialGradient id="circle2Gradient" cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5">
                <stop offset="0%" stopColor="#ec4899" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#db2777" stopOpacity="0.2" />
              </radialGradient>
              <radialGradient id="circle3Gradient" cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.2" />
              </radialGradient>
              
              <filter id="glow">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feFlood floodColor="#fff" floodOpacity="0.5" result="glow" />
                <feComposite in="glow" in2="blur" operator="in" result="softGlow" />
                <feComposite in="SourceGraphic" in2="softGlow" operator="over" />
              </filter>
            </defs>
            
            {/* The three main circles */}
            <circle cx="80" cy="80" r="70" fill="url(#circle1Gradient)" className="opacity-90" />
            <circle cx="200" cy="80" r="70" fill="url(#circle2Gradient)" className="opacity-90" />
            <circle cx="140" cy="190" r="70" fill="url(#circle3Gradient)" className="opacity-90" />
            
            {/* Connecting lines */}
            <line x1="80" y1="80" x2="200" y2="80" stroke="white" strokeWidth="2" strokeDasharray="4,4" className="opacity-70" />
            <line x1="80" y1="80" x2="140" y2="190" stroke="white" strokeWidth="2" strokeDasharray="4,4" className="opacity-70" />
            <line x1="200" y1="80" x2="140" y2="190" stroke="white" strokeWidth="2" strokeDasharray="4,4" className="opacity-70" />
            
            {/* Node points */}
            <circle cx="80" cy="80" r="6" fill="white" filter="url(#glow)" />
            <circle cx="200" cy="80" r="6" fill="white" filter="url(#glow)" />
            <circle cx="140" cy="190" r="6" fill="white" filter="url(#glow)" />
            
            {/* Small orbiting collatz particles will be added dynamically */}
          </svg>
          
          {/* Labels for each circle */}
          <div className="absolute left-10 top-16 text-center pointer-events-none">
            <div className="bg-cyan-800/80 backdrop-blur text-white px-3 py-1 rounded-lg text-sm">
              n → n/2 <br/>(when n is even)
            </div>
          </div>
          
          <div className="absolute right-10 top-16 text-center pointer-events-none">
            <div className="bg-pink-800/80 backdrop-blur text-white px-3 py-1 rounded-lg text-sm">
              n → 3n+1 <br/>(when n is odd)
            </div>
          </div>
          
          <div className="absolute left-1/2 -translate-x-1/2 bottom-5 text-center pointer-events-none">
            <div className="bg-purple-800/80 backdrop-blur text-white px-3 py-1 rounded-lg text-sm">
              Does every sequence <br/>eventually reach 1?
            </div>
          </div>
        </div>
      </div>
      
      {/* Card content with transparent/gradient background */}
      <div className="relative w-full h-full bg-gradient-to-br from-slate-900/60 to-gray-900/50 backdrop-blur rounded-2xl p-8 overflow-hidden flex flex-col justify-end z-0">
        <div className="mt-auto">
          <div className="inline-block px-6 py-2 bg-orange-800/80 backdrop-blur-sm rounded-full text-white font-bold mb-5 shadow-lg">
            MATHEMATICAL MYSTERY
          </div>
          
          <h2 className="text-4xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
            Collatz Conjecture
          </h2>
          
          <p className="text-orange-100 text-xl max-w-2xl mb-8 drop-shadow-md">
            Explore the famous unsolved problem: start with any positive integer n. If n is even, divide by 2. If n is odd, multiply by 3 and add 1. The conjecture: this sequence always reaches 1.
          </p>
          
          <div className="flex items-center gap-6">
            <button className="px-8 py-4 bg-white/80 backdrop-blur text-orange-700 rounded-xl font-bold text-xl hover:bg-white transform hover:-translate-y-1 transition-all shadow-lg">
              Investigate
            </button>
            
            <div className="flex items-center text-orange-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-xl">3n+1 Problem</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background animation */}
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl">
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-cyan-500/20 to-transparent rounded-full blur-2xl animate-blob"></div>
        <div className="absolute -bottom-8 -left-8 w-72 h-72 bg-gradient-to-tr from-pink-500/20 to-transparent rounded-full blur-2xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-purple-500/20 to-transparent rounded-full blur-2xl animate-blob animation-delay-4000"></div>
      </div>
    </div>
  );
};

const styles = `
  @keyframes blob {
    0% {
      transform: scale(1) translate(0px, 0px);
    }
    33% {
      transform: scale(1.1) translate(30px, -50px);
    }
    66% {
      transform: scale(0.9) translate(-20px, 20px);
    }
    100% {
      transform: scale(1) translate(0px, 0px);
    }
  }
  
  .animate-blob {
    animation: blob 15s infinite;
  }
  
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  
  .animation-delay-4000 {
    animation-delay: 4s;
  }
`; 