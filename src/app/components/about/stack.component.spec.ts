import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';

import { StackComponent } from './stack.component';

type Harness = { reducedMotion: () => boolean };

function stubReducedMotion(matches: boolean): void {
  window.matchMedia = ((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
    dispatchEvent() {
      return false;
    },
  })) as unknown as typeof window.matchMedia;
}

describe('StackComponent', () => {
  const originalMatchMedia = window.matchMedia;

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
    TestBed.resetTestingModule();
  });

  it('starts with reducedMotion=false so the first client render matches the server', () => {
    // The server renders with window undefined (reducedMotion=false). If the constructor read
    // prefers-reduced-motion synchronously, a reduced-motion client would hydrate a different
    // DOM than was sent — a hydration mismatch. The initial value must stay false until render.
    stubReducedMotion(true);

    const fixture = TestBed.createComponent(StackComponent);
    const comp = fixture.componentInstance as unknown as Harness;

    expect(comp.reducedMotion()).toBe(false);
  });

  it('adopts the reduced-motion layout after the first render when the OS prefers it', async () => {
    stubReducedMotion(true);

    const fixture = TestBed.createComponent(StackComponent);
    const comp = fixture.componentInstance as unknown as Harness;

    fixture.detectChanges();
    await fixture.whenStable();

    expect(comp.reducedMotion()).toBe(true);
  });
});
