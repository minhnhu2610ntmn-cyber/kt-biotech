import { getTranslations } from 'next-intl/server';
import { AboutSection } from '../../components/containers';
import SetBreadcrumb from '../../components/containers/SetBreadcrumb';
import { buildImageUrl, StrapiApi } from '../../config/api';

// Disable static generation - fetch data at request time
export const dynamic = 'force-dynamic';

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const api = new StrapiApi(locale);
  const tb = await getTranslations('breadcrumb');

  // Fetch data for each about section
  const [about, vision, mission, structure, award, relationship] =
    await Promise.allSettled([
      api.getAbout(),
      api.getVision(),
      api.getMission(),
      api.getStructure(),
      api.getAward(),
      api.getRelationship(),
    ]);

  // Build items from fetched data
  const items: Array<{
    title: string;
    description: string;
    link: string;
    imageUrl?: string;
  }> = [];

  // Helper to extract description from content blocks
  const extractDescription = (content: any[] | null): string => {
    if (!content || !Array.isArray(content)) return '';
    const richTextBlock = content.find(
      (block: any) => block.__component === 'shared.rich-text'
    );
    if (richTextBlock?.body) {
      // Strip HTML tags and get first ~150 chars
      const text = richTextBlock.body.replace(/<[^>]*>/g, '');
      return text.slice(0, 150) + (text.length > 150 ? '...' : '');
    }
    return '';
  };

  // Add About item (Về chúng tôi)
  if (about.status === 'fulfilled' && about.value) {
    const data = about.value;
    items.push({
      title: data.title || tb('vechungtoi'),
      description: data.description || extractDescription(data.content) || '',
      link: locale === 'vi' ? '/gioi-thieu/ve-chung-toi' : `/${locale}/gioi-thieu/ve-chung-toi`,
      imageUrl: data.image?.url ? buildImageUrl(data.image.url) : undefined,
    });
  }

  // Add Vision item (Tầm nhìn)
  if (vision.status === 'fulfilled' && vision.value) {
    const data = vision.value;
    items.push({
      title: data.title || (locale === 'vi' ? 'Tầm nhìn' : 'Vision'),
      description: data.description || extractDescription(data.content) || '',
      link: locale === 'vi' ? '/gioi-thieu/tam-nhin' : `/${locale}/gioi-thieu/tam-nhin`,
      imageUrl: data.image?.url ? buildImageUrl(data.image.url) : undefined,
    });
  }

  // Add Mission item (Sứ mệnh)
  if (mission.status === 'fulfilled' && mission.value) {
    const data = mission.value;
    items.push({
      title: data.title || (locale === 'vi' ? 'Sứ mệnh' : 'Mission'),
      description: data.description || extractDescription(data.content) || '',
      link: locale === 'vi' ? '/gioi-thieu/su-mang' : `/${locale}/gioi-thieu/su-mang`,
      imageUrl: data.image?.url ? buildImageUrl(data.image.url) : undefined,
    });
  }

  // Add Structure item (Cơ cấu tổ chức)
  if (structure.status === 'fulfilled' && structure.value) {
    const data = structure.value;
    items.push({
      title: data.title || (locale === 'vi' ? 'Cơ cấu tổ chức' : 'Structure'),
      description: data.description || extractDescription(data.content) || '',
      link: locale === 'vi' ? '/gioi-thieu/co-cau-to-chuc' : `/${locale}/gioi-thieu/co-cau-to-chuc`,
      imageUrl: data.image?.url ? buildImageUrl(data.image.url) : undefined,
    });
  }

  // Add Award item (Giải thưởng)
  if (award.status === 'fulfilled' && award.value) {
    const data = award.value;
    items.push({
      title: data.title || (locale === 'vi' ? 'Giải thưởng' : 'Awards'),
      description: data.description || extractDescription(data.content) || '',
      link: locale === 'vi' ? '/gioi-thieu/giai-thuong' : `/${locale}/gioi-thieu/giai-thuong`,
      imageUrl: data.image?.url ? buildImageUrl(data.image.url) : undefined,
    });
  }

  // Add Relationship item (Quan hệ cổ đông)
  if (relationship.status === 'fulfilled' && relationship.value) {
    const data = relationship.value;
    items.push({
      title: data.title || (locale === 'vi' ? 'Quan hệ cổ đông' : 'Shareholder Relations'),
      description: data.description || extractDescription(data.content) || '',
      link: locale === 'vi' ? '/gioi-thieu/quan-he-co-dong' : `/${locale}/gioi-thieu/quan-he-co-dong`,
      imageUrl: data.image?.url ? buildImageUrl(data.image.url) : undefined,
    });
  }

  // Build breadcrumb items from translation
  const pageTitle = tb('gioithieuchung');
  const baseHref = locale === 'vi' ? '' : `/${locale}`;
  const breadcrumbItems = [
    { label: tb('home'), href: baseHref || '/' },
    { label: tb('gioithieu'), href: `${baseHref}/gioi-thieu` },
  ];
  // Return empty items if global is null/not found
  return (
    <>
      <SetBreadcrumb items={breadcrumbItems} />
      <AboutSection items={items} title={pageTitle} />
    </>
  );
}
