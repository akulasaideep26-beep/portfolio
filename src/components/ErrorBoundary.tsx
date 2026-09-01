import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in portfolio:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', color: '#fff', backgroundColor: '#020617', fontFamily: 'sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>Akula Saideep Portfolio</h1>
          <p style={{ color: '#94a3b8', marginBottom: '24px' }}>An error occurred while loading the application.</p>
          <button 
            onClick={() => window.location.reload()} 
            style={{ padding: '10px 20px', borderRadius: '8px', backgroundColor: '#2563eb', color: '#fff', border: 'none', cursor: 'pointer' }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
