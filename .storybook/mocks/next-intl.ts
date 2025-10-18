// Mock for next-intl in Storybook
import mockMessagesEn from '../mock-messages.json';
import mockMessagesVi from '../mock-messages-vi.json';

const messagesByLocale = {
  en: mockMessagesEn,
  vi: mockMessagesVi,
};

// Global locale state
let currentLocale = 'en';

export const useTranslations = (namespace?: string) => {
  return (key: string) => {
    const messages = messagesByLocale[currentLocale as keyof typeof messagesByLocale] || mockMessagesEn;
    
    if (namespace && messages[namespace as keyof typeof messages]) {
      const nested = messages[namespace as keyof typeof messages] as any;
      return nested[key] || key;
    }
    return key;
  };
};

export const useLocale = () => currentLocale;

// Function to update locale (for testing)
export const setLocale = (locale: string) => {
  currentLocale = locale;
};

export const NextIntlClientProvider = ({ children, ...props }: any) => children;
