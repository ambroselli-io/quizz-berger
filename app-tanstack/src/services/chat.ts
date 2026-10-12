import API from '@app/services/api';
import type { ChatMode } from '@app/content/chat-modes';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface Chat {
  id: string;
  mode: ChatMode;
  candidateId: string | null;
  messages: ChatMessage[];
}

export interface ChatSummary {
  id: string;
  mode: ChatMode;
  candidateId: string | null;
  preview: string;
  messagesCount: number;
  updatedAt: string;
}

const NO_REPLY = "L'IA n'a pas répondu, réessaie dans quelques instants.";

// The reply is streamed as plain text: API.execute would wait for the whole body and parse it as JSON.
export const sendChatMessage = async (
  chatId: string,
  text: string,
  onDelta: (replySoFar: string) => void,
): Promise<{ ok: true; reply: string } | { ok: false; error: string }> => {
  try {
    const response = await fetch(API.getUrl(`/chat/${chatId}/message`), {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    if (!response.ok || !response.body) {
      const data = await response.json().catch(() => null);
      return { ok: false, error: data?.error ?? NO_REPLY };
    }
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let reply = '';
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      reply += decoder.decode(value, { stream: true });
      onDelta(reply);
    }
    if (!reply) return { ok: false, error: NO_REPLY };
    return { ok: true, reply };
  } catch {
    return { ok: false, error: NO_REPLY };
  }
};
