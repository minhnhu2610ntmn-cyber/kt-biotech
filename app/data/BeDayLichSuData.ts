// Data object for Bề dày lịch sử và Đỉnh cao công nghệ
export const companyData = {
  beDayLichSu: {
    title: 'BỀ DÀY LỊCH SỬ',
    description: 'Lịch sử phát triển và những cột mốc quan trọng của KTBioTech',
    milestones: [
      {
        id: '1',
        title: 'Thành lập công ty',
        description: 'KTBioTech được thành lập với sứ mệnh phát triển công nghệ sinh học',
        year: 2020,
        isActive: true,
        details: 'Công ty được thành lập với đội ngũ chuyên gia giàu kinh nghiệm trong lĩnh vực công nghệ sinh học.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
      },
      {
        id: '2',
        title: 'Mở rộng thị trường',
        description: 'Mở rộng hoạt động ra thị trường quốc tế',
        year: 2021,
        isActive: false,
        details: 'Bắt đầu xuất khẩu sản phẩm sang các thị trường Đông Nam Á.',
        image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop',
      },
      {
        id: '3',
        title: 'Phát triển sản phẩm mới',
        description: 'Ra mắt dòng sản phẩm kit xét nghiệm mới',
        year: 2022,
        isActive: false,
        details: 'Phát triển và ra mắt dòng sản phẩm kit xét nghiệm COVID-19.',
        image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&h=400&fit=crop',
      },
      {
        id: '4',
        title: 'Hợp tác quốc tế',
        description: 'Ký kết hợp tác với các đối tác quốc tế',
        year: 2023,
        isActive: false,
        details:
          'Thiết lập quan hệ đối tác với các công ty công nghệ sinh học hàng đầu thế giới.',
        image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop',
      },
      {
        id: '5',
        title: 'Tương lai phát triển',
        description: 'Kế hoạch phát triển và mở rộng trong tương lai',
        year: 2024,
        isActive: false,
        details:
          'Kế hoạch mở rộng nhà máy sản xuất và phát triển thêm nhiều sản phẩm mới.',
        image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop',
      },
    ],
  },
  dinhCaoCongNghe: {
    title: 'ĐỈNH CAO CÔNG NGHỆ',
    description: 'Những thành tựu công nghệ nổi bật và đột phá của KTBioTech',
    technologyFootprints: [
      {
        id: '1',
        title: 'Công nghệ PCR',
        description: 'Phát triển công nghệ PCR Real-time tiên tiến',
        year: 2020,
        isActive: true,
        details: 'Nghiên cứu và phát triển công nghệ PCR Real-time với độ chính xác cao.',
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&h=400&fit=crop',
      },
      {
        id: '2',
        title: 'Công nghệ ELISA',
        description: 'Ứng dụng công nghệ ELISA trong xét nghiệm',
        year: 2021,
        isActive: false,
        details: 'Phát triển các kit ELISA cho nhiều loại xét nghiệm khác nhau.',
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop',
      },
      {
        id: '3',
        title: 'Công nghệ tách chiết',
        description: 'Công nghệ tách chiết DNA/RNA tự động',
        year: 2022,
        isActive: false,
        details: 'Nghiên cứu và phát triển công nghệ tách chiết tự động.',
        image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&h=400&fit=crop',
      },
      {
        id: '4',
        title: 'Công nghệ AI',
        description: 'Ứng dụng AI trong phân tích kết quả',
        year: 2023,
        isActive: false,
        details: 'Tích hợp AI vào quy trình phân tích và xử lý kết quả xét nghiệm.',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
      },
      {
        id: '5',
        title: 'Công nghệ IoT',
        description: 'Kết nối thiết bị thông minh',
        year: 2024,
        isActive: false,
        details: 'Phát triển hệ thống IoT để kết nối và quản lý thiết bị từ xa.',
        image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=600&h=400&fit=crop',
      },
    ],
  },
  metadata: {
    createdAt: '2025-12-10',
    version: '1.0',
    description: 'Dữ liệu về bề dày lịch sử và đỉnh cao công nghệ của KTBioTech',
  },
};

// Type definitions
export interface Milestone {
  id: string;
  title: string;
  description: string;
  year: number;
  isActive?: boolean;
  details?: string;
  image: string;
}

export interface TechnologyFootprint {
  id: string;
  title: string;
  description: string;
  year: number;
  isActive?: boolean;
  details?: string;
  image: string;
}