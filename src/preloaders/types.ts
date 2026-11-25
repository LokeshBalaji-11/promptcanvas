import React from 'react';

export interface PreloaderModule {
  id: 'chroma-bloom' | 'ink-type' | 'pixel-assemble';
  name: string;
  durationMs: number;
  tokens: string[];
  component: React.ComponentType<PreloaderProps>;
}

export interface PreloaderProps {
  onComplete: () => void;
  loadProgress: number; // 0 to 100
  accentColor?: string;
}
