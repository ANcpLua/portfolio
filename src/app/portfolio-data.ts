import {
  LucideBot,
  LucideMap,
  LucidePackage,
  LucidePaintbrush,
  LucidePalette,
  LucideRadioTower,
  LucideScanLine,
  LucideShieldCheck,
  LucideWaypoints,
  LucideZap,
  type LucideIcon,
} from '@lucide/angular';

import { OWNER } from './profile';

export const emailAddress = OWNER.email;

export const SIMPLE_ICONS_BASE = 'https://cdn.simpleicons.org/';

export const simpleIconUrl = (slug: string): string => `${SIMPLE_ICONS_BASE}${slug}`;

export type Project = {
  id: string;
  icon: LucideIcon;
  name: string;
  title: string;
  description: string;
  meta: string;
  url: string;
  tint: string;
};

export const projects: Project[] = [
  {
    id: 'atelierbella',
    icon: LucidePaintbrush,
    name: 'atelierbella.art',
    title: 'Design-forward artist portfolio',
    description:
      'A polished, design-led portfolio I built and shipped for an artist — calm typography, considered motion, and a distinctive look.',
    meta: 'Live site · design-led frontend',
    url: 'https://atelierbella.art/',
    tint: '#e26d9a',
  },
  {
    id: 'dicom-fhir',
    icon: LucideScanLine,
    name: 'dicom-fhir-viewer',
    title: 'DICOM viewer with FHIR resources',
    description:
      'Upload DICOM scans, browse studies, and view medical images with window/level controls — plus auto-generated FHIR R4 resources. Hono + React + Orthanc.',
    meta: 'Medical imaging · React · FHIR R4',
    url: 'https://github.com/ANcpLua/dicom-fhir-viewer',
    tint: '#22b8cf',
  },
  {
    id: 'errororx',
    icon: LucideZap,
    name: 'ErrorOrX',
    title: 'Source generator for Minimal APIs',
    description:
      'Generates ASP.NET Core Minimal API endpoints with routing, validation, RFC 9457 problem details, OpenAPI metadata, and Native AOT support.',
    meta: 'Source generator · RFC 9457 · AOT',
    url: 'https://github.com/ANcpLua/ErrorOrX',
    tint: '#f4a259',
  },
  {
    id: 'ghostty',
    icon: LucidePalette,
    name: 'ghostty-theme-catalog',
    title: 'Interactive 463-theme browser',
    description:
      'A keyboard-driven catalog of 463 Ghostty themes with fuzzy search and live config apply — shipped on GitHub Pages.',
    meta: 'Interactive · fuzzy search · live apply',
    url: 'https://github.com/ANcpLua/ghostty-theme-catalog',
    tint: '#3a86ff',
  },
  {
    id: 'otel-semconv',
    icon: LucideWaypoints,
    name: 'Qyl.OpenTelemetry.SemanticConventions',
    title: 'OpenTelemetry semantic conventions for .NET',
    description:
      'Stable and incubating runtime constants, a source generator, analyzers, and a Nuke build component — typed OTel semantic conventions for C#.',
    meta: 'OpenTelemetry · C# · source generator',
    url: 'https://github.com/ANcpLua/Qyl.OpenTelemetry.SemanticConventions',
    tint: '#8b5cf6',
  },
  {
    id: 'agents',
    icon: LucideBot,
    name: 'ANcpLua.Agents',
    title: 'C#-native LLM agent framework',
    description:
      'An agent runtime, workflows, and provider hosting (OpenAI, Anthropic, Azure AI Foundry) on the Microsoft Agent Framework, with deterministic testing primitives — 12 packages.',
    meta: 'C# · Microsoft Agent Framework · 12 packages',
    url: 'https://github.com/ANcpLua/ANcpLua.Agents',
    tint: '#7c5cff',
  },
  {
    id: 'sdk',
    icon: LucidePackage,
    name: 'ANcpLua.NET.Sdk',
    title: 'Opinionated MSBuild SDK',
    description:
      'Configures .NET projects from the first build — analyzers, nullable, and polyfills auto-injected. Three variants: Base, Web, Test.',
    meta: 'MSBuild SDK · analyzers · polyfills',
    url: 'https://github.com/ANcpLua/ANcpLua.NET.Sdk',
    tint: '#512bd4',
  },
  {
    id: 'analyzers',
    icon: LucideShieldCheck,
    name: 'ANcpLua.Analyzers',
    title: '89 Roslyn diagnostics with code fixes',
    description:
      'Diagnostics AL1000–AL1899 across nine domains — correctness, reliability, async/threading, AOT/trim safety, ASP.NET Core, and OpenTelemetry — each with a code fix.',
    meta: 'Roslyn · 89 diagnostics + fixes',
    url: 'https://github.com/ANcpLua/ANcpLua.Analyzers',
    tint: '#2b9348',
  },
  {
    id: 'tourplanner',
    icon: LucideMap,
    name: 'TourPlanner-Angular',
    title: 'Angular 21 SPA on a .NET 10 API',
    description:
      'A full tour-planning single-page app with an OpenAPI-typed client against a .NET 10 backend — 429 tests across NUnit and Vitest, fully Dockerised.',
    meta: 'Angular 21 · .NET 10 · 429 tests',
    url: 'https://github.com/ANcpLua/TourPlanner-Angular',
    tint: '#dd0031',
  },
  {
    id: 'paperless-rabbitmq',
    icon: LucideRadioTower,
    name: 'SWEN3.Paperless.RabbitMq',
    title: 'Event-driven messaging pipeline',
    description:
      'Document-management ingestion and processing on typed RabbitMQ pub/sub consumers — a published package and a favourite playground for event-driven design.',
    meta: 'RabbitMQ · pub/sub · published',
    url: 'https://github.com/ANcpLua/SWEN3.Paperless.RabbitMq',
    tint: '#ff6600',
  },
];

export type ExperienceEntry = {
  company: string;
  role: string;
  period: string;
  slug?: string;
  brand?: string;
};

// `brand` is the icon-tile background colour used for slug-less rows (no simpleicons logo).
export const experienceEntries: ExperienceEntry[] = [
  {
    company: 'RUBICON IT GmbH',
    role: 'Fullstack C# Software Developer · dual study',
    period: 'Aug 2023 – Jun 2025',
    brand: '#512bd4',
  },
  {
    company: 'ANcpLua .NET Ecosystem',
    role: 'Open source · 48 packages, 340k+ downloads',
    period: 'May 2024 – Present',
    slug: 'nuget',
  },
  {
    company: 'Autotransport & Mietwagen GmbH',
    role: 'Commercial Director',
    period: 'Dec 2015 – Mar 2021',
    brand: '#0a0a0a',
  },
];

export type EducationEntry = {
  school: string;
  degree: string;
  period: string;
  slug?: string;
};

export const educationEntries: EducationEntry[] = [
  {
    school: 'FH Technikum Wien',
    degree: 'M.Sc. Software Engineering (in progress) · GPA 1.0',
    period: '2025 – 2027',
  },
  {
    school: 'FH Technikum Wien',
    degree: 'B.Sc. Computer Science',
    period: '2022 – 2025',
  },
];

export const skills: readonly string[] = [
  'C# / .NET',
  'ASP.NET Core',
  'Angular',
  'React & Vue',
  'TypeScript',
  'Messaging & Event-Driven (RabbitMQ)',
  'Observability (OpenTelemetry)',
  'Roslyn Analyzers & Source Generators',
  'EF Core · PostgreSQL',
  'REST / OpenAPI',
  'LLM Agent Infrastructure',
  'Testing (xUnit · NUnit · Vitest)',
  'Docker · Kubernetes · Terraform',
];

export type StackChip = {
  label: string;
  slug: string;
  bg: string;
  fg: string;
  iconUrl?: string;
};

export const stackChips: StackChip[] = [
  { label: '.NET', slug: 'dotnet', bg: '#512BD4', fg: '#ffffff' },
  { label: 'Angular', slug: 'angular', bg: '#dd0031', fg: '#ffffff' },
  { label: 'TypeScript', slug: 'typescript', bg: '#2F74C0', fg: '#ffffff' },
  { label: 'React', slug: 'react', bg: '#20232a', fg: '#61dafb' },
  { label: 'Vue', slug: 'vuedotjs', bg: '#35495e', fg: '#42b883' },
  { label: 'PostgreSQL', slug: 'postgresql', bg: '#336791', fg: '#ffffff' },
  { label: 'Docker', slug: 'docker', bg: '#2496ED', fg: '#ffffff' },
  { label: 'RabbitMQ', slug: 'rabbitmq', bg: '#ff6600', fg: '#ffffff' },
  { label: 'OpenTelemetry', slug: 'opentelemetry', bg: '#111111', fg: '#ffffff' },
  { label: 'Kubernetes', slug: 'kubernetes', bg: '#326CE5', fg: '#ffffff' },
  { label: 'Terraform', slug: 'terraform', bg: '#7B42BC', fg: '#ffffff' },
  { label: 'GitHub Actions', slug: 'githubactions', bg: '#2088FF', fg: '#ffffff' },
  { label: 'GitHub', slug: 'github', bg: '#181717', fg: '#ffffff' },
  { label: 'NuGet', slug: 'nuget', bg: '#004880', fg: '#ffffff' },
];

export type Certification = {
  title: string;
  issuer: string;
  image: string;
  url: string;
};

export const certifications: Certification[] = [
  {
    title: 'AI Skills Fest 2026',
    issuer: 'Microsoft',
    image: '/badges/ai-skills-fest.webp',
    url: 'https://www.credly.com/badges/9ed38dee-3ed1-41f7-a078-5f0a078a12ab/public_url',
  },
  {
    title: 'Agents League · Creative Apps',
    issuer: 'Global AI Community',
    image: '/badges/agents-creative.webp',
    url: 'https://globalai.community/badges/bd5f6d68-3a1c-48f2-94e8-30bfbd62260b/',
  },
  {
    title: 'Agents League · Reasoning Agents',
    issuer: 'Global AI Community',
    image: '/badges/agents-reasoning.webp',
    url: 'https://globalai.community/badges/023084b4-1e00-45b6-9217-0dd08eb1778b/',
  },
  {
    title: 'Agents League · Enterprise Agents',
    issuer: 'Global AI Community',
    image: '/badges/agents-enterprise.webp',
    url: 'https://globalai.community/badges/66d70a3c-7790-43b6-a26a-5936867b7b99/',
  },
];
