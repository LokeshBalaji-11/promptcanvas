import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Layers, Download, Monitor, Code, User, ArrowRight } from 'lucide-react';
import { SPECTRUM_COLORS } from '../engine/spectrum';

interface InteractiveFeatureBoxesProps {
  accentColor: string;
}

export const InteractiveFeatureBoxes: React.FC<InteractiveFeatureBoxesProps> = ({ accentColor }) => {
  const navigate = useNavigate();

  const boxes = [
    {
      id: 'moodboard',
      code: '01 // MOODBOARD CANVAS',
      title: 'MOODBOARD CANVAS',
      desc: 'Draggable spatial bento grid, 5-color palette, and real-time typography hierarchy.',
      icon: <Sparkles className="w-5 h-5 text-[#CCFF00]" />,
      path: '/studio?tab=moodboard',
      color: SPECTRUM_COLORS[0]
    },
    {
      id: 'command',
      code: '02 // AI COMMAND EDITOR',
      title: 'AI COMMAND EDITOR',
      desc: 'Natural language editing for colors, fonts, layout updates, and brand synthesis.',
      icon: <Layers className="w-5 h-5 text-[#00F0FF]" />,
      path: '/studio?tab=moodboard&focus=command',
      color: SPECTRUM_COLORS[1]
    },
    {
      id: 'upload',
      code: '03 // DROP IMAGE TO SITE',
      title: 'DROP IMAGE TO SITE',
      desc: 'Extract color vectors and atmospheric depth directly from reference screenshots.',
      icon: <Download className="w-5 h-5 text-[#FF2A5F]" />,
      path: '/studio?tab=moodboard&action=upload',
      color: SPECTRUM_COLORS[2]
    },
    {
      id: 'preview',
      code: '04 // LIVE SITE PREVIEW',
      title: 'LIVE SITE PREVIEW',
      desc: 'Interactive website hero preview with dark/light mode and WCAG contrast audit.',
      icon: <Monitor className="w-5 h-5 text-[#9D4EDD]" />,
      path: '/studio?tab=preview',
      color: SPECTRUM_COLORS[3]
    },
    {
      id: 'code',
      code: '05 // CODE & DOWNLOADS',
      title: 'CODE & DOWNLOADS',
      desc: 'Production-ready HTML/CSS, React JSX, Tailwind tokens, and standalone downloads.',
      icon: <Code className="w-5 h-5 text-[#FFB703]" />,
      path: '/studio?tab=code',
      color: SPECTRUM_COLORS[4]
    },
    {
      id: 'history',
      code: '06 // SAVED HISTORY & AUTH',
      title: 'SAVED HISTORY & AUTH',
      desc: 'Per-user persistent boards, AI command logs, and 1-click Demo Designer login.',
      icon: <User className="w-5 h-5 text-[#00F59B]" />,
      path: '/studio?tab=moodboard&drawer=history',
      color: SPECTRUM_COLORS[6]
    }
  ];

  return (
    <section className="py-28 px-8 md:px-16 max-w-7xl mx-auto relative z-10">
      <div className="flex items-center gap-3 mb-4 font-mono text-xs text-[#8E8E98] uppercase tracking-widest">
        <span>[03] LAUNCH MODULES</span>
        <div className="h-[1px] flex-1 bg-white/10" />
      </div>

      <h3 className="text-4xl md:text-5xl font-extrabold text-[#F5F5F5] tracking-tight mb-16">
        SYNTAX ERROR <span style={{ color: accentColor }}>LAUNCHPAD</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {boxes.map((box) => (
          <div
            key={box.id}
            onClick={() => navigate(box.path)}
            className="bg-[#0a0b10] border border-white/10 rounded-3xl p-8 flex flex-col justify-between group hover:border-white/30 transition-all cursor-pointer shadow-2xl hover:-translate-y-1 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10 blur-2xl rounded-full pointer-events-none" style={{ backgroundColor: box.color }} />
            
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                {box.icon}
              </div>
              <div className="font-mono text-xs text-[#8E8E98] mb-1">{box.code}</div>
              <h4 className="text-xl font-bold text-white mb-3">{box.title}</h4>
              <p className="text-sm text-[#8E8E98] font-light leading-relaxed mb-8">
                {box.desc}
              </p>
            </div>

            <div className="font-mono text-xs text-white pt-4 border-t border-white/10 flex items-center justify-between group-hover:text-[#CCFF00]" style={{ '--hover-color': box.color } as any}>
              <span>[OPEN &rarr;]</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
