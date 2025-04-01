import { useEffect, useRef, useState } from 'react';

interface GlitchySequenceProps {
  sequence: number[];
}

const GlitchySequence = ({ sequence }: GlitchySequenceProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(3); // 1 = slow, 5 = fast
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayValue, setDisplayValue] = useState<string>('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Start/Stop animation
  useEffect(() => {
    if (!sequence || sequence.length === 0) return;

    if (isPlaying) {
      // Start the animation
      const animate = () => {
        setCurrentIndex(prevIndex => {
          const newIndex = (prevIndex + 1) % sequence.length;
          return newIndex;
        });

        // Schedule next frame based on speed
        const delay = 800 / speed;
        timeoutRef.current = setTimeout(animate, delay);
      };

      // Start animation immediately
      animate();
    } else {
      // Stop the animation
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [isPlaying, speed, sequence]);

  // Update display value with glitch effect
  useEffect(() => {
    if (!sequence || sequence.length === 0) return;

    const targetValue = sequence[currentIndex].toString();

    // Glitch effect: randomly reveal characters
    let iterations = 0;
    const maxIterations = 10;
    const iterationDelay = 30;

    const glitchInterval = setInterval(() => {
      iterations++;

      if (iterations >= maxIterations) {
        // Final display of the real value
        setDisplayValue(targetValue);
        clearInterval(glitchInterval);
        return;
      }

      // Create a glitched version
      let glitchedValue = '';

      for (let i = 0; i < targetValue.length; i++) {
        // Gradually reveal correct digits
        if (Math.random() < iterations / maxIterations) {
          glitchedValue += targetValue[i];
        } else {
          // Random character replacement
          const randomChar = Math.random() > 0.5 ?
            Math.floor(Math.random() * 10).toString() : // digit
            String.fromCharCode(Math.floor(Math.random() * 26) + 97); // letter

          glitchedValue += randomChar;
        }
      }

      setDisplayValue(glitchedValue);
    }, iterationDelay);

    return () => {
      clearInterval(glitchInterval);
    };
  }, [currentIndex, sequence]);

  // Value color based on odd/even
  const valueColor = sequence[currentIndex] % 2 === 0 ?
    'var(--cosmic-even-color)' :
    'var(--cosmic-odd-color)';

  // Determine if value increased or decreased
  let trendClass = '';
  if (currentIndex > 0) {
    const prevValue = sequence[currentIndex - 1];
    const currValue = sequence[currentIndex];

    if (currValue > prevValue) {
      trendClass = 'cosmic-value-increased';
    } else if (currValue < prevValue) {
      trendClass = 'cosmic-value-decreased';
    }
  }

  // Handle play/pause toggle
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Handle speed change
  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpeed(parseInt(e.target.value));
  };

  // Handle seeking
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newIndex = parseInt(e.target.value);
    setCurrentIndex(newIndex);
  };

  // Calculate orbit-like animation parameters
  const orbitAnimation = () => {
    const index = currentIndex;
    const maxValue = Math.max(...sequence);
    const currentValue = sequence[index];
    const progress = index / (sequence.length - 1);

    // Base colors on odd/even and value magnitude
    const hue = currentValue % 2 === 0 ? 210 : 330; // Blue for even, pink for odd
    const saturation = 80;
    const lightness = 50 + (currentValue / maxValue) * 30; // Brighter for higher values

    // Particle count based on current value (higher = more particles)
    const numParticles = Math.min(20, Math.max(5, Math.floor(currentValue / maxValue * 20)));

    // Generate particles
    const particles = [];
    for (let i = 0; i < numParticles; i++) {
      // Circular distribution with random variation
      const angle = (2 * Math.PI * i / numParticles) + (progress * Math.PI * 2);
      const distance = 100 + Math.sin(progress * Math.PI * 2 + i) * 20;

      // Calculate position on circle
      const left = 50 + Math.cos(angle) * distance / 2;
      const top = 50 + Math.sin(angle) * distance / 2;

      // Random size variation
      const size = 2 + Math.random() * 4;

      // Slight color variation
      const particleHue = hue + (Math.random() * 20 - 10);

      particles.push({
        id: i,
        style: {
          left: `${left}%`,
          top: `${top}%`,
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: `hsl(${particleHue}, ${saturation}%, ${lightness}%)`
        }
      });
    }

    return particles;
  };

  // Calculate particles for orbit visualization
  const particles = orbitAnimation();

  return (
    <div ref={containerRef} className="cosmic-glitchy-sequence">
      <div className="cosmic-orbit-visualization">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="cosmic-particle"
            style={particle.style}
          />
        ))}
        <div
          className="cosmic-orbit-center"
          style={{ backgroundColor: valueColor }}
        />
      </div>

      <div className="cosmic-value-display">
        <span
          className={`cosmic-current-value ${trendClass}`}
          style={{ color: valueColor }}
        >
          {displayValue}
        </span>
        <div className="cosmic-step-indicator">
          Step {currentIndex + 1} of {sequence.length}
        </div>
      </div>

      <div className="cosmic-animation-controls">
        <button
          className={`cosmic-button cosmic-control-button ${isPlaying ? 'cosmic-pause' : 'cosmic-play'}`}
          onClick={togglePlay}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>

        <input
          type="range"
          min="0"
          max={sequence.length - 1}
          value={currentIndex}
          onChange={handleSeek}
          className="cosmic-seek-bar"
        />

        <div className="cosmic-speed-control">
          <span>Speed</span>
          <input
            type="range"
            min="1"
            max="5"
            value={speed}
            onChange={handleSpeedChange}
            className="cosmic-speed-slider"
          />
        </div>
      </div>

      <div className="cosmic-sequence-info">
        {currentIndex > 0 && (
          <div className="cosmic-trend-info">
            {sequence[currentIndex] > sequence[currentIndex - 1] ? (
              <span className="cosmic-increase">
                +{(sequence[currentIndex] - sequence[currentIndex - 1]).toLocaleString()}
              </span>
            ) : (
              <span className="cosmic-decrease">
                {(sequence[currentIndex] - sequence[currentIndex - 1]).toLocaleString()}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GlitchySequence;
