'use client';

import {
  AddressIcon,
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
import Image from 'next/image';
import Link from 'next/link';

interface FooterProps {
  showNewsletter?: boolean;
  onNewsletterSubmit?: (email: string) => void;
}

export default function Footer({
  showNewsletter: _showNewsletter = false,
  onNewsletterSubmit: _onNewsletterSubmit,
}: FooterProps) {
  return (
    <footer className='bg-gray-900 !text-white'>
      {/* Main Footer Content */}
      <div className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8'>
          {/* Company Info & Social Media */}
          <div className='lg:col-span-1'>
            {/* Logo */}
            <div className='flex items-center mb-4'>
              <Image
                src='/logo.png'
                alt='KT BIOTECH Logo'
                width={120}
                height={40}
                className='h-10 w-auto'
              />
            </div>

            {/* Description */}
            <Text color='gray-300' className='mb-6 text-sm leading-relaxed'>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt
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
              className='font-semibold mb-6 text-lg'
            >
              Sản phẩm
            </Heading>
            <div className='space-y-2 sm:space-y-3'>
              <Link
                href='/products/kit-nhap-khau'
                className='block text-gray-300 hover:text-white hover:-translate-y-0.5 transition-all duration-200 text-sm'
              >
                Kit nhập khẩu
              </Link>
              <Link
                href='/products/kit-tren-nguoi'
                className='block text-gray-300 hover:text-white hover:-translate-y-0.5 transition-all duration-200 text-sm'
              >
                Kit trên người
              </Link>
              <Link
                href='/products/kit-tren-dong-vat'
                className='block text-gray-300 hover:text-white hover:-translate-y-0.5 transition-all duration-200 text-sm'
              >
                Kit trên động vật
              </Link>
              <Link
                href='/products/kit-tren-thuy-san'
                className='block text-gray-300 hover:text-white hover:-translate-y-0.5 transition-all duration-200 text-sm'
              >
                Kit trên thủy sản
              </Link>
              <Link
                href='/products/kit-tren-thuc-pham'
                className='block text-gray-300 hover:text-white hover:-translate-y-0.5 transition-all duration-200 text-sm'
              >
                Kit trên thực phẩm
              </Link>
              <Link
                href='/products/kit-tach-chiet'
                className='block text-gray-300 hover:text-white hover:-translate-y-0.5 transition-all duration-200 text-sm'
              >
                Kit tách chiết
              </Link>
              <Link
                href='/products/san-pham-khac'
                className='block text-gray-300 hover:text-white hover:-translate-y-0.5 transition-all duration-200 text-sm'
              >
                Sản phẩm khác
              </Link>
            </div>
          </div>

          {/* About Us */}
          <div>
            <Heading
              level={4}
              color='white'
              className='font-semibold mb-6 text-lg'
            >
              Chúng tôi
            </Heading>
            <div className='space-y-2 sm:space-y-3'>
              <Link
                href='/about'
                className='block text-gray-300 hover:text-white hover:-translate-y-0.5 transition-all duration-200 text-sm'
              >
                Giới thiệu
              </Link>
              <Link
                href='/careers'
                className='block text-gray-300 hover:text-white hover:-translate-y-0.5 transition-all duration-200 text-sm'
              >
                Tuyển dụng
              </Link>
              <Link
                href='/partners'
                className='block text-gray-300 hover:text-white hover:-translate-y-0.5 transition-all duration-200 text-sm'
              >
                Đối tác
              </Link>
              <Link
                href='/contact'
                className='block text-gray-300 hover:text-white hover:-translate-y-0.5 transition-all duration-200 text-sm'
              >
                Liên hệ
              </Link>
              <Link
                href='/awards'
                className='block text-gray-300 hover:text-white hover:-translate-y-0.5 transition-all duration-200 text-sm'
              >
                Giải thưởng
              </Link>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <Heading
              level={4}
              color='white'
              className='font-semibold mb-6 text-lg'
            >
              Thông tin
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
                  href='https://maps.google.com/?q=Số+10-12,+đường+số+3A,+khu+dân+cư+Gia+Hoà,+phường+Bình+Hưng,+Tp.+Hồ+Chí+Minh'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-gray-300 hover:text-white hover:-translate-y-0.5 transition-all duration-200 text-xs sm:text-sm leading-relaxed cursor-pointer'
                >
                  Số 10-12, đường số 3A, khu dân cư Gia Hoà, phường Bình Hưng,
                  Tp. Hồ Chí Minh
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
                  <div className='font-medium'>Thứ 2 - Thứ 6</div>
                  <div>Sáng: 07h30 - 12h00</div>
                  <div>Chiều: 13h30 - 17h00</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className='border-t border-gray-700 mt-8 sm:mt-12 pt-6 sm:pt-8'>
          <div className='flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4'>
            <div className='flex items-center gap-4 sm:gap-6 text-xs sm:text-sm'>
              <Link
                href='/terms'
                className='text-gray-400 hover:text-white hover:-translate-y-0.5 transition-all duration-200'
              >
                Terms & conditions
              </Link>
              <Link
                href='/privacy'
                className='text-gray-400 hover:text-white hover:-translate-y-0.5 transition-all duration-200'
              >
                Privacy policy
              </Link>
            </div>
            <Text color='gray-400' className='text-xs sm:text-sm text-center'>
              Copyright © 2025 Khoa Thương. Designed by ParaShine
            </Text>
          </div>
        </div>
      </div>
    </footer>
  );
}
