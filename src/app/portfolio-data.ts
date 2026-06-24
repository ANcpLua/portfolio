import {
  LucideBot,
  LucideChartLine,
  LucideCompass,
  LucideLayers,
  LucideSparkles,
  LucideWandSparkles,
  type LucideIcon,
} from '@lucide/angular';

export const emailAddress = 'hello@example.com';

export const SIMPLE_ICONS_BASE = 'https://cdn.simpleicons.org/';

export const simpleIconUrl = (slug: string): string => `${SIMPLE_ICONS_BASE}${slug}`;

export type Project = {
  id: string;
  icon: LucideIcon;
  iconLabel: string;
  title: string;
  description: string;
  meta: string;
  imageRatio: number;
  image: string;
  imageAlt: string;
};

export const projects: Project[] = [
  {
    id: 'loom',
    icon: LucideSparkles,
    iconLabel: 'LOOM',
    title:
      'An AI writing companion that thinks alongside you, allowing you to capture ideas, edits, and drafts in one focused space.',
    description:
      'I designed Loom, a focused writing surface where ideas, edits, and drafts coexist without the chat clutter.',
    meta: 'Design Engineer, 2024',
    imageRatio: 752 / 497,
    image:
      'https://cdn.dribbble.com/userupload/46128964/file/b92b9d268dd928642ca94bd49e32923a.jpg?resize=752x497&vertical=center',
    imageAlt: 'Loom AI writing companion mockup',
  },
  {
    id: 'atlas',
    icon: LucideCompass,
    iconLabel: 'Atlas Studio',
    title: 'A two week brand and product sprint for a creative studio.',
    description:
      'End to end identity, marketing site, and a small product surface designed to feel quietly confident across every touchpoint.',
    meta: 'Product & Brand Designer, 2025',
    imageRatio: 1024 / 768,
    image:
      'https://cdn.dribbble.com/userupload/24599416/file/original-1ae5075dcd129aebb16bdbca24b41ac7.png?resize=1024x768&vertical=center',
    imageAlt: 'Atlas Studio brand and product sprint mockup',
  },
  {
    id: 'rhythm',
    icon: LucideChartLine,
    iconLabel: 'Rhythm',
    title: 'Calm analytics for indie founders.',
    description:
      'A weekly digest that turns raw product data into a simple narrative. Built so you can read it on a Sunday with coffee.',
    meta: 'Founder & Designer, 2024',
    imageRatio: 1024 / 768,
    image:
      'https://cdn.dribbble.com/userupload/47357856/file/75841fa59f32f05ca6c5ddf02d08dfe6.png?resize=1024x768&vertical=center',
    imageAlt: 'Rhythm calm analytics mockup',
  },
  {
    id: 'groove',
    icon: LucideWandSparkles,
    iconLabel: 'Groove',
    title:
      'Reimagining the booking flow for a music school, asisting thousands of students in finding the right lessons.',
    description:
      'I led a redesign of the lesson booking experience, cutting drop off in half and making the schedule feel like a calendar people actually want to open.',
    meta: 'Lead Designer, 2023',
    imageRatio: 1024 / 768,
    image:
      'https://cdn.dribbble.com/userupload/43955214/file/original-d4cde1de803e84b97d8892e3444c04b0.png?resize=1024x768&vertical=center',
    imageAlt: 'Groove music school booking flow mockup',
  },
  {
    id: 'fieldnote',
    icon: LucideLayers,
    iconLabel: 'Fieldnote',
    title:
      'A pocket sized research tool for design teams that want to get out of their docs and into the world.',
    description:
      'Capture quotes, tag patterns, and synthesize themes in one place. The interface stays out of the way so the thinking can happen.',
    meta: 'Design Engineer, 2024',
    imageRatio: 1024 / 768,
    image:
      'https://cdn.dribbble.com/userupload/30310902/file/original-621e7fe47be9d11ee14544456c693bec.png?resize=1024x768&vertical=center',
    imageAlt: 'Fieldnote pocket sized research tool mockup',
  },
  {
    id: 'talkback',
    icon: LucideBot,
    iconLabel: 'Talkback',
    title: 'A friendlier interface for talking to language models.',
    description:
      'An exploration of how AI chat could feel less like a terminal and more like a conversation with a curious friend.',
    meta: 'Independent Project, 2025',
    imageRatio: 1024 / 768,
    image:
      'https://cdn.dribbble.com/userupload/16560717/file/original-c6f745d50302d66609bfe080f99f5396.png?resize=1024x768&vertical=center',
    imageAlt: 'Talkback friendlier AI chat interface mockup',
  },
];

export type ExperienceEntry = {
  company: string;
  role: string;
  period: string;
  slug?: string;
  brand?: string;
};

// `brand` is the icon-tile background colour used only for slug-less rows
// (those without a simpleicons logo); rows with a `slug` render the logo instead.
export const experienceEntries: ExperienceEntry[] = [
  {
    company: 'Linear',
    role: 'Senior Design Engineer',
    period: 'Mar 2024 - Present',
    slug: 'linear',
  },
  { company: 'Vercel', role: 'Product Designer', period: 'Aug 2022 - Feb 2024', slug: 'vercel' },
  { company: 'Stripe', role: 'Design Engineer', period: 'Jun 2021 - Jul 2022', slug: 'stripe' },
  { company: 'Figma', role: 'UI Engineer', period: 'Sep 2019 - May 2021', slug: 'figma' },
  { company: 'Notion', role: 'Product Designer', period: 'Jan 2018 - Aug 2019', slug: 'notion' },
  { company: 'Airbnb', role: 'Design Intern', period: 'May 2017 - Dec 2017', slug: 'airbnb' },
  { company: 'Freelance', role: 'Designer & Developer', period: '2015 - 2017', brand: '#0AE448' },
];

export type EducationEntry = {
  school: string;
  degree: string;
  period: string;
  slug?: string;
};

export const educationEntries: EducationEntry[] = [
  {
    school: 'Rhode Island School of Design',
    degree: 'BFA, Graphic Design',
    period: '2013 - 2017',
  },
  {
    school: 'Stanford University',
    degree: 'HCI Certificate, d.school',
    period: '2018',
  },
  {
    school: "Bruno Simon's Three.js Journey",
    degree: 'WebGL & Shaders',
    period: '2022',
  },
];

export const skills: readonly string[] = [
  'UI/UX Design',
  'Design Systems',
  'Prototyping & Motion',
  'Frontend Development',
  'TypeScript & Angular',
  'Interaction Design',
  'Performance Tuning',
  'Accessibility',
  'Visual Identity',
];

export type StackChip = {
  label: string;
  slug: string;
  bg: string;
  fg: string;
  iconUrl?: string;
};

export const stackChips: StackChip[] = [
  {
    label: 'Figma',
    slug: 'figma',
    bg: '#1f1f1f',
    fg: '#ffffff',
    iconUrl: 'https://svgl.app/library/figma.svg',
  },
  { label: 'Angular', slug: 'angular', bg: '#dd0031', fg: '#ffffff' },
  { label: 'TypeScript', slug: 'typescript', bg: '#2F74C0', fg: '#ffffff' },
  { label: 'Tailwind CSS', slug: 'tailwindcss', bg: '#2BBCF5', fg: '#ffffff' },
  { label: 'OGL', slug: 'webgl', bg: '#5b54ff', fg: '#ffffff' },
  { label: 'Matter.js', slug: 'javascript', bg: '#f7df1e', fg: '#0a0a0a' },
  { label: 'GitHub', slug: 'github', bg: '#181717', fg: '#ffffff' },
  { label: 'Vercel', slug: 'vercel', bg: '#0a0a0a', fg: '#ffffff' },
  { label: 'Cursor', slug: 'cursor', bg: '#111111', fg: '#ffffff' },
];

export type Polaroid = {
  id: string;
  rotate: number;
};

export const polaroids: Polaroid[] = [
  { id: 'a', rotate: -8 },
  { id: 'b', rotate: 6 },
  { id: 'c', rotate: -4 },
  { id: 'd', rotate: 7 },
  { id: 'e', rotate: -6 },
  { id: 'f', rotate: 5 },
];
