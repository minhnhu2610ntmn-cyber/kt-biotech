import type { Meta, StoryObj } from '@storybook/react';
import BlogHero from './index';

const meta = {
  title: 'Blog/BlogHero',
  component: BlogHero,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BlogHero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Hiểu về công nghệ sinh học',
    imageUrl: 'https://picsum.photos/1200/600?random=1',
    imageAlt: 'Biotechnology research',
  },
};

export const LongTitle: Story = {
  args: {
    title:
      'Advances in CRISPR Technology: Revolutionary Breakthroughs in Gene Editing and Biotechnology Applications',
    imageUrl: 'https://picsum.photos/1200/600?random=2',
    imageAlt: 'CRISPR technology',
  },
};

export const ShortTitle: Story = {
  args: {
    title: 'Biotech News',
    imageUrl: 'https://picsum.photos/1200/600?random=3',
    imageAlt: 'Laboratory equipment',
  },
};

export const WithoutAlt: Story = {
  args: {
    title: 'Understanding DNA Sequencing',
    imageUrl: 'https://picsum.photos/1200/600?random=4',
  },
};
