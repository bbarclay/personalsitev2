import React, { useState, useEffect, useCallback } from 'react';
import { LineChart, Line, ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Cpu, Activity, Layers, GitBranch } from 'lucide-react';

interface Patterns {
  goldbach: boolean;
  germain: boolean;
  circular: boolean;
  palindromic: boolean;
}

interface Config {
  maxNumber: number;
  modBase: number;
  rotationAngle: number;
  highlight: number | null;
  colorMode: 'pattern' | 'density' | 'gaps';
  patterns: Patterns;
}

const PrimeObservatory = () => {
  const [activeViews, setActiveViews] = useState<{ [key: string]: boolean }>({
    spiral: true,
    gaps: true,
    density: true,
    modulo: true
  });

  const [config, setConfig] = useState<Config>({
    maxNumber: 300,
    modBase: 30,  // For modular arithmetic view
    rotationAngle: 0,
    highlight: null,
    colorMode: 'pattern', // 'pattern', 'density', 'gaps'
    patterns: {
      goldbach: false,  // Goldbach conjecture pairs
      germain: false,   // Sophie Germain primes
      circular: false,  // Circular primes
      palindromic: false // Palindromic primes
    }
  });

  const [isAnimating, setIsAnimating] = useState(false);
  type PrimeData = {
    primes: { number: number; isCircular: boolean; isPalindromic: boolean; isGermain: boolean; hasGoldbach: boolean; }[];
    gaps: { prime: number; gap: number; position: number; }[];
    density: { number: number; density: number; position: number; }[];
    modulo: number[];
  };

  const [primeData, setPrimeData] = useState<PrimeData>({
    primes: [],
    gaps: [],
    density: [],
    modulo: []
  });

  // Enhanced prime checker with wheel factorization
  const isPrime = useCallback((n: number) => {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    for (let i = 5; i * i <= n; i += 6) {
      if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
  }, []);

  // Check if number is circular prime
  const isCircularPrime = useCallback((n: { toString: () => string; }) => {
    const rotations = [];
    const str = n.toString();
    for (let i = 0; i < str.length; i++) {
      rotations.push(parseInt(str.slice(i) + str.slice(0, i)));
    }
    return rotations.every(isPrime);
  }, [isPrime]);

  // Check if number is palindromic prime
  const isPalindromicPrime = useCallback((n: number) => {
    return isPrime(n) && n.toString() === n.toString().split('').reverse().join('');
  }, [isPrime]);

  // Check if number is Sophie Germain prime
  const isSophieGermainPrime = useCallback((n: number) => {
    return isPrime(n) && isPrime(2 * n + 1);
  }, [isPrime]);

  // Generate comprehensive prime data
  const generatePrimeData = useCallback(() => {
    const primes = [];
    const gaps = [];
    const density = [];
    const modulo = Array(config.modBase).fill(0);
    let lastPrime = 2;
    let primeCount = 0;

    for (let n = 2; n <= config.maxNumber; n++) {
      if (isPrime(n)) {
        primeCount++;

        // Basic prime data
        const primeData = {
          number: n,
          isCircular: isCircularPrime(n),
          isPalindromic: isPalindromicPrime(n),
          isGermain: isSophieGermainPrime(n),
          hasGoldbach: false, // Will be updated later
        };

        // Calculate gap from last prime
        const gap = n - lastPrime;
        gaps.push({
          prime: n,
          gap: gap,
          position: primes.length
        });

        // Calculate local density
        density.push({
          number: n,
          density: primeCount / n,
          position: primes.length
        });

        // Track modulo frequencies
        modulo[n % config.modBase]++;

        primes.push(primeData);
        lastPrime = n;
      }
    }

    // Check Goldbach conjecture (even numbers as sum of two primes)
    for (let i = 0; i < primes.length; i++) {
      for (let j = i; j < primes.length; j++) {
        const sum = primes[i].number + primes[j].number;
        if (sum <= config.maxNumber && sum % 2 === 0) {
          primes[i].hasGoldbach = true;
          primes[j].hasGoldbach = true;
        }
      }
    }

    return { primes, gaps, density, modulo };
  }, [config.maxNumber, config.modBase, isPrime, isCircularPrime, isPalindromicPrime, isSophieGermainPrime]);

  // Update data when configuration changes
  useEffect(() => {
    return setPrimeData(generatePrimeData());
  }, [config.maxNumber, config.modBase, generatePrimeData]);

  // Animation effect
  useEffect(() => {
    let animationFrame: number;
    if (isAnimating) {
      const animate = () => {
        setConfig(prev => ({
          ...prev,
          rotationAngle: prev.rotationAngle + 0.02
        }));
        animationFrame = requestAnimationFrame(animate);
      };
      animationFrame = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animationFrame);
  }, [isAnimating]);

  // Render spiral view
  const SpiralView = () => {
    const transformToSpiral = (p: { number: number; }, i: number) => {
      const angle = i * 0.5 + config.rotationAngle;
      const radius = Math.sqrt(p.number) * 2;
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        ...p
      };
    };

    const spiralData = primeData.primes.map((p, i) => ({
      ...transformToSpiral(p, i),
      fill: (() => {
        if (p.isCircular && config.patterns.circular) return '#f59e0b';
        if (p.isPalindromic && config.patterns.palindromic) return '#ec4899';
        if (p.isGermain && config.patterns.germain) return '#8b5cf6';
        if (p.hasGoldbach && config.patterns.goldbach) return '#10b981';
        return '#6b7280';
      })()
    }));

    return (
      <div className="bg-gray-900 p-4 rounded-lg">
        <h3 className="text-white mb-2">Prime Spiral</h3>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" />
            <YAxis dataKey="y" />
            <ZAxis dataKey="number" />
            <Tooltip content={({ payload }) => {
              if (!payload?.[0]?.payload) return null;
              const p = payload[0].payload;
              return (
                <div className="bg-white p-2 rounded shadow">
                  <div>Prime: {p.number}</div>
                  {p.isCircular && <div>Circular Prime</div>}
                  {p.isPalindromic && <div>Palindromic Prime</div>}
                  {p.isGermain && <div>Sophie Germain Prime</div>}
                  {p.hasGoldbach && <div>Part of Goldbach Pair</div>}
                </div>
              );
            }} />
            <Scatter
              data={spiralData}
              fill="#6b7280"
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    );
  };

  // Render gaps view
  const GapsView = () => (
    <div className="bg-gray-900 p-4 rounded-lg">
      <h3 className="text-white mb-2">Prime Gaps</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={primeData.gaps}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="position" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="gap" stroke="#f59e0b" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  // Render density view
  const DensityView = () => (
    <div className="bg-gray-900 p-4 rounded-lg">
      <h3 className="text-white mb-2">Prime Density</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={primeData.density}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="position" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="density" stroke="#8b5cf6" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  // Render modulo view
  const ModuloView = () => (
    <div className="bg-gray-900 p-4 rounded-lg">
      <h3 className="text-white mb-2">Modulo Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={primeData.modulo.map((count, i) => ({ modulo: i, count }))}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="modulo" />
          <YAxis />
          <Tooltip />
          <Line type="stepAfter" dataKey="count" stroke="#ec4899" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <div className="w-full p-4 bg-gray-800 text-white">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Prime Number Observatory</h2>

        {/* Controls */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <h3 className="font-semibold">View Controls</h3>
            {Object.entries({
              spiral: ['Spiral View', Cpu],
              gaps: ['Gap Analysis', Activity],
              density: ['Density Plot', Layers],
              modulo: ['Modulo Pattern', GitBranch]
            } as { [key in keyof typeof activeViews]: [string, React.ElementType] }).map(([key, value]) => {
              const [label, Icon] = value;
              return (
              <label key={key} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={activeViews[key]}
                  onChange={(e) => setActiveViews(v => ({...v, [key]: e.target.checked}))}
                  className="w-4 h-4"
                />
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </label>
              );
            })}
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Pattern Detection</h3>
            {Object.entries({
              circular: 'Circular Primes',
              palindromic: 'Palindromic Primes',
              germain: 'Sophie Germain Primes',
              goldbach: 'Goldbach Pairs'
            } as { [key in keyof typeof config.patterns]: string }).map(([key, label]) => (
              <label key={key} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={config.patterns[key as keyof typeof config.patterns]}
                onChange={(e) => setConfig(c => ({
                ...c,
                patterns: {...c.patterns, [key as keyof typeof config.patterns]: e.target.checked}
                }))}
                className="w-4 h-4"
              />
              <span>{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Animation Controls */}
        <div className="flex gap-4">
          <button
            onClick={() => setIsAnimating(!isAnimating)}
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
          >
            {isAnimating ? 'Stop Animation' : 'Start Animation'}
          </button>
          <input
            type="range"
            min="50"
            max="1000"
            value={config.maxNumber}
            onChange={(e) => setConfig(c => ({...c, maxNumber: parseInt(e.target.value)}))}
            className="w-48"
          />
          <span>Max Number: {config.maxNumber}</span>
        </div>
      </div>

      {/* Visualization Grid */}
      <div className="grid grid-cols-2 gap-4">
        {activeViews.spiral && <SpiralView />}
        {activeViews.gaps && <GapsView />}
        {activeViews.density && <DensityView />}
        {activeViews.modulo && <ModuloView />}
      </div>

      {/* Stats and Insights */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Prime Density</h3>
          <p>Total Primes: {primeData.primes.length}</p>
          <p>Density: {(primeData.primes.length / config.maxNumber * 100).toFixed(2)}%</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Special Primes</h3>
          <p>Circular: {primeData.primes.filter(p => p.isCircular).length}</p>
          <p>Palindromic: {primeData.primes.filter(p => p.isPalindromic).length}</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Patterns</h3>
          <p>Max Gap: {Math.max(...primeData.gaps.map(g => g.gap))}</p>
          <p>Germain Primes: {primeData.primes.filter(p => p.isGermain).length}</p>
        </div>
      </div>
    </div>
  );
};

export default PrimeObservatory;
