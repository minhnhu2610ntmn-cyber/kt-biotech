import type { Article, ProductCategory } from '../../types/strapi';
import {
  CountriesSection,
  HeroSection,
  MilestonesSection,
  NewsSection,
  PartnersSection,
  TechnologySection,
} from '../containers';

export interface HomePageProps {
  productCategories: ProductCategory[];
  latestArticles: Article[];
}

export default function HomePage({
  productCategories,
  latestArticles,
}: HomePageProps) {
  return (
    <div className='min-h-screen bg-[#F7FBFD]'>
      <HeroSection productCategories={productCategories} />
      <MilestonesSection />
      <TechnologySection />
      <CountriesSection />
      <NewsSection latestArticles={latestArticles} />
      <PartnersSection />
    </div>
  );
}
