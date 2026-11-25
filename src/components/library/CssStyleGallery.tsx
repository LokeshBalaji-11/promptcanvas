import React, { useState } from 'react';
import { Search, Star, Copy, Check, Plus } from 'lucide-react';
import { CssStyleItem, CssStyleCategory, ActiveEffect } from '../../types/library';
import { CSS_STYLE_ITEMS } from '../../data/library/libraryData';

interface CssStyleGalleryProps {
  activeEffects: ActiveEffect[];
  onAddEffect: (item: CssStyleItem) => void;
  onStarItem: (id: string) => void;
  starredIds: string[];
}

export const CssStyleGallery: React.FC<CssStyleGalleryProps> = ({
  activeEffects,
  onAddEffect,
  onStarItem,
  starredIds
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CssStyleCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Record<string, 'css' | 'react'>>({});

  const categories: { label: string; value: CssStyleCategory | 'all' }[] = [
    { label: 'All Styles', value: 'all' },
    { label: 'Glassmorphism', value: 'glass' },
    { label: 'Neumorphism', value: 'neumorphism' },
    { label: 'Brutalist', value: 'brutalist' },
    { label: 'Gradients', value: 'gradient' },
    { label: 'Neon Glow', value: 'glow' },
    { label: 'Shadows', value: 'shadow' },
    { label: 'Bento Grid', value: 'bento' },
    { label: 'Blueprint', value: 'blueprint' },
    { label: 'Retro', value: 'retro' },
    { label: 'Editorial', value: 'editorial' }
  ];

  const filteredItems = CSS_STYLE_ITEMS.filter(item => {
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

  return (
    <div className="space-y-6">
      {/* Search & Category Chips */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search CSS styles..."
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

      {/* Grid of CSS Style Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredItems.map(item => {
          const isStarred = starredIds.includes(item.id);
          const tab = activeTab[item.id] || 'css';
          const codeText = tab === 'css' ? item.cssCode : item.reactCode;
          const isAlreadyActive = activeEffects.some(e => e.itemId === item.id);

          // Render dynamic preview classes based on item id
          let previewContainerClass = 'bg-[#121216] border border-white/10 p-5 rounded-xl shadow-lg';
          if (item.id === 'style-glass') previewContainerClass = 'bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-xl shadow-2xl';
          if (item.id === 'style-neumorph') previewContainerClass = 'bg-[#0f0f14] shadow-[6px_6px_12px_#07070a,-6px_-6px_12px_#17171e] p-5 rounded-xl';
          if (item.id === 'style-brutalist') previewContainerClass = 'bg-[#CCFF00] text-black border-2 border-black shadow-[4px_4px_0px_0px_#000000] p-5 rounded-xl font-black';
          if (item.id === 'style-glow-neon') previewContainerClass = 'bg-[#0d0d12] border border-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.3)] p-5 rounded-xl';
          if (item.id === 'style-blueprint') previewContainerClass = 'bg-[#090d16] border border-dashed border-cyan-500/40 p-5 rounded-xl font-mono text-cyan-400';
          if (item.id === 'style-retro') previewContainerClass = 'bg-black border-2 border-[#3DFFA2] text-[#3DFFA2] p-5 rounded-xl font-mono';

          return (
            <div
              key={item.id}
              className="bg-[#101015] border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-cyan-500/40 transition-all shadow-xl"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {item.category}
                    </span>
                    <h3 className="text-base font-semibold text-white mt-1.5">{item.name}</h3>
                  </div>
                  <button
                    onClick={() => onStarItem(item.id)}
                    className={`p-2 rounded-lg border transition-colors ${
                      isStarred ? 'bg-amber-500/20 border-amber-500/40 text-amber-400' : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Star className={`w-4 h-4 ${isStarred ? 'fill-amber-400' : ''}`} />
                  </button>
                </div>

                <p className="text-xs text-zinc-400 mb-5 leading-relaxed">{item.description}</p>

                {/* Live Styled Sample */}
                <div className="mb-5 bg-[#07070a] p-4 rounded-xl border border-white/5 flex flex-col items-center justify-center">
                  <div className={`w-full ${previewContainerClass} flex items-center justify-between`}>
                    <span className="text-xs font-medium">Sample Button</span>
                    <button className="px-3 py-1.5 rounded-lg bg-cyan-500 text-black text-[11px] font-bold shadow hover:bg-cyan-400 transition-colors">
                      Action
                    </button>
                  </div>
                </div>

                {/* Code Snippet Tabs */}
                <div className="mb-5">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
                    <div className="flex gap-2">
                      {(['css', 'react'] as const).map(t => (
                        <button
                          key={t}
                          onClick={() => setActiveTab({ ...activeTab, [item.id]: t })}
                          className={`text-[11px] font-mono uppercase tracking-wider px-2 py-1 rounded transition-colors ${
                            tab === t ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-zinc-500 hover:text-zinc-300'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => handleCopy(item.id, codeText)}
                      className="text-[11px] text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
                    >
                      {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedId === item.id ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <pre className="bg-[#07070a] p-3 rounded-xl border border-white/5 text-[11px] font-mono text-zinc-300 overflow-x-auto max-h-24 scrollbar-none">
                    <code>{codeText}</code>
                  </pre>
                </div>
              </div>

              <button
                onClick={() => onAddEffect(item)}
                disabled={isAlreadyActive}
                className={`w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  isAlreadyActive
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 cursor-default'
                    : 'bg-emerald-500 text-black hover:bg-emerald-400 shadow-lg shadow-emerald-500/20'
                }`}
              >
                {isAlreadyActive ? <><Check className="w-4 h-4" /> Added to Active Styles</> : <><Plus className="w-4 h-4" /> Add to My Site</>}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
