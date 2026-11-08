import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, RotateCcw } from 'lucide-react';
import { fireCelebrationConfetti } from '../utils/confetti';
import { musicBox } from '../utils/audioSynth';

export const SurpriseGift: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenGift = () => {
    if (isOpen) return;
    setIsOpen(true);
    musicBox.playGiftOpenSound();
    fireCelebrationConfetti();
  };

  const handleResetGift = () => {
    setIsOpen(false);
    musicBox.playMusicBoxNote(440, 0.3, 0.15);
  };

  return (
    <section id="gift-section" className="relative py-14 px-4 w-full flex flex-col items-center">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-tr from-pink-300/30 via-rose-200/25 to-purple-200/25 rounded-full blur-2xl pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100/90 text-pink-700 text-xs font-semibold uppercase tracking-wider mb-2 shadow-xs"
        >
          <Gift size={13} className="text-pink-500 animate-bounce" />
          <span>Interactive Unboxing</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-serif-display text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight"
        >
          One More Little Surprise... 🎁
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-slate-500 text-xs sm:text-sm mt-1 max-w-xs mx-auto"
        >
          Tap the gift box below to unwrap a final birthday greeting card.
        </motion.p>
      </div>

      {/* Interactive Gift Box Area */}
      <div className="relative z-10 w-full max-w-xs flex flex-col items-center my-3 perspective-1000">
        <div className="relative w-52 h-52 flex items-center justify-center">
          <motion.div
            onClick={!isOpen ? handleOpenGift : undefined}
            whileHover={!isOpen ? { scale: 1.05 } : {}}
            whileTap={!isOpen ? { scale: 0.95 } : {}}
            className={`relative w-44 h-44 filter drop-shadow-xl ${
              !isOpen ? 'cursor-pointer' : ''
            } transition-transform duration-300`}
            title={!isOpen ? 'Click to open gift!' : undefined}
          >
            <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
              <ellipse cx="100" cy="180" rx="75" ry="12" fill="#E2D2D6" opacity="0.6" />

              {/* Lower Box Body */}
              <rect x="40" y="90" width="120" height="85" rx="8" fill="#F472B6" />
              <rect x="90" y="90" width="20" height="85" fill="#FDE047" />
              <rect x="40" y="125" width="120" height="15" fill="#FDE047" />

              {/* Box Lid with Lift Animation */}
              <g
                style={{
                  transform: isOpen ? 'translateY(-50px) rotate(-14deg)' : 'translateY(0px) rotate(0deg)',
                  transformOrigin: '40px 90px',
                  transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <rect x="34" y="70" width="132" height="24" rx="5" fill="#EC4899" />
                <rect x="88" y="70" width="24" height="24" fill="#FDE047" />

                {/* Ribbon Bow on top */}
                <path
                  d="M 100 70 C 80 50 60 55 70 70 C 78 78 95 72 100 70 Z"
                  fill="#FACC15"
                  stroke="#EAB308"
                  strokeWidth="1.5"
                />
                <path
                  d="M 100 70 C 120 50 140 55 130 70 C 122 78 105 72 100 70 Z"
                  fill="#FACC15"
                  stroke="#EAB308"
                  strokeWidth="1.5"
                />
                <circle cx="100" cy="70" r="7" fill="#FEF08A" stroke="#EAB308" strokeWidth="1.5" />
              </g>

              {isOpen && (
                <g className="animate-pulse">
                  <circle cx="100" cy="60" r="3" fill="#FDE047" />
                  <circle cx="130" cy="40" r="2.5" fill="#F472B6" />
                  <circle cx="70" cy="45" r="3" fill="#A855F7" />
                  <circle cx="110" cy="30" r="2" fill="#F43F5E" />
                </g>
              )}
            </svg>
          </motion.div>
        </div>

        {/* Action Button & Revealed Greeting Message Card */}
        {!isOpen ? (
          <motion.button
            onClick={handleOpenGift}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            className="mt-3 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white font-heading font-bold text-sm sm:text-base shadow-lg shadow-pink-500/25 active:scale-95 transition-all cursor-pointer w-full min-h-[46px]"
          >
            <Gift size={18} />
            <span>Open Your Gift 🎁</span>
          </motion.button>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 30, rotateX: 60, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.6, type: 'spring', bounce: 0.35 }}
              className="mt-4 w-full bg-gradient-to-br from-pink-50 via-white to-amber-50 border-2 border-pink-200/90 rounded-2xl p-5 shadow-2xl text-center relative"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[10px] font-bold tracking-wider uppercase shadow-xs"
              >
                Special Birthday Card
              </motion.div>

              <div className="pt-2 space-y-3 text-slate-700">
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-heading font-semibold text-base text-rose-700"
                >
                  A Little Note from Inside...
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  className="text-xs sm:text-sm leading-relaxed text-slate-600 italic"
                >
                  &ldquo;Some moments are awkward, some memories are funny, but birthdays are always worth celebrating.&rdquo;
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-xs sm:text-sm leading-relaxed text-slate-700 font-medium"
                >
                  &ldquo;I hope today gives you a thousand little reasons to smile.&rdquo;
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75 }}
                  className="text-xs sm:text-sm font-bold text-pink-700 animate-text-gradient"
                >
                  &ldquo;Take care and have a beautiful year ahead! 💗&rdquo;
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="mt-5 pt-3 border-t border-pink-100 flex items-center justify-center"
              >
                <button
                  onClick={handleResetGift}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:text-pink-600 transition-colors cursor-pointer min-h-[36px] active:scale-95"
                >
                  <RotateCcw size={12} />
                  <span>Wrap Box Again</span>
                </button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
};
