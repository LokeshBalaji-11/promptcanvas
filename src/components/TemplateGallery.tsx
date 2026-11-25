import React, { useState } from 'react';
import { TEMPLATES, TemplateItem } from '../data/templates';
import { MoodboardProject } from '../types';
import { Search, Star, Sparkles, Eye, ArrowRight, Sliders, Check } from 'lucide-react';
import { TemplatePreviewModal } from './TemplatePreviewModal';

interface TemplateGalleryProps {
  onApplyTemplate: (project: MoodboardProject) => void;
  accentColor: string;
}

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({ onApplyTemplate, accentColor }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [previewTemplate, setPreviewTemplate] = useState<TemplateItem | null>(null);
  const [starredIds, setStarredIds] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('promptcanvas_starred_templates') || '[]'); } catch { return []; }
  });
  const [recentlyUsedId, setRecentlyUsedId] = useState<string | null>(() => localStorage.getItem('promptcanvas_recent_template'));

  const categories = ['All', 'Business', 'Startup', 'Students', 'Clubs & Communities', 'Portfolio', 'Restaurant & Cafe', 'Events & Hackathons', 'Education', 'Nonprofit', 'Fashion', 'Tech/SaaS'];

  const toggleStar = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = starredIds.includes(id) ? starredIds.filter(i => i !== id) : [...starredIds, id];
    setStarredIds(updated);
    localStorage.setItem('promptcanvas_starred_templates', JSON.stringify(updated));
  };

  const handleUseTemplate = (t: TemplateItem) => {
    const newProj: MoodboardProject = {
      id: `template-${t.id}-${Date.now()}`,
      title: t.name,
      prompt: t.copy.headline + ' — ' + t.copy.subline,
      styleModifier: t.style,
      accentColor: t.palette[2] || accentColor,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      palette: [
        { hex: t.palette[0], name: 'Base Background', role: 'Background', contrast: '15:1' },
        { hex: t.palette[1], name: 'Surface Core', role: 'Surface', contrast: '12:1' },
        { hex: t.palette[2], name: 'Primary Accent', role: 'Primary', contrast: '7:1' },
        { hex: t.palette[3], name: 'Text & Contrast', role: 'Secondary', contrast: '14:1' },
        { hex: t.palette[4], name: 'Secondary Glow', role: 'Accent', contrast: '6.5:1' }
      ],
      fonts: {
        display: t.fonts.display,
        body: t.fonts.body,
        mono: 'JetBrains Mono',
        googleFontsUrl: t.fonts.googleFontsUrl
      },
      cards: t.copy.features.map((f, i) => ({
        id: `feat-${i}`,
        title: f.title,
        category: 'UI Component',
        prompt: f.desc,
        description: f.desc,
        gradient: 'from-cyan-500/20 to-blue-500/20',
        aspectRatio: 'square'
      })),
      vibes: [t.style, t.tone, 'WCAG AA Compliant'],
      lighting: 'Studio Diffuse',
      camera: 'Cinematic 35mm'
    };

    localStorage.setItem('promptcanvas_recent_template', t.id);
    setRecentlyUsedId(t.id);
    onApplyTemplate(newProj);
  };

  const filtered = TEMPLATES.filter(t => {
    const matchesCat = selectedCategory === 'All' || t.category === selectedCategory;
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.style.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const starredTemplates = TEMPLATES.filter(t => starredIds.includes(t.id));
  const recentTemplate = TEMPLATES.find(t => t.id === recentlyUsedId);

  return (
    <div className="mt-12 pt-12 border-t border-white/10 space-y-8">
      
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="font-mono text-xs text-[#22D3EE] uppercase tracking-widest mb-1">[TEMPLATE GALLERY]</div>
          <h3 className="text-3xl font-black text-white tracking-tight">Start from a template</h3>
        </div>

        {/* SEARCH BAR */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E98]" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search templates..."
            className="w-full bg-[#07070A] border border-white/15 rounded-2xl pl-10 pr-4 py-2.5 text-xs font-mono text-white outline-none focus:border-white/40 transition-all placeholder:text-slate-600"
          />
        </div>
      </div>

      {/* CATEGORY CHIPS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl font-mono text-xs whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat 
                ? 'bg-white text-black font-bold shadow-md' 
                : 'bg-white/5 text-[#8E8E98] border border-white/10 hover:text-white hover:bg-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* RECENTLY USED & STARRED QUICK BAR */}
      {(recentTemplate || starredTemplates.length > 0) && (
        <div className="flex flex-wrap items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 font-mono text-xs">
          {recentTemplate && (
            <div className="flex items-center gap-2">
              <span className="text-[#8E8E98]">Recently used:</span>
              <button 
                onClick={() => handleUseTemplate(recentTemplate)}
                className="text-white hover:underline font-bold flex items-center gap-1"
              >
                <span>{recentTemplate.name}</span>
                <ArrowRight className="w-3 h-3 text-[#22D3EE]" />
              </button>
            </div>
          )}

          {starredTemplates.length > 0 && (
            <div className="flex items-center gap-2 ml-auto">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="text-[#8E8E98]">{starredTemplates.length} Starred templates</span>
            </div>
          )}
        </div>
      )}

      {/* TEMPLATES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((t) => {
          const isStarred = starredIds.includes(t.id);
          return (
            <div 
              key={t.id}
              className="bg-[#0a0b10] border border-white/15 rounded-3xl overflow-hidden shadow-2xl hover:border-white/30 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              {/* LIVE MINI PREVIEW */}
              <div 
                className="h-48 w-full relative p-6 flex flex-col justify-between overflow-hidden transition-all group-hover:scale-105 duration-700"
                style={{ backgroundColor: t.palette[0], color: t.palette[3] }}
              >
                {/* Background glow */}
                <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full blur-[50px] opacity-30 pointer-events-none" style={{ backgroundColor: t.palette[2] }} />

                <div className="flex items-center justify-between z-10">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono font-bold text-white uppercase tracking-wider border border-white/15">
                    {t.category}
                  </span>
                  <button 
                    onClick={(e) => toggleStar(t.id, e)}
                    className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center border border-white/15 text-white hover:bg-black transition-all cursor-pointer"
                  >
                    <Star className={`w-3.5 h-3.5 ${isStarred ? 'text-amber-400 fill-amber-400' : 'text-slate-400'}`} />
                  </button>
                </div>

                <div className="z-10">
                  <div className="text-xs font-bold tracking-tight mb-1 truncate" style={{ fontFamily: t.fonts.display }}>
                    {t.copy.headline}
                  </div>
                  <div className="text-[10px] opacity-70 line-clamp-1 font-light">
                    {t.copy.subline}
                  </div>
                </div>
              </div>

              {/* CARD DETAILS */}
              <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-base font-bold text-white tracking-wide">{t.name}</h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#22D3EE] border border-white/10">
                      {t.style}
                    </span>
                  </div>

                  {/* COLOR DOTS & FONT SPECIMEN */}
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#8E8E98] mb-4">
                    <div className="flex items-center gap-1.5">
                      {t.palette.map((hex, i) => (
                        <div key={i} className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: hex }} />
                      ))}
                    </div>
                    <span>{t.fonts.display}</span>
                  </div>
                </div>

                {/* BUTTONS */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10 font-mono text-xs">
                  <button
                    onClick={() => setPreviewTemplate(t)}
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold flex items-center justify-center gap-1.5 border border-white/10 transition-all cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" /> Preview
                  </button>
                  <button
                    onClick={() => handleUseTemplate(t)}
                    className="px-4 py-2.5 rounded-xl text-black font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer hover:scale-105 shadow-lg"
                    style={{ backgroundColor: accentColor }}
                  >
                    <span>Use</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* PREVIEW MODAL */}
      {previewTemplate && (
        <TemplatePreviewModal 
          template={previewTemplate} 
          onClose={() => setPreviewTemplate(null)} 
          onApply={(t) => {
            handleUseTemplate(t);
            setPreviewTemplate(null);
          }}
          accentColor={accentColor} 
        />
      )}

    </div>
  );
};
