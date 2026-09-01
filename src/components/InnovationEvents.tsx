/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Calendar, Target, Award, ArrowUpRight } from 'lucide-react';
import { innovationEvents } from '../data';
import LucideIcon from './LucideIcon';

export default function InnovationEvents() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
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

  return (
    <section id="events" className="py-24 relative overflow-hidden border-t border-white/10 bg-transparent">
      {/* Background blobs */}
      <div className="absolute top-[40%] left-[5%] w-[300px] h-[300px] rounded-full bg-indigo-700/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[400px] h-[400px] rounded-full bg-purple-700/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono text-blue-400 tracking-widest uppercase block mb-2">
            Competitive Engagement
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Innovation Events & Hackathons
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full" />
          
          <p className="text-slate-300 mt-5 text-sm sm:text-base leading-relaxed">
            I actively participate in national and regional innovation competitions, ideation contests, 
            and collaborative hackathons. These experiences drive my passion for practical problem-solving 
            and rapid software development.
          </p>
        </div>

        {/* Hackathons / Events Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {innovationEvents.map((event, index) => (
            <motion.div
              key={event.name}
              variants={itemVariants}
              className="p-6 rounded-2xl glass flex flex-col justify-between hover:border-blue-500/30 hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Corner Accent Ribbon */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rotate-45 translate-x-12 -translate-y-12 pointer-events-none group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-300" />
              
              <div className="space-y-4">
                {/* Card Title info */}
                <div className="flex items-start justify-between">
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-blue-400 group-hover:text-purple-400 transition-colors duration-300">
                    <LucideIcon name={event.iconName} size={20} />
                  </div>
                  <div className="flex items-center space-x-1.5 text-xs font-mono text-slate-400">
                    <Calendar size={12} className="text-blue-400" />
                    <span>{event.date}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="font-display font-bold text-lg text-white group-hover:text-blue-300 transition-colors">
                    {event.name}
                  </h3>
                  <span className="text-xs font-semibold text-slate-300 block font-sans">
                    {event.subtitle}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                  {event.description}
                </p>

                {/* Role badge */}
                <div className="inline-flex items-center space-x-1.5 badge-innovation rounded-md px-2.5 py-1">
                  <span className="text-[10px] font-mono text-purple-300 uppercase tracking-wider font-semibold">
                    ROLE: {event.role}
                  </span>
                </div>

                {/* Key Outcomes */}
                <div className="space-y-2 pt-4 border-t border-white/10">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                    Core Accomplishments
                  </span>
                  <div className="space-y-2">
                    {event.outcomes.map((outcome, oIdx) => (
                      <div key={oIdx} className="flex items-start space-x-2 text-xs text-slate-300 font-sans leading-relaxed">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 shrink-0" />
                        <span>{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Status footer detail */}
              <div className="mt-6 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>STATUS: VERIFIED</span>
                <span className="text-purple-400 group-hover:text-blue-400 font-semibold uppercase flex items-center space-x-0.5">
                  <span>Pitch Ready</span>
                  <ArrowUpRight size={10} />
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Motivational Callout */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-3 glass border border-white/10 px-6 py-4 rounded-2xl max-w-2xl text-left">
            <Trophy size={20} className="text-blue-400 shrink-0" />
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              "Competitive environments keep me sharp. By presenting conceptual architectures at ThoughtSpire and 
              coding under time crunches at College Hackathons, I bridge theoretical AI & ML coursework with real-world practicality."
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
