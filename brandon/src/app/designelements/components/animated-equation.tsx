"use client";

import React from 'react';
import { motion } from 'framer-motion';

export function AnimatedEquation() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <motion.div 
      className="flex items-center justify-center text-3xl sm:text-4xl md:text-5xl font-bold mt-8 overflow-x-auto p-4 text-blue-600 dark:text-blue-400"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.span variants={itemVariants}>e</motion.span>
      <motion.sup variants={itemVariants}>iπ</motion.sup>
      <motion.span variants={itemVariants} className="mx-2">+</motion.span>
      <motion.span variants={itemVariants}>1</motion.span>
      <motion.span variants={itemVariants} className="mx-2">=</motion.span>
      <motion.span variants={itemVariants}>0</motion.span>
    </motion.div>
  );
} 