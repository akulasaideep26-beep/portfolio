/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Terminal, ArrowRight, Play, FileText, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenResume: () => void;
  onOpenIntro: () => void;
}

export default function Navbar({ onOpenResume, onOpenIntro }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'events', label: 'Events' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Active section detector based on scroll position
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-3.5 bg-[#020617]/90 backdrop-blur-md border-b border-white/10 shadow-xl shadow-black/30'
            : 'py-5 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-2.5 text-left group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300 border border-white/10">
              <Terminal size={18} />
            </div>
            <div>
              <span className="font-display font-bold text-base block text-white tracking-wide group-hover:text-blue-400 transition-colors duration-300 leading-tight">
                Akula Saideep
              </span>
              <span className="text-[10px] font-mono text-slate-400 tracking-wider uppercase block">
                CSE (AI & ML)
              </span>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center space-x-2">
            <div className="flex bg-white/[0.03] border border-white/10 rounded-full p-1 mr-3">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-colors duration-300 cursor-pointer ${
                    activeSection === item.id
                      ? 'text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              ))}
            </div>

            {/* Quick action buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={onOpenIntro}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/[0.04] hover:bg-white/[0.08] text-blue-300 border border-blue-500/30 hover:border-blue-500/50 transition-all flex items-center space-x-1.5 cursor-pointer shadow-sm"
                title="Play Voice & Video Intro Pitch"
              >
                <Play size={11} className="fill-blue-400 text-blue-400" />
                <span>Voice Pitch</span>
              </button>

              <button
                onClick={onOpenResume}
                className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/25 active:scale-95 transition-all duration-300 border border-white/10 flex items-center space-x-1.5 cursor-pointer"
              >
                <FileText size={12} />
                <span>Resume</span>
              </button>
            </div>
          </div>

          {/* Medium screen Nav Items */}
          <div className="hidden md:flex lg:hidden items-center space-x-2">
            <button
              onClick={onOpenIntro}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/[0.05] text-blue-300 border border-blue-500/30 flex items-center space-x-1"
            >
              <Play size={10} className="fill-blue-400" />
              <span>Voice Pitch</span>
            </button>
            <button
              onClick={onOpenResume}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white"
            >
              Resume
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 transition-colors border border-white/10"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={onOpenIntro}
              className="p-2 rounded-lg bg-blue-500/10 text-blue-300 border border-blue-500/30"
              title="Voice Pitch"
            >
              <Play size={14} className="fill-blue-400" />
            </button>
            <button
              onClick={onOpenResume}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white border border-white/10"
            >
              Resume
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 transition-colors border border-white/10"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[65px] z-30 md:hidden bg-[#020617]/95 backdrop-blur-xl border-b border-white/10 py-5 px-6 flex flex-col space-y-3 shadow-2xl"
          >
            {navItems.map((item, index) => (
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.04 }}
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left py-2 px-3 rounded-xl text-sm font-medium flex items-center justify-between transition-colors ${
                  activeSection === item.id
                    ? 'text-white bg-white/[0.08] border-l-2 border-blue-500'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                <ArrowRight size={14} className="opacity-50" />
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
