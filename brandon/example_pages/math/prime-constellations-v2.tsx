import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Camera,
  Eye,
  EyeOff,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from 'lucide-react';

type Config = {
  maxNumber: number;
  viewMode: '2d' | '3d';
  showLines: boolean;
  zoom: number;
  rotationAngle: number;
  animationSpeed: number;
  patterns: {
    triplets: boolean;
    quadruplets: boolean;
    fibonacci: boolean;
    sexy: boolean; // primes that differ by 6
    cousin: boolean; // primes that differ by 4
  };
  highlighted: number | null;
};

type PrimeCoordinate = {
  number: number;
  x: number;
  y: number;
  isFibPrime: boolean;
  isTriple: boolean;
  isQuad: boolean;
  isSexy: boolean;
  isCousin: boolean;
  radius: number;
  svgX: number;
  svgY: number;
};

type Connection = {
  from: PrimeCoordinate;
  to: PrimeCoordinate;
  type: string;
};

const PrimeConstellations: React.FC = () => {
  const [config, setConfig] = useState<Config>({
    maxNumber: 200,
    viewMode: '2d',
    showLines: false,
    zoom: 1,
    rotationAngle: 0,
    animationSpeed: 1,
    patterns: {
      triplets: false,
      quadruplets: false,
      fibonacci: false,
      sexy: false, // primes that differ by 6
      cousin: false, // primes that differ by 4
    },
    highlighted: null,
  });

  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // Enhanced prime checker with memoization
  const primeCache = useMemo(() => new Map<number, boolean>(), []);
  const isPrime = useCallback((num: number): boolean => {
    if (primeCache.has(num)) {
      const cachedValue = primeCache.get(num);
      if (cachedValue !== undefined) return cachedValue;
    }
    if (num <= 1) {
      primeCache.set(num, false);
      return false;
    }
    if (num <= 3) {
      primeCache.set(num, true);
      return true;
    }
    if (num % 2 === 0 || num % 3 === 0) {
      primeCache.set(num, false);
      return false;
    }
    for (let i = 5; i * i <= num; i += 6) {
      if (num % i === 0 || num % (i + 2) === 0) {
        primeCache.set(num, false);
        return false;
      }
    }
    primeCache.set(num, true);
    return true;
  }, [primeCache]);

  // Generate Fibonacci numbers
  const fibonacciNumbers = useCallback((max: number): number[] => {
    const fibs = [1, 2];
    while (fibs[fibs.length - 1] < max) {
      fibs.push(fibs[fibs.length - 1] + fibs[fibs.length - 2]);
    }
    return fibs;
  }, []);

  // Enhanced coordinate generation with more patterns
  const generatePrimeCoordinates = useCallback((): PrimeCoordinate[] => {
    const coords: PrimeCoordinate[] = [];
    const fibs = fibonacciNumbers(config.maxNumber);
    const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // Golden angle in radians

    for (let n = 2; n <= config.maxNumber; n++) {
      if (isPrime(n)) {
        let x: number, y: number;
        const angle = n * goldenAngle + config.rotationAngle;

        if (config.viewMode === '2d') {
          const radius = Math.pow(n, 0.6) * config.zoom; // Adjusted growth rate
          x = Math.cos(angle) * radius * 15;
          y = Math.sin(angle) * radius * 15;
        } else {
          // 3D-like projection
          const radius = Math.pow(n, 0.5) * config.zoom;
          const height = Math.sin(n * 0.1) * 50;
          x = Math.cos(angle) * radius * 20;
          y = Math.sin(angle) * radius * 20 + height;
        }

        coords.push({
          number: n,
          x,
          y,
          isFibPrime: fibs.includes(n),
          isTriple: isPrime(n - 2) && isPrime(n + 2),
          isQuad:
            isPrime(n - 2) &&
            isPrime(n + 2) &&
            (isPrime(n - 4) || isPrime(n + 4)),
          isSexy: isPrime(n + 6) || isPrime(n - 6),
          isCousin: isPrime(n + 4) || isPrime(n - 4),
          radius: isPrime(n * 2 - 1) ? 6 : 4, // Larger radius for special primes
          svgX: 0,
          svgY: 0,
        });
      }
    }
    return coords;
  }, [
    config.maxNumber,
    config.viewMode,
    config.zoom,
    config.rotationAngle,
    isPrime,
    fibonacciNumbers,
  ]);

  // Animation effect
  useEffect(() => {
    let animationFrame: number | null = null;
    if (isAnimating) {
      const animate = () => {
        setConfig((prev) => ({
          ...prev,
          rotationAngle: prev.rotationAngle + 0.01 * prev.animationSpeed,
        }));
        animationFrame = requestAnimationFrame(animate);
      };
      animationFrame = requestAnimationFrame(animate);
    }
    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [isAnimating, config.animationSpeed]);

  const primeCoords = generatePrimeCoordinates();

  // Enhanced connection generation
  const getConnections = useCallback((): Connection[] => {
    if (!config.showLines) return [];
    const connections: Connection[] = [];
    const { patterns } = config;

    for (let i = 0; i < primeCoords.length - 1; i++) {
      for (let j = i + 1; j < primeCoords.length; j++) {
        const p1 = primeCoords[i];
        const p2 = primeCoords[j];
        const diff = Math.abs(p2.number - p1.number);

        if (
          patterns.triplets &&
          p1.isTriple &&
          p2.isTriple &&
          diff <= 6
        ) {
          connections.push({ from: p1, to: p2, type: 'triplet' });
        }
        if (
          patterns.quadruplets &&
          p1.isQuad &&
          p2.isQuad &&
          diff <= 8
        ) {
          connections.push({ from: p1, to: p2, type: 'quad' });
        }
        if (patterns.fibonacci && p1.isFibPrime && p2.isFibPrime) {
          connections.push({ from: p1, to: p2, type: 'fibonacci' });
        }
        if (patterns.sexy && diff === 6) {
          connections.push({ from: p1, to: p2, type: 'sexy' });
        }
        if (patterns.cousin && diff === 4) {
          connections.push({ from: p1, to: p2, type: 'cousin' });
        }
      }
    }
    return connections;
  }, [config, primeCoords]);

  // Transform coordinates for SVG space
  const transformCoords = useCallback(
    (coords: PrimeCoordinate[]): PrimeCoordinate[] => {
      const margin = 50;
      const width = 800;
      const height = 600;

      const xVals = coords.map((p) => p.x);
      const yVals = coords.map((p) => p.y);
      const xMin = Math.min(...xVals);
      const xMax = Math.max(...xVals);
      const yMin = Math.min(...yVals);
      const yMax = Math.max(...yVals);

      const xScale = (width - 2 * margin) / (xMax - xMin);
      const yScale = (height - 2 * margin) / (yMax - yMin);
      const scale = Math.min(xScale, yScale);

      return coords.map((p) => ({
        ...p,
        svgX: (p.x - xMin) * scale + margin,
        svgY: (p.y - yMin) * scale + margin,
      }));
    },
    []
  );

  const connections = getConnections();
  const transformedCoords = transformCoords(primeCoords);

  // Get color based on prime properties
  const getPrimeColor = (p: PrimeCoordinate): string => {
    if (config.highlighted === p.number) return '#f472b6'; // Pink highlight
    if (p.isFibPrime && config.patterns.fibonacci) return '#22c55e';
    if (p.isQuad && config.patterns.quadruplets) return '#3b82f6';
    if (p.isTriple && config.patterns.triplets) return '#ef4444';
    if (p.isSexy && config.patterns.sexy) return '#8b5cf6';
    if (p.isCousin && config.patterns.cousin) return '#f59e0b';
    return '#6b7280';
  };

  return (
    <div className="w-full p-4">
      <div className="flex flex-col gap-4 mb-4">
        <h2 className="text-xl font-bold">Prime Constellation Explorer v2.0</h2>

        {/* Control Panel */}
        <div className="flex flex-wrap gap-4 bg-gray-100 p-4 rounded-lg">
          {/* View Controls */}
          <div className="flex gap-2">
            <button
              onClick={() =>
                setConfig((c) => ({
                  ...c,
                  viewMode: c.viewMode === '2d' ? '3d' : '2d',
                }))
              }
              className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              <Camera className="w-4 h-4" />
              {config.viewMode === '2d' ? '3D' : '2D'}
            </button>

            <button
              onClick={() => setConfig((c) => ({ ...c, showLines: !c.showLines }))}
              className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              {config.showLines ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
              Lines
            </button>

            <button
              onClick={() => setIsAnimating(!isAnimating)}
              className="flex items-center gap-2 px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              <RotateCcw className="w-4 h-4" />
              {isAnimating ? 'Stop' : 'Rotate'}
            </button>
          </div>

          {/* Zoom Controls */}
          <div className="flex gap-2">
            <button
              onClick={() => setConfig((c) => ({ ...c, zoom: c.zoom * 1.2 }))}
              className="flex items-center gap-2 px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setConfig((c) => ({ ...c, zoom: c.zoom / 1.2 }))}
              className="flex items-center gap-2 px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
          </div>

          {/* Pattern Toggles */}
          <div className="flex flex-wrap gap-4">
            {Object.entries({
              triplets: 'Prime Triplets',
              quadruplets: 'Prime Quadruplets',
              fibonacci: 'Fibonacci Primes',
              sexy: 'Sexy Primes (p, p+6)',
              cousin: 'Cousin Primes (p, p+4)',
            }).map(([key, label]) => (
              <label
                key={key}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={
                    config.patterns[key as keyof Config['patterns']]
                  }
                  onChange={(e) =>
                    setConfig((c) => ({
                      ...c,
                      patterns: {
                        ...c.patterns,
                        [key]: e.target.checked,
                      },
                    }))
                  }
                  className="w-4 h-4"
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Visualization */}
      <svg
        width="800"
        height="600"
        className="bg-gray-50 rounded-lg shadow-inner"
        onMouseLeave={() => setConfig((c) => ({ ...c, highlighted: null }))}
      >
        {/* Connections */}
        {connections.map((conn, i) => (
          <line
            key={`conn-${i}`}
            x1={conn.from.svgX}
            y1={conn.from.svgY}
            x2={conn.to.svgX}
            y2={conn.to.svgY}
            stroke={
              conn.type === 'triplet'
                ? '#ef4444'
                : conn.type === 'quad'
                ? '#3b82f6'
                : conn.type === 'fibonacci'
                ? '#22c55e'
                : conn.type === 'sexy'
                ? '#8b5cf6'
                : '#f59e0b'
            }
            strokeWidth="0.5"
            opacity="0.3"
          />
        ))}

        {/* Prime Points */}
        {transformedCoords.map((p) => (
          <g key={p.number}>
            <circle
              cx={p.svgX}
              cy={p.svgY}
              r={p.radius}
              fill={getPrimeColor(p)}
              className="transition-all duration-300 cursor-pointer"
              onMouseEnter={() =>
                setConfig((c) => ({ ...c, highlighted: p.number }))
              }
              onClick={() =>
                setConfig((c) => ({
                  ...c,
                  highlighted: c.highlighted === p.number ? null : p.number,
                }))
              }
            >
              <title>{`Prime: ${p.number}`}</title>
            </circle>
          </g>
        ))}
      </svg>

      {/* Legend and Info */}
      <div className="mt-4 text-sm">
        <h3 className="font-bold mb-2">Interactive Features:</h3>
        <ul className="list-disc pl-5 grid grid-cols-2 gap-2">
          <li>Hover over points to highlight prime numbers</li>
          <li>Click points to lock/unlock highlighting</li>
          <li>Toggle different prime patterns using checkboxes</li>
          <li>Use zoom controls to explore different scales</li>
          <li>Animate the visualization with the rotate button</li>
          <li>Switch between 2D and 3D views for different perspectives</li>
        </ul>
      </div>
    </div>
  );
};

export default PrimeConstellations;
