import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import { LucideDynamicIcon, LucideRotateCcw } from '@lucide/angular';

import { stackChips } from '../../portfolio-data';
import { StackChipComponent } from './stack-chip.component';

const chipRadius = 14;
const wallPad = 16;

@Component({
  selector: 'app-stack',
  imports: [LucideDynamicIcon, StackChipComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col gap-3">
      <div class="flex items-center gap-3">
        <h3 class="section-heading">Stack</h3>
      </div>

      <div class="section-card relative h-40 overflow-hidden sm:h-64">
        @if (!reducedMotion()) {
          <button
            type="button"
            (click)="reset()"
            aria-label="Reset stack"
            class="focus-ring border-foreground/8 bg-background text-foreground/70 hover:text-foreground absolute top-3 right-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-xl border transition-colors"
          >
            <svg
              [lucideIcon]="icons.RotateCcw"
              class="h-4 w-4"
              [strokeWidth]="2.25"
              aria-hidden="true"
            ></svg>
          </button>
        }

        <!-- Doubles as the hidden measurement pass (physics mode) and the visible
             static layout (reduced-motion mode). -->
        <div
          #measure
          aria-hidden="true"
          class="pointer-events-none flex flex-wrap gap-2"
          [class]="reducedMotion() ? 'absolute inset-0 content-start p-3' : 'absolute top-0 left-0'"
          [class.invisible]="!reducedMotion()"
        >
          @for (chip of chips; track chip.label) {
            <app-stack-chip [chip]="chip" />
          }
        </div>

        @if (!reducedMotion()) {
          <div
            #container
            class="absolute inset-0 cursor-grab select-none"
            style="touch-action: none"
          >
            @for (chip of chips; track chip.label) {
              <div
                #chipEl
                class="pointer-events-none absolute top-0 left-0 will-change-transform"
                style="transform: translate3d(-9999px, -9999px, 0)"
              >
                <app-stack-chip [chip]="chip" />
              </div>
            }
          </div>
        }
      </div>
    </div>
  `,
})
export class StackComponent {
  protected readonly chips = stackChips;
  protected readonly icons = { RotateCcw: LucideRotateCcw };
  protected readonly reducedMotion = signal(false);

  private readonly container = viewChild<ElementRef<HTMLElement>>('container');
  private readonly measure = viewChild.required<ElementRef<HTMLElement>>('measure');
  private readonly chipElements = viewChildren<ElementRef<HTMLElement>>('chipEl');

  private cleanup?: () => void;
  private runId = 0;
  private destroyed = false;

  constructor() {
    const destroyRef = inject(DestroyRef);

    // Read prefers-reduced-motion only on the client, after the first render. The server
    // renders with reducedMotion=false, so deferring the read keeps the initial client
    // markup identical to the server's (no hydration mismatch) before flipping if needed.
    afterNextRender(() => {
      const reduce =
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.reducedMotion.set(reduce);
      if (!reduce) {
        void this.start();
      }
    });

    destroyRef.onDestroy(() => {
      this.destroyed = true;
      this.cleanup?.();
    });
  }

  protected reset(): void {
    void this.start();
  }

  private async start(): Promise<void> {
    const container = this.container()?.nativeElement;
    const measure = this.measure().nativeElement;
    const chipElements = this.chipElements().map((ref) => ref.nativeElement);

    if (!container || chipElements.length === 0) {
      return;
    }

    this.cleanup?.();
    const currentRun = ++this.runId;
    const matterModule = await import('matter-js');
    if (currentRun !== this.runId || this.destroyed) {
      return;
    }

    // matter-js is CommonJS: under esbuild's ESM interop the API lands on `.default`,
    // so a top-level destructure yields undefined (Engine.create() -> "reading 'create'"
    // of undefined) and the physics never starts. Read the API off `.default`.
    const Matter = matterModule.default;
    const { Engine, Runner, World, Bodies, Body, Mouse, MouseConstraint, Events } = Matter;
    const measureChildren = Array.from(measure.children) as HTMLElement[];
    const dims = measureChildren.map((element) => {
      const rect = element.getBoundingClientRect();
      return { width: Math.max(80, rect.width), height: Math.max(28, rect.height) };
    });

    let width = container.clientWidth;
    let height = container.clientHeight;
    const engine = Engine.create();
    engine.gravity.y = 1;
    const world = engine.world;

    const wallThickness = 400;
    const floor = Bodies.rectangle(
      width / 2,
      height - wallPad + wallThickness / 2,
      width * 3,
      wallThickness,
      { isStatic: true },
    );
    const leftWall = Bodies.rectangle(
      wallPad - wallThickness / 2,
      height / 2,
      wallThickness,
      height * 4,
      { isStatic: true },
    );
    const rightWall = Bodies.rectangle(
      width - wallPad + wallThickness / 2,
      height / 2,
      wallThickness,
      height * 4,
      { isStatic: true },
    );
    World.add(world, [floor, leftWall, rightWall]);

    const states = dims.map((dim, index) => {
      const halfWidth = dim.width / 2;
      const minX = wallPad + halfWidth + 4;
      const maxX = width - wallPad - halfWidth - 4;
      const x = minX + Math.random() * Math.max(1, maxX - minX);
      const y = -80 - index * 60 - Math.random() * 120;
      const body = Bodies.rectangle(x, y, dim.width, dim.height, {
        chamfer: { radius: chipRadius },
        restitution: 0.35,
        friction: 0.5,
        frictionAir: 0.025,
        density: 0.0018,
        angle: (Math.random() - 0.5) * 0.4,
      });
      World.add(world, body);
      return { body, width: dim.width, height: dim.height };
    });

    const mouse = Mouse.create(container);
    const wheelTarget = mouse.element as HTMLElement & { mousewheel?: EventListener };
    if (wheelTarget.mousewheel) {
      wheelTarget.removeEventListener('wheel', wheelTarget.mousewheel);
      wheelTarget.removeEventListener('DOMMouseScroll', wheelTarget.mousewheel);
    }

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        damping: 0.2,
        render: { visible: false },
      },
    });
    World.add(world, mouseConstraint);

    const onStartDrag = (): void => {
      container.style.cursor = 'grabbing';
    };
    const onEndDrag = (): void => {
      container.style.cursor = 'grab';
    };
    Events.on(mouseConstraint, 'startdrag', onStartDrag);
    Events.on(mouseConstraint, 'enddrag', onEndDrag);

    const runner = Runner.create();
    Runner.run(runner, engine);

    let raf = 0;
    const tick = (): void => {
      for (let index = 0; index < states.length; index++) {
        const state = states[index];
        const element = chipElements[index];
        if (!state || !element) {
          continue;
        }

        const { x, y } = state.body.position;
        element.style.transform = `translate3d(${x - state.width / 2}px, ${
          y - state.height / 2
        }px, 0) rotate(${state.body.angle}rad)`;
      }
      raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);

    const onResize = (): void => {
      const nextWidth = container.clientWidth;
      const nextHeight = container.clientHeight;
      if (nextWidth === width && nextHeight === height) {
        return;
      }

      Body.setPosition(floor, {
        x: nextWidth / 2,
        y: nextHeight - wallPad + wallThickness / 2,
      });
      Body.setPosition(leftWall, {
        x: wallPad - wallThickness / 2,
        y: nextHeight / 2,
      });
      Body.setPosition(rightWall, {
        x: nextWidth - wallPad + wallThickness / 2,
        y: nextHeight / 2,
      });
      width = nextWidth;
      height = nextHeight;
    };
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(container);

    // matter-js attaches these DOM listeners to the (reused) container in Mouse.setElement
    // but offers no API to detach them, so remove them by reference on teardown.
    const mouseListeners = mouse as unknown as {
      element: HTMLElement;
      mousemove: EventListener;
      mousedown: EventListener;
      mouseup: EventListener;
      mousewheel: EventListener;
    };

    this.cleanup = (): void => {
      window.cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      Events.off(mouseConstraint, 'startdrag', onStartDrag);
      Events.off(mouseConstraint, 'enddrag', onEndDrag);
      const el = mouseListeners.element;
      el.removeEventListener('mousemove', mouseListeners.mousemove);
      el.removeEventListener('mousedown', mouseListeners.mousedown);
      el.removeEventListener('mouseup', mouseListeners.mouseup);
      el.removeEventListener('wheel', mouseListeners.mousewheel);
      el.removeEventListener('touchmove', mouseListeners.mousemove);
      el.removeEventListener('touchstart', mouseListeners.mousedown);
      el.removeEventListener('touchend', mouseListeners.mouseup);
      Runner.stop(runner);
      World.clear(world, false);
      Engine.clear(engine);
    };
  }
}
