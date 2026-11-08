import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Play, Pause, Music } from 'lucide-react';
import { musicBox } from '../utils/audioSynth';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.65);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = musicBox.subscribe((playing, vol, muted) => {
      setIsPlaying(playing);
      setVolume(vol);
      setIsMuted(muted);
    });
    return unsubscribe;
  }, []);

  const handleTogglePlay = () => {
    musicBox.togglePlay();
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    musicBox.toggleMute();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    musicBox.setVolume(val);
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      <div 
        className="flex items-center gap-2 px-3 py-2 bg-white/90 backdrop-blur-md border border-pink-200/80 rounded-full shadow-md transition-all hover:shadow-lg"
        onMouseEnter={() => setShowVolumeSlider(true)}
        onMouseLeave={() => setShowVolumeSlider(false)}
      >
        <button
          onClick={handleTogglePlay}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-pink-400 to-rose-400 text-white shadow-sm hover:scale-105 active:scale-95 transition-transform"
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
          title={isPlaying ? 'Pause background melody' : 'Play gentle birthday melody'}
        >
          {isPlaying ? <Pause size={15} /> : <Play size={15} className="ml-0.5" />}
        </button>

        <div className="flex items-center gap-1.5 cursor-pointer" onClick={handleTogglePlay}>
          <Music size={14} className={isPlaying ? 'text-pink-500 animate-bounce' : 'text-slate-400'} />
          <span className="text-xs font-medium text-slate-700 whitespace-nowrap hidden sm:inline">
            {isPlaying ? 'Birthday Melody' : 'Play Music'}
          </span>
          {isPlaying && (
            <span className="flex items-end gap-0.5 h-3 ml-0.5" aria-hidden="true">
              <span className="w-0.5 h-2.5 bg-pink-400 rounded-full animate-pulse" />
              <span className="w-0.5 h-3 bg-pink-500 rounded-full animate-pulse [animation-delay:150ms]" />
              <span className="w-0.5 h-1.5 bg-pink-400 rounded-full animate-pulse [animation-delay:300ms]" />
            </span>
          )}
        </div>

        <button
          onClick={handleToggleMute}
          className="p-1 text-slate-500 hover:text-slate-800 transition-colors ml-1"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX size={15} className="text-rose-400" /> : <Volume2 size={15} />}
        </button>

        {showVolumeSlider && (
          <div className="flex items-center pl-1 pr-2 animate-fadeIn">
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-16 h-1.5 bg-pink-100 rounded-lg appearance-none cursor-pointer accent-pink-500"
              aria-label="Volume slider"
            />
          </div>
        )}
      </div>
    </div>
  );
};
