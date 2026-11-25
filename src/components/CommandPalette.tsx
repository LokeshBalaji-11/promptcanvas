import React, { useEffect, useState } from 'react';
import { Search, Sparkles, Command, ArrowRight, X } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onExecute: (cmd: string) => void;
  accentColor: string;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onExecute, accentColor }) => {
  const [query, setQuery] = useState<string>('');
  const [recent, setRecent] = useState<string[]>([
    'Transform into Cyberpunk neon dark mode',
    'Switch typography to Editorial serif & mono',
    'Generate high-contrast WCAG AA accessible palette'
  ]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open trigger can be handled externally or via window event
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const suggestions = [
    'Convert theme to Minimalist monochrome',
    'Boost vibrancy with 12-color spectrum cycle',
    'Apply Cinematic atmospheric lighting',
    'Generate React JSX code bundle',
    'Audit WCAG contrast ratios across swatches'
  ].filter(s => s.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-24 px-4 font-mono select-none animate-fadeIn">
      <div className="max-w-2xl w-full bg-[#0a0b10] border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
        
        {/* INPUT BAR */}
        <div className="flex items-center gap-4 px-6 py-4 border-b border-white/10">
          <Search className="w-5 h-5 text-[#8E8E98]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or prompt vector..."
            className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-slate-600 font-sans"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && query.trim()) {
                onExecute(query);
                setRecent(prev => [query, ...prev.slice(0, 4)]);
                setQuery('');
                onClose();
              }
            }}
          />
          <button onClick={onClose} className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-[#8E8E98] hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* LIST */}
        <div className="p-4 max-h-[380px] overflow-y-auto space-y-2">
          <div className="text-[10px] font-mono text-[#8E8E98] px-3 py-1 uppercase tracking-widest">
            {query ? 'Suggested Commands' : 'Recent & Suggested Commands'}
          </div>

          {(query ? suggestions : [...recent, ...suggestions]).map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                onExecute(item);
                setRecent(prev => [item, ...prev.slice(0, 4)]);
                onClose();
              }}
              className="flex items-center justify-between px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/15 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3 text-xs text-slate-300 group-hover:text-white">
                <Sparkles className="w-3.5 h-3.5" style={{ color: accentColor }} />
                <span>{item}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#8E8E98] group-hover:text-white group-hover:translate-x-1 transition-all" />
            </div>
          ))}
        </div>

        {/* FOOTER HINT */}
        <div className="px-6 py-3 bg-black/60 border-t border-white/10 flex items-center justify-between text-[10px] text-[#8E8E98]">
          <span>Press [ESC] to close</span>
          <span>PromptCanvas AI Kernel v2.5</span>
        </div>
      </div>
    </div>
  );
};
