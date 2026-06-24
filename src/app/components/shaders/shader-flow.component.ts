import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { Mesh, Program, Renderer, Transform, Triangle } from 'ogl';

type Vec2 = [number, number];
type Vec3 = [number, number, number];

const vertexShader = `attribute vec2 position;void main(){gl_Position=vec4(position,0.,1.);}`;

const fragmentShader = `precision highp float;
uniform vec2 uR;
uniform float uT;
uniform vec2 uV;
uniform float uS;
uniform float uTw;
uniform float uDe;
uniform float uMs;
uniform float uB;
uniform int uIt;
uniform vec3 uColorLow;
uniform vec3 uColorHigh;
uniform vec3 uBgColor;
uniform vec4 uFadeShape;

float h(vec2 p){
  return sin(p.x+sin(p.y+uT*uV.x))*sin(p.y*p.x*0.1+uT*uV.y);
}

float fadeAlpha(float d){
  float t=clamp(1.0-d,0.0,1.0);
  return t*t*(3.0-2.0*t);
}

void main(){
  vec2 frag=gl_FragCoord.xy/uR;
  vec2 p=frag-0.5;
  p.x*=uR.x/uR.y;
  p*=uS;

  float ms=uT*uMs*0.1;
  vec2 d=vec2(sin(ms),cos(ms))*0.1;
  float kt=uTw*0.01;
  float kd=1.0/uDe;

  vec2 e=vec2(0.05,0.);
  vec2 r=vec2(0.);
  for(int i=0;i<24;i++){
    if(i>=uIt)break;
    float a=h(p);
    float b=h(p+e.xy);
    float c=h(p+e.yx);
    vec2 q=vec2(b-a,c-a)*20.;
    p+=vec2(-q.y,q.x)*kt+q*kd+d;
    r=q;
  }

  float t=clamp(length(r)*0.5,0.0,1.0);
  vec3 col=mix(uColorLow,uColorHigh,t)*uB;

  vec2 ndc=vec2(frag.x,1.0-frag.y);
  float aspect=uR.x/uR.y;
  float dx=((ndc.x-uFadeShape.x)*aspect)/uFadeShape.z;
  float dy=(ndc.y-uFadeShape.y)/uFadeShape.w;
  float fa=fadeAlpha(sqrt(dx*dx+dy*dy));

  vec3 outColor=mix(uBgColor,col,fa);
  gl_FragColor=vec4(outColor,1.0);
}`;

const defaults = {
  flowSpeed: [0.1, 0.2] as Vec2,
  iterations: 14,
  scale: 6,
  brightness: 1,
  colorLow: [0.18, 0.2, 0.3] as Vec3,
  colorHigh: [0.55, 0.38, 0.32] as Vec3,
  fadeRx: 1.4,
  fadeRy: 0.6,
  fadeCx: 0.5,
  fadeCy: 0,
};

function parseColor(input: string): Vec3 | null {
  const value = input.trim();
  if (value.startsWith('#')) {
    let hex = value.slice(1);
    if (hex.length === 3) {
      hex = hex
        .split('')
        .map((char) => char + char)
        .join('');
    }
    if (hex.length !== 6) {
      return null;
    }
    const numeric = Number.parseInt(hex, 16);
    if (Number.isNaN(numeric)) {
      return null;
    }
    return [((numeric >> 16) & 255) / 255, ((numeric >> 8) & 255) / 255, (numeric & 255) / 255];
  }

  const match = value.match(/(\d+(?:\.\d+)?)/g);
  if (!match || match.length < 3) {
    return null;
  }
  return [Number(match[0]) / 255, Number(match[1]) / 255, Number(match[2]) / 255];
}

function readBackgroundColor(element: HTMLElement): Vec3 {
  const styles = getComputedStyle(element);
  const cssVar = styles.getPropertyValue('--background').trim();
  const parsed = cssVar ? parseColor(cssVar) : null;
  if (parsed) {
    return parsed;
  }

  const probe = document.createElement('div');
  probe.style.cssText = 'position:absolute;width:0;height:0;background:var(--background);';
  element.appendChild(probe);
  const raw = getComputedStyle(probe).backgroundColor;
  element.removeChild(probe);
  return parseColor(raw) ?? [1, 1, 1];
}

@Component({
  selector: 'app-shader-flow',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div #host aria-hidden="true" [class]="className()"></div>`,
})
export class ShaderFlowComponent {
  readonly className = input('absolute inset-0 h-full w-full grayscale');
  readonly flowSpeed = input<Vec2>();
  readonly iterations = input<number>();
  readonly scale = input<number>();
  readonly brightness = input<number>();

  private readonly host = viewChild.required<ElementRef<HTMLElement>>('host');
  private cleanup?: () => void;

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => this.init());
    destroyRef.onDestroy(() => this.cleanup?.());
  }

  private init(): void {
    const element = this.host().nativeElement;

    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio || 1, 1),
      alpha: false,
      antialias: false,
      powerPreference: 'high-performance',
    });
    const gl = renderer.gl;
    gl.canvas.style.width = '100%';
    gl.canvas.style.height = '100%';
    gl.canvas.style.display = 'block';
    element.appendChild(gl.canvas);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uT: { value: 0 },
        uR: { value: [1, 1] },
        uV: { value: [...defaults.flowSpeed] },
        uS: { value: defaults.scale },
        uTw: { value: 50 },
        uDe: { value: 200 },
        uMs: { value: 2.5 },
        uB: { value: defaults.brightness },
        uIt: { value: defaults.iterations },
        uColorLow: { value: [...defaults.colorLow] },
        uColorHigh: { value: [...defaults.colorHigh] },
        uBgColor: { value: readBackgroundColor(document.documentElement) },
        uFadeShape: {
          value: [defaults.fadeCx, defaults.fadeCy, defaults.fadeRx, defaults.fadeRy],
        },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    const scene = new Transform();
    mesh.setParent(scene);

    const onResize = (): void => {
      const width = element.clientWidth;
      const height = element.clientHeight;
      renderer.setSize(width, height);
      program.uniforms['uR'].value = [gl.drawingBufferWidth, gl.drawingBufferHeight];
    };
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(element);
    onResize();

    const syncUniforms = (): void => {
      program.uniforms['uV'].value = [...(this.flowSpeed() ?? defaults.flowSpeed)];
      program.uniforms['uS'].value = this.scale() ?? defaults.scale;
      program.uniforms['uB'].value = this.brightness() ?? defaults.brightness;
      program.uniforms['uIt'].value = this.iterations() ?? defaults.iterations;
    };

    // Set once when the static (reduced-motion) frame needs re-rendering on theme change.
    let renderStaticFrame: (() => void) | null = null;
    const syncBackground = (): void => {
      program.uniforms['uBgColor'].value = readBackgroundColor(document.documentElement);
      renderStaticFrame?.();
    };
    const themeObserver = new MutationObserver(syncBackground);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme', 'style'],
    });
    syncBackground();

    const disposeGl = (): void => {
      resizeObserver.disconnect();
      themeObserver.disconnect();
      if (gl.canvas.parentElement === element) {
        element.removeChild(gl.canvas);
      }
      geometry.remove();
      program.remove();
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };

    // prefers-reduced-motion: render a single static frame, no animation loop.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      syncUniforms();
      program.uniforms['uT'].value = 0;
      renderStaticFrame = (): void => renderer.render({ scene });
      renderStaticFrame();
      this.cleanup = disposeGl;
      return;
    }

    let raf = 0;
    let visible = true;
    let onScreen = true;
    const start = performance.now();

    const onVisibility = (): void => {
      visible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', onVisibility);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          onScreen = entry.isIntersecting;
        }
      },
      { rootMargin: '100px' },
    );
    intersectionObserver.observe(element);

    const tick = (): void => {
      if (visible && onScreen) {
        program.uniforms['uT'].value = (performance.now() - start) / 1000;
        syncUniforms();
        renderer.render({ scene });
      }
      raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);

    this.cleanup = (): void => {
      window.cancelAnimationFrame(raf);
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      disposeGl();
    };
  }
}
