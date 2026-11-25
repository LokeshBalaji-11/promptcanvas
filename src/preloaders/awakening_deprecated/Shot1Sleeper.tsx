import React, { useRef, useEffect, useCallback, useState } from 'react';

interface Shot1Props {
  progress: number; // 0-100 real loading progress
  isActive: boolean;
}

export const Shot1Sleeper: React.FC<Shot1Props> = ({ progress, isActive }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const timeRef = useRef(0);

  const drawFireflies = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
    const count = w < 600 ? 12 : 28;
    for (let i = 0; i < count; i++) {
      const seed = i * 137.5;
      const x = (Math.sin(seed + t * 0.3) * 0.5 + 0.5) * w;
      const y = (Math.cos(seed * 0.7 + t * 0.2) * 0.3 + 0.35) * h;
      const alpha = Math.sin(t * 2 + seed) * 0.3 + 0.5;
      const r = 2 + Math.sin(seed) * 1.5;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 230, 120, ${alpha})`;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x, y, r * 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 230, 120, ${alpha * 0.15})`;
      ctx.fill();
    }
  }, []);

  const drawGrain = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number) => {
    const imageData = ctx.getImageData(0, 0, w, h);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 16) {
      const noise = (Math.random() - 0.5) * 12;
      data[i] += noise;
      data[i + 1] += noise;
      data[i + 2] += noise;
    }
    ctx.putImageData(imageData, 0, 0);
  }, []);

  useEffect(() => {
    if (!isActive) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

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

    const tick = () => {
      timeRef.current += 0.016;
      const t = timeRef.current;
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.setTransform(Math.min(window.devicePixelRatio, 2), 0, 0, Math.min(window.devicePixelRatio, 2), 0, 0);
      ctx.clearRect(0, 0, w, h);
      drawFireflies(ctx, w, h, t);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [isActive, drawFireflies]);

  if (!isActive) return null;

  const breathOffset = Math.sin(Date.now() / 1200) * 2;
  const parallaxShift = Math.sin(Date.now() / 4000) * 8;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Sky gradient - dusk to dawn */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, #1a1040 0%, #2d1b69 25%, #5c3d7a 45%, #c47a5a 65%, #f4a65a 80%, #fcd08c 100%)'
      }} />

      {/* Distant hills (parallax layer 3) */}
      <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 400" preserveAspectRatio="none" style={{ transform: `translateX(${parallaxShift * 0.3}px)`, height: '55%' }}>
        <path d="M0 280 Q180 180 360 220 Q540 160 720 200 Q900 140 1080 190 Q1260 150 1440 180 L1440 400 L0 400Z" fill="#1a2a1a" opacity="0.7" />
        <path d="M0 300 Q200 220 400 260 Q600 200 800 240 Q1000 180 1200 230 Q1350 200 1440 220 L1440 400 L0 400Z" fill="#243524" opacity="0.8" />
      </svg>

      {/* Tree (parallax layer 2) */}
      <svg className="absolute bottom-0 left-1/2 -translate-x-1/2" viewBox="0 0 600 500" style={{ width: '45%', maxWidth: 500, transform: `translateX(calc(-50% + ${parallaxShift * 0.6}px))` }}>
        {/* Trunk */}
        <rect x="270" y="280" width="60" height="220" rx="8" fill="#3d2b1a" />
        <rect x="260" y="300" width="20" height="60" rx="6" fill="#3d2b1a" transform="rotate(-25 270 330)" />
        <rect x="320" y="290" width="18" height="50" rx="6" fill="#3d2b1a" transform="rotate(20 329 315)" />
        {/* Canopy */}
        <ellipse cx="300" cy="220" rx="200" ry="160" fill="#1a3a1a" opacity="0.9" />
        <ellipse cx="260" cy="180" rx="140" ry="120" fill="#254025" opacity="0.8" />
        <ellipse cx="340" cy="200" rx="130" ry="110" fill="#1e351e" opacity="0.85" />
        <ellipse cx="300" cy="160" rx="100" ry="80" fill="#2a4a2a" opacity="0.7" />
      </svg>

      {/* Sleeping person under tree */}
      <svg className="absolute bottom-[18%] left-1/2" viewBox="0 0 200 80" style={{ width: '14%', maxWidth: 180, transform: `translateX(-30%) translateY(${breathOffset}px)` }}>
        {/* Body */}
        <ellipse cx="100" cy="55" rx="70" ry="18" fill="#3a3548" opacity="0.9" />
        {/* Head */}
        <circle cx="45" cy="42" r="16" fill="#d4a574" />
        {/* Hair */}
        <path d="M30 38 Q35 22 50 25 Q60 20 55 35" fill="#2a1810" />
        {/* Chest rise (breathing) */}
        <ellipse cx="90" cy="48" rx="35" ry={12 + breathOffset * 0.8} fill="#3a3548" opacity="0.85" />
      </svg>

      {/* Foreground grass (parallax layer 1) */}
      <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ transform: `translateX(${parallaxShift}px)`, height: '15%' }}>
        <path d="M0 40 Q60 10 120 35 Q180 5 240 30 Q300 0 360 25 Q420 8 480 32 Q540 2 600 28 Q660 12 720 38 Q780 6 840 30 Q900 0 960 35 Q1020 10 1080 32 Q1140 4 1200 28 Q1260 15 1320 35 Q1380 8 1440 30 L1440 120 L0 120Z" fill="#1a3a1a" />
        {[...Array(24)].map((_, i) => (
          <line key={i} x1={60 * i + 30} y1={120} x2={60 * i + 30 + (i % 3 - 1) * 8} y2={60 - (i % 5) * 10} stroke="#2a5a2a" strokeWidth="2" opacity="0.6" />
        ))}
      </svg>

      {/* Light rays */}
      <div className="absolute top-0 right-[20%] w-[40%] h-full opacity-20 pointer-events-none" style={{
        background: 'linear-gradient(160deg, rgba(252,208,140,0.4) 0%, transparent 60%)',
        filter: 'blur(20px)'
      }} />

      {/* Fireflies canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Drifting leaves */}
      {[...Array(6)].map((_, i) => (
        <div key={i} className="absolute text-green-800/40 text-sm pointer-events-none" style={{
          left: `${15 + i * 14}%`,
          top: `${20 + (i % 3) * 15}%`,
          animation: `leafDrift ${6 + i * 1.5}s ease-in-out infinite`,
          animationDelay: `${i * 0.8}s`
        }}>
          🍃
        </div>
      ))}

      {/* Film grain overlay */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
      }} />

      {/* Loading counter */}
      <div className="absolute bottom-8 left-8 font-mono text-[11px] text-white/60 tracking-widest select-none">
        LOADING {String(Math.min(progress, 100)).padStart(3, '0')}%
      </div>

      <style>{`
        @keyframes leafDrift {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(20px, 30px) rotate(45deg); }
          50% { transform: translate(-10px, 60px) rotate(90deg); }
          75% { transform: translate(15px, 90px) rotate(135deg); }
        }
      `}</style>
    </div>
  );
};
