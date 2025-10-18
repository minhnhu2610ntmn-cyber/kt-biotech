import { Step, StepPresets } from '@ktbiotech/system-design';
import { TechnologyContent } from './TechnologyContent';
import { technologyFootprints } from '../../data/mockData';

export default function TechnologySection() {
  const stepItems = technologyFootprints.map((footprint) => ({
    id: footprint.id,
    title: footprint.title,
    description: `${footprint.year} - ${footprint.description}`,
    status: footprint.isActive ? 'active' : 'upcoming',
  }));

  return (
    <section className='py-16 bg-white'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* Technology Content */}
          <div>
            <TechnologyContent footprints={technologyFootprints} />
          </div>
          
          {/* Technology Timeline */}
          <div className='flex flex-col'>
            <h3 className='text-kt-gray-800 font-semibold mb-6 text-center text-xl'>
              DẤU ẤN CÔNG NGHỆ
            </h3>
            <Step
              items={stepItems}
              orientation='vertical'
              variant='timeline'
              {...StepPresets.timeline}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
