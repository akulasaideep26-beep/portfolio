/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Minimize2, RotateCcw, Sparkles, Upload, Check } from 'lucide-react';
import saideepPoster from '../assets/images/saideep_profile_updated.jpg';

interface HeroTalkingVideoProps {
  onOpenResume?: () => void;
}

export default function HeroTalkingVideo({ onOpenResume }: HeroTalkingVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [hasStartedWithSound, setHasStartedWithSound] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string>(`${import.meta.env.BASE_URL}videos/saideep_intro.mp4`);
  const [isCustomLoaded, setIsCustomLoaded] = useState(false);

  // Auto-hide controls timer
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2500);
    }
  };

  // Attempt initial muted autoplay on mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }

    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [videoSrc]);

  // Video event handlers
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration || 1;
      setCurrentTime(current);
      setProgress((current / total) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 0);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setProgress(100);
    setShowControls(true);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const playWithSound = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.muted = false;
    setIsMuted(false);
    setHasStartedWithSound(true);
    videoRef.current.play();
    setIsPlaying(true);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * (videoRef.current.duration || 0);
  };

  const handleRestart = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error('Fullscreen request failed:', err);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(err => {
        console.error('Exit fullscreen failed:', err);
      });
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Handle local video file replacement if user selects one
  const handleCustomVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
      setIsCustomLoaded(true);
      setHasStartedWithSound(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.muted = false;
          setIsMuted(false);
          videoRef.current.play();
          setIsPlaying(true);
        }
      }, 200);
    }
  };

  const formatTime = (timeInSeconds: number) => {
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      className="relative w-full rounded-3xl overflow-hidden bg-slate-950 border border-white/15 shadow-2xl shadow-blue-500/10 group select-none transition-all duration-300"
    >
      {/* Ambient cinematic backlighting */}
      <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-80 transition duration-700 pointer-events-none" />

      {/* Main HTML5 Video Frame preserving character fidelity */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full h-full bg-slate-950 overflow-hidden rounded-3xl flex items-center justify-center">
        <video
          ref={videoRef}
          src={videoSrc}
          poster={saideepPoster}
          playsInline
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleVideoEnded}
          onClick={togglePlay}
          className="w-full h-full object-cover sm:object-contain object-center cursor-pointer transition-transform duration-500"
        />

        {/* Big Unmute / Play Center Overlay button when video is muted or paused */}
        {!hasStartedWithSound && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] flex items-center justify-center p-4 z-20"
          >
            <button
              onClick={playWithSound}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-display font-bold text-sm shadow-2xl shadow-blue-500/40 flex items-center space-x-3 active:scale-95 transition-all duration-300 border border-white/20 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Play size={16} className="fill-white ml-0.5" />
              </div>
              <div className="text-left">
                <span className="block text-xs uppercase tracking-wider font-mono text-blue-200">
                  Talking Portrait Introduction
                </span>
                <span className="block text-sm font-semibold">Play with Voice & Audio</span>
              </div>
            </button>
          </motion.div>
        )}

        {/* Minimal Corner Badges (Top) */}
        <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-none z-10">
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-blue-300 font-bold uppercase tracking-wider flex items-center space-x-1.5 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>AKULA SAIDEEP • CSE (AI & ML)</span>
            </span>
          </div>

          <div className="flex items-center space-x-2 pointer-events-auto">
            {/* Custom Video Load Tooltip */}
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleCustomVideoUpload}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              title="Load custom MP4 video file"
              className="px-2.5 py-1 rounded-lg bg-slate-950/80 hover:bg-slate-900 border border-white/10 text-slate-400 hover:text-white text-[10px] font-mono transition-colors flex items-center space-x-1 backdrop-blur-md cursor-pointer"
            >
              <Upload size={10} />
              <span>{isCustomLoaded ? 'Custom Video Loaded' : 'Change Video'}</span>
            </button>
          </div>
        </div>

        {/* Minimal Cinematic Floating Video Controls (Bottom) */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-4 inset-x-4 p-3 rounded-2xl bg-slate-950/85 backdrop-blur-xl border border-white/10 shadow-2xl z-20 space-y-2"
            >
              {/* Sleek Progress Scrubber */}
              <div
                onClick={handleSeek}
                className="w-full h-2 bg-white/10 hover:h-2.5 rounded-full overflow-hidden cursor-pointer relative group/bar transition-all"
              >
                <div
                  className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full transition-all relative"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-md opacity-0 group-hover/bar:opacity-100 transition-opacity" />
                </div>
              </div>

              {/* Control Action Buttons */}
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center space-x-3">
                  {/* Play / Pause */}
                  <button
                    onClick={togglePlay}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-white transition-colors cursor-pointer active:scale-95"
                    title={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} className="fill-current" />}
                  </button>

                  {/* Replay */}
                  <button
                    onClick={handleRestart}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors cursor-pointer active:scale-95"
                    title="Restart Video"
                  >
                    <RotateCcw size={14} />
                  </button>

                  {/* Mute / Unmute */}
                  <button
                    onClick={toggleMute}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors cursor-pointer active:scale-95 flex items-center space-x-1.5"
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX size={16} className="text-amber-400" /> : <Volume2 size={16} className="text-emerald-400" />}
                  </button>

                  {/* Time Tracker */}
                  <span className="text-[11px] font-mono text-slate-400">
                    {formatTime(currentTime)} <span className="text-slate-600">/</span> {formatTime(duration || 7)}
                  </span>
                </div>

                {/* Right controls: HD indicator and Fullscreen */}
                <div className="flex items-center space-x-2">
                  <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    ORIGINAL AUDIO & SYNC
                  </span>

                  <button
                    onClick={toggleFullscreen}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors cursor-pointer active:scale-95"
                    title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                  >
                    {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
