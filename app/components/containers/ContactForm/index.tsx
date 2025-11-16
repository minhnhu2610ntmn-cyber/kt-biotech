'use client';

import { Button, Input, Text } from '@ktbiotech/system-design';
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
        LIÊN HỆ
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
                First name*
              </label>
              <Input
                type='text'
                id='name'
                name='name'
                placeholder='First name'
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
                Đơn vị/công ty*
              </label>
              <Input
                type='text'
                id='company'
                name='company'
                placeholder='Company name'
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
                Phone number*
              </label>
              <Input
                type='tel'
                id='phone'
                name='phone'
                placeholder='Phone number'
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
                Email*
              </label>
              <Input
                type='email'
                id='email'
                name='email'
                placeholder='Email'
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
              Message*
            </label>
            <textarea
              id='message'
              name='message'
              rows={4}
              placeholder='Message'
              value={formData.message}
              onChange={handleInputChange}
              className='w-full px-4 py-5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors resize-none bg-white'
              required
            />
          </div>

          {/* Submit Button */}
          <div className='relative'>
            <Button
              type='submit'
              variant='default'
              size='lg'
              disabled={isSubmitting}
              className='w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 outline-none'
            >
              {isSubmitting ? 'Đang gửi...' : 'Gửi'}
            </Button>
          </div>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className='p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg'>
              <Text variant='body' className='text-green-700'>
                Cảm ơn bạn! Tin nhắn đã được gửi thành công.
              </Text>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className='p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg'>
              <Text variant='body' className='text-red-700'>
                Có lỗi xảy ra. Vui lòng thử lại sau.
              </Text>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
