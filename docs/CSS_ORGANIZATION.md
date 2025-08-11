# CSS Organization Guide

This template uses a structured approach to CSS organization for better maintainability and reusability.

## 📁 File Structure

```
src/
├── styles/
│   ├── globals.css                 # Global styles, variables, resets
│   ├── components/                 # Reusable component styles
│   │   ├── buttons.module.css      # Button variants
│   │   ├── forms.module.css        # Form components
│   │   └── cards.module.css        # Card components
│   ├── layouts/                    # Layout-related styles
│   │   ├── page.module.css         # Page layout components
│   │   └── grid.module.css         # Grid systems
│   └── utilities/                  # Utility classes
│       ├── typography.module.css   # Text-related utilities
│       ├── spacing.module.css      # Margin/padding utilities
│       └── animations.module.css   # Animation utilities
├── app/
│   ├── page.module.css            # Page-specific styles only
│   ├── about/
│   │   └── page.module.css        # About page specific styles
│   └── ...
```

## 🎯 CSS Modules Strategy

### 1. **Global Styles** (`src/styles/globals.css`)
- CSS custom properties (variables)
- Global resets and base styles
- Typography defaults
- Accessibility improvements

### 2. **Component Styles** (`src/styles/components/`)
- Reusable UI components
- Use CSS Module composition with `composes:`
- Consistent naming conventions

### 3. **Layout Styles** (`src/styles/layouts/`)
- Page layouts and grids
- Responsive utilities
- Container styles

### 4. **Utility Styles** (`src/styles/utilities/`)
- Single-purpose utility classes
- Typography helpers
- Spacing utilities

### 5. **Page-Specific Styles** (`src/app/**/page.module.css`)
- Only unique styles for that specific page
- Compose from shared modules when possible

## 🔧 Usage Examples

### Using Shared Components
```tsx
import buttonStyles from "@/styles/components/buttons.module.css";
import layoutStyles from "@/styles/layouts/page.module.css";

<div className={layoutStyles.pageGrid}>
  <button className={buttonStyles.primary}>
    Click me
  </button>
</div>
```

### CSS Module Composition
```css
/* In buttons.module.css */
.base {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
}

.primary {
  composes: base;
  background: var(--foreground);
  color: var(--background);
}

.secondary {
  composes: base;
  border: 1px solid var(--gray-alpha-200);
}
```

## 🎨 Design System Variables

All design tokens are centralized in `globals.css`:

```css
:root {
  /* Colors */
  --background: #ffffff;
  --foreground: #171717;
  
  /* Spacing Scale */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-full: 128px;
}
```

## 📱 Responsive Design

Use consistent breakpoints in all modules:
```css
/* Mobile first approach */
.component {
  /* Base mobile styles */
}

@media (min-width: 600px) {
  .component {
    /* Tablet styles */
  }
}

@media (min-width: 1024px) {
  .component {
    /* Desktop styles */
  }
}
```

## 🚀 Alternative Approaches

### Option A: Tailwind CSS
For utility-first approach, consider adding Tailwind:
```bash
npm install tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Option B: Styled Components
For CSS-in-JS approach:
```bash
npm install styled-components
npm install --save-dev @types/styled-components
```

### Option C: CSS Variables + Utility Classes
Create a utility-first system with CSS modules:
```css
.flex { display: flex; }
.items-center { align-items: center; }
.gap-4 { gap: var(--spacing-md); }
```

## 🔍 Benefits of This Approach

✅ **Reusability**: Shared components reduce duplication
✅ **Maintainability**: Clear separation of concerns
✅ **Type Safety**: CSS Modules provide className validation
✅ **Performance**: Only used styles are bundled
✅ **Developer Experience**: Clear organization and IntelliSense
✅ **Scalability**: Easy to add new components and utilities

## 📋 Best Practices

1. **Use semantic class names**: `.submitButton` not `.redButton`
2. **Compose from base classes**: Reduce duplication with `composes:`
3. **Mobile-first responsive design**: Start with mobile styles
4. **Consistent naming**: Use kebab-case for CSS, camelCase for imports
5. **Group related styles**: Keep component variants together
6. **Use CSS custom properties**: Make themes and variations easy
