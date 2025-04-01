'use client'

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import technologies from '../../data/technologies.json';

const TechnologiesSection = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <section className="relative py-16 rounded-xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
      <div className="relative max-w-7xl mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center mb-16 text-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Built with Modern Technologies
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.entries(technologies).map(([category, techs], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-semibold text-foreground mb-4">{category}</h3>
              <div className="space-y-4">
                {techs.map((tech: any, techIndex: number) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (categoryIndex * 0.1) + (techIndex * 0.1) }}
                    whileHover={{ scale: 1.02 }}
                    className="relative group rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => tech.link && window.open(tech.link, '_blank')}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent
                                opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative flex items-start space-x-3 bg-card/30 backdrop-blur-sm p-4
                                border border-border/50 rounded-lg
                                group-hover:border-primary/50 transition-colors duration-500">
                      <span className="text-2xl" role="img" aria-label={tech.name}>
                        {tech.icon}
                      </span>
                      <div className="flex-grow">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-foreground">{tech.name}</h4>
                          {tech.link && (
                            <svg
                              className="w-4 h-4 text-muted-foreground transform translate-y-0 group-hover:translate-y-[-2px]
                                       transition-transform duration-300"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{tech.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologiesSection;
