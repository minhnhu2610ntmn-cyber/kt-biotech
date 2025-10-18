'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Search, Phone, MapPin } from 'lucide-react';
import { Input } from '../Input';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { cn } from '../../utils';
import { useTranslations, useLocale } from 'next-intl';

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
  hotlineNumber?: string;
  hotlineLabel?: string;
  address?: string;
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
  hotlineNumber = '(+84) 28.3761.2606',
  hotlineLabel = 'Hotline',
  address = 'Số 10-12, đường số 3, KDC Gia Hòa, Phường Phong Phú, tp Hồ Chí Minh',
}: NavbarProps) {
  const t = useTranslations('navbar');
  const locale = useLocale();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);
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
    { label: t('about'), href: '/about' },
    { label: t('products'), href: '/products' },
    { label: t('news'), href: '/blogs' },
    { label: t('research'), href: '/research' },
    { label: t('careers'), href: '/careers' },
    { label: t('contact'), href: '/contact' },
  ];

  const navItems = items.length > 0 ? items : defaultItems;

  return (
    <nav className={cn('bg-white shadow-sm border-b border-gray-200', className)}>
      {/* Top Row - Logo, Search, Hotline, Language */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <Image
                  src={logoPath}
                  alt={logoAlt}
                  width={logoWidth}
                  height={logoHeight}
                  className="h-8 w-auto"
                  priority
                />
              </Link>
            </div>

            {/* Search Bar */}
            {showSearch && (
              <div className="flex-1 max-w-md mx-8">
                <div className="relative">
                  <input
                    type="text"
                    placeholder={t('searchPlaceholder')}
                    className="w-full px-4 py-2 pr-10 bg-gray-100 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onChange={(e) => onSearch?.(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                  >
                    <Search className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Hotline */}
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <Phone className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="font-medium">{t('hotline')}</div>
                <div className="text-xs">{hotlineNumber}</div>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <MapPin className="h-4 w-4 text-white" />
              </div>
              <div className="max-w-[150px]">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs leading-tight line-clamp-2 cursor-pointer text-gray-700 hover:text-gray-900 transition-colors duration-200"
                  title={`Mở trên Google Maps: ${address}`}
                >
                  {address}
                </a>
              </div>
            </div>

            {/* Language Switcher */}
            <LanguageSwitcher variant="compact" />
          </div>
        </div>
      </div>

      {/* Bottom Row - Navigation Menu */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-14">

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <div key={item.label} className="relative">
                  {item.children ? (
                    <div className="relative group">
                      <button
                        className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center gap-1"
                        onClick={() => handleDropdownToggle(item.label)}
                      >
                        {item.label}
                        <ChevronDown className="h-4 w-4" />
                      </button>
                      
                      {/* Dropdown Menu */}
                      <div className={cn(
                        'absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50',
                        activeDropdown === item.label ? 'block' : 'hidden'
                      )}>
                        <div className="py-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-200"
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
                        "relative px-3 py-2 text-sm font-medium transition-all duration-300 ease-in-out",
                        isActive(item.href)
                          ? "text-blue-600"
                          : "text-gray-700 hover:text-blue-600"
                      )}
                    >
                      {item.label}
                      {/* Active indicator with animation */}
                      <span
                        className={cn(
                          "absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-300 ease-in-out",
                          isActive(item.href) ? "w-full" : "w-0"
                        )}
                      />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden absolute right-4">
            <button
              onClick={handleMobileMenuToggle}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">Mở menu chính</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={cn('md:hidden', isMobileMenuOpen ? 'block' : 'hidden')}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
          {/* Mobile Search */}
          {showSearch && (
            <div className="px-3 py-2">
              <div className="relative">
                <Input
                  placeholder={searchPlaceholder}
                  className="pr-10"
                  onChange={(e) => onSearch?.(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Mobile Hotline */}
          <div className="px-3 py-2 border-b border-gray-200">
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-gray-600" />
              <div className="text-gray-700">
                <div className="font-medium">{t('hotline')}</div>
                <div className="text-xs">{hotlineNumber}</div>
              </div>
            </div>
          </div>

          {/* Mobile Address */}
          <div className="px-3 py-2 border-b border-gray-200">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-gray-600" />
              <div className="text-gray-700 max-w-[150px]">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs leading-tight line-clamp-2 cursor-pointer text-gray-700 hover:text-blue-600 transition-colors duration-200"
                  title={`Mở trên Google Maps: ${address}`}
                >
                  {address}
                </a>
              </div>
            </div>
          </div>
          {navItems.map((item) => (
            <div key={item.label}>
              {item.children ? (
                <div>
                  <button
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium w-full text-left flex items-center justify-between"
                    onClick={() => handleDropdownToggle(item.label)}
                  >
                    {item.label}
                    <ChevronDown className={cn(
                      'h-4 w-4 transition-transform duration-200',
                      activeDropdown === item.label ? 'rotate-180' : ''
                    )} />
                  </button>
                  
                  {/* Mobile Dropdown */}
                  <div className={cn(
                    'pl-4 space-y-1',
                    activeDropdown === item.label ? 'block' : 'hidden'
                  )}>
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-sm font-medium"
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
                    "relative block px-3 py-2 text-base font-medium transition-all duration-300 ease-in-out rounded-md",
                    isActive(item.href)
                      ? "text-blue-600 bg-blue-50 shadow-sm"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                  {/* Active indicator with animation */}
                  <span
                    className={cn(
                      "absolute left-0 top-0 bottom-0 w-1 bg-blue-600 transition-all duration-300 ease-in-out rounded-r-md",
                      isActive(item.href) ? "opacity-100" : "opacity-0"
                    )}
                  />
                </Link>
              )}
            </div>
          ))}
          
          {/* Mobile Language Switcher */}
          <div className="px-3 py-2 border-t border-gray-200">
            <LanguageSwitcher variant="default" />
          </div>

          {/* Mobile Right Content */}
          {rightContent && (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="px-3">
                {rightContent}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
