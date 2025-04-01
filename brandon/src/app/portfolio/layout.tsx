import React from 'react';

export const metadata = {
  title: 'Brandon Barclay | Open to Work',
  description: 'Portfolio and work opportunities',
}

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}
