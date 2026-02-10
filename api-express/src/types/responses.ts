import type { Answer } from "@prisma/client";
import { CandidateAnswer, FriendAnswer, PodiumDataWithPercentAndHeightAndHighest } from "./answer";

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
  data: Array<PodiumDataWithPercentAndHeightAndHighest>;
  user: CandidateAnswer | null;
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
