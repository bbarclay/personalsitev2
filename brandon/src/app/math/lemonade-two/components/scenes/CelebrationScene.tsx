'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Trophy,
  Heart,
  Share2,
  ArrowRight,
  Gift
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const floatingAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

interface CelebrationSceneProps {
  onRestart: () => void;
}

const CelebrationScene: React.FC<CelebrationSceneProps> = ({ onRestart }) => {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    if (showConfetti) {
      setTimeout(() => setShowConfetti(false), 50);
    }
  }, [showConfetti]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50/50 via-white to-yellow-50/30 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-900/95 relative overflow-hidden">
      {/* Gradient Wave Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/20 via-yellow-50/10 to-yellow-100/20 dark:from-yellow-400/5 dark:via-yellow-500/5 dark:to-yellow-600/5" />
        <div className="absolute bottom-0 left-0 right-0 h-[40vh]"
          style={{
            background: "linear-gradient(to right, #FFE566, #FFD700)",
            opacity: 0.1,
            clipPath: "polygon(0 100%, 100% 40%, 100% 100%, 0% 100%)"
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12 min-h-screen flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-4xl w-full space-y-12 text-center"
        >
          {/* Section: Achievement Trophy */}
          <motion.div
            animate={{
              rotate: [0, 10, -10, 10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block"
          >
            <div className="p-6 rounded-full"
              style={{
                background: "linear-gradient(135deg, #FFD700, #FFE566)"
              }}
            >
              <Trophy className="h-20 w-20 text-gray-900" />
            </div>
          </motion.div>

          <div>
            <h1 className="text-4xl font-bold mb-4 text-zinc-800 dark:text-zinc-100">
              Congratulations, Lenny! 🎉
            </h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">
              You've just made your first transparent donation!
            </p>
          </div>

          {/* Section: Impact Summary */}
          <Card className="p-8 bg-white/80 dark:bg-zinc-900/80 border border-yellow-200/30 dark:border-yellow-400/20 rounded-3xl backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-8 text-zinc-800 dark:text-zinc-100">Your Journey</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                className="text-center"
                animate={floatingAnimation}
              >
                <div className="p-4 rounded-2xl mx-auto mb-4 w-16"
                  style={{
                    background: "linear-gradient(135deg, #FFD700, #FFE566)"
                  }}
                >
                  <Heart className="h-8 w-8 text-gray-900" />
                </div>
                <h3 className="font-bold text-zinc-800 dark:text-zinc-100 mb-1">Made Impact</h3>
                <p className="text-zinc-600 dark:text-zinc-300">Helped shelter dogs</p>
              </motion.div>

              <motion.div
                className="text-center"
                animate={floatingAnimation}
                transition={{ delay: 0.1 }}
              >
                <div className="p-4 rounded-2xl mx-auto mb-4 w-16"
                  style={{
                    background: "linear-gradient(135deg, #FFD700, #FFE566)"
                  }}
                >
                  <Trophy className="h-8 w-8 text-gray-900" />
                </div>
                <h3 className="font-bold text-zinc-800 dark:text-zinc-100 mb-1">Gained Trust</h3>
                <p className="text-zinc-600 dark:text-zinc-300">Through transparency</p>
              </motion.div>

              <motion.div
                className="text-center"
                animate={floatingAnimation}
                transition={{ delay: 0.2 }}
              >
                <div className="p-4 rounded-2xl mx-auto mb-4 w-16"
                  style={{
                    background: "linear-gradient(135deg, #FFD700, #FFE566)"
                  }}
                >
                  <Gift className="h-8 w-8 text-gray-900" />
                </div>
                <h3 className="font-bold text-zinc-800 dark:text-zinc-100 mb-1">Started Journey</h3>
                <p className="text-zinc-600 dark:text-zinc-300">Of giving back</p>
              </motion.div>
            </div>
          </Card>

          {/* Section: Next Steps */}
          <Card className="p-8 bg-white/80 dark:bg-zinc-900/80 border border-yellow-200/30 dark:border-yellow-400/20 rounded-3xl backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-6 text-zinc-800 dark:text-zinc-100">Ready to Do More?</h2>
            <div className="space-y-4">
              <motion.div
                className="w-full p-4 rounded-2xl text-lg font-medium shadow-lg transition-all duration-300 flex justify-between items-center cursor-pointer bg-gradient-to-r from-yellow-300 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-zinc-900">Track Your Impact</span>
                <ArrowRight className="h-4 w-4 text-zinc-900" />
              </motion.div>

              <Button
                className="w-full justify-between p-4 rounded-2xl bg-white/80 dark:bg-zinc-900/80 border-yellow-200/30 dark:border-yellow-400/30 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-100/30 dark:hover:bg-yellow-400/10 backdrop-blur-sm"
                variant="outline"
              >
                Share Your Story
                <Share2 className="h-4 w-4" />
              </Button>

              <Button
                className="w-full justify-between p-4 rounded-2xl bg-white/80 dark:bg-zinc-900/80 border-yellow-200/30 dark:border-yellow-400/30 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-100/30 dark:hover:bg-yellow-400/10 backdrop-blur-sm"
                variant="outline"
                onClick={onRestart}
              >
                Start New Journey
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </Card>

          {/* Section: Footer Quote */}
          <blockquote className="text-xl italic text-zinc-600 dark:text-zinc-300 mt-8">
            "Every transparent donation makes the world a little better!"
          </blockquote>
        </motion.div>
      </div>
    </div>
  );
};

export default CelebrationScene;
