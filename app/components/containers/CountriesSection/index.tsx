import {
  CambodiaFlagIcon,
  ChinaFlagIcon,
  Heading,
  JapanFlagIcon,
  MalaysiaFlagIcon,
  Text,
  UnitedStatesFlagIcon,
} from '@ktbiotech/system-design';
import Image from 'next/image';

export default function CountriesSection() {
  const countries = [
    { name: 'Trung Quốc', flag: ChinaFlagIcon },
    { name: 'Campuchia', flag: CambodiaFlagIcon },
    { name: 'Nhật Bản', flag: JapanFlagIcon },
    { name: 'Hoa Kỳ', flag: UnitedStatesFlagIcon },
    { name: 'Malaysia', flag: MalaysiaFlagIcon },
  ];

  return (
    <section className='py-16 bg-white relative overflow-hidden'>
      {/* Title */}
      <Heading
        level={3}
        color='#215778'
        className='text-center mb-12 font-bold !text-2xl underline decoration-[#215778] decoration-1 underline-offset-4'
      >
        QUỐC GIA KHOA THƯƠNG ĐÃ XUẤT KHẨU ĐẾN
      </Heading>

      {/* Main Content */}
      <div className='relative'>
        {/* Background with wave pattern */}
        <div className='relative flex items-center px-13 bg-gradient-to-r from-[#1e3a8a] to-[#1e40af]  h-[268px] p-8 mb-8'>
          {/* Country Flags */}
          <div className='relative z-10 flex justify-center items-center gap-16 flex-wrap'>
            {countries.map((country, index) => {
              const FlagIcon = country.flag;
              return (
                <div key={index} className='flex flex-col items-center'>
                  <div className='h-[135px]  rounded-lg  shadow-lg mb-2'>
                    <FlagIcon className='w-full h-full' />
                  </div>
                  <Text
                    color='white'
                    className='text-sm font-medium text-center'
                  >
                    {country.name}
                  </Text>
                </div>
              );
            })}
          </div>
        </div>

        {/* KT BIOTECH Logo Card */}
        <div className='absolute top-5 right-8 h-[268px] scale-[1.6] z-10  overflow-hidden'>
          <Image
            src='/images/company.png'
            alt='KT BIOTECH Company Logo'
            width={320}
            height={256}
            className='w-full h-full object-cover'
            priority
          />
        </div>
      </div>
    </section>
  );
}
