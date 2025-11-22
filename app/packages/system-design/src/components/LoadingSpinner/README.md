# LoadingSpinner Component

A flexible and customizable loading spinner component with KTBioTech branding. Features animated logo, various variants, and optional fun facts about biotechnology.

## Features

- 🎨 Multiple variants (logo, spinner, dots)
- 📏 Multiple sizes (sm, md, lg, xl)
- 🎨 Color themes (blue, green, purple, orange)
- 💡 Optional fun facts about biotechnology
- ✨ Smooth animations with Tailwind CSS
- 🖼️ Logo-based loading animation

## Import

```tsx
import { LoadingSpinner } from '@ktbiotech/system-design';
```

## Usage

### Basic Usage

```tsx
<LoadingSpinner />
```

### With Custom Size and Text

```tsx
<LoadingSpinner size='lg' text='Loading your data...' />
```

### With Logo Variant (Default)

```tsx
<LoadingSpinner
  variant='logo'
  size='xl'
  text='Preparing your biotech experience...'
  showFunFact={true}
  color='blue'
/>
```

### With Spinner Variant

```tsx
<LoadingSpinner
  variant='spinner'
  size='md'
  text='Processing...'
  color='green'
/>
```

### With Dots Variant

```tsx
<LoadingSpinner variant='dots' size='sm' text='Loading...' color='purple' />
```

### With Custom Fun Fact

```tsx
<LoadingSpinner
  size='lg'
  showFunFact={true}
  funFact='Custom fun fact about your content!'
  text='Loading amazing content...'
/>
```

### In a Full-Screen Layout

```tsx
<div className='min-h-screen bg-white flex items-center justify-center'>
  <LoadingSpinner
    size='xl'
    variant='logo'
    text='Preparing your biotech experience...'
    showFunFact={true}
    color='blue'
    className='py-12'
  />
</div>
```

## Props

| Prop          | Type                                        | Default        | Description                  |
| ------------- | ------------------------------------------- | -------------- | ---------------------------- |
| `size`        | `'sm' \| 'md' \| 'lg' \| 'xl'`              | `'md'`         | Size of the spinner          |
| `text`        | `string`                                    | `'Loading...'` | Loading text to display      |
| `className`   | `string`                                    | `''`           | Additional CSS classes       |
| `variant`     | `'logo' \| 'spinner' \| 'dots'`             | `'logo'`       | Visual variant of the loader |
| `showFunFact` | `boolean`                                   | `false`        | Show random biotech fun fact |
| `funFact`     | `string`                                    | `undefined`    | Custom fun fact text         |
| `color`       | `'blue' \| 'green' \| 'purple' \| 'orange'` | `'blue'`       | Color theme                  |

## Variants

### logo

- Spinning ring with KTBioTech logo in the center
- Logo pulses gently
- Professional and branded look
- **Best for**: Main loading screens, page transitions

### spinner

- Simple spinning ring
- Clean and minimal
- Fast and lightweight
- **Best for**: Quick operations, inline loading

### dots

- Three bouncing dots
- Playful and dynamic
- Minimal space required
- **Best for**: Button loading states, small containers

## Size Guide

| Size | Dimensions | Text Size | Use Case                 |
| ---- | ---------- | --------- | ------------------------ |
| `sm` | 32x32px    | text-sm   | Inline, small containers |
| `md` | 48x48px    | text-base | Default, most common use |
| `lg` | 64x64px    | text-lg   | Page sections, modals    |
| `xl` | 80x80px    | text-xl   | Full-screen loading      |

## Color Themes

- **blue**: Primary brand color, professional
- **green**: Success states, nature/biotech theme
- **purple**: Premium feel, innovation
- **orange**: Energy, important actions

## Fun Facts

The component includes 5 built-in fun facts about DNA and biotechnology:

- DNA length in human cells
- Percentage of coding DNA
- DNA similarity between humans
- Gene expression differences
- Time to type the human genome

## Examples

### Page Loading Screen

```tsx
// app/loading.tsx
import { LoadingSpinner } from '@ktbiotech/system-design';

export default function Loading() {
  return (
    <div className='min-h-screen bg-white flex items-center justify-center'>
      <LoadingSpinner
        size='xl'
        variant='logo'
        text='Preparing your biotech experience...'
        showFunFact={true}
        color='blue'
        className='py-12'
      />
    </div>
  );
}
```

### Button Loading State

```tsx
import { Button } from '@ktbiotech/system-design';
import { LoadingSpinner } from '@ktbiotech/system-design';

function SubmitButton({ isLoading }) {
  return (
    <Button disabled={isLoading}>
      {isLoading ? (
        <LoadingSpinner variant='dots' size='sm' text='' />
      ) : (
        'Submit'
      )}
    </Button>
  );
}
```

### Modal Loading

```tsx
import { LoadingSpinner } from '@ktbiotech/system-design';

function Modal() {
  return (
    <div className='bg-white rounded-lg p-8'>
      <LoadingSpinner size='lg' text='Loading modal content...' color='green' />
    </div>
  );
}
```

## Accessibility

- Includes semantic HTML structure
- Text is readable by screen readers
- Color contrast meets WCAG standards
- Animation can be disabled via user preferences (prefers-reduced-motion)

## Performance

- Lightweight component (< 5KB)
- Uses CSS animations (GPU-accelerated)
- Lazy-loads company logo
- Minimal re-renders

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)
