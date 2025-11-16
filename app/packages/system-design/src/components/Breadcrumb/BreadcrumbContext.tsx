'use client';

import * as React from 'react';
import type { BreadcrumbItem } from './index';

interface BreadcrumbContextType {
  items: BreadcrumbItem[] | null;
  setItems: (items: BreadcrumbItem[] | null) => void;
}

const BreadcrumbContext = React.createContext<
  BreadcrumbContextType | undefined
>(undefined);

export function BreadcrumbProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = React.useState<BreadcrumbItem[] | null>(null);

  return (
    <BreadcrumbContext.Provider value={{ items, setItems }}>
      {children}
    </BreadcrumbContext.Provider>
  );
}

export function useBreadcrumb() {
  const context = React.useContext(BreadcrumbContext);
  if (!context) {
    return { items: null, setItems: () => {} };
  }
  return context;
}
