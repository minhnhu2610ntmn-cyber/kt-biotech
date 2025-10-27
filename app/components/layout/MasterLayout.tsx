'use client';

import { Navbar } from '@ktbiotech/system-design';
import React, { createContext, useContext } from 'react';
import { NavbarConfig, useNavbarConfig } from '../../hooks';
import type { ProductCategory } from '../../types/strapi';
import Footer from '../containers/Footer';
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
}

export default function MasterLayout({
  children,
  navbarConfig,
  productCategories = [],
}: MasterLayoutProps) {
  const config = useNavbarConfig({
    ...navbarConfig,
    productCategories,
  });

  return (
    <ProductCategoriesContext.Provider value={{ productCategories }}>
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
      />

      {/* Main Content */}
      <main className='flex-1'>{children}</main>

      {/* Footer */}
      <Footer />
    </ProductCategoriesContext.Provider>
  );
}
