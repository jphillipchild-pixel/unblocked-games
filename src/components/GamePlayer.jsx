import { motion, AnimatePresence } from 'motion/react';
import { X, Maximize2, RotateCcw, Share2 } from 'lucide-react';
import { useState } from 'react';

export default function GamePlayer({ game, onClose }) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!game) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 md:p-8"
      >
        <div className="w-full max-w-6xl flex flex-col h-full hardware-border bg-brand-surface relative overflow-hidden">
          {/* Scanline effect inside player */}
          <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
            <div className="scanline" />
          </div>

          {/* Player Header */}
          <div className="p-4 border-b border-brand-border flex items-center justify-between bg-black/20 z-10">
            <div className="flex items-center gap-4">
              <div className="hardware-border bg-black p-2 hidden sm:block">
                <img src={game.thumbnail} className="w-8 h-8 object-cover opacity-80" alt="" referrerPolicy="no-referrer" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-brand-accent uppercase tracking-widest">Active Stream</span>
                <h2 className="text-xl font-bold uppercase tracking-tight">{game.title}</h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => window.location.reload()}
                className="p-2 hover:bg-white/10 transition-colors text-brand-dim hover:text-white"
                title="Refresh"
              >
                <RotateCcw size={18} />
              </button>
              <button 
                className="p-2 hover:bg-white/10 transition-colors text-brand-dim hover:text-white"
                title="Share"
              >
                <Share2 size={18} />
              </button>
              <div className="w-[1px] h-6 bg-brand-border mx-1" />
              <button 
                onClick={onClose}
                className="p-2 bg-brand-accent/10 border border-brand-accent/20 text-brand-accent hover:bg-brand-accent hover:text-black transition-all"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Iframe Container */}
          <div className="flex-1 bg-black relative">
            <iframe
              src={game.iframeUrl}
              className="w-full h-full border-none"
              title={game.title}
              allow="accelerometer; autoplay; clip-board-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Player Footer */}
          <div className="p-3 border-t border-brand-border flex items-center justify-between text-[10px] font-mono text-brand-dim bg-black/20 z-10 overflow-x-auto whitespace-nowrap">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
                <span>LINK_STABLE: {game.iframeUrl.slice(0, 30)}...</span>
              </div>
              <div className="hidden sm:block">RESOLUTION: 1080P_EMULATED</div>
              <div className="hidden md:block">LATENCY: 12ms</div>
            </div>
            
            <button 
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="flex items-center gap-1 hover:text-brand-accent transition-colors uppercase tracking-widest ml-4"
            >
              <Maximize2 size={12} />
              Full Screen
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
