import { ChangeDetectionStrategy, Component } from '@angular/core';

import { skills } from '../../portfolio-data';

@Component({
  selector: 'app-skills',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col gap-3">
      <h3 class="section-heading">What I do</h3>
      <div class="section-card p-2 sm:p-4">
        <div class="flex flex-wrap gap-3">
          @for (skill of items; track skill) {
            <span
              class="border-foreground/8 bg-background text-foreground/85 rounded-full border px-4 py-2 text-[14px] tracking-tight sm:text-[15px]"
            >
              {{ skill }}
            </span>
          }
        </div>
      </div>
    </div>
  `,
})
export class SkillsComponent {
  protected readonly items = skills;
}
