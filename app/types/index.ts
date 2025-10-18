// KTBioTech Types Definition
export interface ProductCategory {
  id: string;
  name: string;
  href: string;
  icon?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price?: string;
  href: string;
  category?: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  image: string;
  year: number;
  isActive?: boolean;
  details?: string;
}

export interface TechnologyFootprint {
  id: string;
  title: string;
  description: string;
  image: string;
  year: number;
  isActive?: boolean;
  details?: string;
}

export interface Country {
  id: string;
  name: string;
  flag: string;
  code: string;
  flagEmoji: string;
}

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  image: string;
  publishedAt: Date;
  href: string;
  category: 'news' | 'about' | 'careers';
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  website: string;
  description?: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  href?: string;
}

export interface CompanyMessage {
  title: string;
  description: string;
  image: string;
  href?: string;
}
