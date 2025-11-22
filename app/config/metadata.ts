import type { Metadata } from 'next';

const SITE_URL = 'https://ktbiotech.com';

const LANGUAGE_ALTERNATES = {
  vi: SITE_URL,
  en: `${SITE_URL}/en`,
} as const;

// Multiple logo paths for different use cases
const LOGO_HORIZONTAL = '/logo.png'; // Square/horizontal for general use
const LOGO_VERTICAL = '/logo2.png'; // Vertical for social media cards

const LOCALE_COPY = {
  vi: {
    title: 'KTBioTech - Công nghệ sinh học hàng đầu Việt Nam',
    description:
      'KTBioTech cung cấp các giải pháp công nghệ sinh học tiên tiến, dịch vụ nghiên cứu & phát triển và tư vấn chuyên nghiệp cho khách hàng tại Việt Nam và Đông Nam Á.',
    keywords: [
      'KTBioTech',
      'công nghệ sinh học',
      'giải pháp y sinh',
      'thiết bị xét nghiệm',
      'dịch vụ R&D',
    ],
    openGraphLocale: 'vi_VN',
  },
  en: {
    title: 'KTBioTech - Leading Biotechnology Solutions',
    description:
      'KTBioTech delivers advanced biotechnology solutions, molecular diagnostics, bioinformatics and clinical research services across Southeast Asia.',
    keywords: [
      'KTBioTech',
      'biotechnology Vietnam',
      'molecular diagnostics',
      'bioinformatics services',
      'clinical research partner',
    ],
    openGraphLocale: 'en_US',
  },
} as const;

export type SupportedLocale = keyof typeof LOCALE_COPY;

const FALLBACK_LOCALE: SupportedLocale = 'vi';

const getCanonicalUrl = (locale: SupportedLocale) =>
  locale === 'vi' ? SITE_URL : `${SITE_URL}/${locale}`;

// Image configuration helper
export function getLogoImages() {
  return {
    vertical: {
      url: `${SITE_URL}${LOGO_VERTICAL}`,
      width: 400,
      height: 560,
      alt: 'KTBioTech logo',
      type: 'image/png' as const,
    },
    horizontal: {
      url: `${SITE_URL}${LOGO_HORIZONTAL}`,
      width: 512,
      height: 512,
      alt: 'KTBioTech logo',
      type: 'image/png' as const,
    },
  };
}

export function getHomeMetadata(
  locale: SupportedLocale = FALLBACK_LOCALE
): Metadata {
  const { title, description, keywords, openGraphLocale } = LOCALE_COPY[locale];
  const canonical = getCanonicalUrl(locale);
  const { vertical, horizontal } = getLogoImages();

  return {
    title,
    description,
    keywords: [...keywords],
    alternates: {
      canonical,
      languages: LANGUAGE_ALTERNATES,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'KTBioTech',
      locale: openGraphLocale,
      type: 'website',
      // Multiple images for different platforms
      // Platforms will choose the most appropriate one
      // Vertical (logo2.png) is primary for social media cards
      // Horizontal (logo.png) is fallback for platforms preferring square
      images: [vertical, horizontal],
    },
    twitter: {
      // summary_large_image works well with vertical images
      card: 'summary_large_image',
      title,
      description,
      // Twitter prefers vertical/portrait orientation
      images: [vertical.url],
    },
  };
}

// Helper function for custom metadata with flexible image options
export function getPageMetadata({
  locale = FALLBACK_LOCALE,
  titleSuffix,
  description,
  path = '',
  keywords = [],
  preferVertical = true,
}: {
  locale?: SupportedLocale;
  titleSuffix?: string;
  description?: string;
  path?: string;
  keywords?: string[];
  preferVertical?: boolean;
}): Metadata {
  const localeData = LOCALE_COPY[locale];
  const title = titleSuffix ? `${titleSuffix} - KTBioTech` : localeData.title;
  const desc = description || localeData.description;
  const canonical = path
    ? `${getCanonicalUrl(locale)}${path}`
    : getCanonicalUrl(locale);
  const { vertical, horizontal } = getLogoImages();

  // Select primary image based on preference
  const primaryImage = preferVertical ? vertical : horizontal;
  const secondaryImage = preferVertical ? horizontal : vertical;

  return {
    title,
    description: desc,
    keywords: [...localeData.keywords, ...keywords],
    alternates: {
      canonical,
      languages: LANGUAGE_ALTERNATES,
    },
    openGraph: {
      title,
      description: desc,
      url: canonical,
      siteName: 'KTBioTech',
      locale: localeData.openGraphLocale,
      type: 'website',
      images: [primaryImage, secondaryImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: desc,
      images: [primaryImage.url],
    },
  };
}
