import React, { useRef, useEffect, useState } from 'react';

interface Shot2Props {
  isActive: boolean;
  progress: number; // 0 to 1 within this shot
}

export const Shot2Waking: React.FC<Shot2Props> = ({ isActive, progress }) => {
  const [eyeOpen, setEyeOpen] = useState(0); // 0 = closed, 1 = fully open

  useEffect(() => {
    if (!isActive) return;
    // Twitch at 30%, then smooth open from 40-100%
    const interval = setInterval(() => {
      setEyeOpen(prev => {
        if (progress < 0.3) return 0;
        if (progress < 0.4) return Math.sin(Date.now() / 100) * 0.15; // twitch
        return Math.min(1, (progress - 0.4) / 0.6);
      });
    }, 32);
    return () => clearInterval(interval);
  }, [isActive, progress]);

  if (!isActive) return null;

  const lidOpen = eyeOpen * 45; // max degrees of opening
  const pupilSize = 12 - eyeOpen * 5; // pupil contracts with light
  const irisColor = `hsl(${160 + eyeOpen * 40}, 60%, ${30 + eyeOpen * 20}%)`;
  const scaleVal = 1 + progress * 0.6;
  const blurVal = Math.max(0, (1 - progress) * 4);

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden" style={{
      background: 'radial-gradient(ellipse at center, #2a1a0a 0%, #0a0505 80%)'
    }}>
      {/* Camera push in via scale */}
      <div className="relative" style={{
        transform: `scale(${scaleVal})`,
        filter: `blur(${blurVal}px)`,
        transition: 'transform 0.2s ease-out, filter 0.2s ease-out'
      }}>
        <svg viewBox="0 0 400 250" className="w-[80vw] max-w-[600px]">
          {/* Skin around eye */}
          <ellipse cx="200" cy="125" rx="190" ry="120" fill="#d4a574" />
          <ellipse cx="200" cy="125" rx="180" ry="110" fill="#c99a68" />

          {/* Eye white (sclera) */}
          <ellipse cx="200" cy="125" rx="90" ry="50" fill="#f0ede8" />

          {/* Iris */}
          <circle cx="200" cy="125" r="34" fill={irisColor} />
          <circle cx="200" cy="125" r="34" fill="url(#irisGradient)" opacity="0.6" />

          {/* Pupil */}
          <circle cx="200" cy="125" r={pupilSize} fill="#0a0a0a" />

          {/* Specular highlights */}
          <circle cx="210" cy="115" r="6" fill="white" opacity={0.7 * eyeOpen} />
          <circle cx="195" cy="120" r="3" fill="white" opacity={0.4 * eyeOpen} />

          {/* Upper eyelid */}
          <path
            d={`M 100 125 Q 200 ${125 - lidOpen * 2} 300 125 Q 200 ${60 - lidOpen} 100 125`}
            fill="#c99a68"
            stroke="#a07850"
            strokeWidth="1"
          />
          {/* Eyelashes on upper lid */}
          {[...Array(8)].map((_, i) => {
            const x = 130 + i * 20;
            const baseY = 125 - lidOpen * 1.5 + Math.sin(i * 0.8) * 5;
            return (
              <line key={i} x1={x} y1={baseY} x2={x + (i % 2 ? 3 : -3)} y2={baseY - 12 - (i % 3) * 4}
                stroke="#2a1810" strokeWidth="1.5" opacity={0.7}
                strokeLinecap="round"
              />
            );
          })}

          {/* Lower eyelid */}
          <path
            d={`M 100 125 Q 200 ${125 + lidOpen * 1.2} 300 125 Q 200 ${180 + lidOpen * 0.5} 100 125`}
            fill="#c99a68"
            stroke="#a07850"
            strokeWidth="0.5"
          />

          <defs>
            <radialGradient id="irisGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#a0d4a0" stopOpacity="0.3" />
              <stop offset="60%" stopColor="#4a8a4a" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#1a3a1a" stopOpacity="0.6" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Heartbeat vignette pulse */}
      <div className="absolute inset-0 pointer-events-none" style={{
        boxShadow: `inset 0 0 ${120 + Math.sin(Date.now() / 400) * 30}px rgba(0,0,0,0.7)`,
        transition: 'box-shadow 0.15s'
      }} />
    </div>
  );
};
