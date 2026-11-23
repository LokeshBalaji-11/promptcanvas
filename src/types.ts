export interface ColorSwatch {
  hex: string;
  name: string;
  role: 'Primary' | 'Secondary' | 'Accent' | 'Background' | 'Surface';
  contrast: string;
}

export interface FontPairing {
  display: string;
  body: string;
  mono: string;
  googleFontsUrl: string;
}

export interface StoryboardCardData {
  id: string;
  title: string;
  category: 'Atmosphere' | 'Material & Texture' | 'UI Component' | 'Typography' | 'Lighting & Camera';
  prompt: string;
  description: string;
  gradient: string;
  aspectRatio: string; // 'square' | 'wide' | 'tall'
}

export interface MoodboardProject {
  id: string;
  title: string;
  prompt: string;
  styleModifier: string;
  accentColor: string;
  createdAt: number;
  updatedAt: number;
  palette: ColorSwatch[];
  fonts: FontPairing;
  cards: StoryboardCardData[];
  vibes: string[];
  lighting: string;
  camera: string;
}

export type ViewMode = 'spatial' | 'grid' | 'present';
