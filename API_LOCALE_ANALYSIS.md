# API Locale Handling Analysis

## 📊 Current Implementation

### ✅ API Locale Setup

**StrapiApi Constructor** (`app/config/api.ts` line 265-268):
```typescript
constructor(locale?: string) {
  // Normalize locale: use 'vi' as default when not provided
  // This ensures all API calls filter by locale (default 'vi')
  this.locale = locale === 'en' ? 'en' : 'vi-VN';
}
```

**Locale Normalization**:
- `locale === 'en'` → `'en'`
- `locale !== 'en'` (or undefined) → `'vi-VN'`

### ✅ Automatic Locale Appending

**appendLocaleToUrl Method** (line 290-296):
```typescript
private appendLocaleToUrl(url: string) {
  if (url.includes('locale=')) {
    return url; // Skip if locale already present
  }
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}locale=${encodeURIComponent(this.locale)}`;
}
```

**All API Methods Use Locale**:
- ✅ `getResearchService()` - Uses `appendLocaleToUrl()`
- ✅ `getGlobal()` - Uses `appendLocaleToUrl()`
- ✅ `getAbout()` - Uses `appendLocaleToUrl()`
- ✅ `getGenServices()` - Uses `appendLocaleToUrl()`
- ✅ `getCategories()` - Uses `appendLocaleToSearchParams()`
- ✅ `getArticles()` - Uses `appendLocaleToQueryParts()`

### ✅ Page Components Pass Locale Correctly

**Example: `/dich-vu/nghien-cuu-khoa-hoc/page.tsx`**:
```typescript
export default async function ResearchServicePage({ params }) {
  const { locale } = await params; // 'vi' or 'en'
  const api = new StrapiApi(locale); // ✅ Locale passed correctly
  const researchService = await api.getResearchService();
  // API will fetch with ?locale=en or ?locale=vi-VN
}
```

## 🔍 How It Works

### Request Flow

1. **Page Component**:
   ```typescript
   const { locale } = await params; // 'vi' or 'en'
   const api = new StrapiApi(locale);
   ```

2. **StrapiApi Constructor**:
   ```typescript
   this.locale = locale === 'en' ? 'en' : 'vi-VN';
   // 'vi' → 'vi-VN'
   // 'en' → 'en'
   ```

3. **API Method Call**:
   ```typescript
   const url = this.appendLocaleToUrl(
     `${buildApiUrl(API_ENDPOINTS.researchService)}?populate=*`
   );
   // Results in:
   // /api/research-service?populate=*&locale=en
   // or
   // /api/research-service?populate=*&locale=vi-VN
   ```

4. **Strapi Response**:
   - Strapi returns localized content based on `locale` parameter
   - Content comes back in the requested language

## ⚠️ Potential Issues

### Issue 1: Strapi Locale Format

**Current**: 
- Vietnamese: `'vi-VN'`
- English: `'en'`

**Check Strapi Configuration**:
- Strapi i18n plugin uses locale codes
- Verify Strapi has `vi-VN` and `en` locales configured
- If Strapi uses different codes (e.g., `vi` instead of `vi-VN`), update:

```typescript
// Option: Normalize to match Strapi
this.locale = locale === 'en' ? 'en' : 'vi';
```

### Issue 2: Missing English Content in Strapi

**Symptoms**:
- `/en/gioi-thieu` shows Vietnamese content
- API returns `null` or empty data for English locale

**Solutions**:
1. **Check Strapi Admin**:
   - Verify English content exists for all content types
   - Check if content is published for English locale
   - Ensure Global, Research Service, etc. have English translations

2. **Fallback Strategy**:
   ```typescript
   // Current: Returns null if not found
   if (!response.ok) {
     if (response.status === 404) {
       return null;
     }
   }
   
   // Option: Fallback to Vietnamese if English not available
   async getResearchService(): Promise<any | null> {
     // Try English first
     let data = await this.fetchWithLocale('en');
     // If no English, fallback to Vietnamese
     if (!data) {
       data = await this.fetchWithLocale('vi-VN');
     }
     return data;
   }
   ```

### Issue 3: Locale Not Propagated to Nested Fields

**Problem**: Strapi might not localize nested/related fields automatically.

**Check**:
- Verify `populate=*` includes localized relations
- Check if Strapi localizes nested components automatically
- May need explicit locale in populate queries

### Issue 4: Server vs Client Rendering

**Current**: All API calls are server-side (Next.js Server Components) ✅

**No Issues**: 
- Locale is available in `params` 
- No client-side locale mismatch

## 🔧 Debugging API Locale Issues

### 1. Add Logging (Temporary)

```typescript
async getResearchService(): Promise<any | null> {
  try {
    const url = this.appendLocaleToUrl(
      `${buildApiUrl(API_ENDPOINTS.researchService)}?populate=*`
    );
    
    // Debug logging
    console.log('🔍 API Request:', {
      locale: this.locale,
      url,
    });
    
    const response = await fetch(url, { ... });
    const data = await response.json();
    
    console.log('📦 API Response:', {
      locale: this.locale,
      hasData: !!data?.data,
      title: data?.data?.title,
    });
    
    return data?.data || null;
  } catch (error) {
    console.error('❌ API Error:', error);
    return null;
  }
}
```

### 2. Test API Directly

```bash
# Test Vietnamese
curl "http://103.90.225.225:1337/api/research-service?populate=*&locale=vi-VN" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Test English  
curl "http://103.90.225.225:1337/api/research-service?populate=*&locale=en" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 3. Check Strapi Locale Configuration

In Strapi Admin:
1. Go to Settings → Internationalization
2. Verify locales: `vi-VN` and `en` exist
3. Check content types have i18n enabled
4. Verify content is published for both locales

## ✅ Verification Checklist

### API Locale Handling
- [x] StrapiApi constructor normalizes locale correctly
- [x] All API methods append locale parameter
- [x] Page components pass locale from params
- [x] URL encoding handles special characters

### Content Availability
- [ ] Strapi has English content for all types
- [ ] Content is published for English locale
- [ ] Nested/related fields are localized
- [ ] Images/media work for both locales

### Frontend Integration
- [x] Translation fallbacks exist (`tNavbar('serviceResearch')`)
- [x] Breadcrumb translations work
- [ ] API content displays correctly for both locales

## 🎯 Recommendations

### 1. Verify Strapi Locale Codes

Check if Strapi uses:
- `vi` or `vi-VN` for Vietnamese
- `en` or `en-US` for English

Update constructor if needed:
```typescript
constructor(locale?: string) {
  // Match Strapi locale configuration exactly
  this.locale = locale === 'en' ? 'en' : 'vi'; // or 'vi-VN'
}
```

### 2. Add Fallback for Missing Content

```typescript
async getResearchService(): Promise<any | null> {
  // Try requested locale
  let data = await this.fetchResearchService(this.locale);
  
  // Fallback to Vietnamese if English not available
  if (!data && this.locale === 'en') {
    const viApi = new StrapiApi('vi');
    data = await viApi.getResearchService();
  }
  
  return data;
}
```

### 3. Improve Error Handling

```typescript
if (!response.ok) {
  if (response.status === 404) {
    // Log locale mismatch
    console.warn(`Content not found for locale: ${this.locale}`);
    return null;
  }
  // ... other errors
}
```

## 📝 Summary

**Current Status**: ✅ API locale handling is **correctly implemented**

**All API methods**:
- ✅ Accept locale in constructor
- ✅ Normalize locale (en → 'en', others → 'vi-VN')
- ✅ Append locale to all requests
- ✅ Used correctly in page components

**Potential Issues**:
- ⚠️ Strapi might not have English content
- ⚠️ Locale format mismatch (vi vs vi-VN)
- ⚠️ Content not published for English locale

**Next Steps**:
1. Verify Strapi has English content
2. Test API directly with curl
3. Check Strapi locale configuration
4. Add debug logging if needed

