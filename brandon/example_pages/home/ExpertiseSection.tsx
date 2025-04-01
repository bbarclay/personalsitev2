'use client'

import React from 'react';
import { motion } from 'framer-motion';
import ExpertiseFlow from '../ExpertiseFlow';

const ExpertiseSection = () => {
  return (
    <section className="mb-32">
      <motion.h2
        className="text-4xl font-bold mb-12 text-foreground text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Areas of Expertise
      </motion.h2>
      <ExpertiseFlow />
    </section>
  );
};

export default ExpertiseSection;