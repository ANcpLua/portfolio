import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LucideDynamicIcon, LucideMail } from '@lucide/angular';

import { emailAddress } from '../../portfolio-data';
import { ShaderFlowComponent } from '../shaders/shader-flow.component';
import { CtaRowComponent } from '../ui/cta-row.component';

type SocialLink = {
  href: string;
  label: string;
  img?: string;
  external?: boolean;
};

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
                  I'm always open to discussing new projects, creative ideas, or opportunities to be
                  part of your visions. Just reach out!
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
                          width="14"
                          height="14"
                          aria-hidden="true"
                          class="max-h-[14px] max-w-[14px] object-contain dark:invert"
                        />
                      } @else {
                        <svg
                          [lucideIcon]="icons.Mail"
                          class="h-4 w-4"
                          [strokeWidth]="2.5"
                          aria-hidden="true"
                        ></svg>
                      }
                    </a>
                  }
                </div>
                <div class="flex flex-col items-center gap-1 text-center">
                  <p class="text-foreground/70 text-[13px] tracking-tight">
                    2026 &copy; Built with Angular
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
  protected readonly icons = { Mail: LucideMail };
  protected readonly socials: readonly SocialLink[] = [
    { href: `mailto:${emailAddress}`, label: 'Email' },
    { href: 'https://www.linkedin.com', label: 'LinkedIn', img: '/linkedin.svg', external: true },
    { href: 'https://x.com', label: 'X', img: '/x.svg', external: true },
  ];
}
