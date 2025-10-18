import type { Meta, StoryObj } from '@storybook/react';
import { Form } from './index';

const meta: Meta<typeof Form> = {
  title: 'Components/Form',
  component: Form,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    onSubmit: { action: 'form submitted' },
  },
};

export default meta;
type Story = StoryObj<typeof Form>;

export const Default: Story = {
  args: {
    onSubmit: data => {
      console.log('Form submitted:', data);
      alert(
        `Form submitted successfully!\n\nData: ${JSON.stringify(data, null, 2)}`
      );
    },
  },
};

export const WithDefaultValues: Story = {
  args: {
    defaultValues: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      country: 'us',
      message: 'This is a pre-filled message.',
      agree: true,
    },
    onSubmit: data => {
      console.log('Form submitted:', data);
      alert(
        `Form submitted successfully!\n\nData: ${JSON.stringify(data, null, 2)}`
      );
    },
  },
};

export const ContactForm: Story = {
  args: {
    onSubmit: async data => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Contact form submitted:', data);
      alert('Thank you for your message! We will get back to you soon.');
    },
  },
};

export const RegistrationForm: Story = {
  args: {
    defaultValues: {
      agree: false,
    },
    onSubmit: async data => {
      // Simulate registration API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Registration form submitted:', data);
      alert('Registration successful! Welcome aboard!');
    },
  },
};
