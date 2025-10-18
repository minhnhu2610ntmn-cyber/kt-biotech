import { Heading } from '@ktbiotech/system-design';
import { CountryFlags } from './CountryFlags';
import { countries } from '../../data/mockData';

export default function CountriesSection() {
  return (
    <section className='py-16 bg-white'>
      <div className='container mx-auto px-4'>
        <Heading level={3} className='text-kt-gray-800 font-semibold text-center mb-8 text-xl'>
          CÁC NƯỚC ĐÃ TIN DÙNG SẢN PHẨM CỦA KHOA THƯƠNG
        </Heading>
        <CountryFlags countries={countries} />
      </div>
    </section>
  );
}
