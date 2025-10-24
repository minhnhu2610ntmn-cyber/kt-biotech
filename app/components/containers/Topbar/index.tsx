'use client';
import {
  Container,
  EmailIcon,
  PhoneIcon,
  Text,
} from '@/app/packages/system-design/src/components';
import Link from 'next/link';
import * as React from 'react';

interface TopbarProps {
  message?: string;
  phoneNumber?: string;
  emailInfo?: string;
  emailSales?: string;
}

const Topbar: React.FC<TopbarProps> = ({
  message = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh',
  phoneNumber = '(+84) 28.3761.2606',
  emailInfo = 'Info@kt-biotech.com',
  emailSales = 'Sales@kt-biotech.com',
}) => {
  return (
    <div className='w-full'>
      {/* Top dark grey strip */}
      <div className='w-full bg-[#4A4A4A] h-2 sm:h-3'>
        <Container className='h-full !max-w-[1340px]'>
          <div></div>
        </Container>
      </div>

      {/* Main dark blue bar */}
      <div className='w-full bg-[#34658C] text-white'>
        <Container className='!max-w-[1340px] py-2 sm:py-3'>
          <div className='flex items-center justify-between gap-2'>
            {/* Left side - Message */}
            <Text
              className='text-xs sm:text-sm font-normal truncate flex-shrink-0 max-w-[200px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-none'
              color='white'
            >
              {message}
            </Text>

            {/* Right side - Contact information */}
            <div className='flex items-center gap-1 sm:gap-2 md:gap-3 text-xs sm:text-sm flex-shrink-0'>
              {/* Phone */}
              <div className='flex items-center gap-1 group'>
                <PhoneIcon
                  width={30}
                  height={30}
                  className='text-white hover:scale-110 group-hover:scale-110 transition-transform duration-200 cursor-pointer'
                />
                <Link
                  href={`tel:${phoneNumber}`}
                  className='text-white hover:opacity-80 font-normal'
                >
                  {phoneNumber}
                </Link>
              </div>

              {/* Email Info */}
              <div className='flex items-center gap-1 group'>
                <EmailIcon
                  width={24}
                  height={24}
                  className='text-white hover:scale-110 group-hover:scale-110 transition-transform duration-200 cursor-pointer'
                />
                <Link
                  href={`mailto:${emailInfo}`}
                  className='text-white hover:opacity-80 font-normal'
                >
                  {emailInfo}
                </Link>
              </div>

              {/* Separator */}
              <Text color='white' className='font-normal'>
                |
              </Text>

              {/* Email Sales */}
              <Link
                href={`mailto:${emailSales}`}
                className='text-white hover:opacity-80 font-normal'
              >
                {emailSales}
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Topbar;
