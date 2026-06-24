import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { simpleIconUrl } from '../../portfolio-data';

const ICON_TILE_RADIUS = 14;

/**
 * One row in the Education / Experience lists: an icon tile (simpleicons logo or a
 * single-letter fallback) next to a title / subtitle / period block. Rendered on the
 * host `<li>` so the parent `<ul>` keeps valid list semantics.
 * The `brand` variant uses a white tile with a ring; `plain` uses a bordered tile.
 */
@Component({
  selector: 'li[app-entry-row]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'bg-background border-foreground/5 flex items-center gap-4 rounded-3xl border p-2',
    '[style.min-height.px]': 'minHeight()',
  },
  template: `
    <span
      class="inline-flex h-12 w-12 shrink-0 items-center justify-center"
      [class]="
        variant() === 'brand'
          ? 'ring-foreground/8 bg-white ring-1 dark:ring-white/10'
          : 'border-foreground/15 border'
      "
      [style.border-radius.px]="tileRadius"
      [style.background-color]="variant() === 'brand' && !slug() ? (brand() ?? null) : null"
      aria-hidden="true"
    >
      @if (slug()) {
        <img [src]="iconUrl()" alt="" width="24" height="24" class="h-6 w-6" draggable="false" />
      } @else {
        <span
          [class]="
            variant() === 'brand'
              ? 'text-[18px] font-semibold tracking-tight text-white'
              : 'text-foreground/60 text-[18px] font-semibold tracking-tight'
          "
        >
          {{ letter() }}
        </span>
      }
    </span>
    <div class="flex min-w-0 flex-col">
      <span class="text-foreground text-[17px] font-semibold tracking-tight sm:text-[18px]">
        {{ title() }}
      </span>
      <span class="text-foreground/65 mt-0.5 text-[14px] tracking-tight sm:text-[15px]">
        {{ subtitle() }}
        <span class="text-foreground/30 mx-2">•</span>
        <span class="text-foreground/55">{{ period() }}</span>
      </span>
    </div>
  `,
})
export class EntryRowComponent {
  readonly slug = input<string>();
  readonly brand = input<string>();
  readonly letter = input.required<string>();
  readonly title = input.required<string>();
  readonly subtitle = input.required<string>();
  readonly period = input.required<string>();
  readonly variant = input<'plain' | 'brand'>('plain');
  readonly minHeight = input(64);

  protected readonly tileRadius = ICON_TILE_RADIUS;
  protected readonly iconUrl = computed(() => {
    const slug = this.slug();
    return slug ? simpleIconUrl(slug) : '';
  });
}
