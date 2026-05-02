import { useState, useMemo } from 'react';
import gamesData from './data/games.json';
import GameCard from './components/GameCard';
import GamePlayer from './components/GamePlayer';
import { Search, Gamepad2, LayoutGrid, Terminal, Activity, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(() => {
    const cats = new Set(gamesData.map(g => g.category));
    return ['All', ...Array.from(cats)].sort();
  }, []);

  const filteredGames = useMemo(() => {
    return gamesData.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || game.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden bg-brand-bg text-white font-sans">
      {/* Background Grid & Scanline */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#00ff9d_1px,transparent_1px)] [background-size:20px_20px] z-0" />
      <div className="scanline z-50 pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-brand-bg/80 backdrop-blur-md border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 hardware-border bg-brand-surface flex items-center justify-center text-brand-accent">
              <Gamepad2 size={24} />
            </div>
            <div>
              <h1 className="text-xl font-black uppercase tracking-tighter italic">
                Nexus<span className="text-brand-accent">Games</span>
              </h1>
              <div className="flex items-center gap-2 text-[9px] font-mono text-brand-dim uppercase tracking-widest mt-0.5">
                <span className="flex items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-brand-accent animate-pulse" />
                  Status: Online
                </span>
                <span className="opacity-30">|</span>
                <span>V2.4.0</span>
              </div>
            </div>
          </div>

          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-dim group-focus-within:text-brand-accent transition-colors" size={18} />
              <input
                type="text"
                placeholder="PROBE_DATABASE_FOR_TITLES..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/40 border border-brand-border py-2.5 pl-10 pr-4 text-sm font-mono focus:outline-none focus:border-brand-accent transition-all placeholder:text-brand-dim/50 uppercase tracking-tight"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 lg:gap-6 shrink-0">
            <div className="hidden lg:flex flex-col items-end">
              <span className="text-[10px] font-mono text-brand-dim uppercase">Uptime</span>
              <span className="text-sm font-bold font-mono">99.98%</span>
            </div>
            <div className="hidden lg:block w-[1px] h-8 bg-brand-border" />
            <button className="hardware-border bg-brand-surface p-2 text-brand-accent hover:bg-brand-accent hover:text-black transition-all">
              <Activity size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 relative z-10 flex flex-col md:flex-row gap-8">
        {/* Mobile Search */}
        <div className="md:hidden w-full mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-dim" size={18} />
            <input
              type="text"
              placeholder="SEARCH_GAMES..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/40 border border-brand-border py-3 pl-10 pr-4 text-sm font-mono focus:outline-none focus:border-brand-accent transition-all"
            />
          </div>
        </div>

        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
          <section>
            <div className="flex items-center gap-2 mb-4">
              <LayoutGrid size={16} className="text-brand-accent" />
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-brand-dim">Categories</h2>
            </div>
            <div className="space-y-1">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full text-left px-4 py-2.5 text-sm uppercase tracking-wider transition-all border-l-2 ${
                    activeCategory === cat 
                      ? 'bg-brand-accent/10 border-brand-accent text-brand-accent font-bold' 
                      : 'border-transparent text-brand-dim hover:text-white hover:bg-white/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </section>

          <section className="hidden md:block">
            <div className="flex items-center gap-2 mb-4">
              <Terminal size={16} className="text-brand-accent" />
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-brand-dim">System Info</h2>
            </div>
            <div className="p-4 hardware-border bg-black/40 text-[10px] font-mono text-brand-dim leading-relaxed">
              <p>USER@NEXUS_GAMES:~$ STATS</p>
              <p className="text-white mt-1">AVAILABLE: {gamesData.length}</p>
              <p className="text-white">FILTERED: {filteredGames.length}</p>
              <div className="mt-3 space-y-1">
                <div className="flex justify-between">
                  <span>CPU_LOAD</span>
                  <span className="text-brand-accent">14%</span>
                </div>
                <div className="w-full bg-white/5 h-1">
                  <div className="bg-brand-accent w-[14%] h-full" />
                </div>
              </div>
            </div>
          </section>
        </aside>

        {/* Game Grid */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-8">
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-brand-accent uppercase tracking-[0.3em]">Game Repository</span>
              <h2 className="text-3xl font-black uppercase tracking-tight">
                {activeCategory === 'All' ? 'Latest Releases' : activeCategory}
              </h2>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-brand-dim">
              <LayoutGrid size={20} className={filteredGames.length > 0 ? 'text-brand-accent' : ''} />
              <span className="font-mono text-xs uppercase">{filteredGames.length} UNITS</span>
            </div>
          </div>

          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredGames.map((game) => (
                  <GameCard 
                    key={game.id} 
                    game={game} 
                    onClick={setSelectedGame} 
                  />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="hardware-border bg-brand-surface/50 p-12 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 border border-dashed border-brand-border rounded-full flex items-center justify-center text-brand-dim mb-4 mb-4">
                <Info size={32} />
              </div>
              <p className="font-mono text-brand-dim uppercase tracking-widest text-sm">No matches found in database</p>
              <button 
                onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                className="mt-6 text-brand-accent hover:underline uppercase text-xs font-mono tracking-widest"
              >
                Clear All Parameters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-brand-border bg-black/40 py-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-[10px] font-mono text-brand-dim uppercase tracking-widest text-center md:text-left">
            &copy; 2026 NEXUS_GAMES_CORP. ALL RIGHTS RESERVED. <br />
            UNAUTHORIZED ACCESS IS PROHIBITED.
          </div>
          <div className="flex gap-4">
            {['Discord', 'Twitter', 'GitHub'].map(social => (
              <a key={social} href="#" className="text-brand-dim hover:text-brand-accent transition-colors text-[10px] font-mono uppercase tracking-widest border border-brand-border px-3 py-1 bg-brand-surface">
                {social}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* Game Player Overlay */}
      <GamePlayer 
        game={selectedGame} 
        onClose={() => setSelectedGame(null)} 
      />
    </div>
  );
}
