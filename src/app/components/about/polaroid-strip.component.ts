import { ChangeDetectionStrategy, Component } from '@angular/core';

import { polaroids } from '../../portfolio-data';

const PARALLAX_MAX_PX = 18;
const PARALLAX_FACTOR = 0.25;

@Component({
  selector: 'app-polaroid-strip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex w-full flex-wrap items-start justify-center gap-1 px-4 sm:gap-1.5 sm:px-8">
      @for (photo of photos; track photo.id; let index = $index) {
        <div
          class="polaroid-card relative aspect-[3/4] w-[clamp(6rem,11vw,9rem)] shrink-0 overflow-hidden rounded-2xl border-6 border-neutral-300/40 bg-white p-1.5 dark:border-white/15 dark:bg-neutral-900"
          [style.--rotate]="photo.rotate + 'deg'"
          [style.--delay]="50 + index * 80 + 'ms'"
          (pointermove)="move($event)"
          (pointerleave)="leave($event)"
        >
          <div
            aria-hidden="true"
            class="dotted-pattern text-foreground/15 relative h-full w-full overflow-hidden rounded-xl shadow-xl/5"
          ></div>
        </div>
      }
    </div>
  `,
})
export class PolaroidStripComponent {
  protected readonly photos = polaroids;

  protected move(event: PointerEvent): void {
    const element = event.currentTarget as HTMLElement;
    const rect = element.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = event.clientX - cx;
    const dy = event.clientY - cy;
    const tx = Math.max(-PARALLAX_MAX_PX, Math.min(PARALLAX_MAX_PX, dx * PARALLAX_FACTOR));
    const ty = Math.max(-PARALLAX_MAX_PX, Math.min(PARALLAX_MAX_PX, dy * PARALLAX_FACTOR));
    element.style.setProperty('--tx', `${tx}px`);
    element.style.setProperty('--ty', `${ty}px`);
  }

  protected leave(event: PointerEvent): void {
    const element = event.currentTarget as HTMLElement;
    element.style.setProperty('--tx', '0px');
    element.style.setProperty('--ty', '0px');
  }
}
