/**
 * Custom render utility for React Testing Library
 * Provides common providers and utilities for testing
 */

import type { ReactElement, ReactNode } from 'react';
import { render as rtlRender, RenderOptions } from '@testing-library/react';

// Mock Next.js font components
jest.mock('next/font/google', () => ({
  Geist: () => ({
    variable: '--font-geist-sans',
  }),
  Geist_Mono: () => ({
    variable: '--font-geist-mono',
  }),
}));

// Wrapper component for providers
interface WrapperProps {
  children: ReactNode;
}

function TestWrapper({ children }: WrapperProps) {
  // Add any providers here (Theme, Context, etc.)
  return <div data-testid="test-wrapper">{children}</div>;
}

// Custom render function
function render(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return rtlRender(ui, {
    wrapper: TestWrapper,
    ...options,
  });
}

// Re-export everything
export * from '@testing-library/react';
export { render };
