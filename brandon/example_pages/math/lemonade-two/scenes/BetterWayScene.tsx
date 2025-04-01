'use client'

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Eye, Link as LinkIcon, DollarSign } from 'lucide-react';
import { Card } from '@components/ui/card';
import { Button } from '@components/ui/button';

// ClientOnly Component to prevent server-side rendering issues
type ClientOnlyProps = {
  children: React.ReactNode;
};

const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;
  return <>{children}</>;
};

// Block Component to display each donation block
interface BlockData {
  from: string;
  to: string;
  amount: number;
  timestamp: string;
  message: string;
}

interface BlockProps {
  data: BlockData;
  isVerified: boolean;
}

const Block: React.FC<BlockProps> = ({ data, isVerified }) => (
  <motion.div
    initial={{ scale: 0.95, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    className="relative w-full"
  >
    <Card className={`
      p-6
      ${isVerified
        ? 'border-yellow-400 dark:border-yellow-400/70'
        : 'border-yellow-200/30 dark:border-yellow-400/20'
      }
      border-2
      shadow-lg
      hover:shadow-xl
      transition-all
      duration-500
      rounded-3xl
      bg-white/90
      dark:bg-zinc-900/90
      relative
      overflow-visible
      group
      backdrop-blur-md
    `}>
      {/* Hover Gradient Overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-400 dark:from-yellow-400 dark:via-yellow-500 dark:to-yellow-600 rounded-3xl" />

      {/* Verification Badge */}
      <div className="absolute -right-2 -top-2">
        {isVerified ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="rounded-full p-3 shadow-xl bg-gradient-to-br from-yellow-400 to-yellow-500 dark:from-yellow-500 dark:to-yellow-600 border-4 border-white dark:border-zinc-900"
          >
            <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
        ) : (
          <motion.div
            className="bg-white/95 dark:bg-zinc-800/95 rounded-full p-3 shadow-lg border-2 border-yellow-200/50 dark:border-yellow-400/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="h-4 w-4 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-4 mt-2">
        <div className="flex justify-start items-center group/item hover:bg-yellow-50/30 dark:hover:bg-yellow-400/10 p-3 rounded-xl transition-colors duration-300">
          <span className="text-sm text-zinc-500 dark:text-zinc-400 font-medium w-24">From:</span>
          <span className="font-medium text-zinc-800 dark:text-zinc-200 group-hover/item:text-yellow-600 dark:group-hover/item:text-yellow-400 transition-colors">{data.from}</span>
        </div>
        <div className="flex justify-start items-center group/item hover:bg-yellow-50/30 dark:hover:bg-yellow-400/10 p-3 rounded-xl transition-colors duration-300">
          <span className="text-sm text-zinc-500 dark:text-zinc-400 font-medium w-24">To:</span>
          <span className="font-medium text-zinc-800 dark:text-zinc-200 group-hover/item:text-yellow-600 dark:group-hover/item:text-yellow-400 transition-colors">{data.to}</span>
        </div>
        <div className="flex justify-start items-center group/item hover:bg-yellow-50/30 dark:hover:bg-yellow-400/10 p-3 rounded-xl transition-colors duration-300">
          <span className="text-sm text-zinc-500 dark:text-zinc-400 font-medium w-24">Amount:</span>
          <span className="font-bold text-zinc-900 dark:text-zinc-100 group-hover/item:text-yellow-600 dark:group-hover/item:text-yellow-400 transition-colors">${data.amount}</span>
        </div>
      </div>

      {/* Animated Arrow for Verified Blocks */}
      {isVerified && (
        <motion.div
          className="absolute -bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            className="bg-yellow-400/20 dark:bg-yellow-400/10 rounded-full p-3 backdrop-blur-md shadow-lg"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg className="h-6 w-6 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </Card>
  </motion.div>
);

// Main BetterWayScene Component
interface BetterWaySceneProps {
  onComplete: () => void;
}

const BetterWayScene: React.FC<BetterWaySceneProps> = ({ onComplete }) => {
  const [verifiedBlocks, setVerifiedBlocks] = useState<number[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);

  const blocks: BlockData[] = [
    {
      from: "Lenny's Stand",
      to: "Happy Tails",
      amount: 50,
      timestamp: new Date().toISOString(),
      message: "Your donation was recorded on the blockchain 📝"
    },
    {
      from: "Happy Tails",
      to: "Pet Supplies",
      amount: 30,
      timestamp: new Date().toISOString(),
      message: "Every step of how it's used is tracked 👀"
    },
    {
      from: "Pet Supplies",
      to: "Dog Food Co",
      amount: 20,
      timestamp: new Date().toISOString(),
      message: "Anyone can verify where the money goes 🔍"
    }
  ];

  // Function to start the verification animation
  const startAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    blocks.forEach((_, index) => {
      setTimeout(() => {
        setVerifiedBlocks(prev => [...prev, index]);
      }, index * 3000); // 3 seconds delay between each block
    });

    setTimeout(() => {
      setShowExplanation(true);
      setIsAnimating(false);
    }, blocks.length * 3000 + 2000); // Additional delay before showing explanation
  };

  // Function to set references to each block for scrolling
  const setBlockRef = (index: number) => (el: HTMLDivElement | null) => {
    blockRefs.current[index] = el;
  };

  // Effect to handle scrolling into view when a block is verified or explanation is shown
  useEffect(() => {
    if (verifiedBlocks.length > 0) {
      const lastVerifiedIndex = verifiedBlocks[verifiedBlocks.length - 1];
      blockRefs.current[lastVerifiedIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center' });

      if (lastVerifiedIndex === blocks.length - 1 && showExplanation) {
        blockRefs.current[blocks.length]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [verifiedBlocks, showExplanation]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50/50 via-white to-yellow-50/30 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-900/95 relative overflow-hidden">
      {/* Refined Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/20 via-yellow-50/10 to-yellow-100/20 dark:from-yellow-400/5 dark:via-yellow-500/5 dark:to-yellow-600/5" />
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-yellow-100/30 to-transparent dark:from-yellow-400/10 dark:to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-yellow-100/30 to-transparent dark:from-yellow-400/10 dark:to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-16 min-h-screen">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 space-y-4"
        >
          <span className="inline-block text-sm font-medium text-yellow-600/80 dark:text-yellow-400/80 px-4 py-2 rounded-full bg-yellow-100/30 dark:bg-yellow-400/10 backdrop-blur-sm">
            Understanding Transparency
          </span>
          <h2 className="text-4xl font-bold mb-4 text-zinc-800 dark:text-zinc-100 tracking-tight">
            Let's Make Giving Crystal Clear! ✨
          </h2>
          <p className="text-zinc-600 dark:text-zinc-300 text-xl max-w-2xl mx-auto leading-relaxed">
            Watch how we make every donation transparent and traceable
          </p>
        </motion.div>

        {/* Start Button */}
        {!isAnimating && verifiedBlocks.length === 0 && (
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Button
              onClick={startAnimation}
              className="px-12 py-6 rounded-2xl text-lg font-medium shadow-xl transition-all duration-500 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-400 dark:from-yellow-400 dark:to-yellow-500 opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative flex items-center text-zinc-900 dark:text-zinc-900 font-semibold">
                <Sparkles className="mr-3 h-5 w-5" />
                Start the Transparency Chain
              </span>
            </Button>
          </motion.div>
        )}

        {/* Donation Blocks */}
        <div className="max-w-xl mx-auto">
          <div className="relative">
            <div className="flex flex-col gap-12">
              {blocks.map((block, index) => (
                <React.Fragment key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.3 }}
                    className="relative"
                    ref={setBlockRef(index)}
                  >
                    <Block
                      data={block}
                      isVerified={verifiedBlocks.includes(index)}
                    />
                    {verifiedBlocks.includes(index) && (
                      <motion.div
                        className="text-center mt-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <p className="text-lg font-medium text-zinc-700 dark:text-zinc-300 bg-yellow-100/30 dark:bg-yellow-400/10 px-6 py-3 rounded-2xl backdrop-blur-sm inline-block">
                          {block.message}
                        </p>
                      </motion.div>
                    )}
                    {index < blocks.length - 1 && (
                      <motion.div
                        className="flex items-center justify-center mt-4 mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: verifiedBlocks.includes(index) ? 1 : 0.3 }}
                      >
                        <LinkIcon className="h-10 w-10 text-yellow-500 dark:text-yellow-400 opacity-70" />
                      </motion.div>
                    )}
                  </motion.div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Explanation Card */}
        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8 max-w-xl mx-auto mt-16"
              ref={setBlockRef(blocks.length)}
            >
              <Card className="p-8 bg-white/80 dark:bg-zinc-900/80 border border-yellow-200/30 dark:border-yellow-400/20 rounded-3xl backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-8 flex items-center justify-center text-zinc-800 dark:text-zinc-100">
                  <Eye className="mr-3 h-6 w-6 text-yellow-500 dark:text-yellow-400" />
                  Look What Just Happened!
                </h3>
                <div className="space-y-6 text-center">
                  {[
                    "Your donation was recorded on the blockchain 📝",
                    "Every step of how it's used is tracked 👀",
                    "Anyone can verify where the money goes 🔍",
                    "The shelter's actions become transparent 🎯"
                  ].map((text, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="flex items-center justify-center text-lg"
                    >
                      <span className="w-8 h-8 rounded-full bg-yellow-100/50 dark:bg-yellow-400/20 flex items-center justify-center mr-4 text-sm font-bold text-yellow-700 dark:text-yellow-300">
                        {index + 1}
                      </span>
                      <span className="text-zinc-700 dark:text-zinc-300">{text}</span>
                    </motion.p>
                  ))}
                </div>
              </Card>

              <motion.div
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  onClick={onComplete}
                  className="px-8 py-6 rounded-2xl text-lg font-medium shadow-lg transition-all duration-500 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 dark:from-yellow-500 dark:to-yellow-600 opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative flex items-center text-zinc-900 font-semibold">
                    <DollarSign className="mr-2 h-5 w-5" />
                    Ready to Make Your First Transparent Donation?
                  </span>
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Wrapper Component to ensure Client-Side Rendering
const BetterWaySceneWrapper: React.FC<{ onComplete: () => void }> = (props) => (
  <ClientOnly>
    <BetterWayScene {...props} />
  </ClientOnly>
);

export default BetterWaySceneWrapper;
