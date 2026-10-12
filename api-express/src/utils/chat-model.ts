import { mistral } from "@ai-sdk/mistral";

// Mistral Medium 3.5 at the time of writing: Mistral's frontier model, 256k context. Reads MISTRAL_API_KEY.
export const CHAT_MODEL = process.env.MISTRAL_MODEL || "mistral-medium-latest";

// Euros per million tokens, Mistral Medium 3.5 list price. Only used to tell users what their conversation cost.
const INPUT_EUR_PER_MTOK = Number(process.env.MISTRAL_INPUT_EUR_PER_MTOK) || 1.5;
const OUTPUT_EUR_PER_MTOK = Number(process.env.MISTRAL_OUTPUT_EUR_PER_MTOK) || 7.5;

export const getChatModel = () => mistral(CHAT_MODEL);

export const chatCostEur = (inputTokens: number, outputTokens: number) =>
  (inputTokens * INPUT_EUR_PER_MTOK + outputTokens * OUTPUT_EUR_PER_MTOK) / 1_000_000;
