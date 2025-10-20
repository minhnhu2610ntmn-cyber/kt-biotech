'use client';

import {
  AuthorCard,
  BlogPost,
  ReadingProgress,
  SocialShare,
  TableOfContents,
  calculateReadingTime,
  formatMediumDate,
  formatReadingTime,
  parseTocFromMarkdown,
} from '@ktbiotech/blog';
import { Heading, LoadingSpinner, Text } from '@ktbiotech/system-design';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense, useMemo } from 'react';
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
    excerpt:
      'Recent breakthroughs in CRISPR gene editing technology are revolutionizing biotechnology and opening new possibilities for treating genetic diseases.',
    slug: 'advances-in-crispr-technology',
    author: 'Dr. Sarah Johnson',
    publishedAt: new Date('2024-01-15T10:00:00Z'),
    tags: ['CRISPR', 'Gene Editing', 'Biotechnology'],
  },
  {
    id: '2',
    title: 'The Future of Personalized Medicine',
    content: 'Full article content...',
    excerpt:
      'How personalized medicine is transforming healthcare through tailored treatments based on individual genetic profiles.',
    slug: 'future-personalized-medicine',
    author: 'Dr. Michael Chen',
    publishedAt: new Date('2024-01-10T14:30:00Z'),
    tags: ['Personalized Medicine', 'Genomics', 'Healthcare'],
  },
  {
    id: '3',
    title: 'Biotechnology in Agriculture',
    content: 'Full article content...',
    excerpt:
      'Exploring how biotechnology is revolutionizing agriculture and food production.',
    slug: 'biotechnology-agriculture',
    author: 'Dr. Emily Rodriguez',
    publishedAt: new Date('2024-01-05T09:15:00Z'),
    tags: ['Agriculture', 'Food Security', 'Sustainability'],
  },
];

interface BlogDetailPageProps {
  params: {
    slug: string;
  };
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = params;

  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    notFound();
  }

  const toc = useMemo(() => parseTocFromMarkdown(post.content), [post.content]);
  const readingTime = useMemo(
    () => calculateReadingTime(post.content),
    [post.content]
  );

  return (
    <div className='min-h-screen bg-gray-50'>
      <ReadingProgress />

      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-4xl mx-auto'>
          {/* Breadcrumb */}
          <nav className='mb-8'>
            <Link href='/blogs' className='text-blue-600 hover:text-blue-800'>
              ← Back to Blog
            </Link>
          </nav>

          {/* Article Header */}
          <header className='mb-8'>
            <Heading
              level={1}
              className='text-4xl font-bold text-gray-900 mb-4'
            >
              {post.title}
            </Heading>

            <div className='flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6'>
              <span>By {post.author}</span>
              <span>•</span>
              <time dateTime={post.publishedAt.toISOString()}>
                {formatMediumDate(post.publishedAt)}
              </time>
              <span>•</span>
              <span>{formatReadingTime(readingTime)}</span>
            </div>

            <div className='flex flex-wrap gap-2 mb-6'>
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className='px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm'
                >
                  {tag}
                </span>
              ))}
            </div>

            <Text className='text-xl text-gray-700 leading-relaxed'>
              {post.excerpt}
            </Text>
          </header>

          <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
            {/* Main Content */}
            <article className='lg:col-span-3'>
              <div className='bg-white rounded-lg shadow-sm p-8'>
                <Suspense fallback={<LoadingSpinner />}>
                  <div className='prose prose-lg max-w-none'>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {post.content}
                    </ReactMarkdown>
                  </div>
                </Suspense>
              </div>
            </article>

            {/* Sidebar */}
            <aside className='lg:col-span-1'>
              <div className='sticky top-8 space-y-6'>
                {/* Table of Contents */}
                {toc.length > 0 && (
                  <div className='bg-white rounded-lg shadow-sm p-6'>
                    <Heading level={3} className='text-lg font-semibold mb-4'>
                      Table of Contents
                    </Heading>
                    <TableOfContents items={toc} />
                  </div>
                )}

                {/* Author Card */}
                <div className='bg-white rounded-lg shadow-sm p-6'>
                  <AuthorCard
                    name={post.author}
                    bio='Senior Research Scientist at KTBioTech'
                    avatar='/avatars/default.jpg'
                  />
                </div>

                {/* Social Share */}
                <div className='bg-white rounded-lg shadow-sm p-6'>
                  <Heading level={3} className='text-lg font-semibold mb-4'>
                    Share this article
                  </Heading>
                  <SocialShare
                    url={`/blogs/${post.slug}`}
                    title={post.title}
                    description={post.excerpt}
                  />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
