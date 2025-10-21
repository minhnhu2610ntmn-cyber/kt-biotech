import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

// Mock translations for Storybook
const mockTranslations = {
  category: 'Danh mục',
  importedKit: 'Kit nhập khẩu',
  humanKit: 'Kit trên người',
  animalKit: 'Kit trên động vật',
  aquaticKit: 'Kit trên thủy sản',
  foodKit: 'Kit trên thực phẩm',
  extractionKit: 'Kit tách chiết',
  otherProducts: 'Sản phẩm khác',
};

// Mock SidebarMenu component for Storybook
const SidebarMenuStorybook = (props: any) => {
  // Override the component to use mock translations
  const defaultItems = [
    { id: 'category', label: mockTranslations.category, href: '/category' },
    {
      id: 'imported-kit',
      label: mockTranslations.importedKit,
      href: '/imported-kit',
    },
    { id: 'human-kit', label: mockTranslations.humanKit, href: '/human-kit' },
    {
      id: 'animal-kit',
      label: mockTranslations.animalKit,
      href: '/animal-kit',
    },
    {
      id: 'aquatic-kit',
      label: mockTranslations.aquaticKit,
      href: '/aquatic-kit',
    },
    { id: 'food-kit', label: mockTranslations.foodKit, href: '/food-kit' },
    {
      id: 'extraction-kit',
      label: mockTranslations.extractionKit,
      href: '/extraction-kit',
    },
    {
      id: 'other-products',
      label: mockTranslations.otherProducts,
      href: '/other-products',
    },
  ];

  const menuItems = props.items?.length > 0 ? props.items : defaultItems;

  return (
    <div className='fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 z-40'>
      <div className='p-4'>
        <div className='space-y-2'>
          {menuItems.map((item: any) => {
            const isActive = props.activeItem === item.id || item.isActive;

            return (
              <a
                key={item.id}
                href={item.href}
                onClick={e => {
                  e.preventDefault();
                  props.onItemClick?.(item);
                }}
                className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors duration-200 hover:bg-gray-50 ${
                  isActive
                    ? 'bg-blue-100 text-blue-900'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                <div className='flex items-center gap-3'>
                  <div className='w-4 h-4 bg-gray-600 rounded-sm'></div>
                  <span className='text-sm font-medium'>{item.label}</span>
                </div>
                <div className='w-3 h-3 bg-gray-400 rounded-sm'></div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof SidebarMenuStorybook> = {
  title: 'components/SidebarMenu',
  component: SidebarMenuStorybook,
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

export const CustomItems: Story = {
  args: {
    items: [
      { id: 'custom-1', label: 'Custom Item 1', href: '/custom-1' },
      {
        id: 'custom-2',
        label: 'Custom Item 2',
        href: '/custom-2',
        isActive: true,
      },
      { id: 'custom-3', label: 'Custom Item 3', href: '/custom-3' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Sidebar with custom menu items instead of default translations.',
      },
    },
  },
};

export const AllActiveStates: Story = {
  render: () => (
    <div className='flex h-screen'>
      <SidebarMenuStorybook activeItem='category' />
      <SidebarMenuStorybook activeItem='imported-kit' />
      <SidebarMenuStorybook activeItem='human-kit' />
      <SidebarMenuStorybook activeItem='animal-kit' />
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
        <SidebarMenuStorybook
          activeItem={activeItem}
          onItemClick={handleItemClick}
        />

        <div className='ml-64 p-8'>
          <div className='max-w-4xl'>
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
