// Data object for Bề dày lịch sử và Đỉnh cao công nghệ
// Text content is now in messages/vi.json and messages/en.json
// This file contains only non-translatable data (images, years, etc.)
export const companyData = {
  beDayLichSu: {
    milestones: [
      {
        id: '1',
        year: 1997,
        isActive: true,
        image:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
      },
      {
        id: '2',
        year: 2004,
        isActive: false,
        image:
          'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop',
      },
      {
        id: '3',
        year: 2016,
        isActive: false,
        image:
          'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&h=400&fit=crop',
      },
      {
        id: '4',
        year: 2024,
        isActive: false,
        image:
          'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop',
      },
    ],
  },
  dinhCaoCongNghe: {
    technologyFootprints: [
      {
        id: '1',
        year: 2020,
        isActive: true,
        image:
          'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&h=400&fit=crop',
      },
      {
        id: '2',
        year: 2021,
        isActive: false,
        image:
          'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop',
      },
      {
        id: '3',
        year: 2022,
        isActive: false,
        image:
          'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&h=400&fit=crop',
      },
    ],
  },
  metadata: {
    createdAt: '2025-12-10',
    version: '2.0',
    description:
      'Dữ liệu về bề dày lịch sử và đỉnh cao công nghệ của KTBioTech',
  },
};

// Type definitions
export interface Milestone {
  id: string;
  year: number;
  isActive?: boolean;
  image: string;
}

export interface TechnologyFootprint {
  id: string;
  year: number;
  isActive?: boolean;
  image: string;
}
