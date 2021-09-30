require("../src/mongo");
require("dotenv").config({ path: ".env" });
const mongoose = require("mongoose");

console.log(mongoose.Types.ObjectId());
