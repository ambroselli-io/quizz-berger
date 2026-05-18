import type { Answer } from "@prisma/client";
import { CandidateAnswer, FriendAnswer, PodiumDataWithPercentAndHeightAndHighest } from "./answer";

export type SlimPodiumStep = Pick<PodiumDataWithPercentAndHeightAndHighest, "pseudos" | "pictures" | "colors" | "height" | "percent">;
export type SlimCandidateUser = Pick<CandidateAnswer, "pseudo" | "color">;

export interface CandidatesAnswersResponse {
  ok: boolean;
  data: Array<CandidateAnswer>;
}

export interface FriendsAnswersResponse {
  ok: boolean;
  data: Array<FriendAnswer>;
}

export interface UserAnswersResponse {
  ok: boolean;
  data: Array<Answer>;
}

export interface RandomCandidateResponse {
  ok: boolean;
  data: Array<SlimPodiumStep>;
  user: SlimCandidateUser | null;
}

export interface AnswersForUserResponse {
  ok: boolean;
  data: Array<Answer>;
}

export interface CountResponse {
  ok: boolean;
  data: {
    countUsers: number;
    countAnswers: number;
  };
}
