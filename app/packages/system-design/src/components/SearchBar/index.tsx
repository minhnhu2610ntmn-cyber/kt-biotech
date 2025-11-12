'use client';

import { ChevronDown, Search } from 'lucide-react';
import * as React from 'react';
import { cn } from '../../utils';

export interface SearchBarProps {
  placeholder?: string;
  categoryOptions?: { value: string; label: string }[];
  defaultCategory?: string;
  onSearch?: (query: string, category?: string) => void;
  onQueryChange?: (query: string) => void;
  onCategoryChange?: (category: string) => void;
  className?: string;
  value?: string;
}

export function SearchBar({
  placeholder = 'search here...',
  categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'products', label: 'Products' },
    { value: 'news', label: 'News' },
    { value: 'research', label: 'Research' },
  ],
  defaultCategory = 'all',
  onSearch,
  onQueryChange,
  onCategoryChange,
  className,
  value,
}: SearchBarProps) {
  const [query, setQuery] = React.useState(value ?? '');
  const [selectedCategory, setSelectedCategory] =
    React.useState(defaultCategory);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [isRippling, setIsRippling] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Sync external value
  React.useEffect(() => {
    if (typeof value === 'string' && value !== query) {
      setQuery(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleSearch = () => {
    // Trigger ripple effect
    setIsRippling(true);
    setTimeout(() => setIsRippling(false), 300);

    onSearch?.(query, selectedCategory);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
    onCategoryChange?.(category);
  };

  const selectedCategoryLabel =
    categoryOptions.find(option => option.value === selectedCategory)?.label ||
    'All Categories';

  return (
    <div className={cn('relative w-full max-w-2xl', className)}>
      <div className='flex bg-white rounded-full shadow-md border border-gray-200 overflow-visible'>
        {/* Search Input */}
        <div className='flex-1 px-4 py-[10px] rounded-l-full'>
          <input
            type='text'
            placeholder={placeholder}
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              onQueryChange?.(e.target.value);
            }}
            onKeyPress={handleKeyPress}
            className='w-full text-gray-700 placeholder-gray-400 focus:outline-none text-sm'
          />
        </div>

        {/* Vertical Separator */}
        <div className='w-px bg-gray-300 my-2' />

        {/* Category Dropdown */}
        <div className='relative' ref={dropdownRef}>
          <button
            type='button'
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className='px-4 py-[10px] text-gray-700  w-full justify-between cursor-pointer hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2 text-sm min-w-[140px]'
          >
            <span className='truncate'>{selectedCategoryLabel}</span>
            <ChevronDown
              className={cn(
                'h-4 w-4 text-gray-500 transition-transform duration-200',
                isDropdownOpen && 'rotate-180'
              )}
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className='absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-[9999] mt-1'>
              {categoryOptions.map(option => (
                <button
                  key={option.value}
                  type='button'
                  onClick={() => handleCategorySelect(option.value)}
                  className={cn(
                    'w-full px-4 py-[10px] text-left text-sm hover:bg-gray-50 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg',
                    selectedCategory === option.value &&
                      'bg-blue-50 text-blue-600'
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search Button */}
        <button
          type='button'
          onClick={handleSearch}
          className={cn(
            'bg-[#86BDDF] hover:bg-[#7BA8D1] cursor-pointer text-white px-6 py-[10px] transition-colors duration-200 flex items-center justify-center rounded-r-full relative overflow-hidden',
            isRippling && 'animate-pulse'
          )}
        >
          {/* Ripple Effect */}
          {isRippling && (
            <div className='absolute inset-0 bg-white opacity-30 animate-ping rounded-r-full' />
          )}
          <Search className='h-5 w-5 relative z-10' />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
