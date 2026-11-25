import React, { useState } from 'react';
import { TemplateItem } from '../data/templates';
import { X, Monitor, Smartphone, Sliders, ArrowRight, Sparkles, RefreshCw } from 'lucide-react';
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

interface TemplatePreviewModalProps {
  template: TemplateItem;
  onClose: () => void;
  onApply: (t: TemplateItem) => void;
  accentColor: string;
}

export const TemplatePreviewModal: React.FC<TemplatePreviewModalProps> = ({ template, onClose, onApply, accentColor }) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  const [customName, setCustomName] = useState<string>(template.name);
  const [customTone, setCustomTone] = useState<'Professional' | 'Friendly' | 'Bold' | 'Playful'>(template.tone);
  const [customRadius, setCustomRadius] = useState<number>(template.vibes.radius);
  const [customDensity, setCustomDensity] = useState<number>(template.vibes.density);

  const handleRandomize = () => {
    const tones: Array<'Professional' | 'Friendly' | 'Bold' | 'Playful'> = ['Professional', 'Friendly', 'Bold', 'Playful'];
    setCustomTone(tones[Math.floor(Math.random() * tones.length)]);
    setCustomRadius(Math.floor(Math.random() * 24));
    setCustomDensity(Math.floor(Math.random() * 80) + 20);
  };

  const handleReset = () => {
    setCustomName(template.name);
    setCustomTone(template.tone);
    setCustomRadius(template.vibes.radius);
    setCustomDensity(template.vibes.density);
  };

  const handleSaveAndApply = () => {
    const updated: TemplateItem = {
      ...template,
      name: customName,
      tone: customTone,
      vibes: {
        ...template.vibes,
        radius: customRadius,
        density: customDensity
      }
    };
    onApply(updated);
  };

  const renderTemplateApp = () => {
    const id = template.id.toLowerCase();
    if (id.includes('student')) return <StudentsApp />;
    if (id.includes('business')) return <BusinessApp />;
    if (id.includes('restaurant') || id.includes('cafe')) return <RestaurantApp />;
    if (id.includes('club')) return <ClubsApp />;
    if (id.includes('event')) return <EventsApp />;
    if (id.includes('education')) return <EducationApp />;
    if (id.includes('nonprofit')) return <NonprofitApp />;
    if (id.includes('portfolio')) return <PortfolioApp />;
    if (id.includes('startup')) return <StartupApp />;
    if (id.includes('fashion')) return <FashionApp />;
    if (id.includes('tech') || id.includes('saas')) return <TechApp />;
    if (id.includes('creator') || id.includes('blog')) return <CreatorApp />;
    return <BusinessApp />;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-8 font-mono select-none animate-fadeIn">
      <div className="max-w-6xl w-full bg-[#0a0b10] border border-white/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[92vh]">

        {/* MODAL HEADER */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-white/10 bg-[#07070A]">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: template.palette[2] }} />
            <div>
              <h3 className="text-base font-bold text-white">{customName}</h3>
              <p className="text-[10px] text-[#8E8E98]">Category: {template.category} • Multi-Page Mini Website with Hash Routing</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-xl p-1">
              <button
                onClick={() => setViewMode('desktop')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'desktop' ? 'bg-white text-black font-bold' : 'text-[#8E8E98] hover:text-white'}`}
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('mobile')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'mobile' ? 'bg-white text-black font-bold' : 'text-[#8E8E98] hover:text-white'}`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>

            <button onClick={onClose} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#8E8E98] hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PREVIEW CONTAINER */}
        <div className="flex-1 overflow-y-auto p-6 flex items-center justify-center bg-black/50">
          <div className={`transition-all duration-500 rounded-3xl overflow-hidden shadow-2xl border border-white/15 flex flex-col ${viewMode === 'desktop' ? 'w-full max-w-5xl h-[680px]' : 'w-[390px] h-[720px]'}`}>
            {renderTemplateApp()}
          </div>
        </div>

        {/* ADVANCED TOGGLE & FOOTER */}
        <div className="border-t border-white/10 bg-[#07070A]">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full px-8 py-3 flex items-center justify-between text-xs font-bold text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#22D3EE]" />
              <span>ADVANCED VIBE & COPY CUSTOMIZATION</span>
            </div>
            <span>{showAdvanced ? '[-] Collapse' : '[+] Expand'}</span>
          </button>

          {showAdvanced && (
            <div className="px-8 pb-6 pt-2 grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-white/5 animate-fadeIn text-xs">
              <div>
                <label className="block text-[#8E8E98] mb-2">Brand / Project Name</label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-white font-sans outline-none focus:border-white/40"
                />
              </div>

              <div>
                <label className="block text-[#8E8E98] mb-2">Tone of Voice</label>
                <select
                  value={customTone}
                  onChange={(e) => setCustomTone(e.target.value as any)}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-white font-sans outline-none focus:border-white/40"
                >
                  <option value="Professional">Professional</option>
                  <option value="Friendly">Friendly</option>
                  <option value="Bold">Bold</option>
                  <option value="Playful">Playful</option>
                </select>
              </div>

              <div className="flex items-center justify-between md:col-span-2 pt-4 border-t border-white/10">
                <div className="flex items-center gap-4">
                  <button onClick={handleRandomize} className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white flex items-center gap-2 border border-white/10 cursor-pointer">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Randomize
                  </button>
                  <button onClick={handleReset} className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#8E8E98] hover:text-white flex items-center gap-2 border border-white/10 cursor-pointer">
                    <RefreshCw className="w-3.5 h-3.5" /> Reset
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <button onClick={onClose} className="px-5 py-2.5 rounded-xl text-[#8E8E98] hover:text-white cursor-pointer">
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveAndApply}
                    className="px-6 py-2.5 rounded-xl text-black font-extrabold flex items-center gap-2 shadow-xl cursor-pointer hover:scale-105 transition-all"
                    style={{ backgroundColor: accentColor }}
                  >
                    <span>Apply Template</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {!showAdvanced && (
          <div className="px-8 py-4 border-t border-white/10 bg-[#07070A] flex items-center justify-between">
            <span className="text-xs text-[#8E8E98]">Hash Routing Active • Live Preview & Standalone Export Ready</span>
            <div className="flex items-center gap-4">
              <button onClick={onClose} className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold cursor-pointer">
                Close
              </button>
              <button
                onClick={handleSaveAndApply}
                className="px-6 py-2.5 rounded-xl text-black font-extrabold flex items-center gap-2 shadow-xl cursor-pointer hover:scale-105 transition-all"
                style={{ backgroundColor: accentColor }}
              >
                <span>Use Template</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
