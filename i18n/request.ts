import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

// Can be imported from a shared config
const locales = ['en', 'vi'];

export default getRequestConfig(async () => {
  // Get locale from cookie, default to 'vi'
  const cookieStore = await cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'vi';
  
  // Validate that the locale is valid
  const validLocale = locales.includes(locale) ? locale : 'vi';

  return {
    locale: validLocale,
    messages: (await import(`../messages/${validLocale}.json`)).default
  };
});
