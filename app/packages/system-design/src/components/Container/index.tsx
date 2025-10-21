import * as React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={`w-full flex justify-center items-center h-full`}>
      <div className={`w-full max-w-[1275px] px-4 ${className}`}>
        {children}
      </div>
    </div>
  );
};

export default Container;
