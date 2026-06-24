import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  signal,
} from '@angular/core';
import { LucideCheck, LucideCopy, LucideDynamicIcon, LucideMail } from '@lucide/angular';

import { emailAddress } from '../../portfolio-data';

const COPIED_RESET_MS = 1600;

@Component({
  selector: 'app-contact-button',
  imports: [LucideDynamicIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      (click)="copyEmail()"
      (mouseenter)="open.set(true)"
      (mouseleave)="open.set(false)"
      (focus)="open.set(true)"
      (blur)="open.set(false)"
      [attr.aria-label]="ariaLabel()"
      class="focus-ring bg-foreground text-background relative inline-flex h-11 cursor-pointer items-center justify-center rounded-xl px-5 text-sm font-medium"
    >
      <span class="relative inline-flex items-center">
        @if (open()) {
          <span class="contact-button-label inline-flex items-center gap-2 whitespace-nowrap">
            <span class="relative inline-flex h-4 w-4 shrink-0 items-center justify-center">
              @if (copied()) {
                <svg [lucideIcon]="icons.Check" class="h-4 w-4" aria-hidden="true"></svg>
              } @else {
                <svg [lucideIcon]="icons.Copy" class="h-4 w-4" aria-hidden="true"></svg>
              }
            </span>
            <span class="tabular-nums">{{ email }}</span>
          </span>
        } @else {
          <span class="contact-button-label inline-flex items-center gap-2 whitespace-nowrap">
            <svg [lucideIcon]="icons.Mail" class="h-4 w-4 shrink-0" aria-hidden="true"></svg>
            <span>Contact</span>
          </span>
        }
      </span>
    </button>

    <span class="sr-only" role="status" aria-live="polite">
      @if (copied()) {
        Email copied to clipboard
      }
    </span>
  `,
})
export class ContactButtonComponent {
  private readonly destroyRef = inject(DestroyRef);
  private resetTimer = 0;

  protected readonly email = emailAddress;
  protected readonly icons = { Check: LucideCheck, Copy: LucideCopy, Mail: LucideMail };
  protected readonly open = signal(false);
  protected readonly copied = signal(false);

  protected readonly ariaLabel = computed(() => {
    if (this.copied()) {
      return 'Email copied';
    }
    return this.open() ? `Copy ${this.email}` : 'Show email';
  });

  constructor() {
    this.destroyRef.onDestroy(() => window.clearTimeout(this.resetTimer));
  }

  protected async copyEmail(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.email);
      this.showCopied();
    } catch {
      // Clipboard API unavailable (e.g. a non-secure context); the email stays
      // visible in the button label so it can still be copied manually.
    }
  }

  private showCopied(): void {
    this.copied.set(true);
    window.clearTimeout(this.resetTimer);
    this.resetTimer = window.setTimeout(() => this.copied.set(false), COPIED_RESET_MS);
  }
}
