# Dual Logo SEO Strategy

## 📊 Overview

Chiến lược sử dụng **hai logo khác nhau** (logo.png và logo2.png) để tối ưu SEO preview trên các platforms và devices khác nhau.

## 🎨 Logo Specifications

### Logo.png (Horizontal/Square)
- **File**: `/public/logo.png`
- **Dimensions**: 512 x 512 pixels
- **Aspect Ratio**: 1:1 (Square)
- **Orientation**: Horizontal/Square
- **Best for**: 
  - Twitter summary card
  - Square thumbnails
  - General social media
  - Fallback option

### Logo2.png (Vertical/Portrait)
- **File**: `/public/logo2.png`
- **Dimensions**: 400 x 560 pixels
- **Aspect Ratio**: ~0.71:1 (Portrait)
- **Orientation**: Vertical
- **Best for**:
  - Twitter summary_large_image
  - Mobile devices
  - Instagram/Stories format
  - Primary social media preview

## 🚀 Implementation Strategy

### Multi-Image Approach

Open Graph supports **multiple images**, allowing platforms to choose the most appropriate one:

```typescript
openGraph: {
  images: [
    verticalImage,    // Primary: logo2.png (400x560)
    horizontalImage,  // Fallback: logo.png (512x512)
  ],
}
```

### Platform Selection Logic

Different platforms will automatically select the best image:

1. **Facebook/LinkedIn**: 
   - Will choose from available images
   - Typically prefers first image (vertical)
   - Falls back to horizontal if vertical doesn't fit

2. **Twitter**:
   - Uses dedicated Twitter Card tags
   - We explicitly set vertical for `summary_large_image`
   - Better mobile display

3. **WhatsApp/Telegram**:
   - Uses Open Graph images
   - Will select based on their own algorithm
   - Having both options ensures best display

4. **Google Search**:
   - Respects Open Graph tags
   - Multiple images provide flexibility
   - Better rich snippet display

## 📱 Code Structure

### Core Functions

#### 1. `getLogoImages()`
Returns both logo configurations:

```typescript
export function getLogoImages() {
  return {
    vertical: {
      url: 'https://ktbiotech.com/logo2.png',
      width: 400,
      height: 560,
      alt: 'KTBioTech logo',
      type: 'image/png',
    },
    horizontal: {
      url: 'https://ktbiotech.com/logo.png',
      width: 512,
      height: 512,
      alt: 'KTBioTech logo',
      type: 'image/png',
    },
  };
}
```

#### 2. `getHomeMetadata(locale)`
Homepage metadata with both images:

```typescript
const { vertical, horizontal } = getLogoImages();

openGraph: {
  images: [vertical, horizontal],  // Multiple images
},
twitter: {
  card: 'summary_large_image',
  images: [vertical.url],  // Vertical for Twitter
}
```

#### 3. `getPageMetadata({ preferVertical })`
Flexible metadata for any page:

```typescript
getPageMetadata({
  locale: 'vi',
  titleSuffix: 'About Us',
  description: 'Learn about KTBioTech...',
  path: '/about',
  preferVertical: true,  // Choose primary image
});
```

## 🎯 Usage Examples

### Example 1: Homepage (Default)

```typescript
// app/[locale]/page.tsx
export async function generateMetadata({ params }) {
  const { locale } = await params;
  return getHomeMetadata(locale);
}
```

**Result:**
- Open Graph: [vertical, horizontal]
- Twitter: vertical
- All platforms have options

### Example 2: About Page (Prefer Vertical)

```typescript
// app/[locale]/about/page.tsx
export async function generateMetadata({ params }) {
  const { locale } = await params;
  return getPageMetadata({
    locale,
    titleSuffix: 'About KTBioTech',
    description: 'Learn about our biotechnology solutions',
    path: '/about',
    preferVertical: true,  // Mobile-friendly
  });
}
```

### Example 3: Product Page (Prefer Horizontal)

```typescript
// app/[locale]/products/[slug]/page.tsx
export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  return getPageMetadata({
    locale,
    titleSuffix: productName,
    description: productDescription,
    path: `/products/${slug}`,
    preferVertical: false,  // Square for product display
  });
}
```

## 📊 Platform-Specific Behavior

### Facebook
```html
<!-- Facebook will see both images -->
<meta property="og:image" content="https://ktbiotech.com/logo2.png" />
<meta property="og:image:width" content="400" />
<meta property="og:image:height" content="560" />

<meta property="og:image" content="https://ktbiotech.com/logo.png" />
<meta property="og:image:width" content="512" />
<meta property="og:image:height" content="512" />
```

**Facebook Choice:**
- Desktop: May use either based on layout
- Mobile: Likely prefers vertical
- News Feed: Adapts to card size

### Twitter
```html
<!-- Twitter Card explicitly uses vertical -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="https://ktbiotech.com/logo2.png" />
```

**Twitter Behavior:**
- `summary_large_image`: Uses vertical (400x560)
- Better display on mobile Twitter
- Larger preview card

### LinkedIn
```html
<!-- LinkedIn reads Open Graph tags -->
<meta property="og:image" content="https://ktbiotech.com/logo2.png" />
<meta property="og:image" content="https://ktbiotech.com/logo.png" />
```

**LinkedIn Choice:**
- Feed posts: Typically vertical
- Company page: Adapts to space
- Mobile: Prefers vertical

## 🎨 Visual Comparison

### Vertical Logo (logo2.png)
```
┌─────────┐
│         │
│  LOGO   │  <- Taller, better for mobile
│  TEXT   │     Better for stories format
│         │     Professional vertical layout
└─────────┘
400 x 560
```

### Horizontal Logo (logo.png)
```
┌──────────────┐
│  LOGO  TEXT  │  <- Wider, classic layout
└──────────────┘     Better for desktop
    512 x 512        Square format
```

## ✅ Benefits of Dual Logo Strategy

### 1. **Platform Optimization**
- Each platform gets the best-fit image
- No cropping or distortion
- Professional appearance everywhere

### 2. **Device Flexibility**
- Mobile: Vertical works better
- Desktop: Both work well
- Tablets: Platform chooses best

### 3. **Future-Proof**
- New platforms can choose appropriately
- No need to update when platforms change algorithms
- Flexible for different contexts

### 4. **SEO Advantages**
- Multiple images = more metadata
- Better rich snippet display
- Improved click-through rates
- Professional brand presentation

### 5. **Brand Consistency**
- Same branding, different formats
- Professional across all channels
- Optimized for each use case

## 🔧 Configuration Options

### Per-Page Customization

```typescript
// For pages that need specific logo preference
getPageMetadata({
  preferVertical: true,   // Use logo2.png as primary
  // or
  preferVertical: false,  // Use logo.png as primary
});
```

### When to Prefer Vertical (logo2.png)
- ✅ Mobile-focused content
- ✅ Social media campaigns
- ✅ News/blog posts
- ✅ Story-style content
- ✅ Portrait-oriented content

### When to Prefer Horizontal (logo.png)
- ✅ Product listings
- ✅ Desktop-focused content
- ✅ Classic web pages
- ✅ Square thumbnails
- ✅ General purpose

## 🧪 Testing Strategy

### 1. Facebook Debugger
```
URL: https://developers.facebook.com/tools/debug/
Test: https://ktbiotech.com
Check: Both images appear in options
Verify: Preview looks good on desktop & mobile
```

### 2. Twitter Card Validator
```
URL: https://cards-dev.twitter.com/validator
Test: https://ktbiotech.com
Check: Vertical image (logo2.png) is used
Verify: Large card displays properly
```

### 3. LinkedIn Post Inspector
```
URL: https://www.linkedin.com/post-inspector/
Test: https://ktbiotech.com
Check: Images load correctly
Verify: Preview matches expectations
```

### 4. Manual Testing
```bash
# Check Open Graph tags
curl -s https://ktbiotech.com | grep 'og:image'

# Should see both images:
# <meta property="og:image" content=".../logo2.png" />
# <meta property="og:image" content=".../logo.png" />

# Verify Twitter tags
curl -s https://ktbiotech.com | grep 'twitter:image'
# Should see vertical image
```

## 📊 Analytics Tracking

### Metrics to Monitor

1. **Click-Through Rate (CTR)**
   - Social media shares
   - Search results
   - By platform

2. **Engagement Rate**
   - Shares with preview
   - Comments on previews
   - Platform-specific engagement

3. **Image Load Times**
   - Monitor both logo.png and logo2.png
   - Ensure fast loading
   - Optimize if needed

4. **Platform Distribution**
   - Which platforms use which logo
   - User behavior by platform
   - Adjust strategy if needed

## 🚀 Deployment Checklist

- [x] ✅ Update metadata.ts with dual logo support
- [x] ✅ Add getLogoImages() helper function
- [x] ✅ Add getPageMetadata() flexible function
- [x] ✅ Update layout.tsx to use new metadata
- [x] ✅ Ensure both logo.png and logo2.png are in /public
- [x] ✅ Test with social media debuggers
- [ ] Clear CDN cache after deployment
- [ ] Verify on production domain
- [ ] Test all major pages
- [ ] Monitor analytics

## 📝 API Reference

### getLogoImages()
```typescript
function getLogoImages(): {
  vertical: ImageMetadata;
  horizontal: ImageMetadata;
}
```

### getHomeMetadata(locale)
```typescript
function getHomeMetadata(
  locale?: SupportedLocale
): Metadata
```

### getPageMetadata(options)
```typescript
function getPageMetadata({
  locale?: SupportedLocale;
  titleSuffix?: string;
  description?: string;
  path?: string;
  keywords?: string[];
  preferVertical?: boolean;
}): Metadata
```

## 🎯 Summary

**Dual Logo Strategy:**
- ✅ **logo.png** (512x512) - Horizontal/Square for general use
- ✅ **logo2.png** (400x560) - Vertical for social media
- ✅ Multiple images in Open Graph for platform flexibility
- ✅ Explicit vertical for Twitter cards
- ✅ Per-page customization with `preferVertical`
- ✅ Future-proof and flexible
- ✅ Better SEO and social media presence

**Impact:**
- 📱 Better mobile display
- 🖥️ Optimized desktop experience
- 🎨 Professional across all platforms
- 📊 Improved engagement metrics
- 🚀 Future-proof strategy

