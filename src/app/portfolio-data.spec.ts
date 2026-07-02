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
    expect(experienceEntries.length).toBeGreaterThanOrEqual(2);
    expect(educationEntries.length).toBeGreaterThanOrEqual(2);
    expect(skills).toContain('React');
    expect(stackChips.some((chip) => chip.label === '.NET')).toBe(true);
  });

  it('gives every project an icon, a link, and accessible text', () => {
    for (const project of projects) {
      expect(project.icon).toBeDefined();
      expect(project.url).toMatch(/^https?:\/\//);
      expect(project.title.length).toBeGreaterThan(8);
      expect(project.description.length).toBeGreaterThan(8);
    }
  });
});
