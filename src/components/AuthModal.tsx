import React, { useState } from 'react';
import { User, Lock, Mail, Sparkles, Check } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  accentColor: string;
  onLogin: (user: { name: string; email: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, accentColor, onLogin }) => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [name, setName] = useState<string>('Alex Chen');
  const [email, setEmail] = useState<string>('alex@roxten.studios');
  const [password, setPassword] = useState<string>('********');

  if (!isOpen) return null;

  const handleDemoLogin = () => {
    onLogin({ name: 'Alex Chen (Demo Designer)', email: 'alex@roxten.studios' });
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ name: name || 'Designer', email: email || 'user@roxten.studios' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-lg flex items-center justify-center p-6">
      <div className="bg-[#0a0b10] border border-white/20 rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: accentColor }}>
              Roxten Studios Auth
            </div>
            <h3 className="text-2xl font-black text-white">{isSignUp ? 'Create Account' : 'Sign In to Studio'}</h3>
          </div>
          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-[#8E8E98] hover:text-white transition-all font-mono cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* 1-CLICK DEMO LOGIN BUTTON */}
        <button
          onClick={handleDemoLogin}
          className="w-full mb-6 py-3.5 px-4 rounded-2xl font-mono text-xs font-extrabold uppercase tracking-wider text-black transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
          style={{ backgroundColor: accentColor }}
        >
          <Sparkles className="w-4 h-4" /> 1-Click Demo Designer Login
        </button>

        <div className="relative flex py-2 items-center mb-6">
          <div className="flex-grow border-t border-white/10"></div>
          <span className="flex-shrink mx-4 text-xs font-mono text-[#8E8E98]">OR EMAIL</span>
          <div className="flex-grow border-t border-white/10"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-xs font-mono text-[#8E8E98] mb-1.5">FULL NAME</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                <input 
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-[#060608] border border-white/15 rounded-xl pl-10 pr-4 py-3 text-xs font-mono text-white outline-none focus:border-white/30"
                  placeholder="Alex Chen"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-mono text-[#8E8E98] mb-1.5">EMAIL ADDRESS</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
              <input 
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-[#060608] border border-white/15 rounded-xl pl-10 pr-4 py-3 text-xs font-mono text-white outline-none focus:border-white/30"
                placeholder="alex@roxten.studios"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-[#8E8E98] mb-1.5">PASSWORD</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
              <input 
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-[#060608] border border-white/15 rounded-xl pl-10 pr-4 py-3 text-xs font-mono text-white outline-none focus:border-white/30"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer mt-4"
          >
            {isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-white/10 text-center font-mono text-xs text-[#8E8E98]">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button 
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-white font-bold hover:underline ml-1 cursor-pointer"
          >
            {isSignUp ? 'Sign In' : 'Create Account'}
          </button>
        </div>
      </div>
    </div>
  );
};
