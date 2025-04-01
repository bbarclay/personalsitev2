import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { BotBuilder3D } from './BotBuilder3D';

interface BotPersonality {
  name: string;
  traits: string[];
  expertise: string[];
  avatar: string;
}

const personalityTraits = [
  'Friendly', 'Professional', 'Humorous', 'Creative',
  'Analytical', 'Supportive', 'Enthusiastic', 'Patient'
];

const expertiseAreas = [
  'General Knowledge', 'Technical Support', 'Customer Service',
  'Education', 'Entertainment', 'Problem Solving'
];

const avatarEmojis = ['🤖', '🦾', '🤔', '🎯', '🌟', '💫', '🎮', '🚀'];

export const BotLab: React.FC = () => {
  const { colors } = useTheme();
  const [botPersonality, setBotPersonality] = useState<BotPersonality>({
    name: '',
    traits: [],
    expertise: [],
    avatar: '🤖'
  });
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeTab, setActiveTab] = useState<'design' | 'build'>('design');

  const handleTraitToggle = (trait: string) => {
    setBotPersonality(prev => ({
      ...prev,
      traits: prev.traits.includes(trait)
        ? prev.traits.filter(t => t !== trait)
        : [...prev.traits, trait].slice(0, 3)
    }));
    setIsAnimating(true);
  };

  const handleExpertiseToggle = (area: string) => {
    setBotPersonality(prev => ({
      ...prev,
      expertise: prev.expertise.includes(area)
        ? prev.expertise.filter(a => a !== area)
        : [...prev.expertise, area].slice(0, 2)
    }));
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <div className="space-y-6">
      {/* Tabs Navigation */}
      <div className="flex border-b mb-6" style={{ borderColor: colors.accent + '30' }}>
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ y: 1 }}
          className="px-6 py-3 text-lg border-b-2 transition-colors"
          style={{ 
            borderColor: activeTab === 'design' ? colors.primary : 'transparent',
            color: activeTab === 'design' ? colors.primary : colors.text + 'CC'
          }}
          onClick={() => setActiveTab('design')}
        >
          Design Bot
        </motion.button>
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ y: 1 }}
          className="px-6 py-3 text-lg border-b-2 transition-colors"
          style={{ 
            borderColor: activeTab === 'build' ? colors.secondary : 'transparent',
            color: activeTab === 'build' ? colors.secondary : colors.text + 'CC'
          }}
          onClick={() => setActiveTab('build')}
        >
          Build Components
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'design' ? (
          <motion.div
            key="design"
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="space-y-8"
          >
            {/* Bot Preview */}
            <motion.div
              className="flex items-center justify-center p-8 rounded-2xl"
              style={{
                background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20)`,
                border: `2px solid ${colors.primary}`
              }}
              animate={{
                scale: isAnimating ? [1, 1.05, 1] : 1,
                rotate: isAnimating ? [0, -5, 5, 0] : 0
              }}
              onAnimationComplete={() => setIsAnimating(false)}
            >
              <div className="text-center">
                <motion.div
                  className="text-6xl mb-4"
                  animate={{ rotate: isAnimating ? 360 : 0 }}
                >
                  {botPersonality.avatar}
                </motion.div>
                <input
                  type="text"
                  placeholder="Name your bot!"
                  value={botPersonality.name}
                  onChange={(e) => setBotPersonality(prev => ({ ...prev, name: e.target.value }))}
                  className="text-2xl font-bold text-center bg-transparent border-b-2 outline-none"
                  style={{ 
                    color: colors.text,
                    borderColor: colors.accent
                  }}
                />
              </div>
            </motion.div>

            {/* Avatar Selection */}
            <div>
              <h3 
                className="text-xl font-bold mb-4"
                style={{ color: colors.accent }}
              >
                Choose Your Bot's Avatar
              </h3>
              <div className="flex gap-4 flex-wrap">
                {avatarEmojis.map(emoji => (
                  <motion.button
                    key={emoji}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setBotPersonality(prev => ({ ...prev, avatar: emoji }))}
                    className="text-3xl p-3 rounded-lg"
                    style={{
                      background: botPersonality.avatar === emoji ? colors.primary : 'transparent',
                      border: `2px solid ${colors.primary}`
                    }}
                  >
                    {emoji}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Personality Traits */}
            <div>
              <h3 
                className="text-xl font-bold mb-4"
                style={{ color: colors.accent }}
              >
                Select Personality Traits (max 3)
              </h3>
              <div className="flex gap-3 flex-wrap">
                {personalityTraits.map(trait => (
                  <motion.button
                    key={trait}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleTraitToggle(trait)}
                    className="px-4 py-2 rounded-lg transition-colors"
                    style={{
                      background: botPersonality.traits.includes(trait) ? colors.secondary : 'transparent',
                      color: botPersonality.traits.includes(trait) ? colors.background : colors.secondary,
                      border: `2px solid ${colors.secondary}`
                    }}
                  >
                    {trait}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Expertise Areas */}
            <div>
              <h3 
                className="text-xl font-bold mb-4"
                style={{ color: colors.accent }}
              >
                Choose Expertise Areas (max 2)
              </h3>
              <div className="flex gap-3 flex-wrap">
                {expertiseAreas.map(area => (
                  <motion.button
                    key={area}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleExpertiseToggle(area)}
                    className="px-4 py-2 rounded-lg transition-colors"
                    style={{
                      background: botPersonality.expertise.includes(area) ? colors.neon : 'transparent',
                      color: botPersonality.expertise.includes(area) ? colors.background : colors.neon,
                      border: `2px solid ${colors.neon}`
                    }}
                  >
                    {area}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Preview Card */}
            <motion.div
              className="p-6 rounded-xl"
              style={{
                background: colors.background,
                border: `2px solid ${colors.accent}`,
                boxShadow: `0 0 20px ${colors.accent}40`
              }}
            >
              <h4 
                className="text-lg font-bold mb-3"
                style={{ color: colors.primary }}
              >
                Your Bot's Profile
              </h4>
              <div style={{ color: colors.text }}>
                <p className="mb-2">
                  <span className="text-2xl mr-2">{botPersonality.avatar}</span>
                  <span className="font-bold">{botPersonality.name || 'Unnamed Bot'}</span>
                </p>
                <p className="mb-2">
                  <span style={{ color: colors.secondary }}>Personality: </span>
                  {botPersonality.traits.length > 0 
                    ? botPersonality.traits.join(', ')
                    : 'No traits selected'}
                </p>
                <p>
                  <span style={{ color: colors.neon }}>Expertise: </span>
                  {botPersonality.expertise.length > 0
                    ? botPersonality.expertise.join(', ')
                    : 'No expertise selected'}
                </p>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="build"
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div 
              className="p-4 rounded-xl mb-6"
              style={{
                background: colors.background,
                border: `2px solid ${colors.secondary}`,
                boxShadow: `0 0 20px ${colors.secondary}40`
              }}
            >
              <h3 
                className="text-xl font-bold mb-2"
                style={{ color: colors.secondary }}
              >
                3D Bot Builder
              </h3>
              <p className="mb-4" style={{ color: colors.text }}>
                Customize your bot's hardware and software components to create the perfect virtual assistant.
              </p>
            </div>
            
            <BotBuilder3D />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Action Buttons */}
      <div className="flex justify-between pt-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 rounded-lg"
          style={{
            border: `2px solid ${colors.primary}`,
            color: colors.primary
          }}
          onClick={() => {
            // Reset bot customizations
            setBotPersonality({
              name: '',
              traits: [],
              expertise: [],
              avatar: '🤖'
            });
            setActiveTab('design');
          }}
        >
          Reset
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 rounded-lg"
          style={{
            background: colors.primary,
            color: '#ffffff'
          }}
          onClick={() => {
            // Toggle between tabs
            setActiveTab(prev => prev === 'design' ? 'build' : 'design');
          }}
        >
          {activeTab === 'design' ? 'Continue to Components' : 'Back to Design'}
        </motion.button>
      </div>
    </div>
  );
}; 