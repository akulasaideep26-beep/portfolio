/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Skill {
  name: string;
  category: 'Languages' | 'Cloud & Technologies' | 'Soft Skills';
  level: 'Expert' | 'Advanced' | 'Intermediate' | 'Familiar';
  percentage: number; // For beautiful visual bar progress
  iconName: string;
}

export type ProjectType = 'Software' | 'Innovation';

export interface Project {
  id: string;
  title: string;
  description: string;
  type: ProjectType;
  category: string;
  status: 'Completed' | 'Prototype Completed' | 'Concept Presented';
  technologies: string[];
  image: string;
  github?: string;
  liveDemo?: string;
  // Specific sections for Innovation Projects
  conceptDetails?: {
    overview: string;
    details: string[];
    futureScopeOrDevelopment: string[];
  };
}

export interface Certification {
  id?: string;
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  iconName: string;
}

export interface InnovationEvent {
  name: string;
  subtitle: string;
  description: string;
  date: string;
  role: string;
  outcomes: string[];
  iconName: string;
}

export interface TimelineItem {
  id: string;
  date: string;
  title: string;
  institution: string;
  description: string;
  gpaOrScore?: string;
  type: 'education' | 'experience' | 'milestone';
  iconName: string;
}

export interface Stat {
  label: string;
  value: string;
  suffix: string;
  description: string;
  iconName: string;
}
