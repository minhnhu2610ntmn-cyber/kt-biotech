'use client';

import { ChevronRight, Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';
import { ABOUT_URL } from '../../../../../config/constants';
import type { ProductCategory } from '../../types';
import { cn } from '../../utils';
import { DownloadIcon } from '../Icons';
import { Container } from '../index';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { SearchBar } from '../SearchBar';

export interface NavItem {
  label: string;
  href: string;
  /**
   * Optional i18n key for this item.
   * If provided, UI will render t(`navbar.items.${i18nKey}`) instead of raw label.
   */
  i18nKey?: string;
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
  productCategories?: ProductCategory[];
  products?: any;
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
  productCategories = [],
  products: productsTree, // categories-products data (optional)
}: NavbarProps) {
  const t = useTranslations('navbar');

  // Transform product categories to category options
  const categoryOptions = React.useMemo(() => {
    const options = productCategories.map((category: ProductCategory) => ({
      value: `product-${category.slug || category.id}`,
      label: category.name,
    }));

    return [{ value: 'all', label: t('all') }, ...options];
  }, [productCategories, t]);

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
  const [nestedDropdownTimeout, setNestedDropdownTimeout] =
    React.useState<NodeJS.Timeout | null>(null);
  const [nestedDropdownOpen, setNestedDropdownOpen] = React.useState<
    string | null
  >(null);
  const pathname = usePathname();
  const router = useRouter();

  const closeMegaMenu = React.useCallback(() => {
    setIsMegaMenuOpen(false);
    setActiveMegaMenuItem(null);
    setActiveLeftItem(null);
    setNestedDropdownOpen(null);
  }, []);

  // Helper: determine "Products" item regardless of language
  const isProductsItem = React.useCallback(
    (item: NavItem | null | undefined) => {
      if (!item) return false;
      const raw = (item.label || '').toLowerCase().trim();
      return (
        item.i18nKey === 'products' || raw === 'sản phẩm' || raw === 'products'
      );
    },
    []
  );

  // Helpers to work with "categories-products" response
  const getAllProductsArray = React.useCallback((): any[] => {
    // Try common shapes: { data: [...] }, array, { products: [...] }
    if (!productsTree) return [];
    if (Array.isArray(productsTree)) return productsTree;
    if (Array.isArray(productsTree?.data)) return productsTree.data;
    if (Array.isArray(productsTree?.products)) return productsTree.products;
    return [];
  }, [productsTree]);

  const findCategoryBySlug = React.useCallback(
    (slug?: string | null) => {
      if (!slug) return null;
      const all = getAllProductsArray();
      return all.find((c: any) => c?.slug === slug) || null;
    },
    [getAllProductsArray]
  );

  // Normalize logo path for both Storybook and Next.js
  const logoPath = logo.startsWith('/') ? logo : `/${logo}`;

  // Check if a nav item is active
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  // Resolve display label with i18n (fallback to raw label)
  const getItemLabel = React.useCallback(
    (item: NavItem) => {
      // Prefer explicit i18nKey: expects keys like 'home', 'products', ...
      if (item.i18nKey) {
        try {
          return t(item.i18nKey);
        } catch {
          return item.label;
        }
      }
      // For data from server (no i18nKey), return raw label as-is
      return item.label;
    },
    [t]
  );

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
    if (nestedDropdownTimeout) {
      clearTimeout(nestedDropdownTimeout);
      setNestedDropdownTimeout(null);
    }

    // Close any open nested dropdown first
    setNestedDropdownOpen(null);

    // Only show mega menu for Products (language-agnostic)
    if (item.children && item.children.length > 0 && isProductsItem(item)) {
      setActiveMegaMenuItem(item);
      setActiveLeftItem(item.children[0]); // Set first child as default active
      setIsMegaMenuOpen(true);
    } else if (
      item.children &&
      item.children.length > 0 &&
      !isProductsItem(item)
    ) {
      // Show nested dropdown for other items with children
      setNestedDropdownOpen(item.label);
    }
  };

  const handleMegaMenuLeave = () => {
    const timeout = setTimeout(() => {
      setIsMegaMenuOpen(false);
      setActiveMegaMenuItem(null);
      setActiveLeftItem(null);
      setNestedDropdownOpen(null); // Reset nested dropdown state
    }, 150); // 150ms delay
    setHoverTimeout(timeout);
  };

  const handleNestedDropdownEnter = (itemLabel: string) => {
    if (nestedDropdownTimeout) {
      clearTimeout(nestedDropdownTimeout);
      setNestedDropdownTimeout(null);
    }
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }

    // Close mega menu first
    setIsMegaMenuOpen(false);
    setActiveMegaMenuItem(null);
    setActiveLeftItem(null);

    setNestedDropdownOpen(itemLabel);
  };

  const handleNestedDropdownLeave = () => {
    const timeout = setTimeout(() => {
      setNestedDropdownOpen(null);
      // Also close mega menu if open
      setIsMegaMenuOpen(false);
      setActiveMegaMenuItem(null);
      setActiveLeftItem(null);
    }, 150); // 150ms delay
    setNestedDropdownTimeout(timeout);
  };

  const handleMegaMenuMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
  };

  const handleNestedDropdownMouseEnter = () => {
    if (nestedDropdownTimeout) {
      clearTimeout(nestedDropdownTimeout);
      setNestedDropdownTimeout(null);
    }
  };

  const navItems = items.length > 0 ? items : [];

  // Debounced search (materials)
  const [searchQuery, setSearchQuery] = React.useState('');
  const searchDebounceRef = React.useRef<NodeJS.Timeout | null>(null);
  const [searchResults, setSearchResults] = React.useState<any[]>([]);
  const [isResultsOpen, setIsResultsOpen] = React.useState(false);
  const desktopSearchRef = React.useRef<HTMLDivElement | null>(null);
  const mobileSearchRef = React.useRef<HTMLDivElement | null>(null);
  const handleSearchEvent = React.useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  React.useEffect(() => {
    if (!searchQuery) return;
    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }
    searchDebounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/search/materials?q=${encodeURIComponent(searchQuery)}`,
          { method: 'GET' }
        );
        if (!res.ok) return;
        const data = await res.json().catch(() => null);
        const list = (Array.isArray(data) && data) || [];
        setSearchResults(list);
        setIsResultsOpen(true);
      } catch {
        // ignore
      }
    }, 400);
    return () => {
      if (searchDebounceRef.current) {
        clearTimeout(searchDebounceRef.current);
      }
    };
  }, [searchQuery]);

  // Click outside to close results
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        desktopSearchRef.current &&
        !desktopSearchRef.current.contains(target) &&
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(target)
      ) {
        setIsResultsOpen(false);
      }
    };
    if (isResultsOpen) {
      document.addEventListener('mousedown', handler);
    }
    return () => document.removeEventListener('mousedown', handler);
  }, [isResultsOpen]);

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
      if (nestedDropdownTimeout) {
        clearTimeout(nestedDropdownTimeout);
      }
    };
  }, [hoverTimeout, nestedDropdownTimeout]);

  return (
    <>
      {/* Top Row - Logo, Search, Hotline, Language */}
      <nav
        className={cn(
          'bg-gray-50 border-b border-gray-200 sticky top-0 z-[51] lg:static',
          className
        )}
      >
        <Container className='px-4 md:px-6'>
          <div className='flex justify-between items-center py-2 md:py-2.5'>
            {/* Logo */}
            <div className='flex-shrink-0'>
              <Link href='/' className='flex items-center'>
                <Image
                  src={logoPath}
                  alt={logoAlt}
                  width={logoWidth}
                  height={logoHeight}
                  className='h-6 md:h-8 w-auto'
                  priority
                />
              </Link>
            </div>

            {/* Search Bar - Hidden on mobile */}
            {showSearch && (
              <div
                ref={desktopSearchRef}
                className='hidden relative lg:flex flex-1 max-w-2xl mx-4 lg:mx-8 overflow-visible'
              >
                <SearchBar
                  placeholder={t('searchPlaceholder')}
                  onSearch={(query /*, category */) => handleSearchEvent(query)}
                  onQueryChange={q => handleSearchEvent(q)}
                  className='w-full'
                  value={searchQuery}
                  categoryOptions={categoryOptions}
                />
                {isResultsOpen && searchResults.length > 0 && (
                  <div className='absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-[60]'>
                    <ul className='max-h-[360px] overflow-auto divide-y divide-gray-100'>
                      {searchResults.map((item: any, idx: number) => {
                        const title =
                          item.title || item.name || item.sku || 'Kết quả';
                        const slug = item.slug || '';
                        // Resolve href by type: product uses slug, page uses ABOUT_URL[id]
                        let href: string | undefined = undefined;
                        const typeInfer =
                          ((item?.type ||
                            item?.kind ||
                            item?.__type) as string) ||
                          (item?.sku || item?.images
                            ? 'product'
                            : String(item?.id || '').startsWith('page-')
                              ? 'page'
                              : 'article');
                        if (
                          String(typeInfer).toLowerCase().includes('product')
                        ) {
                          href = slug ? `/san-pham/${slug}` : undefined;
                        } else if (
                          String(typeInfer).toLowerCase().includes('page')
                        ) {
                          const pageId = String(item?.id || item?.pageId || '');
                          const mapped = (ABOUT_URL as any)[pageId];
                          href = mapped ? `/${mapped}` : undefined;
                        } else if (
                          String(typeInfer).toLowerCase().includes('article') ||
                          String(typeInfer).toLowerCase().includes('blog')
                        ) {
                          href = slug ? `/blogs/${slug}` : undefined;
                        }
                        const type =
                          ((item?.type ||
                            item?.kind ||
                            item?.__type) as string) ||
                          (item?.sku || item?.images
                            ? 'product'
                            : String(item?.id || '').startsWith('page-')
                              ? 'page'
                              : 'article');
                        const typeLabel = String(type)
                          .toLowerCase()
                          .includes('product')
                          ? 'Product'
                          : String(type).toLowerCase().includes('page')
                            ? 'Page'
                            : 'Article';
                        const typeCls =
                          typeLabel === 'Product'
                            ? 'bg-emerald-100 text-emerald-700'
                            : typeLabel === 'Page'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-blue-100 text-blue-700';
                        return (
                          <li key={idx} className='p-3 hover:bg-gray-50'>
                            {href ? (
                              <Link
                                href={href}
                                className='block text-sm text-gray-800'
                                onClick={() => {
                                  setIsResultsOpen(false);
                                  setSearchQuery('');
                                  setSearchResults([]);
                                }}
                              >
                                <span className='inline-flex items-center gap-2'>
                                  <span
                                    className={`inline-flex items-center rounded px-2 py-0.5 text-[10px] font-medium ${typeCls}`}
                                  >
                                    {typeLabel}
                                  </span>
                                  <span>{title}</span>
                                </span>
                              </Link>
                            ) : (
                              <span className='block text-sm text-gray-600'>
                                <span className='inline-flex items-center gap-2'>
                                  <span
                                    className={`inline-flex items-center rounded px-2 py-0.5 text-[10px] font-medium ${typeCls}`}
                                  >
                                    {typeLabel}
                                  </span>
                                  <span>{title}</span>
                                </span>
                              </span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Right side - Search (mobile), Language, Menu */}
            <div className='flex items-center gap-2 md:gap-4'>
              {/* Search Button (Mobile) */}
              {showSearch && (
                <button className='lg:hidden px-3 py-2 rounded-full bg-[#B0C4DE] hover:bg-[#9BB3D1] transition-colors'>
                  <svg
                    className='w-4 h-4 text-gray-700'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                    />
                  </svg>
                </button>
              )}

              {/* Language Switcher */}
              <LanguageSwitcher variant='compact' />

              {/* Mobile Menu Toggle */}
              <button
                onClick={handleMobileMenuToggle}
                className='p-2 rounded-full border block lg:hidden border-gray-300 hover:bg-gray-100 transition-colors'
                aria-label='Toggle mobile menu'
              >
                {isMobileMenuOpen ? (
                  <X className='h-4 w-4 text-gray-600' />
                ) : (
                  <Menu className='h-4 w-4 text-gray-600' />
                )}
              </button>
            </div>
          </div>
        </Container>
      </nav>

      {/* Bottom Row - Navigation Menu - Hidden on mobile - STICKY */}
      <nav className='hidden lg:block sticky top-0 z-50 bg-white  border-b border-gray-200'>
        <Container className='px-4 md:px-6'>
          <div className='flex justify-between items-center h-12 md:h-14 py-2 md:py-2.5'>
            {/* Desktop Navigation */}
            <div className='hidden md:block'>
              <div className='flex items-center space-x-6'>
                {navItems.map((item, index) => (
                  <div
                    key={item.label}
                    className='relative flex items-center'
                    onMouseEnter={() => {
                      if (isProductsItem(item)) {
                        handleMegaMenuEnter(item);
                      } else if (item.children && item.children.length > 0) {
                        handleNestedDropdownEnter(item.label);
                      }
                    }}
                    onMouseLeave={() => {
                      if (isProductsItem(item)) {
                        handleMegaMenuLeave();
                      } else if (item.children && item.children.length > 0) {
                        handleNestedDropdownLeave();
                      }
                    }}
                  >
                    <div className='relative group'>
                      <button
                        className={cn(
                          'px-2 py-2 text-sm font-medium transition-all duration-300 ease-in-out flex items-center gap-1 cursor-pointer rounded-md',
                          isActive(item.href)
                            ? 'text-[#3691C9]'
                            : activeMegaMenuItem?.label === item.label
                              ? 'text-[#3691C9] bg-blue-50'
                              : nestedDropdownOpen === item.label
                                ? 'text-[#3691C9] bg-blue-50'
                                : 'text-[#4B5053] hover:text-[#3691C9] hover:bg-gray-50'
                        )}
                        onClick={() => {
                          handleDropdownToggle(item.label);
                          // Navigate to link if no children or children is empty
                          if (!item.children || item.children.length === 0) {
                            router.push(item.href);
                          }
                        }}
                      >
                        {getItemLabel(item)}
                        {item.children && item.children.length > 0 && (
                          <ChevronRight
                            className={cn(
                              'h-4 w-4 transition-transform duration-200',
                              activeMegaMenuItem?.label === item.label
                                ? 'rotate-0'
                                : nestedDropdownOpen === item.label
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

                      {/* Nested Dropdown for non-mega menu items */}
                      {item.children &&
                        item.children.length > 0 &&
                        !isProductsItem(item) && (
                          <div
                            className={cn(
                              'absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-40 transition-all duration-200',
                              nestedDropdownOpen === item.label
                                ? 'opacity-100 visible'
                                : 'opacity-0 invisible'
                            )}
                            onMouseEnter={handleNestedDropdownMouseEnter}
                            onMouseLeave={handleNestedDropdownLeave}
                          >
                            <div className='py-2'>
                              {item.children.map(child => (
                                <Link
                                  key={child.label}
                                  href={child.href}
                                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#3691C9] transition-colors duration-200'
                                >
                                  {getItemLabel(child)}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
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
                <Link
                  href='/danh-muc-san-pham'
                  className='flex items-center gap-2 hover:opacity-80 transition-opacity'
                  onClick={closeMegaMenu}
                >
                  <h3 className='text-sm font-semibold text-blue-600'>
                    {activeMegaMenuItem
                      ? getItemLabel(activeMegaMenuItem)
                      : 'Menu'}
                  </h3>
                  <ChevronRight className='h-4 w-4 text-blue-600' />
                </Link>

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
                      <span className='text-sm'>{getItemLabel(child)}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Right Section - Dynamic Content */}
              <div className='flex-1'>
                {isProductsItem(activeMegaMenuItem) && activeLeftItem && (
                  <div className='space-y-4'>
                    {(() => {
                      const parentSlug =
                        (activeLeftItem as any).slug ||
                        (activeLeftItem.href || '').split('/').pop();
                      const cat = findCategoryBySlug(parentSlug);
                      if (!cat) {
                        return (
                          <div className='text-sm text-gray-400'>
                            Không có dữ liệu
                          </div>
                        );
                      }
                      const subcats: any[] = Array.isArray(cat.subcategories)
                        ? cat.subcategories
                        : [];
                      const parentProducts: any[] = Array.isArray(cat.products)
                        ? cat.products
                        : [];

                      if (subcats.length > 0) {
                        return (
                          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-3 items-start'>
                            {subcats.map(sc => (
                              <div key={sc.slug || sc.id} className='space-y-3'>
                                <div className='text-base px-3 font-bold text-gray-900'>
                                  {sc.name}
                                </div>
                                <div className='space-y-2'>
                                  {Array.isArray(sc.products) &&
                                  sc.products.length > 0 ? (
                                    sc.products.map((p: any, idx: number) =>
                                      p.slug ? (
                                        <Link
                                          key={`${p.slug}-${idx}`}
                                          href={`/san-pham/${p.slug}`}
                                          className='block text-sm text-gray-700 px-3 py-2 rounded hover:text-[#215778] hover:bg-gray-50 transition-colors duration-150'
                                          onClick={closeMegaMenu}
                                        >
                                          {p.title}
                                        </Link>
                                      ) : (
                                        <span
                                          key={`no-slug-${idx}`}
                                          className='block text-sm text-gray-400 px-3 py-2 rounded'
                                        >
                                          {p.title}
                                        </span>
                                      )
                                    )
                                  ) : (
                                    <div className='text-sm text-gray-400'>
                                      Không có sản phẩm
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        );
                      }

                      return (
                        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-3 items-start'>
                          <div className='space-y-3'>
                            <div className='text-base font-bold text-gray-900 px-3'>
                              {getItemLabel(activeLeftItem)}
                            </div>
                            <div className='space-y-2'>
                              {parentProducts.length > 0 ? (
                                parentProducts.map((p: any, idx: number) =>
                                  p.slug ? (
                                    <Link
                                      key={`${p.slug}-${idx}`}
                                      href={`/san-pham/${p.slug}`}
                                      className='block text-sm text-gray-700 px-3 py-2 rounded hover:text-[#215778] hover:bg-gray-50 transition-colors duration-150'
                                      onClick={closeMegaMenu}
                                    >
                                      {p.title}
                                    </Link>
                                  ) : (
                                    <span
                                      key={`no-slug-${idx}`}
                                      className='block text-sm text-gray-400 px-3 py-2 rounded'
                                    >
                                      {p.title}
                                    </span>
                                  )
                                )
                              ) : (
                                <div className='text-sm text-gray-400 px-3 py-2 rounded'>
                                  Không có sản phẩm
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className={cn('md:hidden', isMobileMenuOpen ? 'block' : 'hidden')}>
        <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white'>
          {/* Mobile Search */}
          {showSearch && (
            <div ref={mobileSearchRef} className='px-3 py-2 relative'>
              <SearchBar
                placeholder={searchPlaceholder}
                onSearch={(query /*, category */) => handleSearchEvent(query)}
                onQueryChange={q => handleSearchEvent(q)}
                className='w-full'
                value={searchQuery}
                categoryOptions={categoryOptions}
              />
              {isResultsOpen && searchResults.length > 0 && (
                <div className='absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-[60]'>
                  <ul className='max-h-[360px] overflow-auto divide-y divide-gray-100'>
                    {searchResults.map((item: any, idx: number) => {
                      const title =
                        item.title || item.name || item.sku || 'Kết quả';
                      const slug = item.slug || '';
                      let href: string | undefined = undefined;
                      const typeInfer =
                        ((item?.type ||
                          item?.kind ||
                          item?.__type) as string) ||
                        (item?.sku || item?.images
                          ? 'product'
                          : String(item?.id || '').startsWith('page-')
                            ? 'page'
                            : 'article');
                      if (String(typeInfer).toLowerCase().includes('product')) {
                        href = slug ? `/san-pham/${slug}` : undefined;
                      } else if (
                        String(typeInfer).toLowerCase().includes('page')
                      ) {
                        const pageId = String(item?.id || item?.pageId || '');
                        const mapped = (ABOUT_URL as any)[pageId];
                        href = mapped ? `/${mapped}` : undefined;
                      } else if (
                        String(typeInfer).toLowerCase().includes('article') ||
                        String(typeInfer).toLowerCase().includes('blog')
                      ) {
                        href = slug ? `/blogs/${slug}` : undefined;
                      }
                      return (
                        <li key={idx} className='p-3 hover:bg-gray-50'>
                          {href ? (
                            <Link
                              href={href}
                              className='block text-sm text-gray-800'
                              onClick={() => setIsResultsOpen(false)}
                            >
                              {title}
                            </Link>
                          ) : (
                            <span className='block text-sm text-gray-600'>
                              {title}
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
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
    </>
  );
}

export default Navbar;
