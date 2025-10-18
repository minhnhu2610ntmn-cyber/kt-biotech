import React from 'react';
import { NextIntlClientProvider } from 'next-intl';

// Mock messages for Storybook
const mockMessages = {
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

// Decorator to provide NextIntl context
export const withNextIntl = (Story: any) => {
  return React.createElement(
    NextIntlClientProvider,
    {
      locale: 'en',
      messages: mockMessages,
    },
    React.createElement(Story)
  );
};

// Global decorator for all stories
export const decorators = [withNextIntl];

// Parameters for Storybook
export const parameters = {
  nextjs: {
    appDirectory: true,
  },
};
