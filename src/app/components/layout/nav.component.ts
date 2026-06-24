import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  effect,
  inject,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { LucideDynamicIcon, LucideMoon, LucideSun } from '@lucide/angular';
import { filter } from 'rxjs';

import { ThemeService } from '../../services/theme.service';

type NavItem = {
  label: string;
  href: string;
};

const navItems: readonly NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
];

@Component({
  selector: 'app-nav',
  imports: [LucideDynamicIcon, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav aria-label="Primary" class="fixed top-6 left-1/2 z-50 -translate-x-1/2">
      <div
        class="border-foreground/8 bg-background flex items-center gap-1 rounded-full border p-1.5 shadow-sm"
      >
        <ul #list class="relative flex items-center gap-1">
          @if (pillRect(); as rect) {
            <span
              aria-hidden="true"
              class="nav-active-pill bg-foreground/5 ring-foreground/8 absolute rounded-full ring-1"
              [style.transform]="'translateX(' + rect.x + 'px)'"
              [style.width.px]="rect.width"
            ></span>
          }

          @for (item of items; track item.href) {
            <li #navItem class="relative">
              <a
                [routerLink]="item.href"
                [attr.aria-current]="isActive(item.href) ? 'page' : null"
                class="focus-ring relative inline-flex cursor-pointer items-center justify-center rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-300"
              >
                <span
                  class="relative z-10"
                  [class]="
                    isActive(item.href)
                      ? 'text-foreground'
                      : 'text-foreground/60 hover:text-foreground'
                  "
                >
                  {{ item.label }}
                </span>
              </a>
            </li>
          }
        </ul>

        <button
          type="button"
          (click)="toggleTheme($event)"
          [attr.aria-label]="theme.isDark() ? 'Switch to light theme' : 'Switch to dark theme'"
          [attr.aria-pressed]="theme.isDark()"
          class="focus-ring bg-background ring-foreground/8 relative inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full ring-1 transition-colors"
        >
          <span aria-hidden="true" class="relative h-4 w-4">
            <svg
              [lucideIcon]="icons.Sun"
              class="text-foreground absolute inset-0 h-4 w-4 transition-all duration-300"
              [class]="
                theme.isDark() ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-90 opacity-0'
              "
            ></svg>
            <svg
              [lucideIcon]="icons.Moon"
              class="text-foreground absolute inset-0 h-4 w-4 transition-all duration-300"
              [class]="
                !theme.isDark() ? 'scale-100 rotate-0 opacity-100' : 'scale-0 rotate-90 opacity-0'
              "
            ></svg>
          </span>
        </button>
      </div>
    </nav>
  `,
})
export class NavComponent {
  protected readonly items = navItems;
  protected readonly icons = { Moon: LucideMoon, Sun: LucideSun };
  protected readonly theme = inject(ThemeService);
  protected readonly pillRect = signal<{ x: number; width: number } | null>(null);

  private readonly list = viewChild<ElementRef<HTMLUListElement>>('list');
  private readonly navItemRefs = viewChildren<ElementRef<HTMLLIElement>>('navItem');
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    // Re-measure the active pill once the nav items render (and if they ever change).
    effect(() => {
      this.navItemRefs();
      this.scheduleMeasure();
    });

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.scheduleMeasure());

    if (typeof window !== 'undefined') {
      const onResize = (): void => this.scheduleMeasure();
      window.addEventListener('resize', onResize);
      this.destroyRef.onDestroy(() => window.removeEventListener('resize', onResize));
    }
  }

  protected isActive(href: string): boolean {
    const path = this.router.url.split('?')[0]?.split('#')[0] ?? '/';
    return href === '/' ? path === '/' : path === href || path.startsWith(`${href}/`);
  }

  protected toggleTheme(event: MouseEvent): void {
    this.theme.toggle(event);
  }

  private scheduleMeasure(): void {
    if (typeof window === 'undefined') {
      return;
    }
    window.requestAnimationFrame(() => this.measure());
  }

  private measure(): void {
    const listElement = this.list()?.nativeElement;
    const itemElements = this.navItemRefs();
    const activeIndex = this.items.findIndex((item) => this.isActive(item.href));
    const activeElement = activeIndex >= 0 ? itemElements[activeIndex]?.nativeElement : undefined;

    if (!listElement || !activeElement) {
      this.pillRect.set(null);
      return;
    }

    const listRect = listElement.getBoundingClientRect();
    const itemRect = activeElement.getBoundingClientRect();
    this.pillRect.set({
      x: itemRect.left - listRect.left,
      width: itemRect.width,
    });
  }
}
