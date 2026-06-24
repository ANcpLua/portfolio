import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ContactCardComponent } from '../components/contact/contact-card.component';
import { HeroComponent } from '../components/hero/hero.component';
import { ProjectsComponent } from '../components/projects/projects.component';

@Component({
  selector: 'app-home-page',
  imports: [ContactCardComponent, HeroComponent, ProjectsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main id="main-content" tabindex="-1" class="flex flex-1 flex-col gap-20 sm:gap-28">
      <app-hero />
      <app-projects [withHeadline]="true" [viewMoreVisible]="true" />
      <app-contact-card />
      <div class="h-12 sm:h-16"></div>
    </main>
  `,
})
export class HomePageComponent {}
