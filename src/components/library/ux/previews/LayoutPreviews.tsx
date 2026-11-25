import React from 'react';

export const BentoGridPreview: React.FC<{ config: any }> = ({ config }) => (
  <div className="h-48 rounded-xl bg-[#090a0f] border border-white/15 p-3 grid grid-cols-3 gap-2 text-xs font-mono">
    <div className="col-span-2 bg-cyan-500/20 border border-cyan-500/30 rounded-lg p-3 flex flex-col justify-between">
      <div className="font-bold text-cyan-300">Featured Hero Bento</div>
      <div className="text-[10px] text-zinc-400">Span 2 cols</div>
    </div>
    <div className="bg-white/5 border border-white/10 rounded-lg p-3 flex flex-col justify-between">
      <div className="font-bold text-white">Metric</div>
      <div className="text-lg font-black text-cyan-400">99.9%</div>
    </div>
    <div className="bg-white/5 border border-white/10 rounded-lg p-3">Small Card</div>
    <div className="col-span-2 bg-white/5 border border-white/10 rounded-lg p-3">Wide Card</div>
  </div>
);

export const DashboardGridPreview: React.FC<{ config: any }> = ({ config }) => (
  <div className="h-48 rounded-xl bg-[#090a0f] border border-white/15 p-3 grid grid-cols-4 gap-2 text-xs font-mono">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-2.5 flex flex-col justify-between">
        <div className="text-[10px] text-zinc-400">Widget {i+1}</div>
        <div className="font-bold text-white text-sm">+$4,280</div>
      </div>
    ))}
  </div>
);
