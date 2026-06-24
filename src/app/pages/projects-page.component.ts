import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ContactCardComponent } from '../components/contact/contact-card.component';
import { ProjectsComponent } from '../components/projects/projects.component';

@Component({
  selector: 'app-projects-page',
  imports: [ContactCardComponent, ProjectsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main id="main-content" tabindex="-1" class="flex flex-1 flex-col">
      <section class="mx-auto w-full max-w-275 px-6 pt-44 pb-16 sm:px-10 sm:pt-100 sm:pb-20">
        <div class="fade-in flex flex-col items-center gap-5 text-center">
          <h1
            class="text-foreground font-serif text-[2.75rem] leading-[1.05] font-medium tracking-tight md:text-[3.25rem] lg:text-[3.75rem]"
          >
            My recent work
          </h1>
          <p
            class="text-foreground/65 max-w-[33ch] text-[20px] leading-[1.4] tracking-tight sm:text-[22px]"
          >
            Experiments, collaborations, and projects I'm especially proud to have shipped.
          </p>
        </div>
      </section>
      <app-projects />
      <app-contact-card />
      <div class="h-12 sm:h-16"></div>
    </main>
  `,
})
export class ProjectsPageComponent {}
