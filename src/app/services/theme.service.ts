import { DOCUMENT } from '@angular/common';
import { DestroyRef, Injectable, inject, signal } from '@angular/core';

type ViewTransition = {
  finished: Promise<void>;
};

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => ViewTransition;
};

const THEME_STORAGE_KEY = 'theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT) as ViewTransitionDocument;
  private readonly destroyRef = inject(DestroyRef);
  private readonly darkSignal = signal(false);

  readonly isDark = this.darkSignal.asReadonly();

  constructor() {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    const shouldUseDark = stored ? stored === 'dark' : mediaQuery.matches;

    this.darkSignal.set(shouldUseDark);
    this.applyTheme(shouldUseDark);

    // Follow the system preference only while the user has not made an explicit choice.
    const onSchemeChange = (event: MediaQueryListEvent): void => {
      if (window.localStorage.getItem(THEME_STORAGE_KEY)) {
        return;
      }
      this.darkSignal.set(event.matches);
      this.applyTheme(event.matches);
    };
    mediaQuery.addEventListener('change', onSchemeChange);
    this.destroyRef.onDestroy(() => mediaQuery.removeEventListener('change', onSchemeChange));
  }

  toggle(event?: MouseEvent): void {
    const nextIsDark = !this.darkSignal();
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const supportsViewTransition = typeof this.document.startViewTransition === 'function';

    const updateTheme = (): void => {
      this.darkSignal.set(nextIsDark);
      this.applyTheme(nextIsDark);
      window.localStorage.setItem(THEME_STORAGE_KEY, nextIsDark ? 'dark' : 'light');
    };

    if (!event || !supportsViewTransition || prefersReducedMotion) {
      updateTheme();
      return;
    }

    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const radius = Math.hypot(
      Math.max(cx, window.innerWidth - cx),
      Math.max(cy, window.innerHeight - cy),
    );
    const root = this.document.documentElement;

    root.style.setProperty('--theme-cx', `${cx}px`);
    root.style.setProperty('--theme-cy', `${cy}px`);
    root.style.setProperty('--theme-r', `${radius}px`);
    root.dataset['themeAnim'] = '1';

    const transition = this.document.startViewTransition?.(updateTheme);
    transition?.finished.finally(() => {
      delete root.dataset['themeAnim'];
    });
  }

  private applyTheme(isDark: boolean): void {
    this.document.documentElement.classList.toggle('dark', isDark);
  }
}
