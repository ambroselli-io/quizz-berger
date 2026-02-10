require("../src/mongo");
require("dotenv").config({ path: ".env" });
const mongoose = require("mongoose");
const quizz = require("../../shared/quizz.json");
const UserObject = require("../src/models/user");
const AnswerObject = require("../src/models/answer");
const md5 = require("md5");
