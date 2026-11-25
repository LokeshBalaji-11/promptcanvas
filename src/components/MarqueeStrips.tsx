import React, { useEffect, useRef } from 'react';

interface MarqueeStripsProps {
  accentColor: string;
}

export const MarqueeStrips: React.FC<MarqueeStripsProps> = ({ accentColor }) => {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const pos1 = useRef<number>(0);
  const pos2 = useRef<number>(0);
  const lastScrollY = useRef<number>(0);
  const velocity = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      velocity.current = currentScroll - lastScrollY.current;
      lastScrollY.current = currentScroll;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    let animationFrameId: number;
    const render = () => {
      const v = Math.min(15, Math.max(-15, velocity.current)) * 0.5;

      pos1.current -= (1.5 + v);
      pos2.current += (1.5 + v);

      if (row1Ref.current) {
        row1Ref.current.style.transform = `translateX(${pos1.current % 1000}px)`;
      }
      if (row2Ref.current) {
        row2Ref.current.style.transform = `translateX(${pos2.current % 1000}px)`;
      }

      // Decay velocity
      velocity.current *= 0.9;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const items = ['PROMPT', '→', 'MOODBOARD', '→', 'CODE', '→', 'SPATIAL', '→', 'SYNTHESIS', '→'];

  return (
    <section className="py-24 bg-[#07070A] overflow-hidden border-t border-white/10 relative">
      <div className="absolute top-6 left-8 z-20 font-mono text-xs text-[#8E8E98] tracking-widest flex items-center gap-2">
        <span className="text-[#FF3B5C]">[03]</span>
        <span>VELOCITY-REACTIVE MARQUEES</span>
      </div>

      <div className="space-y-6 overflow-hidden py-12">
        {/* ROW 1 */}
        <div className="flex whitespace-nowrap overflow-hidden">
          <div ref={row1Ref} className="flex gap-8 items-center text-4xl md:text-7xl font-black text-white uppercase tracking-tighter">
            {[...items, ...items, ...items].map((text, i) => (
              <span key={i} className="flex items-center gap-8">
                <span className={text === '→' ? '' : 'hover:text-transparent hover:bg-clip-text transition-colors'} style={text !== '→' ? { WebkitTextStroke: `1px ${accentColor}` } : { color: accentColor }}>
                  {text}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* ROW 2 (Opposite Direction) */}
        <div className="flex whitespace-nowrap overflow-hidden">
          <div ref={row2Ref} className="flex gap-8 items-center text-4xl md:text-7xl font-black text-white uppercase tracking-tighter">
            {[...items, ...items, ...items].reverse().map((text, i) => (
              <span key={i} className="flex items-center gap-8">
                <span className={text === '→' ? '' : 'text-transparent bg-clip-text'} style={text !== '→' ? { backgroundImage: `linear-gradient(to right, #fff, ${accentColor})` } : { color: accentColor }}>
                  {text}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
