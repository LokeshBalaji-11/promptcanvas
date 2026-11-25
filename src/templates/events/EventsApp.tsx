import React, { useState, useEffect } from 'react';
import { Calendar, Mic, Award, Users, ShieldCheck, HelpCircle, Check, ArrowRight } from 'lucide-react';

export const EventsApp: React.FC = () => {
  const [currentHash, setCurrentHash] = useState<string>(window.location.hash.replace('#/', '') || 'schedule');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Registration form
  const [teamName, setTeamName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [regSuccess, setRegSuccess] = useState(false);

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
    <div className="min-h-[650px] bg-[#0d0e14] text-slate-100 font-sans flex flex-col md:flex-row rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
      <aside className={`fixed md:relative inset-y-0 left-0 z-40 w-64 bg-[#08090f] border-r border-white/10 flex flex-col transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-6 h-6 text-indigo-400" />
            <span className="font-bold text-base tracking-wider text-white">Summit2026</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 font-mono text-xs">
          {[
            { path: 'schedule', label: 'Schedule & Days', icon: Calendar },
            { path: 'speakers', label: 'Keynote Speakers', icon: Mic },
            { path: 'tracks', label: 'Tracks & Prizes', icon: Award },
            { path: 'register', label: 'Team Registration', icon: Users },
            { path: 'sponsors', label: 'Sponsors', icon: ShieldCheck },
            { path: 'faq', label: 'FAQ & Info', icon: HelpCircle }
          ].map(item => {
            const Icon = item.icon;
            const isActive = currentHash === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${
                  isActive ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold' : 'text-slate-400 hover:text-white hover:bg-white/5'
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
        <header className="h-16 bg-[#08090f]/80 backdrop-blur-md border-b border-white/10 px-6 flex items-center justify-between z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg bg-white/5 text-white">☰</button>
            <span className="font-mono text-xs text-indigo-400 uppercase tracking-widest">[EVENTS & HACKATHONS] / {currentHash}</span>
          </div>
          <button onClick={() => navigate('register')} className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs font-mono shadow-lg">
            Register Team
          </button>
        </header>

        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {currentHash === 'schedule' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-white">Summit Schedule</h1>
                <p className="text-xs text-slate-400 font-mono">3 days of keynote speeches, workshops, and hacking.</p>
              </div>
              <div className="space-y-4">
                {[
                  { day: 'Day 1: Opening & Keynotes', time: '09:00 AM - 05:00 PM', desc: 'State of AI agents, keynote by industry pioneers.' },
                  { day: 'Day 2: Hacking & Workshops', time: '09:00 AM - Late', desc: 'Hands-on agent building with mentor guidance.' },
                  { day: 'Day 3: Demos & Awards', time: '10:00 AM - 04:00 PM', desc: 'Top 10 finalist presentations and grand prize ceremony.' }
                ].map((s, i) => (
                  <div key={i} className="bg-[#14151f] border border-white/10 rounded-2xl p-6 space-y-2">
                    <span className="text-[10px] font-mono text-indigo-400">{s.time}</span>
                    <h3 className="text-lg font-bold text-white">{s.day}</h3>
                    <p className="text-xs text-slate-400">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentHash === 'speakers' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-white">Featured Speakers</h1>
                <p className="text-xs text-slate-400 font-mono">Learn from world-class researchers and engineers.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: 'Dr. Jane Vance', role: 'Chief Scientist, DeepMind' },
                  { name: 'Marcus Sterling', role: 'VP of Engineering, OpenAI' },
                  { name: 'Elena Rostova', role: 'Founder, Agentic Systems' }
                ].map((sp, i) => (
                  <div key={i} className="bg-[#14151f] border border-white/10 rounded-2xl p-6 text-center space-y-2">
                    <div className="w-16 h-16 rounded-full bg-indigo-500/20 border border-indigo-500/40 mx-auto flex items-center justify-center font-bold text-indigo-300">
                      {sp.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <h3 className="text-base font-bold text-white">{sp.name}</h3>
                    <p className="text-xs text-slate-400">{sp.role}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentHash === 'tracks' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-white">Tracks & Grand Prizes</h1>
                <p className="text-xs text-slate-400 font-mono">Compete for $100,000 in total bounties.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#14151f] border border-white/10 rounded-2xl p-6 space-y-2">
                  <span className="text-xs font-mono text-indigo-400">Prize: $50,000</span>
                  <h3 className="text-lg font-bold text-white">Autonomous Agent Architectures</h3>
                  <p className="text-xs text-slate-400">Build production-grade multi-agent harnesses that solve complex workflows.</p>
                </div>
                <div className="bg-[#14151f] border border-white/10 rounded-2xl p-6 space-y-2">
                  <span className="text-xs font-mono text-indigo-400">Prize: $30,000</span>
                  <h3 className="text-lg font-bold text-white">UI & Design Systems Automation</h3>
                  <p className="text-xs text-slate-400">Create tools that bridge design files and frontend production code automatically.</p>
                </div>
              </div>
            </div>
          )}

          {currentHash === 'register' && (
            <div className="space-y-6 max-w-xl">
              <div>
                <h1 className="text-2xl font-black text-white">Hackathon Team Registration</h1>
                <p className="text-xs text-slate-400 font-mono">Secure your team's spot for the upcoming hackathon.</p>
              </div>

              {regSuccess ? (
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 text-center space-y-3">
                  <Check className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h3 className="text-lg font-bold text-white">Team Registered Successfully!</h3>
                  <p className="text-xs text-slate-300 font-mono">Team "{teamName}" is confirmed. Check {leadEmail} for hacker pass badges.</p>
                  <button onClick={() => setRegSuccess(false)} className="px-4 py-2 bg-white/10 rounded-xl text-xs font-mono text-white">Reset</button>
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); if (teamName && leadEmail) setRegSuccess(true); }} className="bg-[#14151f] border border-white/10 rounded-2xl p-6 space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Team Name</label>
                    <input type="text" required placeholder="Neural Ninjas" value={teamName} onChange={e => setTeamName(e.target.value)} className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-400" />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Team Lead Email</label>
                    <input type="email" required placeholder="lead@team.io" value={leadEmail} onChange={e => setLeadEmail(e.target.value)} className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-400" />
                  </div>
                  <button type="submit" className="w-full py-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs font-mono shadow-lg">
                    Complete Registration
                  </button>
                </form>
              )}
            </div>
          )}

          {currentHash === 'sponsors' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-white">Our Sponsors</h1>
                <p className="text-xs text-slate-400 font-mono">Powered by industry leaders supporting developer innovation.</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Anthropic', 'Google DeepMind', 'Vercel', 'Figma'].map(sp => (
                  <div key={sp} className="bg-[#14151f] border border-white/10 rounded-2xl p-6 flex items-center justify-center font-mono text-sm font-bold text-slate-300">
                    {sp}
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentHash === 'faq' && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h1 className="text-2xl font-black text-white">Frequently Asked Questions</h1>
                <p className="text-xs text-slate-400 font-mono">Everything you need to know about participating.</p>
              </div>
              <div className="space-y-4">
                <div className="bg-[#14151f] border border-white/10 rounded-2xl p-6 space-y-2">
                  <h3 className="text-sm font-bold text-white">What is the maximum team size?</h3>
                  <p className="text-xs text-slate-400">Teams can consist of 1 to 4 members.</p>
                </div>
                <div className="bg-[#14151f] border border-white/10 rounded-2xl p-6 space-y-2">
                  <h3 className="text-sm font-bold text-white">Is accommodation provided for in-person attendees?</h3>
                  <p className="text-xs text-slate-400">Yes, full lodging and meal support is provided at the venue hotel.</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
