import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Get cookie value by name
 */
export const getCookieValue = (name: string): string | null => {
  if (typeof document === 'undefined') return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};

/**
 * Load messages for a specific locale
 */
export const loadMessages = async (
  locale: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<Record<string, any>> => {
  try {
    const messages = await import(`../../messages/${locale}.json`);
    return messages.default;
  } catch {
    // Fallback to default locale
    const fallbackMessages = await import(`../../messages/vi.json`);
    return fallbackMessages.default;
  }
};
