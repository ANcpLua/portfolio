import { describe, expect, it } from 'vitest';

import {
  educationEntries,
  experienceEntries,
  projects,
  skills,
  stackChips,
} from './portfolio-data';

describe('portfolio content', () => {
  it('keeps the routed portfolio sections populated', () => {
    expect(projects.length).toBeGreaterThanOrEqual(6);
    expect(experienceEntries.length).toBeGreaterThanOrEqual(3);
    expect(educationEntries.length).toBeGreaterThanOrEqual(3);
    expect(skills).toContain('TypeScript & Angular');
    expect(stackChips.some((chip) => chip.label === 'Angular')).toBe(true);
  });

  it('provides icons and accessible image text for every project', () => {
    for (const project of projects) {
      expect(project.icon).toBeDefined();
      expect(project.image).toMatch(/^https?:\/\//);
      expect(project.imageAlt.length).toBeGreaterThan(8);
    }
  });
});
