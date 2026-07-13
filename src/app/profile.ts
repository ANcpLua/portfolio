/**
 * Single source of truth for the site owner's identity and the AI assistant's
 * knowledge base. `OWNER` drives the visible UI; `PROFILE_CONTEXT` is injected
 * into the server-side system prompt so answers stay grounded in real facts.
 */
export const OWNER = {
  name: 'Alexander Nachtmann',
  firstName: 'Alexander',
  role: 'Full-Stack Software Engineer',
  tagline: 'C# / .NET · TypeScript',
  location: 'Vienna, Austria',
  email: 'anfh22@outlook.com',
  github: 'https://github.com/ANcpLua',
  githubHandle: 'ANcpLua',
  linkedin: 'https://www.linkedin.com/in/alexander-nachtmann-581a96259/',
  nuget: 'https://www.nuget.org/profiles/ANcpLua',
} as const;

export const PROFILE_CONTEXT = `
# Alexander Nachtmann — Full-Stack Software Engineer (C# / .NET · TypeScript)

Based in Vienna, Austria. Contact: ${OWNER.email} · GitHub github.com/ANcpLua · NuGet nuget.org/profiles/ANcpLua · LinkedIn linkedin.com/in/alexander-nachtmann. Languages: German (native), English (fluent).

## Summary
Full-stack software engineer working primarily in C# / .NET, with React on the frontend. Professional experience at RUBICON IT (2023–2025, dual study) across ASP.NET Core, Blazor, Vue, and WPF, alongside a Computer Science degree. Maintains a substantial open-source portfolio — 48 published .NET packages with 340,000+ downloads — and contributes upstream to Microsoft's dotnet/aspnetcore and the OpenTelemetry project. Comfortable across the full stack: REST / OpenAPI backends, single-page frontends (React), automated testing, CI/CD, and containerised deployment. Especially drawn to event-driven architecture and messaging (RabbitMQ, MassTransit) and to observability (OpenTelemetry) — the areas he digs into for their own sake, well beyond anything a job has required.

## Experience
- RUBICON IT GmbH, Vienna (Aug 2023 – Jun 2025) — Fullstack C# Software Developer, dual study (alternating work/study phases). Built full-stack applications on C#, ASP.NET Core, Blazor, Vue 3, and WPF in an agile team. Backend with EF Core targeting SQL Server and PostgreSQL; messaging via Rebus and Hangfire. Contributed to architecture decisions, code reviews, and direct client communication.
- Autotransport-GmbH & Mietwagen-GmbH, Vienna (Dec 2015 – Mar 2021) — Commercial Director. Managed operations across two companies: budgeting, coordination, regulatory compliance.

## Open source & independent work (ANcpLua .NET ecosystem, May 2024 – present)
48 NuGet packages, 340,000+ downloads.
- ANcpLua.Agents: C#-native LLM agent framework on Microsoft Agent Framework — agent runtime, workflows, provider hosting (OpenAI, Anthropic, Azure AI Foundry), deterministic testing primitives (12 packages).
- ANcpLua.NET.Sdk family: opinionated MSBuild SDK that configures projects from the start — analyzers, nullable, polyfills auto-injected. Variants: Base, Web, Test.
- ANcpLua.Analyzers: 89 Roslyn diagnostics (AL1000–AL1899) with code fixes — correctness, reliability, async/threading, AOT/trim safety, ASP.NET Core, OpenTelemetry.
- ErrorOrX: source generator for ASP.NET Core Minimal APIs — endpoints with routing, validation, RFC 9457 problem details, OpenAPI metadata, Native AOT.
- ANcpLua.Roslyn.Utilities: 5-package fluent testing framework for Roslyn source generators and analyzers.
- Upstream contributions: PR #65419 to dotnet/aspnetcore (ValidationsGenerator fix for generic type parameters in Minimal API endpoints) and PR #4362 to opentelemetry-dotnet-contrib (Weaver-based semantic-conventions v1.41.0 regen with Stable/Incubating split).

## Notable NuGet packages (48 total, 340,000+ downloads combined)
The most-downloaded are the SDK and Roslyn families.
- ANcpLua.NET.Sdk (+ .Web, .Test, .Templates, .BitNet): opinionated MSBuild SDK that auto-injects analyzers, nullable, and polyfills — the most-downloaded family.
- ANcpLua.Roslyn.Utilities (+ .Sources, .Polyfills, .Testing, .Testing.Aot): a 5-package fluent testing framework for Roslyn source generators and analyzers.
- ANcpLua.Analyzers: 89 Roslyn diagnostics (AL1000–AL1899) with code fixes.
- ANcpLua.Agents (+ .Hosting.Anthropic, .Hosting.Azure, .Hosting.OpenAI, .Hosting.Foundry, .Workflows, .Testing, .Mcp, .Instrumentation): a C#-native LLM agent framework on the Microsoft Agent Framework.
- ErrorOrX (+ .Generators): source generator producing ASP.NET Core Minimal API endpoints with RFC 9457 problem details and Native AOT.
- SWEN3.Paperless.RabbitMq: typed RabbitMQ pub/sub messaging pipeline for a document-management system.
- MapsterExtensions.Generator: incremental source generator for typed Mapster mapping extensions.
- DotCov (+ .Nuke, .Tool): code-coverage tooling.
- CreatePdf.NET: PDF generation for .NET.
- Scalar.Kiota.Extension: Scalar API docs plus Kiota SDK generation.
- Qyl.OpenTelemetry.SemanticConventions: OpenTelemetry semantic-conventions packages.
(Per-package download counts change over time — don't quote exact per-package numbers; the combined total is 340,000+. If asked about a package not listed here, say you're not certain rather than guessing.)

## Education
- FH Technikum Wien, Vienna (Aug 2025 – 2027) — M.Sc. Software Engineering (in progress), current GPA 1.0 / 1.0.
- FH Technikum Wien, Vienna (Aug 2022 – Jun 2025) — B.Sc. Computer Science. Thesis: Monolith vs. Microservices — comparative analysis with implementation.

## Certifications
AI Skills Fest 2026 (Microsoft); Agents League: Creative Apps / Reasoning Agents / Enterprise Agents (Global AI Community, 2026); GitHub Foundations (GitHub, 2025–2028); Foundational C# with Microsoft (Microsoft / freeCodeCamp, 2023).

## Leadership
Study Program Representative, FH Technikum Wien (2023–2027, re-elected). External C# lecturer, FH Technikum Wien. 4,200+ hours tracked development (WakaTime).

## Technical depth
- AI & LLM agent infrastructure: C#-native agent framework on Microsoft Agent Framework 1.3; provider hosting (OpenAI, Anthropic, Azure AI Foundry); deterministic testing primitives; MCP server with 25+ tool classes; LLM orchestration, RAG chunking, prompt/skill systems. LLM evaluation: clinical-abstention-bench — a synthetic benchmark for diagnosis, certainty, and urgency under changing evidence, with reproducible .NET grading.
- Backend & APIs (.NET): ASP.NET Core 8/9/10, Minimal APIs, REST, gRPC, SSE streaming, background services; OpenAPI / RFC 9457; TypeSpec → OpenAPI → C# contract-first codegen; OpenTelemetry (OTLP tracing/metrics); Native AOT.
- Frontend & TypeScript: React 19, TypeScript 5, Vue 3 (Composition API, Quasar, Pinia) on ASP.NET Core in production at RUBICON. Angular: yes, professional — enterprise client work under NDA that can't be named — and it's a current, live skill, not a past chapter. He actively ships Angular: TourPlanner (full Angular SPA against a .NET 10 API, 429 tests, Docker) and this portfolio site (Angular SSR). If asked, answer in one short present-tense sentence: professional (NDA client) and actively shipping today. Never frame the professional Angular work as "old", "earlier", or "before" anything — it is not receding into the past. Never present THIS portfolio site as the measure of his Angular; if someone wants to judge the code, point them to TourPlanner (its 429-test suite is the stronger sample) — a personal site is built for speed, not as a ceiling on ability. Don't over-explain or apologise. Blazor Server + FluentUI; WPF (.NET 8). Shipped live frontends: atelierbella.art and the Ghostty Theme Catalog (interactive 463-theme browser, fuzzy search, keyboard navigation, live config apply).
- Data, storage & messaging: PostgreSQL, SQL Server, DuckDB; EF Core migrations and query optimisation; RabbitMQ, MassTransit, Wolverine, Rebus, Hangfire; event-driven architecture.
- Quality engineering (Roslyn): 89 diagnostics with code fixes; 5-package Roslyn.Utilities suite; incremental source generators; opinionated MSBuild SDK.
- Testing & DevOps: xUnit v3/v2, NUnit 4, TUnit, MSTest 4, bUnit (six frameworks benchmarked side-by-side); Testcontainers, WebApplicationFactory; multi-TFM (net8/9/10), 100% line coverage across 8+ libraries; mutation/snapshot/property-based testing; GitHub Actions matrix builds; Docker; Nuke build automation; deterministic builds, Source Link, .snupkg symbols.

## Selected public repositories
- ANcpLua/clinical-abstention-bench — clinical-AI evidence benchmark: does the model match diagnosis, certainty, and urgency to the evidence?
- ANcpLua/TourPlanner-Angular — Angular SPA + .NET 10 API, OpenAPI typed client, 429 tests, Docker.
- ANcpLua/ghostty-theme-catalog — interactive 463-theme browser, fuzzy search, keyboard-driven, live apply.
- ANcpLua/ANcpLua.NET.Sdk — opinionated MSBuild SDK auto-injecting analyzers, polyfills, nullable.
- ANcpLua/ANcpLua.Analyzers — 89 Roslyn diagnostics with code fixes.
- ANcpLua/ANcpLua.Agents — C#-native LLM agent framework, 12 packages on Microsoft Agent Framework.
- ANcpLua/ErrorOrX — source generator producing Minimal API endpoints with RFC 9457.
- ANcpLua/SWEN3.Paperless.RabbitMq — document-management messaging pipeline with typed RabbitMQ pub/sub consumers (published package).
`.trim();
