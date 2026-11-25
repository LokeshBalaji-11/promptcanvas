import React, { useState } from 'react';
import { UX_PATTERNS, UxPattern } from '../../library/uxPatterns';
import { Layout, Check, Sparkles, Sliders, Eye, ArrowRight, ShieldCheck } from 'lucide-react';

interface UxPatternStudioProps {
  onApplyUxConfig: (pattern: UxPattern, config: any) => void;
  accentColor: string;
}

export const UxPatternStudio: React.FC<UxPatternStudioProps> = ({ onApplyUxConfig, accentColor }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Navigation');
  const [selectedPattern, setSelectedPattern] = useState<UxPattern>(UX_PATTERNS[0]);
  const [config, setConfig] = useState(selectedPattern.defaultConfig);
  const [compareMode, setCompareMode] = useState<boolean>(false);
  const [appliedSuccess, setAppliedSuccess] = useState<boolean>(false);

  const categories = ['Navigation', 'Layout', 'Content Density', 'Interaction'];

  const handleSelect = (p: UxPattern) => {
    setSelectedPattern(p);
    setConfig(p.defaultConfig);
  };

  const handleApply = () => {
    onApplyUxConfig(selectedPattern, config);
    setAppliedSuccess(true);
    setTimeout(() => setAppliedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between border-b border-white/10 pb-4 gap-4">
        <div>
          <h2 className="text-lg font-black text-white uppercase tracking-wider">UX/UI Structural Pattern Studio (40 Patterns)</h2>
          <p className="text-xs text-zinc-400">Instantly rearrange DOM structure, navigation layout, and content density via BoardState.</p>
        </div>
        <button
          onClick={handleApply}
          className={`px-5 py-2.5 rounded-xl font-bold font-mono text-xs shadow-lg transition-all flex items-center gap-2 cursor-pointer ${
            appliedSuccess ? 'bg-emerald-500 text-black' : 'bg-cyan-500 text-black hover:bg-cyan-400'
          }`}
        >
          {appliedSuccess ? <><Check className="w-4 h-4" /> Applied to Live Preview ✓</> : <><Sparkles className="w-4 h-4" /> Apply UX Pattern</>}
        </button>
      </div>

      {/* CATEGORY TABS */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl font-mono text-xs whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat ? 'bg-white text-black font-bold shadow-md' : 'bg-white/5 text-zinc-400 border border-white/10 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* PATTERN SELECTOR LIST (COL 5) */}
        <div className="lg:col-span-5 bg-[#101015] border border-white/10 rounded-2xl p-4 space-y-2 max-h-[600px] overflow-y-auto">
          {UX_PATTERNS.filter(p => p.category === selectedCategory).map(p => (
            <div
              key={p.id}
              onClick={() => handleSelect(p)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                selectedPattern.id === p.id ? 'bg-cyan-500/10 border-cyan-500/50 text-white' : 'bg-[#07070a] border-white/5 text-zinc-400 hover:text-white hover:border-white/15'
              }`}
            >
              <div>
                <div className="text-xs font-bold">{p.name}</div>
                <div className="text-[10px] text-zinc-500 font-mono mt-0.5 line-clamp-1">{p.description}</div>
              </div>
              {selectedPattern.id === p.id && <div className="w-2 h-2 rounded-full bg-cyan-400" />}
            </div>
          ))}
        </div>

        {/* PREVIEW & PARAMS WORKSPACE (COL 7) */}
        <div className="lg:col-span-7 bg-[#101015] border border-white/10 rounded-2xl p-6 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">{selectedPattern.category}</span>
                <h3 className="text-xl font-black text-white">{selectedPattern.name}</h3>
                <p className="text-xs text-zinc-400">{selectedPattern.description}</p>
              </div>
              <button
                onClick={() => setCompareMode(!compareMode)}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs border transition-colors ${
                  compareMode ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' : 'bg-white/5 text-zinc-400 border-white/10'
                }`}
              >
                {compareMode ? 'Comparing Before/After' : 'Toggle Compare'}
              </button>
            </div>

            {/* ANIMATED WIREFRAME PREVIEW */}
            <div className="h-56 rounded-2xl bg-[#07070a] border border-white/10 p-6 flex flex-col justify-between relative overflow-hidden shadow-inner">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-blue-500/5 pointer-events-none" />

              <div className="flex items-center justify-between z-10 border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${config.navPosition === 'left' ? 'bg-cyan-400' : 'bg-slate-600'}`} />
                  <div className={`w-3 h-3 rounded-full ${config.navPosition === 'top' ? 'bg-cyan-400' : 'bg-slate-600'}`} />
                  <div className={`w-3 h-3 rounded-full ${config.navPosition === 'bottom' ? 'bg-cyan-400' : 'bg-slate-600'}`} />
                </div>
                <span className="text-[10px] font-mono text-cyan-400">Position: {config.navPosition || 'Standard'}</span>
              </div>

              <div className="grid grid-cols-3 gap-3 z-10 flex-1 py-4 items-center">
                {Array.from({ length: Math.min(config.columns || 3, 3) }).map((_, i) => (
                  <div key={i} className="h-20 rounded-xl bg-white/5 border border-white/10 p-3 flex flex-col justify-between animate-pulse">
                    <div className="w-1/2 h-2 bg-cyan-400/40 rounded" />
                    <div className="w-full h-1.5 bg-white/10 rounded" />
                    <div className="w-3/4 h-1.5 bg-white/10 rounded" />
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 z-10 pt-2 border-t border-white/5">
                <span>Density: {config.density || 'Comfortable'}</span>
                <span>Width: {config.contentWidth || 'Contained'}</span>
              </div>
            </div>

            {/* EDITABLE PARAMS */}
            <div className="space-y-4 bg-[#07070a] border border-white/10 rounded-xl p-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" /> Pattern Parameters
              </h4>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                {config.navPosition !== undefined && (
                  <div>
                    <label className="block text-zinc-400 mb-1">Navigation Position</label>
                    <select
                      value={config.navPosition}
                      onChange={e => setConfig({ ...config, navPosition: e.target.value as any })}
                      className="w-full bg-[#101015] border border-white/10 rounded-lg p-2 text-white outline-none focus:border-cyan-400"
                    >
                      <option value="top">Top Bar</option>
                      <option value="left">Left Sidebar</option>
                      <option value="bottom">Bottom Tab Bar</option>
                      <option value="floating">Floating Pill</option>
                    </select>
                  </div>
                )}

                {config.columns !== undefined && (
                  <div>
                    <label className="block text-zinc-400 mb-1">Grid Columns ({config.columns})</label>
                    <input
                      type="range" min="1" max="4" value={config.columns}
                      onChange={e => setConfig({ ...config, columns: Number(e.target.value) })}
                      className="w-full accent-cyan-400 mt-2"
                    />
                  </div>
                )}

                {config.density !== undefined && (
                  <div>
                    <label className="block text-zinc-400 mb-1">Content Density</label>
                    <select
                      value={config.density}
                      onChange={e => setConfig({ ...config, density: e.target.value as any })}
                      className="w-full bg-[#101015] border border-white/10 rounded-lg p-2 text-white outline-none focus:border-cyan-400"
                    >
                      <option value="compact">Compact</option>
                      <option value="comfortable">Comfortable</option>
                      <option value="spacious">Spacious</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* COMPUTED ACCESSIBILITY CHECKLIST */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Computed UX Accessibility Checklist
              </h4>
              <div className="space-y-1.5 font-mono text-xs">
                {selectedPattern.accessibilityChecklist.map((check, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-slate-300">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{check}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
