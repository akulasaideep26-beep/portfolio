/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Linkedin, Github, MapPin, Send, CheckCircle, RefreshCw, AlertCircle, Copy, Check } from 'lucide-react';
import { personalInfo } from '../data';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [copied, setCopied] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormState('error');
      setTimeout(() => setFormState('idle'), 3000);
      return;
    }

    setFormState('sending');
    // Simulate real server route post
    setTimeout(() => {
      setFormState('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden border-t border-white/10 bg-transparent">
      {/* Background radial effects */}
      <div className="absolute top-[30%] left-[-5%] w-[400px] h-[400px] rounded-full bg-purple-800/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[450px] h-[450px] rounded-full bg-blue-800/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono text-blue-400 tracking-widest uppercase block mb-2">
            Get in Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Contact & Collaboration
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full" />
          <p className="text-slate-300 mt-4 text-sm sm:text-base leading-relaxed">
            Interested in hiring or discussing engineering and innovation projects? 
            Reach out via the form below or connect directly through professional links.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
          
          {/* Contact Information Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl glass space-y-6">
              <h3 className="font-display font-bold text-lg text-white">
                Contact Details
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                Feel free to email me regarding software internships, AI development collaborations, 
                or innovation competitions. I will try to reply within 24 hours.
              </p>

              {/* Contact Cards */}
              <div className="space-y-4 pt-2">
                {/* Email card */}
                <div className="group flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-purple-500/30 transition-all duration-300">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 group-hover:text-purple-400 transition-colors">
                      <Mail size={16} />
                    </div>
                    <div className="overflow-hidden">
                      <span className="text-[10px] font-mono text-slate-500 block uppercase">
                        Direct Email
                      </span>
                      <a
                        href={`mailto:${personalInfo.email}`}
                        className="text-xs sm:text-sm text-white font-medium hover:text-purple-300 transition-colors block truncate"
                      >
                        {personalInfo.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors ml-2 cursor-pointer"
                    title="Copy Email Address"
                  >
                    {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>

                {/* LinkedIn Card */}
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center p-3.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-purple-500/30 transition-all duration-300"
                >
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 group-hover:text-purple-400 transition-colors mr-3 shrink-0">
                    <Linkedin size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 block uppercase">
                      LinkedIn Network
                    </span>
                    <span className="text-xs sm:text-sm text-white font-medium group-hover:text-purple-300 transition-colors block">
                      @akula-saideep-15263032b
                    </span>
                  </div>
                </a>

                {/* Location Card */}
                <div className="group flex items-center p-3.5 rounded-xl bg-white/[0.02] border border-white/10 transition-all duration-300">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 mr-3 shrink-0">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 block uppercase">
                      Location
                    </span>
                    <span className="text-xs sm:text-sm text-white font-medium block">
                      {personalInfo.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status banner */}
              <div className="p-4 rounded-xl glass border border-white/10 bg-[#020617]/40 text-center">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">
                  CURRENT TIME ZONE
                </span>
                <span className="text-xs text-white font-semibold block">
                  India Standard Time (IST) / GMT+5:30
                </span>
              </div>
            </div>
          </div>

          {/* Contact Interactive Form */}
          <div className="lg:col-span-7">
            <div className="p-6 rounded-2xl glass">
              <h3 className="font-display font-bold text-lg text-white mb-6">
                Send an Inquiry Message
              </h3>

              <AnimatePresence mode="wait">
                {formState === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                      className="w-16 h-16 rounded-full bg-[#10b981]/10 border border-[#10b981]/20 text-[#10b981] flex items-center justify-center shadow-lg"
                    >
                      <CheckCircle size={32} />
                    </motion.div>
                    <div className="space-y-1">
                      <h4 className="font-display font-bold text-lg text-white">
                        Message Received!
                      </h4>
                      <p className="text-xs text-slate-300 max-w-sm mx-auto font-sans">
                        Thank you for reaching out. Your message was processed and recorded. 
                        I will get back to you shortly at the email address provided.
                      </p>
                    </div>
                    <button
                      onClick={() => setFormState('idle')}
                      className="inline-flex items-center space-x-1.5 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold text-white transition-colors mt-2 cursor-pointer"
                    >
                      <RefreshCw size={12} />
                      <span>Send Another Message</span>
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Name & Email inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                          Your Name <span className="text-purple-400">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          placeholder="Akula Saideep"
                          disabled={formState === 'sending'}
                          className="w-full bg-[#020617]/50 border border-white/10 hover:border-white/20 focus:border-purple-500 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                          Your Email <span className="text-purple-400">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="recruiter@company.com"
                          disabled={formState === 'sending'}
                          className="w-full bg-[#020617]/50 border border-white/10 hover:border-white/20 focus:border-purple-500 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Subject line */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                        Subject Line
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Software Engineering Internship Inquiry"
                        disabled={formState === 'sending'}
                        className="w-full bg-[#020617]/50 border border-white/10 hover:border-white/20 focus:border-purple-500 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none transition-all"
                      />
                    </div>

                    {/* Message body */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                        Message <span className="text-purple-400">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        placeholder="Hello Saideep, I came across your B.Tech CSE (AI & ML) portfolio and would like to discuss..."
                        disabled={formState === 'sending'}
                        className="w-full bg-[#020617]/50 border border-white/10 hover:border-white/20 focus:border-purple-500 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none resize-none transition-all"
                      />
                    </div>

                    {/* Error indicator */}
                    {formState === 'error' && (
                      <div className="flex items-center space-x-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                        <AlertCircle size={14} className="shrink-0" />
                        <span>Please fill out all required fields before sending.</span>
                      </div>
                    )}

                    {/* Action button */}
                    <button
                      type="submit"
                      disabled={formState === 'sending'}
                      className="w-full inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white font-semibold text-xs py-3.5 px-6 rounded-xl hover:shadow-lg hover:shadow-purple-500/20 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                    >
                      {formState === 'sending' ? (
                        <>
                          <RefreshCw size={14} className="animate-spin" />
                          <span>Dispatching Message...</span>
                        </>
                      ) : (
                        <>
                          <Send size={14} />
                          <span>Send Secure Message</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
