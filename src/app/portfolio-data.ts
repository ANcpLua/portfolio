import {
  LucideBot,
  LucideBraces,
  LucideCaptions,
  LucideCpu,
  LucideDownload,
  LucideFileText,
  LucideGauge,
  LucideMap,
  LucidePackage,
  LucidePaintbrush,
  LucidePalette,
  LucidePuzzle,
  LucideRadar,
  LucideRadioTower,
  LucideScanLine,
  LucideShieldCheck,
  LucideShuffle,
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
  /** A real screenshot of the live app (in /public/projects). Falls back to the icon when absent. */
  image?: string;
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
    image: '/projects/atelierbella.jpg',
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
    image: '/projects/dicom-fhir.jpg',
  },
  {
    id: 'abstention-bench',
    icon: LucideRadar,
    name: 'clinical-abstention-bench',
    title: 'Does a medical AI know when it doesn’t know?',
    description:
      'A benchmark for calibrated abstention: each clinical case is shown with and without its decisive finding, and models are scored on answering vs. bluffing. First real measurement: llama3.2:3b bluffed on 100% of degraded cases. Fail-closed .NET engine, offline-capable.',
    meta: 'LLM evaluation · calibrated abstention · .NET + Ollama',
    url: 'https://github.com/ANcpLua/clinical-abstention-bench',
    tint: '#e63946',
    image: '/projects/abstention-bench.png',
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
    image: '/projects/errororx.svg',
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
    image: '/projects/ghostty.jpg',
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
    image: '/projects/otel-semconv.svg',
  },
  {
    id: 'agents',
    icon: LucideBot,
    name: 'ANcpLua.Agents',
    title: 'C#-native LLM agent framework',
    description:
      'A lean toolkit for the Microsoft Agent Framework — runtime governance primitives, MAF-native OpenTelemetry, workflow helpers, and deterministic testing infrastructure. An instrumentation core, not provider facades. 6 packages.',
    meta: 'C# · Microsoft Agent Framework · 6 packages',
    url: 'https://github.com/ANcpLua/ANcpLua.Agents',
    tint: '#7c5cff',
    image: '/projects/agents.svg',
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
    image: '/projects/sdk.svg',
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
    image: '/projects/analyzers.svg',
  },
  {
    id: 'tourplanner',
    icon: LucideMap,
    name: 'TourPlanner-Angular',
    title: 'Full-stack TypeScript SPA on a .NET 10 API',
    description:
      'A full tour-planning single-page app with an OpenAPI-typed client against a .NET 10 backend — 429 tests across NUnit and Vitest, fully Dockerised.',
    meta: 'TypeScript SPA · .NET 10 · 429 tests',
    url: 'https://github.com/ANcpLua/TourPlanner-Angular',
    tint: '#dd0031',
    image: '/projects/tourplanner.svg',
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
    image: '/projects/paperless-rabbitmq.svg',
  },
  {
    id: 'dotcov',
    icon: LucideGauge,
    name: 'DotCov',
    title: 'Streaming Cobertura coverage toolkit',
    description:
      'A zero-dependency streaming Cobertura parser, a dotnet global tool, and a NUKE build component that gates CI on coverage — it handles 50 MB+ reports without ever loading the whole DOM.',
    meta: '.NET tool · NUKE · CI gate',
    url: 'https://github.com/ANcpLua/dotcov',
    tint: '#0891b2',
    image: '/projects/dotcov.svg',
  },
  {
    id: 'mapster',
    icon: LucideShuffle,
    name: 'MapsterExtensions.Generator',
    title: 'Typed mapping extensions, generated',
    description:
      'A source generator that scans your Mapster [Generate] configs and emits one strongly-typed extension per mapping — turning user.Adapt<UserDto>() into user.ToUserDto().',
    meta: 'Source generator · Mapster · C#',
    url: 'https://github.com/ANcpLua/MapsterExtensions.Generator',
    tint: '#f06595',
    image: '/projects/mapster.svg',
  },
  {
    id: 'save-media',
    icon: LucideDownload,
    name: 'save-media',
    title: 'Verified-only video downloader extension',
    description:
      'An MV3 extension for Chrome, Edge and Firefox that saves a video only when it can prove the bytes are a complete, playable file — direct MP4/WebM and plain HLS VOD remuxed to one MP4. No DRM bypass, no native host.',
    meta: 'Browser extension · TypeScript · MV3',
    url: 'https://github.com/ANcpLua/save-media',
    tint: '#4263eb',
    image: '/projects/save-media.png',
  },
  {
    id: 'yt-transcript',
    icon: LucideCaptions,
    name: 'yt-transcript',
    title: 'YouTube transcripts, extracted or transcribed locally',
    description:
      'An MV3 extension that pulls the caption track for any YouTube video into a clean reader panel — and when no captions exist, transcribes the audio locally with Whisper. On-device AI summaries via Chrome Prompt API or Ollama; no server, no telemetry.',
    meta: 'Browser extension · Whisper · on-device AI',
    url: 'https://github.com/ANcpLua/yt-transcript',
    tint: '#e03131',
    image: '/projects/yt-transcript.png',
  },
  {
    id: 'bitnet',
    icon: LucideCpu,
    name: 'ANcpLua.BitNet',
    title: "Microsoft's BitNet as a .NET IChatClient",
    description:
      "Wires Microsoft's 1.58-bit BitNet (bitnet.cpp / llama-server) into the Microsoft.Extensions.AI IChatClient abstraction — keyed DI, a health check, and a digest-pinned [BitNet] xUnit fixture. A cheap local model to test against.",
    meta: 'Microsoft.Extensions.AI · local LLM · xUnit',
    url: 'https://github.com/ANcpLua/ANcpLua.BitNet',
    tint: '#ae3ec9',
    image: '/projects/bitnet.svg',
  },
  {
    id: 'scalar-kiota',
    icon: LucideBraces,
    name: 'Scalar.Kiota.Extension',
    title: 'Kiota SDKs inside a Scalar API reference',
    description:
      'For ASP.NET Core minimal APIs: generates typed client SDKs with Kiota (TypeScript, C#, Python) and serves them inside a Scalar API reference — one call to add, one to map, Native AOT compatible.',
    meta: 'OpenAPI · Kiota · Scalar · AOT',
    url: 'https://github.com/ANcpLua/Scalar.Kiota.Extension',
    tint: '#0ca678',
    image: '/projects/scalar-kiota.svg',
  },
  {
    id: 'claude-plugins',
    icon: LucidePuzzle,
    name: 'ancplua-claude-plugins',
    title: 'A marketplace of multi-agent Claude Code plugins',
    description:
      'Thirteen opinionated Claude Code plugins for parallel agent orchestration — PR-to-merge ferrying, dependency migration, first-principles repo transformation, code review, and test-quality work. Every phase is gated: work only advances when the gate passes.',
    meta: 'Claude Code · 13 plugins · 30 agents',
    url: 'https://github.com/ANcpLua/ancplua-claude-plugins',
    tint: '#d97757',
    image: '/projects/claude-plugins.svg',
  },
  {
    id: 'autoinstrumentation',
    icon: LucideRadar,
    name: 'Qyl.OpenTelemetry.AutoInstrumentation',
    title: 'Zero-code .NET instrumentation, no profiler',
    description:
      'A NativeAOT-ready, vendor-neutral auto-instrumentation runtime in pure managed code — Roslyn-generated interceptors, DiagnosticListener, and a module-initializer bootstrap turn an ordinary PackageReference into traces and metrics. No CLR profiler, no IL rewrite.',
    meta: 'OpenTelemetry · Roslyn interceptors · AOT',
    url: 'https://github.com/ANcpLua/Qyl.OpenTelemetry.AutoInstrumentation',
    tint: '#0ea5e9',
    image: '/projects/autoinstrumentation.svg',
  },
  {
    id: 'createpdf',
    icon: LucideFileText,
    name: 'CreatePdf.NET',
    title: 'Fluent PDF creation for .NET',
    description:
      'A small, fluent .NET library for building PDFs — chain AddText, AddPixelText (bitmap glyphs) and AddLine, then SaveAsync. Text and bitmap rendering with optional OCR; ships on NuGet and Docker Hub for .NET 8/9/10.',
    meta: 'PDF · text + bitmap + OCR · NuGet',
    url: 'https://github.com/ANcpLua/CreatePdf.NET',
    tint: '#e8590c',
    image: '/projects/createpdf.svg',
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
  'React',
  'TypeScript',
  'Messaging & Event-Driven (RabbitMQ)',
  'Observability (OpenTelemetry)',
  'Roslyn Analyzers & Source Generators',
  'EF Core · PostgreSQL',
  'REST / OpenAPI',
  'LLM Agent Infrastructure',
  'LLM Evaluation & Calibrated Abstention',
  'Testing (xUnit · NUnit · Vitest)',
  'Docker · CI/CD',
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
  { label: 'React', slug: 'react', bg: '#20232a', fg: '#61dafb' },
  { label: 'TypeScript', slug: 'typescript', bg: '#2F74C0', fg: '#ffffff' },
  { label: 'Vue', slug: 'vuedotjs', bg: '#35495e', fg: '#42b883' },
  { label: 'PostgreSQL', slug: 'postgresql', bg: '#336791', fg: '#ffffff' },
  { label: 'Docker', slug: 'docker', bg: '#2496ED', fg: '#ffffff' },
  { label: 'RabbitMQ', slug: 'rabbitmq', bg: '#ff6600', fg: '#ffffff' },
  { label: 'OpenTelemetry', slug: 'opentelemetry', bg: '#111111', fg: '#ffffff' },
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
