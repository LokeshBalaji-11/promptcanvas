import React from 'react';
import { Trash2, GripVertical, Check, Power } from 'lucide-react';
import { ActiveEffect } from '../../types/library';

interface ActiveEffectsListProps {
  effects: ActiveEffect[];
  onToggleEffect: (instanceId: string) => void;
  onRemoveEffect: (instanceId: string) => void;
  onUpdateSpeed: (instanceId: string, speed: number) => void;
}

export const ActiveEffectsList: React.FC<ActiveEffectsListProps> = ({
  effects,
  onToggleEffect,
  onRemoveEffect,
  onUpdateSpeed
}) => {
  if (effects.length === 0) {
    return (
      <div className="bg-[#101015] border border-white/10 rounded-2xl p-8 text-center">
        <p className="text-sm text-zinc-400 mb-2">No active effects injected yet.</p>
        <p className="text-xs text-zinc-600">Browse Motion or CSS Galleries and click "Add to My Site" to combine effects live.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#101015] border border-white/10 rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <h3 className="text-sm font-semibold text-white">Active Site Effects ({effects.length})</h3>
        <span className="text-[11px] font-mono text-cyan-400">Injected into Live Preview & Code</span>
      </div>

      <div className="space-y-3">
        {effects.map(effect => (
          <div
            key={effect.instanceId}
            className={`bg-[#07070a] border rounded-xl p-4 flex items-center justify-between gap-4 transition-all ${
              effect.enabled ? 'border-cyan-500/40 shadow-lg shadow-cyan-500/5' : 'border-white/5 opacity-60'
            }`}
          >
            <div className="flex items-center gap-3">
              <GripVertical className="w-4 h-4 text-zinc-600 cursor-grab" />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-semibold text-white">{effect.name}</h4>
                  <span className="text-[9px] uppercase tracking-wider font-mono px-1.5 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/10">
                    {effect.type}
                  </span>
                </div>
                {effect.type === 'motion' && (
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-[11px] text-zinc-400">Speed: <strong className="text-cyan-400">{effect.speed}x</strong></span>
                    <input
                      type="range"
                      min="0.5"
                      max="3.0"
                      step="0.1"
                      value={effect.speed}
                      onChange={e => onUpdateSpeed(effect.instanceId, parseFloat(e.target.value))}
                      className="accent-cyan-400 h-1 bg-zinc-800 rounded-lg w-28 cursor-pointer"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleEffect(effect.instanceId)}
                className={`p-2 rounded-lg border transition-colors ${
                  effect.enabled ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400' : 'bg-white/5 border-white/10 text-zinc-500'
                }`}
                title={effect.enabled ? 'Disable effect' : 'Enable effect'}
              >
                <Power className="w-4 h-4" />
              </button>
              <button
                onClick={() => onRemoveEffect(effect.instanceId)}
                className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors"
                title="Remove effect"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
