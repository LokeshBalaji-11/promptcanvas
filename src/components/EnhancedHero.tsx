import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { AsciiHeroCanvas } from './AsciiHeroCanvas';

interface EnhancedHeroProps {
  accentColor: string;
}

export const EnhancedHero: React.FC<EnhancedHeroProps> = ({ accentColor }) => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!titleRef.current) return;
      const scrollY = window.scrollY;
      const skew = Math.min(15, Math.max(-15, scrollY * 0.02));
      titleRef.current.style.transform = `skewX(${skew}deg) translateY(${scrollY * 0.15}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen w-full flex flex-col justify-between px-8 pt-24 pb-12 overflow-hidden bg-[#07070A]">
      <AsciiHeroCanvas accentColor={accentColor} />

      {/* TOP META & NUMBERED NAV */}
      <div className="relative z-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="font-mono text-xs text-[#8E8E98] tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
          <span>AI SPATIAL MOODBOARD · 2026</span>
        </div>

        <div className="flex items-center gap-6 font-mono text-xs text-[#8E8E98]">
          <a href="#blueprint" className="hover:text-white transition-colors">01 Moodboard</a>
          <a href="#morph" className="hover:text-white transition-colors">02 Live Preview</a>
          <a href="#modules" className="hover:text-white transition-colors">03 Code</a>
          <button onClick={() => navigate('/studio')} className="text-white hover:underline flex items-center gap-1 font-bold">
            04 Studio &nearr;
          </button>
        </div>
      </div>

      {/* CENTER HERO CONTENT */}
      <div className="relative z-25 my-auto flex flex-col items-center text-center max-w-6xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/15 text-white font-mono text-xs tracking-widest uppercase mb-8 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5" style={{ color: accentColor }} />
          <span>KINETIC 12-COLOR SPECTRUM ENGINE</span>
        </div>

        <h1 
          ref={titleRef}
          className="font-black tracking-tighter text-white uppercase leading-none mb-8 transition-transform duration-75 will-change-transform"
          style={{ fontSize: 'clamp(3rem, 9vw, 11rem)', fontFamily: 'var(--font-display)' }}
        >
          PROMPT <span className="text-transparent bg-clip-text" style={{ WebkitTextStroke: `2px ${accentColor}` }}>CANVAS</span>
        </h1>

        <p className="text-[#8E8E98] text-lg md:text-xl max-w-2xl font-light mb-12">
          Transform text prompts into production-ready spatial storyboards, WCAG palettes, and live code ecosystems in real-time.
        </p>

        <button
          onClick={() => navigate('/studio')}
          className="px-8 py-4 rounded-2xl font-mono text-xs font-black uppercase tracking-wider text-black transition-all hover:scale-105 shadow-2xl cursor-pointer flex items-center gap-3 group"
          style={{ backgroundColor: accentColor }}
        >
          <span>LAUNCH STUDIO ↗</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* FOOTER META */}
      <div className="relative z-20 flex justify-between items-center text-xs font-mono text-[#8E8E98] border-t border-white/10 pt-6">
        <span>LAT: 35.6762° N</span>
        <span>ROXTEN STUDIOS HACKATHON</span>
        <span>LON: 139.6503° E</span>
      </div>
    </section>
  );
};
