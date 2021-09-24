require("dotenv").config({ path: ".env" });
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const logger = require("morgan");
const cookieParser = require("cookie-parser");

const { globalErrorHandler } = require("./utils/error");

const { PORT, HOST } = require("./config.js");

require("./mongo");

// Put together a schema
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}

const whitelist = [HOST];
const corsOptions = {
  origin: function (origin, callback) {
    if (process.env.NODE_ENV === "development") return callback(null, true);
    if (!origin) return callback(null, true); // because same-origin gives origin === undefined;
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(`${origin} not allowed by CORS : ${JSON.stringify(whitelist)}`));
    }
  },
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
};
app.use(cors(corsOptions));

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

const now = new Date().toISOString();

app.get("/", async (req, res) => {
  res.send(`Hello World at ${now}`);
});

// Post middleware
require("./passport")(app);

// Start the server
app.listen(PORT, () => console.log(`RUN ON PORT ${PORT}`));

app.use(globalErrorHandler);

module.exports = app;
