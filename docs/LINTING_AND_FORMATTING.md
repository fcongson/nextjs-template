# Linting & Formatting Guide

This Next.js template includes a comprehensive code quality setup with ESLint, Prettier, and automated formatting tools to ensure consistent, high-quality code across your project.

## 🛠️ Tools Overview

### **ESLint**

- **Purpose**: Static analysis tool for identifying problematic patterns in JavaScript/TypeScript
- **Configuration**: `eslint.config.mjs`
- **Integration**: Next.js core web vitals + custom rules

### **Prettier**

- **Purpose**: Opinionated code formatter that enforces consistent style
- **Configuration**: `.prettierrc` and `.prettierignore`
- **Integration**: Automatic formatting on save (VSCode)

### **Husky + lint-staged**

- **Purpose**: Git hooks for automated quality checks
- **Integration**: Pre-commit hooks that run linting and formatting
- **Configuration**: `package.json` lint-staged section

## 📜 Available Scripts

### Basic Commands

```bash
# Lint all files
npm run lint

# Lint and fix auto-fixable issues
npm run lint:fix

# Lint with zero warnings tolerance
npm run lint:strict

# Format all files
npm run format

# Check if files are formatted correctly
npm run format:check

# Run TypeScript type checking
npm run type-check

# Run all quality checks (lint + format + type-check)
npm run code-quality
```

### Development Workflow

```bash
# Full pre-commit check (what runs before each commit)
npm run pre-commit

# Quick development check
npm run lint:fix && npm run format
```

## ⚙️ Configuration Details

### ESLint Rules

#### **Code Quality Rules**

```javascript
{
  \"prefer-const\": \"error\",           // Enforce const for immutable variables
  \"no-var\": \"error\",                 // Disallow var declarations
  \"no-console\": [\"warn\", { allow: [\"warn\", \"error\"] }], // Warn on console.log
  \"no-debugger\": \"error\",            // Disallow debugger statements
  \"no-duplicate-imports\": \"error\",   // Disallow duplicate imports
}
```

#### **React-Specific Rules**

```javascript
{
  \"react/prop-types\": \"off\",           // Using TypeScript instead
  \"react/react-in-jsx-scope\": \"off\",  // Not needed in Next.js
  \"react/jsx-key\": \"error\",           // Require keys in JSX arrays
  \"react/jsx-no-duplicate-props\": \"error\", // No duplicate props
  \"react/no-array-index-key\": \"warn\", // Warn against index as key
}
```

### Prettier Configuration

```json
{
  \"semi\": true,                    // Add semicolons
  \"trailingComma\": \"es5\",        // Trailing commas where valid in ES5
  \"singleQuote\": true,            // Use single quotes
  \"printWidth\": 80,               // Line wrap at 80 characters
  \"tabWidth\": 2,                  // 2 spaces per indentation
  \"bracketSpacing\": true,         // Spaces in object literals
  \"arrowParens\": \"always\"        // Parentheses around arrow function params
}
```

### Git Hooks (lint-staged)

```json
{
  \"lint-staged\": {
    \"*.{js,jsx,ts,tsx}\": [
      \"eslint --fix\",            // Fix ESLint issues
      \"prettier --write\"         // Format code
    ],
    \"*.{json,css,md}\": [
      \"prettier --write\"         // Format non-JS files
    ]
  }
}
```

## 🎯 VSCode Integration

### Required Extensions

The template includes recommended extensions in `.vscode/extensions.json`:

- **ESLint** (`dbaeumer.vscode-eslint`) - Real-time linting
- **Prettier** (`esbenp.prettier-vscode`) - Code formatting
- **TypeScript** (`ms-vscode.vscode-typescript-next`) - Enhanced TS support

### Auto-Configuration

The `.vscode/settings.json` automatically configures:

- **Format on save** - Code is formatted when you save
- **Fix on save** - ESLint issues are auto-fixed when possible
- **Import organization** - Imports are organized on save
- **Consistent indentation** - 2 spaces, no tabs

## 📋 Best Practices

### 1. **Consistent Import Organization**

```typescript
// ✅ Good - Organized imports
import React from 'react';
import { NextPage } from 'next';

import { Button } from '@/components';
import { useMounted } from '@/hooks';

import styles from './styles.module.css';
```

```typescript
// ❌ Bad - Unorganized imports
import styles from './styles.module.css';
import { Button } from '@/components';
import React from 'react';
import { useMounted } from '@/hooks';
```

### 2. **TypeScript Best Practices**

```typescript
// ✅ Good - Proper typing
interface UserProps {
  name: string;
  age: number;
}

function User({ name, age }: UserProps) {
  return <div>{name} is {age} years old</div>;
}
```

```typescript
// ❌ Bad - Using any
function User({ name, age }: any) {
  return <div>{name} is {age} years old</div>;
}
```

### 3. **React Best Practices**

```typescript
// ✅ Good - Keys in lists
{users.map((user) => (
  <div key={user.id}>{user.name}</div>
))}

// ❌ Bad - Index as key
{users.map((user, index) => (
  <div key={index}>{user.name}</div>
))}
```

## 🚀 Workflow Integration

### Pre-commit Workflow

```bash
1. Developer makes changes
2. Developer runs: git add .
3. Developer runs: git commit -m \"message\"
4. Pre-commit hook automatically runs:
   - lint-staged checks only staged files
   - ESLint fixes auto-fixable issues
   - Prettier formats code
   - If issues found, commit is blocked
5. Developer fixes remaining issues
6. Commit succeeds
```

### CI/CD Integration

```yaml
# Example GitHub Actions workflow
- name: Quality Check
  run: |
    npm ci
    npm run code-quality
    npm run test:ci
```

## 🛠️ Customization

### Adding ESLint Rules

Edit `eslint.config.mjs`:

```javascript
{
  rules: {
    // Add your custom rules here
    \"no-unused-vars\": \"error\",
    \"prefer-arrow-callback\": \"error\",
  }
}
```

### Customizing Prettier

Edit `.prettierrc`:

```json
{
  \"printWidth\": 120,     // Wider lines
  \"useTabs\": true,       // Use tabs instead of spaces
  \"semi\": false          // No semicolons
}
```

### Disabling Rules

```typescript
// Disable for next line
// eslint-disable-next-line no-console
console.log('Debug message');

// Disable for file
/* eslint-disable no-console */

// Disable in prettier
// prettier-ignore
const formatted   =   'weird     spacing';
```

## 🔧 Troubleshooting

### Common Issues

#### **ESLint and Prettier Conflicts**

- Solution: We use `eslint-config-prettier` to disable conflicting rules
- Prettier handles formatting, ESLint handles code quality

#### **Pre-commit Hook Not Running**

```bash
# Reinstall husky
rm -rf .husky
npx husky install
npx husky add .husky/pre-commit \"npx lint-staged\"
```

#### **VSCode Not Formatting on Save**

1. Install recommended extensions
2. Reload VSCode window
3. Check settings: `Cmd/Ctrl + Shift + P` → \"Preferences: Open Settings (JSON)\"

#### **Import Order Issues**

```bash
# Auto-fix import order
npm run lint:fix
```

### Performance Tips

#### **Speed Up Linting**

```bash
# Lint only changed files
npm run lint -- --cache

# Lint specific directory
npm run lint src/components
```

#### **Skip Hooks (Emergency)**

```bash
# Skip pre-commit hook (not recommended)
git commit --no-verify -m \"emergency fix\"
```

## 📊 Metrics & Reporting

### Code Quality Metrics

```bash
# Get detailed ESLint report
npm run lint -- --format=json --output-file=eslint-report.json

# Get Prettier statistics
npm run format:check -- --list-different
```

### Integration with IDEs

#### **WebStorm/IntelliJ**

- Enable ESLint: Settings → Languages & Frameworks → JavaScript → Code Quality Tools → ESLint
- Enable Prettier: Settings → Languages & Frameworks → JavaScript → Prettier

#### **Vim/Neovim**

- Use plugins like `ale` or `coc-eslint` for ESLint
- Use `prettier.nvim` for formatting

## 📚 Resources

- [ESLint Documentation](https://eslint.org/docs/latest/)
- [Prettier Configuration](https://prettier.io/docs/en/configuration.html)
- [Next.js ESLint](https://nextjs.org/docs/app/api-reference/config/eslint)
- [TypeScript ESLint](https://typescript-eslint.io/)
- [Husky Documentation](https://typicode.github.io/husky/)

## ✅ Quality Checklist

Before pushing code, ensure:

- [ ] `npm run lint` passes without warnings
- [ ] `npm run format:check` shows all files are formatted
- [ ] `npm run type-check` passes without errors
- [ ] `npm run test` passes all tests
- [ ] Pre-commit hooks are working
- [ ] VSCode shows no ESLint errors
- [ ] Code follows the established patterns
