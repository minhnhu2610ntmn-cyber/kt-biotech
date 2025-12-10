import { BlogContentBody, BlogHero, type StrapiBlock } from '@ktbiotech/blog';
import { Breadcrumb, Container } from '@ktbiotech/system-design';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import ArticleViewCounter from '../../../components/containers/ArticleViewCounter';
import { buildImageUrl, StrapiApi } from '../../../config/api';
import type { Article } from '../../../types/strapi';

interface BlogDetailPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

// Fetch article by slug from Strapi API
async function getArticleBySlug(
  slug: string,
  locale: string
): Promise<Article | null> {
  try {
    const api = new StrapiApi(locale);
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
  const t = await getTranslations('navbar');
  const article = await getArticleBySlug(
    resolvedParams.slug,
    resolvedParams.locale
  );

  if (!article) {
    notFound();
  }

  const articleId = article.id;
  const documentId = (article as any).documentId;

  // Convert Strapi blocks to BlogContentBody format
  const contentBlocks: StrapiBlock[] = article.blocks
    ?.map(block => {
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
            slides: block.files || [],
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
    <>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: t('home'), href: '/' },
          { label: t('news'), href: '/blogs' },
          { label: article.title, href: `/blogs/${article.slug}` },
        ]}
      />
      <Container>
        {/* Article View Counter - Client Side */}
        {articleId && (
          <ArticleViewCounter articleId={articleId} documentId={documentId} />
        )}

        <div className='!pt-10'>
          {/* Blog Hero Section */}
          <BlogHero
            title={article.title}
            imageUrl={heroImageUrl}
            imageAlt={article.title}
          />

          {/* Content */}

          <div className='max-w-5xl relative z-10 mx-auto px-2 mt-4 lg:-mt-[100px] pb-8'>
            {/* Blog Content Body */}
            {contentBlocks?.length > 0 && (
              <BlogContentBody blocks={contentBlocks} />
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
