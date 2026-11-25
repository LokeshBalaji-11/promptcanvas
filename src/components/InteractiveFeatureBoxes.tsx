import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Layers, Download, Monitor, Code, User, ArrowRight, ChevronDown } from 'lucide-react';

interface InteractiveFeatureBoxesProps {
  accentColor: string;
}

export const InteractiveFeatureBoxes: React.FC<InteractiveFeatureBoxesProps> = ({ accentColor }) => {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const boxes = [
    {
      id: 'moodboard',
      number: '01',
      title: 'MOODBOARD CANVAS',
      desc: 'Draggable spatial bento grid, 5-color palette, and real-time typography hierarchy.',
      icon: <Sparkles className="w-5 h-5 text-[#CCFF00]" />,
      path: '/studio?tab=moodboard',
      previewContent: 'Generates interactive layout bento grid with live WCAG contrast checks.'
    },
    {
      id: 'command',
      number: '02',
      title: 'AI COMMAND EDITOR',
      desc: 'Natural language editing for colors, fonts, layout updates, and brand synthesis.',
      icon: <Layers className="w-5 h-5 text-[#22D3EE]" />,
      path: '/studio?tab=moodboard&focus=command',
      previewContent: 'Parses natural language instructions into design token updates instantly.'
    },
    {
      id: 'upload',
      number: '03',
      title: 'DROP IMAGE TO SITE',
      desc: 'Extract color vectors and atmospheric depth directly from reference screenshots.',
      icon: <Download className="w-5 h-5 text-[#FF3B5C]" />,
      path: '/studio?tab=moodboard&action=upload',
      previewContent: 'Image-to-website vector extractor extracts palette and mood in 0.4s.'
    },
    {
      id: 'preview',
      number: '04',
      title: 'LIVE SITE PREVIEW',
      desc: 'Interactive website hero preview with dark/light mode and WCAG contrast audit.',
      icon: <Monitor className="w-5 h-5 text-[#9D4EDD]" />,
      path: '/studio?tab=preview',
      previewContent: 'Renders fully responsive HTML/CSS website preview inside sandbox card.'
    },
    {
      id: 'code',
      number: '05',
      title: 'CODE & DOWNLOADS',
      desc: 'Production-ready HTML/CSS, React JSX, Tailwind tokens, and standalone downloads.',
      icon: <Code className="w-5 h-5 text-[#FFB703]" />,
      path: '/studio?tab=code',
      previewContent: 'Exports clean React components, Tailwind config, and standalone HTML zips.'
    },
    {
      id: 'history',
      number: '06',
      title: 'SAVED HISTORY & AUTH',
      desc: 'Per-user persistent boards, AI command logs, and 1-click Demo Designer login.',
      icon: <User className="w-5 h-5 text-[#3DFFA2]" />,
      path: '/studio?tab=moodboard&drawer=history',
      previewContent: 'Saves boards to local storage and syncs session state across tabs.'
    }
  ];

  return (
    <section className="py-28 px-8 md:px-16 max-w-7xl mx-auto relative z-10">
      <div className="flex items-center gap-3 mb-4 font-mono text-xs text-[#8E8E98] uppercase tracking-widest">
        <span className="text-[#9D4EDD]">[04]</span>
        <span>LAUNCH MODULES</span>
        <div className="h-[1px] flex-1 bg-white/10" />
      </div>

      <h3 className="text-4xl md:text-6xl font-extrabold text-[#F5F5F5] tracking-tight mb-16">
        FEATURE <span style={{ color: accentColor }}>ECOSYSTEM</span>
      </h3>

      <div className="space-y-4">
        {boxes.map((box) => {
          const isExpanded = expandedId === box.id;
          return (
            <div 
              key={box.id}
              className="bg-[#0a0b10]/90 backdrop-blur-xl border border-white/15 rounded-3xl overflow-hidden transition-all duration-300 hover:border-white/40 hover:shadow-2xl hover:shadow-cyan-500/10 group"
            >
              <div 
                onClick={() => setExpandedId(isExpanded ? null : box.id)}
                className="p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 cursor-pointer"
              >
                <div className="flex items-center gap-6">
                  <span className="font-mono text-xl font-black text-[#8E8E98] group-hover:text-white transition-colors">{box.number}</span>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      {box.icon}
                      <h4 className="text-xl font-bold text-white tracking-wide">{box.title}</h4>
                    </div>
                    <p className="text-sm text-[#8E8E98] font-light max-w-xl">{box.desc}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(box.path);
                    }}
                    className="px-5 py-2.5 rounded-xl font-mono text-xs font-bold text-black uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer flex items-center gap-2"
                    style={{ backgroundColor: accentColor }}
                  >
                    <span>LAUNCH</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <ChevronDown className={`w-5 h-5 text-[#8E8E98] transition-transform duration-300 ${isExpanded ? 'rotate-180 text-white' : ''}`} />
                </div>
              </div>

              {isExpanded && (
                <div className="px-8 pb-8 pt-4 border-t border-white/10 bg-black/60 font-mono text-xs text-[#22D3EE] flex items-center justify-between animate-fadeIn">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500">// LIVE INSPECTOR:</span>
                    <span>{box.previewContent}</span>
                  </div>
                  <span className="text-[#3DFFA2] bg-[#3DFFA2]/10 px-2.5 py-1 rounded-full border border-[#3DFFA2]/20">STATUS: READY</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
