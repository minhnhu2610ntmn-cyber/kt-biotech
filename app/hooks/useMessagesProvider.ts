'use client';

import { useState, useEffect } from 'react';
import { getCookieValue, loadMessages } from '../utils';

export const useMessagesProvider = () => {
  const [messages, setMessages] = useState<Record<string, string> | null>(null);
  const [locale, setLocale] = useState('vi');

  useEffect(() => {
    const currentLocale = getCookieValue('NEXT_LOCALE') || 'vi';
    setLocale(currentLocale);

    const initializeMessages = async () => {
      const loadedMessages = await loadMessages(currentLocale);
      setMessages(loadedMessages);
    };

    initializeMessages();
  }, []);

  return {
    messages,
    locale,
    setMessages,
    setLocale
  };
};
