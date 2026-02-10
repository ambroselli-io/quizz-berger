-- CreateTable
CREATE TABLE "LLMRequest" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "user_response_object" JSONB NOT NULL,
    "request_timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modelId" TEXT,
    "finishReason" TEXT,
    "promptTokens" INTEGER,
    "completionTokens" INTEGER,
    "totalTokens" INTEGER,
    "totalEuros" DOUBLE PRECISION,
    "warnings" JSONB,
    "response_id" TEXT,
    "response_timestamp" TIMESTAMP(3),
    "error" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LLMRequest_pkey" PRIMARY KEY ("id")
);
