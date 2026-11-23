import React, { useState } from 'react';
import { Code, Copy, Download, Check, Terminal } from 'lucide-react';
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

  return (
    <div className="bg-[#0a0b10] border border-white/15 rounded-3xl p-6 shadow-2xl flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#8E8E98]">
            <Code className="w-4 h-4 text-cyan-400" /> Code & Export Drawer
          </div>

          <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl font-mono text-[10px]">
            <button 
              onClick={() => setActiveTab('html')}
              className={`px-3 py-1 rounded-lg transition-all ${activeTab === 'html' ? 'bg-white text-black font-bold' : 'text-[#8E8E98]'}`}
            >
              HTML + CSS
            </button>
            <button 
              onClick={() => setActiveTab('react')}
              className={`px-3 py-1 rounded-lg transition-all ${activeTab === 'react' ? 'bg-white text-black font-bold' : 'text-[#8E8E98]'}`}
            >
              React JSX
            </button>
            <button 
              onClick={() => setActiveTab('css')}
              className={`px-3 py-1 rounded-lg transition-all ${activeTab === 'css' ? 'bg-white text-black font-bold' : 'text-[#8E8E98]'}`}
            >
              CSS Tokens
            </button>
          </div>
        </div>

        <div className="relative bg-[#060608] border border-white/10 rounded-2xl p-4 font-mono text-xs text-cyan-300 h-64 overflow-y-auto">
          <pre className="whitespace-pre-wrap">{activeContent}</pre>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
        <button
          onClick={handleDownloadHtml}
          className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-cyan-400" /> Download .html
        </button>

        <button
          onClick={() => onCopy(activeContent, `${activeTab.toUpperCase()} Code`)}
          className="px-4 py-2.5 rounded-xl text-black text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg"
          style={{ backgroundColor: accentColor }}
        >
          <Copy className="w-3.5 h-3.5" /> Copy Code
        </button>
      </div>
    </div>
  );
};
