'use client';

import { cn } from '@ktbiotech/system-design';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type {
  BlogContentBodyProps,
  MediaBlock,
  QuoteBlock,
  RichTextBlock,
  SliderBlock,
} from '../../types';

function BlockRichText({ block }: { block: RichTextBlock }) {
  return (
    <div className='prose prose-lg max-w-none'>
      <style jsx global>{`
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
      `}</style>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{block.body}</ReactMarkdown>
    </div>
  );
}

function BlockQuote({ block }: { block: QuoteBlock }) {
  return (
    <div className='border-l-4 border-blue-500 bg-blue-50 p-6 my-8'>
      <blockquote className='text-lg text-gray-700 italic mb-4'>
        "{block.body}"
      </blockquote>
      <cite className='block text-sm text-gray-600 not-italic'>
        — {block.title}
      </cite>
    </div>
  );
}

function BlockMedia({ block }: { block: MediaBlock }) {
  if (!block.file) {
    return (
      <div className='bg-gray-200 w-full h-64 rounded-lg flex items-center justify-center my-8'>
        <p className='text-gray-400'>No image available</p>
      </div>
    );
  }

  const imageUrl = block.file.formats?.medium?.url || block.file.url;
  const imageAlt = block.file.alternativeText || 'Blog image';

  return (
    <div className='my-8'>
      <img
        src={imageUrl}
        alt={imageAlt}
        className='w-full rounded-lg shadow-md'
      />
    </div>
  );
}

function BlockSlider({ block }: { block: SliderBlock }) {
  if (!block.slides || block.slides.length === 0) {
    return (
      <div className='bg-gray-200 w-full h-64 rounded-lg flex items-center justify-center my-8'>
        <p className='text-gray-400'>No slider content available</p>
      </div>
    );
  }

  return (
    <div className='my-8'>
      <div className='flex gap-4 overflow-x-auto snap-x snap-mandatory'>
        {block.slides.map((slide, idx) => (
          <div key={idx} className='flex-shrink-0 w-full snap-center'>
            {slide.image?.url ? (
              <img
                src={slide.image.url}
                alt={slide.caption || `Slide ${idx + 1}`}
                className='w-full rounded-lg shadow-md'
              />
            ) : (
              <div className='bg-gray-200 w-full h-64 rounded-lg flex items-center justify-center'>
                <p className='text-gray-400'>No image</p>
              </div>
            )}
            {slide.caption && (
              <p className='text-sm text-gray-600 mt-2 text-center'>
                {slide.caption}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BlogContentBody({
  blocks,
  className,
}: BlogContentBodyProps) {
  const renderBlock = (block: any, index: number) => {
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
    <div className={cn('space-y-4', className)}>
      {blocks.map((block, index) => renderBlock(block, index))}
    </div>
  );
}
