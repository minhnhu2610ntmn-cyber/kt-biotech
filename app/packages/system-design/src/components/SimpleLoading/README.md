# SimpleLoading Component

A full-screen or inline loading component with KTBioTech branding. Features an animated spinning ring with logo and optional dots animation.

## Features

- 🎯 Full-screen or inline modes
- 📏 Multiple sizes (sm, md, lg)
- 🎨 Customizable background colors
- 🖼️ Logo-based loading animation
- ✨ Smooth animations
- 💫 Optional animated dots

## Import

```tsx
import { SimpleLoading } from '@ktbiotech/system-design';
```

## Usage

### Basic Usage (Full-Screen)

```tsx
<SimpleLoading />
```

### With Custom Text

```tsx
<SimpleLoading text='Loading products...' />
```

### With Custom Background

```tsx
<SimpleLoading text='Loading content...' backgroundColor='bg-gray-50' />
```

### Without Dots

```tsx
<SimpleLoading text='Processing...' showDots={false} />
```

### Inline Mode (Not Full-Screen)

```tsx
<div className='container'>
  <SimpleLoading fullScreen={false} backgroundColor='bg-white' size='sm' />
</div>
```

### Large Size with Custom Background

```tsx
<SimpleLoading
  size='lg'
  text='Loading amazing content...'
  backgroundColor='bg-[#F7FBFD]'
  showDots={true}
/>
```

## Props

| Prop              | Type                   | Default        | Description                             |
| ----------------- | ---------------------- | -------------- | --------------------------------------- |
| `text`            | `string`               | `'Loading...'` | Loading text to display                 |
| `showDots`        | `boolean`              | `true`         | Show animated dots below text           |
| `size`            | `'sm' \| 'md' \| 'lg'` | `'md'`         | Size of the spinner                     |
| `className`       | `string`               | `''`           | Additional CSS classes                  |
| `fullScreen`      | `boolean`              | `true`         | Full-screen mode with fixed positioning |
| `backgroundColor` | `string`               | `'bg-white'`   | Background color (Tailwind class)       |

## Size Guide

| Size | Logo Size | Spinner Size | Use Case                 |
| ---- | --------- | ------------ | ------------------------ |
| `sm` | 48x48px   | 64x64px      | Small sections, inline   |
| `md` | 64x64px   | 80x80px      | Default, most common     |
| `lg` | 80x80px   | 96x96px      | Large sections, emphasis |

## Full-Screen vs Inline

### Full-Screen Mode (default)

- Fixed positioning covering entire viewport
- z-index of 50 (high priority)
- Perfect for page-level loading states
- Blocks user interaction

### Inline Mode

- Flows with document layout
- Respects parent container
- Good for section-level loading
- Allows interaction with other elements

## Examples

### Page Loading Screen

```tsx
// app/[locale]/gioi-thieu/loading.tsx
import { SimpleLoading } from '@ktbiotech/system-design';

export default function AboutLoading() {
  return (
    <SimpleLoading
      text='Loading about information...'
      backgroundColor='bg-[#F7FBFD]'
      size='md'
    />
  );
}
```

### Product Loading

```tsx
// app/[locale]/san-pham/[slug]/loading.tsx
import { SimpleLoading } from '@ktbiotech/system-design';

export default function ProductDetailLoading() {
  return (
    <SimpleLoading
      text='Loading product details...'
      backgroundColor='bg-gray-50'
      size='md'
    />
  );
}
```

### Contact Page Loading

```tsx
// app/[locale]/lien-he/loading.tsx
import { SimpleLoading } from '@ktbiotech/system-design';

export default function ContactLoading() {
  return (
    <SimpleLoading
      text='Loading contact information...'
      backgroundColor='bg-gray-50'
      size='md'
    />
  );
}
```

### Inline Section Loading

```tsx
import { SimpleLoading } from '@ktbiotech/system-design';

function ProductSection({ isLoading }) {
  if (isLoading) {
    return (
      <div className='bg-white rounded-lg p-8'>
        <SimpleLoading
          fullScreen={false}
          text='Loading products...'
          size='sm'
          className='py-12'
        />
      </div>
    );
  }

  return <ProductGrid />;
}
```

### Minimal Loading (No Dots)

```tsx
<SimpleLoading text='Processing your request...' showDots={false} size='sm' />
```

## Background Colors

You can use any Tailwind background color class:

```tsx
// Solid colors
<SimpleLoading backgroundColor='bg-white' />
<SimpleLoading backgroundColor='bg-gray-50' />
<SimpleLoading backgroundColor='bg-gray-100' />

// Brand colors
<SimpleLoading backgroundColor='bg-[#F7FBFD]' />

// Transparent
<SimpleLoading backgroundColor='bg-transparent' />
```

## Animation Details

### Spinning Ring

- Rotates 360 degrees continuously
- Blue and green gradient borders
- Smooth CSS transition
- 4px border width

### Logo

- Pulses gently (opacity animation)
- Centered within spinning ring
- Maintains aspect ratio
- Priority loading for best performance

### Dots

- Three dots bouncing in sequence
- 0.1s and 0.2s animation delays
- Blue and green colors matching brand
- 2x2px size

## Accessibility

- Semantic HTML structure
- Loading text announced by screen readers
- High contrast colors (WCAG AA compliant)
- Animation respects user preferences
- Clear visual feedback

## Performance

- Lightweight component (< 3KB)
- CSS-only animations (GPU-accelerated)
- Optimized logo loading with Next.js Image
- No JavaScript animations
- Minimal re-renders

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Tips

1. **Use full-screen mode** for page-level loading states
2. **Use inline mode** for section-level loading
3. **Match background color** to your page design
4. **Hide dots** for minimal designs
5. **Use appropriate size** based on context
6. **Keep text concise** and descriptive
7. **Consider accessibility** when choosing backgrounds

## Comparison with LoadingSpinner

| Feature            | SimpleLoading | LoadingSpinner          |
| ------------------ | ------------- | ----------------------- |
| Full-screen mode   | Yes (default) | No                      |
| Variants           | Single        | 3 (logo, spinner, dots) |
| Fun facts          | No            | Yes                     |
| Color themes       | Fixed         | 4 themes                |
| Background control | Yes           | No                      |
| Complexity         | Simple        | Flexible                |
| Best for           | Page loading  | Versatile use           |
