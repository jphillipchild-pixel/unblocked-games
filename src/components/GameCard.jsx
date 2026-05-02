import { motion } from 'motion/react';
import { Play } from 'lucide-react';

export default function GameCard({ game, onClick }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="hardware-card group cursor-pointer"
      onClick={() => onClick(game)}
    >
      <div className="hardware-border bg-brand-surface p-3 overflow-hidden">
        <div className="relative aspect-video mb-3 overflow-hidden">
          <img
            src={game.thumbnail}
            alt={game.title}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="w-12 h-12 bg-brand-accent rounded-full flex items-center justify-center text-black">
              <Play size={24} fill="currentColor" />
            </div>
          </div>
          <div className="absolute top-2 right-2 px-2 py-1 bg-black/80 border border-brand-border text-[10px] font-mono text-brand-accent tracking-widest uppercase">
            {game.category}
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg leading-tight tracking-tight uppercase group-hover:text-brand-accent transition-colors">
              {game.title}
            </h3>
            <span className="text-[10px] font-mono text-brand-dim">
              ID: {game.id.slice(0, 4)}
            </span>
          </div>
          <p className="text-xs text-brand-dim line-clamp-2 leading-relaxed">
            {game.description}
          </p>
        </div>
        
        <div className="mt-4 pt-3 border-t border-brand-border flex items-center justify-between opacity-50 group-hover:opacity-100 transition-opacity">
          <div className="flex gap-1">
            <div className="w-1 h-1 rounded-full bg-brand-accent" />
            <div className="w-1 h-1 rounded-full bg-brand-accent animate-pulse" />
            <div className="w-1 h-1 rounded-full bg-brand-accent" />
          </div>
          <span className="text-[9px] font-mono uppercase tracking-[0.2em]">Ready to load</span>
        </div>
      </div>
    </motion.div>
  );
}
