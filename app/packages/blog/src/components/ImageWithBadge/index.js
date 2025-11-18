'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = ImageWithBadge;
const jsx_runtime_1 = require('react/jsx-runtime');
const system_design_1 = require('@ktbiotech/system-design');
const image_1 = __importDefault(require('next/image'));
function ImageWithBadge({
  src,
  alt,
  width = 400,
  height = 300,
  className,
  imageClassName,
  badgeText,
  badgeBackgroundColor = '#FFD9BD',
  badgeTextColor = '#1B1C1D',
  badgeArrowColor = '#FE7B1B',
  badgeClassName,
}) {
  const getBadgePositionClasses = () => {
    return 'absolute bottom-4 -left-[12px]';
  };
  // Convert width and height to numbers for Next.js Image
  const imageWidth =
    typeof width === 'string' ? parseInt(width, 10) || 400 : width || 400;
  const imageHeight =
    typeof height === 'string' ? parseInt(height, 10) || 300 : height || 300;
  return (0, jsx_runtime_1.jsxs)('div', {
    className: (0, system_design_1.cn)('relative w-full rounded-xl', className),
    children: [
      (0, jsx_runtime_1.jsx)('div', {
        className:
          'relative w-full h-full min-h-70 sm:min-h-auto max-h-70 md:max-h-auto rounded-xl overflow-hidden',
        children: (0, jsx_runtime_1.jsx)(image_1.default, {
          src: src,
          alt: alt,
          width: imageWidth,
          height: imageHeight,
          className: (0, system_design_1.cn)(
            'w-full h-full object-cover',
            imageClassName
          ),
          sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
        }),
      }),
      (0, jsx_runtime_1.jsx)('div', {
        className: (0, system_design_1.cn)(
          getBadgePositionClasses(),
          badgeClassName
        ),
        children: (0, jsx_runtime_1.jsx)(system_design_1.Badge, {
          backgroundColor: badgeBackgroundColor,
          textColor: badgeTextColor,
          arrowColor: badgeArrowColor,
          children: badgeText,
        }),
      }),
    ],
  });
}
