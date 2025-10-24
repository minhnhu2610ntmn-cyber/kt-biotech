import type { Meta, StoryObj } from '@storybook/react';
import SliderV2 from './index';

const meta: Meta<typeof SliderV2> = {
  title: 'Components/SliderV2',
  component: SliderV2,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: false,
      description: 'Slider content',
    },
    slidesPerView: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Number of slides per view',
    },
    spaceBetween: {
      control: { type: 'number', min: 0, max: 100 },
      description: 'Space between slides',
    },
    loop: {
      control: 'boolean',
      description: 'Enable loop mode',
    },
    autoplay: {
      control: 'boolean',
      description: 'Enable autoplay',
    },
    navigation: {
      control: 'boolean',
      description: 'Show navigation buttons',
    },
    customNavigation: {
      control: 'boolean',
      description: 'Use custom oval navigation buttons',
    },
    showProgressBar: {
      control: 'boolean',
      description: 'Show progress bar',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock colored boxes for the story
const mockColoredBoxes = [
  { id: 1, color: 'bg-red-500', name: 'Red Box' },
  { id: 2, color: 'bg-blue-500', name: 'Blue Box' },
  { id: 3, color: 'bg-green-500', name: 'Green Box' },
  { id: 4, color: 'bg-yellow-500', name: 'Yellow Box' },
  { id: 5, color: 'bg-purple-500', name: 'Purple Box' },
  { id: 6, color: 'bg-pink-500', name: 'Pink Box' },
  { id: 7, color: 'bg-indigo-500', name: 'Indigo Box' },
  { id: 8, color: 'bg-orange-500', name: 'Orange Box' },
];

// Colored box component for the story
const ColoredBox = ({ box }: { box: any }) => (
  <div
    className={`flex items-center justify-center p-8 ${box.color} rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full h-32`}
  >
    <span className='text-white font-bold text-lg'>{box.name}</span>
  </div>
);

export const ColoredBoxesCarousel: Story = {
  args: {
    slidesPerView: 5,
    spaceBetween: 20,
    loop: true,
    autoplay: { delay: 3000, disableOnInteraction: false },
    navigation: true,
    customNavigation: true,
    showProgressBar: false,
    grabCursor: true,
    allowTouchMove: true,
    freeMode: false,
    freeModeSticky: false,
    breakpoints: {
      320: { slidesPerView: 2, spaceBetween: 10 },
      640: { slidesPerView: 3, spaceBetween: 15 },
      1024: { slidesPerView: 4, spaceBetween: 20 },
      1280: { slidesPerView: 5, spaceBetween: 20 },
    },
    children: mockColoredBoxes.map(box => (
      <ColoredBox key={box.id} box={box} />
    )),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Colored boxes carousel with oval navigation buttons. Shows 5 slides per view with different colored boxes, featuring hover effects and smooth transitions.',
      },
    },
  },
  decorators: [
    Story => (
      <div className='w-full max-w-6xl mx-auto p-4'>
        <Story />
      </div>
    ),
  ],
};
