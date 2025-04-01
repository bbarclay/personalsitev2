'use client'

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Brain, LineChart, Network } from 'lucide-react';

const FeaturedWork = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const projects = [
    {
      title: "Neural Network Visualizer",
      description: "Interactive deep learning architecture visualization",
      gradient: "from-blue-500/20 via-blue-500/10 to-transparent dark:from-blue-400/20 dark:via-blue-400/10 dark:to-transparent",
      icon: <Network className="w-6 h-6" />,
      link: "/math/neural-network-viz"
    },
    {
      title: "Machine Learning Explorer",
      description: "Visual exploration of ML algorithms and concepts",
      gradient: "from-purple-500/20 via-purple-500/10 to-transparent dark:from-purple-400/20 dark:via-purple-400/10 dark:to-transparent",
      icon: <Brain className="w-6 h-6" />,
      link: "/math/machine-learning"
    },
    {
      title: "Prime Numbers Lab",
      description: "Interactive visualization of prime number patterns",
      gradient: "from-emerald-500/20 via-emerald-500/10 to-transparent dark:from-emerald-400/20 dark:via-emerald-400/10 dark:to-transparent",
      icon: <LineChart className="w-6 h-6" />,
      link: "/math/prime-observatory"
    }
  ];

  if (!mounted) {
    return null;
  }

  return (
    <section className="mb-32">
      <motion.h2
        className="text-4xl font-bold mb-12 text-foreground text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Featured Work
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <Link href={project.link} key={project.title}>
            <motion.div
              className="relative group rounded-xl overflow-hidden h-full cursor-pointer"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
              <div className="relative p-8 backdrop-blur-sm bg-card/30 border border-border/50 rounded-xl
                          group-hover:border-primary/50 transition-all duration-500 h-full">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    {project.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
                </div>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex items-center text-primary">
                  <span className="mr-2">Explore</span>
                  <svg
                    className="w-4 h-4 transform translate-x-0 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedWork;
