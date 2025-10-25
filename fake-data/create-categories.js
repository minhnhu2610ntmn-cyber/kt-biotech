#!/usr/bin/env node

/**
 * Script đơn giản để tạo categories cho blog KTBioTech
 * Sử dụng axios để call API
 */

const axios = require('axios');

// Cấu hình API hard code
const API_CONFIG = {
  baseUrl: 'http://103.90.225.225:1337',
  endpoint: '/api/categories',
  token:
    '10e807beb945d1aac3f34a50e35c4b94eb1fddc4d2a5b817714235552428df72e326fc59334cfd51c2dc3ec772bfff8248f6a2ed0697905d748aaa25b9d29d967fdb36fb10c1318ad932d1d05234e1d333817d05594746a52a67c5892d7791fbd8b0ab8b9f5782fd027bc234c6050db571d049de492f12334ed35f9d473f996b',
  timeout: 10000, // 10 giây
};

// Dữ liệu categories cần tạo
const CATEGORIES_DATA = [
  // Blog categories
  {
    type: 'blog',
    name: 'Blog nghiên cứu',
    color: '#5177C7',
    description: 'Các bài viết về nghiên cứu khoa học và công nghệ sinh học',
    slug: 'blog-nghien-cuu',
  },
  {
    type: 'blog',
    name: 'Tin Công Ty',
    color: '#FE7B1B',
    description: 'Tin tức và thông báo từ KTBioTech',
    slug: 'tin-cong-ty',
  },
  {
    type: 'blog',
    name: 'Kiến thức',
    color: '#58C1D0',
    description: 'Kiến thức chuyên môn về công nghệ sinh học',
    slug: 'kien-thuc',
  },
  // Product categories
  {
    type: 'product',
    name: 'Kit nhập khẩu',
    color: '#4CAF50',
    description: 'Các kit nhập khẩu chất lượng cao cho nghiên cứu và chẩn đoán',
    slug: 'kit-nhap-khau',
  },
  {
    type: 'product',
    name: 'Kit người',
    color: '#2196F3',
    description: 'Kit chẩn đoán và nghiên cứu dành cho con người',
    slug: 'kit-nguoi',
  },
  {
    type: 'product',
    name: 'Kit động vật',
    color: '#FF9800',
    description: 'Kit chẩn đoán và nghiên cứu dành cho động vật',
    slug: 'kit-dong-vat',
  },
  {
    type: 'product',
    name: 'Kit thủy sản',
    color: '#00BCD4',
    description: 'Kit chẩn đoán và nghiên cứu dành cho thủy sản',
    slug: 'kit-thuy-san',
  },
  {
    type: 'product',
    name: 'Kit thực phẩm',
    color: '#8BC34A',
    description: 'Kit kiểm tra và phân tích chất lượng thực phẩm',
    slug: 'kit-thuc-pham',
  },
  {
    type: 'product',
    name: 'Kit chiết xuất',
    color: '#9C27B0',
    description: 'Kit chiết xuất và tinh chế các hợp chất sinh học',
    slug: 'kit-chiet-xuat',
  },
  {
    type: 'product',
    name: 'Sản phẩm khác',
    color: '#607D8B',
    description: 'Các sản phẩm khác trong lĩnh vực công nghệ sinh học',
    slug: 'san-pham-khac',
  },
];

// Hàm gửi POST request bằng axios
async function postCategory(categoryData) {
  try {
    const response = await axios.post(
      `${API_CONFIG.baseUrl}${API_CONFIG.endpoint}`,
      { data: categoryData },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: API_CONFIG.token ? `Bearer ${API_CONFIG.token}` : '',
        },
        timeout: API_CONFIG.timeout,
      }
    );

    console.log(`✅ Created: ${categoryData.name}`);
    return { success: true, data: response.data.data };
  } catch (error) {
    if (error.response) {
      // Server trả về error response
      const errorMessage =
        error.response.data?.error?.message || 'Unknown error';
      console.log(`❌ Failed: ${categoryData.name} - ${errorMessage}`);
      return { success: false, error: errorMessage };
    } else if (error.request) {
      // Request được gửi nhưng không có response
      console.log(`❌ Failed: ${categoryData.name} - No response from server`);
      return { success: false, error: 'No response from server' };
    } else {
      // Lỗi khác
      console.log(`❌ Failed: ${categoryData.name} - ${error.message}`);
      return { success: false, error: error.message };
    }
  }
}

// Hàm chính
async function main() {
  console.log('🚀 Creating Categories...\n');

  let successCount = 0;
  let failedCount = 0;

  // Tạo từng category
  for (let i = 0; i < CATEGORIES_DATA.length; i++) {
    const categoryData = CATEGORIES_DATA[i];
    console.log(
      `📝 Creating ${i + 1}/${CATEGORIES_DATA.length}: ${categoryData.name}`
    );

    const result = await postCategory(categoryData);

    if (result.success) {
      successCount++;
    } else {
      failedCount++;
    }
  }

  // Tổng kết
  console.log('\n📊 Results:');
  console.log(`✅ Success: ${successCount}/${CATEGORIES_DATA.length}`);
  console.log(`❌ Failed: ${failedCount}/${CATEGORIES_DATA.length}`);
}

// Chạy script
main().catch(console.error);
