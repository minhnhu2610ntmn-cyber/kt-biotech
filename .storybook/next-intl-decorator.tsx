import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import mockMessagesEn from './mock-messages.json';
import mockMessagesVi from './mock-messages-vi.json';

// Available locales and their messages
const messagesByLocale = {
  en: mockMessagesEn,
  vi: mockMessagesVi,
};

// Decorator to provide NextIntl context
export const withNextIntl = (Story: any, context: any) => {
  const locale = context.globals?.locale || 'en';
  const messages = messagesByLocale[locale as keyof typeof messagesByLocale] || mockMessagesEn;

  return React.createElement(
    NextIntlClientProvider,
    {
      locale,
      messages,
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
