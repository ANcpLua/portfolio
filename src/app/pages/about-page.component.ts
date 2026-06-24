import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EducationComponent } from '../components/about/education.component';
import { ExperienceComponent } from '../components/about/experience.component';
import { PolaroidStripComponent } from '../components/about/polaroid-strip.component';
import { SkillsComponent } from '../components/about/skills.component';
import { StackComponent } from '../components/about/stack.component';
import { ContactCardComponent } from '../components/contact/contact-card.component';

@Component({
  selector: 'app-about-page',
  imports: [
    ContactCardComponent,
    EducationComponent,
    ExperienceComponent,
    PolaroidStripComponent,
    SkillsComponent,
    StackComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main id="main-content" tabindex="-1" class="flex flex-1 flex-col">
      <section class="mx-auto w-full max-w-312 pt-40 sm:pt-56">
        <app-polaroid-strip />
      </section>

      <section class="mx-auto w-full max-w-160 px-6 pt-20 pb-16 sm:px-10 sm:pt-28 sm:pb-24">
        <div class="fade-in" style="--fade-delay: 500ms">
          <div
            class="border-foreground/5 bg-foreground/1.5 dark:bg-foreground/3 rounded-4xl border p-8 sm:p-12"
          >
            <h1
              class="text-foreground font-serif text-[1.75rem] font-medium tracking-tight sm:text-[2rem]"
            >
              Hello! I'm
              <span class="border-foreground/30 border-b pb-0.5">Josh Mercer</span>.
            </h1>
            <div
              class="text-foreground/75 mt-8 space-y-6 text-[17px] leading-[1.7] tracking-tight sm:text-[18px]"
            >
              <p>
                A
                <strong class="text-foreground font-semibold"
                  >product designer and frontend engineer</strong
                >
                passionate about building intuitive, human-centered digital experiences. With a
                background in
                <strong class="text-foreground font-semibold">visual craft</strong> and
                <strong class="text-foreground font-semibold">interaction design</strong>, I bring a
                unique blend of design thinking and technical execution to every project.
              </p>
              <p>
                My journey into design began when I realized how often good user experience was
                missing from powerful tools. That led me to embrace
                <strong class="text-foreground font-semibold">user-centered design</strong> as both
                a mindset and a craft, one that balances clarity, creativity, and functionality.
              </p>
              <p>
                Currently leading design at small product teams shipping software for
                <strong class="text-foreground font-semibold">creative professionals</strong>, I'm
                always looking for opportunities to
                <strong class="text-foreground font-semibold">
                  shape thoughtful interfaces and build scalable design systems </strong
                >.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="mx-auto w-full max-w-[40rem] px-6 pb-20 sm:px-10 sm:pb-28">
        <div class="fade-in" style="--fade-delay: 100ms">
          <div class="flex flex-col gap-10">
            <app-experience />
            <app-education />
            <app-skills />
            <app-stack />
          </div>
        </div>
      </section>

      <app-contact-card />
      <div class="h-12 sm:h-16"></div>
    </main>
  `,
})
export class AboutPageComponent {}
