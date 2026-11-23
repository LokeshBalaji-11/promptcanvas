import React from 'react';
import { Layers, Sparkles, Download, ArrowRight } from 'lucide-react';

interface IsometricFeaturesProps {
  accentColor: string;
  onLaunchPrompt: () => void;
  onLaunchArrange: () => void;
  onLaunchCode: () => void;
}

export const IsometricFeatures: React.FC<IsometricFeaturesProps> = ({ accentColor, onLaunchPrompt, onLaunchArrange, onLaunchCode }) => {
  return (
    <section className="py-28 px-8 md:px-16 max-w-7xl mx-auto relative z-10">
      <div className="flex items-center gap-3 mb-4 font-mono text-xs text-[#8E8E98] uppercase tracking-widest">
        <span>[03] SYSTEM CAPABILITIES</span>
        <div className="h-[1px] flex-1 bg-white/10" />
      </div>

      <h3 className="text-4xl md:text-5xl font-extrabold text-[#F5F5F5] tracking-tight mb-16">
        WIRE-TO-SOLID <span style={{ color: accentColor }}>ENGINEERING</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* CARD 1 */}
        <div 
          onClick={onLaunchPrompt}
          className="bg-[#0a0b10] border border-white/15 rounded-3xl p-8 flex flex-col justify-between group hover:border-white/40 transition-all cursor-pointer shadow-2xl hover:-translate-y-1"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6" style={{ color: accentColor }}>
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="font-mono text-xs text-[#8E8E98] mb-1">01 // PROMPT.EXE</div>
            <h4 className="text-xl font-bold text-white mb-3">PROMPT TO BOARD</h4>
            <p className="text-sm text-[#8E8E98] font-light leading-relaxed mb-6">
              Neural keyword parsing engine translates natural language briefs into structured spatial moodboards in under 800ms.
            </p>
          </div>
          <div className="font-mono text-xs text-white pt-4 border-t border-white/10 flex items-center justify-between group-hover:text-[#CCFF00]" style={{ '--hover-color': accentColor } as any}>
            <span>[LAUNCH COMMAND BAR]</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* CARD 2 */}
        <div 
          onClick={onLaunchArrange}
          className="bg-[#0a0b10] border border-white/15 rounded-3xl p-8 flex flex-col justify-between group hover:border-white/40 transition-all cursor-pointer shadow-2xl hover:-translate-y-1"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-cyan-400">
              <Layers className="w-6 h-6" />
            </div>
            <div className="font-mono text-xs text-[#8E8E98] mb-1">02 // ARRANGE.EXE</div>
            <h4 className="text-xl font-bold text-white mb-3">DRAG & COMPOSE</h4>
            <p className="text-sm text-[#8E8E98] font-light leading-relaxed mb-6">
              Interactive dot-grid canvas with z-index elevation, magnetic snap, and one-click auto-arrange bento layouts.
            </p>
          </div>
          <div className="font-mono text-xs text-white pt-4 border-t border-white/10 flex items-center justify-between group-hover:text-cyan-400">
            <span>[AUTO-ARRANGE BENTO]</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* CARD 3 */}
        <div 
          onClick={onLaunchCode}
          className="bg-[#0a0b10] border border-white/15 rounded-3xl p-8 flex flex-col justify-between group hover:border-white/40 transition-all cursor-pointer shadow-2xl hover:-translate-y-1"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-rose-400">
              <Download className="w-6 h-6" />
            </div>
            <div className="font-mono text-xs text-[#8E8E98] mb-1">03 // EXPORT.EXE</div>
            <h4 className="text-xl font-bold text-white mb-3">SHIP IN ONE CLICK</h4>
            <p className="text-sm text-[#8E8E98] font-light leading-relaxed mb-6">
              Export high-res PNG summaries, formatted PDF brand reports, or instant CSS and Tailwind token bundles.
            </p>
          </div>
          <div className="font-mono text-xs text-white pt-4 border-t border-white/10 flex items-center justify-between group-hover:text-rose-400">
            <span>[OPEN CODE & EXPORT]</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </section>
  );
};
