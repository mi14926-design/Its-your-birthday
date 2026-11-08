import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, RefreshCw, Eye } from 'lucide-react';
import { musicBox } from '../utils/audioSynth';
import { fireGentleHeartConfetti } from '../utils/confetti';

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
}

const FULL_PARAGRAPHS = [
  "Well, it's your special day!",
  "I hope this new chapter of your life brings you endless happiness, beautiful opportunities, unforgettable memories, and countless reasons to smile.",
  "May your dreams slowly turn into reality, may your hard work bring wonderful results, and may life surprise you with things even more beautiful than you imagined.",
  "Keep smiling, keep growing, and never stop being yourself.",
  "You deserve a day filled with happiness, laughter, and beautiful moments.",
  "Once again...",
  "HAPPY BIRTHDAY! ❤️"
];

const FULL_TEXT = FULL_PARAGRAPHS.join('\n\n');

export const HeartfeltMessage: React.FC = () => {
  const [displayedLength, setDisplayedLength] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(true);
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);

  useEffect(() => {
    if (!isTyping) return;

    if (displayedLength < FULL_TEXT.length) {
      const char = FULL_TEXT[displayedLength];
      const delay = char === '.' || char === '!' ? 80 : char === ',' ? 45 : 20;

      const timer = setTimeout(() => {
        setDisplayedLength((prev) => prev + 1);
      }, delay);

      return () => clearTimeout(timer);
    } else {
      setIsTyping(false);
      fireGentleHeartConfetti();
    }
  }, [displayedLength, isTyping]);

  const handleRevealAll = () => {
    setDisplayedLength(FULL_TEXT.length);
    setIsTyping(false);
    fireGentleHeartConfetti();
    musicBox.playMusicBoxNote(659.25, 0.3, 0.15);
  };

  const handleReplay = () => {
    setDisplayedLength(0);
    setIsTyping(true);
    musicBox.playMusicBoxNote(523.25, 0.3, 0.15);
  };

  const handleCardTap = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newHeart: FloatingHeart = {
      id: Date.now() + Math.random(),
      x,
      y,
    };

    setFloatingHearts((prev) => [...prev.slice(-6), newHeart]);
    musicBox.playMusicBoxNote(783.99, 0.2, 0.08);

    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1400);
  };

  const currentText = FULL_TEXT.slice(0, displayedLength);
  const paragraphs = currentText.split('\n\n');

  return (
    <section id="heartfelt-message" className="relative py-14 px-4 w-full">
      {/* Soft background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-pink-200/40 via-purple-200/30 to-rose-200/40 rounded-full blur-2xl pointer-events-none" />

      {/* Decorative Title */}
      <div className="text-center mb-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100/90 text-pink-700 text-xs font-semibold uppercase tracking-wider mb-2 shadow-xs"
        >
          <Heart size={12} className="text-pink-500 fill-pink-500 animate-pulse" />
          <span>From the Heart</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-serif-display text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight"
        >
          A Note for Your Day 💌
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-slate-500 text-xs sm:text-sm mt-1 max-w-xs mx-auto"
        >
          Words to wish you everything bright and wonderful.
        </motion.p>
      </div>

      {/* Card Container - Mobile Sized with Animated Gradient Border */}
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6 }}
        onClick={handleCardTap}
        className="relative z-10 max-w-sm mx-auto bg-white/95 backdrop-blur-xl border-2 border-pink-200/90 rounded-3xl p-5 sm:p-6 shadow-xl shadow-pink-100/60 overflow-hidden cursor-pointer"
        title="Tap card for floating hearts"
      >
        {/* Floating background ambient sparkles */}
        <div className="absolute top-3.5 left-3.5 text-pink-300 pointer-events-none animate-pulse">
          <Sparkles size={16} />
        </div>
        <div className="absolute top-3.5 right-3.5 text-pink-300 pointer-events-none animate-pulse" style={{ animationDelay: '0.7s' }}>
          <Sparkles size={16} />
        </div>

        {/* Typing message content */}
        <div className="space-y-3.5 font-sans text-slate-700 text-sm sm:text-base leading-relaxed max-w-xs mx-auto pt-2">
          {paragraphs.map((p, idx) => {
            const isLast = idx === paragraphs.length - 1;
            const isHappyBirthday = p.includes('HAPPY BIRTHDAY');

            if (isHappyBirthday) {
              return (
                <div key={idx} className="pt-4 text-center">
                  <motion.span
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="font-serif-display text-xl sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 tracking-tight drop-shadow-xs animate-text-gradient"
                  >
                    {p}
                  </motion.span>
                  {isTyping && isLast && (
                    <span className="inline-block w-1.5 h-5 bg-pink-500 ml-1 animate-pulse" />
                  )}
                </div>
              );
            }

            return (
              <p
                key={idx}
                className={`${
                  idx === 0
                    ? 'font-serif-display text-lg sm:text-xl text-slate-900 font-semibold italic'
                    : 'text-slate-700'
                }`}
              >
                {p}
                {isTyping && isLast && (
                  <span className="inline-block w-1.5 h-4 bg-pink-500 ml-1 align-middle animate-pulse" />
                )}
              </p>
            );
          })}
        </div>

        {/* Tap-spawned Floating Hearts */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
          <AnimatePresence>
            {floatingHearts.map((h) => (
              <motion.div
                key={h.id}
                initial={{ opacity: 1, scale: 0.6, y: 0 }}
                animate={{ opacity: 0, scale: 1.4, y: -60 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="absolute text-rose-500 pointer-events-none drop-shadow"
                style={{ left: h.x - 10, top: h.y - 10 }}
              >
                <Heart size={20} fill="currentColor" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Controls: Reveal All / Replay */}
        <div className="mt-6 pt-4 border-t border-pink-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            {isTyping ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRevealAll();
                }}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-pink-50 text-pink-700 hover:bg-pink-100 font-medium transition-colors cursor-pointer min-h-[36px] active:scale-95"
              >
                <Eye size={13} />
                <span>Show all</span>
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleReplay();
                }}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-pink-50 text-pink-700 hover:bg-pink-100 font-medium transition-colors cursor-pointer min-h-[36px] active:scale-95"
              >
                <RefreshCw size={13} />
                <span>Replay</span>
              </button>
            )}
          </div>

          <span className="text-pink-500 font-handwriting text-base">
            Warmest wishes 🌸
          </span>
        </div>
      </motion.div>
    </section>
  );
};
