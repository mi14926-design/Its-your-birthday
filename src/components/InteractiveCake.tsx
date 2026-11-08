import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, RefreshCw } from 'lucide-react';
import { fireCakeBlowConfetti, fireCelebrationConfetti } from '../utils/confetti';
import { musicBox } from '../utils/audioSynth';

export const InteractiveCake: React.FC = () => {
  const [candlesBlown, setCandlesBlown] = useState<boolean>(false);
  const [isBlowing, setIsBlowing] = useState<boolean>(false);

  const handleBlowCandles = () => {
    if (candlesBlown || isBlowing) return;
    setIsBlowing(true);

    musicBox.playCandleBlowSound();

    setTimeout(() => {
      setCandlesBlown(true);
      setIsBlowing(false);
      fireCakeBlowConfetti();
      setTimeout(() => fireCelebrationConfetti(), 350);
    }, 400);
  };

  const handleRelight = () => {
    setCandlesBlown(false);
    musicBox.playMusicBoxNote(523.25, 0.4, 0.18);
  };

  return (
    <section id="cake-section" className="relative py-14 px-4 w-full flex flex-col items-center">
      {/* Glow Halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-tr from-pink-300/30 via-amber-200/25 to-purple-200/30 rounded-full blur-2xl pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-6 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100/90 text-pink-700 text-xs font-semibold uppercase tracking-wider mb-2">
          <Sparkles size={13} className="text-pink-500" />
          <span>Interactive Centerpiece</span>
        </div>
        <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
          Make a Wish! ✨
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-xs mx-auto">
          Close your eyes, think of your sweetest dream, and blow out the candles!
        </p>
      </div>

      {/* 3D-Style Cake Display Container */}
      <div className="relative z-10 w-full max-w-xs flex flex-col items-center my-2">
        {/* Wish Announcement Badge */}
        <AnimatePresence>
          {candlesBlown && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.4, type: 'spring' }}
              className="mb-4 px-4 py-2.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-heading font-bold text-xs sm:text-sm shadow-lg shadow-pink-500/25 flex items-center gap-1.5"
            >
              <Heart size={16} fill="currentColor" className="text-rose-200 animate-pulse" />
              <span>Wish You All the Happiness! 💗</span>
              <Sparkles size={14} className="text-amber-200" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cake Illustration - Scaled for Mobile Viewports */}
        <div className="relative w-64 h-72 flex items-center justify-center filter drop-shadow-xl">
          <svg viewBox="0 0 320 360" className="w-full h-full overflow-visible">
            {/* Cake Plate Stand */}
            <ellipse cx="160" cy="330" rx="140" ry="18" fill="#FCE7F3" stroke="#F472B6" strokeWidth="2" />
            <ellipse cx="160" cy="326" rx="130" ry="14" fill="#FFFFFF" />
            <path d="M 120 330 L 110 348 L 210 348 L 200 330 Z" fill="#FBCFE8" />

            {/* BOTTOM LAYER (Tier 3) */}
            <path
              d="M 50 250 C 50 240 70 230 160 230 C 250 230 270 240 270 250 L 270 295 C 270 315 250 325 160 325 C 70 325 50 315 50 295 Z"
              fill="#F472B6"
            />
            {/* Frosting drips */}
            <path
              d="M 50 252 C 60 272 75 272 85 254 C 95 274 110 274 120 254 C 130 274 145 274 155 254 C 165 274 180 274 190 254 C 200 274 215 274 225 254 C 235 274 250 274 260 254 C 265 264 268 260 270 252"
              fill="none"
              stroke="#FFF1F2"
              strokeWidth="9"
              strokeLinecap="round"
            />
            {/* Pearl sprinkles on bottom tier */}
            {[75, 105, 135, 165, 195, 225, 245].map((x, i) => (
              <circle key={`pearl-b-${i}`} cx={x} cy={285 + (i % 2 === 0 ? -4 : 4)} r="3.5" fill="#FEF08A" />
            ))}

            {/* MIDDLE LAYER (Tier 2) */}
            <path
              d="M 80 175 C 80 165 100 155 160 155 C 220 155 240 165 240 175 L 240 220 C 240 238 220 248 160 248 C 100 248 80 238 80 220 Z"
              fill="#FB7185"
            />
            <path
              d="M 80 178 C 90 196 102 196 112 178 C 122 196 134 196 144 178 C 154 196 166 196 176 178 C 186 196 198 196 208 178 C 218 196 230 196 240 178"
              fill="none"
              stroke="#FFF1F2"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <circle cx="95" cy="210" r="4" fill="#F43F5E" />
            <circle cx="160" cy="214" r="4.5" fill="#F43F5E" />
            <circle cx="225" cy="210" r="4" fill="#F43F5E" />

            {/* TOP LAYER (Tier 1) */}
            <path
              d="M 110 110 C 110 100 125 92 160 92 C 195 92 210 100 210 110 L 210 150 C 210 165 195 174 160 174 C 125 174 110 165 110 150 Z"
              fill="#F472B6"
            />
            <ellipse cx="160" cy="110" rx="50" ry="16" fill="#FFF1F2" stroke="#FDA4AF" strokeWidth="1.5" />
            <circle cx="125" cy="112" r="5" fill="#FFFFFF" />
            <circle cx="142" cy="118" r="5" fill="#FFFFFF" />
            <circle cx="160" cy="120" r="5.5" fill="#FFFFFF" />
            <circle cx="178" cy="118" r="5" fill="#FFFFFF" />
            <circle cx="195" cy="112" r="5" fill="#FFFFFF" />

            {/* CANDLES */}
            {[
              { x: 135, y: 78, h: 32, stripe: '#60A5FA' },
              { x: 160, y: 70, h: 40, stripe: '#F472B6' },
              { x: 185, y: 78, h: 32, stripe: '#A78BFA' }
            ].map((candle, idx) => (
              <g key={`candle-${idx}`}>
                <rect
                  x={candle.x - 3.5}
                  y={candle.y}
                  width="7"
                  height={candle.h}
                  rx="2"
                  fill="#FFFFFF"
                  stroke="#E2E8F0"
                  strokeWidth="0.8"
                />
                <line
                  x1={candle.x - 3.5}
                  y1={candle.y + 8}
                  x2={candle.x + 3.5}
                  y2={candle.y + 14}
                  stroke={candle.stripe}
                  strokeWidth="2"
                />
                <line
                  x1={candle.x - 3.5}
                  y1={candle.y + 18}
                  x2={candle.x + 3.5}
                  y2={candle.y + 24}
                  stroke={candle.stripe}
                  strokeWidth="2"
                />

                <line
                  x1={candle.x}
                  y1={candle.y}
                  x2={candle.x}
                  y2={candle.y - 6}
                  stroke="#475569"
                  strokeWidth="1.5"
                />

                {!candlesBlown ? (
                  <g className="animate-flame origin-bottom" style={{ transformOrigin: `${candle.x}px ${candle.y - 6}px` }}>
                    <circle cx={candle.x} cy={candle.y - 14} r="14" fill="#FDE047" opacity="0.3" filter="blur(3px)" />
                    <path
                      d={`M ${candle.x} ${candle.y - 25} C ${candle.x + 7} ${candle.y - 15} ${candle.x + 5} ${candle.y - 6} ${candle.x} ${candle.y - 6} C ${candle.x - 5} ${candle.y - 6} ${candle.x - 7} ${candle.y - 15} ${candle.x} ${candle.y - 25} Z`}
                      fill="#F59E0B"
                    />
                    <path
                      d={`M ${candle.x} ${candle.y - 21} C ${candle.x + 4} ${candle.y - 14} ${candle.x + 3} ${candle.y - 7} ${candle.x} ${candle.y - 7} C ${candle.x - 3} ${candle.y - 7} ${candle.x - 4} ${candle.y - 14} ${candle.x} ${candle.y - 21} Z`}
                      fill="#FEF08A"
                    />
                  </g>
                ) : (
                  <g className="opacity-60">
                    <path
                      d={`M ${candle.x} ${candle.y - 6} Q ${candle.x + 4} ${candle.y - 16} ${candle.x - 2} ${candle.y - 24}`}
                      stroke="#CBD5E1"
                      strokeWidth="2"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </g>
                )}
              </g>
            ))}
          </svg>
        </div>

        {/* Action Button */}
        <div className="mt-4 flex flex-col items-center gap-2.5 w-full">
          {!candlesBlown ? (
            <motion.button
              onClick={handleBlowCandles}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white font-heading font-bold text-sm sm:text-base shadow-md shadow-pink-500/25 active:scale-95 transition-all cursor-pointer w-full min-h-[46px]"
            >
              <span>Blow the Candles 🕯️</span>
            </motion.button>
          ) : (
            <div className="flex flex-col items-center gap-1.5 w-full">
              <button
                onClick={handleRelight}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-white border border-pink-200 text-pink-700 hover:bg-pink-50 font-semibold text-xs shadow-xs transition-all cursor-pointer w-full min-h-[44px]"
              >
                <RefreshCw size={14} />
                <span>Make Another Wish (Relight)</span>
              </button>
              <p className="text-[11px] text-slate-400">May every wish come true! ✨</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
