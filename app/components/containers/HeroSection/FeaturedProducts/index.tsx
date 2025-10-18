import { Heading, Text } from '@ktbiotech/system-design';
import type { Product } from '../../../types';

export interface FeaturedProductsProps {
  products: Product[];
  className?: string;
}

export default function FeaturedProducts({
  products,
  className,
}: FeaturedProductsProps) {
  return (
    <div className={className}>
      <Heading
        level={3}
        className='text-kt-gray-800 font-semibold mb-6 text-center'
      >
        SẢN PHẨM NỔI BẬT
      </Heading>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {products.map(product => (
          <div
            key={product.id}
            className='bg-white border border-kt-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow'
          >
            <div className='relative h-48'>
              <img
                src={product.image}
                alt={product.name}
                className='w-full h-full object-cover'
              />
              <div className='absolute top-2 right-2 bg-kt-blue-600 text-white px-2 py-1 rounded text-xs'>
                {product.category}
              </div>
            </div>
            <div className='p-4'>
              <Heading level={4} className='text-kt-gray-800 font-medium mb-2'>
                {product.name}
              </Heading>
              <Text className='text-kt-gray-500 text-sm mb-3'>
                {product.description}
              </Text>
              <div className='flex items-center justify-between'>
                <span className='text-kt-blue-600 font-semibold'>
                  {product.price}
                </span>
                <a
                  href={product.href}
                  className='text-kt-blue-600 hover:text-kt-blue-700 text-sm font-medium'
                >
                  Chi tiết →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
