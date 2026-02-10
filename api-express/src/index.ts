import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import logger from "morgan";
import cookieParser from "cookie-parser";
import { sendError } from "~/utils/error";
import { PORT, ENVIRONMENT, SENTRY_DSN, VERSION } from "~/config";
import * as Sentry from "@sentry/node";
// Import controllers
import userRoutes from "./controllers/user";
import answerRoutes from "./controllers/answer";
import quizzBuilderRoutes from "./controllers/quizz-builder";
import quizzRoutes from "./controllers/quizz";
import feedbackRoutes from "./controllers/feedback";
import publicRoutes from "./controllers/public";
import configurePassport from "./passport";

dotenv.config({ path: ".env" });

// Put together a schema
const app = express();
app.use(logger("tiny"));

const sentryEnabled = ENVIRONMENT !== "development" && ENVIRONMENT !== "test";

if (sentryEnabled) {
  Sentry.init({
    dsn: SENTRY_DSN,
    environment: `api-express-${ENVIRONMENT}`,
    release: VERSION,
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      // enable Express.js middleware tracing
      new Sentry.Integrations.Express({ app }),
      // Automatically instrument Node.js libraries and frameworks
      ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
    ],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 0.01,
  });
}

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
app.use(Sentry.Handlers.errorHandler());
app.use(sendError);

// Start the server
app.listen(PORT, () => console.log(`RUN ON PORT ${PORT}`));

export default app;
