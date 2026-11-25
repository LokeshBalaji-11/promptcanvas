import React, { useState, useEffect } from 'react';
import { Layers, Sparkles, Sliders, Palette, Zap, Cpu } from 'lucide-react';
import { RealLibraryStudioTab } from '../library/RealLibraryStudioTab';
import { REAL_STYLES_CATALOG } from '../library/catalog';
import { ReferenceAgentModal } from './ReferenceAgentModal';
import { MoodboardProject } from '../types';

interface LibraryStudioTabProps {
  activeStyles: string[];
  styleParams: Record<string, Record<string, any>>;
  onToggleStyle: (id: string) => void;
  onUpdateParam: (styleId: string, paramId: string, value: any) => void;
  onApplyReferenceProject?: (project: MoodboardProject) => void;
  accentColor?: string;
}

export const LibraryStudioTab: React.FC<LibraryStudioTabProps> = ({
  activeStyles,
  styleParams,
  onToggleStyle,
  onUpdateParam,
  onApplyReferenceProject,
  accentColor = '#CCFF00'
}) => {
  const [favorites, setFavorites] = useState<string[]>(['liquid-glass', 'cyber-glow']);
  const [activeSubTab, setActiveSubTab] = useState<'catalog' | 'reference-agent'>('catalog');

  useEffect(() => {
    const saved = localStorage.getItem('prompt_canvas_real_library_favs');
    if (saved) {
      try { setFavorites(JSON.parse(saved)); } catch (e) { /* fallback */ }
    }
  }, []);

  const handleToggleFavorite = (id: string) => {
    const updated = favorites.includes(id) ? favorites.filter(i => i !== id) : [...favorites, id];
    setFavorites(updated);
    localStorage.setItem('prompt_canvas_real_library_favs', JSON.stringify(updated));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h2 className="text-lg font-black text-white uppercase tracking-wider">Cosmic Design System Library & Reference Agent</h2>
          <p className="text-xs text-zinc-400">Real scoped CSS styles, interactive parameters, and AI-powered reference extraction.</p>
        </div>

        <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl font-mono text-xs">
          <button
            onClick={() => setActiveSubTab('catalog')}
            className={`px-3 py-1.5 rounded-lg transition-all ${activeSubTab === 'catalog' ? 'bg-cyan-500 text-black font-bold' : 'text-zinc-400 hover:text-white'}`}
          >
            Style Catalog
          </button>
          <button
            onClick={() => setActiveSubTab('reference-agent')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${activeSubTab === 'reference-agent' ? 'bg-cyan-500 text-black font-bold' : 'text-zinc-400 hover:text-white'}`}
          >
            <Cpu className="w-3.5 h-3.5" /> AI Reference Agent
          </button>
        </div>
      </div>

      {activeSubTab === 'catalog' ? (
        <RealLibraryStudioTab
          activeStyles={activeStyles}
          styleParams={styleParams}
          onToggleStyle={onToggleStyle}
          onUpdateParam={onUpdateParam}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />
      ) : (
        <ReferenceAgentModal
          onApplyProject={onApplyReferenceProject || (() => {})}
          accentColor={accentColor}
        />
      )}
    </div>
  );
};
