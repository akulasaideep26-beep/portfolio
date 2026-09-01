/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, ExternalLink, ArrowRight, Eye, Sparkles, BookOpen, Clock, Activity, ShieldAlert, Check, Hand, BrainCircuit, Play, Info } from 'lucide-react';
import { projects } from '../data';
import { Project } from '../types';
import ClipboardSimulator from './ClipboardSimulator';
import HMotionSimulator from './HMotionSimulator';
import AcademicDocSimulator from './AcademicDocSimulator';
import ProjectDetailModal from './ProjectDetailModal';

export default function Projects() {
  const [selectedInnovation, setSelectedInnovation] = useState<Project | null>(null);
  const [selectedSoftwareProject, setSelectedSoftwareProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'details' | 'future'>('all');
  const [isClipboardSimOpen, setIsClipboardSimOpen] = useState(false);
  const [isHMotionSimOpen, setIsHMotionSimOpen] = useState(false);
  const [isAcademicDocSimOpen, setIsAcademicDocSimOpen] = useState(false);

  // Filter projects by type
  const softwareProjects = projects.filter(p => p.type === 'Software');
  const innovationProjects = projects.filter(p => p.type === 'Innovation');

  const openInnovationDetails = (project: Project, tab: 'all' | 'details' | 'future') => {
    setSelectedInnovation(project);
    setActiveTab(tab);
  };

  const handleLaunchSimulator = (projectId: string) => {
    if (projectId === 'hmotion-ai') {
      setIsHMotionSimOpen(true);
    } else if (projectId === 'academic-doc-assistant') {
      setIsAcademicDocSimOpen(true);
    } else if (projectId === 'clipboard') {
      setIsClipboardSimOpen(true);
    }
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden border-t border-white/10 bg-transparent">
      {/* Dynamic Background Accents */}
      <div className="absolute top-[15%] left-[-10%] w-[450px] h-[450px] rounded-full bg-purple-800/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[15%] right-[-10%] w-[450px] h-[450px] rounded-full bg-blue-800/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Main Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-mono text-blue-400 tracking-widest uppercase block mb-2">
            My Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Engineering & Innovation Gallery
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full" />
          <p className="text-slate-300 mt-4 text-sm sm:text-base leading-relaxed">
            Explored through two distinct lenses: robust software implementations and eco-centric 
            or AI-assisted societal innovation concepts.
          </p>
        </div>

        {/* SECTION 1: SOFTWARE PROJECTS */}
        <div className="mb-24">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-1.5 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
              1. Software Projects
            </h3>
            <span className="text-xs font-mono px-2.5 py-1 rounded badge-software font-semibold">
              Developed & Implemented
            </span>
          </div>

          <div className="space-y-16">
            {softwareProjects.map((project, idx) => (
              <div 
                key={project.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 rounded-3xl bg-[#09081e]/60 border border-white/10 hover:border-blue-500/30 transition-all duration-300 backdrop-blur-md"
              >
                {/* Software Card Details */}
                <div className={`lg:col-span-7 space-y-6 ${idx % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono text-blue-400 tracking-widest uppercase block">
                        {project.category}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-[10px] font-mono text-purple-400 uppercase font-semibold">
                        Featured 0{idx + 1}
                      </span>
                    </div>
                    <h4 className="text-2xl sm:text-3xl font-display font-bold text-white leading-tight">
                      {project.title}
                    </h4>
                    <div className="inline-flex items-center space-x-2 badge-status px-2.5 py-1 rounded-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] font-mono text-emerald-400 font-semibold uppercase tracking-wider">
                        {project.status}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                    {project.description}
                  </p>

                  {/* Technology badging */}
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-slate-500 block">TECHNOLOGY STACK</span>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map(tech => (
                        <span
                          key={tech}
                          className="text-[11px] font-mono px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-blue-300 hover:border-blue-500/30 hover:bg-white/[0.05] transition-all"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() => setSelectedSoftwareProject(project)}
                      className="inline-flex items-center space-x-2 bg-white/[0.04] border border-white/10 hover:border-purple-500/40 hover:bg-white/[0.08] text-white font-semibold text-xs py-3 px-5 rounded-xl transition-all duration-300 active:scale-95 cursor-pointer"
                    >
                      <Info size={14} className="text-purple-400" />
                      <span>View Architecture & Specs</span>
                    </button>

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 bg-white/[0.04] border border-white/10 hover:border-blue-500/30 hover:bg-white/[0.08] text-white font-semibold text-xs py-3 px-5 rounded-xl transition-all duration-300 active:scale-95"
                      >
                        <Github size={14} className="text-blue-400" />
                        <span>Explore Repository</span>
                      </a>
                    )}
                    <button
                      onClick={() => handleLaunchSimulator(project.id)}
                      className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600/30 via-indigo-600/30 to-purple-600/30 hover:from-blue-600/50 hover:to-purple-600/50 border border-blue-500/40 text-white font-semibold text-xs py-3 px-5 rounded-xl transition-all duration-300 active:scale-95 cursor-pointer shadow-lg shadow-blue-500/10"
                    >
                      {project.id === 'hmotion-ai' ? (
                        <Hand size={14} className="text-blue-300" />
                      ) : project.id === 'academic-doc-assistant' ? (
                        <BrainCircuit size={14} className="text-emerald-300" />
                      ) : (
                        <ExternalLink size={14} className="text-purple-300" />
                      )}
                      <span>
                        {project.id === 'hmotion-ai'
                          ? 'Launch Gesture Vision Demo'
                          : project.id === 'academic-doc-assistant'
                          ? 'Launch Accreditation Assistant'
                          : 'Live Clipboard Simulation'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Software Card Preview Mockup */}
                <div className={`lg:col-span-5 ${idx % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div 
                    onClick={() => handleLaunchSimulator(project.id)}
                    className="relative group cursor-pointer"
                  >
                    {/* Glowing blur background */}
                    <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 group-hover:opacity-50 blur-lg transition duration-500" />
                    
                    {/* Image card frame */}
                    <div className="relative rounded-2xl overflow-hidden bg-black/50 border border-white/15 aspect-[16/10] shadow-2xl">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-70" />
                      
                      {/* Live overlay tag */}
                      <div className="absolute top-4 right-4">
                        <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg bg-[#020617]/90 border border-white/20 text-blue-300 uppercase tracking-wider flex items-center space-x-1.5 backdrop-blur-md">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>Interactive Simulator</span>
                        </span>
                      </div>

                      {/* Click to test banner overlay on hover */}
                      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="px-4 py-2 rounded-xl bg-blue-600/90 text-white font-mono text-xs font-bold flex items-center space-x-2 shadow-2xl">
                          <Play size={12} className="fill-white" />
                          <span>Click to Launch Live Demo</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: INNOVATION PROJECTS */}
        <div>
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-1.5 h-6 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full" />
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
              2. Innovation Projects
            </h3>
            <span className="text-xs font-mono px-2.5 py-1 rounded badge-innovation font-semibold">
              Designed & Proposed Concepts
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {innovationProjects.map(project => (
              <div
                key={project.id}
                className="group flex flex-col h-full rounded-2xl glass overflow-hidden hover:border-purple-500/30 transition-all duration-300"
              >
                {/* Thumbnail Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-black/20 border-b border-white/10">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-90" />
                  
                  {/* Status badging */}
                  <div className="absolute top-4 left-4 flex flex-col space-y-1">
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded badge-innovation font-semibold uppercase tracking-wider w-fit">
                      {project.category}
                    </span>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 text-slate-300 tracking-wider w-fit">
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Content body */}
                <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-purple-200 transition-colors line-clamp-2">
                      {project.title}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Verbs warning reminder (truthfulness is key) */}
                  <div className="text-[10px] font-mono text-purple-400 italic flex items-center space-x-1">
                    <Sparkles size={11} className="shrink-0" />
                    <span>
                      {project.id === 'food-preservation' && 'Designed concept focusing on off-grid insulation.'}
                      {project.id === 'traffic-management' && 'Proposed sensor acoustic prioritizations.'}
                      {project.id === 'fermart' && 'Conceptualized rural accessibility app-phone models.'}
                    </span>
                  </div>

                  {/* Custom Action buttons mapping specified UI */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
                    {project.id === 'food-preservation' && (
                      <>
                        <button
                          onClick={() => openInnovationDetails(project, 'all')}
                          className="inline-flex items-center justify-center space-x-1.5 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 hover:border-purple-500/40 text-purple-300 font-semibold text-[10px] uppercase tracking-wider py-2 rounded-lg transition-all cursor-pointer"
                        >
                          <Eye size={12} />
                          <span>View Concept</span>
                        </button>
                        <button
                          onClick={() => openInnovationDetails(project, 'details')}
                          className="inline-flex items-center justify-center space-x-1.5 bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 text-slate-300 hover:text-white font-semibold text-[10px] uppercase tracking-wider py-2 rounded-lg transition-all cursor-pointer"
                        >
                          <BookOpen size={12} />
                          <span>Details</span>
                        </button>
                      </>
                    )}

                    {project.id === 'traffic-management' && (
                      <>
                        <button
                          onClick={() => openInnovationDetails(project, 'all')}
                          className="inline-flex items-center justify-center space-x-1.5 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 hover:border-purple-500/40 text-purple-300 font-semibold text-[10px] uppercase tracking-wider py-2 rounded-lg transition-all cursor-pointer"
                        >
                          <Activity size={12} />
                          <span>Concept</span>
                        </button>
                        <button
                          onClick={() => openInnovationDetails(project, 'future')}
                          className="inline-flex items-center justify-center space-x-1.5 bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 text-slate-300 hover:text-white font-semibold text-[10px] uppercase tracking-wider py-2 rounded-lg transition-all cursor-pointer"
                        >
                          <Clock size={12} />
                          <span>Future Scope</span>
                        </button>
                      </>
                    )}

                    {project.id === 'fermart' && (
                      <>
                        <button
                          onClick={() => openInnovationDetails(project, 'all')}
                          className="inline-flex items-center justify-center space-x-1.5 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 hover:border-purple-500/40 text-purple-300 font-semibold text-[10px] uppercase tracking-wider py-2 rounded-lg transition-all cursor-pointer"
                        >
                          <Activity size={12} />
                          <span>Concept</span>
                        </button>
                        <button
                          onClick={() => openInnovationDetails(project, 'future')}
                          className="inline-flex items-center justify-center space-x-1.5 bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 text-slate-300 hover:text-white font-semibold text-[10px] uppercase tracking-wider py-2 rounded-lg transition-all cursor-pointer"
                        >
                          <Clock size={12} />
                          <span>Future Dev</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* DETAILED INNOVATION POPUP DRAWERS */}
      <AnimatePresence>
        {selectedInnovation && selectedInnovation.conceptDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedInnovation(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl rounded-2xl bg-[#020617]/90 border border-white/15 p-6 overflow-hidden shadow-2xl z-10 backdrop-blur-xl"
            >
              {/* Top Accent Lines */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedInnovation(null)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                &times;
              </button>

              {/* Header */}
              <div className="mb-6 space-y-2 pr-8">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded badge-innovation font-semibold tracking-wider uppercase">
                  {selectedInnovation.category}
                </span>
                <h3 className="text-xl font-display font-bold text-white leading-snug">
                  {selectedInnovation.title}
                </h3>
                <div className="text-xs font-mono text-slate-400 flex items-center space-x-1">
                  <span className="text-purple-400 font-semibold uppercase">{selectedInnovation.status}</span>
                  <span>• Idea Presentation Phase</span>
                </div>
              </div>

              {/* Modal Navigation Tabs */}
              <div className="flex border-b border-white/10 gap-1 mb-6">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'all'
                      ? 'border-purple-500 text-white'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  Concept Overview
                </button>
                <button
                  onClick={() => setActiveTab('details')}
                  className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'details'
                      ? 'border-purple-500 text-white'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  Technical Specs
                </button>
                <button
                  onClick={() => setActiveTab('future')}
                  className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'future'
                      ? 'border-purple-500 text-white'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  Future Milestones
                </button>
              </div>

              {/* Tab Contents */}
              <div className="max-h-[300px] overflow-y-auto pr-2 space-y-4 no-scrollbar">
                {activeTab === 'all' && (
                  <div className="space-y-4">
                    <p className="text-sm text-slate-300 leading-relaxed font-sans">
                      {selectedInnovation.conceptDetails.overview}
                    </p>
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                      <h4 className="text-xs font-mono text-purple-400 font-semibold uppercase tracking-wider">
                        Core Objective
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed font-sans">
                        {selectedInnovation.id === 'food-preservation' && 'To preserve fresh farming yields sustainably in regions lacking regular electric grids.'}
                        {selectedInnovation.id === 'traffic-management' && 'To establish an intelligent acoustic and vision routing mesh for critical transit.'}
                        {selectedInnovation.id === 'fermart' && 'To support smallholder agricultural accessibility using robust multi-channel software.'}
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'details' && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono text-purple-400 font-semibold uppercase tracking-wider mb-2">
                      Engineering Specifications
                    </h4>
                    {selectedInnovation.conceptDetails.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-sm text-slate-300 leading-relaxed font-sans">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'future' && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono text-blue-400 font-semibold uppercase tracking-wider mb-2">
                      Proposed Development Roadmap
                    </h4>
                    {selectedInnovation.conceptDetails.futureScopeOrDevelopment.map((scope, idx) => (
                      <div key={idx} className="flex items-start space-x-2.5 text-sm text-slate-300 leading-relaxed font-sans">
                        <div className="mt-1.5 w-3.5 h-3.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                          <Check size={10} />
                        </div>
                        <span>{scope}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-500">
                  ESTIMATE FEASIBILITY: 85%
                </span>
                <button
                  onClick={() => setSelectedInnovation(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer"
                >
                  Close View
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {selectedSoftwareProject && (
          <ProjectDetailModal
            project={selectedSoftwareProject}
            onClose={() => setSelectedSoftwareProject(null)}
            onLaunchSimulator={(id) => handleLaunchSimulator(id)}
          />
        )}

        {isClipboardSimOpen && (
          <ClipboardSimulator onClose={() => setIsClipboardSimOpen(false)} />
        )}

        {isHMotionSimOpen && (
          <HMotionSimulator onClose={() => setIsHMotionSimOpen(false)} />
        )}

        {isAcademicDocSimOpen && (
          <AcademicDocSimulator onClose={() => setIsAcademicDocSimOpen(false)} />
        )}
      </AnimatePresence>
    </section>
  );
}
