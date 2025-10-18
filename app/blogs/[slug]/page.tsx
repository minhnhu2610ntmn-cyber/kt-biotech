'use client';

import React, { useMemo, Suspense } from 'react';
import { BlogPost } from '@ktbiotech/blog';
import { TableOfContents, SocialShare, AuthorCard, ReadingProgress, calculateReadingTime, formatReadingTime, formatMediumDate, parseTocFromMarkdown } from '@ktbiotech/blog';
import { LoadingSpinner } from '@ktbiotech/system-design';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Mock blog posts data (in real app, this would come from a CMS or API)
const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Advances in CRISPR Technology',
    content: `
# Advances in CRISPR Technology

The field of biotechnology has witnessed remarkable progress in recent years, with CRISPR (Clustered Regularly Interspaced Short Palindromic Repeats) technology standing at the forefront of this revolution. This groundbreaking gene-editing tool has transformed our ability to modify genetic material with unprecedented precision and efficiency.

## Understanding CRISPR

CRISPR technology functions like molecular scissors, allowing scientists to cut and modify specific DNA sequences within living cells. The system consists of two main components:

1. **Cas9 protein**: Acts as the molecular scissors
2. **Guide RNA**: Directs the Cas9 protein to the exact location in the genome

## Recent Breakthroughs

### Enhanced Precision
Recent developments have significantly improved the accuracy of CRISPR systems. New variants like Cas12 and Cas13 offer different cutting mechanisms, while base editing and prime editing technologies enable more precise modifications without creating double-strand breaks.

### Therapeutic Applications
CRISPR has shown tremendous potential in treating genetic diseases:

- **Sickle Cell Disease**: Clinical trials have demonstrated successful treatment using CRISPR-edited stem cells
- **Beta-Thalassemia**: Patients have shown sustained therapeutic benefits
- **Huntington's Disease**: Research is ongoing for neurodegenerative disease treatment

### Agricultural Innovations
The technology is revolutionizing agriculture by:

- Developing disease-resistant crops
- Improving nutritional content
- Reducing pesticide dependency
- Enhancing crop yields in challenging environments

## Challenges and Considerations

While CRISPR technology holds immense promise, several challenges remain:

### Ethical Concerns
The ability to edit human embryos raises important ethical questions about the future of human evolution and the potential for creating "designer babies."

### Off-Target Effects
Despite improvements, there's still a risk of unintended genetic modifications that could have unforeseen consequences.

### Regulatory Hurdles
Governments worldwide are grappling with how to regulate this powerful technology while ensuring safety and ethical use.

## Future Prospects

The future of CRISPR technology looks incredibly promising. Researchers are working on:

- More precise editing tools
- Delivery methods for therapeutic applications
- Applications in environmental conservation
- Industrial biotechnology applications

## Conclusion

CRISPR technology represents a paradigm shift in biotechnology, offering unprecedented opportunities to address some of humanity's most pressing challenges. As we continue to refine and expand its applications, it's crucial to balance innovation with careful consideration of ethical implications and safety concerns.

The journey of CRISPR from a bacterial defense mechanism to a revolutionary gene-editing tool exemplifies the power of scientific discovery and its potential to transform our world for the better.
    `,
    excerpt: 'Recent breakthroughs in CRISPR gene editing technology are revolutionizing biotechnology and opening new possibilities for treating genetic diseases.',
    slug: 'advances-in-crispr-technology',
    author: {
      name: 'Dr. Sarah Johnson',
      avatar: '/avatars/sarah.jpg',
      bio: 'Senior Research Scientist at KTBioTech'
    },
    publishedAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    readTime: 8,
    tags: ['CRISPR', 'Gene Editing', 'Biotechnology'],
    category: {
      id: '1',
      name: 'Research',
      slug: 'research',
      description: 'Scientific research and discoveries'
    },
    featuredImage: '/images/crispr-lab.jpg',
    status: 'published'
  },
  {
    id: '2',
    title: 'The Future of Personalized Medicine',
    content: 'Full article content...',
    excerpt: 'How personalized medicine is transforming healthcare through tailored treatments based on individual genetic profiles.',
    slug: 'future-personalized-medicine',
    author: {
      name: 'Dr. Michael Chen',
      avatar: '/avatars/michael.jpg',
      bio: 'Chief Medical Officer'
    },
    publishedAt: '2024-01-10T14:30:00Z',
    updatedAt: '2024-01-10T14:30:00Z',
    readTime: 12,
    tags: ['Personalized Medicine', 'Genomics', 'Healthcare'],
    category: {
      id: '2',
      name: 'Medicine',
      slug: 'medicine',
      description: 'Medical advances and treatments'
    },
    featuredImage: '/images/personalized-medicine.jpg',
    status: 'published'
  },
  {
    id: '3',
    title: 'Biotech Startup Funding Trends 2024',
    content: 'Full article content...',
    excerpt: 'An analysis of investment patterns and funding trends in the biotechnology startup ecosystem.',
    slug: 'biotech-startup-funding-trends-2024',
    author: {
      name: 'Alex Rodriguez',
      avatar: '/avatars/alex.jpg',
      bio: 'Investment Analyst'
    },
    publishedAt: '2024-01-05T09:15:00Z',
    updatedAt: '2024-01-05T09:15:00Z',
    readTime: 6,
    tags: ['Startups', 'Funding', 'Investment'],
    category: {
      id: '3',
      name: 'Business',
      slug: 'business',
      description: 'Business and commercial aspects'
    },
    featuredImage: '/images/funding-trends.jpg',
    status: 'published'
  }
];

interface BlogDetailPageProps {
  params: {
    slug: string;
  };
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const post = blogPosts.find(p => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  // Calculate reading time and generate TOC
  const readingTime = useMemo(() => {
    return formatReadingTime(calculateReadingTime(post.content));
  }, [post.content]);

  const toc = useMemo(() => {
    return parseTocFromMarkdown(post.content);
  }, [post.content]);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  // Custom components for ReactMarkdown
  const components = {
    h2: ({ children }: { children?: React.ReactNode }) => {
      const text = children?.toString() || '';
      const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
      return <h2 id={id} className="text-2xl font-bold text-gray-900 mt-12 mb-6 leading-tight">{children}</h2>;
    },
    h3: ({ children }: { children?: React.ReactNode }) => {
      const text = children?.toString() || '';
      const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
      return <h3 id={id} className="text-xl font-semibold text-gray-900 mt-8 mb-4 leading-tight">{children}</h3>;
    },
    p: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-gray-800 leading-relaxed mb-6 text-lg">{children}</p>
    ),
    ul: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc list-inside mb-6 space-y-2 text-gray-800">{children}</ul>
    ),
    ol: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal list-inside mb-6 space-y-2 text-gray-800">{children}</ol>
    ),
    li: ({ children }: { children?: React.ReactNode }) => (
      <li className="text-gray-800">{children}</li>
    ),
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold text-gray-900">{children}</strong>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-6">{children}</blockquote>
    ),
  };

  // Generate ID for headings
  const generateId = (children: React.ReactNode) => {
    const text = children?.toString() || '';
    return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
  };

  // Convert TOC to the format expected by TableOfContents component
  const tocItems = toc.map(item => ({
    id: item.id,
    label: item.text,
    level: item.level
  }));

  // State for active TOC item
  const [activeTocId, setActiveTocId] = React.useState<string>('');

  return (
    <div className="min-h-screen bg-white">
      {/* Reading progress bar */}
      <ReadingProgress />
      
      {/* Main content area */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Table of Contents - Desktop only */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-8">
              <TableOfContents 
                items={tocItems} 
                activeId={activeTocId}
                onItemClick={setActiveTocId}
              />
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Breadcrumb */}
            <nav className="mb-6">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Link href="/" className="hover:text-gray-700">Home</Link>
                <span>/</span>
                <Link href="/blogs" className="hover:text-gray-700">Blog</Link>
                <span>/</span>
                <span className="text-gray-900">{post.title}</span>
              </div>
            </nav>

            {/* Article header */}
            <header className="mb-8">
              <div className="mb-4">
                <Link 
                  href={`/blogs?category=${post.category.slug}`}
                  className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full hover:bg-blue-200 transition-colors"
                >
                  {post.category.name}
                </Link>
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {post.title}
              </h1>
              
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                {post.excerpt}
              </p>

              {/* Article meta */}
              <div className="flex items-center justify-between border-b border-gray-200 pb-6">
                <div className="flex items-center space-x-4">
                  <AuthorCard 
                    author={post.author}
                    publishedAt={post.publishedAt}
                    readTime={post.readTime}
                    variant="compact"
                  />
                </div>
                
                <div className="flex items-center space-x-4">
                  <SocialShare 
                    url={`${typeof window !== 'undefined' ? window.location.origin : ''}/blogs/${post.slug}`}
                    title={post.title}
                    description={post.excerpt}
                  />
                </div>
              </div>
            </header>

            {/* Article content */}
            <article className="prose prose-lg max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => <h1 id={generateId(children)} className="scroll-mt-20">{children}</h1>,
                  h2: ({ children }) => <h2 id={generateId(children)} className="scroll-mt-20">{children}</h2>,
                  h3: ({ children }) => <h3 id={generateId(children)} className="scroll-mt-20">{children}</h3>,
                  h4: ({ children }) => <h4 id={generateId(children)} className="scroll-mt-20">{children}</h4>,
                }}
              >
                {post.content}
              </ReactMarkdown>
            </article>

            {/* Article footer */}
            <footer className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <AuthorCard 
                    author={post.author}
                    publishedAt={post.publishedAt}
                    readTime={post.readTime}
                    variant="detailed"
                  />
                </div>
                
                <div className="flex items-center space-x-4">
                  <SocialShare 
                    url={`${typeof window !== 'undefined' ? window.location.origin : ''}/blogs/${post.slug}`}
                    title={post.title}
                    description={post.excerpt}
                  />
                </div>
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}