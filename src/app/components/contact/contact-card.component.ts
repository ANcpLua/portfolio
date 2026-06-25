import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LucideDynamicIcon } from '@lucide/angular';
import type { LucideIcon } from '@lucide/angular';

import { OWNER } from '../../profile';
import { simpleIconUrl } from '../../portfolio-data';
import { ShaderFlowComponent } from '../shaders/shader-flow.component';
import { CtaRowComponent } from '../ui/cta-row.component';

type SocialLink = {
  href: string;
  label: string;
  external?: boolean;
  icon?: LucideIcon;
  img?: string;
  svgPath?: string;
};

// Simple Icons removed the LinkedIn glyph (trademark takedown) so its CDN 404s, and this Lucide
// build ships no brand icons — so inline the path and tint it with currentColor.
const LINKEDIN_PATH =
  'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z';

@Component({
  selector: 'app-contact-card',
  imports: [CtaRowComponent, LucideDynamicIcon, ShaderFlowComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="mx-auto my-12 w-full max-w-275 px-6 sm:my-20 sm:px-10">
      <div class="fade-in">
        <div
          class="border-foreground/8 bg-background relative w-full overflow-hidden rounded-4xl border p-1.5 shadow-sm"
        >
          <div class="relative w-full overflow-hidden rounded-[1.6rem]">
            <div
              aria-hidden="true"
              class="pointer-events-none absolute inset-0 opacity-45 dark:opacity-25"
              style="mask-image: radial-gradient(ellipse 90% 110% at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.92) 40%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.4) 90%, rgba(0,0,0,0.15) 100%); -webkit-mask-image: radial-gradient(ellipse 90% 110% at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.92) 40%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.4) 90%, rgba(0,0,0,0.15) 100%);"
            >
              <app-shader-flow [scale]="3" [brightness]="3" />
            </div>

            <div
              class="relative grid gap-8 p-6 sm:gap-10 sm:p-7 md:grid-cols-[1.2fr_1fr] md:items-stretch md:gap-6 md:p-6"
            >
              <div class="flex flex-col gap-5">
                <h2
                  class="text-foreground font-serif text-[2.25rem] leading-[1.05] font-medium tracking-tight sm:text-[2.75rem] lg:text-[3.25rem]"
                >
                  Let's connect
                </h2>
                <p
                  class="text-foreground/65 mb-6 max-w-[29ch] text-[18px] leading-[1.4] tracking-tight sm:text-[22px]"
                >
                  Open to full-stack C# / .NET and React/Angular roles, freelance, and
                  collaboration. Based in Vienna — happy to talk remote or on-site.
                </p>
                <app-cta-row label="See projects" />
              </div>

              <div
                class="border-foreground/8 bg-background flex flex-col items-center justify-center gap-6 rounded-[1.1rem] border p-6 sm:p-8"
              >
                <div class="flex items-center gap-3 opacity-75">
                  @for (social of socials; track social.href) {
                    <a
                      [href]="social.href"
                      [attr.aria-label]="social.label"
                      [attr.target]="social.external ? '_blank' : null"
                      [attr.rel]="social.external ? 'noopener noreferrer' : null"
                      class="border-foreground/8 hover:border-foreground/15 focus-ring bg-background text-foreground/70 hover:text-foreground inline-flex h-11 w-11 items-center justify-center rounded-xl border transition-colors"
                    >
                      @if (social.img) {
                        <img
                          [src]="social.img"
                          alt=""
                          width="16"
                          height="16"
                          aria-hidden="true"
                          class="h-4 w-4 object-contain dark:invert"
                        />
                      } @else if (social.svgPath) {
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          class="h-4 w-4"
                          aria-hidden="true"
                        >
                          <path [attr.d]="social.svgPath" />
                        </svg>
                      } @else {
                        <svg
                          [lucideIcon]="social.icon!"
                          class="h-4 w-4"
                          [strokeWidth]="2"
                          aria-hidden="true"
                        ></svg>
                      }
                    </a>
                  }
                </div>
                <div class="flex flex-col items-center gap-1 text-center">
                  <p class="text-foreground/70 text-[13px] tracking-tight">
                    &copy; 2026 Alexander Nachtmann · Built with Angular
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ContactCardComponent {
  protected readonly socials: readonly SocialLink[] = [
    { href: OWNER.github, label: 'GitHub', img: simpleIconUrl('github'), external: true },
    { href: OWNER.linkedin, label: 'LinkedIn', svgPath: LINKEDIN_PATH, external: true },
    { href: OWNER.nuget, label: 'NuGet', img: simpleIconUrl('nuget'), external: true },
  ];
}
