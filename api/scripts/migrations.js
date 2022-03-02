require("../src/mongo");
require("dotenv").config({ path: ".env" });
const mongoose = require("mongoose");
const { quizz } = require("quizz-du-berger-shared");
const UserObject = require("../src/models/user");
const AnswerObject = require("../src/models/answer");
const md5 = require("md5");
