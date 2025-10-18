'use client';

import { useState, useEffect } from 'react';
import { getCookieValue, loadMessages } from '../utils';

export const useMessagesProvider = () => {
  const [messages, setMessages] = useState<Record<string, string> | null>(null);
  const [locale, setLocale] = useState('vi');

  useEffect(() => {
    const initializeMessages = async () => {
      const currentLocale = getCookieValue('NEXT_LOCALE') || 'vi';
      setLocale(currentLocale);
      const loadedMessages = await loadMessages(currentLocale);
      setMessages(loadedMessages);
    };

    initializeMessages();

    // Listen for cookie changes
    const interval = setInterval(() => {
      const currentLocale = getCookieValue('NEXT_LOCALE') || 'vi';
      if (currentLocale !== locale) {
        initializeMessages();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [locale]);

  return {
    messages,
    locale,
    setMessages,
    setLocale
  };
};
