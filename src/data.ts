/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Skill, Project, Certification, InnovationEvent, TimelineItem, Stat } from './types';

export const personalInfo = {
  name: 'Akula Saideep',
  role: 'B.Tech CSE (AI & ML) Student',
  headline: 'Aspiring Software Engineer | AI & ML Enthusiast | Cloud Learner | Innovation Enthusiast',
  location: 'Warangal, Telangana, India',
  email: 'akulasaideep26@gmail.com',
  phone: '7382646103',
  linkedin: 'https://www.linkedin.com/in/akulasaideep/',
  github: 'https://github.com/akulasaideep26-beep',
  education: {
    college: 'Vaagdevi College of Engineering',
    degree: 'B.Tech in Computer Science Engineering (AI & ML)',
    cgpa: '8.39',
    currentYear: '3rd Year',
    batch: '2024 - 2028',
  },
  avatar: 'https://github.com/akulasaideep26-beep.png',
  objective: 'Passionate third-year Computer Science Engineering student specializing in AI & Machine Learning. Seeking software development/engineering internship opportunities to contribute, learn, and grow.',
  languages: ['Telugu', 'English', 'Hindi'],
};

export const stats: Stat[] = [
  {
    label: 'CGPA',
    value: '8.39',
    suffix: '/10',
    description: 'Academic consistency at Vaagdevi College',
    iconName: 'GraduationCap',
  },
  {
    label: 'Projects',
    value: '6',
    suffix: ' Featured',
    description: 'H-MOTION AI, Academic Assistant, Clipboard & IoT',
    iconName: 'Code',
  },
  {
    label: 'Achievements',
    value: '3',
    suffix: ' Featured',
    description: 'ThoughtSpire, AWS Club Contributor, multilingual',
    iconName: 'Lightbulb',
  },
  {
    label: 'Certificates',
    value: '3',
    suffix: ' Earned',
    description: 'AWS Cloud Foundations, Cisco Python & Cybersecurity',
    iconName: 'Award',
  },
];

export const skills: Skill[] = [
  // Languages
  { name: 'Python', category: 'Languages', level: 'Advanced', percentage: 90, iconName: 'Terminal' },
  { name: 'Java', category: 'Languages', level: 'Intermediate', percentage: 75, iconName: 'Coffee' },
  { name: 'C', category: 'Languages', level: 'Intermediate', percentage: 70, iconName: 'Cpu' },
  { name: 'Kotlin', category: 'Languages', level: 'Intermediate', percentage: 70, iconName: 'Smartphone' },
  
  // Cloud & Technologies
  { name: 'AWS Cloud Services', category: 'Cloud & Technologies', level: 'Intermediate', percentage: 80, iconName: 'Cloud' },
  { name: 'AI & Machine Learning', category: 'Cloud & Technologies', level: 'Advanced', percentage: 85, iconName: 'Brain' },
  { name: 'Computer Vision & YOLOv8', category: 'Cloud & Technologies', level: 'Advanced', percentage: 85, iconName: 'Eye' },
  { name: 'Generative AI & LLMs', category: 'Cloud & Technologies', level: 'Advanced', percentage: 80, iconName: 'Sparkles' },
  { name: 'Basic Cybersecurity', category: 'Cloud & Technologies', level: 'Intermediate', percentage: 70, iconName: 'ShieldCheck' },
  { name: 'DSA', category: 'Cloud & Technologies', level: 'Advanced', percentage: 80, iconName: 'Code' },
  
  // Soft Skills
  { name: 'Leadership', category: 'Soft Skills', level: 'Advanced', percentage: 85, iconName: 'Users' },
  { name: 'Communication', category: 'Soft Skills', level: 'Advanced', percentage: 90, iconName: 'MessageSquare' },
  { name: 'Teamwork', category: 'Soft Skills', level: 'Advanced', percentage: 85, iconName: 'UserCheck' },
  { name: 'Quick Learning', category: 'Soft Skills', level: 'Expert', percentage: 95, iconName: 'Zap' },
  { name: 'Time Management', category: 'Soft Skills', level: 'Advanced', percentage: 80, iconName: 'Clock' },
];

export const projects: Project[] = [
  {
    id: 'hmotion-ai',
    title: 'H-MOTION AI: Real-Time Hand Gesture Recognition',
    description: 'A real-time hand gesture recognition platform designed to recognize hand gestures using computer vision and AI and translate them into meaningful interactions.',
    type: 'Software',
    category: 'AI / Computer Vision / Full Stack',
    status: 'Completed',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Node.js', 'Express', 'MongoDB'],
    image: '/src/assets/images/hmotion_ai_project_1788197052160.jpg',
    github: 'https://github.com/akulasaideep26-beep/hmotion-ai',
    liveDemo: '#sim-hmotion',
  },
  {
    id: 'academic-doc-assistant',
    title: 'AI-Powered Academic Documentation & Accreditation Assistant',
    description: 'An intelligent academic documentation and accreditation platform designed to automate accreditation workflows, analyze compliance gaps, and streamline institutional reporting.',
    type: 'Software',
    category: 'Generative AI / Intelligent Document Management',
    status: 'Completed',
    technologies: ['Python', 'Generative AI', 'NLP', 'Vector Embeddings', 'Flask', 'MongoDB', 'React', 'Tailwind CSS'],
    image: '/src/assets/images/academic_doc_project_1788197069248.jpg',
    github: 'https://github.com/akulasaideep26-beep/academic-doc-assistant',
    liveDemo: '#sim-academic-doc',
  },
  {
    id: 'clipboard',
    title: 'Intelligent Clipboard Manager',
    description: 'Smart clipboard tracker utilizing NLP algorithms to parse text assets, isolate code blocks, and sync securely to AWS S3.',
    type: 'Software',
    category: 'Cloud & Desktop Software',
    status: 'Completed',
    technologies: ['Python', 'SQLite', 'AWS S3', 'Flask', 'NLP'],
    image: '/src/assets/images/clipboard_project_1782831536096.jpg',
    github: 'https://github.com/akulasaideep26-beep/intelligent-clipboard-code',
    liveDemo: '#sim-clipboard',
  },
  {
    id: 'fermart',
    title: 'Fermart: Fertilizer & Pesticide Delivery for Farmers',
    description: 'A proposed agricultural concept designed to connect regional Indian farmers directly with certified sellers, including soil advisory widgets.',
    type: 'Innovation',
    category: 'Innovation Concept',
    status: 'Concept Presented',
    technologies: ['Android UX Design', 'Figma Mockups', 'Agricultural IoT', 'Soil Science'],
    image: '/src/assets/images/fertilizer_project_1782831731174.jpg',
    conceptDetails: {
      overview: 'Fermart is a proposed direct-to-farm agricultural concept designed to modernize the fertilizer and pesticide supply chain for rural Indian farmers. By enabling direct communication between smallholders and certified dealers, it aims to eliminate predatory pricing by middlemen while promoting sustainable farming through localized soil-health advisory widgets.',
      details: [
        'Direct Sourcing Protocol: Designed to bypass local distribution cartels, providing direct access to verified chemical and biological fertilizer distributors.',
        'Soil Advisory Widget: A conceptual soil-health interface calculating and displaying localized NPK (Nitrogen, Phosphorus, Potassium) recommendations based on user-inputted lab reports.',
        'Price Standardization: Real-time digital catalog models showing uniform government-regulated or authorized supplier pricing to prevent rural exploitation.',
        'Accessible Multilingual UI/UX: Custom Figma prototypes designed specifically with localized iconography and large touch targets to ensure accessibility for varying digital literacy levels.'
      ],
      futureScopeOrDevelopment: [
        'Localized IoT Sensor Nodes: Integrating cheap, solar-powered soil moisture and pH sensors to provide real-time fertilizer recommendation alerts via basic SMS/app networks.',
        'Cooperative Group Sourcing: Enabling nearby farmers to aggregate orders for bulk purchases, lowering transport costs and maximizing bulk discounts.',
        'AI Crop Disease Diagnostics: Expanding the digital framework to support a camera-based pest/disease classifier, recommending immediate eco-friendly treatment regimens.',
        'Government Subsidy Sync: Integrating public API interfaces to syndicate and display crop-specific state subsidies directly inside the farmer’s product cart.'
      ]
    }
  },
  {
    id: 'traffic-management',
    title: 'AI-Powered Smart Traffic Management System',
    description: 'OpenCV & YOLOv8 model computing vehicle counts from camera streams to assign signal timing dynamically.',
    type: 'Innovation',
    category: 'AI Innovation Concept',
    status: 'Concept Presented',
    technologies: ['Python', 'OpenCV', 'YOLOv8', 'PyTorch'],
    image: '/src/assets/images/traffic_project_1782831563191.jpg',
    conceptDetails: {
      overview: 'Proposed as an artificial intelligence and computer vision infrastructure solution. Rather than static timers, this system dynamically adjusts traffic light signals based on real-time vehicle counts from intersection cameras.',
      details: [
        'Dynamic traffic routing algorithms using real-time vehicle density estimates from camera footage.',
        'Vehicle counting and classification utilizing YOLOv8 and PyTorch models.',
        'Signal timing optimization computed dynamically to minimize average waiting time.'
      ],
      futureScopeOrDevelopment: [
        'Simulation testing using SUMO (Simulation of Urban MObility) to evaluate grid congestion mitigation rates.',
        'Adding vehicle-to-infrastructure (V2I) communication nodes to alert drivers of real-time signal changes.'
      ]
    }
  },
  {
    id: 'food-preservation',
    title: 'Smart Low-Cost Food Preservation Solution',
    description: 'IoT array measuring atmospheric decay triggers and predicting agricultural produce shelf-life with tinyML parameters.',
    type: 'Innovation',
    category: 'Innovation Prototype',
    status: 'Prototype Completed',
    technologies: ['C/C++', 'ESP32', 'DHT11 Sensors', 'Flask', 'tinyML'],
    image: '/src/assets/images/food_preservation_project_1782831548300.jpg',
    conceptDetails: {
      overview: 'Designed as an IoT and tinyML-based smart food preservation monitor. The system measures environmental parameters inside preservation vessels and runs tinyML models locally to predict the deterioration rate and remaining shelf-life of produce.',
      details: [
        'DHT11 sensor array tracking temperature and humidity triggers.',
        'ESP32 microcontroller processing telemetry and running micro-regression models for prediction.',
        'Flask dashboard for remote agricultural logistics tracking and push alerts.'
      ],
      futureScopeOrDevelopment: [
        'Optimizing clay evaporative cooling structures with automated micro-misting actuators.',
        'Integrating cellular communication modules (GSM/GPRS) for remote off-grid farms.'
      ]
    }
  }
];

export const certifications: Certification[] = [
  {
    id: 'aws-cloud-practitioner',
    name: 'AWS Cloud Practitioner Essentials',
    issuer: 'Amazon Web Services (AWS)',
    date: 'June 07, 2026',
    iconName: 'Cloud',
  },
  {
    id: 'unicef-digital-productivity',
    name: 'Digital Productivity with AI',
    issuer: 'UNICEF (YuWaah! Passport to Earning)',
    date: 'March 23, 2026',
    iconName: 'Award',
  },
  {
    id: 'cisco-python-essentials',
    name: 'Python Essentials 1',
    issuer: 'Cisco Networking Academy & Python Institute',
    date: '24 Oct 2025',
    iconName: 'Terminal',
  }
];

export const innovationEvents: InnovationEvent[] = [
  {
    name: 'ThoughtSpire',
    subtitle: 'National Level Idea Presentation Competition',
    description: 'Presented a farm-IoT preservation model at the ThoughtSpire Innovation Event, utilizing low-cost IoT arrays and predictive analytics.',
    date: '2024',
    role: 'Presenter & Concept Architect',
    outcomes: [
      'Presented farm-IoT preservation models showcasing ESP32 and DHT11 sensory predictions.',
      'Refined professional presentation skills and demonstrated practical problem-solving using local materials.',
      'Engaged with regional innovation leaders and fellow tech researchers.'
    ],
    iconName: 'Lightbulb',
  },
  {
    name: 'College Hackathons',
    subtitle: 'Intense Software Development Sprints',
    description: 'Actively participated in campus hackathons, collaborating in teams to engineer functional software prototypes in short spans of 24 to 36 hours.',
    date: '2024 - 2025',
    role: 'Full Stack Developer',
    outcomes: [
      'Developed core modules for the Intelligent Clipboard Management System during an academic software sprint.',
      'Excelled in rapid team prototyping, agile coding under tight deadlines, and Git version control.',
      'Explored integration of SQLite with light Flask backend endpoints under pressure.'
    ],
    iconName: 'Award',
  },
  {
    name: 'IdeaRush',
    subtitle: 'Intra-College Innovation Contest',
    description: 'Submitted and pitched tech-driven solutions for civic and environmental challenges. Showcased the AI Smart Traffic Management System concept.',
    date: '2024',
    role: 'Lead AI Concept Designer',
    outcomes: [
      'Conceptualized the acoustic sensor emergency vehicle override module for signal lights.',
      'Analyzed congestion flow parameters and mapped camera vehicle counts with signal timing optimization formulas.',
      'Achieved appreciation from faculty for integrating AI theory into practical city civic solutions.'
    ],
    iconName: 'Zap',
  }
];

export const timelineItems: TimelineItem[] = [
  {
    id: 'aws-advisor',
    date: '2025',
    title: 'AWS Cloud Club Contributor & Lab Advisor',
    institution: 'AWS Cloud Club',
    description: 'Served as an advisor for peer labs, guiding students on cloud fundamentals, IAM policies, and cloud infrastructure setup.',
    type: 'milestone',
    iconName: 'Cloud',
  },
  {
    id: 'aws-foundations',
    date: '2025',
    title: 'AWS Academy Graduate - AWS Cloud Foundations',
    institution: 'Amazon Web Services (AWS)',
    description: 'Acquired foundational knowledge on Amazon Web Services cloud architecture, core compute services (EC2, Lambda), virtual networking (VPC), storage (S3), and cloud security.',
    type: 'milestone',
    iconName: 'Cloud',
  },
  {
    id: 'vaagdevi-edu',
    date: '2024 - 2028 (Expected)',
    title: 'B.Tech in Computer Science & Engineering (AI & ML)',
    institution: 'Vaagdevi College of Engineering',
    description: 'Specializing in artificial intelligence, machine learning, deep learning, databases, and general software engineering. Actively participating in technical committees and college innovation events.',
    gpaOrScore: 'CGPA: 8.39 / 10.0',
    type: 'education',
    iconName: 'GraduationCap',
  },
  {
    id: 'thoughtspire-event',
    date: '2024',
    title: 'ThoughtSpire Idea Presentation',
    institution: 'National Innovation Forum',
    description: 'Presented a farm-IoT preservation model at the ThoughtSpire National Innovation Event, highlighting low-cost IoT arrays and sustainable designs.',
    type: 'milestone',
    iconName: 'Lightbulb',
  },
  {
    id: 'cisco-python',
    date: '2024',
    title: 'PCAP: Certified Associate in Python Programming',
    institution: 'Python Institute & Cisco',
    description: 'Validated advanced object-oriented programming concepts, multi-dimensional array manipulation, file handling, and algorithm implementation standards in Python.',
    type: 'milestone',
    iconName: 'Terminal',
  },
  {
    id: 'cisco-cyber',
    date: '2024',
    title: 'Introduction to Cybersecurity & Packet Tracer',
    institution: 'Cisco Networking Academy',
    description: 'Trained on modern encryption principles, digital signature safety, buffer overflow awareness, and network firewall configurations.',
    type: 'milestone',
    iconName: 'ShieldAlert',
  },
  {
    id: 'sr-edu',
    date: '2022 - 2024',
    title: 'Intermediate MPC',
    institution: 'SR Edu Center',
    description: 'Completed Higher Secondary Education focusing on Mathematics, Physics, and Chemistry (MPC).',
    gpaOrScore: 'Score: 880 Marks',
    type: 'education',
    iconName: 'BookOpen',
  },
  {
    id: 'st-anns-edu',
    date: 'Class of 2022',
    title: 'Secondary School Certificate (SSC)',
    institution: "St. Ann's High School",
    description: 'Completed secondary education with high honors and academic merit.',
    gpaOrScore: 'GPA: 9.0 / 10.0 CGPA',
    type: 'education',
    iconName: 'School',
  },
];

export const PERSONAL_INFO = {
  ...personalInfo,
  title: personalInfo.role,
  about: personalInfo.objective
};

export const PROJECTS_DATA = projects;

export const SKILLS_DATA = [
  { title: 'Programming Languages', skills: skills.filter(s => s.category === 'Languages') },
  { title: 'Cloud & Tech', skills: skills.filter(s => s.category === 'Cloud & Technologies') },
  { title: 'Soft Skills', skills: skills.filter(s => s.category === 'Soft Skills') },
];

export const CERTIFICATIONS_DATA = certifications.map(cert => ({
  ...cert,
  title: cert.name,
  credentialId: ''
}));

