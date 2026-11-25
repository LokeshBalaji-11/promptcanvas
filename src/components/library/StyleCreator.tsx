import React, { useState, useEffect } from 'react';
import { Sparkles, Save, Download, Upload, Copy, Check, Trash2, Edit2, Play, RefreshCw } from 'lucide-react';
import { CustomStyle } from '../../types/library';

interface StyleCreatorProps {
  onSaveStyle: (style: CustomStyle) => void;
  savedStyles: CustomStyle[];
  onDeleteStyle: (id: string) => void;
  onEditStyle: (style: CustomStyle) => void;
}

export const StyleCreator: React.FC<StyleCreatorProps> = ({
  onSaveStyle,
  savedStyles,
  onDeleteStyle,
  onEditStyle
}) => {
  const [name, setName] = useState('My Custom Glass Card');
  const [tags, setTags] = useState('glass, neon, interactive');
  const [radius, setRadius] = useState(16);
  const [borderWidth, setBorderWidth] = useState(1);
  const [borderStyle, setBorderStyle] = useState('solid');
  const [borderColor, setBorderColor] = useState('#22D3EE');
  const [shadowBlur, setShadowBlur] = useState(24);
  const [shadowColor, setShadowColor] = useState('rgba(34,211,238,0.25)');
  const [glassBlur, setGlassBlur] = useState(12);
  const [glassOpacity, setGlassOpacity] = useState(0.06);
  const [gradientAngle, setGradientAngle] = useState(135);
  const [gradientStart, setGradientStart] = useState('#12121a');
  const [gradientEnd, setGradientEnd] = useState('#08080c');
  const [glowColor, setGlowColor] = useState('#22D3EE');
  const [easing, setEasing] = useState('cubic-bezier(0.16, 1, 0.3, 1)');
  const [duration, setDuration] = useState(0.6);
  const [delay, setDelay] = useState(0);
  const [stagger, setStagger] = useState(0.05);
  const [hoverScale, setHoverScale] = useState(1.03);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Generated CSS string
  const generatedCss = `/* ${name} */
.custom-card-${Math.abs(name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0))} {
  background: linear-gradient(${gradientAngle}deg, rgba(255,255,255,${glassOpacity}) 0%, ${gradientStart} 100%);
  backdrop-filter: blur(${glassBlur}px);
  -webkit-backdrop-filter: blur(${glassBlur}px);
  border: ${borderWidth}px ${borderStyle} ${borderColor};
  border-radius: ${radius}px;
  box-shadow: 0 10px ${shadowBlur}px ${shadowColor}, 0 0 15px ${glowColor}33;
  transition: transform ${duration}s ${easing}, box-shadow ${duration}s ${easing};
}
.custom-card:hover {
  transform: scale(${hoverScale});
  box-shadow: 0 20px ${shadowBlur * 1.5}px ${shadowColor}, 0 0 25px ${glowColor}66;
}`;

  const handleSave = () => {
    const newStyle: CustomStyle = {
      id: editingId || `custom-${Date.now()}`,
      name,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      radius,
      borderWidth,
      borderStyle,
      borderColor,
      shadowBlur,
      shadowColor,
      glassBlur,
      glassOpacity,
      gradientAngle,
      gradientStart,
      gradientEnd,
      glowColor,
      easing,
      duration,
      delay,
      stagger,
      hoverScale,
      cssCode: generatedCss,
      thumbnailColor: glowColor,
      updatedAt: new Date().toISOString()
    };
    onSaveStyle(newStyle);
    setEditingId(null);
  };

  const handleAiGenerate = () => {
    if (!aiPrompt.trim()) return;
    setIsAiLoading(true);
    setTimeout(() => {
      const lower = aiPrompt.toLowerCase();
      if (lower.includes('neon') || lower.includes('cyberpunk')) {
        setGlowColor('#22D3EE');
        setBorderColor('#22D3EE');
        setShadowColor('rgba(34,211,238,0.4)');
      } else if (lower.includes('brutalist') || lower.includes('acid')) {
        setGlowColor('#CCFF00');
        setBorderColor('#000000');
        setBorderWidth(3);
        setRadius(4);
      } else if (lower.includes('smooth') || lower.includes('bouncy')) {
        setEasing('cubic-bezier(0.34, 1.56, 0.64, 1)');
        setDuration(0.8);
        setHoverScale(1.06);
      }
      setName(aiPrompt.slice(0, 30) + ' (AI)');
      setIsAiLoading(false);
      setAiPrompt('');
    }, 1200);
  };

  const handleLoadStyle = (style: CustomStyle) => {
    setEditingId(style.id);
    setName(style.name);
    setTags(style.tags.join(', '));
    setRadius(style.radius);
    setBorderWidth(style.borderWidth);
    setBorderStyle(style.borderStyle);
    setBorderColor(style.borderColor);
    setShadowBlur(style.shadowBlur);
    setShadowColor(style.shadowColor);
    setGlassBlur(style.glassBlur);
    setGlassOpacity(style.glassOpacity);
    setGradientAngle(style.gradientAngle);
    setGradientStart(style.gradientStart);
    setGradientEnd(style.gradientEnd);
    setGlowColor(style.glowColor);
    setEasing(style.easing);
    setDuration(style.duration);
    setDelay(style.delay);
    setStagger(style.stagger);
    setHoverScale(style.hoverScale);
  };

  const handleCopyCss = () => {
    navigator.clipboard.writeText(generatedCss);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left: Controls Builder (7 cols) */}
      <div className="lg:col-span-7 space-y-6 bg-[#101015] border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h3 className="text-base font-semibold text-white">Style & Motion Creator</h3>
            <p className="text-xs text-zinc-400 mt-0.5">Design custom glass, shadows, borders, and cubic-bezier easing.</p>
          </div>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-cyan-500 text-black text-xs font-bold hover:bg-cyan-400 transition-colors flex items-center gap-1.5 shadow-lg shadow-cyan-500/20"
          >
            <Save className="w-4 h-4" /> {editingId ? 'Update Style' : 'Save Style'}
          </button>
        </div>

        {/* AI Prompt Box */}
        <div className="bg-[#07070a] border border-cyan-500/30 p-4 rounded-xl space-y-3">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold">
            <Sparkles className="w-4 h-4" /> AI Style Prompt
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. 'bouncy neon card with deep blur and cyan glow'"
              value={aiPrompt}
              onChange={e => setAiPrompt(e.target.value)}
              className="flex-1 bg-[#121218] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-cyan-400"
            />
            <button
              onClick={handleAiGenerate}
              disabled={isAiLoading}
              className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/30 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
            >
              {isAiLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
              Generate
            </button>
          </div>
        </div>

        {/* Form Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-zinc-400 mb-1.5 font-medium">Style Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-[#07070a] border border-white/10 rounded-xl px-3 py-2 text-zinc-200 focus:outline-none focus:border-cyan-400"
            />
          </div>
          <div>
            <label className="block text-zinc-400 mb-1.5 font-medium">Tags (comma separated)</label>
            <input
              type="text"
              value={tags}
              onChange={e => setTags(e.target.value)}
              className="w-full bg-[#07070a] border border-white/10 rounded-xl px-3 py-2 text-zinc-200 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <div className="flex justify-between text-zinc-400 mb-1.5 font-medium">
              <span>Border Radius</span>
              <span className="text-cyan-400 font-mono">{radius}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              value={radius}
              onChange={e => setRadius(parseInt(e.target.value))}
              className="w-full accent-cyan-400 h-1 bg-zinc-800 rounded-lg cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-zinc-400 mb-1.5 font-medium">
              <span>Border Width</span>
              <span className="text-cyan-400 font-mono">{borderWidth}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="6"
              value={borderWidth}
              onChange={e => setBorderWidth(parseInt(e.target.value))}
              className="w-full accent-cyan-400 h-1 bg-zinc-800 rounded-lg cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-zinc-400 mb-1.5 font-medium">Border Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={borderColor}
                onChange={e => setBorderColor(e.target.value)}
                className="w-9 h-9 rounded-lg bg-transparent cursor-pointer border border-white/10"
              />
              <input
                type="text"
                value={borderColor}
                onChange={e => setBorderColor(e.target.value)}
                className="flex-1 bg-[#07070a] border border-white/10 rounded-xl px-3 py-2 text-zinc-200 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-zinc-400 mb-1.5 font-medium">Glow / Accent Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={glowColor}
                onChange={e => setGlowColor(e.target.value)}
                className="w-9 h-9 rounded-lg bg-transparent cursor-pointer border border-white/10"
              />
              <input
                type="text"
                value={glowColor}
                onChange={e => setGlowColor(e.target.value)}
                className="flex-1 bg-[#07070a] border border-white/10 rounded-xl px-3 py-2 text-zinc-200 font-mono"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-zinc-400 mb-1.5 font-medium">
              <span>Glass Blur (backdrop-filter)</span>
              <span className="text-cyan-400 font-mono">{glassBlur}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              value={glassBlur}
              onChange={e => setGlassBlur(parseInt(e.target.value))}
              className="w-full accent-cyan-400 h-1 bg-zinc-800 rounded-lg cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-zinc-400 mb-1.5 font-medium">
              <span>Hover Scale Multiplier</span>
              <span className="text-cyan-400 font-mono">{hoverScale}x</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="1.15"
              step="0.01"
              value={hoverScale}
              onChange={e => setHoverScale(parseFloat(e.target.value))}
              className="w-full accent-cyan-400 h-1 bg-zinc-800 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Right: Live Preview & Saved Styles (5 cols) */}
      <div className="lg:col-span-5 space-y-6">
        {/* Live Preview Card */}
        <div className="bg-[#101015] border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h4 className="text-xs font-semibold text-white">Live 60fps Preview</h4>
            <button
              onClick={handleCopyCss}
              className="text-[11px] text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedCode ? 'Copied CSS' : 'Copy CSS'}
            </button>
          </div>

          <div className="h-44 bg-[#07070a] rounded-xl border border-white/5 flex items-center justify-center p-6 relative overflow-hidden">
            <div
              className="w-full p-6 text-center cursor-pointer transition-all duration-300 group"
              style={{
                background: `linear-gradient(${gradientAngle}deg, rgba(255,255,255,${glassOpacity}) 0%, ${gradientStart} 100%)`,
                backdropFilter: `blur(${glassBlur}px)`,
                WebkitBackdropFilter: `blur(${glassBlur}px)`,
                border: `${borderWidth}px ${borderStyle} ${borderColor}`,
                borderRadius: `${radius}px`,
                boxShadow: `0 10px ${shadowBlur}px ${shadowColor}, 0 0 15px ${glowColor}33`,
                transform: `scale(1)`
              }}
            >
              <h5 className="text-sm font-bold text-white mb-1 group-hover:scale-105 transition-transform">{name}</h5>
              <p className="text-[11px] text-zinc-400">Hover or interact to test dynamic variables</p>
            </div>
          </div>

          <pre className="bg-[#07070a] p-3 rounded-xl border border-white/5 text-[10px] font-mono text-zinc-400 overflow-x-auto max-h-28 scrollbar-none">
            <code>{generatedCss}</code>
          </pre>
        </div>

        {/* Saved Styles in LocalStorage */}
        <div className="bg-[#101015] border border-white/10 rounded-2xl p-6 space-y-4">
          <h4 className="text-xs font-semibold text-white">Saved Custom Styles ({savedStyles.length})</h4>
          <div className="space-y-2.5 max-h-56 overflow-y-auto scrollbar-none">
            {savedStyles.length === 0 ? (
              <p className="text-xs text-zinc-500 text-center py-4">No custom styles saved yet.</p>
            ) : (
              savedStyles.map(style => (
                <div
                  key={style.id}
                  className="bg-[#07070a] border border-white/5 rounded-xl p-3 flex items-center justify-between hover:border-cyan-500/40 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: style.thumbnailColor }} />
                    <div>
                      <h5 className="text-xs font-semibold text-white">{style.name}</h5>
                      <span className="text-[10px] font-mono text-zinc-500">{style.tags.join(', ')}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleLoadStyle(style)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 transition-colors"
                      title="Load into builder"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteStyle(style.id)}
                      className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                      title="Delete style"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
