import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Alert, AlertDescription, Button } from '@components/ui';

import ClientOnly from '../../components/ClientOnly';
import ClientIcon from '../../components/ClientIcon';
import LennyImage from '../../components/LennyImage';

interface SceneProps {
  onComplete: () => void;
  onInteract: (data: any) => void;
}

const LennyIntro: React.FC<SceneProps> = ({ onComplete }) => {
  const [lemonadeStand, setLemonadeStand] = useState(0);
  const [showTutorial, setShowTutorial] = useState(true);
  const [customerCount, setCustomerCount] = useState(0);
  const [isSqueezing, setIsSqueezing] = useState(false);
  const targetEarnings = 50;

  const [fillLevel, setFillLevel] = useState(0);
  const [currentReaction, setCurrentReaction] = useState('');

  const customerReactions = [
    "Mmm, delicious! 😋",
    "Best lemonade ever! 🌟",
    "So refreshing! ✨",
    "I'll tell my friends! 🎉",
    "Perfect for a sunny day! ☀️"
  ];

  const makeNewLemonade = () => {
    setIsSqueezing(true);
    setFillLevel(0);

    const fillInterval = setInterval(() => {
      setFillLevel(prev => {
        if (prev >= 100) {
          clearInterval(fillInterval);
          setIsSqueezing(false);
          sellLemonade();
          return 0;
        }
        return prev + 10;
      });
    }, 100);
  };

  const sellLemonade = () => {
    setLemonadeStand(prev => prev + 10);
    setCustomerCount(prev => prev + 1);
    setCurrentReaction(customerReactions[Math.floor(Math.random() * customerReactions.length)]);
    setTimeout(() => setCurrentReaction(''), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50/50 via-white to-yellow-50/30 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-900/95 relative overflow-hidden">
      {/* Gradient Wave Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/20 via-yellow-50/10 to-yellow-100/20 dark:from-yellow-400/5 dark:via-yellow-500/5 dark:to-yellow-600/5" />
        <div className="absolute bottom-0 left-0 right-0 h-[40vh]"
          style={{
            background: "linear-gradient(to right, #FFE566, #FFD700)",
            opacity: 0.1,
            clipPath: "polygon(0 100%, 100% 60%, 100% 100%, 0% 100%)"
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6"
      >
        {/* Progress towards goal */}
        <div className="absolute top-6 left-6 right-6 text-center">
          <h2 className="text-2xl font-bold mb-2 text-zinc-800 dark:text-zinc-100">Lenny's Lemonade Stand</h2>
          <div className="max-w-md mx-auto">
            <div className="h-4 bg-white/80 dark:bg-zinc-900/80 rounded-full shadow-inner overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #FFD700, #FFE566)",
                  width: `${(lemonadeStand / targetEarnings) * 100}%`
                }}
                initial={{ width: 0 }}
                animate={{ width: `${(lemonadeStand / targetEarnings) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="mt-2 text-zinc-600 dark:text-zinc-300 font-medium">
              ${lemonadeStand} earned of ${targetEarnings} goal
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className="text-center space-y-8 max-w-md w-full">
          {showTutorial ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-white/80 dark:bg-zinc-900/80 p-8 rounded-3xl shadow-lg border border-yellow-200/30 dark:border-yellow-400/20 backdrop-blur-sm"
            >
              <div className="mb-6">
                <LennyImage className="w-24 h-24 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-zinc-800 dark:text-zinc-100">Help Lenny Make Lemonade! 🍋</h3>
              <p className="mb-6 text-zinc-600 dark:text-zinc-300 text-lg">Click the lemons to squeeze them and serve customers!</p>
              <Button
                onClick={() => setShowTutorial(false)}
                className="px-8 py-4 rounded-2xl text-lg font-medium shadow-lg transition-all duration-300 w-full bg-gradient-to-r from-yellow-300 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500"
              >
                <span className="text-gray-900">Let's Start! 🎉</span>
              </Button>
            </motion.div>
          ) : (
            <>
              {/* Lemonade making station */}
              <div className="relative">
                <div
                  className="relative cursor-pointer"
                  onClick={!isSqueezing ? makeNewLemonade : undefined}
                >
                  <div className="w-32 h-32 rounded-full mx-auto flex items-center justify-center shadow-lg bg-gradient-to-r from-yellow-300 to-yellow-400">
                    {!isSqueezing ? (
                      <div className="text-4xl">🍋</div>
                    ) : (
                      <ClientIcon name="RefreshCcw" className="w-8 h-8 text-gray-900 animate-spin" />
                    )}
                  </div>

                  {!isSqueezing && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white/80 dark:bg-zinc-900/80 px-4 py-2 rounded-full shadow-lg border border-yellow-200/30 dark:border-yellow-400/20"
                    >
                      <span className="text-zinc-800 dark:text-zinc-100">Click to squeeze! 👆</span>
                    </motion.div>
                  )}
                </div>

                {/* Lemonade glass */}
                <div className="mt-4 relative w-24 h-32 mx-auto bg-white/80 dark:bg-zinc-900/80 rounded-2xl overflow-hidden shadow-lg border-2 border-yellow-200/30 dark:border-yellow-400/20 backdrop-blur-sm">
                  <motion.div
                    className="absolute bottom-0 w-full bg-gradient-to-r from-yellow-300 to-yellow-400"
                    style={{
                      height: `${fillLevel}%`
                    }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </div>

              {/* Customer reactions */}
              <AnimatePresence>
                {currentReaction && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-xl font-bold text-zinc-800 dark:text-zinc-100"
                  >
                    {currentReaction}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Stats */}
              <div className="flex justify-center space-x-12">
                <div className="text-center">
                  <div className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">${lemonadeStand}</div>
                  <div className="text-zinc-600 dark:text-zinc-300 font-medium">Earned</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">{customerCount}</div>
                  <div className="text-zinc-600 dark:text-zinc-300 font-medium">Happy Customers</div>
                </div>
              </div>
            </>
          )}

          {/* Show goal reached message */}
          {lemonadeStand >= targetEarnings && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mt-8"
            >
              <Alert className="bg-white/80 dark:bg-zinc-900/80 border border-yellow-200/30 dark:border-yellow-400/20 shadow-lg backdrop-blur-sm">
                <ClientIcon name="Dog" className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                <AlertDescription className="text-zinc-800 dark:text-zinc-100">
                  "Wow! I've earned enough to help the local dog shelter! But..."
                </AlertDescription>
              </Alert>

              <Button
                onClick={onComplete}
                className="mt-6 px-8 py-4 rounded-2xl text-lg font-medium shadow-lg transition-all duration-300 w-full bg-gradient-to-r from-yellow-300 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500"
              >
                <span className="text-gray-900">See what's on Lenny's mind</span>
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const LennyIntroWrapper: React.FC<SceneProps> = (props) => {
  return (
    <ClientOnly>
      <LennyIntro {...props} />
    </ClientOnly>
  );
};

export default LennyIntroWrapper;
