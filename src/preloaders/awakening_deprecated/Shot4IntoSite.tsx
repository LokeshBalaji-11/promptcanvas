import React, { useRef, useEffect, useCallback } from 'react';

interface Shot4Props {
  isActive: boolean;
  progress: number;
  onComplete: () => void;
}

export const Shot4IntoSite: React.FC<Shot4Props> = ({ isActive, progress, onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const timeRef = useRef(0);

  const drawParticles = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number, t: number, converge: number) => {
    const count = w < 600 ? 60 : 120;
    const cx = w / 2;
    const cy = h / 2;

    for (let i = 0; i < count; i++) {
      const seed = i * 47.3;
      const angle = seed + t * 0.2;
      const dist = (1 - converge) * (150 + (i % 5) * 60) + converge * (5 + Math.random() * 20);
      const x = cx + Math.cos(angle) * dist;
      const y = cy + Math.sin(angle) * dist * 0.6;
      const alpha = 0.3 + converge * 0.6;
      const size = 1 + converge * 2;

      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.font = `${8 + size}px monospace`;
      const chars = '01@#$%&*+=';
      ctx.fillText(chars[i % chars.length], x, y);
    }
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
    };
    resize();

    const tick = () => {
      timeRef.current += 0.016;
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      drawParticles(ctx, w, h, timeRef.current, Math.min(1, progress * 1.5));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isActive, progress, drawParticles]);

  useEffect(() => {
    if (isActive && progress >= 0.95) {
      const t = setTimeout(onComplete, 500);
      return () => clearTimeout(t);
    }
  }, [isActive, progress, onComplete]);

  if (!isActive) return null;

  const bloomOpacity = Math.min(1, progress * 2);
  const titleReveal = Math.max(0, (progress - 0.3) / 0.7);

  return (
    <div className="absolute inset-0 overflow-hidden flex items-center justify-center" style={{
      background: `radial-gradient(ellipse at center, rgba(255,255,255,${bloomOpacity * 0.3}) 0%, #07070A 70%)`
    }}>
      {/* ASCII particle convergence canvas */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Title masked reveal */}
      <div className="relative z-10 text-center" style={{
        opacity: titleReveal,
        transform: `translateY(${(1 - titleReveal) * 30}px) scale(${0.95 + titleReveal * 0.05})`,
        transition: 'opacity 0.4s, transform 0.4s'
      }}>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-3" style={{
          clipPath: `inset(0 ${(1 - titleReveal) * 50}% 0 0)`
        }}>
          PROMPT<span className="text-[#CCFF00]">CANVAS</span>
        </h1>
        <p className="text-xs font-mono text-white/50 tracking-[0.3em] uppercase">
          Design Systems. Reimagined.
        </p>
      </div>

      {/* White-out bloom overlay */}
      <div className="absolute inset-0 pointer-events-none bg-white" style={{
        opacity: Math.max(0, (progress - 0.85) / 0.15) * 0.9
      }} />
    </div>
  );
};
