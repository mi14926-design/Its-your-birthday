import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Maximize2, Heart, ChevronLeft, ChevronRight, BookOpen, Layers } from 'lucide-react';
import { HER_PHOTOS } from '../data/photos';
import { PhotoItem } from '../types';
import { PhotoLightbox } from './PhotoLightbox';
import { musicBox } from '../utils/audioSynth';

interface HeartReaction {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

const pageVariants = {
  enter: (direction: number) => ({
    rotateY: direction > 0 ? 30 : -30,
    x: direction > 0 ? 60 : -60,
    opacity: 0,
    scale: 0.94,
  }),
  center: {
    rotateY: 0,
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.42,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
  exit: (direction: number) => ({
    rotateY: direction > 0 ? -30 : 30,
    x: direction > 0 ? -60 : 60,
    opacity: 0,
    scale: 0.94,
    transition: {
      duration: 0.32,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export const HerGallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const [viewMode, setViewMode] = useState<'album' | 'all'>('album');
  const [reactions, setReactions] = useState<HeartReaction[]>([]);

  const activePageIndex = page;
  const currentPhoto = HER_PHOTOS[activePageIndex];

  const handleOpenPhoto = (photo: PhotoItem) => {
    setSelectedPhoto(photo);
    setLightboxOpen(true);
  };

  const paginate = (newDirection: number) => {
    const nextIdx = (activePageIndex + newDirection + HER_PHOTOS.length) % HER_PHOTOS.length;
    setPage([nextIdx, newDirection]);
    musicBox.playMusicBoxNote(523.25 + (nextIdx * 30), 0.25, 0.12);
  };

  const handleSetPage = (targetIdx: number) => {
    if (targetIdx === activePageIndex) return;
    const dir = targetIdx > activePageIndex ? 1 : -1;
    setPage([targetIdx, dir]);
    musicBox.playMusicBoxNote(587.33, 0.25, 0.12);
  };

  const handlePhotoTapReaction = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const emojis = ['❤️', '💖', '✨', '🌸', '💐'];
    const chosenEmoji = emojis[Math.floor(Math.random() * emojis.length)];

    const newReaction: HeartReaction = {
      id: Date.now() + Math.random(),
      x,
      y,
      emoji: chosenEmoji,
    };

    setReactions((prev) => [...prev.slice(-8), newReaction]);
    musicBox.playMusicBoxNote(659.25, 0.2, 0.1);

    setTimeout(() => {
      setReactions((prev) => prev.filter((r) => r.id !== newReaction.id));
    }, 1600);
  };

  return (
    <section id="her-gallery" className="relative py-14 px-4 w-full">
      {/* Soft Background Accents */}
      <div className="absolute top-1/4 -left-10 w-48 h-48 bg-pink-200/30 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-10 w-48 h-48 bg-purple-200/30 rounded-full blur-2xl pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100/90 text-pink-700 text-xs font-semibold uppercase tracking-wider mb-2 shadow-xs"
        >
          <Sparkles size={13} className="text-pink-500 animate-spin" />
          <span>Individual Portraits</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-serif-display text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight"
        >
          A Little Gallery of You ✨
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-slate-500 text-xs sm:text-sm mt-1 max-w-xs mx-auto"
        >
          Just a few moments worth celebrating.
        </motion.p>

        {/* View Mode Toggle (Album Sleeve vs All Pages) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex items-center justify-center gap-1 mt-4 p-1 bg-pink-100/80 rounded-full max-w-[240px] mx-auto border border-pink-200/70 shadow-xs"
        >
          <button
            onClick={() => setViewMode('album')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium transition-all ${
              viewMode === 'album'
                ? 'bg-white text-pink-700 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen size={13} />
            <span>Album Leaf</span>
          </button>
          <button
            onClick={() => setViewMode('all')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium transition-all ${
              viewMode === 'all'
                ? 'bg-white text-pink-700 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers size={13} />
            <span>All Photos</span>
          </button>
        </motion.div>
      </div>

      {/* VIEW MODE 1: SINGLE ALBUM SLEEVE WITH 3D FLIP ANIMATION & FULL UNRESIZED PHOTO */}
      {viewMode === 'album' && (
        <div className="relative z-10 max-w-sm mx-auto perspective-1000">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentPhoto.id}
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="relative bg-[#fffdfa] rounded-2xl border-2 border-stone-200/80 shadow-xl p-4 sm:p-5 flex flex-col"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Album Header Bar */}
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-stone-200/60 text-xs text-stone-500 font-medium">
                <span className="font-heading font-semibold text-rose-700 tracking-wider flex items-center gap-1">
                  <Sparkles size={11} className="text-amber-500" />
                  MEMOIR ALBUM
                </span>
                <span className="font-mono tabular-nums text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full text-[11px]">
                  Page {activePageIndex + 1} of {HER_PHOTOS.length}
                </span>
              </div>

              {/* Album Photo Mount Area - Full, Natural Uncropped Photo */}
              <div
                className="relative bg-stone-50 rounded-lg p-2.5 border border-stone-200/70 shadow-inner flex flex-col items-center justify-center cursor-pointer group overflow-hidden"
                onClick={handlePhotoTapReaction}
                title="Tap photo for hearts, double tap/icon for full resolution"
              >
                {/* Vintage Photo Mounting Corners with Staggered Entrance */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="absolute top-1.5 left-1.5 w-4 h-4 border-t-2 border-l-2 border-amber-600/70 pointer-events-none z-10"
                />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.15, duration: 0.3 }}
                  className="absolute top-1.5 right-1.5 w-4 h-4 border-t-2 border-r-2 border-amber-600/70 pointer-events-none z-10"
                />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="absolute bottom-1.5 left-1.5 w-4 h-4 border-b-2 border-l-2 border-amber-600/70 pointer-events-none z-10"
                />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.25, duration: 0.3 }}
                  className="absolute bottom-1.5 right-1.5 w-4 h-4 border-b-2 border-r-2 border-amber-600/70 pointer-events-none z-10"
                />

                {/* Subtle Light Reflection Sheen on Page Flip */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
                  <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer-sweep pointer-events-none" />
                </div>

                {/* The Photograph - Uncropped and Preserving Full Aspect Ratio */}
                <div className="w-full flex items-center justify-center overflow-hidden rounded bg-stone-100">
                  <img
                    src={currentPhoto.src}
                    alt={currentPhoto.alt}
                    referrerPolicy="no-referrer"
                    className="w-full h-auto max-h-[460px] object-contain rounded shadow-xs transition-transform duration-300 group-hover:scale-[1.01]"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.dataset.triedFallback) {
                        target.dataset.triedFallback = 'true';
                        target.src = currentPhoto.src.replace('/images/her/', '/assets/aistudio/');
                      }
                    }}
                  />
                </div>

                {/* Floating Heart Reactions Generated from Tap */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
                  <AnimatePresence>
                    {reactions.map((r) => (
                      <motion.div
                        key={r.id}
                        initial={{ opacity: 1, scale: 0.6, y: 0 }}
                        animate={{ opacity: 0, scale: 1.5, y: -70 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                        className="absolute text-xl pointer-events-none select-none drop-shadow-md"
                        style={{ left: r.x - 12, top: r.y - 12 }}
                      >
                        {r.emoji}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Tap to Enlarge Indicator */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenPhoto(currentPhoto);
                  }}
                  className="absolute bottom-4 right-4 p-2 rounded-full bg-slate-900/75 hover:bg-slate-950 text-white opacity-85 group-hover:opacity-100 transition-all shadow-sm active:scale-90 z-20 cursor-pointer"
                  title="Enlarge photo"
                  aria-label="Enlarge photo"
                >
                  <Maximize2 size={14} />
                </button>

                {/* Subtle Tap hint */}
                <div className="absolute bottom-4 left-4 px-2 py-0.5 rounded-full bg-white/80 backdrop-blur-xs text-[10px] text-slate-600 font-medium pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity">
                  Tap for ❤️
                </div>
              </div>

              {/* Album Page Footnote / Caption with Staggered Animation */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="pt-4 px-1 text-center"
              >
                <h3 className="font-heading font-bold text-slate-800 text-base sm:text-lg">
                  {currentPhoto.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  {currentPhoto.caption}
                </p>

                <div className="flex items-center justify-center gap-2 mt-2.5 text-xs text-rose-500 font-handwriting text-base">
                  <Heart size={12} fill="currentColor" className="animate-pulse" />
                  <span>{currentPhoto.dateTag || 'Special Memory'}</span>
                  {currentPhoto.location && (
                    <>
                      <span>·</span>
                      <span>{currentPhoto.location}</span>
                    </>
                  )}
                </div>
              </motion.div>

              {/* Navigation Thumb Controls */}
              <div className="flex items-center justify-between mt-5 pt-3 border-t border-stone-200/60">
                <button
                  onClick={() => paginate(-1)}
                  className="flex items-center gap-1 px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-700 text-xs font-semibold transition-colors min-h-[44px] min-w-[44px] justify-center cursor-pointer active:scale-95"
                  aria-label="Previous album page"
                >
                  <ChevronLeft size={16} />
                  <span>Prev Page</span>
                </button>

                {/* Dot pagination */}
                <div className="flex items-center gap-1.5">
                  {HER_PHOTOS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handleSetPage(i)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        i === activePageIndex ? 'w-5 bg-rose-500 shadow-xs' : 'w-2 bg-stone-300 hover:bg-stone-400'
                      }`}
                      aria-label={`Go to photo ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => paginate(1)}
                  className="flex items-center gap-1 px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-700 text-xs font-semibold transition-colors min-h-[44px] min-w-[44px] justify-center cursor-pointer active:scale-95"
                  aria-label="Next album page"
                >
                  <span>Next Page</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* VIEW MODE 2: VERTICAL ALBUM ROLL - UNRESIZED ALBUM SLEEVES WITH SMOOTH ENTRANCES */}
      {viewMode === 'all' && (
        <div className="relative z-10 max-w-sm mx-auto space-y-6">
          {HER_PHOTOS.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: index * 0.06, ease: 'easeOut' }}
              className="bg-[#fffdfa] rounded-2xl border-2 border-stone-200/80 shadow-md p-4 sm:p-5 flex flex-col cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleOpenPhoto(photo)}
            >
              {/* Sleeve Header */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-200/60 text-[11px] text-stone-500">
                <span className="font-heading font-semibold text-rose-700">MEMOIR {index + 1}</span>
                <span className="font-mono bg-stone-100 px-1.5 py-0.5 rounded text-[10px]">{index + 1} / {HER_PHOTOS.length}</span>
              </div>

              {/* Photo Area with Corners and Full Uncropped Dimensions */}
              <div className="relative bg-stone-50 rounded-lg p-2 border border-stone-200/70 shadow-inner flex flex-col items-center justify-center group overflow-hidden">
                <div className="absolute top-1 left-1 w-3.5 h-3.5 border-t-2 border-l-2 border-amber-600/70 pointer-events-none" />
                <div className="absolute top-1 right-1 w-3.5 h-3.5 border-t-2 border-r-2 border-amber-600/70 pointer-events-none" />
                <div className="absolute bottom-1 left-1 w-3.5 h-3.5 border-b-2 border-l-2 border-amber-600/70 pointer-events-none" />
                <div className="absolute bottom-1 right-1 w-3.5 h-3.5 border-b-2 border-r-2 border-amber-600/70 pointer-events-none" />

                <div className="w-full flex items-center justify-center overflow-hidden rounded bg-stone-100">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    referrerPolicy="no-referrer"
                    className="w-full h-auto max-h-[460px] object-contain rounded transition-transform duration-300 group-hover:scale-[1.01]"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.dataset.triedFallback) {
                        target.dataset.triedFallback = 'true';
                        target.src = photo.src.replace('/images/her/', '/assets/aistudio/');
                      }
                    }}
                  />
                </div>

                <div className="absolute bottom-3 right-3 p-1.5 rounded-full bg-slate-900/70 text-white opacity-85 group-hover:opacity-100 transition-opacity shadow-sm">
                  <Maximize2 size={12} />
                </div>
              </div>

              {/* Sleeve Caption */}
              <div className="pt-3 px-1 text-center">
                <h3 className="font-heading font-bold text-slate-800 text-sm sm:text-base">
                  {photo.title}
                </h3>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  {photo.caption}
                </p>
                <div className="flex items-center justify-center gap-1.5 mt-1.5 text-xs text-rose-500 font-handwriting text-base">
                  <Heart size={11} fill="currentColor" />
                  <span>{photo.dateTag}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox */}
      <PhotoLightbox
        isOpen={lightboxOpen}
        photo={selectedPhoto}
        photos={HER_PHOTOS}
        onClose={() => setLightboxOpen(false)}
        onSelectPhoto={(photo) => setSelectedPhoto(photo)}
      />
    </section>
  );
};
