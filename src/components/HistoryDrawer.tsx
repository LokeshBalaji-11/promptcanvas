import React from 'react';
import { History, Star, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import { MoodboardProject } from '../types';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  accentColor: string;
  savedBoards: MoodboardProject[];
  onSelectBoard: (boardId: string) => void;
  onDeleteBoard: (boardId: string) => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({ 
  isOpen, onClose, accentColor, savedBoards, onSelectBoard, onDeleteBoard 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex justify-end">
      <div className="bg-[#0a0b10] border-l border-white/15 w-full max-w-md h-full p-6 flex flex-col justify-between shadow-2xl overflow-y-auto animate-slideLeft">
        <div>
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/15">
            <div className="flex items-center gap-2.5">
              <History className="w-5 h-5" style={{ color: accentColor }} />
              <h3 className="text-lg font-bold text-white font-mono">WORKSPACE HISTORY</h3>
            </div>
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-[#8E8E98] hover:text-white transition-all font-mono cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            <div className="text-xs font-mono text-[#8E8E98] uppercase tracking-wider mb-2">Saved Moodboards ({savedBoards.length})</div>

            {savedBoards.map(board => (
              <div 
                key={board.id}
                className="bg-[#060608] border border-white/10 rounded-2xl p-4 hover:border-white/30 transition-all flex flex-col gap-3 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: board.accentColor }} />
                    <h4 className="text-sm font-bold text-white truncate max-w-[200px]">{board.title}</h4>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 bg-white/5 px-2 py-0.5 rounded">{board.styleModifier}</span>
                </div>

                {/* Mini Swatches Preview */}
                <div className="flex items-center gap-1.5 my-1">
                  {board.palette.map((s, idx) => (
                    <div key={idx} className="w-6 h-4 rounded-md border border-white/10" style={{ backgroundColor: s.hex }} />
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <span className="text-[10px] font-mono text-slate-500">
                    {new Date(board.updatedAt || board.createdAt).toLocaleDateString()}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        onSelectBoard(board.id);
                        onClose();
                      }}
                      className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono font-bold text-white flex items-center gap-1 transition-all cursor-pointer"
                    >
                      Load <ArrowRight className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => onDeleteBoard(board.id)}
                      className="p-1.5 rounded-xl bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-all cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-white/10 text-center font-mono text-xs text-[#8E8E98]">
          PromptCanvas v2.5 • Per-User Persistence Active
        </div>
      </div>
    </div>
  );
};
