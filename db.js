const mongosse = require("mongoose");
// require("dotenv").config();

const connection = mongosse.connect("mongodb://localhost:27017")


module.exports = {
    connection
}