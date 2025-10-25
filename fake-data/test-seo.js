#!/usr/bin/env node

/**
 * Script test để kiểm tra cấu trúc SEO
 */

// Hàm tạo description ngắn gọn (max 80 ký tự)
function createDescription(topic) {
  const descriptions = [
    `Bài viết về ${topic.toLowerCase()}`,
    `Tìm hiểu về ${topic.toLowerCase()}`,
    `Nghiên cứu ${topic.toLowerCase()}`,
    `Ứng dụng ${topic.toLowerCase()}`,
    `Phát triển ${topic.toLowerCase()}`,
    `Khám phá ${topic.toLowerCase()}`,
    `Cập nhật ${topic.toLowerCase()}`,
    `Thông tin ${topic.toLowerCase()}`,
  ];

  let description =
    descriptions[Math.floor(Math.random() * descriptions.length)];

  if (description.length > 80) {
    const maxTopicLength = 80 - description.split(' ')[0].length - 1;
    const shortTopic = topic.substring(0, maxTopicLength);
    description = `${descriptions[0].split(' ')[0]} ${shortTopic}`;

    if (description.length > 80) {
      description = `${description.substring(0, 77)}...`;
    }
  }

  return description;
}

// Test
const topic = 'Công nghệ chỉnh sửa gen trong nông nghiệp';

const articleData = {
  title: topic,
  description: createDescription(topic),
  slug: 'cong-nghe-chinh-sua-gen-trong-nong-nghiep-123456-789',
  author: 1,
  category: 2,
  publishedAt: new Date().toISOString(),
  blocks: [],
  seo: {
    metaTitle: topic,
    metaDescription: createDescription(topic),
  },
};

console.log('🧪 Testing SEO structure...');
console.log('\n📊 Article data structure:');
console.log(JSON.stringify(articleData, null, 2));

console.log('\n🔍 SEO validation:');
if (articleData.seo) {
  console.log('✅ SEO field exists');

  if (articleData.seo.metaTitle) {
    console.log(`✅ metaTitle: "${articleData.seo.metaTitle}"`);
  } else {
    console.log('❌ metaTitle is missing');
  }

  if (articleData.seo.metaDescription) {
    console.log(`✅ metaDescription: "${articleData.seo.metaDescription}"`);
    console.log(
      `   Length: ${articleData.seo.metaDescription.length} characters`
    );
  } else {
    console.log('❌ metaDescription is missing');
  }
} else {
  console.log('❌ SEO field is missing');
}

console.log('\n📋 Expected structure:');
console.log('seo: {');
console.log('  metaTitle: "Article title",');
console.log('  metaDescription: "Short description (max 80 chars)"');
console.log('}');
