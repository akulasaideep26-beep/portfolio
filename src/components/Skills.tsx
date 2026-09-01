/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { skills } from '../data';
import LucideIcon from './LucideIcon';

type SkillFilter = 'All' | 'Languages' | 'Cloud & Technologies' | 'Soft Skills';

export default function Skills() {
  const [selectedFilter, setSelectedFilter] = useState<SkillFilter>('All');

  const filterCategories = [
    { id: 'All', label: 'All Skillsets' },
    { id: 'Languages', label: 'Languages' },
    { id: 'Cloud & Technologies', label: 'Cloud & Tech' },
    { id: 'Soft Skills', label: 'Soft Skills' },
  ];

  const filteredSkills = skills.filter(skill => {
    if (selectedFilter === 'All') return true;
    return skill.category === selectedFilter;
  });

  return (
    <section id="skills" className="py-24 relative overflow-hidden border-t border-white/10 bg-transparent">
      {/* Decorative gradients */}
      <div className="absolute top-[30%] right-[-10%] w-[350px] h-[350px] rounded-full bg-blue-700/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-purple-700/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono text-blue-400 tracking-widest uppercase block mb-2">
            Skill Taxonomy
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Technical & Cognitive Competencies
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full" />
          <p className="text-slate-300 mt-4 text-sm sm:text-base leading-relaxed">
            A comprehensive overview of programming languages, frameworks, cloud learnings, 
            and soft skills developed throughout academic and innovation activities.
          </p>
        </div>

        {/* Filter Navigation Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filterCategories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedFilter(category.id as SkillFilter)}
              className={`relative px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                selectedFilter === category.id
                  ? 'text-white'
                  : 'text-slate-400 hover:text-white bg-white/[0.02] hover:bg-white/[0.05] border border-white/10'
              }`}
            >
              {selectedFilter === category.id && (
                <motion.div
                  layoutId="activeSkillIndicator"
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl"
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  style={{ zIndex: 0 }}
                />
              )}
              <span className="relative z-10">{category.label}</span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map(skill => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                key={skill.name}
                className="p-5 rounded-2xl glass flex flex-col justify-between group hover:border-blue-500/30 transition-all duration-300"
              >
                <div>
                  {/* Skill Card Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-blue-400 group-hover:text-purple-400 transition-colors duration-300">
                        <LucideIcon name={skill.iconName} size={18} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white group-hover:text-blue-200 transition-colors">
                          {skill.name}
                        </h3>
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mt-0.5">
                          {skill.category}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-slate-300">
                      {skill.level}
                    </span>
                  </div>
                </div>

                {/* Progress bar info */}
                <div className="space-y-2 mt-2">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>Proficiency</span>
                    <span className="text-blue-400 font-semibold">{skill.percentage}%</span>
                  </div>
                  
                  {/* Bar */}
                  <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.percentage}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Dynamic quote/summary box */}
        <div className="mt-12 p-6 rounded-2xl glass border border-white/10 max-w-4xl mx-auto flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
          <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 shrink-0">
            <LucideIcon name="Brain" size={24} />
          </div>
          <div>
            <h4 className="font-display font-semibold text-white mb-1">
              Active Learning Path
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              In addition to B.Tech coursework specializing in AI & ML, I actively focus on exploring AWS cloud environments, 
              securing server backends using Flask-SQLite frameworks, and maintaining secure programming architectures via Cisco Networking Academy guidelines.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
