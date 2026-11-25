import React, { useState } from 'react';
import { Search, Star, Play, RotateCcw, Plus, Copy, Check, Sliders, ExternalLink } from 'lucide-react';
import { MotionItem, MotionCategory, ActiveEffect } from '../../../types/library';
import { MOTION_ITEMS } from '../../data/library/libraryData';

interface MotionGalleryProps {
  activeEffects: ActiveEffect[];
  onAddEffect: (item: MotionItem, speed: number, intensity: number) => void;
  onStarItem: (id: string) => void;
  starredIds: string[];
}

export const MotionGallery: React.FC<MotionGalleryProps> = ({
  activeEffects,
  onAddEffect,
  onStarItem,
  starredIds
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MotionCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [itemSpeeds, setItemSpeeds] = useState<Record<string, number>>({});
  const [itemIntensities, setItemIntensities] = useState<Record<string, number>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeSnippetTab, setActiveSnippetTab] = useState<Record<string, 'css' | 'react' | 'gsap'>>({});
  const [previewStates, setPreviewStates] = useState<Record<string, boolean>>({});

  const categories: { label: string; value: MotionCategory | 'all' }[] = [
    { label: 'All Motion', value: 'all' },
    { label: 'Scroll Reveals', value: 'scroll' },
    { label: 'Hover Effects', value: 'hover' },
    { label: 'Text Effects', value: 'text' },
    { label: 'Transitions', value: 'transition' },
    { label: 'Loaders', value: 'loader' },
    { label: 'Backgrounds', value: 'background' }
  ];

  const filteredItems = MOTION_ITEMS.filter(item => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const triggerPreview = (id: string) => {
    setPreviewStates(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setPreviewStates(prev => ({ ...prev, [id]: false }));
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Search & Category Chips */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search motion effects..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-[#121218] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat.value
                  ? 'bg-cyan-500 text-black font-semibold shadow-lg shadow-cyan-500/20'
                  : 'bg-[#121218] text-zinc-400 hover:text-zinc-200 border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Motion Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredItems.map(item => {
          const isStarred = starredIds.includes(item.id);
          const speed = itemSpeeds[item.id] ?? item.defaultSpeed;
          const intensity = itemIntensities[item.id] ?? item.defaultIntensity;
          const snippetTab = activeSnippetTab[item.id] || 'react';
          const isPlaying = previewStates[item.id];
          const isAlreadyActive = activeEffects.some(e => e.itemId === item.id);

          const currentSnippet = snippetTab === 'css' ? item.cssSnippet :
                                 snippetTab === 'react' ? item.reactSnippet : item.gsapSnippet;

          return (
            <div
              key={item.id}
              className="bg-[#101015] border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-cyan-500/40 transition-all group shadow-xl"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      {item.category}
                    </span>
                    <h3 className="text-base font-semibold text-white mt-1.5 group-hover:text-cyan-400 transition-colors">
                      {item.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => onStarItem(item.id)}
                    className={`p-2 rounded-lg border transition-colors ${
                      isStarred
                        ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                        : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Star className={`w-4 h-4 ${isStarred ? 'fill-amber-400' : ''}`} />
                  </button>
                </div>

                <p className="text-xs text-zinc-400 mb-5 leading-relaxed">
                  {item.description}
                </p>

                {/* Live Preview Box */}
                <div className="relative h-32 bg-[#07070a] rounded-xl border border-white/5 flex items-center justify-center overflow-hidden mb-5 group/preview">
                  <div className={`transition-all duration-700 ${isPlaying ? 'scale-110 rotate-2 opacity-100' : 'scale-100 opacity-90'}`}>
                    {item.category === 'loader' ? (
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
                        <span className="text-xs font-mono text-cyan-400">LOADING...</span>
                      </div>
                    ) : item.category === 'text' ? (
                      <span className="text-lg font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 animate-pulse">
                        SHIMMER TEXT
                      </span>
                    ) : item.category === 'background' ? (
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-emerald-500/20 blur-xl animate-pulse" />
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 shadow-lg shadow-cyan-500/30 flex items-center justify-center text-black font-bold">
                        DEMO
                      </div>
                    )}
                  </div>

                  <div className="absolute bottom-2 right-2 flex items-center gap-1.5 opacity-80 group-hover/preview:opacity-100 transition-opacity">
                    <button
                      onClick={() => triggerPreview(item.id)}
                      className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur border border-white/10 text-[10px] font-medium text-zinc-300 hover:text-white flex items-center gap-1"
                    >
                      <Play className="w-3 h-3 fill-current" /> Replay
                    </button>
                  </div>
                </div>

                {/* Sliders for Speed & Intensity */}
                <div className="grid grid-cols-2 gap-4 mb-5 bg-[#0a0a0f] p-3 rounded-xl border border-white/5">
                  <div>
                    <div className="flex justify-between text-[11px] text-zinc-400 mb-1.5">
                      <span>Speed</span>
                      <span className="text-cyan-400 font-mono">{speed}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="3.0"
                      step="0.1"
                      value={speed}
                      onChange={e => setItemSpeeds({ ...itemSpeeds, [item.id]: parseFloat(e.target.value) })}
                      className="w-full accent-cyan-400 h-1 bg-zinc-800 rounded-lg cursor-pointer"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] text-zinc-400 mb-1.5">
                      <span>Intensity</span>
                      <span className="text-cyan-400 font-mono">{intensity}/10</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="1"
                      value={intensity}
                      onChange={e => setItemIntensities({ ...itemIntensities, [item.id]: parseInt(e.target.value) })}
                      className="w-full accent-cyan-400 h-1 bg-zinc-800 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                {/* Code Snippet Drawer / Tabs */}
                <div className="mb-5">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
                    <div className="flex gap-2">
                      {(['react', 'css', 'gsap'] as const).map(tab => (
                        <button
                          key={tab}
                          onClick={() => setActiveSnippetTab({ ...activeSnippetTab, [item.id]: tab })}
                          className={`text-[11px] font-mono uppercase tracking-wider px-2 py-1 rounded transition-colors ${
                            snippetTab === tab ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-zinc-500 hover:text-zinc-300'
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => handleCopy(item.id, currentSnippet)}
                      className="text-[11px] text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
                    >
                      {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedId === item.id ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <pre className="bg-[#07070a] p-3 rounded-xl border border-white/5 text-[11px] font-mono text-zinc-300 overflow-x-auto max-h-24 scrollbar-none">
                    <code>{currentSnippet}</code>
                  </pre>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onAddEffect(item, speed, intensity)}
                disabled={isAlreadyActive}
                className={`w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  isAlreadyActive
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 cursor-default'
                    : 'bg-cyan-500 text-black hover:bg-cyan-400 shadow-lg shadow-cyan-500/20'
                }`}
              >
                {isAlreadyActive ? (
                  <>
                    <Check className="w-4 h-4" /> Added to Active Effects
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" /> Add to My Site
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
