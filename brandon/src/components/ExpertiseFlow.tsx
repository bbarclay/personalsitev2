'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { Brain, Code, Database, Network, Cloud, Lock, LineChart, Bot } from 'lucide-react';

const ExpertiseFlow = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme } = useTheme();

  // Add mounting state to avoid hydration mismatches
  useEffect(() => {
    setMounted(true);
  }, []);

  const expertise = [
    {
      id: 'ai',
      title: 'AI & ML',
      icon: <Brain className="w-8 h-8" />,
      skills: ['Neural Networks', 'Deep Learning', 'Computer Vision', 'NLP'],
      color: 'from-blue-500 to-indigo-500 dark:from-blue-400 dark:to-indigo-400'
    },
    {
      id: 'data',
      title: 'Data Engineering',
      icon: <Database className="w-8 h-8" />,
      skills: ['ETL Pipelines', 'Data Modeling', 'Big Data', 'Analytics'],
      color: 'from-emerald-500 to-green-500 dark:from-emerald-400 dark:to-green-400'
    },
    {
      id: 'cloud',
      title: 'Cloud & DevOps',
      icon: <Cloud className="w-8 h-8" />,
      skills: ['AWS', 'Docker', 'CI/CD', 'Microservices'],
      color: 'from-cyan-500 to-blue-500 dark:from-cyan-400 dark:to-blue-400'
    },
    {
      id: 'fullstack',
      title: 'Full Stack',
      icon: <Code className="w-8 h-8" />,
      skills: ['React', 'Node.js', 'TypeScript', 'Next.js', 'GraphQL', 'Python'],
      color: 'from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400'
    },
    {
      id: 'security',
      title: 'Security',
      icon: <Lock className="w-8 h-8" />,
      skills: ['Encryption', 'Auth', 'Security Best Practices'],
      color: 'from-red-500 to-orange-500 dark:from-red-400 dark:to-orange-400'
    }
  ];

  // Calculate positions based on viewport
  interface Position {
    x: number;
    y: number;
  }

  const calculatePosition = (index: number, total: number): Position => {
    if (!containerRef.current) return { x: 0, y: 0 };

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const radius = Math.min(rect.width, rect.height) * 0.35;

    // Calculate position in a circle, offset by -π/2 to start from top
    const angle = (index * 2 * Math.PI / total) - Math.PI / 2;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    };
  };

  useEffect(() => {
    // Use Intersection Observer for animations
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = theme === 'system' ? resolvedTheme : theme;

  return (
    <div
      className="relative min-h-[800px] w-full overflow-hidden"
      ref={containerRef}
    >
      {/* Flow lines using SVG for better performance */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {expertise.map((item, i) => {
          if (i === expertise.length - 1) return null;
          const start = calculatePosition(i, expertise.length);
          const end = calculatePosition(i + 1, expertise.length);

          return (
            <line
              key={`line-${i}`}
              x1={start.x}
              y1={start.y}
              x2={end.x}
              y2={end.y}
              className={`stroke-primary/20 transition-opacity duration-1000
                         ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              strokeWidth="2"
              strokeDasharray="5,5"
              style={{
                transitionDelay: `${i * 200}ms`
              }}
            />
          );
        })}
      </svg>

      {/* Expertise nodes */}
      {expertise.map((item, i) => {
        const position = calculatePosition(i, expertise.length);

        return (
          <div
            key={item.id}
            className={`absolute w-64 transform -translate-x-1/2 -translate-y-1/2
                       transition-all duration-700 ease-out
                       ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`,
              transitionDelay: `${i * 150}ms`
            }}
          >
            <div className="relative group">
              {/* Gradient background */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${item.color}
                           rounded-xl opacity-20 group-hover:opacity-30
                           transition-opacity duration-300 blur-xl`}
              />

              {/* Card content */}
              <div className={`relative bg-card border border-border rounded-xl p-6
                            backdrop-blur-sm group-hover:border-primary/50
                            transition-all duration-300
                            transform group-hover:scale-105 group-hover:shadow-lg
                            ${currentTheme === 'dark' ? 'shadow-lg shadow-primary/5' : 'shadow-md'}`}>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary
                                transform group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {item.title}
                  </h3>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-primary/10 text-primary
                               rounded-full text-sm
                               hover:bg-primary/20 transition-colors duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Background decoration - updated to properly support theme */}
      <div className={`absolute inset-0 ${currentTheme === 'dark'
        ? 'bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent)]'
        : 'bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.05),transparent)]'}`} />
    </div>
  );
};

export default ExpertiseFlow;
