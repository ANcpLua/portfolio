import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ShaderFlowComponent } from '../shaders/shader-flow.component';

@Component({
  selector: 'app-page-backdrop',
  imports: [ShaderFlowComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-x-0 top-0 -z-10 h-225 overflow-hidden"
    >
      <div class="absolute inset-0 opacity-50 md:opacity-100">
        <!-- Purely decorative: defer until the main thread is idle so ogl lands in
             its own chunk and never competes with first paint. -->
        @defer (on idle) {
          <app-shader-flow [brightness]="3" [iterations]="10" [flowSpeed]="[0, 0.1]" />
        }
      </div>
    </div>
  `,
})
export class PageBackdropComponent {}
