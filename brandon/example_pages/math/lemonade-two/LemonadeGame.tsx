import React, { useState } from 'react';
import AgeSelector from './AgeSelector';
import KidsIntro from './scenes/kids/LennyIntro';
import AdultIntro from './scenes/adult/LennyIntro';
import DogShelterScene from './scenes/DogShelterScene';
import BetterWayScene from './scenes/BetterWayScene';
import DonationFlowScene from './scenes/DonationFlowScene';
import CelebrationScene from './scenes/CelebrationScene';

type UserType = 'kids' | 'adult' | null;

interface LemonadeGameProps {
  onSelectKids: () => void;
  onSelectAdults: () => void;
}

const LemonadeGame: React.FC<LemonadeGameProps> = ({ onSelectKids, onSelectAdults }) => {
  const [userType, setUserType] = useState<UserType>(null);
  const [currentScene, setCurrentScene] = useState<'intro' | 'dogShelter' | 'betterWay' | 'donationFlow' | 'celebration'>('intro');

  const handleSelectKids = () => {
    setUserType('kids');
    onSelectKids();
  };

  const handleSelectAdults = () => {
    setUserType('adult');
    onSelectAdults();
  };

  // Render appropriate content based on selection
  if (!userType) {
    return (
      <AgeSelector
        onSelectKids={handleSelectKids}
        onSelectAdults={handleSelectAdults}
      />
    );
  }

  if (currentScene === 'intro') {
    return userType === 'kids' ? (
      <KidsIntro
        onComplete={() => setCurrentScene('dogShelter')}
        onInteract={() => { }}
      />
    ) : (
      <AdultIntro
        onComplete={() => setCurrentScene('dogShelter')}
        onInteract={() => { }}
      />
    );
  }

  if (currentScene === 'dogShelter') {
    return <DogShelterScene onComplete={() => setCurrentScene('betterWay')} earnedMoney={50} />;
  }

  if (currentScene === 'betterWay') {
    return <BetterWayScene onComplete={() => setCurrentScene('donationFlow')} />;
  }

  if (currentScene === 'donationFlow') {
    return <DonationFlowScene onComplete={() => setCurrentScene('celebration')} initialAmount={50} />;
  }

  return <CelebrationScene onRestart={() => setCurrentScene('intro')} />;
};

export default LemonadeGame;

export const App: React.FC = () => {
  const handleSelectKids = () => {
    console.log('Kids selected');
  };

  const handleSelectAdults = () => {
    console.log('Adults selected');
  };

  return (
    <LemonadeGame
      onSelectKids={handleSelectKids}
      onSelectAdults={handleSelectAdults}
    />
  );
};
