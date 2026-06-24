import { ChangeDetectionStrategy, Component } from '@angular/core';

import { educationEntries } from '../../portfolio-data';
import { EntryRowComponent } from './entry-row.component';

@Component({
  selector: 'app-education',
  imports: [EntryRowComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col gap-3">
      <h3 class="text-foreground text-[15px] font-semibold tracking-tight">Education</h3>
      <div
        class="border-foreground/5 bg-foreground/2 dark:bg-foreground/5 relative rounded-4xl border p-2 sm:p-4"
      >
        <ul class="flex flex-col gap-2">
          @for (entry of entries; track $index) {
            <li
              app-entry-row
              [slug]="entry.slug"
              [letter]="entry.school.charAt(0)"
              [title]="entry.school"
              [subtitle]="entry.degree"
              [period]="entry.period"
            ></li>
          }
        </ul>
      </div>
    </div>
  `,
})
export class EducationComponent {
  protected readonly entries = educationEntries;
}
