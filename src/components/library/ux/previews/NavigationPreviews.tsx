import React, { useState } from 'react';
import { Command, Search, Home, Compass, Bell, User, Menu, ChevronRight } from 'lucide-react';

export const TopBarPreview: React.FC<{ config: any }> = ({ config }) => (
  <div className="h-48 rounded-xl bg-[#090a0f] border border-white/15 flex flex-col overflow-hidden text-xs font-mono">
    <div className="h-12 bg-[#12131c] border-b border-white/10 px-4 flex items-center justify-between">
      <div className="font-bold text-cyan-400">TopBar Brand</div>
      <div className="flex gap-4 text-slate-300">
        <span className="hover:text-white cursor-pointer">Dashboard</span>
        <span className="hover:text-white cursor-pointer">Explore</span>
        <span className="hover:text-white cursor-pointer">Settings</span>
      </div>
      <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">U</div>
    </div>
    <div className="p-4 flex-1 bg-black/40 flex items-center justify-center text-slate-400">
      [Top Bar Content Area - Sticky: {String(config.stickyHeader ?? true)}]
    </div>
  </div>
);

export const LeftSidebarPreview: React.FC<{ config: any }> = ({ config }) => (
  <div className="h-48 rounded-xl bg-[#090a0f] border border-white/15 flex overflow-hidden text-xs font-mono">
    <div className="w-36 bg-[#12131c] border-r border-white/15 p-3 flex flex-col justify-between">
      <div className="space-y-2">
        <div className="font-bold text-cyan-400 mb-3">SidebarOS</div>
        <div className="p-2 rounded bg-cyan-500/20 text-cyan-300">Home</div>
        <div className="p-2 text-slate-400 hover:text-white">Analytics</div>
        <div className="p-2 text-slate-400 hover:text-white">Settings</div>
      </div>
      <div className="text-[10px] text-slate-500">v3.2 active</div>
    </div>
    <div className="flex-1 p-4 bg-black/40 flex items-center justify-center text-slate-400">
      [Main Workspace Pane]
    </div>
  </div>
);

export const CollapsibleRailPreview: React.FC<{ config: any }> = ({ config }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="h-48 rounded-xl bg-[#090a0f] border border-white/15 flex overflow-hidden text-xs font-mono" onMouseEnter={() => setExpanded(true)} onMouseLeave={() => setExpanded(false)}>
      <div className={`bg-[#12131c] border-r border-white/15 p-3 flex flex-col justify-between transition-all duration-300 ${expanded ? 'w-40' : 'w-16'}`}>
        <div className="space-y-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold">R</div>
          <div className="flex items-center gap-2 text-slate-300 p-1.5 rounded hover:bg-white/5 cursor-pointer">
            <Home className="w-4 h-4 shrink-0" />
            {expanded && <span>Home</span>}
          </div>
          <div className="flex items-center gap-2 text-slate-300 p-1.5 rounded hover:bg-white/5 cursor-pointer">
            <Compass className="w-4 h-4 shrink-0" />
            {expanded && <span>Explore</span>}
          </div>
        </div>
        <div className="text-[10px] text-slate-500">{expanded ? 'Expanded' : 'Rail'}</div>
      </div>
      <div className="flex-1 p-4 bg-black/40 flex items-center justify-center text-slate-400">
        [Hover rail to expand]
      </div>
    </div>
  );
};

export const BottomTabBarPreview: React.FC<{ config: any }> = ({ config }) => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="h-48 w-64 mx-auto rounded-3xl bg-[#090a0f] border-4 border-slate-800 flex flex-col overflow-hidden text-xs font-mono shadow-xl relative">
      <div className="flex-1 p-4 flex items-center justify-center text-slate-300 font-bold">
        Tab {activeTab + 1} View
      </div>
      <div className="h-14 bg-[#12131c] border-t border-white/10 px-4 flex items-center justify-around text-slate-400">
        {[Home, Compass, Bell, User].map((Icon, idx) => (
          <button key={idx} onClick={() => setActiveTab(idx)} className={`p-2 rounded-xl transition-all ${activeTab === idx ? 'text-cyan-400 bg-cyan-500/10' : 'hover:text-white'}`}>
            <Icon className="w-4 h-4" />
          </button>
        ))}
      </div>
    </div>
  );
};

export const CommandPaletteNavPreview: React.FC<{ config: any }> = ({ config }) => {
  const [open, setOpen] = useState(true);
  const [query, setQuery] = useState('');
  return (
    <div className="h-48 rounded-xl bg-[#090a0f] border border-white/15 p-4 relative overflow-hidden text-xs font-mono flex flex-col justify-between">
      <div className="text-slate-500">[Background Workspace] Press Cmd+K</div>
      {open && (
        <div className="absolute inset-4 bg-[#12131c] border border-cyan-500/40 rounded-xl p-3 shadow-2xl flex flex-col gap-2">
          <div className="flex items-center gap-2 border-b border-white/10 pb-2">
            <Search className="w-4 h-4 text-cyan-400" />
            <input type="text" autoFocus placeholder="Type a command..." value={query} onChange={e => setQuery(e.target.value)} className="bg-transparent text-white outline-none flex-1 font-mono text-xs" />
            <button onClick={() => setOpen(false)} className="text-slate-500 hover:text-white">✕</button>
          </div>
          <div className="space-y-1">
            <div className="p-1.5 rounded bg-cyan-500/20 text-cyan-300 flex justify-between items-center"><span>Go to Dashboard</span><span className="text-[10px]">↵</span></div>
            <div className="p-1.5 rounded text-slate-400 hover:bg-white/5">Settings & Preferences</div>
          </div>
        </div>
      )}
    </div>
  );
};

export const FloatingPillNavPreview: React.FC<{ config: any }> = ({ config }) => (
  <div className="h-48 rounded-xl bg-gradient-to-r from-cyan-950/40 to-blue-950/40 border border-white/15 p-6 flex flex-col justify-between text-xs font-mono relative">
    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md border border-white/20 px-6 py-2.5 rounded-full flex items-center gap-6 shadow-2xl text-white">
      <span className="font-bold text-cyan-400">PillOS</span>
      <span className="text-slate-300 hover:text-white cursor-pointer">Features</span>
      <span className="text-slate-300 hover:text-white cursor-pointer">Pricing</span>
      <button className="px-3 py-1 rounded-full bg-cyan-500 text-black font-bold">Join</button>
    </div>
    <div className="text-center text-slate-400 mt-12">[Immersive Hero Content Beneath Floating Pill]</div>
  </div>
);
