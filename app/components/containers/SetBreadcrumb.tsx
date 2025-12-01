'use client';

import type { BreadcrumbItem } from '@ktbiotech/system-design';
import { useBreadcrumb } from '@ktbiotech/system-design';
import { useEffect } from 'react';

interface SetBreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function SetBreadcrumb({ items }: SetBreadcrumbProps) {
  const { setItems } = useBreadcrumb();
  useEffect(() => {
    setItems(items);
    return () => {
      setItems(null);
    };
  }, [items, setItems]);

  return null;
}
