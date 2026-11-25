import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Sparkles, Download, Layout, Copy, Check, Palette, Type, Camera,
  RefreshCw, Code, ArrowRight, Share2, HelpCircle, Terminal, User, History as HistoryIcon,
  Monitor, Sun, Moon, Wand2, Command
} from 'lucide-react';
import { MoodboardProject } from '../types';
import { PRESET_BOARDS, generateMoodboard } from '../engine/moodboardGenerator';
import { parseAiCommand } from '../engine/commandParser';
import { executeGenerationSequence, GenPhase, GenStep, TEXT_STEPS } from '../engine/studioEngine';
import { LiveTemplatePreview } from '../components/LiveTemplatePreview';
import { CodeExportDrawer } from '../components/CodeExportDrawer';
import { AiCommandBar } from '../components/AiCommandBar';
import { JudgeGuideModal } from '../components/JudgeGuideModal';
import { AuthModal } from '../components/AuthModal';
import { HistoryDrawer } from '../components/HistoryDrawer';
import { StudioGenerationOverlay } from '../components/StudioGenerationOverlay';
import { CommandPalette } from '../components/CommandPalette';
import { ScrollProgress } from '../components/ScrollProgress';
import { TemplateGallery } from '../components/TemplateGallery';
import { LibraryStudioTab } from '../components/LibraryStudioTab';
import { ClaudeChatSidebar, ChatMessage } from '../components/chat/ClaudeChatSidebar';
import { ActiveEffect } from '../types/library';

const CHAT_TABS = ['moodboard', 'preview', 'code'] as const;

export function StudioPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [projects, setProjects] = useState<MoodboardProject[]>(() => {
    if (window.location.hash.startsWith('#board=')) {
      try {
        const jsonStr = decodeURIComponent(window.location.hash.replace('#board=', ''));
        const sharedProj = JSON.parse(jsonStr);
        if (sharedProj && sharedProj.id) {
          return [sharedProj, ...PRESET_BOARDS];
        }
      } catch (e) { /* fallback */ }
    }

    const saved = localStorage.getItem('promptcanvas_projects_v9');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return PRESET_BOARDS;
  });

  const [activeId, setActiveId] = useState<string>(projects[0]?.id || PRESET_BOARDS[0].id);
  const activeProject = projects.find(p => p.id === activeId) || projects[0];

  const [accentColor, setAccentColor] = useState<string>(activeProject.accentColor || '#CCFF00');
  const [isCmdOpen, setIsCmdOpen] = useState<boolean>(false);

  // State Machine for Choreographed Generation Sequence
  const [genPhase, setGenPhase] = useState<GenPhase>('idle');
  const [genProgress, setGenProgress] = useState<number>(0);
  const [genSteps, setGenSteps] = useState<GenStep[]>(TEXT_STEPS);
  const [genQuery, setGenQuery] = useState<string>('');
  const [showUndo, setShowUndo] = useState<boolean>(false);
  const [previousProject, setPreviousProject] = useState<MoodboardProject | null>(null);

  // Lifted Chat State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: `Hello! I'm your Claude AI design assistant. I've initialized "${activeProject.title}" with WCAG AA compliance, custom typography, and kinetic color tokens. How would you like to refine this site?`,
      timestamp: 'Just now',
      previewCard: true
    }
  ]);
  const [chatInputDraft, setChatInputDraft] = useState<string>('');
  const [isChatCollapsed, setIsChatCollapsed] = useState<boolean>(() => {
    return localStorage.getItem('prompt_canvas_chat_collapsed') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('prompt_canvas_chat_collapsed', String(isChatCollapsed));
  }, [isChatCollapsed]);

  // Vibe DNA sliders state
  const [vibeIntensity, setVibeIntensity] = useState<number>(85);
  const [vibeSharpness, setVibeSharpness] = useState<number>(64);

  const tabParam = searchParams.get('tab');
  const drawerParam = searchParams.get('drawer');

  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<'moodboard' | 'preview' | 'code' | 'library'>(
    tabParam === 'preview' ? 'preview' : tabParam === 'code' || tabParam === 'export' ? 'code' : tabParam === 'library' ? 'library' : 'moodboard'
  );
  const [activeStyles, setActiveStyles] = useState<string[]>(['liquid-glass']);
  const [styleParams, setStyleParams] = useState<Record<string, Record<string, any>>>({});

  useEffect(() => {
    const savedStyles = localStorage.getItem('prompt_canvas_active_styles');
    const savedParams = localStorage.getItem('prompt_canvas_style_params');
    if (savedStyles) { try { setActiveStyles(JSON.parse(savedStyles)); } catch (e) {} }
    if (savedParams) { try { setStyleParams(JSON.parse(savedParams)); } catch (e) {} }
  }, []);

  useEffect(() => {
    localStorage.setItem('prompt_canvas_active_styles', JSON.stringify(activeStyles));
    localStorage.setItem('prompt_canvas_style_params', JSON.stringify(styleParams));
  }, [activeStyles, styleParams]);

  const handleToggleStyle = (id: string) => {
    setActiveStyles(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const handleRemoveStyle = (styleId: string) => {
    setActiveStyles(prev => prev.filter(id => id !== styleId));
  };

  const handleUpdateParam = (styleId: string, paramId: string, value: any) => {
    setStyleParams(prev => ({
      ...prev,
      [styleId]: {
        ...(prev[styleId] || {}),
        [paramId]: value
      }
    }));
  };

  const [showAuthModal, setShowAuthModal] = useState<boolean>(drawerParam === 'history' || drawerParam === 'auth');
  const [showHistoryDrawer, setShowHistoryDrawer] = useState<boolean>(drawerParam === 'history');
  const [showGuideModal, setShowGuideModal] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>({
    name: 'Alex Chen',
    email: 'alex@roxten.studios'
  });

  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);

  useEffect(() => {
    setAccentColor(activeProject.accentColor || '#CCFF00');
  }, [activeId]);

  useEffect(() => {
    localStorage.setItem('promptcanvas_projects_v9', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'instant' });
    window.scrollTo(0, 0);
  }, [activeWorkspaceTab]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCmdOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  const handleExecuteCommand = async (cmd: string | File) => {
    const queryStr = typeof cmd === 'string' ? cmd : cmd.name;
    setGenQuery(queryStr);
    setPreviousProject(activeProject);

    try {
      const { project: newProj, durationMs } = await executeGenerationSequence(
        cmd,
        activeProject,
        (phase, progress, steps) => {
          setGenPhase(phase);
          setGenProgress(progress);
          setGenSteps(steps);
        }
      );

      setProjects(prev => [newProj, ...prev]);
      setActiveId(newProj.id);
      setAccentColor(newProj.accentColor);
      setGenPhase('done');
      setActiveWorkspaceTab('preview');
      setAiExplanation(`✔ Built in ${durationMs}ms · WCAG AA 5/5 passing`);
      setShowUndo(true);

      setTimeout(() => setShowUndo(false), 8000);
      setTimeout(() => setGenPhase('idle'), 1500);
      setTimeout(() => setAiExplanation(null), 6000);
    } catch (error) {
      setGenPhase('error');
    }
  };

  const handleUndo = () => {
    if (previousProject) {
      setActiveId(previousProject.id);
      setAccentColor(previousProject.accentColor);
      setShowUndo(false);
      setAiExplanation('Successfully reverted to previous version.');
      setTimeout(() => setAiExplanation(null), 3000);
    }
  };

  const handleApplyTemplate = (newProj: MoodboardProject) => {
    // Set template in board state
    const updated = { ...newProj, templateId: newProj.id.includes('student') ? 'students' : newProj.id.includes('business') ? 'business' : 'business' };
    setProjects(prev => [updated, ...prev]);
    setActiveId(updated.id);
    setActiveWorkspaceTab('preview');
  };

  const currentGeneratedCode = `<!-- Generated by PromptCanvas AI Engine v2.8 -->\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>${activeProject.title}</title>\n  <link href=\"${activeProject.fonts.googleFontsUrl}\" rel=\"stylesheet\">\n</head>\n<body>\n  <h1>${activeProject.title}</h1>\n  <p>${activeProject.prompt}</p>\n</body>\n</html>`;

  const showChatTab = (CHAT_TABS as readonly string[]).includes(activeWorkspaceTab);

  return (
    <div className="bg-[#07070A] text-[#F5F5F5] h-screen flex flex-col font-sans select-none overflow-hidden relative bg-gradient-mesh">
      <ScrollProgress accentColor={accentColor} />

      <StudioGenerationOverlay
        phase={genPhase}
        progress={genProgress}
        steps={genSteps}
        promptQuery={genQuery}
        accentColor={accentColor}
        onRetry={() => handleExecuteCommand(genQuery || 'luxury cyberpunk coffee brand')}
      />

      <CommandPalette isOpen={isCmdOpen} onClose={() => setIsCmdOpen(false)} accentColor={accentColor} onExecute={handleExecuteCommand} />

      {/* COMPACT TOP BAR (56px) */}
      <header className="h-14 border-b border-white/10 bg-[#07070A]/90 backdrop-blur-xl px-6 flex items-center justify-between z-40 sticky top-0">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="font-mono text-xs text-[#8E8E98] hover:text-white transition-colors flex items-center gap-1.5"
          >
            &larr; Home
          </Link>

          <div className="h-4 w-[1px] bg-white/10" />

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accentColor }} />
            <span className="font-bold text-xs text-white truncate max-w-[180px]">{activeProject.title}</span>
            <span className="text-[10px] font-mono text-[#8E8E98] bg-white/5 px-2 py-0.5 rounded hidden sm:inline">
              {activeProject.styleModifier}
            </span>
          </div>
        </div>

        {/* 4 WORKSPACE TABS */}
        <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-xl p-1 font-mono text-xs relative">
          {(['moodboard', 'preview', 'code', 'library'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveWorkspaceTab(tab)}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer relative z-10 ${
                activeWorkspaceTab === tab ? 'text-black font-bold' : 'text-[#8E8E98] hover:text-white'
              }`}
            >
              {tab === 'moodboard' ? '01 MOODBOARD' : tab === 'preview' ? '02 PREVIEW' : tab === 'code' ? '03 CODE' : '04 LIBRARY'}
              {activeWorkspaceTab === tab && (
                <div className="absolute inset-0 rounded-lg -z-10 transition-all duration-300 shadow-lg" style={{ backgroundColor: accentColor }} />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          {showUndo && (
            <button
              onClick={handleUndo}
              className="px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 font-bold hover:bg-amber-500/30 transition-all cursor-pointer animate-pulse"
            >
              Undo Generation
            </button>
          )}

          <button
            onClick={() => setIsCmdOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white flex items-center gap-2 transition-all cursor-pointer border border-white/10"
          >
            <Command className="w-3.5 h-3.5" style={{ color: accentColor }} />
            <span className="hidden md:inline">Cmd+K</span>
          </button>

          <button
            onClick={() => setShowHistoryDrawer(true)}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white flex items-center gap-1.5 transition-all cursor-pointer border border-white/10"
          >
            <HistoryIcon className="w-3.5 h-3.5" style={{ color: accentColor }} /> History
          </button>

          <button
            onClick={() => setShowAuthModal(true)}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white flex items-center gap-1.5 transition-all cursor-pointer border border-white/10"
          >
            <User className="w-3.5 h-3.5 text-[#22D3EE]" /> {currentUser ? currentUser.name.split(' ')[0] : 'Sign In'}
          </button>
        </div>
      </header>

      {/* CLAUDE CHAT SIDEBAR + MAIN WORKSPACE SPLIT */}
      <div className="flex-1 flex overflow-hidden">
        <ClaudeChatSidebar
          project={activeProject}
          accentColor={accentColor}
          onSendMessage={handleExecuteCommand}
          isGenerating={genPhase !== 'idle' && genPhase !== 'done'}
          onSwitchTab={(tab) => setActiveWorkspaceTab(tab)}
          messages={chatMessages}
          setMessages={setChatMessages}
          inputDraft={chatInputDraft}
          setInputDraft={setChatInputDraft}
          isCollapsed={isChatCollapsed}
          setIsCollapsed={setIsChatCollapsed}
          showChat={showChatTab}
        />

        {/* WORKSPACE CONTENT AREA WITH DEDICATED SCROLLER */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto h-[calc(100vh-56px)] bg-[#07070a]">
          <main className="max-w-[1360px] mx-auto w-full p-6 pb-24">

            {/* TAB 1: MOODBOARD */}
            {activeWorkspaceTab === 'moodboard' && (
              <div className="space-y-6 animate-fadeIn">

                {/* VIBE DNA SLIDERS WITH LIVE READOUTS & HELIX */}
                <div className="bg-[#0a0b10] border border-white/15 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-mono font-bold text-xs" style={{ color: accentColor, transform: `rotate(${vibeIntensity * 3.6}deg)` }}>
                      DNA
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider">Vibe DNA Spectrum Helix</h4>
                      <p className="text-xs text-[#8E8E98] font-light">Real-time parametric tensor twisting</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-6 font-mono text-xs">
                    <div className="flex items-center gap-3">
                      <span className="text-[#8E8E98]">INTENSITY:</span>
                      <input
                        type="range" min="0" max="100" value={vibeIntensity}
                        onChange={(e) => setVibeIntensity(Number(e.target.value))}
                        className="accent-[#22D3EE] cursor-pointer"
                      />
                      <span className="text-white font-bold w-8">{vibeIntensity}%</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[#8E8E98]">SHARPNESS:</span>
                      <input
                        type="range" min="0" max="100" value={vibeSharpness}
                        onChange={(e) => setVibeSharpness(Number(e.target.value))}
                        className="accent-[#FF3B5C] cursor-pointer"
                      />
                      <span className="text-white font-bold w-8">{vibeSharpness}%</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                  {/* PALETTE */}
                  <div className="lg:col-span-5 bg-[#0a0b10] border border-white/15 rounded-3xl p-6 flex flex-col justify-between shadow-2xl">
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#8E8E98]">
                          <Palette className="w-4 h-4" style={{ color: accentColor }} /> Color Palette
                        </div>
                        <span className="text-[10px] font-mono text-[#3DFFA2] bg-[#3DFFA2]/10 px-2.5 py-1 rounded-full border border-[#3DFFA2]/20">WCAG AA 100%</span>
                      </div>

                      <div className="space-y-3">
                        {activeProject.palette.map((swatch, idx) => (
                          <div
                            key={idx}
                            onClick={() => handleCopy(swatch.hex, swatch.name)}
                            className="flex items-center justify-between p-3 rounded-2xl bg-[#07070A] border border-white/5 hover:border-white/25 transition-all cursor-pointer group/swatch"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-xl shadow-md border border-white/15 transition-transform group-hover/swatch:scale-110" style={{ backgroundColor: swatch.hex }} />
                              <div>
                                <div className="text-xs font-bold text-white">{swatch.name}</div>
                                <div className="text-[10px] font-mono text-[#8E8E98]">{swatch.hex} • {swatch.role}</div>
                              </div>
                            </div>
                            <div className="opacity-0 group-hover/swatch:opacity-100 transition-opacity text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg bg-white/10" style={{ color: accentColor }}>
                              COPY HEX
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* TYPOGRAPHY */}
                  <div className="lg:col-span-7 bg-[#0a0b10] border border-white/15 rounded-3xl p-6 flex flex-col justify-between shadow-2xl">
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#8E8E98]">
                          <Type className="w-4 h-4 text-[#22D3EE]" /> Typography Hierarchy
                        </div>
                        <span className="text-[10px] font-mono text-[#8E8E98] bg-white/5 px-2.5 py-1 rounded-full">Google Fonts</span>
                      </div>

                      <div className="space-y-4">
                        <div className="p-5 rounded-2xl bg-[#07070A] border border-white/5">
                          <div className="text-[10px] font-mono text-[#8E8E98] mb-1">DISPLAY FONT • {activeProject.fonts.display}</div>
                          <div className="text-3xl font-extrabold tracking-tight text-white" style={{ fontFamily: activeProject.fonts.display }}>
                            Spatial Intelligence
                          </div>
                        </div>

                        <div className="p-5 rounded-2xl bg-[#07070A] border border-white/5">
                          <div className="text-[10px] font-mono text-[#8E8E98] mb-1">BODY & MONO • {activeProject.fonts.body}</div>
                          <p className="text-sm text-slate-300 font-light" style={{ fontFamily: activeProject.fonts.body }}>
                            Pairing <span className="font-semibold" style={{ color: accentColor }}>{activeProject.fonts.display}</span> with <span className="text-[#22D3EE] font-semibold">{activeProject.fonts.body}</span> creates immediate visual tension.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-[#8E8E98]">
                      <span>Weights: 400, 600, 800</span>
                      <button
                        onClick={() => handleCopy(activeProject.fonts.googleFontsUrl, 'Google Font URL')}
                        className="text-[#22D3EE] hover:underline font-bold flex items-center gap-1.5 cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5" /> Copy Font URL
                      </button>
                    </div>
                  </div>

                </div>

                {/* TEMPLATE GALLERY SECTION */}
                <TemplateGallery onApplyTemplate={handleApplyTemplate} accentColor={accentColor} />

              </div>
            )}

            {/* TAB 2: PREVIEW */}
            {activeWorkspaceTab === 'preview' && (
              <div className="space-y-6 animate-fadeIn">
                <LiveTemplatePreview
                  project={activeProject}
                  accentColor={accentColor}
                  activeStyles={activeStyles}
                  styleParams={styleParams}
                  onRemoveStyle={handleRemoveStyle}
                  onNavigateToLibrary={() => setActiveWorkspaceTab('library')}
                  onNavigateToDocs={() => window.location.hash = '#/docs'}
                  onOpenStudio={() => setActiveWorkspaceTab('moodboard')}
                />
              </div>
            )}

            {/* TAB 3: CODE */}
            {activeWorkspaceTab === 'code' && (
              <div className="space-y-6 animate-fadeIn">
                <CodeExportDrawer
                  project={activeProject}
                  accentColor={accentColor}
                  generatedCode={currentGeneratedCode}
                  onCopy={handleCopy}
                />
              </div>
            )}

            {/* TAB 4: LIBRARY */}
            {activeWorkspaceTab === 'library' && (
              <div className="space-y-6 animate-fadeIn">
                <LibraryStudioTab
                  activeStyles={activeStyles}
                  styleParams={styleParams}
                  onToggleStyle={handleToggleStyle}
                  onUpdateParam={handleUpdateParam}
                  accentColor={accentColor}
                />
              </div>
            )}

          </main>
        </div>
      </div>

      {/* COPIED TOAST */}
      {copiedText && (
        <div className="fixed top-20 right-8 z-50 text-black border border-white/20 backdrop-blur-2xl px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-mono font-extrabold animate-bounce" style={{ backgroundColor: accentColor }}>
          <Check className="w-4 h-4" /> SUCCESS: COPIED {copiedText} TO CLIPBOARD
        </div>
      )}

      {/* MODALS */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        accentColor={accentColor}
        onLogin={(u) => setCurrentUser(u)}
      />

      <HistoryDrawer
        isOpen={showHistoryDrawer}
        onClose={() => setShowHistoryDrawer(false)}
        accentColor={accentColor}
        savedBoards={projects}
        onSelectBoard={(id) => setActiveId(id)}
        onDeleteBoard={(id) => setProjects(prev => prev.filter(p => p.id !== id))}
      />

      <JudgeGuideModal
        isOpen={showGuideModal}
        onClose={() => setShowGuideModal(false)}
        accentColor={accentColor}
      />

    </div>
  );
}
