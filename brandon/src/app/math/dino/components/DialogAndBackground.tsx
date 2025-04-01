import React from 'react';
import { CHARACTERS, FLOATING_ICONS } from '../constants/game-data';
import type { IntroStep } from '../types';

interface DialogAndBackgroundProps {
  showIntro: boolean;
  gameStarted: boolean;
  darkMode: boolean;
  introStep: number;
  introSteps: IntroStep[];
  onNextStep: () => void;
}

export const DialogAndBackground: React.FC<DialogAndBackgroundProps> = ({
  showIntro,
  gameStarted,
  darkMode,
  introStep,
  introSteps,
  onNextStep,
}) => {
  return (
    <>
      {/* Floating Background Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {Array.from({ length: 18 }).map((_, i) => {
          const icon = FLOATING_ICONS[i % FLOATING_ICONS.length];
          const size = Math.random() * 50 + 30;
          const delay = Math.random() * 5;
          
          return (
            <div
              key={i}
              className="floating absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${size}px`,
                opacity: 0.15,
                animationDelay: `${delay}s`
              }}
            >
              {icon}
            </div>
          );
        })}
      </div>

      {/* Intro Dialog */}
      {showIntro && gameStarted && (
        <div className={`
          fixed bottom-8 left-1/2 -translate-x-1/2
          w-4/5 max-w-2xl
          ${darkMode ? 'bg-gray-800' : 'bg-white'}
          rounded-xl p-6 shadow-xl z-20
          flex flex-col gap-4
          animate-fadeIn
        `}>
          <div className="flex gap-4">
            <div
              className={`
                w-12 h-12 rounded-full
                flex items-center justify-center
                text-2xl
              `}
              style={{ backgroundColor: CHARACTERS[introSteps[introStep].character].color }}
            >
              {CHARACTERS[introSteps[introStep].character].emoji}
            </div>
            <div>
              <div className="font-bold mb-1">
                {CHARACTERS[introSteps[introStep].character].name}
              </div>
              <div className="animate-fadeIn">
                {introSteps[introStep].text}
              </div>
            </div>
          </div>

          <button
            onClick={onNextStep}
            className="
              self-end px-4 py-2 rounded-lg
              font-bold cursor-pointer
              hover:scale-105 transition-transform
              text-white
            "
            style={{ backgroundColor: CHARACTERS[introSteps[introStep].character].color }}
          >
            {introStep < introSteps.length - 1 ? 'Next' : "Let's Go!"}
          </button>
        </div>
      )}
    </>
  );
};
