import React from 'react';
import type { ErrorInfo } from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: ErrorInfo) {
    // You can log error to Sentry or another service here
    console.error('ErrorBoundary caught an error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white p-8">
          <h1 className="text-3xl font-bold mb-4">Something went wrong.</h1>
          <p className="text-lg text-slate-300 mb-8 text-center max-w-md">An unexpected error occurred. Please refresh the page or try again later.</p>
        </div>
      );
    }
    return this.props.children;
  }
} 