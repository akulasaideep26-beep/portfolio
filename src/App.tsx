/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CursorGlow from './components/CursorGlow';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import InnovationEvents from './components/InnovationEvents';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import ResumeModal from './components/ResumeModal';
import IntroModal from './components/IntroModal';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUp, Terminal, Play, FileText } from 'lucide-react';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isIntroOpen, setIsIntroOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Monitor scroll progress and show/hide Back to Top button
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(window.scrollY / totalScroll);
      }
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-transparent text-slate-200 selection:bg-blue-500/30 selection:text-white overflow-x-hidden">
      {/* Scroll indicator bar */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 z-50 transition-all duration-100"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      <CursorGlow />
      <Navbar 
        onOpenResume={() => setIsResumeOpen(true)} 
        onOpenIntro={() => setIsIntroOpen(true)}
      />
      
      <main>
        <Hero 
          onOpenResume={() => setIsResumeOpen(true)} 
          onOpenIntro={() => setIsIntroOpen(true)}
        />
        <About 
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenIntro={() => setIsIntroOpen(true)}
        />
        <Skills />
        <Projects />
        <InnovationEvents />
        <Timeline />
        <Contact />
      </main>

      {/* Global Footer */}
      <footer className="py-12 border-t border-white/10 bg-[#020617]/80 backdrop-blur-md text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 space-y-4">
          <div className="flex items-center justify-center space-x-2.5 text-white">
            <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <Terminal size={15} />
            </div>
            <span className="font-display font-bold text-sm tracking-wide">AKULA SAIDEEP</span>
            <span className="text-slate-600">|</span>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">B.Tech CSE (AI & ML)</span>
          </div>
          <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed font-sans">
            Engineered with React 19, TypeScript, Vite, Tailwind CSS, and Framer Motion. 
            All certifications and academic parameters verified.
          </p>
          <div className="flex items-center justify-center space-x-4 pt-1">
            <button
              onClick={() => setIsIntroOpen(true)}
              className="text-xs font-mono text-blue-400 hover:text-blue-300 flex items-center space-x-1 transition-colors cursor-pointer"
            >
              <Play size={10} className="fill-current" />
              <span>Voice Intro Pitch</span>
            </button>
            <span className="text-slate-700">•</span>
            <button
              onClick={() => setIsResumeOpen(true)}
              className="text-xs font-mono text-purple-400 hover:text-purple-300 flex items-center space-x-1 transition-colors cursor-pointer"
            >
              <FileText size={11} />
              <span>View Resume</span>
            </button>
          </div>
          <div className="text-[10px] text-slate-500 font-mono pt-2">
            &copy; {new Date().getFullYear()} Akula Saideep. All Rights Reserved.
          </div>
        </div>
      </footer>

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-[#09081e]/90 border border-white/15 text-blue-400 hover:text-white hover:border-blue-500/40 shadow-2xl hover:shadow-blue-500/20 cursor-pointer active:scale-95 transition-all duration-300 backdrop-blur-md"
            title="Back to Top"
          >
            <ArrowUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Interactive Resume View Modal */}
      <AnimatePresence>
        {isResumeOpen && (
          <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
        )}
      </AnimatePresence>

      {/* Interactive Talking Intro Voice/Video Modal */}
      <AnimatePresence>
        {isIntroOpen && (
          <IntroModal 
            isOpen={isIntroOpen} 
            onClose={() => setIsIntroOpen(false)} 
            onOpenResume={() => setIsResumeOpen(true)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
