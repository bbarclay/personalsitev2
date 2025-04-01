import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DollarSign,
  Heart,
  PawPrint,
  Bell,
  CheckCircle,
  Camera,
  Share2
} from 'lucide-react';
import { Card } from '@components/ui/card';
import { Button } from '@components/ui/button';
import { Alert, AlertDescription } from '@components/ui/alert';

interface DonationStep {
  title: string;
  description: string;
  icon: React.ReactNode;
  action?: () => void;
}

interface DonationFlowSceneProps {
  initialAmount: number;
  onComplete: () => void;
}

const DonationFlowScene: React.FC<DonationFlowSceneProps> = ({ initialAmount, onComplete }) => {
  const [step, setStep] = useState(0);
  const [donationAmount] = useState(initialAmount);
  const [showImpact, setShowImpact] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([]);

  const addNotification = (message: string) => {
    setNotifications(prev => [...prev, message]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n !== message));
    }, 50);
  };

  const steps: DonationStep[] = [
    {
      title: "Choose Your Impact",
      description: "Your lemonade stand earnings can help feed shelter dogs",
      icon: <PawPrint className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />,
      action: () => {
        addNotification("Impact selected: Feeding shelter dogs");
        setStep(1);
      }
    },
    {
      title: "Confirm Donation",
      description: `Donate $${donationAmount} to Happy Tails Shelter`,
      icon: <DollarSign className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />,
      action: () => {
        addNotification("Donation confirmed!");
        setStep(2);
      }
    },
    {
      title: "Track Your Impact",
      description: "See exactly how your donation helps",
      icon: <Heart className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />,
      action: () => {
        setShowImpact(true);
        setStep(3);
      }
    }
  ];

  const [impactStats, setImpactStats] = useState({
    mealsProvided: 0,
    dogsHelped: 0,
    daysOfCare: 0
  });

  useEffect(() => {
    if (showImpact) {
      const interval = setInterval(() => {
        setImpactStats(prev => ({
          mealsProvided: Math.min(prev.mealsProvided + 1, 20),
          dogsHelped: Math.min(prev.dogsHelped + 1, 5),
          daysOfCare: Math.min(prev.daysOfCare + 1, 7)
        }));
      }, 500);

      return () => clearInterval(interval);
    }
  }, [showImpact]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50/50 via-white to-yellow-50/30 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-900/95 relative overflow-hidden">
      {/* Gradient Wave Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/20 via-yellow-50/10 to-yellow-100/20 dark:from-yellow-400/5 dark:via-yellow-500/5 dark:to-yellow-600/5" />
        <div
          className="absolute bottom-0 left-0 right-0 h-[40vh]"
          style={{
            background: "linear-gradient(to right, #FFE566, #FFD700)",
            opacity: 0.1,
            clipPath: "polygon(0 100%, 100% 40%, 100% 100%, 0% 100%)"
          }}
        />
      </div>

      {/* Floating Notifications */}
      <AnimatePresence>
        {notifications.map((notification, index) => (
          <motion.div
            key={notification}
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50"
            style={{ bottom: `${4 + index * 4}rem` }}
          >
            <Alert className="bg-white shadow-lg border-2 border-yellow-200/20 dark:border-yellow-400/20 rounded-2xl">
              <Bell className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mr-2" />
              <AlertDescription className="text-zinc-800 dark:text-zinc-100">{notification}</AlertDescription>
            </Alert>
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="relative z-10 container mx-auto px-6 py-12 min-h-screen flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-4xl w-full space-y-8"
        >
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="h-2 bg-white/80 dark:bg-zinc-900/40 rounded-full shadow-inner overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #FFD700, #FFE566)",
                  width: `${(step / steps.length) * 100}%`
                }}
                initial={{ width: 0 }}
                animate={{ width: `${(step / steps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Main Content */}
          <Card className="p-8 bg-white/80 dark:bg-zinc-900/80 border border-yellow-200/30 dark:border-yellow-400/20 rounded-3xl backdrop-blur-sm">
            <AnimatePresence mode="wait">
              {!showImpact ? (
                <motion.div
                  key="steps"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                >
                  {/* Current Step */}
                  <div className="text-center">
                    <div
                      className="inline-block p-4 rounded-2xl mb-6"
                      style={{
                        background: "linear-gradient(135deg, #FFD700, #FFE566)"
                      }}
                    >
                      {steps[step].icon}
                    </div>
                    <h2 className="text-2xl font-bold mb-3 text-zinc-800 dark:text-zinc-100">{steps[step].title}</h2>
                    <p className="text-zinc-600 dark:text-zinc-300 text-lg">{steps[step].description}</p>
                  </div>

                  {/* Action Button */}
                  <Button
                    onClick={steps[step].action}
                    className="w-full p-4 rounded-2xl text-lg font-medium shadow-lg transition-all duration-300 bg-gradient-to-r from-yellow-300 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500"
                  >
                    <span className="text-gray-900">
                      {step === steps.length - 1 ? "See Your Impact" : "Continue"}
                    </span>
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="impact"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-8"
                >
                  <div className="text-center">
                    <h2 className="text-3xl font-bold mb-8 text-zinc-800 dark:text-zinc-100">Your Impact in Action! 🎉</h2>

                    {/* Real-time Impact Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <Card className="p-6 bg-white/80 dark:bg-zinc-900/80 border border-yellow-200/30 dark:border-yellow-400/20 rounded-2xl backdrop-blur-sm">
                          <div className="text-4xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                            {impactStats.mealsProvided}
                          </div>
                          <div className="text-sm font-medium text-zinc-600 dark:text-zinc-300">Meals Provided</div>
                        </Card>
                      </div>

                      <div>
                        <Card className="p-6 bg-white/80 dark:bg-zinc-900/80 border border-yellow-200/30 dark:border-yellow-400/20 rounded-2xl backdrop-blur-sm">
                          <div className="text-4xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                            {impactStats.dogsHelped}
                          </div>
                          <div className="text-sm font-medium text-zinc-600 dark:text-zinc-300">Dogs Helped</div>
                        </Card>
                      </div>

                      <div>
                        <Card className="p-6 bg-white/80 dark:bg-zinc-900/80 border border-yellow-200/30 dark:border-yellow-400/20 rounded-2xl backdrop-blur-sm">
                          <div className="text-4xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                            {impactStats.daysOfCare}
                          </div>
                          <div className="text-sm font-medium text-zinc-600 dark:text-zinc-300">Days of Care</div>
                        </Card>
                      </div>
                    </div>
                  </div>

                  {/* Share Impact */}
                  <div className="flex justify-center space-x-4">
                    <Button
                      variant="outline"
                      onClick={() => addNotification("Impact shared with your friends!")}
                      className="px-6 py-3 rounded-xl bg-white/80 dark:bg-zinc-900/80 border-yellow-200/30 dark:border-yellow-400/30 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-100/30 dark:hover:bg-yellow-400/10 backdrop-blur-sm"
                    >
                      <Share2 className="mr-2 h-4 w-4" />
                      Share Impact
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => addNotification("Photo added to your impact gallery!")}
                      className="px-6 py-3 rounded-xl bg-white/80 dark:bg-zinc-900/80 border-yellow-200/30 dark:border-yellow-400/30 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-100/30 dark:hover:bg-yellow-400/10 backdrop-blur-sm"
                    >
                      <Camera className="mr-2 h-4 w-4" />
                      Add Photo
                    </Button>
                  </div>

                  {/* Complete Flow */}
                  <Button
                    onClick={onComplete}
                    className="w-full p-4 rounded-2xl text-lg font-medium shadow-lg transition-all duration-300 bg-gradient-to-r from-yellow-300 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500"
                  >
                    <span className="text-gray-900 flex items-center justify-center">
                      <CheckCircle className="mr-2 h-5 w-5 text-gray-900" />
                      Complete Your Journey
                    </span>
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default DonationFlowScene;
