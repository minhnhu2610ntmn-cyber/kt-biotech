'use client';

import React from 'react';
import { TimelineItemIcon } from '../Icons';
import { Heading, Text } from '../Typography';

export interface TimelineItem {
  id: string | number;
  title?: string;
  description?: string;
  details?: string;
  icon?: React.ReactNode;
  date?: string;
  isActive?: boolean;
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
        className={`flex items-center ${isVertical ? 'flex-col' : 'flex-row'} ${isVertical ? 'space-y-6' : 'space-x-6'}`}
      >
        {items.map(item => {
          return (
            <div
              key={item.id}
              className={`flex w-full ${isVertical ? 'flex-row' : 'flex-col'} ${isVertical ? 'items-start' : 'items-center'} ${isVertical ? 'space-x-4' : 'space-y-2'}`}
            >
              {/* Timeline Circle */}
              <div className='hidden lg:flex flex-col items-center'>
                <div className={`transition-transform duration-300 ${item.isActive ? 'scale-150' : 'scale-100'}`}>
                  {getItemIcon(item)}
                </div>

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
                className={`flex-1 bg-[#86BDDF] py-4 px-6 rounded-lg ${
                  isVertical ? 'min-w-0 min-h-32' : 'text-center min-h-32'
                } w-full flex flex-col justify-center`}
              >
                {item.date && (
                  <div>
                    <h5
                      className={`text-lg md:text-xl lg:text-2xl mb-2 font-semibold text-white ${isVertical ? 'text-left' : 'text-center'}`}
                      dangerouslySetInnerHTML={{ __html: item.date }}
                    />
                  </div>
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
