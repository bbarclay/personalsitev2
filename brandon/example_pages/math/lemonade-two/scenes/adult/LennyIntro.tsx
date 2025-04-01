import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Alert, AlertDescription } from '@components/ui/alert';
import ClientOnly from '../../components/ClientOnly';
import ClientIcon from '../../components/ClientIcon';
import LennyImage from '../../components/LennyImage';
import { Button } from '@components/ui/button';
import { Card } from '@components/ui/card';
import { ArrowRight } from 'lucide-react';

interface SceneProps {
  onComplete: () => void;
  onInteract: (data: any) => void;
}

const LennyIntro: React.FC<SceneProps> = ({ onComplete }) => {
  const [showProblem, setShowProblem] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePiggyBank = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setShowProblem(true);
      setIsAnimating(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50/50 via-white to-yellow-50/30 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-900/95 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 bg-gradient-to-br from-yellow-100/20 via-yellow-50/10 to-yellow-100/20 dark:from-yellow-400/5 dark:via-yellow-500/5 dark:to-yellow-600/5"
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-[40vh]"
          style={{
            background: 'linear-gradient(to right, #FFE566, #FFD700)',
            opacity: 0.1,
            clipPath: 'polygon(0 100%, 100% 40%, 100% 100%, 0% 100%)',
          }}
        />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-lg w-full space-y-6"
        >
          {!showProblem ? (
            <Card className="p-8 relative overflow-hidden bg-white/80 dark:bg-zinc-900/80 border border-yellow-200/30 dark:border-yellow-400/20 shadow-lg rounded-3xl backdrop-blur-sm">
              <div className="absolute top-4 right-4 flex items-center">
                <div
                  className="bg-gradient-to-r from-yellow-300 to-yellow-400 dark:from-yellow-400 dark:to-yellow-500 rounded-full p-2 shadow-lg"
                >
                  <ClientIcon name="DollarSign" className="h-6 w-6 text-gray-900" />
                </div>
                <span className="text-xl font-bold text-zinc-800 dark:text-zinc-100 ml-2">500</span>
              </div>

              <div className="text-center space-y-6">
                <div className="mb-6">
                  <LennyImage className="w-24 h-24 mx-auto" />
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100 mb-2">
                    Meet Lenny
                  </h2>
                  <p className="text-zinc-600 dark:text-zinc-300 text-lg">
                    His lemonade empire is thriving, but he's got a problem...
                  </p>
                </div>

                <Button
                  onClick={handlePiggyBank}
                  className="relative p-8 rounded-2xl transition-all duration-300 group bg-gradient-to-r from-yellow-300 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500"
                >
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-yellow-200" />
                  <div className="relative z-10 space-y-3">
                    <ClientIcon
                      name="PiggyBank"
                      className="h-16 w-16 mx-auto text-gray-900"
                    />
                    <div className="flex items-center justify-center space-x-2 text-gray-900">
                      <span className="text-base font-semibold">Click to Continue</span>
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </div>
                </Button>
              </div>
            </Card>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Alert className="bg-white/80 dark:bg-zinc-900/80 border border-yellow-200/30 dark:border-yellow-400/20 shadow-lg rounded-xl backdrop-blur-sm">
                <ClientIcon
                  name="Dog"
                  className="h-6 w-6 text-yellow-600 dark:text-yellow-400"
                />
                <AlertDescription className="text-lg font-medium text-zinc-800 dark:text-zinc-100">
                  "I want to donate to the local dog shelter, but something's bothering me..."
                </AlertDescription>
              </Alert>

              <Button
                onClick={onComplete}
                className="w-full py-6 text-lg font-semibold transition-all duration-300 shadow-lg bg-gradient-to-r from-yellow-300 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 rounded-3xl"
              >
                <span className="text-gray-900 mr-3">Discover Lenny's Dilemma</span>
                <ArrowRight className="h-5 w-5 text-gray-900" />
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
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
