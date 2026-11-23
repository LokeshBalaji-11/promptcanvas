import { MoodboardProject, ColorSwatch, FontPairing, StoryboardCardData } from '../types';

export const PRESET_BOARDS: MoodboardProject[] = [
  {
    id: 'preset-cyberpunk-tokyo',
    title: 'CYBERPUNK TOKYO',
    prompt: 'A neon-lit ramen bar in rainy cyberpunk Tokyo at midnight with glowing steam and reflections',
    styleModifier: 'Cinematic',
    accentColor: '#38bdf8',
    createdAt: Date.now() - 3600000 * 24,
    updatedAt: Date.now() - 3600000 * 12,
    palette: [
      { hex: '#07080A', name: 'Void Black', role: 'Background', contrast: '16.5:1' },
      { hex: '#111318', name: 'Dark Slate', role: 'Surface', contrast: '14.2:1' },
      { hex: '#38bdf8', name: 'Electric Cyan', role: 'Primary', contrast: '7.8:1' },
      { hex: '#f43f5e', name: 'Neon Rose', role: 'Accent', contrast: '4.5:1' },
      { hex: '#10b981', name: 'Terminal Green', role: 'Secondary', contrast: '8.1:1' }
    ],
    fonts: {
      display: 'Syne',
      body: 'Plus Jakarta Sans',
      mono: 'JetBrains Mono',
      googleFontsUrl: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap'
    },
    vibes: ['Neon Noir', 'Rain-slicked asphalt', 'High-tech low-life', 'Steam & Broth', 'Cybernetic Glow'],
    lighting: 'Harsh neon highlights, deep obsidian shadows, wet surface reflections',
    camera: 'Anamorphic 35mm lens, f/1.8 aperture, cinematic teal and magenta color grading',
    cards: [
      {
        id: 'card-1',
        title: 'Atmospheric Neon Alleyway',
        category: 'Atmosphere',
        prompt: 'Cinematic wide shot of narrow Tokyo alleyway in heavy rain, glowing neon kanji signs reflecting in puddles, volumetric steam rising from underground vents, 8k resolution, photorealistic',
        description: 'Immersive rainy night ambience establishing the core cyberpunk color temperature and mood.',
        gradient: 'from-sky-500/30 via-indigo-950/80 to-slate-950',
        aspectRatio: 'wide'
      },
      {
        id: 'card-2',
        title: 'Tactile Brushed Titanium & Glass',
        category: 'Material & Texture',
        prompt: 'Macro shot of dark brushed titanium surface with subtle condensation droplets and vibrant cyan LED strip edge lighting',
        description: 'Tactile surface finish conveying high-end industrial design and durability.',
        gradient: 'from-slate-800 via-sky-950/60 to-slate-950',
        aspectRatio: 'square'
      },
      {
        id: 'card-3',
        title: 'Interactive HUD Component',
        category: 'UI Component',
        prompt: 'Futuristic glassmorphism dashboard widget with live telemetry readouts, glowing borders and micro-interactions',
        description: 'High-density spatial UI component tailored for data-rich cyberpunk applications.',
        gradient: 'from-rose-500/25 via-sky-900/40 to-slate-950',
        aspectRatio: 'tall'
      },
      {
        id: 'card-4',
        title: 'Kinetic Typography & Mono Grid',
        category: 'Typography',
        prompt: 'Bold editorial typography layout pairing Syne display font with JetBrains Mono code metadata',
        description: 'High-contrast typography system built for instant legibility in low-light environments.',
        gradient: 'from-emerald-500/20 via-slate-900 to-slate-950',
        aspectRatio: 'square'
      }
    ]
  },
  {
    id: 'preset-swiss-brutalist',
    title: 'SWISS BRUTALIST',
    prompt: 'Monolithic concrete architecture editorial layout with sharp typography and vivid orange accents',
    styleModifier: 'Editorial',
    accentColor: '#f97316',
    createdAt: Date.now() - 3600000 * 48,
    updatedAt: Date.now() - 3600000 * 24,
    palette: [
      { hex: '#0f0f11', name: 'Carbon Black', role: 'Background', contrast: '17.0:1' },
      { hex: '#1c1c21', name: 'Raw Concrete', role: 'Surface', contrast: '12.5:1' },
      { hex: '#f97316', name: 'International Orange', role: 'Primary', contrast: '5.2:1' },
      { hex: '#e2e8f0', name: 'Off White', role: 'Secondary', contrast: '14.0:1' },
      { hex: '#71717a', name: 'Zinc Gray', role: 'Accent', contrast: '6.0:1' }
    ],
    fonts: {
      display: 'Space Grotesk',
      body: 'Inter',
      mono: 'JetBrains Mono',
      googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@500;700&display=swap'
    },
    vibes: ['Grid alignment', 'Raw brutalism', 'High typography contrast', 'Monochrome precision', 'Vibrant anchor'],
    lighting: 'Direct midday sunlight casting harsh geometric shadows against raw concrete',
    camera: 'Large format 4x5 architectural camera, strict frontal perspectives, sharp focus',
    cards: [
      {
        id: 'card-swiss-1',
        title: 'Monolithic Concrete Structure',
        category: 'Atmosphere',
        prompt: 'Brutalist concrete architecture facade with sharp geometric shadows under harsh sunlight, editorial composition',
        description: 'Imposing structural form providing a bold graphic backdrop for editorial content.',
        gradient: 'from-orange-500/30 via-zinc-900 to-black',
        aspectRatio: 'tall'
      },
      {
        id: 'card-swiss-2',
        title: 'Rigid Asymmetric Grid',
        category: 'UI Component',
        prompt: 'Swiss style editorial layout grid with sharp borders, bold typographic hierarchy and negative space',
        description: 'Mathematical grid system ensuring absolute visual discipline across all viewports.',
        gradient: 'from-zinc-800 via-zinc-900 to-black',
        aspectRatio: 'square'
      },
      {
        id: 'card-swiss-3',
        title: 'Raw Typography Scale',
        category: 'Typography',
        prompt: 'Extreme scale contrast between Space Grotesk headline and clean Inter body copy',
        description: 'Deliberate typographic tension maximizing readability and modern aesthetic impact.',
        gradient: 'from-orange-600/20 via-zinc-950 to-black',
        aspectRatio: 'wide'
      }
    ]
  },
  {
    id: 'preset-solarpunk',
    title: 'SOLARIS STUDIO',
    prompt: 'Lush biophilic architecture integrated with vertical gardens, warm sunlight and organic materials',
    styleModifier: 'Minimal',
    accentColor: '#10b981',
    createdAt: Date.now() - 3600000 * 72,
    updatedAt: Date.now() - 3600000 * 36,
    palette: [
      { hex: '#06100c', name: 'Forest Shadow', role: 'Background', contrast: '16.0:1' },
      { hex: '#0f1f18', name: 'Moss Surface', role: 'Surface', contrast: '13.1:1' },
      { hex: '#10b981', name: 'Emerald Leaf', role: 'Primary', contrast: '6.5:1' },
      { hex: '#fbbf24', name: 'Solar Gold', role: 'Accent', contrast: '8.9:1' },
      { hex: '#e2e8f0', name: 'Clean Paper', role: 'Secondary', contrast: '15.2:1' }
    ],
    fonts: {
      display: 'Cinzel',
      body: 'Plus Jakarta Sans',
      mono: 'JetBrains Mono',
      googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap'
    },
    vibes: ['Biophilic design', 'Renewable energy', 'Organic curves', 'Golden hour sunlight', 'Living architecture'],
    lighting: 'Warm golden hour sunlight filtering through dense canopy foliage',
    camera: 'Natural 50mm lens, soft bokeh, organic handheld perspective',
    cards: [
      {
        id: 'card-solarpunk-1',
        title: 'Biophilic Glass Pavilion',
        category: 'Atmosphere',
        prompt: 'Sunlit greenhouse botanical pavilion with cascading ivy, solar glass panels and sustainable wooden framing',
        description: 'Harmonious integration of cutting-edge green technology with natural ecosystems.',
        gradient: 'from-emerald-500/30 via-emerald-950/60 to-zinc-950',
        aspectRatio: 'wide'
      },
      {
        id: 'card-solarpunk-2',
        title: 'Organic UI Card & Glass',
        category: 'UI Component',
        prompt: 'Soft frosted glass card with leaf green gradient glow and smooth rounded corners',
        description: 'Calming user interface elements designed to reduce cognitive load and promote focus.',
        gradient: 'from-amber-500/20 via-emerald-950/40 to-zinc-950',
        aspectRatio: 'square'
      }
    ]
  }
];

export function generateMoodboard(prompt: string, styleModifier: string = 'Cinematic'): MoodboardProject {
  const raw = prompt.trim() || 'Futuristic AI research laboratory with holographic displays and warm ambient lighting';
  
  // Clean prompt by stripping conversational filler
  const cleanedPrompt = raw
    .replace(/^(can you (please )?)(create|make|build|design) (a |an )?/i, '')
    .replace(/^(please )?(create|make|build|design) (a |an )?/i, '')
    .replace(/^(i want a |i need a )/i, '')
    .trim();

  // Derive professional brand name and headline
  let brandName = 'ATELIER NOIR';
  let displayTitle = cleanedPrompt.slice(0, 32).toUpperCase();
  let subheadline = `High-performance digital experience engineered for ${cleanedPrompt.toLowerCase()}.`;

  const lower = cleanedPrompt.toLowerCase();
  
  let primaryColor = '#38bdf8';
  let accentColor = '#f43f5e';
  let bgHex = '#07080A';
  let surfaceHex = '#111318';
  let displayFont = 'Syne';
  let bodyFont = 'Plus Jakarta Sans';
  let googleFontsUrl = 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap';
  let vibesList = ['Spatial design', 'Generative depth', 'Immersive UI', 'Kinetic flow', 'Clean precision'];

  if (lower.includes('coffee') || lower.includes('cafe') || lower.includes('espresso') || lower.includes('cyberpunk coffee')) {
    brandName = 'NEON BREW CO.';
    displayTitle = 'CYBERNETIC ESPRESSO';
    subheadline = 'Artisanal roast meets neon-drenched kinetic cyberpunk architecture.';
    primaryColor = '#f59e0b';
    accentColor = '#38bdf8';
    displayFont = 'Space Grotesk';
  } else if (lower.includes('luxury') || lower.includes('fashion') || lower.includes('editorial') || lower.includes('gold')) {
    brandName = 'MAISON VANGUARD';
    displayTitle = 'TIMELESS ELEGANCE';
    subheadline = 'An uncompromising exploration of minimalist high-fashion aesthetics.';
    primaryColor = '#d97706';
    accentColor = '#f3f4f6';
    displayFont = 'Playfair Display';
    bodyFont = 'Inter';
    googleFontsUrl = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400&family=Playfair+Display:ital,wght@0,600;0,700;1,400&display=swap';
  } else if (lower.includes('nature') || lower.includes('eco') || lower.includes('solarpunk') || lower.includes('botanical')) {
    brandName = 'SOLARIS BOTANICA';
    displayTitle = 'LIVING ARCHITECTURE';
    subheadline = 'Biophilic digital environments powered by renewable solar design.';
    primaryColor = '#10b981';
    accentColor = '#fbbf24';
    displayFont = 'Cinzel';
    googleFontsUrl = 'https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap';
  } else if (lower.includes('saas') || lower.includes('cloud') || lower.includes('ai') || lower.includes('tech') || lower.includes('normal website')) {
    brandName = 'KINETIC LABS';
    displayTitle = 'AUTONOMOUS INTERFACES';
    subheadline = 'Next-generation neural architecture built for elite engineering teams.';
    primaryColor = '#6366f1';
    accentColor = '#06b6d4';
    displayFont = 'Syne';
  }

  const newProject: MoodboardProject = {
    id: `proj-${Date.now()}`,
    title: brandName,
    prompt: subheadline,
    styleModifier: styleModifier,
    accentColor: primaryColor,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    palette: [
      { hex: bgHex, name: 'Obsidian Void', role: 'Background', contrast: '16.8:1' },
      { hex: surfaceHex, name: 'Graphite Surface', role: 'Surface', contrast: '13.5:1' },
      { hex: primaryColor, name: 'Primary Accent', role: 'Primary', contrast: '7.2:1' },
      { hex: accentColor, name: 'Secondary Glow', role: 'Accent', contrast: '5.1:1' },
      { hex: '#94a3b8', name: 'Muted Slate', role: 'Secondary', contrast: '9.4:1' }
    ],
    fonts: {
      display: displayFont,
      body: bodyFont,
      mono: 'JetBrains Mono',
      googleFontsUrl: googleFontsUrl
    },
    vibes: vibesList,
    lighting: 'Volumetric cinematic studio lighting with high contrast ray-tracing highlights',
    camera: 'Precision 35mm anamorphic prime lens with subtle chromatic aberration and depth of field',
    cards: [
      {
        id: `card-${Date.now()}-1`,
        title: `${displayTitle} Atmosphere`,
        category: 'Atmosphere',
        prompt: `High-end cinematic visualization of ${cleanedPrompt}, volumetric lighting, 8k resolution, photorealistic editorial finish`,
        description: `Core atmospheric anchor defining the tonal depth and spatial hierarchy for ${brandName}.`,
        gradient: 'from-indigo-500/30 via-slate-900 to-black',
        aspectRatio: 'wide'
      },
      {
        id: `card-${Date.now()}-2`,
        title: 'Modular Glass Surface',
        category: 'Material & Texture',
        prompt: 'Macro texture map of frosted architectural glass with diffuse backlighting and micro-bevel edges',
        description: 'Tactile realism providing tactile depth and physical grounding to digital surfaces.',
        gradient: 'from-slate-800 via-slate-900 to-black',
        aspectRatio: 'square'
      },
      {
        id: `card-${Date.now()}-3`,
        title: 'Kinetic Component Library',
        category: 'UI Component',
        prompt: 'Interactive spatial component system with reactive hover states and high-density typography',
        description: 'Modular design building blocks engineered for lightning-fast user interaction.',
        gradient: 'from-cyan-500/20 via-slate-900 to-black',
        aspectRatio: 'tall'
      },
      {
        id: `card-${Date.now()}-4`,
        title: 'Typography & Layout Grid',
        category: 'Typography',
        prompt: `Editorial type layout pairing ${displayFont} with ${bodyFont} and JetBrains Mono metadata`,
        description: 'Rigorous typographic scale ensuring crystal-clear readability across all form factors.',
        gradient: 'from-amber-500/20 via-slate-900 to-black',
        aspectRatio: 'square'
      }
    ]
  };

  return newProject;
}
