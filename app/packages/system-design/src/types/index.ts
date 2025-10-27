/**
 * Types for system-design package
 */

export interface SidebarMenuItem {
  id: string;
  label: string;
  href: string;
  isActive?: boolean;
}

// Select component types
export interface OptionType {
  value: string;
  label: string;
}

export interface SelectProps {
  options: OptionType[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  isSearchable?: boolean;
  isDisabled?: boolean;
  isClearable?: boolean;
  isMulti?: boolean;
  name?: string;
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

// Re-export ProductCategory from main types
// export type { ProductCategory } from '../../../types/strapi';

// Local ProductCategory type for system-design package
export interface ProductCategory {
  id: string | number;
  name: string;
  slug?: string;
  color?: string;
  type?: 'blog' | 'product';
}
