import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { PhotoItem } from '../types';

interface PhotoLightboxProps {
  photo: PhotoItem | null;
  photos: PhotoItem[];
  isOpen: boolean;
  onClose: () => void;
  onSelectPhoto: (photo: PhotoItem) => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  photo,
  photos,
  isOpen,
  onClose,
  onSelectPhoto,
}) => {
  const currentIndex = photo ? photos.findIndex(p => p.id === photo.id) : -1;

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onSelectPhoto(photos[currentIndex - 1]);
    } else {
      onSelectPhoto(photos[photos.length - 1]);
    }
  }, [currentIndex, photos, onSelectPhoto]);

  const handleNext = useCallback(() => {
    if (currentIndex < photos.length - 1) {
      onSelectPhoto(photos[currentIndex + 1]);
    } else {
      onSelectPhoto(photos[0]);
    }
  }, [currentIndex, photos, onSelectPhoto]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !photo) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md"
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          aria-label="Close photo lightbox"
        >
          <X size={22} />
        </button>

        {/* Previous Button */}
        {photos.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
            aria-label="Previous photo"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {/* Next Button */}
        {photos.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
            aria-label="Next photo"
          >
            <ChevronRight size={24} />
          </button>
        )}

        {/* Photo Container */}
        <motion.div
          key={photo.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-4xl max-h-[90vh] flex flex-col items-center bg-slate-900/80 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
        >
          {/* Main Image with fallback */}
          <div className="relative max-h-[75vh] flex items-center justify-center overflow-hidden">
            <img
              src={photo.src}
              alt={photo.alt}
              referrerPolicy="no-referrer"
              className="max-h-[75vh] max-w-full w-auto object-contain select-none"
              onError={(e) => {
                // If relative path fails, try fallback
                const target = e.currentTarget;
                if (!target.dataset.triedFallback) {
                  target.dataset.triedFallback = 'true';
                  target.src = photo.src.replace('/images/her/', '/assets/aistudio/').replace('/images/together/', '/assets/aistudio/');
                }
              }}
            />
          </div>

          {/* Caption Bar */}
          <div className="w-full p-4 sm:p-5 bg-slate-900/95 border-t border-white/10 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h3 className="font-heading font-semibold text-base sm:text-lg text-pink-200">
                {photo.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                {photo.caption}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400 shrink-0">
              {photo.location && (
                <>
                  <span>{photo.location}</span>
                  <span aria-hidden="true">·</span>
                </>
              )}
              {photo.dateTag && <span>{photo.dateTag}</span>}
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">
                {currentIndex + 1} / {photos.length}
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
