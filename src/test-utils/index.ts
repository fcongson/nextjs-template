/**
 * Testing utilities and helpers
 */

export * from './render';
export { default as userEvent } from '@testing-library/user-event';

// Test data factories
export const createMockUser = (overrides = {}) => ({
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  ...overrides,
});

// Mock handlers for common scenarios
export const mockIntersectionObserver = (isIntersecting = true) => {
  const mockObserver = jest.fn();
  const mockObserve = jest.fn();
  const mockUnobserve = jest.fn();
  const mockDisconnect = jest.fn();

  window.IntersectionObserver = jest.fn(() => ({
    observe: mockObserve,
    unobserve: mockUnobserve,
    disconnect: mockDisconnect,
    root: null,
    rootMargin: '',
    thresholds: [],
  }));

  return {
    mockObserver,
    mockObserve,
    mockUnobserve,
    mockDisconnect,
  };
};

// Wait for element to be removed
export const waitForElementToBeRemoved = async (element: HTMLElement) => {
  const { waitForElementToBeRemoved: rtlWaitForElementToBeRemoved } =
    await import('@testing-library/react');
  return rtlWaitForElementToBeRemoved(element);
};

// Custom matchers
export const customMatchers = {
  toBeVisibleInViewport: (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const isVisible =
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth);

    return {
      message: () =>
        `Expected element ${isVisible ? 'not ' : ''}to be visible in viewport`,
      pass: isVisible,
    };
  },
};

// Mock API responses
export const createMockApiResponse = <T>(data: T, success = true) => ({
  data,
  success,
  message: success ? 'Success' : 'Error occurred',
});

// Delay utility for testing async operations
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
