import React from 'react';
import { motion } from 'framer-motion';
import { seededRandom } from '../app/utils/deterministicRandom';

// Define gradient sets that work well in both light and dark modes
const gradients = [
  {
    title: "Experience & Skills",
    description: "Over 5 years of experience in software development and AI solutions",
    gradient: "from-blue-500/20 via-blue-500/10 to-transparent dark:from-blue-400/20 dark:via-blue-400/10 dark:to-transparent",
    link: "/portfolio#experience"
  },
  {
    title: "AI & Machine Learning",
    description: "Specialized in neural networks, deep learning, and AI applications",
    gradient: "from-purple-500/20 via-purple-500/10 to-transparent dark:from-purple-400/20 dark:via-purple-400/10 dark:to-transparent",
    link: "/ai"
  },
  {
    title: "Mathematics & Algorithms",
    description: "Complex problem-solving through mathematical visualization",
    gradient: "from-pink-500/20 via-pink-500/10 to-transparent dark:from-pink-400/20 dark:via-pink-400/10 dark:to-transparent",
    link: "/math"
  },
  {
    title: "Projects & Achievements",
    description: "Portfolio of successful projects and technical accomplishments",
    gradient: "from-emerald-500/20 via-emerald-500/10 to-transparent dark:from-emerald-400/20 dark:via-emerald-400/10 dark:to-transparent",
    link: "/portfolio#projects"
  },
  {
    title: "Technical Expertise",
    description: "Full-stack development, cloud architecture, and DevOps practices",
    gradient: "from-amber-500/20 via-amber-500/10 to-transparent dark:from-amber-400/20 dark:via-amber-400/10 dark:to-transparent",
    link: "/portfolio#skills"
  },
  {
    title: "Open to Collaboration",
    description: "Available for consulting and innovative project opportunities",
    gradient: "from-cyan-500/20 via-cyan-500/10 to-transparent dark:from-cyan-400/20 dark:via-cyan-400/10 dark:to-transparent",
    link: "/contact"
  }
];

export const PortfolioSection: React.FC = () => {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <motion.h2 
        className="text-3xl md:text-4xl font-bold mb-10 text-center relative inline-block w-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.span 
          className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg blur-md"
          animate={{ 
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        ></motion.span>
        <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Portfolio Highlights
        </span>
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
        {gradients.map((section, index) => {
          // Generate card-specific vibrant colors based on title
          const cardBaseColor = 
            section.title.includes('Experience') ? 'from-blue-500/60 to-cyan-500/60' : 
            section.title.includes('AI') ? 'from-purple-500/60 to-fuchsia-500/60' : 
            section.title.includes('Mathematics') ? 'from-pink-500/60 to-rose-500/60' :
            section.title.includes('Projects') ? 'from-emerald-500/60 to-green-500/60' :
            section.title.includes('Technical') ? 'from-amber-500/60 to-yellow-500/60' :
            'from-cyan-500/60 to-blue-500/60';
          
          // Generate mathematical symbols specific to each card
          const mathSymbols = 
            section.title.includes('Experience') ? ['λ', 'λ', 'λ'] : 
            section.title.includes('AI') ? ['⊗', '⊗', '⊗'] : 
            section.title.includes('Mathematics') ? ['∫', '∫', '∫'] :
            section.title.includes('Projects') ? ['Σ', 'Σ', 'Σ'] :
            section.title.includes('Technical') ? ['φ', 'φ', 'φ'] :
            ['∞', '∞', '∞'];
            
          return (
            <motion.a
              href={section.link}
              key={section.title}
              className="relative overflow-hidden rounded-xl backdrop-blur-sm group cursor-pointer"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ 
                scale: 1.03,
                rotateY: 5,
                rotateX: 2,
                z: 10
              }}
            >
              {/* Animated background with premium enterprise look */}
              <div className={`absolute inset-0 bg-gradient-to-br ${section.gradient} opacity-70`} />
              
              {/* Mathematical symbols that appear on hover */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {mathSymbols.map((symbol, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-foreground/10 font-serif select-none"
                    style={{
                      left: `${25 + i * 25}%`,
                      top: `${20 + (i % 2) * 40}%`,
                      fontSize: `${80 + i * 10}px`,
                      opacity: 0,
                      transform: 'translateY(20px) rotate(10deg)',
                    }}
                    initial={false}
                    whileHover={{
                      opacity: 0.15,
                      y: -10,
                      rotate: 0,
                      transition: { duration: 0.5, delay: i * 0.1 }
                    }}
                    transition={{
                      duration: 0.5
                    }}
                  >
                    {symbol}
                  </motion.div>
                ))}
              </div>
              
              {/* Add premium border with diamond pattern */}
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r opacity-0 group-hover:opacity-80 blur-sm transition-all duration-500 group-hover:duration-200" 
                   style={{
                     backgroundImage: `linear-gradient(90deg, transparent, rgba(56, 114, 255, 0.3), transparent)`
                   }}></div>
              
              {/* Dynamic glow effect */}
              <motion.div 
                className={`absolute inset-0 rounded-xl bg-gradient-to-r ${cardBaseColor} opacity-0 group-hover:opacity-70 blur-lg transition-all duration-300`}
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              ></motion.div>
              
              {/* Premium card content with depth effect */}
              <div className="relative p-8 backdrop-blur-sm bg-card/30 h-full border border-border/50 rounded-xl
                            group-hover:border-primary/50 transition-all duration-500
                            group-hover:translate-y-[-2px] group-hover:shadow-[0_0_20px_rgba(100,100,255,0.4)]
                            dark:group-hover:shadow-[0_0_15px_rgba(147,197,253,0.3)]">
                
                {/* Enterprise-style title treatment */}
                <div className="mb-6 relative">
                  <div className="absolute -left-2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  <h2 className="text-2xl font-semibold text-foreground flex items-center justify-between">
                    <span className="bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r from-blue-600 to-purple-600 transition-colors duration-300">
                      {section.title}
                    </span>
                    <div className="p-2 rounded-full group-hover:bg-white/10 transition-all duration-300">
                      <svg
                        className="w-5 h-5 transform translate-x-0 group-hover:translate-x-1 group-hover:text-blue-500 transition-all duration-300"
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
                  </h2>
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-foreground/20 to-transparent mt-2 group-hover:via-blue-500/30 transition-all duration-300"></div>
                </div>
                
                <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">{section.description}</p>
                
                {/* Mesh pattern for enterprise look */}
                <div className="absolute bottom-0 right-0 w-32 h-32 overflow-hidden opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                  <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <pattern id={`grid-${index}`} width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeOpacity="0.2" />
                    </pattern>
                    <rect width="100" height="100" fill={`url(#grid-${index})`} />
                  </svg>
                </div>
              </div>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
};
