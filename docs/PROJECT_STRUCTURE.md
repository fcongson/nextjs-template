# Project Structure

This Next.js template follows a well-organized, scalable project structure that separates concerns and promotes reusability.

## 📁 Directory Overview

```
nextjs-template/
├── public/                     # Static assets
│   ├── favicon.ico
│   └── *.svg                  # SVG icons and images
├── src/                       # Source code
│   ├── app/                   # Next.js App Router pages
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx          # Home page
│   │   ├── next/             # Next.js info page
│   │   └── start/            # Getting started page
│   ├── components/           # Reusable React components
│   │   ├── ui/              # Basic UI components (Button, Input, etc.)
│   │   ├── layout/          # Layout-specific components
│   │   └── index.ts         # Component exports barrel
│   ├── hooks/               # Custom React hooks
│   │   ├── use-mounted.ts   # Client-side mounting hook
│   │   ├── use-debounce.ts  # Debouncing hook
│   │   ├── use-local-storage.ts  # localStorage hook
│   │   └── index.ts         # Hook exports barrel
│   ├── lib/                 # Utility functions and configurations
│   │   └── utils.ts         # Common utility functions
│   ├── styles/              # Organized CSS
│   │   ├── globals.css      # Global styles and CSS variables
│   │   ├── components/      # Component-specific styles
│   │   ├── layouts/         # Layout-specific styles
│   │   └── utilities/       # Utility CSS classes
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts         # Common types and interfaces
│   └── constants/           # Application constants
│       └── index.ts         # Configuration and constants
├── docs/                    # Documentation
│   ├── PROJECT_STRUCTURE.md  # This file
│   └── CSS_ORGANIZATION.md   # CSS organization guide
├── .env.example             # Environment variables template
├── tsconfig.json            # TypeScript configuration
├── next.config.mjs          # Next.js configuration
├── package.json             # Dependencies and scripts
└── README.md                # Project README
```

## 🧩 Core Concepts

### 1. **Separation of Concerns**
- **Components**: Reusable UI elements
- **Hooks**: Stateful logic extraction
- **Utils**: Pure utility functions
- **Types**: TypeScript definitions
- **Constants**: Configuration values

### 2. **Barrel Exports**
Each directory has an `index.ts` file that re-exports everything, making imports cleaner:

```tsx
// Instead of:
import { Button } from '../components/ui/Button';
import { PageLayout } from '../components/layout/PageLayout';

// You can write:
import { Button, PageLayout } from '@/components';
```

### 3. **Path Aliases**
Configured in `tsconfig.json` for cleaner imports:
- `@/components` → `src/components`
- `@/hooks` → `src/hooks`
- `@/lib` → `src/lib`
- `@/styles` → `src/styles`
- `@/types` → `src/types`
- `@/constants` → `src/constants`

## 📝 File Naming Conventions

### Components
- **PascalCase** for component files: `Button.tsx`
- **camelCase** for non-component files: `utils.ts`
- **kebab-case** for CSS files: `button.module.css`

### Directories
- **kebab-case** for all directories: `use-local-storage.ts`
- **PascalCase** for component directories when needed

## 🔧 Adding New Features

### Adding a New Component
1. Create component file in appropriate subdirectory of `src/components/`
2. Add corresponding CSS module in `src/styles/components/`
3. Export from `src/components/index.ts`
4. Add TypeScript types to `src/types/index.ts` if needed

### Adding a New Hook
1. Create hook file in `src/hooks/` with `use-` prefix
2. Export from `src/hooks/index.ts`
3. Add TypeScript types if needed

### Adding New Utilities
1. Add functions to `src/lib/utils.ts` or create new utility file
2. Add corresponding TypeScript types if needed

## 🎯 Benefits of This Structure

✅ **Scalability**: Easy to add new features without clutter
✅ **Maintainability**: Clear separation of concerns
✅ **Reusability**: Components and hooks can be easily reused
✅ **Type Safety**: Strong TypeScript integration
✅ **Developer Experience**: Clean imports and organized code
✅ **Team Collaboration**: Consistent structure for all developers

## 📚 Best Practices

### Component Organization
- Keep components small and focused
- Use composition over inheritance
- Extract reusable logic into custom hooks
- Keep styles close to components

### TypeScript Usage
- Define types for all props and return values
- Use `interface` for object shapes
- Use `type` for unions and computed types
- Export types that might be reused

### Import Organization
```tsx
// 1. External libraries
import React from 'react';
import { NextPage } from 'next';

// 2. Internal modules (absolute imports)
import { Button } from '@/components';
import { useMounted } from '@/hooks';

// 3. Relative imports
import styles from './styles.module.css';
```

### CSS Organization
- Use CSS Modules for component styles
- Keep utility classes in dedicated files
- Use CSS custom properties for theming
- Follow mobile-first responsive design

## 🚀 Extending the Structure

As your project grows, consider adding:
- `src/context/` - React Context providers
- `src/services/` - API services and data fetching
- `src/store/` - Global state management (Zustand, Redux)
- `src/middleware/` - Next.js middleware
- `tests/` - Test files and utilities
- `docs/api/` - API documentation
