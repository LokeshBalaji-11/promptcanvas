export type MotionCategory = 'scroll' | 'hover' | 'text' | 'transition' | 'loader' | 'background';

export interface MotionItem {
  id: string;
  name: string;
  category: MotionCategory;
  description: string;
  defaultSpeed: number; // 0.5 to 3.0
  defaultIntensity: number; // 1 to 10
  cssSnippet: string;
  reactSnippet: string;
  gsapSnippet: string;
  starred?: boolean;
}

export type CssStyleCategory = 'glass' | 'neumorphism' | 'brutalist' | 'gradient' | 'glow' | 'shadow' | 'bento' | 'blueprint' | 'retro' | 'editorial';

export interface CssStyleItem {
  id: string;
  name: string;
  category: CssStyleCategory;
  description: string;
  cssCode: string;
  reactCode: string;
  starred?: boolean;
}

export interface CustomStyle {
  id: string;
  name: string;
  tags: string[];
  radius: number;
  borderWidth: number;
  borderStyle: string;
  borderColor: string;
  shadowBlur: number;
  shadowColor: string;
  glassBlur: number;
  glassOpacity: number;
  gradientAngle: number;
  gradientStart: string;
  gradientEnd: string;
  glowColor: string;
  easing: string; // e.g. cubic-bezier(0.4, 0, 0.2, 1)
  duration: number; // seconds
  delay: number; // seconds
  stagger: number; // seconds
  hoverScale: number; // 1.0 to 1.2
  cssCode: string;
  thumbnailColor: string;
  updatedAt: string;
}

export interface ActiveEffect {
  instanceId: string;
  itemId: string;
  name: string;
  type: 'motion' | 'style' | 'custom';
  speed: number;
  intensity: number;
  enabled: boolean;
}
