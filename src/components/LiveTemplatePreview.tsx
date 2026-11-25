import React, { useState, useEffect } from 'react';
import { MoodboardProject } from '../types';
import { Monitor, Smartphone, Laptop, Sparkles, X, ChevronDown, Check } from 'lucide-react';
import { StudentsApp } from '../templates/students/StudentsApp';
import { BusinessApp } from '../templates/business/BusinessApp';
import { RestaurantApp } from '../templates/restaurant/RestaurantApp';
import { ClubsApp } from '../templates/clubs/ClubsApp';
import { EventsApp } from '../templates/events/EventsApp';
import { EducationApp } from '../templates/education/EducationApp';
import { NonprofitApp } from '../templates/nonprofit/NonprofitApp';
import { PortfolioApp } from '../templates/portfolio/PortfolioApp';
import { StartupApp } from '../templates/startup/StartupApp';
import { FashionApp } from '../templates/fashion/FashionApp';
import { TechApp } from '../templates/tech/TechApp';
import { CreatorApp } from '../templates/creator/CreatorApp';
import { TEMPLATE_MANIFESTS } from '../templates/manifests';
import { REAL_STYLES_CATALOG } from '../library/catalog';

interface LiveTemplatePreviewProps {
  project: MoodboardProject;
  accentColor: string;
  activeStyles: string[];
  styleParams: Record<string, Record<string, any>>;
  onRemoveStyle: (styleId: string) => void;
  onNavigateToLibrary: () => void;
  onNavigateToDocs: () => void;
  onOpenStudio: () => void;
}

export const LiveTemplatePreview: React.FC<LiveTemplatePreviewProps> = ({
  project,
  accentColor,
  activeStyles,
  styleParams,
  onRemoveStyle,
  onNavigateToLibrary,
  onNavigateToDocs,
  onOpenStudio
}) => {
  const [isMobileView, setIsMobileView] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(() => {
    return project.templateId || 'business';
  });
  const [showRouteDropdown, setShowRouteDropdown] = useState(false);
  const [currentRoute, setCurrentRoute] = useState('dashboard');

  const manifest = TEMPLATE_MANIFESTS[selectedTemplateId] || TEMPLATE_MANIFESTS['business'];

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#/', '');
      if (hash) setCurrentRoute(hash);
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Compute active scoped CSS injections
  const injectedCss = activeStyles.map(styleId => {
    const catalogItem = REAL_STYLES_CATALOG.find(s => s.id === styleId);
    if (!catalogItem) return '';
    const params = styleParams[styleId] || {};
    let css = catalogItem.css;
    catalogItem.params.forEach(p => {
      const val = params[p.id] !== undefined ? params[p.id] : p.defaultValue;
      css = css.replace(new RegExp(`var\\(--${p.id}[^)]*\\)`, 'g'), String(val) + (p.unit || ''));
    });
    return css;
  }).join('\n\n');

  const renderTemplateComponent = () => {
    switch (selectedTemplateId) {
      case 'students': return <StudentsApp />;
      case 'business': return <BusinessApp />;
      case 'restaurant': return <RestaurantApp />;
      case 'clubs': return <ClubsApp />;
      case 'events': return <EventsApp />;
      case 'education': return <EducationApp />;
      case 'nonprofit': return <NonprofitApp />;
      case 'portfolio': return <PortfolioApp />;
      case 'startup': return <StartupApp />;
      case 'fashion': return <FashionApp />;
      case 'tech': return <TechApp />;
      case 'creator': return <CreatorApp />;
      default: return <BusinessApp />;
    }
  };

  return (
    <div className="bg-[#0a0b10] border border-white/15 rounded-3xl p-6 shadow-2xl flex flex-col justify-between group md:col-span-2 relative overflow-hidden">
      <style>{injectedCss}</style>

      {/* SOFT ANIMATED GRADIENT BACKDROP BLOBS FOR GLASS STYLES */}
      <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full blur-[90px] opacity-40 pointer-events-none animate-pulse" style={{ backgroundColor: project.palette[2]?.hex || '#22D3EE' }} />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full blur-[90px] opacity-35 pointer-events-none animate-pulse" style={{ backgroundColor: accentColor }} />

      <div className="relative z-10 space-y-6">
        {/* PREVIEW HEADER */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-[#060608] border border-white/10 font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: accentColor }} />
            <div>
              <div className="font-bold text-white flex items-center gap-2">
                <span>{manifest.title}</span>
                <span className="text-[10px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">Route: #/{currentRoute}</span>
              </div>
              <div className="text-[10px] text-[#8E8E98]">Active Template: {manifest.category}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Template Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowRouteDropdown(!showRouteDropdown)}
                className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 flex items-center gap-2 cursor-pointer"
              >
                <span>Switch Template</span>
                <ChevronDown className="w-3.5 h-3.5 text-cyan-400" />
              </button>

              {showRouteDropdown && (
                <div className="absolute right-0 top-11 z-40 w-56 bg-[#060608] border border-white/20 rounded-2xl p-2 shadow-2xl space-y-1">
                  {Object.entries(TEMPLATE_MANIFESTS).map(([k, m]) => (
                    <button
                      key={k}
                      onClick={() => { setSelectedTemplateId(k); setShowRouteDropdown(false); window.location.hash = `#/${m.routes[0]?.path || 'dashboard'}`; }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
                        selectedTemplateId === k ? 'bg-cyan-500 text-black font-bold' : 'text-zinc-300 hover:bg-white/5'
                      }`}
                    >
                      {m.title}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop / Mobile Toggle */}
            <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-1">
              <button
                onClick={() => setIsMobileView(false)}
                className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${!isMobileView ? 'bg-white text-black font-bold' : 'text-[#8E8E98]'}`}
              >
                <Laptop className="w-3 h-3" /> Desktop
              </button>
              <button
                onClick={() => setIsMobileView(true)}
                className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${isMobileView ? 'bg-white text-black font-bold' : 'text-[#8E8E98]'}`}
              >
                <Smartphone className="w-3 h-3" /> Mobile (390px)
              </button>
            </div>
          </div>
        </div>

        {/* CLICKABLE APPLIED STYLES LIST (REPLACES STATIC "Active Style: ...") */}
        <div className="flex items-center gap-2 flex-wrap p-3 rounded-2xl bg-white/5 border border-white/10 font-mono text-xs">
          <span className="text-[#8E8E98]">Applied Styles (click to remove):</span>
          {activeStyles.length === 0 ? (
            <span className="text-zinc-500 italic">No styles applied. Add from Library tab.</span>
          ) : (
            activeStyles.map(styleId => (
              <button
                key={styleId}
                onClick={() => onRemoveStyle(styleId)}
                className="px-3 py-1 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-red-500/20 hover:text-red-300 hover:border-red-500/40 transition-all flex items-center gap-1.5 cursor-pointer group"
                title="Click to remove style"
              >
                <span>{styleId}</span>
                <X className="w-3 h-3 group-hover:scale-125 transition-transform" />
              </button>
            ))
          )}
        </div>

        {/* RENDER ACTIVE TEMPLATE MULTI-PAGE APP */}
        <div className={`mx-auto transition-all duration-500 rounded-3xl overflow-hidden shadow-2xl border border-white/15 ${isMobileView ? 'w-[390px]' : 'w-full'}`}>
          {renderTemplateComponent()}
        </div>

        {/* DEAD-CLICK ZERO-TOLERANCE ACTION BAR */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 border-t border-white/10 font-mono text-xs">
          <button
            onClick={onNavigateToLibrary}
            className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold border border-white/10 flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <span>Explore Component Library</span> &rarr;
          </button>
          <button
            onClick={onNavigateToDocs}
            className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold border border-white/10 flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <span>View Documentation</span> &rarr;
          </button>
          <button
            onClick={onOpenStudio}
            className="p-3 rounded-xl text-black font-extrabold shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-105"
            style={{ backgroundColor: accentColor }}
          >
            <Sparkles className="w-4 h-4" /> Initialize PromptCanvas Studio
          </button>
        </div>
      </div>
    </div>
  );
};
