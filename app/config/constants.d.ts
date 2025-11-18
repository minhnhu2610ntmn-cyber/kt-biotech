export declare const PAGE_ID: {
    readonly vision: "page-vision";
    readonly mission: "page-mission";
    readonly structure: "page-structure";
    readonly about: "page-about";
    readonly award: "page-award";
    readonly cooperation: "page-cooperation";
};
export type PageId = (typeof PAGE_ID)[keyof typeof PAGE_ID];
export declare const AVAILABLE_PAGE_IDS: PageId[];
export declare const SEARCH_TYPE: {
    readonly article: "article";
    readonly product: "product";
    readonly page: "page";
};
export type SearchType = (typeof SEARCH_TYPE)[keyof typeof SEARCH_TYPE];
export declare const ABOUT_URL: Record<PageId, string>;
