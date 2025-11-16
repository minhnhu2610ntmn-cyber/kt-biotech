'use client';

import { Button, FacebookIcon, Heading, Text } from '@ktbiotech/system-design';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

interface ProductContactCardProps {
  phone?: string;
  contactName?: string;
  contactPosition?: string;
  contactImage?: string;
  className?: string;
  zaloLink?: string;
  facebookLink?: string;
  whatsappLink?: string;
}

export default function ProductContactCard({
  phone = '(+84) 28.3761.2606',
  contactName = 'Name',
  contactPosition = 'Position',
  contactImage,
  className = '',
  zaloLink,
  facebookLink,
  whatsappLink,
}: ProductContactCardProps) {
  const t = useTranslations('product.contactCard');
  // Helper function to format phone number for Zalo/WhatsApp links
  const formatPhoneForLink = (phoneNumber: string): string => {
    // Remove all non-digit characters except +
    const cleaned = phoneNumber.replace(/[^\d+]/g, '');
    // If starts with +84, keep it; otherwise add +84 if it's a Vietnamese number
    if (cleaned.startsWith('+84')) {
      return cleaned.replace('+', '');
    }
    if (cleaned.startsWith('84')) {
      return cleaned;
    }
    if (cleaned.startsWith('0')) {
      return `84${cleaned.substring(1)}`;
    }
    return cleaned;
  };

  // Generate links from phone if not provided
  const zaloUrl =
    zaloLink || (phone ? `https://zalo.me/${formatPhoneForLink(phone)}` : '#');
  const whatsappUrl =
    whatsappLink ||
    (phone ? `https://wa.me/${formatPhoneForLink(phone)}` : '#');
  const facebookUrl = facebookLink || '#';
  return (
    <div className={`flex items-center gap-0 ${className}`}>
      {/* Profile Picture - Left side with border, overlapping banner */}
      <div className='relative z-10 flex-shrink-0'>
        <div className='relative w-30 h-30 rounded-full overflow-hidden border-4 border-[#86BDDF] bg-white flex items-center justify-center'>
          {contactImage ? (
            <Image
              src={contactImage}
              alt={contactName}
              fill
              className='object-cover'
            />
          ) : (
            <div className='w-full h-full flex items-center justify-center bg-[#E6F1F9] text-[#215778]'>
              {/* Support avatar (headset) */}
              <svg
                width='72 '
                height='72'
                viewBox='0 0 24 24'
                fill='none'
                aria-hidden='true'
                opacity={0.8}
              >
                <path
                  d='M12 3a7 7 0 00-7 7v2.5a2.5 2.5 0 002.5 2.5H9v-2H7.5A.5.5 0 017 12.5V10a5 5 0 0110 0v2.5a.5.5 0 01-.5.5H15v2h1.5A2.5 2.5 0 0019 12.5V10a7 7 0 00-7-7z'
                  fill='currentColor'
                />
                <circle
                  cx='12'
                  cy='11'
                  r='3.5'
                  stroke='currentColor'
                  strokeWidth='1.5'
                />
                <path
                  d='M8 18.5c0-.828.895-1.5 2-1.5h4c1.105 0 2 .672 2 1.5S15.105 20 14 20h-4c-1.105 0-2-.672-2-1.5z'
                  fill='currentColor'
                />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Banner - Right side */}
      <div className=' rounded-br-lg rounded-tr-lg bg-[#215778] pr-6 py-4 pl-14 text-white -ml-12'>
        {/* Heading */}
        <Heading
          level={3}
          color='white'
          className='!text-lg !font-bold mb-2 text-white'
        >
          {t('title')}
        </Heading>

        {/* Contact Info and Social Icons */}
        <div className='flex items-center gap-2 flex-wrap'>
          <div className='flex-1 min-w-0'>
            {/* Phone Number - Light blue color */}
            <Text color='#86BDDF' className='!text-[#86BDDF] font-medium mb-1'>
              {phone}
            </Text>
            {/* Name - Position - White italic */}
            <Text color='white' className='!text-white text-sm italic'>
              {contactName} - {contactPosition}
            </Text>
          </div>

          {/* Social Media Icons */}
          <div className='flex gap-2'>
            {/* Zalo Icon - White background, blue logo */}
            <Button
              variant='ghost'
              size='icon'
              className='w-8 h-8 rounded !bg-white flex items-center justify-center hover:scale-110 transition-transform p-0'
              aria-label='Contact via Zalo'
              asChild
            >
              <a
                href={zaloUrl}
                target='_blank'
                rel='noopener noreferrer'
                onClick={e => {
                  if (zaloUrl === '#') {
                    e.preventDefault();
                  }
                }}
              >
                <svg
                  className='scale-[1.5]'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  xmlnsXlink='http://www.w3.org/1999/xlink'
                >
                  <rect
                    width='24'
                    height='24'
                    rx='4'
                    fill='url(#pattern0_351_11935)'
                  />
                  <defs>
                    <pattern
                      id='pattern0_351_11935'
                      patternContentUnits='objectBoundingBox'
                      width='1'
                      height='1'
                    >
                      <use
                        xlinkHref='#image0_351_11935'
                        transform='scale(0.00444444)'
                      />
                    </pattern>
                    <image
                      id='image0_351_11935'
                      width='225'
                      height='225'
                      preserveAspectRatio='none'
                      xlinkHref='data:image/png;base64,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'
                    />
                  </defs>
                </svg>
              </a>
            </Button>

            {/* Facebook Icon - Blue background, white logo */}
            <Button
              variant='ghost'
              size='icon'
              className='w-8 h-8 rounded !bg-[#1877F2] flex items-center justify-center hover:scale-110 transition-transform p-0'
              aria-label='Contact via Facebook'
              asChild
            >
              <a
                href={facebookUrl}
                target='_blank'
                rel='noopener noreferrer'
                onClick={e => {
                  if (facebookUrl === '#') {
                    e.preventDefault();
                  }
                }}
              >
                <FacebookIcon width={16} height={16} stroke='white' />
              </a>
            </Button>

            {/* WhatsApp Icon - Green background, white logo */}
            <Button
              variant='ghost'
              size='icon'
              className='w-8 h-8 rounded !bg-[#25D366] flex items-center justify-center hover:scale-110 transition-transform p-0'
              aria-label='Contact via WhatsApp'
              asChild
            >
              <a
                href={whatsappUrl}
                target='_blank'
                rel='noopener noreferrer'
                onClick={e => {
                  if (whatsappUrl === '#') {
                    e.preventDefault();
                  }
                }}
              >
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z'
                    fill='white'
                  />
                </svg>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
