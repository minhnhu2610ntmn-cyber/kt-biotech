'use client';

import { Heading, Slider } from '@ktbiotech/system-design';
import { partners } from '../../../data/mockData';

export default function PartnersSection() {
  return (
    <section className='py-16 bg-white'>
      <div className='container mx-auto px-4'>
        <Heading
          level={3}
          className='text-kt-gray-800 font-semibold text-center mb-8 text-xl'
        >
          ĐỐI TÁC
        </Heading>
        <div className='bg-kt-gray-50 rounded-lg p-8 border border-kt-gray-200'>
          <style jsx global>{`
            .partners-swiper .swiper-slide {
              width: auto !important;
              flex-shrink: 0;
            }
            .partners-swiper .swiper-wrapper {
              display: flex !important;
            }
          `}</style>
          <Slider
            slidesPerView={5}
            spaceBetween={10}
            loop={true}
            autoplay={{ delay: 3000 }}
            navigation={true}
            pagination={false}
            breakpoints={{
              320: { slidesPerView: 2, spaceBetween: 15 },
              640: { slidesPerView: 3, spaceBetween: 20 },
              1024: { slidesPerView: 4, spaceBetween: 25 },
              1280: { slidesPerView: 5, spaceBetween: 30 },
            }}
            className='w-full partners-swiper'
          >
            {partners.map(partner => (
              <div
                key={partner.id}
                className='flex items-center justify-center px-2'
              >
                <div className='bg-white w-40 h-20 rounded-lg flex items-center justify-center hover:shadow-md transition-shadow border border-kt-gray-200'>
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className='max-w-full max-h-full object-contain'
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
