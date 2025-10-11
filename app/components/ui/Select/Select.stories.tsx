import type { Meta, StoryObj } from '@storybook/react';
import Select from './index';
import { useState } from 'react';

const meta: Meta<typeof Select> = {
  title: 'UI/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isSearchable: {
      control: { type: 'boolean' },
    },
    isDisabled: {
      control: { type: 'boolean' },
    },
    isClearable: {
      control: { type: 'boolean' },
    },
    isMulti: {
      control: { type: 'boolean' },
    },
    required: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const countryOptions = [
  { value: 'vn', label: '🇻🇳 Vietnam' },
  { value: 'us', label: '🇺🇸 United States' },
  { value: 'uk', label: '🇬🇧 United Kingdom' },
  { value: 'jp', label: '🇯🇵 Japan' },
  { value: 'kr', label: '🇰🇷 South Korea' },
  { value: 'fr', label: '🇫🇷 France' },
  { value: 'de', label: '🇩🇪 Germany' },
  { value: 'au', label: '🇦🇺 Australia' },
];

const skillOptions = [
  { value: 'react', label: 'React' },
  { value: 'nextjs', label: 'Next.js' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'tailwind', label: 'Tailwind CSS' },
  { value: 'nodejs', label: 'Node.js' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'angular', label: 'Angular' },
];

export const Default: Story = {
  args: {
    options: countryOptions,
    placeholder: 'Select an option...',
  },
  render: (args) => {
    const [value, setValue] = useState(null);
    return (
      <Select
        {...args}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    placeholder: 'Select your country',
    required: true,
  },
  render: (args) => {
    const [value, setValue] = useState(null);
    return (
      <Select
        {...args}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const Searchable: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    placeholder: 'Search and select...',
    isSearchable: true,
  },
  render: (args) => {
    const [value, setValue] = useState(null);
    return (
      <Select
        {...args}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const Clearable: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    placeholder: 'Select and clear...',
    isClearable: true,
  },
  render: (args) => {
    const [value, setValue] = useState(null);
    return (
      <Select
        {...args}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const MultiSelect: Story = {
  args: {
    label: 'Skills',
    options: skillOptions,
    placeholder: 'Select multiple skills',
    isMulti: true,
    isSearchable: true,
    isClearable: true,
  },
  render: (args) => {
    const [value, setValue] = useState([]);
    return (
      <Select
        {...args}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const WithError: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    placeholder: 'Select your country',
    error: 'Please select a country',
  },
  render: (args) => {
    const [value, setValue] = useState(null);
    return (
      <Select
        {...args}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Skills',
    options: skillOptions,
    placeholder: 'Select your skills',
    helperText: 'Choose skills that match your experience',
    isMulti: true,
  },
  render: (args) => {
    const [value, setValue] = useState([]);
    return (
      <Select
        {...args}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    placeholder: 'This select is disabled',
    isDisabled: true,
  },
  render: (args) => {
    const [value, setValue] = useState(null);
    return (
      <Select
        {...args}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    placeholder: 'Full width select',
    className: 'w-full',
  },
  render: (args) => {
    const [value, setValue] = useState(null);
    return (
      <div className="w-full max-w-md">
        <Select
          {...args}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};
