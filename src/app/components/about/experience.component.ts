import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { LucideChevronDown, LucideDynamicIcon } from '@lucide/angular';

import { experienceEntries } from '../../portfolio-data';
import { EntryRowComponent } from './entry-row.component';

const collapsedCount = 2.5;
const rowHeight = 64;
const rowGap = 8;

@Component({
  selector: 'app-experience',
  imports: [EntryRowComponent, LucideDynamicIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col gap-3">
      <h3 class="section-heading">Experience</h3>
      <div
        class="section-card relative overflow-hidden px-2 pt-2 sm:px-4 sm:pt-4"
        [class]="open() ? 'pb-2 sm:pb-4' : 'pb-0'"
      >
        <div
          class="experience-panel relative overflow-hidden"
          [style.max-height]="open() ? '900px' : collapsedHeight + 'px'"
        >
          <ul class="flex flex-col gap-2">
            @for (entry of entries; track $index) {
              <li
                app-entry-row
                variant="brand"
                [slug]="entry.slug"
                [brand]="entry.brand"
                [letter]="entry.company.charAt(0)"
                [title]="entry.company"
                [subtitle]="entry.role"
                [period]="entry.period"
                [minHeight]="rowHeight"
              ></li>
            }
          </ul>
        </div>

        @if (!open()) {
          <div
            aria-hidden="true"
            class="pointer-events-none absolute inset-x-0 bottom-0"
            [style.height.px]="rowHeight"
            style="backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); mask-image: linear-gradient(to bottom, transparent 0%, black 80%); -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 80%);"
          ></div>
        }

        @if (hiddenCount > 0) {
          <button
            type="button"
            (click)="open.update((value) => !value)"
            [attr.aria-expanded]="open()"
            class="focus-ring text-foreground flex w-full cursor-pointer items-center justify-center gap-1.5 bg-transparent text-[15px] font-medium tracking-tight"
            [class]="open() ? 'relative mt-4' : 'absolute inset-x-0 bottom-0 z-10 py-3 sm:py-4'"
          >
            {{ open() ? 'Show less' : 'Show ' + hiddenCount + ' more' }}
            <span class="inline-flex transition-transform duration-300" [class.rotate-180]="open()">
              <svg [lucideIcon]="icons.ChevronDown" class="h-4 w-4" aria-hidden="true"></svg>
            </span>
          </button>
        }
      </div>
    </div>
  `,
})
export class ExperienceComponent {
  protected readonly entries = experienceEntries;
  protected readonly rowHeight = rowHeight;
  protected readonly collapsedHeight =
    Math.floor(collapsedCount) * rowHeight +
    Math.floor(collapsedCount) * rowGap +
    (collapsedCount % 1) * rowHeight;
  protected readonly hiddenCount = experienceEntries.length - Math.floor(collapsedCount);
  protected readonly icons = { ChevronDown: LucideChevronDown };
  protected readonly open = signal(false);
}
