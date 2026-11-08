/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { MusicPlayer } from './components/MusicPlayer';
import { OpeningScreen } from './components/OpeningScreen';
import { CartoonApology } from './components/CartoonApology';
import { BirthdayHero } from './components/BirthdayHero';
import { HeartfeltMessage } from './components/HeartfeltMessage';
import { InteractiveCake } from './components/InteractiveCake';
import { HerGallery } from './components/HerGallery';
import { SharedScrapbook } from './components/SharedScrapbook';
import { SurpriseGift } from './components/SurpriseGift';
import { FinalScreen } from './components/FinalScreen';
import { SceneState } from './types';
import { fireCelebrationConfetti } from './utils/confetti';
import { Sparkles, Heart, Cake, Gift, MessageCircleHeart, BookOpen } from 'lucide-react';

export default function App() {
  const [sceneState, setSceneState] = useState<SceneState>('opening');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-100/60 sm:py-0 flex justify-center items-center select-none font-sans">
      {/* Mobile-Only Device Frame: Full width on phones, phone-width chassis on desktop */}
      <div className="w-full max-w-[420px] min-h-screen bg-[#fdf8f9] text-slate-800 shadow-2xl relative border-x border-pink-100/80 overflow-x-hidden flex flex-col">
        {/* Floating Ambient Music Player */}
        <MusicPlayer />

        <AnimatePresence mode="wait">
          {/* STEP 1: Opening Screen */}
          {sceneState === 'opening' && (
            <motion.div
              key="opening-scene"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full flex-1 flex flex-col"
            >
              <OpeningScreen onContinue={() => setSceneState('apology')} />
            </motion.div>
          )}

          {/* STEP 2: Funny Cartoon Apology */}
          {sceneState === 'apology' && (
            <motion.div
              key="apology-scene"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="w-full flex-1 flex flex-col"
            >
              <CartoonApology onAcceptAndCelebrate={() => setSceneState('celebration')} />
            </motion.div>
          )}

          {/* STEP 3: Full Birthday Surprise Celebration */}
          {sceneState === 'celebration' && (
            <motion.div
              key="celebration-scene"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="w-full flex-1 flex flex-col relative pb-16"
            >
              {/* Mobile Top App Bar */}
              <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-pink-100/90 shadow-2xs">
                <div className="h-14 px-4 flex items-center justify-between">
                  {/* Brand Wordmark */}
                  <a
                    href="#root"
                    onClick={(e) => {
                      e.preventDefault();
                      handleScrollToTop();
                    }}
                    className="font-serif-display text-base font-bold tracking-tight text-pink-700 hover:text-pink-800 transition-colors flex items-center gap-1"
                  >
                    <span>9 November</span>
                    <span className="text-xs">🌸</span>
                  </a>

                  {/* Primary Action Button */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => fireCelebrationConfetti()}
                      className="px-3.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-pink-500 to-rose-500 rounded-full hover:from-pink-600 hover:to-rose-600 shadow-xs active:scale-95 transition-all cursor-pointer flex items-center gap-1 min-h-[36px]"
                    >
                      <Sparkles size={12} />
                      <span>Celebrate 🎉</span>
                    </button>
                  </div>
                </div>
              </header>

              {/* Main Content Flow */}
              <main className="flex-1 w-full flex flex-col">
                {/* 1. Birthday Hero Reveal */}
                <BirthdayHero onScrollToNext={() => scrollToSection('heartfelt-message')} />

                {/* 2. Heartfelt Birthday Message */}
                <HeartfeltMessage />

                {/* 3. Interactive Birthday Cake */}
                <InteractiveCake />

                {/* 4. Her Personal Photo Album (Unresized, Album Size) */}
                <HerGallery />

                {/* 5. Shared Scrapbook Album (Unresized, Album Size) */}
                <SharedScrapbook />

                {/* 6. Little Surprise Gift */}
                <SurpriseGift />
              </main>

              {/* 7. Final Birthday Screen & Footer */}
              <FinalScreen
                onReplayStory={() => {
                  setSceneState('opening');
                  handleScrollToTop();
                }}
                onScrollToTop={handleScrollToTop}
              />

              {/* Mobile Bottom Thumb Navigation Bar */}
              <nav
                className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] z-40 bg-white/95 backdrop-blur-md border-t border-pink-100/90 shadow-lg px-2 py-1 flex items-center justify-around"
                aria-label="Mobile Navigation"
              >
                <button
                  onClick={() => scrollToSection('heartfelt-message')}
                  className="flex flex-col items-center justify-center p-1 text-slate-500 hover:text-pink-600 min-h-[44px] min-w-[48px] cursor-pointer"
                >
                  <MessageCircleHeart size={18} />
                  <span className="text-[10px] font-medium mt-0.5">Wishes</span>
                </button>

                <button
                  onClick={() => scrollToSection('cake-section')}
                  className="flex flex-col items-center justify-center p-1 text-slate-500 hover:text-pink-600 min-h-[44px] min-w-[48px] cursor-pointer"
                >
                  <Cake size={18} />
                  <span className="text-[10px] font-medium mt-0.5">Cake</span>
                </button>

                <button
                  onClick={() => scrollToSection('her-gallery')}
                  className="flex flex-col items-center justify-center p-1 text-slate-500 hover:text-pink-600 min-h-[44px] min-w-[48px] cursor-pointer"
                >
                  <BookOpen size={18} />
                  <span className="text-[10px] font-medium mt-0.5">Her Album</span>
                </button>

                <button
                  onClick={() => scrollToSection('shared-memories')}
                  className="flex flex-col items-center justify-center p-1 text-slate-500 hover:text-pink-600 min-h-[44px] min-w-[48px] cursor-pointer"
                >
                  <Heart size={18} />
                  <span className="text-[10px] font-medium mt-0.5">Memories</span>
                </button>

                <button
                  onClick={() => scrollToSection('gift-section')}
                  className="flex flex-col items-center justify-center p-1 text-slate-500 hover:text-pink-600 min-h-[44px] min-w-[48px] cursor-pointer"
                >
                  <Gift size={18} />
                  <span className="text-[10px] font-medium mt-0.5">Gift</span>
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
