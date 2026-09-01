/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Pause, Camera, RefreshCw, Hand, Sparkles, CheckCircle2, Zap, Sliders, Layers, Eye, Cpu, Terminal, ArrowRight } from 'lucide-react';

interface HMotionSimulatorProps {
  onClose: () => void;
}

type GestureType = 'peace' | 'pinch' | 'thumbs_up' | 'open_palm' | 'pointing' | 'fist';

interface GestureInfo {
  id: GestureType;
  name: string;
  emoji: string;
  action: string;
  confidence: number;
  landmarks: number[][]; // [x, y] coordinates
}

export default function HMotionSimulator({ onClose }: HMotionSimulatorProps) {
  const [activeGesture, setActiveGesture] = useState<GestureType>('peace');
  const [isTracking, setIsTracking] = useState(true);
  const [fps, setFps] = useState(60);
  const [latency, setLatency] = useState(12);
  const [confidence, setConfidence] = useState(98.4);
  const [interactiveValue, setInteractiveValue] = useState(50);
  const [isWebcamSimulated, setIsWebcamSimulated] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState<'cyber' | 'minimal' | 'hud'>('cyber');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const gestures: GestureInfo[] = [
    {
      id: 'peace',
      name: 'Peace / Victory (V-Sign)',
      emoji: '✌️',
      action: 'Navigates UI tabs & activates dual selection mode',
      confidence: 99.1,
      landmarks: [
        [0.5, 0.8], [0.45, 0.7], [0.42, 0.6], [0.4, 0.55], // Thumb
        [0.5, 0.8], [0.46, 0.5], [0.44, 0.35], [0.42, 0.2], // Index (extended)
        [0.5, 0.8], [0.5, 0.48], [0.5, 0.32], [0.5, 0.18],  // Middle (extended)
        [0.5, 0.8], [0.54, 0.55], [0.55, 0.65], [0.54, 0.72], // Ring (curled)
        [0.5, 0.8], [0.58, 0.58], [0.6, 0.68], [0.59, 0.75], // Pinky (curled)
      ]
    },
    {
      id: 'pinch',
      name: 'Precision Pinch / Grab',
      emoji: '🤏',
      action: 'Controls sliders, zooms viewport & drags 3D elements',
      confidence: 97.8,
      landmarks: [
        [0.5, 0.8], [0.46, 0.65], [0.44, 0.52], [0.48, 0.45], // Thumb tip meets index
        [0.5, 0.8], [0.48, 0.6], [0.49, 0.5], [0.48, 0.45],  // Index touches thumb
        [0.5, 0.8], [0.52, 0.58], [0.55, 0.65], [0.54, 0.72], // Middle curled
        [0.5, 0.8], [0.56, 0.62], [0.58, 0.7], [0.57, 0.76],  // Ring curled
        [0.5, 0.8], [0.6, 0.65], [0.62, 0.73], [0.61, 0.8],   // Pinky curled
      ]
    },
    {
      id: 'thumbs_up',
      name: 'Thumbs Up Approval',
      emoji: '👍',
      action: 'Confirms action, submits forms & triggers assent pulse',
      confidence: 98.6,
      landmarks: [
        [0.5, 0.8], [0.44, 0.6], [0.42, 0.4], [0.4, 0.22],   // Thumb extended upward
        [0.5, 0.8], [0.52, 0.65], [0.55, 0.72], [0.53, 0.78], // Index curled
        [0.5, 0.8], [0.54, 0.68], [0.57, 0.75], [0.55, 0.8],  // Middle curled
        [0.5, 0.8], [0.56, 0.7], [0.59, 0.77], [0.57, 0.82],  // Ring curled
        [0.5, 0.8], [0.58, 0.72], [0.61, 0.79], [0.59, 0.84], // Pinky curled
      ]
    },
    {
      id: 'pointing',
      name: 'Index Point / Laser',
      emoji: '☝️',
      action: 'Precise mouse cursor emulation & spatial raycasting',
      confidence: 99.4,
      landmarks: [
        [0.5, 0.8], [0.45, 0.68], [0.44, 0.58], [0.45, 0.52], // Thumb folded
        [0.5, 0.8], [0.48, 0.5], [0.47, 0.32], [0.46, 0.16],  // Index fully extended upward
        [0.5, 0.8], [0.52, 0.62], [0.54, 0.7], [0.53, 0.76],  // Middle curled
        [0.5, 0.8], [0.56, 0.65], [0.57, 0.73], [0.56, 0.79], // Ring curled
        [0.5, 0.8], [0.6, 0.68], [0.61, 0.75], [0.6, 0.81],   // Pinky curled
      ]
    },
    {
      id: 'open_palm',
      name: 'Open Palm / Stop',
      emoji: '✋',
      action: 'Freezes gesture stream, pauses media & resets viewport',
      confidence: 99.7,
      landmarks: [
        [0.5, 0.8], [0.42, 0.65], [0.36, 0.52], [0.3, 0.42], // Thumb out
        [0.5, 0.8], [0.45, 0.5], [0.42, 0.3], [0.4, 0.16],   // Index out
        [0.5, 0.8], [0.5, 0.45], [0.5, 0.28], [0.5, 0.14],   // Middle out
        [0.5, 0.8], [0.55, 0.5], [0.58, 0.32], [0.6, 0.18],  // Ring out
        [0.5, 0.8], [0.6, 0.56], [0.66, 0.4], [0.7, 0.26],   // Pinky out
      ]
    },
    {
      id: 'fist',
      name: 'Closed Fist / Lock',
      emoji: '✊',
      action: 'Locks interface controls, triggers safety hold & mutes audio',
      confidence: 96.9,
      landmarks: [
        [0.5, 0.8], [0.46, 0.68], [0.48, 0.58], [0.5, 0.52], // Thumb wrapping over fingers
        [0.5, 0.8], [0.48, 0.66], [0.49, 0.58], [0.48, 0.54], // Index curled
        [0.5, 0.8], [0.52, 0.66], [0.53, 0.58], [0.52, 0.54], // Middle curled
        [0.5, 0.8], [0.56, 0.67], [0.57, 0.6], [0.56, 0.56],  // Ring curled
        [0.5, 0.8], [0.6, 0.69], [0.61, 0.62], [0.6, 0.58],   // Pinky curled
      ]
    }
  ];

  const currentGesture = gestures.find(g => g.id === activeGesture) || gestures[0];

  // Draw 21-Point Skeletal Landmark Nodes on HTML5 Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    const render = () => {
      time += 0.04;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      // Draw cyber background grid
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.07)';
      ctx.lineWidth = 1;
      const gridSize = 24;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      if (isTracking) {
        const floatOffset = Math.sin(time * 2) * 6;
        const pts = currentGesture.landmarks.map(([normX, normY]) => ({
          x: normX * w,
          y: normY * h + floatOffset,
        }));

        // Draw Skeletal Connecting Bones (MediaPipe Hand Topology)
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#0284c7';
        ctx.shadowBlur = 12;

        const bones = [
          // Thumb
          [0, 1], [1, 2], [2, 3],
          // Index
          [4, 5], [5, 6], [6, 7],
          // Middle
          [8, 9], [9, 10], [10, 11],
          // Ring
          [12, 13], [13, 14], [14, 15],
          // Pinky
          [16, 17], [17, 18], [18, 19],
          // Palm Base connections
          [0, 4], [4, 8], [8, 12], [12, 16], [16, 0]
        ];

        bones.forEach(([from, to]) => {
          if (pts[from] && pts[to]) {
            ctx.beginPath();
            ctx.moveTo(pts[from].x, pts[from].y);
            ctx.lineTo(pts[to].x, pts[to].y);
            ctx.stroke();
          }
        });

        // Draw Landmark Joint Nodes
        pts.forEach((pt, idx) => {
          ctx.beginPath();
          const isTip = [3, 7, 11, 15, 19].includes(idx);
          const radius = isTip ? 6 : 4;
          ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);

          if (isTip) {
            ctx.fillStyle = '#a855f7';
            ctx.shadowColor = '#c084fc';
            ctx.shadowBlur = 15;
          } else {
            ctx.fillStyle = '#38bdf8';
            ctx.shadowColor = '#38bdf8';
            ctx.shadowBlur = 8;
          }
          ctx.fill();

          // Small ring around tips
          if (isTip) {
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, radius + 3, 0, Math.PI * 2);
            ctx.stroke();
          }
        });

        // Draw Bounding Box & HUD Coordinates
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.4)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.strokeRect(w * 0.2, h * 0.1 + floatOffset, w * 0.6, h * 0.75);
        ctx.setLineDash([]);

        // HUD Text Overlay
        ctx.fillStyle = '#38bdf8';
        ctx.font = '10px monospace';
        ctx.fillText(`GESTURE: ${currentGesture.id.toUpperCase()}`, w * 0.22, h * 0.16 + floatOffset);
        ctx.fillStyle = '#a855f7';
        ctx.fillText(`CONF: ${(currentGesture.confidence).toFixed(1)}%`, w * 0.22, h * 0.2 + floatOffset);
        ctx.fillStyle = '#10b981';
        ctx.fillText(`FPS: 60 | LATENCY: 12ms`, w * 0.22, h * 0.24 + floatOffset);
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [activeGesture, isTracking, currentGesture]);

  // Adjust interactive slider automatically when Pinch gesture is active
  useEffect(() => {
    if (activeGesture === 'pinch') {
      const interval = setInterval(() => {
        setInteractiveValue(prev => (prev >= 95 ? 10 : prev + 5));
      }, 400);
      return () => clearInterval(interval);
    }
  }, [activeGesture]);

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

      {/* Main Window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        className="relative w-full max-w-5xl bg-slate-900/95 border border-white/15 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[92vh]"
      >
        {/* Glow ambient background lights */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />

        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-950/70 backdrop-blur-md relative z-10">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
              <Hand size={20} />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-display font-bold text-white text-base">H-MOTION AI</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  REAL-TIME VISION SIMULATOR
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                21-Point Hand Skeletal Landmark Pipeline & Spatial AI Engine
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsTracking(!isTracking)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold border transition-colors flex items-center space-x-1.5 cursor-pointer ${
                isTracking
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isTracking ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`} />
              <span>{isTracking ? 'STREAM ACTIVE' : 'STREAM PAUSED'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Simulator Body */}
        <div className="p-6 overflow-y-auto no-scrollbar space-y-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Vision Canvas Stream & Live HUD */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-white/10 shadow-2xl aspect-[4/3] flex items-center justify-center">
                
                {/* Canvas with skeletal rendering */}
                <canvas
                  ref={canvasRef}
                  width={480}
                  height={360}
                  className="w-full h-full object-contain"
                />

                {/* Top Corner Telemetry HUD */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-2 pointer-events-none">
                  <div className="px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-slate-300 flex items-center space-x-1.5">
                    <Camera size={12} className="text-blue-400" />
                    <span>720p @ 60 FPS</span>
                  </div>
                  <div className="px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-emerald-400 flex items-center space-x-1.5">
                    <Zap size={12} />
                    <span>Inference: 12ms</span>
                  </div>
                </div>

                {/* Bottom Active Gesture Overlay */}
                <div className="absolute bottom-3 inset-x-3 flex items-center justify-between p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/10">
                  <div className="flex items-center space-x-2.5">
                    <span className="text-2xl">{currentGesture.emoji}</span>
                    <div>
                      <span className="text-xs font-display font-bold text-white block">
                        {currentGesture.name}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 block">
                        {currentGesture.action}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-emerald-400 block">
                      {currentGesture.confidence.toFixed(1)}% Match
                    </span>
                    <span className="text-[9px] font-mono text-slate-500 uppercase">Confidence</span>
                  </div>
                </div>
              </div>

              {/* Gesture Selection Strip */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="uppercase font-semibold">Test Spatial Gestures</span>
                  <span className="text-blue-400">Select to test recognition</span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {gestures.map(g => (
                    <button
                      key={g.id}
                      onClick={() => setActiveGesture(g.id)}
                      className={`p-2.5 rounded-xl border flex flex-col items-center justify-center space-y-1 transition-all cursor-pointer ${
                        activeGesture === g.id
                          ? 'bg-blue-500/20 border-blue-500 text-white shadow-lg shadow-blue-500/20'
                          : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.05]'
                      }`}
                    >
                      <span className="text-xl">{g.emoji}</span>
                      <span className="text-[9px] font-mono font-bold truncate max-w-full">
                        {g.id.toUpperCase()}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Interactive UI Actions & Architecture Stack */}
            <div className="lg:col-span-5 space-y-5">
              
              {/* Live Interactive Action Demonstration */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Sliders size={16} className="text-purple-400" />
                    <span className="text-xs font-mono uppercase font-bold text-white">
                      Live Gesture Interaction
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                    Active Hand Control
                  </span>
                </div>

                {/* Pinch-Controlled Volume / Dimmer Bar */}
                <div className="space-y-2 p-3.5 rounded-xl bg-slate-950/70 border border-white/5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">Pinch Spatial Scale</span>
                    <span className="text-blue-400 font-bold">{interactiveValue}%</span>
                  </div>
                  <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden p-0.5">
                    <motion.div
                      animate={{ width: `${interactiveValue}%` }}
                      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                      className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full shadow-lg"
                    />
                  </div>
                  <span className="text-[10px] text-slate-500 font-sans block">
                    {activeGesture === 'pinch' 
                      ? '⚡ Pinch gesture currently manipulating slider in real time!' 
                      : 'Switch to Pinch 🤏 to test autonomous gesture control.'}
                  </span>
                </div>

                {/* Pointing Laser Target Simulation */}
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/5 space-y-2">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-slate-400">Laser Pointer Raycast</span>
                    <span className="text-emerald-400 font-bold">X: 342px | Y: 180px</span>
                  </div>
                  <div className="h-14 rounded-lg bg-black/40 border border-white/10 relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-[radial-gradient(rgba(56,189,248,0.1)_1px,transparent_1px)] [background-size:12px_12px]" />
                    <motion.div
                      animate={{
                        x: activeGesture === 'pointing' ? [0, 40, -40, 0] : 0,
                        y: activeGesture === 'pointing' ? [0, -10, 10, 0] : 0,
                      }}
                      transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                      className="w-4 h-4 rounded-full bg-red-500 shadow-[0_0_12px_#ef4444] border border-white flex items-center justify-center"
                    >
                      <div className="w-1 h-1 rounded-full bg-white animate-ping" />
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Architecture & Engineering Highlights */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                <span className="text-xs font-mono uppercase font-bold text-slate-400 block">
                  System Architecture
                </span>
                
                <div className="space-y-2 text-xs font-sans text-slate-300">
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 size={14} className="text-blue-400 mt-0.5 shrink-0" />
                    <span><strong>MediaPipe & YOLOv8:</strong> Real-time extraction of 21 3D coordinate landmarks per hand.</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 size={14} className="text-purple-400 mt-0.5 shrink-0" />
                    <span><strong>WebSocket Bridge:</strong> Sub-15ms client-server state synchronization over Node.js & Express.</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 shrink-0" />
                    <span><strong>Full-Stack Interface:</strong> Responsive React 19 canvas HUD with dynamic gesture triggers.</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex flex-wrap gap-1.5">
                  {['React', 'TypeScript', 'Node.js', 'Express', 'YOLOv8', 'MediaPipe', 'WebSockets'].map((t, idx) => (
                    <span key={idx} className="text-[10px] font-mono px-2 py-1 rounded bg-white/5 text-blue-300 border border-white/10">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-slate-950/70 backdrop-blur-md flex items-center justify-between">
          <span className="text-xs text-slate-400 font-mono">
            H-MOTION AI • Built with Computer Vision & Full Stack
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-colors cursor-pointer"
          >
            Close Simulator
          </button>
        </div>

      </motion.div>
    </div>
  );
}
