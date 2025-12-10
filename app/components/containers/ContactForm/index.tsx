'use client';

import { Button, Input, Text } from '@ktbiotech/system-design';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { StrapiApi } from '../../../config/api';

interface ContactFormData {
  name: string;
  company: string;
  phone: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const t = useTranslations('contact.form');
  const tContact = useTranslations('contact');
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    company: '',
    phone: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const api = new StrapiApi();
      const result = await api.submitContact(formData);

      if (result.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          company: '',
          phone: '',
          email: '',
          message: '',
        });
      } else {
        // eslint-disable-next-line no-console
        console.error('Error submitting form:', result.error);
        setSubmitStatus('error');
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className=' mx-auto w-full'>
      {/* Header */}
      <Text
        color='#215778'
        weight='bold'
        className='!text-3xl  mb-8 underline decoration-[#215778] decoration-1 underline-offset-4'
      >
        {tContact('title')}
      </Text>

      {/* Contact Form */}
      {/* eslint-disable-next-line */}
      <form onSubmit={handleSubmit}>
        <div className='space-y-4'>
          {/* First Row */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                {t('firstName')}*
              </label>
              <Input
                type='text'
                id='name'
                name='name'
                placeholder={t('firstNamePlaceholder')}
                value={formData.name}
                onChange={handleInputChange}
                required
                className='w-full px-4 py-5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors bg-white'
              />
            </div>
            <div>
              <label
                htmlFor='company'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                {t('company')}*
              </label>
              <Input
                type='text'
                id='company'
                name='company'
                placeholder={t('companyPlaceholder')}
                value={formData.company}
                onChange={handleInputChange}
                required
                className='w-full px-4 py-5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors bg-white'
              />
            </div>
          </div>

          {/* Second Row */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div>
              <label
                htmlFor='phone'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                {t('phone')}*
              </label>
              <Input
                type='tel'
                id='phone'
                name='phone'
                placeholder={t('phonePlaceholder')}
                value={formData.phone}
                onChange={handleInputChange}
                required
                className='w-full px-4 py-5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors bg-white'
              />
            </div>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                {t('email')}*
              </label>
              <Input
                type='email'
                id='email'
                name='email'
                placeholder={t('emailPlaceholder')}
                value={formData.email}
                onChange={handleInputChange}
                required
                className='w-full px-4 py-5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors bg-white'
              />
            </div>
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor='message'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              {t('message')}*
            </label>
            <textarea
              id='message'
              name='message'
              rows={4}
              placeholder={t('messagePlaceholder')}
              value={formData.message}
              onChange={handleInputChange}
              className='w-full px-4 py-5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors resize-none bg-white'
              required
            />
          </div>

          {/* Submit Button */}
          <div className='relative flex justify-start'>
            <Button
              type='submit'
              variant='default'
              size='lg'
              disabled={isSubmitting}
              className='bg-[#3691C9] hover:bg-[#2a7ab3] text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200 focus:ring-2 focus:ring-[#3691C9] focus:ring-offset-2 outline-none'
            >
              {isSubmitting ? t('submitting') : t('submit')}
            </Button>
          </div>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className='p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg'>
              <Text variant='body' className='text-green-700'>
                {t('success')}
              </Text>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className='p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg'>
              <Text variant='body' className='text-red-700'>
                {t('error')}
              </Text>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
