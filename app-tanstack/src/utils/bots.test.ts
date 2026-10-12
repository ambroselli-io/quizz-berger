import { describe, expect, it } from 'vitest';
import { classifyBot } from './bots.mjs';

describe('classifyBot', () => {
  it('tells an AI answering a user from the same company training or indexing', () => {
    expect(classifyBot('Mozilla/5.0 AppleWebKit/537.36; compatible; ChatGPT-User/1.0; +https://openai.com/bot')).toEqual({
      name: 'ChatGPT-User',
      category: 'ai-answer',
    });
    expect(classifyBot('Mozilla/5.0 AppleWebKit/537.36; compatible; GPTBot/1.2')?.category).toBe('training');
    expect(classifyBot('Mozilla/5.0 AppleWebKit/537.36; compatible; OAI-SearchBot/1.0')?.category).toBe('indexing');
  });

  it('recognizes search engines and link previews', () => {
    expect(classifyBot('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)')?.name).toBe('Googlebot');
    expect(classifyBot('facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)')?.category).toBe('preview');
  });

  it('leaves humans alone and files unknown crawlers under "other"', () => {
    expect(classifyBot('Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) Instagram 350.0')).toBeNull();
    expect(classifyBot(undefined)).toBeNull();
    expect(classifyBot('SomeNewCrawler/1.0')).toEqual({ name: 'Autre robot', category: 'other' });
  });
});
