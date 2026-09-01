/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, Award, Calendar, BookOpen, Globe, ArrowUpRight, CheckCircle, Languages } from 'lucide-react';
import { certifications, personalInfo } from '../data';
import CertificateModal from './CertificateModal';

export default function Timeline() {
  const [selectedCertId, setSelectedCertId] = useState<string | null>(null);

  // Education list based on exact verified credentials
  const educationItems = [
    {
      id: 'vaagdevi',
      institution: 'Vaagdevi College of Engineering',
      degree: 'B.Tech in Computer Science & Engineering (AI & ML)',
      timeline: '2024 - 2028 (Expected)',
      metric: 'CGPA: 8.39 / 10.0',
      desc: 'Specializing in artificial intelligence, machine learning systems, and core software engineering.',
      icon: GraduationCap,
      color: 'from-blue-500/20 to-indigo-500/20',
      borderColor: 'group-hover:border-blue-500/30'
    },
    {
      id: 'sr-edu',
      institution: 'SR Edu Center',
      degree: 'Intermediate MPC (Math, Physics, Chemistry)',
      timeline: '2022 - 2024',
      metric: 'Score: 880 Marks',
      desc: 'Completed Higher Secondary Education focusing on advanced science and analytical foundations.',
      icon: BookOpen,
      color: 'from-indigo-500/20 to-purple-500/20',
      borderColor: 'group-hover:border-indigo-500/30'
    },
    {
      id: 'st-anns',
      institution: "St. Ann's High School",
      degree: 'Secondary School Certificate (SSC)',
      timeline: 'Class of 2022',
      metric: 'GPA: 9.0 / 10.0 CGPA',
      desc: 'Completed secondary schooling with high honors and strong academic merit.',
      icon: GraduationCap,
      color: 'from-purple-500/20 to-pink-500/20',
      borderColor: 'group-hover:border-purple-500/30'
    }
  ];

  return (
    <section id="timeline" className="py-24 relative overflow-hidden border-t border-white/10 bg-transparent">
      {/* Background radial ambient lights */}
      <div className="absolute top-[30%] left-[5%] w-[400px] h-[400px] rounded-full bg-blue-900/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[400px] h-[400px] rounded-full bg-purple-900/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-mono text-blue-400 tracking-widest uppercase block mb-2">
            Qualifications & Credentials
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Education, Certifications & Languages
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full" />
          <p className="text-slate-300 mt-4 text-sm sm:text-base leading-relaxed">
            A comprehensive, high-fidelity view of my verified academic timeline, 
            professional cloud & software certifications, and multilingual capabilities.
          </p>
        </div>

        {/* Horizontal Side-by-Side Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* COLUMN 1: Education Qualifications */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 border-b border-white/10 pb-4 mb-6">
              <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                <GraduationCap size={20} />
              </div>
              <div>
                <h3 className="text-lg font-display font-bold text-white tracking-tight">Education Qualifications</h3>
                <p className="text-xs text-slate-400">Academic institutions and degree programs</p>
              </div>
            </div>

            {/* List of Education Cards (No Tree - Plain Horizontal/Stacked Cards) */}
            <div className="space-y-4">
              {educationItems.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="group p-5 rounded-2xl glass border border-white/10 hover:border-blue-500/20 transition-all duration-300 relative overflow-hidden flex flex-col sm:flex-row sm:items-start gap-4"
                >
                  {/* Decorative background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                  
                  {/* Icon */}
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 text-blue-400 shrink-0 self-start">
                    <item.icon size={18} />
                  </div>

                  {/* Details */}
                  <div className="space-y-1.5 relative z-10 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <h4 className="font-display font-bold text-sm sm:text-base text-white group-hover:text-blue-200 transition-colors">
                        {item.institution}
                      </h4>
                      <span className="text-[10px] font-mono text-purple-400 sm:text-right shrink-0">
                        {item.timeline}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 font-sans">
                      {item.degree}
                    </p>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-sans pt-1">
                      {item.desc}
                    </p>

                    <div className="pt-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/10 border border-blue-500/20 text-blue-300 font-mono">
                        {item.metric}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* COLUMN 2: Professional Certifications & Languages */}
          <div className="space-y-8">
            {/* Certifications Block */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 border-b border-white/10 pb-4 mb-6">
                <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400">
                  <Award size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-display font-bold text-white tracking-tight">Professional Certifications</h3>
                  <p className="text-xs text-slate-400">Verified cloud & technical credentials</p>
                </div>
              </div>

              {/* List of Certification Cards */}
              <div className="space-y-4">
                {certifications.map((cert) => (
                  <motion.div
                    key={cert.id}
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2 }}
                    className="group p-5 rounded-2xl glass border border-white/10 hover:border-purple-500/20 transition-all duration-300 relative overflow-hidden flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                  >
                    {/* Decorative background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    {/* Left: Cert details */}
                    <div className="flex items-start space-x-4 relative z-10 flex-1">
                      <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 text-purple-400 shrink-0 mt-0.5">
                        <Award size={18} />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-display font-bold text-sm text-white group-hover:text-purple-200 transition-colors">
                          {cert.name}
                        </h4>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 text-[11px] text-slate-400">
                          <span className="font-sans font-medium">{cert.issuer}</span>
                          <span className="hidden sm:inline text-slate-600">•</span>
                          <span className="font-mono flex items-center mt-0.5 sm:mt-0">
                            <Calendar size={10} className="mr-1 text-purple-400" /> {cert.date}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: View Button */}
                    <button
                      onClick={() => cert.id && setSelectedCertId(cert.id)}
                      className="relative z-10 px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 font-mono text-xs font-semibold hover:bg-purple-500 hover:text-white transition-all duration-300 flex items-center justify-center space-x-1 w-full sm:w-auto shrink-0 shadow-lg cursor-pointer"
                    >
                      <span>View Credential</span>
                      <ArrowUpRight size={12} />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Languages Block */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 border-b border-white/10 pb-3 mb-4">
                <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <Globe size={18} />
                </div>
                <div>
                  <h3 className="text-base font-display font-bold text-white tracking-tight">Languages</h3>
                  <p className="text-xs text-slate-400">Multilingual fluency & verbal parameters</p>
                </div>
              </div>

              {/* Language badges in horizontal cards row */}
              <div className="flex flex-wrap gap-3">
                {personalInfo.languages.map((lang, index) => {
                  const colors = [
                    'from-teal-500/10 to-emerald-500/10 text-teal-300 border-teal-500/20 hover:border-teal-500/40',
                    'from-blue-500/10 to-indigo-500/10 text-blue-300 border-blue-500/20 hover:border-blue-500/40',
                    'from-orange-500/10 to-red-500/10 text-orange-300 border-orange-500/20 hover:border-orange-500/40'
                  ];
                  return (
                    <motion.div
                      key={lang}
                      whileHover={{ scale: 1.05 }}
                      className={`px-4 py-2.5 rounded-xl bg-gradient-to-r ${colors[index % colors.length]} border font-mono text-xs font-bold flex items-center space-x-2 shadow-md transition-all duration-300`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                      <span>{lang}</span>
                      <span className="text-[10px] opacity-60 font-sans">
                        {lang === 'Telugu' ? 'Native' : lang === 'English' ? 'Professional' : 'Fluent'}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Lightbox Credential Viewer */}
      <AnimatePresence>
        {selectedCertId && (
          <CertificateModal
            certificateId={selectedCertId}
            onClose={() => setSelectedCertId(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
