'use client';

import dynamic from 'next/dynamic';

// Dynamically import the LemonadeGame component
const LemonadeGame = dynamic(
  () => import('@components/math/lemonade_two/LemonadeGame'),
  {
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    ),
    ssr: false // Disable server-side rendering for this component
  }
);

export default function LemonadePage() {
  const handleSelectKids = () => {
    console.log('Kids selected');
  };

  const handleSelectAdults = () => {
    console.log('Adults selected');
  };

  return (
    <main className="min-h-screen">
      <LemonadeGame
        onSelectKids={handleSelectKids}
        onSelectAdults={handleSelectAdults}
      />
    </main>
  );
}