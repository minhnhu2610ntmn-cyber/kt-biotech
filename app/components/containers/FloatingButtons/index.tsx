'use client';

import {
  cn,
  DownloadIcon,
  WhatsAppIcon,
  ZaloIcon,
} from '@ktbiotech/system-design';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface FloatingButtonsProps {
  catalogueDownload?: {
    url: string;
    fileName?: string;
    label?: string;
  } | null;
}

export default function FloatingButtons({
  catalogueDownload = null,
}: FloatingButtonsProps) {
  const t = useTranslations('common');
  const tNavbar = useTranslations('navbar');
  const [isDownloading, setIsDownloading] = useState(false);

  const handleCatalogueDownload = async () => {
    if (!catalogueDownload?.url || isDownloading) return;
    setIsDownloading(true);
    try {
      const response = await fetch(catalogueDownload.url);
      if (!response.ok) {
        throw new Error(
          `Failed to download catalogue: ${response.status} ${response.statusText}`
        );
      }
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = catalogueDownload.fileName || 'catalogue.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Catalogue download failed', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const downloadLabel = tNavbar('downloadCatalogue1');
  const isCatalogueAvailable = Boolean(catalogueDownload?.url);

  return (
    <>
      {/* Download Catalogue Button - Only visible on < 1024px */}
      <button
        onClick={handleCatalogueDownload}
        className={cn(
          'fixed right-0 top-1/2 -translate-y-[30vh] translate-x-[12px] z-50 lg:hidden',
          'w-12 md:w-14 h-32 md:h-40',
          'flex  items-center justify-center gap-2',
          'group',
          'rounded-t-2xl rounded-b-2xl',
          isDownloading && 'opacity-75 cursor-not-allowed'
        )}
        style={{
          background: 'linear-gradient(90deg, #FDCF75 0%, #FDBA35 100%)',
        }}
        aria-label={downloadLabel}
        disabled={!isCatalogueAvailable || isDownloading}
      >
        <div className='-rotate-90 -translate-x-[6px] flex items-center gap-2'>
          {isDownloading ? (
            <svg
              className='animate-spin text-[#333638]'
              width={20}
              height={20}
              viewBox='0 0 24 24'
              fill='none'
            >
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
              />
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
              />
            </svg>
          ) : (
            <DownloadIcon
              width={20}
              height={20}
              color='#333638'
              className='text-white scale-110 mb-1 transition-transform'
            />
          )}
          <span className='text-[#333638] text-xs md:text-sm font-semibold whitespace-nowrap'>
            {isDownloading ? t('downloading') : downloadLabel}
          </span>
        </div>
      </button>

      {/* Phone and Zalo Buttons */}
      <div className='fixed right-3 md:right-4 top-2/3 z-50 flex flex-col gap-3'>
        {/* Phone Button */}
        <a
          href='tel:+842837612606'
          className={cn(
            'w-11 h-11 md:w-14 md:h-14 rounded-full bg-[#3691C9] hover:bg-[#2a7ba3]',
            'flex items-center justify-center',
            'shadow-lg hover:shadow-xl transition-all duration-300',
            'hover:scale-110 active:scale-95',
            'group',
            'animate-shake'
          )}
          aria-label={t('phone')}
        >
          <svg
            width='28'
            height='28'
            viewBox='0 0 41 41'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M24.7199 8.33333C26.5106 8.6827 28.1563 9.55847 29.4463 10.8485C30.7364 12.1386 31.6122 13.7843 31.9615 15.575M24.7199 1C28.4402 1.4133 31.9095 3.07932 34.558 5.72451C37.2065 8.36971 38.8769 11.8369 39.2949 15.5567M37.4615 30.1867V35.6867C37.4636 36.1973 37.359 36.7026 37.1545 37.1705C36.9499 37.6383 36.6499 38.0582 36.2737 38.4034C35.8974 38.7486 35.4533 39.0114 34.9696 39.175C34.4859 39.3385 33.9734 39.3993 33.4649 39.3533C27.8234 38.7403 22.4044 36.8126 17.6432 33.725C13.2136 30.9102 9.458 27.1546 6.64321 22.725C3.54484 17.9422 1.61666 12.4968 1.01488 6.83C0.969067 6.32302 1.02932 5.81206 1.1918 5.32964C1.35428 4.84723 1.61543 4.40393 1.95862 4.02797C2.30181 3.65201 2.71952 3.35163 3.18516 3.14596C3.65081 2.94028 4.15417 2.83381 4.66321 2.83333H10.1632C11.0529 2.82458 11.9155 3.13964 12.5901 3.71981C13.2647 4.29998 13.7054 5.10565 13.8299 5.98667C14.062 7.74679 14.4925 9.475 15.1132 11.1383C15.3599 11.7945 15.4133 12.5077 15.267 13.1933C15.1208 13.8789 14.7811 14.5082 14.2882 15.0067L11.9599 17.335C14.5697 21.9248 18.37 25.7251 22.9599 28.335L25.2882 26.0067C25.7867 25.5138 26.416 25.1741 27.1016 25.0278C27.7872 24.8816 28.5004 24.935 29.1565 25.1817C30.8199 25.8023 32.5481 26.2329 34.3082 26.465C35.1988 26.5906 36.0121 27.0392 36.5935 27.7254C37.1749 28.4116 37.4839 29.2876 37.4615 30.1867Z'
              stroke='#F7FBFD'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </a>

        {/* Zalo Button */}
        <a
          href='https://zalo.me/722977074887414014'
          target='_blank'
          rel='noopener noreferrer'
          className={cn(
            'w-11 h-11 md:w-14 md:h-14 rounded-full bg-[#3691C9] hover:bg-[#2a7ba3]',
            'flex items-center justify-center',
            'shadow-lg hover:shadow-xl transition-all duration-300',
            'hover:scale-110 active:scale-95',
            'group'
          )}
          aria-label='Zalo'
        >
          <div className='rounded-full bg-white p-1.5 md:p-2 scale-[0.8] md:scale-[0.85]'>
            {' '}
            <ZaloIcon
              width={30}
              height={30}
              fill='white'
              className='text-white'
            />
          </div>
        </a>

        {/* WhatsApp Button */}
        <a
          href='https://wa.me/842837612606'
          target='_blank'
          rel='noopener noreferrer'
          className={cn(
            'w-11 h-11 md:w-14 md:h-14 rounded-full bg-[#25D366] hover:bg-[#1da851]',
            'flex items-center justify-center',
            'shadow-lg hover:shadow-xl transition-all duration-300',
            'hover:scale-110 active:scale-95',
            'group'
          )}
          aria-label='WhatsApp'
        >
          <div className='rounded-full bg-white p-1.5 md:p-2 scale-[0.8] md:scale-[0.85]'>
            <WhatsAppIcon
              width={30}
              height={30}
              fill='#25D366'
              className='text-white'
            />
          </div>
        </a>
      </div>
    </>
  );
}
