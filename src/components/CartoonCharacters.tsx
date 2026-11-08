import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CartoonCharactersProps {
  mode: 'opening' | 'apology' | 'throwing';
  isPeaceWaved?: boolean;
  onBoyClick?: () => void;
  onTeddyClick?: () => void;
  onSignClick?: () => void;
}

export const CartoonCharacters: React.FC<CartoonCharactersProps> = ({
  mode,
  isPeaceWaved = false,
  onBoyClick,
  onTeddyClick,
  onSignClick,
}) => {
  const [boyBowing, setBoyBowing] = useState(false);
  const [bearWiggle, setBearWiggle] = useState(false);

  const handleBoyInteract = () => {
    setBoyBowing(true);
    setTimeout(() => setBoyBowing(false), 1200);
    onBoyClick?.();
  };

  const handleBearInteract = () => {
    setBearWiggle(true);
    setTimeout(() => setBearWiggle(false), 1000);
    onTeddyClick?.();
  };

  return (
    <div className="relative flex items-end justify-center gap-6 sm:gap-10 py-4 select-none">
      {/* Floating sweat drop above boy */}
      <AnimatePresence>
        {mode !== 'throwing' && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: [0.6, 1, 0.6], y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="absolute left-[38%] sm:left-[42%] -top-4 text-blue-400 drop-shadow-md z-20 pointer-events-none"
          >
            <svg width="22" height="28" viewBox="0 0 24 32" fill="none">
              <path
                d="M12 2C12 2 2 15 2 21C2 26.5228 6.47715 31 12 31C17.5228 31 22 26.5228 22 21C22 15 12 2Z"
                fill="#60A5FA"
              />
              <path
                d="M8 20C8 17.5 10 15 11 14"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Little Floating Hearts */}
      <motion.div
        animate={{ y: [-4, 4, -4], rotate: [-5, 5, -5] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
        className="absolute left-[30%] -top-8 text-pink-400/80 pointer-events-none z-10"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#F472B6">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </motion.div>

      {/* CARTOON BOY */}
      <motion.div
        className="relative cursor-pointer group flex flex-col items-center"
        onClick={handleBoyInteract}
        animate={
          mode === 'throwing'
            ? { y: [0, -25, 0], scale: [1, 1.1, 1] }
            : boyBowing
            ? { y: [0, 15, 0], rotate: [0, 8, 0] }
            : { y: [0, -4, 0] }
        }
        transition={{
          repeat: mode === 'throwing' ? 2 : boyBowing ? 0 : Infinity,
          duration: mode === 'throwing' ? 0.6 : 3,
          ease: 'easeInOut',
        }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Sign Throwing Animation */}
        <AnimatePresence>
          {mode === 'throwing' && (
            <motion.div
              initial={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
              animate={{ opacity: 0, x: 180, y: -160, rotate: 240 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="absolute z-30 pointer-events-none"
            >
              <div className="bg-amber-100 border-2 border-amber-800 text-amber-900 font-bold px-3 py-1.5 rounded shadow-lg text-sm rotate-12">
                SORRY! 👋
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Boy SVG Character */}
        <div className="relative w-36 h-48 sm:w-44 sm:h-56 filter drop-shadow-lg">
          <svg viewBox="0 0 160 210" className="w-full h-full overflow-visible">
            {/* Shadow under boy */}
            <ellipse cx="80" cy="202" rx="45" ry="8" fill="#e2d2d6" opacity="0.6" />

            {/* Legs */}
            <rect x="62" y="150" width="14" height="42" rx="7" fill="#3B82F6" />
            <rect x="84" y="150" width="14" height="42" rx="7" fill="#2563EB" />
            {/* Shoes */}
            <ellipse cx="68" cy="194" rx="12" ry="7" fill="#1F2937" />
            <ellipse cx="92" cy="194" rx="12" ry="7" fill="#1F2937" />

            {/* Body / Hoodie */}
            <path
              d="M 50 100 Q 80 92 110 100 L 115 156 Q 80 162 45 156 Z"
              fill="#F472B6"
            />
            {/* Hoodie pocket */}
            <path
              d="M 60 132 Q 80 142 100 132 L 96 150 Q 80 154 64 150 Z"
              fill="#EC4899"
            />
            {/* Hoodie strings */}
            <path d="M 72 104 Q 70 120 72 126" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
            <path d="M 88 104 Q 90 120 88 126" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />

            {/* Arms / Hands */}
            {mode === 'throwing' ? (
              // Hands up cheering!
              <>
                <path d="M 50 110 Q 30 70 40 50" stroke="#F472B6" strokeWidth="14" strokeLinecap="round" fill="none" />
                <circle cx="40" cy="48" r="8" fill="#FCD34D" />
                <path d="M 110 110 Q 130 70 120 50" stroke="#F472B6" strokeWidth="14" strokeLinecap="round" fill="none" />
                <circle cx="120" cy="48" r="8" fill="#FCD34D" />
              </>
            ) : isPeaceWaved ? (
              // Hands clasped together in plea
              <>
                <path d="M 50 115 Q 70 135 78 128" stroke="#F472B6" strokeWidth="13" strokeLinecap="round" fill="none" />
                <path d="M 110 115 Q 90 135 82 128" stroke="#F472B6" strokeWidth="13" strokeLinecap="round" fill="none" />
                <circle cx="80" cy="128" r="9" fill="#FCD34D" />
              </>
            ) : (
              // Hands holding sign or awkward posture
              <>
                <path d="M 50 115 Q 40 138 60 140" stroke="#F472B6" strokeWidth="13" strokeLinecap="round" fill="none" />
                <circle cx="62" cy="140" r="7" fill="#FCD34D" />
                <path d="M 110 115 Q 120 138 100 140" stroke="#F472B6" strokeWidth="13" strokeLinecap="round" fill="none" />
                <circle cx="98" cy="140" r="7" fill="#FCD34D" />
              </>
            )}

            {/* Neck */}
            <rect x="74" y="88" width="12" height="15" fill="#FCD34D" rx="4" />

            {/* Head */}
            <circle cx="80" cy="62" r="32" fill="#FDE68A" />

            {/* Flustered Cheek Blushes */}
            <ellipse cx="62" cy="72" rx="7" ry="4" fill="#F87171" opacity="0.6" />
            <ellipse cx="98" cy="72" rx="7" ry="4" fill="#F87171" opacity="0.6" />
            <line x1="58" y1="71" x2="66" y2="73" stroke="#DC2626" strokeWidth="1.5" />
            <line x1="94" y1="71" x2="102" y2="73" stroke="#DC2626" strokeWidth="1.5" />

            {/* Eyes */}
            {mode === 'throwing' ? (
              // Happy squinting joyful eyes ^ ^
              <>
                <path d="M 64 62 Q 71 54 78 62" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" fill="none" />
                <path d="M 84 62 Q 91 54 98 62" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" fill="none" />
              </>
            ) : boyBowing ? (
              // Closed apologetic eyes > <
              <>
                <path d="M 65 58 L 75 62 L 65 66" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M 95 58 L 85 62 L 95 66" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </>
            ) : (
              // Guilty, sheepish looking eyes sideways
              <>
                <ellipse cx="70" cy="60" rx="5" ry="6" fill="#1F2937" />
                <circle cx="72" cy="58" r="2" fill="#FFFFFF" />
                <ellipse cx="90" cy="60" rx="5" ry="6" fill="#1F2937" />
                <circle cx="92" cy="58" r="2" fill="#FFFFFF" />
              </>
            )}

            {/* Eyebrows */}
            {mode === 'throwing' ? (
              <>
                <path d="M 62 50 Q 70 46 78 51" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M 84 51 Q 92 46 100 50" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              </>
            ) : (
              // Worried slant eyebrows
              <>
                <path d="M 62 52 Q 70 50 78 55" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M 84 55 Q 92 50 100 52" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              </>
            )}

            {/* Mouth */}
            {mode === 'throwing' ? (
              // Wide happy open mouth :D
              <path d="M 70 73 Q 80 88 90 73 Z" fill="#DC2626" stroke="#991B1B" strokeWidth="1.5" />
            ) : boyBowing ? (
              // Little apologetic wiggle mouth
              <path d="M 73 75 Q 80 72 87 75" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            ) : (
              // Awkward wavy nervous line ~
              <path d="M 71 75 Q 75 78 80 74 Q 85 71 89 74" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            )}

            {/* Cute Messy Hair */}
            <path
              d="M 50 56 Q 48 30 76 25 Q 98 22 108 38 Q 116 35 114 54 Q 106 38 90 34 Q 72 32 58 45 Z"
              fill="#4B2E2B"
            />
            {/* Front hair fringe tufts */}
            <path d="M 58 42 Q 68 48 68 36" stroke="#4B2E2B" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M 70 34 Q 82 46 88 36" stroke="#4B2E2B" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M 86 36 Q 98 48 102 42" stroke="#4B2E2B" strokeWidth="4" strokeLinecap="round" fill="none" />
          </svg>
        </div>

        {/* SORRY! Sign held in apology mode */}
        {mode === 'apology' && (
          <motion.div
            className="absolute top-[88px] sm:top-[98px] z-20 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onSignClick?.();
            }}
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            title="Click sign!"
          >
            <div className="bg-amber-50 border-2 border-amber-600 rounded-lg px-4 py-2 shadow-md flex flex-col items-center">
              <span className="font-heading font-black text-rose-600 text-lg sm:text-xl tracking-wider drop-shadow-sm">
                SORRY! 🥺
              </span>
              <span className="text-[10px] text-amber-800 font-medium">
                (Tap to see peace flag 🕊️)
              </span>
            </div>
            {/* Sign handle stick */}
            <div className="w-2.5 h-10 bg-amber-700 mx-auto -mt-1 rounded-b shadow-sm" />
          </motion.div>
        )}

        {/* Interactive Speech Bubble Prompt */}
        <div className="mt-1 px-2.5 py-0.5 bg-white/90 border border-pink-200 rounded-full text-[11px] text-pink-700 shadow-sm opacity-90 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {mode === 'throwing' ? '🎉 Yay! Let\'s celebrate!' : boyBowing ? 'Genuinely sorry! 🙇‍♂️' : 'Tap boy to apologize!'}
        </div>
      </motion.div>

      {/* TINY TEDDY BEAR HOLDING A FLOWER */}
      <motion.div
        className="relative cursor-pointer group flex flex-col items-center -ml-2"
        onClick={handleBearInteract}
        animate={
          bearWiggle
            ? { rotate: [-10, 10, -8, 8, 0], scale: [1, 1.15, 1] }
            : { y: [0, -3, 0], rotate: [-2, 2, -2] }
        }
        transition={{
          repeat: bearWiggle ? 0 : Infinity,
          duration: bearWiggle ? 0.8 : 2.6,
          ease: 'easeInOut',
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        title="Click the teddy bear!"
      >
        <div className="w-24 h-32 sm:w-28 sm:h-36 filter drop-shadow-md">
          <svg viewBox="0 0 110 130" className="w-full h-full overflow-visible">
            {/* Teddy shadow */}
            <ellipse cx="55" cy="122" rx="32" ry="6" fill="#e2d2d6" opacity="0.6" />

            {/* Teddy Ears */}
            <circle cx="32" cy="32" r="14" fill="#D97706" />
            <circle cx="32" cy="32" r="8" fill="#FDE68A" />
            <circle cx="78" cy="32" r="14" fill="#D97706" />
            <circle cx="78" cy="32" r="8" fill="#FDE68A" />

            {/* Teddy Body */}
            <ellipse cx="55" cy="85" rx="30" ry="32" fill="#D97706" />
            <ellipse cx="55" cy="87" rx="20" ry="22" fill="#FEF3C7" />

            {/* Teddy Legs */}
            <circle cx="35" cy="112" r="13" fill="#B45309" />
            <circle cx="35" cy="112" r="8" fill="#FDE68A" />
            <circle cx="75" cy="112" r="13" fill="#B45309" />
            <circle cx="75" cy="112" r="8" fill="#FDE68A" />

            {/* Teddy Head */}
            <circle cx="55" cy="52" r="28" fill="#D97706" />
            {/* Snout */}
            <ellipse cx="55" cy="58" rx="14" ry="11" fill="#FEF3C7" />
            <ellipse cx="55" cy="54" rx="5" ry="3.5" fill="#451A03" />
            <path d="M 55 57 L 55 64" stroke="#451A03" strokeWidth="2" />
            <path d="M 50 63 Q 55 67 60 63" stroke="#451A03" strokeWidth="2" strokeLinecap="round" fill="none" />

            {/* Teddy Eyes */}
            <circle cx="44" cy="48" r="3.5" fill="#1F2937" />
            <circle cx="45" cy="47" r="1.2" fill="#FFFFFF" />
            <circle cx="66" cy="48" r="3.5" fill="#1F2937" />
            <circle cx="67" cy="47" r="1.2" fill="#FFFFFF" />

            {/* Cheeks */}
            <circle cx="38" cy="56" r="4" fill="#F87171" opacity="0.6" />
            <circle cx="72" cy="56" r="4" fill="#F87171" opacity="0.6" />

            {/* Left Arm holding flower */}
            <path d="M 32 78 Q 20 85 24 95" stroke="#B45309" strokeWidth="12" strokeLinecap="round" fill="none" />
            <circle cx="24" cy="95" r="7" fill="#B45309" />

            {/* Right Arm waving */}
            <path d="M 78 78 Q 92 72 90 60" stroke="#B45309" strokeWidth="12" strokeLinecap="round" fill="none" />
            <circle cx="90" cy="58" r="7" fill="#B45309" />

            {/* BEAUTIFUL FLOWER OFFERED BY TEDDY */}
            <g transform="translate(14, 60)">
              {/* Stem & Leaf */}
              <path d="M 10 38 Q 6 22 10 12" stroke="#16A34A" strokeWidth="3" fill="none" />
              <path d="M 8 26 Q -2 22 4 18" stroke="#16A34A" strokeWidth="2.5" fill="#22C55E" />
              {/* Petals */}
              <circle cx="10" cy="8" r="6" fill="#F43F5E" />
              <circle cx="16" cy="12" r="6" fill="#FB7185" />
              <circle cx="14" cy="18" r="6" fill="#F43F5E" />
              <circle cx="6" cy="18" r="6" fill="#FB7185" />
              <circle cx="4" cy="12" r="6" fill="#F43F5E" />
              {/* Flower Center */}
              <circle cx="10" cy="13" r="4" fill="#FBBF24" />
            </g>
          </svg>
        </div>

        <div className="mt-1 px-2.5 py-0.5 bg-amber-50/90 border border-amber-200 rounded-full text-[11px] text-amber-800 shadow-sm opacity-90 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {bearWiggle ? '🌹 A flower for you!' : 'Tap teddy bear!'}
        </div>
      </motion.div>
    </div>
  );
};
