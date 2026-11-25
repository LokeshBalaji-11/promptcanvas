import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Shot1Sleeper } from './Shot1Sleeper';
import { Shot2Waking } from './Shot2Waking';
import { Shot3POV } from './Shot3POV';
import { Shot4IntoSite } from './Shot4IntoSite';
import { PreloaderProps, PreloaderModule } from '../types';

type ShotId = 'sleeper' | 'waking' | 'pov' | 'into-site';

const SHOT_TIMINGS: { id: ShotId; start: number; end: number }[] = [
  { id: 'sleeper', start: 0, end: 2500 },
  { id: 'waking', start: 2500, end: 4000 },
  { id: 'pov', start: 4000, end: 7000 },
  { id: 'into-site', start: 7000, end: 8000 }
];

const TOTAL_DURATION_MS = 8000;
const SKIP_THRESHOLD_MS = 1000;
const MIN_PLAY_MS = 4000;

export const AwakeningPreloader: React.FC<PreloaderProps> = ({
  onComplete,
  loadProgress,
  paletteOverrides
}) => {
  const [elapsed, setElapsed] = useState(0);
  const [activeShot, setActiveShot] = useState<ShotId>('sleeper');
  const [shotProgress, setShotProgress] = useState(0);
  const [canSkip, setCanSkip] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const startTimeRef = useRef(performance.now());
  const rafRef = useRef<number>(0);
  const hasPlayedRef = useRef(false);
  const reducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  // Check session storage for "already played"
  useEffect(() => {
    if (sessionStorage.getItem('awakening-played') === 'true') {
      onComplete();
      return;
    }
  }, [onComplete]);

  const finishPreloader = useCallback(() => {
    if (hasPlayedRef.current) return;
    hasPlayedRef.current = true;
    setIsExiting(true);
    sessionStorage.setItem('awakening-played', 'true');
    setTimeout(onComplete, 600);
  }, [onComplete]);

  // Reduced motion: simple 1s fade
  useEffect(() => {
    if (reducedMotion.current) {
      const t = setTimeout(finishPreloader, 1000);
      return () => clearTimeout(t);
    }
  }, [finishPreloader]);

  // Master timeline tick
  useEffect(() => {
    if (reducedMotion.current) return;

    const tick = () => {
      const now = performance.now();
      const ms = now - startTimeRef.current;
      setElapsed(ms);

      // Find active shot
      for (const shot of SHOT_TIMINGS) {
        if (ms >= shot.start && ms < shot.end) {
          setActiveShot(shot.id);
          setShotProgress((ms - shot.start) / (shot.end - shot.start));
          break;
        }
      }

      if (ms >= SKIP_THRESHOLD_MS) setCanSkip(true);

      // End conditions: timeline complete AND real loading done (min 4s)
      if (ms >= TOTAL_DURATION_MS && ms >= MIN_PLAY_MS && loadProgress >= 100) {
        finishPreloader();
        return;
      }

      // If timeline done but loading not 100%, loop last shot
      if (ms >= TOTAL_DURATION_MS && (loadProgress < 100 || ms < MIN_PLAY_MS)) {
        setActiveShot('into-site');
        setShotProgress(0.8);
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [loadProgress, finishPreloader]);

  const handleSkip = () => {
    if (canSkip) finishPreloader();
  };

  if (reducedMotion.current) {
    return (
      <div className={`fixed inset-0 z-[9999] bg-[#07070A] flex items-center justify-center transition-opacity duration-1000 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
        <div className="text-center">
          <h1 className="text-4xl font-black text-white mb-2">PROMPT<span className="text-[#CCFF00]">CANVAS</span></h1>
          <p className="text-xs font-mono text-white/40">Loading...</p>
        </div>
      </div>
    );
  }

  // Real load progress synced to shot 1 counter display
  const displayProgress = Math.min(100, Math.round(
    // Blend real progress with timeline progress
    loadProgress * 0.6 + (elapsed / TOTAL_DURATION_MS) * 40
  ));

  return (
    <div className={`fixed inset-0 z-[9999] bg-[#07070A] transition-opacity duration-500 ${isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      {/* Shot layers */}
      <Shot1Sleeper progress={displayProgress} isActive={activeShot === 'sleeper'} />
      <Shot2Waking progress={shotProgress} isActive={activeShot === 'waking'} />
      <Shot3POV progress={shotProgress} isActive={activeShot === 'pov'} />
      <Shot4IntoSite progress={shotProgress} isActive={activeShot === 'into-site'} onComplete={finishPreloader} />

      {/* Skip button */}
      {canSkip && !isExiting && (
        <button
          onClick={handleSkip}
          className="fixed bottom-8 right-8 z-[10000] px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white/70 text-xs font-mono hover:bg-white/20 hover:text-white transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          Skip →
        </button>
      )}
    </div>
  );
};

export const awakeningModule: PreloaderModule = {
  id: 'awakening',
  name: 'Awakening',
  durationMs: TOTAL_DURATION_MS,
  paletteTokens: ['--pre-sky', '--pre-leaf', '--pre-light'],
  component: AwakeningPreloader
};
