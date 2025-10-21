import type { Meta, StoryObj } from '@storybook/react';
import HeroSection from './index';

const meta: Meta<typeof HeroSection> = {
  title: 'containers/HeroSection',
  component: HeroSection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A full-screen hero section with background image, company information, and call-to-action button.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Company title',
    },
    subtitle: {
      control: 'text',
      description: 'Brand/subtitle name',
    },
    description: {
      control: 'text',
      description: 'Description paragraph',
    },
    buttonLabel: {
      control: 'text',
      description: 'CTA button text',
    },
    buttonHref: {
      control: 'text',
      description: 'CTA button link',
    },
    backgroundImage: {
      control: 'text',
      description: 'Background image URL',
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
        story:
          'Default hero section with Vietnamese content and laboratory background.',
      },
    },
  },
};

export const English: Story = {
  args: {
    title: 'BIOTECHNOLOGY COMPANY LIMITED',
    subtitle: 'KHOA THUONG',
    description:
      'The predecessor of the Company was a research group on infectious diseases belonging to the Molecular Biology Laboratory – Department of Genetics – University of Natural Sciences – Vietnam National University Ho Chi Minh City.',
    buttonLabel: 'About Us >',
    buttonHref: '/about',
  },
  parameters: {
    docs: {
      description: {
        story: 'Hero section with English content.',
      },
    },
  },
};

export const CustomContent: Story = {
  args: {
    title: 'CUSTOM COMPANY NAME',
    subtitle: 'INNOVATION LAB',
    description:
      'Leading the future of biotechnology with cutting-edge research and development. We specialize in molecular diagnostics and therapeutic solutions.',
    buttonLabel: 'Learn More >',
    buttonHref: '/services',
  },
  parameters: {
    docs: {
      description: {
        story: 'Hero section with custom content.',
      },
    },
  },
};

export const DifferentBackground: Story = {
  args: {
    backgroundImage:
      'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1920&h=1080&fit=crop',
    title: 'RESEARCH & DEVELOPMENT',
    subtitle: 'SCIENTIFIC EXCELLENCE',
    description:
      'Advancing biotechnology through innovative research and state-of-the-art laboratory facilities.',
    buttonLabel: 'Our Research >',
    buttonHref: '/research',
  },
  parameters: {
    docs: {
      description: {
        story: 'Hero section with different background image.',
      },
    },
  },
};

export const MinimalContent: Story = {
  args: {
    title: 'SIMPLE',
    subtitle: 'CLEAN',
    description: 'Minimal hero section with essential information only.',
    buttonLabel: 'Get Started',
    buttonHref: '/contact',
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal hero section with simple content.',
      },
    },
  },
};
