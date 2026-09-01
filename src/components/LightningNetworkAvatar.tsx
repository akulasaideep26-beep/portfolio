/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Sparkles, Activity, ShieldCheck, Cpu, Play, Maximize2, Radio } from 'lucide-react';
import saideepAvatar from '../assets/images/saideep_profile_updated.jpg';

interface LightningNetworkAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showBadges?: boolean;
  interactive?: boolean;
  onOpenIntro?: () => void;
  className?: string;
}

export default function LightningNetworkAvatar({
  size = 'hero',
  showBadges = true,
  interactive = true,
  onOpenIntro,
  className = '',
}: LightningNetworkAvatarProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isSurging, setIsSurging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeNodesCount, setActiveNodesCount] = useState(12);
  const [neuralSync, setNeuralSync] = useState(98.4);

  // Size definitions in pixels
  const sizeMap = {
    sm: { container: 180, image: 120, ringRadius: 70 },
    md: { container: 260, image: 180, ringRadius: 105 },
    lg: { container: 340, image: 240, ringRadius: 140 },
    hero: { container: 420, image: 290, ringRadius: 175 },
  };

  const currentSize = sizeMap[size] || sizeMap.hero;

  // Neural network nodes configuration
  const nodeCount = 12;
  const nodes = useRef<Array<{ angle: number; speed: number; pulse: number; size: number }>>([]);

  // Initialize network nodes on mount
  useEffect(() => {
    const initialNodes = [];
    for (let i = 0; i < nodeCount; i++) {
      initialNodes.push({
        angle: (i * (2 * Math.PI)) / nodeCount,
        speed: (Math.random() * 0.003 + 0.002) * (i % 2 === 0 ? 1 : -1),
        pulse: Math.random() * Math.PI,
        size: Math.random() * 2 + 3.5,
      });
    }
    nodes.current = initialNodes;
  }, []);

  // Audio synthesizer for electric surge crackle (safe Web Audio API)
  const playSurgeAudio = useCallback(() => {
    try {
      const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Generate soft electric buzz & chime
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);
      filter.Q.setValueAtTime(3, ctx.currentTime);

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
      osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.4);

      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.55);
    } catch {
      // Ignore audio failure
    }
  }, []);

  const triggerSurge = () => {
    setIsSurging(true);
    playSurgeAudio();
    setNeuralSync(+(98.5 + Math.random() * 1.4).toFixed(1));
    setTimeout(() => {
      setIsSurging(false);
    }, 1200);
  };

  // Lightning Arc generation algorithm
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    // Recursive lightning bolt drawing function
    const drawLightningSegment = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      displace: number,
      minDisplace: number,
      color: string,
      lineWidth: number
    ) => {
      if (displace < minDisplace) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.stroke();
        return;
      }

      const midX = (x1 + x2) / 2 + (Math.random() - 0.5) * displace;
      const midY = (y1 + y2) / 2 + (Math.random() - 0.5) * displace;

      drawLightningSegment(x1, y1, midX, midY, displace / 2, minDisplace, color, lineWidth);
      drawLightningSegment(midX, midY, x2, y2, displace / 2, minDisplace, color, lineWidth);

      // Random sub-branch
      if (Math.random() < 0.2 && displace > minDisplace * 2) {
        const branchX = midX + (Math.random() - 0.5) * displace * 0.8;
        const branchY = midY + (Math.random() - 0.5) * displace * 0.8;
        drawLightningSegment(midX, midY, branchX, branchY, displace / 2, minDisplace * 1.5, 'rgba(168, 85, 247, 0.6)', lineWidth * 0.6);
      }
    };

    const render = () => {
      time += 0.02;
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = currentSize.ringRadius;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Network Constellation Orbit Lines
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 6]);
      ctx.stroke();
      ctx.restore();

      // Outer secondary ring
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius + 18, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.18)';
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 8]);
      ctx.stroke();
      ctx.restore();

      // Inner glow ring
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius - 8, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.3)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      // 2. Update and Draw Network Nodes & Interconnections
      const currentNodes = nodes.current;
      const nodeCoords: Array<{ x: number; y: number; angle: number }> = [];

      currentNodes.forEach((node) => {
        node.angle += node.speed * (isSurging ? 2.5 : 1);
        node.pulse += 0.04;

        const x = centerX + Math.cos(node.angle) * radius;
        const y = centerY + Math.sin(node.angle) * radius;
        nodeCoords.push({ x, y, angle: node.angle });

        // Node Glow Halo
        const glowSize = (Math.sin(node.pulse) + 1) * 3 + node.size;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, glowSize * 2.5);
        grad.addColorStop(0, isSurging ? 'rgba(255, 255, 255, 0.9)' : 'rgba(56, 189, 248, 0.8)');
        grad.addColorStop(0.5, 'rgba(168, 85, 247, 0.4)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, glowSize * 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Node Core
        ctx.fillStyle = isSurging ? '#ffffff' : '#38bdf8';
        ctx.beginPath();
        ctx.arc(x, y, node.size * 0.8, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Network Circuit Interconnections
      for (let i = 0; i < nodeCoords.length; i++) {
        const nextIdx = (i + 1) % nodeCoords.length;
        const p1 = nodeCoords[i];
        const p2 = nodeCoords[nextIdx];

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Cross-network diagonals
        if (i % 3 === 0) {
          const crossIdx = (i + 4) % nodeCoords.length;
          const pCross = nodeCoords[crossIdx];
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(pCross.x, pCross.y);
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.12)';
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // 3. Lightning Electric Arc Generation
      const lightningIntensity = isSurging ? 6 : isHovered ? 4 : 2;

      for (let l = 0; l < lightningIntensity; l++) {
        if (Math.random() < 0.85) {
          // Select two nearby or random nodes
          const startIndex = Math.floor(Math.random() * nodeCoords.length);
          const step = Math.random() < 0.6 ? 1 : Math.floor(Math.random() * 3) + 1;
          const endIndex = (startIndex + step) % nodeCoords.length;

          const start = nodeCoords[startIndex];
          const end = nodeCoords[endIndex];

          // Calculate displacement based on surge status
          const displace = isSurging ? 25 : 14;

          // Layer 1: Electric Cyan Glow Discharge
          drawLightningSegment(
            start.x,
            start.y,
            end.x,
            end.y,
            displace,
            3,
            isSurging ? 'rgba(56, 189, 248, 0.8)' : 'rgba(56, 189, 248, 0.55)',
            isSurging ? 3.5 : 2
          );

          // Layer 2: Ultra-Bright White Hot Electric Core
          drawLightningSegment(
            start.x,
            start.y,
            end.x,
            end.y,
            displace * 0.7,
            2,
            '#ffffff',
            isSurging ? 2 : 1
          );

          // Random outward lightning spark toward space
          if (Math.random() < (isSurging ? 0.6 : 0.25)) {
            const angle = start.angle + (Math.random() - 0.5) * 0.5;
            const sparkDist = radius + Math.random() * (isSurging ? 45 : 25);
            const sparkX = centerX + Math.cos(angle) * sparkDist;
            const sparkY = centerY + Math.sin(angle) * sparkDist;

            drawLightningSegment(
              start.x,
              start.y,
              sparkX,
              sparkY,
              displace * 0.8,
              3,
              'rgba(192, 132, 252, 0.75)',
              1.2
            );
          }
        }
      }

      // 4. Orbiting Photon Electron Packets
      const packetCount = 3;
      for (let p = 0; p < packetCount; p++) {
        const packetAngle = time * (1.2 + p * 0.4) + (p * Math.PI * 2) / packetCount;
        const px = centerX + Math.cos(packetAngle) * (radius + (p % 2 === 0 ? 0 : 18));
        const py = centerY + Math.sin(packetAngle) * (radius + (p % 2 === 0 ? 0 : 18));

        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentSize.ringRadius, isSurging, isHovered]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative flex items-center justify-center select-none group ${className}`}
      style={{ width: `${currentSize.container}px`, height: `${currentSize.container}px` }}
    >
      {/* Outer Ambient Atmospheric Backlight */}
      <div
        className={`absolute inset-0 rounded-full transition-all duration-700 pointer-events-none ${
          isSurging
            ? 'bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-500 opacity-70 blur-3xl scale-110'
            : isHovered
            ? 'bg-gradient-to-tr from-blue-500 via-purple-500 to-cyan-400 opacity-45 blur-2xl scale-105'
            : 'bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 opacity-25 blur-2xl scale-95'
        }`}
      />

      {/* Lightning Canvas Frame Layer */}
      <canvas
        ref={canvasRef}
        width={currentSize.container}
        height={currentSize.container}
        className="absolute inset-0 pointer-events-none z-20"
      />

      {/* Rotating Cybernetic HUD Ring Overlays */}
      <div className="absolute inset-4 rounded-full border border-dashed border-cyan-400/25 animate-[spin_40s_linear_infinite] pointer-events-none z-10" />
      <div className="absolute inset-8 rounded-full border border-dashed border-purple-500/20 animate-[spin_60s_linear_reverse_infinite] pointer-events-none z-10" />

      {/* High-Contrast Electric Rim Enclosure */}
      <div
        className={`relative z-15 rounded-full p-[3px] transition-all duration-500 shadow-2xl ${
          isSurging
            ? 'bg-gradient-to-r from-cyan-300 via-white to-purple-300 shadow-[0_0_40px_rgba(56,189,248,0.8)] scale-102'
            : isHovered
            ? 'bg-gradient-to-tr from-cyan-400 via-indigo-400 to-purple-400 shadow-[0_0_30px_rgba(99,102,241,0.6)]'
            : 'bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-600 shadow-[0_0_20px_rgba(56,189,248,0.35)]'
        }`}
        style={{ width: `${currentSize.image}px`, height: `${currentSize.image}px` }}
      >
        {/* Photo Container Frame */}
        <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-950 border-2 border-slate-800 group shadow-inner">
          {/* User's Original Profile Image displayed directly without pixel alteration */}
          <img
            src={saideepAvatar}
            alt="Akula Saideep - AI & ML Developer"
            className="w-full h-full object-cover object-top"
            referrerPolicy="no-referrer"
          />

          {/* Bottom Title Pill */}
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-10 shrink-0 pointer-events-none">
            <span className="text-[9px] font-mono font-bold px-3 py-0.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-cyan-400/40 text-cyan-300 uppercase tracking-widest shadow-xl whitespace-nowrap">
              CSE (AI & ML)
            </span>
          </div>
        </div>
      </div>

      {/* Floating Status Badges */}
      {showBadges && size !== 'sm' && (
        <>
          {/* Top-Right Online Status Badge */}
          <div className="absolute top-2 right-2 z-30 bg-slate-950/95 border border-emerald-500/40 rounded-full py-1 px-3 shadow-2xl backdrop-blur-md flex items-center space-x-1.5 animate-bounce-subtle">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[9px] font-mono text-emerald-400 font-bold tracking-wider">
              ONLINE
            </span>
          </div>

          {/* Top-Left Telemetry Badge */}
          <div className="absolute top-2 left-2 z-30 bg-slate-950/95 border border-cyan-500/30 rounded-full py-1 px-2.5 shadow-2xl backdrop-blur-md flex items-center space-x-1.5">
            <Zap size={10} className="text-cyan-400 animate-pulse" />
            <span className="text-[9px] font-mono text-cyan-300 font-bold tracking-wider">
              SYNC {neuralSync}%
            </span>
          </div>

          {/* Bottom Interactive Voltage Surge Button */}
          {interactive && (
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
              <button
                onClick={triggerSurge}
                className="inline-flex items-center space-x-1.5 bg-slate-950/95 hover:bg-slate-900 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 font-mono text-[10px] py-1.5 px-3.5 rounded-full shadow-xl shadow-cyan-500/10 active:scale-95 transition-all cursor-pointer backdrop-blur-md group"
              >
                <Zap size={11} className="text-cyan-400 group-hover:scale-125 transition-transform" />
                <span className="font-semibold tracking-wider uppercase">⚡ Voltage Surge</span>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
