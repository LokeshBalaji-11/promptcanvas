import React, { useEffect, useRef } from 'react';
import { SPECTRUM_COLORS, getRandomSpectrumColor } from '../engine/spectrum';

interface AsciiHeroCanvasProps {
  accentColor: string;
}

export const AsciiHeroCanvas: React.FC<AsciiHeroCanvasProps> = ({ accentColor }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const chars = ['+', '=', ':', '#', '0', '1', '/', '*', '%', 'X', '□', '■'];
    const particles: Array<{
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      char: string;
      size: number;
      speed: number;
      colorIdx: number;
    }> = [];

    // Reduce particle count on mobile for smooth 60fps
    const isMobile = width < 768;
    const densityDivisor = isMobile ? 12000 : 4000;
    const numParticles = Math.floor((width * height) / densityDivisor);
    const centerX = width / 2;
    const centerY = height / 2;

    for (let i = 0; i < numParticles; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * (width / 2);
      const baseX = centerX + Math.cos(angle) * radius * 0.7;
      const baseY = centerY + Math.sin(angle) * radius * 0.7;
      
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        baseX,
        baseY,
        char: chars[Math.floor(Math.random() * chars.length)],
        size: Math.random() * 12 + 10,
        speed: Math.random() * 0.05 + 0.02,
        colorIdx: Math.floor(Math.random() * SPECTRUM_COLORS.length)
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let step = 0;
    const render = () => {
      step++;
      ctx.fillStyle = '#07070A';
      ctx.fillRect(0, 0, width, height);

      ctx.font = '12px "JetBrains Mono", monospace';
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          // Lerp towards baseX/baseY
          p.x += (p.baseX - p.x) * p.speed;
          p.y += (p.baseY - p.y) * p.speed;

          // Mouse repulsion
          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const angle = Math.atan2(dy, dx);
            p.x -= Math.cos(angle) * (120 - dist) * 0.1;
            p.y -= Math.sin(angle) * (120 - dist) * 0.1;
          }
        }

        const color = SPECTRUM_COLORS[(p.colorIdx + Math.floor(step / 30)) % SPECTRUM_COLORS.length];
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.85;
        ctx.fillText(p.char, p.x, p.y);
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      style={{ imageRendering: 'pixelated' }}
    />
  );
};
