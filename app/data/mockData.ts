import type {
  CompanyMessage,
  Country,
  HeroSlide,
  Milestone,
  NewsItem,
  Partner,
  Product,
  ProductCategory,
  TechnologyFootprint,
} from '../types';

// Product Categories
export const productCategories: ProductCategory[] = [
  { id: '1', name: 'Kit nhập khẩu', href: '/products/imported-kits' },
  { id: '2', name: 'Kít trên người', href: '/products/human-kits' },
  { id: '3', name: 'Kít trên động vật', href: '/products/animal-kits' },
  { id: '4', name: 'Kít trên thủy sản', href: '/products/aquatic-kits' },
  { id: '5', name: 'Kít trên thực phẩm', href: '/products/food-kits' },
  { id: '6', name: 'Kít tách chiết', href: '/products/extraction-kits' },
  { id: '7', name: 'Sản phẩm khác', href: '/products/other' },
];

// Featured Products
export const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'Kit PCR Real-time',
    description: 'Kit PCR Real-time cho phát hiện virus',
    image:
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=300&fit=crop',
    price: 'Liên hệ',
    href: '/products/pcr-kit',
    category: 'Kit nhập khẩu',
  },
  {
    id: '2',
    name: 'Kit ELISA',
    description: 'Kit ELISA cho xét nghiệm miễn dịch',
    image:
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
    price: 'Liên hệ',
    href: '/products/elisa-kit',
    category: 'Kít trên người',
  },
  {
    id: '3',
    name: 'Kit DNA Extraction',
    description: 'Kit tách chiết DNA từ mẫu sinh học',
    image:
      'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=300&fit=crop',
    price: 'Liên hệ',
    href: '/products/dna-extraction',
    category: 'Kít tách chiết',
  },
  {
    id: '4',
    name: 'Kit Food Safety',
    description: 'Kit kiểm tra an toàn thực phẩm',
    image:
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    price: 'Liên hệ',
    href: '/products/food-safety',
    category: 'Kít trên thực phẩm',
  },
];

// Hero Slides
export const heroSlides: HeroSlide[] = [
  {
    id: '1',
    title: 'Công nghệ sinh học tiên tiến',
    subtitle: 'Giải pháp toàn diện cho nghiên cứu và phát triển',
    image:
      'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=400&fit=crop',
    href: '/products',
  },
  {
    id: '2',
    title: 'Nghiên cứu khoa học',
    subtitle: 'Hỗ trợ các dự án nghiên cứu quan trọng',
    image:
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop',
    href: '/research',
  },
  {
    id: '3',
    title: 'Đối tác tin cậy',
    subtitle: 'Được tin tưởng bởi các tổ chức hàng đầu',
    image:
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=400&fit=crop',
    href: '/partners',
  },
];

// Company Message
export const companyMessage: CompanyMessage = {
  title: 'Thông điệp công ty',
  description:
    'KTBioTech cam kết mang đến những giải pháp công nghệ sinh học tiên tiến nhất, góp phần phát triển ngành y tế và nghiên cứu khoa học tại Việt Nam.',
  image:
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop',
  href: '/about',
};

// Milestones
export const milestones: Milestone[] = [
  {
    id: '1',
    title: 'Thành lập công ty',
    description:
      'KTBioTech được thành lập với sứ mệnh phát triển công nghệ sinh học',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
    year: 2020,
    isActive: true,
    details:
      'Công ty được thành lập với đội ngũ chuyên gia giàu kinh nghiệm trong lĩnh vực công nghệ sinh học.',
  },
  {
    id: '2',
    title: 'Mở rộng thị trường',
    description: 'Mở rộng hoạt động ra thị trường quốc tế',
    image:
      'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop',
    year: 2021,
    isActive: false,
    details: 'Bắt đầu xuất khẩu sản phẩm sang các thị trường Đông Nam Á.',
  },
  {
    id: '3',
    title: 'Phát triển sản phẩm mới',
    description: 'Ra mắt dòng sản phẩm kit xét nghiệm mới',
    image:
      'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&h=400&fit=crop',
    year: 2022,
    isActive: false,
    details: 'Phát triển và ra mắt dòng sản phẩm kit xét nghiệm COVID-19.',
  },
  {
    id: '4',
    title: 'Hợp tác quốc tế',
    description: 'Ký kết hợp tác với các đối tác quốc tế',
    image:
      'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop',
    year: 2023,
    isActive: false,
    details:
      'Thiết lập quan hệ đối tác với các công ty công nghệ sinh học hàng đầu thế giới.',
  },
  {
    id: '5',
    title: 'Tương lai phát triển',
    description: 'Kế hoạch phát triển và mở rộng trong tương lai',
    image:
      'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop',
    year: 2024,
    isActive: false,
    details:
      'Kế hoạch mở rộng nhà máy sản xuất và phát triển thêm nhiều sản phẩm mới.',
  },
];

// Technology Footprints
export const technologyFootprints: TechnologyFootprint[] = [
  {
    id: '1',
    title: 'Công nghệ PCR',
    description: 'Phát triển công nghệ PCR Real-time tiên tiến',
    image:
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&h=400&fit=crop',
    year: 2020,
    isActive: true,
    details:
      'Nghiên cứu và phát triển công nghệ PCR Real-time với độ chính xác cao.',
  },
  {
    id: '2',
    title: 'Công nghệ ELISA',
    description: 'Ứng dụng công nghệ ELISA trong xét nghiệm',
    image:
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop',
    year: 2021,
    isActive: false,
    details: 'Phát triển các kit ELISA cho nhiều loại xét nghiệm khác nhau.',
  },
  {
    id: '3',
    title: 'Công nghệ tách chiết',
    description: 'Công nghệ tách chiết DNA/RNA tự động',
    image:
      'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&h=400&fit=crop',
    year: 2022,
    isActive: false,
    details: 'Nghiên cứu và phát triển công nghệ tách chiết tự động.',
  },
  {
    id: '4',
    title: 'Công nghệ AI',
    description: 'Ứng dụng AI trong phân tích kết quả',
    image:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
    year: 2023,
    isActive: false,
    details: 'Tích hợp AI vào quy trình phân tích và xử lý kết quả xét nghiệm.',
  },
  {
    id: '5',
    title: 'Công nghệ IoT',
    description: 'Kết nối thiết bị thông minh',
    image:
      'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=600&h=400&fit=crop',
    year: 2024,
    isActive: false,
    details: 'Phát triển hệ thống IoT để kết nối và quản lý thiết bị từ xa.',
  },
];

// Countries
export const countries: Country[] = [
  { id: '1', name: 'USA', flag: '🇺🇸', code: 'US', flagEmoji: '🇺🇸' },
  { id: '2', name: 'China', flag: '🇨🇳', code: 'CN', flagEmoji: '🇨🇳' },
  { id: '3', name: 'Japan', flag: '🇯🇵', code: 'JP', flagEmoji: '🇯🇵' },
  { id: '4', name: 'Malaysia', flag: '🇲🇾', code: 'MY', flagEmoji: '🇲🇾' },
  { id: '5', name: 'Cambodia', flag: '🇰🇭', code: 'KH', flagEmoji: '🇰🇭' },
  { id: '6', name: 'Laos', flag: '🇱🇦', code: 'LA', flagEmoji: '🇱🇦' },
];

// News Items
export const newsItems: NewsItem[] = [
  {
    id: '1',
    title: 'Tin tức mới nhất',
    description: 'Cập nhật những tin tức mới nhất về ngành công nghệ sinh học',
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop',
    publishedAt: new Date('2024-01-15'),
    href: '/news/latest',
    category: 'news',
  },
  {
    id: '2',
    title: 'Giới thiệu công ty',
    description: 'Tìm hiểu về lịch sử và sứ mệnh của KTBioTech',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
    publishedAt: new Date('2024-01-10'),
    href: '/about',
    category: 'about',
  },
  {
    id: '3',
    title: 'Tuyển dụng',
    description: 'Cơ hội nghề nghiệp tại KTBioTech',
    image:
      'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop',
    publishedAt: new Date('2024-01-05'),
    href: '/careers',
    category: 'careers',
  },
  {
    id: '4',
    title: 'Nghiên cứu khoa học',
    description: 'Các dự án nghiên cứu và phát triển sản phẩm',
    image:
      'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop',
    publishedAt: new Date('2024-01-01'),
    href: '/research',
    category: 'news',
  },
];

// Partners
export const partners: Partner[] = [
  {
    id: '1',
    name: 'Acecook',
    logo: '/images/Acecook.png',
    website: 'https://acecook.vn',
    description: 'Công ty TNHH Acecook Việt Nam',
  },
  {
    id: '2',
    name: 'Bệnh Viện Đa Khoa Medlatec',
    logo: '/images/Bệnh Viện Đa khoa Medlatec.png',
    website: 'https://medlatec.vn',
    description: 'Bệnh viện đa khoa Medlatec',
  },
  {
    id: '3',
    name: 'Bệnh Viện Hoàn Mỹ',
    logo: '/images/Bệnh Viện Hoàn Mỹ.jpg',
    website: 'https://hoanmy.vn',
    description: 'Hệ thống bệnh viện Hoàn Mỹ',
  },
  {
    id: '4',
    name: 'Bệnh Viện Hồng Ngọc',
    logo: '/images/Bệnh Viện hồng Ngọc.png',
    website: 'https://benhvienhongngoc.vn',
    description: 'Bệnh viện Đa khoa Hồng Ngọc',
  },
  {
    id: '5',
    name: 'Bureau Veritas',
    logo: '/images/Bureau Veritas.png',
    website: 'https://bureauveritas.vn',
    description: 'Bureau Veritas Việt Nam',
  },
  {
    id: '6',
    name: 'Chi Cục Thú Y Bạc Liêu',
    logo: '/images/Chi Cục Thú Y Bạc Liêu.png',
    website: '#',
    description: 'Chi Cục Thú Y Bạc Liêu',
  },
  {
    id: '7',
    name: 'Công Ty Sắc Ký Hải Đăng',
    logo: '/images/Công Ty Sắc Ký Hải Đăng.jpg',
    website: '#',
    description: 'Công Ty Sắc Ký Hải Đăng',
  },
  {
    id: '8',
    name: 'Intertek Việt Nam',
    logo: '/images/Công ty TNHH Intertek Việt Nam.png',
    website: 'https://www.intertek.com',
    description: 'Công ty TNHH Intertek Việt Nam',
  },
  {
    id: '9',
    name: 'Bệnh Viện Phụ Sản Nhi Bình Dương',
    logo: '/images/Phụ Sản Nhi Bình Dương.png',
    website: '#',
    description: 'Bệnh viện Phụ Sản Nhi Bình Dương',
  },
  {
    id: '10',
    name: 'Quatest 3',
    logo: '/images/Quatest 3.png',
    website: 'https://quatest3.gov.vn',
    description: 'Trung tâm Kỹ thuật Tiêu chuẩn Đo lường Chất lượng 3',
  },
  {
    id: '11',
    name: 'Trung Tâm Dịch Vụ Phân Tích Thí Nghiệm Tp.HCM',
    logo: '/images/Trung Tâm Dịch Vụ Phân Tích Thí nghiệm Tp.HCM.png',
    website: '#',
    description: 'Trung Tâm Dịch Vụ Phân Tích Thí Nghiệm Tp.HCM',
  },
  {
    id: '12',
    name: 'Trung Tâm Kiểm Chuẩn TP.HCM',
    logo: '/images/Trung Tâm Kiểm Chuẩn TP.HCM.png',
    website: '#',
    description: 'Trung Tâm Kiểm Chuẩn TP.HCM',
  },
  {
    id: '13',
    name: 'Viện Pasteur',
    logo: '/images/Viện Pasteur.png',
    website: 'https://pasteur.vn',
    description: 'Viện Pasteur',
  },
];
