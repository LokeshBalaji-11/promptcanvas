import React, { useEffect } from 'react';
import { Sparkles, Check, Loader2, ShieldCheck } from 'lucide-react';
import { GenPhase, GenStep } from '../engine/studioEngine';

interface StudioGenerationOverlayProps {
  phase: GenPhase;
  progress: number;
  steps: GenStep[];
  promptQuery: string;
  accentColor: string;
  onRetry?: () => void;
}

export const StudioGenerationOverlay: React.FC<StudioGenerationOverlayProps> = ({
  phase,
  progress,
  steps,
  promptQuery,
  accentColor,
  onRetry
}) => {
  if (phase === 'idle' || phase === 'done') return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#07070A]/90 backdrop-blur-2xl flex flex-col items-center justify-center p-6 animate-fadeIn">
      <div className="max-w-xl w-full bg-[#101015] border border-white/10 rounded-3xl p-8 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Travelling Gradient Border Animation */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              {phase === 'error' ? <span className="text-red-400 font-bold">!</span> : <Loader2 className="w-5 h-5 animate-spin" />}
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                {phase === 'submit' && 'Initializing Sequence...'}
                {phase === 'thinking' && 'AI Cognitive Synthesis'}
                {phase === 'building' && 'Re-theming Viewport & Swatches'}
                {phase === 'revealing' && 'Assembling Layout & Micro-Interactions'}
                {phase === 'error' && 'Synthesis Notice'}
              </h3>
              <p className="text-xs text-zinc-400 font-mono truncate max-w-xs">
                "{promptQuery}"
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-cyan-400">{progress}%</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-300 rounded-full"
            style={{ width: `${progress}%`, backgroundColor: accentColor }}
          />
        </div>

        {/* Streaming Steps Terminal Strip */}
        <div className="bg-[#07070a] border border-white/5 rounded-2xl p-4 space-y-2.5 font-mono text-xs">
          {steps.map(step => (
            <div key={step.id} className="flex items-center justify-between text-zinc-300">
              <div className="flex items-center gap-2.5">
                {step.status === 'completed' ? (
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : step.status === 'running' ? (
                  <Loader2 className="w-4 h-4 text-cyan-400 animate-spin shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-zinc-700 shrink-0" />
                )}
                <span className={step.status === 'completed' ? 'text-white' : step.status === 'running' ? 'text-cyan-400 font-semibold' : 'text-zinc-500'}>
                  {step.label}
                </span>
              </div>
              <span className="text-[10px] text-zinc-600 uppercase">
                {step.status}
              </span>
            </div>
          ))}
        </div>

        {phase === 'error' && (
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-red-400">Unable to reach remote AI cluster. Falling back to local engine.</span>
            <button
              onClick={onRetry}
              className="px-4 py-2 rounded-xl bg-cyan-500 text-black text-xs font-bold hover:bg-cyan-400 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] font-mono text-zinc-500">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> WCAG AA Compliant
          </span>
          <span>PromptCanvas Core Engine v2.8</span>
        </div>
      </div>
    </div>
  );
};
