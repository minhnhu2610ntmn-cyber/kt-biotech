#!/usr/bin/env node

/**
 * Script đơn giản để tạo Products cho KTBioTech
 * Sử dụng axios để call API
 */

/* eslint-disable */

const axios = require('axios');

// Cấu hình API hard code
const API_CONFIG = {
  baseUrl: 'http://103.90.225.225:1337',
  categoriesEndpoint: '/api/categories',
  productsEndpoint: '/api/products',
  uploadEndpoint: '/api/upload',
  token:
    '10e807beb945d1aac3f34a50e35c4b94eb1fddc4d2a5b817714235552428df72e326fc59334cfd51c2dc3ec772bfff8248f6a2ed0697905d748aaa25b9d29d967fdb36fb10c1318ad932d1d05234e1d333817d05594746a52a67c5892d7791fbd8b0ab8b9f5782fd027bc234c6050db571d049de492f12334ed35f9d473f996b',
  timeout: 15000, // 15 giây
};

// Danh sách sản phẩm mẫu (categoryName sẽ được map từ API)
const FAKE_PRODUCTS = [
  { title: 'PCR Master Mix Kit - Nhập khẩu', sku: 'KK-001', categoryIndex: 0 },
  { title: 'DNA Extraction Kit Premium', sku: 'KK-002', categoryIndex: 0 },
  { title: 'RNA Isolation Kit Professional', sku: 'KK-003', categoryIndex: 0 },
  { title: 'COVID-19 Test Kit', sku: 'KH-001', categoryIndex: 1 },
  { title: 'HIV Rapid Test Kit', sku: 'KH-002', categoryIndex: 1 },
  { title: 'Veterinary PCR Kit - Canine', sku: 'KD-001', categoryIndex: 2 },
  { title: 'Animal Disease Diagnostic Kit', sku: 'KD-003', categoryIndex: 2 },
  { title: 'Shrimp Disease Detection Kit', sku: 'KT-001', categoryIndex: 3 },
  { title: 'Food Safety Test Kit', sku: 'KF-001', categoryIndex: 4 },
  { title: 'Plant Extraction Kit', sku: 'KC-001', categoryIndex: 5 },
];

const SPECS_TEMPLATE = [
  'Thành phần: Chỉ định kỹ thuật chi tiết. Ứng dụng: Áp dụng trong nhiều lĩnh vực. Độ nhạy: Cao, phát hiện chính xác. Thời gian: Kết quả trong 30-60 phút. Bảo quản: 2-8 độ C.',
  'Độ chính xác: >99%. Phạm vi phát hiện: Wide detection range. Thời gian phản ứng: 60-90 phút. Yêu cầu thiết bị: Minimal equipment required. Hướng dẫn: Dễ sử dụng, có hướng dẫn đầy đủ.',
  'Chứng nhận: ISO 13485, CE marked. Độ tin cậy: Đã được kiểm chứng. Kết quả: Rõ ràng, dễ đọc. An toàn: An toàn cho người sử dụng. Hỗ trợ: Hỗ trợ kỹ thuật 24/7.',
];

// Hàm tạo slug từ name
function createSlug(name, _index = 0) {
  const baseSlug = name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();

  const timestamp = Date.now().toString().slice(-6);
  const randomSuffix = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, '0');

  return `${baseSlug}-${timestamp}-${randomSuffix}`;
}

// Hàm tạo description
function createDescription(name, categoryName) {
  const descriptions = [
    `Sản phẩm ${name.toLowerCase()} chất lượng cao từ KTBioTech`,
    `${name} - Giải pháp chuyên nghiệp cho ${categoryName.toLowerCase()}`,
    `Kit ${name.toLowerCase()} với độ chính xác và tin cậy cao`,
    `${name} - Dễ sử dụng, kết quả nhanh chóng và chính xác`,
    `Sản phẩm ${name.toLowerCase()} đạt tiêu chuẩn quốc tế`,
  ];

  return descriptions[Math.floor(Math.random() * descriptions.length)];
}

// Hàm tạo content blocks
function generateProductContent(name, description) {
  return [
    {
      __component: 'shared.rich-text',
      body: `# ${name}\n\n${description}\n\n## Tổng quan sản phẩm\n\n${name} là một trong những sản phẩm chất lượng cao được phát triển bởi KTBioTech. Sản phẩm này được thiết kế để đáp ứng nhu cầu nghiên cứu và chẩn đoán trong lĩnh vực công nghệ sinh học.\n\n### Đặc điểm nổi bật\n\n- **Độ chính xác cao**: Cung cấp kết quả chính xác và đáng tin cậy\n- **Dễ sử dụng**: Quy trình đơn giản, dễ dàng thao tác\n- **Hiệu suất cao**: Tối ưu hóa cho hiệu suất tối đa\n- **Tin cậy**: Đã được kiểm chứng và chứng nhận\n\n### Ứng dụng\n\nSản phẩm có thể được sử dụng trong:\n- Nghiên cứu và phát triển\n- Chẩn đoán và xét nghiệm\n- Kiểm tra chất lượng\n- Phân tích và đánh giá`,
    },
  ];
}

// Hàm tạo image URL
function generateImageUrl(index) {
  return `https://picsum.photos/800/600?random=${index}`;
}

// Hàm upload image
async function uploadImageToStrapi(imageUrl, filename, retries = 2) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const imageResponse = await axios.get(imageUrl, {
        responseType: 'arraybuffer',
        timeout: 3000,
      });

      const FormData = require('form-data');
      const form = new FormData();
      form.append('files', imageResponse.data, {
        filename,
        contentType: 'image/jpeg',
      });

      const uploadResponse = await axios.post(
        `${API_CONFIG.baseUrl}${API_CONFIG.uploadEndpoint}`,
        form,
        {
          headers: {
            ...form.getHeaders(),
            Authorization: `Bearer ${API_CONFIG.token}`,
          },
          timeout: 8000,
        }
      );

      return { success: true, data: uploadResponse.data[0] };
    } catch (error) {
      if (attempt === retries) {
        return { success: false, error: error.message };
      }
      await new Promise(resolve => setTimeout(resolve, 3000 * attempt));
    }
  }
}

// Hàm load categories
async function loadCategories() {
  try {
    const response = await axios.get(
      `${API_CONFIG.baseUrl}${API_CONFIG.categoriesEndpoint}?filters[type][$eq]=product&populate=*`,
      {
        headers: { Authorization: `Bearer ${API_CONFIG.token}` },
        timeout: API_CONFIG.timeout,
      }
    );
    return response.data.data || [];
  } catch (error) {
    console.log('❌ Failed to load categories:', error.message);
    return [];
  }
}

// Hàm tạo product
async function createProduct(productData) {
  try {
    const response = await axios.post(
      `${API_CONFIG.baseUrl}${API_CONFIG.productsEndpoint}`,
      { data: productData },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_CONFIG.token}`,
        },
        timeout: API_CONFIG.timeout,
      }
    );
    return { success: true, data: response.data.data };
  } catch (error) {
    const errorMessage = error.response?.data?.error?.message || error.message;
    const fullError = error.response?.data || error.message;
    const displayName = productData.title || productData.name || 'Unnamed';
    console.log(`❌ Failed: ${displayName} - ${errorMessage}`);
    console.log('Full error details:', JSON.stringify(fullError, null, 2));
    return { success: false, error: errorMessage };
  }
}

// Hàm chính
async function main() {
  console.log('🚀 Creating Fake Products...\n');

  // Load categories
  const categories = await loadCategories();
  if (categories.length === 0) {
    console.log(
      '❌ No product categories found. Please create categories first.'
    );
    return;
  }

  console.log(`📊 Found ${categories.length} product categories\n`);

  let successCount = 0;
  let failedCount = 0;
  let imageFailCount = 0;

  // Create fake products
  for (let i = 0; i < FAKE_PRODUCTS.length; i++) {
    const fakeProduct = FAKE_PRODUCTS[i];
    const category = categories[fakeProduct.categoryIndex];

    if (!category) {
      console.log(
        `⚠️ Category not found at index: ${fakeProduct.categoryIndex}`
      );
      continue;
    }

    console.log(`📝 Creating: ${fakeProduct.title}`);
    console.log(`   Category: ${category.name} (id: ${category.id})`);
    console.log(`   SKU: ${fakeProduct.sku}`);

    // Skip image upload - will use existing images or none
    // const imageUrl = generateImageUrl(i);
    // const imageFilename = `${createSlug(fakeProduct.title, i)}-${i}.jpg`;
    // const imageResult = await uploadImageToStrapi(imageUrl, imageFilename);
    // let imageId = null;
    // if (imageResult.success) {
    //   imageId = imageResult.data.id;
    // } else {
    //   imageFailCount++;
    //   console.log('⚠️ Creating product without image');
    // }
    const imageId = null; // No images for now

    // Tạo product data với structure đúng
    const baseDescription = createDescription(fakeProduct.title, category.name);

    const productData = {
      title: fakeProduct.title,
      description: baseDescription,
      sku: fakeProduct.sku,
      detail: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: fakeProduct.title,
            },
          ],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: '',
            },
          ],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: baseDescription,
            },
          ],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: '',
            },
          ],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: `${fakeProduct.title} là sản phẩm chất lượng cao được phát triển bởi KTBioTech. Sản phẩm này được thiết kế để đáp ứng nhu cầu nghiên cứu và chẩn đoán trong lĩnh vực công nghệ sinh học.`,
            },
          ],
        },
      ],
      specification:
        SPECS_TEMPLATE[Math.floor(Math.random() * SPECS_TEMPLATE.length)],
      tags: `${category.name}, kit, ${fakeProduct.sku}`,
      seo: {
        metaTitle: fakeProduct.title,
        metaDescription: baseDescription,
      },
      publishedAt: new Date().toISOString(),
    };

    const result = await createProduct(productData);
    if (result.success) {
      successCount++;
    } else {
      failedCount++;
    }

    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  // Tổng kết
  console.log('\n📊 Results:');
  console.log(`✅ Success: ${successCount}`);
  console.log(`❌ Failed: ${failedCount}`);
  console.log(`🖼️ Images failed: ${imageFailCount}`);
}

main().catch(console.error);
