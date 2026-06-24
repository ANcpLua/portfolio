import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CtaRowComponent } from '../ui/cta-row.component';
import { PortraitMorphComponent } from './portrait-morph.component';

@Component({
  selector: 'app-hero',
  imports: [CtaRowComponent, PortraitMorphComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="relative w-full">
      <div class="mx-auto w-full max-w-275 px-6 pt-44 pb-24 sm:px-10 sm:pt-56 sm:pb-32">
        <div class="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-8">
          <div class="fade-in flex flex-col gap-4">
            <p class="text-foreground text-[20px] leading-tight font-medium tracking-tight">
              Hey<span aria-hidden="true" class="mx-0.5">👋</span>, I'm Josh
            </p>

            <h1
              class="text-foreground text-[2.75rem] leading-[1.05] font-medium tracking-tight md:text-[2.5rem] lg:text-[3.65rem]"
            >
              <span class="block whitespace-nowrap">Design engineer &</span>
              <span class="block whitespace-nowrap">AI enthusiast</span>
            </h1>

            <p class="text-foreground/65 max-w-[34ch] text-[22px] leading-[1.4] tracking-tight">
              Independent engineer focused on interfaces that feel calm, considered, and quietly
              fast.
            </p>

            <app-cta-row label="View My Work" emphasis="strong" />
          </div>

          <div class="scale-unblur flex justify-stretch md:justify-end">
            <div
              class="border-foreground/8 bg-background relative aspect-square w-full overflow-hidden rounded-4xl border p-1.5 shadow-sm md:max-w-105"
            >
              <div class="relative h-full w-full overflow-hidden rounded-[1.6rem]">
                <app-portrait-morph srcA="/josh.webp" srcB="/josh_wave.webp" alt="Josh portrait" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class HeroComponent {}
