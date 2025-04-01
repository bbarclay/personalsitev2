'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { TutorialOverlay } from './onboarding/TutorialOverlay';
import { HelpPanel } from './help/HelpPanel';

export function LinearSystemsLayout({ children }: { children: React.ReactNode }) {
  const [showTutorial, setShowTutorial] = useState(true);
  const [showHelp, setShowHelp] = useState(false);

  return (
    <>
      <div className="flex justify-end p-4 space-x-2">
        <Button 
          variant="outline" 
          onClick={() => setShowHelp(true)}
        >
          Help & Resources
        </Button>
        <Button 
          variant="outline" 
          onClick={() => setShowTutorial(true)}
        >
          Start Tutorial
        </Button>
      </div>

      {children}

      {showTutorial && (
        <TutorialOverlay
          onClose={() => setShowTutorial(false)}
          onComplete={() => setShowTutorial(false)}
        />
      )}

      {showHelp && (
        <HelpPanel
          onClose={() => setShowHelp(false)}
        />
      )}
    </>
  );
}