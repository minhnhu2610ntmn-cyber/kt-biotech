'use client';
import {
  Button,
  DownloadIcon,
  Heading,
  Input,
  SearchIcon,
} from '@ktbiotech/system-design';

type CategoryHeaderProps = {
  title: string;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  downloadLabel?: string;
  onDownloadClick?: () => void;
};

export function CategoryHeader({
  title,
  searchPlaceholder = 'Search here...',
  onSearchChange,
  downloadLabel = 'Download Catalogue',
  onDownloadClick,
}: CategoryHeaderProps) {
  return (
    <div className='flex items-center gap-4 flex-wrap md:flex-nowrap'>
      <Heading
        level={2}
        className='!text-2xl md:!text-3xl shrink-0 '
        color='#215778'
      >
        {title}
      </Heading>

      {/* Right group: search + download aligned to right */}
      <div className='ml-auto flex items-center gap-4 w-full md:w-auto flex-1 justify-end'>
        <div className='relative w-full max-w-[400px]'>
          <Input
            placeholder={searchPlaceholder}
            aria-label='Tìm kiếm sản phẩm'
            className='h-12 pl-4 pr-14 rounded-full border border-gray-200'
            onChange={e => onSearchChange?.(e.target.value)}
          />
          <span className='pointer-events-none absolute right-11 top-1/2 -translate-y-1/2 h-6 w-px bg-gray-300 z-10' />
          <span className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 z-10'>
            <SearchIcon width={18} height={18} />
          </span>
        </div>
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
              className='text-[#215778] group-hover:text-white group-hover:scale-[1.2] transition-colors'
            />
            <span>{downloadLabel}</span>
          </span>
        </Button>
      </div>
    </div>
  );
}
