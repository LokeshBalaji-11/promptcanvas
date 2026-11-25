import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState<number>(0);
  const [statusText, setStatusText] = useState<string>('SYNTHESIZING SPATIAL TOKENS');
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [skipped, setSkipped] = useState<boolean>(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || sessionStorage.getItem('promptcanvas_preloaded')) {
      onComplete();
      return;
    }

    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 5) + 3;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        setStatusText('0 ERRORS ✓ [SYSTEM READY]');
        clearInterval(interval);
        setTimeout(() => {
          setIsComplete(true);
          sessionStorage.setItem('promptcanvas_preloaded', 'true');
          setTimeout(onComplete, 800);
        }, 600);
      } else {
        setProgress(current);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (skipped) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 bg-[#07070A] text-[#F5F5F5] flex flex-col items-center justify-between p-12 font-mono select-none transition-all duration-700 ease-in-out ${
        isComplete ? '-translate-y-full opacity-95' : 'translate-y-0 opacity-100'
      }`}
      onClick={() => {
        setSkipped(true);
        sessionStorage.setItem('promptcanvas_preloaded', 'true');
        onComplete();
      }}
    >
      <div className="w-full flex justify-between items-center text-xs text-[#8E8E98] tracking-widest">
        <span>[PROMPTCANVAS // KINETIC ENGINE v2.5]</span>
        <span className="cursor-pointer hover:text-white underline">[SKIP LOADING]</span>
      </div>

      <div className="flex flex-col items-center text-center">
        <div className="text-xs uppercase tracking-widest mb-6 flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
          <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: progress === 100 ? '#3DFFA2' : '#22D3EE' }} />
          <span className={progress === 100 ? 'text-[#3DFFA2] font-bold' : 'text-[#22D3EE]'}>
            {statusText}
          </span>
        </div>

        <div className="text-7xl md:text-9xl font-black tracking-tighter text-white relative">
          <span className="relative z-10">{String(progress).padStart(3, '0')}%</span>
          {progress < 100 && (
            <>
              <span className="absolute inset-0 text-[#FF3B5C] opacity-80 translate-x-[3px] -translate-y-[2px] select-none pointer-events-none mix-blend-screen">
                {String(progress).padStart(3, '0')}%
              </span>
              <span className="absolute inset-0 text-[#22D3EE] opacity-85 -translate-x-[3px] translate-y-[2px] select-none pointer-events-none mix-blend-screen">
                {String(progress).padStart(3, '0')}%
              </span>
            </>
          )}
        </div>
      </div>

      <div className="w-full max-w-lg bg-white/10 h-1.5 rounded-full overflow-hidden p-[1px] border border-white/10">
        <div 
          className="h-full transition-all duration-75 rounded-full shadow-lg"
          style={{ 
            width: `${progress}%`,
            backgroundColor: progress === 100 ? '#3DFFA2' : '#22D3EE',
            boxShadow: progress === 100 ? '0 0 15px #3DFFA2' : '0 0 15px #22D3EE'
          }}
        />
      </div>
    </div>
  );
};
