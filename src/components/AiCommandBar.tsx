import React, { useState } from 'react';
import { Terminal, Sparkles, Send, RefreshCw } from 'lucide-react';

interface AiCommandBarProps {
  accentColor: string;
  onExecuteCommand: (command: string) => void;
}

export const AiCommandBar: React.FC<AiCommandBarProps> = ({ accentColor, onExecuteCommand }) => {
  const [command, setCommand] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;

    setLoading(true);
    setTimeout(() => {
      onExecuteCommand(command);
      setCommand('');
      setLoading(false);
    }, 400);
  };

  return (
    <div className="bg-[#0a0b10] border border-white/15 rounded-3xl p-6 shadow-2xl flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#8E8E98]">
          <Terminal className="w-4 h-4 text-emerald-400" /> AI Command Line & Design Editor
        </div>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Local + API AI Active</span>
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <input 
          type="text"
          value={command}
          onChange={e => setCommand(e.target.value)}
          placeholder="Type command (e.g., 'change primary color to #FF2A5F', 'use serif fonts', 'switch to light mode')..."
          className="flex-1 bg-[#060608] border border-white/15 rounded-xl px-4 py-3 text-xs font-mono text-white placeholder-slate-500 outline-none focus:border-white/30 transition-all"
        />
        <button
          type="submit"
          disabled={loading || !command.trim()}
          className="px-5 py-3 rounded-xl text-black font-mono text-xs font-extrabold uppercase tracking-wider shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          style={{ backgroundColor: accentColor }}
        >
          {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <><Send className="w-3.5 h-3.5" /> Run</>}
        </button>
      </form>
    </div>
  );
};
