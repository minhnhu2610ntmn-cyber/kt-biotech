import { Heading, Slider, SliderPresets, Text } from '@ktbiotech/system-design';
import {
  companyMessage,
  featuredProducts,
  heroSlides,
  productCategories,
} from '../../../data/mockData';
import CompanyMessage from './CompanyMessage';
import FeaturedProducts from './FeaturedProducts';
import ProductCategories from './ProductCategories';

export default function HeroSection() {
  return (
    <section className='py-16 bg-white'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
          {/* Product Categories Sidebar */}
          <div className='lg:col-span-1'>
            <ProductCategories categories={productCategories} />
          </div>

          {/* Hero Carousel */}
          <div className='lg:col-span-2'>
            <div className='bg-kt-gray-50 rounded-lg overflow-hidden'>
              <Slider {...SliderPresets.hero}>
                {heroSlides.map(slide => (
                  <div key={slide.id} className='relative h-96'>
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className='w-full h-full object-cover'
                    />
                    <div className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center'>
                      <div className='text-center text-white px-8'>
                        <Heading level={2} className='text-3xl font-bold mb-4'>
                          {slide.title}
                        </Heading>
                        <Text className='text-xl mb-6'>{slide.subtitle}</Text>
                        <a
                          href={slide.href}
                          className='bg-kt-blue-600 hover:bg-kt-blue-700 text-white px-6 py-3 rounded-lg transition-colors'
                        >
                          Tìm hiểu thêm
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          {/* Company Message */}
          <div className='lg:col-span-1'>
            <CompanyMessage {...companyMessage} />
          </div>
        </div>

        {/* Featured Products */}
        <div className='mt-8'>
          <FeaturedProducts products={featuredProducts} />
        </div>
      </div>
    </section>
  );
}
