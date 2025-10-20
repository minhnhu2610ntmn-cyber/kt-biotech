import { Button } from '@/app/packages/system-design/src';
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
      <Button>Click me</Button>
      <HeroSection />
      <MilestonesSection />
      <TechnologySection />
      <CountriesSection />
      <NewsSection />
      <PartnersSection />
    </div>
  );
}
