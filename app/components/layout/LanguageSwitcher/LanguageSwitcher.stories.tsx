import type { Meta, StoryObj } from '@storybook/react';
import LanguageSwitcher from './index';

const meta: Meta<typeof LanguageSwitcher> = {
  title: 'Layout/LanguageSwitcher',
  component: LanguageSwitcher,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Language switcher component with Vietnamese and English options. Uses react-select with custom styling.',
      },
    },
  },
};

export const InContext: Story = {
  render: () => (
    <div className="relative w-full h-32 bg-gray-100 p-4">
      <p className="text-sm text-gray-600 mb-4">
        Language switcher positioned in top-right corner:
      </p>
      <LanguageSwitcher />
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Language switcher component shown in context with background to demonstrate positioning.',
      },
    },
  },
};
