import React, { useState, useEffect } from 'react';
import { Heart, DollarSign, Activity, UserPlus, BookOpen, Check } from 'lucide-react';

export const NonprofitApp: React.FC = () => {
  const [currentHash, setCurrentHash] = useState<string>(window.location.hash.replace('#/', '') || 'campaigns');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Donate flow state
  const [donationAmount, setDonationAmount] = useState<number>(50);
  const [isMonthly, setIsMonthly] = useState(false);
  const [donorName, setDonorName] = useState('');
  const [donated, setDonated] = useState(false);

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
    <div className="min-h-[650px] bg-[#0a0f0d] text-slate-100 font-sans flex flex-col md:flex-row rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
      <aside className={`fixed md:relative inset-y-0 left-0 z-40 w-64 bg-[#050a08] border-r border-white/10 flex flex-col transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-emerald-400 fill-emerald-400" />
            <span className="font-bold text-base tracking-wider text-white">EarthRelief</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 font-mono text-xs">
          {[
            { path: 'campaigns', label: 'Active Campaigns', icon: Heart },
            { path: 'donate', label: 'Donate Flow', icon: DollarSign },
            { path: 'impact', label: 'Impact Dashboard', icon: Activity },
            { path: 'volunteer', label: 'Volunteer Signup', icon: UserPlus },
            { path: 'stories', label: 'Success Stories', icon: BookOpen }
          ].map(item => {
            const Icon = item.icon;
            const isActive = currentHash === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${
                  isActive ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold' : 'text-slate-400 hover:text-white hover:bg-white/5'
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
        <header className="h-16 bg-[#050a08]/80 backdrop-blur-md border-b border-white/10 px-6 flex items-center justify-between z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg bg-white/5 text-white">☰</button>
            <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest">[NONPROFIT] / {currentHash}</span>
          </div>
          <button onClick={() => navigate('donate')} className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs font-mono shadow-lg">
            Donate Now
          </button>
        </header>

        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {currentHash === 'campaigns' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-white">Active Relief Campaigns</h1>
                <p className="text-xs text-slate-400 font-mono">Direct aid and community development worldwide.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#121a16] border border-white/10 rounded-2xl p-6 space-y-4">
                  <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10">Clean Water Initiative</span>
                  <h3 className="text-lg font-bold text-white">Solar Wells in East Africa</h3>
                  <p className="text-xs text-slate-400">Providing sustainable solar-powered clean water access to 15 rural villages.</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono"><span className="text-slate-400">Raised: $84,200</span><span className="text-emerald-400">84%</span></div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-emerald-400 w-[84%] rounded-full" /></div>
                  </div>
                  <button onClick={() => navigate('donate')} className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold font-mono text-xs rounded-xl">Support Campaign</button>
                </div>
              </div>
            </div>
          )}

          {currentHash === 'donate' && (
            <div className="space-y-6 max-w-xl">
              <div>
                <h1 className="text-2xl font-black text-white">Support Our Mission</h1>
                <p className="text-xs text-slate-400 font-mono">100% of public donations go directly to field operations.</p>
              </div>

              {donated ? (
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 text-center space-y-3">
                  <Check className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h3 className="text-lg font-bold text-white">Thank You for Your Generosity!</h3>
                  <p className="text-xs text-slate-300 font-mono">Your gift of ${donationAmount} {isMonthly ? 'monthly' : 'one-time'} makes a profound impact.</p>
                  <button onClick={() => setDonated(false)} className="px-4 py-2 bg-white/10 rounded-xl text-xs font-mono text-white">Make Another Gift</button>
                </div>
              ) : (
                <div className="bg-[#121a16] border border-white/10 rounded-2xl p-6 space-y-6">
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <button onClick={() => setIsMonthly(false)} className={`flex-1 py-2 rounded-xl ${!isMonthly ? 'bg-emerald-500 text-black font-bold' : 'bg-white/5 text-slate-400'}`}>One-Time</button>
                    <button onClick={() => setIsMonthly(true)} className={`flex-1 py-2 rounded-xl ${isMonthly ? 'bg-emerald-500 text-black font-bold' : 'bg-white/5 text-slate-400'}`}>Monthly (Impact+)</button>
                  </div>

                  <div className="grid grid-cols-4 gap-3">
                    {[25, 50, 100, 250].map(amt => (
                      <button key={amt} onClick={() => setDonationAmount(amt)} className={`py-3 rounded-xl font-mono font-bold text-sm border ${donationAmount === amt ? 'bg-emerald-500 text-black border-emerald-400' : 'bg-black/40 text-white border-white/10'}`}>
                        ${amt}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono text-slate-300">Donor Name</label>
                    <input type="text" placeholder="Jane Doe" value={donorName} onChange={e => setDonorName(e.target.value)} className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-emerald-400" />
                  </div>

                  <button onClick={() => setDonated(true)} className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold font-mono text-xs shadow-lg">
                    Complete ${donationAmount} Gift
                  </button>
                </div>
              )}
            </div>
          )}

          {currentHash === 'impact' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-white">Global Impact Dashboard</h1>
                <p className="text-xs text-slate-400 font-mono">Real-time metrics from our active regions.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#121a16] border border-white/10 rounded-2xl p-6 space-y-2">
                  <div className="text-xs font-mono text-slate-400">People Served</div>
                  <div className="text-3xl font-black text-emerald-400 font-mono">142,850</div>
                </div>
                <div className="bg-[#121a16] border border-white/10 rounded-2xl p-6 space-y-2">
                  <div className="text-xs font-mono text-slate-400">Solar Wells Built</div>
                  <div className="text-3xl font-black text-emerald-400 font-mono">84</div>
                </div>
                <div className="bg-[#121a16] border border-white/10 rounded-2xl p-6 space-y-2">
                  <div className="text-xs font-mono text-slate-400">Trees Planted</div>
                  <div className="text-3xl font-black text-emerald-400 font-mono">1.2M</div>
                </div>
              </div>
            </div>
          )}

          {currentHash === 'volunteer' && (
            <div className="space-y-6 max-w-xl">
              <div>
                <h1 className="text-2xl font-black text-white">Volunteer Signup</h1>
                <p className="text-xs text-slate-400 font-mono">Join our global network of field volunteers.</p>
              </div>
              <form onSubmit={e => { e.preventDefault(); alert('Volunteer application submitted successfully!'); }} className="bg-[#121a16] border border-white/10 rounded-2xl p-6 space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Full Name</label>
                  <input type="text" required placeholder="John Smith" className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-emerald-400" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Area of Expertise</label>
                  <select className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white font-mono outline-none">
                    <option>Clean Water Engineering</option>
                    <option>Medical & Healthcare</option>
                    <option>Logistics & Operations</option>
                  </select>
                </div>
                <button type="submit" className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs font-mono">
                  Register as Volunteer
                </button>
              </form>
            </div>
          )}

          {currentHash === 'stories' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-white">Success Stories</h1>
                <p className="text-xs text-slate-400 font-mono">First-hand accounts from communities transformed by your support.</p>
              </div>
              <div className="bg-[#121a16] border border-white/10 rounded-2xl p-6 space-y-2">
                <span className="text-[10px] font-mono text-emerald-400">Turkana Village, Kenya</span>
                <h3 className="text-base font-bold text-white">"Water Changed Everything for Our School"</h3>
                <p className="text-xs text-slate-400">Before the solar well installation, children walked 6 miles daily for water. Attendance has now risen by 100%.</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
