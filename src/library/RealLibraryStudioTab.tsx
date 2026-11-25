import React, { useState } from 'react';
import { Search, Star, Play, Copy, Check, Sliders, ExternalLink, ShieldCheck, Zap, RefreshCw, Layout } from 'lucide-react';
import { RealStyleItem, StyleParam } from './types';
import { REAL_STYLES_CATALOG } from './catalog';
import { CosmicIcons } from '../icons/cosmic';
import { UxPatternStudio } from '../components/library/UxPatternStudio';
import { UxPattern } from './uxPatterns';

interface RealLibraryStudioTabProps {
  activeStyles: string[];
  styleParams: Record<string, Record<string, any>>;
  onToggleStyle: (id: string) => void;
  onUpdateParam: (styleId: string, paramId: string, value: any) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onApplyUxConfig?: (pattern: UxPattern, config: any) => void;
  accentColor?: string;
}

export const RealLibraryStudioTab: React.FC<RealLibraryStudioTabProps> = ({
  activeStyles,
  styleParams,
  onToggleStyle,
  onUpdateParam,
  favorites,
  onToggleFavorite,
  onApplyUxConfig,
  accentColor = '#CCFF00'
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('All');
  const [sortMode, setSortMode] = useState<'popular' | 'newest' | 'az'>('popular');
  const [filterMode, setFilterMode] = useState<'all' | 'favorites' | 'applied'>('all');
  const [selectedItemForDrawer, setSelectedItemForDrawer] = useState<RealStyleItem | null>(null);
  const [activeMainTab, setActiveMainTab] = useState<'styles' | 'ux-patterns'>('styles');

  const groups = ['All', 'Glass', 'Neumorphism', 'Brutalist', 'Gradients', 'Glow', 'Blueprint'];

  const filteredItems = REAL_STYLES_CATALOG.filter(item => {
    const matchesGroup = selectedGroup === 'All' || item.group === selectedGroup;
    const matchesQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = filterMode === 'all' ? true :
                          filterMode === 'favorites' ? favorites.includes(item.id) :
                          activeStyles.includes(item.id);
    return matchesGroup && matchesQuery && matchesFilter;
  }).sort((a, b) => {
    if (sortMode === 'popular') return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
    if (sortMode === 'newest') return (b.newest ? 1 : 0) - (a.newest ? 1 : 0);
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="space-y-6">
      {/* SUB-TABS (STYLES VS UX PATTERNS) */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex gap-2 font-mono text-xs">
          <button
            onClick={() => setActiveMainTab('styles')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeMainTab === 'styles' ? 'bg-cyan-500 text-black font-bold shadow-lg' : 'bg-white/5 text-zinc-400 hover:text-white'
            }`}
          >
            Real CSS Styles Studio ({REAL_STYLES_CATALOG.length})
          </button>
          <button
            onClick={() => setActiveMainTab('ux-patterns')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              activeMainTab === 'ux-patterns' ? 'bg-cyan-500 text-black font-bold shadow-lg' : 'bg-white/5 text-zinc-400 hover:text-white'
            }`}
          >
            <Layout className="w-4 h-4" /> UX/UI Structural Patterns (40)
          </button>
        </div>
      </div>

      {activeMainTab === 'ux-patterns' ? (
        <UxPatternStudio onApplyUxConfig={onApplyUxConfig || (() => {})} accentColor={accentColor} />
      ) : (
        <>
          {/* Toolbar */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-[#101015] border border-white/10 rounded-2xl p-4">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search cosmic styles & tags..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-[#07070a] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-none">
              {groups.map(g => (
                <button
                  key={g}
                  onClick={() => setSelectedGroup(g)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    selectedGroup === g
                      ? 'bg-cyan-500 text-black font-bold shadow-lg shadow-cyan-500/20'
                      : 'bg-[#07070a] text-zinc-400 hover:text-white border border-white/5'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilterMode(filterMode === 'favorites' ? 'all' : 'favorites')}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium border transition-colors ${
                  filterMode === 'favorites' ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' : 'bg-[#07070a] text-zinc-400 border-white/10'
                }`}
              >
                ★ Favorites ({favorites.length})
              </button>
              <button
                onClick={() => setFilterMode(filterMode === 'applied' ? 'all' : 'applied')}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium border transition-colors ${
                  filterMode === 'applied' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' : 'bg-[#07070a] text-zinc-400 border-white/10'
                }`}
              >
                Applied ({activeStyles.length})
              </button>
            </div>
          </div>

          {/* Grid of Real Styles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => {
              const isApplied = activeStyles.includes(item.id);
              const isFav = favorites.includes(item.id);
              const IconComponent = CosmicIcons[item.icon] || CosmicIcons.Planet;

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItemForDrawer(item)}
                  className="bg-[#101015] border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-cyan-500/50 transition-all cursor-pointer group shadow-xl relative overflow-hidden"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase tracking-wider font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/10">
                            {item.group}
                          </span>
                          <h3 className="text-sm font-bold text-white mt-1 group-hover:text-cyan-400 transition-colors">
                            {item.name}
                          </h3>
                        </div>
                      </div>

                      <button
                        onClick={(e) => { e.stopPropagation(); onToggleFavorite(item.id); }}
                        className={`p-2 rounded-xl border transition-colors ${
                          isFav ? 'bg-amber-500/20 border-amber-500/40 text-amber-400' : 'bg-white/5 border-white/10 text-zinc-500 hover:text-white'
                        }`}
                      >
                        <Star className={`w-4 h-4 ${isFav ? 'fill-amber-400' : ''}`} />
                      </button>
                    </div>

                    {/* LIVE PREVIEW STAGE INSIDE GRID WITH COLORFUL BACKDROP BLOBS */}
                    <div
                      className="h-32 rounded-xl p-4 mb-4 flex flex-col justify-center relative overflow-hidden"
                      style={{ background: '#07070a' }}
                    >
                      <div className="absolute -top-4 -left-4 w-20 h-20 bg-cyan-500 rounded-full blur-xl opacity-60 pointer-events-none" />
                      <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-fuchsia-500 rounded-full blur-xl opacity-60 pointer-events-none" />

                      <div className="relative z-10" data-style={item.id}>
                        <div className="text-xs font-bold text-white">Live Card Sample</div>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-cyan-500/20 text-cyan-300">Badge</span>
                          <div className="h-1.5 bg-white/20 rounded w-16" />
                        </div>
                      </div>
                    </div>

                    {/* Compatibility Badges */}
                    <div className="flex items-center gap-2 mb-4 text-[10px] font-mono text-zinc-500">
                      <span className="text-emerald-400">✓ Chrome</span>
                      <span className="text-emerald-400">✓ Firefox</span>
                      <span className="text-emerald-400">✓ Safari</span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => { e.stopPropagation(); onToggleStyle(item.id); }}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                      isApplied
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-cyan-500 text-black hover:bg-cyan-400 shadow-lg shadow-cyan-500/25'
                    }`}
                  >
                    {isApplied ? <><Check className="w-4 h-4" /> Applied ✓</> : <><Zap className="w-4 h-4" /> Apply Style</>}
                  </button>
                </div>
              );
            })}
          </div>

          {/* DETAIL DRAWER */}
          {selectedItemForDrawer && (
            <DetailDrawer
              item={selectedItemForDrawer}
              onClose={() => setSelectedItemForDrawer(null)}
              isApplied={activeStyles.includes(selectedItemForDrawer.id)}
              onToggleApply={() => onToggleStyle(selectedItemForDrawer.id)}
              isFav={favorites.includes(selectedItemForDrawer.id)}
              onToggleFav={() => onToggleFavorite(selectedItemForDrawer.id)}
              params={styleParams[selectedItemForDrawer.id] || {}}
              onUpdateParam={(paramId, val) => onUpdateParam(selectedItemForDrawer.id, paramId, val)}
              accentColor={accentColor}
            />
          )}
        </>
      )}
    </div>
  );
};

interface DetailDrawerProps {
  item: RealStyleItem;
  onClose: () => void;
  isApplied: boolean;
  onToggleApply: () => void;
  isFav: boolean;
  onToggleFav: () => void;
  params: Record<string, any>;
  onUpdateParam: (paramId: string, val: any) => void;
  accentColor: string;
}

const DetailDrawer: React.FC<DetailDrawerProps> = ({
  item,
  onClose,
  isApplied,
  onToggleApply,
  isFav,
  onToggleFav,
  params,
  onUpdateParam,
  accentColor
}) => {
  const [activeTab, setActiveTab] = useState<'css' | 'react' | 'tailwind' | 'html'>('css');
  const [copied, setCopied] = useState(false);
  const [compareBaseline, setCompareBaseline] = useState(false);
  const [replayKey, setReplayKey] = useState(0);

  const codeString = activeTab === 'css' ? item.css :
                     activeTab === 'react' ? item.reactCode :
                     activeTab === 'tailwind' ? item.tailwindCode : item.htmlSample;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end animate-fadeIn">
      <div className="w-full max-w-xl bg-[#0c0d14] border-l border-white/10 h-full flex flex-col p-8 overflow-y-auto">
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">{item.group}</span>
            <h2 className="text-xl font-black text-white">{item.name}</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white cursor-pointer">
            ✕
          </button>
        </div>

        {/* REAL PREVIEW STAGE WITH COLORFUL BACKDROP BLOBS FOR GLASS VISIBILITY */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400">Live Stage Preview (with Colorful Backdrop Blobs)</span>
            <div className="flex items-center gap-2 font-mono text-xs">
              <button
                onClick={() => setCompareBaseline(!compareBaseline)}
                className={`px-3 py-1 rounded-lg border transition-colors ${compareBaseline ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' : 'bg-white/5 text-zinc-400 border-white/10'}`}
              >
                {compareBaseline ? 'Showing Baseline' : 'Before / After'}
              </button>
              <button
                onClick={() => setReplayKey(k => k + 1)}
                className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 border border-white/10 flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" /> Replay
              </button>
            </div>
          </div>

          <div
            key={replayKey}
            className="h-64 rounded-2xl p-6 flex flex-col justify-between relative shadow-2xl overflow-hidden transition-all"
            style={{ background: '#050609' }}
          >
            {/* Colorful animated gradient backdrop blobs to ensure backdrop-filter / glassmorphism is visibly striking */}
            <div className="absolute top-0 left-0 w-48 h-48 bg-cyan-500 rounded-full blur-2xl opacity-70 animate-pulse pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-fuchsia-500 rounded-full blur-2xl opacity-70 animate-pulse pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 bg-amber-400 rounded-full blur-2xl opacity-55 animate-pulse pointer-events-none" />

            {/* Foreground Card with Style Applied */}
            <div
              className="relative z-10 p-5 rounded-2xl flex flex-col justify-between h-full shadow-2xl"
              data-style={compareBaseline ? undefined : item.id}
              style={item.params.reduce((acc, p) => ({
                ...acc,
                [`--${p.id}`]: params[p.id] !== undefined ? params[p.id] : p.defaultValue
              }), {})}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-white drop-shadow">Interactive Card Component</h4>
                  <p className="text-xs text-zinc-300 drop-shadow">Glass backdrop refractive test stage</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-cyan-500/30 text-cyan-200 border border-cyan-400/40 shadow">
                  Active Badge
                </span>
              </div>

              <div className="space-y-3 my-2">
                <input
                  type="text"
                  placeholder="Interactive input test..."
                  className="w-full bg-black/60 border border-white/30 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-cyan-400 font-mono shadow-inner"
                />
              </div>

              <button
                className="w-full py-2.5 rounded-xl font-bold text-black font-mono text-xs shadow-xl transition-all"
                style={{ backgroundColor: accentColor }}
              >
                Primary Action Button
              </button>
            </div>
          </div>
        </div>

        {/* PARAM CONTROLS WIRED TO CSS VARIABLES */}
        <div className="space-y-4 mb-6 bg-[#101015] border border-white/10 rounded-2xl p-5">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Style Parameters (Wired to CSS Variables)</h4>
          {item.params.map(p => {
            const val = params[p.id] !== undefined ? params[p.id] : p.defaultValue;
            return (
              <div key={p.id} className="space-y-1.5">
                <div className="flex justify-between text-xs text-zinc-400 font-mono">
                  <span>{p.name} <code className="text-cyan-400">(--{p.id})</code></span>
                  <span className="text-cyan-400">{val}{p.unit || ''}</span>
                </div>
                {p.type === 'slider' && (
                  <input
                    type="range"
                    min={p.min}
                    max={p.max}
                    step={p.step}
                    value={val}
                    onChange={e => onUpdateParam(p.id, parseFloat(e.target.value))}
                    className="w-full accent-cyan-400 h-1 bg-zinc-800 rounded-lg cursor-pointer"
                  />
                )}
                {p.type === 'color' && (
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={val}
                      onChange={e => onUpdateParam(p.id, e.target.value)}
                      className="w-8 h-8 rounded-lg bg-transparent cursor-pointer border border-white/10"
                    />
                    <input
                      type="text"
                      value={val}
                      onChange={e => onUpdateParam(p.id, e.target.value)}
                      className="flex-1 bg-[#07070a] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-zinc-200 font-mono"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CODE SNIPPET TABS */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex gap-2">
              {(['css', 'react', 'tailwind', 'html'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded transition-colors ${
                    activeTab === tab ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <button
              onClick={handleCopy}
              className="text-[11px] text-zinc-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <pre className="bg-[#07070a] p-4 rounded-xl border border-white/5 text-xs font-mono text-zinc-300 overflow-x-auto max-h-40">
            <code>{codeString}</code>
          </pre>
        </div>

        {/* FOOTER ACTIONS */}
        <div className="flex items-center gap-4 mt-auto pt-4 border-t border-white/10">
          <button
            onClick={onToggleFav}
            className={`p-3 rounded-xl border transition-colors cursor-pointer ${
              isFav ? 'bg-amber-500/20 border-amber-500/40 text-amber-400' : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
            }`}
          >
            <Star className={`w-5 h-5 ${isFav ? 'fill-amber-400' : ''}`} />
          </button>
          <button
            onClick={onToggleApply}
            className={`flex-1 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isApplied
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : 'bg-cyan-500 text-black hover:bg-cyan-400 shadow-lg shadow-cyan-500/25'
            }`}
          >
            {isApplied ? <><Check className="w-4 h-4" /> Applied to Site ✓</> : <><Zap className="w-4 h-4" /> Apply Style</>}
          </button>
        </div>
      </div>
    </div>
  );
};
