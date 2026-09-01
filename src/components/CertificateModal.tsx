/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { X, Award, Shield, Calendar, BookOpen, CheckCircle } from 'lucide-react';

interface CertificateModalProps {
  certificateId: string;
  onClose: () => void;
}

export default function CertificateModal({ certificateId, onClose }: CertificateModalProps) {
  // Render the specific certificate based on ID
  const renderCertificateContent = () => {
    switch (certificateId) {
      case 'aws-cloud-practitioner':
        return (
          <div className="relative w-full max-w-4xl bg-white text-slate-900 rounded-lg p-6 sm:p-12 border-8 border-[#232f3e]/10 shadow-2xl overflow-hidden font-sans">
            {/* AWS Branding Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-6 mb-6">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#232f3e] font-semibold">AWS Training & Certification</span>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#232f3e] mt-0.5">Completion Certificate</h1>
              </div>
              <div className="mt-4 sm:mt-0 flex items-center space-x-2">
                {/* Custom AWS stylized logo */}
                <div className="flex flex-col items-start font-bold text-2xl tracking-tighter text-[#232f3e]">
                  <span>aws</span>
                  <svg className="w-10 h-2 -mt-1 text-[#ff9900]" viewBox="0 0 100 20" fill="currentColor">
                    <path d="M0,5 C30,18 70,18 100,5 C90,12 50,22 0,5 Z" />
                    <polygon points="98,5 95,12 100,10" fill="currentColor" />
                  </svg>
                </div>
              </div>
            </div>

            {/* AWS Decorative Sidebar/Underlay */}
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-teal-400 via-blue-500 to-indigo-600" />

            {/* Certificate Body */}
            <div className="space-y-8 my-8 text-center sm:text-left">
              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-slate-400 font-semibold">This is to certify that</span>
                <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#232f3e] mt-1 sm:mt-2 tracking-tight">
                  Akula Saideep
                </h2>
              </div>

              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-slate-400 font-semibold">has successfully completed the curriculum</span>
                <h3 className="text-2xl sm:text-3xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-900 mt-1 sm:mt-2 tracking-tight leading-tight">
                  AWS Cloud Practitioner Essentials
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100 text-left">
                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-400 block font-semibold">Completed Date</span>
                  <span className="font-mono font-bold text-[#232f3e] text-sm flex items-center mt-1">
                    <Calendar size={13} className="mr-1.5 text-[#ff9900]" /> June 07, 2026
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-400 block font-semibold">Verification Badge</span>
                  <span className="text-xs font-semibold text-[#1e293b] flex items-center mt-1">
                    <CheckCircle size={13} className="mr-1.5 text-emerald-500" /> Active Web-Verified Credential
                  </span>
                </div>
              </div>
            </div>

            {/* AWS Signatures */}
            <div className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-100 pt-8 mt-8">
              <div className="text-center sm:text-left mb-6 sm:mb-0">
                <div className="font-display italic text-2xl text-slate-700 tracking-tight font-light" style={{ fontFamily: 'Georgia, serif' }}>
                  Michelle Vaz
                </div>
                <div className="w-32 h-[1px] bg-slate-300 my-1 mx-auto sm:mx-0" />
                <span className="text-[10px] uppercase font-mono text-slate-400 block font-bold">Michelle Vaz</span>
                <span className="text-[9px] text-slate-500 block">Director, AWS Training & Certification</span>
              </div>
              <div className="flex items-center space-x-3 opacity-15">
                <Shield size={64} className="text-[#232f3e]" />
              </div>
            </div>
          </div>
        );

      case 'unicef-digital-productivity':
        return (
          <div className="relative w-full max-w-4xl bg-[#fcfcfc] text-slate-900 rounded-lg p-6 sm:p-12 border-8 border-blue-500/10 shadow-2xl font-sans overflow-hidden">
            {/* Passport To Earning Blue Corner Frames */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-800" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-800" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-800" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-800" />

            {/* Header Logos */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/60 pb-6 mb-6">
              <div className="flex items-center space-x-2.5">
                {/* YuWaah! Badge */}
                <div className="p-2 bg-amber-50 rounded-full border border-amber-200 shrink-0">
                  <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white text-[10px] font-black tracking-tight leading-none text-center">
                    Yu<br/>Waah!
                  </div>
                </div>
                <div>
                  <span className="text-[11px] uppercase font-mono tracking-wider text-slate-500 block font-bold">YuWaah!</span>
                  <span className="text-[9px] text-slate-400 block">Generation Unlimited</span>
                </div>
              </div>

              {/* Passport to Earning Center Text */}
              <div className="text-center my-3 sm:my-0">
                <h1 className="text-xl sm:text-2xl font-black text-blue-800 tracking-wider">PASSPORT TO EARNING</h1>
                <span className="text-[10px] font-mono tracking-widest text-slate-400 block uppercase font-semibold">Certificate of Completion</span>
              </div>

              {/* UNICEF Logo */}
              <div className="flex items-center space-x-2">
                <div className="text-right">
                  <span className="text-[11px] font-bold text-sky-500 block">unicef</span>
                  <span className="text-[8px] text-sky-500 block -mt-1">for every child</span>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="text-center space-y-6 my-10">
              <span className="text-xs uppercase font-mono tracking-widest text-slate-400 block font-semibold">This is to certify that</span>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-blue-950 tracking-tight">
                Akula Saideep
              </h2>
              
              <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
                has successfully completed the specialized course
              </p>

              <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-800 tracking-tight leading-none">
                Digital Productivity with AI
              </h3>

              <div className="flex justify-center pt-2">
                <div className="bg-blue-50 border border-blue-100 rounded-full px-5 py-1.5 flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-xs font-semibold text-blue-900">Completed with a Score of 95%</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto pt-6 border-t border-slate-100 text-left">
                <div>
                  <span className="text-[9px] uppercase font-mono text-slate-400 block font-semibold">Completion Date</span>
                  <span className="font-mono font-bold text-slate-700 text-xs flex items-center mt-0.5">
                    <Calendar size={12} className="mr-1 text-blue-600" /> March 23, 2026
                  </span>
                </div>
                <div>
                  <span className="text-[9px] uppercase font-mono text-slate-400 block font-semibold">Credential Code</span>
                  <span className="font-mono text-slate-500 text-xs mt-0.5 block">skills.myp2e.org</span>
                </div>
              </div>
            </div>

            {/* Signature Block */}
            <div className="border-t border-slate-100 pt-6 mt-8 flex justify-center">
              <div className="text-center">
                <div className="font-display italic text-xl text-slate-700 tracking-tight font-light" style={{ fontFamily: 'Georgia, serif' }}>
                  Ms. Giorgia Varisco
                </div>
                <div className="w-40 h-[1px] bg-slate-300 my-1 mx-auto" />
                <span className="text-[10px] uppercase font-mono text-slate-400 block font-bold">Ms. Giorgia Varisco</span>
                <span className="text-[8px] text-slate-500 block">Chief of Generation Unlimited (YuWaah), Youth Development and Partnerships, UNICEF</span>
              </div>
            </div>
          </div>
        );

      case 'cisco-python-essentials':
        return (
          <div className="relative w-full max-w-4xl bg-white text-slate-900 rounded-lg p-6 sm:p-12 border-8 border-slate-100 shadow-2xl font-sans overflow-hidden">
            {/* Header Logos */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-6 mb-6">
              <div className="flex items-center space-x-2 shrink-0">
                <div className="text-slate-800 font-extrabold text-lg tracking-wider flex flex-col leading-none">
                  <span className="text-sky-600 text-xs font-mono">Cisco</span>
                  <span className="text-slate-800 text-[10px] tracking-widest font-bold uppercase">Networking Academy</span>
                </div>
              </div>
              
              <div className="my-2 sm:my-0 text-center text-xs font-bold font-mono tracking-widest uppercase text-slate-400">
                Course Completion Certificate
              </div>

              <div className="flex items-center space-x-1">
                <span className="text-slate-800 font-bold text-xs uppercase tracking-tight">Python</span>
                <span className="px-1.5 py-0.5 bg-blue-600 text-white text-[9px] rounded font-mono font-bold">PI</span>
                <span className="text-[10px] text-slate-400 font-mono">Institute</span>
              </div>
            </div>

            {/* Body */}
            <div className="text-center space-y-6 my-10">
              <span className="text-xs uppercase font-mono tracking-widest text-slate-400 block font-semibold">This certificate is awarded to</span>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 mt-1 tracking-tight">
                Akula Saideep
              </h2>
              
              <p className="text-sm text-slate-500 max-w-lg mx-auto">
                for successfully completing the specialized programming course
              </p>

              <h3 className="text-2xl sm:text-3xl font-display font-black text-blue-900 mt-1 tracking-tight">
                Python Essentials 1
              </h3>

              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                offered by <strong className="text-slate-800">Vaagdevi College of Engineering</strong> through the <strong className="text-slate-800">Cisco Networking Academy</strong> program.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto pt-6 border-t border-slate-100 text-left">
                <div>
                  <span className="text-[9px] uppercase font-mono text-slate-400 block font-semibold">Completion Date</span>
                  <span className="font-mono font-bold text-slate-700 text-xs flex items-center mt-0.5">
                    <Calendar size={12} className="mr-1 text-sky-600" /> 24 Oct 2025
                  </span>
                </div>
                <div>
                  <span className="text-[9px] uppercase font-mono text-slate-400 block font-semibold">Issuer Authority</span>
                  <span className="text-slate-500 text-xs mt-0.5 block font-medium">Cisco NetAcad program</span>
                </div>
              </div>
            </div>

            {/* Signatures */}
            <div className="border-t border-slate-100 pt-6 mt-8 flex justify-center">
              <div className="text-center">
                <div className="font-display italic text-xl text-slate-700 tracking-tight font-light" style={{ fontFamily: 'Georgia, serif' }}>
                  Shekhar Katukoori
                </div>
                <div className="w-40 h-[1px] bg-slate-200 my-1 mx-auto" />
                <span className="text-[10px] uppercase font-mono text-slate-400 block font-bold">Shekhar Katukoori</span>
                <span className="text-[8px] text-slate-500 block">Instructor, Vaagdevi College of Engineering</span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Dark overlay backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md cursor-zoom-out"
      />

      {/* Certificate Viewer Wrapper */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-4xl z-10 flex flex-col"
      >
        {/* Quick Close Header bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-slate-900/90 text-white rounded-t-xl border-t border-x border-white/10 backdrop-blur-md">
          <div className="flex items-center space-x-2">
            <Award size={14} className="text-blue-400" />
            <span className="text-xs font-mono font-medium text-slate-300">Verified Credential Viewer</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Close Viewer"
          >
            <X size={15} />
          </button>
        </div>

        {/* Certificate Display Screen */}
        <div className="bg-slate-950/20 rounded-b-xl overflow-hidden shadow-2xl flex justify-center">
          {renderCertificateContent()}
        </div>
      </motion.div>
    </div>
  );
}
