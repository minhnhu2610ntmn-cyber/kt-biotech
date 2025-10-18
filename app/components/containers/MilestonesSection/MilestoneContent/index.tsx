'use client';

import { Button, Heading, Text } from '@ktbiotech/system-design';
import { useState } from 'react';
import type { Milestone } from '../../../types';

export interface MilestoneContentProps {
  milestones: Milestone[];
  className?: string;
}

export default function MilestoneContent({
  milestones,
  className,
}: MilestoneContentProps) {
  const [activeMilestone, setActiveMilestone] = useState(
    milestones.find(m => m.isActive) || milestones[0]
  );

  return (
    <div
      className={`bg-white rounded-lg p-6 border border-kt-gray-200 ${className}`}
    >
      <div className='relative h-64 rounded-lg overflow-hidden mb-4'>
        <img
          src={activeMilestone.image}
          alt={activeMilestone.title}
          className='w-full h-full object-cover'
        />
        <div className='absolute inset-0 bg-black bg-opacity-20'></div>
        <div className='absolute bottom-4 left-4 text-white'>
          <span className='bg-kt-blue-600 px-3 py-1 rounded-full text-sm font-medium'>
            {activeMilestone.year}
          </span>
        </div>
      </div>

      <Heading level={4} className='text-kt-gray-800 font-semibold mb-2'>
        {activeMilestone.title}
      </Heading>

      <Text className='text-kt-gray-600 mb-4'>
        {activeMilestone.description}
      </Text>

      {activeMilestone.details && (
        <Text className='text-kt-gray-500 text-sm'>
          {activeMilestone.details}
        </Text>
      )}

      {/* Milestone Navigation */}
      <div className='mt-6 flex gap-2'>
        {milestones.map(milestone => (
          <Button
            key={milestone.id}
            onClick={() => setActiveMilestone(milestone)}
            variant={
              activeMilestone.id === milestone.id ? 'default' : 'outline'
            }
            size='sm'
            className={
              activeMilestone.id === milestone.id
                ? 'bg-kt-blue-600 text-white'
                : 'bg-kt-gray-100 text-kt-gray-600 hover:bg-kt-gray-200'
            }
          >
            {milestone.year}
          </Button>
        ))}
      </div>
    </div>
  );
}
