import '../app/globals.css';
import { withNextIntl } from './next-intl-decorator';

const preview = {
  decorators: [withNextIntl],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
    },
    docs: {
      autodocs: 'tag',
    },
  },
  globalTypes: {
    locale: {
      description: 'Internationalization locale',
      defaultValue: 'vi',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'en', title: 'English' },
          { value: 'vi', title: 'Tiếng Việt' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },
};

export default preview;