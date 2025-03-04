import React from 'react';
import dynamic from 'next/dynamic';

// Import App component with SSR disabled
const AppComponent = dynamic(() => import('../../App'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center p-8 min-h-[400px]">
      <div className="text-center">
        <p className="animate-pulse text-gray-600 text-lg">Loading Focus Timer App...</p>
      </div>
    </div>
  )
});

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{ backgroundColor: '#E0E5EC' }}>
      <div className="w-full max-w-xl">
        <div id="app-mount-point" className="w-full">
          <AppComponent />
        </div>
      </div>
    </div>
  );
} 