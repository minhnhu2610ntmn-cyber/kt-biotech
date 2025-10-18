import { MasterLayout } from '../layout';
import {
  HeroSection,
  MilestonesSection,
  TechnologySection,
  CountriesSection,
  NewsSection,
  PartnersSection,
} from '../containers';

export default function HomePage() {
  return (
    <MasterLayout>
      <div className='min-h-screen'>
        <HeroSection />
        <MilestonesSection />
        <TechnologySection />
        <CountriesSection />
        <NewsSection />
        <PartnersSection />
      </div>
    </MasterLayout>
  );
}
