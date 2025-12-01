'use client';

import { cn, Slider, SliderPresets } from '@ktbiotech/system-design';
import Image from 'next/image';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type {
  BlogContentBodyProps,
  MediaBlock,
  QuoteBlock,
  RichTextBlock,
  SliderBlock,
} from '../../types';

// Simple helper to build full image URL from Strapi path
function buildImageUrl(imagePath?: string): string {
  if (!imagePath) return '';
  const baseUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL || 'http://103.90.225.225:1337';
  return `${baseUrl}${imagePath}`;
}

function BlockRichText({ block }: { block: RichTextBlock }) {
  return (
    <div className='prose prose-lg max-w-none blog-content'>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        /* Heading sizes */
        .prose h1 {
          font-size: 2.25rem;
          font-weight: 700;
          line-height: 1.2;
          margin-top: 0;
          margin-bottom: 0.75rem;
        }
        .prose h2 {
          font-size: 1.875rem;
          font-weight: 600;
          line-height: 1.3;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .prose h3 {
          font-size: 1.5rem;
          font-weight: 600;
          line-height: 1.4;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
        }
        .prose h4 {
          font-size: 1.25rem;
          font-weight: 600;
          line-height: 1.5;
          margin-top: 0.75rem;
          margin-bottom: 0.5rem;
        }

        /* List styles */
        .prose ul,
        .prose ol {
          margin-top: 1rem;
          margin-bottom: 1rem;
          padding-left: 1.5rem;
        }
        .prose ul li {
          list-style-type: disc;
          margin: 0.5rem 0;
          padding-left: 0.5rem;
        }
        .prose ul li::marker {
          color: #000000;
        }
        .prose ol li {
          list-style-type: decimal;
          margin: 0.5rem 0;
          padding-left: 0.5rem;
        }
        .prose ul ul,
        .prose ol ol {
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }

        /* Nested list indentation */
        .prose ul li ul,
        .prose ol li ol {
          margin-left: 1rem;
          margin-top: 0.25rem;
        }

        /* Table styles */
        .prose table {
          border-collapse: collapse;
          border: 1px solid #e5e7eb;
        }
        .prose table th {
          background-color: #f9fafb;
          padding: 12px;
          border: 1px solid #e5e7eb;
          text-align: left;
          font-weight: 600;
        }
        .prose table td {
          padding: 12px;
          border: 1px solid #e5e7eb;
        }
        .prose table tr {
          border-bottom: 1px solid #e5e7eb;
        }
        .prose table tr:last-child {
          border-bottom: none;
        }

        /* Code block styles */
        .prose pre {
          background-color: #1e293b;
          color: #e2e8f0;
          padding: 1.25rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1rem 0;
        }
        .prose code {
          background-color: #f1f5f9;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.875em;
          color: #dc2626;
          font-weight: 500;
        }
        .prose pre code {
          background-color: transparent;
          padding: 0;
          color: inherit;
          font-weight: normal;
        }

        /* Text emphasis */
        .prose strong {
          font-weight: 700;
          color: #1e293b;
        }
        .prose em {
          font-style: italic;
          color: #64748b;
        }

        /* Links */
        .prose a {
          color: #3b82f6;
          text-decoration: underline;
          text-underline-offset: 2px;
          transition: color 0.2s ease;
          word-break: break-word;
        }
        .prose a:hover {
          color: #2563eb;
          text-decoration-thickness: 2px;
        }
        .prose a:visited {
          color: #7c3aed;
        }

        /* External link indicator */
        .prose
          a[href^='http']:not([href*='localhost']):not(
            [href*='127.0.0.1']
          ):after {
          content: ' ↗';
          font-size: 0.875em;
          margin-left: 2px;
        }

        /* Paragraphs */
        .prose p {
          margin-top: 1rem;
          margin-bottom: 1rem;
          line-height: 1.75;
        }

        /* Disable drop-cap styling from global blog typography */
        .blog-content.prose p:first-of-type::first-letter {
          float: none;
          font-size: inherit !important;
          line-height: inherit !important;
          padding-right: 0 !important;
          padding-top: 0 !important;
          font-weight: inherit !important;
          color: inherit !important;
          text-transform: none !important;
        }

        /* Horizontal rules */
        .prose hr {
          border: none;
          border-top: 2px solid #e5e7eb;
          margin: 2rem 0;
        }

        /* Images in markdown */
        .prose img {
          width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1.5rem 0;
        }
      `,
        }}
      />
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          table: ({ node: _node, ...props }) => (
            <div className='my-4 overflow-x-auto'>
              {React.createElement('table', { ...props })}
            </div>
          ),
        }}
      >
        {block.body}
      </ReactMarkdown>
    </div>
  );
}

function BlockQuote({ block }: { block: QuoteBlock }) {
  return (
    <div className='border-l-4 border-blue-500 bg-blue-50 p-6 my-8'>
      <blockquote className='text-lg text-gray-700 italic mb-4'>
        &ldquo;{block.body}&rdquo;
      </blockquote>
      <cite className='block text-sm text-gray-600 not-italic'>
        — {block.title}
      </cite>
    </div>
  );
}

function BlockMedia({ block }: { block: MediaBlock }) {
  if (!block.file) {
    return null;
  }

  // Build full image URL
  const imagePath = block.file.formats?.medium?.url || block.file.url;

  // Don't render if no URL
  if (!imagePath) {
    return null;
  }

  const imageUrl = buildImageUrl(imagePath);
  const imageAlt = block.file.alternativeText || 'Blog image';

  return (
    <div className='my-8 relative w-full h-[400px] md:h-[500px]'>
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        className='object-cover rounded-lg'
      />
    </div>
  );
}

function BlockSlider({ block }: { block: SliderBlock }) {
  if (!block.slides || block.slides.length === 0) {
    return null;
  }

  // Filter out slides without image URLs and normalize data
  const validSlides = block.slides
    .map(slide => {
      // Handle different data structures from Strapi
      const slideData = slide as {
        url?: string;
        image?: {
          url?: string;
          alternativeText?: string;
          data?: { attributes?: { url?: string } };
        };
        attributes?: { url?: string };
        caption?: string;
        title?: string;
        alternativeText?: string;
      };
      const imageUrl =
        slideData?.url ||
        slideData?.image?.url ||
        slideData?.image?.data?.attributes?.url ||
        slideData?.attributes?.url;
      const caption =
        slideData?.caption ||
        slideData?.title ||
        slideData?.alternativeText ||
        slideData?.image?.alternativeText;

      if (!imageUrl) return null;

      return {
        url: imageUrl,
        caption,
      };
    })
    .filter(slide => slide !== null) as Array<{
    url: string;
    caption?: string;
  }>;

  // Don't render if no valid slides
  if (validSlides.length === 0) {
    return null;
  }

  // Convert slides to ReactNode array for Slider component
  const slideElements = validSlides.map((slide, idx) => (
    <div key={idx} className='relative w-full h-[400px] md:h-[500px]'>
      <Image
        src={buildImageUrl(slide.url)}
        alt={slide.caption || `Slide ${idx + 1}`}
        fill
        className='object-cover rounded-lg'
      />
    </div>
  ));

  return (
    <div className='my-8'>
      <Slider {...SliderPresets.gallery}>{slideElements}</Slider>
    </div>
  );
}

export default function BlogContentBody({
  blocks,
  className,
}: BlogContentBodyProps) {
  const renderBlock = (
    block: RichTextBlock | QuoteBlock | MediaBlock | SliderBlock,
    index: number
  ) => {
    switch (block.__component) {
      case 'shared.rich-text':
        return <BlockRichText key={index} block={block as RichTextBlock} />;

      case 'shared.quote':
        return <BlockQuote key={index} block={block as QuoteBlock} />;

      case 'shared.media':
        return <BlockMedia key={index} block={block as MediaBlock} />;

      case 'shared.slider':
        return <BlockSlider key={index} block={block as SliderBlock} />;

      default:
        return null;
    }
  };

  return (
    <div
      className={cn(
        'space-y-4 rounded-2xl border border-[#CCCFD1] pt-10 bg-white px-6',
        className
      )}
    >
      {blocks.map((block, index) => renderBlock(block, index))}
    </div>
  );
}
