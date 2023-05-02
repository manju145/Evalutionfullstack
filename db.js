const mongosse = require("mongoose");
require("dotenv").config();

const connection = mongosse.connect(process.env.MONGO_LINk)


module.exports = {
    connection
}