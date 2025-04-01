'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';

type WithActiveTabProps = {
  activeTab?: string;
};

export function withActiveTab<P extends WithActiveTabProps>(
  WrappedComponent: React.ComponentType<P>
) {
  return function WithActiveTabComponent(props: Omit<P, keyof WithActiveTabProps>) {
    const searchParams = useSearchParams();
    const activeTab = searchParams.get('tab') || 'solver';

    return (
      <WrappedComponent
        {...(props as P)}
        activeTab={activeTab}
      />
    );
  };
}