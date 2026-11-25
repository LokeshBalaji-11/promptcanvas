import React, { useRef, useEffect, useState, useCallback } from 'react';
import { PreloaderProps } from '../types';

export const ChromaBloomPreloader: React.FC<PreloaderProps> = ({ onComplete, loadProgress, accentColor = '#CCFF00' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progressVal, setProgressVal] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const animRef = useRef<number>(0);
  const startTime = useRef(performance.now());

  // Real + temporal progress tween (2.8s to 4.5s)
  useEffect(() => {
    const duration = 3500;
    const update = () => {
      const elapsed = performance.now() - startTime.current;
      const t = Math.min(1, elapsed / duration);
      // easeOutExpo curve
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
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

  // Canvas / WebGL fallback fluid bloom renderer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    const dpr = Math.min(window.devicePixelRatio, 2);

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const render = (time: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const p = progressVal / 100;

      // Dark background
      ctx.fillStyle = '#07070A';
      ctx.fillRect(0, 0, w, h);

      // Domain-warped noise fluid bloom from cursor/center
      const radius = p * Math.max(w, h) * 1.2;
      const grad = ctx.createRadialGradient(w * 0.2, h * 0.5, 0, w * 0.2, h * 0.5, radius);
      grad.addColorStop(0, accentColor);
      grad.addColorStop(0.4, '#22D3EE');
      grad.addColorStop(0.8, '#7C3AED');
      grad.addColorStop(1, 'transparent');

      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(w * 0.2, h * 0.5, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Film grain overlay
      const imgData = ctx.getImageData(0, 0, Math.min(w, 300), Math.min(h, 300));
      for (let i = 0; i < imgData.data.length; i += 16) {
        const noise = (Math.random() - 0.5) * 15;
        imgData.data[i] += noise;
        imgData.data[i + 1] += noise;
        imgData.data[i + 2] += noise;
      }

      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, [progressVal, accentColor]);

  return (
    <div className={`fixed inset-0 z-[9999] bg-[#07070A] overflow-hidden transition-opacity duration-600 ${isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Blinking prompt cursor "_" at center-left */}
      <div className="absolute top-1/2 left-16 -translate-y-1/2 font-mono text-2xl md:text-4xl text-white font-bold flex items-center gap-1 z-10">
        <span>_</span>
        <span className="w-3 h-6 bg-cyan-400 animate-pulse" />
      </div>

      {/* Huge display-font counter 000 -> 100 bottom-right */}
      <div className="absolute bottom-12 right-16 z-10 text-right">
        <div className="font-mono text-6xl md:text-9xl font-black tabular-nums tracking-tighter text-white" style={{
          textShadow: progressVal > 50 ? `2px 0 #FF3B5C, -2px 0 #22D3EE` : 'none'
        }}>
          {isDone ? '0 ERRORS ✓' : String(progressVal).padStart(3, '0')}
        </div>
        <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mt-2">
          {isDone ? 'SYSTEM READY' : 'CHROMA BLOOM COMPILING'}
        </div>
      </div>
    </div>
  );
};
