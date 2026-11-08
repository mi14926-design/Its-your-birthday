import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowUp, RefreshCcw, Heart } from 'lucide-react';
import { fireCelebrationConfetti } from '../utils/confetti';
import { musicBox } from '../utils/audioSynth';

interface FinalScreenProps {
  onReplayStory: () => void;
  onScrollToTop: () => void;
}

const CLOSING_LINES = [
  { text: "Forget the little awkward moments.", style: "text-slate-600" },
  { text: "Today is your day.", style: "font-semibold text-slate-800 text-lg" },
  { text: "Smile a little more, laugh a little louder, and enjoy every beautiful moment.", style: "text-slate-600" },
  { text: "Wishing you happiness today and always!", style: "text-pink-700 font-semibold text-base" },
];

export const FinalScreen: React.FC<FinalScreenProps> = ({
  onReplayStory,
  onScrollToTop,
}) => {
  const handleMoreConfetti = () => {
    fireCelebrationConfetti();
    musicBox.playConfettiPopSound();
  };

  return (
    <footer className="relative min-h-[85vh] flex flex-col items-center justify-between px-4 py-14 text-center overflow-hidden bg-gradient-to-b from-[#fdf8f9] via-pink-100/80 to-purple-100/90 border-t border-pink-100 pb-24">
      {/* Cinematic Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-64 h-64 bg-gradient-to-tr from-pink-300/35 via-rose-200/30 to-purple-200/35 rounded-full blur-2xl pointer-events-none" />

      {/* Floating Sparkles & Hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [-6, 6, -6], rotate: [-5, 5, -5] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          className="absolute top-12 left-6 text-pink-400 opacity-60"
        >
          <Sparkles size={18} />
        </motion.div>
        <motion.div
          animate={{ y: [6, -6, 6], rotate: [5, -5, 5] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 0.5 }}
          className="absolute top-20 right-6 text-purple-400 opacity-60"
        >
          <Heart size={16} fill="currentColor" />
        </motion.div>
      </div>

      {/* Center Main Message */}
      <div className="relative z-10 w-full max-w-xs mx-auto flex flex-col items-center my-auto">
        {/* Kicker */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-pink-200/90 text-pink-700 text-xs font-bold tracking-widest uppercase mb-4 shadow-xs"
        >
          <Sparkles size={12} className="text-pink-500 animate-spin" />
          <span>ONE LAST THING...</span>
        </motion.div>

        {/* Staggered Closing Message Lines */}
        <div className="space-y-3.5 text-slate-700 text-sm sm:text-base font-medium leading-relaxed mb-6">
          {CLOSING_LINES.map((line, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className={line.style}
            >
              {line.text}
            </motion.p>
          ))}
        </div>

        {/* Main Heading with Shimmer Animation */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="font-serif-display text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 tracking-tight drop-shadow-xs mb-8 animate-text-gradient"
        >
          HAPPY BIRTHDAY ONCE AGAIN! 🎂💗
        </motion.h2>

        {/* Action Buttons (Stacked Mobile Ergonomics) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="w-full flex flex-col gap-2.5"
        >
          <button
            onClick={handleMoreConfetti}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold text-xs sm:text-sm shadow-md shadow-pink-500/20 active:scale-95 transition-all cursor-pointer min-h-[44px]"
          >
            <Sparkles size={15} />
            <span>More Confetti! 🎉</span>
          </button>

          <button
            onClick={onScrollToTop}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white/95 border border-pink-200 text-slate-700 hover:text-pink-600 font-semibold text-xs sm:text-sm shadow-xs active:scale-95 transition-all cursor-pointer min-h-[44px]"
          >
            <ArrowUp size={15} />
            <span>Back to Top</span>
          </button>

          <button
            onClick={onReplayStory}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white/95 border border-pink-200 text-slate-700 hover:text-purple-600 font-semibold text-xs sm:text-sm shadow-xs active:scale-95 transition-all cursor-pointer min-h-[44px]"
          >
            <RefreshCcw size={14} />
            <span>Replay From Opening</span>
          </button>
        </motion.div>
      </div>

      {/* Footer Text */}
      <div className="relative z-10 mt-10 pt-6 border-t border-pink-200/60 w-full max-w-xs text-center">
        <p className="text-xs text-slate-500 font-medium leading-relaxed">
          Made with a little apology, a little humor, and lots of good wishes.
        </p>
        <p className="text-[10px] text-slate-400 mt-1">
          Special 9 November Birthday Edition
        </p>
      </div>
    </footer>
  );
};
