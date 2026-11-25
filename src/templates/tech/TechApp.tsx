import React, { useState, useEffect } from 'react';
import { Book, Terminal, Activity, Tag, GitPullRequest, Play, Check } from 'lucide-react';

export const TechApp: React.FC = () => {
  const [currentHash, setCurrentHash] = useState<string>(window.location.hash.replace('#/', '') || 'docs');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // API Playground state
  const [apiKey, setApiKey] = useState('pc_live_99812938491');
  const [apiPrompt, setApiPrompt] = useState('Generate an enterprise multi-agent workflow');
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [loadingApi, setLoadingApi] = useState(false);

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

  const runPlayground = () => {
    setLoadingApi(true);
    setApiResponse(null);
    setTimeout(() => {
      setLoadingApi(false);
      setApiResponse(JSON.stringify({
        status: 200,
        model: "claude-3-5-sonnet",
        usage: { prompt_tokens: 42, completion_tokens: 128 },
        output: "Successfully generated enterprise multi-agent workflow graph with 14 nodes and 18 edges."
      }, null, 2));
    }, 600);
  };

  return (
    <div className="min-h-[650px] bg-[#07090f] text-slate-100 font-sans flex flex-col md:flex-row rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
      <aside className={`fixed md:relative inset-y-0 left-0 z-40 w-64 bg-[#040508] border-r border-white/10 flex flex-col transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-6 h-6 text-cyan-400" />
            <span className="font-bold text-base tracking-wider text-white">CloudAPI v3</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 font-mono text-xs">
          {[
            { path: 'docs', label: 'Documentation', icon: Book },
            { path: 'playground', label: 'API Playground', icon: Terminal },
            { path: 'status', label: 'System Status', icon: Activity },
            { path: 'pricing', label: 'Pricing Plans', icon: Tag },
            { path: 'changelog', label: 'Release Notes', icon: GitPullRequest }
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
        <header className="h-16 bg-[#040508]/80 backdrop-blur-md border-b border-white/10 px-6 flex items-center justify-between z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg bg-white/5 text-white">☰</button>
            <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest">[TECH / SAAS] / {currentHash}</span>
          </div>
          <button onClick={() => navigate('playground')} className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs font-mono shadow-lg">
            API Playground
          </button>
        </header>

        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {currentHash === 'docs' && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h1 className="text-2xl font-black text-white">API Quickstart Guide</h1>
                <p className="text-xs text-slate-400 font-mono">Integrate CloudAPI in under 5 minutes.</p>
              </div>
              <div className="bg-[#10121c] border border-white/10 rounded-2xl p-6 space-y-4 font-mono text-xs">
                <p className="text-slate-300 font-sans">Install the official client SDK:</p>
                <pre className="p-3 bg-black/60 rounded-xl text-cyan-400 border border-white/5">npm install @cloudapi/sdk</pre>
                <p className="text-slate-300 font-sans">Initialize client and execute query:</p>
                <pre className="p-3 bg-black/60 rounded-xl text-slate-300 border border-white/5 overflow-x-auto">
{`import { CloudAPI } from '@cloudapi/sdk';
const client = new CloudAPI({ apiKey: process.env.CLOUD_API_KEY });
const response = await client.complete({ prompt: 'Hello World' });`}
                </pre>
              </div>
            </div>
          )}

          {currentHash === 'playground' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-white">Interactive API Playground</h1>
                <p className="text-xs text-slate-400 font-mono">Test API requests and inspect live JSON responses.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#10121c] border border-white/10 rounded-2xl p-6 space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">API Key</label>
                    <input type="text" value={apiKey} onChange={e => setApiKey(e.target.value)} className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2 text-xs text-cyan-400 font-mono outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Prompt / Payload</label>
                    <textarea rows={3} value={apiPrompt} onChange={e => setApiPrompt(e.target.value)} className="w-full bg-black/60 border border-white/10 rounded-xl p-4 text-xs text-white font-mono outline-none" />
                  </div>
                  <button onClick={runPlayground} disabled={loadingApi} className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold font-mono text-xs rounded-xl flex items-center justify-center gap-2">
                    <Play className="w-4 h-4 fill-black" /> {loadingApi ? 'Executing Request...' : 'Send API Request'}
                  </button>
                </div>

                <div className="bg-[#10121c] border border-white/10 rounded-2xl p-6 flex flex-col">
                  <span className="text-xs font-mono text-slate-400 mb-2">Response Output</span>
                  <pre className="flex-1 p-4 bg-black/80 rounded-xl border border-white/5 font-mono text-xs text-emerald-400 overflow-x-auto">
                    {loadingApi ? 'Waiting for response...' : (apiResponse || '// Click Send API Request to test endpoint')}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {currentHash === 'status' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-white">System Status</h1>
                <p className="text-xs text-slate-400 font-mono">All systems operational across US-East, EU-Central, and AP-South.</p>
              </div>
              <div className="bg-[#10121c] border border-white/10 rounded-2xl p-6 space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between py-2 border-b border-white/5">
                  <span className="text-white">API Inference Engine</span>
                  <span className="text-emerald-400 flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> 99.99% Operational</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-white/5">
                  <span className="text-white">Vector Database Cluster</span>
                  <span className="text-emerald-400 flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> 99.98% Operational</span>
                </div>
              </div>
            </div>
          )}

          {currentHash === 'pricing' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-white">API Pricing</h1>
                <p className="text-xs text-slate-400 font-mono">Pay-as-you-go inference with dedicated throughput tiers.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#10121c] border border-white/10 rounded-2xl p-6 space-y-3">
                  <h3 className="text-base font-bold text-white">Developer Tier</h3>
                  <div className="text-2xl font-black text-cyan-400 font-mono">$0.002<span className="text-xs font-normal text-slate-400"> / 1k tokens</span></div>
                  <p className="text-xs text-slate-400">Rate limit: 50 requests/sec. Ideal for prototyping.</p>
                </div>
                <div className="bg-[#10121c] border border-cyan-500/50 rounded-2xl p-6 space-y-3">
                  <h3 className="text-base font-bold text-white">Production Tier</h3>
                  <div className="text-2xl font-black text-cyan-400 font-mono">$0.001<span className="text-xs font-normal text-slate-400"> / 1k tokens</span></div>
                  <p className="text-xs text-slate-400">Dedicated GPUs, 99.99% SLA, custom fine-tuning support.</p>
                </div>
              </div>
            </div>
          )}

          {currentHash === 'changelog' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-white">Release Notes</h1>
                <p className="text-xs text-slate-400 font-mono">SDK updates and API versioning history.</p>
              </div>
              <div className="bg-[#10121c] border border-white/10 rounded-2xl p-6 space-y-2">
                <span className="text-[10px] font-mono text-cyan-400">v3.2.0 • November 2026</span>
                <h3 className="text-base font-bold text-white">Streaming JSON Support & Tool Runner Beta</h3>
                <p className="text-xs text-slate-400">Added native structured JSON output streaming and autonomous tool runner loops.</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
