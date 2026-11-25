import React, { useState } from 'react';
import { Code, Copy, Download, Check, Terminal, FileText, Share2, Image as ImageIcon } from 'lucide-react';
import { MoodboardProject } from '../types';

interface CodeExportDrawerProps {
  project: MoodboardProject;
  accentColor: string;
  generatedCode: string;
  onCopy: (text: string, label: string) => void;
}

export const CodeExportDrawer: React.FC<CodeExportDrawerProps> = ({ project, accentColor, generatedCode, onCopy }) => {
  const [activeTab, setActiveTab] = useState<'html' | 'react' | 'css'>('html');

  const reactCode = `import React from 'react';

export default function Hero() {
  return (
    <div className="bg-[${project.palette[0].hex}] text-slate-100 p-16 font-sans">
      <h1 className="text-5xl font-extrabold" style={{ color: '${accentColor}' }}>
        ${project.title}
      </h1>
      <p className="text-slate-400 mt-4 max-w-xl">${project.prompt}</p>
      <button className="mt-8 px-6 py-3 rounded-xl font-bold bg-[${accentColor}] text-black">
        Explore System
      </button>
    </div>
  );
}`;

  const cssTokens = `:root {
  --canvas-bg: ${project.palette[0].hex};
  --canvas-surface: ${project.palette[1].hex};
  --accent-primary: ${accentColor};
  --font-display: '${project.fonts.display}', sans-serif;
  --font-body: '${project.fonts.body}', sans-serif;
}`;

  const activeContent = activeTab === 'html' ? generatedCode : activeTab === 'react' ? reactCode : cssTokens;

  const handleDownloadHtml = () => {
    const blob = new Blob([generatedCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.title.toLowerCase().replace(/\s+/g, '-')}-preview.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportPng = () => {
    const text = `PROMPTCANVAS BRAND REPORT: ${project.title}\nPrimary Color: ${accentColor}\nPalette: ${project.palette.map(p => p.hex).join(', ')}`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.title.toLowerCase().replace(/\s+/g, '-')}-moodboard.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportPdf = () => {
    window.print();
  };

  const handleShareUrl = () => {
    const jsonStr = encodeURIComponent(JSON.stringify(project));
    const shareUrl = `${window.location.origin}${window.location.pathname}#board=${jsonStr}`;
    onCopy(shareUrl, 'Shareable Board URL');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* LEFT (8 COLS): SYNTAX-HIGHLIGHTED CODE VIEWER */}
      <div className="lg:col-span-8 bg-[#0a0b10] border border-white/15 rounded-3xl p-6 shadow-2xl flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#8E8E98]">
              <Code className="w-4 h-4 text-cyan-400" /> Syntax Code Viewer
            </div>

            <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl font-mono text-[10px]">
              <button 
                onClick={() => setActiveTab('html')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${activeTab === 'html' ? 'bg-white text-black font-bold' : 'text-[#8E8E98]'}`}
              >
                index.html
              </button>
              <button 
                onClick={() => setActiveTab('react')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${activeTab === 'react' ? 'bg-white text-black font-bold' : 'text-[#8E8E98]'}`}
              >
                HeroSection.tsx
              </button>
              <button 
                onClick={() => setActiveTab('css')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${activeTab === 'css' ? 'bg-white text-black font-bold' : 'text-[#8E8E98]'}`}
              >
                tokens.css
              </button>
            </div>
          </div>

          <div className="relative bg-[#060608] border border-white/10 rounded-2xl p-4 font-mono text-xs text-cyan-300 h-80 overflow-y-auto shadow-inner">
            <pre className="whitespace-pre-wrap">{activeContent}</pre>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
          <span className="text-[11px] font-mono text-[#8E8E98]">Live synchronized with Vibe DNA & Palette</span>
          <button
            onClick={() => onCopy(activeContent, `${activeTab.toUpperCase()} Code`)}
            className="px-5 py-2.5 rounded-xl text-black text-xs font-mono font-extrabold flex items-center gap-2 transition-all cursor-pointer shadow-lg hover:scale-105"
            style={{ backgroundColor: accentColor }}
          >
            <Copy className="w-3.5 h-3.5" /> [COPY CODE]
          </button>
        </div>
      </div>

      {/* RIGHT (4 COLS): WORKING EXPORT DECK */}
      <div className="lg:col-span-4 bg-[#0a0b10] border border-white/15 rounded-3xl p-6 shadow-2xl flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#8E8E98] mb-6">
            <Download className="w-4 h-4 text-emerald-400" /> Working Export Deck
          </div>

          <div className="space-y-3 font-mono text-xs">
            <button
              onClick={handleDownloadHtml}
              className="w-full p-4 rounded-2xl bg-[#060608] border border-white/10 hover:border-white/30 text-white flex items-center justify-between transition-all cursor-pointer group"
            >
              <span className="flex items-center gap-2 font-bold">
                <Download className="w-4 h-4 text-cyan-400" /> Download Standalone .html
              </span>
              <span className="text-[#8E8E98] group-hover:text-white">&rarr;</span>
            </button>

            <button
              onClick={handleExportPng}
              className="w-full p-4 rounded-2xl bg-[#060608] border border-white/10 hover:border-white/30 text-white flex items-center justify-between transition-all cursor-pointer group"
            >
              <span className="flex items-center gap-2 font-bold">
                <ImageIcon className="w-4 h-4 text-amber-400" /> Export Moodboard .png
              </span>
              <span className="text-[#8E8E98] group-hover:text-white">&rarr;</span>
            </button>

            <button
              onClick={handleExportPdf}
              className="w-full p-4 rounded-2xl bg-[#060608] border border-white/10 hover:border-white/30 text-white flex items-center justify-between transition-all cursor-pointer group"
            >
              <span className="flex items-center gap-2 font-bold">
                <FileText className="w-4 h-4 text-rose-400" /> Export Brand Report .pdf
              </span>
              <span className="text-[#8E8E98] group-hover:text-white">&rarr;</span>
            </button>

            <button
              onClick={handleShareUrl}
              className="w-full p-4 rounded-2xl bg-[#060608] border border-white/10 hover:border-white/30 text-white flex items-center justify-between transition-all cursor-pointer group"
            >
              <span className="flex items-center gap-2 font-bold">
                <Share2 className="w-4 h-4 text-emerald-400" /> Copy Shareable URL
              </span>
              <span className="text-[#8E8E98] group-hover:text-white">&rarr;</span>
            </button>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-white/5 text-[11px] font-mono text-[#8E8E98] text-center">
          Instant Production Package
        </div>
      </div>
    </div>
  );
};
