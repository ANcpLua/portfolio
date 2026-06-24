import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideArrowRight, LucideDynamicIcon } from '@lucide/angular';

import { ContactButtonComponent } from '../contact/contact-button.component';

/**
 * Shared call-to-action row: the contact button next to a "to projects" link.
 * Used by the hero and the contact card; `emphasis` covers their two shadow/hover styles.
 */
@Component({
  selector: 'app-cta-row',
  imports: [ContactButtonComponent, LucideDynamicIcon, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mt-2 flex flex-wrap items-center gap-3">
      <app-contact-button />

      <a
        routerLink="/projects"
        class="border-foreground/5 focus-ring group bg-background text-foreground inline-flex cursor-pointer items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-medium transition-colors"
        [class]="emphasis() === 'strong' ? 'hover:bg-foreground/4 shadow-2xl' : 'shadow-md/2'"
      >
        {{ label() }}
        <svg
          [lucideIcon]="icons.ArrowRight"
          class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
          aria-hidden="true"
        ></svg>
      </a>
    </div>
  `,
})
export class CtaRowComponent {
  readonly label = input.required<string>();
  readonly emphasis = input<'soft' | 'strong'>('soft');

  protected readonly icons = { ArrowRight: LucideArrowRight };
}
