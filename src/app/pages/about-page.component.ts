import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EducationComponent } from '../components/about/education.component';
import { ExperienceComponent } from '../components/about/experience.component';
import { CertificationsStripComponent } from '../components/about/certifications-strip.component';
import { SkillsComponent } from '../components/about/skills.component';
import { StackComponent } from '../components/about/stack.component';
import { ContactCardComponent } from '../components/contact/contact-card.component';

@Component({
  selector: 'app-about-page',
  imports: [
    ContactCardComponent,
    EducationComponent,
    ExperienceComponent,
    CertificationsStripComponent,
    SkillsComponent,
    StackComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main id="main-content" tabindex="-1" class="flex flex-1 flex-col">
      <section class="mx-auto w-full max-w-312 pt-40 sm:pt-56">
        <app-certifications-strip />
      </section>

      <section class="mx-auto w-full max-w-160 px-6 pt-20 pb-16 sm:px-10 sm:pt-28 sm:pb-24">
        <div class="fade-in" style="--fade-delay: 500ms">
          <div
            class="border-foreground/5 bg-foreground/1.5 dark:bg-foreground/3 rounded-4xl border p-8 sm:p-12"
          >
            <h1
              class="text-foreground font-serif text-[1.75rem] font-medium tracking-tight sm:text-[2rem]"
            >
              Hi! I'm
              <span class="border-foreground/30 border-b pb-0.5">Alexander Nachtmann</span>.
            </h1>
            <div
              class="text-foreground/75 mt-8 space-y-6 text-[17px] leading-[1.7] tracking-tight sm:text-[18px]"
            >
              <p>
                A
                <strong class="text-foreground font-semibold">full-stack software engineer</strong>
                in Vienna working primarily in
                <strong class="text-foreground font-semibold">C# / .NET</strong> with
                <strong class="text-foreground font-semibold">Angular</strong> and React on the
                frontend. At RUBICON IT (2023–2025, dual study) I shipped production apps across
                ASP.NET Core, Blazor, Vue 3, and WPF in an agile team, alongside a Computer Science
                degree.
              </p>
              <p>
                Outside of work I maintain a substantial open-source ecosystem —
                <strong class="text-foreground font-semibold"
                  >48 NuGet packages with 340,000+ downloads</strong
                >: Roslyn analyzers and source generators, an opinionated MSBuild SDK, and a
                C#-native LLM agent framework on the Microsoft Agent Framework. I also contribute
                upstream to
                <strong class="text-foreground font-semibold">Microsoft's dotnet/aspnetcore</strong>
                and the OpenTelemetry project.
              </p>
              <p>
                I'm currently finishing an
                <strong class="text-foreground font-semibold">M.Sc. in Software Engineering</strong>
                (GPA 1.0), serve as a study-program representative, and lecture C# externally. I
                work by Larry Wall's three virtues —
                <strong class="text-foreground font-semibold">laziness</strong> (automate the toil),
                <strong class="text-foreground font-semibold">impatience</strong> (anticipate, don't
                just react), and
                <strong class="text-foreground font-semibold">hubris</strong> (code no one wants to
                badmouth). Open to full-stack
                <strong class="text-foreground font-semibold">C# &amp; Angular</strong> work.
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
