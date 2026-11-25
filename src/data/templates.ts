export interface TemplateItem {
  id: string;
  name: string;
  category: string;
  style: 'Editorial' | 'Cinematic' | 'Minimal' | 'Cyberpunk';
  palette: string[]; // 5 hex codes
  fonts: {
    display: string;
    body: string;
    googleFontsUrl: string;
  };
  copy: {
    headline: string;
    subline: string;
    cta: string;
    features: Array<{ title: string; desc: string }>;
  };
  vibes: {
    radius: number;
    density: number;
    temperature: number;
  };
  tone: 'Professional' | 'Friendly' | 'Bold' | 'Playful';
  starred?: boolean;
}

export const TEMPLATES: TemplateItem[] = [
  {
    id: 'biz-1',
    name: 'Apex Enterprise SaaS',
    category: 'Business',
    style: 'Minimal',
    palette: ['#0A0B10', '#161822', '#22D3EE', '#F8FAFC', '#3DFFA2'],
    fonts: { display: 'Space Grotesk', body: 'Inter', googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Space+Grotesk:wght@500;700&display=swap' },
    copy: {
      headline: 'Enterprise Orchestration at Scale',
      subline: 'Unify infrastructure, security, and automated workflows in one spatial pane.',
      cta: 'Request Private Access',
      features: [
        { title: 'Zero-Trust Mesh', desc: 'Encrypted end-to-end multi-cloud communication.' },
        { title: 'Deterministic CI/CD', desc: 'Sub-second pipeline execution with automated rollbacks.' },
        { title: 'Telemetry AI', desc: 'Proactive anomaly detection across all microservices.' }
      ]
    },
    vibes: { radius: 16, density: 50, temperature: 30 },
    tone: 'Professional'
  },
  {
    id: 'biz-2',
    name: 'Venture Capital Nexus',
    category: 'Business',
    style: 'Editorial',
    palette: ['#07070A', '#12131A', '#CCFF00', '#F5F5F5', '#8E8E98'],
    fonts: { display: 'Unbounded', body: 'JetBrains Mono', googleFontsUrl: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Unbounded:wght@600;850&display=swap' },
    copy: {
      headline: 'Backing Category-Defining Founders',
      subline: 'Partnering with exceptional technical teams building the next era of computing.',
      cta: 'Pitch Your Startup',
      features: [
        { title: 'Deep Tech Focus', desc: 'Specialized in AI, robotics, and spatial infrastructure.' },
        { title: 'Global Network', desc: 'Direct connections to tier-1 enterprise customers.' },
        { title: 'Founder First', desc: 'Unconditional operational and engineering support.' }
      ]
    },
    vibes: { radius: 24, density: 40, temperature: 50 },
    tone: 'Bold'
  },
  {
    id: 'startup-1',
    name: 'Aether Cloud AI',
    category: 'Startup',
    style: 'Cinematic',
    palette: ['#050811', '#0F172A', '#38BDF8', '#F0F9FF', '#818CF8'],
    fonts: { display: 'Space Grotesk', body: 'Inter', googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Space+Grotesk:wght@500;700&display=swap' },
    copy: {
      headline: 'Autonomous Compute for Agentic Workflows',
      subline: 'Deploy thousands of isolated sandboxes with zero cold-start latency.',
      cta: 'Start Free Trial',
      features: [
        { title: 'Instant Provisioning', desc: 'Sub-millisecond container spin-up worldwide.' },
        { title: 'Secure Enclaves', desc: 'Hardware-isolated memory protection per agent.' },
        { title: 'Pay-As-You-Invoke', desc: 'Granular billing down to the individual millisecond.' }
      ]
    },
    vibes: { radius: 12, density: 60, temperature: 70 },
    tone: 'Playful'
  },
  {
    id: 'startup-2',
    name: 'Quantum Ledger',
    category: 'Startup',
    style: 'Cyberpunk',
    palette: ['#0A0608', '#1A0F14', '#FF3B5C', '#FFE4E6', '#FB7185'],
    fonts: { display: 'Syne', body: 'JetBrains Mono', googleFontsUrl: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Syne:wght@700;800&display=swap' },
    copy: {
      headline: 'Unbreakable Post-Quantum Cryptography',
      subline: 'Future-proof your financial ledgers against quantum decryption threats.',
      cta: 'Audit Your Keyring',
      features: [
        { title: 'Lattice-Based', desc: 'NIST-approved post-quantum mathematical formulas.' },
        { title: 'Hardware HSM', desc: 'Seamless integration with top-tier security modules.' },
        { title: 'Continuous Proof', desc: 'Real-time zero-knowledge verification checkpoints.' }
      ]
    },
    vibes: { radius: 8, density: 70, temperature: 90 },
    tone: 'Bold'
  },
  {
    id: 'student-1',
    name: 'HackSphere Hub',
    category: 'Students',
    style: 'Cyberpunk',
    palette: ['#060608', '#13131A', '#00F0FF', '#FFFFFF', '#CCFF00'],
    fonts: { display: 'Syne', body: 'Inter', googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Syne:wght@700;800&display=swap' },
    copy: {
      headline: 'Build, Ship, and Win Global Hackathons',
      subline: 'The ultimate collaborative playground for student developers and designers.',
      cta: 'Join Next Hackathon',
      features: [
        { title: 'Team Matching', desc: 'Find co-founders with complementary stack skills instantly.' },
        { title: 'Mentorship Access', desc: '1-on-1 guidance from top Silicon Valley engineers.' },
        { title: 'Prizes & Bounties', desc: 'Compete for over $50k in cash and cloud credits.' }
      ]
    },
    vibes: { radius: 16, density: 80, temperature: 95 },
    tone: 'Playful'
  },
  {
    id: 'student-2',
    name: 'Campus Scholar',
    category: 'Students',
    style: 'Minimal',
    palette: ['#0A0A0C', '#16161C', '#3DFFA2', '#F8FAFC', '#94A3B8'],
    fonts: { display: 'Space Grotesk', body: 'Inter', googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Space+Grotesk:wght@500;700&display=swap' },
    copy: {
      headline: 'Master Any Subject With Peer Study Rooms',
      subline: 'Synchronized flashcards, AI tutors, and collaborative whiteboard notes.',
      cta: 'Enter Study Room',
      features: [
        { title: 'Active Recall AI', desc: 'Adaptive spaced repetition generated from lecture notes.' },
        { title: 'Live Rooms', desc: 'Voice-enabled quiet study spaces with global peers.' },
        { title: 'Syllabus Sync', desc: 'Auto-import deadlines directly into your calendar.' }
      ]
    },
    vibes: { radius: 16, density: 50, temperature: 20 },
    tone: 'Friendly'
  },
  {
    id: 'club-1',
    name: 'Robotics & AI Guild',
    category: 'Clubs & Communities',
    style: 'Cinematic',
    palette: ['#04070D', '#0B132B', '#FFB703', '#FFFFFF', '#3A86EF'],
    fonts: { display: 'Unbounded', body: 'JetBrains Mono', googleFontsUrl: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Unbounded:wght@600;850&display=swap' },
    copy: {
      headline: 'Building Autonomous Machines for Tomorrow',
      subline: 'Open-source hardware, ROS2 simulations, and competitive robot combat.',
      cta: 'Attend Workshop',
      features: [
        { title: 'ROS2 Labs', desc: 'State-of-the-art simulation clusters for autonomous navigation.' },
        { title: 'CNC & 3D Printing', desc: 'Full access to high-precision fabrication machinery.' },
        { title: 'Annual Expo', desc: 'Showcase custom builds to industry leaders and investors.' }
      ]
    },
    vibes: { radius: 12, density: 65, temperature: 60 },
    tone: 'Professional'
  },
  {
    id: 'club-2',
    name: 'Design Systems Guild',
    category: 'Clubs & Communities',
    style: 'Editorial',
    palette: ['#07070A', '#14141C', '#FF2A5F', '#F5F5F5', '#A1A1AA'],
    fonts: { display: 'Space Grotesk', body: 'Inter', googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Space+Grotesk:wght@500;700&display=swap' },
    copy: {
      headline: 'Crafting the Future of Digital Interfaces',
      subline: 'Weekly design crits, token architecture workshops, and Figma token pipelines.',
      cta: 'Join Guild Discord',
      features: [
        { title: 'Component Audits', desc: 'Deep dive into accessibility and spatial token standards.' },
        { title: 'Design Crits', desc: 'Constructive portfolio reviews from principal product designers.' },
        { title: 'Open Source', desc: 'Contribute to community-owned design systems.' }
      ]
    },
    vibes: { radius: 20, density: 45, temperature: 40 },
    tone: 'Friendly'
  },
  {
    id: 'port-1',
    name: 'Alex Chen // Spatial Architect',
    category: 'Portfolio',
    style: 'Editorial',
    palette: ['#060608', '#121218', '#CCFF00', '#FAFAFA', '#71717A'],
    fonts: { display: 'Unbounded', body: 'JetBrains Mono', googleFontsUrl: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Unbounded:wght@600;850&display=swap' },
    copy: {
      headline: 'Designing Immersive Web Experiences',
      subline: 'Principal UI/UX architect crafting high-performance interactive interfaces and 3D web shaders.',
      cta: 'Explore Works',
      features: [
        { title: 'Spatial Web', desc: 'WebGL and Three.js experiences for global luxury brands.' },
        { title: 'Design Systems', desc: 'Multi-brand design tokens scaling to 50M+ active users.' },
        { title: 'Speaking', desc: 'Keynote speaker on generative AI and kinetic typography.' }
      ]
    },
    vibes: { radius: 24, density: 30, temperature: 50 },
    tone: 'Professional'
  },
  {
    id: 'port-2',
    name: 'Elena Rostova // AI Engineer',
    category: 'Portfolio',
    style: 'Cyberpunk',
    palette: ['#070508', '#160F1A', '#00F0FF', '#F8FAFC', '#F43F5E'],
    fonts: { display: 'Syne', body: 'JetBrains Mono', googleFontsUrl: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Syne:wght@700;800&display=swap' },
    copy: {
      headline: 'Training Multimodal Reasoning Models',
      subline: 'Specialized in transformer optimization, RLHF pipelines, and real-time agentic orchestration.',
      cta: 'Read Research Papers',
      features: [
        { title: 'LLM Fine-Tuning', desc: 'Custom LoRA adaptations for domain-specific medical and legal AI.' },
        { title: 'Vector RAG', desc: 'Ultra-low latency semantic search engines handling 100k QPS.' },
        { title: 'Open Source', desc: 'Creator of widely adopted open-source agentic evaluation harnesses.' }
      ]
    },
    vibes: { radius: 8, density: 75, temperature: 85 },
    tone: 'Bold'
  },
  {
    id: 'rest-1',
    name: 'Lumina Artisan Bistro',
    category: 'Restaurant & Cafe',
    style: 'Cinematic',
    palette: ['#0A0807', '#1C1512', '#F59E0B', '#FEF3C7', '#D97706'],
    fonts: { display: 'Space Grotesk', body: 'Inter', googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Space+Grotesk:wght@500;700&display=swap' },
    copy: {
      headline: 'Farm-to-Table Gastronomy & Natural Wines',
      subline: 'An intimate culinary journey blending seasonal organic ingredients with rustic fireside cooking.',
      cta: 'Reserve a Table',
      features: [
        { title: 'Seasonal Tasting', desc: 'A 7-course curated menu changing weekly with the harvest.' },
        { title: 'Biodynamic Cellar', desc: 'Over 300 hand-selected low-intervention natural wines.' },
        { title: 'Private Dining', desc: 'Exclusive cellar room available for private celebrations.' }
      ]
    },
    vibes: { radius: 18, density: 40, temperature: 25 },
    tone: 'Friendly'
  },
  {
    id: 'rest-2',
    name: 'Kuro Tokyo Ramen',
    category: 'Restaurant & Cafe',
    style: 'Minimal',
    palette: ['#060606', '#141414', '#EF4444', '#FAFAFA', '#737373'],
    fonts: { display: 'Space Grotesk', body: 'Inter', googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Space+Grotesk:wght@500;700&display=swap' },
    copy: {
      headline: 'Authentic 24-Hour Tonkotsu Ramen',
      subline: 'Hand-crafted noodles, rich collagen broth simmered for 24 hours, and smoky chashu pork.',
      cta: 'Order Online',
      features: [
        { title: 'Signature Black Garlic', desc: 'Infused with roasted garlic oil and secret tare.' },
        { title: 'Handmade Noodles', desc: 'Crafted fresh daily using premium Hokkaido wheat.' },
        { title: 'Omakase Bar', desc: 'Intimate 8-seat counter overlooking the ramen masters.' }
      ]
    },
    vibes: { radius: 14, density: 45, temperature: 40 },
    tone: 'Playful'
  },
  {
    id: 'event-1',
    name: 'Global GenAI Summit 2026',
    category: 'Events & Hackathons',
    style: 'Cinematic',
    palette: ['#030712', '#111827', '#6366F1', '#F9FAFB', '#38BDF8'],
    fonts: { display: 'Unbounded', body: 'Inter', googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Unbounded:wght@600;850&display=swap' },
    copy: {
      headline: 'The Epicenter of Artificial Intelligence',
      subline: 'Three days of keynote speeches, hands-on labs, and networking with top AI researchers.',
      cta: 'Secure Your Pass',
      features: [
        { title: '50+ Keynotes', desc: 'Hear directly from lab directors, founders, and core contributors.' },
        { title: 'Live Benchmarks', desc: 'Exclusive first-looks at next-generation reasoning architectures.' },
        { title: 'VIP Gala', desc: 'Evening networking reception at the rooftop observatory.' }
      ]
    },
    vibes: { radius: 16, density: 55, temperature: 60 },
    tone: 'Professional'
  },
  {
    id: 'event-2',
    name: 'NeoTokyo Design Week',
    category: 'Events & Hackathons',
    style: 'Cyberpunk',
    palette: ['#07020A', '#190A24', '#EC4899', '#FDF4FF', '#A855F7'],
    fonts: { display: 'Syne', body: 'JetBrains Mono', googleFontsUrl: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Syne:wght@700;800&display=swap' },
    copy: {
      headline: 'Where Spatial Design Meets Cybernetics',
      subline: 'Immersive exhibitions, generative art installations, and interactive hardware workshops.',
      cta: 'Register for Access',
      features: [
        { title: 'Generative Shaders', desc: 'Live interactive art displays powered by WebGPU.' },
        { title: 'Hardware Bazaar', desc: 'Explore cutting-edge haptic gloves and AR eyewear.' },
        { title: 'Night Sessions', desc: 'Audio-visual performances by world-class electronic artists.' }
      ]
    },
    vibes: { radius: 10, density: 80, temperature: 90 },
    tone: 'Bold'
  },
  {
    id: 'edu-1',
    name: 'Synthetica Academy',
    category: 'Education',
    style: 'Editorial',
    palette: ['#07080C', '#121620', '#3B82F6', '#F8FAFC', '#60A5FA'],
    fonts: { display: 'Space Grotesk', body: 'Inter', googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Space+Grotesk:wght@500;700&display=swap' },
    copy: {
      headline: 'Advanced Engineering for Autonomous Systems',
      subline: 'Rigorous project-based curriculum taught by principal engineers from top tech labs.',
      cta: 'Explore Cohorts',
      features: [
        { title: 'Project-First', desc: 'Build production-grade distributed systems from day one.' },
        { title: 'Career Guarantee', desc: 'Direct placement partnerships with leading AI labs.' },
        { title: 'Lifetime Access', desc: 'Continuous updates to all course materials and labs.' }
      ]
    },
    vibes: { radius: 16, density: 45, temperature: 35 },
    tone: 'Professional'
  },
  {
    id: 'edu-2',
    name: 'CodeCraft Kids & Teens',
    category: 'Education',
    style: 'Minimal',
    palette: ['#08090E', '#141824', '#10B981', '#ECFDF5', '#34D399'],
    fonts: { display: 'Space Grotesk', body: 'Inter', googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Space+Grotesk:wght@500;700&display=swap' },
    copy: {
      headline: 'Empowering the Next Generation of Creators',
      subline: 'Fun, interactive coding, game development, and robotics classes for young minds.',
      cta: 'Book Free Trial',
      features: [
        { title: 'Gamified Learning', desc: 'Learn Python and JavaScript by building real multiplayer games.' },
        { title: 'Small Cohorts', desc: 'Maximum 5 students per instructor for personalized attention.' },
        { title: 'Parent Portal', desc: 'Weekly progress reports and milestone celebrations.' }
      ]
    },
    vibes: { radius: 20, density: 50, temperature: 40 },
    tone: 'Friendly'
  },
  {
    id: 'nonprofit-1',
    name: 'TerraGuard Climate Initiative',
    category: 'Nonprofit',
    style: 'Minimal',
    palette: ['#060907', '#0F1A12', '#22C55E', '#F0FDF4', '#86EFAC'],
    fonts: { display: 'Space Grotesk', body: 'Inter', googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Space+Grotesk:wght@500;700&display=swap' },
    copy: {
      headline: 'Protecting Global Ecosystems Through Science',
      subline: 'Deploying satellite monitoring and local community action to halt deforestation.',
      cta: 'Support Our Mission',
      features: [
        { title: 'Satellite Tracking', desc: 'Real-time AI detection of illegal logging and land clearing.' },
        { title: 'Indigenous Grants', desc: 'Direct funding to frontline communities safeguarding forests.' },
        { title: 'Transparent Impact', desc: 'Audited carbon offset verification and open data portals.' }
      ]
    },
    vibes: { radius: 16, density: 35, temperature: 20 },
    tone: 'Professional'
  },
  {
    id: 'nonprofit-2',
    name: 'OpenCompute Humanitarian',
    category: 'Nonprofit',
    style: 'Editorial',
    palette: ['#07070A', '#131318', '#A855F7', '#FAFAFA', '#D8B4FE'],
    fonts: { display: 'Unbounded', body: 'JetBrains Mono', googleFontsUrl: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Unbounded:wght@600;850&display=swap' },
    copy: {
      headline: 'Free Compute for Disaster Relief AI',
      subline: 'Providing emergency satellite bandwidth and compute clusters during natural disasters.',
      cta: 'Donate Compute',
      features: [
        { title: 'Rapid Response', desc: 'Deploying communication nodes within 4 hours of disaster.' },
        { title: 'Open Hardware', desc: 'Low-cost ruggedized mesh routers for remote zones.' },
        { title: 'Volunteer Network', desc: 'Global community of engineers ready to assist on call.' }
      ]
    },
    vibes: { radius: 18, density: 40, temperature: 45 },
    tone: 'Friendly'
  },
  {
    id: 'fashion-1',
    name: 'Vogue & Void Atelier',
    category: 'Fashion',
    style: 'Editorial',
    palette: ['#050505', '#111111', '#E2E8F0', '#FFFFFF', '#71717A'],
    fonts: { display: 'Unbounded', body: 'Inter', googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Unbounded:wght@600;850&display=swap' },
    copy: {
      headline: 'Avant-Garde Tailoring & Sustainable Silhouettes',
      subline: 'Merging traditional couture craftsmanship with futuristic biodegradable textiles.',
      cta: 'View Collection 06',
      features: [
        { title: 'Zero Waste', desc: 'Fully circular garment construction with zero fabric waste.' },
        { title: 'Limited Drops', desc: 'Exclusive numbered runs available only to atelier members.' },
        { title: 'Custom Fit', desc: 'Digital 3D body scanning for bespoke tailored outerwear.' }
      ]
    },
    vibes: { radius: 0, density: 25, temperature: 10 },
    tone: 'Bold'
  },
  {
    id: 'fashion-2',
    name: 'Kinetics Streetwear',
    category: 'Fashion',
    style: 'Cyberpunk',
    palette: ['#060608', '#12121A', '#FACC15', '#FEF08A', '#CA8A04'],
    fonts: { display: 'Syne', body: 'JetBrains Mono', googleFontsUrl: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Syne:wght@700;800&display=swap' },
    copy: {
      headline: 'Technical Apparel for Urban Explorers',
      subline: 'Weatherproof membranes, modular utility pockets, and reflective nocturnal weaves.',
      cta: 'Shop Drop 04',
      features: [
        { title: 'GORE-TEX Pro', desc: 'Maximum waterproof breathability in extreme conditions.' },
        { title: 'Modular Pockets', desc: 'Customizable magnetic attachment system for daily carry.' },
        { title: 'NFC Authenticated', desc: 'Cryptographic chip embedded in every garment for provenance.' }
      ]
    },
    vibes: { radius: 6, density: 80, temperature: 95 },
    tone: 'Playful'
  },
  {
    id: 'tech-1',
    name: 'Nexus DB Engine',
    category: 'Tech/SaaS',
    style: 'Minimal',
    palette: ['#07070A', '#13151D', '#0EA5E9', '#F8FAFC', '#38BDF8'],
    fonts: { display: 'Space Grotesk', body: 'JetBrains Mono', googleFontsUrl: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Space+Grotesk:wght@500;700&display=swap' },
    copy: {
      headline: 'Distributed Graph Database for Real-Time AI',
      subline: 'Sub-millisecond multi-model queries scaling horizontally across petabytes.',
      cta: 'Start with Docker',
      features: [
        { title: 'Vector Indexing', desc: 'Native HNSW vector search combined with ACID graph storage.' },
        { title: 'Zero Latency', desc: 'Predictable 99.99th percentile query response times.' },
        { title: 'Cloud Native', desc: 'Native Kubernetes operator with automated sharding.' }
      ]
    },
    vibes: { radius: 12, density: 50, temperature: 30 },
    tone: 'Professional'
  },
  {
    id: 'tech-2',
    name: 'Observability Mesh',
    category: 'Tech/SaaS',
    style: 'Cyberpunk',
    palette: ['#05070B', '#0E1626', '#14B8A6', '#CCFF00', '#2DD4BF'],
    fonts: { display: 'Syne', body: 'JetBrains Mono', googleFontsUrl: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Syne:wght@700;800&display=swap' },
    copy: {
      headline: 'Instant Telemetry for Distributed Microservices',
      subline: 'Zero-instrumentation eBPF tracing, metrics, and logs in a unified spatial dashboard.',
      cta: 'Deploy DaemonSet',
      features: [
        { title: 'eBPF Probes', desc: 'Zero code changes required to capture all TCP/HTTP traffic.' },
        { title: 'AI Root Cause', desc: 'Automated incident diagnosis in under 30 seconds.' },
        { title: 'Infinite Retention', desc: 'Compressed columnar storage costing 10x less than rivals.' }
      ]
    },
    vibes: { radius: 10, density: 85, temperature: 90 },
    tone: 'Bold'
  },
  {
    id: 'biz-3',
    name: 'OmniLogistics Global',
    category: 'Business',
    style: 'Cinematic',
    palette: ['#06080F', '#111827', '#F97316', '#FFEDD5', '#C2410C'],
    fonts: { display: 'Space Grotesk', body: 'Inter', googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Space+Grotesk:wght@500;700&display=swap' },
    copy: {
      headline: 'Autonomous Supply Chain Optimization',
      subline: 'Predictive routing, automated customs clearance, and real-time fleet telemetry.',
      cta: 'Request Demo',
      features: [
        { title: 'Predictive Routing', desc: 'AI routing avoiding weather and port congestion proactively.' },
        { title: 'Carbon Tracking', desc: 'Real-time emissions accounting across all transport modes.' },
        { title: 'Smart Contracts', desc: 'Automated escrow release upon verified milestone delivery.' }
      ]
    },
    vibes: { radius: 16, density: 55, temperature: 40 },
    tone: 'Professional'
  },
  {
    id: 'startup-3',
    name: 'BioSynthetica Labs',
    category: 'Startup',
    style: 'Editorial',
    palette: ['#070A08', '#111A14', '#10B981', '#F0FDF4', '#059669'],
    fonts: { display: 'Unbounded', body: 'Inter', googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Unbounded:wght@600;850&display=swap' },
    copy: {
      headline: 'Programmable Biology & Synthetic Proteins',
      subline: 'Accelerating drug discovery with generative protein folding and high-throughput assays.',
      cta: 'Partner With Us',
      features: [
        { title: 'Generative Folding', desc: 'Novel enzyme design optimized for targeted therapeutics.' },
        { title: 'Wet-Lab Automation', desc: 'High-throughput robotic screening of candidate molecules.' },
        { title: 'Clinical Pipeline', desc: 'Accelerated preclinical testing with validated AI models.' }
      ]
    },
    vibes: { radius: 20, density: 40, temperature: 50 },
    tone: 'Professional'
  }
];
