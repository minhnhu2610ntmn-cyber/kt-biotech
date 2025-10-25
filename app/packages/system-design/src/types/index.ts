/**
 * Types for system-design package
 */

export interface SidebarMenuItem {
  id: string;
  label: string;
  href: string;
  isActive?: boolean;
}

// Re-export ProductCategory from main types
export type { ProductCategory } from '../../../types/strapi';
