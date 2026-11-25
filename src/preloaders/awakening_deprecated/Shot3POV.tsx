import React, { useRef, useEffect, useCallback, useState } from 'react';

interface Shot3Props {
  isActive: boolean;
  progress: number;
}

export const Shot3POV: React.FC<Shot3Props> = ({ isActive, progress }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const rafRef = useRef<number>(0);
  const timeRef = useRef(0);
  const [blinks, setBlinks] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    const handleMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight };
    };
    const handleTouch = (e: TouchEvent) => {
      if (e.touches[0]) {
        mouseRef.current = { x: e.touches[0].clientX / window.innerWidth, y: e.touches[0].clientY / window.innerHeight };
      }
    };
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleTouch);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleTouch);
    };
  }, [isActive]);

  // Blink timing
  useEffect(() => {
    if (!isActive) return;
    const t1 = setTimeout(() => setBlinks(1), 400);
    const t2 = setTimeout(() => setBlinks(2), 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [isActive]);

  const drawForestLayers = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number, t: number, mx: number, my: number) => {
    // Layer 1: Distant mist
    const mistGrad = ctx.createLinearGradient(0, 0, 0, h);
    mistGrad.addColorStop(0, 'rgba(180,200,220,0.5)');
    mistGrad.addColorStop(0.5, 'rgba(120,160,140,0.3)');
    mistGrad.addColorStop(1, 'rgba(30,60,40,0.1)');
    ctx.fillStyle = mistGrad;
    ctx.fillRect(0, 0, w, h);

    const px = (mx - 0.5) * 2;
    const py = (my - 0.5) * 2;

    // Layer 2: Tree trunks (parallax -20px)
    ctx.save();
    ctx.translate(px * -20, py * -10);
    for (let i = 0; i < 8; i++) {
      const x = (i / 8) * w + w * 0.06;
      const trunkW = 18 + (i % 3) * 8;
      ctx.fillStyle = `rgba(${40 + i * 5}, ${30 + i * 3}, ${20}, 0.7)`;
      ctx.fillRect(x, 0, trunkW, h);
      ctx.fillStyle = `rgba(${60 + i * 5}, ${50 + i * 3}, ${35}, 0.3)`;
      ctx.fillRect(x + trunkW * 0.3, 0, trunkW * 0.15, h);
    }
    ctx.restore();

    // Layer 3: Mid foliage canopy (parallax -40px)
    ctx.save();
    ctx.translate(px * -40, py * -20);
    for (let i = 0; i < 12; i++) {
      const x = (i / 12) * w * 1.2 - w * 0.1;
      const y = -30 + Math.sin(i * 2.1 + t * 0.3) * 20;
      const r = 60 + (i % 4) * 25;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${20 + i * 3}, ${60 + i * 5}, ${20 + i * 2}, 0.5)`;
      ctx.fill();
    }
    ctx.restore();

    // Layer 4: God rays
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    for (let i = 0; i < 5; i++) {
      const rayX = w * 0.2 + i * w * 0.15;
      const rayGrad = ctx.createLinearGradient(rayX, 0, rayX + 60, h);
      rayGrad.addColorStop(0, `rgba(255, 250, 200, ${0.06 + Math.sin(t + i) * 0.03})`);
      rayGrad.addColorStop(1, 'rgba(255, 250, 200, 0)');
      ctx.fillStyle = rayGrad;
      ctx.beginPath();
      ctx.moveTo(rayX, 0);
      ctx.lineTo(rayX + 80 + i * 20, h);
      ctx.lineTo(rayX - 20 + i * 10, h);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();

    // Layer 5: Foreground leaves/branches (parallax -60px)
    ctx.save();
    ctx.translate(px * -60, py * -30);
    ctx.fillStyle = 'rgba(15, 40, 15, 0.8)';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(w * 0.08, h * 0.25, 0, h * 0.4);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(w, 0);
    ctx.quadraticCurveTo(w * 0.92, h * 0.3, w, h * 0.5);
    ctx.fill();
    // Bottom foliage
    ctx.fillStyle = 'rgba(20, 50, 20, 0.6)';
    ctx.beginPath();
    ctx.moveTo(0, h);
    ctx.quadraticCurveTo(w * 0.15, h * 0.85, w * 0.3, h);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(w, h);
    ctx.quadraticCurveTo(w * 0.85, h * 0.82, w * 0.65, h);
    ctx.fill();
    ctx.restore();

    // Floating pollen particles
    const pollenCount = w < 600 ? 25 : 50;
    for (let i = 0; i < pollenCount; i++) {
      const seed = i * 73.7;
      const px2 = (Math.sin(seed + t * 0.15) * 0.5 + 0.5) * w;
      const py2 = (Math.cos(seed * 0.6 + t * 0.1) * 0.5 + 0.5) * h;
      const alpha = Math.sin(t * 1.5 + seed) * 0.2 + 0.35;
      ctx.beginPath();
      ctx.arc(px2, py2, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 220, ${alpha})`;
      ctx.fill();
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
    window.addEventListener('resize', resize);

    const tick = () => {
      timeRef.current += 0.016;
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      drawForestLayers(ctx, w, h, timeRef.current, mouseRef.current.x, mouseRef.current.y);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [isActive, drawForestLayers]);

  if (!isActive) return null;

  const blurVal = Math.max(0, (1 - progress * 1.5) * 8);
  const isBlinking = blinks < 2 && (progress < 0.15 || (progress > 0.25 && progress < 0.4));
  const lidHeight = isBlinking ? '50%' : '0%';

  return (
    <div className="absolute inset-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0" style={{ filter: `blur(${blurVal}px)` }} />

      {/* Eyelid-shaped vignette clip */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top lid */}
        <div className="absolute top-0 left-0 right-0 bg-black transition-all duration-300" style={{ height: lidHeight }} />
        {/* Bottom lid */}
        <div className="absolute bottom-0 left-0 right-0 bg-black transition-all duration-300" style={{ height: lidHeight }} />
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        boxShadow: 'inset 0 0 200px rgba(0,0,0,0.5)',
      }} />
    </div>
  );
};
