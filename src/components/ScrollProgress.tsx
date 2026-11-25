import React, { useEffect, useState } from 'react';

interface ScrollProgressProps {
  accentColor: string;
}

export const ScrollProgress: React.FC<ScrollProgressProps> = ({ accentColor }) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-50 bg-white/5 pointer-events-none">
      <div 
        className="h-full transition-all duration-75 shadow-lg"
        style={{ 
          width: `${scrollProgress}%`, 
          backgroundColor: accentColor,
          boxShadow: `0 0 10px ${accentColor}`
        }}
      />
    </div>
  );
};
