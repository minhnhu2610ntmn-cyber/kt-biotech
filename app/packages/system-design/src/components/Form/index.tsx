'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '../Button';
import { Input } from '../Input';
import Select from '../Select';

export interface FormData {
  name: string;
  email: string;
  phone: string;
  country: string;
  message: string;
  agree: boolean;
}

export interface FormProps {
  onSubmit?: (data: FormData) => void;
  defaultValues?: Partial<FormData>;
  className?: string;
}

export const Form: React.FC<FormProps> = ({
  onSubmit,
  defaultValues = {},
  className = '',
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      country: '',
      message: '',
      agree: false,
      ...defaultValues,
    },
  });

  const handleFormSubmit = async (data: FormData) => {
    try {
      await onSubmit?.(data);
      reset();
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const countryOptions = [
    { value: 'vn', label: 'Vietnam' },
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'jp', label: 'Japan' },
    { value: 'kr', label: 'South Korea' },
  ];

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={`space-y-6 ${className}`}>
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Full Name *
        </label>
        <Controller
          name="name"
          control={control}
          rules={{ 
            required: 'Name is required',
            minLength: { value: 2, message: 'Name must be at least 2 characters' }
          }}
          render={({ field }) => (
            <Input
              {...field}
              id="name"
              placeholder="Enter your full name"
              error={errors.name?.message}
            />
          )}
        />
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email Address *
        </label>
        <Controller
          name="email"
          control={control}
          rules={{ 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          }}
          render={({ field }) => (
            <Input
              {...field}
              id="email"
              type="email"
              placeholder="Enter your email"
              error={errors.email?.message}
            />
          )}
        />
      </div>

      {/* Phone Field */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number
        </label>
        <Controller
          name="phone"
          control={control}
          rules={{
            pattern: {
              value: /^[\+]?[1-9][\d]{0,15}$/,
              message: 'Invalid phone number'
            }
          }}
          render={({ field }) => (
            <Input
              {...field}
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              error={errors.phone?.message}
            />
          )}
        />
      </div>

      {/* Country Field */}
      <div>
        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
          Country
        </label>
        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <Select
              value={countryOptions.find(option => option.value === field.value) || null}
              onChange={(option) => field.onChange((option as any)?.value || '')}
              placeholder="Select your country"
              options={countryOptions}
              error={errors.country?.message}
            />
          )}
        />
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Message
        </label>
        <Controller
          name="message"
          control={control}
          rules={{
            maxLength: { value: 500, message: 'Message must be less than 500 characters' }
          }}
          render={({ field }) => (
            <textarea
              {...field}
              id="message"
              rows={4}
              placeholder="Enter your message"
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.message ? 'border-red-500' : 'border-gray-300'
              }`}
            />
          )}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
        <p className="mt-1 text-sm text-gray-500">
          {control._formValues.message?.length || 0}/500 characters
        </p>
      </div>

      {/* Agreement Checkbox */}
      <div className="flex items-start">
        <Controller
          name="agree"
          control={control}
          rules={{ required: 'You must agree to the terms' }}
          render={({ field }) => (
            <input
              type="checkbox"
              id="agree"
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
              className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          )}
        />
        <label htmlFor="agree" className="ml-2 block text-sm text-gray-700">
          I agree to the{' '}
          <a href="#" className="text-blue-600 hover:text-blue-500">
            Terms and Conditions
          </a>{' '}
          and{' '}
          <a href="#" className="text-blue-600 hover:text-blue-500">
            Privacy Policy
          </a>
        </label>
      </div>
      {errors.agree && (
        <p className="text-sm text-red-600">{errors.agree.message}</p>
      )}

      {/* Submit Button */}
      <div className="flex justify-end space-x-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => reset()}
          disabled={isSubmitting}
        >
          Reset
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="min-w-[120px]"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </div>
    </form>
  );
};
