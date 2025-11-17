'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';

export interface ProductImage {
  url: string;
  alt?: string;
  thumbnailUrl?: string;
}

export interface ProductImageGalleryProps {
  images: ProductImage[];
  className?: string;
}

export default function ProductImageGallery({
  images,
  className = '',
}: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Ensure we have at least one image
  const validImages = useMemo(() => {
    return images && images.length > 0 ? images : [];
  }, [images]);

  if (validImages.length === 0) {
    return (
      <div
        className={`rounded-lg bg-gray-100 aspect-square flex items-center justify-center ${className}`}
      >
        <div className='text-gray-400 text-sm'>No image available</div>
      </div>
    );
  }

  const selectedImage = validImages[selectedIndex];
  const thumbnailImages = validImages.slice(0, 5); // Show max 5 thumbnails

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Image Area */}
      <div className='relative w-full max-h-[417px] rounded-lg overflow-hidden bg-gray-100'>
        <Image
          src={selectedImage.url}
          alt={selectedImage.alt || 'Product image'}
          width={800}
          height={417}
          className='object-cover w-full h-full'
          priority={selectedIndex === 0}
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw'
        />
      </div>

      {/* Thumbnail Row */}
      {thumbnailImages.length > 1 && (
        <div className='flex gap-3 overflow-x-auto max-w-screen'>
          {thumbnailImages.map((image, index) => {
            const isSelected = index === selectedIndex;
            return (
              <button
                key={index}
                type='button'
                onClick={() => setSelectedIndex(index)}
                className={`relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 transition-all ${
                  isSelected
                    ? 'ring-2 ring-[#215778] ring-offset-2'
                    : 'opacity-60 hover:opacity-100'
                }`}
                aria-label={`View image ${index + 1}`}
              >
                <Image
                  src={image.thumbnailUrl || image.url}
                  alt={image.alt || `Product thumbnail ${index + 1}`}
                  fill
                  className='object-cover'
                  sizes='80px'
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
