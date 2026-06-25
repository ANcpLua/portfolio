import { DOCUMENT } from '@angular/common';
import { Injectable, NgZone, inject } from '@angular/core';
import Lenis from 'lenis';

@Injectable({ providedIn: 'root' })
export class SmoothScrollService {
  private readonly document = inject(DOCUMENT);
  private readonly zone = inject(NgZone);
  private lenis?: Lenis;
  private rafId = 0;
  private clickHandler?: (event: MouseEvent) => void;

  start(): void {
    if (this.lenis || typeof window === 'undefined') {
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    this.zone.runOutsideAngular(() => {
      this.lenis = new Lenis({
        // 1.0 keeps the glide smooth but cuts the post-input settle time (was 1.6, well above
        // Lenis's 1.2 default) so scrolling tracks the wheel more tightly.
        duration: 1.0,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      const raf = (time: number): void => {
        this.lenis?.raf(time);
        this.rafId = window.requestAnimationFrame(raf);
      };

      this.rafId = window.requestAnimationFrame(raf);
      this.clickHandler = (event: MouseEvent): void => {
        const target = event.target as HTMLElement | null;
        const anchor = target?.closest<HTMLAnchorElement>('a[href^="#"]');
        if (!anchor) {
          return;
        }

        const href = anchor.getAttribute('href');
        if (!href || href === '#') {
          return;
        }

        const element = this.document.querySelector(href);
        if (!element) {
          return;
        }

        event.preventDefault();
        const targetElement = element as HTMLElement;
        this.lenis?.scrollTo(targetElement, { offset: -100 });
        // Move focus to the target so keyboard users land there (e.g. skip-to-content).
        targetElement.focus({ preventScroll: true });
      };

      this.document.addEventListener('click', this.clickHandler);
    });
  }

  destroy(): void {
    if (typeof window === 'undefined') {
      return;
    }

    if (this.clickHandler) {
      this.document.removeEventListener('click', this.clickHandler);
      this.clickHandler = undefined;
    }

    if (this.rafId) {
      window.cancelAnimationFrame(this.rafId);
      this.rafId = 0;
    }

    this.lenis?.destroy();
    this.lenis = undefined;
  }
}
