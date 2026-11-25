import React, { useRef, useEffect, useState } from 'react';
import { PreloaderProps } from '../types';

export const InkTypePreloader: React.FC<PreloaderProps> = ({ onComplete, loadProgress, accentColor = '#CCFF00' }) => {
  const [progressVal, setProgressVal] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const startTime = useRef(performance.now());
  const animRef = useRef<number>(0);

  useEffect(() => {
    const duration = 3200;
    const update = () => {
      const elapsed = performance.now() - startTime.current;
      const t = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = Math.round(eased * 100);
      setProgressVal(current);

      if (t < 1) {
        animRef.current = requestAnimationFrame(update);
      } else {
        setIsDone(true);
        setTimeout(() => setIsExiting(true), 400);
        setTimeout(onComplete, 1000);
      }
    };
    animRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animRef.current);
  }, [onComplete]);

  const fillHeight = `${progressVal}%`;

  return (
    <div className={`fixed inset-0 z-[9999] bg-[#07070A] flex flex-col items-center justify-center overflow-hidden transition-opacity duration-600 ${isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="relative text-center select-none">
        {/* Background outline text */}
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-zinc-800 uppercase font-sans">
          PROMPTCANVAS
        </h1>

        {/* Liquid color fill layer */}
        <div 
          className="absolute inset-0 overflow-hidden flex items-center justify-center transition-all duration-75"
          style={{ clipPath: `inset(${100 - progressVal}% 0 0 0)` }}
        >
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase font-sans" style={{ color: accentColor }}>
            PROMPTCANVAS
          </h1>
        </div>

        {/* Counter HUD */}
        <div className="mt-8 font-mono text-sm tracking-widest text-zinc-400">
          LIQUID INK SYNC: <span className="text-white font-bold">{progressVal}%</span>
        </div>
      </div>
    </div>
  );
};
