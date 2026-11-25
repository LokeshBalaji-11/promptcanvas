import React, { useState, useEffect } from 'react';
import { Briefcase, Zap, CreditCard, Calculator, FileSpreadsheet, CalendarCheck, Mail, Check, ArrowRight, DollarSign, Building, Sparkles } from 'lucide-react';

export const BusinessApp: React.FC = () => {
  const [currentHash, setCurrentHash] = useState<string>(window.location.hash.replace('#/', '') || 'solutions');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Business state
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'yearly'>('monthly');
  const [teamSize, setTeamSize] = useState<number>(50);
  const [avgHourlyRate, setAvgHourlyRate] = useState<number>(45);

  // Demo Booking State
  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Contact Sales State
  const [contactMessage, setContactMessage] = useState('');
  const [contactSent, setContactSent] = useState(false);

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

  // ROI Math
  const hoursSavedPerWeekPerPerson = 4;
  const annualSavings = teamSize * hoursSavedPerWeekPerPerson * 52 * avgHourlyRate;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName || !bookingEmail || !bookingDate) return;
    setBookingSuccess(true);
  };

  return (
    <div className="min-h-[650px] bg-[#0b0c10] text-slate-100 font-sans flex flex-col md:flex-row rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
      {/* SIDEBAR */}
      <aside className={`fixed md:relative inset-y-0 left-0 z-40 w-64 bg-[#07080c] border-r border-white/10 flex flex-col transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-cyan-400" />
            <span className="font-bold text-base tracking-wider text-white">EnterpriseOS</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 font-mono text-xs">
          {[
            { path: 'solutions', label: 'Solutions', icon: Briefcase },
            { path: 'features', label: 'Features', icon: Zap },
            { path: 'pricing', label: 'Pricing & Tiers', icon: CreditCard },
            { path: 'roi', label: 'ROI Calculator', icon: Calculator },
            { path: 'cases', label: 'Case Studies', icon: FileSpreadsheet },
            { path: 'demo', label: 'Book Demo', icon: CalendarCheck },
            { path: 'contact', label: 'Contact Sales', icon: Mail }
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

        <div className="p-4 border-t border-white/10 bg-black/40">
          <div className="text-[10px] text-slate-500 font-mono">ENTERPRISE PORTAL</div>
          <div className="text-xs font-bold text-white">Demo account (SaaS)</div>
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-[#07080c]/80 backdrop-blur-md border-b border-white/10 px-6 flex items-center justify-between z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg bg-white/5 text-white">☰</button>
            <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest">[B2B ENTERPRISE] / {currentHash}</span>
          </div>
          <button onClick={() => navigate('demo')} className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs font-mono shadow-lg">
            Schedule Demo
          </button>
        </header>

        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {currentHash === 'solutions' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-black text-white">Accelerate B2B Operations with AI</h1>
                <p className="text-xs text-slate-400 font-mono mt-1">Trusted by 4,500+ global enterprises for secure workflow automation.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: 'Financial Services', desc: 'Automated compliance auditing and secure document ingestion.' },
                  { title: 'Healthcare & Pharma', desc: 'HIPAA-compliant analytics and real-time patient record pipelines.' },
                  { title: 'Global Logistics', desc: 'Supply chain predictive modeling and multi-region routing.' }
                ].map((s, i) => (
                  <div key={i} className="bg-[#12131c] border border-white/10 rounded-2xl p-6 space-y-3">
                    <Building className="w-6 h-6 text-cyan-400" />
                    <h3 className="text-base font-bold text-white">{s.title}</h3>
                    <p className="text-xs text-slate-400">{s.desc}</p>
                    <button onClick={() => navigate('cases')} className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1 pt-2">
                      Read Case Study <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentHash === 'features' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-white">Platform Features</h1>
                <p className="text-xs text-slate-400 font-mono">Enterprise-grade security, lightning-fast inference, and granular RBAC.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: 'Zero-Data Retention', desc: 'Your prompts and data are never used for model training.' },
                  { title: 'Real-Time Sync', desc: 'Sub-millisecond synchronization across distributed teams.' },
                  { title: 'Advanced RBAC', desc: 'Granular permissions down to the individual workspace and API key.' },
                  { title: '99.99% SLA Uptime', desc: 'Enterprise redundancy with automatic geo-failover.' }
                ].map((f, i) => (
                  <div key={i} className="bg-[#12131c] border border-white/10 rounded-2xl p-6 space-y-2">
                    <Zap className="w-5 h-5 text-amber-400" />
                    <h3 className="text-base font-bold text-white">{f.title}</h3>
                    <p className="text-xs text-slate-400">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentHash === 'pricing' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black text-white">Transparent Pricing</h1>
                  <p className="text-xs text-slate-400 font-mono">Scale securely with predictable enterprise pricing.</p>
                </div>
                <div className="flex items-center gap-2 bg-black/50 p-1.5 rounded-xl border border-white/10 font-mono text-xs">
                  <button onClick={() => setBillingInterval('monthly')} className={`px-3 py-1.5 rounded-lg ${billingInterval === 'monthly' ? 'bg-cyan-500 text-black font-bold' : 'text-slate-400'}`}>Monthly</button>
                  <button onClick={() => setBillingInterval('yearly')} className={`px-3 py-1.5 rounded-lg ${billingInterval === 'yearly' ? 'bg-cyan-500 text-black font-bold' : 'text-slate-400'}`}>Yearly (Save 20%)</button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: 'Starter', price: billingInterval === 'monthly' ? '$49' : '$39', desc: 'For growing teams and startups.', features: ['Up to 10 seats', 'Standard SLA', 'Community support'] },
                  { name: 'Professional', price: billingInterval === 'monthly' ? '$199' : '$159', desc: 'For scaling mid-market businesses.', features: ['Up to 50 seats', 'Priority 99.9% uptime', 'Dedicated account manager'], popular: true },
                  { name: 'Enterprise', price: 'Custom', desc: 'For large global organizations.', features: ['Unlimited seats', 'Custom SSO & SAML', 'On-premise deployment option'] }
                ].map((p, i) => (
                  <div key={i} className={`bg-[#12131c] border rounded-2xl p-6 flex flex-col justify-between relative ${p.popular ? 'border-cyan-500 shadow-xl shadow-cyan-500/10' : 'border-white/10'}`}>
                    {p.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-cyan-500 text-black font-mono text-[10px] font-bold">MOST POPULAR</span>}
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{p.name}</h3>
                      <p className="text-xs text-slate-400 mb-4">{p.desc}</p>
                      <div className="text-3xl font-black text-white mb-6 font-mono">{p.price}<span className="text-xs font-normal text-slate-400">/mo</span></div>
                      <ul className="space-y-2 mb-6 text-xs text-slate-300 font-mono">
                        {p.features.map((feat, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-cyan-400" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button onClick={() => navigate('demo')} className={`w-full py-2.5 rounded-xl text-xs font-bold font-mono transition-all ${p.popular ? 'bg-cyan-500 text-black hover:bg-cyan-400' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                      Get Started
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentHash === 'roi' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h1 className="text-2xl font-black text-white">Interactive ROI Calculator</h1>
                <p className="text-xs text-slate-400 font-mono">Calculate your team's estimated financial return from workflow automation.</p>
              </div>

              <div className="bg-[#12131c] border border-white/10 rounded-2xl p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs text-slate-300 font-mono">Team Size ({teamSize} employees)</label>
                    <input
                      type="range"
                      min="5"
                      max="500"
                      value={teamSize}
                      onChange={e => setTeamSize(Number(e.target.value))}
                      className="w-full accent-cyan-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-slate-300 font-mono">Avg Hourly Rate (${avgHourlyRate}/hr)</label>
                    <input
                      type="range"
                      min="20"
                      max="200"
                      value={avgHourlyRate}
                      onChange={e => setAvgHourlyRate(Number(e.target.value))}
                      className="w-full accent-cyan-400"
                    />
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Estimated Annual Savings</div>
                    <div className="text-3xl font-black text-white mt-1 font-mono">${annualSavings.toLocaleString()}</div>
                  </div>
                  <button onClick={() => navigate('demo')} className="px-5 py-3 rounded-xl bg-cyan-500 text-black font-bold text-xs font-mono shadow-lg hover:bg-cyan-400">
                    Capture ROI Now
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentHash === 'cases' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-white">Enterprise Case Studies</h1>
                <p className="text-xs text-slate-400 font-mono">Proven success stories across Fortune 500 companies.</p>
              </div>

              <div className="space-y-4">
                {[
                  { company: 'Global Fintech Corp', metric: '4.2x Faster Compliance Audits', desc: 'Automated 90% of manual reporting pipelines with zero security incidents.' },
                  { company: 'HealthSecure Systems', metric: '65% Reduction in Data Retrieval Latency', desc: 'Streamlined patient records access across 40 regional hospitals.' }
                ].map((c, i) => (
                  <div key={i} className="bg-[#12131c] border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-xs font-mono text-cyan-400">{c.company}</span>
                      <h3 className="text-lg font-bold text-white">{c.metric}</h3>
                      <p className="text-xs text-slate-400">{c.desc}</p>
                    </div>
                    <button onClick={() => navigate('demo')} className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-mono text-xs border border-white/10">
                      Read Full Story →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentHash === 'demo' && (
            <div className="space-y-6 max-w-xl">
              <div>
                <h1 className="text-2xl font-black text-white">Book an Enterprise Demo</h1>
                <p className="text-xs text-slate-400 font-mono">Schedule a personalized walkthrough with our solution architects.</p>
              </div>

              {bookingSuccess ? (
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 text-center space-y-3">
                  <Check className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h3 className="text-lg font-bold text-white">Demo Booked Successfully!</h3>
                  <p className="text-xs text-slate-300 font-mono">We have sent a calendar invite to {bookingEmail} for {bookingDate}.</p>
                  <button onClick={() => setBookingSuccess(false)} className="px-4 py-2 bg-white/10 rounded-xl text-xs font-mono text-white">Book Another</button>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="bg-[#12131c] border border-white/10 rounded-2xl p-6 space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={bookingName}
                      onChange={e => setBookingName(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Corporate Email</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={bookingEmail}
                      onChange={e => setBookingEmail(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Preferred Date & Time</label>
                    <input
                      type="datetime-local"
                      required
                      value={bookingDate}
                      onChange={e => setBookingDate(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-cyan-400 font-mono"
                    />
                  </div>
                  <button type="submit" className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs font-mono shadow-lg transition-all">
                    Confirm Booking
                  </button>
                </form>
              )}
            </div>
          )}

          {currentHash === 'contact' && (
            <div className="space-y-6 max-w-xl">
              <div>
                <h1 className="text-2xl font-black text-white">Contact Sales</h1>
                <p className="text-xs text-slate-400 font-mono">Speak with an enterprise specialist today.</p>
              </div>

              {contactSent ? (
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 text-center space-y-2">
                  <Check className="w-8 h-8 text-emerald-400 mx-auto" />
                  <h3 className="text-base font-bold text-white">Message Sent!</h3>
                  <p className="text-xs text-slate-300 font-mono">An enterprise rep will contact you within 2 hours.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setContactSent(true); }} className="bg-[#12131c] border border-white/10 rounded-2xl p-6 space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Work Email</label>
                    <input type="email" required placeholder="name@company.com" className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-cyan-400" />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Message / Requirements</label>
                    <textarea rows={4} required placeholder="Tell us about your team size and infrastructure requirements..." value={contactMessage} onChange={e => setContactMessage(e.target.value)} className="w-full bg-black/60 border border-white/10 rounded-xl p-4 text-xs text-white outline-none focus:border-cyan-400" />
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
