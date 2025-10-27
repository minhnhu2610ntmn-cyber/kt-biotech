import { NewsSection } from '@ktbiotech/blog';
import type { Article } from '../../types/strapi';
import {
  CountriesSection,
  HeroSection,
  MilestonesSection,
  PartnersSection,
  TechnologySection,
} from '../containers';

export interface HomePageProps {
  latestArticles: Article[];
}

export default function HomePage({ latestArticles }: HomePageProps) {
  return (
    <div className='min-h-screen bg-[#F7FBFD]'>
      <HeroSection />
      <MilestonesSection />
      <TechnologySection />
      <CountriesSection />
      <NewsSection latestArticles={latestArticles} title='Tin Tức' />
      <PartnersSection />
    </div>
  );
}
