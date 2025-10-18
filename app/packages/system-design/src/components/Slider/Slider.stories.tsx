import type { Meta, StoryObj } from '@storybook/react';
import { Slider, SliderPresets } from './index';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    slidesPerView: {
      control: { type: 'number' },
      description: 'Number of slides per view',
    },
    spaceBetween: {
      control: { type: 'number' },
      description: 'Space between slides in pixels',
    },
    loop: {
      control: { type: 'boolean' },
      description: 'Enable loop mode',
    },
    autoplay: {
      control: { type: 'boolean' },
      description: 'Enable autoplay',
    },
    navigation: {
      control: { type: 'boolean' },
      description: 'Show navigation arrows',
    },
    pagination: {
      control: { type: 'boolean' },
      description: 'Show pagination dots',
    },
    effect: {
      control: { type: 'select' },
      options: ['slide', 'fade', 'coverflow'],
      description: 'Slide transition effect',
    },
    centeredSlides: {
      control: { type: 'boolean' },
      description: 'Center slides',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

// Sample slide content
const SampleSlide = ({
  children,
  bgColor = 'bg-blue-500',
}: {
  children: React.ReactNode;
  bgColor?: string;
}) => (
  <div
    className={`${bgColor} h-64 flex items-center justify-center text-white text-xl font-semibold rounded-lg`}
  >
    {children}
  </div>
);

const sampleSlides = [
  <SampleSlide key='1' bgColor='bg-blue-500'>
    Slide 1
  </SampleSlide>,
  <SampleSlide key='2' bgColor='bg-green-500'>
    Slide 2
  </SampleSlide>,
  <SampleSlide key='3' bgColor='bg-purple-500'>
    Slide 3
  </SampleSlide>,
  <SampleSlide key='4' bgColor='bg-red-500'>
    Slide 4
  </SampleSlide>,
  <SampleSlide key='5' bgColor='bg-yellow-500'>
    Slide 5
  </SampleSlide>,
];

// Default slider
export const Default: Story = {
  args: {
    children: sampleSlides,
    slidesPerView: 1,
    spaceBetween: 30,
    loop: false,
    autoplay: false,
    navigation: true,
    pagination: true,
  },
};

// Hero banner slider
export const HeroBanner: Story = {
  args: {
    children: sampleSlides,
    ...SliderPresets.hero,
  },
};

// Product carousel
export const ProductCarousel: Story = {
  args: {
    children: sampleSlides,
    ...SliderPresets.productCarousel,
  },
};

// Testimonial slider
export const Testimonial: Story = {
  args: {
    children: sampleSlides,
    ...SliderPresets.testimonial,
  },
};

// Image gallery with coverflow effect
export const ImageGallery: Story = {
  args: {
    children: sampleSlides,
    ...SliderPresets.gallery,
  },
};

// Fade effect
export const FadeEffect: Story = {
  args: {
    children: sampleSlides,
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    autoplay: { delay: 3000 },
    navigation: true,
    pagination: true,
    effect: 'fade',
  },
};

// Coverflow effect
export const CoverflowEffect: Story = {
  args: {
    children: sampleSlides,
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    navigation: true,
    pagination: true,
    effect: 'coverflow',
    centeredSlides: true,
  },
};

// Responsive breakpoints
export const Responsive: Story = {
  args: {
    children: sampleSlides,
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: true,
    pagination: true,
    breakpoints: {
      640: { slidesPerView: 2, spaceBetween: 20 },
      1024: { slidesPerView: 3, spaceBetween: 30 },
      1280: { slidesPerView: 4, spaceBetween: 40 },
    },
  },
};

// Autoplay with custom delay
export const AutoplayCustom: Story = {
  args: {
    children: sampleSlides,
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: { delay: 2000, disableOnInteraction: false },
    navigation: true,
    pagination: true,
  },
};

// Minimal slider (no navigation, no pagination)
export const Minimal: Story = {
  args: {
    children: sampleSlides,
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: { delay: 4000 },
    navigation: false,
    pagination: false,
  },
};
