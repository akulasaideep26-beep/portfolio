/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Terminal, Shield, Database, Cloud, Search, Pin, Star, Trash2, Copy, Check, 
  ExternalLink, Key, RefreshCw, Layers, Plus, Sparkles, BookOpen, User, Lock, ArrowRight, Clipboard
} from 'lucide-react';

interface ClipboardSimulatorProps {
  onClose: () => void;
}

interface ClipItem {
  id: string;
  content: string;
  type: 'Code' | 'URL' | 'Text';
  timestamp: string;
  isPinned: boolean;
  isFavorite: boolean;
}

// Initial clips mimicking documentation content
const INITIAL_CLIPS: ClipItem[] = [
  {
    id: 'clip-1',
    content: 'import tkinter as tk\nfrom tkinter import ttk, messagebox, filedialog\nroot = tk.Tk()\nroot.title("Enhanced Smart Expense Tracker")',
    type: 'Code',
    timestamp: '2026-07-01 07:44:12',
    isPinned: true,
    isFavorite: true,
  },
  {
    id: 'clip-2',
    content: 'https://github.com/akulasaideep26-beep/intelligent-clipboard-code',
    type: 'URL',
    timestamp: '2026-07-01 07:42:05',
    isPinned: false,
    isFavorite: false,
  },
  {
    id: 'clip-3',
    content: 'Meeting with AWS Team: Discussed S3 bucket syncing latency parameters and local SQLite backup intervals.',
    type: 'Text',
    timestamp: '2026-07-01 07:39:54',
    isPinned: false,
    isFavorite: true,
  }
];

export default function ClipboardSimulator({ onClose }: ClipboardSimulatorProps) {
  // Auth states (mimics Page 80-81 of PDF)
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [authView, setAuthView] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('Admin');
  const [password, setPassword] = useState('123');
  const [authError, setAuthError] = useState('');

  // App States
  const [clips, setClips] = useState<ClipItem[]>(INITIAL_CLIPS);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'All' | 'Code' | 'URL' | 'Text'>('All');
  const [customInput, setCustomInput] = useState('');
  const [currentTab, setCurrentTab] = useState<'history' | 'analytics' | 'config'>('history');

  // Terminal & Watcher States (mimics Page 81 of PDF "WATCHER ON")
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'Microsoft Windows [Version 10.0.26100.6899]',
    '(c) Microsoft Corporation. All rights reserved.',
    '',
    'C:\\Users\\saideep\\clipboard_manager> python watcher.py',
    'Initializing Clipboard Watcher engine...',
    'Connecting to local database: sqlite:///clipboard.db... Connected.',
    'Verifying active user session credentials...',
    '[✓] Logged in successfully as user: Admin',
    '[✓] AWS S3 Cloud Mirror Service: ONLINE (s3://saideep-clipboard-backup)',
    'Monitoring system clipboard activity... (Ctrl+C to copy text)',
    '------------------------------------------------------------'
  ]);
  const [watcherPulse, setWatcherPulse] = useState(true);
  const [showToast, setShowToast] = useState('');
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalLogs]);

  // Handle Watcher Pulsing
  useEffect(() => {
    const interval = setInterval(() => {
      setWatcherPulse(p => !p);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Log in user
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === 'Admin' && password === '123') {
      setIsLoggedIn(true);
      setAuthError('');
      addLog(`User '${username}' logged in successfully via Web Console.`);
    } else {
      setAuthError('Invalid credentials. Hint: Admin / 123');
    }
  };

  // Log out user
  const handleLogout = () => {
    setIsLoggedIn(false);
    addLog(`User '${username}' logged out. Web Dashboard locked.`);
  };

  // Add line to terminal watcher log
  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setTerminalLogs(prev => [...prev, `[${timestamp}] ${message}`]);
  };

  // Capture simulated copy action
  const triggerSimulatedCopy = (text: string) => {
    if (!text.trim()) return;

    // Detect type automatically (Simple dynamic NLP/Regex classifier as described in the PDF Abstract)
    let type: 'Code' | 'URL' | 'Text' = 'Text';
    if (text.includes('import ') || text.includes('def ') || text.includes('const ') || text.includes('function ') || text.includes('SELECT ') || text.includes('{') || text.includes('style =')) {
      type = 'Code';
    } else if (text.startsWith('http://') || text.startsWith('https://') || text.includes('www.')) {
      type = 'URL';
    }

    const newClip: ClipItem = {
      id: `clip-${Date.now()}`,
      content: text,
      type,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      isPinned: false,
      isFavorite: false,
    };

    // Add to clips state
    setClips(prev => [newClip, ...prev]);

    // Logs in the Watcher terminal
    addLog(`DETECTED: Clipboard content updated.`);
    addLog(`[NLP CLASSIFIER] Dynamic auto-categorization computed: ${type.toUpperCase()}`);
    addLog(`[SQLITE DB] INSERT INTO clipboard_items (content, type, timestamp) VALUES (${text.substring(0, 20).replace(/\n/g, ' ')}..., ${type}, NOW())`);
    addLog(`[AWS S3] Synchronizing block to cloud backup container...`);
    addLog(`[AWS S3] Upload completed. ETag: s3_etag_${Math.random().toString(36).substring(7)}`);
    addLog(`------------------------------------------------------------`);

    // Show feedback toast
    setShowToast(`Simulated Watcher captured a new ${type}!`);
    setTimeout(() => setShowToast(''), 3000);
  };

  // Simulated copy to user's real browser clipboard
  const handleRealCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setShowToast('Copied to actual browser clipboard!');
    setTimeout(() => setShowToast(''), 3000);
    addLog(`Simulated copy-back requested for snippet: "${text.substring(0, 20)}..."`);
  };

  // Toggle Pinned status
  const togglePin = (id: string) => {
    setClips(prev => prev.map(clip => {
      if (clip.id === id) {
        const nextState = !clip.isPinned;
        addLog(`[DATABASE] Updated item ${id}: Pinned = ${nextState}`);
        return { ...clip, isPinned: nextState };
      }
      return clip;
    }));
  };

  // Toggle Favorite status
  const toggleFavorite = (id: string) => {
    setClips(prev => prev.map(clip => {
      if (clip.id === id) {
        const nextState = !clip.isFavorite;
        addLog(`[DATABASE] Updated item ${id}: Favorite = ${nextState}`);
        return { ...clip, isFavorite: nextState };
      }
      return clip;
    }));
  };

  // Delete clip
  const deleteClip = (id: string) => {
    setClips(prev => prev.filter(clip => clip.id !== id));
    addLog(`[DATABASE] Delete request for item ${id}. Successfully removed from SQLite.`);
  };

  // Filter and search clips
  const filteredClips = clips
    .filter(clip => {
      if (activeFilter === 'All') return true;
      return clip.type === activeFilter;
    })
    .filter(clip => {
      return clip.content.toLowerCase().includes(searchQuery.toLowerCase());
    })
    // Sort pinned clips to the top
    .sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return 0;
    });

  // Sample templates users can click to simulate clipboard changes easily
  const STATIC_TEMPLATES = [
    {
      title: 'Tkinter Code Block',
      text: 'style.theme_create(\'mytheme\', parent=\'alt\', settings={\n  "TNotebook": {\n    "configure": {"tabmargins": [2, 5, 2, 0]}\n  }\n})',
      badge: 'Code'
    },
    {
      title: 'Database Query',
      text: 'SELECT category, SUM(amount) FROM expenses GROUP BY category ORDER BY SUM(amount) DESC;',
      badge: 'Code'
    },
    {
      title: 'GitHub Repository URL',
      text: 'https://github.com/akulasaideep26-beep/intelligent-clipboard-code',
      badge: 'URL'
    },
    {
      title: 'Meeting Notes Summary',
      text: 'The Intelligent Clipboard Management System was successfully launched. Tested local database persistency, SQLite triggers, and AWS bucket syncing schedules.',
      badge: 'Text'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Dark Blur Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-lg"
      />

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full h-full max-w-6xl bg-slate-950/95 border border-white/10 rounded-2xl flex flex-col overflow-hidden shadow-2xl z-10"
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-900/50 backdrop-blur-md">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20 text-blue-400">
              <Clipboard size={18} />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-display font-bold text-white text-sm sm:text-base">
                  Intelligent Clipboard Manager
                </h3>
                <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300">
                  LIVE SIMULATION
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-400 font-mono hidden sm:block">
                SQLite Database + Python Watcher Console + Flask Web Dashboard
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Status Indicators */}
            <div className="hidden md:flex items-center space-x-4 text-[10px] font-mono">
              <div className="flex items-center space-x-1.5 bg-slate-900 border border-white/5 py-1 px-2.5 rounded-full">
                <span className={`w-2 h-2 rounded-full bg-emerald-500 ${watcherPulse ? 'animate-ping' : ''}`} />
                <span className="text-slate-300">WATCHER ACTIVE</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-slate-900 border border-white/5 py-1 px-2.5 rounded-full">
                <Database size={12} className="text-indigo-400" />
                <span className="text-slate-300">SQLITE: CONNECTED</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-slate-900 border border-white/5 py-1 px-2.5 rounded-full">
                <Cloud size={12} className="text-blue-400 animate-pulse" />
                <span className="text-slate-300">AWS S3: MIRRORED</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Content Panel Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          
          {/* LEFT SIDEBAR: Simulated Desktop / System Clipboard Source & Watcher CLI */}
          <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col bg-[#050711]/90 overflow-y-auto">
            
            {/* Subsection: Instructions & Simulated Sources */}
            <div className="p-4 sm:p-5 border-b border-white/10 space-y-4">
              <div className="flex items-center space-x-2 text-blue-400">
                <Sparkles size={14} />
                <span className="text-xs font-mono uppercase tracking-wider font-bold">1. Simulate System Clipboard</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                In a real computer, the background **Python Clipboard Watcher** captures your copying actions. 
                Click **"Copy snippet"** on any of these cards below to simulate a system copy action, or write your own text to test!
              </p>

              {/* Manual Input Area */}
              <div className="relative">
                <textarea
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder="Type custom text to copy..."
                  className="w-full h-16 bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 resize-none font-mono"
                />
                <button
                  onClick={() => {
                    triggerSimulatedCopy(customInput);
                    setCustomInput('');
                  }}
                  disabled={!customInput.trim()}
                  className="absolute bottom-2.5 right-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-semibold text-[10px] uppercase px-2 py-1 rounded-md transition-all flex items-center space-x-1 cursor-pointer"
                >
                  <Plus size={10} />
                  <span>Simulate Copy</span>
                </button>
              </div>

              {/* Template grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {STATIC_TEMPLATES.map((tpl, i) => (
                  <div 
                    key={i}
                    onClick={() => triggerSimulatedCopy(tpl.text)}
                    className="group bg-slate-950/80 hover:bg-slate-900 border border-white/5 hover:border-blue-500/20 p-3 rounded-xl cursor-pointer transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-sans font-semibold text-slate-200 group-hover:text-blue-300 transition-colors">
                          {tpl.title}
                        </span>
                        <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded uppercase ${
                          tpl.badge === 'Code' ? 'bg-purple-500/10 text-purple-300 border border-purple-500/20' :
                          tpl.badge === 'URL' ? 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20' :
                          'bg-sky-500/10 text-sky-300 border border-sky-500/20'
                        }`}>
                          {tpl.badge}
                        </span>
                      </div>
                      <p className="text-[9px] font-mono text-slate-400 line-clamp-2 leading-relaxed">
                        {tpl.text}
                      </p>
                    </div>
                    <div className="flex items-center justify-end text-[9px] text-blue-400 font-mono font-bold mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Simulate Copy</span>
                      <ArrowRight size={10} className="ml-1" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Subsection: Python Watcher Terminal CLI View (Mimics Page 81 of PDF) */}
            <div className="flex-1 p-4 sm:p-5 flex flex-col overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2 text-purple-400">
                  <Terminal size={14} />
                  <span className="text-xs font-mono uppercase tracking-wider font-bold">2. Python Watcher Console</span>
                </div>
                <span className="text-[9px] font-mono text-slate-500 uppercase">CLI Output Logs</span>
              </div>

              {/* Terminal Frame */}
              <div className="flex-1 bg-black border border-white/10 rounded-xl p-4 font-mono text-[10px] leading-relaxed text-emerald-400 overflow-y-auto max-h-[180px] sm:max-h-none flex flex-col justify-between shadow-inner">
                <div className="space-y-1">
                  {terminalLogs.map((log, index) => {
                    let styleClass = "text-slate-400";
                    if (log.includes('[✓]')) styleClass = "text-emerald-400";
                    if (log.includes('DETECTED') || log.includes('INSERT')) styleClass = "text-amber-300";
                    if (log.includes('[NLP')) styleClass = "text-purple-400";
                    if (log.includes('[AWS')) styleClass = "text-sky-300";
                    if (log.includes('C:\\')) styleClass = "text-slate-300 font-bold";
                    
                    return (
                      <div key={index} className={styleClass}>
                        {log}
                      </div>
                    );
                  })}
                  <div ref={terminalEndRef} />
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT VIEWPORT: Web-Based Flask Dashboard View (Mimics Page 82 of PDF) */}
          <div className="lg:col-span-7 flex flex-col bg-slate-900/30 overflow-hidden">
            
            {/* Dashboard Subheader */}
            <div className="bg-slate-950/70 border-b border-white/10 px-6 py-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono text-slate-300 uppercase tracking-widest font-semibold">
                  Flask Web Dashboard Interface
                </span>
              </div>

              {isLoggedIn && (
                <div className="flex items-center space-x-3 text-xs">
                  <span className="text-slate-400 font-mono text-[10px]">Logged in as: <strong className="text-white">Admin</strong></span>
                  <button 
                    onClick={handleLogout}
                    className="text-[10px] font-mono text-rose-400 hover:text-rose-300 underline cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* IF LOCKED / logged out (Mimics Page 81 Login screen) */}
            {!isLoggedIn ? (
              <div className="flex-1 flex items-center justify-center p-6 bg-slate-950/40">
                <div className="w-full max-w-sm bg-slate-950 border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-blue-500 to-purple-500" />
                  
                  <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3 text-blue-400">
                      <Lock size={20} />
                    </div>
                    <h4 className="font-display font-bold text-white text-base">
                      {authView === 'login' ? 'Login to Clipboard Manager' : 'Register Account'}
                    </h4>
                    <p className="text-xs text-slate-400 font-sans mt-1">
                      {authView === 'login' ? 'Enter credentials to view clipboard database.' : 'Create credentials to start mirroring logs.'}
                    </p>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Username</label>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 text-slate-500" size={14} />
                        <input
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="e.g. Admin"
                          className="w-full bg-slate-900 border border-white/5 rounded-xl py-2 pl-9 pr-4 text-xs text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Password</label>
                      <div className="relative">
                        <Key className="absolute left-3 top-2.5 text-slate-500" size={14} />
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="e.g. 123"
                          className="w-full bg-slate-900 border border-white/5 rounded-xl py-2 pl-9 pr-4 text-xs text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    {authError && (
                      <p className="text-[10px] font-mono text-rose-400 text-center bg-rose-500/10 py-1.5 rounded-lg border border-rose-500/20">
                        {authError}
                      </p>
                    )}

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-1.5 shadow-lg shadow-blue-500/10 active:scale-95"
                    >
                      <span>{authView === 'login' ? 'Authenticate System' : 'Create Credentials'}</span>
                      <ArrowRight size={12} />
                    </button>
                  </form>

                  <div className="mt-6 pt-4 border-t border-white/5 text-center text-[10px] font-sans">
                    {authView === 'login' ? (
                      <span className="text-slate-400">
                        Don't have an account?{' '}
                        <button 
                          onClick={() => { setAuthView('register'); setAuthError(''); }}
                          className="text-blue-400 hover:underline cursor-pointer"
                        >
                          Register here
                        </button>
                      </span>
                    ) : (
                      <span className="text-slate-400">
                        Already registered?{' '}
                        <button 
                          onClick={() => { setAuthView('login'); setAuthError(''); }}
                          className="text-blue-400 hover:underline cursor-pointer"
                        >
                          Login here
                        </button>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* ACTIVE DASHBOARD UI */
              <div className="flex-1 flex flex-col overflow-hidden">
                
                {/* Navigation and Tabs inside Dashboard */}
                <div className="px-6 py-3 border-b border-white/5 bg-slate-950/20 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setCurrentTab('history')}
                      className={`text-xs font-mono font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                        currentTab === 'history' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'text-slate-400 hover:text-white border border-transparent'
                      }`}
                    >
                      Clipboard History
                    </button>
                    <button
                      onClick={() => setCurrentTab('analytics')}
                      className={`text-xs font-mono font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                        currentTab === 'analytics' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'text-slate-400 hover:text-white border border-transparent'
                      }`}
                    >
                      Analytics Metrics
                    </button>
                  </div>

                  {/* Summary Metric Badges (Mimics page 82 summary board) */}
                  <div className="flex space-x-2.5 text-[10px] font-mono">
                    <span className="bg-slate-950 border border-white/5 px-2 py-1 rounded">
                      Total Clips: <strong className="text-white">{clips.length}</strong>
                    </span>
                    <span className="bg-slate-950 border border-white/5 px-2 py-1 rounded">
                      Pinned: <strong className="text-amber-400">{clips.filter(c => c.isPinned).length}</strong>
                    </span>
                    <span className="bg-slate-950 border border-white/5 px-2 py-1 rounded">
                      Favorites: <strong className="text-pink-400">{clips.filter(c => c.isFavorite).length}</strong>
                    </span>
                  </div>
                </div>

                {/* VIEW 1: CLIPBOARD HISTORY TAB */}
                {currentTab === 'history' && (
                  <div className="flex-1 flex flex-col overflow-hidden p-6 space-y-4">
                    
                    {/* Search & Filtering */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                      <div className="sm:col-span-7 relative">
                        <Search className="absolute left-3 top-2.5 text-slate-500" size={14} />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search database clipboard records..."
                          className="w-full bg-slate-950 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-xs text-white focus:outline-none focus:border-blue-500/50 placeholder-slate-500 font-sans"
                        />
                      </div>

                      {/* Filter Pills */}
                      <div className="sm:col-span-5 flex bg-slate-950 p-1 rounded-xl border border-white/10">
                        {['All', 'Code', 'URL', 'Text'].map((f) => (
                          <button
                            key={f}
                            onClick={() => setActiveFilter(f as any)}
                            className={`flex-1 text-[9px] font-mono font-bold py-1 px-1 rounded-lg transition-all cursor-pointer ${
                              activeFilter === f ? 'bg-slate-900 text-blue-400 shadow' : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            {f}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Clipboard database rows */}
                    <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                      <AnimatePresence initial={false}>
                        {filteredClips.length === 0 ? (
                          <div className="h-48 flex flex-col items-center justify-center text-center space-y-2 border border-dashed border-white/5 rounded-2xl">
                            <Database className="text-slate-600" size={24} />
                            <p className="text-xs text-slate-500 font-sans">
                              No records match your filters or search query.
                            </p>
                            <span className="text-[10px] text-slate-600 font-mono">
                              Try simulating a copy or clear filters.
                            </span>
                          </div>
                        ) : (
                          filteredClips.map((clip) => (
                            <motion.div
                              key={clip.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              className={`relative bg-slate-950/80 hover:bg-slate-950 p-4 rounded-xl border transition-all duration-300 group ${
                                clip.isPinned ? 'border-amber-500/20 shadow-amber-500/[0.02]' : 
                                clip.isFavorite ? 'border-pink-500/20 shadow-pink-500/[0.02]' : 'border-white/5'
                              }`}
                            >
                              {/* Top metadata row */}
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                  <span className={`text-[8px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                                    clip.type === 'Code' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/10' :
                                    clip.type === 'URL' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/10' :
                                    'bg-sky-500/10 text-sky-400 border border-sky-500/10'
                                  }`}>
                                    {clip.type}
                                  </span>
                                  <span className="text-[9px] font-mono text-slate-500">
                                    {clip.timestamp}
                                  </span>

                                  {clip.isPinned && (
                                    <span className="flex items-center space-x-1 text-[8px] font-mono font-bold text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20">
                                      <Pin size={8} className="fill-amber-400" />
                                      <span>PINNED</span>
                                    </span>
                                  )}
                                </div>

                                {/* Quick action buttons */}
                                <div className="flex items-center space-x-1.5">
                                  <button
                                    onClick={() => togglePin(clip.id)}
                                    title={clip.isPinned ? "Unpin Item" : "Pin Item"}
                                    className={`p-1 rounded bg-slate-900 border border-white/5 hover:border-white/10 transition-colors cursor-pointer ${
                                      clip.isPinned ? 'text-amber-400' : 'text-slate-400 hover:text-white'
                                    }`}
                                  >
                                    <Pin size={10} className={clip.isPinned ? "fill-amber-400" : ""} />
                                  </button>
                                  <button
                                    onClick={() => toggleFavorite(clip.id)}
                                    title={clip.isFavorite ? "Remove Favorite" : "Mark Favorite"}
                                    className={`p-1 rounded bg-slate-900 border border-white/5 hover:border-white/10 transition-colors cursor-pointer ${
                                      clip.isFavorite ? 'text-pink-400' : 'text-slate-400 hover:text-white'
                                    }`}
                                  >
                                    <Star size={10} className={clip.isFavorite ? "fill-pink-400" : ""} />
                                  </button>
                                  <button
                                    onClick={() => handleRealCopy(clip.content)}
                                    title="Copy Back to actual clipboard"
                                    className="p-1 rounded bg-slate-900 border border-white/5 hover:border-blue-500/30 text-slate-400 hover:text-blue-300 transition-all cursor-pointer"
                                  >
                                    <Copy size={10} />
                                  </button>
                                  <button
                                    onClick={() => deleteClip(clip.id)}
                                    title="Delete Record"
                                    className="p-1 rounded bg-slate-900 border border-white/5 hover:border-rose-500/30 text-slate-400 hover:text-rose-400 transition-all cursor-pointer"
                                  >
                                    <Trash2 size={10} />
                                  </button>
                                </div>
                              </div>

                              {/* Clipboard text body */}
                              <div className="font-mono text-xs text-slate-200 bg-slate-900/40 p-2.5 border border-white/5 rounded-lg overflow-x-auto select-all max-h-24 whitespace-pre-wrap">
                                {clip.content}
                              </div>
                            </motion.div>
                          ))
                        )}
                      </AnimatePresence>
                    </div>

                  </div>
                )}

                {/* VIEW 2: ANALYTICS METRICS TAB (Mimics Page 85 of PDF) */}
                {currentTab === 'analytics' && (
                  <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    
                    {/* Analytical overview panel */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      
                      {/* SQLite Local Storage size */}
                      <div className="bg-slate-950 border border-white/5 p-4 rounded-xl space-y-1">
                        <span className="text-[10px] font-mono text-slate-500 uppercase">Local Database Storage</span>
                        <div className="flex items-baseline space-x-1">
                          <span className="text-xl font-display font-bold text-white">42.8</span>
                          <span className="text-xs text-slate-400">KB</span>
                        </div>
                        <p className="text-[10px] text-slate-400 leading-normal">
                          Stored in fully indexed SQLite database. Persistence maintained across reboots.
                        </p>
                      </div>

                      {/* AWS Sync Storage stats */}
                      <div className="bg-slate-950 border border-white/5 p-4 rounded-xl space-y-1">
                        <span className="text-[10px] font-mono text-slate-500 uppercase">Cloud S3 Replica Mirror</span>
                        <div className="flex items-center space-x-1.5">
                          <span className="text-xl font-display font-bold text-sky-400">100%</span>
                          <span className="text-[9px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">SYNCED</span>
                        </div>
                        <p className="text-[10px] text-slate-400 leading-normal">
                          AWS Bucket `saideep-clipboard-backup` synced securely. 0 conflicts logged.
                        </p>
                      </div>

                      {/* Capture latency average */}
                      <div className="bg-slate-950 border border-white/5 p-4 rounded-xl space-y-1">
                        <span className="text-[10px] font-mono text-slate-500 uppercase">System Sync Latency</span>
                        <div className="flex items-baseline space-x-1">
                          <span className="text-xl font-display font-bold text-purple-400">0.08</span>
                          <span className="text-xs text-slate-400">sec</span>
                        </div>
                        <p className="text-[10px] text-slate-400 leading-normal">
                          Watcher thread latency monitoring native pasteboard buffer in real-time.
                        </p>
                      </div>

                    </div>

                    {/* Visual Analytics Charts using custom elegant CSS gauges */}
                    <div className="bg-slate-950 border border-white/5 p-6 rounded-2xl space-y-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-display font-bold text-white text-sm">
                            Clipboard Categorization Metrics
                          </h5>
                          <p className="text-[11px] text-slate-400">
                            Automatic content analysis computed by dynamic regex and NLP parsers.
                          </p>
                        </div>
                        <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest font-semibold">
                          Category Breakdown
                        </span>
                      </div>

                      <div className="space-y-4">
                        {/* Type Code */}
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-xs font-mono">
                            <span className="text-purple-400 font-bold">Code Blocks & SQL Queries</span>
                            <span className="text-slate-300">
                              {clips.filter(c => c.type === 'Code').length} clips ({Math.round((clips.filter(c => c.type === 'Code').length / (clips.length || 1)) * 100)}%)
                            </span>
                          </div>
                          <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
                            <div 
                              className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-1000"
                              style={{ width: `${(clips.filter(c => c.type === 'Code').length / (clips.length || 1)) * 100}%` }}
                            />
                          </div>
                        </div>

                        {/* Type URL */}
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-xs font-mono">
                            <span className="text-indigo-400 font-bold">URLs & REST Endpoints</span>
                            <span className="text-slate-300">
                              {clips.filter(c => c.type === 'URL').length} clips ({Math.round((clips.filter(c => c.type === 'URL').length / (clips.length || 1)) * 100)}%)
                            </span>
                          </div>
                          <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
                            <div 
                              className="h-full bg-gradient-to-r from-indigo-500 to-sky-500 rounded-full transition-all duration-1000"
                              style={{ width: `${(clips.filter(c => c.type === 'URL').length / (clips.length || 1)) * 100}%` }}
                            />
                          </div>
                        </div>

                        {/* Type Text */}
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-xs font-mono">
                            <span className="text-sky-400 font-bold">Plain Text & Document Snippets</span>
                            <span className="text-slate-300">
                              {clips.filter(c => c.type === 'Text').length} clips ({Math.round((clips.filter(c => c.type === 'Text').length / (clips.length || 1)) * 100)}%)
                            </span>
                          </div>
                          <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
                            <div 
                              className="h-full bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full transition-all duration-1000"
                              style={{ width: `${(clips.filter(c => c.type === 'Text').length / (clips.length || 1)) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>

                    </div>

                  </div>
                )}

              </div>
            )}

          </div>

        </div>

        {/* Global Feedback Floating Toast Alert */}
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 border border-blue-500/30 text-white font-mono text-xs px-5 py-3 rounded-xl shadow-2xl flex items-center space-x-2 backdrop-blur-md z-50"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
              <span>{showToast}</span>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </div>
  );
}
