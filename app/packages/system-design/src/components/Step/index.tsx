'use client';

import React from 'react';
import { TimelineItemIcon } from '../Icons';
import { Heading, Text } from '../Typography';

export interface TimelineItem {
  id: string | number;
  description?: string;
  icon?: React.ReactNode;
  date?: string;
}

export interface TimelineProps {
  items: TimelineItem[];
  orientation?: 'vertical' | 'horizontal';
  showConnector?: boolean;
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = ({
  items,
  orientation = 'vertical',
  showConnector = true,
  className = '',
}) => {
  const getItemIcon = (item: TimelineItem) => {
    if (item.icon) return item.icon;

    // Use TimelineItemIcon without background circle
    return <TimelineItemIcon className='w-5 h-5 text-[#86BDDF]' />;
  };

  const isVertical = orientation === 'vertical';

  return (
    <div className={`timeline-container ${className}`}>
      <div
        className={`flex ${isVertical ? 'flex-col' : 'flex-row'} ${isVertical ? 'space-y-6' : 'space-x-6'}`}
      >
        {items.map(item => {
          return (
            <div
              key={item.id}
              className={`flex ${isVertical ? 'flex-row' : 'flex-col'} ${isVertical ? 'items-start' : 'items-center'} ${isVertical ? 'space-x-4' : 'space-y-2'}`}
            >
              {/* Timeline Circle */}
              <div className='flex flex-col items-center'>
                {getItemIcon(item)}

                {/* Connector Line */}
                {showConnector && (
                  <div
                    className={`
                      ${isVertical ? 'w-0.5 h-22 mt-2' : 'h-0.5 w-20 mt-2'}
                      bg-[#86BDDF]
                    `}
                  />
                )}
              </div>

              {/* Timeline Content */}
              <div
                className={`flex-1 bg-[#86BDDF] p-4 rounded-lg ${isVertical ? 'min-w-0' : 'text-center'}`}
              >
                {item.date && (
                  <Heading
                    color='white'
                    level={5}
                    className={`text-sm mb-1 ${isVertical ? 'text-left' : 'text-center'}`}
                  >
                    {item.date}
                  </Heading>
                )}
                {/* <Text
                  color='white'
                  className={`font-semibold  mb-2 ${isVertical ? 'text-left' : 'text-center'}`}
                >
                  {item.title}
                </Text> */}
                {item.description && (
                  <Text
                    color='white'
                    className={`text-sm leading-relaxed ${isVertical ? 'text-left' : 'text-center'}`}
                  >
                    {item.description}
                  </Text>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Keep Step component for backward compatibility
export const Step = Timeline;
