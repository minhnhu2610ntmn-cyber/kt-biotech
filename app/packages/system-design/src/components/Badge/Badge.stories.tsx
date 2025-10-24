import type { Meta, StoryObj } from '@storybook/react';
import Badge from './index';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Badge text content',
    },
    backgroundColor: {
      control: 'color',
      description: 'Background color of the badge',
    },
    textColor: {
      control: 'color',
      description: 'Text color of the badge',
    },
    arrowColor: {
      control: 'color',
      description: 'Arrow color of the badge',
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
  args: {
    children: 'Blog nghiên cứu',
    backgroundColor: '#FFD9BD',
    textColor: '#1B1C1D',
    arrowColor: '#FE7B1B',
  },
};

export const CompanyNews: Story = {
  args: {
    children: 'Tin Công Ty',
    backgroundColor: '#FFE4B5',
    textColor: '#1B1C1D',
    arrowColor: '#FFA500',
  },
};

export const Knowledge: Story = {
  args: {
    children: 'Kiến thức',
    backgroundColor: '#E6F3FF',
    textColor: '#1B1C1D',
    arrowColor: '#4A90E2',
  },
};

export const ResearchBlog: Story = {
  args: {
    children: 'Blog nghiên cứu',
    backgroundColor: '#F0F0F0',
    textColor: '#1B1C1D',
    arrowColor: '#808080',
  },
};

export const CustomColors: Story = {
  args: {
    children: 'Custom Badge',
    backgroundColor: '#E8F5E8',
    textColor: '#2D5016',
    arrowColor: '#4CAF50',
  },
};

export const SmallSize: Story = {
  args: {
    children: 'Small',
    backgroundColor: '#FFD9BD',
    textColor: '#1B1C1D',
    arrowColor: '#FE7B1B',
    className: 'scale-75',
  },
};

export const LargeSize: Story = {
  args: {
    children: 'Large Badge',
    backgroundColor: '#FFD9BD',
    textColor: '#1B1C1D',
    arrowColor: '#FE7B1B',
    className: 'scale-125',
  },
};
