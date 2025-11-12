// Central constants for static IDs used across the app
// Page IDs (from availablePages design)
export const PAGE_ID = {
  vision: 'page-vision',
  mission: 'page-mission',
  structure: 'page-structure',
  about: 'page-about',
  award: 'page-award',
  cooperation: 'page-cooperation',
} as const;

export type PageId = (typeof PAGE_ID)[keyof typeof PAGE_ID];

// Convenience array if you need iteration
export const AVAILABLE_PAGE_IDS: PageId[] = [
  PAGE_ID.vision,
  PAGE_ID.mission,
  PAGE_ID.structure,
  PAGE_ID.about,
  PAGE_ID.award,
  PAGE_ID.cooperation,
];

// Search target types
export const SEARCH_TYPE = {
  article: 'article',
  product: 'product',
  page: 'page',
} as const;

export type SearchType = (typeof SEARCH_TYPE)[keyof typeof SEARCH_TYPE];

// About pages url map
export const ABOUT_URL: Record<PageId, string> = {
  [PAGE_ID.vision]: 'gioi-thieu/tam-nhin-su-menh',
  [PAGE_ID.mission]: 'gioi-thieu/tam-nhin-su-menh',
  [PAGE_ID.structure]: 'gioi-thieu/co-cau-to-chuc',
  [PAGE_ID.about]: 'gioi-thieu/ve-chung-toi',
  [PAGE_ID.award]: 'gioi-thieu/giai-thuong',
  [PAGE_ID.cooperation]: 'gioi-thieu/quan-he-hop-tac',
};
