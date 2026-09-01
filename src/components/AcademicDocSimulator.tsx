/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, FileText, CheckCircle2, AlertTriangle, Sparkles, ArrowRight, Download, Search, RefreshCw, BarChart2, ShieldCheck, Database, Bot, BrainCircuit } from 'lucide-react';

interface AcademicDocSimulatorProps {
  onClose: () => void;
}

type TabType = 'overview' | 'analyzer' | 'gap_analysis' | 'minutes' | 'pipeline';

export default function AcademicDocSimulator({ onClose }: AcademicDocSimulatorProps) {
  const [activeTab, setActiveTab] = useState<TabType>('analyzer');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<'minutes' | 'research' | 'curriculum'>('minutes');
  const [reportGenerated, setReportGenerated] = useState(false);

  const criteriaScores = [
    { id: 'c1', name: 'Curricular Aspects', score: 94, status: 'Compliant', missing: 'None' },
    { id: 'c2', name: 'Teaching-Learning & Evaluation', score: 88, status: 'Compliant', missing: '2 CO-PO Mappings' },
    { id: 'c3', name: 'Research, Innovations & Extension', score: 78, status: 'Needs Evidence', missing: 'Grant utilization certificates (FY24)' },
    { id: 'c4', name: 'Infrastructure & Learning Resources', score: 92, status: 'Compliant', missing: 'Library e-resource logs' },
    { id: 'c5', name: 'Student Support & Progression', score: 85, status: 'Compliant', missing: 'Alumni mentorship records' },
    { id: 'c6', name: 'Governance, Leadership & Management', score: 82, status: 'Review Needed', missing: 'IQAC meeting minutes #4' },
    { id: 'c7', name: 'Institutional Values & Best Practices', score: 96, status: 'Compliant', missing: 'None' },
  ];

  const meetingSample = {
    title: 'Department Academic Committee (DAC) Meeting #12',
    date: 'August 14, 2026',
    extractedSummary: 'The DAC committee reviewed the revised AI & ML curriculum syllabus for Semesters 5 & 6, evaluated end-semester student course feedback, and approved the procurement of 20 edge-computing Jetson Nano boards for the computer vision laboratory.',
    actionItems: [
      { task: 'Finalize CO-PO mapping matrix for Advanced ML course', owner: 'Prof. S. Rao', deadline: 'Sept 5, 2026', status: 'In Progress' },
      { task: 'Upload hardware procurement receipts for NAAC Criterion 4', owner: 'Lab Coordinator', deadline: 'Aug 28, 2026', status: 'Missing Receipt' },
      { task: 'Conduct remedial classes for low-scoring student cohort', owner: 'Course Instructors', deadline: 'Sept 15, 2026', status: 'Approved' }
    ],
    missingEvidence: [
      'Verified expenditure invoice for Jetson Nano hardware kits (NAAC Criterion 4.4)',
      'Signed attendance roster for DAC quorum verification (NBA Criterion 1.2)'
    ]
  };

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    setReportGenerated(false);
    setTimeout(() => {
      setIsAnalyzing(false);
      setReportGenerated(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/85 backdrop-blur-xl"
      />

      {/* Main Window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        className="relative w-full max-w-5xl bg-slate-900/95 border border-white/15 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[92vh]"
      >
        {/* Glow lights */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-emerald-600/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />

        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-950/70 backdrop-blur-md relative z-10">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <BrainCircuit size={20} />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-display font-bold text-white text-base">
                  Academic Documentation & Accreditation Assistant
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  GEN-AI PLATFORM
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Intelligent Institutional Document Mining, Gap Analysis & AQAR Report Generator
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 border-b border-white/10 bg-slate-950/40 flex items-center space-x-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'analyzer', label: 'AI Document Intelligence' },
            { id: 'gap_analysis', label: 'NAAC / NBA Gap Analysis' },
            { id: 'minutes', label: 'Meeting Minutes & Evidence' },
            { id: 'pipeline', label: 'System Architecture' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`py-3 px-4 text-xs font-mono font-semibold uppercase tracking-wider border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-emerald-500 text-emerald-300'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Simulator Body */}
        <div className="p-6 overflow-y-auto no-scrollbar space-y-6 relative z-10 flex-1">
          
          {/* TAB 1: AI DOCUMENT INTELLIGENCE ANALYZER */}
          {activeTab === 'analyzer' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Left: Input Selection & Upload Mock */}
                <div className="md:col-span-5 space-y-4">
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                    <span className="text-xs font-mono uppercase text-slate-400 font-bold block">
                      Select Academic Document To Ingest
                    </span>
                    
                    <div className="space-y-2">
                      {[
                        { id: 'minutes', title: 'DAC Meeting Minutes #12.pdf', meta: 'Department of CSE • 8 Pages' },
                        { id: 'research', title: 'Faculty Research & Grants 2025-26.docx', meta: 'R&D Cell • 24 Pages' },
                        { id: 'curriculum', title: 'AI & ML Syllabus & CO-PO Rubric.xlsx', meta: 'Board of Studies • 4 Sheets' },
                      ].map(doc => (
                        <button
                          key={doc.id}
                          onClick={() => setSelectedDoc(doc.id as any)}
                          className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                            selectedDoc === doc.id
                              ? 'bg-emerald-500/15 border-emerald-500 text-white shadow-lg'
                              : 'bg-slate-950/60 border-white/10 text-slate-400 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <div className="flex items-center space-x-2.5">
                            <FileText size={16} className={selectedDoc === doc.id ? 'text-emerald-400' : 'text-slate-500'} />
                            <div className="truncate">
                              <span className="text-xs font-semibold block text-white truncate">{doc.title}</span>
                              <span className="text-[10px] font-mono text-slate-400 block">{doc.meta}</span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={handleRunAnalysis}
                      disabled={isAnalyzing}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 active:scale-95 transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-60"
                    >
                      {isAnalyzing ? (
                        <>
                          <RefreshCw size={14} className="animate-spin" />
                          <span>Extracting & Synthesizing AI Insights...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles size={14} />
                          <span>Run Gen-AI Accreditation Extraction</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Compliance Summary Stats */}
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                    <span className="text-xs font-mono uppercase text-slate-400 font-bold block">
                      Overall Compliance Readiness
                    </span>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl font-display font-bold text-emerald-400">87.8%</span>
                      <span className="text-xs font-mono text-slate-400">Accreditation Score (A+ Projection)</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full w-[88%]" />
                    </div>
                  </div>
                </div>

                {/* Right: Real-Time Extracted Insights & Generated Report */}
                <div className="md:col-span-7 space-y-4">
                  <div className="p-5 rounded-2xl bg-slate-950/80 border border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase font-bold text-emerald-400 flex items-center space-x-1.5">
                        <Bot size={14} />
                        <span>AI Extraction Output</span>
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                        Model: Vector Embeddings + LLM
                      </span>
                    </div>

                    {/* Executive Summary Box */}
                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
                      <h4 className="text-xs font-mono font-bold text-white uppercase">Executive Synthesis</h4>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans">
                        {meetingSample.extractedSummary}
                      </p>
                    </div>

                    {/* Extracted Action Items */}
                    <div className="space-y-2">
                      <span className="text-xs font-mono uppercase font-bold text-slate-400 block">
                        Action Items & Assigned Ownership
                      </span>
                      <div className="space-y-2">
                        {meetingSample.actionItems.map((item, idx) => (
                          <div key={idx} className="p-2.5 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-between text-xs">
                            <div className="space-y-0.5">
                              <span className="text-white font-medium block">{item.task}</span>
                              <span className="text-[10px] font-mono text-slate-400">Assigned: {item.owner} • Due: {item.deadline}</span>
                            </div>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                              item.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                              item.status === 'Missing Receipt' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                              'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                            }`}>
                              {item.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Missing Evidence Detection */}
                    <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                      <div className="flex items-center space-x-2 text-amber-300 text-xs font-mono font-bold">
                        <AlertTriangle size={14} />
                        <span>2 Missing Evidence Flags Detected</span>
                      </div>
                      <div className="space-y-1 text-xs text-slate-300 font-sans">
                        {meetingSample.missingEvidence.map((ev, idx) => (
                          <div key={idx} className="flex items-start space-x-2">
                            <span className="text-amber-400 font-bold">•</span>
                            <span>{ev}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: NAAC / NBA GAP ANALYSIS */}
          {activeTab === 'gap_analysis' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-display font-bold text-white">NAAC 7-Criteria Compliance Assessment</h4>
                  <p className="text-xs text-slate-400 font-mono">Automated gap detection and evidence completion tracking</p>
                </div>
                <span className="px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-bold">
                  Target: 3.51+ CGPA (A++ Grade)
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {criteriaScores.map(c => (
                  <div key={c.id} className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-display font-bold text-white">{c.name}</span>
                      <span className="text-sm font-mono font-bold text-emerald-400">{c.score}%</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          c.score >= 90 ? 'bg-emerald-400' : c.score >= 80 ? 'bg-blue-400' : 'bg-amber-400'
                        }`}
                        style={{ width: `${c.score}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
                      <span>Missing: {c.missing}</span>
                      <span className={c.score >= 90 ? 'text-emerald-400' : 'text-amber-400'}>{c.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: MEETING MINUTES & EVIDENCE */}
          {activeTab === 'minutes' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-display font-bold text-white text-base">Minutes Summarization & Action Registry</h4>
                  <button
                    onClick={() => alert('AQAR Accreditation Draft Report downloaded!')}
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-mono text-xs font-semibold flex items-center space-x-1.5 cursor-pointer"
                  >
                    <Download size={13} />
                    <span>Export AQAR Draft (.docx)</span>
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
                  <span className="text-xs font-mono uppercase text-emerald-400 font-bold block">
                    Institutional Intelligence Summary
                  </span>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    The platform continuously aggregates Department Advisory Board (DAB), Program Assessment Committee (PAC), and Internal Quality Assurance Cell (IQAC) meetings, categorizing outcomes into verifiable accreditation metrics with automated evidence cross-referencing.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ARCHITECTURE PIPELINE */}
          {activeTab === 'pipeline' && (
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-white/10 space-y-6">
              <div className="text-center space-y-1 max-w-lg mx-auto">
                <h4 className="font-display font-bold text-white text-lg">System Dataflow Architecture</h4>
                <p className="text-xs text-slate-400 font-mono">
                  Documents → AI Processing → Intelligent Analysis → Recommendations → Reports
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center">
                {[
                  { step: '1', title: 'Documents', desc: 'Syllabus, Minutes, Invoices, Rubrics', icon: FileText, color: 'text-blue-400' },
                  { step: '2', title: 'AI Processing', desc: 'OCR, Chunking, Vector Embeddings', icon: BrainCircuit, color: 'text-indigo-400' },
                  { step: '3', title: 'Intelligent Analysis', desc: 'Criteria Mapping & Gap Extraction', icon: Search, color: 'text-purple-400' },
                  { step: '4', title: 'Recommendations', desc: 'Missing Evidence Alerts & CO-PO Fixes', icon: AlertTriangle, color: 'text-amber-400' },
                  { step: '5', title: 'Reports', desc: 'Automated AQAR & NBA Self-Study Reports', icon: ShieldCheck, color: 'text-emerald-400' },
                ].map((s, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 text-center space-y-2 h-full flex flex-col justify-between">
                    <div className="flex items-center justify-center">
                      <div className={`p-3 rounded-xl bg-white/5 ${s.color}`}>
                        <s.icon size={20} />
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-slate-500 uppercase block">Step {s.step}</span>
                      <span className="text-xs font-display font-bold text-white block mt-0.5">{s.title}</span>
                      <span className="text-[10px] text-slate-400 font-sans block mt-1">{s.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-slate-950/70 backdrop-blur-md flex items-center justify-between">
          <span className="text-xs text-slate-400 font-mono">
            Accreditation Assistant • Python, Flask, Gen-AI & MongoDB
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer"
          >
            Close Assistant
          </button>
        </div>

      </motion.div>
    </div>
  );
}
