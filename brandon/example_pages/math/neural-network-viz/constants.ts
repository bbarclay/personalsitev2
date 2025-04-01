import { Bot, Sparkles, Brain, Target, Binary, Trophy } from 'lucide-react';
import { TrainingPhase, PhaseMessage } from './types';

export const STORY_PHASES = [
  {
    title: "Meet Robbie's Helper",
    description: "This little robot is learning to help Robbie organize his toys. It needs to understand which toys go where!"
  },
  {
    title: "Learning the Basics",
    description: "The robot is figuring out that soft toys and building blocks should be in different areas."
  },
  {
    title: "Getting Better",
    description: "Now it's starting to see patterns - soft toys usually go together, and building blocks have their own space."
  },
  {
    title: "Fine-tuning",
    description: "The robot is getting really good at knowing where each toy belongs!"
  },
  {
    title: "Almost There",
    description: "Just a few more practice runs to perfect its toy organizing skills."
  },
  {
    title: "Ready to Help",
    description: "The robot has learned how to organize the toys perfectly! Time to help Robbie keep his room tidy!"
  }
] as const;

export type StoryPhase = typeof STORY_PHASES[number];

export const MESSAGES: Record<TrainingPhase, PhaseMessage> = {
  starting: { 
    icon: Bot, 
    text: 'Hello! I\'m getting ready to help organize the toys! 🤖' 
  },
  exploring: {
    icon: Sparkles,
    text: 'Looking around the room to see where all the toys are! ✨',
  },
  learning: {
    icon: Brain,
    text: "I'm starting to understand which toys go where! 🧸",
  },
  refining: {
    icon: Target,
    text: 'Getting better at sorting the toys into their proper places! 🎯',
  },
  finalizing: {
    icon: Binary,
    text: 'Almost done learning the perfect toy organization! 📚',
  },
  complete: {
    icon: Trophy,
    text: 'Yay! Now I know exactly how to keep the room tidy! 🎉',
  },
};