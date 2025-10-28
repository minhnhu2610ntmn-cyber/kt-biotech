import { BlogContentBody, BlogHero, type StrapiBlock } from '@ktbiotech/blog';
import { Container } from '@ktbiotech/system-design';
import { notFound } from 'next/navigation';
import { buildImageUrl, StrapiApi } from '../../config/api';
import type { Article } from '../../types/strapi';

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Fetch article by slug from Strapi API
async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const api = new StrapiApi();
    const articles = await api.getArticles({
      'filters[slug][$eq]': slug,
      'populate[blocks][populate]': '*',
      'populate[category][fields]': '*',
      'populate[cover][fields]': '*',
      'populate[author][fields]': '*',
    });
    return articles && articles.length > 0 ? articles[0] : null;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const resolvedParams = await params;
  const article = await getArticleBySlug(resolvedParams.slug);

  if (!article) {
    notFound();
  }

  console.log('ArticleArticleArticle:', article);

  // Convert Strapi blocks to BlogContentBody format
  const contentBlocks: StrapiBlock[] = article.blocks
    ?.map(block => {
      // Debug log for media blocks
      if (block.__component === 'shared.media') {
        // eslint-disable-next-line no-console
        console.log('Media block:', block);
      }

      switch (block.__component) {
        case 'shared.rich-text':
          return {
            __component: 'shared.rich-text',
            id: block.id,
            body: block.body,
          } as StrapiBlock;
        case 'shared.quote':
          return {
            __component: 'shared.quote',
            id: block.id,
            title: block.title || '',
            body: block.body || '',
          } as StrapiBlock;
        case 'shared.media':
          return {
            __component: 'shared.media',
            id: block.id,
            file: block.file,
          } as StrapiBlock;
        case 'shared.slider':
          return {
            __component: 'shared.slider',
            id: block.id,
            slides: block.slides || [],
          } as StrapiBlock;
        default:
          return null;
      }
    })
    .filter(Boolean) as StrapiBlock[];

  // Get hero image URL
  const heroImageUrl = article.cover?.url
    ? buildImageUrl(article.cover.url)
    : 'https://picsum.photos/1200/600?random=1';

  return (
    <Container>
      <div className='!pt-10'>
        {/* Blog Hero Section */}
        <BlogHero
          title={article.title}
          imageUrl={heroImageUrl}
          imageAlt={article.title}
        />

        {/* Content */}

        <div className='max-w-4xl mx-auto py-8'>
          {/* Blog Content Body */}
          {contentBlocks?.length > 0 && (
            <BlogContentBody blocks={contentBlocks} />
          )}
        </div>
      </div>
    </Container>
  );
}
