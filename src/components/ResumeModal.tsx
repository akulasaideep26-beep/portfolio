/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Printer, Download, Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS_DATA, SKILLS_DATA, CERTIFICATIONS_DATA } from '../data';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const projectBulletPoints: Record<string, string[]> = {
    'hmotion-ai': [
      "Engineered a real-time computer vision and hand landmark classification engine utilizing YOLOv8 and MediaPipe to detect 21 coordinate joints per hand with sub-15ms inference latency.",
      "Developed a full-stack interactive client-server architecture with React 19, TypeScript, Node.js, Express, and WebSockets for low-latency spatial telemetry streaming.",
      "Mapped spatial hand gestures (pinch, pointing, victory, fist, palm) to UI zoom, slider adjustment, and desktop control actions with 98.4%+ classification accuracy."
    ],
    'academic-doc-assistant': [
      "Built an intelligent institutional document management platform designed to automate NAAC, NBA, and NIRF accreditation workflows and gap analysis.",
      "Integrated Generative AI and vector search to extract action items, meeting minutes summaries, and detect missing compliance evidence across department documentation.",
      "Automated compilation of Annual Quality Assurance Reports (AQAR) with compliance scoring gauges and structured evidence mapping in Python, Flask, and MongoDB."
    ],
    clipboard: [
      "Developed a cross-platform desktop clipboard tracking application with local SQLite database logging and a Flask local server stream.",
      "Engineered automated natural language parsing (NLP) rule arrays to isolate and classify programming code blocks from standard copied text templates.",
      "Implemented secure background cloud archiving to sync captured text assets with AWS S3 buckets using encrypted API parameters."
    ],
    fermart: [
      "Conceptualized an end-to-end direct-to-farm marketplace to bridge regional farmers with certified, government-regulated fertilizer dealers.",
      "Designed detailed, highly accessible mobile UI prototypes in Figma, prioritizing intuitive visual indicators and vernacular iconography.",
      "Structured soil-health data widgets capable of computing customized NPK (Nitrogen, Phosphorus, Potassium) chemical ratios from localized laboratory inputs."
    ],
    'traffic-management': [
      "Designed an AI-driven smart transit vision system utilizing YOLOv8 object detection and OpenCV to calculate vehicle grid density.",
      "Coded dynamic delay formulas in Python to override legacy static signal timing and adjust light phases adaptively based on live lane volumes.",
      "Constructed custom PyTorch detection pipelines to differentiate emergency responder vehicles and grant priority green cycles."
    ],
    'food-preservation': [
      "Co-created a physical low-cost food preservation IoT array with ESP32 microcontrollers and DHT11 ambient atmospheric sensor lines.",
      "Programmed edge-computing linear regression algorithms (tinyML) running locally on microchips to forecast agricultural spoilage trends.",
      "Built a web-based Flask control dashboard featuring live charting telemetry, preventative thresholds, and automated logistics alerts."
    ]
  };

  const allCertifications = [
    { title: "AWS Cloud Practitioner Essentials", issuer: "Amazon Web Services (AWS)", date: "2026" },
    { title: "AWS Academy Graduate - AWS Academy Cloud Foundations", issuer: "Amazon Web Services (AWS)", date: "2025" },
    { title: "PCAP: Certified Associate in Python Programming", issuer: "Python Institute & Cisco Networking Academy", date: "2025" },
    { title: "Digital Productivity with AI", issuer: "UNICEF (YuWaah! Passport to Earning)", date: "2026" },
    { title: "Introduction to Cybersecurity & Packet Tracer", issuer: "Cisco Networking Academy", date: "2024" }
  ];

  const handleDownloadMock = () => {
    // Generate text version of resume as a fallback download
    const content = `
AKULA SAIDEEP
Email: ${PERSONAL_INFO.email} | Phone: ${PERSONAL_INFO.phone}
LinkedIn: ${PERSONAL_INFO.linkedin} | GitHub: ${PERSONAL_INFO.github}
Location: ${PERSONAL_INFO.location}

=========================================
OBJECTIVE
=========================================
${PERSONAL_INFO.about}

=========================================
EDUCATION
=========================================
Vaagdevi College of Engineering
B.Tech in Computer Science Engineering (AI & ML) | Batch (2024 - 2028)
CGPA: 8.39 / 10.0
- Core Coursework: Data Structures & Algorithms (DSA), Artificial Intelligence, Machine Learning Foundations, Deep Learning, Cloud Architecture, Database Management Systems (DBMS), Computer Networks, Software Engineering.
- Leadership: Coordinator and Peer Lab Advisor at AWS Cloud Club (2025).

SR Edu Center
Intermediate, MPC Board (Mathematics, Physics, Chemistry) | 2022 - 2024
Score: 880 Marks

St. Ann's High School
Secondary School Certificate (SSC) | Class of 2022
GPA: 9.0 / 10.0 CGPA

=========================================
TECHNICAL SKILLS
=========================================
- Programming Languages: Python, Java, C, Kotlin
- Cloud & Technologies: AWS Cloud Services, AI & Machine Learning, Basic Cybersecurity, DSA
- Soft Skills: Leadership, Communication, Teamwork, Quick Learning, Time Management

=========================================
PROJECTS & TECHNICAL EXPERIENCE
=========================================
1. H-MOTION AI: Real-Time Hand Gesture Recognition
   Technologies: React, TypeScript, Node.js, Express, Computer Vision, YOLOv8, MediaPipe, WebSockets
   * Engineered a real-time computer vision and hand landmark classification engine utilizing YOLOv8 and MediaPipe to detect 21 coordinate joints per hand with sub-15ms inference latency.
   * Developed a full-stack interactive client-server architecture with React 19, TypeScript, Node.js, Express, and WebSockets for low-latency spatial telemetry streaming.
   * Mapped spatial hand gestures (pinch, pointing, victory, fist, palm) to UI zoom, slider adjustment, and desktop control actions with 98.4%+ classification accuracy.

2. AI-Powered Academic Documentation & Accreditation Assistant
   Technologies: Python, Flask, Generative AI, NLP, MongoDB, React, Vector Embeddings
   * Built an intelligent institutional document management platform designed to automate NAAC, NBA, and NIRF accreditation workflows and gap analysis.
   * Integrated Generative AI and vector search to extract action items, meeting minutes summaries, and detect missing compliance evidence across department documentation.
   * Automated compilation of Annual Quality Assurance Reports (AQAR) with compliance scoring gauges and structured evidence mapping in Python, Flask, and MongoDB.

3. Intelligent Clipboard Manager
   Technologies: Python, SQLite, AWS S3, Flask, NLP
   * Developed a cross-platform desktop clipboard tracking application with local SQLite database logging and a Flask local server stream.
   * Engineered automated natural language parsing (NLP) rule arrays to isolate and classify programming code blocks from standard copied text templates.
   * Implemented secure background cloud archiving to sync captured text assets with AWS S3 buckets.

4. Fermart: Fertilizer & Pesticide Delivery for Farmers
   Technologies: Android UX Design, Figma Mockups, Agricultural IoT, Soil Science
   * Conceptualized an end-to-end direct-to-farm marketplace to bridge regional farmers with certified, government-regulated fertilizer dealers.
   * Designed detailed, highly accessible mobile UI prototypes in Figma, prioritizing intuitive visual indicators and vernacular iconography.
   * Structured soil-health data widgets capable of computing customized NPK chemical ratios from localized laboratory inputs.

5. AI-Powered Smart Traffic Management System
   Technologies: Python, OpenCV, YOLOv8, PyTorch
   * Designed an AI-driven smart transit vision system utilizing YOLOv8 object detection and OpenCV to calculate vehicle grid density.
   * Coded dynamic delay formulas in Python to override legacy static signal timing and adjust light phases adaptively based on live lane volumes.
   * Constructed custom PyTorch detection pipelines to differentiate emergency responder vehicles and grant priority green cycles.

6. Smart Low-Cost Food Preservation Solution
   Technologies: C/C++, ESP32, DHT11 Sensors, Flask, tinyML
   * Co-created a physical low-cost food preservation IoT array with ESP32 microcontrollers and DHT11 ambient atmospheric sensor lines.
   * Programmed edge-computing linear regression algorithms (tinyML) running locally on microchips to forecast agricultural spoilage trends.
   * Built a web-based Flask control dashboard featuring live charting telemetry, preventative thresholds, and automated logistics alerts.

=========================================
PROFESSIONAL CERTIFICATIONS
=========================================
- AWS Cloud Practitioner Essentials – Amazon Web Services (AWS)
- AWS Academy Graduate - AWS Academy Cloud Foundations – Amazon Web Services (AWS)
- PCAP: Certified Associate in Python Programming – Python Institute & Cisco Networking Academy
- Digital Productivity with AI – UNICEF (YuWaah! Passport to Earning)
- Introduction to Cybersecurity & Packet Tracer – Cisco Networking Academy

=========================================
LEADERSHIP, ACHIEVEMENTS & ACTIVITIES
=========================================
- AWS Cloud Club Contributor & Lab Advisor (2025): Assisted in guiding students during peer labs on cloud fundamentals.
- ThoughtSpire National Level Idea Presentation (2024): Presented an IoT crop preservation system proposal.
- IdeaRush Intra-College Innovation Contest (2024): Pitched AI-powered Smart Traffic Management System concepts.
- College Hackathons (2024 - 2025): Actively collaborated in teams to design and code functional web prototypes.
- Languages: Telugu (Native), English (Professional), and Hindi (Conversational).
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Akula_Saideep_Resume.txt');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-[fadeIn_0.2s_ease-out] print:p-0 print:bg-white print:block">
      {/* Dynamic print style override */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          #root {
            display: none !important;
          }
          .fixed {
            position: relative !important;
            z-index: auto !important;
          }
        }
      `}} />

      {/* Modal Container */}
      <div 
        id="resume-modal"
        className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl flex flex-col shadow-2xl text-slate-100 overflow-hidden print:max-h-full print:border-none print:shadow-none print:bg-white print:text-black print:rounded-none"
      >
        {/* Header toolbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50 print:hidden">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-xs text-slate-400 font-mono ml-2">akula-saideep-cv.pdf</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-400 transition cursor-pointer"
              title="Print Resume (Saves as PDF)"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={handleDownloadMock}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition cursor-pointer"
              title="Download Text Version"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download TXT</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Document Area */}
        <div className="overflow-y-auto p-8 md:p-12 bg-white text-slate-800 font-sans print:p-0 print:text-black print:overflow-visible">
          {/* Printable Layout Wrapper */}
          <div className="max-w-3xl mx-auto space-y-6 print:space-y-4">
            
            {/* Header */}
            <div className="text-center space-y-2 border-b-2 border-slate-900 pb-4 print:border-black print:pb-2">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 print:text-2xl">{PERSONAL_INFO.name}</h1>
              <p className="text-sm font-semibold text-indigo-700 uppercase tracking-wider print:text-xs">
                {PERSONAL_INFO.title}
              </p>
              
              {/* Contact Grid */}
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-slate-600 font-medium print:text-black">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-500 print:text-black" />
                  {PERSONAL_INFO.email}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-slate-500 print:text-black" />
                  {PERSONAL_INFO.phone}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 print:text-black" />
                  {PERSONAL_INFO.location}
                </span>
              </div>

              {/* Links */}
              <div className="flex justify-center gap-4 text-xs text-indigo-600 font-semibold mt-1 print:text-black print:gap-6">
                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                  <Linkedin className="w-3.5 h-3.5 print:text-black" /> LinkedIn
                </a>
                <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                  <Github className="w-3.5 h-3.5 print:text-black" /> GitHub
                </a>
              </div>
            </div>

            {/* Profile Summary */}
            <div className="space-y-1.5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-0.5 print:border-black">
                Professional Summary
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed text-justify print:text-black">
                {PERSONAL_INFO.about}
              </p>
            </div>

            {/* Education */}
            <div className="space-y-2">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-0.5 print:border-black">
                Education
              </h2>
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between items-start print:text-black">
                    <div>
                      <h3 className="text-xs font-bold text-slate-900 print:text-black">{PERSONAL_INFO.education.college}</h3>
                      <p className="text-xs text-slate-700 font-medium print:text-black">{PERSONAL_INFO.education.degree}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-slate-900 print:text-black">2024 - 2028</p>
                      <span className="inline-block bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded text-[10px] print:border print:border-slate-300 print:bg-none print:text-black">
                        CGPA: {PERSONAL_INFO.education.cgpa} / 10
                      </span>
                    </div>
                  </div>
                  <p className="text-[10.5px] text-slate-600 print:text-black leading-relaxed">
                    <span className="font-semibold text-slate-700 print:text-black">Core Coursework:</span> Data Structures & Algorithms (DSA), Artificial Intelligence, Machine Learning Foundations, Deep Learning, Cloud Architecture, Database Management Systems (DBMS), Computer Networks, Software Engineering.
                  </p>
                </div>
                
                <div className="flex justify-between items-start print:text-black pt-1 border-t border-slate-100 print:border-none">
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 print:text-black">SR Edu Center</h3>
                    <p className="text-xs text-slate-700 font-medium print:text-black">Intermediate, MPC Board (Mathematics, Physics, Chemistry)</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-900 print:text-black">2022 - 2024</p>
                    <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded print:border print:border-slate-300 print:bg-none print:text-black">880 Marks</span>
                  </div>
                </div>

                <div className="flex justify-between items-start print:text-black pt-1 border-t border-slate-100 print:border-none">
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 print:text-black">St. Ann's High School</h3>
                    <p className="text-xs text-slate-700 font-medium print:text-black">Secondary School Certificate (SSC)</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-900 print:text-black">Class of 2022</p>
                    <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded print:border print:border-slate-300 print:bg-none print:text-black">9.0 CGPA</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Skills */}
            <div className="space-y-2">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-0.5 print:border-black">
                Technical Skills
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1.5 text-xs print:text-black">
                {SKILLS_DATA.map((cat, i) => (
                  <div key={i} className="space-y-0.5 print:text-black">
                    <h4 className="font-bold text-slate-800 text-[11px] print:text-black">{cat.title}:</h4>
                    <p className="text-slate-700 text-xs print:text-black">
                      {cat.skills.map(s => s.name).join(', ')}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic Projects */}
            <div className="space-y-2">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-0.5 print:border-black">
                Key Academic Projects
              </h2>
              <div className="space-y-3 print:text-black">
                {PROJECTS_DATA.map((proj) => (
                  <div key={proj.id} className="space-y-1 print:text-black">
                    <div className="flex justify-between items-baseline print:text-black mb-0.5">
                      <h3 className="text-xs font-bold text-slate-900 print:text-black">{proj.title}</h3>
                      <span className="text-[10px] font-mono text-indigo-700 bg-indigo-50/50 border border-indigo-100 px-2 py-0.5 rounded print:border print:border-slate-300 print:bg-none print:text-black">
                        {proj.technologies.join(' | ')}
                      </span>
                    </div>
                    <ul className="list-disc list-outside text-[11px] text-slate-700 pl-4 space-y-0.5 print:text-black">
                      {(projectBulletPoints[proj.id] || [proj.description]).map((bullet, bIdx) => (
                        <li key={bIdx} className="leading-relaxed print:text-black">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="space-y-2">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-0.5 print:border-black">
                Certifications
              </h2>
              <ul className="list-disc list-inside text-xs text-slate-700 space-y-1 print:text-black">
                {allCertifications.map((cert, index) => (
                  <li key={index} className="print:text-black leading-relaxed">
                    <span className="font-bold text-slate-800 print:text-black">{cert.title}</span> – Issued by {cert.issuer} ({cert.date})
                  </li>
                ))}
              </ul>
            </div>

            {/* Achievements & Activities */}
            <div className="space-y-2">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-0.5 print:border-black">
                Achievements & Extra-Curriculars
              </h2>
              <ul className="list-disc list-inside text-xs text-slate-700 space-y-1 print:text-black">
                <li className="print:text-black leading-relaxed">
                  <span className="font-bold text-slate-800 print:text-black">AWS Cloud Club Contributor & Lab Advisor (2025)</span> – Assisted in guiding students during peer labs on cloud fundamentals.
                </li>
                <li className="print:text-black leading-relaxed">
                  Presented IoT crop preservation system proposal at the <span className="font-bold text-slate-800 print:text-black">ThoughtSpire National Level Idea Presentation (2024)</span>.
                </li>
                <li className="print:text-black leading-relaxed">
                  Pitched AI-powered Smart Traffic Management concept at the <span className="font-bold text-slate-800 print:text-black">IdeaRush Intra-College Innovation Contest (2024)</span>.
                </li>
                <li className="print:text-black leading-relaxed">
                  Actively participated in <span className="font-bold text-slate-800 print:text-black">College Hackathons (2024 - 2025)</span>, collaborating to design and code functional web prototypes.
                </li>
                <li className="print:text-black leading-relaxed">
                  Multilingual in <span className="font-bold text-slate-800 print:text-black">Telugu (Native), English (Professional), and Hindi (Conversational)</span>.
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Footer info (only visible on screen) */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950 text-center text-[10px] text-slate-500 font-mono print:hidden flex justify-between items-center">
          <span>* Press 'Print / PDF' to save a clean single-page hardcopy document.</span>
          <span className="text-indigo-400 font-bold">Akula Saideep</span>
        </div>
      </div>
    </div>
  );
}
