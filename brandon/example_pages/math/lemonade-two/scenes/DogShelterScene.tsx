import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dog, DollarSign, HelpCircle, AlertTriangle, ChevronDown } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert';
import { Button } from '@components/ui/button';
import { Card } from '@components/ui/card';

interface ProblemSceneProps {
  onComplete: () => void;
  earnedMoney: number;
}

const StoryMessage: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ scale: 0.98, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    className="relative bg-yellow-50/10 dark:bg-yellow-900/10 p-6 rounded-2xl shadow-sm mb-4 border border-yellow-100/20 dark:border-yellow-400/10 backdrop-blur-sm"
  >
    <div className="text-zinc-700 dark:text-zinc-200 text-lg font-medium leading-relaxed">
      {children}
    </div>
  </motion.div>
);

const DogShelterScene: React.FC<ProblemSceneProps> = ({ onComplete, earnedMoney }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [questions, setQuestions] = useState<string[]>([]);

  const steps = [
    {
      id: 'intro',
      content: "With all this lemonade money, I can help the dogs at Happy Tails Shelter!",
      action: "Let's Try to Help! →"
    },
    {
      id: 'question1',
      content: "How do I know my money actually helps the dogs?",
      action: "That's a Good Question... →"
    },
    {
      id: 'question2',
      content: "What if the money gets lost somewhere in between?",
      action: "Another Concern... →"
    },
    {
      id: 'question3',
      content: "How will I know if my donation made a difference?",
      action: "Final Thought... →"
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setQuestions(prev => [...prev, steps[currentStep].content]);
      setCurrentStep(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100/50 dark:from-zinc-900 dark:to-zinc-900/95 relative p-4">
      {/* Soft overlapping gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/10 via-yellow-100/5 to-yellow-50/10 dark:from-yellow-400/5 dark:via-yellow-500/5 dark:to-yellow-600/5" />
        <div
          className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-tr from-yellow-200/20 to-yellow-100/10 dark:from-yellow-400/10 dark:to-yellow-500/5"
          style={{
            clipPath: "polygon(0 45%, 100% 0%, 100% 100%, 0% 100%)"
          }}
        />
      </div>

      {/* Main Content Container */}
      <div className="max-w-2xl mx-auto space-y-8 pt-12 relative z-10">
        {/* Header Card */}
        <Card className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-yellow-200/30 dark:border-yellow-400/10 p-8 rounded-3xl shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-5">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-yellow-300 to-yellow-400 dark:from-yellow-400 dark:to-yellow-500 shadow-lg">
                <Dog className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">Lenny's Big Plan</h2>
                <p className="text-zinc-600 dark:text-zinc-400 text-lg">Time to help some puppies! 🐕</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-yellow-50 dark:bg-yellow-400/10 p-3 rounded-xl border border-yellow-200/50 dark:border-yellow-400/20">
              <DollarSign className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              <span className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">${earnedMoney}</span>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="flex gap-2 mb-8">
            {steps.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${idx <= currentStep
                  ? 'bg-gradient-to-r from-yellow-300 to-yellow-400 dark:from-yellow-400 dark:to-yellow-500'
                  : 'bg-yellow-100 dark:bg-yellow-900/30'
                  }`}
              />
            ))}
          </div>

          {/* Story Messages */}
          <AnimatePresence mode="wait">
            {questions.map((q, idx) => (
              <StoryMessage key={idx}>{q}</StoryMessage>
            ))}
          </AnimatePresence>

          {/* Action Button */}
          {currentStep < steps.length ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Button
                onClick={handleNext}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-300 hover:from-yellow-300 hover:to-yellow-400 dark:from-yellow-500 dark:to-yellow-400 dark:hover:from-yellow-400 dark:hover:to-yellow-500 text-zinc-800 dark:text-zinc-900 font-semibold text-lg py-6 px-8 rounded-2xl shadow-lg border border-yellow-200/50 dark:border-yellow-400/30 transition-all duration-300"
              >
                <span className="flex items-center gap-3">
                  {steps[currentStep].action}
                  <ChevronDown className="h-5 w-5 animate-bounce" />
                </span>
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <Alert className="bg-yellow-50/50 dark:bg-yellow-900/20 border-yellow-200/50 dark:border-yellow-400/20 rounded-xl">
                <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                <AlertTitle className="text-zinc-800 dark:text-zinc-200 text-lg">Lenny feels stuck...</AlertTitle>
                <AlertDescription className="text-zinc-600 dark:text-zinc-400">
                  He wants to help, but these questions are making him hesitate.
                </AlertDescription>
              </Alert>

              <Button
                onClick={onComplete}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-300 hover:from-yellow-300 hover:to-yellow-400 dark:from-yellow-500 dark:to-yellow-400 dark:hover:from-yellow-400 dark:hover:to-yellow-500 text-zinc-800 dark:text-zinc-900 font-semibold text-lg py-6 px-8 rounded-2xl shadow-lg border border-yellow-200/50 dark:border-yellow-400/30 transition-all duration-300"
              >
                <span className="flex items-center gap-3">
                  Show Lenny a Better Way →
                  <HelpCircle className="h-5 w-5" />
                </span>
              </Button>
            </motion.div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default DogShelterScene;
