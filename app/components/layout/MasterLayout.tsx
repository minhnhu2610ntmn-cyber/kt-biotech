'use client';

import {
  Breadcrumb,
  BreadcrumbProvider,
  Navbar,
} from '@ktbiotech/system-design';
import React, { createContext, useContext } from 'react';
import type { CatalogueEntry } from '../../config/api';
import { NavbarConfig, useNavbarConfig } from '../../hooks';
import type { ProductCategory } from '../../types/strapi';
import FloatingButtons from '../containers/FloatingButtons';
import Footer from '../containers/Footer';
import LocaleSwitcher from '../containers/LocaleSwitcher';
import Topbar from '../containers/Topbar';

// Create context for product categories
interface ProductCategoriesContextType {
  productCategories: ProductCategory[];
}

const ProductCategoriesContext = createContext<
  ProductCategoriesContextType | undefined
>(undefined);

export function useProductCategories() {
  const context = useContext(ProductCategoriesContext);
  return context?.productCategories || [];
}

interface MasterLayoutProps {
  children: React.ReactNode;
  className?: string;
  navbarConfig?: NavbarConfig;
  productCategories?: ProductCategory[];
  products?: any;
  global?: any;
  catalogue?: CatalogueEntry | null;
}

export default function MasterLayout({
  children,
  navbarConfig,
  productCategories = [],
  products,
  global: _global,
  catalogue,
}: MasterLayoutProps) {
  const config = useNavbarConfig({
    ...navbarConfig,
    productCategories,
  });

  return (
    <ProductCategoriesContext.Provider value={{ productCategories }}>
      <BreadcrumbProvider>
        {/* Topbar */}
        <Topbar />

        {/* Navbar */}
        <Navbar
          logo='/logo.png'
          logoAlt='KTBioTech Logo'
          items={config.items}
          showSearch={config.showSearch}
          searchPlaceholder={config.searchPlaceholder}
          onSearch={config.onSearch}
          productCategories={productCategories}
          products={products}
          catalogueDownload={
            catalogue?.downloadUrl
              ? {
                  url: catalogue.downloadUrl,
                  fileName: catalogue.fileName,
                  label: catalogue.title,
                }
              : null
          }
          languageSwitcher={<LocaleSwitcher variant='compact' />}
        />

        {/* Breadcrumb */}
        <Breadcrumb />

        {/* Main Content */}
        <main className='flex-1'>{children}</main>

        {/* Footer */}
        <Footer productCategories={productCategories} />

        {/* Floating Buttons */}
        <FloatingButtons />
      </BreadcrumbProvider>
    </ProductCategoriesContext.Provider>
  );
}
