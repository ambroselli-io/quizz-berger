import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import logger from "morgan";
import cookieParser from "cookie-parser";
import { sendError } from "~/utils/error";
import * as Sentry from "@sentry/node";
import "./utils/sentry";
// Import controllers
import userRoutes from "./controllers/user";
import answerRoutes from "./controllers/answer";
import quizzBuilderRoutes from "./controllers/quizz-builder";
import quizzRoutes from "./controllers/quizz";
import feedbackRoutes from "./controllers/feedback";
import publicRoutes from "./controllers/public";
import ogRoutes from "./controllers/og";
import visitRoutes from "./controllers/visit";
import chatRoutes from "./controllers/chat";
import supporterRoutes from "./controllers/supporter";
import fundingRoutes from "./controllers/funding";
import ideasRoutes from "./controllers/ideas";
import configurePassport from "./passport";
import { isLoadTest } from "./utils/load-test";

dotenv.config({ path: ".env" });

// Put together a schema
const app = express();
// nginx runs on the same machine: trust its X-Forwarded-For so rate limits see the real client IP.
app.set("trust proxy", "loopback");
app.use(logger("tiny"));
// Not on /chat: compression buffers the response, and AI replies are streamed word by word.
app.use(compression({ filter: (req, res) => !req.path.startsWith("/chat") && compression.filter(req, res) }));

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

if (process.env.NODE_ENV === "production") {
  // regex .quizz-du-berger.com
  app.use(cors({ credentials: true, origin: ["https://quizz-du-berger.com", /\.quizz-du-berger\.com$/] }));
} else {
  app.use(
    cors({
      credentials: true,
      origin: ["http://localhost:5178"],
    }),
  );
}

app.use(express.static(__dirname + "/../public"));
// Pre middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.text({ type: ["json", "text"] }));
app.use(helmet());
app.use(cookieParser());

// Routes
app.use("/user", userRoutes);
app.use("/answer", answerRoutes);
app.use("/quizz-builder", quizzBuilderRoutes);
app.use("/quizz", quizzRoutes);
app.use("/feedback", feedbackRoutes);
app.use("/public", publicRoutes);
app.use("/og", ogRoutes);
app.use("/visit", visitRoutes);
app.use("/chat", chatRoutes);
app.use("/supporter", supporterRoutes);
app.use("/funding", fundingRoutes);
app.use("/ideas", ideasRoutes);

const now = new Date().toISOString();

app.get("/", async (req, res) => {
  res.send(`Hello World at ${now} - ${req.headers.host}`);
});

// Post middleware
configurePassport(app);

app.use("/robots.txt", (req, res) => {
  res.type("text/plain");
  res.send(`User-agent: *\nDisallow: /`);
});
const sentryErrorHandler = Sentry.Handlers.errorHandler();
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) =>
  isLoadTest(req) ? next(err) : sentryErrorHandler(err, req, res, next),
);
app.use(sendError);

export default app;
