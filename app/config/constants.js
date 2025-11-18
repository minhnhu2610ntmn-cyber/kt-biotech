'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ABOUT_URL =
  exports.SEARCH_TYPE =
  exports.AVAILABLE_PAGE_IDS =
  exports.PAGE_ID =
    void 0;
// Central constants for static IDs used across the app
// Page IDs (from availablePages design)
exports.PAGE_ID = {
  vision: 'page-vision',
  mission: 'page-mission',
  structure: 'page-structure',
  about: 'page-about',
  award: 'page-award',
  cooperation: 'page-cooperation',
};
// Convenience array if you need iteration
exports.AVAILABLE_PAGE_IDS = [
  exports.PAGE_ID.vision,
  exports.PAGE_ID.mission,
  exports.PAGE_ID.structure,
  exports.PAGE_ID.about,
  exports.PAGE_ID.award,
  exports.PAGE_ID.cooperation,
];
// Search target types
exports.SEARCH_TYPE = {
  article: 'article',
  product: 'product',
  page: 'page',
};
// About pages url map
exports.ABOUT_URL = {
  [exports.PAGE_ID.vision]: 'gioi-thieu/tam-nhin-su-menh',
  [exports.PAGE_ID.mission]: 'gioi-thieu/tam-nhin-su-menh',
  [exports.PAGE_ID.structure]: 'gioi-thieu/co-cau-to-chuc',
  [exports.PAGE_ID.about]: 'gioi-thieu/ve-chung-toi',
  [exports.PAGE_ID.award]: 'gioi-thieu/giai-thuong',
  [exports.PAGE_ID.cooperation]: 'gioi-thieu/quan-he-hop-tac',
};
