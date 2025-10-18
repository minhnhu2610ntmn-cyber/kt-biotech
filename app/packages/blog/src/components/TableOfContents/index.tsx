'use client';

import { Button, Heading } from '@ktbiotech/system-design';
import { useScrollSpy, useSmoothScroll } from '../../hooks/useScrollSpy';
import { TocItem } from '../../utils/blogUtils';

interface TableOfContentsProps {
  items: TocItem[];
  className?: string;
}

export default function TableOfContents({
  items,
  className = '',
}: TableOfContentsProps) {
  const sectionIds = items.flatMap(item => [
    item.id,
    ...(item.children?.map(child => child.id) || []),
  ]);

  const activeId = useScrollSpy(sectionIds);
  const { scrollToSection } = useSmoothScroll();

  if (items.length === 0) {
    return null;
  }

  const renderTocItem = (item: TocItem, isChild = false) => {
    const isActive = activeId === item.id;

    return (
      <li key={item.id} className={isChild ? 'ml-4' : ''}>
        <Button
          onClick={() => scrollToSection(item.id)}
          className={`
            block w-full text-left text-sm py-1 px-2 rounded-md transition-all duration-200
            ${
              isActive
                ? 'text-blue-600 bg-blue-50 border-l-2 border-blue-600 font-medium'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }
            ${isChild ? 'text-xs' : 'font-medium'}
          `}
        >
          {item.text}
        </Button>

        {item.children && item.children.length > 0 && (
          <ul className='mt-1 space-y-1'>
            {item.children.map(child => renderTocItem(child, true))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 p-4 ${className}`}
    >
      <Heading
        level={3}
        className='text-sm font-semibold text-gray-900 mb-3 border-b border-gray-100 pb-2'
      >
        Table of Contents
      </Heading>

      <nav className='space-y-1'>
        <ul className='space-y-1'>{items.map(item => renderTocItem(item))}</ul>
      </nav>

      {/* Progress indicator */}
      <div className='mt-4 pt-3 border-t border-gray-100'>
        <div className='text-xs text-gray-500'>
          {activeId ? 'Reading...' : 'Scroll to start'}
        </div>
      </div>
    </div>
  );
}
