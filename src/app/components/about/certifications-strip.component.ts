import { ChangeDetectionStrategy, Component } from '@angular/core';

import { certifications } from '../../portfolio-data';

@Component({
  selector: 'app-certifications-strip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex w-full flex-wrap items-start justify-center gap-4 px-4 sm:gap-6 sm:px-8">
      @for (cert of items; track cert.url; let index = $index) {
        <a
          [href]="cert.url"
          target="_blank"
          rel="noopener noreferrer"
          [attr.aria-label]="cert.title + ' — ' + cert.issuer + ' (open verification)'"
          class="fade-in focus-ring group flex w-[clamp(7rem,16vw,9.5rem)] flex-col items-center gap-2.5 rounded-3xl"
          [style.--fade-delay]="index * 80 + 'ms'"
        >
          <div
            class="border-foreground/8 bg-background flex aspect-square w-full items-center justify-center rounded-3xl border p-3 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md"
          >
            <img
              [src]="cert.image"
              [alt]="cert.title + ' badge'"
              width="160"
              height="160"
              loading="lazy"
              class="h-full w-full object-contain"
            />
          </div>
          <span
            class="text-foreground/65 group-hover:text-foreground text-center text-[12px] leading-tight tracking-tight transition-colors"
          >
            {{ cert.title }}
          </span>
        </a>
      }
    </div>
  `,
})
export class CertificationsStripComponent {
  protected readonly items = certifications;
}
