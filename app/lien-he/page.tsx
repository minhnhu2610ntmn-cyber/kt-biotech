import { Container, Heading, Text } from '@ktbiotech/system-design';
import { getTranslations } from 'next-intl/server';
// eslint-disable-next-line no-restricted-imports
import { ContactForm } from '../components/containers';

export default async function ContactPage() {
  const t = await getTranslations('contact');
  return (
    <div className='gap-4 flex flex-col '>
      <Container className='my-6 px-4'>
        <div className='flex flex-col gap-4 lg:flex-row '>
          {/* Left Side - Company Information */}
          <div className='lg:w-1/2 bg-gray-200 rounded-2xl flex flex-col justify-center p-8 lg:p-12'>
            {/* Company Title */}
            <div className='text-center mb-12'>
              <Heading
                level={2}
                className='text-xl lg:text-2xl font-bold text-gray-800 mb-8'
              >
                {t('companyTitle')}
              </Heading>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className='lg:w-1/2 p-4  flex flex-col justify-center'>
            <ContactForm />
          </div>
        </div>
      </Container>

      {/* Three Information Sections */}
      <Container className='grid grid-cols-1 md:grid-cols-3 gap-6 px-7'>
        {/* Address Section */}
        <div className='bg-[#E7E8E9] rounded-lg p-6 text-center flex flex-col items-center justify-center shadow-sm'>
          <div className='w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center'>
            <svg
              className='w-8 h-8 text-gray-600'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
              />
            </svg>
          </div>
          <Text variant='subtitle' weight='bold' className='text-gray-800 mb-3'>
            {t('address')}
          </Text>
          <Text
            variant='body'
            className='text-gray-600 text-sm leading-relaxed max-w-[250px]'
          >
            {t('addressValue')}
          </Text>
        </div>

        {/* Phone Section */}
        <div className='bg-[#E7E8E9] rounded-lg p-6 text-center shadow-sm'>
          <div className='w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center'>
            <svg
              className='w-8 h-8 text-gray-600'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
              />
            </svg>
          </div>
          <Text
            variant='subtitle'
            weight='bold'
            className=' text-gray-800 mb-3'
          >
            {t('phone')}
          </Text>
          <Text variant='body' className='text-gray-600 text-sm'>
            +84 123 456 789
          </Text>
        </div>

        {/* Email Section */}
        <div className='bg-[#E7E8E9] rounded-lg p-6 text-center shadow-sm'>
          <div className='w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center'>
            <svg
              className='w-8 h-8 text-gray-600'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
              />
            </svg>
          </div>
          <Text variant='subtitle' weight='bold' className='text-gray-800 mb-3'>
            {t('email')}
          </Text>
          <Text variant='body' className='text-gray-600 text-sm'>
            info@ktbiotech.com
          </Text>
        </div>
      </Container>

      {/* Map Section */}
      <div className='w-full h-screen'>
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.231314012283!2d106.6301533153368!3d10.823058392304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752a4b2b2b2b2b%3A0x2b2b2b2b2b2b2b2b!2sKhu%20d%C3%A2n%20c%C6%B0%20Gia%20Ho%C3%A0!5e0!3m2!1svi!2s!4v1234567890123!5m2!1svi!2s'
          width='100%'
          height='100%'
          style={{ border: 0 }}
          allowFullScreen
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
          title='KTBioTech Location Map'
        />
      </div>
    </div>
  );
}
