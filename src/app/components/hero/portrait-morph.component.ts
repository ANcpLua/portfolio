import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { Mesh, Program, Renderer, Texture, Transform, Triangle } from 'ogl';

type Vec2 = [number, number];

const vertexShader = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform sampler2D uTexA;
uniform sampler2D uTexB;
uniform float uProgress;
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uImageSize;
uniform vec2 uOrigin;
uniform vec2 uDirection;

varying vec2 vUv;

vec2 coverUv(vec2 uv) {
  vec2 ratio = vec2(
    min((uResolution.x / uResolution.y) / (uImageSize.x / uImageSize.y), 1.0),
    min((uResolution.y / uResolution.x) / (uImageSize.y / uImageSize.x), 1.0)
  );
  return vec2(
    uv.x * ratio.x + (1.0 - ratio.x) * 0.5,
    uv.y * ratio.y + (1.0 - ratio.y) * 0.5
  );
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = vUv;
  float p = uProgress;
  float bell = 4.0 * p * (1.0 - p);

  vec2 dir = normalize(uDirection + vec2(0.0001));
  float along = dot(uv - uOrigin, dir);
  float distGradient = (along + 1.4) / 2.8;

  float warpLow = fbm(uv * 1.8 + uTime * 0.05) - 0.5;
  float warpHi = fbm(uv * 5.5 - uTime * 0.04 + 13.0) - 0.5;
  float warp = warpLow * 0.55 + warpHi * 0.18;

  float field = distGradient + warp;
  float remapped = mix(-0.25, 1.25, p);
  float edgeWidth = 0.07;
  float mask = smoothstep(remapped - edgeWidth, remapped + edgeWidth, field);
  mask = 1.0 - mask;

  vec2 perp = vec2(-dir.y, dir.x);
  float ripplePhase = (field - remapped) * 14.0;
  float ripple = sin(ripplePhase) * 0.5 + 0.5;
  float edgeBand = 1.0 - smoothstep(0.0, edgeWidth * 1.6, abs(field - remapped));
  float pushAmount = ripple * edgeBand * 0.025 * bell;
  vec2 pushUv = uv + perp * pushAmount;
  vec2 baseUv = coverUv(pushUv);

  vec4 texA = texture2D(uTexA, baseUv);
  vec4 texB = texture2D(uTexB, baseUv);
  vec4 color = mix(texA, texB, mask);

  float darken = edgeBand * 0.35 * bell;
  color.rgb *= 1.0 - darken;

  gl_FragColor = color;
}
`;

@Component({
  selector: 'app-portrait-morph',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      #container
      role="img"
      [attr.aria-label]="alt()"
      class="portrait-morph"
      [class]="className()"
    >
      @if (!ready()) {
        <img
          [src]="srcA()"
          [alt]="alt()"
          draggable="false"
          class="absolute inset-0 h-full w-full object-cover select-none"
        />
      }
    </div>
  `,
})
export class PortraitMorphComponent {
  readonly srcA = input.required<string>();
  readonly srcB = input.required<string>();
  readonly alt = input.required<string>();
  readonly className = input<string>();

  protected readonly ready = signal(false);

  private readonly container = viewChild.required<ElementRef<HTMLElement>>('container');
  private cleanup?: () => void;

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => this.init());
    destroyRef.onDestroy(() => this.cleanup?.());
  }

  private init(): void {
    // prefers-reduced-motion: skip the WebGL morph and keep the static fallback image.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const element = this.container().nativeElement;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: false,
      dpr,
    });
    const gl = renderer.gl;
    const canvas = gl.canvas;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    element.appendChild(canvas);

    const scene = new Transform();
    const textureA = new Texture(gl, { generateMipmaps: false });
    const textureB = new Texture(gl, { generateMipmaps: false });
    const imageSize: Vec2 = [1, 1];

    const loadImage = (src: string, target: Texture): Promise<void> =>
      new Promise((resolve, reject) => {
        const image = new Image();
        image.crossOrigin = 'anonymous';
        image.onload = () => {
          target.image = image;
          imageSize[0] = image.naturalWidth;
          imageSize[1] = image.naturalHeight;
          resolve();
        };
        image.onerror = reject;
        image.src = src;
      });

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTexA: { value: textureA },
        uTexB: { value: textureB },
        uProgress: { value: 0 },
        uTime: { value: 0 },
        uResolution: { value: [1, 1] as Vec2 },
        uImageSize: { value: imageSize },
        uOrigin: { value: [0.5, 0.5] as Vec2 },
        uDirection: { value: [1, 0] as Vec2 },
      },
      transparent: true,
    });
    const mesh = new Mesh(gl, { geometry, program });
    mesh.setParent(scene);

    const resize = (): void => {
      const width = element.clientWidth;
      const height = element.clientHeight;
      renderer.setSize(width, height);
      program.uniforms['uResolution'].value = [width * dpr, height * dpr];
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(element);
    resize();

    let raf = 0;
    let last = performance.now();
    let time = 0;
    let running = true;
    let hover = false;
    let progress = 0;
    let origin: Vec2 = [0.5, 0.5];
    let direction: Vec2 = [1, 0];
    let lastPointer: { x: number; y: number; time: number } | null = null;

    const tick = (): void => {
      if (!running) {
        return;
      }

      const now = performance.now();
      const delta = Math.min((now - last) / 1000, 0.05);
      last = now;
      time += delta;

      const target = hover ? 1 : 0;
      const stiffness = hover ? 2.4 : 2;
      const k = 1 - Math.exp(-stiffness * delta);
      progress += (target - progress) * k;

      program.uniforms['uTime'].value = time;
      program.uniforms['uProgress'].value = progress;
      program.uniforms['uOrigin'].value = origin;
      program.uniforms['uDirection'].value = direction;
      program.uniforms['uImageSize'].value = imageSize;

      renderer.render({ scene });
      raf = window.requestAnimationFrame(tick);
    };

    const computeEdgeDirection = (x: number, y: number): Vec2 => {
      const dxLeft = x;
      const dxRight = 1 - x;
      const dyBottom = y;
      const dyTop = 1 - y;
      const minDistance = Math.min(dxLeft, dxRight, dyBottom, dyTop);
      if (minDistance === dxLeft) {
        return [1, 0];
      }
      if (minDistance === dxRight) {
        return [-1, 0];
      }
      if (minDistance === dyBottom) {
        return [0, 1];
      }
      return [0, -1];
    };

    const onPointerEnter = (event: PointerEvent): void => {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = 1 - (event.clientY - rect.top) / rect.height;
      origin = [x, y];
      direction = computeEdgeDirection(x, y);
      lastPointer = { x, y, time: performance.now() };
      hover = true;
    };

    const onPointerLeave = (event: PointerEvent): void => {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = 1 - (event.clientY - rect.top) / rect.height;
      origin = [x, y];
      const edgeDirection = computeEdgeDirection(x, y);
      direction = [-edgeDirection[0], -edgeDirection[1]];
      hover = false;
    };

    const onPointerMove = (event: PointerEvent): void => {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = 1 - (event.clientY - rect.top) / rect.height;
      const previous = lastPointer;

      if (previous && performance.now() - previous.time < 80 && progress < 0.15) {
        const vx = x - previous.x;
        const vy = y - previous.y;
        const magnitude = Math.hypot(vx, vy);
        if (magnitude > 0.01) {
          direction = [vx / magnitude, vy / magnitude];
        }
      }

      lastPointer = { x, y, time: performance.now() };
    };

    element.addEventListener('pointerenter', onPointerEnter);
    element.addEventListener('pointerleave', onPointerLeave);
    element.addEventListener('pointermove', onPointerMove);

    Promise.all([loadImage(this.srcA(), textureA), loadImage(this.srcB(), textureB)])
      .then(() => {
        if (!running) {
          return;
        }
        this.ready.set(true);
        last = performance.now();
        tick();
      })
      .catch(() => {
        this.ready.set(false);
      });

    this.cleanup = (): void => {
      running = false;
      window.cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      element.removeEventListener('pointerenter', onPointerEnter);
      element.removeEventListener('pointerleave', onPointerLeave);
      element.removeEventListener('pointermove', onPointerMove);
      geometry.remove();
      program.remove();
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      if (canvas.parentNode === element) {
        element.removeChild(canvas);
      }
    };
  }
}
