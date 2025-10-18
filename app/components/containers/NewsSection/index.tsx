import { Heading } from '@ktbiotech/system-design';
import { NewsGrid } from './NewsGrid';
import { newsItems } from '../../data/mockData';

export default function NewsSection() {
  return (
    <section className='py-16 bg-kt-gray-50'>
      <div className='container mx-auto px-4'>
        <Heading level={3} className='text-kt-gray-800 font-semibold text-center mb-8 text-xl'>
          TIN TỨC
        </Heading>
        <NewsGrid news={newsItems} />
      </div>
    </section>
  );
}
