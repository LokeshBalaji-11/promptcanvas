import React, { useEffect, useState } from 'react';
import { Sparkles, Terminal, CheckCircle2 } from 'lucide-react';

interface AiCompileOverlayProps {
  onComplete: () => void;
  accentColor: string;
}

export const AiCompileOverlay: React.FC<AiCompileOverlayProps> = ({ onComplete, accentColor }) => {
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  const steps = [
    'PARSING USER INTENT & SEMANTIC VECTORS...',
    'EXTRACTING 12-COLOR HARMONIC PALETTE...',
    'PAIRING GOOGLE FONTS (DISPLAY + MONO)...',
    'COMPOSING SPATIAL BENTO GRID LAYOUT...',
    '0 ERRORS ✓ // BUILD COMPLETE'
  ];

  useEffect(() => {
    let current = 0;
    const progressInterval = setInterval(() => {
      current += 2;
      if (current > 100) current = 100;
      setProgress(current);
      
      const idx = Math.min(steps.length - 1, Math.floor((current / 100) * steps.length));
      setStepIndex(idx);

      if (current === 100) {
        clearInterval(progressInterval);
        setTimeout(onComplete, 350);
      }
    }, 24);

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-[#07070A]/95 backdrop-blur-2xl flex flex-col items-center justify-center p-8 font-mono select-none animate-fadeIn">
      <div className="max-w-xl w-full bg-[#0a0b10] border border-white/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] opacity-20 pointer-events-none" style={{ backgroundColor: accentColor }} />

        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2 text-xs text-white uppercase tracking-widest font-bold">
            <Terminal className="w-4 h-4" style={{ color: accentColor }} />
            <span>AI COMPILATION KERNEL v2.5</span>
          </div>
          <span className="text-xs font-mono font-bold" style={{ color: accentColor }}>{progress}%</span>
        </div>

        <div className="space-y-3 mb-8">
          {steps.map((st, i) => (
            <div 
              key={i} 
              className={`text-xs flex items-center gap-3 transition-all duration-300 ${
                i < stepIndex ? 'text-white/80' : i === stepIndex ? 'text-white font-bold scale-[1.02]' : 'text-slate-600'
              }`}
            >
              {i < stepIndex ? (
                <CheckCircle2 className="w-4 h-4 text-[#3DFFA2]" />
              ) : i === stepIndex ? (
                <Sparkles className="w-4 h-4 animate-spin" style={{ color: accentColor }} />
              ) : (
                <span className="w-4 h-4 inline-block text-center text-slate-700">·</span>
              )}
              <span>{st}</span>
            </div>
          ))}
        </div>

        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden p-[1px] border border-white/10">
          <div 
            className="h-full transition-all duration-75 rounded-full shadow-lg"
            style={{ width: `${progress}%`, backgroundColor: accentColor, boxShadow: `0 0 15px ${accentColor}` }}
          />
        </div>
      </div>
    </div>
  );
};
