'use client';

import React from 'react';

interface NeumorphicCardProps {
  children?: React.ReactNode;
  className?: string;
  style?: any; // For compatibility with react-native-web
}

export const NeumorphicCard: React.FC<NeumorphicCardProps> = ({ 
  children, 
  className = '',
  style = {}
}) => {
  return (
    <div 
      className={`
        rounded-3xl 
        bg-[#E0E5EC] 
        shadow-[15px_15px_20px_rgba(166,180,200,0.7),-10px_-10px_20px_rgba(255,255,255,0.8)]
        border border-white/10
        w-full
        ${className}
      `}
      style={style}
    >
      <div className="
        rounded-3xl 
        overflow-hidden
        shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),inset_2px_2px_5px_rgba(166,180,200,0.2)]
        h-full
      ">
        <div className="
          p-6
          md:p-8
          flex
          flex-col
          items-center
          justify-center
          bg-[#E0E5EC]
          relative
          min-h-[450px]
          h-full
        ">
          {children}
        </div>
      </div>
    </div>
  );
}; 