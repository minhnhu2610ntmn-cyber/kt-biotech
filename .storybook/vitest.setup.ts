import { beforeAll } from 'vitest';
import '@testing-library/jest-dom';

beforeAll(() => {
  // Mock Next.js router
  Object.defineProperty(window, 'location', {
    value: {
      href: 'http://localhost:3000',
      reload: () => {},
    },
    writable: true,
  });

  // Mock document.cookie
  Object.defineProperty(document, 'cookie', {
    value: 'NEXT_LOCALE=vi',
    writable: true,
  });
});