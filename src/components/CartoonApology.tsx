import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CartoonCharacters } from './CartoonCharacters';
import { fireCelebrationConfetti, fireGentleHeartConfetti } from '../utils/confetti';
import { musicBox } from '../utils/audioSynth';
import { Sparkles, Heart } from 'lucide-react';

interface CartoonApologyProps {
  onAcceptAndCelebrate: () => void;
}

interface FloatingEmoji {
  id: number;
  x: number;
  y: number;
  char: string;
}

const APOLOGY_PARAGRAPHS = [
  "Well, before anything else...",
  "I'm sorry about that little awkward moment.",
  "Maybe I shouldn't have talked that way. And if my words or actions made you uncomfortable, I genuinely apologize.",
  "No excuses, no arguments — just a little sorry from my side.",
  "I hope we can leave that awkward moment behind.",
  "And please... don't let this apology become another reason to roll your eyes! 😂",
];

export const CartoonApology: React.FC<CartoonApologyProps> = ({ onAcceptAndCelebrate }) => {
  const [isThrowingSign, setIsThrowingSign] = useState(false);
  const [activeInteractive, setActiveInteractive] = useState<string | null>(null);
  const [peaceCount, setPeaceCount] = useState(0);
  const [floatingEmojis, setFloatingEmojis] = useState<FloatingEmoji[]>([]);

  const handleCelebrate = () => {
    setIsThrowingSign(true);
    musicBox.playConfettiPopSound();
    fireCelebrationConfetti();
    fireGentleHeartConfetti();

    // Start melody gently if not already playing
    if (!musicBox.getIsPlaying()) {
      musicBox.startMelody();
    }

    setTimeout(() => {
      onAcceptAndCelebrate();
    }, 1100);
  };

  const handlePeaceClick = () => {
    setPeaceCount((c) => c + 1);
    setActiveInteractive('peace');
    musicBox.playMusicBoxNote(659.25, 0.4, 0.2);
    setTimeout(() => {
      musicBox.playMusicBoxNote(783.99, 0.5, 0.2);
    }, 120);
  };

  const spawnEmojiAt = (e: React.MouseEvent<HTMLElement>, char: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newEmoji: FloatingEmoji = {
      id: Date.now() + Math.random(),
      x,
      y,
      char,
    };

    setFloatingEmojis((prev) => [...prev.slice(-6), newEmoji]);
    musicBox.playMusicBoxNote(523.25, 0.2, 0.1);

    setTimeout(() => {
      setFloatingEmojis((prev) => prev.filter((item) => item.id !== newEmoji.id));
    }, 1400);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-3 py-6 overflow-hidden bg-gradient-to-b from-purple-50 via-pink-50 to-amber-50">
      {/* Background Soft Lighting Gradients */}
      <div className="absolute -top-10 -left-10 w-64 h-64 bg-pink-200/35 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute top-1/3 -right-10 w-64 h-64 bg-purple-200/25 rounded-full blur-2xl pointer-events-none" />

      {/* Main Apology Card - Scaled for Mobile */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-sm w-full bg-white/85 backdrop-blur-xl border border-pink-200/80 rounded-3xl p-4 sm:p-5 shadow-xl shadow-pink-200/40 flex flex-col items-center text-center my-2"
      >
        {/* Playful Kicker */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100/90 border border-amber-200/80 text-amber-900 text-[11px] font-semibold mb-1 shadow-xs"
        >
          <span>Official Peace Treaty 🕊️</span>
        </motion.div>

        {/* The Animated Cartoon Scene */}
        <div className="w-full flex justify-center py-1">
          <CartoonCharacters
            mode={isThrowingSign ? 'throwing' : 'apology'}
            isPeaceWaved={activeInteractive === 'peace'}
            onBoyClick={() => setActiveInteractive('boy')}
            onTeddyClick={() => setActiveInteractive('teddy')}
            onSignClick={handlePeaceClick}
          />
        </div>

        {/* 3 Playful Interactive Options (Horizontal Touch Row) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="w-full grid grid-cols-3 gap-1.5 my-2.5"
        >
          {/* Option 1: Teddy offering flower */}
          <button
            onClick={() => {
              setActiveInteractive('teddy');
              musicBox.playMusicBoxNote(587.33, 0.3, 0.15);
            }}
            className={`flex flex-col items-center justify-center p-2 rounded-xl border text-[11px] font-medium transition-all min-h-[46px] cursor-pointer active:scale-95 ${
              activeInteractive === 'teddy'
                ? 'bg-rose-50 border-rose-300 text-rose-800 shadow-xs ring-1 ring-rose-200'
                : 'bg-white/70 border-pink-100 text-slate-700 hover:bg-rose-50/60'
            }`}
          >
            <span className="text-sm">🧸</span>
            <span className="truncate w-full text-center">Flower</span>
          </button>

          {/* Option 2: Boy apologetic expression */}
          <button
            onClick={() => {
              setActiveInteractive('boy');
              musicBox.playMusicBoxNote(523.25, 0.3, 0.15);
            }}
            className={`flex flex-col items-center justify-center p-2 rounded-xl border text-[11px] font-medium transition-all min-h-[46px] cursor-pointer active:scale-95 ${
              activeInteractive === 'boy'
                ? 'bg-pink-50 border-pink-300 text-pink-800 shadow-xs ring-1 ring-pink-200'
                : 'bg-white/70 border-pink-100 text-slate-700 hover:bg-pink-50/60'
            }`}
          >
            <span className="text-sm">🙇‍♂️</span>
            <span className="truncate w-full text-center">Sorry Bow</span>
          </button>

          {/* Option 3: Peace, Please! sign */}
          <button
            onClick={handlePeaceClick}
            className={`flex flex-col items-center justify-center p-2 rounded-xl border text-[11px] font-medium transition-all min-h-[46px] cursor-pointer active:scale-95 ${
              activeInteractive === 'peace'
                ? 'bg-amber-50 border-amber-300 text-amber-800 shadow-xs ring-1 ring-amber-200'
                : 'bg-white/70 border-pink-100 text-slate-700 hover:bg-amber-50/60'
            }`}
          >
            <span className="text-sm">🕊️</span>
            <span className="truncate w-full text-center">Peace {peaceCount > 0 ? `(${peaceCount})` : ''}</span>
          </button>
        </motion.div>

        {/* Apology Message Prose with Animated Staggered Lines */}
        <div className="relative bg-pink-50/65 border border-pink-100/90 rounded-2xl p-4 text-left text-slate-700 space-y-2.5 shadow-inner my-1 w-full overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.4 }}
            className="text-center"
          >
            <h2 className="font-heading text-lg font-bold text-slate-900">
              Okay... I Admit It! 😅
            </h2>
            <div className="h-0.5 w-10 bg-pink-300 mx-auto rounded-full mt-1 mb-2" />
          </motion.div>

          {/* Staggered Paragraphs */}
          {APOLOGY_PARAGRAPHS.map((text, idx) => {
            const isLast = idx === APOLOGY_PARAGRAPHS.length - 1;
            return (
              <motion.p
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + idx * 0.1, duration: 0.45 }}
                onClick={(e) => spawnEmojiAt(e, isLast ? '😂' : idx % 2 === 0 ? '🕊️' : '❤️')}
                className={`text-xs sm:text-sm leading-relaxed cursor-pointer select-none transition-colors hover:text-pink-800 ${
                  isLast ? 'font-semibold text-pink-700' : 'text-slate-700'
                }`}
                title="Tap line for cute reaction"
              >
                {text}
              </motion.p>
            );
          })}

          {/* Floating emoji reactions generated from tapping lines */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <AnimatePresence>
              {floatingEmojis.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 1, scale: 0.6, y: 0 }}
                  animate={{ opacity: 0, scale: 1.4, y: -50 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.1, ease: 'easeOut' }}
                  className="absolute text-xl pointer-events-none select-none drop-shadow"
                  style={{ left: item.x - 10, top: item.y - 10 }}
                >
                  {item.char}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-4 flex flex-col items-center gap-1.5 w-full">
          <motion.button
            onClick={handleCelebrate}
            disabled={isThrowingSign}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.95, duration: 0.4 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white font-bold text-sm sm:text-base shadow-lg shadow-pink-500/30 active:scale-95 transition-all cursor-pointer w-full min-h-[46px]"
          >
            <Sparkles size={16} className="animate-spin text-amber-200" />
            <span>Okay, Let&apos;s Celebrate! 😂</span>
            <Heart size={16} fill="currentColor" className="text-rose-200 animate-pulse" />
          </motion.button>

          <p className="text-[11px] text-slate-500 italic mt-0.5">
            &ldquo;No pressure. Just wanted to say sorry.&rdquo;
          </p>
        </div>
      </motion.div>
    </div>
  );
};
