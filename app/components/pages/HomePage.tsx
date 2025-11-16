import { NewsSection } from '@ktbiotech/blog';
import {
  Button,
  ChevronRightIcon,
  Container,
  Heading,
  Text,
} from '@ktbiotech/system-design';
import Link from 'next/link';
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
    <div className='min-h-screen relative z-10 bg-[#F7FBFD]'>
      <HeroSection />
      <MilestonesSection />
      <TechnologySection />
      <CountriesSection />
      <NewsSection latestArticles={latestArticles} title='Tin Tức' />
      <PartnersSection />

      <Container className='relative px-4 sm:px-6 md:px-8 lg:px-10 xl:px-0'>
        <div
          className='-mb-16 bg-cover bg-center bg-no-repeat rounded-md relative h-[180px] sm:h-[220px] md:h-[240px] lg:h-[270px]'
          style={{
            backgroundImage: "url('/images/banner.png')",
          }}
        >
          <div className='absolute inset-0 flex flex-col sm:flex-row items-start sm:items-center justify-center sm:justify-between gap-3 sm:gap-4 md:gap-0 px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6 md:py-0'>
            {/* Left side - Text */}
            <div className='flex flex-col gap-1 sm:gap-2 text-left'>
              <Heading
                level={2}
                color='white'
                className='!text-[28px] lg:!text-[32px] xl:!text-[36px] font-semibold leading-tight'
              >
                Need information support
              </Heading>
              <Text
                color='white'
                weight='bold'
                className='text-[28px] xl:!text-[36px] leading-tight'
              >
                Contact Us Now
              </Text>
            </div>

            {/* Right side - Button */}
            <Link href='/lien-he' className='w-full sm:w-auto shrink-0'>
              <Button
                variant='default'
                className='w-auto bg-[#3691C9] hover:bg-[#2a7ba3] text-white !px-8 !py-6 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors text-sm sm:text-base'
              >
                <span>Liên hệ</span>
                <ChevronRightIcon
                  width={14}
                  height={14}
                  className='w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0'
                  fill='white'
                  stroke='white'
                />
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
