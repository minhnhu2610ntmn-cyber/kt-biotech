'use client';

import { Heading, Input, Text } from '@ktbiotech/system-design';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface Subcategory {
  id: number | string;
  name: string;
  slug: string;
  sub?: Subcategory[];
}

interface SubcategoryFiltersProps {
  title?: string;
  categories: any[];
  activeCategory: string;
}

/**
 * Helper function to find category by slug in tree
 */
function findCategoryInTree(categories: any[], slug: string): any | null {
  for (const cat of categories) {
    if (cat.slug === slug) {
      return cat;
    }
    if (cat.sub && cat.sub.length > 0) {
      const found = findCategoryInTree(cat.sub, slug);
      if (found) return found;
    }
  }
  return null;
}

/**
 * Helper function to collect all subcategories recursively
 */
function getAllSubcategories(category: any): Subcategory[] {
  const subcategories: Subcategory[] = [];
  
  if (category.sub && Array.isArray(category.sub) && category.sub.length > 0) {
    for (const sub of category.sub) {
      if (sub.slug) {
        subcategories.push({
          id: sub.id || sub.slug,
          name: sub.name,
          slug: sub.slug,
        });
        // Recursively add nested subcategories
        if (sub.sub && sub.sub.length > 0) {
          const nested = getAllSubcategories(sub);
          subcategories.push(...nested);
        }
      }
    }
  }
  
  return subcategories;
}

export default function SubcategoryFilters({
  title,
  categories,
  activeCategory,
}: SubcategoryFiltersProps) {
  const t = useTranslations('category');
  const defaultTitle = title || 'Danh mục con';
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Find the active category in the tree
  const activeCategoryData = findCategoryInTree(categories, activeCategory);
  
  // Get all subcategories of the active category
  const subcategories = activeCategoryData
    ? getAllSubcategories(activeCategoryData)
    : [];

  // If no subcategories, don't render
  if (subcategories.length === 0) {
    return null;
  }

  // Support both 'sub' and 'subcategory' query params (prefer 'sub')
  const selectedSubcategory =
    searchParams.get('sub') || searchParams.get('subcategory') || '';

  function toggleSubcategory(subcategorySlug: string) {
    const params = new URLSearchParams(searchParams.toString());
    
    // Remove both 'sub' and 'subcategory' to avoid conflicts
    params.delete('sub');
    params.delete('subcategory');
    
    if (selectedSubcategory === subcategorySlug) {
      // If already selected, remove it (already deleted above)
    } else {
      // Set the selected subcategory using 'sub' param
      params.set('sub', subcategorySlug);
    }
    
    // Reset to page 1 when changing filter
    params.set('page', '1');
    
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className='mt-4 w-full rounded-xl bg-[#F7FBFD] p-4'>
      <Heading level={6} className='!text-base mb-3 !text-[#215778]'>
        {defaultTitle}
      </Heading>
      <div className='space-y-3'>
        {subcategories.map(subcategory => {
          const checked = selectedSubcategory === subcategory.slug;
          return (
            <label
              key={subcategory.slug}
              className='flex items-center gap-3 cursor-pointer'
            >
              <Input
                type='radio'
                name='subcategory'
                checked={checked}
                onChange={() => toggleSubcategory(subcategory.slug)}
                aria-label={subcategory.name}
                className='h-4 w-4'
              />
              <Text className='text-gray-500'>{subcategory.name}</Text>
            </label>
          );
        })}
      </div>
    </div>
  );
}

