/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, ExternalLink, Play, Layers, Code, CheckCircle, Cpu, FileText, ArrowUpRight, X, Sparkles, ShieldCheck } from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onLaunchSimulator?: (projectId: string) => void;
}

export default function ProjectDetailModal({ project, onClose, onLaunchSimulator }: ProjectDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'architecture' | 'technologies'>('overview');

  if (!project) return null;

  const projectDetailsMap: Record<string, {
    problem: string;
    solution: string;
    features: string[];
    architecture: string[];
  }> = {
    'hmotion-ai': {
      problem: 'Traditional human-computer interfaces rely strictly on physical peripherals (mice, keyboards, touchscreens), creating barriers in accessibility, sterile healthcare environments, and contactless spatial interaction.',
      solution: 'An edge-accelerated computer vision platform combining YOLOv8 and MediaPipe to classify 21 coordinates per hand in real-time, streaming low-latency spatial gesture events over WebSockets to control web interfaces directly.',
      features: [
        'Real-time 21-point hand landmark classification & tracking',
        'Sub-15ms inference latency using accelerated vision pipelines',
        'Dynamic gesture mapping: Pinch (zoom), Point (cursor), Fist (lock), Victory (navigate), Open Palm (pan)',
        'Full-stack bidirectional WebSocket telemetry with Node.js & Express',
        'Interactive spatial UI canvas with instant visual feedback'
      ],
      architecture: [
        'Client Tier: React 19 + TypeScript + Vite + Tailwind CSS for responsive spatial canvas rendering',
        'Vision Engine: YOLOv8 model & MediaPipe hands graph extracting 21 normalized 3D joint coordinates',
        'Server Tier: Node.js + Express backend with WebSocket channels for low-latency event syndication',
        'Data Layer: MongoDB database for user gesture profiles and telemetry log persistence'
      ]
    },
    'academic-doc-assistant': {
      problem: 'Higher education institutions expend hundreds of hours compiling accreditation compliance documentation (NAAC, NBA, NIRF), frequently facing missing evidence, unorganized meeting minutes, and non-standardized reports.',
      solution: 'An intelligent Generative AI document intelligence platform that automates document classification, extracts action items from meeting minutes, detects compliance gaps against institutional criteria, and auto-compiles Annual Quality Assurance Reports (AQAR).',
      features: [
        'AI Report Generation & AQAR compilation automation',
        'Automated meeting-minutes summarization & action-item extraction',
        'Missing evidence detection across departmental folders',
        'Accreditation gap analysis against NAAC & NBA criteria matrices',
        'Intelligent multi-category document classification & semantic vector search',
        'Compliance scoring metrics and institutional readiness gauges'
      ],
      architecture: [
        'Client Tier: Modern React + TypeScript + Tailwind CSS institutional administration dashboard',
        'AI Processing Tier: Generative AI LLMs + Vector Embeddings for semantic document search & extraction',
        'Backend Server: Python Flask RESTful API engine orchestrating document parsing workflows',
        'Database: MongoDB document store for audit trails, institutional criteria matrices, and evidence trees'
      ]
    },
    'clipboard': {
      problem: 'Developers and researchers frequently lose context and code snippets while switching across multiple windows, risking snippet loss and workflow fragmentation.',
      solution: 'A lightweight cross-platform clipboard manager with NLP-driven code block detection and secure AWS S3 cloud synchronization.',
      features: [
        'Automatic programming language syntax detection',
        'Local SQLite encrypted logging buffer',
        'Seamless cloud backup integration to AWS S3 buckets',
        'Instant multi-item copy-paste history search'
      ],
      architecture: [
        'Frontend & System Hooks: Python desktop client with clipboard event listeners',
        'Local Storage: SQLite relational database for sub-millisecond local reads',
        'Cloud Tier: AWS S3 REST APIs for cloud snapshot archiving',
        'Parsing Engine: Regex & NLP classification tokenizer for snippet categorization'
      ]
    }
  };

  const details = projectDetailsMap[project.id] || {
    problem: 'Addressing core engineering constraints through modern software design and scalable architecture.',
    solution: project.description,
    features: ['Modular code architecture', 'Responsive interface', 'Optimized performance'],
    architecture: ['Frontend client', 'Backend API service', 'Database persistence']
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-xl transition-opacity"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', stiffness: 100, damping: 18 }}
        className="relative w-full max-w-4xl rounded-3xl bg-[#09081e]/95 border border-white/15 p-6 sm:p-8 overflow-hidden shadow-2xl z-10 backdrop-blur-2xl max-h-[90vh] flex flex-col"
      >
        {/* Top Accent Gradient Bar */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="space-y-2 pr-10 shrink-0">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono text-blue-400 tracking-widest uppercase font-semibold">
              {project.category}
            </span>
            <span className="text-slate-600">•</span>
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[10px] font-mono uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>{project.status}</span>
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight leading-tight">
            {project.title}
          </h3>
        </div>

        {/* Tabs Navigation */}
        <div className="flex border-b border-white/10 gap-2 mt-6 shrink-0 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 text-xs font-mono font-semibold tracking-wider uppercase border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-blue-500 text-blue-300 bg-white/[0.02]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Overview & Problem
          </button>
          <button
            onClick={() => setActiveTab('features')}
            className={`px-4 py-2.5 text-xs font-mono font-semibold tracking-wider uppercase border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'features'
                ? 'border-blue-500 text-blue-300 bg-white/[0.02]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Key Features & Capabilities
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-4 py-2.5 text-xs font-mono font-semibold tracking-wider uppercase border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'architecture'
                ? 'border-blue-500 text-blue-300 bg-white/[0.02]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            System Architecture
          </button>
          <button
            onClick={() => setActiveTab('technologies')}
            className={`px-4 py-2.5 text-xs font-mono font-semibold tracking-wider uppercase border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'technologies'
                ? 'border-blue-500 text-blue-300 bg-white/[0.02]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Technology Stack
          </button>
        </div>

        {/* Scrollable Modal Content Body */}
        <div className="flex-1 overflow-y-auto py-6 space-y-6 pr-2 no-scrollbar">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Problem Statement Card */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                <span className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-wider block">
                  Problem Statement
                </span>
                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                  {details.problem}
                </p>
              </div>

              {/* Solution Card */}
              <div className="p-5 rounded-2xl bg-blue-500/5 border border-blue-500/20 space-y-2">
                <span className="text-[11px] font-mono text-blue-300 font-bold uppercase tracking-wider block">
                  Engineered Solution
                </span>
                <p className="text-sm text-slate-200 leading-relaxed font-sans">
                  {details.solution}
                </p>
              </div>

              {/* Media Preview Frame */}
              <div className="rounded-2xl overflow-hidden border border-white/10 aspect-[16/8] bg-black/40 relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="space-y-4">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                Implemented Capabilities & Modules
              </span>
              <div className="grid grid-cols-1 gap-3">
                {details.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-start space-x-3 hover:border-blue-500/30 transition-colors"
                  >
                    <div className="w-5 h-5 rounded-md bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle size={14} />
                    </div>
                    <span className="text-sm text-slate-200 font-sans leading-relaxed">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-4">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                Architectural Breakdown & Data Flow
              </span>
              <div className="space-y-3">
                {details.architecture.map((arch, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-1 hover:border-purple-500/30 transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-purple-400" />
                      <span className="text-xs font-mono font-semibold text-purple-300 uppercase">
                        Layer 0{idx + 1}
                      </span>
                    </div>
                    <p className="text-sm text-slate-300 font-sans leading-relaxed pt-1">
                      {arch}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'technologies' && (
            <div className="space-y-4">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                Verified Technologies & Tools
              </span>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-slate-200 text-xs font-mono flex items-center space-x-2 hover:border-blue-500/40 hover:text-blue-300 transition-all"
                  >
                    <Code size={13} className="text-blue-400" />
                    <span>{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions: GitHub & Live Demo */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center space-x-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-white/[0.05] hover:bg-white/10 border border-white/15 text-white font-semibold text-xs py-3 px-4 rounded-xl transition-all cursor-pointer"
              >
                <Github size={15} />
                <span>GitHub Repo</span>
                <ArrowUpRight size={13} />
              </a>
            )}

            {onLaunchSimulator && (
              <button
                onClick={() => {
                  onClose();
                  onLaunchSimulator(project.id);
                }}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs py-3 px-5 rounded-xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all cursor-pointer"
              >
                <Play size={13} className="fill-white" />
                <span>Open Live Simulation Demo</span>
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-mono transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}
