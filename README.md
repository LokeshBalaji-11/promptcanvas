# PromptCanvas // AI-Powered Spatial Moodboard & Visual Storyboard Generator

> **Roxten Studios Website Building Hackathon (UX/UI Focus)**  
> Designed for elite creative direction, prompt-to-moodboard synthesis, and cinematic spatial web experiences.

---

## ⚡ Key Features

1. **ASCII-Matrix Particle Convergence Hero (HTML5 Canvas):** A high-FPS particle simulation where scattered ASCII characters drift and converge into a glowing geometric emblem on load with interactive mouse repulsion.
2. **Architectural Blueprint Cards:** Side-by-side technical comparison cards for color harmonics, tokens, and typography systems with measurement guides.
3. **Pinned 4-Option ASCII Scroll Morph:** A full-viewport scroll-pinned canvas where dense ASCII characters dynamically scatter and morph between **EDITORIAL**, **CINEMATIC**, **MINIMAL**, and **CYBERPUNK**.
4. **Interactive Spatial Studio:** 
   - **Live Mini-Website Preview Card:** Real miniature hero preview rendering live colors and Google Fonts with dark/light mode toggle.
   - **Color Swatches & Typography Hierarchies:** One-click hex copy and Google Font URL generation.
   - **Auto-Arrange Bento & Export Deck:** Instant bento shuffling, JSON spec export, and CSS/Tailwind token generation.
5. **Instant Shareable Board URL:** Encode active moodboards directly into URL hash state (`#board=...`) for instant cross-judge sharing.
6. **Judge Guide Modal (`?`):** Glassmorphic overlay detailing all interactive features for hackathon judges.

---

## 🛠️ Tech Stack & Architecture

- **Framework:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS (`#060608` obsidian canvas, `#CCFF00` Acid Volt / `#00F0FF` Electric Cyan accents)
- **Animation & Motion:** GSAP 3 + ScrollTrigger + Lenis Inertia Smooth Scrolling
- **Icons & UI:** Lucide React, Google Fonts (`Syne`, `Space Grotesk`, `JetBrains Mono`, `Plus Jakarta Sans`)

---

## 🤖 AI & Open-Source Disclosure (Rule 2 Compliance)

In accordance with Roxten Studios hackathon rules, we explicitly disclose the tools and libraries used in building PromptCanvas:
- **Core Agentic Assistant:** Built with **Claude Code** (Anthropic) running within the Claude Agent SDK.
- **Animation Libraries:** **GSAP** (GreenSock Animation Platform) and **Lenis** (Studio Freight) for buttery smooth inertial scroll physics.
- **UI Icons & Fonts:** **Lucide Icons** and **Google Fonts API**.
- **Export Utilities:** **html-to-image** and **jsPDF**.

---

## 🚀 Local Setup & Installation

```bash
# Clone the repository
git clone https://github.com/roxten-studios/promptcanvas.git
cd promptcanvas

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

---
*Roxten Studios Website Building Hackathon 2026.*
