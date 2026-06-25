import { ChangeDetectionStrategy, Component } from '@angular/core';

import { educationEntries } from '../../portfolio-data';
import { EntryRowComponent } from './entry-row.component';

@Component({
  selector: 'app-education',
  imports: [EntryRowComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col gap-3">
      <h3 class="section-heading">Education</h3>
      <div class="section-card relative p-2 sm:p-4">
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
