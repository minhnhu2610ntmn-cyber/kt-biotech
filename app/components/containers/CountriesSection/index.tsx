'use client';

import {
  CambodiaFlagIcon,
  ChinaFlagIcon,
  Heading,
  JapanFlagIcon,
  MalaysiaFlagIcon,
  SliderV2,
  Text,
  UnitedStatesFlagIcon,
} from '@ktbiotech/system-design';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function CountriesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
    { name: 'Trung Quốc', flag: ChinaFlagIcon },
    { name: 'Campuchia', flag: CambodiaFlagIcon },
    { name: 'Nhật Bản', flag: JapanFlagIcon },
    { name: 'Hoa Kỳ', flag: UnitedStatesFlagIcon },
    { name: 'Malaysia', flag: MalaysiaFlagIcon },
  ];

  return (
    <section
      ref={sectionRef}
      className='py-16 bg-transparent relative overflow-hidden'
    >
      {/* Title */}
      <Heading
        level={3}
        color='#215778'
        className={`text-center mb-12 font-bold !text-2xl underline decoration-[#215778] decoration-1 underline-offset-4 transition-all duration-600 ease-out delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        QUỐC GIA KHOA THƯƠNG ĐÃ XUẤT KHẨU ĐẾN
      </Heading>

      {/* Main Content */}
      <div className='relative'>
        {/* Background with wave pattern */}
        <div
          className={`relative flex items-center px-4 md:px-13 bg-gradient-to-r from-[#1e3a8a] to-[#1e40af] h-[268px] p-8 mb-8 transition-all duration-800 ease-out delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Country Flags Slider */}
          <div className='relative z-10 w-full'>
            <SliderV2
              slidesPerView={1}
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
                  spaceBetween: 50,
                },
              }}
              navigation={false}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop={true}
              className='countries-slider'
            >
              {countries.map((country, index) => {
                const FlagIcon = country.flag;
                return (
                  <div key={index} className='flex flex-col items-center px-4'>
                    <div className='h-[135px] rounded-lg shadow-lg mb-2'>
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
          </div>
        </div>

        {/* KT BIOTECH Logo Card */}
        <div
          className={`absolute top-5 right-8 h-[268px] scale-[1.6] z-10 overflow-hidden transition-all duration-800 ease-out delay-600 hover:scale-[1.7] ${
            isVisible ? 'opacity-100 scale-[1.6]' : 'opacity-0 scale-[1.4]'
          }`}
        >
          <Image
            src='/images/company.png'
            alt='KT BIOTECH Company Logo'
            width={320}
            height={256}
            className='w-full h-full object-cover'
            priority
          />
        </div>
      </div>
    </section>
  );
}
