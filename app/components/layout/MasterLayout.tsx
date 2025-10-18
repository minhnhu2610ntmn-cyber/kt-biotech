'use client';

import { Navbar } from '@ktbiotech/system-design';
import React from 'react';
import { NavbarConfig, useNavbarConfig } from '../../hooks';
import Footer from '../containers/Footer';

interface MasterLayoutProps {
  children: React.ReactNode;
  className?: string;
  navbarConfig?: NavbarConfig;
}

export default function MasterLayout({
  children,
  navbarConfig,
}: MasterLayoutProps) {
  const config = useNavbarConfig(navbarConfig);

  return (
    <>
      {/* Navbar */}
      <Navbar
        logo='/logo.png'
        logoAlt='KTBioTech Logo'
        items={config.items}
        showSearch={config.showSearch}
        searchPlaceholder={config.searchPlaceholder}
        onSearch={config.onSearch}
        hotlineNumber={config.hotlineNumber}
        hotlineLabel={config.hotlineLabel}
        address={config.address}
      />

      {/* Main Content */}
      <main className='flex-1'>{children}</main>

      {/* Footer */}
      <Footer />
    </>
  );
}
