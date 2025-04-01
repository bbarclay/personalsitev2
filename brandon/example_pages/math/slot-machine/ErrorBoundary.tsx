import React from 'react';

export class SlotMachineErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Slot Machine Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-state">
          Something went wrong. Please refresh.
        </div>
      );
    }

    return this.props.children;
  }
}

export const withErrorBoundary = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P> => {
  const WithErrorBoundary: React.FC<P> = (props) => (
    <SlotMachineErrorBoundary>
      <WrappedComponent {...props} />
    </SlotMachineErrorBoundary>
  );
  WithErrorBoundary.displayName = `WithErrorBoundary(${getDisplayName(WrappedComponent)})`;
  return WithErrorBoundary;
};

function getDisplayName<P>(WrappedComponent: React.ComponentType<P>): string {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
