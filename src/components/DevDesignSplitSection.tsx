import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Palette, Code2, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface DevDesignSplitSectionProps {
  accentColor: string;
}

export const DevDesignSplitSection: React.FC<DevDesignSplitSectionProps> = ({ accentColor }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const mergeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 1,
        }
      });

      tl.to(leftRef.current, { xPercent: -50, opacity: 0, ease: 'power2.inOut' }, 0)
        .to(rightRef.current, { xPercent: 50, opacity: 0, ease: 'power2.inOut' }, 0)
        .fromTo(mergeRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, ease: 'power2.out' }, 0.5);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen w-full bg-[#07070A] overflow-hidden flex items-center justify-center border-t border-white/10">
      
      {/* MARKER */}
      <div className="absolute top-8 left-8 z-30 font-mono text-xs text-[#8E8E98] tracking-widest flex items-center gap-2">
        <span className="text-[#22D3EE]">[01]</span>
        <span>DEV × DESIGN SPLIT</span>
      </div>

      {/* SPLIT VIEW */}
      <div className="absolute inset-0 flex flex-col md:flex-row w-full h-full">
        
        {/* LEFT: DEVELOPER */}
        <div ref={leftRef} className="w-full md:w-1/2 h-full bg-[#07070A] border-r border-white/10 p-12 flex flex-col justify-center relative z-20">
          <div className="max-w-xl mx-auto w-full">
            <div className="flex items-center gap-2 font-mono text-xs text-[#22D3EE] mb-4">
              <Code2 className="w-4 h-4" />
              <span>{'<CREATOR role="developer">'}</span>
            </div>
            <h3 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">
              Type-safe spatial architecture.
            </h3>
            <div className="p-6 rounded-2xl bg-black/60 border border-white/10 font-mono text-xs text-[#22D3EE] space-y-2">
              <div className="text-slate-500">// streaming runtime state</div>
              <div>const canvas = new PromptEngine(&#123;</div>
              <div className="pl-4">mode: 'spatial',</div>
              <div className="pl-4">tokens: ['#07070A', '{accentColor}']</div>
              <div>&#125;);</div>
              <div className="text-[#3DFFA2]">&gt; Compiled successfully in 14ms.</div>
            </div>
          </div>
        </div>

        {/* RIGHT: DESIGNER */}
        <div ref={rightRef} className="w-full md:w-1/2 h-full bg-[#0a0b10] p-12 flex flex-col justify-center relative z-20">
          <div className="max-w-xl mx-auto w-full">
            <div className="flex items-center gap-2 font-mono text-xs text-[#FF3B5C] mb-4">
              <Palette className="w-4 h-4" />
              <span>{'<CREATOR role="designer">'}</span>
            </div>
            <h3 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">
              12-color harmonic spectrums.
            </h3>
            <div className="grid grid-cols-4 gap-3 mb-4">
              {['#07070A', accentColor, '#22D3EE', '#3DFFA2', '#FF3B5C', '#9D4EDD', '#FFB703', '#00F59B'].map((c, i) => (
                <div key={i} className="h-14 rounded-xl border border-white/15 flex items-end p-2" style={{ backgroundColor: c }}>
                  <span className="text-[10px] font-mono font-bold text-black bg-white/80 px-1 rounded">{c}</span>
                </div>
              ))}
            </div>
            <div className="font-mono text-xs text-[#8E8E98]">
              TYPOGRAPHY: <span className="text-white font-bold">Space Grotesk</span> + <span className="text-[#22D3EE] font-bold">JetBrains Mono</span>
            </div>
          </div>
        </div>

      </div>

      {/* MERGED CENTER REVEAL */}
      <div ref={mergeRef} className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-10 opacity-0 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/15 text-white font-mono text-xs tracking-widest uppercase mb-6 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5" style={{ color: accentColor }} />
          <span>SYNTHESIS COMPLETE</span>
        </div>
        <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter mb-6">
          One prompt. <br />
          <span className="text-transparent bg-clip-text" style={{ WebkitTextStroke: `2px ${accentColor}` }}>
            Both worlds.
          </span>
        </h2>
        <p className="text-slate-400 text-lg max-w-xl font-light">
          Simultaneous developer code generation and designer color space synchronization in a single unified workflow.
        </p>
      </div>

    </div>
  );
};
