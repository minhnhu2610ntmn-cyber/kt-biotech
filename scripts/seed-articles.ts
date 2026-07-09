/**
 * Seed Articles Script for Strapi
 * Run: npx ts-node scripts/seed-articles.ts
 */

interface Article {
  id: number;
  document_id: string;
  title: string;
  description: string;
  slug: string;
  type: string | null;
  locale: string;
}

// Articles extracted from database
const articles: Article[] = [
  { id: 36, document_id: 'ohx1zhvj7rk0ep4nqcx1xwzt', title: 'Nghiên cứu protein folding và bệnh Alzheimer', description: 'Khám phá nghiên cứu protein folding và bệnh alzheimer', slug: 'nghien-cuu-protein-folding-va-benh-alzheimer', type: null, locale: 'vi-VN' },
  { id: 392, document_id: 'i4h64bkbu2vs9mrrs6byl3v7', title: 'Chuẩn hóa quy trình nghiên cứu', description: 'Thông tin chuẩn hóa quy trình nghiên cứu', slug: 'chuan-hoa-quy-trinh-nghien-cuu', type: 'news', locale: 'vi-VN' },
  { id: 393, document_id: 'i23n1z8va99fv2fj3boqdzt4', title: 'Chứng nhận chất lượng quốc tế', description: 'Tìm hiểu về chứng nhận chất lượng quốc tế', slug: 'chung-nhan-chat-luong-quoc-te', type: 'news', locale: 'vi-VN' },
  { id: 394, document_id: 'six8qh4tnw30bs75nvu629lr', title: 'Giải thưởng khoa học cho KTBioTech', description: 'Khám phá giải thưởng khoa học cho ktbiotech', slug: 'giai-thuong-khoa-hoc-cho-ktbiotech-151676-719', type: 'news', locale: 'vi-VN' },
  { id: 395, document_id: 'fd9ypbp07ilk55r0amcxy8c2', title: 'Hiểu về công nghệ sinh học', description: 'Phát triển hiểu về công nghệ sinh học', slug: 'hieu-ve-cong-nghe-sinh-hoc', type: 'news', locale: 'vi-VN' },
  { id: 398, document_id: 'zsfeksxw4y624k15d4qayzaj', title: 'Tuyển dụng chuyên gia hàng đầu', description: 'Nghiên cứu tuyển dụng chuyên gia hàng đầu', slug: 'tuyen-dung-chuyen-gia-hang-au-607142-010', type: 'news', locale: 'vi-VN' },
  { id: 425, document_id: 'rkndl5ibrj9x6ozmic5uv0hv', title: 'Hợp tác quốc tế với các đối tác lớn', description: 'Phát triển hợp tác quốc tế với các đối tác lớn', slug: 'hop-tac-quoc-te-voi-cac-oi-tac-lon', type: 'news', locale: 'vi-VN' },
  { id: 443, document_id: 'jvj7s4arxxfvtozx3745bgrc', title: 'Phát triển phương pháp chẩn đoán không xâm lấn', description: 'Phát triển phát triển phương pháp chẩn đoán không xâm lấn', slug: 'phat-trien-phuong-phap-chan-oan-khong-xam-lan-612929-913', type: 'news', locale: 'vi-VN' },
  { id: 446, document_id: 't9phtqmebko3pygazn1pco6t', title: 'Phát triển thuốc từ thực vật dược liệu', description: 'Thông tin phát triển thuốc từ thực vật dược liệu', slug: 'phat-trien-thuoc-tu-thuc-vat-duoc-lieu-161172-920', type: 'news', locale: 'vi-VN' },
  { id: 456, document_id: 'kfhntb34h9h4nm4so64xyr04', title: 'Ứng dụng AI trong phân tích dữ liệu sinh học', description: 'Khám phá ứng dụng ai trong phân tích dữ liệu sinh học', slug: 'ung-dung-ai-trong-phan-tich-du-lieu-sinh-hoc-158299-418', type: 'news', locale: 'vi-VN' },
  { id: 458, document_id: 'yxooxg88snbjrzjsbnt8jvb6', title: 'Quy trình sản xuất thuốc', description: 'Thông tin quy trình sản xuất thuốc', slug: 'quy-trinh-san-xuat-thuoc-154671-684', type: null, locale: 'vi-VN' },
  { id: 469, document_id: 'jl1u3suky1jigdob0g0milih', title: 'Hội thảo khoa học quốc tế', description: 'Ứng dụng hội thảo khoa học quốc tế', slug: 'hoi-thao-khoa-hoc-quoc-te-610163-199', type: null, locale: 'vi-VN' },
  { id: 475, document_id: 'a478e2k83nnd9y5sspykysxy', title: 'CRISPR là gì và ứng dụng', description: 'Ứng dụng crispr là gì và ứng dụng', slug: 'crispr-la-gi-va-ung-dung-600816-066', type: 'news', locale: 'vi-VN' },
  { id: 477, document_id: 'l536s3t4iahxtcr81snoygwn', title: 'Quy trình sản xuất thuốc', description: 'Phát triển quy trình sản xuất thuốc', slug: 'quy-trinh-san-xuat-thuoc', type: 'news', locale: 'vi-VN' },
  { id: 481, document_id: 'bl9tb35sb6bbkuaa2prrawl8', title: 'Hiểu về công nghệ sinh học', description: 'Nghiên cứu hiểu về công nghệ sinh học', slug: 'hieu-ve-cong-nghe-sinh-hoc-148370-352', type: 'news', locale: 'vi-VN' },
];

// Fake image URLs (using placeholder services)
const fakeImages = [
  'https://picsum.photos/800/600?random=1',
  'https://picsum.photos/800/600?random=2',
  'https://picsum.photos/800/600?random=3',
  'https://picsum.photos/800/600?random=4',
  'https://picsum.photos/800/600?random=5',
  'https://picsum.photos/800/600?random=6',
  'https://picsum.photos/800/600?random=7',
  'https://picsum.photos/800/600?random=8',
  'https://picsum.photos/800/600?random=9',
  'https://picsum.photos/800/600?random=10',
];

// Generate fake content for articles
function generateFakeContent(title: string, description: string): string {
  return `
    <h2>${title}</h2>
    <p>${description}</p>
    <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h3>Chi tiết</h3>
    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <ul>
      <li>Tính năng nổi bật</li>
      <li>Hiệu suất cao</li>
      <li>An toàn và đáng tin cậy</li>
    </ul>
  `;
}

async function seedArticles() {
  const STRAPI_URL = process.env.STRAPI_URL || 'http://103.90.225.225:1337';
  const API_TOKEN = process.env.STRAPI_TOKEN || '';

  console.log('🌱 Seeding articles to Strapi...');
  console.log(`📡 URL: ${STRAPI_URL}`);

  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];
    const fakeImage = fakeImages[i % fakeImages.length];

    const payload = {
      data: {
        title: article.title,
        description: article.description,
        slug: article.slug,
        type: article.type,
        locale: article.locale,
        content: generateFakeContent(article.title, article.description),
        publishedAt: new Date().toISOString(),
        // Add fake image reference if you have image IDs
        // image: fakeImageId,
      },
    };

    try {
      const response = await fetch(`${STRAPI_URL}/api/articles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(`✅ Created: ${article.title}`);
      } else {
        const error = await response.text();
        console.log(`❌ Failed: ${article.title} - ${response.status} ${error.slice(0, 100)}`);
      }
    } catch (error) {
      console.log(`❌ Error: ${article.title} - ${error}`);
    }

    // Delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('🎉 Seeding complete!');
}

seedArticles().catch(console.error);
