'use client';

import { Button, Heading, Input, Text } from '@ktbiotech/system-design';
import Link from 'next/link';

interface FooterProps {
  showNewsletter?: boolean;
  onNewsletterSubmit?: (email: string) => void;
}

export default function Footer({
  showNewsletter = true,
  onNewsletterSubmit: _onNewsletterSubmit,
}: FooterProps) {
  return (
    <footer className='bg-kt-blue-600 text-white'>
      {/* Newsletter Section */}
      {showNewsletter && (
        <div className='border-b border-kt-blue-500'>
          <div className='container mx-auto px-4 py-8'>
            <div className='max-w-2xl mx-auto text-center'>
              <Heading level={3} className='text-2xl font-bold mb-4'>
                Stay Updated
              </Heading>
              <Text className='text-kt-blue-100 mb-6'>
                Subscribe to our newsletter for the latest insights, research,
                and innovations in biotechnology.
              </Text>
              <div className='flex gap-3 max-w-md mx-auto'>
                <Input
                  type='email'
                  name='email'
                  placeholder='Enter your email'
                  required
                  className='flex-1'
                />
                <Button type='submit'>Subscribe</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Footer Content */}
      <div className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 lg:grid-cols-[1fr_200px_200px] gap-12'>
          {/* Company Info */}
          <div>
            <Heading level={4} className='font-semibold mb-6 text-xl'>
              KTBioTech
            </Heading>
            <div className='space-y-4'>
              <Text className='text-lg font-bold'>
                Leading Biotechnology Solutions
              </Text>
              <div className='space-y-2 text-kt-blue-100'>
                <Text>
                  Địa chỉ: Số 10-12, đường số 3, KDC Gia Hòa, Phường Phong Phú,
                  tp Hồ Chí Minh
                </Text>
                <Text>Email: info@kt-biotech.com</Text>
                <Text>Phone: +84 123 456 789</Text>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <Heading level={4} className='font-semibold mb-6 text-xl'>
              Quick Links
            </Heading>
            <div className='space-y-2 text-kt-blue-100'>
              <Link
                href='/about'
                className='hover:text-white transition-colors'
              >
                About Us
              </Link>
              <Link
                href='/products'
                className='hover:text-white transition-colors'
              >
                Products
              </Link>
              <Link
                href='/services'
                className='hover:text-white transition-colors'
              >
                Services
              </Link>
              <Link
                href='/contact'
                className='hover:text-white transition-colors'
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Business Hours */}
          <div>
            <Heading level={4} className='font-semibold mb-6 text-xl'>
              Business Hours
            </Heading>
            <div className='space-y-4 text-kt-blue-100'>
              <div>
                <Text className='font-medium mb-2'>Monday - Friday</Text>
                <Text className='ml-4 space-y-1'>8:00 AM - 6:00 PM</Text>
              </div>
              <div>
                <Text className='font-medium'>
                  Thứ 7 – Chủ nhật không làm việc
                </Text>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className='border-t border-kt-blue-500 mt-12 pt-8'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
            <Text className='text-kt-blue-100 text-sm'>
              © 2024 KTBioTech. All rights reserved.
            </Text>
            <div className='flex items-center gap-6 text-sm'>
              <Link
                href='/privacy'
                className='text-kt-blue-100 hover:text-white transition-colors'
              >
                Privacy Policy
              </Link>
              <Link
                href='/terms'
                className='text-kt-blue-100 hover:text-white transition-colors'
              >
                Terms of Service
              </Link>
              <Link
                href='/cookies'
                className='text-kt-blue-100 hover:text-white transition-colors'
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
