/**
 * Application constants and configuration
 */

// ============================================
// App Configuration
// ============================================
export const APP_CONFIG = {
  name: process.env.NEXT_PUBLIC_APP_NAME || 'Next.js Template',
  description: 'A modern Next.js template with TypeScript',
  version: '1.0.0',
  author: 'Your Name',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
} as const;

// ============================================
// Navigation
// ============================================
export const NAVIGATION_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Next.js', href: '/next' },
  { label: 'Start', href: '/start' },
] as const;

// ============================================
// External Links
// ============================================
export const EXTERNAL_LINKS = {
  nextjs: {
    docs: 'https://nextjs.org/docs',
    learn: 'https://nextjs.org/learn',
    github: 'https://github.com/vercel/next.js',
    examples: 'https://vercel.com/templates?framework=next.js',
  },
  vercel: {
    deploy: 'https://vercel.com/new',
    platform: 'https://vercel.com',
  },
} as const;

// ============================================
// Breakpoints
// ============================================
export const BREAKPOINTS = {
  xs: '480px',
  sm: '600px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// ============================================
// Animation Durations
// ============================================
export const ANIMATION_DURATION = {
  fast: 150,
  normal: 200,
  slow: 300,
} as const;

// ============================================
// Z-Index Scale
// ============================================
export const Z_INDEX = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modal: 1040,
  popover: 1050,
  tooltip: 1060,
  toast: 1070,
} as const;
