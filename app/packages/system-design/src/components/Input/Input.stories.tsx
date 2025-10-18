import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './index';
import { Search, User, Mail, Lock } from 'lucide-react';

const meta: Meta<typeof Input> = {
  title: 'Base/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'filled', 'outlined'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'tel', 'number'],
    },
    fullWidth: {
      control: { type: 'boolean' },
    },
    required: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    required: true,
  },
};

export const WithLeftIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    leftIcon: <Search className='h-4 w-4' />,
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    leftIcon: <Lock className='h-4 w-4' />,
    required: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    type: 'email',
    error: 'Please enter a valid email address',
    leftIcon: <Mail className='h-4 w-4' />,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    helperText: 'Choose a unique username',
    leftIcon: <User className='h-4 w-4' />,
  },
};

export const Filled: Story = {
  args: {
    label: 'Filled Input',
    placeholder: 'This is a filled input',
    variant: 'filled',
  },
};

export const Outlined: Story = {
  args: {
    label: 'Outlined Input',
    placeholder: 'This is an outlined input',
    variant: 'outlined',
  },
};

export const Small: Story = {
  args: {
    label: 'Small Input',
    placeholder: 'Small size input',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    label: 'Large Input',
    placeholder: 'Large size input',
    size: 'lg',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'This input is disabled',
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Full Width Input',
    placeholder: 'This input takes full width',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};
