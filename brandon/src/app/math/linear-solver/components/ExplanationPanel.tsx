'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ExplanationPanelProps {
  explanation: string;
}

export default function ExplanationPanel({ explanation }: ExplanationPanelProps) {
  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2>Understanding Linear Equations</h2>
        <p>{explanation}</p>
      </div>
    </div>
  );
} 