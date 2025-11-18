import type { Meta, StoryObj } from '@storybook/react';
import { Navbar } from './index';

const meta: Meta<typeof Navbar> = {
  title: 'Components/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    logo: {
      control: 'text',
      description: 'Path to logo image',
    },
    logoAlt: {
      control: 'text',
      description: 'Alt text for logo',
    },
    logoWidth: {
      control: 'number',
      description: 'Logo width',
    },
    logoHeight: {
      control: 'number',
      description: 'Logo height',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    logo: 'logo.png',
    logoAlt: 'KTBioTech Logo',
    logoWidth: 120,
    logoHeight: 40,
    showSearch: true,
    searchPlaceholder: 'Tìm kiếm...',
  },
};

export const WithCustomItems: Story = {
  args: {
    logo: 'logo.png',
    logoAlt: 'KTBioTech Logo',
    items: [
      { label: 'Trang chủ', href: '/' },
      { label: 'Giới thiệu', href: '/about' },
      {
        label: 'Sản phẩm',
        href: '/products',
        children: [
          { label: 'Thiết bị y tế', href: '/products/medical-devices' },
          {
            label: 'Dụng cụ phòng thí nghiệm',
            href: '/products/lab-equipment',
          },
          { label: 'Hóa chất', href: '/products/chemicals' },
        ],
      },
      {
        label: 'Dịch vụ',
        href: '/services',
        children: [
          { label: 'Tư vấn kỹ thuật', href: '/services/technical-consulting' },
          { label: 'Bảo trì thiết bị', href: '/services/maintenance' },
          { label: 'Đào tạo', href: '/services/training' },
        ],
      },
      { label: 'Blog', href: '/blogs' },
      { label: 'Liên hệ', href: '/contact' },
    ],
  },
};

export const WithCustomRightContent: Story = {
  args: {
    logo: 'logo.png',
    logoAlt: 'KTBioTech Logo',
    rightContent: (
      <div className='flex items-center space-x-4'>
        <button className='text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium'>
          Đăng nhập
        </button>
        <button className='bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700'>
          Liên hệ ngay
        </button>
      </div>
    ),
  },
};

export const MobileMenuOpen: Story = {
  args: {
    logo: 'logo.png',
    logoAlt: 'KTBioTech Logo',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const WithoutLogo: Story = {
  args: {
    logo: '',
    logoAlt: '',
    items: [
      { label: 'Trang chủ', href: '/' },
      { label: 'Giới thiệu', href: '/about' },
      { label: 'Sản phẩm', href: '/products' },
      { label: 'Dịch vụ', href: '/services' },
      { label: 'Blog', href: '/blogs' },
      { label: 'Liên hệ', href: '/contact' },
    ],
  },
};
