import React from 'react';
import { motion } from 'framer-motion';
import { ChaosTheory } from '../app/designelements/components/math-cards/animated-cards/ChaosTheory';
import { AnimatedEquation } from '../app/designelements/components/AnimatedEquation';

export const MathematicalBridgeSection: React.FC = () => {
  return (
    <>
      {/* Chaos Theory Visualization */}
      <section className="py-16 relative overflow-hidden bg-background/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-[600px] w-full rounded-xl overflow-hidden relative"
          >
            <ChaosTheory />
          </motion.div>
        </div>
      </section>

      {/* Mathematical Bridge */}
      <section className="py-16 bg-gradient-to-b from-background/50 to-background relative overflow-hidden backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-7xl mx-auto px-4"
        >
          <AnimatedEquation />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-center text-muted-foreground mt-4 italic"
          >
            "Mathematics is the language in which God has written the universe" - Galileo Galilei
          </motion.p>
        </motion.div>
      </section>
    </>
  );
};
