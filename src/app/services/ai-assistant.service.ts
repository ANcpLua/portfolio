import { Injectable } from '@angular/core';

export type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

@Injectable({ providedIn: 'root' })
export class AiAssistantService {
  /**
   * POST the conversation to the server endpoint and stream the reply back,
   * invoking `onText` for each text chunk. Throws a user-facing string on error.
   */
  async streamChat(
    messages: ChatMessage[],
    onText: (chunk: string) => void,
    signal?: AbortSignal,
  ): Promise<void> {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ messages }),
      signal,
    });

    if (!response.ok || !response.body) {
      let message = 'The assistant is unavailable right now.';
      try {
        const body = (await response.json()) as { error?: string };
        if (body?.error) {
          message = body.error;
        }
      } catch {
        // keep the default message
      }
      throw message;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    for (;;) {
      const { value, done } = await reader.read();
      if (done) {
        break;
      }
      buffer += decoder.decode(value, { stream: true });

      const events = buffer.split('\n\n');
      buffer = events.pop() ?? '';

      for (const event of events) {
        const line = event.trim();
        if (!line.startsWith('data:')) {
          continue;
        }
        const payload = line.slice(5).trim();
        if (!payload) {
          continue;
        }
        const data = JSON.parse(payload) as { text?: string; error?: string; done?: boolean };
        if (data.error) {
          throw data.error;
        }
        if (data.text) {
          onText(data.text);
        }
        if (data.done) {
          return;
        }
      }
    }
  }
}
