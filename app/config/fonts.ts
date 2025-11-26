import localFont from 'next/font/local';

export const roboto = localFont({
  src: [
    {
      path: '../../public/fonts/Roboto-Thin.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Roboto-ThinItalic.ttf',
      weight: '100',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Roboto-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Roboto-LightItalic.ttf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Roboto-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Roboto-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Roboto-MediumItalic.ttf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Roboto-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Roboto-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Roboto-Black.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Roboto-BlackItalic.ttf',
      weight: '900',
      style: 'italic',
    },
  ],
  variable: '--font-roboto',
  display: 'swap',
});

export const robotoCondensed = localFont({
  src: [
    {
      path: '../../public/fonts/RobotoCondensed-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/RobotoCondensed-LightItalic.ttf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../../public/fonts/RobotoCondensed-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/RobotoCondensed-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/RobotoCondensed-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/RobotoCondensed-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-roboto-condensed',
  display: 'swap',
});

