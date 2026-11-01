import { createMistral } from "@ai-sdk/mistral";

// Mistral Large 4: Mistral's largest model, 1M context, still a public preview in October 2026.
// Not behind the mistral-large-latest alias yet (that one is Large 3). Reads MISTRAL_API_KEY.
export const CHAT_MODEL = process.env.MISTRAL_MODEL || "mistral-large-4";

// Euros per million tokens, Mistral Large 4 list price (the preview is sold at half that for now).
// Only used to tell users what their conversation cost.
const INPUT_EUR_PER_MTOK = Number(process.env.MISTRAL_INPUT_EUR_PER_MTOK) || 1.36;
const OUTPUT_EUR_PER_MTOK = Number(process.env.MISTRAL_OUTPUT_EUR_PER_MTOK) || 4.18;

// Large 4 refuses reasoning_effort "none" since 2026-10-30, and without a value it can spend the whole budget
// thinking and send back an empty reply. @ai-sdk/mistral only accepts "high" or "none", so "low" is set on the request.
const mistral = createMistral({
  fetch: (url, init) => {
    if (typeof init?.body !== "string") return fetch(url, init);
    return fetch(url, { ...init, body: JSON.stringify({ ...JSON.parse(init.body), reasoning_effort: "low" }) });
  },
});

export const getChatModel = () => mistral(CHAT_MODEL);

export const chatCostEur = (inputTokens: number, outputTokens: number) =>
  (inputTokens * INPUT_EUR_PER_MTOK + outputTokens * OUTPUT_EUR_PER_MTOK) / 1_000_000;
