import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
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
  'What is ErrorOrX, and why did you build it?',
];

@Component({
  selector: 'app-ai-assistant',
  imports: [LucideDynamicIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="mx-auto my-12 w-full max-w-275 px-6 sm:my-20 sm:px-10">
      <div
        class="border-foreground/8 bg-background fade-in flex flex-col gap-5 rounded-4xl border p-6 shadow-sm sm:p-8"
      >
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-2">
            <span
              class="border-foreground/10 bg-foreground/5 inline-flex h-7 w-7 items-center justify-center rounded-lg border"
            >
              <svg [lucideIcon]="icons.Sparkles" class="h-4 w-4" aria-hidden="true"></svg>
            </span>
            <h2 class="text-foreground text-[15px] font-semibold tracking-tight">
              Ask me anything
            </h2>
          </div>
          <p class="text-foreground/65 max-w-[60ch] text-[15px] leading-[1.5] tracking-tight">
            Ask about my projects, open-source packages, or experience — answers come straight from
            my CV. You can even paste a job description.
          </p>
        </div>

        @if (messages().length || streaming() || loading()) {
          <div
            #scroller
            class="border-foreground/5 bg-foreground/2 dark:bg-foreground/5 flex max-h-100 flex-col gap-4 overflow-y-auto rounded-3xl border p-4"
            aria-live="polite"
          >
            @for (message of messages(); track $index) {
              <div class="flex" [class.justify-end]="message.role === 'user'">
                <div
                  class="max-w-[85%] rounded-2xl px-4 py-2.5 text-[15px] leading-[1.55] tracking-tight whitespace-pre-wrap"
                  [class]="
                    message.role === 'user'
                      ? 'bg-foreground text-background'
                      : 'bg-background text-foreground border-foreground/8 border'
                  "
                >
                  {{ message.content }}
                </div>
              </div>
            }

            @if (streaming()) {
              <div class="flex">
                <div
                  class="border-foreground/8 bg-background text-foreground max-w-[85%] rounded-2xl border px-4 py-2.5 text-[15px] leading-[1.55] tracking-tight whitespace-pre-wrap"
                >
                  {{ streaming()
                  }}<span
                    class="bg-foreground/70 ml-0.5 inline-block h-4 w-1.5 animate-pulse align-middle"
                  ></span>
                </div>
              </div>
            } @else if (loading()) {
              <div class="text-foreground/50 px-1 text-[14px]">Thinking…</div>
            }
          </div>
        } @else {
          <div class="flex flex-wrap gap-2">
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

        @if (error()) {
          <p class="text-[14px] tracking-tight text-red-500" role="alert">{{ error() }}</p>
        }

        <form class="flex items-end gap-2" (submit)="$event.preventDefault(); send()">
          <label class="sr-only" for="assistant-input">Message the assistant</label>
          <textarea
            id="assistant-input"
            [value]="draft()"
            (input)="draft.set(textValue($event))"
            (keydown)="onKeydown($event)"
            rows="2"
            placeholder="Ask about my projects, packages, or experience…"
            class="focus-ring border-foreground/10 bg-background text-foreground placeholder:text-foreground/40 max-h-48 min-h-[2.75rem] flex-1 resize-y rounded-2xl border px-4 py-2.5 text-[15px] tracking-tight outline-none"
          ></textarea>
          <button
            type="submit"
            [disabled]="loading() || !draft().trim()"
            aria-label="Send message"
            class="focus-ring bg-foreground text-background inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-2xl transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
          >
            <svg [lucideIcon]="icons.ArrowUp" class="h-5 w-5" aria-hidden="true"></svg>
          </button>
        </form>

        <p class="text-foreground/40 text-[12px] tracking-tight">
          AI-generated from my CV — it can be imperfect. For anything important, reach out directly.
        </p>
      </div>
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

  private readonly scroller = viewChild<ElementRef<HTMLElement>>('scroller');

  constructor() {
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

    try {
      await this.assistant.streamChat(history, (chunk) =>
        this.streaming.update((current) => current + chunk),
      );
      const reply = this.streaming().trim();
      if (reply) {
        this.messages.update((current) => [...current, { role: 'assistant', content: reply }]);
      }
    } catch (error) {
      this.error.set(typeof error === 'string' ? error : 'Something went wrong. Please try again.');
    } finally {
      this.streaming.set('');
      this.loading.set(false);
    }
  }
}
