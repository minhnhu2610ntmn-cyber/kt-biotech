import {
  CountriesSection,
  HeroSection,
  MilestonesSection,
  NewsSection,
  PartnersSection,
  TechnologySection,
} from '../containers';

export default function HomePage() {
  return (
    <div className='min-h-screen'>
      <HeroSection />
      <MilestonesSection />
      <TechnologySection />
      <CountriesSection />
      <NewsSection />
      <PartnersSection />
    </div>
  );
}
