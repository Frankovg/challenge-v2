# Button Component

A Material UI Button component wrapped with styled-components, using the app's design tokens for consistent styling across light and dark themes.

## Features

- **Custom Variants**: `primary`, `secondary`, `outlined`, `text`
- **Design Token Integration**: Uses CSS custom properties for theming
- **Full MUI Support**: Inherits all Material UI Button props
- **Client Component**: Uses `'use client'` directive for React hooks
- **Type Safe**: Full TypeScript support with extended prop types
- **Accessible**: Includes focus-visible states and disabled handling
- **Responsive**: Adapts to light/dark theme automatically

## Usage

```tsx
import { Button } from 'components/ui/Button'

// Primary button (default)
<Button variant="primary">Save Changes</Button>

// Secondary button
<Button variant="secondary">Cancel</Button>

// Outlined button
<Button variant="outlined">Learn More</Button>

// Text button
<Button variant="text">Skip</Button>
```

## Props

The component extends all Material UI `ButtonProps` with a custom `variant` prop:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'outlined' \| 'text'` | `'primary'` | Button style variant |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Button size |
| `fullWidth` | `boolean` | `false` | Make button full width |
| `disabled` | `boolean` | `false` | Disable button interaction |
| `onClick` | `function` | - | Click handler |
| `href` | `string` | - | Render as link |
| `startIcon` | `ReactNode` | - | Icon before text |
| `endIcon` | `ReactNode` | - | Icon after text |
| `loading` | `boolean` | `false` | Show loading indicator |
| `children` | `ReactNode` | - | Button content |

Plus all other [MUI Button props](https://mui.com/material-ui/api/button/).

## Examples

### With Icons

```tsx
import { Package, Plus, Trash2 } from 'lucide-react'

<Button variant="primary" startIcon={<Package size={16} />}>
  Pack Items
</Button>

<Button variant="secondary" startIcon={<Plus size={16} />}>
  Add Package
</Button>

<Button variant="outlined" startIcon={<Trash2 size={16} />}>
  Remove
</Button>
```

### Different Sizes

```tsx
<Button variant="primary" size="small">Small</Button>
<Button variant="primary" size="medium">Medium</Button>
<Button variant="primary" size="large">Large</Button>
```

### Disabled State

```tsx
<Button variant="primary" disabled>
  Disabled Button
</Button>
```

### Loading State

```tsx
<Button variant="primary" loading>
  Loading...
</Button>

<Button
  variant="secondary"
  loading
  loadingPosition="start"
  startIcon={<Package size={16} />}
>
  Processing
</Button>
```

### As Link

```tsx
<Button variant="outlined" href="https://example.com" component="a">
  Visit Website
</Button>
```

### Full Width

```tsx
<Button variant="primary" fullWidth>
  Submit Form
</Button>
```

### With Click Handler

```tsx
<Button
  variant="primary"
  onClick={() => console.log('Clicked!')}
>
  Click Me
</Button>
```

## Design Tokens

The component uses the following CSS custom properties from the app's design system:

### Primary Variant
- `--button-primary-bg`
- `--button-primary-bg-hover`
- `--button-primary-bg-active`
- `--button-primary-text`

### Secondary Variant
- `--button-secondary-bg`
- `--button-secondary-bg-hover`
- `--button-secondary-bg-active`
- `--button-secondary-text`

### Outlined & Text Variants
- `--text-primary`
- `--text-link`
- `--text-link-hover`
- `--bg-hover`
- `--bg-active`
- `--border-primary`
- `--border-focus`

### Spacing & Typography
- `--spacing-xs`, `--spacing-sm`, `--spacing-md`, `--spacing-lg`
- `--font-family-base`
- `--font-size-xs`, `--font-size-sm`, `--font-size-base`
- `--font-weight-medium`
- `--line-height-normal`

### Effects
- `--radius-md` - Border radius
- `--shadow-sm`, `--shadow-md` - Box shadows
- `--transition-fast` - Transition duration

## Theme Support

The button automatically adapts to the app's theme (light/dark mode) through CSS custom properties. No additional configuration needed.

## Testing

The component includes comprehensive tests covering:
- Rendering all variants
- Click handlers
- Disabled states
- Size variants
- Full width mode
- Icons (start/end)
- Link rendering
- Custom class names

Run tests:
```bash
yarn test Button.test.tsx
```

## Files

- [Button.tsx](./Button.tsx) - Component implementation
- [Button.styles.ts](./Button.styles.ts) - Styled component styles
- [Button.test.tsx](./Button.test.tsx) - Component tests
- [Button.example.tsx](./Button.example.tsx) - Usage examples
- [index.ts](./index.ts) - Barrel export
