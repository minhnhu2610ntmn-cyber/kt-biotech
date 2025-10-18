'use client';

import React from 'react';

export interface StepItem {
  id: string | number;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  status?: 'completed' | 'current' | 'upcoming';
  content?: React.ReactNode;
}

export interface StepProps {
  items: StepItem[];
  orientation?: 'vertical' | 'horizontal';
  variant?: 'default' | 'minimal' | 'card';
  showConnector?: boolean;
  connectorColor?: string;
  activeColor?: string;
  completedColor?: string;
  upcomingColor?: string;
  className?: string;
  onStepClick?: (step: StepItem, index: number) => void;
}

export const Step: React.FC<StepProps> = ({
  items,
  orientation = 'vertical',
  variant = 'default',
  showConnector = true,
  connectorColor = 'bg-gray-300',
  activeColor = 'bg-blue-600',
  completedColor = 'bg-green-600',
  upcomingColor = 'bg-gray-300',
  className = '',
  onStepClick,
}) => {
  const getStepStatus = (index: number, item: StepItem) => {
    if (item.status) return item.status;
    
    // Auto-determine status based on index
    const currentIndex = items.findIndex(item => item.status === 'current');
    if (currentIndex === -1) {
      // No explicit current step, assume first is current
      return index === 0 ? 'current' : index < 0 ? 'completed' : 'upcoming';
    }
    
    if (index < currentIndex) return 'completed';
    if (index === currentIndex) return 'current';
    return 'upcoming';
  };

  const getStepColor = (status: string) => {
    switch (status) {
      case 'completed': return completedColor;
      case 'current': return activeColor;
      case 'upcoming': return upcomingColor;
      default: return upcomingColor;
    }
  };

  const getStepIcon = (item: StepItem, status: string, index: number) => {
    if (item.icon) return item.icon;
    
    if (status === 'completed') {
      return (
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      );
    }
    
    return (
      <span className="text-sm font-semibold text-white">
        {index + 1}
      </span>
    );
  };

  const isVertical = orientation === 'vertical';
  const isHorizontal = orientation === 'horizontal';

  return (
    <div className={`step-container ${className}`}>
      <div className={`flex ${isVertical ? 'flex-col' : 'flex-row'} ${isVertical ? 'space-y-4' : 'space-x-4'}`}>
        {items.map((item, index) => {
          const status = getStepStatus(index, item);
          const stepColor = getStepColor(status);
          const isLast = index === items.length - 1;
          
          return (
            <div key={item.id} className={`flex ${isVertical ? 'flex-row' : 'flex-col'} items-center ${isVertical ? 'space-x-4' : 'space-y-2'}`}>
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => onStepClick?.(item, index)}
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200
                    ${stepColor}
                    ${onStepClick ? 'cursor-pointer hover:scale-105' : 'cursor-default'}
                    ${status === 'current' ? 'ring-4 ring-blue-200' : ''}
                    ${variant === 'card' ? 'shadow-lg' : ''}
                  `}
                  disabled={!onStepClick}
                >
                  {getStepIcon(item, status, index)}
                </button>
                
                {/* Connector Line */}
                {showConnector && !isLast && (
                  <div 
                    className={`
                      ${isVertical ? 'w-0.5 h-8 mt-2' : 'h-0.5 w-8 mt-2'}
                      ${status === 'completed' ? completedColor : connectorColor}
                    `}
                  />
                )}
              </div>
              
              {/* Step Content */}
              <div className={`flex-1 ${isVertical ? 'min-w-0' : 'text-center'}`}>
                <div className={`${variant === 'card' ? 'bg-white p-4 rounded-lg shadow-md border' : ''}`}>
                  <h3 className={`font-semibold text-gray-900 ${isVertical ? 'text-left' : 'text-center'}`}>
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className={`text-sm text-gray-600 mt-1 ${isVertical ? 'text-left' : 'text-center'}`}>
                      {item.description}
                    </p>
                  )}
                  {item.content && (
                    <div className="mt-2">
                      {item.content}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Preset configurations
export const StepPresets = {
  onboarding: {
    orientation: 'vertical' as const,
    variant: 'card' as const,
    showConnector: true,
    activeColor: 'bg-blue-600',
    completedColor: 'bg-green-600',
    upcomingColor: 'bg-gray-300',
  },
  
  process: {
    orientation: 'vertical' as const,
    variant: 'default' as const,
    showConnector: true,
    activeColor: 'bg-blue-600',
    completedColor: 'bg-green-600',
    upcomingColor: 'bg-gray-300',
  },
  
  timeline: {
    orientation: 'vertical' as const,
    variant: 'minimal' as const,
    showConnector: true,
    activeColor: 'bg-blue-600',
    completedColor: 'bg-green-600',
    upcomingColor: 'bg-gray-300',
  },
  
  horizontal: {
    orientation: 'horizontal' as const,
    variant: 'default' as const,
    showConnector: true,
    activeColor: 'bg-blue-600',
    completedColor: 'bg-green-600',
    upcomingColor: 'bg-gray-300',
  },
};
