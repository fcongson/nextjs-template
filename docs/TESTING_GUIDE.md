# Testing Guide

This Next.js template includes a comprehensive testing setup using Jest, React Testing Library, and modern testing best practices.

## 🧪 Testing Stack

- **Jest** - JavaScript testing framework
- **React Testing Library** - Testing utilities for React components
- **Jest DOM** - Custom Jest matchers for DOM testing
- **User Event** - Simulates user interactions
- **JSdom** - DOM implementation for testing environment

## 📁 Test File Structure

```
src/
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   └── Button.test.tsx        # Component tests
├── hooks/
│   ├── use-mounted.ts
│   ├── use-mounted.test.ts        # Hook tests
│   └── use-debounce.test.ts
├── lib/
│   ├── utils.ts
│   └── utils.test.ts              # Utility tests
└── test-utils/
    ├── index.ts                   # Testing utilities
    └── render.tsx                 # Custom render function
```

## 🚀 Running Tests

### Basic Commands

```bash
# Run all tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run tests for CI (no watch, with coverage)
npm run test:ci
```

### Advanced Jest Commands

```bash
# Run specific test file
npm test Button.test.tsx

# Run tests matching pattern
npm test -- --testNamePattern="renders"

# Run tests in specific directory
npm test src/hooks

# Update snapshots
npm test -- --updateSnapshot

# Run tests with verbose output
npm test -- --verbose
```

## 📝 Writing Tests

### Component Testing

```tsx
import { render, screen, userEvent } from '@/test-utils';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole('button', { name: 'Click me' })
    ).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Clickable</Button>);

    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Hook Testing

```tsx
import { renderHook, act } from '@testing-library/react';
import { useToggle } from './use-toggle';

describe('useToggle', () => {
  it('toggles boolean state', () => {
    const { result } = renderHook(() => useToggle(false));

    expect(result.current[0]).toBe(false);

    act(() => {
      result.current[1](); // Call toggle function
    });

    expect(result.current[0]).toBe(true);
  });
});
```

### Utility Testing

```tsx
import { capitalize, formatNumber } from './utils';

describe('String Utilities', () => {
  describe('capitalize', () => {
    it('capitalizes first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
    });

    it('handles empty string', () => {
      expect(capitalize('')).toBe('');
    });
  });
});
```

## 🎭 Mocking Strategies

### Mock Next.js Components

```tsx
// Mock Next.js Link
jest.mock('next/link', () => {
  return function MockLink({ children, href, ...props }: any) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

// Mock Next.js Image
jest.mock('next/image', () => {
  return function MockImage({ src, alt, ...props }: any) {
    return <img src={src} alt={alt} {...props} />;
  };
});
```

### Mock API Calls

```tsx
// Mock fetch
global.fetch = jest.fn();

beforeEach(() => {
  (fetch as jest.Mock).mockClear();
});

it('fetches user data', async () => {
  const mockUser = { id: 1, name: 'John' };

  (fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => mockUser,
  });

  const user = await fetchUser(1);
  expect(user).toEqual(mockUser);
});
```

### Mock Local Storage

```tsx
// Already mocked globally in jest.setup.js
it('saves to localStorage', () => {
  const mockSetItem = jest.spyOn(Storage.prototype, 'setItem');

  saveUserPreference('theme', 'dark');

  expect(mockSetItem).toHaveBeenCalledWith('theme', 'dark');
});
```

## 🔧 Custom Testing Utilities

### Custom Render

```tsx
// src/test-utils/render.tsx
import { render as rtlRender } from '@testing-library/react';

function render(ui: ReactElement, options?: RenderOptions) {
  return rtlRender(ui, {
    wrapper: TestWrapper, // Add providers here
    ...options,
  });
}
```

### Mock Data Factories

```tsx
// src/test-utils/index.ts
export const createMockUser = (overrides = {}) => ({
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  ...overrides,
});

// Usage in tests
const user = createMockUser({ name: 'Custom Name' });
```

## 📊 Coverage Configuration

Coverage is configured in `jest.config.mjs`:

```javascript
coverageThreshold: {
  global: {
    branches: 70,
    functions: 70,
    lines: 70,
    statements: 70,
  },
},

collectCoverageFrom: [
  'src/**/*.{js,jsx,ts,tsx}',
  '!src/**/*.d.ts',
  '!src/**/index.{js,jsx,ts,tsx}', // Exclude barrel exports
  '!src/types/**', // Exclude type definitions
  '!src/constants/**', // Exclude constants
],
```

## 🎯 Testing Best Practices

### 1. **Test Structure**

- Use `describe` blocks to group related tests
- Use descriptive test names
- Follow Arrange-Act-Assert pattern

```tsx
describe('Calculator', () => {
  describe('add function', () => {
    it('adds two positive numbers correctly', () => {
      // Arrange
      const a = 2;
      const b = 3;

      // Act
      const result = add(a, b);

      // Assert
      expect(result).toBe(5);
    });
  });
});
```

### 2. **Query Priorities**

Use queries in this order of preference:

1. **Accessible queries** (getByRole, getByLabelText)
2. **Semantic queries** (getByAltText, getByTitle)
3. **Test ID queries** (getByTestId) - last resort

```tsx
// ✅ Good - accessible
screen.getByRole('button', { name: 'Submit' });
screen.getByLabelText('Email');

// ❌ Avoid - implementation details
screen.getByClassName('btn-primary');
```

### 3. **Async Testing**

Always use async/await for user events and async operations:

```tsx
it('submits form on enter', async () => {
  const user = userEvent.setup();
  render(<LoginForm />);

  const emailInput = screen.getByLabelText('Email');
  await user.type(emailInput, 'test@example.com');
  await user.keyboard('{Enter}');

  await waitFor(() => {
    expect(screen.getByText('Login successful')).toBeInTheDocument();
  });
});
```

### 4. **Mock Cleanup**

Always clean up mocks between tests:

```tsx
beforeEach(() => {
  jest.clearAllMocks();
});

// Or for specific mocks
afterEach(() => {
  jest.restoreAllMocks();
});
```

## 🐛 Debugging Tests

### Console Output

```bash
# Run with verbose output
npm test -- --verbose

# Run single test file with logs
npm test Button.test.tsx -- --no-cache
```

### Debug Mode

```tsx
import { screen } from '@testing-library/react';

// Debug what's in the DOM
screen.debug(); // Shows entire DOM
screen.debug(screen.getByTestId('my-element')); // Shows specific element
```

### VS Code Integration

Add to `.vscode/settings.json`:

```json
{
  \"jest.jestCommandLine\": \"npm test --\",
  \"jest.autoRun\": \"watch\",
  \"jest.showCoverageOnLoad\": true
}
```

## 📈 Performance Tips

### 1. **Optimize Test Runs**

```bash
# Run tests in parallel
npm test -- --maxWorkers=4

# Run only changed files
npm test -- --onlyChanged

# Skip coverage for faster runs during development
npm test -- --passWithNoTests --silent
```

### 2. **Mock Heavy Dependencies**

```tsx
// Mock heavy libraries
jest.mock('large-library', () => ({
  heavyFunction: jest.fn(() => 'mocked result'),
}));
```

### 3. **Use Test Utilities**

Always use the custom render and utilities from `@/test-utils` for consistency.

## 🔄 CI/CD Integration

### GitHub Actions Example

```yaml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run test:ci
      - uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info
```

## 📚 Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Common Mistakes with RTL](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Jest DOM Matchers](https://github.com/testing-library/jest-dom#custom-matchers)
