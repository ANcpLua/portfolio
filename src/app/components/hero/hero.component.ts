import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CtaRowComponent } from '../ui/cta-row.component';
import { PortraitMorphComponent } from './portrait-morph.component';

@Component({
  selector: 'app-hero',
  imports: [CtaRowComponent, PortraitMorphComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="relative w-full">
      <div class="mx-auto w-full max-w-275 px-6 pt-44 pb-10 sm:px-10 sm:pt-56 sm:pb-16">
        <div class="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-8">
          <div class="fade-in flex flex-col gap-4">
            <p class="text-foreground text-[20px] leading-tight font-medium tracking-tight">
              Hey<span aria-hidden="true" class="mx-0.5">👋</span>, I'm Alexander
            </p>

            <h1
              class="text-foreground text-[2.75rem] leading-[1.05] font-medium tracking-tight md:text-[2.5rem] lg:text-[3.65rem]"
            >
              <span class="block whitespace-nowrap">Full-stack engineer</span>
              <span class="block whitespace-nowrap">C# · .NET · TypeScript</span>
            </h1>

            <p class="text-foreground/65 max-w-[36ch] text-[22px] leading-[1.4] tracking-tight">
              I build .NET backends and React frontends — plus an open-source ecosystem of
              48 packages with 340k+ downloads.
            </p>

            <app-cta-row label="View My Work" emphasis="strong" />
          </div>

          <div class="scale-unblur flex justify-stretch md:justify-end">
            <div
              class="border-foreground/8 bg-background relative aspect-square w-full overflow-hidden rounded-4xl border p-1.5 shadow-sm md:max-w-105"
            >
              <div class="relative h-full w-full overflow-hidden rounded-[1.6rem]">
                <app-portrait-morph
                  srcA="/alexander.webp"
                  srcB="/alexander_wave.webp"
                  alt="Alexander Nachtmann"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class HeroComponent {}
