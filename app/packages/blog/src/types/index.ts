export interface Article {
  id: number;
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  author: {
    name: string;
  };
  cover?: {
    url: string;
  };
  category: {
    name: string;
    color: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishedAt: Date;
  tags: string[];
  slug: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface BlogAuthor {
  id: string;
  name: string;
  bio: string;
  avatar?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

// Strapi Block Types for dynamic content zones
export interface BaseBlock {
  __component: string;
  id: number;
}

export interface RichTextBlock extends BaseBlock {
  __component: 'shared.rich-text';
  body: string; // Markdown content
}

export interface QuoteBlock extends BaseBlock {
  __component: 'shared.quote';
  title: string; // Author name
  body: string; // Quote text
}

export interface MediaBlock extends BaseBlock {
  __component: 'shared.media';
  file?: {
    url: string;
    alternativeText?: string;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
    };
  };
}

export interface SliderBlock extends BaseBlock {
  __component: 'shared.slider';
  slides?: Array<{
    image?: { url: string };
    caption?: string;
  }>;
}

export type StrapiBlock = RichTextBlock | QuoteBlock | MediaBlock | SliderBlock;

export interface BlogContentBodyProps {
  blocks: StrapiBlock[];
  className?: string;
}
