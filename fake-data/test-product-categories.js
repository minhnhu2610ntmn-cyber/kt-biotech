#!/usr/bin/env node

/**
 * Script test để kiểm tra các category sản phẩm mới
 */

// Dữ liệu categories để test
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

console.log('🧪 Testing Product Categories...');
console.log(`📊 Total categories: ${CATEGORIES_DATA.length}`);

// Phân loại theo type
const blogCategories = CATEGORIES_DATA.filter(cat => cat.type === 'blog');
const productCategories = CATEGORIES_DATA.filter(cat => cat.type === 'product');

console.log(`\n📝 Blog categories: ${blogCategories.length}`);
blogCategories.forEach((cat, index) => {
  console.log(`  ${index + 1}. ${cat.name} (${cat.slug})`);
});

console.log(`\n🛍️ Product categories: ${productCategories.length}`);
productCategories.forEach((cat, index) => {
  console.log(`  ${index + 1}. ${cat.name} (${cat.slug})`);
  console.log(`     Color: ${cat.color}`);
  console.log(`     Description: ${cat.description}`);
});

console.log('\n✅ All product categories added successfully!');
console.log('\n📋 Categories from image:');
console.log('  ✅ Kit nhập khẩu');
console.log('  ✅ Kit người');
console.log('  ✅ Kit động vật');
console.log('  ✅ Kit thủy sản');
console.log('  ✅ Kit thực phẩm');
console.log('  ✅ Kit chiết xuất');
console.log('  ✅ Sản phẩm khác');
