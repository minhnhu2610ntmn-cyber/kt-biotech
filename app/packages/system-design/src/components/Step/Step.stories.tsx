import type { Meta, StoryObj } from '@storybook/react';
import { Step, StepPresets } from './index';

const meta: Meta<typeof Step> = {
  title: 'Components/Step',
  component: Step,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['vertical', 'horizontal'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'minimal', 'card'],
    },
    showConnector: {
      control: { type: 'boolean' },
    },
    onStepClick: { action: 'step clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof Step>;

const sampleSteps = [
  {
    id: 1,
    title: 'Account Setup',
    description: 'Create your account and verify your email',
    status: 'completed' as const,
  },
  {
    id: 2,
    title: 'Profile Information',
    description: 'Complete your profile details',
    status: 'current' as const,
  },
  {
    id: 3,
    title: 'Preferences',
    description: 'Set your notification preferences',
    status: 'upcoming' as const,
  },
  {
    id: 4,
    title: 'Confirmation',
    description: 'Review and confirm your settings',
    status: 'upcoming' as const,
  },
];

const stepsWithIcons = [
  {
    id: 1,
    title: 'Sign Up',
    description: 'Create your account',
    icon: (
      <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
        <path
          fillRule='evenodd'
          d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
          clipRule='evenodd'
        />
      </svg>
    ),
    status: 'completed' as const,
  },
  {
    id: 2,
    title: 'Verify Email',
    description: 'Check your email for verification link',
    icon: (
      <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
        <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
        <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
      </svg>
    ),
    status: 'current' as const,
  },
  {
    id: 3,
    title: 'Complete Profile',
    description: 'Add your personal information',
    icon: (
      <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
        <path
          fillRule='evenodd'
          d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
          clipRule='evenodd'
        />
      </svg>
    ),
    status: 'upcoming' as const,
  },
];

const stepsWithContent = [
  {
    id: 1,
    title: 'Project Planning',
    description: 'Define project scope and requirements',
    status: 'completed' as const,
    content: (
      <div className='text-xs text-gray-500'>
        <p>✓ Requirements gathered</p>
        <p>✓ Timeline created</p>
        <p>✓ Team assigned</p>
      </div>
    ),
  },
  {
    id: 2,
    title: 'Development',
    description: 'Build the application features',
    status: 'current' as const,
    content: (
      <div className='text-xs text-gray-500'>
        <p>🔄 Frontend in progress</p>
        <p>⏳ Backend pending</p>
        <p>⏳ Testing pending</p>
      </div>
    ),
  },
  {
    id: 3,
    title: 'Testing',
    description: 'Quality assurance and testing',
    status: 'upcoming' as const,
  },
  {
    id: 4,
    title: 'Deployment',
    description: 'Deploy to production',
    status: 'upcoming' as const,
  },
];

export const Default: Story = {
  args: {
    items: sampleSteps,
    orientation: 'vertical',
    variant: 'default',
    showConnector: true,
  },
};

export const WithIcons: Story = {
  args: {
    items: stepsWithIcons,
    orientation: 'vertical',
    variant: 'default',
    showConnector: true,
  },
};

export const CardVariant: Story = {
  args: {
    items: sampleSteps,
    orientation: 'vertical',
    variant: 'card',
    showConnector: true,
  },
};

export const WithContent: Story = {
  args: {
    items: stepsWithContent,
    orientation: 'vertical',
    variant: 'card',
    showConnector: true,
  },
};

export const Horizontal: Story = {
  args: {
    items: sampleSteps.slice(0, 3),
    orientation: 'horizontal',
    variant: 'default',
    showConnector: true,
  },
};

export const Minimal: Story = {
  args: {
    items: sampleSteps,
    orientation: 'vertical',
    variant: 'minimal',
    showConnector: true,
  },
};

export const NoConnector: Story = {
  args: {
    items: sampleSteps,
    orientation: 'vertical',
    variant: 'default',
    showConnector: false,
  },
};

export const CustomColors: Story = {
  args: {
    items: sampleSteps,
    orientation: 'vertical',
    variant: 'default',
    showConnector: true,
    activeColor: 'bg-purple-600',
    completedColor: 'bg-emerald-600',
    upcomingColor: 'bg-slate-300',
    connectorColor: 'bg-slate-200',
  },
};

export const OnboardingPreset: Story = {
  args: {
    items: sampleSteps,
    ...StepPresets.onboarding,
  },
};

export const ProcessPreset: Story = {
  args: {
    items: stepsWithContent,
    ...StepPresets.process,
  },
};

export const TimelinePreset: Story = {
  args: {
    items: stepsWithIcons,
    ...StepPresets.timeline,
  },
};

export const HorizontalPreset: Story = {
  args: {
    items: sampleSteps.slice(0, 4),
    ...StepPresets.horizontal,
  },
};
