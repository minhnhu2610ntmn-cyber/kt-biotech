import type { Meta, StoryObj } from '@storybook/react';
import ProductImageGallery from './index';
import type { ProductImage } from './index';

const meta: Meta<typeof ProductImageGallery> = {
  title: 'Components/ProductImageGallery',
  component: ProductImageGallery,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    images: {
      control: { type: 'object' },
      description: 'Array of product images with url, alt, and optional thumbnailUrl',
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock images using placeholder services
const mockImages: ProductImage[] = [
  {
    url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop',
    alt: 'Product image 1',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
  },
  {
    url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
    alt: 'Product image 2',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
  },
  {
    url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop',
    alt: 'Product image 3',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
  },
  {
    url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=800&fit=crop',
    alt: 'Product image 4',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&h=200&fit=crop',
  },
  {
    url: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=800&h=800&fit=crop',
    alt: 'Product image 5',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=200&h=200&fit=crop',
  },
];

export const Default: Story = {
  args: {
    images: mockImages,
  },
};

export const SingleImage: Story = {
  args: {
    images: [mockImages[0]],
  },
};

export const TwoImages: Story = {
  args: {
    images: mockImages.slice(0, 2),
  },
};

export const ThreeImages: Story = {
  args: {
    images: mockImages.slice(0, 3),
  },
};

export const FiveImages: Story = {
  args: {
    images: mockImages,
  },
};

export const MoreThanFiveImages: Story = {
  args: {
    images: [
      ...mockImages,
      {
        url: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&h=800&fit=crop',
        alt: 'Product image 6',
        thumbnailUrl:
          'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200&h=200&fit=crop',
      },
      {
        url: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&h=800&fit=crop',
        alt: 'Product image 7',
        thumbnailUrl:
          'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=200&h=200&fit=crop',
      },
    ],
  },
};

export const EmptyState: Story = {
  args: {
    images: [],
  },
};

export const WithoutThumbnails: Story = {
  args: {
    images: mockImages.map(img => ({
      url: img.url,
      alt: img.alt,
      // No thumbnailUrl - will use main url
    })),
  },
};

export const CustomClassName: Story = {
  args: {
    images: mockImages,
    className: 'max-w-md mx-auto',
  },
};

