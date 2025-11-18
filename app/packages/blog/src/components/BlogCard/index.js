'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = BlogCard;
const jsx_runtime_1 = require('react/jsx-runtime');
const system_design_1 = require('@ktbiotech/system-design');
const next_intl_1 = require('next-intl');
const navigation_1 = require('next/navigation');
const ImageWithBadge_1 = __importDefault(require('../ImageWithBadge'));
function BlogCard({
  title,
  author,
  date,
  description,
  imageSrc,
  imageAlt,
  badgeText,
  badgeBackgroundColor = '#FFD9BD',
  badgeTextColor = '#1B1C1D',
  badgeArrowColor = '#FE7B1B',
  href = '#',
  slug,
  className,
  imageClassName,
  priority: _priority = false,
  direction = 'row',
}) {
  const router = (0, navigation_1.useRouter)();
  const t = (0, next_intl_1.useTranslations)('common');
  const handleCardClick = () => {
    const targetUrl = slug ? `/blogs/${slug}` : href;
    router.push(targetUrl);
  };
  return (0, jsx_runtime_1.jsx)('article', {
    className: (0, system_design_1.cn)(
      'duration-300 cursor-pointer hover:shadow-xl transition-shadow group rounded-xl',
      className,
      direction === 'column' && 'px-4 lg:px-0'
    ),
    onClick: handleCardClick,
    children: (0, jsx_runtime_1.jsxs)('div', {
      className: (0, system_design_1.cn)(
        'flex gap-3 sm:gap-4',
        direction === 'row' && 'flex-col sm:flex-row',
        direction === 'column' && 'flex-col'
      ),
      children: [
        (0, jsx_runtime_1.jsx)('div', {
          className: 'flex-shrink-0',
          children: (0, jsx_runtime_1.jsx)(ImageWithBadge_1.default, {
            src: imageSrc,
            alt: imageAlt,
            width: direction === 'column' ? '100%' : 200,
            height: direction === 'column' ? '100%' : 150,
            badgeText: badgeText,
            badgeBackgroundColor: badgeBackgroundColor,
            badgeTextColor: badgeTextColor,
            badgeArrowColor: badgeArrowColor,
            imageClassName: (0, system_design_1.cn)(
              direction === 'column'
                ? 'w-full h-full group-hover:rounded-b-none'
                : 'w-full sm:w-48  ',
              imageClassName
            ),
            priority: _priority,
          }),
        }),
        (0, jsx_runtime_1.jsxs)('div', {
          className: (0, system_design_1.cn)(
            'flex-1 ',
            direction === 'column'
              ? 'group-hover:px-4 transition-all duration-300 ease-out'
              : ''
          ),
          children: [
            (0, jsx_runtime_1.jsx)(system_design_1.Text, {
              color: '#1B1C1D',
              className: '!text-xl font-semibold mb-1 line-clamp-2',
              lineClamp: 2,
              children: title,
            }),
            (0, jsx_runtime_1.jsxs)(system_design_1.Text, {
              color: '#7C8388',
              className: 'text-xs sm:text-sm mb-2 sm:mb-3',
              children: [
                'by',
                (0, jsx_runtime_1.jsxs)('span', {
                  className: ' text-[#4B5053]',
                  children: [' ', author],
                }),
                ' on',
                ' ',
                (0, jsx_runtime_1.jsx)('span', {
                  className: ' text-[#4B5053]',
                  children: date,
                }),
              ],
            }),
            (0, jsx_runtime_1.jsx)(system_design_1.Text, {
              color: '#636A6E',
              className: 'text-xs sm:text-sm mb-3 sm:mb-4 pr-0 sm:pr-4',
              lineClamp: 3,
              children: description,
            }),
            (0, jsx_runtime_1.jsx)(system_design_1.Link, {
              href: href,
              className:
                'inline-flex !underline-none !no-underline hover:!underline items-center !text-[#3691C9] hover:!text-[#3691C9] font-medium text-xs sm:text-sm',
              children: (0, jsx_runtime_1.jsxs)('div', {
                className: 'flex items-center gap-1',
                children: [
                  (0, jsx_runtime_1.jsx)('span', {
                    className: 'text-[#3691C9]',
                    children: t('viewAll'),
                  }),
                  (0, jsx_runtime_1.jsx)(system_design_1.ChevronRightIcon, {
                    fill: '#1092e3',
                    className: 'w-3 h-3 sm:w-[14px] sm:h-[14px] text-[#3691C9]',
                  }),
                ],
              }),
            }),
          ],
        }),
      ],
    }),
  });
}
