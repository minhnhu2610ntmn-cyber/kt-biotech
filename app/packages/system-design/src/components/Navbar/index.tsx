'use client';

import { ChevronDown, Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import { cn } from '../../utils';
import { AboutIcon, HeartIcon, HelpIcon } from '../Icons';
import { Container } from '../index';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { SearchBar } from '../SearchBar';

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface NavbarProps {
  logo?: string;
  logoAlt?: string;
  logoWidth?: number;
  logoHeight?: number;
  items?: NavItem[];
  className?: string;
  onMobileMenuToggle?: (isOpen: boolean) => void;
  rightContent?: React.ReactNode;
  showSearch?: boolean;
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
}

export function Navbar({
  logo = '/logo.png',
  logoAlt = 'KTBioTech Logo',
  logoWidth = 120,
  logoHeight = 40,
  items = [],
  className,
  onMobileMenuToggle,
  rightContent,
  showSearch = true,
  searchPlaceholder = 'Tìm kiếm...',
  onSearch,
}: NavbarProps) {
  const t = useTranslations('navbar');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(
    null
  );
  const pathname = usePathname();

  // Normalize logo path for both Storybook and Next.js
  const logoPath = logo.startsWith('/') ? logo : `/${logo}`;

  // Check if a nav item is active
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const handleMobileMenuToggle = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    onMobileMenuToggle?.(newState);
  };

  const handleDropdownToggle = (itemLabel: string) => {
    setActiveDropdown(activeDropdown === itemLabel ? null : itemLabel);
  };

  const defaultItems: NavItem[] = [
    { label: t('home'), href: '/' },
    { label: t('about'), href: '/about', children: [] },
    { label: t('products'), href: '/products', children: [] },
    { label: t('services'), href: '/services', children: [] },
    { label: t('news'), href: '/blogs', children: [] },
    { label: t('contact'), href: '/contact' },
  ];

  const navItems = items.length > 0 ? items : defaultItems;

  return (
    <nav
      className={cn('bg-white shadow-sm border-b border-gray-200', className)}
    >
      {/* Top Row - Logo, Search, Hotline, Language */}
      <div className='bg-gray-50 border-b border-gray-200'>
        <Container>
          <div className='flex justify-between items-center  py-2.5'>
            {/* Logo */}
            <div className='flex-shrink-0'>
              <Link href='/' className='flex items-center'>
                <Image
                  src={logoPath}
                  alt={logoAlt}
                  width={logoWidth}
                  height={logoHeight}
                  className='h-8 w-auto'
                  priority
                />
              </Link>
            </div>

            {/* Search Bar */}
            {showSearch && (
              <div className='flex-1 max-w-2xl mx-8 overflow-visible'>
                <SearchBar
                  placeholder={t('searchPlaceholder')}
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  onSearch={(query, category) => onSearch?.(query)}
                  className='w-full'
                  categoryOptions={[
                    { value: 'all', label: 'All Categories' },
                    { value: 'products', label: 'Products' },
                    { value: 'news', label: 'News' },
                    { value: 'services', label: 'Services' },
                  ]}
                />
              </div>
            )}

            {/* Language Switcher */}
            <LanguageSwitcher variant='compact' />
          </div>
        </Container>
      </div>

      {/* Bottom Row - Navigation Menu */}
      <Container>
        <div className='flex justify-between items-center h-14 py-2.5'>
          {/* Desktop Navigation */}
          <div className='hidden md:block'>
            <div className='flex items-center space-x-6'>
              {navItems.map((item, index) => (
                <div key={item.label} className='relative flex items-center'>
                  {item.children ? (
                    <div className='relative group'>
                      <button
                        className='text-[#4B5053] hover:text-[#3691C9] px-2 py-2 text-sm font-medium transition-colors duration-200 flex items-center gap-1'
                        onClick={() => handleDropdownToggle(item.label)}
                      >
                        {item.label}
                        <ChevronDown className='h-3 w-3' />
                      </button>

                      {/* Dropdown Menu */}
                      <div
                        className={cn(
                          'absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50',
                          activeDropdown === item.label ? 'block' : 'hidden'
                        )}
                      >
                        <div className='py-1'>
                          {item.children.map(child => (
                            <Link
                              key={child.label}
                              href={child.href}
                              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-200'
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        'relative px-2 py-2 text-sm font-medium transition-all duration-300 ease-in-out',
                        isActive(item.href)
                          ? 'text-[#3691C9]'
                          : 'text-[#4B5053] hover:text-[#3691C9]'
                      )}
                    >
                      {item.label}
                      {/* Active indicator with animation */}
                      <span
                        className={cn(
                          'absolute bottom-0 left-0 h-0.5 bg-[#3691C9] transition-all duration-300 ease-in-out',
                          isActive(item.href) ? 'w-full' : 'w-0'
                        )}
                      />
                    </Link>
                  )}

                  {/* Separator */}
                  {index < navItems.length - 1 && (
                    <div className='w-px h-4 bg-gray-300 ml-3' />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Utility Links */}
          <div className='hidden md:flex items-center space-x-4'>
            <Link
              href='/blog'
              className='flex items-center gap-2 text-sm text-[#4B5053] hover:text-[#3691C9] transition-colors duration-200'
            >
              <HeartIcon width={16} height={16} className='text-[#86BDDF]' />
              {t('blog')}
            </Link>
            <Link
              href='/about-us'
              className='flex items-center gap-2 text-sm text-[#4B5053] hover:text-[#3691C9] transition-colors duration-200'
            >
              <AboutIcon width={16} height={16} className='text-[#86BDDF]' />
              {t('aboutUs')}
            </Link>
            <Link
              href='/help'
              className='flex items-center gap-2 text-sm text-[#4B5053] hover:text-[#3691C9] transition-colors duration-200'
            >
              <HelpIcon width={16} height={16} className='text-[#86BDDF]' />
              {t('helpCenter')}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden'>
            <button
              onClick={handleMobileMenuToggle}
              className='inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500'
              aria-expanded={isMobileMenuOpen}
            >
              <span className='sr-only'>Mở menu chính</span>
              {isMobileMenuOpen ? (
                <X className='block h-6 w-6' aria-hidden='true' />
              ) : (
                <Menu className='block h-6 w-6' aria-hidden='true' />
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Navigation */}
      <div className={cn('md:hidden', isMobileMenuOpen ? 'block' : 'hidden')}>
        <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white'>
          {/* Mobile Search */}
          {showSearch && (
            <div className='px-3 py-2'>
              <SearchBar
                placeholder={searchPlaceholder}
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                onSearch={(query, category) => onSearch?.(query)}
                className='w-full'
              />
            </div>
          )}

          {navItems.map(item => (
            <div key={item.label}>
              {item.children ? (
                <div>
                  <button
                    className='text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium w-full text-left flex items-center justify-between'
                    onClick={() => handleDropdownToggle(item.label)}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 transition-transform duration-200',
                        activeDropdown === item.label ? 'rotate-180' : ''
                      )}
                    />
                  </button>

                  {/* Mobile Dropdown */}
                  <div
                    className={cn(
                      'pl-4 space-y-1',
                      activeDropdown === item.label ? 'block' : 'hidden'
                    )}
                  >
                    {item.children.map(child => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className='text-gray-600 hover:text-blue-600 block px-3 py-2 text-sm font-medium'
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    'relative block px-3 py-2 text-base font-medium transition-all duration-300 ease-in-out rounded-md',
                    isActive(item.href)
                      ? 'text-blue-600 bg-blue-50 shadow-sm'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                  {/* Active indicator with animation */}
                  <span
                    className={cn(
                      'absolute left-0 top-0 bottom-0 w-1 bg-blue-600 transition-all duration-300 ease-in-out rounded-r-md',
                      isActive(item.href) ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </Link>
              )}
            </div>
          ))}

          {/* Mobile Language Switcher */}
          <div className='px-3 py-2 border-t border-gray-200'>
            <LanguageSwitcher variant='default' />
          </div>

          {/* Mobile Utility Links */}
          <div className='px-3 py-2 border-t border-gray-200 space-y-2'>
            <Link
              href='/blog'
              className='flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 transition-colors duration-200'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <HeartIcon width={16} height={16} className='text-[#86BDDF]' />
              {t('blog')}
            </Link>
            <Link
              href='/about-us'
              className='flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 transition-colors duration-200'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <AboutIcon width={16} height={16} className='text-[#86BDDF]' />
              {t('aboutUs')}
            </Link>
            <Link
              href='/help'
              className='flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 transition-colors duration-200'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <HelpIcon width={16} height={16} className='text-[#86BDDF]' />
              {t('helpCenter')}
            </Link>
          </div>

          {/* Mobile Right Content */}
          {rightContent && (
            <div className='pt-4 pb-3 border-t border-gray-200'>
              <div className='px-3'>{rightContent}</div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
