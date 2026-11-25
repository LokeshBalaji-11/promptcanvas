import React, { useState, useEffect } from 'react';
import { Camera, ShoppingBag, Heart, ShoppingCart, Plus, Check } from 'lucide-react';

export const FashionApp: React.FC = () => {
  const [currentHash, setCurrentHash] = useState<string>(window.location.hash.replace('#/', '') || 'shop');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [wishlist, setWishlist] = useState<string[]>(['p1']);
  const [cart, setCart] = useState<{ id: string; name: string; price: number; size: string }[]>([]);

  const products = [
    { id: 'p1', name: 'Silk Oversized Trench', price: 420, cat: 'Outerwear' },
    { id: 'p2', name: 'Raw Denim Structured Jacket', price: 290, cat: 'Denim' },
    { id: 'p3', name: 'Cashmere Ribbed Knit', price: 220, cat: 'Knitwear' }
  ];

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

  const toggleWishlist = (id: string) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-[650px] bg-[#0c0c0e] text-slate-100 font-sans flex flex-col md:flex-row rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
      <aside className={`fixed md:relative inset-y-0 left-0 z-40 w-64 bg-[#070709] border-r border-white/10 flex flex-col transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-rose-400" />
            <span className="font-bold text-base tracking-wider text-white">VOGUE 2027</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 font-mono text-xs">
          {[
            { path: 'lookbook', label: 'Lookbook', icon: Camera },
            { path: 'shop', label: 'Catalog & Filters', icon: ShoppingBag },
            { path: 'wishlist', label: `Wishlist (${wishlist.length})`, icon: Heart },
            { path: 'cart', label: `Cart (${cart.length})`, icon: ShoppingCart }
          ].map(item => {
            const Icon = item.icon;
            const isActive = currentHash === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${
                  isActive ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-[#070709]/80 backdrop-blur-md border-b border-white/10 px-6 flex items-center justify-between z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg bg-white/5 text-white">☰</button>
            <span className="font-mono text-xs text-rose-400 uppercase tracking-widest">[FASHION] / {currentHash}</span>
          </div>
          <button onClick={() => navigate('cart')} className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-black font-bold text-xs font-mono shadow-lg flex items-center gap-2">
            <ShoppingCart className="w-3.5 h-3.5" /> Bag ({cart.length})
          </button>
        </header>

        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {currentHash === 'shop' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-white">Fall/Winter Collection</h1>
                <p className="text-xs text-slate-400 font-mono">Curated luxury apparel and outerwear.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.map(p => {
                  const isFav = wishlist.includes(p.id);
                  return (
                    <div key={p.id} className="bg-[#14141a] border border-white/10 rounded-2xl p-6 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-mono text-rose-400">{p.cat}</span>
                          <button onClick={() => toggleWishlist(p.id)} className={`p-2 rounded-xl border ${isFav ? 'bg-rose-500/20 border-rose-500 text-rose-400' : 'bg-white/5 border-white/10 text-slate-400'}`}>
                            <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-400' : ''}`} />
                          </button>
                        </div>
                        <h3 className="text-base font-bold text-white">{p.name}</h3>
                        <div className="text-sm font-mono font-bold text-rose-300 mt-1">${p.price}</div>
                      </div>
                      <button onClick={() => setCart([...cart, { id: p.id, name: p.name, price: p.price, size: 'M' }])} className="w-full py-2.5 bg-rose-500 hover:bg-rose-400 text-black font-bold text-xs font-mono rounded-xl">
                        Add to Bag (Size M)
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {currentHash === 'lookbook' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-white">Runway Lookbook</h1>
                <p className="text-xs text-slate-400 font-mono">Paris Fashion Week 2027 showcase.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2].map(i => (
                  <div key={i} className="h-64 rounded-2xl bg-[#14141a] border border-white/10 flex items-center justify-center text-slate-500 font-mono text-xs">
                    [Runway Lookbook Photo {i}]
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentHash === 'wishlist' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-white">Your Wishlist</h1>
                <p className="text-xs text-slate-400 font-mono">Saved favorite pieces.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.filter(p => wishlist.includes(p.id)).map(p => (
                  <div key={p.id} className="bg-[#14141a] border border-white/10 rounded-2xl p-6 space-y-2">
                    <h3 className="text-base font-bold text-white">{p.name}</h3>
                    <div className="text-sm font-mono text-rose-300">${p.price}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentHash === 'cart' && (
            <div className="space-y-6 max-w-xl">
              <div>
                <h1 className="text-2xl font-black text-white">Shopping Bag</h1>
                <p className="text-xs text-slate-400 font-mono">Review items before secure checkout.</p>
              </div>
              <div className="bg-[#14141a] border border-white/10 rounded-2xl p-6 space-y-4 font-mono text-xs">
                {cart.length === 0 ? (
                  <p className="text-slate-400">Your bag is empty.</p>
                ) : (
                  <>
                    {cart.map((item, idx) => (
                      <div key={idx} className="flex justify-between py-2 border-b border-white/5">
                        <span className="text-white">{item.name} (Size: {item.size})</span>
                        <span className="text-rose-300">${item.price}</span>
                      </div>
                    ))}
                    <button onClick={() => alert('Checkout flow simulated!')} className="w-full py-3 bg-rose-500 text-black font-bold rounded-xl mt-4">
                      Proceed to Checkout (${cart.reduce((a,b)=>a+b.price,0)})
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
