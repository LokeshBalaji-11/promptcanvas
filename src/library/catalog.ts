import { RealStyleItem } from './types';

export const REAL_STYLES_CATALOG: RealStyleItem[] = [
  {
    id: 'liquid-glass',
    name: 'Liquid Glassmorphism',
    group: 'Glass',
    tags: ['glass', 'blur', 'translucent', 'frosted'],
    icon: 'Planet',
    supports: { chrome: true, firefox: true, safari: true },
    css: `[data-style="liquid-glass"] {
  background: rgba(255, 255, 255, var(--glass-opacity, 0.05));
  backdrop-filter: blur(var(--glass-blur, 16px));
  -webkit-backdrop-filter: blur(var(--glass-blur, 16px));
  border: 1px solid rgba(255, 255, 255, var(--glass-border, 0.12));
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  border-radius: var(--glass-radius, 20px);
}`,
    params: [
      { id: 'glass-blur', name: 'Backdrop Blur', type: 'slider', defaultValue: 16, min: 4, max: 40, step: 1, unit: 'px' },
      { id: 'glass-opacity', name: 'Opacity', type: 'slider', defaultValue: 0.05, min: 0.01, max: 0.2, step: 0.01 },
      { id: 'glass-radius', name: 'Border Radius', type: 'slider', defaultValue: 20, min: 0, max: 40, step: 2, unit: 'px' }
    ],
    fallbackCss: `[data-style="liquid-glass"] { background: rgba(20, 20, 30, 0.9); border: 1px solid rgba(255, 255, 255, 0.2); }`,
    htmlSample: `<div data-style="liquid-glass" class="p-8"><h3>Liquid Glass</h3><p>Frosted translucent surface</p></div>`,
    reactCode: `<div style={{ backdropFilter: 'blur(16px)', background: 'rgba(255,255,255,0.05)' }} className="p-8 border border-white/10 rounded-2xl">Glass Card</div>`,
    tailwindCode: `<div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8">Glass Card</div>`,
    popular: true
  },
  {
    id: 'cyber-glow',
    name: 'Cyberpunk Neon Glow',
    group: 'Glow',
    tags: ['neon', 'glow', 'cyberpunk', 'shadow'],
    icon: 'Comet',
    supports: { chrome: true, firefox: true, safari: true },
    css: `[data-style="cyber-glow"] {
  background: #0d0d14;
  border: 1px solid var(--glow-color, #22D3EE);
  box-shadow: 0 0 var(--glow-spread, 25px) var(--glow-color, #22D3EE), inset 0 0 15px rgba(34,211,238,0.15);
  border-radius: 16px;
}`,
    params: [
      { id: 'glow-color', name: 'Neon Color', type: 'color', defaultValue: '#22D3EE' },
      { id: 'glow-spread', name: 'Glow Spread', type: 'slider', defaultValue: 25, min: 5, max: 60, step: 1, unit: 'px' }
    ],
    fallbackCss: `[data-style="cyber-glow"] { border: 2px solid #22D3EE; background: #0d0d14; }`,
    htmlSample: `<div data-style="cyber-glow" class="p-8"><h3>Neon Glow</h3><p>Cyberpunk illumination</p></div>`,
    reactCode: `<div style={{ boxShadow: '0 0 25px #22D3EE' }} className="p-8 bg-[#0d0d14] border border-[#22D3EE] rounded-2xl">Neon Card</div>`,
    tailwindCode: `<div className="bg-[#0d0d14] border border-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.4)] rounded-2xl p-8">Neon Card</div>`,
    popular: true
  },
  {
    id: 'neo-brutalist',
    name: 'Neo-Brutalist Raw',
    group: 'Brutalist',
    tags: ['brutalist', 'bold', 'offset', 'shadow'],
    icon: 'Rocket',
    supports: { chrome: true, firefox: true, safari: true },
    css: `[data-style="neo-brutalist"] {
  background: var(--brut-bg, #CCFF00);
  color: #000;
  border: var(--brut-border, 3px) solid #000;
  box-shadow: 6px 6px 0px #000;
  font-weight: 800;
  border-radius: 12px;
}`,
    params: [
      { id: 'brut-bg', name: 'Accent Background', type: 'color', defaultValue: '#CCFF00' },
      { id: 'brut-border', name: 'Border Width', type: 'slider', defaultValue: 3, min: 1, max: 6, step: 1, unit: 'px' }
    ],
    fallbackCss: `[data-style="neo-brutalist"] { background: #CCFF00; color: #000; border: 3px solid #000; }`,
    htmlSample: `<div data-style="neo-brutalist" class="p-8"><h3>Brutalist</h3><p>Raw stark geometry</p></div>`,
    reactCode: `<div className="bg-[#CCFF00] text-black border-[3px] border-black shadow-[6px_6px_0px_0px_#000] rounded-xl p-8 font-black">Brutalist</div>`,
    tailwindCode: `<div className="bg-[#CCFF00] text-black border-4 border-black shadow-[6px_6px_0px_0px_#000000] rounded-xl p-8 font-extrabold">Brutalist</div>`,
    newest: true
  },
  {
    id: 'soft-neumorph',
    name: 'Soft Neumorphism',
    group: 'Neumorphism',
    tags: ['neumorphism', 'soft', 'extruded', 'shadow'],
    icon: 'Moon',
    supports: { chrome: true, firefox: true, safari: true },
    css: `[data-style="soft-neumorph"] {
  background: #0f0f14;
  box-shadow: 8px 8px 16px #07070a, -8px -8px 16px #17171e;
  border-radius: 20px;
}`,
    params: [
      { id: 'neu-distance', name: 'Shadow Distance', type: 'slider', defaultValue: 8, min: 2, max: 20, step: 1, unit: 'px' }
    ],
    fallbackCss: `[data-style="soft-neumorph"] { background: #0f0f14; border: 1px solid #222; }`,
    htmlSample: `<div data-style="soft-neumorph" class="p-8"><h3>Neumorph</h3><p>Extruded surface geometry</p></div>`,
    reactCode: `<div className="bg-[#0f0f14] shadow-[8px_8px_16px_#07070a,-8px_-8px_16px_#17171e] rounded-2xl p-8">Neumorph</div>`,
    tailwindCode: `<div className="bg-[#0f0f14] shadow-[8px_8px_16px_#07070a,-8px_-8px_16px_#17171e] rounded-2xl p-8">Neumorph</div>`
  },
  {
    id: 'gradient-border',
    name: 'Luminous Gradient Border',
    group: 'Gradients',
    tags: ['gradient', 'border', 'glow', 'luminous'],
    icon: 'Galaxy',
    supports: { chrome: true, firefox: true, safari: true },
    css: `[data-style="gradient-border"] {
  background: linear-gradient(135deg, #12121a 0%, #08080c 100%);
  border: 1px solid transparent;
  border-image: linear-gradient(to right, #22D3EE, #3DFFA2) 1;
  border-radius: 16px;
}`,
    params: [
      { id: 'grad-angle', name: 'Gradient Angle', type: 'slider', defaultValue: 135, min: 0, max: 360, step: 15, unit: 'deg' }
    ],
    fallbackCss: `[data-style="gradient-border"] { border: 2px solid #22D3EE; background: #0c0c10; }`,
    htmlSample: `<div data-style="gradient-border" class="p-8"><h3>Gradient Border</h3><p>Multi-color stroke wrap</p></div>`,
    reactCode: `<div style={{ borderImage: 'linear-gradient(to right, #22D3EE, #3DFFA2) 1' }} className="p-8 bg-[#0c0c10] rounded-2xl">Gradient Border</div>`,
    tailwindCode: `<div className="bg-[#0c0c10] border border-cyan-400/60 rounded-2xl p-8">Gradient Border</div>`,
    popular: true
  },
  {
    id: 'tech-blueprint',
    name: 'Technical Blueprint',
    group: 'Blueprint',
    tags: ['blueprint', 'grid', 'dashed', 'mono'],
    icon: 'Satellite',
    supports: { chrome: true, firefox: true, safari: true },
    css: `[data-style="tech-blueprint"] {
  background: #090d16;
  background-image: linear-gradient(rgba(34,211,238,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.07) 1px, transparent 1px);
  background-size: 20px 20px;
  border: 1px dashed rgba(34,211,238,0.35);
  border-radius: 12px;
}`,
    params: [
      { id: 'grid-size', name: 'Grid Size', type: 'slider', defaultValue: 20, min: 10, max: 40, step: 5, unit: 'px' }
    ],
    fallbackCss: `[data-style="tech-blueprint"] { background: #090d16; border: 1px dashed #22D3EE; }`,
    htmlSample: `<div data-style="tech-blueprint" class="p-8 font-mono"><h3>Blueprint</h3><p>Engineering grid</p></div>`,
    reactCode: `<div className="bg-[#090d16] border border-dashed border-cyan-500/40 rounded-xl p-8 font-mono">Blueprint</div>`,
    tailwindCode: `<div className="bg-[#090d16] border border-dashed border-cyan-500/40 rounded-xl p-8 font-mono">Blueprint</div>`,
    newest: true
  }
];
