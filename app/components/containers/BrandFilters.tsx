'use client';

import { Heading, Input, Text } from '@ktbiotech/system-design';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export type Brand = { id: number; name: string };

interface BrandFiltersProps {
  title?: string;
  brands: Brand[];
}

export default function BrandFilters({
  title,
  brands,
}: BrandFiltersProps) {
  const t = useTranslations('category');
  const defaultTitle = title || t('manufacturer');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selected = new Set(
    (searchParams.get('brands') || '')
      .split(',')
      .map(v => v.trim())
      .filter(Boolean)
  );

  function toggleBrand(brandId: number) {
    const updated = new Set(selected);
    const key = String(brandId);
    if (updated.has(key)) {
      updated.delete(key);
    } else {
      updated.add(key);
    }

    const params = new URLSearchParams(searchParams.toString());
    const value = Array.from(updated).join(',');
    if (value) {
      params.set('brands', value);
    } else {
      params.delete('brands');
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className='mt-4 w-full rounded-xl bg-[#F7FBFD] p-4'>
      <Heading level={6} className='!text-base mb-3 !text-[#215778]'>
        {defaultTitle}
      </Heading>
      <div className='space-y-3'>
        {brands.map(brand => {
          const checked = selected.has(String(brand.id));
          return (
            <label key={brand.id} className='flex items-center gap-3'>
              <Input
                type='checkbox'
                checked={checked}
                onChange={() => toggleBrand(brand.id)}
                aria-label={brand.name}
                className='h-4 w-4 rounded-[4px] border-[#C9DDEA]'
              />
              <Text className='text-gray-500'>{brand.name}</Text>
            </label>
          );
        })}
      </div>
    </div>
  );
}
