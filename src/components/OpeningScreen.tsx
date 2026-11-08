import React from 'react';
import { motion } from 'motion/react';
import { CartoonCharacters } from './CartoonCharacters';
import { Sparkles, Heart } from 'lucide-react';
import { musicBox } from '../utils/audioSynth';

interface OpeningScreenProps {
  onContinue: () => void;
}

export const OpeningScreen: React.FC<OpeningScreenProps> = ({ onContinue }) => {
  const handleClick = () => {
    // Play a gentle sweet chime on button press and continue
    musicBox.playMusicBoxNote(523.25, 0.4, 0.2);
    setTimeout(() => musicBox.playMusicBoxNote(659.25, 0.4, 0.2), 120);
    onContinue();
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-3 py-6 overflow-hidden bg-gradient-to-b from-pink-100/90 via-purple-50/80 to-amber-50/70">
      {/* Soft ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-tr from-pink-300/30 to-purple-300/30 rounded-full blur-2xl pointer-events-none" />

      {/* Floating decorative sparkles & hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { top: '10%', left: '10%', delay: 0, size: 16, color: 'text-pink-400' },
          { top: '15%', right: '12%', delay: 1, size: 18, color: 'text-purple-400' },
          { top: '75%', left: '8%', delay: 1.5, size: 14, color: 'text-amber-400' },
          { top: '70%', right: '10%', delay: 0.5, size: 16, color: 'text-rose-400' },
          { top: '40%', left: '4%', delay: 2, size: 12, color: 'text-pink-300' },
          { top: '45%', right: '5%', delay: 1.2, size: 14, color: 'text-purple-300' },
        ].map((item, i) => (
          <motion.div
            key={i}
            className={`absolute ${item.color}`}
            style={{ top: item.top, left: item.left, right: item.right }}
            animate={{
              y: [-8, 8, -8],
              rotate: [0, 15, -15, 0],
              opacity: [0.4, 0.9, 0.4],
              scale: [0.9, 1.1, 0.9],
            }}
            transition={{
              repeat: Infinity,
              duration: 3 + i * 0.5,
              delay: item.delay,
              ease: 'easeInOut',
            }}
          >
            {i % 2 === 0 ? <Sparkles size={item.size} /> : <Heart size={item.size} fill="currentColor" />}
          </motion.div>
        ))}
      </div>

      {/* Main Glassmorphic Dialog Box - Mobile Sized */}
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-sm w-full bg-white/85 backdrop-blur-xl border border-pink-200/80 rounded-3xl p-5 sm:p-6 shadow-xl shadow-pink-200/40 text-center flex flex-col items-center"
      >
        {/* Cute Kicker with gentle animation */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100/90 border border-pink-200 text-pink-700 text-[11px] font-semibold uppercase tracking-wider mb-2 shadow-xs"
        >
          <Sparkles size={12} className="text-pink-500 animate-spin" />
          <span>A Quick Note Just for You</span>
        </motion.div>

        {/* Animated Cartoon Characters */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6, type: 'spring' }}
          className="my-1"
        >
          <CartoonCharacters mode="opening" />
        </motion.div>

        {/* Heading & Subtitle with Staggered Entrance */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="font-heading text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight mt-1 mb-2"
        >
          Hey You! Wait a Second... 👀
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-xs mb-6"
        >
          Before I wish you anything, I have something important to say...
        </motion.p>

        {/* Interactive Button */}
        <motion.button
          onClick={handleClick}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.65, duration: 0.4 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-pink-500/25 active:scale-95 transition-all cursor-pointer w-full min-h-[46px]"
        >
          <span>What Is It? 🤨</span>
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
            className="inline-block"
          >
            →
          </motion.span>
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="text-[11px] text-slate-400 mt-3 italic"
        >
          (Tap button to find out)
        </motion.p>
      </motion.div>
    </div>
  );
};
