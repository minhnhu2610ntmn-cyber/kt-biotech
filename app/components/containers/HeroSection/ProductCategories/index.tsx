import { Heading, Link } from '@ktbiotech/system-design';
import type { ProductCategory } from '../../../types';

export interface ProductCategoriesProps {
  categories: ProductCategory[];
  onCategoryClick?: (category: ProductCategory) => void;
  className?: string;
}

export default function ProductCategories({
  categories,
  onCategoryClick,
  className,
}: ProductCategoriesProps) {
  return (
    <div className={`bg-kt-gray-100 p-6 rounded-lg ${className}`}>
      <Heading level={3} className='mb-4 text-kt-gray-800 font-semibold'>
        DANH MỤC SẢN PHẨM
      </Heading>
      <ul className='space-y-2'>
        {categories.map((category) => (
          <li key={category.id}>
            <Link
              href={category.href}
              className='flex items-center text-kt-gray-500 hover:text-kt-blue-600 transition-colors'
              onClick={() => onCategoryClick?.(category)}
            >
              <span className='mr-2 text-kt-gray-400'>›</span>
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
