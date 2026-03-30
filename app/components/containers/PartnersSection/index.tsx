'use client';

import {
  Container,
  Heading,
  SliderV2,
  SliderV2Presets,
} from '@ktbiotech/system-design';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { partners } from '../../../data/mockData';

export default function PartnersSection() {
  const t = useTranslations('homepage.partners');
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleImageError = (partnerId: string) => {
    setImageErrors(prev => new Set(prev).add(partnerId));
  };

  const PartnerCard = ({
    partner,
  }: {
    partner: { id: string; name: string; logo: string };
  }) => {
    const hasError = imageErrors.has(partner.id);
    const logoSrc = hasError ? '/images/company.png' : partner.logo;
    const logoAlt = hasError ? 'KT BIOTECH Logo' : partner.name;

    return (
      <div className='flex items-center justify-center px-2 flex-col overflow-hidden'>
        <div className=' w-[185px] h-[185px] flex items-center justify-center transition-shadow'>
          <Image
            src={logoSrc}
            alt={logoAlt}
            width={185}
            height={185}
            className=' object-contain w-full h-full object-center filter transition-all duration-200'
            onError={() => handleImageError(partner.id)}
          />
        </div>
      </div>
    );
  };

  return (
    <section ref={sectionRef} className='py-16 bg-transparent'>
      <Container>
        <Heading
          level={3}
          color='#215778'
          className={`text-kt-gray-800 font-semibold text-center xl:text-left pl-4 !text-2xl underline decoration-[#2C3E50] decoration-1 underline-offset-4 transition-all duration-600 ease-out delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {t('title')}
        </Heading>
        <div
          className={`bg-kt-gray-50 rounded-lg p-8 transition-all duration-800 ease-out delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <SliderV2 {...SliderV2Presets.partners} className='w-full'>
            {[...partners, ...partners, ...partners].map(partner => (
              <PartnerCard key={partner.id} partner={partner} />
            ))}
          </SliderV2>
        </div>
      </Container>
    </section>
  );
}
