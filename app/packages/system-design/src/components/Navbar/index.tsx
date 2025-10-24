'use client';

import { ChevronRight, Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';
import { cn } from '../../utils';
import { DownloadIcon } from '../Icons';
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
  const [isMegaMenuOpen, setIsMegaMenuOpen] = React.useState(false);
  const [activeMegaMenuItem, setActiveMegaMenuItem] =
    React.useState<NavItem | null>(null);
  const [activeLeftItem, setActiveLeftItem] = React.useState<NavItem | null>(
    null
  );
  const [hoverTimeout, setHoverTimeout] = React.useState<NodeJS.Timeout | null>(
    null
  );
  const pathname = usePathname();
  const router = useRouter();

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

  const handleMegaMenuEnter = (item: NavItem) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    if (item.children && item.children.length > 0) {
      setActiveMegaMenuItem(item);
      setActiveLeftItem(item.children[0]); // Set first child as default active
      setIsMegaMenuOpen(true);
    }
  };

  const handleMegaMenuLeave = () => {
    const timeout = setTimeout(() => {
      setIsMegaMenuOpen(false);
      setActiveMegaMenuItem(null);
      setActiveLeftItem(null);
    }, 150); // 150ms delay
    setHoverTimeout(timeout);
  };

  const handleMegaMenuMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
  };

  const navItems = items.length > 0 ? items : [];

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, [hoverTimeout]);

  return (
    <nav
      className={cn(
        'bg-white relative shadow-sm border-b border-gray-200',
        className
      )}
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
                  <div className='relative group'>
                    <button
                      className={cn(
                        'px-2 py-2 text-sm font-medium transition-all duration-300 ease-in-out flex items-center gap-1 cursor-pointer rounded-md',
                        isActive(item.href)
                          ? 'text-[#3691C9]'
                          : activeMegaMenuItem?.label === item.label
                            ? 'text-[#3691C9] bg-blue-50'
                            : 'text-[#4B5053] hover:text-[#3691C9] hover:bg-gray-50'
                      )}
                      onMouseEnter={() => handleMegaMenuEnter(item)}
                      onMouseLeave={handleMegaMenuLeave}
                      onClick={() => {
                        handleDropdownToggle(item.label);
                        // Navigate to link if no children or children is empty
                        if (!item.children || item.children.length === 0) {
                          router.push(item.href);
                        }
                      }}
                    >
                      {item.label}
                      {item.children && item.children.length > 0 && (
                        <ChevronRight
                          className={cn(
                            'h-4 w-4 transition-transform duration-200',
                            activeMegaMenuItem?.label === item.label
                              ? 'rotate-0'
                              : 'rotate-90'
                          )}
                        />
                      )}
                    </button>

                    {/* Active indicator with animation */}
                    <span
                      className={cn(
                        'absolute bottom-0 left-0 h-0.5 bg-[#3691C9] transition-all duration-300 ease-in-out',
                        isActive(item.href) ? 'w-full' : 'w-0'
                      )}
                    />
                  </div>

                  {/* Separator */}
                  {index < navItems.length - 1 && (
                    <div className='w-px h-4 bg-gray-300 ml-3' />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Download Catalogue Button */}
          <div className='hidden md:flex items-center'>
            <button className='flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#3691C9] hover:text-[#2a7bb8] transition-colors duration-200 cursor-pointer'>
              <DownloadIcon width={24} height={24} />
              Download Catalogue
            </button>
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

      {/* Fixed Mega Menu */}
      <div
        className={cn(
          'absolute top-full left-0 right-0 bg-white shadow-sm z-50 transition-all duration-300',
          'w-full max-w-[1340px] mx-auto',
          isMegaMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        )}
        onMouseEnter={handleMegaMenuMouseEnter}
        onMouseLeave={handleMegaMenuLeave}
      >
        {/* Orange top border */}
        <div className='h-1 bg-orange-300'></div>

        <div className='p-6'>
          <div className='flex gap-8'>
            {/* Left Sidebar - Categories */}
            <div className='w-64 space-y-4'>
              <div className='flex items-center gap-2'>
                <h3 className='text-sm font-semibold text-blue-600'>
                  {activeMegaMenuItem?.label || 'Menu'}
                </h3>
                <ChevronRight className='h-4 w-4 text-blue-600' />
              </div>

              <div className='space-y-2'>
                {activeMegaMenuItem?.children?.map(child => (
                  <Link
                    key={child.label}
                    href={child.href}
                    className={cn(
                      'flex items-center gap-2 py-2 rounded-md cursor-pointer transition-colors duration-200',
                      activeLeftItem?.label === child.label
                        ? 'bg-blue-50 text-blue-600'
                        : 'hover:bg-gray-50 text-gray-700'
                    )}
                    onMouseEnter={() => setActiveLeftItem(child)}
                  >
                    <ChevronRight
                      className={cn(
                        'h-4 w-4',
                        activeLeftItem?.label === child.label
                          ? 'text-blue-600'
                          : 'text-gray-600'
                      )}
                    />
                    <span className='text-sm'>{child.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Section - Dynamic Content */}
            <div className='flex-1'>
              {activeMegaMenuItem?.label === 'Sản phẩm' && activeLeftItem && (
                <div className='space-y-4'>
                  <h3 className='text-lg font-semibold text-gray-800'>
                    {activeLeftItem.label}
                  </h3>
                  {/* Dynamic content based on activeLeftItem */}
                  {activeLeftItem.label === 'Thiết bị' && (
                    <div className='grid grid-cols-3 gap-6'>
                      <div className='space-y-3'>
                        <h4 className='text-sm font-bold text-gray-800'>
                          Máy PCR
                        </h4>
                        <div className='space-y-2'>
                          <div className='text-xs text-gray-600'>
                            Máy PCR Real-time
                          </div>
                          <div className='text-xs text-gray-600'>
                            Máy PCR Gradient
                          </div>
                          <div className='text-xs text-gray-600'>
                            Máy PCR Multiplex
                          </div>
                        </div>
                      </div>
                      <div className='space-y-3'>
                        <h4 className='text-sm font-bold text-gray-800'>
                          Máy ly tâm
                        </h4>
                        <div className='space-y-2'>
                          <div className='text-xs text-gray-600'>
                            Máy ly tâm mini
                          </div>
                          <div className='text-xs text-gray-600'>
                            Máy ly tâm tốc độ cao
                          </div>
                          <div className='text-xs text-gray-600'>
                            Máy ly tâm lạnh
                          </div>
                        </div>
                      </div>
                      <div className='space-y-3'>
                        <h4 className='text-sm font-bold text-gray-800'>
                          Máy khác
                        </h4>
                        <div className='space-y-2'>
                          <div className='text-xs text-gray-600'>
                            Máy vortex
                          </div>
                          <div className='text-xs text-gray-600'>
                            Máy pipette
                          </div>
                          <div className='text-xs text-gray-600'>
                            Máy đo quang
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeLeftItem.label === 'Kit test PCR' && (
                    <div className='grid grid-cols-4 gap-4'>
                      <div className='space-y-3'>
                        <h4 className='text-sm font-bold text-gray-800'>
                          Kit COVID-19
                        </h4>
                        <div className='space-y-2'>
                          <div className='text-xs text-gray-600'>
                            Kit test nhanh
                          </div>
                          <div className='text-xs text-gray-600'>
                            Kit RT-PCR
                          </div>
                          <div className='text-xs text-gray-600'>
                            Kit antigen
                          </div>
                        </div>
                      </div>
                      <div className='space-y-3'>
                        <h4 className='text-sm font-bold text-gray-800'>
                          Kit cúm
                        </h4>
                        <div className='space-y-2'>
                          <div className='text-xs text-gray-600'>
                            Kit cúm A/B
                          </div>
                          <div className='text-xs text-gray-600'>
                            Kit cúm H1N1
                          </div>
                          <div className='text-xs text-gray-600'>
                            Kit cúm H5N1
                          </div>
                        </div>
                      </div>
                      <div className='space-y-3'>
                        <h4 className='text-sm font-bold text-gray-800'>
                          Kit vi khuẩn
                        </h4>
                        <div className='space-y-2'>
                          <div className='text-xs text-gray-600'>
                            Kit E.coli
                          </div>
                          <div className='text-xs text-gray-600'>
                            Kit Salmonella
                          </div>
                          <div className='text-xs text-gray-600'>
                            Kit Listeria
                          </div>
                        </div>
                      </div>
                      <div className='space-y-3'>
                        <h4 className='text-sm font-bold text-gray-800'>
                          Kit khác
                        </h4>
                        <div className='space-y-2'>
                          <div className='text-xs text-gray-600'>Kit HPV</div>
                          <div className='text-xs text-gray-600'>Kit HIV</div>
                          <div className='text-xs text-gray-600'>Kit HBV</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Default content for other items */}
                  {!['Thiết bị', 'Kit test PCR'].includes(
                    activeLeftItem.label
                  ) && (
                    <div className='space-y-4'>
                      <div className='grid grid-cols-2 gap-6'>
                        <div className='space-y-3'>
                          <h4 className='text-sm font-medium text-gray-700'>
                            Sản phẩm chính
                          </h4>
                          <div className='space-y-2'>
                            <div className='text-xs text-gray-600'>
                              Sản phẩm 1
                            </div>
                            <div className='text-xs text-gray-600'>
                              Sản phẩm 2
                            </div>
                            <div className='text-xs text-gray-600'>
                              Sản phẩm 3
                            </div>
                          </div>
                        </div>
                        <div className='space-y-3'>
                          <h4 className='text-sm font-medium text-gray-700'>
                            Xem thêm
                          </h4>
                          <div className='space-y-2'>
                            <div className='text-xs text-gray-600'>
                              Sản phẩm 4
                            </div>
                            <div className='text-xs text-gray-600'>
                              Sản phẩm 5
                            </div>
                            <div className='text-xs text-gray-600'>
                              Sản phẩm 6
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Default content for other menu items */}
              {activeMegaMenuItem?.label !== 'Sản phẩm' && activeLeftItem && (
                <div className='space-y-4'>
                  <h3 className='text-lg font-semibold text-gray-800'>
                    {activeLeftItem.label}
                  </h3>
                  <div className='grid grid-cols-2 gap-6'>
                    <div className='space-y-3'>
                      <h4 className='text-sm font-medium text-gray-700'>
                        Thông tin chính
                      </h4>
                      <div className='space-y-2'>
                        <div className='text-xs text-gray-600'>Chi tiết 1</div>
                        <div className='text-xs text-gray-600'>Chi tiết 2</div>
                        <div className='text-xs text-gray-600'>Chi tiết 3</div>
                      </div>
                    </div>
                    <div className='space-y-3'>
                      <h4 className='text-sm font-medium text-gray-700'>
                        Xem thêm
                      </h4>
                      <div className='space-y-2'>
                        <div className='text-xs text-gray-600'>
                          Thông tin bổ sung
                        </div>
                        <div className='text-xs text-gray-600'>Liên hệ</div>
                        <div className='text-xs text-gray-600'>Hỗ trợ</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

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
              <div>
                <button
                  className={cn(
                    'px-3 py-2 text-base font-medium w-full text-left flex items-center justify-between transition-all duration-300 ease-in-out rounded-md cursor-pointer',
                    isActive(item.href)
                      ? 'text-blue-600 bg-blue-50 shadow-sm'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  )}
                  onClick={() => {
                    handleDropdownToggle(item.label);
                    // Navigate to link if no children or children is empty
                    if (!item.children || item.children.length === 0) {
                      router.push(item.href);
                      setIsMobileMenuOpen(false);
                    }
                  }}
                >
                  {item.label}
                  {item.children && item.children.length > 0 && (
                    <ChevronRight
                      className={cn(
                        'h-5 w-5 rotate-90 transition-transform duration-200',
                        activeDropdown === item.label ? 'rotate-[270deg]' : ''
                      )}
                    />
                  )}
                </button>

                {/* Active indicator with animation */}
                <span
                  className={cn(
                    'absolute left-0 top-0 bottom-0 w-1 bg-blue-600 transition-all duration-300 ease-in-out rounded-r-md',
                    isActive(item.href) ? 'opacity-100' : 'opacity-0'
                  )}
                />

                {/* Mobile Dropdown */}
                {item.children && item.children.length > 0 && (
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
                )}
              </div>
            </div>
          ))}

          {/* Mobile Download Catalogue Button */}
          <div className='px-3 py-2 border-t border-gray-200'>
            <button className='w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-[#3691C9] hover:text-[#2a7bb8] transition-colors duration-200'>
              <DownloadIcon width={16} height={16} />
              Download Catalogue
            </button>
          </div>

          {/* Mobile Language Switcher */}
          <div className='px-3 py-2 border-t border-gray-200'>
            <LanguageSwitcher variant='default' />
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
