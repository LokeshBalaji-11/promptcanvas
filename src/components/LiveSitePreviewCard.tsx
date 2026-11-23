import React, { useState } from 'react';
import { Monitor, Sun, Moon, Copy, Check, ExternalLink } from 'lucide-react';
import { MoodboardProject } from '../types';

interface LiveSitePreviewCardProps {
  project: MoodboardProject;
  accentColor: string;
  onCopyHtml: () => void;
}

export const LiveSitePreviewCard: React.FC<LiveSitePreviewCardProps> = ({ project, accentColor, onCopyHtml }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  const bg = isDarkMode ? project.palette[0].hex : '#f8fafc';
  const surface = isDarkMode ? project.palette[1].hex : '#ffffff';
  const textPrimary = isDarkMode ? '#f8fafc' : '#0f172a';
  const textMuted = isDarkMode ? '#94a3b8' : '#64748b';

  return (
    <div className="bg-[#0a0b10] border border-white/15 rounded-3xl p-6 shadow-2xl flex flex-col justify-between group md:col-span-2">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#8E8E98]">
            <Monitor className="w-4 h-4" style={{ color: accentColor }} /> Live Website Preview Component
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-white hover:bg-white/10 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              {isDarkMode ? <Sun className="w-3 h-3 text-amber-400" /> : <Moon className="w-3 h-3 text-indigo-400" />}
              {isDarkMode ? 'Light' : 'Dark'}
            </button>

            <button
              onClick={onCopyHtml}
              className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-white hover:bg-white/10 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Copy className="w-3 h-3" style={{ color: accentColor }} /> Copy HTML
            </button>
          </div>
        </div>

        {/* MINI WEBSITE PREVIEW FRAME */}
        <div 
          className="rounded-2xl p-6 transition-all duration-300 border border-white/10 shadow-inner overflow-hidden relative"
          style={{ backgroundColor: bg, color: textPrimary, fontFamily: project.fonts.body }}
        >
          {/* Mini Nav */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
            <div className="font-extrabold text-sm tracking-tight" style={{ fontFamily: project.fonts.display }}>
              ROXTEN<span style={{ color: accentColor }}>.AI</span>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-xs font-mono opacity-70">
              <span>Features</span>
              <span>Architecture</span>
              <span>Pricing</span>
            </div>
            <div 
              className="px-3 py-1.5 rounded-xl text-xs font-bold font-mono shadow-md"
              style={{ backgroundColor: accentColor, color: '#000000' }}
            >
              Get Started
            </div>
          </div>

          {/* Mini Hero */}
          <div className="py-6 text-center max-w-lg mx-auto">
            <div className="inline-block px-3 py-1 rounded-full text-[10px] font-mono mb-3 bg-white/10" style={{ color: accentColor }}>
              • SPATIAL WEB ENGINE v2.5
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-3" style={{ fontFamily: project.fonts.display }}>
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm font-light mb-6 opacity-80" style={{ color: textMuted }}>
              {project.prompt}
            </p>
            <div className="flex items-center justify-center gap-3">
              <button 
                className="px-5 py-2.5 rounded-xl text-xs font-bold font-mono shadow-lg transition-all"
                style={{ backgroundColor: accentColor, color: '#000000' }}
              >
                Explore System
              </button>
              <button className="px-5 py-2.5 rounded-xl text-xs font-bold font-mono border border-white/20">
                Documentation
              </button>
            </div>
          </div>

          {/* Mini Stats Row */}
          <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-white/10 text-center">
            <div className="p-2 rounded-xl bg-white/5">
              <div className="text-base font-black font-mono" style={{ color: accentColor }}>99.9%</div>
              <div className="text-[10px] opacity-60">Uptime</div>
            </div>
            <div className="p-2 rounded-xl bg-white/5">
              <div className="text-base font-black font-mono">0.4s</div>
              <div className="text-[10px] opacity-60">Latency</div>
            </div>
            <div className="p-2 rounded-xl bg-white/5">
              <div className="text-base font-black font-mono" style={{ color: accentColor }}>100%</div>
              <div className="text-[10px] opacity-60">WCAG AA</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-[#8E8E98] flex justify-between items-center">
        <span>Live Token Binding</span>
        <span style={{ color: accentColor }}>Active</span>
      </div>
    </div>
  );
};
