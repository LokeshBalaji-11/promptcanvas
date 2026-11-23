import React from 'react';
import { HelpCircle, Sparkles, Layout, Download, Share2, Monitor, Code } from 'lucide-react';

interface JudgeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  accentColor: string;
}

export const JudgeGuideModal: React.FC<JudgeGuideModalProps> = ({ isOpen, onClose, accentColor }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-lg flex items-center justify-center p-6">
      <div className="bg-[#0a0b10] border border-white/20 rounded-3xl p-8 max-w-2xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: accentColor }}>
              Roxten Studios Hackathon
            </div>
            <h3 className="text-3xl font-black text-white">Interactive Judge Guide</h3>
          </div>
          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-[#8E8E98] hover:text-white transition-all font-mono cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6 text-sm text-[#8E8E98] font-light">
          <p className="text-white leading-relaxed">
            Welcome judges! PromptCanvas is an AI-powered spatial moodboard and visual storyboard generator built for high-end UX/UI hackathons. Here is how to experience all features:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#060608] border border-white/10">
              <div className="flex items-center gap-2 font-bold text-white mb-2">
                <Sparkles className="w-4 h-4" style={{ color: accentColor }} /> Prompt Generator
              </div>
              <p className="text-xs">Type any custom prompt or pick a preset vibe in the studio to instantly generate color palettes, typography, and atmospheric references.</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#060608] border border-white/10">
              <div className="flex items-center gap-2 font-bold text-white mb-2">
                <Monitor className="w-4 h-4 text-cyan-400" /> Live Website Preview
              </div>
              <p className="text-xs">Inspect the live mini-website preview card on the canvas that reacts in real-time to generated colors and fonts with dark/light mode toggle.</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#060608] border border-white/10">
              <div className="flex items-center gap-2 font-bold text-white mb-2">
                <Share2 className="w-4 h-4 text-rose-400" /> Instant Board Share
              </div>
              <p className="text-xs">Click the "Share Board" button to encode the active moodboard into a URL hash (`#board=...`) for instant cross-judge sharing.</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#060608] border border-white/10">
              <div className="flex items-center gap-2 font-bold text-white mb-2">
                <Download className="w-4 h-4 text-amber-400" /> Production Export
              </div>
              <p className="text-xs">Export complete JSON project specs, CSS custom properties, and Tailwind tokens directly from the export modal.</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
          <span className="font-mono text-xs text-[#8E8E98]">Press <kbd className="px-2 py-1 bg-white/15 rounded text-white">?</kbd> anytime to open</span>
          <button 
            onClick={onClose}
            className="px-6 py-3 rounded-xl font-mono text-xs font-bold text-black uppercase tracking-wider cursor-pointer shadow-lg"
            style={{ backgroundColor: accentColor }}
          >
            GOT IT &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
