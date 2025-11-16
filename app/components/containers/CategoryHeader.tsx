'use client';
import {
  Button,
  DownloadIcon,
  Heading,
  Input,
  SearchIcon,
} from '@ktbiotech/system-design';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

type CategoryHeaderProps = {
  title: string;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  downloadLabel?: string;
  onDownloadClick?: () => void;
  searchParamKey?: string;
  debounceMs?: number;
  onOpenFilter?: () => void;
};

export function CategoryHeader({
  title,
  searchPlaceholder = 'Search here...',
  onSearchChange,
  downloadLabel = 'Download Catalogue',
  onDownloadClick,
  searchParamKey = 'q',
  debounceMs = 300,
  onOpenFilter,
}: CategoryHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initial = useMemo(
    () => searchParams.get(searchParamKey) || '',
    [searchParams, searchParamKey]
  );
  const [value, setValue] = useState(initial);

  useEffect(() => {
    setValue(initial);
  }, [initial]);

  useEffect(() => {
    if (onSearchChange) onSearchChange(value);

    const handle = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value.trim()) {
        params.set(searchParamKey, value.trim());
      } else {
        params.delete(searchParamKey);
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }, debounceMs);

    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, searchParamKey, debounceMs]);
  return (
    <div className='flex items-center gap-4 mb-4 flex-nowrap'>
      <Heading
        level={2}
        className='!text-xl md:!text-3xl shrink-0 '
        color='#215778'
      >
        {title}
      </Heading>

      {/* Right group: search + download aligned to right */}
      <div className='ml-auto flex items-center gap-4 w-full md:w-auto flex-1 justify-end'>
        <div className='relative w-full max-w-[400px] hidden min-[1080px]:block'>
          <Input
            placeholder={searchPlaceholder}
            aria-label='Tìm kiếm sản phẩm'
            className='h-12 pl-4 pr-14 rounded-full border border-gray-200'
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <span className='pointer-events-none absolute right-11 top-1/2 -translate-y-1/2 h-6 w-px bg-gray-300 z-10' />
          <span className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 z-10'>
            <SearchIcon width={18} height={18} />
          </span>
        </div>
        {/* Desktop download button */}
        <div className='hidden min-[1080px]:block'>
          <Button
            variant='outline'
            className='group rounded-full h-12 px-5 shrink-0 cursor-pointer text-[#215778] border-[#215778] hover:bg-[#215778] hover:text-white'
            onClick={onDownloadClick}
          >
            <span className='inline-flex items-center gap-2'>
              <DownloadIcon
                width={18}
                height={18}
                color='currentColor'
                className='text-[#215778] scale-[1.2] group-hover:text-white group-hover:scale-[1.4] transition-colors'
              />
              <span>{downloadLabel}</span>
            </span>
          </Button>
        </div>

        {/* Mobile filter button */}
        {onOpenFilter && (
          <div className='min-[1080px]:hidden'>
            <Button
              variant='outline'
              onClick={onOpenFilter}
              className='group rounded-full h-10 px-4 text-[#215778] border-[#215778] hover:bg-[#215778] hover:text-white'
            >
              <span className='inline-flex items-center gap-2'>
                {/* filter icon inline */}
                <svg
                  width='18'
                  height='18'
                  viewBox='0 0 24 24'
                  fill='none'
                  className='text-current group-hover:text-white transition-all group-hover:scale-[1.2]'
                >
                  <path
                    d='M3 5h18l-7 8v5l-4 2v-7L3 5z'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
                <span>Bộ lọc</span>
              </span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
