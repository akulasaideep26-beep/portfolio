/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Linkedin, Github, Mail, MapPin, ChevronDown, Award, ArrowRight, Download, Play, Sparkles, FolderGit2, MessageSquare, Zap, Video, User } from 'lucide-react';
import { personalInfo, stats } from '../data';
import LucideIcon from './LucideIcon';
import HeroTalkingVideo from './HeroTalkingVideo';
import LightningNetworkAvatar from './LightningNetworkAvatar';

interface HeroProps {
  onOpenResume: () => void;
  onOpenIntro: () => void;
}

export default function Hero({ onOpenResume, onOpenIntro }: HeroProps) {
  const [heroView, setHeroView] = useState<'avatar' | 'video'>('avatar');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  };

  const techBadges = [
    'Python', 'Machine Learning', 'AWS Cloud', 'YOLOv8', 'tinyML', 'Flask', 'Data Structures'
  ];

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen pt-32 pb-20 flex flex-col justify-center overflow-hidden"
    >
      {/* Background Decorative Neon Orbs & Grid */}
      <div className="absolute top-[10%] left-[5%] w-[450px] h-[450px] rounded-full bg-blue-600/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[150px] pointer-events-none" />
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

      {/* Cyber Grid Lines Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Main Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 flex flex-col space-y-6"
          >
            {/* Status Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 border border-blue-500/25 px-3.5 py-1.5 rounded-full w-fit backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono font-semibold tracking-wider text-blue-200 uppercase">
                Available for Software Engineering & AI Internships
              </span>
            </motion.div>

            {/* Headline and Name */}
            <div className="space-y-3">
              <motion.div variants={itemVariants} className="flex items-center space-x-2">
                <span className="text-xs font-mono text-blue-400 tracking-widest uppercase">
                  Featured Developer Portfolio
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span className="text-xs font-mono text-purple-300">Class of 2028</span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-white leading-[1.08]"
              >
                AKULA{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 font-extrabold">
                  SAIDEEP
                </span>
              </motion.h1>

              <motion.h2
                variants={itemVariants}
                className="text-base sm:text-lg font-semibold text-purple-300 font-display tracking-wide"
              >
                Computer Science & Engineering | Artificial Intelligence & Machine Learning
              </motion.h2>
            </div>

            {/* Supporting Text */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-xl font-medium"
            >
              Building intelligent solutions and exploring innovative technology.
            </motion.p>

            {/* Meta tags list (Location, year, college) */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-y-2 gap-x-3 text-xs font-mono text-slate-400"
            >
              <span className="flex items-center space-x-1.5 bg-white/[0.02] border border-white/5 px-2.5 py-1 rounded-lg">
                <MapPin size={13} className="text-blue-400" />
                <span>{personalInfo.location}</span>
              </span>
              <span className="flex items-center space-x-1.5 bg-white/[0.02] border border-white/5 px-2.5 py-1 rounded-lg">
                <Award size={13} className="text-purple-400" />
                <span>{personalInfo.education.currentYear} Student</span>
              </span>
              <span className="flex items-center space-x-1.5 bg-white/[0.02] border border-white/5 px-2.5 py-1 rounded-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-emerald-300 font-bold">CGPA: {personalInfo.education.cgpa} / 10.0</span>
              </span>
            </motion.div>

            {/* Technology Badges */}
            <motion.div variants={itemVariants} className="space-y-2 pt-1">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-semibold">
                Core Engineering Stack
              </span>
              <div className="flex flex-wrap gap-1.5">
                {techBadges.map((badge, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/10 text-slate-300 hover:border-blue-500/40 hover:text-blue-300 transition-colors"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Requested Action Buttons: Explore Projects, View Resume, Contact Me */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-3 pt-4"
            >
              {/* Explore Projects Button */}
              <button
                onClick={scrollToProjects}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs py-3.5 px-5 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 active:scale-95 transition-all duration-300 cursor-pointer border border-white/15 group shadow-md"
              >
                <FolderGit2 size={14} className="text-blue-200" />
                <span>Explore Projects</span>
                <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </button>

              {/* View Resume Button */}
              <button
                onClick={onOpenResume}
                className="inline-flex items-center space-x-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-purple-500/30 text-white font-semibold text-xs py-3.5 px-5 rounded-xl hover:shadow-lg hover:shadow-purple-500/10 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <Download size={14} className="text-purple-400" />
                <span>View Resume</span>
              </button>

              {/* Contact Me Button */}
              <button
                onClick={scrollToContact}
                className="inline-flex items-center space-x-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-blue-500/30 text-slate-200 hover:text-white font-semibold text-xs py-3.5 px-5 rounded-xl active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <MessageSquare size={14} className="text-blue-400" />
                <span>Contact Me</span>
              </button>

              {/* Social Icons */}
              <div className="flex items-center space-x-2 pl-1">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300"
                  title="LinkedIn Profile"
                >
                  <Linkedin size={16} />
                </a>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300"
                  title="GitHub Profile"
                >
                  <Github size={16} />
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300"
                  title="Send Email"
                >
                  <Mail size={16} />
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Hero Centerpiece with Lightning Network Circle Frame & Video Toggle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 70, damping: 15, delay: 0.2 }}
            className="lg:col-span-6 flex flex-col items-center justify-center"
          >
            <div className="w-full max-w-xl flex flex-col items-center">
              {/* Interactive Showcase Mode Switcher */}
              <div className="mb-6 p-1 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center gap-1.5 shadow-xl backdrop-blur-md">
                <button
                  onClick={() => setHeroView('avatar')}
                  className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider transition-all cursor-pointer ${
                    heroView === 'avatar'
                      ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 border border-white/15'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Zap size={13} className={heroView === 'avatar' ? 'text-cyan-300 animate-pulse' : ''} />
                  <span>⚡ Lightning Profile</span>
                </button>
                <button
                  onClick={() => setHeroView('video')}
                  className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider transition-all cursor-pointer ${
                    heroView === 'video'
                      ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 border border-white/15'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Video size={13} className={heroView === 'video' ? 'text-purple-300' : ''} />
                  <span>▶️ Video Pitch</span>
                </button>
              </div>

              {/* Showcase Container Body */}
              <div className="w-full flex justify-center min-h-[420px] items-center">
                <AnimatePresence mode="wait">
                  {heroView === 'avatar' ? (
                    <motion.div
                      key="avatar-view"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center"
                    >
                      <LightningNetworkAvatar
                        size="hero"
                        showBadges={true}
                        interactive={true}
                        onOpenIntro={onOpenIntro}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="video-view"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="w-full"
                    >
                      <HeroTalkingVideo onOpenResume={onOpenResume} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Statistics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="relative group p-5 rounded-2xl glass overflow-hidden hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-xs font-mono tracking-wider uppercase">
                  {stat.label}
                </span>
                <div className="p-2 rounded-lg bg-white/[0.03] border border-white/10 text-blue-400 group-hover:text-purple-400 transition-colors duration-300">
                  <LucideIcon name={stat.iconName} size={15} />
                </div>
              </div>
              
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl sm:text-3xl font-display font-bold text-gradient tracking-tight">
                  {stat.value}
                </span>
                <span className="text-xs font-mono text-purple-400">
                  {stat.suffix}
                </span>
              </div>
              
              <p className="text-[11px] text-slate-400 mt-1 font-sans line-clamp-1">
                {stat.description}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Bouncing scroll-down helper */}
        <div className="mt-12 flex flex-col items-center space-y-1 opacity-60 hover:opacity-100 transition-opacity duration-300">
          <span className="text-[9px] font-mono text-slate-500 tracking-widest uppercase">Scroll to Explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="text-blue-400 cursor-pointer"
            onClick={() => {
              const el = document.getElementById('about');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <ChevronDown size={18} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
