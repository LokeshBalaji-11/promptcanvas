# Reference Notes: hackathon.sdslabs.co

## 1. Preloader
- **Counter & Timing:** Displays percentage count (0-100%) or step indicator on load, transitioning smoothly over ~1.2s to 1.8s.
- **Exit Animation:** Scale-out / curtain reveal easing out with an upscale transform (`scale(1.05)` -> `opacity: 0`).

## 2. Scroll-Driven Effects & Motion Patterns
- **Pinned Sections:** Hero and interactive module sections utilize sticky positioning and scroll pinning (`pin: true` or CSS sticky equivalents) for immersive storytelling.
- **Parallax Layers:** Background graphic elements move at differential scroll speeds relative to foreground typography.
- **Text Reveals:** Staggered opacity and translateY reveals (`translateY(40px)` -> `0`) triggered on viewport entry via IntersectionObserver / GSAP ScrollTrigger.
- **Marquees:** Infinite CSS/JS horizontal ticker running at constant linear velocity.
- **Scroll-Velocity Skew:** Skew transforms applied based on scroll delta velocity.
- **Section Transitions:** Smooth cross-fades and clip-path polygon reveals.

## 3. Typography & Styling
- **Fonts:** Clean sans-serif display headers paired with high-precision monospace metadata tags.
- **Number Labels:** Stylized bracketed and parenthesized indices (e.g. `[01]`, `[02]`) in muted monospace tracking.
- **Code-Bracket Headings:** Accent-colored brackets surrounding primary category headers with neon glow effects.
