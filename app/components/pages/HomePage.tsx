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
      <div className='bg-success text-white p-3'>OK</div>
      <HeroSection />
      <MilestonesSection />
      <TechnologySection />
      <CountriesSection />
      <NewsSection />
      <PartnersSection />
    </div>
  );
}
