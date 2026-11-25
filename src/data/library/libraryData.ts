import { MotionItem, CssStyleItem } from '../../types/library';

export const MOTION_ITEMS: MotionItem[] = [
  // Scroll
  {
    id: 'scroll-fade-up',
    name: 'Scroll Fade Up & Scale',
    category: 'scroll',
    description: 'Smooth entry animation triggered as elements enter the viewport.',
    defaultSpeed: 1.0,
    defaultIntensity: 5,
    cssSnippet: '.motion-fade-up { opacity: 0; transform: translateY(30px) scale(0.98); transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); }\n.motion-fade-up.is-visible { opacity: 1; transform: translateY(0) scale(1); }',
    reactSnippet: 'import { motion } from "framer-motion";\n\nexport const FadeUp = ({ children }) => (\n  <motion.div\n    initial={{ opacity: 0, y: 30, scale: 0.98 }}\n    whileInView={{ opacity: 1, y: 0, scale: 1 }}\n    viewport={{ once: true }}\n    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}\n  >\n    {children}\n  </motion.div>\n);',
    gsapSnippet: 'gsap.from(".motion-fade-up", {\n  scrollTrigger: { trigger: ".motion-fade-up", start: "top 85%" },\n  opacity: 0, y: 30, scale: 0.98, duration: 0.8, ease: "power3.out"\n});'
  },
  {
    id: 'scroll-mask-reveal',
    name: 'Clip Path Mask Reveal',
    category: 'scroll',
    description: 'Reveals images and containers through an expanding clip-path polygon.',
    defaultSpeed: 1.2,
    defaultIntensity: 7,
    cssSnippet: '.motion-mask { clip-path: inset(10% 20% 10% 20%); transition: clip-path 1s cubic-bezier(0.77, 0, 0.175, 1); }\n.motion-mask.is-visible { clip-path: inset(0% 0% 0% 0%); }',
    reactSnippet: 'import { motion } from "framer-motion";\n\nexport const MaskReveal = ({ children }) => (\n  <motion.div\n    initial={{ clipPath: "inset(15% 15% 15% 15%)" }}\n    whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}\n    viewport={{ once: true }}\n    transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}\n  >\n    {children}\n  </motion.div>\n);',
    gsapSnippet: 'gsap.fromTo(".motion-mask", { clipPath: "inset(15% 15% 15% 15%)" }, {\n  scrollTrigger: { trigger: ".motion-mask", start: "top 80%" },\n  clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power4.inOut"\n});'
  },
  {
    id: 'scroll-parallax',
    name: 'Depth Parallax Shift',
    category: 'scroll',
    description: 'Elements move at differing speeds relative to scroll for immersive depth.',
    defaultSpeed: 1.0,
    defaultIntensity: 6,
    cssSnippet: '/* Requires JS parallax handler or CSS scroll-timeline */\n.motion-parallax { transform: translateY(calc(var(--scroll-y, 0) * 0.15px)); }',
    reactSnippet: 'import { motion, useScroll, useTransform } from "framer-motion";\n\nexport const ParallaxBox = () => {\n  const { scrollYProgress } = useScroll();\n  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);\n  return <motion.div style={{ y }}>Parallax Content</motion.div>;\n};',
    gsapSnippet: 'gsap.to(".motion-parallax", {\n  scrollTrigger: { trigger: ".motion-parallax", scrub: true },\n  y: -80,\n  ease: "none"\n});'
  },
  {
    id: 'scroll-pinned-scrub',
    name: 'Pinned Section Scrub',
    category: 'scroll',
    description: 'Pins the viewport while animating inner content across scroll progress.',
    defaultSpeed: 1.5,
    defaultIntensity: 8,
    cssSnippet: '.pinned-container { position: sticky; top: 0; height: 100vh; overflow: hidden; }',
    reactSnippet: 'import { motion } from "framer-motion";\n// Use sticky container with Framer Motion scroll binding',
    gsapSnippet: 'ScrollTrigger.create({\n  trigger: ".pinned-section",\n  pin: true,\n  start: "top top",\n  end: "+=2000",\n  scrub: 1\n});'
  },

  // Hover
  {
    id: 'hover-magnetic',
    name: 'Magnetic Pull Effect',
    category: 'hover',
    description: 'Elements subtly pull toward the cursor when hovered.',
    defaultSpeed: 0.8,
    defaultIntensity: 5,
    cssSnippet: '.magnetic-btn { transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1); }',
    reactSnippet: 'import { useState } from "react";\nimport { motion } from "framer-motion";\n\nexport const Magnetic = ({ children }) => {\n  const [pos, setPos] = useState({ x: 0, y: 0 });\n  const handleMouse = (e) => {\n    const rect = e.currentTarget.getBoundingClientRect();\n    setPos({ x: (e.clientX - (rect.left + rect.width / 2)) * 0.3, y: (e.clientY - (rect.top + rect.height / 2)) * 0.3 });\n  };\n  return (\n    <motion.div animate={{ x: pos.x, y: pos.y }} transition={{ type: "spring", stiffness: 150, damping: 15 }} onMouseMove={handleMouse} onMouseLeave={() => setPos({ x: 0, y: 0 })}>\n      {children}\n    </motion.div>\n  );\n};',
    gsapSnippet: '// Vanilla JS mouse tracking for magnetic offset'
  },
  {
    id: 'hover-tilt-3d',
    name: '3D Perspective Tilt',
    category: 'hover',
    description: 'Card tilts in 3D space following mouse coordinates with specular glare.',
    defaultSpeed: 1.0,
    defaultIntensity: 7,
    cssSnippet: '.card-3d { transform-style: preserve-3d; perspective: 1000px; transition: transform 0.2s ease-out; }',
    reactSnippet: 'export const TiltCard = ({ children }) => {\n  return <div className="card-3d hover:rotate-x-2 hover:rotate-y-3 transition-transform">{children}</div>;\n};',
    gsapSnippet: 'Vanilla mouse move calculations updating rotateX and rotateY'
  },
  {
    id: 'hover-spotlight',
    name: 'Border Spotlight Gradient',
    category: 'hover',
    description: 'Dynamic radial gradient spotlight tracking cursor position along card borders.',
    defaultSpeed: 1.0,
    defaultIntensity: 6,
    cssSnippet: '.spotlight-card { position: relative; overflow: hidden; }\n.spotlight-card::before { content: ""; position: absolute; background: radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(34,211,238,0.4), transparent 40%); opacity: 0; transition: opacity 0.5s; }',
    reactSnippet: '// Track mouse coordinates on container and pass as CSS custom properties',
    gsapSnippet: '// GSAP quickTo tracking mouse for border glow'
  },
  {
    id: 'hover-ripple',
    name: 'Click Ripple Effect',
    category: 'hover',
    description: 'Expands an animated ink ripple from the exact click coordinate.',
    defaultSpeed: 0.6,
    defaultIntensity: 4,
    cssSnippet: '@keyframes ripple { 0% { transform: scale(0); opacity: 0.8; } 100% { transform: scale(4); opacity: 0; } }\n.ripple-effect { animation: ripple 0.6s cubic-bezier(0, 0, 0.2, 1); }',
    reactSnippet: '// Append span with click coordinates and remove after animation',
    gsapSnippet: '// GSAP timeline expanding circle div'
  },

  // Text
  {
    id: 'text-split-line',
    name: 'Split Line Slide Up',
    category: 'text',
    description: 'Masks and slides lines of headline text upward sequentially.',
    defaultSpeed: 1.0,
    defaultIntensity: 6,
    cssSnippet: '.line-mask { overflow: hidden; }\n.line-inner { transform: translateY(100%); animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }\n@keyframes slideUp { to { transform: translateY(0); } }',
    reactSnippet: 'import { motion } from "framer-motion";\nexport const SplitText = ({ text }) => <motion.span initial={{ y: "100%" }} animate={{ y: 0 }}>{text}</motion.span>;',
    gsapSnippet: 'gsap.from(".char", { y: 100, stagger: 0.02, duration: 0.8, ease: "power4.out" });'
  },
  {
    id: 'text-scramble',
    name: 'Cybernetic Text Scramble',
    category: 'text',
    description: 'Decrypts random characters into clean readable copy on mount or hover.',
    defaultSpeed: 1.2,
    defaultIntensity: 8,
    cssSnippet: '.scramble-text { font-family: monospace; letter-spacing: 0.05em; }',
    reactSnippet: '// Custom hook running character mutation intervals',
    gsapSnippet: '// GSAP ticker random character generator'
  },
  {
    id: 'text-shimmer',
    name: 'Gradient Shimmer Sweep',
    category: 'text',
    description: 'Flows a luminous metallic highlight across headline typography.',
    defaultSpeed: 2.0,
    defaultIntensity: 5,
    cssSnippet: '@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }\n.text-shimmer { background: linear-gradient(90deg, #fff 0%, #22D3EE 50%, #fff 100%); background-size: 200% auto; color: transparent; -webkit-background-clip: text; animation: shimmer 3s linear infinite; }',
    reactSnippet: '<span className="text-shimmer">Future of Design Systems</span>',
    gsapSnippet: 'gsap.to(".text-shimmer", { backgroundPosition: "200% 0", duration: 3, repeat: -1, ease: "none" });'
  },

  // Transition
  {
    id: 'trans-curtain',
    name: 'Curtain Wipe Split',
    category: 'transition',
    description: 'Dual sliding dark panels part horizontally to reveal page content.',
    defaultSpeed: 1.0,
    defaultIntensity: 8,
    cssSnippet: '.curtain-left { transform: translateX(0); transition: transform 0.8s cubic-bezier(0.77, 0, 0.175, 1); }\n.curtain-left.open { transform: translateX(-100%); }',
    reactSnippet: 'import { motion } from "framer-motion";\nexport const Curtain = () => <motion.div animate={{ x: "-100%" }} transition={{ duration: 0.8 }} />;',
    gsapSnippet: 'gsap.to(".curtain", { xPercent: -100, duration: 0.8, ease: "power4.inOut" });'
  },
  {
    id: 'trans-clip-circle',
    name: 'Circular Iris Wipe',
    category: 'transition',
    description: 'Expands a circular clip-path from click origin during navigation.',
    defaultSpeed: 0.9,
    defaultIntensity: 7,
    cssSnippet: '.iris-wipe { clip-path: circle(0% at 50% 50%); transition: clip-path 0.9s cubic-bezier(0.65, 0, 0.35, 1); }\n.iris-wipe.active { clip-path: circle(150% at 50% 50%); }',
    reactSnippet: '// Framer motion layout animation with circular mask',
    gsapSnippet: 'gsap.to(".iris", { clipPath: "circle(150% at 50% 50%)", duration: 0.9 });'
  },

  // Loader
  {
    id: 'loader-rgb-counter',
    name: 'RGB Glitch Counter',
    category: 'loader',
    description: 'High-precision loading counter with chromatic aberration glitch lines.',
    defaultSpeed: 2.5,
    defaultIntensity: 9,
    cssSnippet: '.glitch-text { text-shadow: 2px 0 #FF3B5C, -2px 0 #22D3EE; animation: glitch 0.3s infinite; }',
    reactSnippet: '// setInterval percentage increment with chromatic shadow',
    gsapSnippet: '// GSAP ticker counter animation'
  },
  {
    id: 'loader-skeleton',
    name: 'Pulse Skeleton Shimmer',
    category: 'loader',
    description: 'Elegant shimmering gradient placeholder for asynchronous content blocks.',
    defaultSpeed: 1.5,
    defaultIntensity: 4,
    cssSnippet: '@keyframes pulseShimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }\n.skeleton { background: linear-gradient(90deg, #181820 25%, #282835 50%, #181820 75%); background-size: 200% 100%; animation: pulseShimmer 1.5s infinite; }',
    reactSnippet: '<div className="w-full h-32 rounded-xl skeleton" />',
    gsapSnippet: 'gsap.to(".skeleton", { backgroundPosition: "200% 0", duration: 1.5, repeat: -1, ease: "none" });'
  },

  // Background
  {
    id: 'bg-mesh',
    name: 'Animated Aurora Gradient Mesh',
    category: 'background',
    description: 'Organic swirling multi-color gradient blobs creating rich atmospheric depth.',
    defaultSpeed: 10.0,
    defaultIntensity: 7,
    cssSnippet: '@keyframes meshFloat { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(30px, -40px) scale(1.1); } }\n.mesh-blob { animation: meshFloat 12s ease-in-out infinite; filter: blur(80px); opacity: 0.4; }',
    reactSnippet: '<div className="absolute inset-0 overflow-hidden pointer-events-none"><div className="absolute w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl mesh-blob" /></div>',
    gsapSnippet: 'gsap.to(".mesh-blob", { x: "random(-100, 100)", y: "random(-100, 100)", duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut" });'
  },
  {
    id: 'bg-noise',
    name: 'Film Grain SVG Overlay',
    category: 'background',
    description: 'Subtle high-frequency noise texture adding tactile analogue richness.',
    defaultSpeed: 1.0,
    defaultIntensity: 3,
    cssSnippet: '.film-grain { background-image: url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.05\'/%3E%3C/svg%3E"); }',
    reactSnippet: '<div className="absolute inset-0 pointer-events-none film-grain opacity-50" />',
    gsapSnippet: '// Static overlay asset'
  }
];

export const CSS_STYLE_ITEMS: CssStyleItem[] = [
  {
    id: 'style-glass',
    name: 'Liquid Glassmorphism',
    category: 'glass',
    description: 'Frosted translucent glass surface with crisp inner highlight and backdrop blur.',
    cssCode: 'background: rgba(255, 255, 255, 0.04);\nbackdrop-filter: blur(16px);\n-webkit-backdrop-filter: blur(16px);\nborder: 1px solid rgba(255, 255, 255, 0.1);\nbox-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);',
    reactCode: '<div className="bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl rounded-2xl p-6">Glass Card</div>'
  },
  {
    id: 'style-neumorph',
    name: 'Soft Neumorphism',
    category: 'neumorphism',
    description: 'Extruded tactile surface geometry with dual light/dark directional shadows.',
    cssCode: 'background: #0f0f14;\nbox-shadow: 8px 8px 16px #07070a, -8px -8px 16px #17171e;\nborder-radius: 16px;',
    reactCode: '<div className="bg-[#0f0f14] shadow-[8px_8px_16px_#07070a,-8px_-8px_16px_#17171e] rounded-2xl p-6">Neumorph</div>'
  },
  {
    id: 'style-brutalist',
    name: 'Neo-Brutalist Raw',
    category: 'brutalist',
    description: 'High-contrast black borders, hard offset shadows, and vibrant acid accents.',
    cssCode: 'background: #CCFF00;\ncolor: #000;\nborder: 3px solid #000;\nbox-shadow: 6px 6px 0px #000;\nfont-weight: 800;',
    reactCode: '<div className="bg-[#CCFF00] text-black border-3 border-black shadow-[6px_6px_0px_0px_#000000] font-black rounded-xl p-6">Brutalist</div>'
  },
  {
    id: 'style-gradient-border',
    name: 'Luminous Gradient Border',
    category: 'gradient',
    description: 'Gradient stroke wrapped around a dark container with a subtle ambient glow.',
    cssCode: 'background: linear-gradient(180deg, #12121a 0%, #08080c 100%);\nposition: relative;\nborder-radius: 16px;\nbackground-clip: padding-box;\nborder: 1px solid transparent;',
    reactCode: '<div className="relative p-[1px] rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500"><div className="bg-[#0a0a0f] rounded-2xl p-6">Gradient Border</div></div>'
  },
  {
    id: 'style-glow-neon',
    name: 'Cyberpunk Neon Glow',
    category: 'glow',
    description: 'Intense chromatic drop shadow casting vibrant neon illumination onto backgrounds.',
    cssCode: 'background: #0d0d12;\nborder: 1px solid rgba(34, 211, 238, 0.4);\nbox-shadow: 0 0 25px rgba(34, 211, 238, 0.25), inset 0 0 15px rgba(34, 211, 238, 0.1);',
    reactCode: '<div className="bg-[#0d0d12] border border-cyan-400/40 shadow-[0_0_25px_rgba(34,211,238,0.25)] rounded-2xl p-6">Neon Glow</div>'
  },
  {
    id: 'style-shadow-elevation',
    name: 'Deep Soft Elevation',
    category: 'shadow',
    description: 'Multi-layered ambient shadowing providing natural depth hierarchy.',
    cssCode: 'background: #121218;\nbox-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 1px 1px rgba(255, 255, 255, 0.05);',
    reactCode: '<div className="bg-[#121218] shadow-2xl border border-white/5 rounded-2xl p-6">Elevation</div>'
  },
  {
    id: 'style-bento',
    name: 'Bento Grid Card',
    category: 'bento',
    description: 'Clean minimalist section container optimized for multi-item grid layouts.',
    cssCode: 'background: #111116;\nborder: 1px solid rgba(255, 255, 255, 0.08);\nborder-radius: 24px;\npadding: 2rem;\ndisplay: flex;\nflex-direction: column;\njustify-content: space-between;',
    reactCode: '<div className="bg-[#111116] border border-white/10 rounded-3xl p-8 flex flex-col justify-between">Bento Card</div>'
  },
  {
    id: 'style-blueprint',
    name: 'Technical Blueprint',
    category: 'blueprint',
    description: 'Engineering grid lines with precise monospaced coordinate markers and borders.',
    cssCode: 'background: #090d16;\nbackground-image: linear-gradient(rgba(34,211,238,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.07) 1px, transparent 1px);\nbackground-size: 20px 20px;\nborder: 1px dashed rgba(34,211,238,0.3);',
    reactCode: '<div className="bg-[#090d16] border border-dashed border-cyan-500/35 rounded-xl p-6 font-mono">Blueprint</div>'
  },
  {
    id: 'style-retro',
    name: 'Retro Terminal 80s',
    category: 'retro',
    description: 'CRT amber/green phosphors scanlines with high-contrast mono typography.',
    cssCode: 'background: #050505;\ncolor: #3DFFA2;\nfont-family: monospace;\nborder: 2px solid #3DFFA2;\nbox-shadow: inset 0 0 20px rgba(61,255,162,0.15);',
    reactCode: '<div className="bg-black text-[#3DFFA2] font-mono border-2 border-[#3DFFA2] p-6 rounded-lg">Retro Terminal</div>'
  },
  {
    id: 'style-editorial',
    name: 'High-Fashion Editorial',
    category: 'editorial',
    description: 'Serif typography emphasis with high-contrast stark borders and ample negative space.',
    cssCode: 'background: #0d0d0d;\ncolor: #f5f5f5;\nborder-bottom: 1px solid #333;\npadding: 2.5rem 1.5rem;\nfont-family: "Space Grotesk", sans-serif;',
    reactCode: '<div className="bg-[#0d0d0d] text-white border-b border-white/10 p-10 font-serif">Editorial</div>'
  }
];
