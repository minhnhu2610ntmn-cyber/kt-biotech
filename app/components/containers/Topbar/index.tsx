'use client';
import {
  Button,
  Container,
  EmailIcon,
  FacebookIcon,
  PrintIcon,
  Text,
} from '@/app/packages/system-design/src/components';
import Link from 'next/link';
import * as React from 'react';

interface TopbarProps {
  message?: string;
}

const Topbar: React.FC<TopbarProps> = ({
  message = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh',
}) => {
  return (
    <div className='w-full bg-[#245575] text-white h-[60px]'>
      <Container className='h-full !max-w-[1340px] flex items-center justify-between'>
        <Text
          className='text-xs md:text-sm font-medium truncate max-w-[200px] sm:max-w-none'
          color='white'
        >
          {message}
        </Text>
        <div className='flex items-center gap-3 sm:gap-5'>
          <Link
            href='https://facebook.com'
            aria-label='Facebook'
            className='hover:opacity-80'
          >
            <FacebookIcon
              width={16}
              height={16}
              className='sm:w-[18px] sm:h-[18px]'
            />
          </Link>
          <Link
            href='mailto:info@ktbiotech.com'
            aria-label='Email'
            className='hover:opacity-80'
          >
            <EmailIcon
              width={16}
              height={16}
              className='sm:w-[18px] sm:h-[18px]'
            />
          </Link>
          <Button
            variant='ghost'
            size='icon-sm'
            aria-label='Print'
            onClick={() => window.print()}
            className='hover:opacity-80 p-1'
          >
            <PrintIcon
              width={16}
              height={16}
              className='sm:w-[18px] sm:h-[18px]'
            />
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Topbar;
