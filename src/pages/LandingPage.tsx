import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Share2, HelpCircle } from 'lucide-react';
import { AsciiHeroCanvas } from '../components/AsciiHeroCanvas';
import { BlueprintSection } from '../components/BlueprintSection';
import { AsciiScrollSection } from '../components/AsciiScrollSection';
import { InteractiveFeatureBoxes } from '../components/InteractiveFeatureBoxes';
import { JudgeGuideModal } from '../components/JudgeGuideModal';
import { AuthModal } from '../components/AuthModal';

export function LandingPage() {
  const navigate = useNavigate();
  const [accentColor, setAccentColor] = useState<string>('#CCFF00');
  const [showGuideModal, setShowGuideModal] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(null);

  return (
    <div className="bg-[#060608] text-[#F5F5F5] min-h-screen selection:bg-[#CCFF00] selection:text-black font-sans overflow-x-hidden">

      {/* MINIMAL TOP NAV BAR */}
      <nav className="fixed top-0 z-50 h-20 w-full border-b border-white/10 bg-[#060608]/80 backdrop-blur-2xl px-8 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-8 h-8 rounded-xl flex items-center justify-center font-mono font-black text-black shadow-lg" style={{ backgroundColor: accentColor }}>
            P
          </div>
          <span className="font-extrabold text-lg tracking-tighter text-white">PROMPT<span style={{ color: accentColor }}>CANVAS</span></span>
        </div>

        <div className="hidden md:flex items-center gap-8 font-mono text-xs text-[#8E8E98]">
          <a href="#blueprint" className="hover:text-white transition-colors">01 SYSTEMS</a>
          <a href="#morph" className="hover:text-white transition-colors">02 STYLES</a>
          <a href="#modules" className="hover:text-white transition-colors">03 MODULES</a>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-xl p-1 font-mono text-[10px]">
            <button 
              onClick={() => setAccentColor('#CCFF00')}
              className={`px-2 py-1 rounded-lg transition-all ${accentColor === '#CCFF00' ? 'bg-[#CCFF00] text-black font-bold' : 'text-[#8E8E98]'}`}
            >
              ACID
            </button>
            <button 
              onClick={() => setAccentColor('#00F0FF')}
              className={`px-2 py-1 rounded-lg transition-all ${accentColor === '#00F0FF' ? 'bg-[#00F0FF] text-black font-bold' : 'text-[#8E8E98]'}`}
            >
              CYAN
            </button>
          </div>

          <button
            onClick={() => setShowAuthModal(true)}
            className="px-3 py-2 rounded-xl bg-white/5 border border-white/15 hover:bg-white/10 text-xs font-mono font-bold text-white transition-all cursor-pointer hidden lg:block"
          >
            {currentUser ? '🟢 [DEMO JUDGE]' : '[SIGN IN]'}
          </button>

          <button
            onClick={() => setShowGuideModal(true)}
            className="w-9 h-9 rounded-xl bg-white/5 border border-white/15 hover:bg-white/10 text-white flex items-center justify-center transition-all cursor-pointer font-mono text-xs font-bold"
          >
            ?
          </button>

          <button
            onClick={() => navigate('/studio')}
            className="px-5 py-2.5 rounded-xl font-mono text-xs font-extrabold text-black uppercase tracking-wider shadow-xl transition-all hover:scale-105 cursor-pointer"
            style={{ backgroundColor: accentColor }}
          >
            OPEN STUDIO &rarr;
          </button>
        </div>
      </nav>

      {/* ACT 1 — HERO WITH 12-COLOR SPECTRUM ASCII CONVERGENCE */}
      <section className="relative h-screen w-full flex flex-col justify-center items-center px-8 text-center overflow-hidden">
        <AsciiHeroCanvas accentColor={accentColor} />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/15 text-white font-mono text-xs tracking-widest uppercase mb-8 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: accentColor }} />
            PROMPTCANVAS // 12-COLOR KINETIC ENGINE
          </div>

          <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-white mb-6 uppercase leading-none">
            SPATIAL <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-400 to-[#8E8E98]" style={{ WebkitTextStroke: `1px ${accentColor}` }}>
              STORYBOARDS
            </span>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl max-w-2xl font-light mb-12">
            AI-powered moodboard synthesis with 12-color kinetic spectrum animation for hackathons and design systems.
          </p>

          <button
            onClick={() => navigate('/studio')}
            className="px-8 py-4 rounded-2xl font-mono text-xs font-extrabold text-black uppercase tracking-wider shadow-2xl transition-all hover:scale-105 cursor-pointer"
            style={{ backgroundColor: accentColor }}
          >
            LAUNCH STUDIO CANVAS &rarr;
          </button>
        </div>

        <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center text-xs font-mono text-[#8E8E98] z-10">
          <span>LATITUDE: 35.6762° N</span>
          <span>ROXTEN STUDIOS HACKATHON</span>
          <span>LONGITUDE: 139.6503° E</span>
        </div>
      </section>

      {/* ACT 2 — ARCHITECTURAL BLUEPRINT */}
      <div id="blueprint">
        <BlueprintSection accentColor={accentColor} />
      </div>

      {/* ACT 3 — 12-COLOR KINETIC ASCII SCROLL MORPH */}
      <div id="morph">
        <AsciiScrollSection 
          accentColor={accentColor} 
          onSelectStyle={(styleName) => navigate(`/studio?style=${styleName}`)} 
        />
      </div>

      {/* ACT 4 — SYNTAX ERROR INTERACTIVE FEATURE BOXES */}
      <div id="modules">
        <InteractiveFeatureBoxes accentColor={accentColor} />
      </div>

      {/* FOOTER CTA */}
      <footer className="py-20 border-t border-white/10 text-center relative z-10">
        <h3 className="text-3xl font-black text-white mb-6">READY TO DESIGN AT THE SPEED OF THOUGHT?</h3>
        <button
          onClick={() => navigate('/studio')}
          className="px-8 py-4 rounded-2xl font-mono text-xs font-extrabold text-black uppercase tracking-wider shadow-2xl transition-all hover:scale-105 cursor-pointer"
          style={{ backgroundColor: accentColor }}
        >
          ENTER PROMPTCANVAS STUDIO &rarr;
        </button>
      </footer>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        accentColor={accentColor} 
        onLogin={(u) => setCurrentUser(u)} 
      />

      <JudgeGuideModal 
        isOpen={showGuideModal} 
        onClose={() => setShowGuideModal(false)} 
        accentColor={accentColor} 
      />

    </div>
  );
}
