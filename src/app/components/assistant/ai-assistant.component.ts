import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  computed,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { LucideArrowUp, LucideDynamicIcon, LucideSparkles } from '@lucide/angular';

import { AiAssistantService, type ChatMessage } from '../../services/ai-assistant.service';

const SUGGESTIONS = [
  'What does ANcpLua.Agents do?',
  'Tell me about your NuGet packages',
  'What are you most passionate about?',
  'What is ErrorOrX?',
];

@Component({
  selector: 'app-ai-assistant',
  imports: [LucideDynamicIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      class="mx-auto mt-2 mb-16 flex w-full max-w-2xl flex-col items-center px-6 text-center sm:mt-4 sm:mb-24"
    >
      <div class="relative mb-5 flex h-12 w-12 items-center justify-center">
        <span class="border-foreground/15 absolute inset-0 rounded-full border"></span>
        @if (loading()) {
          <span
            class="border-t-foreground/60 absolute inset-0 animate-spin rounded-full border-2 border-transparent"
          ></span>
        }
        <svg
          [lucideIcon]="icons.Sparkles"
          class="text-foreground/70 h-5 w-5"
          aria-hidden="true"
        ></svg>
      </div>

      <h2 class="text-foreground text-[1.75rem] font-medium tracking-tight sm:text-[2rem]">
        Ask me anything about Alexander
      </h2>
      <p class="text-foreground/55 mt-2 max-w-[48ch] text-[14px] leading-[1.5] tracking-tight">
        My projects, open-source packages, and experience — answered from my CV. You can even paste
        a job description.
      </p>

      <!-- Screen readers hear settled output only (status + the final reply), never the
           token-by-token stream, which would otherwise flood the polite queue. -->
      <p class="sr-only" role="status" aria-live="polite">{{ announcement() }}</p>

      @if (messages().length || streaming() || loading()) {
        <div
          #scroller
          class="mt-8 flex max-h-[26rem] w-full flex-col gap-4 overflow-y-auto text-left"
        >
          @for (message of messages(); track $index) {
            <div class="flex" [class.justify-end]="message.role === 'user'">
              <div
                class="max-w-[88%] rounded-2xl px-4 py-2.5 text-[15px] leading-[1.55] tracking-tight whitespace-pre-wrap"
                [class]="
                  message.role === 'user'
                    ? 'bg-foreground text-background'
                    : 'bg-foreground/4 dark:bg-foreground/8 text-foreground'
                "
              >
                {{ message.content }}
              </div>
            </div>
          }

          @if (streaming()) {
            <div class="flex" aria-hidden="true">
              <div
                class="bg-foreground/4 dark:bg-foreground/8 text-foreground max-w-[88%] rounded-2xl px-4 py-2.5 text-[15px] leading-[1.55] tracking-tight whitespace-pre-wrap"
              >
                {{ streaming()
                }}<span
                  class="bg-foreground/70 ml-0.5 inline-block h-4 w-1.5 animate-pulse align-middle"
                ></span>
              </div>
            </div>
          } @else if (loading()) {
            <div class="text-foreground/50 text-[14px]">Thinking…</div>
          }
        </div>
      }

      @if (error()) {
        <p class="mt-4 text-[14px] tracking-tight text-red-500" role="alert">{{ error() }}</p>
      }

      <form class="relative mt-8 w-full max-w-xl" (submit)="$event.preventDefault(); send()">
        <label class="sr-only" for="assistant-input">Ask about Alexander</label>
        <textarea
          id="assistant-input"
          [value]="draft()"
          (input)="draft.set(textValue($event))"
          (keydown)="onKeydown($event)"
          rows="1"
          placeholder="Ask anything about Alexander…"
          class="focus-ring border-foreground/12 bg-background text-foreground placeholder:text-foreground/40 max-h-40 w-full resize-none rounded-2xl border py-3.5 pr-14 pl-5 text-left text-[15px] tracking-tight shadow-sm outline-none"
        ></textarea>
        <button
          type="submit"
          [disabled]="loading() || !draft().trim()"
          aria-label="Send message"
          class="focus-ring bg-foreground text-background absolute right-2 bottom-2.5 inline-flex h-9 w-9 items-center justify-center rounded-xl transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
        >
          <svg [lucideIcon]="icons.ArrowUp" class="h-4 w-4" aria-hidden="true"></svg>
        </button>
      </form>

      @if (!messages().length && !streaming() && !loading()) {
        <div class="mt-4 flex flex-wrap justify-center gap-2">
          @for (suggestion of suggestions; track suggestion) {
            <button
              type="button"
              (click)="useSuggestion(suggestion)"
              class="border-foreground/8 bg-background text-foreground/75 hover:text-foreground hover:border-foreground/15 focus-ring cursor-pointer rounded-full border px-3.5 py-1.5 text-[13px] tracking-tight transition-colors"
            >
              {{ suggestion }}
            </button>
          }
        </div>
      }

      <p class="text-foreground/60 mt-5 text-[12px] tracking-tight">
        AI-generated from my CV — it can be imperfect. For anything important, reach out directly.
      </p>
    </section>
  `,
})
export class AiAssistantComponent {
  private readonly assistant = inject(AiAssistantService);

  protected readonly icons = { Sparkles: LucideSparkles, ArrowUp: LucideArrowUp };
  protected readonly suggestions = SUGGESTIONS;

  protected readonly messages = signal<ChatMessage[]>([]);
  protected readonly draft = signal('');
  protected readonly streaming = signal('');
  protected readonly loading = signal(false);
  protected readonly error = signal<string | null>(null);

  /** What screen readers should hear: a settled status line, never the live token stream. */
  protected readonly announcement = computed(() => {
    const error = this.error();
    if (error) {
      return error;
    }
    const messages = this.messages();
    const latest = messages[messages.length - 1];
    if (latest?.role === 'assistant') {
      return latest.content;
    }
    return this.loading() ? 'Thinking…' : '';
  });

  private readonly scroller = viewChild<ElementRef<HTMLElement>>('scroller');
  private activeController?: AbortController;

  constructor() {
    // Stop generating (and stop paying for) tokens if the visitor navigates away mid-stream.
    inject(DestroyRef).onDestroy(() => this.activeController?.abort());

    effect(() => {
      this.messages();
      this.streaming();
      const element = this.scroller()?.nativeElement;
      if (element) {
        queueMicrotask(() => (element.scrollTop = element.scrollHeight));
      }
    });
  }

  protected textValue(event: Event): string {
    return (event.target as HTMLTextAreaElement).value;
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.send();
    }
  }

  protected useSuggestion(suggestion: string): void {
    this.draft.set(suggestion);
    this.send();
  }

  protected async send(): Promise<void> {
    const text = this.draft().trim();
    if (!text || this.loading()) {
      return;
    }

    const history: ChatMessage[] = [...this.messages(), { role: 'user', content: text }];
    this.messages.set(history);
    this.draft.set('');
    this.error.set(null);
    this.streaming.set('');
    this.loading.set(true);

    const controller = new AbortController();
    this.activeController = controller;

    try {
      await this.assistant.streamChat(
        history,
        (chunk) => this.streaming.update((current) => current + chunk),
        controller.signal,
      );
      const reply = this.streaming().trim();
      if (reply) {
        this.messages.update((current) => [...current, { role: 'assistant', content: reply }]);
      }
    } catch (error) {
      // A deliberate cancellation (navigation away / destroy) is not a failure to surface.
      if (
        controller.signal.aborted ||
        (error instanceof DOMException && error.name === 'AbortError')
      ) {
        return;
      }
      this.error.set(typeof error === 'string' ? error : 'Something went wrong. Please try again.');
    } finally {
      this.activeController = undefined;
      this.streaming.set('');
      this.loading.set(false);
    }
  }
}
