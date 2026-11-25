import React, { useState, useEffect } from 'react';
import { Users, Calendar, UserPlus, Bell, Camera, Trophy, Check, Plus, Search, MapPin } from 'lucide-react';

export const ClubsApp: React.FC = () => {
  const [currentHash, setCurrentHash] = useState<string>(window.location.hash.replace('#/', '') || 'events');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Community State
  const [events, setEvents] = useState([
    { id: 'e1', title: 'Global AI Hack Night & Demo', date: 'Dec 02, 2026', location: 'Virtual & Hub San Francisco', rsvps: 142, attending: false },
    { id: 'e2', title: 'Design Systems & Token Workshop', date: 'Dec 08, 2026', location: 'Hub New York', rsvps: 89, attending: true }
  ]);

  const [members, setMembers] = useState([
    { id: 'm1', name: 'Elena Rostova', role: 'Core Contributor', points: 1450, avatar: 'ER' },
    { id: 'm2', name: 'Kaito Tanaka', role: 'AI Researcher', points: 1220, avatar: 'KT' },
    { id: 'm3', name: 'Sarah Jenkins', role: 'Community Lead', points: 980, avatar: 'SJ' }
  ]);

  const [searchMember, setSearchMember] = useState('');

  // Join form state
  const [joinName, setJoinName] = useState('');
  const [joinEmail, setJoinEmail] = useState('');
  const [joinSuccess, setJoinSuccess] = useState(false);

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

  const toggleRsvp = (id: string) => {
    setEvents(events.map(ev => ev.id === id ? { ...ev, attending: !ev.attending, rsvps: ev.attending ? ev.rsvps - 1 : ev.rsvps + 1 } : ev));
  };

  return (
    <div className="min-h-[650px] bg-[#0d0a12] text-slate-100 font-sans flex flex-col md:flex-row rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
      {/* SIDEBAR */}
      <aside className={`fixed md:relative inset-y-0 left-0 z-40 w-64 bg-[#08050c] border-r border-white/10 flex flex-col transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6 text-fuchsia-400" />
            <span className="font-bold text-base tracking-wider text-white">NexusDAO</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 font-mono text-xs">
          {[
            { path: 'events', label: 'Events & RSVP', icon: Calendar },
            { path: 'members', label: 'Members Directory', icon: Users },
            { path: 'join', label: 'Join Community', icon: UserPlus },
            { path: 'announcements', label: 'Announcements', icon: Bell },
            { path: 'gallery', label: 'Photo Gallery', icon: Camera },
            { path: 'leaderboard', label: 'Points Leaderboard', icon: Trophy }
          ].map(item => {
            const Icon = item.icon;
            const isActive = currentHash === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${
                  isActive ? 'bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30 font-bold' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 bg-black/40">
          <div className="text-[10px] text-slate-500 font-mono">COMMUNITY HUB</div>
          <div className="text-xs font-bold text-fuchsia-400">1,420 Active Members</div>
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-[#08050c]/80 backdrop-blur-md border-b border-white/10 px-6 flex items-center justify-between z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg bg-white/5 text-white">☰</button>
            <span className="font-mono text-xs text-fuchsia-400 uppercase tracking-widest">[CLUBS & COMMUNITIES] / {currentHash}</span>
          </div>
          <button onClick={() => navigate('join')} className="px-4 py-2 rounded-xl bg-fuchsia-500 hover:bg-fuchsia-400 text-black font-bold text-xs font-mono shadow-lg">
            Join DAO
          </button>
        </header>

        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {currentHash === 'events' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-white">Upcoming Community Events</h1>
                <p className="text-xs text-slate-400 font-mono">RSVP to workshops, hack nights, and speaker sessions.</p>
              </div>

              <div className="space-y-4">
                {events.map(ev => (
                  <div key={ev.id} className="bg-[#13101c] border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-xs font-mono text-fuchsia-400">{ev.date}</span>
                      <h3 className="text-lg font-bold text-white">{ev.title}</h3>
                      <p className="text-xs text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> {ev.location} • {ev.rsvps} attending
                      </p>
                    </div>
                    <button
                      onClick={() => toggleRsvp(ev.id)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold font-mono transition-all ${
                        ev.attending ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-fuchsia-500 text-black hover:bg-fuchsia-400 shadow-lg'
                      }`}
                    >
                      {ev.attending ? '✓ RSVP Confirmed' : 'RSVP Now'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentHash === 'members' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black text-white">Members Directory</h1>
                  <p className="text-xs text-slate-400 font-mono">Connect with researchers, designers, and builders.</p>
                </div>
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search members..."
                    value={searchMember}
                    onChange={e => setSearchMember(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white outline-none focus:border-fuchsia-400 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {members.filter(m => m.name.toLowerCase().includes(searchMember.toLowerCase()) || m.role.toLowerCase().includes(searchMember.toLowerCase())).map(m => (
                  <div key={m.id} className="bg-[#13101c] border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center space-y-3">
                    <div className="w-16 h-16 rounded-full bg-fuchsia-500/20 border border-fuchsia-500/40 flex items-center justify-center font-bold text-lg text-fuchsia-300">
                      {m.avatar}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">{m.name}</h3>
                      <p className="text-xs text-slate-400">{m.role}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-white/5 font-mono text-xs text-fuchsia-400 border border-white/10">
                      ⭐ {m.points} pts
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentHash === 'join' && (
            <div className="space-y-6 max-w-xl">
              <div>
                <h1 className="text-2xl font-black text-white">Join the Community</h1>
                <p className="text-xs text-slate-400 font-mono">Become a verified member of NexusDAO.</p>
              </div>

              {joinSuccess ? (
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 text-center space-y-3">
                  <Check className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h3 className="text-lg font-bold text-white">Welcome Aboard, {joinName}!</h3>
                  <p className="text-xs text-slate-300 font-mono">Your membership application has been received. Check {joinEmail} for community Discord invites.</p>
                  <button onClick={() => setJoinSuccess(false)} className="px-4 py-2 bg-white/10 rounded-xl text-xs font-mono text-white">Reset</button>
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); if (joinName && joinEmail) setJoinSuccess(true); }} className="bg-[#13101c] border border-white/10 rounded-2xl p-6 space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Your Name</label>
                    <input type="text" required placeholder="Aria Stark" value={joinName} onChange={e => setJoinName(e.target.value)} className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-fuchsia-400" />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Email Address</label>
                    <input type="email" required placeholder="aria@domain.com" value={joinEmail} onChange={e => setJoinEmail(e.target.value)} className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-fuchsia-400" />
                  </div>
                  <button type="submit" className="w-full py-3 rounded-xl bg-fuchsia-500 hover:bg-fuchsia-400 text-black font-bold text-xs font-mono shadow-lg">
                    Submit Membership Application
                  </button>
                </form>
              )}
            </div>
          )}

          {currentHash === 'announcements' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-white">Community Announcements</h1>
                <p className="text-xs text-slate-400 font-mono">Latest governance proposals, grants, and updates.</p>
              </div>
              <div className="space-y-4">
                <div className="bg-[#13101c] border border-white/10 rounded-2xl p-6 space-y-2">
                  <span className="text-[10px] font-mono text-fuchsia-400 px-2 py-0.5 rounded bg-fuchsia-500/10">Governance Proposal #42</span>
                  <h3 className="text-base font-bold text-white">Q1 2027 Community Grant Allocation</h3>
                  <p className="text-xs text-slate-400">Voting is now live for allocating 50,000 NEXUS tokens to open-source developer tooling projects.</p>
                </div>
              </div>
            </div>
          )}

          {currentHash === 'gallery' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-white">Photo Gallery</h1>
                <p className="text-xs text-slate-400 font-mono">Snapshots from past hackathons and meetups.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="h-48 rounded-2xl bg-[#13101c] border border-white/10 flex items-center justify-center text-slate-500 font-mono text-xs">
                    [Meetup Photo {i}]
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentHash === 'leaderboard' && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h1 className="text-2xl font-black text-white">Points Leaderboard</h1>
                <p className="text-xs text-slate-400 font-mono">Top contributors in the community this month.</p>
              </div>
              <div className="bg-[#13101c] border border-white/10 rounded-2xl overflow-hidden">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-white/10 bg-black/40 font-mono text-slate-400">
                      <th className="p-4">Rank</th>
                      <th className="p-4">Member</th>
                      <th className="p-4">Role</th>
                      <th className="p-4 text-right">Points</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-mono">
                    {members.map((m, idx) => (
                      <tr key={m.id}>
                        <td className="p-4 text-fuchsia-400 font-bold">#{idx + 1}</td>
                        <td className="p-4 font-bold text-white font-sans">{m.name}</td>
                        <td className="p-4 text-slate-400">{m.role}</td>
                        <td className="p-4 text-right font-bold text-fuchsia-300">{m.points} pts</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
