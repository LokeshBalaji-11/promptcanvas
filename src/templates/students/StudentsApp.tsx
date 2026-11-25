import React, { useState, useEffect } from 'react';
import { LayoutDashboard, BookOpen, FileText, GraduationCap, Calendar, User, CheckCircle2, Clock, Upload, ChevronRight, Search, AlertCircle } from 'lucide-react';

export const StudentsApp: React.FC = () => {
  const [currentHash, setCurrentHash] = useState<string>(window.location.hash.replace('#/', '') || 'dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Persistent Demo State
  const [user] = useState({ name: 'Alex Chen', email: 'alex.chen@university.edu', role: 'Demo account', gpa: '3.88' });
  const [courses, setCourses] = useState([
    { id: 'cs101', name: 'Advanced Neural Networks', code: 'CS-501', progress: 85, instructor: 'Dr. Evelyn Vance', category: 'AI / ML' },
    { id: 'ux202', name: 'Design Systems Architecture', code: 'UX-302', progress: 60, instructor: 'Prof. Marcus Brody', category: 'Design' },
    { id: 'math303', name: 'Probabilistic Graph Models', code: 'MTH-410', progress: 40, instructor: 'Dr. Alan Turing Jr.', category: 'Mathematics' }
  ]);

  const [assignments, setAssignments] = useState([
    { id: 'a1', title: 'Transformer Attention Mechanism Implementation', course: 'CS-501', dueDate: '2026-12-01', status: 'pending', file: '', note: '' },
    { id: 'a2', title: 'Token & Component Design Token Audit', course: 'UX-302', dueDate: '2026-12-05', status: 'submitted', file: 'design-tokens-audit.pdf', note: 'Completed with WCAG AA compliance check.' },
    { id: 'a3', title: 'Markov Random Field Proofs', course: 'MTH-410', dueDate: '2026-11-20', status: 'graded', score: '98/100', file: 'proofs.pdf', note: 'Excellent derivations.' }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [submittingId, setSubmittingId] = useState<string | null>(null);
  const [fileNameInput, setFileNameInput] = useState('');
  const [noteInput, setNoteInput] = useState('');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '');
      if (hash) setCurrentHash(hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string) => {
    window.location.hash = `#/${path}`;
    setCurrentHash(path);
    setMobileMenuOpen(false);
  };

  const handleAssignmentSubmit = (e: React.FormEvent, id: string) => {
    e.preventDefault();
    setAssignments(assignments.map(a => a.id === id ? { ...a, status: 'submitted', file: fileNameInput || 'submission.zip', note: noteInput } : a));
    setSubmittingId(null);
    setFileNameInput('');
    setNoteInput('');
  };

  const markCourseComplete = (id: string) => {
    setCourses(courses.map(c => c.id === id ? { ...c, progress: 100 } : c));
  };

  return (
    <div className="min-h-[650px] bg-[#090a0f] text-slate-100 font-sans flex flex-col md:flex-row rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
      {/* SIDEBAR */}
      <aside className={`fixed md:relative inset-y-0 left-0 z-40 w-64 bg-[#050609] border-r border-white/10 flex flex-col transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-cyan-400" />
            <span className="font-bold text-base tracking-wider text-white">AcademiaOS</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 font-mono text-xs">
          {[
            { path: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { path: 'courses', label: 'Courses Catalog', icon: BookOpen },
            { path: 'assignments', label: 'Assignments', icon: FileText },
            { path: 'grades', label: 'Grades & GPA', icon: GraduationCap },
            { path: 'calendar', label: 'Timetable', icon: Calendar },
            { path: 'profile', label: 'Demo Profile', icon: User }
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
          <div className="text-[10px] text-slate-500 font-mono">LOGGED IN AS (DEMO)</div>
          <div className="text-xs font-bold text-white truncate">{user.name}</div>
          <div className="text-[10px] text-cyan-400 font-mono">{user.email}</div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOPBAR */}
        <header className="h-16 bg-[#050609]/80 backdrop-blur-md border-b border-white/10 px-6 flex items-center justify-between z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg bg-white/5 text-white">
              ☰
            </button>
            <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest">[STUDENT PORTAL] / {currentHash}</span>
          </div>
          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">GPA: {user.gpa}</span>
            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400">Demo account</span>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {currentHash === 'dashboard' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-white">Welcome back, {user.name}</h1>
                <p className="text-xs text-slate-400 font-mono mt-1">Semester active • 3 courses enrolled • 1 pending deadline</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#12131a] border border-white/10 rounded-2xl p-6">
                  <div className="text-xs text-slate-400 font-mono mb-2">Overall Progress</div>
                  <div className="text-3xl font-black text-white mb-2">75%</div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-400 w-3/4 rounded-full" />
                  </div>
                </div>
                <div className="bg-[#12131a] border border-white/10 rounded-2xl p-6">
                  <div className="text-xs text-slate-400 font-mono mb-2">Assignments Due</div>
                  <div className="text-3xl font-black text-amber-400 mb-2">1 Pending</div>
                  <div className="text-xs text-slate-400">Transformer Attention (Due Dec 1)</div>
                </div>
                <div className="bg-[#12131a] border border-white/10 rounded-2xl p-6">
                  <div className="text-xs text-slate-400 font-mono mb-2">Current Standing</div>
                  <div className="text-3xl font-black text-emerald-400 mb-2">Dean's List</div>
                  <div className="text-xs text-slate-400">GPA 3.88 / 4.00</div>
                </div>
              </div>

              <div className="bg-[#12131a] border border-white/10 rounded-2xl p-6">
                <h3 className="text-sm font-bold text-white mb-4">Enrolled Courses Quick View</h3>
                <div className="space-y-4">
                  {courses.map(c => (
                    <div key={c.id} className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-white/5">
                      <div>
                        <span className="text-[10px] font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10">{c.code}</span>
                        <h4 className="text-sm font-bold text-white mt-1">{c.name}</h4>
                        <span className="text-xs text-slate-400">Instructor: {c.instructor}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right font-mono text-xs">
                          <span className="text-slate-400">{c.progress}% complete</span>
                        </div>
                        <button onClick={() => navigate('courses')} className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-white">
                          View →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentHash === 'courses' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black text-white">Courses Catalog</h1>
                  <p className="text-xs text-slate-400 font-mono">Browse and manage your registered semester courses.</p>
                </div>
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white outline-none focus:border-cyan-400 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.code.toLowerCase().includes(searchQuery.toLowerCase())).map(c => (
                  <div key={c.id} className="bg-[#12131a] border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2 py-1 rounded bg-cyan-500/10 text-cyan-400 font-mono text-[10px]">{c.code}</span>
                        <span className="text-xs text-slate-400 font-mono">{c.category}</span>
                      </div>
                      <h3 className="text-base font-bold text-white mb-2">{c.name}</h3>
                      <p className="text-xs text-slate-400 mb-4">Taught by {c.instructor}</p>
                      <div className="space-y-1 mb-6">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-slate-400">Progress</span>
                          <span className="text-cyan-400">{c.progress}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${c.progress}%` }} />
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => markCourseComplete(c.id)}
                      className="w-full py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs font-mono transition-all"
                    >
                      {c.progress === 100 ? 'Completed ✓' : 'Mark Lesson Complete'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentHash === 'assignments' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-white">Assignments & Submissions</h1>
                <p className="text-xs text-slate-400 font-mono">Upload coursework and track grading status.</p>
              </div>

              <div className="space-y-4">
                {assignments.map(a => (
                  <div key={a.id} className="bg-[#12131a] border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="px-2 py-0.5 rounded bg-white/5 text-cyan-400 font-mono text-[10px]">{a.course}</span>
                        <span className={`px-2 py-0.5 rounded font-mono text-[10px] uppercase ${
                          a.status === 'graded' ? 'bg-emerald-500/20 text-emerald-400' :
                          a.status === 'submitted' ? 'bg-blue-500/20 text-blue-400' : 'bg-amber-500/20 text-amber-400'
                        }`}>
                          {a.status} {a.score ? `(${a.score})` : ''}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white">{a.title}</h3>
                      <p className="text-xs text-slate-400 font-mono">Due date: {a.dueDate} {a.file ? `• Attached: ${a.file}` : ''}</p>
                      {a.note && <p className="text-xs text-slate-300 italic">Note: "{a.note}"</p>}
                    </div>

                    <div>
                      {a.status === 'pending' && submittingId !== a.id && (
                        <button
                          onClick={() => setSubmittingId(a.id)}
                          className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs font-mono flex items-center gap-2"
                        >
                          <Upload className="w-3.5 h-3.5" /> Submit Assignment
                        </button>
                      )}
                      {submittingId === a.id && (
                        <form onSubmit={(e) => handleAssignmentSubmit(e, a.id)} className="flex flex-col gap-2 bg-black/60 p-4 rounded-xl border border-white/10 w-full md:w-80">
                          <input
                            type="text"
                            placeholder="File name (e.g. solution.pdf)"
                            value={fileNameInput}
                            onChange={e => setFileNameInput(e.target.value)}
                            required
                            className="bg-black border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white font-mono"
                          />
                          <input
                            type="text"
                            placeholder="Optional submission note..."
                            value={noteInput}
                            onChange={e => setNoteInput(e.target.value)}
                            className="bg-black border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                          />
                          <div className="flex gap-2 justify-end mt-1">
                            <button type="button" onClick={() => setSubmittingId(null)} className="px-3 py-1 text-xs text-slate-400">Cancel</button>
                            <button type="submit" className="px-3 py-1 bg-cyan-500 text-black rounded font-bold text-xs">Upload & Submit</button>
                          </div>
                        </form>
                      )}
                      {a.status !== 'pending' && submittingId !== a.id && (
                        <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Submitted
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentHash === 'grades' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-white">Grades & Cumulative GPA</h1>
                <p className="text-xs text-slate-400 font-mono">Academic transcript and course performance summary.</p>
              </div>

              <div className="bg-[#12131a] border border-white/10 rounded-2xl overflow-hidden">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-white/10 bg-black/40 font-mono text-slate-400">
                      <th className="p-4">Course Code</th>
                      <th className="p-4">Course Name</th>
                      <th className="p-4">Credits</th>
                      <th className="p-4">Grade</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr>
                      <td className="p-4 font-mono text-cyan-400">CS-501</td>
                      <td className="p-4 font-bold text-white">Advanced Neural Networks</td>
                      <td className="p-4 font-mono">4.0</td>
                      <td className="p-4 font-mono font-bold text-emerald-400">A (96%)</td>
                      <td className="p-4 font-mono text-emerald-400">Passed</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-mono text-cyan-400">UX-302</td>
                      <td className="p-4 font-bold text-white">Design Systems Architecture</td>
                      <td className="p-4 font-mono">3.5</td>
                      <td className="p-4 font-mono font-bold text-emerald-400">A- (92%)</td>
                      <td className="p-4 font-mono text-emerald-400">Passed</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-mono text-cyan-400">MTH-410</td>
                      <td className="p-4 font-bold text-white">Probabilistic Graph Models</td>
                      <td className="p-4 font-mono">4.0</td>
                      <td className="p-4 font-mono font-bold text-emerald-400">A+ (99%)</td>
                      <td className="p-4 font-mono text-emerald-400">Passed</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {currentHash === 'calendar' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-white">Academic Timetable</h1>
                <p className="text-xs text-slate-400 font-mono">Weekly lecture and lab schedule.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day, i) => (
                  <div key={day} className="bg-[#12131a] border border-white/10 rounded-2xl p-4 space-y-3">
                    <div className="font-mono text-xs font-bold text-cyan-400">{day}</div>
                    <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                      <div className="text-xs font-bold text-white">CS-501 Lecture</div>
                      <div className="text-[10px] font-mono text-slate-400">10:00 AM - 11:30 AM</div>
                      <div className="text-[10px] text-slate-500">Hall 4B</div>
                    </div>
                    {i % 2 === 0 && (
                      <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                        <div className="text-xs font-bold text-white">UX-302 Studio</div>
                        <div className="text-[10px] font-mono text-slate-400">02:00 PM - 05:00 PM</div>
                        <div className="text-[10px] text-slate-500">Lab 2</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentHash === 'profile' && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h1 className="text-2xl font-black text-white">Student Profile (Demo)</h1>
                <p className="text-xs text-slate-400 font-mono">Local session state and preferences.</p>
              </div>
              <div className="bg-[#12131a] border border-white/10 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-4 pb-4 border-b border-white/10">
                  <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-xl font-bold text-cyan-400">
                    AC
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{user.name}</h3>
                    <p className="text-xs text-slate-400 font-mono">{user.email}</p>
                    <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-mono">
                      {user.role}
                    </span>
                  </div>
                </div>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-slate-400">Student ID</span>
                    <span className="text-white">STU-884920</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-slate-400">Major</span>
                    <span className="text-white">Artificial Intelligence & Design</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-slate-400">Session Persistence</span>
                    <span className="text-emerald-400">Active (localStorage)</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
