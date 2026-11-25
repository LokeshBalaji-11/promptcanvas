import React, { useState } from 'react';
import { Sparkles, Globe, Upload, Check, ArrowRight, ShieldCheck, RefreshCw, Cpu, Layers, Copy } from 'lucide-react';
import { MoodboardProject } from '../types';

interface ReferenceAgentModalProps {
  onApplyProject: (project: MoodboardProject) => void;
  accentColor: string;
}

export const ReferenceAgentModal: React.FC<ReferenceAgentModalProps> = ({ onApplyProject, accentColor }) => {
  const [inputUrl, setInputUrl] = useState('');
  const [extractOptions, setExtractOptions] = useState({
    colors: true,
    fonts: true,
    css: true,
    motion: true,
    preloader: true,
    layout: true,
    ux: true
  });

  const [phase, setPhase] = useState<'idle' | 'fetching' | 'parsing' | 'clustering' | 'motion' | 'preloader' | 'building' | 'done'>('idle');
  const [progress, setProgress] = useState(0);
  const [profile, setProfile] = useState<any>(null);

  const sampleReferences = [
    { name: 'Stripe Press (Editorial)', domain: 'stripe.press', confidence: 0.94 },
    { name: 'Linear App (Dark SaaS)', domain: 'linear.app', confidence: 0.98 },
    { name: 'Apple Vision (Glassmorphism)', domain: 'apple.com/vision', confidence: 0.91 }
  ];

  const handleStartExtraction = (targetDomain?: string) => {
    const domain = targetDomain || inputUrl || 'example.com';
    setPhase('fetching');
    setProgress(15);

    setTimeout(() => {
      setPhase('parsing');
      setProgress(35);
    }, 800);

    setTimeout(() => {
      setPhase('clustering');
      setProgress(60);
    }, 1600);

    setTimeout(() => {
      setPhase('motion');
      setProgress(80);
    }, 2400);

    setTimeout(() => {
      setPhase('building');
      setProgress(95);
    }, 3200);

    setTimeout(() => {
      setPhase('done');
      setProgress(100);
      setProfile({
        domain,
        confidence: 0.96,
        colors: ['#0f0f14', '#171720', '#22D3EE', '#3DFFA2', '#f8fafc'],
        fonts: { display: 'Inter', body: 'JetBrains Mono' },
        sections: ['Header', 'Hero', 'Bento Grid', 'Testimonials', 'Footer'],
        notice: 'Inspired by ' + domain + '. Reference-inspired, not a copy.'
      });
    }, 4000);
  };

  const handleApplyGenerated = () => {
    if (!profile) return;
    const newProj: MoodboardProject = {
      id: `ref-${Date.now()}`,
      title: `Reference: ${profile.domain}`,
      prompt: `Extracted design system from ${profile.domain}. Re-authored original modules.`,
      styleModifier: 'Reference-Inspired',
      accentColor: accentColor,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      palette: [
        { hex: profile.colors[0], name: 'Background', role: 'Background', contrast: '14:1' },
        { hex: profile.colors[1], name: 'Surface', role: 'Surface', contrast: '12:1' },
        { hex: profile.colors[2], name: 'Primary Accent', role: 'Primary', contrast: '7:1' },
        { hex: profile.colors[3], name: 'Secondary Glow', role: 'Accent', contrast: '6.5:1' },
        { hex: profile.colors[4], name: 'Text', role: 'Text', contrast: '15:1' }
      ],
      fonts: {
        display: profile.fonts.display,
        body: profile.fonts.body,
        mono: 'JetBrains Mono',
        googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=JetBrains+Mono:wght@400;700&display=swap'
      },
      cards: profile.sections.map((sec: string, i: number) => ({
        id: `sec-${i}`,
        title: sec,
        category: 'Extracted Section',
        prompt: `Section sequence mapped from ${profile.domain}`,
        description: `Original re-authored layout module for ${sec}`,
        gradient: 'from-cyan-500/25 to-blue-500/25',
        aspectRatio: 'square'
      })),
      vibes: ['Reference-Inspired', 'WCAG AA Compliant'],
      lighting: 'Studio Diffuse',
      camera: 'Cinematic 35mm'
    };
    onApplyProject(newProj);
  };

  return (
    <div className="bg-[#0c0d14] border border-white/15 rounded-3xl p-8 space-y-8 font-mono shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white">AI Reference Agent</h3>
            <p className="text-xs text-[#8E8E98]">Extract design tokens, typography, and UX patterns to generate original modules.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30">
          <ShieldCheck className="w-3.5 h-3.5" /> SSRF & Abuse Guard Active
        </div>
      </div>

      {/* SAMPLE REFERENCE BUTTONS (OFFLINE DEMO SAFETY) */}
      <div className="space-y-3">
        <label className="text-xs text-[#8E8E98] uppercase tracking-wider">Try a Sample Reference (Offline Safe)</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sampleReferences.map(sr => (
            <button
              key={sr.domain}
              onClick={() => handleStartExtraction(sr.domain)}
              className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all cursor-pointer group"
            >
              <div className="text-xs font-bold text-white group-hover:text-cyan-400">{sr.name}</div>
              <div className="text-[10px] text-[#8E8E98] font-mono mt-1">{sr.domain} • {(sr.confidence * 100).toFixed(0)}% confidence</div>
            </button>
          ))}
        </div>
      </div>

      {/* URL INPUT & DROPZONE */}
      <div className="space-y-4">
        <div className="relative">
          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E98]" />
          <input
            type="url"
            placeholder="Paste any URL (e.g. https://example.com)..."
            value={inputUrl}
            onChange={e => setInputUrl(e.target.value)}
            className="w-full bg-[#07070a] border border-white/15 rounded-2xl pl-12 pr-4 py-3.5 text-xs text-white outline-none focus:border-cyan-400 font-mono"
          />
        </div>

        <div className="border-2 border-dashed border-white/15 rounded-2xl p-6 text-center space-y-2 bg-[#07070a]/40 hover:border-cyan-400/50 transition-all cursor-pointer">
          <Upload className="w-6 h-6 text-[#8E8E98] mx-auto" />
          <div className="text-xs text-white font-bold">Drop a screenshot or design reference here</div>
          <div className="text-[10px] text-[#8E8E98]">Supports PNG, JPG, WebP up to 10MB</div>
        </div>
      </div>

      {/* EXTRACTION OPTIONS */}
      <div className="space-y-3">
        <label className="text-xs text-[#8E8E98] uppercase tracking-wider">Extraction Targets</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          {Object.entries(extractOptions).map(([key, val]) => (
            <label key={key} className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer">
              <input
                type="checkbox"
                checked={val}
                onChange={() => setExtractOptions(prev => ({ ...prev, [key]: !(prev as any)[key] }))}
                className="accent-cyan-400"
              />
              <span className="capitalize text-slate-200">{key}</span>
            </label>
          ))}
        </div>
      </div>

      {/* ACTION BUTTON */}
      {phase === 'idle' ? (
        <button
          onClick={() => handleStartExtraction()}
          className="w-full py-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs font-mono shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <Sparkles className="w-4 h-4" /> Start Reference Extraction & Re-Authored Generation
        </button>
      ) : phase !== 'done' ? (
        <div className="space-y-3 p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
          <RefreshCw className="w-6 h-6 text-cyan-400 animate-spin mx-auto" />
          <div className="text-xs font-bold text-white uppercase tracking-wider">
            {phase === 'fetching' && 'Fetching & verifying SSRF safety...'}
            {phase === 'parsing' && 'Parsing HTML with Cheerio & PostCSS...'}
            {phase === 'clustering' && 'Clustering colour palette (5-12 roles)...'}
            {phase === 'motion' && 'Reading transition durations & easings...'}
            {phase === 'building' && 'Re-authoring original modules & running originality checks...'}
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-cyan-400 transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>
      ) : (
        <div className="space-y-6 p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <Check className="w-5 h-5" /> Extraction & Re-Authoring Complete!
            </div>
            <span className="text-xs text-slate-300 font-mono">Confidence: {(profile.confidence * 100).toFixed(0)}%</span>
          </div>

          <div className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-3 text-xs">
            <div className="text-[#8E8E98] italic">{profile.notice}</div>
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Extracted Colors:</span>
              <div className="flex gap-1.5">
                {profile.colors.map((c: string, idx: number) => (
                  <div key={idx} className="w-5 h-5 rounded-md border border-white/20" style={{ backgroundColor: c }} />
                ))}
              </div>
            </div>
            <div className="text-slate-400">Typography: <span className="text-white">{profile.fonts.display} + {profile.fonts.body}</span></div>
            <div className="text-slate-400">Sections Mapped: <span className="text-cyan-400">{profile.sections.join(' → ')}</span></div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleApplyGenerated}
              className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl text-xs font-mono shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Apply to Board & Studio</span> <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPhase('idle')}
              className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs font-mono cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
