import { SidebarMenu } from '@ktbiotech/system-design';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta: Meta<typeof SidebarMenu> = {
  title: 'components/SidebarMenu',
  component: SidebarMenu,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A fixed sidebar menu component with navigation items, active states, and translation support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    activeItem: {
      control: 'select',
      options: [
        'category',
        'imported-kit',
        'human-kit',
        'animal-kit',
        'aquatic-kit',
        'food-kit',
        'extraction-kit',
        'other-products',
      ],
      description: 'The currently active menu item',
    },
    items: {
      control: 'object',
      description: 'Custom menu items (optional)',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Default sidebar with all menu items using translations.',
      },
    },
  },
};

export const WithActiveItem: Story = {
  args: {
    activeItem: 'animal-kit',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Sidebar with "Kit trên động vật" (Animal Kit) as the active item.',
      },
    },
  },
};

export const VietnameseItems: Story = {
  args: {
    items: [
      { id: 'danh-muc', label: 'Danh mục', href: '/danh-muc' },
      { id: 'kit-nhap-khau', label: 'Kit nhập khẩu', href: '/kit-nhap-khau' },
      {
        id: 'kit-tren-nguoi',
        label: 'Kit trên người',
        href: '/kit-tren-nguoi',
      },
      {
        id: 'kit-tren-dong-vat',
        label: 'Kit trên động vật',
        href: '/kit-tren-dong-vat',
        isActive: true,
      },
      {
        id: 'kit-tren-thuy-san',
        label: 'Kit trên thủy sản',
        href: '/kit-tren-thuy-san',
      },
      {
        id: 'kit-tren-thuc-pham',
        label: 'Kit trên thực phẩm',
        href: '/kit-tren-thuc-pham',
      },
      {
        id: 'kit-tach-chiet',
        label: 'Kit tách chiết',
        href: '/kit-tach-chiet',
      },
      { id: 'san-pham-khac', label: 'Sản phẩm khác', href: '/san-pham-khac' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Sidebar with Vietnamese menu items matching the design.',
      },
    },
  },
};

export const EnglishItems: Story = {
  args: {
    items: [
      { id: 'category', label: 'Category', href: '/category' },
      { id: 'imported-kit', label: 'Imported Kit', href: '/imported-kit' },
      { id: 'human-kit', label: 'Human Kit', href: '/human-kit' },
      {
        id: 'animal-kit',
        label: 'Animal Kit',
        href: '/animal-kit',
        isActive: true,
      },
      { id: 'aquatic-kit', label: 'Aquatic Kit', href: '/aquatic-kit' },
      { id: 'food-kit', label: 'Food Kit', href: '/food-kit' },
      {
        id: 'extraction-kit',
        label: 'Extraction Kit',
        href: '/extraction-kit',
      },
      {
        id: 'other-products',
        label: 'Other Products',
        href: '/other-products',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Sidebar with English menu items.',
      },
    },
  },
};

export const MixedItems: Story = {
  args: {
    items: [
      { id: 'home', label: 'Trang chủ', href: '/' },
      { id: 'about', label: 'About Us', href: '/about' },
      { id: 'products', label: 'Sản phẩm', href: '/products' },
      { id: 'services', label: 'Services', href: '/services', isActive: true },
      { id: 'news', label: 'Tin tức', href: '/news' },
      { id: 'contact', label: 'Contact', href: '/contact' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Sidebar with mixed Vietnamese and English items.',
      },
    },
  },
};

export const NavigationItems: Story = {
  args: {
    items: [
      { id: 'home', label: 'Trang chủ', href: '/' },
      { id: 'about', label: 'Giới thiệu', href: '/about' },
      { id: 'products', label: 'Sản phẩm', href: '/products' },
      { id: 'services', label: 'Dịch vụ', href: '/services' },
      { id: 'news', label: 'Tin tức', href: '/news' },
      { id: 'contact', label: 'Liên hệ', href: '/contact' },
    ],
    activeItem: 'services',
  },
  parameters: {
    docs: {
      description: {
        story: 'Sidebar with main navigation items and active state.',
      },
    },
  },
};

export const AllActiveStates: Story = {
  render: () => (
    <div className='flex h-screen'>
      <SidebarMenu activeItem='category' />
      <SidebarMenu activeItem='imported-kit' />
      <SidebarMenu activeItem='human-kit' />
      <SidebarMenu activeItem='animal-kit' />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Multiple sidebars showing different active states for comparison.',
      },
    },
  },
};

export const InteractiveDemo: Story = {
  render: () => {
    const [activeItem, setActiveItem] = React.useState('category');

    const handleItemClick = (item: any) => {
      setActiveItem(item.id);
      console.log('Clicked item:', item);
    };

    return (
      <div className='min-h-screen bg-gray-50'>
        <SidebarMenu activeItem={activeItem} />

        <div className='ml-64 p-8'>
          <div className='max-w-5xl'>
            <h1 className='text-3xl font-bold text-gray-900 mb-6'>
              SidebarMenu Interactive Demo
            </h1>

            <div className='bg-white rounded-lg shadow-sm p-6 mb-6'>
              <h2 className='text-xl font-semibold text-gray-800 mb-4'>
                Features
              </h2>
              <ul className='space-y-2 text-gray-600'>
                <li>✅ Fixed positioning (left side)</li>
                <li>✅ Active state management</li>
                <li>✅ Click navigation to pages</li>
                <li>✅ Translation support (Vietnamese/English)</li>
                <li>✅ Customizable menu items</li>
                <li>✅ Hover effects and transitions</li>
                <li>✅ Icon integration (hamburger + chevron)</li>
              </ul>
            </div>

            <div className='bg-white rounded-lg shadow-sm p-6 mb-6'>
              <h2 className='text-xl font-semibold text-gray-800 mb-4'>
                Current Active Item
              </h2>
              <p className='text-gray-600'>
                Active Item:{' '}
                <span className='font-mono bg-gray-100 px-2 py-1 rounded'>
                  {activeItem}
                </span>
              </p>
            </div>

            <div className='bg-white rounded-lg shadow-sm p-6'>
              <h2 className='text-xl font-semibold text-gray-800 mb-4'>
                Menu Items
              </h2>
              <div className='grid grid-cols-2 gap-4 text-sm'>
                <div>
                  <h3 className='font-semibold text-gray-700 mb-2'>
                    Default Items:
                  </h3>
                  <ul className='space-y-1 text-gray-600'>
                    <li>• Danh mục (Category)</li>
                    <li>• Kit nhập khẩu (Imported Kit)</li>
                    <li>• Kit trên người (Human Kit)</li>
                    <li>• Kit trên động vật (Animal Kit)</li>
                  </ul>
                </div>
                <div>
                  <h3 className='font-semibold text-gray-700 mb-2'>
                    More Items:
                  </h3>
                  <ul className='space-y-1 text-gray-600'>
                    <li>• Kit trên thủy sản (Aquatic Kit)</li>
                    <li>• Kit trên thực phẩm (Food Kit)</li>
                    <li>• Kit tách chiết (Extraction Kit)</li>
                    <li>• Sản phẩm khác (Other Products)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo with click handlers and state management.',
      },
    },
  },
};
