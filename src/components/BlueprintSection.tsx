import React from 'react';
import { Palette, Type } from 'lucide-react';

interface BlueprintSectionProps {
  accentColor: string;
}

export const BlueprintSection: React.FC<BlueprintSectionProps> = ({ accentColor }) => {
  return (
    <section className="py-28 px-8 md:px-16 max-w-7xl mx-auto relative z-10">
      <div className="flex items-center gap-3 mb-4 font-mono text-xs text-[#8E8E98] uppercase tracking-widest">
        <span>[01] ARCHITECTURAL BLUEPRINT</span>
        <div className="h-[1px] flex-1 bg-white/10" />
      </div>

      <h3 className="text-4xl md:text-5xl font-extrabold text-[#F5F5F5] tracking-tight mb-16">
        FOUNDATIONAL <span style={{ color: accentColor }}>SYSTEMS</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LEFT BLUEPRINT CARD: PALETTES */}
        <div className="relative bg-[#0a0b10] border border-white/15 rounded-3xl p-8 overflow-hidden group hover:border-white/30 transition-all">
          <div className="absolute top-0 right-0 p-6 font-mono text-[10px] text-[#8E8E98] tracking-widest">
            ASC 1020 • CAP 730 • X 550
          </div>
          
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl mb-8 font-mono font-bold" style={{ color: accentColor }}>
            {'{ ■ }'}
          </div>

          <div className="font-mono text-xs text-[#8E8E98] mb-2">{'<01, PALETTES & TOKENS>'}</div>
          <h4 className="text-2xl font-bold text-white mb-4">COLOR & ACCENT HARMONICS</h4>
          <p className="text-sm text-[#8E8E98] leading-relaxed font-light mb-8">
            Algorithmic color synthesis generating 5-color WCAG AA compliant palettes tailored to your prompt's emotional temperature and lighting vectors.
          </p>

          <div className="flex items-center gap-3 pt-6 border-t border-white/10 font-mono text-xs text-white">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: accentColor }} />
            <span>DYNAMIC ACCENT SYNC ACTIVE</span>
          </div>
        </div>

        {/* RIGHT BLUEPRINT CARD: TYPOGRAPHY */}
        <div className="relative bg-[#0a0b10] border border-white/15 rounded-3xl p-8 overflow-hidden group hover:border-white/30 transition-all">
          <div className="absolute top-0 right-0 p-6 font-mono text-[10px] text-[#8E8E98] tracking-widest">
            BASE 0 • DESC -300 • JETBRAINS
          </div>
          
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl mb-8 font-mono font-bold text-white">
            Aa
          </div>

          <div className="font-mono text-xs text-[#8E8E98] mb-2">{'<02, TYPOGRAPHY & HIERARCHY>'}</div>
          <h4 className="text-2xl font-bold text-white mb-4">GOOGLE FONT PAIRING</h4>
          <p className="text-sm text-[#8E8E98] leading-relaxed font-light mb-8">
            Instantaneous pairing of display typography, body copy, and JetBrains Mono metadata with live Google Font injection and CSS variables.
          </p>

          <div className="flex items-center gap-3 pt-6 border-t border-white/10 font-mono text-xs text-white">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <span>LIVE INJECTION ACTIVE</span>
          </div>
        </div>
      </div>
    </section>
  );
};
