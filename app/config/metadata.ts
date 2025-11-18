import type { Metadata } from 'next';

const SITE_URL = 'https://ktbiotech.com';

const LANGUAGE_ALTERNATES = {
  vi: SITE_URL,
  en: `${SITE_URL}/en`,
} as const;

const LOGO_IMAGE_PATH = '/logo.png';

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

export function getHomeMetadata(
  locale: SupportedLocale = FALLBACK_LOCALE
): Metadata {
  const { title, description, keywords, openGraphLocale } = LOCALE_COPY[locale];
  const canonical = getCanonicalUrl(locale);
  const image = {
    url: `${SITE_URL}${LOGO_IMAGE_PATH}`,
    width: 512,
    height: 512,
    alt: 'KTBioTech logo',
    type: 'image/png',
  };

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
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image.url],
    },
  };
}
