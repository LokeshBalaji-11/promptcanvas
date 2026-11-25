import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface StyleTrackSectionProps {
  onThemeChange: (color: string) => void;
}

export const StyleTrackSection: React.FC<StyleTrackSectionProps> = ({ onThemeChange }) => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const panels = [
    {
      id: 'editorial',
      title: 'EDITORIAL.',
      accent: '#CCFF00',
      bg: '#07070A',
      desc: 'High-contrast typography, rigorous Swiss grid alignment, and minimalist monochrome palettes.',
      tag: '01 // REFINED'
    },
    {
      id: 'cinematic',
      title: 'CINEMATIC.',
      accent: '#22D3EE',
      bg: '#050811',
      desc: 'Immersive atmospheric dark tones, cyan highlights, and deep spatial depth layers.',
      tag: '02 // IMMERSIVE'
    },
    {
      id: 'minimal',
      title: 'MINIMAL.',
      accent: '#3DFFA2',
      bg: '#060907',
      desc: 'Effortless whitespace, emerald success indicators, and distraction-free clarity.',
      tag: '03 // PRISTINE'
    },
    {
      id: 'cyberpunk',
      title: 'CYBERPUNK.',
      accent: '#FF3B5C',
      bg: '#0A0608',
      desc: 'Neon error red accents, high-velocity matrix grids, and uncompromised terminal aesthetics.',
      tag: '04 // RAW'
    }
  ];

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const track = trackRef.current;
    if (!track) return;

    const ctx = gsap.context(() => {
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);
      
      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${track.scrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(3, Math.floor(self.progress * 4));
            onThemeChange(panels[idx].accent);
          }
        }
      });

      return () => tween.kill();
    }, sectionRef);

    return () => ctx.revert();
  }, [onThemeChange]);

  return (
    <section ref={sectionRef} className="relative h-screen w-full bg-[#07070A] overflow-hidden flex items-center border-t border-white/10">
      
      {/* MARKER */}
      <div className="absolute top-8 left-8 z-30 font-mono text-xs text-[#8E8E98] tracking-widest flex items-center gap-2">
        <span className="text-[#3DFFA2]">[02]</span>
        <span>STYLE TRACK // HORIZONTAL SCROLL</span>
      </div>

      <div ref={trackRef} className="flex h-full items-center pl-16 pr-16 gap-12 w-max">
        {panels.map((panel, idx) => (
          <div 
            key={panel.id}
            onClick={() => navigate(`/studio?style=${panel.id}`)}
            className="w-[85vw] md:w-[650px] h-[75vh] rounded-3xl border border-white/15 p-12 flex flex-col justify-between transition-all hover:border-white/40 cursor-pointer relative group overflow-hidden shadow-2xl"
            style={{ backgroundColor: panel.bg }}
          >
            {/* Absolute Glow */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full blur-[100px] opacity-20 pointer-events-none" style={{ backgroundColor: panel.accent }} />

            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white">
                  {panel.tag}
                </span>
                <Sparkles className="w-5 h-5" style={{ color: panel.accent }} />
              </div>

              <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                {panel.title}
              </h3>

              <p className="text-[#8E8E98] text-base md:text-lg font-light leading-relaxed max-w-md">
                {panel.desc}
              </p>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-white/10 font-mono text-xs">
              <span className="text-white font-bold">ACCENT: {panel.accent}</span>
              <div className="flex items-center gap-2 text-white group-hover:translate-x-2 transition-transform font-bold">
                <span>OPEN IN STUDIO</span>
                <ArrowRight className="w-4 h-4" style={{ color: panel.accent }} />
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
