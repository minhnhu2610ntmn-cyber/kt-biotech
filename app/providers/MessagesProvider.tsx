'use client';

import { NextIntlClientProvider } from 'next-intl';
import { useMessagesProvider } from '../hooks';
import { MessagesProviderProps } from '../types';

export default function MessagesProvider({ children }: MessagesProviderProps) {
  const { messages, locale } = useMessagesProvider();

  if (!messages) {
    return <div>Loading...</div>;
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
