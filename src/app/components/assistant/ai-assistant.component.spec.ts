import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { AiAssistantComponent } from './ai-assistant.component';
import { AiAssistantService, type ChatMessage } from '../../services/ai-assistant.service';

type StreamChat = (
  messages: ChatMessage[],
  onText: (chunk: string) => void,
  signal?: AbortSignal,
) => Promise<void>;

/** Test handle onto the component's protected surface. */
type Harness = {
  draft: { set(value: string): void };
  messages: () => ChatMessage[];
  send: () => Promise<void>;
};

function mount(streamChat: StreamChat) {
  TestBed.configureTestingModule({
    imports: [AiAssistantComponent],
    providers: [{ provide: AiAssistantService, useValue: { streamChat } }],
  });
  const fixture = TestBed.createComponent(AiAssistantComponent);
  fixture.detectChanges();
  return { fixture, comp: fixture.componentInstance as unknown as Harness };
}

describe('AiAssistantComponent', () => {
  afterEach(() => TestBed.resetTestingModule());

  it('renders the assistant prompt heading', () => {
    const { fixture } = mount(() => Promise.resolve());
    expect(fixture.nativeElement.querySelector('h2')?.textContent).toContain('Ask me anything');
  });

  it('aborts the in-flight stream when the component is destroyed', () => {
    let captured: AbortSignal | undefined;
    const { fixture, comp } = mount((_m, _onText, signal) => {
      captured = signal;
      return new Promise<void>(() => {}); // never settles — request stays in flight
    });

    comp.draft.set('hi');
    void comp.send();
    fixture.detectChanges();
    fixture.destroy();

    expect(captured).toBeInstanceOf(AbortSignal);
    expect(captured?.aborted).toBe(true);
  });

  it('announces only settled output via a dedicated polite live region', async () => {
    const { fixture, comp } = mount((_m, onText) => {
      onText('Hello ');
      onText('world');
      return Promise.resolve();
    });

    comp.draft.set('hi');
    await comp.send();
    fixture.detectChanges();

    // The reply is committed to the transcript.
    expect(comp.messages().some((m) => m.role === 'assistant' && m.content === 'Hello world')).toBe(
      true,
    );

    // The scrolling transcript must NOT be a live region (it would re-announce every token).
    const transcript = fixture.nativeElement.querySelector('.overflow-y-auto');
    expect(transcript?.getAttribute('aria-live')).toBeNull();

    // A dedicated sr-only polite region carries the settled reply exactly once.
    const live = fixture.nativeElement.querySelector('.sr-only[aria-live="polite"]');
    expect(live).not.toBeNull();
    expect(live?.textContent).toContain('Hello world');
  });

  it('surfaces a user-facing error when the stream rejects', async () => {
    const { fixture, comp } = mount(() => Promise.reject('Service is down'));
    comp.draft.set('hi');
    await comp.send();
    fixture.detectChanges();

    const alert = fixture.nativeElement.querySelector('[role="alert"]');
    expect(alert?.textContent).toContain('Service is down');
  });

  it('does not surface an error when the stream is aborted', async () => {
    const controllerSeen = vi.fn();
    const { fixture, comp } = mount((_m, _onText, signal) => {
      controllerSeen(signal);
      const err = new DOMException('Aborted', 'AbortError');
      return Promise.reject(err);
    });

    comp.draft.set('hi');
    await comp.send();
    fixture.detectChanges();

    // An abort is a deliberate cancellation, not a failure the visitor should see.
    const alert = fixture.nativeElement.querySelector('[role="alert"]');
    expect(alert).toBeNull();
  });
});
