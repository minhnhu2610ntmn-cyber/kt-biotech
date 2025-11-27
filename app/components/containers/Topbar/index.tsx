'use client';
import {
  Container,
  EmailIcon,
  PhoneIcon,
  Text,
} from '@/app/packages/system-design/src/components';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import * as React from 'react';

interface TopbarProps {
  message?: string;
  phoneNumber?: string;
  emailInfo?: string;
  emailSales?: string;
}

const Topbar: React.FC<TopbarProps> = ({
  message,
  phoneNumber = '(+84) 28.3761.2606',
  emailInfo = 'Info@kt-biotech.com',
  emailSales = 'Sales@kt-biotech.com',
}) => {
  const t = useTranslations('topbar');
  const displayMessage = message || t('message');
  return (
    <div className='w-full'>
      {/* Main dark blue bar */}
      <div className='w-full bg-[#34658C] text-white'>
        <Container className='!max-w-[1340px] px-4 sm:px-6 py-2 sm:py-3'>
          <div className='flex items-center justify-between gap-2'>
            {/* Left side - Message */}
            <Text
              className='text-xs sm:text-sm font-normal truncate flex-1 min-w-0'
              color='white'
            >
              {displayMessage}
            </Text>

            {/* Right side - Contact information */}
            <div className='flex items-center gap-1 sm:gap-2 md:gap-3 text-xs sm:text-sm flex-shrink-0'>
              {/* Phone */}
              <div className='flex items-center gap-1 group'>
                <PhoneIcon
                  width={16}
                  height={16}
                  className='text-white hover:scale-110 group-hover:scale-110 transition-transform duration-200 cursor-pointer sm:w-5 sm:h-5'
                />
                <Link
                  href={`tel:${phoneNumber}`}
                  className='hidden md:inline text-white hover:opacity-80 font-normal'
                >
                  {phoneNumber}
                </Link>
              </div>

              {/* Email Info */}
              <div className='flex items-center gap-1 group'>
                <EmailIcon
                  width={16}
                  height={16}
                  className='text-white hover:scale-110 group-hover:scale-110 transition-transform duration-200 cursor-pointer sm:w-5 sm:h-5'
                />
                <Link
                  href={`mailto:${emailInfo}`}
                  className='hidden md:inline text-white hover:opacity-80 font-normal'
                >
                  {emailInfo}
                </Link>
              </div>

              {/* Separator */}
              <Text color='white' className='hidden md:inline font-normal'>
                |
              </Text>

              {/* Email Sales */}
              <Link
                href={`mailto:${emailSales}`}
                className='hidden md:inline text-white hover:opacity-80 font-normal'
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
