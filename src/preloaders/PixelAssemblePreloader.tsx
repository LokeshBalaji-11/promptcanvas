import React, { useRef, useEffect, useState } from 'react';
import { PreloaderProps } from '../types';

export const PixelAssemblePreloader: React.FC<PreloaderProps> = ({ onComplete, loadProgress, accentColor = '#CCFF00' }) => {
  const [progressVal, setProgressVal] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const startTime = useRef(performance.now());
  const animRef = useRef<number>(0);

  useEffect(() => {
    const duration = 3000;
    const update = () => {
      const elapsed = performance.now() - startTime.current;
      const t = Math.min(1, elapsed / duration);
      const eased = t * t * (3 - 2 * t); // smoothstep
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

  const cols = 16;
  const rows = 10;
  const totalTiles = cols * rows;
  const activeTiles = Math.floor((progressVal / 100) * totalTiles);

  return (
    <div className={`fixed inset-0 z-[9999] bg-[#07070A] overflow-hidden transition-opacity duration-600 ${isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      {/* Crosshair corner marks */}
      <div className="absolute top-6 left-6 font-mono text-[10px] text-zinc-500">CORNER_TOP_LEFT [X:00 Y:00]</div>
      <div className="absolute top-6 right-6 font-mono text-[10px] text-zinc-500">CORNER_TOP_RIGHT [X:1440 Y:00]</div>
      <div className="absolute bottom-6 left-6 font-mono text-[10px] text-zinc-500">CORNER_BOT_LEFT [X:00 Y:900]</div>
      <div className="absolute bottom-6 right-6 font-mono text-[10px] text-zinc-500">CORNER_BOT_RIGHT [X:1440 Y:900]</div>

      {/* Grid of square tiles */}
      <div className="absolute inset-16 grid grid-cols-16 grid-rows-10 gap-2 items-center justify-center">
        {[...Array(totalTiles)].map((_, i) => {
          const isActive = i < activeTiles;
          return (
            <div
              key={i}
              className="w-full h-full rounded-sm transition-all duration-300"
              style={{
                backgroundColor: isActive ? accentColor : '#121218',
                opacity: isActive ? 0.9 : 0.2,
                transform: isActive ? 'scale(1)' : 'scale(0.85)'
              }}
            />
          );
        })}
      </div>

      {/* HUD Counter */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 font-mono text-center">
        <div className="text-3xl font-black text-white">{String(progressVal).padStart(3, '0')}%</div>
        <div className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">PIXEL ASSEMBLE MATRIX</div>
      </div>
    </div>
  );
};
