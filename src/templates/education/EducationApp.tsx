import React, { useState, useEffect } from 'react';
import { BookOpen, FileText, UserCheck, Calculator, Newspaper, Search, Check } from 'lucide-react';

export const EducationApp: React.FC = () => {
  const [currentHash, setCurrentHash] = useState<string>(window.location.hash.replace('#/', '') || 'programs');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Fee calculator state
  const [credits, setCredits] = useState(15);
  const [housing, setHousing] = useState(true);

  // Application form
  const [applicantName, setApplicantName] = useState('');
  const [applicantProgram, setApplicantProgram] = useState('Computer Science B.S.');
  const [appSubmitted, setAppSubmitted] = useState(false);

  // Status check state
  const [searchId, setSearchId] = useState('');
  const [checkResult, setCheckResult] = useState<string | null>(null);

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

  const tuitionTotal = credits * 450 + (housing ? 4500 : 0);

  return (
    <div className="min-h-[650px] bg-[#090b10] text-slate-100 font-sans flex flex-col md:flex-row rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
      <aside className={`fixed md:relative inset-y-0 left-0 z-40 w-64 bg-[#05070a] border-r border-white/10 flex flex-col transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-400" />
            <span className="font-bold text-base tracking-wider text-white">Stanford Tech</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 font-mono text-xs">
          {[
            { path: 'programs', label: 'Programs & Degrees', icon: BookOpen },
            { path: 'admissions', label: 'Apply Online', icon: FileText },
            { path: 'faculty', label: 'Faculty Directory', icon: UserCheck },
            { path: 'fees', label: 'Fee Calculator', icon: Calculator },
            { path: 'news', label: 'Campus News', icon: Newspaper },
            { path: 'status', label: 'Check Application', icon: Search }
          ].map(item => {
            const Icon = item.icon;
            const isActive = currentHash === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${
                  isActive ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30 font-bold' : 'text-slate-400 hover:text-white hover:bg-white/5'
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
        <header className="h-16 bg-[#05070a]/80 backdrop-blur-md border-b border-white/10 px-6 flex items-center justify-between z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg bg-white/5 text-white">☰</button>
            <span className="font-mono text-xs text-blue-400 uppercase tracking-widest">[EDUCATION] / {currentHash}</span>
          </div>
          <button onClick={() => navigate('admissions')} className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-bold text-xs font-mono shadow-lg">
            Apply Now
          </button>
        </header>

        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {currentHash === 'programs' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-white">Degree Programs</h1>
                <p className="text-xs text-slate-400 font-mono">World-class undergraduate and graduate curricula.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: 'Computer Science B.S.', duration: '4 Years', desc: 'Core algorithms, artificial intelligence, and systems engineering.' },
                  { name: 'AI & Human Interaction M.S.', duration: '2 Years', desc: 'Advanced neural modeling and user experience design.' }
                ].map((p, i) => (
                  <div key={i} className="bg-[#11131d] border border-white/10 rounded-2xl p-6 space-y-2">
                    <span className="text-[10px] font-mono text-blue-400">{p.duration}</span>
                    <h3 className="text-lg font-bold text-white">{p.name}</h3>
                    <p className="text-xs text-slate-400">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentHash === 'admissions' && (
            <div className="space-y-6 max-w-xl">
              <div>
                <h1 className="text-2xl font-black text-white">Online Admissions Application</h1>
                <p className="text-xs text-slate-400 font-mono">Submit your credentials for Fall 2027 enrollment.</p>
              </div>

              {appSubmitted ? (
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 text-center space-y-3">
                  <Check className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h3 className="text-lg font-bold text-white">Application Received!</h3>
                  <p className="text-xs text-slate-300 font-mono">Thank you, {applicantName}. Your application ID is #APP-94821. You can track status on the status page.</p>
                  <button onClick={() => setAppSubmitted(false)} className="px-4 py-2 bg-white/10 rounded-xl text-xs font-mono text-white">Submit Another</button>
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); if (applicantName) setAppSubmitted(true); }} className="bg-[#11131d] border border-white/10 rounded-2xl p-6 space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Full Name</label>
                    <input type="text" required placeholder="Alexander Hamilton" value={applicantName} onChange={e => setApplicantName(e.target.value)} className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-blue-400" />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Intended Program</label>
                    <select value={applicantProgram} onChange={e => setApplicantProgram(e.target.value)} className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-blue-400 font-mono">
                      <option value="Computer Science B.S.">Computer Science B.S.</option>
                      <option value="AI & Human Interaction M.S.">AI & Human Interaction M.S.</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full py-3 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-bold text-xs font-mono shadow-lg">
                    Submit Application
                  </button>
                </form>
              )}
            </div>
          )}

          {currentHash === 'faculty' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-white">Faculty Directory</h1>
                <p className="text-xs text-slate-400 font-mono">Distinguished professors and department chairs.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: 'Dr. Alan Turing Jr.', title: 'Chair of Computer Science', dept: 'Artificial Intelligence' },
                  { name: 'Dr. Evelyn Vance', title: 'Professor of Human Factors', dept: 'Design Systems' }
                ].map((f, i) => (
                  <div key={i} className="bg-[#11131d] border border-white/10 rounded-2xl p-6 space-y-1">
                    <span className="text-[10px] font-mono text-blue-400">{f.dept}</span>
                    <h3 className="text-base font-bold text-white">{f.name}</h3>
                    <p className="text-xs text-slate-400">{f.title}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentHash === 'fees' && (
            <div className="space-y-6 max-w-xl">
              <div>
                <h1 className="text-2xl font-black text-white">Tuition & Fee Calculator</h1>
                <p className="text-xs text-slate-400 font-mono">Estimate semester expenses based on credit load.</p>
              </div>
              <div className="bg-[#11131d] border border-white/10 rounded-2xl p-6 space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Credit Hours ({credits} credits)</label>
                  <input type="range" min="3" max="21" value={credits} onChange={e => setCredits(Number(e.target.value))} className="w-full accent-blue-400" />
                </div>
                <div className="flex items-center justify-between py-2 border-t border-white/5">
                  <span className="text-xs text-slate-300">Campus Housing & Meal Plan ($4,500)</span>
                  <input type="checkbox" checked={housing} onChange={e => setHousing(e.target.checked)} className="accent-blue-400" />
                </div>
                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-between font-mono">
                  <span className="text-xs text-blue-300">Total Estimated Tuition:</span>
                  <span className="text-xl font-black text-white">${tuitionTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

          {currentHash === 'news' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-white">Campus News</h1>
                <p className="text-xs text-slate-400 font-mono">Recent announcements and research breakthroughs.</p>
              </div>
              <div className="bg-[#11131d] border border-white/10 rounded-2xl p-6 space-y-2">
                <span className="text-[10px] font-mono text-blue-400">November 20, 2026</span>
                <h3 className="text-base font-bold text-white">University Launches New Autonomous Agent Research Lab</h3>
                <p className="text-xs text-slate-400">A $15M grant establishes state-of-the-art computing facilities for undergraduate and graduate researchers.</p>
              </div>
            </div>
          )}

          {currentHash === 'status' && (
            <div className="space-y-6 max-w-xl">
              <div>
                <h1 className="text-2xl font-black text-white">Check Application Status</h1>
                <p className="text-xs text-slate-400 font-mono">Enter your application reference code.</p>
              </div>
              <div className="bg-[#11131d] border border-white/10 rounded-2xl p-6 space-y-4">
                <div className="flex gap-2">
                  <input type="text" placeholder="e.g. APP-94821" value={searchId} onChange={e => setSearchId(e.target.value)} className="flex-1 bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white font-mono outline-none focus:border-blue-400" />
                  <button onClick={() => setCheckResult(searchId ? 'Application Under Review by Admissions Committee' : 'Please enter valid ID')} className="px-4 py-2.5 bg-blue-500 text-white rounded-xl font-bold text-xs font-mono">Check</button>
                </div>
                {checkResult && (
                  <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-emerald-400">
                    Status: {checkResult}
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
