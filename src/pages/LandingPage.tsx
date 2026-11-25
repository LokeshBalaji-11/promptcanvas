import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PRELOADER_MODULES } from '../preloaders';
import { EnhancedHero } from '../components/EnhancedHero';
import { DevDesignSplitSection } from '../components/DevDesignSplitSection';
import { StyleTrackSection } from '../components/StyleTrackSection';
import { MarqueeStrips } from '../components/MarqueeStrips';
import { InteractiveFeatureBoxes } from '../components/InteractiveFeatureBoxes';
import { JudgeGuideModal } from '../components/JudgeGuideModal';
import { AuthModal } from '../components/AuthModal';
import { ScrollProgress } from '../components/ScrollProgress';

export function LandingPage() {
  const navigate = useNavigate();
  const [accentColor, setAccentColor] = useState<string>('#CCFF00');
  const [selectedPreloaderId, setSelectedPreloaderId] = useState<'chroma-bloom' | 'ink-type' | 'pixel-assemble'>('chroma-bloom');
  const [isPreloading, setIsPreloading] = useState<boolean>(true);
  const [showGuideModal, setShowGuideModal] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(null);

  const ActivePreloader = PRELOADER_MODULES.find(m => m.id === selectedPreloaderId)?.component || PRELOADER_MODULES[0].component;

  useEffect(() => {
    const lenis = new Lenis();
    let frame = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="bg-[#07070A] text-[#F5F5F5] min-h-screen selection:bg-[#CCFF00] selection:text-black font-sans overflow-x-hidden bg-gradient-mesh">
      <ScrollProgress accentColor={accentColor} />
      {isPreloading && <ActivePreloader onComplete={() => setIsPreloading(false)} loadProgress={100} accentColor={accentColor} />}

      <EnhancedHero accentColor={accentColor} />

      {/* [01] DEV × DESIGN SPLIT */}
      <DevDesignSplitSection accentColor={accentColor} />

      {/* [02] STYLE TRACK HORIZONTAL SCROLL */}
      <StyleTrackSection onThemeChange={(color) => setAccentColor(color)} />

      {/* [03] VELOCITY-REACTIVE MARQUEE STRIPS */}
      <MarqueeStrips accentColor={accentColor} />

      {/* [04] FEATURE ECOSYSTEM */}
      <InteractiveFeatureBoxes accentColor={accentColor} />

      {/* FOOTER */}
      <footer className="py-28 px-8 border-t border-white/10 text-center relative z-10 bg-[#07070A]">
        <h2 
          className="font-black text-white uppercase tracking-tighter mb-8 leading-none"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 10rem)', WebkitTextStroke: `2px ${accentColor}` }}
        >
          PROMPTCANVAS
        </h2>

        <div className="font-mono text-sm text-[#8E8E98] mb-12 flex items-center justify-center gap-2">
          <span>Prompt. Preview. Ship.</span>
          <span className="w-2.5 h-4 bg-[#3DFFA2] animate-pulse" />
        </div>

        <p className="text-xs font-mono text-[#8E8E98] max-w-xl mx-auto mb-8 leading-relaxed">
          Built for Roxten Studios Hackathon 2026. Powered by Advanced Agentic Coding & 12-Color Kinetic Spectrum Architecture.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <button
            onClick={() => navigate('/studio')}
            className="px-8 py-4 rounded-2xl font-mono text-xs font-black uppercase tracking-wider text-black transition-all hover:scale-105 shadow-2xl cursor-pointer"
            style={{ backgroundColor: accentColor }}
          >
            ENTER STUDIO WORKSPACE &rarr;
          </button>
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-4 py-2">
            <button
              onClick={() => {
                sessionStorage.removeItem('preloader-played');
                setIsPreloading(true);
              }}
              className="font-mono text-xs font-semibold text-white hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Replay Preloader ↺
            </button>
            <div className="w-[1px] h-4 bg-white/20 mx-2" />
            <select
              value={selectedPreloaderId}
              onChange={(e) => {
                setSelectedPreloaderId(e.target.value as any);
                setIsPreloading(true);
              }}
              className="bg-transparent text-xs font-mono text-cyan-400 outline-none cursor-pointer"
            >
              {PRELOADER_MODULES.map(m => (
                <option key={m.id} value={m.id} className="bg-[#07070A] text-white">{m.name}</option>
              ))}
            </select>
          </div>
        </div>
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
