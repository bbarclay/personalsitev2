import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Briefcase, Sparkles, Coins } from 'lucide-react';
import LennyImage from './components/LennyImage';

interface AgeSelectorProps {
  onSelectKids: () => void;
  onSelectAdults: () => void;
}

const AgeSelector: React.FC<AgeSelectorProps> = ({ onSelectKids, onSelectAdults }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50/50 via-white to-yellow-50/30 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-900/95 relative overflow-hidden">
      {/* Gradient Wave Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 left-0 right-0 h-[70vh]"
          style={{
            background:
              'linear-gradient(to bottom right, rgba(255, 230, 102, 0.2), rgba(255, 215, 0, 0.1), rgba(255, 246, 220, 0.2))',
            clipPath: 'polygon(0 20%, 100% 0%, 100% 100%, 0% 100%)',
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-12 min-h-screen flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-8">
            <LennyImage className="w-32 h-32" />
          </div>
          <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2 block">
            Understanding Transparency
          </span>
          <h1 className="text-4xl font-bold mb-4 text-zinc-800 dark:text-zinc-100">
            How does Lemonaide work?
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-300 max-w-xl mx-auto">
            Learn about transparent donations through an interactive experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
          {/* Kids Version */}
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <button
              onClick={onSelectKids}
              className="block w-full bg-white/80 dark:bg-zinc-900/80 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group border border-yellow-200/30 dark:border-yellow-400/20 hover:border-yellow-300 dark:hover:border-yellow-500"
            >
              <div className="relative z-10">
                <div className="flex justify-center mb-6">
                  <div
                    className="p-4 rounded-full"
                    style={{
                      background: 'linear-gradient(135deg, #FFD700, #FFE566)',
                    }}
                  >
                    <Gamepad2 className="w-12 h-12 text-gray-900" />
                  </div>
                </div>

                <h2 className="text-2xl font-bold mb-4 text-zinc-800 dark:text-zinc-100">
                  For Kids! 🎮
                </h2>
                <div className="space-y-3 text-left">
                  <p className="flex items-center text-zinc-600 dark:text-zinc-300 font-medium">
                    <Sparkles className="w-5 h-5 mr-2 text-yellow-600 dark:text-yellow-400" />
                    Fun lemonade stand adventure
                  </p>
                  <p className="flex items-center text-zinc-600 dark:text-zinc-300 font-medium">
                    <Coins className="w-5 h-5 mr-2 text-yellow-600 dark:text-yellow-400" />
                    Help Lenny make a difference
                  </p>
                </div>
              </div>
            </button>
          </motion.div>

          {/* Adults Version */}
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <button
              onClick={onSelectAdults}
              className="block w-full bg-white/80 dark:bg-zinc-900/80 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group border border-yellow-200/30 dark:border-yellow-400/20 hover:border-yellow-300 dark:hover:border-yellow-500"
            >
              <div className="relative z-10">
                <div className="flex justify-center mb-6">
                  <div
                    className="p-4 rounded-full"
                    style={{
                      background: 'linear-gradient(135deg, #FFD700, #FFE566)',
                    }}
                  >
                    <Briefcase className="w-12 h-12 text-gray-900" />
                  </div>
                </div>

                <h2 className="text-2xl font-bold mb-4 text-zinc-800 dark:text-zinc-100">
                  For Adults 💼
                </h2>
                <div className="space-y-3 text-left">
                  <p className="flex items-center text-zinc-600 dark:text-zinc-300 font-medium">
                    <Sparkles className="w-5 h-5 mr-2 text-yellow-600 dark:text-yellow-400" />
                    Understand blockchain basics
                  </p>
                  <p className="flex items-center text-zinc-600 dark:text-zinc-300 font-medium">
                    <Coins className="w-5 h-5 mr-2 text-yellow-600 dark:text-yellow-400" />
                    Explore donation transparency
                  </p>
                </div>
              </div>
            </button>
          </motion.div>
        </div>

        {/* Skip Feature */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-zinc-600 dark:text-zinc-400 text-sm font-medium hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
        >
          Press ESC anytime to skip the introduction
        </motion.div>
      </div>
    </div>
  );
};

export default AgeSelector;
