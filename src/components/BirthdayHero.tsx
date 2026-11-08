import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Gift, Cake, ChevronDown } from 'lucide-react';

interface BirthdayHeroProps {
  onScrollToNext: () => void;
}

export const BirthdayHero: React.FC<BirthdayHeroProps> = ({ onScrollToNext }) => {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-12 text-center overflow-hidden bg-gradient-to-b from-pink-100/95 via-purple-50/85 to-[#fdf8f9]">
      {/* Golden & Pink Ambient Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-gradient-to-tr from-pink-300/35 via-rose-200/25 to-amber-200/25 rounded-full blur-2xl pointer-events-none" />

      {/* Floating Animated Balloons (Positioned within mobile boundary) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Left balloon */}
        <motion.div
          animate={{ y: [-8, 8, -8], rotate: [-3, 3, -3] }}
          transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
          className="absolute left-2 top-8 flex flex-col items-center opacity-75"
        >
          <div className="w-10 h-14 bg-gradient-to-tr from-pink-400 to-rose-300 rounded-[50%_50%_50%_50%/40%_40%_60%_60%] shadow-md shadow-pink-300/40 relative">
            <div className="absolute top-2 left-2 w-2 h-3.5 bg-white/40 rounded-full rotate-20" />
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1 bg-rose-400 rounded-xs" />
          </div>
          <div className="w-0.5 h-12 bg-pink-300/70" />
        </motion.div>

        {/* Right balloon */}
        <motion.div
          animate={{ y: [8, -8, 8], rotate: [3, -3, 3] }}
          transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut', delay: 0.5 }}
          className="absolute right-2 top-6 flex flex-col items-center opacity-75"
        >
          <div className="w-10 h-14 bg-gradient-to-tr from-amber-300 to-rose-300 rounded-[50%_50%_50%_50%/40%_40%_60%_60%] shadow-md shadow-amber-300/40 relative">
            <div className="absolute top-2 left-2 w-2 h-3.5 bg-white/40 rounded-full rotate-20" />
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1 bg-amber-400 rounded-xs" />
          </div>
          <div className="w-0.5 h-12 bg-amber-300/70" />
        </motion.div>
      </div>

      {/* Main Reveal Content */}
      <div className="relative z-10 w-full max-w-sm mx-auto flex flex-col items-center">
        {/* Kicker Tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-pink-200/90 shadow-xs text-pink-700 text-xs font-bold tracking-wide uppercase mb-4"
        >
          <Sparkles size={13} className="text-pink-500 animate-spin" />
          <span>FINALLY... THE MAIN REASON! 🎀</span>
        </motion.div>

        {/* Main Birthday Title - Scaled for Mobile */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif-display text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 tracking-tight leading-tight drop-shadow-xs mb-3"
        >
          HAPPY BIRTHDAY! 🎂
        </motion.h1>

        {/* Subtitle: 9 NOVEMBER — YOUR SPECIAL DAY */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex items-center justify-center gap-2 text-slate-800 font-heading text-sm sm:text-base font-bold tracking-wide mb-3"
        >
          <span className="h-px w-6 bg-pink-300" />
          <span className="text-pink-700">9 NOVEMBER</span>
          <span className="text-slate-400 font-light">·</span>
          <span className="text-slate-800">YOUR SPECIAL DAY</span>
          <span className="h-px w-6 bg-pink-300" />
        </motion.div>

        {/* Supporting text */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed mb-8 max-w-xs"
        >
          &ldquo;Today deserves a little extra happiness.&rdquo;
        </motion.p>

        {/* Quick Discovery Touch Grid */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="w-full grid grid-cols-2 gap-2.5 max-w-xs"
        >
          <a
            href="#cake-section"
            className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-white/95 border border-pink-200 text-slate-700 hover:text-pink-600 hover:border-pink-300 active:scale-95 transition-all text-xs font-semibold shadow-xs min-h-[44px]"
          >
            <Cake size={15} className="text-pink-500" />
            <span>The Cake 🎂</span>
          </a>

          <a
            href="#her-gallery"
            className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-white/95 border border-pink-200 text-slate-700 hover:text-pink-600 hover:border-pink-300 active:scale-95 transition-all text-xs font-semibold shadow-xs min-h-[44px]"
          >
            <Sparkles size={15} className="text-purple-500" />
            <span>Her Album 🌸</span>
          </a>

          <a
            href="#shared-memories"
            className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-white/95 border border-pink-200 text-slate-700 hover:text-pink-600 hover:border-pink-300 active:scale-95 transition-all text-xs font-semibold shadow-xs min-h-[44px]"
          >
            <Heart size={15} className="text-rose-500" />
            <span>Memories 🥹</span>
          </a>

          <a
            href="#gift-section"
            className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white active:scale-95 transition-all text-xs font-semibold shadow-xs min-h-[44px]"
          >
            <Gift size={15} />
            <span>The Gift 🎁</span>
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          onClick={onScrollToNext}
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="mt-10 p-2 text-pink-500/80 hover:text-pink-600 transition-colors flex flex-col items-center gap-1 cursor-pointer min-h-[44px] justify-center"
          aria-label="Scroll to birthday message"
        >
          <span className="text-[11px] font-semibold text-slate-500 tracking-wider">READ WISHES</span>
          <ChevronDown size={18} />
        </motion.button>
      </div>
    </section>
  );
};
