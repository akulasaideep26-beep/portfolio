/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Brain, Cpu, Cloud, ShieldCheck, Terminal, GraduationCap, CheckCircle2, Award, Sparkles, Code2, User } from 'lucide-react';
import { personalInfo } from '../data';
import LightningNetworkAvatar from './LightningNetworkAvatar';

interface AboutProps {
  onOpenResume: () => void;
  onOpenIntro: () => void;
}

export default function About({ onOpenResume, onOpenIntro }: AboutProps) {
  const corePillars = [
    {
      title: 'Applied AI & Computer Vision',
      desc: 'Developing computer vision pipelines with YOLOv8 & OpenCV for real-world scenarios like intelligent traffic flow optimization and object classification.',
      icon: Brain,
      color: 'from-blue-500/20 to-indigo-500/20',
      textColor: 'text-blue-400',
      borderColor: 'border-blue-500/20'
    },
    {
      title: 'Cloud & Systems Architecture',
      desc: 'AWS Cloud Practitioner certified. Experienced with S3 cloud sync architectures, IAM security configurations, and peer lab guidance at AWS Cloud Club.',
      icon: Cloud,
      color: 'from-indigo-500/20 to-purple-500/20',
      textColor: 'text-indigo-400',
      borderColor: 'border-indigo-500/20'
    },
    {
      title: 'Embedded IoT & Edge tinyML',
      desc: 'Bridging physical sensor arrays (ESP32, DHT11) with lightweight edge regression models for agricultural shelf-life prediction and environmental telemetry.',
      icon: Cpu,
      color: 'from-purple-500/20 to-pink-500/20',
      textColor: 'text-purple-400',
      borderColor: 'border-purple-500/20'
    },
    {
      title: 'Full Stack & Software Engineering',
      desc: 'Building clean Python Flask APIs, SQLite relational persistence layers, desktop clipboard trackers, and intuitive responsive frontend interfaces.',
      icon: Code2,
      color: 'from-emerald-500/20 to-teal-500/20',
      textColor: 'text-emerald-400',
      borderColor: 'border-emerald-500/20'
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden border-t border-white/10 bg-transparent">
      {/* Background ambient lighting */}
      <div className="absolute top-[20%] left-[-5%] w-[400px] h-[400px] rounded-full bg-blue-700/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-[450px] h-[450px] rounded-full bg-purple-700/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono text-blue-400 tracking-widest uppercase block mb-2 font-semibold">
            Engineering Identity
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            About Me & Technical Focus
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full" />
          <p className="text-slate-300 mt-4 text-sm sm:text-base leading-relaxed">
            A third-year B.Tech student blending foundational computer science, machine learning models, 
            and hands-on software development to engineer practical solutions.
          </p>
        </div>

        {/* Two-Column About Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Narrative Story & Academic Highlights */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-7 rounded-3xl glass space-y-6 border border-white/10 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 shrink-0">
                    <GraduationCap size={22} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">Academic Journey & Background</h3>
                    <p className="text-xs text-slate-400">Vaagdevi College of Engineering • Batch 2024 - 2028</p>
                  </div>
                </div>

                {/* Compact Lightning Network Avatar badge in About header */}
                <div className="shrink-0 flex justify-center">
                  <LightningNetworkAvatar size="sm" showBadges={false} interactive={true} />
                </div>
              </div>

              <div className="space-y-3.5 text-slate-300 text-sm leading-relaxed font-sans">
                <p>
                  I am currently pursuing my <strong>B.Tech in Computer Science and Engineering with a specialization in Artificial Intelligence and Machine Learning</strong> at Vaagdevi College of Engineering, maintaining a consistent academic record of <strong>CGPA 8.39 / 10.0</strong>.
                </p>
                <p>
                  My engineering journey is driven by a deep fascination with how intelligent algorithms can solve real problems. Rather than viewing machine learning purely in research theory, I build end-to-end applications—connecting Python NLP parsers with SQLite databases, streaming video frames through YOLOv8 models, and deploying low-cost microcontrollers for farm automation.
                </p>
                <p>
                  Beyond coursework, I actively contribute as an <strong>AWS Cloud Club Lab Advisor</strong>, helping fellow peers navigate cloud foundations and compute instances, and compete in national idea presentation forums like <strong>ThoughtSpire</strong>.
                </p>
              </div>

              {/* Highlights badge list */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="flex items-center space-x-2 p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-300">
                  <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                  <span>Verified 8.39 CGPA</span>
                </div>
                <div className="flex items-center space-x-2 p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-300">
                  <CheckCircle2 size={15} className="text-blue-400 shrink-0" />
                  <span>AWS Cloud Practitioner</span>
                </div>
                <div className="flex items-center space-x-2 p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-300">
                  <CheckCircle2 size={15} className="text-purple-400 shrink-0" />
                  <span>PCAP Python Certified</span>
                </div>
                <div className="flex items-center space-x-2 p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-300">
                  <CheckCircle2 size={15} className="text-teal-400 shrink-0" />
                  <span>Multilingual (3 Languages)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Technical Specialization Pillars */}
          <div className="lg:col-span-6 space-y-4">
            {corePillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                className={`p-5 rounded-2xl glass border ${pillar.borderColor} hover:border-white/20 transition-all duration-300 relative overflow-hidden group`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${pillar.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                
                <div className="flex items-start space-x-4 relative z-10">
                  <div className={`p-3 rounded-xl bg-slate-900/80 border border-white/10 ${pillar.textColor} shrink-0`}>
                    <pillar.icon size={20} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-sm sm:text-base text-white group-hover:text-blue-200 transition-colors">
                      {pillar.title}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
