import { Step, StepPresets } from '@ktbiotech/system-design';
import { MilestoneContent } from './MilestoneContent';
import { milestones } from '../../data/mockData';

export default function MilestonesSection() {
  const stepItems = milestones.map((milestone) => ({
    id: milestone.id,
    title: milestone.title,
    description: `${milestone.year} - ${milestone.description}`,
    status: milestone.isActive ? 'active' : 'upcoming',
  }));

  return (
    <section className='py-16 bg-kt-gray-50'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* Timeline */}
          <div className='flex flex-col'>
            <h3 className='text-kt-gray-800 font-semibold mb-6 text-center text-xl'>
              MỐC THỜI GIAN
            </h3>
            <Step
              items={stepItems}
              orientation='vertical'
              variant='timeline'
              {...StepPresets.timeline}
            />
          </div>
          
          {/* Milestone Content */}
          <div>
            <MilestoneContent milestones={milestones} />
          </div>
        </div>
      </div>
    </section>
  );
}
