/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, CheckCircle, Terminal, Bot, User } from 'lucide-react';
import { personalInfo } from '../data';
import saideepAvatar from '../assets/images/saideep_profile_updated.jpg';

interface IntroModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
}

export default function IntroModal({ isOpen, onClose, onOpenResume }: IntroModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeWordIndex, setActiveWordIndex] = useState(-1);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const transcript = "Hi, I'm Akula Saideep, I'm a student in Computer Science, specializing in AI and Machine Learning. I build intelligent solutions. Welcome to my portfolio.";
  const words = transcript.split(' ');

  // Setup Web Speech API for voice intro
  useEffect(() => {
    if (!isOpen) {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setIsPlaying(false);
      setProgress(0);
      setActiveWordIndex(-1);
      return;
    }

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(transcript);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.lang = 'en-US';

      // Pick an English voice if available
      const voices = window.speechSynthesis.getVoices();
      const naturalVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('English')));
      if (naturalVoice) {
        utterance.voice = naturalVoice;
      }

      utterance.onboundary = (event) => {
        if (event.name === 'word') {
          // Calculate approx word index
          const charIndex = event.charIndex;
          let count = 0;
          let wIndex = 0;
          for (let i = 0; i < words.length; i++) {
            if (count >= charIndex) {
              wIndex = i;
              break;
            }
            count += words[i].length + 1;
          }
          setActiveWordIndex(wIndex);
        }
      };

      utterance.onend = () => {
        setIsPlaying(false);
        setProgress(100);
        setActiveWordIndex(words.length - 1);
      };

      speechRef.current = utterance;
    }

    // Auto-start playing on open
    handlePlay();

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isOpen]);

  // Audio Waveform Canvas Animation
  useEffect(() => {
    if (!isOpen || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let phase = 0;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      // Draw dynamic glowing audio waves
      const bars = 32;
      const barWidth = width / bars;

      for (let i = 0; i < bars; i++) {
        const barHeight = isPlaying
          ? Math.sin(phase + i * 0.4) * (height * 0.35) + Math.cos(phase * 1.5 + i * 0.2) * (height * 0.2) + height * 0.3
          : 4;

        const x = i * barWidth + barWidth * 0.15;
        const y = centerY - barHeight / 2;
        const w = barWidth * 0.7;

        // Gradient color for waves
        const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
        gradient.addColorStop(0, '#38bdf8');
        gradient.addColorStop(0.5, '#818cf8');
        gradient.addColorStop(1, '#c084fc');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, w, Math.max(barHeight, 2), 3);
        ctx.fill();
      }

      if (isPlaying) {
        phase += 0.15;
      }
      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isOpen, isPlaying]);

  const handlePlay = () => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    if (speechRef.current) {
      if (isMuted) {
        speechRef.current.volume = 0;
      } else {
        speechRef.current.volume = 1;
      }
      window.speechSynthesis.speak(speechRef.current);
      setIsPlaying(true);
      setProgress(0);
      setActiveWordIndex(0);
    }
  };

  const handlePause = () => {
    if (window.speechSynthesis) {
      if (isPlaying) {
        window.speechSynthesis.pause();
        setIsPlaying(false);
      } else {
        window.speechSynthesis.resume();
        setIsPlaying(true);
      }
    }
  };

  const handleRestart = () => {
    handlePlay();
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (speechRef.current) {
      speechRef.current.volume = !isMuted ? 0 : 1;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/85 backdrop-blur-xl"
      />

      {/* Modal Window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        className="relative w-full max-w-3xl bg-slate-900/95 border border-white/15 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col"
      >
        {/* Glow lights */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none" />

        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-950/60 backdrop-blur-md relative z-10">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <Bot size={18} />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-display font-bold text-white text-sm">Interactive Video & Voice Intro</span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>AI VERIFIED</span>
                </span>
              </div>
              <p className="text-[10px] font-mono text-slate-400">Akula Saideep • B.Tech CSE (AI & ML)</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Left: Talking Portrait Avatar Container */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="relative group w-48 sm:w-56 aspect-square rounded-2xl p-1 bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 shadow-2xl">
                {/* Outer pulsing ring when speaking */}
                {isPlaying && (
                  <div className="absolute -inset-2 rounded-3xl border-2 border-blue-400/40 animate-ping opacity-50 pointer-events-none" />
                )}

                <div className="w-full h-full rounded-2xl overflow-hidden bg-slate-950 relative">
                  <img
                    src={saideepAvatar}
                    alt={personalInfo.name}
                    className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-105' : 'scale-100'}`}
                  />
                  
                  {/* Gradient shade */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                  {/* Floating Live Badge */}
                  <div className="absolute top-3 left-3 flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[9px] font-mono font-bold text-emerald-400">
                    <span className={`w-1.5 h-1.5 rounded-full bg-emerald-400 ${isPlaying ? 'animate-ping' : ''}`} />
                    <span>{isPlaying ? 'SPEAKING' : 'READY'}</span>
                  </div>

                  {/* Role chip */}
                  <div className="absolute bottom-3 inset-x-3 text-center">
                    <span className="text-[10px] font-mono font-bold text-blue-300 bg-slate-950/90 border border-blue-500/30 px-3 py-1 rounded-full shadow-lg">
                      AI & ML SPECIALIST
                    </span>
                  </div>
                </div>
              </div>

              {/* Audio Waveform Canvas */}
              <div className="w-full mt-4 bg-slate-950/60 border border-white/10 rounded-xl p-2.5 flex items-center justify-center">
                <canvas ref={canvasRef} width={220} height={32} className="w-full h-8" />
              </div>
            </div>

            {/* Right: Interactive Speech & Transcript Display */}
            <div className="md:col-span-7 space-y-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 font-bold block mb-1">
                  Intro Pitch Transcript
                </span>
                <h4 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight">
                  Welcome to my Developer Portfolio
                </h4>
              </div>

              {/* Word-by-word highlighted subtitle box */}
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-white/10 min-h-[120px] flex items-center">
                <p className="text-sm sm:text-base leading-relaxed text-slate-300 font-sans">
                  {words.map((word, index) => (
                    <span
                      key={index}
                      className={`transition-colors duration-200 inline-block mr-1.5 ${
                        activeWordIndex === index
                          ? 'text-white font-bold bg-blue-500/30 px-1 rounded shadow'
                          : activeWordIndex > index
                          ? 'text-white font-medium'
                          : 'text-slate-400'
                      }`}
                    >
                      {word}
                    </span>
                  ))}
                </p>
              </div>

              {/* Speech Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={isPlaying ? handlePause : handlePlay}
                    className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-500/20 active:scale-95 transition-all cursor-pointer"
                  >
                    {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                    <span>{isPlaying ? 'Pause Voice' : 'Play Speech'}</span>
                  </button>

                  <button
                    onClick={handleRestart}
                    title="Restart Audio"
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
                  >
                    <RotateCcw size={14} />
                  </button>

                  <button
                    onClick={toggleMute}
                    title={isMuted ? 'Unmute' : 'Mute'}
                    className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                      isMuted
                        ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                  </button>
                </div>

                <div className="text-[10px] font-mono text-slate-400">
                  <span>Synthesizer: Active Web Audio</span>
                </div>
              </div>

              {/* Quick highlights */}
              <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-white/10">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-0.5">
                  <span className="text-[9px] font-mono text-purple-400 block uppercase font-bold">Academic Focus</span>
                  <span className="text-xs text-white font-medium block">Vaagdevi College (CGPA 8.39)</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-0.5">
                  <span className="text-[9px] font-mono text-blue-400 block uppercase font-bold">Key Domain</span>
                  <span className="text-xs text-white font-medium block">AI/ML, Edge IoT, Cloud (AWS)</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-slate-950/60 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10">
          <div className="text-xs text-slate-400 font-sans flex items-center space-x-2">
            <CheckCircle size={14} className="text-emerald-400" />
            <span>Looking for Software Engineering & AI/ML Internships</span>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onOpenResume();
              }}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs transition-colors cursor-pointer"
            >
              View Full Resume
            </button>
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              Explore Portfolio
            </button>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
