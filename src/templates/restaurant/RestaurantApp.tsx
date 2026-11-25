import React, { useState, useEffect } from 'react';
import { Utensils, ShoppingCart, Calendar, Sparkles, Image, MapPin, Plus, Trash2, Check, Clock } from 'lucide-react';

export const RestaurantApp: React.FC = () => {
  const [currentHash, setCurrentHash] = useState<string>(window.location.hash.replace('#/', '') || 'menu');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Cart State
  const [cart, setCart] = useState<{ id: string; name: string; price: number; qty: number }[]>([]);

  // Reservation State
  const [resName, setResName] = useState('');
  const [resDate, setResDate] = useState('');
  const [resTime, setResTime] = useState('19:00');
  const [resParty, setResParty] = useState(2);
  const [resSuccess, setResSuccess] = useState(false);

  const menuItems = [
    { id: 'm1', name: 'Truffle Wagyu Burger', category: 'Mains', price: 28, desc: 'A5 Wagyu beef patty, black truffle aioli, aged Gruyère.' },
    { id: 'm2', name: 'Saffron Lobster Risotto', category: 'Mains', price: 36, desc: 'Arborio rice, fresh Maine lobster tail, saffron reduction.' },
    { id: 'm3', name: 'Artisanal Burrata Caprese', category: 'Starters', price: 18, desc: 'Imported Puglia burrata, heirloom tomatoes, basil oil.' },
    { id: 'm4', name: 'Matcha Opera Cake', category: 'Desserts', price: 14, desc: 'Japanese ceremonial grade matcha, dark chocolate ganache.' },
    { id: 'm5', name: 'Smoked Rosemary Old Fashioned', category: 'Drinks', price: 16, desc: 'Bourbon, angostura bitters, smoked rosemary sprig.' }
  ];

  const [activeCategory, setActiveCategory] = useState('All');

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

  const addToCart = (item: typeof menuItems[0]) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, qty: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resName || !resDate) return;
    setResSuccess(true);
  };

  return (
    <div className="min-h-[650px] bg-[#0c0d12] text-slate-100 font-sans flex flex-col md:flex-row rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
      {/* SIDEBAR */}
      <aside className={`fixed md:relative inset-y-0 left-0 z-40 w-64 bg-[#08090d] border-r border-white/10 flex flex-col transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Utensils className="w-6 h-6 text-amber-400" />
            <span className="font-bold text-base tracking-wider text-white">L'Étoile Bistro</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 font-mono text-xs">
          {[
            { path: 'menu', label: `Menu (${cart.reduce((a,b)=>a+b.qty,0)})`, icon: Utensils },
            { path: 'cart', label: `Cart ($${cartTotal})`, icon: ShoppingCart },
            { path: 'reservations', label: 'Table Booking', icon: Calendar },
            { path: 'specials', label: 'Chef Specials', icon: Sparkles },
            { path: 'gallery', label: 'Gallery', icon: Image },
            { path: 'hours', label: 'Hours & Location', icon: MapPin }
          ].map(item => {
            const Icon = item.icon;
            const isActive = currentHash === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${
                  isActive ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 bg-black/40">
          <div className="text-[10px] text-slate-500 font-mono">RESTAURANT KERNEL</div>
          <div className="text-xs font-bold text-amber-400">Michelin Guide 2026</div>
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-[#08090d]/80 backdrop-blur-md border-b border-white/10 px-6 flex items-center justify-between z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg bg-white/5 text-white">☰</button>
            <span className="font-mono text-xs text-amber-400 uppercase tracking-widest">[RESTAURANT & CAFE] / {currentHash}</span>
          </div>
          <button onClick={() => navigate('cart')} className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs font-mono shadow-lg flex items-center gap-2">
            <ShoppingCart className="w-3.5 h-3.5" /> Cart (${cartTotal})
          </button>
        </header>

        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {currentHash === 'menu' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black text-white">Gourmet Menu & Ordering</h1>
                  <p className="text-xs text-slate-400 font-mono">Select dishes to add to your dining cart.</p>
                </div>
                <div className="flex items-center gap-2">
                  {['All', 'Starters', 'Mains', 'Desserts', 'Drinks'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${activeCategory === cat ? 'bg-amber-500 text-black font-bold' : 'bg-white/5 text-slate-400 hover:text-white'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuItems.filter(i => activeCategory === 'All' || i.category === activeCategory).map(item => (
                  <div key={item.id} className="bg-[#12131c] border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-mono text-[10px]">{item.category}</span>
                        <span className="text-base font-black text-amber-300 font-mono">${item.price}</span>
                      </div>
                      <h3 className="text-base font-bold text-white mb-2">{item.name}</h3>
                      <p className="text-xs text-slate-400 mb-6">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => addToCart(item)}
                      className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs font-mono shadow-lg flex items-center justify-center gap-2 transition-all"
                    >
                      <Plus className="w-4 h-4" /> Add to Order
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentHash === 'cart' && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h1 className="text-2xl font-black text-white">Your Order & Cart</h1>
                <p className="text-xs text-slate-400 font-mono">Review items before table checkout.</p>
              </div>

              {cart.length === 0 ? (
                <div className="bg-[#12131c] border border-white/10 rounded-2xl p-12 text-center space-y-3">
                  <ShoppingCart className="w-10 h-10 text-slate-600 mx-auto" />
                  <p className="text-sm text-slate-400 font-mono">Your cart is currently empty.</p>
                  <button onClick={() => navigate('menu')} className="px-4 py-2 bg-amber-500 text-black rounded-xl font-bold text-xs font-mono">Browse Menu</button>
                </div>
              ) : (
                <div className="bg-[#12131c] border border-white/10 rounded-2xl p-6 space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center justify-between pb-4 border-b border-white/5">
                      <div>
                        <h4 className="text-sm font-bold text-white">{item.name}</h4>
                        <span className="text-xs text-slate-400 font-mono">${item.price} × {item.qty}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-bold font-mono text-amber-300">${item.price * item.qty}</span>
                        <button onClick={() => removeFromCart(item.id)} className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="pt-4 flex items-center justify-between text-base font-bold text-white font-mono">
                    <span>Total Amount:</span>
                    <span className="text-amber-400 text-xl">${cartTotal}</span>
                  </div>
                  <button onClick={() => alert('Order placed successfully! Kitchen is preparing your meal.')} className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold font-mono rounded-xl shadow-lg">
                    Confirm & Send to Kitchen
                  </button>
                </div>
              )}
            </div>
          )}

          {currentHash === 'reservations' && (
            <div className="space-y-6 max-w-xl">
              <div>
                <h1 className="text-2xl font-black text-white">Table Reservation</h1>
                <p className="text-xs text-slate-400 font-mono">Book your dining experience at L'Étoile.</p>
              </div>

              {resSuccess ? (
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 text-center space-y-3">
                  <Check className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h3 className="text-lg font-bold text-white">Table Reserved!</h3>
                  <p className="text-xs text-slate-300 font-mono">We look forward to hosting you, {resName}, on {resDate} at {resTime} for {resParty} guests.</p>
                  <button onClick={() => setResSuccess(false)} className="px-4 py-2 bg-white/10 rounded-xl text-xs font-mono text-white">Book Another</button>
                </div>
              ) : (
                <form onSubmit={handleReservation} className="bg-[#12131c] border border-white/10 rounded-2xl p-6 space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Guest Name</label>
                    <input type="text" required placeholder="Jean Dupont" value={resName} onChange={e => setResName(e.target.value)} className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-400" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Date</label>
                      <input type="date" required value={resDate} onChange={e => setResDate(e.target.value)} className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-400 font-mono" />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Time</label>
                      <select value={resTime} onChange={e => setResTime(e.target.value)} className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-400 font-mono">
                        <option value="18:00">6:00 PM</option>
                        <option value="19:00">7:00 PM</option>
                        <option value="20:00">8:00 PM</option>
                        <option value="21:00">9:00 PM</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Party Size ({resParty} Guests)</label>
                    <input type="range" min="1" max="10" value={resParty} onChange={e => setResParty(Number(e.target.value))} className="w-full accent-amber-400" />
                  </div>
                  <button type="submit" className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs font-mono shadow-lg transition-all">
                    Confirm Reservation
                  </button>
                </form>
              )}
            </div>
          )}

          {currentHash === 'specials' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-white">Chef's Weekly Specials</h1>
                <p className="text-xs text-slate-400 font-mono">Limited seasonal creations crafted by Chef Antoine.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#12131c] border border-white/10 rounded-2xl p-6 space-y-3">
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-mono text-[10px]">Limited Edition</span>
                  <h3 className="text-lg font-bold text-white">White Truffle & Caviar Tagliolini</h3>
                  <p className="text-xs text-slate-400">Handmade pasta tossed in 36-month Parmigiano Reggiano foam and topped with fresh Alba white truffles.</p>
                  <div className="text-amber-300 font-mono font-bold">$68</div>
                </div>
                <div className="bg-[#12131c] border border-white/10 rounded-2xl p-6 space-y-3">
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-mono text-[10px]">Seasonal Pairing</span>
                  <h3 className="text-lg font-bold text-white">Château Margaux Grand Cru 2015</h3>
                  <p className="text-xs text-slate-400">Notes of blackcurrant, violet, and cedarwood. Perfectly decanted for your table.</p>
                  <div className="text-amber-300 font-mono font-bold">$190 / bottle</div>
                </div>
              </div>
            </div>
          )}

          {currentHash === 'gallery' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-white">Atmosphere & Dishes</h1>
                <p className="text-xs text-slate-400 font-mono">A visual tour of our dining rooms and culinary creations.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="h-48 rounded-2xl bg-[#12131c] border border-white/10 flex items-center justify-center text-slate-500 font-mono text-xs">
                    [Atmosphere Photo {i}]
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentHash === 'hours' && (
            <div className="space-y-6 max-w-xl">
              <div>
                <h1 className="text-2xl font-black text-white">Hours & Location</h1>
                <p className="text-xs text-slate-400 font-mono">Visit us in the heart of downtown.</p>
              </div>
              <div className="bg-[#12131c] border border-white/10 rounded-2xl p-6 space-y-4 font-mono text-xs">
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-slate-400">Tuesday – Thursday</span>
                  <span className="text-white">5:00 PM – 10:30 PM</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-slate-400">Friday – Saturday</span>
                  <span className="text-white">5:00 PM – 11:30 PM</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-slate-400">Sunday – Monday</span>
                  <span className="text-amber-400">Closed for Private Events</span>
                </div>
                <div className="pt-2 text-slate-300">
                  📍 450 Grand Avenue, Suite 100, Culinary District
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
