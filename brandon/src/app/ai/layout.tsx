import React from 'react';

export default function AILayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <main>
        {children}
      </main>
    </div>
  );
} 