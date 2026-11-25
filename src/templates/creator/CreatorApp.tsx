import React, { useState, useEffect } from 'react';
import { FileText, User, Mail, Check } from 'lucide-react';

export const CreatorApp: React.FC = () => {
  const [currentHash, setCurrentHash] = useState<string>(window.location.hash.replace('#/', '') || 'posts');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const posts = [
    { id: 'p1', title: 'Why Multi-Agent Systems Are Eating Software Engineering', date: 'Nov 24, 2026', readTime: '6 min read', excerpt: 'How autonomous coding loops and subagent teams redefine productivity.' },
    { id: 'p2', title: 'Designing for Liquid Glass & Spatial UI', date: 'Nov 18, 2026', readTime: '4 min read', excerpt: 'Crafting translucent surfaces that respond dynamically to ambient lighting.' }
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
    <div className="min-h-[650px] bg-[#0c0d12] text-slate-100 font-sans flex flex-col md:flex-row rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
      <aside className={`fixed md:relative inset-y-0 left-0 z-40 w-64 bg-[#07080c] border-r border-white/10 flex flex-col transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-amber-400" />
            <span className="font-bold text-base tracking-wider text-white">Substack AI</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 font-mono text-xs">
          {[
            { path: 'posts', label: 'Articles & Posts', icon: FileText },
            { path: 'about', label: 'About Author', icon: User },
            { path: 'newsletter', label: 'Newsletter', icon: Mail }
          ].map(item => {
            const Icon = item.icon;
            const isActive = currentHash === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${
                  isActive ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold' : 'text-slate-400 hover:text-white hover:bg-white/5'
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
        <header className="h-16 bg-[#07080c]/80 backdrop-blur-md border-b border-white/10 px-6 flex items-center justify-between z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg bg-white/5 text-white">☰</button>
            <span className="font-mono text-xs text-amber-400 uppercase tracking-widest">[CREATOR / BLOG] / {currentHash}</span>
          </div>
          <button onClick={() => navigate('newsletter')} className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs font-mono shadow-lg">
            Subscribe
          </button>
        </header>

        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {currentHash === 'posts' && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h1 className="text-2xl font-black text-white">Essays & Articles</h1>
                <p className="text-xs text-slate-400 font-mono">Deep dives into artificial intelligence, design, and software engineering.</p>
              </div>
              <div className="space-y-4">
                {posts.map(p => (
                  <div key={p.id} className="bg-[#12131c] border border-white/10 rounded-2xl p-6 space-y-2">
                    <div className="flex items-center gap-3 text-xs font-mono text-amber-400">
                      <span>{p.date}</span>
                      <span>•</span>
                      <span>{p.readTime}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white hover:text-amber-300 transition-colors cursor-pointer">{p.title}</h3>
                    <p className="text-xs text-slate-400">{p.excerpt}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentHash === 'about' && (
            <div className="space-y-6 max-w-xl">
              <div>
                <h1 className="text-2xl font-black text-white">About the Author</h1>
                <p className="text-xs text-slate-400 font-mono">Writer, researcher, and builder.</p>
              </div>
              <div className="bg-[#12131c] border border-white/10 rounded-2xl p-6 space-y-4 text-xs font-mono text-slate-300">
                <p>Welcome to my publication where I explore the intersection of autonomous agents, agency-grade UI engineering, and future developer tooling.</p>
              </div>
            </div>
          )}

          {currentHash === 'newsletter' && (
            <div className="space-y-6 max-w-xl">
              <div>
                <h1 className="text-2xl font-black text-white">Join the Newsletter</h1>
                <p className="text-xs text-slate-400 font-mono">Get weekly essays delivered straight to your inbox.</p>
              </div>

              {newsletterSubscribed ? (
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 text-center space-y-3">
                  <Check className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h3 className="text-lg font-bold text-white">Subscribed Successfully!</h3>
                  <p className="text-xs text-slate-300 font-mono">Confirmation email sent to {newsletterEmail}.</p>
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); if (newsletterEmail) setNewsletterSubscribed(true); }} className="bg-[#12131c] border border-white/10 rounded-2xl p-6 space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Email Address</label>
                    <input type="email" required placeholder="reader@domain.com" value={newsletterEmail} onChange={e => setNewsletterEmail(e.target.value)} className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-400" />
                  </div>
                  <button type="submit" className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs font-mono shadow-lg">
                    Subscribe Free
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
