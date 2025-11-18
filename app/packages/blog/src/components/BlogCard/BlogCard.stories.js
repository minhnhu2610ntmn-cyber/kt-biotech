'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.CustomColors =
  exports.LongDescription =
  exports.LongTitle =
  exports.Knowledge =
  exports.CompanyNews =
  exports.Default =
    void 0;
const index_1 = __importDefault(require('./index'));
const meta = {
  title: 'Components/BlogCard',
  component: index_1.default,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Blog post title',
    },
    author: {
      control: 'text',
      description: 'Author name',
    },
    date: {
      control: 'text',
      description: 'Publication date',
    },
    description: {
      control: 'text',
      description: 'Blog post description',
    },
    imageSrc: {
      control: 'text',
      description: 'Image source URL',
    },
    imageAlt: {
      control: 'text',
      description: 'Image alt text',
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
    href: {
      control: 'text',
      description: 'Link URL',
    },
    className: {
      control: 'text',
      description: 'Container CSS classes',
    },
    imageClassName: {
      control: 'text',
      description: 'Image CSS classes',
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
    title: 'Where does it come from?',
    author: 'Geogle Brown',
    date: 'Mar 8, 2022',
    description:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
    imageSrc:
      'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop',
    imageAlt: 'Blog post image',
    badgeText: 'Blog nghiên cứu',
    badgeBackgroundColor: '#FFD9BD',
    badgeTextColor: '#1B1C1D',
    badgeArrowColor: '#FE7B1B',
    href: '/blog/post-1',
  },
};
exports.CompanyNews = {
  args: {
    title: 'Where does it come from?',
    author: 'Geogle Brown',
    date: 'Mar 8, 2022',
    description:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
    imageSrc:
      'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop',
    imageAlt: 'Company news image',
    badgeText: 'Tin Công Ty',
    badgeBackgroundColor: '#FFE4B5',
    badgeTextColor: '#1B1C1D',
    badgeArrowColor: '#FFA500',
    href: '/blog/company-news',
  },
};
exports.Knowledge = {
  args: {
    title: 'Where does it come from?',
    author: 'Geogle Brown',
    date: 'Mar 8, 2022',
    description:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
    imageSrc:
      'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop',
    imageAlt: 'Knowledge image',
    badgeText: 'Kiến thức',
    badgeBackgroundColor: '#E6F3FF',
    badgeTextColor: '#1B1C1D',
    badgeArrowColor: '#4A90E2',
    href: '/blog/knowledge',
  },
};
exports.LongTitle = {
  args: {
    title:
      'This is a very long title that should be truncated with line-clamp-2 to prevent overflow and maintain proper card layout',
    author: 'Geogle Brown',
    date: 'Mar 8, 2022',
    description:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.',
    imageSrc:
      'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop',
    imageAlt: 'Long title image',
    badgeText: 'Blog nghiên cứu',
    badgeBackgroundColor: '#FFD9BD',
    badgeTextColor: '#1B1C1D',
    badgeArrowColor: '#FE7B1B',
    href: '/blog/long-title',
  },
};
exports.LongDescription = {
  args: {
    title: 'Where does it come from?',
    author: 'Geogle Brown',
    date: 'Mar 8, 2022',
    description:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.',
    imageSrc:
      'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop',
    imageAlt: 'Long description image',
    badgeText: 'Blog nghiên cứu',
    badgeBackgroundColor: '#FFD9BD',
    badgeTextColor: '#1B1C1D',
    badgeArrowColor: '#FE7B1B',
    href: '/blog/long-description',
  },
};
exports.CustomColors = {
  args: {
    title: 'Where does it come from?',
    author: 'Geogle Brown',
    date: 'Mar 8, 2022',
    description:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
    imageSrc:
      'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop',
    imageAlt: 'Custom colors image',
    badgeText: 'Custom Badge',
    badgeBackgroundColor: '#E8F5E8',
    badgeTextColor: '#2D5016',
    badgeArrowColor: '#4CAF50',
    href: '/blog/custom',
  },
};
