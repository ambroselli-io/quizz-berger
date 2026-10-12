import { fetch } from 'expo/fetch';
import API from '~/services/api';
import type { ChatMode } from '~/utils/chatModes';

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

// React Native's global fetch cannot read a response as a stream; expo/fetch can.
export const sendChatMessage = async (
  chatId: string,
  text: string,
  onDelta: (replySoFar: string) => void,
): Promise<{ ok: true; reply: string } | { ok: false; error: string }> => {
  try {
    const token = API.getToken();
    const response = await fetch(API.getUrl(`/chat/${chatId}/message`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
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
