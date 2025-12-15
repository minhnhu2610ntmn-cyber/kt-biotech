'use client';

import { ChevronRightIcon, Text } from '@ktbiotech/system-design';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface PaginationControlsProps {
  total: number;
  page: number;
  pageSize: number;
  pageSizeOptions?: number[];
}

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export default function PaginationControls({
  total,
  page,
  pageSize,
  pageSizeOptions = [10, 20, 50],
}: PaginationControlsProps) {
  const t = useTranslations('common');
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const pageCount = Math.max(1, Math.ceil(total / Math.max(1, pageSize)));

  function push(next: Partial<{ page: number; pageSize: number }>) {
    const q = new URLSearchParams(params.toString());
    if (next.page !== undefined) q.set('page', String(next.page));
    if (next.pageSize !== undefined) q.set('pageSize', String(next.pageSize));
    router.push(`${pathname}?${q.toString()}`, { scroll: false });
  }

  const windowFrom = Math.max(1, page - 1);
  const windowTo = Math.min(pageCount, page + 2);
  const pages = range(windowFrom, windowTo);

  if (pageCount <= 1) return null;

  return (
    <div className='flex items-center justify-between flex-col md:flex-row mt-4 gap-2 md:gap-0 relative'>
      <div className='flex items-center gap-2 order-1 md:order-0 relative z-10'>
        <Text className='text-[#1B1C1D] hidden md:block '>
          {t('rowsPerPage')}
        </Text>
        <Text className='text-[#1B1C1D] block md:hidden '>
          {t('rowsPerPageMobile')}
        </Text>
        <select
          className='border border-[#E3EEF5] rounded-md px-2 py-1 text-sm'
          value={pageSize}
          onChange={e => push({ page: 1, pageSize: Number(e.target.value) })}
        >
          {pageSizeOptions.map(opt => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      <div className='flex items-center order-0 md:order-1 gap-2 static md:absolute w-full justify-center'>
        <button
          aria-label='Prev'
          disabled={page <= 1}
          onClick={() => push({ page: Math.max(1, page - 1) })}
          className='w-8 h-8 grid place-items-center rounded disabled:opacity-50 hover:bg-[#EAF3F8] cursor-pointer disabled:cursor-not-allowed'
        >
          <ChevronRightIcon
            width={16}
            height={16}
            className='rotate-180 text-[#1B1C1D]'
          />
        </button>
        {windowFrom > 1 && (
          <>
            <button
              onClick={() => push({ page: 1 })}
              className='w-8 h-8 grid place-items-center rounded hover:bg-[#EAF3F8] cursor-pointer'
            >
              1
            </button>
            {windowFrom > 2 && <span className='px-1 text-gray-500'>…</span>}
          </>
        )}
        {pages.map(p => (
          <button
            key={p}
            onClick={() => push({ page: p })}
            className={`w-8 h-8 grid place-items-center rounded cursor-pointer ${
              p === page ? 'bg-[#86BDDF] text-white' : 'hover:bg-[#EAF3F8]'
            }`}
          >
            {p}
          </button>
        ))}
        {windowTo < pageCount && (
          <>
            {windowTo < pageCount - 1 && (
              <span className='px-1 text-gray-500'>…</span>
            )}
            <button
              onClick={() => push({ page: pageCount })}
              className='w-8 h-8 grid place-items-center rounded hover:bg-[#EAF3F8] cursor-pointer'
            >
              {pageCount}
            </button>
          </>
        )}
        <button
          aria-label='Next'
          disabled={page >= pageCount}
          onClick={() => push({ page: Math.min(pageCount, page + 1) })}
          className='w-8 h-8 grid place-items-center rounded disabled:opacity-50 hover:bg-[#EAF3F8] cursor-pointer disabled:cursor-not-allowed'
        >
          <ChevronRightIcon width={16} height={16} className='text-[#1B1C1D]' />
        </button>
      </div>
    </div>
  );
}
