const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bttTokenSchema = new Schema({
    date: Date,
    price: Number
});

module.exports = mongoose.model("BttToken", bttTokenSchema, "btt_crypto");