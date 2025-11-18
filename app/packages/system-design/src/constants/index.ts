// About pages url map
// This is a copy of constants from app/config/constants.ts
// to avoid cross-package imports in system-design package

export const PAGE_ID = {
  vision: 'page-vision',
  mission: 'page-mission',
  structure: 'page-structure',
  about: 'page-about',
  award: 'page-award',
  cooperation: 'page-cooperation',
} as const;

export type PageId = (typeof PAGE_ID)[keyof typeof PAGE_ID];

export const ABOUT_URL: Record<PageId, string> = {
  [PAGE_ID.vision]: 'gioi-thieu/tam-nhin-su-menh',
  [PAGE_ID.mission]: 'gioi-thieu/tam-nhin-su-menh',
  [PAGE_ID.structure]: 'gioi-thieu/co-cau-to-chuc',
  [PAGE_ID.about]: 'gioi-thieu/ve-chung-toi',
  [PAGE_ID.award]: 'gioi-thieu/giai-thuong',
  [PAGE_ID.cooperation]: 'gioi-thieu/quan-he-hop-tac',
};
