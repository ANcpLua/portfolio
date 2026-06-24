import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideArrowRight, LucideDynamicIcon } from '@lucide/angular';

import { projects, type Project } from '../../portfolio-data';

const FADE_STEP_MS = 60;
const FADE_MAX_MS = 300;
const FEATURED_COUNT = 4;

@Component({
  selector: 'app-projects',
  imports: [LucideDynamicIcon, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="relative w-full">
      <div class="mx-auto w-full max-w-275 px-6 sm:px-10">
        @if (withHeadline()) {
          <div
            class="fade-in flex flex-col items-center gap-5 pt-12 pb-10 text-center sm:pt-20 sm:pb-14"
          >
            <h2
              class="text-foreground font-serif text-[2.5rem] leading-[1.05] font-medium tracking-tight md:text-[3rem] lg:text-[3.5rem]"
            >
              My projects
            </h2>
            <p
              class="text-foreground/65 max-w-[33ch] text-[18px] leading-[1.45] tracking-tight sm:text-[20px]"
            >
              From playful experiments to thoughtful systems, a look at the work I'm proud to have
              shipped.
            </p>
          </div>
        }

        <div class="columns-1 gap-6 md:columns-2 md:gap-7">
          @for (project of items(); track project.id; let index = $index) {
            <div
              class="fade-in mb-6 break-inside-avoid md:mb-7"
              [style.--fade-delay]="delay(index) + 'ms'"
            >
              <article
                class="project-card border-foreground/8 bg-background flex flex-col gap-4 rounded-3xl border p-3 sm:p-3.5"
              >
                <header class="flex items-center gap-2.5 px-1 pt-2">
                  <span
                    class="border-foreground/10 bg-background inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border"
                  >
                    <svg
                      [lucideIcon]="project.icon"
                      class="text-foreground h-3.5 w-3.5"
                      aria-hidden="true"
                    ></svg>
                  </span>
                  <span class="text-foreground text-sm font-medium tracking-tight">
                    {{ project.iconLabel }}
                  </span>
                </header>

                <div
                  class="project-card__image ring-foreground/5 bg-foreground/5 relative w-full overflow-hidden rounded-2xl ring-1"
                  [style.aspect-ratio]="project.imageRatio"
                >
                  <div class="project-card__image-inner">
                    <img
                      [src]="project.image"
                      [alt]="project.imageAlt"
                      class="h-full w-full object-cover"
                      [attr.loading]="index < 2 ? 'eager' : 'lazy'"
                    />
                  </div>
                </div>

                <div class="flex flex-col gap-2.5 px-1 pb-1">
                  <h3
                    class="text-foreground text-[20px] leading-[1.2] font-medium tracking-tight sm:text-[22px]"
                  >
                    {{ project.title }}
                  </h3>
                  <p
                    class="text-foreground/65 text-[14px] leading-normal tracking-tight sm:text-[15px]"
                  >
                    {{ project.description }}
                  </p>
                </div>

                <p class="text-foreground/50 px-1 pb-2 text-[12px] tracking-tight">
                  {{ project.meta }}
                </p>
              </article>
            </div>
          }
        </div>

        @if (viewMoreVisible()) {
          <div class="mt-12 flex justify-center sm:mt-16">
            <a
              routerLink="/projects"
              class="border-foreground/8 focus-ring group bg-background text-foreground hover:bg-foreground/5 inline-flex cursor-pointer items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-medium transition-colors"
            >
              View all projects
              <svg
                [lucideIcon]="icons.ArrowRight"
                class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              ></svg>
            </a>
          </div>
        }
      </div>
    </section>
  `,
})
export class ProjectsComponent {
  readonly withHeadline = input(false);
  readonly viewMoreVisible = input(false);

  protected readonly icons = { ArrowRight: LucideArrowRight };
  protected readonly items = computed<Project[]>(() =>
    this.viewMoreVisible() ? projects.slice(0, FEATURED_COUNT) : projects,
  );

  protected delay(index: number): number {
    return Math.min(index * FADE_STEP_MS, FADE_MAX_MS);
  }
}
