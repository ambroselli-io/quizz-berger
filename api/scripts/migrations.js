require("../src/mongo");
require("dotenv").config({ path: ".env" });
const mongoose = require("mongoose");
const UserObject = require("../src/models/user");
const AnswerObject = require("../src/models/answer");
