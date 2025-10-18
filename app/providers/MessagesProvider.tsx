'use client';

import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { useMessagesProvider } from '../hooks';
import { MessagesProviderProps } from '../types';
import { SimpleLoading } from '@ktbiotech/system-design';

export default function MessagesProvider({ children }: MessagesProviderProps) {
  const { messages, locale } = useMessagesProvider();

  if (!messages) {
    return <SimpleLoading />;
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
