'use client';

import { Heading, SliderV2, SliderV2Presets } from '@ktbiotech/system-design';
import Image from 'next/image';
import { useState } from 'react';
import { partners } from '../../../data/mockData';

export default function PartnersSection() {
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

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
      <div className='flex items-center justify-center px-2 flex-col'>
        <div className=' w-[185px] h-[185px] flex items-center justify-center transition-shadow'>
          <Image
            src={logoSrc}
            alt={logoAlt}
            width={185}
            height={185}
            className=' object-contain filter transition-all duration-200'
            onError={() => handleImageError(partner.id)}
          />
        </div>
        {partner.name && (
          <div className='text-kt-gray-800 font-medium text-center mt-2'>
            {partner.name}
          </div>
        )}
      </div>
    );
  };

  return (
    <section className='py-16 bg-white'>
      <div className='container mx-auto px-4'>
        <Heading
          level={3}
          className='text-kt-gray-800 font-semibold text-center mb-8 text-xl'
        >
          ĐỐI TÁC
        </Heading>
        <div className='bg-kt-gray-50 rounded-lg p-8 '>
          <SliderV2 {...SliderV2Presets.partners} className='w-full'>
            {partners.map(partner => (
              <PartnerCard key={partner.id} partner={partner} />
            ))}
          </SliderV2>
        </div>
      </div>
    </section>
  );
}
