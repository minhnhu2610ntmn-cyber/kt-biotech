'use client';

import {
  CambodiaFlagIcon,
  ChinaFlagIcon,
  Container,
  Heading,
  JapanFlagIcon,
  MalaysiaFlagIcon,
  QatarFlagIcon,
  SliderV2,
  Text,
  UnitedStatesFlagIcon,
} from '@ktbiotech/system-design';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

export default function CountriesSection() {
  const t = useTranslations('homepage.countries');
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if mobile on mount and window resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const countries = [
    { name: t('china'), flag: ChinaFlagIcon },
    { name: t('cambodia'), flag: CambodiaFlagIcon },
    { name: t('japan'), flag: JapanFlagIcon },
    { name: t('usa'), flag: UnitedStatesFlagIcon },
    { name: t('malaysia'), flag: MalaysiaFlagIcon },
    { name: t('qatar'), flag: QatarFlagIcon },
  ];

  return (
    <section
      ref={sectionRef}
      className='py-16 bg-transparent relative overflow-hidden'
    >
      {/* Title */}
      <Container>
        <Heading
          level={3}
          color='#215778'
          className={` mb-12 text-center xl:text-left font-bold pl-4 !text-2xl underline decoration-[#215778] decoration-1 underline-offset-4 transition-all duration-600 ease-out delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {t('title')}
        </Heading>
      </Container>
      {/* Main Content */}
      <div className='relative'>
        {/* Background with wave pattern */}
        <div
          className={`relative flex items-center px-4 md:px-13 h-[268px] p-8 mb-8 transition-all duration-800 ease-out delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            backgroundImage: "url('/background.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Country Flags Slider */}
          <Container className='relative z-10 w-full'>
            <SliderV2
              slidesPerView={2}
              spaceBetween={20}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 60,
                },
              }}
              navigation={false}
              autoplay={
                isMobile
                  ? {
                      delay: 3000,
                      disableOnInteraction: false,
                    }
                  : false
              }
              allowTouchMove={true}
              grabCursor={true}
              loop={true}
              className='countries-slider flex-1 w-full'
            >
              {countries.map((country, index) => {
                const FlagIcon = country.flag;
                return (
                  <div key={index} className='flex  flex-col items-center px-4'>
                    <div className='h-[135px] w-[180px] rounded-lg shadow-lg mb-2 overflow-hidden'>
                      <FlagIcon className='w-full h-full' />
                    </div>
                    <Text
                      color='white'
                      className='text-sm font-medium text-center'
                    >
                      {country.name}
                    </Text>
                  </div>
                );
              })}
            </SliderV2>
          </Container>
        </div>

        {/* KT BIOTECH Logo Card */}
        {/* <div
          className={`absolute  items-center hidden lg:flex top-0 xl:top-2 2xl:top-3 right-8 h-[268px]  z-10  transition-all duration-800 ease-out delay-600  `}
        >
          <Image
            src='/images/company.png'
            alt='KT BIOTECH Company Logo'
            width={320}
            height={226}
            className={cn(
              'w-full h-full object-cover',
              isVisible ? 'opacity-100 scale-[1.4]' : 'opacity-0 scale-[1.4]'
            )}
            priority
          />
        </div> */}
      </div>
    </section>
  );
}
