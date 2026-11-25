import React, { useState, useEffect } from 'react';
import { UserPlus, Map, GitCommit, Users, Briefcase, Check, ThumbsUp } from 'lucide-react';

export const StartupApp: React.FC = () => {
  const [currentHash, setCurrentHash] = useState<string>(window.location.hash.replace('#/', '') || 'waitlist');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistJoined, setWaitlistJoined] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState(4821);

  const [roadmap, setRoadmap] = useState([
    { id: 'r1', title: 'Multi-Model Agent Orchestration', votes: 342, voted: false },
    { id: 'r2', title: 'Figma Two-Way Code Sync Plugin', votes: 289, voted: false },
    { id: 'r3', title: 'Enterprise SSO & SAML Integration', votes: 195, voted: false }
  ]);

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

  const toggleVote = (id: string) => {
    setRoadmap(roadmap.map(r => r.id === id ? { ...r, votes: r.voted ? r.votes - 1 : r.votes + 1, voted: !r.voted } : r));
  };

  return (
    <div className="min-h-[650px] bg-[#0b0c14] text-slate-100 font-sans flex flex-col md:flex-row rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
      <aside className={`fixed md:relative inset-y-0 left-0 z-40 w-64 bg-[#06070a] border-r border-white/10 flex flex-col transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserPlus className="w-6 h-6 text-cyan-400" />
            <span className="font-bold text-base tracking-wider text-white">PromptCanvas AI</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 font-mono text-xs">
          {[
            { path: 'waitlist', label: 'Waitlist Signup', icon: UserPlus },
            { path: 'roadmap', label: 'Roadmap & Votes', icon: Map },
            { path: 'changelog', label: 'Changelog', icon: GitCommit },
            { path: 'team', label: 'Founding Team', icon: Users },
            { path: 'investors', label: 'Press & Investors', icon: Briefcase }
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
        <header className="h-16 bg-[#06070a]/80 backdrop-blur-md border-b border-white/10 px-6 flex items-center justify-between z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg bg-white/5 text-white">☰</button>
            <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest">[STARTUP] / {currentHash}</span>
          </div>
          <button onClick={() => navigate('waitlist')} className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs font-mono shadow-lg">
            Join Waitlist (#{waitlistCount + 1})
          </button>
        </header>

        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {currentHash === 'waitlist' && (
            <div className="space-y-6 max-w-xl">
              <div>
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 font-mono text-xs border border-cyan-500/30">🔥 {waitlistCount} developers ahead of you</span>
                <h1 className="text-3xl font-black text-white mt-4">The Future of Agency-Grade AI Prompting</h1>
                <p className="text-xs text-slate-400 font-mono mt-2">Transform natural language intents into production-ready multi-page React applications instantly.</p>
              </div>

              {waitlistJoined ? (
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 text-center space-y-3">
                  <Check className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h3 className="text-lg font-bold text-white">You're on the VIP Waitlist!</h3>
                  <p className="text-xs text-slate-300 font-mono">Your queue position is <strong className="text-cyan-400">#{waitlistCount + 1}</strong>. We've sent your invite token to {waitlistEmail}.</p>
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); if (waitlistEmail) { setWaitlistJoined(true); setWaitlistCount(c => c + 1); } }} className="bg-[#12131d] border border-white/10 rounded-2xl p-6 space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Email Address</label>
                    <input type="email" required placeholder="developer@company.com" value={waitlistEmail} onChange={e => setWaitlistEmail(e.target.value)} className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-cyan-400" />
                  </div>
                  <button type="submit" className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs font-mono shadow-lg">
                    Request Early Access
                  </button>
                </form>
              )}
            </div>
          )}

          {currentHash === 'roadmap' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-white">Product Roadmap & Voting</h1>
                <p className="text-xs text-slate-400 font-mono">Vote on what features our engineering team builds next.</p>
              </div>
              <div className="space-y-4">
                {roadmap.map(r => (
                  <div key={r.id} className="bg-[#12131d] border border-white/10 rounded-2xl p-6 flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white">{r.title}</h3>
                      <p className="text-xs text-slate-400 font-mono mt-1">{r.votes} community votes</p>
                    </div>
                    <button
                      onClick={() => toggleVote(r.id)}
                      className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold flex items-center gap-2 transition-all ${
                        r.voted ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'bg-white/5 text-slate-300 hover:text-white border border-white/10'
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{r.voted ? 'Voted ✓' : 'Vote'}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentHash === 'changelog' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-white">Changelog & Releases</h1>
                <p className="text-xs text-slate-400 font-mono">Continuous delivery updates and enhancements.</p>
              </div>
              <div className="bg-[#12131d] border border-white/10 rounded-2xl p-6 space-y-2">
                <span className="text-[10px] font-mono text-cyan-400">v2.4.0 • November 2026</span>
                <h3 className="text-base font-bold text-white">Multi-Page Hash Routers & Mini Websites</h3>
                <p className="text-xs text-slate-400">Upgraded all templates into fully functional mini multi-page websites with category-specific features and zero dependencies.</p>
              </div>
            </div>
          )}

          {currentHash === 'team' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-white">Founding Team</h1>
                <p className="text-xs text-slate-400 font-mono">Engineers and researchers from DeepMind and OpenAI.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#12131d] border border-white/10 rounded-2xl p-6 space-y-1">
                  <h3 className="text-base font-bold text-white">Lokesh Balaji</h3>
                  <p className="text-xs text-cyan-400 font-mono">Co-Founder & CEO</p>
                </div>
                <div className="bg-[#12131d] border border-white/10 rounded-2xl p-6 space-y-1">
                  <h3 className="text-base font-bold text-white">Claude AI</h3>
                  <p className="text-xs text-cyan-400 font-mono">Co-Founder & Chief Architect</p>
                </div>
              </div>
            </div>
          )}

          {currentHash === 'investors' && (
            <div className="space-y-6 max-w-xl">
              <div>
                <h1 className="text-2xl font-black text-white">Press & Investor Kit</h1>
                <p className="text-xs text-slate-400 font-mono">Brand assets, logos, and company overview.</p>
              </div>
              <div className="bg-[#12131d] border border-white/10 rounded-2xl p-6 space-y-4 font-mono text-xs">
                <div className="flex justify-between py-2 border-b border-white/5"><span className="text-slate-400">Founded</span><span className="text-white">2026</span></div>
                <div className="flex justify-between py-2 border-b border-white/5"><span className="text-slate-400">Headquarters</span><span className="text-white">San Francisco, CA</span></div>
                <button onClick={() => alert('Press kit ZIP downloaded successfully!')} className="w-full py-2.5 bg-cyan-500 text-black font-bold rounded-xl mt-2">Download Brand Assets ZIP</button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
