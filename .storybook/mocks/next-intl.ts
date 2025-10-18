// Mock for next-intl in Storybook
export const useTranslations = (namespace?: string) => {
  const mockTranslations = {
    navbar: {
      home: 'Home',
      about: 'About',
      products: 'Products',
      news: 'News',
      research: 'Research',
      careers: 'Careers',
      contact: 'Contact',
      searchPlaceholder: 'Search...',
      hotline: 'Hotline',
    },
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      submit: 'Submit',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      close: 'Close',
    },
  };

  return (key: string) => {
    if (namespace && mockTranslations[namespace as keyof typeof mockTranslations]) {
      const nested = mockTranslations[namespace as keyof typeof mockTranslations] as any;
      return nested[key] || key;
    }
    return key;
  };
};

export const useLocale = () => 'en';

export const NextIntlClientProvider = ({ children, ...props }: any) => children;
