import React from 'react';

export const EditorialColumnsPreview: React.FC<{ config: any }> = () => (
  <div className="h-48 rounded-xl bg-[#090a0f] border border-white/15 p-4 grid grid-cols-2 gap-4 text-xs font-mono">
    <div className="space-y-2 border-r border-white/10 pr-3">
      <div className="font-bold text-cyan-400">Column 1: Narrative</div>
      <p className="text-[10px] text-slate-400">Typography structured with optimal line length and editorial rhythm.</p>
    </div>
    <div className="space-y-2 pl-1">
      <div className="font-bold text-fuchsia-400">Column 2: Commentary</div>
      <p className="text-[10px] text-slate-400">Supporting marginalia and secondary analytical data.</p>
    </div>
  </div>
);

export const MasonryPreview: React.FC<{ config: any }> = () => (
  <div className="h-48 rounded-xl bg-[#090a0f] border border-white/15 p-3 grid grid-cols-3 gap-2 text-xs font-mono">
    <div className="bg-white/5 border border-white/10 rounded-lg p-3 h-28 flex flex-col justify-between"><span>Card A (Tall)</span></div>
    <div className="bg-white/5 border border-white/10 rounded-lg p-3 h-16 flex flex-col justify-between"><span>Card B</span></div>
    <div className="bg-white/5 border border-white/10 rounded-lg p-3 h-24 flex flex-col justify-between"><span>Card C</span></div>
  </div>
);

export const SingleColumnStoryPreview: React.FC<{ config: any }> = () => (
  <div className="h-48 rounded-xl bg-[#090a0f] border border-white/15 p-6 max-w-sm mx-auto flex flex-col justify-center space-y-2 text-xs font-mono text-center">
    <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 mx-auto flex items-center font-bold justify-center">§</div>
    <div className="font-bold text-white text-sm">Focused Narrative Story</div>
    <p className="text-[10px] text-slate-400">Immersive reading width optimized for human comprehension.</p>
  </div>
);

export const SplitScreenPreview: React.FC<{ config: any }> = () => (
  <div className="h-48 rounded-xl bg-[#090a0f] border border-white/15 grid grid-cols-2 text-xs font-mono overflow-hidden">
    <div className="bg-cyan-950/30 p-4 flex flex-col justify-center items-center text-center border-r border-white/10">
      <div className="font-bold text-cyan-300">Left Pane</div>
      <p className="text-[10px] text-slate-400 mt-1">Immersive media / visual canvas</p>
    </div>
    <div className="bg-[#12131c] p-4 flex flex-col justify-center items-center text-center">
      <div className="font-bold text-white">Right Pane</div>
      <p className="text-[10px] text-slate-400 mt-1">Interactive form / action flow</p>
    </div>
  </div>
);

export const TimelinePreview: React.FC<{ config: any }> = () => (
  <div className="h-48 rounded-xl bg-[#090a0f] border border-white/15 p-4 flex flex-col justify-around text-xs font-mono">
    {['Phase 1: Architecture', 'Phase 2: Agent Harness', 'Phase 3: Production Deploy'].map((step, idx) => (
      <div key={idx} className="flex items-center gap-3">
        <div className="w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-400 text-[10px] flex items-center justify-center font-bold">{idx+1}</div>
        <div className="text-slate-300">{step}</div>
      </div>
    ))}
  </div>
);
