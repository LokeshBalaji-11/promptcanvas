export interface StyleParam {
  id: string;
  name: string;
  type: 'slider' | 'color' | 'toggle' | 'select';
  defaultValue: number | string | boolean;
  min?: number;
  max?: number;
  step?: number;
  options?: string[];
  unit?: string;
}

export interface RealStyleItem {
  id: string;
  name: string;
  group: 'Glass' | 'Neumorphism' | 'Brutalist' | 'Gradients' | 'Glow' | 'Shadow' | 'Bento' | 'Blueprint' | 'Retro' | 'Editorial';
  tags: string[];
  icon: string;
  supports: {
    chrome: boolean;
    firefox: boolean;
    safari: boolean;
  };
  css: string;
  params: StyleParam[];
  fallbackCss: string;
  js?: string;
  htmlSample: string;
  reactCode: string;
  tailwindCode: string;
  popular?: boolean;
  newest?: boolean;
}
