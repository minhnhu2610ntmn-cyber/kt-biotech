'use client';

import { cn } from '@ktbiotech/system-design';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export interface ProductDetailBlock {
  __component: 'shared.rich-text';
  id?: number;
  body: string;
}

interface ProductDetailContentProps {
  blocks: ProductDetailBlock[];
  className?: string;
}

function normalizeMarkdown(content: string): string {
  if (!content) return content;

  const cleaned = content
    .replace(/<\/?p>/gi, '') // remove <p> and </p> wrappers from rich-text editors
    .replace(/<br\s*\/?>/gi, '  \n') // convert <br> to markdown line breaks
    .trim();

  // Normalize lines: remove empty lines and trim to help GFM table detection
  return cleaned
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join('\n');
}

export default function ProductDetailContent({
  blocks,
  className,
}: ProductDetailContentProps) {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <div className={cn('space-y-6', className)}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .product-detail-content.prose h1 {
            font-size: 2.25rem;
            font-weight: 700;
            line-height: 1.2;
            margin-top: 0;
            margin-bottom: 0.75rem;
          }
          .product-detail-content.prose h2 {
            font-size: 1.875rem;
            font-weight: 600;
            line-height: 1.3;
            margin-top: 1.5rem;
            margin-bottom: 0.75rem;
          }
          .product-detail-content.prose h3 {
            font-size: 1.5rem;
            font-weight: 600;
            line-height: 1.4;
            margin-top: 1rem;
            margin-bottom: 0.5rem;
          }
          .product-detail-content.prose h4 {
            font-size: 1.25rem;
            font-weight: 600;
            line-height: 1.5;
            margin-top: 0.75rem;
            margin-bottom: 0.5rem;
          }
          .product-detail-content.prose p {
            margin-top: 1rem;
            margin-bottom: 1rem;
            line-height: 1.75;
          }
          /* Ensure first-letter is not styled as drop cap or auto-capitalized */
          .product-detail-content.prose p::first-letter {
            font-size: inherit;
            line-height: inherit;
            font-weight: inherit;
            float: none;
            margin: 0;
          }
          .product-detail-content.prose p:first-child::first-letter {
            margin-right: -0.5rem !important;
          }
          .product-detail-content.prose ul,
          .product-detail-content.prose ol {
            margin-top: 1rem;
            margin-bottom: 1rem;
            padding-left: 1.5rem;
          }
          .product-detail-content.prose ul li {
            list-style-type: disc;
            margin: 0.5rem 0;
            padding-left: 0.5rem;
          }
          .product-detail-content.prose ol li {
            list-style-type: decimal;
            margin: 0.5rem 0;
            padding-left: 0.5rem;
          }
          .product-detail-content.prose table {
            width: 100%;
            border-collapse: collapse;
            margin: 1.5rem 0;
          }
          .product-detail-content.prose table th,
          .product-detail-content.prose table td {
            border: 1px solid #e5e7eb;
            padding: 12px;
            text-align: left;
          }
          .product-detail-content.prose table th {
            background-color: #f9fafb;
            font-weight: 600;
          }
          .product-detail-content.prose table tbody tr:nth-child(even) td {
            background-color: #f9fafb;
          }
          .product-detail-content.prose a {
            color: #3b82f6;
            text-decoration: underline;
            text-underline-offset: 2px;
            transition: color 0.2s ease;
            word-break: break-word;
          }
          .product-detail-content.prose a:hover {
            color: #2563eb;
            text-decoration-thickness: 2px;
          }
          .product-detail-content.prose img {
            width: 100%;
            height: auto;
            border-radius: 0.5rem;
            margin: 1.5rem 0;
          }
        `,
        }}
      />
      {blocks.map((block, index) => {
        if (block.__component !== 'shared.rich-text') {
          return null;
        }

        return (
          <div
            key={block.id ?? index}
            className='product-detail-content prose prose-lg max-w-none text-gray-800'
          >
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
              {normalizeMarkdown(block.body)}
            </ReactMarkdown>
          </div>
        );
      })}
    </div>
  );
}
