import React, { useState, useRef, useEffect } from 'react';
import { Send, Plus, Sparkles, Image as ImageIcon, Bot, User, Code, Eye, RefreshCw, Check, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoodboardProject } from '../../types';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  image?: string;
  previewCard?: boolean;
}

interface PromptChatSidebarProps {
  project: MoodboardProject;
  accentColor: string;
  onSendMessage: (prompt: string, image?: File) => void;
  isGenerating: boolean;
  onSwitchTab: (tab: 'moodboard' | 'preview' | 'code' | 'library') => void;
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  inputDraft: string;
  setInputDraft: (val: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
  showChat: boolean;
}

export const ClaudeChatSidebar: React.FC<PromptChatSidebarProps> = ({
  project,
  accentColor,
  onSendMessage,
  isGenerating,
  onSwitchTab,
  messages,
  setMessages,
  inputDraft,
  setInputDraft,
  isCollapsed,
  setIsCollapsed,
  showChat
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatScrollRef.current?.scrollTo({ top: chatScrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!inputDraft.trim() && !selectedImage) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: inputDraft || 'Uploaded image for style extraction',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      image: imagePreviewUrl || undefined
    };

    setMessages(prev => [...prev, userMsg]);
    const currentInput = inputDraft;
    const currentImg = selectedImage;

    setInputDraft('');
    setSelectedImage(null);
    setImagePreviewUrl(null);

    onSendMessage(currentInput, currentImg || undefined);

    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: `I've successfully updated "${project.title}" based on your request. Live preview and code export are synchronized.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        previewCard: true
      };
      setMessages(prev => [...prev, botMsg]);
    }, 2000);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  if (!showChat) return null;

  return (
    <>
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 420, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:flex flex-col bg-[#0c0d14] border-r border-white/10 h-[calc(100vh-56px)] shrink-0 select-none overflow-hidden relative z-30"
          >
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#07070a]/50 backdrop-blur w-[420px]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">Prompt AI Assistant</h3>
                  <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Active Session
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => onSwitchTab('preview')}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 transition-colors"
                  title="View Live Preview"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onSwitchTab('code')}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 transition-colors"
                  title="View Code Export"
                >
                  <Code className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsCollapsed(true)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 transition-colors"
                  title="Collapse Sidebar"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div ref={chatScrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-none font-sans text-xs w-[420px]">
              {messages.map(msg => (
                <div key={msg.id} className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                    msg.sender === 'user' ? 'bg-cyan-500 text-black font-bold text-[10px]' : 'bg-[#181822] text-cyan-400 border border-white/10'
                  }`}>
                    {msg.sender === 'user' ? 'U' : <Bot className="w-3.5 h-3.5" />}
                  </div>

                  <div className={`max-w-[82%] space-y-2.5 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    <div className={`p-3.5 rounded-2xl leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-cyan-500 text-black font-medium rounded-tr-none'
                        : 'bg-[#121218] border border-white/10 text-zinc-200 rounded-tl-none shadow-lg'
                    }`}>
                      {msg.image && (
                        <img src={msg.image} alt="Upload" className="w-full h-32 object-cover rounded-xl mb-2.5 border border-white/10" />
                      )}
                      <p>{msg.text}</p>
                    </div>

                    {msg.previewCard && (
                      <div className="bg-[#121218] border border-white/10 rounded-2xl p-3.5 space-y-3 shadow-xl text-left">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Active System</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                            {project.styleModifier}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white mb-0.5">{project.title}</h4>
                          <p className="text-[11px] text-zinc-400 line-clamp-1">{project.prompt}</p>
                        </div>
                        <div className="flex items-center gap-2 pt-1 border-t border-white/5">
                          <button
                            onClick={() => onSwitchTab('preview')}
                            className="flex-1 py-2 rounded-xl bg-cyan-500 text-black text-[11px] font-bold hover:bg-cyan-400 transition-colors flex items-center justify-center gap-1.5"
                          >
                            <Eye className="w-3.5 h-3.5" /> View Preview
                          </button>
                          <button
                            onClick={() => onSwitchTab('code')}
                            className="py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-[11px] font-medium transition-colors"
                          >
                            Code
                          </button>
                        </div>
                      </div>
                    )}

                    <span className="text-[9px] font-mono text-zinc-500 block px-1">{msg.timestamp}</span>
                  </div>
                </div>
              ))}

              {isGenerating && (
                <div className="flex gap-3 items-center text-zinc-400 font-mono text-xs p-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
                  <span>Prompt is synthesizing your design update...</span>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-white/10 bg-[#07070a] space-y-3 w-[420px]">
              {imagePreviewUrl && (
                <div className="relative inline-block">
                  <img src={imagePreviewUrl} alt="Upload Preview" className="w-16 h-16 object-cover rounded-xl border border-cyan-400/40" />
                  <button
                    onClick={() => { setSelectedImage(null); setImagePreviewUrl(null); }}
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px] font-bold"
                  >
                    ×
                  </button>
                </div>
              )}

              <div className="flex items-center gap-2 bg-[#121218] border border-white/10 rounded-2xl p-2 focus-within:border-cyan-400 transition-colors">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                  title="Upload Image"
                >
                  <Plus className="w-4 h-4" />
                </button>

                <input
                  type="text"
                  placeholder="Ask Prompt AI to change colors, layout, style..."
                  value={inputDraft}
                  onChange={e => setInputDraft(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  className="flex-1 bg-transparent text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none px-2"
                />

                <button
                  onClick={handleSend}
                  disabled={!inputDraft.trim() && !selectedImage}
                  className={`p-2.5 rounded-xl transition-all ${
                    inputDraft.trim() || selectedImage
                      ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20 hover:bg-cyan-400'
                      : 'bg-white/5 text-zinc-600 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isCollapsed && (
        <button
          onClick={() => setIsCollapsed(false)}
          className="fixed bottom-8 left-8 z-40 px-5 py-3 rounded-2xl bg-cyan-500 text-black font-mono text-xs font-bold shadow-2xl hover:bg-cyan-400 transition-all flex items-center gap-2 cursor-pointer animate-bounce"
        >
          <MessageSquare className="w-4 h-4 fill-current" /> Ask Prompt AI
        </button>
      )}

      <div className="md:hidden">
        <button
          onClick={() => setMobileOpen(true)}
          className="fixed bottom-6 right-6 z-40 px-5 py-3 rounded-2xl bg-cyan-500 text-black font-mono text-xs font-bold shadow-2xl flex items-center gap-2"
        >
          <MessageSquare className="w-4 h-4 fill-current" /> Ask Prompt AI
        </button>

        {mobileOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col justify-end">
            <div className="bg-[#0c0d14] border-t border-white/10 rounded-t-3xl p-6 h-[80vh] flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Bot className="w-4 h-4 text-cyan-400" /> Prompt AI Assistant
                </h3>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-zinc-400 hover:text-white text-lg font-bold px-3 py-1 bg-white/5 rounded-xl"
                >
                  ✕
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {messages.map(msg => (
                  <div key={msg.id} className={`flex gap-2.5 text-xs ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`p-3 rounded-2xl max-w-[85%] ${msg.sender === 'user' ? 'bg-cyan-500 text-black' : 'bg-[#121218] border border-white/10 text-zinc-200'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10 flex gap-2">
                <input
                  type="text"
                  placeholder="Ask Prompt AI..."
                  value={inputDraft}
                  onChange={e => setInputDraft(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && (handleSend(), setMobileOpen(false))}
                  className="flex-1 bg-[#121218] border border-white/10 rounded-xl px-4 py-3 text-xs text-white"
                />
                <button
                  onClick={() => { handleSend(); setMobileOpen(false); }}
                  className="px-5 py-3 bg-cyan-500 text-black text-xs font-bold rounded-xl"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
