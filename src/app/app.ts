import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  afterNextRender,
  inject,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavComponent } from './components/layout/nav.component';
import { PageBackdropComponent } from './components/layout/page-backdrop.component';
import { SmoothScrollService } from './services/smooth-scroll.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  imports: [NavComponent, PageBackdropComponent, RouterOutlet],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly smoothScroll = inject(SmoothScrollService);

  constructor() {
    // Instantiate the theme service at bootstrap so the saved/system theme is applied.
    inject(ThemeService);

    const destroyRef = inject(DestroyRef);
    afterNextRender(() => this.smoothScroll.start());
    destroyRef.onDestroy(() => this.smoothScroll.destroy());
  }
}
