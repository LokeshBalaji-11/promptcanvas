import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SPECTRUM_COLORS, getRandomSpectrumColor } from '../engine/spectrum';

gsap.registerPlugin(ScrollTrigger);

interface AsciiScrollSectionProps {
  accentColor: string;
  onSelectStyle: (styleName: string) => void;
}

export const AsciiScrollSection: React.FC<AsciiScrollSectionProps> = ({ accentColor, onSelectStyle }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeWordIndex, setActiveWordIndex] = useState<number>(0);

  const words = ['EDITORIAL.', 'CINEMATIC.', 'MINIMAL.', 'CYBERPUNK.'];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const getWordParticles = (word: string) => {
      const offCanvas = document.createElement('canvas');
      const offCtx = offCanvas.getContext('2d');
      if (!offCtx) return [];

      offCanvas.width = width;
      offCanvas.height = height;
      offCtx.fillStyle = '#ffffff';
      offCtx.font = `900 ${Math.min(width / 7, 130)}px 'Syne', sans-serif`;
      offCtx.textAlign = 'center';
      offCtx.textBaseline = 'middle';
      offCtx.fillText(word, width / 2, height / 2);

      const imgData = offCtx.getImageData(0, 0, width, height);
      const data = imgData.data;
      const particles: Array<{ targetX: number; targetY: number; char: string; colorIdx: number }> = [];
      const chars = ['+', ':', '=', '#', '/', '0', '1', '■', '*'];

      const step = Math.max(8, Math.floor(width / 120));
      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const index = (y * width + x) * 4;
          if (data[index + 3] > 128) {
            particles.push({
              targetX: x,
              targetY: y,
              char: chars[Math.floor(Math.random() * chars.length)],
              colorIdx: Math.floor(Math.random() * SPECTRUM_COLORS.length)
            });
          }
        }
      }
      return particles;
    };

    let particleSets = words.map(w => getWordParticles(w));
    let currentProgress = 0;

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=400%',
      pin: true,
      scrub: 1.5,
      onUpdate: (self) => {
        currentProgress = self.progress;
        const idx = Math.min(3, Math.floor(currentProgress * 4));
        setActiveWordIndex(idx);
      }
    });

    let animationFrameId: number;

    const render = () => {
      ctx.fillStyle = '#060608';
      ctx.fillRect(0, 0, width, height);

      const totalSegments = words.length - 1;
      const scaledProgress = currentProgress * totalSegments;
      const activeIdx = Math.min(totalSegments, Math.floor(scaledProgress));
      const segmentProgress = scaledProgress - activeIdx;

      const currentSet = particleSets[activeIdx] || particleSets[0];
      const nextSet = particleSets[Math.min(totalSegments, activeIdx + 1)] || currentSet;

      ctx.font = '15px "JetBrains Mono", monospace';
      const maxLen = Math.max(currentSet.length, nextSet.length);
      const step = Math.max(1, Math.floor(maxLen / 800));

      for (let i = 0; i < maxLen; i += step) {
        const p1 = currentSet[i % currentSet.length];
        const p2 = nextSet[i % nextSet.length];

        const scatter = Math.sin(segmentProgress * Math.PI) * 180;
        const interpX = p1.targetX + (p2.targetX - p1.targetX) * segmentProgress + (Math.random() - 0.5) * scatter;
        const interpY = p1.targetY + (p2.targetY - p1.targetY) * segmentProgress + (Math.random() - 0.5) * scatter;

        // 12-color spectrum cycle
        const color = SPECTRUM_COLORS[(p1.colorIdx + Math.floor(Date.now() / 300)) % SPECTRUM_COLORS.length];
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.9;
        ctx.fillText(p1.char, interpX, interpY);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      st.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen w-full bg-[#060608] overflow-hidden flex flex-col justify-between">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none" />

      {/* TOP BAR */}
      <div className="relative z-10 p-8 flex items-center justify-between border-b border-white/10 bg-[#060608]/60 backdrop-blur-md">
        <div className="font-mono text-xs text-[#8E8E98] uppercase tracking-widest">
          [02] 12-COLOR KINETIC ASCII SCROLL MORPH
        </div>
        <div className="font-mono text-xs text-white">
          ACTIVE VIBE: <span style={{ color: accentColor }}>{words[activeWordIndex]}</span>
        </div>
      </div>

      {/* BOTTOM NAVIGATION PILLS */}
      <div className="relative z-10 p-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/10 bg-[#060608]/80 backdrop-blur-md">
        <div className="flex flex-wrap items-center gap-3">
          {words.map((w, idx) => {
            const cleanName = w.replace('.', '');
            return (
              <button
                key={idx}
                onClick={() => {
                  setActiveWordIndex(idx);
                  onSelectStyle(cleanName);
                }}
                className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                  activeWordIndex === idx 
                    ? 'bg-white text-black shadow-lg shadow-white/20' 
                    : 'bg-white/5 text-[#8E8E98] border border-white/10 hover:text-white hover:bg-white/10'
                }`}
              >
                0{idx + 1} {cleanName}
              </button>
            );
          })}
        </div>

        <button 
          onClick={() => {
            const styleName = words[activeWordIndex].replace('.', '');
            onSelectStyle(styleName);
          }}
          className="px-6 py-3 rounded-xl font-mono text-xs font-black uppercase tracking-wider text-black transition-all shadow-xl hover:scale-105 cursor-pointer"
          style={{ backgroundColor: accentColor }}
        >
          [CLICK TO LOAD STYLE &rarr;]
        </button>
      </div>
    </div>
  );
};
