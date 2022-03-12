require("dotenv").config({ path: ".env" });
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const logger = require("morgan");
const cookieParser = require("cookie-parser");

const { globalErrorHandler } = require("./utils/error");

const { PORT, WHITE_LIST_DOMAINS } = require("./config.js");

require("./mongo");
require("./utils/picture");

// Put together a schema
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
  // require("../scripts/migrations");
  // require("../scripts/rebuild-quizz-ids");
  // require("../scripts/extract-all-answers");
  // require("../scripts/stats");
}

const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (WHITE_LIST_DOMAINS.split(",").indexOf(req.header("Origin")) !== -1) {
    corsOptions = { credentials: true, origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { credentials: true, origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(cors(corsOptionsDelegate));

app.use(express.static(__dirname + "/../public"));
// Pre middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.text({ type: ["json", "text"] }));
app.use(helmet());
app.use(cookieParser());

// Routes
app.use("/user", require("./controllers/user"));
app.use("/answer", require("./controllers/answer"));
app.use("/quizz-builder", require("./controllers/quizz-builder"));
app.use("/quizz", require("./controllers/quizz"));
app.use("/feedback", require("./controllers/feedback"));
app.use("/public", require("./controllers/public"));

const now = new Date().toISOString();

app.get("/", async (req, res) => {
  res.send(`Hello World at ${now} - ${req.headers.host}`);
});

// Post middleware
require("./passport")(app);

// Start the server
app.listen(PORT, () => console.log(`RUN ON PORT ${PORT}`));

app.use(globalErrorHandler);

module.exports = app;
