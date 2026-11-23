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

    const numParticles = Math.floor((width * height) / 3500);
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
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    let progress = 0;

    const render = () => {
      ctx.fillStyle = '#060608';
      ctx.fillRect(0, 0, width, height);

      if (progress < 1) progress += 0.008;

      particles.forEach((p, idx) => {
        const targetX = p.x + (p.baseX - p.x) * p.speed * progress;
        const targetY = p.y + (p.baseY - p.y) * p.speed * progress;
        p.x = targetX;
        p.y = targetY;

        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let renderX = p.x;
        let renderY = p.y;

        if (dist < 120) {
          const angle = Math.atan2(dy, dx);
          renderX -= Math.cos(angle) * (120 - dist);
          renderY -= Math.sin(angle) * (120 - dist);
        }

        // Cycle color spectrum over time
        const dynamicColor = SPECTRUM_COLORS[(p.colorIdx + Math.floor(Date.now() / 400)) % SPECTRUM_COLORS.length];
        ctx.fillStyle = dynamicColor;
        ctx.font = `${p.size}px 'JetBrains Mono', monospace`;
        ctx.globalAlpha = Math.min(0.9, (dist < 120 ? 1 : 0.5) * progress);
        ctx.fillText(p.char, renderX, renderY);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};
