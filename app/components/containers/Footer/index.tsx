'use client';

import {
  AddressIcon,
  cn,
  EmailIcon,
  FacebookIcon,
  Heading,
  InstagramIcon,
  OClockIcon,
  PhoneIcon,
  PinterestIcon,
  Text,
  TwitterIcon,
  YouTubeIcon,
} from '@ktbiotech/system-design';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import type { ProductCategory } from '../../../types/strapi';
import { Link } from '../../../utils/link';
import { useProductCategories } from '../../layout/MasterLayout';

interface FooterProps {
  showNewsletter?: boolean;
  onNewsletterSubmit?: (email: string) => void;
  productCategories?: ProductCategory[];
}

export default function Footer({
  showNewsletter: _showNewsletter = false,
  onNewsletterSubmit: _onNewsletterSubmit,
  productCategories: propProductCategories,
}: FooterProps) {
  const pathname = usePathname();
  const isHomePage = pathname === '/' || pathname === `/en`;
  const contextCategories = useProductCategories();
  const productCategories = propProductCategories || contextCategories;
  const t = useTranslations('footer');

  return (
    <footer
      className={cn(
        'bg-gray-900 !text-white px-4 md:px-10',
        isHomePage && 'pt-[70px]'
      )}
    >
      {/* Main Footer Content */}
      <div className=' px-4 py-8 sm:py-12'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8'>
          {/* Company Info & Social Media */}
          <div className='lg:col-span-1'>
            {/* Logo */}
            <div className='flex items-center mb-4 sm:mb-6'>
              <Image
                src='/logo.png'
                alt='KT BIOTECH Logo'
                width={120}
                height={40}
                className='h-8 sm:h-10 w-auto'
              />
            </div>

            {/* Description */}
            <Text
              color='gray-300'
              className='mb-4 sm:mb-6 text-xs sm:text-sm leading-relaxed'
            >
              {t('description')}
            </Text>

            {/* Social Media Icons */}
            <div className='flex flex-wrap gap-3 sm:gap-4'>
              <div className='w-[20px] h-[20px] bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer hover:scale-[1.25]'>
                <FacebookIcon
                  width={14}
                  height={14}
                  stroke='white'
                  className='h-[14px] w-[14px]'
                />
              </div>
              <div className='flex items-center justify-center hover:scale-[1.25] transition-transform cursor-pointer'>
                <YouTubeIcon
                  width={18}
                  height={18}
                  stroke='#ff0000'
                  className='sm:w-5 sm:h-5'
                />
              </div>
              <div className='flex items-center justify-center hover:scale-[1.25] transition-transform cursor-pointer'>
                <InstagramIcon
                  width={18}
                  height={18}
                  stroke='#e4405f'
                  className='sm:w-5 sm:h-5'
                />
              </div>
              <div className='flex items-center justify-center hover:scale-[1.25] transition-transform cursor-pointer'>
                <TwitterIcon
                  width={18}
                  height={18}
                  stroke='#1da1f2'
                  className='sm:w-5 sm:h-5'
                />
              </div>
              <div className='flex items-center justify-center hover:scale-[1.25] transition-transform cursor-pointer'>
                <PinterestIcon
                  width={18}
                  height={18}
                  stroke='#bd081c'
                  className='sm:w-5 sm:h-5'
                />
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <Heading
              level={4}
              color='white'
              className='font-semibold mb-4 sm:mb-6 text-base sm:text-lg'
            >
              {t('products')}
            </Heading>
            <div className='space-y-2 sm:space-y-3'>
              {productCategories && productCategories.length > 0 ? (
                productCategories.map(category => (
                  <Link
                    key={category.id}
                    href={`/danh-muc-san-pham/${category.slug || category.id}`}
                    className='block text-gray-300 hover:text-white hover:-translate-y-0.5 transition-all duration-200 text-xs sm:text-sm'
                  >
                    {category.name || 'Unnamed Category'}
                  </Link>
                ))
              ) : (
                // Fallback nếu không có categories
                <>
                  <Link
                    href='/danh-muc-san-pham'
                    className='block text-gray-300 hover:text-white hover:-translate-y-0.5 transition-all duration-200 text-xs sm:text-sm'
                  >
                    {t('productCategories')}
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* About Us */}
          <div>
            <Heading
              level={4}
              color='white'
              className='font-semibold mb-4 sm:mb-6 text-base sm:text-lg'
            >
              {t('aboutUs')}
            </Heading>
            <div className='space-y-2 sm:space-y-3'>
              <Link
                href='/gioi-thieu/ve-chung-toi'
                className='block text-gray-300 hover:text-white hover:-translate-y-0.5 transition-all duration-200 text-xs sm:text-sm'
              >
                {t('about')}
              </Link>
              <Link
                href='/gioi-thieu/giai-thuong'
                className='block text-gray-300 hover:text-white hover:-translate-y-0.5 transition-all duration-200 text-xs sm:text-sm'
              >
                {t('awards')}
              </Link>
              <Link
                href='/gioi-thieu/quan-he-hop-tac'
                className='block text-gray-300 hover:text-white hover:-translate-y-0.5 transition-all duration-200 text-xs sm:text-sm'
              >
                {t('cooperation')}
              </Link>
              <Link
                href='/blogs'
                className='block text-gray-300 hover:text-white hover:-translate-y-0.5 transition-all duration-200 text-xs sm:text-sm'
              >
                {t('news')}
              </Link>
              <Link
                href='/lien-he'
                className='block text-gray-300 hover:text-white hover:-translate-y-0.5 transition-all duration-200 text-xs sm:text-sm'
              >
                {t('contact')}
              </Link>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <Heading
              level={4}
              color='white'
              className='font-semibold mb-4 sm:mb-6 text-base sm:text-lg'
            >
              {t('information')}
            </Heading>
            <div className='space-y-3 sm:space-y-4'>
              {/* Address */}
              <div className='flex items-start space-x-2 sm:space-x-3'>
                <AddressIcon
                  width={14}
                  height={14}
                  stroke='white'
                  className='mt-1 flex-shrink-0 sm:w-4 sm:h-4'
                />
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(t('address'))}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-gray-300 hover:text-white hover:-translate-y-0.5 transition-all duration-200 text-xs sm:text-sm leading-relaxed cursor-pointer'
                >
                  {t('address')}
                </a>
              </div>

              {/* Phone */}
              <div className='flex items-center space-x-2 sm:space-x-3'>
                <PhoneIcon
                  width={14}
                  height={14}
                  stroke='white'
                  className='sm:w-4 sm:h-4'
                />
                <a
                  href='tel:+842837612606'
                  className='text-gray-300 hover:text-white hover:-translate-y-0.5 transition-all duration-200 text-xs sm:text-sm cursor-pointer'
                >
                  (+84) 28.3761.2606
                </a>
              </div>

              {/* Email */}
              <div className='flex items-start space-x-2 sm:space-x-3'>
                <EmailIcon
                  width={14}
                  height={14}
                  stroke='white'
                  className='mt-1 flex-shrink-0 sm:w-4 sm:h-4'
                />
                <div className='text-gray-300 text-xs sm:text-sm'>
                  <a
                    href='mailto:Info@kt-biotech.com'
                    className='block hover:text-white hover:-translate-y-0.5 transition-all duration-200 cursor-pointer mb-1'
                  >
                    Info@kt-biotech.com
                  </a>
                  <a
                    href='mailto:Sales@kt-biotech.com'
                    className='block hover:text-white hover:-translate-y-0.5 transition-all duration-200 cursor-pointer'
                  >
                    Sales@kt-biotech.com
                  </a>
                </div>
              </div>

              {/* Business Hours */}
              <div className='flex items-start space-x-2 sm:space-x-3'>
                <OClockIcon
                  width={14}
                  height={14}
                  stroke='white'
                  className='mt-1 flex-shrink-0 sm:w-4 sm:h-4'
                />
                <div className='text-gray-300 text-xs sm:text-sm'>
                  <div className='font-medium'>{t('businessHours')}</div>
                  <div>{t('morning')}</div>
                  <div>{t('afternoon')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className='border-t border-gray-700 mt-6 sm:mt-8 lg:mt-12 pt-4 sm:pt-6 lg:pt-8'>
          <div className='flex items-center justify-center'>
            <Text color='gray-400' className='text-xs sm:text-sm text-center'>
              Copyright © 2025 <span className='font-bold'>Khoa Thương</span>.
              Designed by{' '}
              <Link
                href='https://parashine.io/'
                target='_blank'
                rel='noopener noreferrer'
                className='font-bold text-gray-400 hover:text-white transition-colors duration-200'
              >
                ParaShine
              </Link>
            </Text>
          </div>
        </div>
      </div>
    </footer>
  );
}
