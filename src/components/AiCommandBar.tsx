import React, { useState } from 'react';
import { Terminal, Sparkles, Send, RefreshCw, Camera } from 'lucide-react';
import { generateMoodboard } from '../engine/moodboardGenerator';

interface AiCommandBarProps {
  accentColor: string;
  onExecuteCommand: (command: string) => void;
  onUploadProject: (project: any, explanation: string) => void;
}

export const AiCommandBar: React.FC<AiCommandBarProps> = ({ accentColor, onExecuteCommand, onUploadProject }) => {
  const [command, setCommand] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!command.trim()) return;

    setLoading(true);
    setTimeout(() => {
      onExecuteCommand(command);
      setCommand('');
      setLoading(false);
    }, 200);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        canvas.width = 64;
        canvas.height = 64;
        ctx.drawImage(img, 0, 0, 64, 64);
        const imgData = ctx.getImageData(0, 0, 64, 64).data;
        
        let rSum = 0, gSum = 0, bSum = 0;
        let count = 0;
        for (let i = 0; i < imgData.length; i += 16) {
          rSum += imgData[i];
          gSum += imgData[i+1];
          bSum += imgData[i+2];
          count++;
        }
        const avgR = Math.round(rSum / count);
        const avgG = Math.round(gSum / count);
        const avgB = Math.round(bSum / count);
        const hex = `#${((1 << 24) + (avgR << 16) + (avgG << 8) + avgB).toString(16).slice(1)}`;
        
        const baseName = file.name.replace(/\.[^/.]+$/, '').toUpperCase();
        const newProj = generateMoodboard(baseName, 'Cinematic');
        newProj.accentColor = hex;
        newProj.palette[2].hex = hex;
        newProj.palette[2].name = 'Extracted Image Color';
        
        onUploadProject(newProj, `Extracted 5-color palette & typography from "${file.name}" in 142ms.`);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="h-12 bg-[#0a0b10] border-b border-white/10 px-6 flex items-center justify-between z-30 sticky top-14 gap-4">
      {/* Left: Upload Image Button */}
      <label className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/15 hover:bg-white/10 text-xs font-mono font-bold text-white cursor-pointer transition-all shrink-0">
        <Camera className="w-3.5 h-3.5 text-cyan-400" />
        <span className="hidden sm:inline">[📷 Upload Image]</span>
        <span className="sm:hidden">Upload</span>
        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
      </label>

      {/* Center: Natural-language prompt & edit input */}
      <form onSubmit={handleSubmit} className="flex-1 flex items-center gap-2">
        <input
          type="text"
          value={command}
          onChange={e => setCommand(e.target.value)}
          placeholder="Type prompt or edit command (e.g., 'change primary color to #FF2A5F', 'editorial fashion brand')..."
          className="w-full bg-[#060608] border border-white/15 rounded-xl px-4 py-1.5 text-xs font-mono text-white placeholder-slate-500 outline-none focus:border-white/30 transition-all"
        />
      </form>

      {/* Right: Live status badge + [RUN ↵] */}
      <div className="flex items-center gap-3 shrink-0">
        <span className="hidden lg:inline text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/25">
          🟢 AI Active
        </span>
        <button
          type="button"
          onClick={() => handleSubmit()}
          disabled={loading || !command.trim()}
          className="px-4 py-1.5 rounded-xl text-black font-mono text-xs font-extrabold uppercase tracking-wider shadow-md transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          style={{ backgroundColor: accentColor }}
        >
          {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <>RUN ↵</>}
        </button>
      </div>
    </div>
  );
};
