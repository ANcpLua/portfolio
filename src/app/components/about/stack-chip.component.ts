import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { simpleIconUrl, type StackChip } from '../../portfolio-data';

const CHIP_RADIUS = 14;
const ICON_RADIUS = 10;

/**
 * A single tech-stack pill (logo + label). The host element IS the pill, so the
 * Matter.js layer can measure and position each chip directly.
 */
@Component({
  selector: 'app-stack-chip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'inline-flex items-center gap-2 p-1 pr-2 text-[15px] font-medium tracking-tight sm:text-[16px] dark:ring-1 dark:ring-white/15',
    '[style.background-color]': 'chip().bg',
    '[style.color]': 'chip().fg',
    '[style.border-radius.px]': 'chipRadius',
  },
  template: `
    <span
      class="inline-flex h-8 w-8 items-center justify-center bg-white/95"
      [style.border-radius.px]="iconRadius"
      aria-hidden="true"
    >
      <img
        [src]="chip().iconUrl || iconUrl(chip().slug)"
        alt=""
        width="18"
        height="18"
        class="h-5 w-5"
        draggable="false"
      />
    </span>
    <span>{{ chip().label }}</span>
  `,
})
export class StackChipComponent {
  readonly chip = input.required<StackChip>();

  protected readonly chipRadius = CHIP_RADIUS;
  protected readonly iconRadius = ICON_RADIUS;
  protected readonly iconUrl = simpleIconUrl;
}
