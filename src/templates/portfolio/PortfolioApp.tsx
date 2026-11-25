import React, { useState, useEffect } from 'react';
import { Grid, User, Cpu, MessageSquare, Send, Check } from 'lucide-react';

export const PortfolioApp: React.FC = () => {
  const [currentHash, setCurrentHash] = useState<string>(window.location.hash.replace('#/', '') || 'projects');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [contactSent, setContactSent] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const projects = [
    { id: 'p1', title: 'Cosmic Design System', cat: 'UI/UX', desc: 'Agency-grade dark mode glassmorphism UI library.' },
    { id: 'p2', title: 'Neural Agent Orchestrator', cat: 'AI', desc: 'Multi-agent developer harness for autonomous coding workflows.' },
    { id: 'p3', title: 'Neo-Brutalist E-Commerce', cat: 'Web', desc: 'High-conversion apparel storefront with real-time currency switching.' }
  ];

  useEffect(() => {
    const handleHash = () => {
      const h = window.location.hash.replace('#/', '');
      if (h) setCurrentHash(h);
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigate = (path: string) => {
    window.location.hash = `#/${path}`;
    setCurrentHash(path);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-[650px] bg-[#090a0f] text-slate-100 font-sans flex flex-col md:flex-row rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
      <aside className={`fixed md:relative inset-y-0 left-0 z-40 w-64 bg-[#05060a] border-r border-white/10 flex flex-col transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Grid className="w-6 h-6 text-cyan-400" />
            <span className="font-bold text-base tracking-wider text-white">Alex Morgan</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 font-mono text-xs">
          {[
            { path: 'projects', label: 'Projects Grid', icon: Grid },
            { path: 'about', label: 'About & Resume', icon: User },
            { path: 'skills', label: 'Skills & Stack', icon: Cpu },
            { path: 'testimonials', label: 'Testimonials', icon: MessageSquare },
            { path: 'contact', label: 'Contact', icon: Send }
          ].map(item => {
            const Icon = item.icon;
            const isActive = currentHash === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${
                  isActive ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-[#05060a]/80 backdrop-blur-md border-b border-white/10 px-6 flex items-center justify-between z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg bg-white/5 text-white">☰</button>
            <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest">[PORTFOLIO] / {currentHash}</span>
          </div>
          <button onClick={() => navigate('contact')} className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs font-mono shadow-lg">
            Let's Talk
          </button>
        </header>

        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {currentHash === 'projects' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black text-white">Selected Works</h1>
                  <p className="text-xs text-slate-400 font-mono">Case studies in product design, AI, and systems engineering.</p>
                </div>
                <div className="flex gap-2 font-mono text-xs">
                  {['All', 'UI/UX', 'AI', 'Web'].map(cat => (
                    <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-3 py-1.5 rounded-lg ${selectedCategory === cat ? 'bg-cyan-500 text-black font-bold' : 'bg-white/5 text-slate-400'}`}>
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.filter(p => selectedCategory === 'All' || p.cat === selectedCategory).map(p => (
                  <div key={p.id} className="bg-[#12131c] border border-white/10 rounded-2xl p-6 flex flex-col justify-between space-y-4">
                    <div>
                      <span className="text-[10px] font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10">{p.cat}</span>
                      <h3 className="text-lg font-bold text-white mt-2">{p.title}</h3>
                      <p className="text-xs text-slate-400 mt-1">{p.desc}</p>
                    </div>
                    <button onClick={() => alert(`Opening case study for ${p.title}`)} className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-mono text-white">
                      View Case Study →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentHash === 'about' && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h1 className="text-2xl font-black text-white">About & Resume</h1>
                <p className="text-xs text-slate-400 font-mono">Senior Design Director & Systems Architect based in San Francisco.</p>
              </div>
              <div className="bg-[#12131c] border border-white/10 rounded-2xl p-6 space-y-4 text-xs font-mono">
                <p className="text-slate-300 font-sans leading-relaxed">
                  With over 10 years of experience building high-performance web applications, design systems, and developer tools, I bridge the gap between rigorous technical architecture and breathtaking visual design.
                </p>
                <div className="pt-4 border-t border-white/10 space-y-2">
                  <div className="flex justify-between"><span className="text-slate-400">Experience</span><span className="text-white">Staff Engineer @ Anthropic / Vercel (2020-Present)</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Education</span><span className="text-white">B.S. Computer Science, Stanford University</span></div>
                </div>
              </div>
            </div>
          )}

          {currentHash === 'skills' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-white">Technical Stack & Skills</h1>
                <p className="text-xs text-slate-400 font-mono">Modern frameworks and tools used daily.</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
                {['React / Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js & FastAPI', 'Python & PyTorch', 'Figma API', 'PostgreSQL', 'Playwright E2E'].map(s => (
                  <div key={s} className="bg-[#12131c] border border-white/10 rounded-xl p-4 text-cyan-400 font-bold flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentHash === 'testimonials' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-white">Client Testimonials</h1>
                <p className="text-xs text-slate-400 font-mono">What engineering and design leaders say.</p>
              </div>
              <div className="bg-[#12131c] border border-white/10 rounded-2xl p-6 space-y-2">
                <p className="text-sm text-white italic">"Alex delivered our entire design system overhaul 2 weeks ahead of schedule. Absolute world-class execution."</p>
                <div className="text-xs font-mono text-cyan-400 pt-2">— VP of Engineering, Enterprise SaaS</div>
              </div>
            </div>
          )}

          {currentHash === 'contact' && (
            <div className="space-y-6 max-w-xl">
              <div>
                <h1 className="text-2xl font-black text-white">Get in Touch</h1>
                <p className="text-xs text-slate-400 font-mono">Available for select advisory and engineering roles.</p>
              </div>

              {contactSent ? (
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 text-center space-y-3">
                  <Check className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h3 className="text-lg font-bold text-white">Message Sent!</h3>
                  <p className="text-xs text-slate-300 font-mono">Thank you for reaching out. I'll respond within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); setContactSent(true); }} className="bg-[#12131c] border border-white/10 rounded-2xl p-6 space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Your Name</label>
                    <input type="text" required placeholder="Sarah Connor" className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-cyan-400" />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Email</label>
                    <input type="email" required placeholder="sarah@cyberdyne.io" className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-cyan-400" />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Message</label>
                    <textarea rows={4} required placeholder="Let's build something extraordinary..." className="w-full bg-black/60 border border-white/10 rounded-xl p-4 text-xs text-white outline-none focus:border-cyan-400" />
                  </div>
                  <button type="submit" className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs font-mono shadow-lg">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
