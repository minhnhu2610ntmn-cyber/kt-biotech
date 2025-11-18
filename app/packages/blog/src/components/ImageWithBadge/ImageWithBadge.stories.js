'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.CustomColors =
  exports.Knowledge =
  exports.ResearchBlog =
  exports.Default =
    void 0;
const index_1 = __importDefault(require('./index'));
const meta = {
  title: 'Components/ImageWithBadge',
  component: index_1.default,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'Image source URL',
    },
    alt: {
      control: 'text',
      description: 'Image alt text',
    },
    width: {
      control: 'number',
      description: 'Image width',
    },
    height: {
      control: 'number',
      description: 'Image height',
    },
    badgeText: {
      control: 'text',
      description: 'Badge text content',
    },
    badgeBackgroundColor: {
      control: 'color',
      description: 'Badge background color',
    },
    badgeTextColor: {
      control: 'color',
      description: 'Badge text color',
    },
    badgeArrowColor: {
      control: 'color',
      description: 'Badge arrow color',
    },
    className: {
      control: 'text',
      description: 'Container CSS classes',
    },
    imageClassName: {
      control: 'text',
      description: 'Image CSS classes',
    },
    badgeClassName: {
      control: 'text',
      description: 'Badge container CSS classes',
    },
    priority: {
      control: 'boolean',
      description: 'Image loading priority',
    },
  },
};
exports.default = meta;
exports.Default = {
  args: {
    src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop',
    alt: 'Sample image',
    width: 400,
    height: 300,
    badgeText: 'Tin Công Ty',
    badgeBackgroundColor: '#FFD9BD',
    badgeTextColor: '#1B1C1D',
    badgeArrowColor: '#FE7B1B',
  },
};
exports.ResearchBlog = {
  args: {
    src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop',
    alt: 'Research blog image',
    width: 400,
    height: 300,
    badgeText: 'Blog nghiên cứu',
    badgeBackgroundColor: '#F0F0F0',
    badgeTextColor: '#1B1C1D',
    badgeArrowColor: '#808080',
  },
};
exports.Knowledge = {
  args: {
    src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop',
    alt: 'Knowledge image',
    width: 400,
    height: 300,
    badgeText: 'Kiến thức',
    badgeBackgroundColor: '#E6F3FF',
    badgeTextColor: '#1B1C1D',
    badgeArrowColor: '#4A90E2',
  },
};
exports.CustomColors = {
  args: {
    src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop',
    alt: 'Custom colors',
    width: 400,
    height: 300,
    badgeText: 'Custom Badge',
    badgeBackgroundColor: '#E8F5E8',
    badgeTextColor: '#2D5016',
    badgeArrowColor: '#4CAF50',
  },
};
